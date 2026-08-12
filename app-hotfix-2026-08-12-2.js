(function applyArchivedStudentSyncHotfix() {
  const HOTFIX_VERSION = "2026.08.12.2";
  const baseVersion = typeof APP_VERSION === "string" ? APP_VERSION : "";
  const originalPauseCloudSyncForRefresh =
    typeof pauseCloudSyncForRefresh === "function" ? pauseCloudSyncForRefresh : null;
  const originalRender = typeof render === "function" ? render : null;

  function deployedVersionIsCurrent(deployedVersion) {
    const normalizedVersion =
      typeof normalizeText === "function" ? normalizeText(deployedVersion) : String(deployedVersion || "").trim();
    return normalizedVersion === HOTFIX_VERSION || normalizedVersion === baseVersion;
  }

  function markHotfixLoaded() {
    try {
      latestHostedVersion = HOTFIX_VERSION;
      hostedRefreshRequired = false;
      const versionBadge = document.getElementById("appVersion");
      if (versionBadge) {
        versionBadge.textContent = HOTFIX_VERSION;
      }
    } catch {
      // Keep sync behavior fixed even if the version badge cannot be updated.
    }
  }

  function formatSnapshotTime(value) {
    const ms = typeof timestampMs === "function" ? timestampMs(value) : Date.parse(value);
    if (!ms) {
      return "unknown time";
    }
    return new Date(ms).toLocaleString([], {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit"
    });
  }

  function backupStudentCount(snapshot) {
    const students = snapshot?.envelope?.data?.students;
    return Array.isArray(students) ? students.length : 0;
  }

  function backupMaterialCount(snapshot) {
    const materials = snapshot?.envelope?.data?.globalMaterials;
    return Array.isArray(materials) ? materials.length : 0;
  }

  function ensureAutoBackupPanel() {
    const backupStatus = document.getElementById("backupStatus");
    if (!backupStatus) {
      return null;
    }

    let panel = document.getElementById("autoBackupRecoveryPanel");
    if (!panel) {
      panel = document.createElement("div");
      panel.id = "autoBackupRecoveryPanel";
      panel.className = "import-note";
      panel.hidden = true;
      backupStatus.insertAdjacentElement("afterend", panel);
    }
    return panel;
  }

  function renderAutoBackupPanel(snapshots) {
    const panel = ensureAutoBackupPanel();
    if (!panel) {
      return;
    }

    panel.hidden = false;
    panel.innerHTML = "";

    const heading = document.createElement("strong");
    heading.textContent = `Automatic backups on this browser (${snapshots.length})`;
    panel.append(heading);

    const list = document.createElement("ul");
    list.className = "mini-list";
    list.style.maxHeight = "260px";
    list.style.overflow = "auto";
    list.style.marginTop = "0.75rem";

    snapshots.forEach((snapshot, index) => {
      const item = document.createElement("li");
      item.className = "mini-row";

      const details = document.createElement("span");
      details.textContent =
        `${index + 1}. ${formatSnapshotTime(snapshot.createdAt)} - ` +
        `${backupStudentCount(snapshot)} students, ${backupMaterialCount(snapshot)} system items` +
        `${snapshot.reason ? ` (${snapshot.reason})` : ""}`;

      const actions = document.createElement("span");
      actions.className = "actions";

      const downloadButton = document.createElement("button");
      downloadButton.type = "button";
      downloadButton.className = "ghost";
      downloadButton.textContent = "Download";
      downloadButton.addEventListener("click", () => {
        downloadBackupRecord(snapshot, "student-lesson-tracker-auto-backup");
      });

      const restoreButton = document.createElement("button");
      restoreButton.type = "button";
      restoreButton.className = "danger";
      restoreButton.textContent = "Restore";
      restoreButton.addEventListener("click", async () => {
        const message =
          `Restore the tracker from ${formatSnapshotTime(snapshot.createdAt)}? ` +
          "This replaces the current tracker and syncs that restored copy to the cloud.";
        if (!confirm(message)) {
          return;
        }

        await saveAutoBackupSnapshot(
          "pre-restore-from-auto-backup",
          state,
          stateUpdatedAt || new Date().toISOString()
        );
        state = sanitizeState(snapshot.envelope.data);
        stateUpdatedAt = normalizeTimestamp(snapshot.envelope.updatedAt || snapshot.createdAt);
        persistAndRender();
        setBackupStatus(`Restored automatic backup from ${formatSnapshotTime(snapshot.createdAt)}.`, "success");
      });

      actions.append(downloadButton, restoreButton);
      item.append(details, actions);
      list.append(item);
    });

    panel.append(list);
  }

  function installAutoBackupRecoveryControls() {
    const latestButton = document.getElementById("downloadLatestAutoBackupBtn");
    if (!latestButton || document.getElementById("showAutoBackupsBtn")) {
      return;
    }

    const showButton = document.createElement("button");
    showButton.id = "showAutoBackupsBtn";
    showButton.type = "button";
    showButton.className = "ghost";
    showButton.textContent = "Show Auto Backups";
    showButton.addEventListener("click", async () => {
      try {
        const snapshots = await loadAllAutoBackupSnapshots();
        if (!snapshots.length) {
          setBackupStatus("No automatic backup snapshots have been saved in this browser yet.", "error");
          return;
        }
        renderAutoBackupPanel(snapshots);
        setBackupStatus("Choose the newest backup from after today's edits and before the rollback.", "success");
      } catch (error) {
        setBackupStatus(
          error instanceof Error ? error.message : "Could not load automatic backups.",
          "error"
        );
      }
    });

    latestButton.insertAdjacentElement("afterend", showButton);
  }

  pauseCloudSyncForRefresh = function pauseCloudSyncForRefreshWithHotfix(remoteVersion) {
    if (deployedVersionIsCurrent(remoteVersion)) {
      markHotfixLoaded();
      if (typeof renderSyncStatus === "function") {
        renderSyncStatus();
      }
      return;
    }
    if (originalPauseCloudSyncForRefresh) {
      originalPauseCloudSyncForRefresh(remoteVersion);
    }
  };

  checkForDeployedVersion = async function checkForDeployedVersionWithHotfix({ silent = false } = {}) {
    if (typeof isHostedRuntime === "function" && !isHostedRuntime()) {
      return false;
    }

    try {
      const deployedVersion = await fetchDeployedVersion();
      if (!deployedVersion || deployedVersionIsCurrent(deployedVersion)) {
        markHotfixLoaded();
        return false;
      }

      latestHostedVersion = deployedVersion;
      pauseCloudSyncForRefresh(deployedVersion);
      return true;
    } catch (error) {
      if (!silent && !syncInFlight) {
        syncStatus = `Cloud sync warning: ${
          error instanceof Error ? error.message : "could not verify the deployed app version"
        }`;
        renderSyncStatus();
      }
    }

    return false;
  };

  mergeStatePreservingLocalStudentFields = function mergeStatePreservingLocalStudentFieldsWithHotfix(
    localState,
    incomingState
  ) {
    const localStudentsByKey = buildStudentLookup(localState.students);
    let changed = false;

    const mergedStudents = incomingState.students.map((incomingStudent) => {
      const localStudent = studentMatchKeys(incomingStudent)
        .map((key) => localStudentsByKey.get(key))
        .find(Boolean);

      if (!localStudent) {
        return incomingStudent;
      }

      let nextStudent = incomingStudent;

      if (!incomingStudent.nextLesson && localStudent.nextLesson) {
        nextStudent = {
          ...nextStudent,
          nextLesson: localStudent.nextLesson
        };
        changed = true;
      }

      if (!incomingStudent.notes && localStudent.notes) {
        nextStudent = {
          ...nextStudent,
          notes: localStudent.notes
        };
        changed = true;
      }

      const mergedSongResult = mergeSimpleTextEntries(localStudent.songs, incomingStudent.songs, "song");
      if (mergedSongResult.changed) {
        nextStudent = {
          ...nextStudent,
          songs: mergedSongResult.entries
        };
        changed = true;
      }

      const mergedRiffResult = mergeSimpleTextEntries(localStudent.riffs, incomingStudent.riffs, "riff");
      if (mergedRiffResult.changed) {
        nextStudent = {
          ...nextStudent,
          riffs: mergedRiffResult.entries
        };
        changed = true;
      }

      if (incomingStudent.archived && !incomingStudent.archivedAt && localStudent.archivedAt) {
        nextStudent = {
          ...nextStudent,
          archivedAt: localStudent.archivedAt
        };
        changed = true;
      }

      const mergedGoalResult = mergeGoalsPreservingMet(localStudent.goals, incomingStudent.goals);
      if (mergedGoalResult.changed) {
        nextStudent = {
          ...nextStudent,
          goals: mergedGoalResult.goals
        };
        changed = true;
      }

      return nextStudent;
    });

    return {
      state: {
        ...incomingState,
        students: mergedStudents
      },
      changed
    };
  };

  if (originalRender) {
    render = function renderWithAutoBackupRecoveryControls() {
      const result = originalRender.apply(this, arguments);
      installAutoBackupRecoveryControls();
      markHotfixLoaded();
      return result;
    };
  }

  markHotfixLoaded();
  installAutoBackupRecoveryControls();
})();
