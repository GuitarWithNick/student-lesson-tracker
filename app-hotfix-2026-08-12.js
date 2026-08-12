(function applyArchivedStudentSyncHotfix() {
  const HOTFIX_VERSION = "2026.08.12.1";
  const baseVersion = typeof APP_VERSION === "string" ? APP_VERSION : "";
  const originalPauseCloudSyncForRefresh =
    typeof pauseCloudSyncForRefresh === "function" ? pauseCloudSyncForRefresh : null;

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

  markHotfixLoaded();
})();
