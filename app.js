const STORAGE_KEY = "student-practice-tracker-v1";
const APP_VERSION = "2026.04.10.5";
const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday"];
const PUSH_DEBOUNCE_MS = 500;
const POLL_INTERVAL_MS = 15000;
const BACKUP_DB_NAME = "student-lesson-tracker-backups";
const BACKUP_DB_VERSION = 1;
const BACKUP_STORE_NAME = "snapshots";
const MAX_AUTO_BACKUP_SNAPSHOTS = 8;
const LOCAL_ONLY_SYNC_STATUS = "Cloud sync: configure sync.config.js to enable shared data.";
const IMPORT_HEADER_ALIASES = {
  item: [
    "item",
    "name",
    "material",
    "file",
    "filename",
    "file name",
    "material name",
    "practice material",
    "practice item",
    "assignment",
    "title"
  ],
  type: ["type", "entry type", "category", "kind"],
  scope: ["scope", "material scope", "list scope", "level"],
  category: ["category", "group", "material category", "section"],
  student: ["student", "student name", "student_name", "learner"],
  day: ["day", "weekday", "lesson day"],
  given: ["given", "assigned", "checked", "completed", "done", "is given"],
  goal: ["goal", "student goal"],
  song: ["song", "song learned", "learned song"],
  riff: ["riff", "riffs learned", "learned riff", "learned riffs"]
};
const UNCATEGORIZED_LABEL = "Uncategorized";
const SONGS_CATEGORY = "songs";
const SHORT_TERM_GOAL = "short";
const LONG_TERM_GOAL = "long";
const MONDAY_STARTER_STUDENTS = ["Mary", "Linda", "Xavier", "Chris", "Matt", "Mike"];
const MONDAY_STARTER_STUDENTS_MIGRATION_KEY = `${STORAGE_KEY}-starter-students-monday-v2`;
const TUESDAY_STARTER_STUDENTS = [
  "Kalye",
  "Alex",
  "Olive",
  "Mike V.",
  "Jeff",
  "Jack",
  "Ozzy",
  "Ruth",
  "Reyven"
];
const TUESDAY_STARTER_STUDENTS_MIGRATION_KEY = `${STORAGE_KEY}-starter-students-tuesday-v2`;
const WEDNESDAY_STARTER_STUDENTS = [
  "Tim",
  "Phil",
  "Leslie",
  "Leland",
  "Dexter",
  "Payton",
  "Fitz",
  "Lisa",
  "Talia",
  "Mamphis",
  "Jasmine",
  "Damon",
  "James"
];
const WEDNESDAY_STARTER_STUDENTS_MIGRATION_KEY =
  `${STORAGE_KEY}-starter-students-wednesday-v1`;
const THURSDAY_STARTER_STUDENTS = [
  "Ian",
  "Jahzara",
  "Liz",
  "Ally",
  "Kevin",
  "Finley",
  "Keith",
  "Brian",
  "Jerry",
  "Kip",
  "Remy"
];
const THURSDAY_STARTER_STUDENTS_MIGRATION_KEY =
  `${STORAGE_KEY}-starter-students-thursday-v1`;
const SONGS_STARTER_MATERIALS = Array.isArray(window.SONGS_STARTER_MATERIALS)
  ? window.SONGS_STARTER_MATERIALS
  : [];
const SONGS_STARTER_MIGRATION_KEY = `${STORAGE_KEY}-songs-starter-v1`;
const CATEGORY_PRESETS = [
  "fundamentals",
  "riffs",
  "songs",
  "arpeggios",
  "bass",
  "blues",
  "chords",
  "exercises",
  "fingerstyle",
  "fretboard memorization",
  "improvisation",
  "jazz",
  "lead guitar",
  "practicing rhythm",
  "scales",
  "songwriting",
  "speed building",
  "strumming",
  "sweep picking",
  "technique",
  "theory",
  "two-hand synchronization"
];
const BASS_CATEGORY = "bass";
const BASS_SUBCATEGORY_PRESETS = [
  "5 String",
  "Backing Track Playalong",
  "Bass Lines",
  "Books and PDFs",
  "Chords",
  "Exercises",
  "Fretboard",
  "Isolated Bass Tracks",
  "Paper",
  "Riffs",
  "Scale Exercises",
  "Scale Sequences",
  "Scales",
  "Songs"
];
const TECHNIQUE_CATEGORY = "technique";
const TECHNIQUE_SUBCATEGORY_PRESETS = [
  "Efficiency",
  "Finger Independence",
  "Fretting Hand",
  "Legato",
  "Picking Hand",
  "Proper Hand Position",
  "Tension Reduction",
  "Tiny Chunks",
  "Vibrato"
];
const TECHNIQUE_EFFICIENCY_SUBCATEGORY = "technique / Efficiency";
const TECHNIQUE_EFFICIENCY_STARTER_MATERIALS = ["Technique Efficiency"];
const TECHNIQUE_EFFICIENCY_STARTER_MIGRATION_KEY = `${STORAGE_KEY}-technique-efficiency-starter-v1`;
const TECHNIQUE_PICKING_HAND_SUBCATEGORY = "technique / Picking Hand";
const TECHNIQUE_PICKING_HAND_STARTER_MATERIALS = [
  "Alternate Picking Fundamentals 1.pdf",
  "Alternate Picking Fundamentals 2.pdf",
  "Alternate Picking on a Single String",
  "Alternate Picking on a Single String (bass).pdf",
  "Alternate Picking Training 1.pdf",
  "Alternate Picking Training 2.pdf",
  "Alternate Picking Workout 1.pdf",
  "Alternate Picking Workout 2.pdf",
  "Alternate Picking Workout 3.pdf",
  "Alternate Picking Workout 4.pdf",
  "Alternate Picking Workout 5.pdf",
  "Alternate Picking, Part 1.pdf",
  "Directional Picking Examples.pdf",
  "Mastering Leaps 1.pdf",
  "Picking Hand Mechanics - Picking from the Wrist.pdf",
  "Picking Hand Open String Exercises.pdf",
  "Picking Hand Technique 1.pdf",
  "Picking Hand Technique 2.pdf",
  "Picking Motion Mastery.pdf",
  "Picking Technique Training Examples 1.pdf",
  "String Skipping Fundamentals 1.pdf",
  "Thumb Muting.mp4",
  "Thumb Muting.pdf",
  "Two String Directional Picking Mastery.pdf",
  "Villa-Lobos Etude No 1 Picking Exercise (not fingerstyle).pdf"
];
const TECHNIQUE_PICKING_HAND_STARTER_MIGRATION_KEY = `${STORAGE_KEY}-technique-picking-hand-starter-v1`;
const TECHNIQUE_FINGER_INDEPENDENCE_SUBCATEGORY = "technique / Finger Independence";
const TECHNIQUE_FINGER_INDEPENDENCE_STARTER_MATERIALS = [
  "Finger Independence 1",
  "Finger Independence Exercise 1.pdf",
  "Finger Independence Licks.pdf",
  "Pentatonic Finger Independence 1.pdf",
  "Scott Tennant's Finger Independence Exercise.pdf"
];
const TECHNIQUE_FINGER_INDEPENDENCE_STARTER_MIGRATION_KEY =
  `${STORAGE_KEY}-technique-finger-independence-starter-v1`;
const TECHNIQUE_LEGATO_SUBCATEGORY = "technique / Legato";
const TECHNIQUE_LEGATO_STARTER_MATERIALS = [
  "Hammer Ons and Pull Offs 1.pdf",
  "Legato Drills on a Single String",
  "Legato Drills on a Single String, Part 2.pdf",
  "Legato Lead Techniques 1",
  "Legato Lead Techniques 2.pdf"
];
const TECHNIQUE_LEGATO_STARTER_MIGRATION_KEY = `${STORAGE_KEY}-technique-legato-starter-v1`;
const TECHNIQUE_TENSION_REDUCTION_SUBCATEGORY = "technique / Tension Reduction";
const TECHNIQUE_TENSION_REDUCTION_STARTER_MATERIALS = [
  "Finger Tension Reduction 1.pdf",
  "Single Finger Focus.pdf",
  "Tension Reduction 1.pdf",
  "Tension Reduction 2.pdf"
];
const TECHNIQUE_TENSION_REDUCTION_STARTER_MIGRATION_KEY =
  `${STORAGE_KEY}-technique-tension-reduction-starter-v1`;
const TECHNIQUE_TINY_CHUNKS_SUBCATEGORY = "technique / Tiny Chunks";
const TECHNIQUE_TINY_CHUNKS_STARTER_MATERIALS = [
  "Tiny Chunks for Skill Development",
  "Tiny Chunks for Skill Development 2.pdf"
];
const TECHNIQUE_TINY_CHUNKS_STARTER_MIGRATION_KEY =
  `${STORAGE_KEY}-technique-tiny-chunks-starter-v1`;
const TECHNIQUE_PROPER_HAND_POSITION_SUBCATEGORY = "technique / Proper Hand Position";
const TECHNIQUE_PROPER_HAND_POSITION_STARTER_MATERIALS = [
  "Fretting Hand Position Training 1.pdf",
  "Fretting Hand Position Training 2.pdf",
  "Horizontal Leaps.pdf",
  "Proper Fretting Hand Technique 1.pdf",
  "Single Finger Focus 2.pdf"
];
const TECHNIQUE_PROPER_HAND_POSITION_STARTER_MIGRATION_KEY =
  `${STORAGE_KEY}-technique-proper-hand-position-starter-v1`;
const TECHNIQUE_VIBRATO_SUBCATEGORY = "technique / Vibrato";
const TECHNIQUE_VIBRATO_STARTER_MATERIALS = [
  "Vibrato 1.mp4",
  "Vibrato Practice Strategy 1",
  "Vibrato Practice Strategy 1 Demonstration.mp4"
];
const TECHNIQUE_VIBRATO_STARTER_MIGRATION_KEY = `${STORAGE_KEY}-technique-vibrato-starter-v1`;
const SWEEP_PICKING_CATEGORY = "sweep picking";
const SWEEP_PICKING_STARTER_MATERIALS = [
  "Dm 2nd Inversion Sweep Arpeggio.pdf",
  "Sweep Picking 1.pdf",
  "Sweep Picking 2.pdf"
];
const SWEEP_PICKING_STARTER_MIGRATION_KEY = `${STORAGE_KEY}-sweep-picking-starter-v1`;
const STRUMMING_CATEGORY = "strumming";
const STRUMMING_STARTER_MATERIALS = [
  "Common Strum Patterns 1.pdf",
  "Rock and Pop Strum Pattern.pdf",
  "Spanish Style Strum.pdf",
  "Spanish Style Strumming.pdf",
  "Strum Patterns - Full Score.pdf",
  "Strum Patterns 1-5.pdf",
  "Strum Patterns with Songs 1.pdf",
  "Strum Patterns.pdf",
  "Strumming Chords 1.pdf",
  "Strumming Exercise 1.pdf",
  "Strumming for Beginners, Part 1.mp4",
  "Strumming Variations 1.pdf",
  "Strumming Variations 2.pdf",
  "Three Strum Patterns.pdf"
];
const STRUMMING_STARTER_MIGRATION_KEY = `${STORAGE_KEY}-strumming-starter-v1`;
const RIFFS_CATEGORY = "riffs";
const RIFFS_STARTER_MATERIALS = [
  "99_riffs_for_electric_guitar.pdf",
  "1979.pdf",
  "A Hazy Shade of Winter.pdf",
  "Ain't Talkin' 'Bout Love.pdf",
  "Airbag by Radiohead.pdf",
  "All Day and All of the Night.pdf",
  "Another One Bites the Dust with analysis.pdf",
  "Another One Bites the Dust.pdf",
  "Awesome Riffs.pdf",
  "Bad to the Bone.pdf",
  "Barracuda.pdf",
  "Batman Theme.pdf",
  "Beat It by Michael Jackson.pdf",
  "Billie Jean.pdf",
  "Black Dog.pdf",
  "Blue Orchid (bass) by The White Stripes.pdf",
  "Blue Orchid by The White Stripes.pdf",
  "Bulls on Parade Riff.pdf",
  "C'mon.pdf",
  "Can't Stop Bass.pdf",
  "Can't Stop.pdf",
  "Carol of the Bells (standard notation).pdf",
  "Carol of the Bells riff.pdf",
  "Carol of the Bells.pdf",
  "Carry on Wayward Son bass riff",
  "Carry On Wayward Son copy.pdf",
  "Carry On Wayward Son.pdf",
  "Centerfield by John Fogerty.pdf",
  "Centuries Chords by Fall Out Boy.pdf",
  "Christmas Wrapping by The Waitresses.pdf",
  "Cissy Strut.pdf",
  "Cities on Flame with Rock and Roll.pdf",
  "Cochise (riff) copy.pdf",
  "Cochise (riff).pdf",
  "Come As You Are.pdf",
  "Come Out and Play By The Offspring - Full Score.pdf",
  "Come Together Riff.pdf",
  "Come Together.pdf",
  "Crazy Train Riff.pdf",
  "Crossroads (riff) by Cream.pdf",
  "Cult of Personality.pdf",
  "Custard Pie by Led Zeppelin.pdf",
  "Dance of the Sugar Plum Fairy copy.pdf",
  "Dance of the Sugar Plum Fairy.pdf",
  "Day Tripper (riff).pdf",
  "Dazed and Confused Riff_1.pdf",
  "Do I Wanna Know.pdf",
  "Don't Fear the Reaper.pdf",
  "Don't Stop Believin' (riff) copy.pdf",
  "Don't Stop Believin' (riff).pdf",
  "Don't Stop Believin' bass riff.pdf",
  "Don't Stop Believin' Tab by Journey.pdf",
  "Dragon Attack.pdf",
  "Dream On by Aerosmith.pdf",
  "Eight Days a Week Intro.pdf",
  "El Jarabe Tapatio - Mexican Hat Dance.pdf",
  "Enter Sandman - Full Score.pdf",
  "Enter Sandman.pdf",
  "Espionage by Green Day.pdf",
  "Espionage.pdf",
  "Every Breath You Take (riff).pdf",
  "Eye of the Tiger - Full Score riff.pdf"
];
const RIFFS_STARTER_MIGRATION_KEY = `${STORAGE_KEY}-riffs-starter-v1`;
const RIFFS_STARTER_MATERIALS_PART_2 = [
  "Fallen Down.pdf",
  "Fly Away - Easy Version.pdf",
  "Fly Away.pdf",
  "Fly by Night - Rush",
  "Fortunate Son - Full Score.pdf",
  "Fortunate Son copy.pdf",
  "Fortunate Son.pdf",
  "Forty Six & 2 - Full Score.pdf",
  "Forty Six & 2.pdf",
  "Freedom.pdf",
  "Ghostbusters.pdf",
  "Green River by CCR (1).pdf",
  "Green River by CCR.pdf",
  "Halloween.pdf",
  "Harry Potter Theme Tab by Misc. Soundtrack _ Songsterr Tabs with Rhythm.pdf",
  "Harry Potter Theme Tab.pdf",
  "Hava Nagila - Alternate Ways to Play.pdf",
  "Hava Nagila copy.pdf",
  "Hava Nagila.pdf",
  "Hayloft riff by Mother Mother copy.pdf",
  "Hayloft riff by Mother Mother.pdf",
  "Hayloft Tab by Mother Mother.pdf",
  "Heartbreaker.pdf",
  "Hit Me With Your Best Shot Riff.pdf",
  "Hunger Strike.pdf",
  "I Got Mine by The Black Keys.pdf",
  "I Walk the Line riff.pdf",
  "I'd Love to Change the World copy.pdf",
  "I'd Love to Change the World.pdf",
  "I'm Your Captain copy.pdf",
  "I'm Your Captain.pdf",
  "In the Hall of the Mountain King - Extended Version.pdf",
  "In the Hall of the Mountain King.pdf",
  "In-A-Gadda-Da-Vida (bass).pdf",
  "In-A-Gadda-Da-Vida.pdf",
  "Into the Void (bass) by Black Sabbath.pdf",
  "Into the Void by Black Sabbath copy.pdf",
  "Into the Void by Black Sabbath.pdf",
  "Iron Man.pdf",
  "It's the Most Wonderful Time of the Year.pdf",
  "Jackboot.pdf",
  "Jingle Bell Rock Intro Riff.pdf",
  "Jingle Bell Rock.pdf",
  "Journey to the End of the East Bay.pdf",
  "La Bamba",
  "Layla - Acoustic Live Riff - Full Score.pdf",
  "Layla - Acoustic Live Riff.pdf",
  "Let There Be Rock.pdf",
  "Let's Groove.pdf",
  "Let's Live it Up.pdf",
  "Lie in our graves riff",
  "Life In The Fast Lane.pdf",
  "Lithium by Nirvana",
  "Lithium by Nirvana.pdf",
  "Louie, Louie.pdf",
  "Love Me Two Times by The Doors - Full Score.pdf",
  "Love Me Two Times by The Doors.pdf",
  "Lucy in the Sky with Diamonds,pdf",
  "Malaguena",
  "Malaguena copy.pdf",
  "Megalovania.pdf",
  "Message in a Bottle.pdf"
];
const RIFFS_STARTER_MIGRATION_KEY_PART_2 = `${STORAGE_KEY}-riffs-starter-v2`;
const RIFFS_STARTER_MATERIALS_PART_3 = [
  "Miserlou (simplified notes only) - Full Score.pdf",
  "Miserlou copy.pdf",
  "Miserlou.pdf",
  "Mission Impossible Practice Track Score_1.pdf",
  "Mission Impossible Theme.pdf",
  "Mission Impossible.pdf",
  "Money full version.pdf",
  "Money.pdf",
  "Monkey Wrench riff.pdf",
  "Na Na Na.pdf",
  "Never There.pdf",
  "New Orleans is Sinking.pdf",
  "Oh Well By Fleetwood Mac - Full Score.pdf",
  "Oh, Pretty Woman.pdf",
  "One by Metallica",
  "Outshined by Soundgarden.pdf",
  "Paint It, Black Riff.pdf",
  "Peanuts - Linus And Lucy Tab by Misc Cartoonstabs @ Ultimate Guitar Archive.pdf",
  "Peanuts - Linus And Lucy.pdf",
  "Personal Jesus by Depeche Mode.pdf",
  "Peter Gunn.pdf",
  "Pipeline Riff.pdf",
  "Play That Funky Music",
  "Plush.pdf",
  "Rebel Rebel.pdf",
  "Redemption Song.pdf",
  "Reptilia.pdf",
  "Riders on the Storm.pdf",
  "Ring of Fire Riff.pdf",
  "Runnin Down a Dream",
  "Runnin Down a Dream riff.pdf",
  "Runnin' Down A Dream copy.pdf",
  "Runnin' Down A Dream Riff.pdf",
  "Runnin' Down A Dream.pdf",
  "Santa Monica by Everclear - Bass",
  "Satch Boogie Tab by Joe Satriani - Guitar I - Distortion Guitar _ Songsterr Tabs with Rhythm.pdf",
  "Satellite",
  "Satisfaction.pdf",
  "Secret Agent Man.pdf",
  "Seven Nation Army - Full Riff.pdf",
  "Silent Lucidity",
  "Simple Gifts.pdf",
  "Simple Man riff",
  "Smoke on the Water.pdf",
  "Smooth Criminal - Full Score.pdf",
  "Smooth Criminal.pdf",
  "Snow (Hoy Oh) by Red Hot Chili Peppers.pdf",
  "Soul to Squeeze.pdf",
  "spanish edie tab.jpeg",
  "Stone Cold Crazy",
  "Stone Cold Crazypdf.pdf",
  "Sunshine of Your Love.pdf",
  "Suzie Q riff",
  "Sweet Dreams (Are Made of This).pdf",
  "Take on Me.pdf",
  "The Arrival by Pectora (opening riff).pdf",
  "The Distance.pdf",
  "The Mexican Hat Dance - Full Score.pdf",
  "The Ocean.pdf",
  "The Old Man Down the Road by John Fogerty.pdf",
  "The Spirit of Radio.pdf"
];
const RIFFS_STARTER_MIGRATION_KEY_PART_3 = `${STORAGE_KEY}-riffs-starter-v3`;
const RIFFS_STARTER_MATERIALS_PART_4 = [
  "spanish eddie tab.jpeg",
  "There is Power in the Blood - Full Score.pdf",
  "Thought Contagion.pdf",
  "Thunderstruck.pdf",
  "Time in a Bottle Intro - Jim Croce .pdf",
  "TNT with Notation, real version.pdf",
  "Tonight Tonight (riff) - Full Score.pdf",
  "Tonight Tonight (riff).pdf",
  "True Lies.pdf",
  "Under the Bridge.pdf",
  "Unnatural Selection copy 2.pdf",
  "Unnatural Selection copy.pdf",
  "Unnatural Selection.pdf",
  "Up Around the Bend Riff.pdf",
  "Up Around the Bend.pdf",
  "Uprising.pdf",
  "Velorum.pdf",
  "Walk Don't Run copy.pdf",
  "Walk Don't Run.pdf",
  "Walk This Way - Full Score.pdf",
  "Walk This Way_3.pdf",
  "Walk This Way.pdf",
  "Wanted Dead or Alive riff.pdf",
  "Wanted Dead or Alive.pdf",
  "What Christmas Means to Me.pdf",
  "Whole Lotta Love.pdf",
  "Wipeout (Short Version).pdf",
  "Wipeout.pdf",
  "Working Man - Bass - by Rush.pdf",
  "Working Man by Rush - Full Score.pdf",
  "Working Man by Rush.pdf",
  "You're a Mean One, Mr Grinch (bass).pdf",
  "You're a Mean One, Mr Grinch.pdf"
];
const RIFFS_STARTER_MIGRATION_KEY_PART_4 = `${STORAGE_KEY}-riffs-starter-v4`;
const FUNDAMENTALS_CATEGORY = "fundamentals";
const FUNDAMENTALS_STARTER_MATERIALS = [
  "15 Most Common Chords",
  "Major Scale",
  "Minor Scale",
  "Minor Pentatonic Scale",
  "Strum Patterns 1-5"
];
const FUNDAMENTALS_STARTER_MIGRATION_KEY = `${STORAGE_KEY}-fundamentals-starter-v1`;
const ARPEGGIOS_CATEGORY = "arpeggios";
const ARPEGGIOS_STARTER_MATERIALS = [
  "3 String Sweep Arpeggio",
  "4 String Sweep Picking Arpeggios",
  "7th Arpeggios in G major",
  "7th Arpeggios on G",
  "A half dim7 arpeggio",
  "A7 Arpeggio",
  "Advanced Fingerstyle Arpeggios 1",
  "Am Sweep Picking Arpeggio",
  "Am7 Arpeggio",
  "Arpeggio Warm Ups",
  "Arpeggios in F Ionian",
  "D half dim7 Arpeggio",
  "D7 Arpeggio",
  "Dm7 Arpeggio",
  "Dominant 7th Arpeggios in Root Position",
  "Fully Diminished 7th Arpeggios in all Inversions",
  "Gmaj7 Arpeggio",
  "Left Handed - Major 7th Arpeggios in Root Position",
  "Major 7th Arpeggios in Root Position",
  "Major and Minor Arpeggios 1",
  "Minor7 and Dominant7 Arpeggio Study",
  "Three String Arpeggios, Part 1"
];
const ARPEGGIOS_STARTER_MIGRATION_KEY = `${STORAGE_KEY}-arpeggios-starter-v1`;
const FRETBOARD_MEMORIZATION_CATEGORY = "fretboard memorization";
const FRETBOARD_MEMORIZATION_STARTER_MATERIALS = [
  "All Octaves",
  "Arpeggiated Triads in the Key of G",
  "Fretboard Mastery 1",
  "Fretboard Transposition",
  "Major Key Triads 1 Triads on Two Strings",
  "Major Key Triads 2 More Triads on Two Strings",
  "Major Key Triads 3 Triads on Three Strings",
  "Natural Notes on the 5th and 6th Strings",
  "Natural Notes on the Guitar",
  "Notes on the Fretboard",
  "Octave Patterns",
  "Understanding the Fretboard 1"
];
const FRETBOARD_MEMORIZATION_STARTER_MIGRATION_KEY = `${STORAGE_KEY}-fretboard-memorization-starter-v1`;

const SYNC_CONFIG = window.TRACKER_SYNC_CONFIG ?? {};

let stateEnvelope = loadLocalEnvelope();
let state = stateEnvelope.data;
let stateUpdatedAt = stateEnvelope.updatedAt;

let syncStatus = LOCAL_ONLY_SYNC_STATUS;
let syncInFlight = false;
let pushTimer = null;
let pollTimer = null;
let focusedStudentId = "";
let selectedGlobalCategory = "";
let selectedTechniqueSubcategory = "";
let selectedBassSubcategory = "";
let expandedStudentMaterialCategories = {};
let studentMaterialSearchTerms = {};
let activeWorkspaceTab = "students";
let syncSafetyNotice = null;
let backupSummary = "Automatic backup snapshots are stored locally in this browser.";
let backupDbPromise = null;

const dom = {
  addStudentForm: document.getElementById("addStudentForm"),
  addGlobalMaterialForm: document.getElementById("addGlobalMaterialForm"),
  moveUncategorizedToSongsBtn: document.getElementById("moveUncategorizedToSongsBtn"),
  moveSelectedCategoryToSongsBtn: document.getElementById("moveSelectedCategoryToSongsBtn"),
  deleteSelectedCategoryBtn: document.getElementById("deleteSelectedCategoryBtn"),
  clearGlobalMaterialsBtn: document.getElementById("clearGlobalMaterialsBtn"),
  clearAllStudentMaterialBtn: document.getElementById("clearAllStudentMaterialBtn"),
  sortMode: document.getElementById("sortMode"),
  globalMaterialList: document.getElementById("globalMaterialList"),
  studentsBoard: document.getElementById("studentsBoard"),
  materialSpreadsheetInput: document.getElementById("materialSpreadsheetInput"),
  importSpreadsheetBtn: document.getElementById("importSpreadsheetBtn"),
  importStatus: document.getElementById("importStatus"),
  materialFolderInput: document.getElementById("materialFolderInput"),
  syncMaterialFolderBtn: document.getElementById("syncMaterialFolderBtn"),
  folderSyncStatus: document.getElementById("folderSyncStatus"),
  exportBackupBtn: document.getElementById("exportBackupBtn"),
  downloadLatestAutoBackupBtn: document.getElementById("downloadLatestAutoBackupBtn"),
  backupImportInput: document.getElementById("backupImportInput"),
  importBackupBtn: document.getElementById("importBackupBtn"),
  backupStatus: document.getElementById("backupStatus"),
  backupSummary: document.getElementById("backupSummary"),
  syncStatus: document.getElementById("syncStatus"),
  syncNowBtn: document.getElementById("syncNowBtn"),
  syncSafetyBanner: document.getElementById("syncSafetyBanner"),
  appVersion: document.getElementById("appVersion"),
  appRuntime: document.getElementById("appRuntime"),
  studentFocusSelect: document.getElementById("studentFocusSelect"),
  materialCategoryOptions: document.getElementById("materialCategoryOptions"),
  categoryPresetButtons: document.getElementById("categoryPresetButtons"),
  techniqueSubcategoryRow: document.getElementById("techniqueSubcategoryRow"),
  techniqueSubcategoryButtons: document.getElementById("techniqueSubcategoryButtons"),
  bassSubcategoryRow: document.getElementById("bassSubcategoryRow"),
  bassSubcategoryButtons: document.getElementById("bassSubcategoryButtons"),
  studentsTabBtn: document.getElementById("studentsTabBtn"),
  adminTabBtn: document.getElementById("adminTabBtn"),
  studentsWorkspaceTab: document.getElementById("studentsWorkspaceTab"),
  adminWorkspaceTab: document.getElementById("adminWorkspaceTab")
};

bootstrap();

function bootstrap() {
  dom.sortMode.value = state.sortMode;

  document.addEventListener("submit", handleSubmit);
  document.addEventListener("click", handleClick);
  document.addEventListener("change", handleChange);
  document.addEventListener("input", handleInput);

  const syncConfigured = isSyncConfigured();
  if (!syncConfigured && maybeApplyAllStarterData()) {
    stateUpdatedAt = new Date().toISOString();
    persistLocalEnvelope();
  }

  render();
  void refreshBackupSummary();

  if (syncConfigured) {
    syncStatus = "Cloud sync: connecting...";
    renderSyncStatus();
    void initializeSync();
    pollTimer = window.setInterval(() => {
      void pullRemoteAndMerge({ silent: true });
    }, POLL_INTERVAL_MS);
  }
}

function defaultState() {
  return {
    sortMode: "day",
    globalMaterials: [],
    students: []
  };
}

function loadLocalEnvelope() {
  const fallback = {
    data: defaultState(),
    updatedAt: ""
  };

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return fallback;
    }

    const parsed = JSON.parse(raw);
    if (
      parsed &&
      typeof parsed === "object" &&
      parsed.data &&
      typeof parsed.data === "object"
    ) {
      return {
        data: sanitizeState(parsed.data),
        updatedAt: normalizeTimestamp(parsed.updatedAt)
      };
    }

    return {
      data: sanitizeState(parsed),
      updatedAt: fallback.updatedAt
    };
  } catch {
    return fallback;
  }
}

function persistLocalEnvelope() {
  const envelope = {
    updatedAt: stateUpdatedAt,
    data: state
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(envelope));
}

function requestToPromise(request) {
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error ?? new Error("Backup request failed."));
  });
}

function waitForTransaction(transaction) {
  return new Promise((resolve, reject) => {
    transaction.oncomplete = () => resolve();
    transaction.onerror = () =>
      reject(transaction.error ?? new Error("Backup transaction failed."));
    transaction.onabort = () =>
      reject(transaction.error ?? new Error("Backup transaction was aborted."));
  });
}

function openBackupDatabase() {
  if (!("indexedDB" in window)) {
    return Promise.reject(new Error("This browser does not support automatic backup snapshots."));
  }

  if (!backupDbPromise) {
    backupDbPromise = new Promise((resolve, reject) => {
      const request = window.indexedDB.open(BACKUP_DB_NAME, BACKUP_DB_VERSION);

      request.onupgradeneeded = () => {
        const database = request.result;
        if (!database.objectStoreNames.contains(BACKUP_STORE_NAME)) {
          database.createObjectStore(BACKUP_STORE_NAME, { keyPath: "id" });
        }
      };

      request.onsuccess = () => resolve(request.result);
      request.onerror = () =>
        reject(request.error ?? new Error("Could not open automatic backup storage."));
    });
  }

  return backupDbPromise;
}

function buildBackupRecord({ envelope, source, reason = "", createdAt = new Date().toISOString() }) {
  return {
    kind: "student-lesson-tracker-backup",
    appVersion: APP_VERSION,
    source,
    reason,
    exportedAt: createdAt,
    envelope: {
      updatedAt: normalizeTimestamp(envelope.updatedAt ?? createdAt),
      data: sanitizeState(envelope.data)
    }
  };
}

function formatBackupTimestamp(value) {
  const ms = timestampMs(value);
  if (!ms) {
    return "Unknown time";
  }

  return new Date(ms).toLocaleString([], {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit"
  });
}

function formatBackupFilenameTimestamp(value) {
  const ms = timestampMs(value) || Date.now();
  return new Date(ms).toISOString().replace(/[:.]/g, "-");
}

function downloadBackupRecord(record, filenamePrefix) {
  const safePrefix = normalizeText(filenamePrefix).toLowerCase().replace(/[^a-z0-9]+/g, "-") || "backup";
  const downloadName = `${safePrefix}-${formatBackupFilenameTimestamp(record.exportedAt)}.json`;
  const backupBlob = new Blob([JSON.stringify(record, null, 2)], {
    type: "application/json"
  });
  const backupUrl = URL.createObjectURL(backupBlob);
  const link = document.createElement("a");
  link.href = backupUrl;
  link.download = downloadName;
  document.body.append(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(backupUrl), 0);
}

async function loadAllAutoBackupSnapshots() {
  const database = await openBackupDatabase();
  const transaction = database.transaction(BACKUP_STORE_NAME, "readonly");
  const store = transaction.objectStore(BACKUP_STORE_NAME);
  const snapshots = await requestToPromise(store.getAll());
  await waitForTransaction(transaction);

  return Array.isArray(snapshots)
    ? snapshots.sort((left, right) => timestampMs(right.createdAt) - timestampMs(left.createdAt))
    : [];
}

async function refreshBackupSummary() {
  try {
    const snapshots = await loadAllAutoBackupSnapshots();
    if (!snapshots.length) {
      backupSummary = "Automatic backup snapshots will appear here after the next cloud save.";
    } else {
      backupSummary =
        `Automatic snapshots on this browser: ${snapshots.length}. ` +
        `Latest ${formatBackupTimestamp(snapshots[0].createdAt)}.`;
    }
  } catch (error) {
    backupSummary =
      error instanceof Error ? error.message : "Automatic backup summary is unavailable in this browser.";
  }

  renderBackupSummary();
}

async function saveAutoBackupSnapshot(reason, nextState, nextUpdatedAt) {
  try {
    const database = await openBackupDatabase();
    const transaction = database.transaction(BACKUP_STORE_NAME, "readwrite");
    const store = transaction.objectStore(BACKUP_STORE_NAME);
    const createdAt = new Date().toISOString();
    const snapshot = buildBackupRecord({
      envelope: {
        updatedAt: nextUpdatedAt,
        data: nextState
      },
      source: "auto-snapshot",
      reason,
      createdAt
    });
    snapshot.id = `snapshot-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
    snapshot.createdAt = createdAt;

    store.put(snapshot);
    const allSnapshots = await requestToPromise(store.getAll());

    if (Array.isArray(allSnapshots)) {
      const staleSnapshots = [...allSnapshots]
        .sort((left, right) => timestampMs(right.createdAt) - timestampMs(left.createdAt))
        .slice(MAX_AUTO_BACKUP_SNAPSHOTS);

      staleSnapshots.forEach((entry) => {
        if (entry?.id) {
          store.delete(entry.id);
        }
      });
    }

    await waitForTransaction(transaction);
    await refreshBackupSummary();
    return snapshot;
  } catch (error) {
    setBackupStatus(
      `Automatic backup warning: ${error instanceof Error ? error.message : "could not save snapshot."}`,
      "error"
    );
    return null;
  }
}

function parseImportedBackup(rawValue) {
  if (!rawValue || typeof rawValue !== "object") {
    throw new Error("That file does not contain a valid backup.");
  }

  if (
    rawValue.kind === "student-lesson-tracker-backup" &&
    rawValue.envelope &&
    typeof rawValue.envelope === "object"
  ) {
    return {
      updatedAt: normalizeTimestamp(rawValue.envelope.updatedAt ?? rawValue.exportedAt),
      data: sanitizeState(rawValue.envelope.data)
    };
  }

  if (rawValue.data && typeof rawValue.data === "object") {
    return {
      updatedAt: normalizeTimestamp(rawValue.updatedAt),
      data: sanitizeState(rawValue.data)
    };
  }

  return {
    updatedAt: new Date().toISOString(),
    data: sanitizeState(rawValue)
  };
}

function sanitizeState(raw) {
  const fallback = defaultState();
  if (!raw || typeof raw !== "object") {
    return fallback;
  }

  const candidate = raw;
  const sortMode = candidate.sortMode === "name" ? "name" : "day";
  const globalMaterials = sanitizeGlobalMaterials(candidate.globalMaterials);
  const globalIds = new Set(globalMaterials.map((item) => item.id));
  const students = sanitizeStudents(candidate.students, globalIds);

  return {
    sortMode,
    globalMaterials,
    students
  };
}

function sanitizeGlobalMaterials(value) {
  if (!Array.isArray(value)) {
    return [];
  }
  const seen = new Set();
  const results = [];

  value.forEach((entry) => {
    if (!entry || typeof entry !== "object") {
      return;
    }
    const id = typeof entry.id === "string" ? entry.id : uid("global");
    const name = normalizeText(entry.name);
    if (!name) {
      return;
    }

    const category = normalizeCategory(entry.category);
    const dedupeKey = `${category.toLowerCase()}::${name.toLowerCase()}`;
    if (seen.has(dedupeKey)) {
      return;
    }
    seen.add(dedupeKey);
    results.push({ id, name, category });
  });

  return results;
}

function sanitizeStudents(value, validGlobalIds) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.reduce((accumulator, entry) => {
    if (!entry || typeof entry !== "object") {
      return accumulator;
    }

    const id = typeof entry.id === "string" ? entry.id : uid("student");
    const name = normalizeText(entry.name);
    const day = DAYS.includes(entry.day) ? entry.day : DAYS[0];
    const goals = sanitizeStudentGoals(entry);
    const songs = sanitizeSimpleList(entry.songs, "song");
    const riffs = sanitizeSimpleList(entry.riffs, "riff");
    const notes = sanitizeNotesText(entry.notes ?? entry.note);
    const archived = Boolean(entry.archived);
    const archivedAt = sanitizeArchivedAt(entry.archivedAt ?? entry.archived_at);
    const customMaterials = sanitizeCustomMaterialList(entry.customMaterials);
    const globalGiven = sanitizeGlobalGiven(entry.globalGiven, validGlobalIds);

    accumulator.push({
      id,
      name: name || "Unnamed Student",
      day,
      goals,
      songs,
      riffs,
      notes,
      archived,
      archivedAt,
      customMaterials,
      globalGiven
    });
    return accumulator;
  }, []);
}

function sanitizeNotesText(value) {
  if (typeof value !== "string") {
    return "";
  }

  return value.replace(/\r\n?/g, "\n").slice(0, 4000);
}

function sanitizeArchivedAt(value) {
  if (typeof value !== "string") {
    return "";
  }

  const parsedMs = Date.parse(value);
  return Number.isFinite(parsedMs) ? new Date(parsedMs).toISOString() : "";
}

function sanitizeSimpleList(value, prefix) {
  if (!Array.isArray(value)) {
    return [];
  }

  const results = [];
  const seen = new Set();

  value.forEach((entry) => {
    if (!entry || typeof entry !== "object") {
      return;
    }
    const text = normalizeText(entry.text);
    if (!text) {
      return;
    }
    const key = text.toLowerCase();
    if (seen.has(key)) {
      return;
    }
    seen.add(key);
    results.push({
      id: typeof entry.id === "string" ? entry.id : uid(prefix),
      text
    });
  });

  return results;
}

function sanitizeStudentGoals(entry) {
  if (!entry || typeof entry !== "object") {
    return [];
  }

  const combinedGoals = [];
  if (Array.isArray(entry.goals)) {
    combinedGoals.push(...entry.goals);
  }
  if (Array.isArray(entry.shortTermGoals)) {
    combinedGoals.push(
      ...entry.shortTermGoals.map((goal) =>
        goal && typeof goal === "object" ? { ...goal, term: SHORT_TERM_GOAL } : goal
      )
    );
  }
  if (Array.isArray(entry.longTermGoals)) {
    combinedGoals.push(
      ...entry.longTermGoals.map((goal) =>
        goal && typeof goal === "object" ? { ...goal, term: LONG_TERM_GOAL } : goal
      )
    );
  }

  return sanitizeGoalList(combinedGoals);
}

function normalizeGoalTerm(value, fallback = SHORT_TERM_GOAL) {
  const normalized = normalizeText(value).toLowerCase();
  if (normalized === LONG_TERM_GOAL || normalized === "long term" || normalized === "long-term") {
    return LONG_TERM_GOAL;
  }
  if (
    normalized === SHORT_TERM_GOAL ||
    normalized === "short term" ||
    normalized === "short-term"
  ) {
    return SHORT_TERM_GOAL;
  }
  return fallback;
}

function sanitizeGoalList(value, defaultTerm = SHORT_TERM_GOAL) {
  if (!Array.isArray(value)) {
    return [];
  }

  const results = [];
  const seen = new Set();

  value.forEach((entry) => {
    if (!entry || typeof entry !== "object") {
      return;
    }
    const text = normalizeText(entry.text);
    if (!text) {
      return;
    }
    const key = text.toLowerCase();
    const metValue = parseBooleanValue(entry.met ?? entry.completed ?? entry.done ?? entry.given);
    if (seen.has(key)) {
      if (metValue === true) {
        const existingGoal = results.find((goal) => goal.text.toLowerCase() === key);
        if (existingGoal) {
          existingGoal.met = true;
        }
      }
      return;
    }
    seen.add(key);
    results.push({
      id: typeof entry.id === "string" ? entry.id : uid("goal"),
      text,
      met: metValue === true,
      term: normalizeGoalTerm(entry.term ?? entry.goalTerm ?? entry.goal_term, defaultTerm)
    });
  });

  return results;
}

function sanitizeCustomMaterialList(value) {
  if (!Array.isArray(value)) {
    return [];
  }

  const results = [];
  const seen = new Set();
  value.forEach((entry) => {
    if (!entry || typeof entry !== "object") {
      return;
    }

    const name = normalizeText(entry.name);
    if (!name) {
      return;
    }

    const category = normalizeCategory(entry.category);
    const key = `${category.toLowerCase()}::${name.toLowerCase()}`;
    if (seen.has(key)) {
      return;
    }
    seen.add(key);

    results.push({
      id: typeof entry.id === "string" ? entry.id : uid("custom"),
      name,
      category,
      given: Boolean(entry.given)
    });
  });

  return results;
}

function sanitizeGlobalGiven(value, validGlobalIds) {
  if (!value || typeof value !== "object") {
    return {};
  }

  const source = value;
  return Object.entries(source).reduce((accumulator, [materialId, given]) => {
    if (!validGlobalIds.has(materialId)) {
      return accumulator;
    }
    accumulator[materialId] = Boolean(given);
    return accumulator;
  }, {});
}

function normalizeCategory(value) {
  const normalized = normalizeText(value);
  return normalized || UNCATEGORIZED_LABEL;
}

function groupMaterialsByCategory(materials) {
  const grouped = materials.reduce((accumulator, material) => {
    const category = normalizeCategory(material.category);
    if (!accumulator[category]) {
      accumulator[category] = [];
    }
    accumulator[category].push(material);
    return accumulator;
  }, {});

  return Object.entries(grouped)
    .sort(([left], [right]) => left.localeCompare(right, undefined, { sensitivity: "base" }))
    .map(([category, entries]) => ({
      category,
      entries: [...entries].sort((left, right) =>
        left.name.localeCompare(right.name, undefined, { sensitivity: "base" })
      )
    }));
}

function splitNestedCategory(categoryValue) {
  const normalizedCategory = normalizeCategory(categoryValue);
  const match = normalizedCategory.match(/^(.+?)\s*\/\s*(.+)$/);
  if (!match) {
    return {
      root: normalizedCategory,
      subcategory: ""
    };
  }

  return {
    root: normalizeCategory(match[1]),
    subcategory: normalizeText(match[2])
  };
}

function groupMaterialsForDisplay(materials) {
  const groupedByExactCategory = groupMaterialsByCategory(materials);
  const roots = new Map();

  groupedByExactCategory.forEach((group) => {
    const parts = splitNestedCategory(group.category);
    const rootKey = normalizeCategory(parts.root).toLowerCase();
    if (!roots.has(rootKey)) {
      roots.set(rootKey, {
        rootCategory: parts.root,
        directGroup: null,
        subgroups: []
      });
    }

    const rootGroup = roots.get(rootKey);
    if (!parts.subcategory) {
      rootGroup.directGroup = group;
      return;
    }

    rootGroup.subgroups.push({
      category: group.category,
      label: parts.subcategory,
      entries: group.entries
    });
  });

  return Array.from(roots.values())
    .sort((left, right) =>
      left.rootCategory.localeCompare(right.rootCategory, undefined, { sensitivity: "base" })
    )
    .map((group) => {
      if (group.subgroups.length === 0) {
        const directGroup = group.directGroup ?? {
          category: group.rootCategory,
          entries: []
        };
        return {
          type: "flat",
          category: directGroup.category,
          label: directGroup.category,
          entries: directGroup.entries
        };
      }

      const directEntries = group.directGroup?.entries ?? [];
      const subgroups = [...group.subgroups].sort((left, right) =>
        left.label.localeCompare(right.label, undefined, { sensitivity: "base" })
      );

      return {
        type: "nested",
        rootCategory: group.rootCategory,
        label: group.rootCategory,
        directEntries,
        subgroups,
        entries: [
          ...directEntries,
          ...subgroups.flatMap((subcategoryGroup) => subcategoryGroup.entries)
        ]
      };
    });
}

function maybeApplyAllStarterData() {
  const materialsChanged = maybeApplyAllStarterMaterials();
  const mondayStudentsChanged = maybeApplyStarterStudents({
    students: MONDAY_STARTER_STUDENTS.map((name) => ({ name, day: "Monday" })),
    migrationKey: MONDAY_STARTER_STUDENTS_MIGRATION_KEY
  });
  const tuesdayStudentsChanged = maybeApplyStarterStudents({
    students: TUESDAY_STARTER_STUDENTS.map((name) => ({ name, day: "Tuesday" })),
    migrationKey: TUESDAY_STARTER_STUDENTS_MIGRATION_KEY
  });
  const wednesdayStudentsChanged = maybeApplyStarterStudents({
    students: WEDNESDAY_STARTER_STUDENTS.map((name) => ({ name, day: "Wednesday" })),
    migrationKey: WEDNESDAY_STARTER_STUDENTS_MIGRATION_KEY
  });
  const thursdayStudentsChanged = maybeApplyStarterStudents({
    students: THURSDAY_STARTER_STUDENTS.map((name) => ({ name, day: "Thursday" })),
    migrationKey: THURSDAY_STARTER_STUDENTS_MIGRATION_KEY
  });

  return (
    materialsChanged ||
    mondayStudentsChanged ||
    tuesdayStudentsChanged ||
    wednesdayStudentsChanged ||
    thursdayStudentsChanged
  );
}

function maybeApplyAllStarterMaterials() {
  const starterGroups = [
    {
      category: FUNDAMENTALS_CATEGORY,
      materials: FUNDAMENTALS_STARTER_MATERIALS,
      migrationKey: FUNDAMENTALS_STARTER_MIGRATION_KEY
    },
    {
      category: ARPEGGIOS_CATEGORY,
      materials: ARPEGGIOS_STARTER_MATERIALS,
      migrationKey: ARPEGGIOS_STARTER_MIGRATION_KEY
    },
    {
      category: FRETBOARD_MEMORIZATION_CATEGORY,
      materials: FRETBOARD_MEMORIZATION_STARTER_MATERIALS,
      migrationKey: FRETBOARD_MEMORIZATION_STARTER_MIGRATION_KEY
    },
    {
      category: SWEEP_PICKING_CATEGORY,
      materials: SWEEP_PICKING_STARTER_MATERIALS,
      migrationKey: SWEEP_PICKING_STARTER_MIGRATION_KEY
    },
    {
      category: STRUMMING_CATEGORY,
      materials: STRUMMING_STARTER_MATERIALS,
      migrationKey: STRUMMING_STARTER_MIGRATION_KEY
    },
    {
      category: SONGS_CATEGORY,
      materials: SONGS_STARTER_MATERIALS,
      migrationKey: SONGS_STARTER_MIGRATION_KEY
    },
    {
      category: RIFFS_CATEGORY,
      materials: RIFFS_STARTER_MATERIALS,
      migrationKey: RIFFS_STARTER_MIGRATION_KEY
    },
    {
      category: RIFFS_CATEGORY,
      materials: RIFFS_STARTER_MATERIALS_PART_2,
      migrationKey: RIFFS_STARTER_MIGRATION_KEY_PART_2
    },
    {
      category: RIFFS_CATEGORY,
      materials: RIFFS_STARTER_MATERIALS_PART_3,
      migrationKey: RIFFS_STARTER_MIGRATION_KEY_PART_3
    },
    {
      category: RIFFS_CATEGORY,
      materials: RIFFS_STARTER_MATERIALS_PART_4,
      migrationKey: RIFFS_STARTER_MIGRATION_KEY_PART_4
    },
    {
      category: TECHNIQUE_EFFICIENCY_SUBCATEGORY,
      materials: TECHNIQUE_EFFICIENCY_STARTER_MATERIALS,
      migrationKey: TECHNIQUE_EFFICIENCY_STARTER_MIGRATION_KEY
    },
    {
      category: TECHNIQUE_PICKING_HAND_SUBCATEGORY,
      materials: TECHNIQUE_PICKING_HAND_STARTER_MATERIALS,
      migrationKey: TECHNIQUE_PICKING_HAND_STARTER_MIGRATION_KEY
    },
    {
      category: TECHNIQUE_FINGER_INDEPENDENCE_SUBCATEGORY,
      materials: TECHNIQUE_FINGER_INDEPENDENCE_STARTER_MATERIALS,
      migrationKey: TECHNIQUE_FINGER_INDEPENDENCE_STARTER_MIGRATION_KEY
    },
    {
      category: TECHNIQUE_LEGATO_SUBCATEGORY,
      materials: TECHNIQUE_LEGATO_STARTER_MATERIALS,
      migrationKey: TECHNIQUE_LEGATO_STARTER_MIGRATION_KEY
    },
    {
      category: TECHNIQUE_TENSION_REDUCTION_SUBCATEGORY,
      materials: TECHNIQUE_TENSION_REDUCTION_STARTER_MATERIALS,
      migrationKey: TECHNIQUE_TENSION_REDUCTION_STARTER_MIGRATION_KEY
    },
    {
      category: TECHNIQUE_TINY_CHUNKS_SUBCATEGORY,
      materials: TECHNIQUE_TINY_CHUNKS_STARTER_MATERIALS,
      migrationKey: TECHNIQUE_TINY_CHUNKS_STARTER_MIGRATION_KEY
    },
    {
      category: TECHNIQUE_PROPER_HAND_POSITION_SUBCATEGORY,
      materials: TECHNIQUE_PROPER_HAND_POSITION_STARTER_MATERIALS,
      migrationKey: TECHNIQUE_PROPER_HAND_POSITION_STARTER_MIGRATION_KEY
    },
    {
      category: TECHNIQUE_VIBRATO_SUBCATEGORY,
      materials: TECHNIQUE_VIBRATO_STARTER_MATERIALS,
      migrationKey: TECHNIQUE_VIBRATO_STARTER_MIGRATION_KEY
    }
  ];

  return starterGroups.reduce((changed, group) => {
    const groupChanged = maybeApplyStarterMaterialsForCategory(group);
    return changed || groupChanged;
  }, false);
}

function maybeApplyStarterMaterialsForCategory({ category, materials, migrationKey }) {
  if (hasMigrationApplied(migrationKey)) {
    return false;
  }

  const categoryKey = normalizeCategory(category).toLowerCase();
  const seenInBatch = new Set();
  let changed = false;

  materials.forEach((materialName) => {
    const normalizedName = normalizeText(materialName);
    if (!normalizedName) {
      return;
    }

    const materialKey = normalizedName.toLowerCase();
    if (seenInBatch.has(materialKey)) {
      return;
    }
    seenInBatch.add(materialKey);

    const exists = state.globalMaterials.some(
      (material) =>
        material.name.toLowerCase() === materialKey &&
        normalizeCategory(material.category).toLowerCase() === categoryKey
    );
    if (exists) {
      return;
    }

    state.globalMaterials.push({
      id: uid("global"),
      name: normalizedName,
      category: normalizeCategory(category)
    });
    changed = true;
  });

  markMigrationApplied(migrationKey);
  return changed;
}

function maybeApplyStarterStudents({ students, migrationKey }) {
  if (hasMigrationApplied(migrationKey)) {
    return false;
  }

  let changed = false;

  students.forEach((entry) => {
    const name = normalizeText(entry?.name);
    if (!name) {
      return;
    }

    const exists = state.students.some((student) => student.name.toLowerCase() === name.toLowerCase());
    if (exists) {
      return;
    }

    const createdStudent = {
      id: uid("student"),
      name,
      day: DAYS.includes(entry?.day) ? entry.day : DAYS[0],
      goals: [],
      songs: [],
      riffs: [],
      notes: "",
      archived: false,
      archivedAt: "",
      customMaterials: [],
      globalGiven: {}
    };

    state.students.push(createdStudent);
    if (!focusedStudentId) {
      focusedStudentId = createdStudent.id;
    }
    changed = true;
  });

  markMigrationApplied(migrationKey);
  return changed;
}

function hasMigrationApplied(migrationKey) {
  try {
    return localStorage.getItem(migrationKey) === "1";
  } catch {
    return false;
  }
}

function markMigrationApplied(migrationKey) {
  try {
    localStorage.setItem(migrationKey, "1");
  } catch {
    // Ignore localStorage write failures for migration markers.
  }
}

function persistAndRender() {
  stateUpdatedAt = new Date().toISOString();
  persistLocalEnvelope();
  render();
  scheduleCloudPush();
}

function persistStateOnly() {
  stateUpdatedAt = new Date().toISOString();
  persistLocalEnvelope();
  scheduleCloudPush();
}

function render() {
  renderAppMeta();
  renderWorkspaceTabs();
  renderCategoryHelpers();
  renderGlobalMaterialList();
  renderStudentsBoard();
  renderSyncStatus();
  renderBackupSummary();
  renderSyncSafetyBanner();
}

function renderAppMeta() {
  if (dom.appVersion instanceof HTMLElement) {
    dom.appVersion.textContent = APP_VERSION;
  }

  if (dom.appRuntime instanceof HTMLElement) {
    const isHosted =
      window.location.protocol.startsWith("http") && window.location.hostname.length > 0;
    dom.appRuntime.textContent = isHosted ? "Hosted Site" : "Local Preview";
  }
}

function renderWorkspaceTabs() {
  const normalizedTab = activeWorkspaceTab === "admin" ? "admin" : "students";
  activeWorkspaceTab = normalizedTab;

  const tabConfig = [
    {
      key: "students",
      button: dom.studentsTabBtn,
      panel: dom.studentsWorkspaceTab
    },
    {
      key: "admin",
      button: dom.adminTabBtn,
      panel: dom.adminWorkspaceTab
    }
  ];

  tabConfig.forEach(({ key, button, panel }) => {
    const isActive = normalizedTab === key;
    if (button instanceof HTMLButtonElement) {
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-selected", isActive ? "true" : "false");
    }
    if (panel instanceof HTMLElement) {
      panel.hidden = !isActive;
      panel.classList.toggle("workspace-page-active", isActive);
    }
  });
}

function renderCategoryHelpers() {
  const inputCategories = getAvailableCategories();
  const quickCategories = getQuickCategories();
  const selectedCategoryKey = normalizeText(selectedGlobalCategory).toLowerCase();
  const selectedStillAvailable =
    selectedCategoryKey.length === 0 ||
    quickCategories.some((category) => normalizeCategory(category).toLowerCase() === selectedCategoryKey);
  if (!selectedStillAvailable) {
    selectedGlobalCategory = "";
    selectedTechniqueSubcategory = "";
    selectedBassSubcategory = "";
  }
  const effectiveSelectedCategoryKey = normalizeText(selectedGlobalCategory).toLowerCase();
  if (effectiveSelectedCategoryKey !== TECHNIQUE_CATEGORY) {
    selectedTechniqueSubcategory = "";
  }
  if (effectiveSelectedCategoryKey !== BASS_CATEGORY) {
    selectedBassSubcategory = "";
  }

  if (dom.materialCategoryOptions instanceof HTMLDataListElement) {
    dom.materialCategoryOptions.innerHTML = inputCategories
      .map((category) => `<option value="${escapeAttribute(category)}"></option>`)
      .join("");
  }

  if (dom.categoryPresetButtons instanceof HTMLElement) {
    dom.categoryPresetButtons.innerHTML = quickCategories
      .map((category) => {
        const isActive =
          effectiveSelectedCategoryKey.length > 0 &&
          normalizeCategory(category).toLowerCase() === effectiveSelectedCategoryKey;
        return `
          <button
            type="button"
            class="chip ${isActive ? "is-active" : ""}"
            data-action="select-global-category"
            data-category="${escapeAttribute(category)}"
          >
            ${escapeHtml(formatCategoryLabel(category))}
          </button>
        `;
      })
      .join("");
  }

  renderTechniqueSubcategoryChips(effectiveSelectedCategoryKey === TECHNIQUE_CATEGORY);
  renderBassSubcategoryChips(effectiveSelectedCategoryKey === BASS_CATEGORY);
}

function renderTechniqueSubcategoryChips(isTechniqueSelected) {
  if (!(dom.techniqueSubcategoryRow instanceof HTMLElement)) {
    return;
  }
  if (!(dom.techniqueSubcategoryButtons instanceof HTMLElement)) {
    return;
  }

  if (!isTechniqueSelected) {
    dom.techniqueSubcategoryRow.classList.add("is-hidden");
    dom.techniqueSubcategoryButtons.innerHTML = "";
    return;
  }

  dom.techniqueSubcategoryRow.classList.remove("is-hidden");
  const selectedSubcategoryKey = normalizeText(selectedTechniqueSubcategory).toLowerCase();
  const allActive = selectedSubcategoryKey.length === 0;
  const allButton = `
    <button
      type="button"
      class="chip ${allActive ? "is-active" : ""}"
      data-action="select-technique-subcategory"
      data-subcategory=""
    >
      All Technique
    </button>
  `;

  const subcategoryButtons = TECHNIQUE_SUBCATEGORY_PRESETS.map((subcategory) => {
    const subcategoryKey = normalizeText(subcategory).toLowerCase();
    const isActive = selectedSubcategoryKey === subcategoryKey;
    return `
      <button
        type="button"
        class="chip ${isActive ? "is-active" : ""}"
        data-action="select-technique-subcategory"
        data-subcategory="${escapeAttribute(subcategory)}"
      >
        ${escapeHtml(subcategory)}
      </button>
    `;
  }).join("");

  dom.techniqueSubcategoryButtons.innerHTML = `${allButton}${subcategoryButtons}`;
}

function renderBassSubcategoryChips(isBassSelected) {
  if (!(dom.bassSubcategoryRow instanceof HTMLElement)) {
    return;
  }
  if (!(dom.bassSubcategoryButtons instanceof HTMLElement)) {
    return;
  }

  if (!isBassSelected) {
    dom.bassSubcategoryRow.classList.add("is-hidden");
    dom.bassSubcategoryButtons.innerHTML = "";
    return;
  }

  dom.bassSubcategoryRow.classList.remove("is-hidden");
  const selectedSubcategoryKey = normalizeText(selectedBassSubcategory).toLowerCase();
  const allActive = selectedSubcategoryKey.length === 0;
  const allButton = `
    <button
      type="button"
      class="chip ${allActive ? "is-active" : ""}"
      data-action="select-bass-subcategory"
      data-subcategory=""
    >
      All Bass
    </button>
  `;

  const subcategoryButtons = BASS_SUBCATEGORY_PRESETS.map((subcategory) => {
    const subcategoryKey = normalizeText(subcategory).toLowerCase();
    const isActive = selectedSubcategoryKey === subcategoryKey;
    return `
      <button
        type="button"
        class="chip ${isActive ? "is-active" : ""}"
        data-action="select-bass-subcategory"
        data-subcategory="${escapeAttribute(subcategory)}"
      >
        ${escapeHtml(subcategory)}
      </button>
    `;
  }).join("");

  dom.bassSubcategoryButtons.innerHTML = `${allButton}${subcategoryButtons}`;
}

function formatCategoryLabel(value) {
  return normalizeCategory(value)
    .split(/\s+/)
    .map((part) =>
      part
        .split("-")
        .map((token) => {
          const lowered = token.toLowerCase();
          return lowered ? `${lowered[0].toUpperCase()}${lowered.slice(1)}` : "";
        })
        .join("-")
    )
    .join(" ");
}

function getAvailableCategories() {
  const categories = [];
  const seen = new Set();

  const addCategory = (value) => {
    const normalized = normalizeCategory(value);
    const key = normalized.toLowerCase();
    if (seen.has(key)) {
      return;
    }
    seen.add(key);
    categories.push(normalized);
  };

  getQuickCategories().forEach((category) => addCategory(category));
  TECHNIQUE_SUBCATEGORY_PRESETS.forEach((subcategory) =>
    addCategory(getTechniqueSubcategoryCategory(subcategory))
  );
  BASS_SUBCATEGORY_PRESETS.forEach((subcategory) =>
    addCategory(getBassSubcategoryCategory(subcategory))
  );
  state.globalMaterials.forEach((material) => addCategory(material.category));

  return categories.sort((left, right) =>
    left.localeCompare(right, undefined, { sensitivity: "base" })
  );
}

function getQuickCategories() {
  const categories = [];
  const seen = new Set();

  const addCategory = (value) => {
    const normalized = normalizeCategory(value);
    const key = normalized.toLowerCase();
    if (seen.has(key)) {
      return;
    }
    seen.add(key);
    categories.push(normalized);
  };

  CATEGORY_PRESETS.forEach((category) => addCategory(category));
  state.globalMaterials.forEach((material) => addCategory(getCategoryRoot(material.category)));

  return categories;
}

function getTechniqueSubcategoryCategory(subcategory) {
  const normalizedSubcategory = normalizeText(subcategory);
  if (!normalizedSubcategory) {
    return TECHNIQUE_CATEGORY;
  }
  return `${TECHNIQUE_CATEGORY} / ${normalizedSubcategory}`;
}

function getBassSubcategoryCategory(subcategory) {
  const normalizedSubcategory = normalizeText(subcategory);
  if (!normalizedSubcategory) {
    return BASS_CATEGORY;
  }
  return `${BASS_CATEGORY} / ${normalizedSubcategory}`;
}

function extractTechniqueSubcategoryKey(categoryValue) {
  return extractNestedSubcategoryKey(TECHNIQUE_CATEGORY, categoryValue);
}

function extractBassSubcategoryKey(categoryValue) {
  return extractNestedSubcategoryKey(BASS_CATEGORY, categoryValue);
}

function extractNestedSubcategoryKey(rootCategory, categoryValue) {
  const normalized = normalizeCategory(categoryValue).toLowerCase();
  if (!normalized.startsWith(rootCategory)) {
    return "";
  }

  const remainder = normalized.slice(rootCategory.length);
  if (!remainder) {
    return "";
  }

  const trimmed = remainder.trimStart();
  if (!trimmed.startsWith("/") && !trimmed.startsWith("-") && !trimmed.startsWith(":")) {
    return "";
  }

  return trimmed.replace(/^[/:\-\s]+/, "").trim();
}

function getCategoryRoot(categoryValue) {
  return splitNestedCategory(categoryValue).root;
}

function getSelectedGlobalMaterialCategoryValue() {
  const selectedCategoryKey = normalizeText(selectedGlobalCategory).toLowerCase();
  if (selectedCategoryKey === TECHNIQUE_CATEGORY && selectedTechniqueSubcategory) {
    return getTechniqueSubcategoryCategory(selectedTechniqueSubcategory);
  }
  if (selectedCategoryKey === BASS_CATEGORY && selectedBassSubcategory) {
    return getBassSubcategoryCategory(selectedBassSubcategory);
  }
  return selectedGlobalCategory;
}

function isSpecificSelectedGlobalMaterialSubcategory() {
  const selectedCategoryKey = normalizeText(selectedGlobalCategory).toLowerCase();
  if (selectedCategoryKey === TECHNIQUE_CATEGORY) {
    return normalizeText(selectedTechniqueSubcategory).length > 0;
  }
  if (selectedCategoryKey === BASS_CATEGORY) {
    return normalizeText(selectedBassSubcategory).length > 0;
  }
  return false;
}

function getSelectedGlobalMaterialEntries() {
  if (!selectedGlobalCategory) {
    return [];
  }

  const selectedCategoryKey = normalizeText(selectedGlobalCategory).toLowerCase();
  const selectedSubcategoryKey = normalizeText(selectedTechniqueSubcategory).toLowerCase();
  const selectedBassSubcategoryKey = normalizeText(selectedBassSubcategory).toLowerCase();

  return state.globalMaterials.filter((material) => {
    const materialRootKey = getCategoryRoot(material.category).toLowerCase();
    if (selectedCategoryKey === TECHNIQUE_CATEGORY) {
      if (materialRootKey !== TECHNIQUE_CATEGORY) {
        return false;
      }
      if (!selectedSubcategoryKey) {
        return true;
      }
      return extractTechniqueSubcategoryKey(material.category) === selectedSubcategoryKey;
    }
    if (selectedCategoryKey === BASS_CATEGORY) {
      if (materialRootKey !== BASS_CATEGORY) {
        return false;
      }
      if (!selectedBassSubcategoryKey) {
        return true;
      }
      return extractBassSubcategoryKey(material.category) === selectedBassSubcategoryKey;
    }

    return materialRootKey === selectedCategoryKey;
  });
}

function getSelectedGlobalMaterialLabel() {
  const selectedCategoryKey = normalizeText(selectedGlobalCategory).toLowerCase();
  const selectedSubcategoryKey = normalizeText(selectedTechniqueSubcategory).toLowerCase();
  const selectedBassSubcategoryKey = normalizeText(selectedBassSubcategory).toLowerCase();

  if (selectedCategoryKey === TECHNIQUE_CATEGORY && selectedSubcategoryKey) {
    return getTechniqueSubcategoryCategory(selectedTechniqueSubcategory);
  }
  if (selectedCategoryKey === BASS_CATEGORY && selectedBassSubcategoryKey) {
    return getBassSubcategoryCategory(selectedBassSubcategory);
  }
  return normalizeCategory(selectedGlobalCategory);
}

function renderSyncStatus() {
  if (!dom.syncStatus || !dom.syncNowBtn) {
    return;
  }

  dom.syncStatus.textContent = syncStatus;
  dom.syncNowBtn.disabled = !isSyncConfigured() || syncInFlight;
  dom.syncNowBtn.textContent = syncInFlight ? "Syncing..." : "Sync Now";
}

function renderSyncSafetyBanner() {
  if (!(dom.syncSafetyBanner instanceof HTMLElement)) {
    return;
  }

  if (!syncSafetyNotice?.message) {
    dom.syncSafetyBanner.hidden = true;
    dom.syncSafetyBanner.className = "sync-safety-banner";
    dom.syncSafetyBanner.innerHTML = "";
    return;
  }

  dom.syncSafetyBanner.hidden = false;
  dom.syncSafetyBanner.className = `sync-safety-banner is-${syncSafetyNotice.tone || "warning"}`;
  dom.syncSafetyBanner.innerHTML = `
    <div class="sync-safety-copy">
      <strong>Safety check</strong>
      <span>${escapeHtml(syncSafetyNotice.message)}</span>
    </div>
    <button
      type="button"
      class="ghost sync-safety-dismiss"
      data-action="dismiss-sync-safety-banner"
    >
      Dismiss
    </button>
  `;
}

function renderBackupSummary() {
  if (!(dom.backupSummary instanceof HTMLElement)) {
    return;
  }

  dom.backupSummary.textContent = backupSummary;
}

function renderGlobalMaterialList() {
  if (!selectedGlobalCategory) {
    dom.globalMaterialList.innerHTML = `
      <li class="empty">
        Select a category in Quick categories to view system material.
      </li>
    `;
    return;
  }

  const selectedGroupEntries = getSelectedGlobalMaterialEntries();

  if (selectedGroupEntries.length === 0) {
    dom.globalMaterialList.innerHTML = `
      <li class="empty">
        No material is saved in ${escapeHtml(getSelectedGlobalMaterialLabel())} yet.
      </li>
    `;
    return;
  }

  const grouped = groupMaterialsByCategory(selectedGroupEntries);

  dom.globalMaterialList.innerHTML = grouped
    .map((group) => `
      <li class="category-group">
        <p class="category-title">${escapeHtml(group.category)}</p>
        <ul class="mini-list">
          ${group.entries.map((material) => `
            <li class="mini-row">
              <span>${escapeHtml(material.name)}</span>
              <button type="button" class="danger" data-action="remove-global-material" data-material-id="${material.id}">
                Delete
              </button>
            </li>
          `).join("")}
        </ul>
      </li>
    `)
    .join("");
}

function renderStudentsBoard() {
  const sortedStudents = getStudentsInDisplayOrder();
  const archivedStudents = getStudentsInDisplayOrder(true).filter((student) => student.archived);

  if (sortedStudents.length === 0) {
    focusedStudentId = "";
    renderStudentFocusSelect([], "");
    dom.studentsBoard.innerHTML = `
      <p class="empty">${
        archivedStudents.length
          ? "No active students right now."
          : "No students yet. Open Admin Tools to add your first student."
      }</p>
      ${archivedStudents.length
        ? ""
        : `
          <div class="actions">
            <button type="button" class="ghost" data-action="switch-workspace-tab" data-tab="admin">
              Open Admin Tools
            </button>
          </div>
        `}
      ${renderArchivedStudentsSection(archivedStudents)}
    `;
    return;
  }

  const focusedStudent = resolveFocusedStudent(sortedStudents);
  renderStudentFocusSelect(sortedStudents, focusedStudent.id);
  dom.studentsBoard.innerHTML = `
    ${renderStudentCard(focusedStudent, true)}
    ${renderArchivedStudentsSection(archivedStudents)}
  `;
}

function getStudentsInDisplayOrder(includeArchived = false) {
  const students = includeArchived
    ? [...state.students]
    : state.students.filter((student) => !student.archived);
  if (state.sortMode === "name") {
    return students.sort(compareStudentNames);
  }
  return students.sort(compareByDayThenName);
}

function compareByDayThenName(left, right) {
  const dayDelta = DAYS.indexOf(left.day) - DAYS.indexOf(right.day);
  if (dayDelta !== 0) {
    return dayDelta;
  }
  return compareStudentNames(left, right);
}

function resolveFocusedStudent(sortedStudents) {
  const currentLessonDay = getCurrentLessonDay();
  const focused =
    sortedStudents.find((student) => student.id === focusedStudentId) ??
    (currentLessonDay
      ? sortedStudents.find((student) => student.day === currentLessonDay)
      : null) ??
    sortedStudents[0];
  focusedStudentId = focused.id;
  return focused;
}

function getCurrentLessonDay() {
  const currentDayIndex = new Date().getDay();
  if (currentDayIndex < 1 || currentDayIndex > 4) {
    return null;
  }

  return DAYS[currentDayIndex - 1] ?? null;
}

function renderStudentFocusSelect(students, selectedStudentId) {
  if (!(dom.studentFocusSelect instanceof HTMLSelectElement)) {
    return;
  }

  if (students.length === 0) {
    dom.studentFocusSelect.innerHTML = `<option value="">No students yet</option>`;
    dom.studentFocusSelect.disabled = true;
    return;
  }

  dom.studentFocusSelect.disabled = false;
  dom.studentFocusSelect.innerHTML = students
    .map((student) => {
      const label =
        state.sortMode === "day"
          ? `${student.day} - ${student.name}`
          : `${student.name} (${student.day})`;
      const selected = student.id === selectedStudentId ? "selected" : "";
      return `<option value="${escapeAttribute(student.id)}" ${selected}>${escapeHtml(label)}</option>`;
    })
    .join("");
}

function renderArchivedStudentsSection(students) {
  if (!students.length) {
    return "";
  }

  return `
    <details class="archived-students">
      <summary>Archived Students (${students.length})</summary>
      <ul class="mini-list archived-students-list">
        ${students.map((student) => `
          <li class="mini-row archived-student-row">
            <div class="archived-student-meta">
              <span class="archived-student-name">${escapeHtml(student.name)}</span>
              <span class="archived-student-detail">
                ${escapeHtml(student.day)}${student.archivedAt ? ` • Archived ${escapeHtml(formatArchivedDate(student.archivedAt))}` : ""}
              </span>
            </div>
            <div class="actions">
              <button
                type="button"
                class="ghost"
                data-action="restore-student"
                data-student-id="${student.id}"
              >
                Restore
              </button>
              <button
                type="button"
                class="danger"
                data-action="delete-student"
                data-student-id="${student.id}"
              >
                Delete
              </button>
            </div>
          </li>
        `).join("")}
      </ul>
    </details>
  `;
}

function formatArchivedDate(value) {
  const parsedMs = Date.parse(value);
  if (!Number.isFinite(parsedMs)) {
    return "";
  }

  return new Date(parsedMs).toLocaleDateString([], {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}

function getStudentGoalsByTerm(student, term) {
  const normalizedTerm = normalizeGoalTerm(term);
  return student.goals.filter(
    (goal) => !goal.met && normalizeGoalTerm(goal.term) === normalizedTerm
  );
}

function getGoalTermHeading(term) {
  return normalizeGoalTerm(term) === LONG_TERM_GOAL ? "Long Term Goals" : "Short Term Goals";
}

function getGoalTermLabel(term) {
  return normalizeGoalTerm(term) === LONG_TERM_GOAL ? "Long Term" : "Short Term";
}

function getGoalMoveLabel(term) {
  return normalizeGoalTerm(term) === LONG_TERM_GOAL
    ? "Move to Long Term"
    : "Move to Short Term";
}

function getCompletedStudentGoals(student) {
  return student.goals.filter((goal) => goal.met);
}

function renderGoalRow(student, goal, { showMoveButton = true, showTermBadge = false } = {}) {
  const goalInputId = `goal-met-${student.id}-${goal.id}`;
  const nextGoalTerm =
    normalizeGoalTerm(goal.term) === LONG_TERM_GOAL ? SHORT_TERM_GOAL : LONG_TERM_GOAL;

  return `
    <li class="mini-row goal-row ${goal.met ? "completed" : ""}">
      <div class="goal-main">
        <input
          id="${escapeAttribute(goalInputId)}"
          type="checkbox"
          data-action="toggle-goal-met"
          data-student-id="${student.id}"
          data-goal-id="${goal.id}"
          ${goal.met ? "checked" : ""}
        />
        <div class="goal-text-wrap">
          <label for="${escapeAttribute(goalInputId)}">${escapeHtml(goal.text)}</label>
          ${
            showTermBadge
              ? `<span class="goal-term-badge">${escapeHtml(getGoalTermLabel(goal.term))}</span>`
              : ""
          }
        </div>
      </div>
      <div class="actions mini-row-actions">
        <button
          type="button"
          class="ghost"
          data-action="edit-goal"
          data-student-id="${student.id}"
          data-goal-id="${goal.id}"
        >
          Edit
        </button>
        ${
          showMoveButton
            ? `
              <button
                type="button"
                class="ghost"
                data-action="move-goal-term"
                data-student-id="${student.id}"
                data-goal-id="${goal.id}"
                data-next-goal-term="${escapeAttribute(nextGoalTerm)}"
              >
                ${escapeHtml(getGoalMoveLabel(nextGoalTerm))}
              </button>
            `
            : ""
        }
        <button
          type="button"
          class="danger"
          data-action="delete-goal"
          data-student-id="${student.id}"
          data-goal-id="${goal.id}"
        >
          Remove
        </button>
      </div>
    </li>
  `;
}

function renderGoalTermSection(student, goals, term) {
  const normalizedTerm = normalizeGoalTerm(term);
  const goalItems = goals.length
    ? goals.map((goal) => renderGoalRow(student, goal)).join("")
    : `<li class="empty">No ${normalizedTerm === LONG_TERM_GOAL ? "long" : "short"} term goals added.</li>`;

  return `
    <div class="goal-term-block">
      <h5 class="goal-term-title">${escapeHtml(getGoalTermHeading(normalizedTerm))}</h5>
      <ul class="mini-list">${goalItems}</ul>
      <form
        class="small-form"
        data-action="add-goal"
        data-student-id="${student.id}"
        data-goal-term="${escapeAttribute(normalizedTerm)}"
      >
        <input
          type="text"
          name="goalText"
          maxlength="120"
          placeholder="Add ${escapeAttribute(normalizedTerm === LONG_TERM_GOAL ? "long" : "short")} term goal..."
          required
        />
        <button type="submit">Add</button>
      </form>
    </div>
  `;
}

function renderCompletedGoalsSection(student, goals) {
  const goalItems = goals.length
    ? goals.map((goal) => renderGoalRow(student, goal, { showTermBadge: true })).join("")
    : `<li class="empty">No completed goals yet.</li>`;

  return `
    <div class="goal-term-block">
      <h5 class="goal-term-title">Completed Goals</h5>
      <ul class="mini-list">${goalItems}</ul>
    </div>
  `;
}

function renderStudentCard(student, focusedView = false) {
  const shortTermGoals = getStudentGoalsByTerm(student, SHORT_TERM_GOAL);
  const longTermGoals = getStudentGoalsByTerm(student, LONG_TERM_GOAL);
  const completedGoals = getCompletedStudentGoals(student);

  const songItems = student.songs.length
    ? student.songs.map((song) => `
        <li class="mini-row">
          <span>${escapeHtml(song.text)}</span>
          <div class="actions mini-row-actions">
            <button type="button" class="ghost" data-action="edit-song" data-student-id="${student.id}" data-song-id="${song.id}">
              Edit
            </button>
            <button type="button" class="danger" data-action="delete-song" data-student-id="${student.id}" data-song-id="${song.id}">
              Remove
            </button>
          </div>
        </li>
      `).join("")
    : `<li class="empty">No songs logged.</li>`;
  const riffItems = student.riffs.length
    ? student.riffs.map((riff) => `
        <li class="mini-row">
          <span>${escapeHtml(riff.text)}</span>
          <div class="actions mini-row-actions">
            <button type="button" class="ghost" data-action="edit-riff" data-student-id="${student.id}" data-riff-id="${riff.id}">
              Edit
            </button>
            <button type="button" class="danger" data-action="delete-riff" data-student-id="${student.id}" data-riff-id="${riff.id}">
              Remove
            </button>
          </div>
        </li>
      `).join("")
    : `<li class="empty">No riffs logged.</li>`;

  const materialDisplayGroups = state.globalMaterials.length
    ? groupMaterialsForDisplay(state.globalMaterials)
    : [];
  const validExpandedMaterialKeys = new Set();
  materialDisplayGroups.forEach((group) => {
    if (group.type === "nested") {
      validExpandedMaterialKeys.add(getStudentMaterialRootToggleKey(group.rootCategory));
      group.subgroups.forEach((subcategoryGroup) =>
        validExpandedMaterialKeys.add(getStudentMaterialCategoryToggleKey(subcategoryGroup.category))
      );
      return;
    }

    validExpandedMaterialKeys.add(getStudentMaterialCategoryToggleKey(group.category));
  });
  const expandedMaterialCategories = getExpandedStudentMaterialCategories(
    student.id,
    validExpandedMaterialKeys
  );
  const globalMaterialItems = materialDisplayGroups.length
    ? materialDisplayGroups.map((group) =>
      group.type === "nested"
        ? renderStudentNestedMaterialGroup(student, group, expandedMaterialCategories)
        : renderStudentMaterialGroup(
            student,
            group.category,
            group.label,
            group.entries,
            expandedMaterialCategories
          )
    ).join("")
    : `<p class="empty">No system material yet.</p>`;

  const cardClass = focusedView ? "student-card focused-card" : "student-card";
  const gridClass = focusedView ? "student-grid focused-grid" : "student-grid";
  const studentActions = `
    <button
      type="button"
      class="ghost"
      data-action="edit-student"
      data-student-id="${student.id}"
    >
      Edit Student
    </button>
    <button
      type="button"
      class="ghost"
      data-action="archive-student"
      data-student-id="${student.id}"
    >
      Archive Student
    </button>
    <button type="button" class="danger" data-action="delete-student" data-student-id="${student.id}">
      Delete Student
    </button>
  `;
  const goalsSection = `
    <section class="sub-card compact-card">
      <h4>Goals</h4>
      <div class="goal-term-stack">
        ${renderGoalTermSection(student, shortTermGoals, SHORT_TERM_GOAL)}
        ${renderGoalTermSection(student, longTermGoals, LONG_TERM_GOAL)}
        ${renderCompletedGoalsSection(student, completedGoals)}
      </div>
    </section>
  `;
  const songsSection = `
    <section class="sub-card compact-card">
      <h4>Songs Learned</h4>
      <ul class="mini-list">${songItems}</ul>
      <form class="small-form" data-action="add-song" data-student-id="${student.id}">
        <input type="text" name="songText" maxlength="120" placeholder="Add song..." required />
        <button type="submit">Add</button>
      </form>
    </section>
  `;
  const riffsSection = `
    <section class="sub-card compact-card">
      <h4>Riffs Learned</h4>
      <ul class="mini-list">${riffItems}</ul>
      <form class="small-form" data-action="add-riff" data-student-id="${student.id}">
        <input type="text" name="riffText" maxlength="120" placeholder="Add riff..." required />
        <button type="submit">Add</button>
      </form>
    </section>
  `;
  const notesSection = `
    <section class="sub-card notes-card">
      <div class="section-head">
        <h4>Notes</h4>
        <p class="muted notes-hint">Autosaves while you type.</p>
      </div>
      <textarea
        class="notes-field"
        data-action="update-student-notes"
        data-student-id="${student.id}"
        rows="6"
        maxlength="4000"
        placeholder="Lesson notes, reminders, progress, assignments..."
      >${escapeHtml(student.notes ?? "")}</textarea>
    </section>
  `;
  const standardMaterialSection = `
    <section class="sub-card material-card">
      <h4>Practice Material</h4>
      <p class="muted">Click a category to expand its material.</p>
      <div class="material-list">${globalMaterialItems}</div>
      <div class="actions">
        <button type="button" class="danger" data-action="clear-student-material" data-student-id="${student.id}">
          Clear Student Material
        </button>
      </div>
    </section>
  `;
  const focusedMaterialSection = `
    <section class="sub-card material-card focused-material-card">
      <h4>Practice Material</h4>
      <p class="muted">Click a category to expand its material.</p>
      <div class="material-list">${globalMaterialItems}</div>
      <div class="actions">
        <button type="button" class="danger" data-action="clear-student-material" data-student-id="${student.id}">
          Clear Student Material
        </button>
      </div>
    </section>
  `;
  const materialSection = focusedView ? focusedMaterialSection : standardMaterialSection;
  const gridBody = focusedView
    ? `
      <div class="summary-row">
        ${goalsSection}
        <div class="summary-stack">
          ${songsSection}
          ${riffsSection}
        </div>
      </div>
      ${notesSection}
      ${materialSection}
    `
    : `
      ${goalsSection}
      ${songsSection}
      ${riffsSection}
      ${notesSection}
      ${materialSection}
    `;
  const studentHead = focusedView
    ? `
      <div class="student-head student-head-simple">
        <div class="student-head-main">
          <h3 class="student-focus-name">${escapeHtml(student.name)}</h3>
        </div>
        <div class="actions student-head-actions">
          ${studentActions}
        </div>
      </div>
    `
    : `
      <div class="student-head">
        <div class="student-head-main">
          <h3 class="student-focus-name">${escapeHtml(student.name)}</h3>
          <p class="muted student-focus-day">${escapeHtml(student.day)}</p>
        </div>
        <div class="actions student-head-actions">
          ${studentActions}
        </div>
      </div>
    `;

  return `
    <article class="${cardClass}">
      ${studentHead}
      <div class="${gridClass}">${gridBody}</div>
    </article>
  `;
}

function handleSubmit(event) {
  const form = event.target;
  if (!(form instanceof HTMLFormElement)) {
    return;
  }

  if (form.id === "addStudentForm") {
    event.preventDefault();
    const formData = new FormData(form);
    const name = normalizeText(formData.get("studentName"));
    const day = formData.get("studentDay");
    if (!name || !DAYS.includes(day)) {
      return;
    }
    const createdStudent = {
      id: uid("student"),
      name,
      day,
      goals: [],
      songs: [],
      notes: "",
      archived: false,
      archivedAt: "",
      customMaterials: [],
      globalGiven: {}
    };
    state.students.push(createdStudent);
    focusedStudentId = createdStudent.id;
    form.reset();
    form.elements.studentDay.value = DAYS[0];
    persistAndRender();
    return;
  }

  if (form.id === "addGlobalMaterialForm") {
    event.preventDefault();
    const formData = new FormData(form);
    const name = normalizeText(formData.get("materialName"));
    const category = normalizeCategory(formData.get("materialCategory"));
    if (!name) {
      return;
    }

    const existing = state.globalMaterials.some(
      (material) =>
        material.name.toLowerCase() === name.toLowerCase() &&
        normalizeCategory(material.category).toLowerCase() === category.toLowerCase()
    );
    if (existing) {
      alert("That material already exists in that category.");
      return;
    }

    state.globalMaterials.push({ id: uid("global"), name, category });
    form.reset();
    persistAndRender();
    return;
  }

  const action = form.dataset.action;
  const studentId = form.dataset.studentId;
  if (!action || !studentId) {
    return;
  }

  const student = getStudent(studentId);
  if (!student) {
    return;
  }

  if (action === "add-goal") {
    event.preventDefault();
    const goalText = normalizeText(new FormData(form).get("goalText"));
    const goalTerm = normalizeGoalTerm(form.dataset.goalTerm, SHORT_TERM_GOAL);
    if (!goalText) {
      return;
    }

    if (student.goals.some((goal) => goal.text.toLowerCase() === goalText.toLowerCase())) {
      alert("That goal already exists for this student.");
      return;
    }

    student.goals.push({ id: uid("goal"), text: goalText, met: false, term: goalTerm });
    form.reset();
    persistAndRender();
    return;
  }

  if (action === "add-song") {
    event.preventDefault();
    const songText = normalizeText(new FormData(form).get("songText"));
    if (!songText) {
      return;
    }

    if (student.songs.some((song) => song.text.toLowerCase() === songText.toLowerCase())) {
      alert("That song is already listed for this student.");
      return;
    }

    student.songs.push({ id: uid("song"), text: songText });
    form.reset();
    persistAndRender();
    return;
  }

  if (action === "add-riff") {
    event.preventDefault();
    const riffText = normalizeText(new FormData(form).get("riffText"));
    if (!riffText) {
      return;
    }

    if (student.riffs.some((riff) => riff.text.toLowerCase() === riffText.toLowerCase())) {
      alert("That riff is already listed for this student.");
      return;
    }

    student.riffs.push({ id: uid("riff"), text: riffText });
    form.reset();
    persistAndRender();
    return;
  }
}

function handleClick(event) {
  const target = event.target;
  if (!(target instanceof HTMLElement)) {
    return;
  }

  if (target.id === "exportBackupBtn") {
    const record = buildBackupRecord({
      envelope: {
        updatedAt: stateUpdatedAt || new Date().toISOString(),
        data: state
      },
      source: "manual-export"
    });
    downloadBackupRecord(record, "student-lesson-tracker-backup");
    setBackupStatus(
      `Exported full backup with ${record.envelope.data.students.length} students and ${record.envelope.data.globalMaterials.length} system items.`,
      "success"
    );
    return;
  }

  if (target.id === "downloadLatestAutoBackupBtn") {
    void downloadLatestAutoBackup();
    return;
  }

  if (target.id === "importBackupBtn") {
    void importBackupFile();
    return;
  }

  if (target.id === "syncNowBtn") {
    void syncNow();
    return;
  }

  if (target.id === "importSpreadsheetBtn") {
    void importSpreadsheetFile();
    return;
  }

  if (target.id === "syncMaterialFolderBtn") {
    void syncMaterialFolderFiles();
    return;
  }

  if (target.id === "clearGlobalMaterialsBtn") {
    if (!state.globalMaterials.length) {
      return;
    }
    if (!confirm("Delete all system material for every student?")) {
      return;
    }
    state.globalMaterials = [];
    state.students.forEach((student) => {
      student.globalGiven = {};
    });
    persistAndRender();
    return;
  }

  if (target.id === "deleteSelectedCategoryBtn") {
    const selectedCategoryLabel = getSelectedGlobalMaterialLabel();
    if (!selectedGlobalCategory) {
      setImportStatus("Select a category in Quick categories first.", "error");
      return;
    }

    const selectedEntries = getSelectedGlobalMaterialEntries();
    if (!selectedEntries.length) {
      setImportStatus(`No system material found in ${selectedCategoryLabel}.`, "error");
      return;
    }

    const itemCount = selectedEntries.length;
    const hasNestedSubcategories =
      !isSpecificSelectedGlobalMaterialSubcategory() &&
      selectedEntries.some((material) => splitNestedCategory(material.category).subcategory);
    const nestedMessage = hasNestedSubcategories
      ? " This also deletes nested subcategories inside that category."
      : "";
    const confirmMessage =
      `Delete ${itemCount} system material item${itemCount === 1 ? "" : "s"} from ${selectedCategoryLabel}?` +
      `${nestedMessage} This will also clear those checkmarks for every student.`;

    if (!confirm(confirmMessage)) {
      return;
    }

    const removedCount = removeGlobalMaterialsByIds(
      new Set(selectedEntries.map((material) => material.id))
    );
    if (!removedCount) {
      setImportStatus(`No system material found in ${selectedCategoryLabel}.`, "error");
      return;
    }

    persistAndRender();
    setImportStatus(
      `Deleted ${removedCount} item${removedCount === 1 ? "" : "s"} from ${selectedCategoryLabel}.`,
      "success"
    );
    return;
  }

  if (target.id === "moveUncategorizedToSongsBtn") {
    const movedCount = moveUncategorizedGlobalMaterialToSongs();
    if (movedCount === 0) {
      setImportStatus("No Uncategorized system material found to move.", "error");
      return;
    }
    persistAndRender();
    setImportStatus(
      `Moved ${movedCount} Uncategorized item${movedCount === 1 ? "" : "s"} to Songs.`,
      "success"
    );
    return;
  }

  if (target.id === "moveSelectedCategoryToSongsBtn") {
    const selectedCategory = normalizeText(getSelectedGlobalMaterialCategoryValue());
    if (!selectedCategory) {
      setImportStatus("Select a category in Quick categories first.", "error");
      return;
    }
    if (normalizeCategory(selectedCategory).toLowerCase() === SONGS_CATEGORY) {
      setImportStatus("Songs is already selected.", "error");
      return;
    }
    const movedCount = moveCategoryGlobalMaterialToSongs(selectedCategory);
    if (movedCount === 0) {
      setImportStatus(`No system material found in ${selectedCategory}.`, "error");
      return;
    }
    selectedGlobalCategory = SONGS_CATEGORY;
    selectedTechniqueSubcategory = "";
    selectedBassSubcategory = "";
    persistAndRender();
    setImportStatus(
      `Moved ${movedCount} item${movedCount === 1 ? "" : "s"} from ${selectedCategory} to Songs.`,
      "success"
    );
    return;
  }

  if (target.id === "clearAllStudentMaterialBtn") {
    if (!state.students.length) {
      return;
    }
    if (!confirm("Clear all checked material for every student?")) {
      return;
    }
    state.students.forEach((student) => {
      student.customMaterials = [];
      student.globalGiven = {};
    });
    persistAndRender();
    return;
  }

  const actionElement = target.closest("[data-action]");
  if (!(actionElement instanceof HTMLElement)) {
    return;
  }

  const action = actionElement.dataset.action;
  if (!action) {
    return;
  }

  if (action === "dismiss-sync-safety-banner") {
    setSyncSafetyNotice("");
    return;
  }

  if (action === "switch-workspace-tab") {
    activeWorkspaceTab = actionElement.dataset.tab === "admin" ? "admin" : "students";
    renderWorkspaceTabs();
    return;
  }

  if (action === "select-global-category") {
    const nextCategory = normalizeCategory(actionElement.dataset.category);
    const currentKey = normalizeText(selectedGlobalCategory).toLowerCase();
    const nextKey = nextCategory.toLowerCase();
    if (currentKey === nextKey) {
      selectedGlobalCategory = "";
      selectedTechniqueSubcategory = "";
      selectedBassSubcategory = "";
    } else {
      selectedGlobalCategory = nextCategory;
      if (nextKey !== TECHNIQUE_CATEGORY) {
        selectedTechniqueSubcategory = "";
      }
      if (nextKey !== BASS_CATEGORY) {
        selectedBassSubcategory = "";
      }
    }

    const categoryInput = dom.addGlobalMaterialForm?.elements?.namedItem("materialCategory");
    if (categoryInput instanceof HTMLInputElement && selectedGlobalCategory) {
      categoryInput.value = getSelectedGlobalMaterialCategoryValue();
    }
    renderCategoryHelpers();
    renderGlobalMaterialList();
    return;
  }

  if (action === "select-technique-subcategory") {
    const nextSubcategory = normalizeText(actionElement.dataset.subcategory);
    if (normalizeText(selectedGlobalCategory).toLowerCase() !== TECHNIQUE_CATEGORY) {
      selectedGlobalCategory = TECHNIQUE_CATEGORY;
    }
    selectedBassSubcategory = "";

    if (!nextSubcategory) {
      selectedTechniqueSubcategory = "";
    } else {
      const currentSubcategoryKey = normalizeText(selectedTechniqueSubcategory).toLowerCase();
      const nextSubcategoryKey = nextSubcategory.toLowerCase();
      selectedTechniqueSubcategory =
        currentSubcategoryKey === nextSubcategoryKey ? "" : nextSubcategory;
    }

    const categoryInput = dom.addGlobalMaterialForm?.elements?.namedItem("materialCategory");
    if (categoryInput instanceof HTMLInputElement) {
      categoryInput.value = getSelectedGlobalMaterialCategoryValue();
    }

    renderCategoryHelpers();
    renderGlobalMaterialList();
    return;
  }

  if (action === "select-bass-subcategory") {
    const nextSubcategory = normalizeText(actionElement.dataset.subcategory);
    if (normalizeText(selectedGlobalCategory).toLowerCase() !== BASS_CATEGORY) {
      selectedGlobalCategory = BASS_CATEGORY;
    }
    selectedTechniqueSubcategory = "";

    if (!nextSubcategory) {
      selectedBassSubcategory = "";
    } else {
      const currentSubcategoryKey = normalizeText(selectedBassSubcategory).toLowerCase();
      const nextSubcategoryKey = nextSubcategory.toLowerCase();
      selectedBassSubcategory =
        currentSubcategoryKey === nextSubcategoryKey ? "" : nextSubcategory;
    }

    const categoryInput = dom.addGlobalMaterialForm?.elements?.namedItem("materialCategory");
    if (categoryInput instanceof HTMLInputElement) {
      categoryInput.value = getSelectedGlobalMaterialCategoryValue();
    }

    renderCategoryHelpers();
    renderGlobalMaterialList();
    return;
  }

  if (action === "remove-global-material") {
    const materialId = actionElement.dataset.materialId;
    if (!materialId) {
      return;
    }
    state.globalMaterials = state.globalMaterials.filter((material) => material.id !== materialId);
    state.students.forEach((student) => {
      delete student.globalGiven[materialId];
    });
    persistAndRender();
    return;
  }

  const studentId = actionElement.dataset.studentId;
  if (!studentId) {
    return;
  }
  const student = getStudent(studentId);
  if (!student) {
    return;
  }

  if (action === "toggle-student-material-category") {
    const category = normalizeText(actionElement.dataset.category);
    if (!category) {
      return;
    }
    const currentCategories = Array.isArray(expandedStudentMaterialCategories[student.id])
      ? expandedStudentMaterialCategories[student.id]
      : [];
    const toggleKey = getStudentMaterialCategoryToggleKey(category);
    expandedStudentMaterialCategories[student.id] = currentCategories.includes(toggleKey)
      ? currentCategories.filter((entry) => entry !== toggleKey)
      : [...currentCategories, toggleKey];
    renderStudentsBoard();
    return;
  }

  if (action === "toggle-student-material-root") {
    const categoryRoot = normalizeText(actionElement.dataset.categoryRoot);
    if (!categoryRoot) {
      return;
    }
    const currentCategories = Array.isArray(expandedStudentMaterialCategories[student.id])
      ? expandedStudentMaterialCategories[student.id]
      : [];
    const toggleKey = getStudentMaterialRootToggleKey(categoryRoot);
    expandedStudentMaterialCategories[student.id] = currentCategories.includes(toggleKey)
      ? currentCategories.filter((entry) => entry !== toggleKey)
      : [...currentCategories, toggleKey];
    renderStudentsBoard();
    return;
  }

  if (action === "archive-student") {
    if (!confirm(`Archive ${student.name}? You can restore them later.`)) {
      return;
    }
    student.archived = true;
    student.archivedAt = new Date().toISOString();
    delete expandedStudentMaterialCategories[student.id];
    delete studentMaterialSearchTerms[student.id];
    if (focusedStudentId === student.id) {
      focusedStudentId = "";
    }
    persistAndRender();
    return;
  }

  if (action === "edit-student") {
    const nextNameInput = prompt("Edit student name", student.name);
    if (nextNameInput === null) {
      return;
    }
    const nextName = normalizeText(nextNameInput);
    if (!nextName) {
      alert("Student name cannot be blank.");
      return;
    }
    const duplicateNameExists = state.students.some(
      (entry) =>
        entry.id !== student.id && entry.name.toLowerCase() === nextName.toLowerCase()
    );
    if (duplicateNameExists) {
      alert("A student with that name already exists.");
      return;
    }

    const nextDayInput = prompt(
      "Edit lesson day (Monday, Tuesday, Wednesday, or Thursday)",
      student.day
    );
    if (nextDayInput === null) {
      return;
    }
    const nextDay = parseDayValue(nextDayInput);
    if (!nextDay) {
      alert("Enter Monday, Tuesday, Wednesday, or Thursday.");
      return;
    }

    if (nextName === student.name && nextDay === student.day) {
      return;
    }

    student.name = nextName;
    student.day = nextDay;
    persistAndRender();
    return;
  }

  if (action === "restore-student") {
    student.archived = false;
    student.archivedAt = "";
    focusedStudentId = student.id;
    persistAndRender();
    return;
  }

  if (action === "delete-student") {
    if (!confirm(`Delete ${student.name}?`)) {
      return;
    }
    state.students = state.students.filter((entry) => entry.id !== student.id);
    delete expandedStudentMaterialCategories[student.id];
    delete studentMaterialSearchTerms[student.id];
    if (focusedStudentId === student.id) {
      focusedStudentId = "";
    }
    persistAndRender();
    return;
  }

  if (action === "delete-goal") {
    const goalId = actionElement.dataset.goalId;
    if (!goalId) {
      return;
    }
    student.goals = student.goals.filter((goal) => goal.id !== goalId);
    persistAndRender();
    return;
  }

  if (action === "edit-goal") {
    const goalId = actionElement.dataset.goalId;
    if (!goalId) {
      return;
    }

    const goal = student.goals.find((entry) => entry.id === goalId);
    if (!goal) {
      return;
    }

    const nextGoalText = normalizeText(prompt("Edit goal", goal.text) ?? "");
    if (!nextGoalText || nextGoalText === goal.text) {
      return;
    }

    if (
      student.goals.some(
        (entry) =>
          entry.id !== goal.id && entry.text.toLowerCase() === nextGoalText.toLowerCase()
      )
    ) {
      alert("That goal already exists for this student.");
      return;
    }

    goal.text = nextGoalText;
    persistAndRender();
    return;
  }

  if (action === "move-goal-term") {
    const goalId = actionElement.dataset.goalId;
    if (!goalId) {
      return;
    }

    const goal = student.goals.find((entry) => entry.id === goalId);
    if (!goal) {
      return;
    }

    const nextGoalTerm = normalizeGoalTerm(actionElement.dataset.nextGoalTerm, SHORT_TERM_GOAL);
    if (normalizeGoalTerm(goal.term) === nextGoalTerm) {
      return;
    }

    goal.term = nextGoalTerm;
    persistAndRender();
    return;
  }

  if (action === "delete-song") {
    const songId = actionElement.dataset.songId;
    if (!songId) {
      return;
    }
    student.songs = student.songs.filter((song) => song.id !== songId);
    persistAndRender();
    return;
  }

  if (action === "delete-riff") {
    const riffId = actionElement.dataset.riffId;
    if (!riffId) {
      return;
    }
    student.riffs = student.riffs.filter((riff) => riff.id !== riffId);
    persistAndRender();
    return;
  }

  if (action === "edit-song") {
    const songId = actionElement.dataset.songId;
    if (!songId) {
      return;
    }

    const song = student.songs.find((entry) => entry.id === songId);
    if (!song) {
      return;
    }

    const nextSongText = normalizeText(prompt("Edit song learned", song.text) ?? "");
    if (!nextSongText || nextSongText === song.text) {
      return;
    }

    if (
      student.songs.some(
        (entry) =>
          entry.id !== song.id && entry.text.toLowerCase() === nextSongText.toLowerCase()
      )
    ) {
      alert("That song is already listed for this student.");
      return;
    }

    song.text = nextSongText;
    persistAndRender();
    return;
  }

  if (action === "edit-riff") {
    const riffId = actionElement.dataset.riffId;
    if (!riffId) {
      return;
    }

    const riff = student.riffs.find((entry) => entry.id === riffId);
    if (!riff) {
      return;
    }

    const nextRiffText = normalizeText(prompt("Edit riff learned", riff.text) ?? "");
    if (!nextRiffText || nextRiffText === riff.text) {
      return;
    }

    if (
      student.riffs.some(
        (entry) =>
          entry.id !== riff.id && entry.text.toLowerCase() === nextRiffText.toLowerCase()
      )
    ) {
      alert("That riff is already listed for this student.");
      return;
    }

    riff.text = nextRiffText;
    persistAndRender();
    return;
  }

  if (action === "clear-student-material") {
    if (!confirm(`Clear all checked material for ${student.name}?`)) {
      return;
    }
    student.customMaterials = [];
    student.globalGiven = {};
    persistAndRender();
  }
}

function handleChange(event) {
  const target = event.target;
  if (!(target instanceof HTMLElement)) {
    return;
  }

  if (target.id === "sortMode" && target instanceof HTMLSelectElement) {
    state.sortMode = target.value === "name" ? "name" : "day";
    persistAndRender();
    return;
  }

  if (target.id === "studentFocusSelect" && target instanceof HTMLSelectElement) {
    focusedStudentId = target.value;
    renderStudentsBoard();
    return;
  }

  const action = target.dataset.action;
  if (!action) {
    return;
  }

  const studentId = target.dataset.studentId;
  if (!studentId) {
    return;
  }
  const student = getStudent(studentId);
  if (!student) {
    return;
  }

  if (action === "update-student-name" && target instanceof HTMLInputElement) {
    const nextName = normalizeText(target.value);
    student.name = nextName || student.name;
    persistAndRender();
    return;
  }

  if (action === "update-student-day" && target instanceof HTMLSelectElement) {
    if (!DAYS.includes(target.value)) {
      return;
    }
    student.day = target.value;
    persistAndRender();
    return;
  }

  if (action === "toggle-goal-met" && target instanceof HTMLInputElement) {
    const goalId = target.dataset.goalId;
    if (!goalId) {
      return;
    }
    const goal = student.goals.find((entry) => entry.id === goalId);
    if (!goal) {
      return;
    }
    goal.met = target.checked;
    persistAndRender();
    return;
  }

  if (action === "toggle-global-given" && target instanceof HTMLInputElement) {
    const materialId = target.dataset.materialId;
    if (!materialId) {
      return;
    }
    student.globalGiven[materialId] = target.checked;
    persistAndRender();
    return;
  }
}

function handleInput(event) {
  const target = event.target;
  if (!(target instanceof HTMLElement)) {
    return;
  }

  const action = target.dataset.action;
  if (action === "update-student-notes" && target instanceof HTMLTextAreaElement) {
    const studentId = target.dataset.studentId;
    if (!studentId) {
      return;
    }

    const student = getStudent(studentId);
    if (!student) {
      return;
    }

    const nextNotes = sanitizeNotesText(target.value);
    if (student.notes === nextNotes) {
      return;
    }

    student.notes = nextNotes;
    persistStateOnly();
    return;
  }

  if (action === "update-student-material-search" && target instanceof HTMLInputElement) {
    const studentId = target.dataset.studentId;
    const categoryKey = normalizeText(target.dataset.categoryKey).toLowerCase();
    if (!studentId || !categoryKey) {
      return;
    }

    const nextSearchTerm = target.value;
    const currentSearchTerms =
      studentMaterialSearchTerms[studentId] && typeof studentMaterialSearchTerms[studentId] === "object"
        ? studentMaterialSearchTerms[studentId]
        : {};

    if ((currentSearchTerms[categoryKey] ?? "") === nextSearchTerm) {
      return;
    }

    studentMaterialSearchTerms[studentId] = {
      ...currentSearchTerms,
      [categoryKey]: nextSearchTerm
    };

    renderStudentsBoard();

    const nextInput = document.querySelector(
      `[data-action="update-student-material-search"][data-student-id="${studentId}"][data-category-key="${categoryKey}"]`
    );
    if (nextInput instanceof HTMLInputElement) {
      nextInput.focus();
      nextInput.setSelectionRange(nextSearchTerm.length, nextSearchTerm.length);
    }
  }
}

function getStudent(studentId) {
  return state.students.find((student) => student.id === studentId) || null;
}

function uid(prefix) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function normalizeText(value) {
  if (typeof value !== "string") {
    return "";
  }
  return value.trim().replace(/\s+/g, " ");
}

function compareStudentNames(left, right) {
  return left.name.localeCompare(right.name, undefined, { sensitivity: "base" });
}

function isSearchableStudentMaterialCategory(categoryValue) {
  const categoryKey = normalizeCategory(categoryValue).toLowerCase();
  return categoryKey === RIFFS_CATEGORY || categoryKey === SONGS_CATEGORY;
}

function getStudentMaterialSearchTerm(studentId, categoryValue) {
  const categoryKey = normalizeCategory(categoryValue).toLowerCase();
  const studentSearchTerms =
    studentMaterialSearchTerms[studentId] && typeof studentMaterialSearchTerms[studentId] === "object"
      ? studentMaterialSearchTerms[studentId]
      : {};
  return typeof studentSearchTerms[categoryKey] === "string" ? studentSearchTerms[categoryKey] : "";
}

function getStudentMaterialCategoryToggleKey(categoryValue) {
  return `category:${normalizeCategory(categoryValue).toLowerCase()}`;
}

function getStudentMaterialRootToggleKey(rootCategory) {
  return `root:${normalizeCategory(rootCategory).toLowerCase()}`;
}

function getExpandedStudentMaterialCategories(studentId, validToggleKeys) {
  const expandedCategories = Array.isArray(expandedStudentMaterialCategories[studentId])
    ? expandedStudentMaterialCategories[studentId]
    : [];
  const validCategories =
    validToggleKeys instanceof Set ? validToggleKeys : new Set(validToggleKeys);

  return expandedCategories.filter((category) => validCategories.has(category));
}

function countCheckedStudentMaterials(student, entries) {
  return entries.reduce(
    (total, material) => total + (student.globalGiven[material.id] ? 1 : 0),
    0
  );
}

function renderStudentMaterialEntries(student, categoryValue, label, entries) {
  const isSearchable = isSearchableStudentMaterialCategory(categoryValue);
  const searchTerm = isSearchable ? getStudentMaterialSearchTerm(student.id, categoryValue) : "";
  const normalizedSearchTerm = searchTerm.trim().toLowerCase();
  const visibleEntries = normalizedSearchTerm
    ? entries.filter((material) => material.name.toLowerCase().includes(normalizedSearchTerm))
    : entries;
  const categoryKey = normalizeCategory(categoryValue).toLowerCase();

  return `
    <div class="check-grid material-category-items">
      ${isSearchable ? `
        <div class="material-category-search">
          <input
            type="text"
            class="material-category-search-input"
            data-action="update-student-material-search"
            data-student-id="${student.id}"
            data-category-key="${escapeAttribute(categoryKey)}"
            placeholder="Search ${escapeAttribute(label)}..."
            value="${escapeAttribute(searchTerm)}"
          />
          <p class="material-category-search-meta">
            Showing ${visibleEntries.length} of ${entries.length}
          </p>
        </div>
      ` : ""}
      ${visibleEntries.length
        ? visibleEntries.map((material) => {
            const checked = Boolean(student.globalGiven[material.id]) ? "checked" : "";
            const rowClass = checked ? "check-row completed" : "check-row";
            return `
              <label class="${rowClass}">
                <input
                  type="checkbox"
                  data-action="toggle-global-given"
                  data-student-id="${student.id}"
                  data-material-id="${material.id}"
                  ${checked}
                />
                <span>${escapeHtml(material.name)}</span>
              </label>
            `;
          }).join("")
        : `<p class="empty">No matching material found.</p>`}
    </div>
  `;
}

function renderStudentMaterialGroup(student, categoryValue, label, entries, expandedKeys, options = {}) {
  const toggleKey = getStudentMaterialCategoryToggleKey(categoryValue);
  const isExpanded = expandedKeys.includes(toggleKey);
  const checkedCount = countCheckedStudentMaterials(student, entries);
  const sectionClass = [
    "category-section",
    "material-accordion-section",
    options.isSubcategory ? "material-subcategory-section" : "",
    isExpanded ? "is-expanded" : ""
  ].filter(Boolean).join(" ");
  const toggleClass = [
    "material-category-toggle",
    options.isSubcategory ? "material-subcategory-toggle" : ""
  ].filter(Boolean).join(" ");

  return `
    <div class="${sectionClass}">
      <button
        type="button"
        class="${toggleClass}"
        data-action="toggle-student-material-category"
        data-student-id="${student.id}"
        data-category="${escapeAttribute(categoryValue)}"
        aria-expanded="${isExpanded ? "true" : "false"}"
      >
        <span class="material-category-toggle-main">
          <span class="material-category-caret" aria-hidden="true">${isExpanded ? "-" : "+"}</span>
          <span class="category-label material-category-heading">${escapeHtml(label)}</span>
        </span>
        <span class="material-category-meta">${checkedCount}/${entries.length}</span>
      </button>
      ${isExpanded ? renderStudentMaterialEntries(student, categoryValue, label, entries) : ""}
    </div>
  `;
}

function renderStudentNestedMaterialGroup(student, group, expandedKeys) {
  const toggleKey = getStudentMaterialRootToggleKey(group.rootCategory);
  const isExpanded = expandedKeys.includes(toggleKey);
  const checkedCount = countCheckedStudentMaterials(student, group.entries);
  const rootLabel = formatCategoryLabel(group.label);

  return `
    <div class="category-section material-accordion-section material-root-section ${isExpanded ? "is-expanded" : ""}">
      <button
        type="button"
        class="material-category-toggle material-root-toggle"
        data-action="toggle-student-material-root"
        data-student-id="${student.id}"
        data-category-root="${escapeAttribute(group.rootCategory)}"
        aria-expanded="${isExpanded ? "true" : "false"}"
      >
        <span class="material-category-toggle-main">
          <span class="material-category-caret" aria-hidden="true">${isExpanded ? "-" : "+"}</span>
          <span class="category-label material-category-heading">${escapeHtml(rootLabel)}</span>
        </span>
        <span class="material-category-meta">${checkedCount}/${group.entries.length}</span>
      </button>
      ${isExpanded ? `
        <div class="material-root-items">
          ${group.directEntries.length ? `
            <div class="material-root-direct">
              <p class="material-root-direct-label">General</p>
              ${renderStudentMaterialEntries(student, group.rootCategory, rootLabel, group.directEntries)}
            </div>
          ` : ""}
          <div class="material-subcategory-list">
            ${group.subgroups.map((subcategoryGroup) =>
              renderStudentMaterialGroup(
                student,
                subcategoryGroup.category,
                subcategoryGroup.label,
                subcategoryGroup.entries,
                expandedKeys,
                { isSubcategory: true }
              )
            ).join("")}
          </div>
        </div>
      ` : ""}
    </div>
  `;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function escapeAttribute(value) {
  return escapeHtml(value).replace(/`/g, "&#96;");
}

function setImportStatus(message, tone = "success") {
  setStatusMessage(dom.importStatus, message, tone);
}

function setFolderSyncStatus(message, tone = "success") {
  setStatusMessage(dom.folderSyncStatus, message, tone);
}

function setBackupStatus(message, tone = "success") {
  setStatusMessage(dom.backupStatus, message, tone);
}

function setStatusMessage(element, message, tone = "success") {
  if (!(element instanceof HTMLElement)) {
    return;
  }
  element.textContent = message;
  element.classList.remove("is-success", "is-error");
  element.classList.add(tone === "error" ? "is-error" : "is-success");
}

function setSyncSafetyNotice(message, tone = "warning") {
  syncSafetyNotice = message
    ? {
        message,
        tone
      }
    : null;
  renderSyncSafetyBanner();
}

async function downloadLatestAutoBackup() {
  try {
    const snapshots = await loadAllAutoBackupSnapshots();
    if (!snapshots.length) {
      setBackupStatus("No automatic backup snapshot has been saved in this browser yet.", "error");
      return;
    }

    const latestSnapshot = snapshots[0];
    downloadBackupRecord(latestSnapshot, "student-lesson-tracker-auto-backup");
    setBackupStatus(
      `Downloaded latest automatic backup from ${formatBackupTimestamp(latestSnapshot.createdAt)}.`,
      "success"
    );
  } catch (error) {
    setBackupStatus(
      error instanceof Error ? error.message : "Could not download the latest automatic backup.",
      "error"
    );
  }
}

async function importBackupFile() {
  const input = dom.backupImportInput;
  if (!(input instanceof HTMLInputElement) || !input.files || input.files.length === 0) {
    setBackupStatus("Choose a backup JSON file before importing.", "error");
    return;
  }

  const [file] = input.files;
  let parsedBackup;

  try {
    parsedBackup = parseImportedBackup(JSON.parse(await file.text()));
  } catch (error) {
    setBackupStatus(
      error instanceof Error ? error.message : "That backup file could not be read.",
      "error"
    );
    return;
  }

  const nextState = parsedBackup.data;
  const confirmMessage =
    `Import this backup with ${nextState.students.length} students and ${nextState.globalMaterials.length} system material items? ` +
    "This replaces the current tracker on this browser and syncs it to the shared cloud copy.";

  if (!confirm(confirmMessage)) {
    return;
  }

  await saveAutoBackupSnapshot("pre-import-current-state", state, stateUpdatedAt || new Date().toISOString());

  state = nextState;
  stateUpdatedAt = normalizeTimestamp(parsedBackup.updatedAt);
  persistAndRender();
  setBackupStatus(
    `Imported backup with ${nextState.students.length} students and ${nextState.globalMaterials.length} system items.`,
    "success"
  );
  input.value = "";
}

async function syncMaterialFolderFiles() {
  const input = dom.materialFolderInput;
  if (!(input instanceof HTMLInputElement)) {
    return;
  }

  const files = Array.from(input.files ?? []);
  if (files.length === 0) {
    setFolderSyncStatus("Choose a folder before syncing.", "error");
    return;
  }

  const result = applyFolderSyncFiles(files);
  const selectionChanged = applyFolderSyncSelection(result);
  if (result.anyChanges) {
    persistAndRender();
  } else if (selectionChanged) {
    render();
  }

  input.value = "";
  const syncTone =
    result.anyChanges ||
    result.duplicatesSkipped > 0 ||
    result.categoriesDetected.size > 0 ||
    result.fallbackMapped > 0
      ? "success"
      : "error";
  setFolderSyncStatus(buildFolderSyncSummary(result), syncTone);
}

function applyFolderSyncFiles(files) {
  const fallbackCategory = normalizeText(getSelectedGlobalMaterialCategoryValue());
  const result = {
    filesRead: files.length,
    anyChanges: false,
    globalMaterialsAdded: 0,
    duplicatesSkipped: 0,
    skippedHidden: 0,
    skippedUnsupported: 0,
    skippedInvalid: 0,
    skippedUnmapped: 0,
    fallbackMapped: 0,
    categoriesDetected: new Set()
  };

  files.forEach((file) => {
    const materialName = normalizeText(file.name);
    if (!materialName) {
      result.skippedInvalid += 1;
      return;
    }

    const relativePath =
      typeof file.webkitRelativePath === "string" && file.webkitRelativePath.trim().length > 0
        ? file.webkitRelativePath
        : materialName;
    if (isSkippableFolderSyncPath(relativePath)) {
      result.skippedHidden += 1;
      return;
    }
    if (hasUnsupportedFolderSyncExtension(relativePath)) {
      result.skippedUnsupported += 1;
      return;
    }

    const category = deriveFolderSyncCategory(relativePath, fallbackCategory);
    if (!category) {
      result.skippedUnmapped += 1;
      return;
    }

    if (
      fallbackCategory &&
      normalizeCategory(category).toLowerCase() === normalizeCategory(fallbackCategory).toLowerCase() &&
      !findFolderSyncCategoryMatch(segmentsFromRelativePath(relativePath).slice(0, -1))
    ) {
      result.fallbackMapped += 1;
    }
    result.categoriesDetected.add(category);
    ensureImportedGlobalMaterial(materialName, category, result);
  });

  return result;
}

function applyFolderSyncSelection(result) {
  if (!(result.categoriesDetected instanceof Set) || result.categoriesDetected.size === 0) {
    return false;
  }

  const roots = Array.from(
    new Set(Array.from(result.categoriesDetected).map((category) => getCategoryRoot(category)))
  );
  if (roots.length !== 1) {
    return false;
  }

  const nextRoot = normalizeCategory(roots[0]);
  const currentRoot = normalizeCategory(selectedGlobalCategory);
  let changed = currentRoot.toLowerCase() !== nextRoot.toLowerCase();
  selectedGlobalCategory = nextRoot;

  if (nextRoot.toLowerCase() === TECHNIQUE_CATEGORY) {
    if (selectedTechniqueSubcategory) {
      changed = true;
    }
    selectedTechniqueSubcategory = "";
    if (selectedBassSubcategory) {
      changed = true;
    }
    selectedBassSubcategory = "";
    return changed;
  }

  if (nextRoot.toLowerCase() === BASS_CATEGORY) {
    if (selectedBassSubcategory) {
      changed = true;
    }
    selectedBassSubcategory = "";
    if (selectedTechniqueSubcategory) {
      changed = true;
    }
    selectedTechniqueSubcategory = "";
    return changed;
  }

  if (selectedTechniqueSubcategory || selectedBassSubcategory) {
    changed = true;
  }
  selectedTechniqueSubcategory = "";
  selectedBassSubcategory = "";
  return changed;
}

function isSkippableFolderSyncPath(relativePath) {
  const segments = segmentsFromRelativePath(relativePath);
  return segments.some((segment) => {
    const lowered = segment.toLowerCase();
    return (
      segment.startsWith(".") ||
      segment.startsWith("._") ||
      lowered === "__macosx" ||
      lowered === "thumbs.db"
    );
  });
}

function hasUnsupportedFolderSyncExtension(relativePath) {
  const segments = segmentsFromRelativePath(relativePath);
  const fileName = segments[segments.length - 1] ?? "";
  const lowered = fileName.toLowerCase();
  return lowered.endsWith(".sib") || lowered.endsWith(".mp3");
}

function segmentsFromRelativePath(relativePath) {
  return String(relativePath)
    .split(/[\\/]+/)
    .map((segment) => normalizeText(segment))
    .filter(Boolean);
}

function deriveFolderSyncCategory(relativePath, fallbackCategory = "") {
  const segments = segmentsFromRelativePath(relativePath);
  if (segments.length < 2) {
    return fallbackCategory ? normalizeCategory(fallbackCategory) : "";
  }

  const categoryMatch = findFolderSyncCategoryMatch(segments.slice(0, -1));
  if (!categoryMatch) {
    const rootCategory = normalizeCategory(segments[0]);
    if (rootCategory.toLowerCase() === SONGS_CATEGORY) {
      return SONGS_CATEGORY;
    }
    const genericSubcategory = normalizeText(segments[1] ?? "");
    return genericSubcategory && segments.length > 2
      ? `${rootCategory} / ${genericSubcategory}`
      : rootCategory;
  }

  const rootKey = categoryMatch.root.toLowerCase();
  if (rootKey === TECHNIQUE_CATEGORY) {
    const subcategory = resolvePresetLabel(
      categoryMatch.nextSegment,
      TECHNIQUE_SUBCATEGORY_PRESETS
    );
    return subcategory ? getTechniqueSubcategoryCategory(subcategory) : TECHNIQUE_CATEGORY;
  }
  if (rootKey === BASS_CATEGORY) {
    const subcategory = resolvePresetLabel(categoryMatch.nextSegment, BASS_SUBCATEGORY_PRESETS);
    return subcategory ? getBassSubcategoryCategory(subcategory) : BASS_CATEGORY;
  }
  if (rootKey === SONGS_CATEGORY) {
    return SONGS_CATEGORY;
  }

  const genericSubcategory = normalizeText(categoryMatch.nextSegment);
  return genericSubcategory
    ? `${categoryMatch.root} / ${genericSubcategory}`
    : categoryMatch.root;
}

function findFolderSyncCategoryMatch(directorySegments) {
  const quickCategories = getQuickCategories();
  for (let index = 0; index < directorySegments.length; index += 1) {
    const segment = normalizeCategory(directorySegments[index]);
    if (!segment) {
      continue;
    }
    const matchedRoot = quickCategories.find(
      (category) => normalizeCategory(category).toLowerCase() === segment.toLowerCase()
    );
    if (matchedRoot) {
      return {
        root: matchedRoot,
        nextSegment: directorySegments[index + 1] ?? ""
      };
    }
  }

  return null;
}

function resolvePresetLabel(value, presets) {
  const normalizedValue = normalizeText(value).toLowerCase();
  if (!normalizedValue) {
    return "";
  }

  return (
    presets.find((entry) => normalizeText(entry).toLowerCase() === normalizedValue) ?? ""
  );
}

function buildFolderSyncSummary(result) {
  const lines = [
    "Folder sync complete.",
    `Files read: ${result.filesRead}`,
    `Global material added: ${result.globalMaterialsAdded}`
  ];

  if (result.categoriesDetected.size > 0) {
    const categoryLabels = Array.from(result.categoriesDetected)
      .sort((left, right) => left.localeCompare(right, undefined, { sensitivity: "base" }))
      .map((category) => formatCategoryLabel(category));
    lines.push(`Categories detected: ${categoryLabels.join(", ")}`);
  }
  if (result.duplicatesSkipped > 0) {
    lines.push(`Duplicate files skipped: ${result.duplicatesSkipped}`);
  }
  if (result.skippedHidden > 0) {
    lines.push(`Hidden/system files skipped: ${result.skippedHidden}`);
  }
  if (result.skippedUnsupported > 0) {
    lines.push(`Unsupported files skipped (.sib, .mp3): ${result.skippedUnsupported}`);
  }
  if (result.skippedUnmapped > 0) {
    lines.push(`Files skipped (could not map category): ${result.skippedUnmapped}`);
  }
  if (result.fallbackMapped > 0) {
    lines.push(`Files mapped using selected category fallback: ${result.fallbackMapped}`);
  }
  if (result.skippedInvalid > 0) {
    lines.push(`Files skipped (missing name): ${result.skippedInvalid}`);
  }
  if (!result.anyChanges) {
    lines.push("No changes were applied.");
  }

  return lines.join("\n");
}

async function importSpreadsheetFile() {
  const input = dom.materialSpreadsheetInput;
  if (!(input instanceof HTMLInputElement)) {
    return;
  }

  const file = input.files && input.files[0];
  if (!file) {
    setImportStatus("Choose a CSV or TSV file before importing.", "error");
    return;
  }

  let text;
  try {
    text = await file.text();
  } catch {
    setImportStatus("Could not read that file. Try again with a CSV export.", "error");
    return;
  }

  let parsedRows;
  try {
    parsedRows = parseSpreadsheetRows(text);
  } catch (error) {
    setImportStatus(
      `Import failed: ${error instanceof Error ? error.message : "invalid spreadsheet format."}`,
      "error"
    );
    return;
  }

  if (parsedRows.length === 0) {
    setImportStatus("No import rows were found.", "error");
    return;
  }

  const result = applyImportedRows(parsedRows);
  if (result.anyChanges) {
    persistAndRender();
  }

  input.value = "";
  setImportStatus(buildImportSummary(result), result.anyChanges ? "success" : "error");
}

function parseSpreadsheetRows(rawText) {
  const text = rawText.replace(/^\uFEFF/, "");
  if (normalizeText(text).length === 0) {
    throw new Error("file is empty");
  }

  if (looksLikeNumbersArchive(text)) {
    throw new Error(
      "this is an Apple Numbers package, not a real CSV. Export it from Numbers using File > Export To > CSV."
    );
  }

  const delimiter = detectSpreadsheetDelimiter(text);
  const rows = parseDelimitedText(text, delimiter);
  if (rows.length === 0) {
    throw new Error("no rows found");
  }

  const headerRow = rows[0];
  const headers = headerRow.map((value) => canonicalHeaderKey(value));
  const hasImportableColumn =
    headers.includes("item") || headers.includes("goal") || headers.includes("song") || headers.includes("riff");
  if (!hasImportableColumn) {
    throw new Error(
      "no importable columns found. Include at least one of: item/material, goal, song, or riff."
    );
  }

  return rows.slice(1).map((cells, index) => {
    const fields = {};
    headers.forEach((header, cellIndex) => {
      const value = normalizeText(cells[cellIndex]);
      if (!value) {
        return;
      }
      if (!fields[header]) {
        fields[header] = value;
      }
    });

    return {
      line: index + 2,
      fields
    };
  }).filter((entry) => Object.keys(entry.fields).length > 0);
}

function looksLikeNumbersArchive(text) {
  return text.startsWith("PK") && text.includes("Index/Document.iwa");
}

function detectSpreadsheetDelimiter(text) {
  const firstLine =
    text
      .split(/\r?\n/)
      .map((line) => line.trim())
      .find((line) => line.length > 0) ?? "";
  const commaCount = (firstLine.match(/,/g) ?? []).length;
  const tabCount = (firstLine.match(/\t/g) ?? []).length;
  const semicolonCount = (firstLine.match(/;/g) ?? []).length;

  if (tabCount > commaCount && tabCount > semicolonCount) {
    return "\t";
  }
  if (semicolonCount > commaCount) {
    return ";";
  }
  return ",";
}

function parseDelimitedText(text, delimiter) {
  const rows = [];
  let currentRow = [];
  let currentValue = "";
  let inQuotes = false;

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];

    if (inQuotes) {
      if (char === "\"") {
        if (text[index + 1] === "\"") {
          currentValue += "\"";
          index += 1;
        } else {
          inQuotes = false;
        }
      } else {
        currentValue += char;
      }
      continue;
    }

    if (char === "\"") {
      inQuotes = true;
      continue;
    }

    if (char === delimiter) {
      currentRow.push(currentValue);
      currentValue = "";
      continue;
    }

    if (char === "\n") {
      currentRow.push(currentValue);
      rows.push(currentRow);
      currentRow = [];
      currentValue = "";
      continue;
    }

    if (char === "\r") {
      continue;
    }

    currentValue += char;
  }

  currentRow.push(currentValue);
  if (currentRow.some((cell) => normalizeText(cell).length > 0)) {
    rows.push(currentRow);
  }

  return rows.filter((row) => row.some((cell) => normalizeText(cell).length > 0));
}

function canonicalHeaderKey(label) {
  const normalized = normalizeHeaderLabel(label);
  if (!normalized) {
    return "";
  }

  const match = Object.entries(IMPORT_HEADER_ALIASES).find(([, aliases]) =>
    aliases.some((alias) => normalizeHeaderLabel(alias) === normalized)
  );
  if (match) {
    return match[0];
  }
  return normalized;
}

function normalizeHeaderLabel(value) {
  return normalizeText(value)
    .toLowerCase()
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ");
}

function inferEntryType(fields) {
  const explicitType = normalizeText(fields.type).toLowerCase();
  if (explicitType.includes("goal")) {
    return "goal";
  }
  if (explicitType.includes("song")) {
    return "song";
  }
  if (explicitType.includes("riff")) {
    return "riff";
  }
  if (normalizeText(fields.goal)) {
    return "goal";
  }
  if (normalizeText(fields.song)) {
    return "song";
  }
  if (normalizeText(fields.riff)) {
    return "riff";
  }
  return "material";
}

function inferScope(fields, entryType) {
  if (entryType !== "material") {
    return "student";
  }

  const explicitScope = normalizeText(fields.scope).toLowerCase();
  if (
    explicitScope.startsWith("g") ||
    explicitScope === "system" ||
    explicitScope === "all"
  ) {
    return "global";
  }
  if (
    explicitScope.startsWith("s") ||
    explicitScope === "custom" ||
    explicitScope === "individual"
  ) {
    return "student";
  }

  return normalizeText(fields.student) ? "student" : "global";
}

function parseDayValue(value) {
  const normalized = normalizeText(value).toLowerCase();
  if (!normalized) {
    return null;
  }
  if (normalized.startsWith("mon")) {
    return "Monday";
  }
  if (normalized.startsWith("tue")) {
    return "Tuesday";
  }
  if (normalized.startsWith("wed")) {
    return "Wednesday";
  }
  if (normalized.startsWith("thu")) {
    return "Thursday";
  }
  return null;
}

function parseBooleanValue(value) {
  if (typeof value === "boolean") {
    return value;
  }
  if (typeof value === "number") {
    if (value === 1) {
      return true;
    }
    if (value === 0) {
      return false;
    }
  }

  const normalized = normalizeText(value).toLowerCase();
  if (!normalized) {
    return null;
  }

  if (
    normalized === "true" ||
    normalized === "yes" ||
    normalized === "y" ||
    normalized === "1" ||
    normalized === "checked" ||
    normalized === "done"
  ) {
    return true;
  }
  if (
    normalized === "false" ||
    normalized === "no" ||
    normalized === "n" ||
    normalized === "0" ||
    normalized === "unchecked"
  ) {
    return false;
  }
  return null;
}

function applyImportedRows(rows) {
  const result = {
    rowsRead: rows.length,
    anyChanges: false,
    studentsAdded: 0,
    globalMaterialsAdded: 0,
    customMaterialsAdded: 0,
    goalsAdded: 0,
    songsAdded: 0,
    riffsAdded: 0,
    assignmentsUpdated: 0,
    duplicatesSkipped: 0,
    skippedInvalid: 0,
    skippedMissingStudent: 0
  };

  rows.forEach((row) => {
    const fields = row.fields;
    const entryType = inferEntryType(fields);
    const scope = inferScope(fields, entryType);
    const dayHint = parseDayValue(fields.day);
    const studentName = normalizeText(fields.student);
    const givenValue = parseBooleanValue(fields.given);
    const rawCategory = normalizeText(fields.category);

    if (entryType === "goal") {
      const goalLabel = normalizeText(fields.goal || fields.item);
      if (!goalLabel) {
        result.skippedInvalid += 1;
        return;
      }
      if (!studentName) {
        result.skippedMissingStudent += 1;
        return;
      }

      const student = ensureImportedStudent(studentName, dayHint, result);
      const existingGoal = student.goals.find(
        (goal) => goal.text.toLowerCase() === goalLabel.toLowerCase()
      );
      if (existingGoal) {
        if (givenValue !== null && Boolean(existingGoal.met) !== givenValue) {
          existingGoal.met = givenValue;
          result.assignmentsUpdated += 1;
          result.anyChanges = true;
        } else {
          result.duplicatesSkipped += 1;
        }
        return;
      }
      student.goals.push({
        id: uid("goal"),
        text: goalLabel,
        met: givenValue === true,
        term: SHORT_TERM_GOAL
      });
      result.goalsAdded += 1;
      result.anyChanges = true;
      return;
    }

    if (entryType === "song") {
      const songLabel = normalizeText(fields.song || fields.item);
      if (!songLabel) {
        result.skippedInvalid += 1;
        return;
      }
      if (!studentName) {
        result.skippedMissingStudent += 1;
        return;
      }

      const student = ensureImportedStudent(studentName, dayHint, result);
      const exists = student.songs.some(
        (song) => song.text.toLowerCase() === songLabel.toLowerCase()
      );
      if (exists) {
        result.duplicatesSkipped += 1;
        return;
      }
      student.songs.push({ id: uid("song"), text: songLabel });
      result.songsAdded += 1;
      result.anyChanges = true;
      return;
    }

    if (entryType === "riff") {
      const riffLabel = normalizeText(fields.riff || fields.item);
      if (!riffLabel) {
        result.skippedInvalid += 1;
        return;
      }
      if (!studentName) {
        result.skippedMissingStudent += 1;
        return;
      }

      const student = ensureImportedStudent(studentName, dayHint, result);
      const exists = student.riffs.some(
        (riff) => riff.text.toLowerCase() === riffLabel.toLowerCase()
      );
      if (exists) {
        result.duplicatesSkipped += 1;
        return;
      }
      student.riffs.push({ id: uid("riff"), text: riffLabel });
      result.riffsAdded += 1;
      result.anyChanges = true;
      return;
    }

    const materialLabel = normalizeText(fields.item || fields.material || fields.title);
    if (!materialLabel) {
      result.skippedInvalid += 1;
      return;
    }
    const category = rawCategory ? normalizeCategory(rawCategory) : SONGS_CATEGORY;

    if (scope === "global") {
      const globalMaterial = ensureImportedGlobalMaterial(materialLabel, category, result);
      if (studentName && givenValue !== null) {
        const student = ensureImportedStudent(studentName, dayHint, result);
        const currentValue = Boolean(student.globalGiven[globalMaterial.id]);
        if (currentValue !== givenValue) {
          student.globalGiven[globalMaterial.id] = givenValue;
          result.assignmentsUpdated += 1;
          result.anyChanges = true;
        }
      }
      return;
    }

    if (!studentName) {
      result.skippedMissingStudent += 1;
      return;
    }

    const student = ensureImportedStudent(studentName, dayHint, result);
    let customMaterial = student.customMaterials.find(
      (material) =>
        material.name.toLowerCase() === materialLabel.toLowerCase() &&
        normalizeCategory(material.category).toLowerCase() === category.toLowerCase()
    );
    if (!customMaterial) {
      customMaterial = {
        id: uid("custom"),
        name: materialLabel,
        category,
        given: false
      };
      student.customMaterials.push(customMaterial);
      result.customMaterialsAdded += 1;
      result.anyChanges = true;
    } else {
      result.duplicatesSkipped += 1;
    }

    if (givenValue !== null && customMaterial.given !== givenValue) {
      customMaterial.given = givenValue;
      result.assignmentsUpdated += 1;
      result.anyChanges = true;
    }
  });

  return result;
}

function ensureImportedStudent(studentName, dayHint, result) {
  const key = studentName.toLowerCase();
  const existing = state.students.find((student) => student.name.toLowerCase() === key);
  if (existing) {
    return existing;
  }

  const createdStudent = {
    id: uid("student"),
    name: studentName,
    day: dayHint ?? DAYS[0],
    goals: [],
    songs: [],
    riffs: [],
    notes: "",
    archived: false,
    archivedAt: "",
    customMaterials: [],
    globalGiven: {}
  };
  state.students.push(createdStudent);
  if (!focusedStudentId) {
    focusedStudentId = createdStudent.id;
  }
  result.studentsAdded += 1;
  result.anyChanges = true;
  return createdStudent;
}

function ensureImportedGlobalMaterial(materialName, category, result) {
  const existing = state.globalMaterials.find(
    (material) =>
      material.name.toLowerCase() === materialName.toLowerCase() &&
      normalizeCategory(material.category).toLowerCase() === category.toLowerCase()
  );
  if (existing) {
    result.duplicatesSkipped += 1;
    return existing;
  }

  const createdMaterial = {
    id: uid("global"),
    name: materialName,
    category
  };
  state.globalMaterials.push(createdMaterial);
  result.globalMaterialsAdded += 1;
  result.anyChanges = true;
  return createdMaterial;
}

function moveUncategorizedGlobalMaterialToSongs() {
  const uncategorizedKey = normalizeCategory("").toLowerCase();
  const songsKey = normalizeCategory(SONGS_CATEGORY).toLowerCase();
  const songsByName = new Map();
  const updatedMaterials = [];
  let movedCount = 0;

  state.globalMaterials.forEach((material) => {
    const categoryKey = normalizeCategory(material.category).toLowerCase();
    const nameKey = material.name.toLowerCase();
    if (categoryKey === songsKey) {
      songsByName.set(nameKey, material.id);
    }
  });

  state.globalMaterials.forEach((material) => {
    const categoryKey = normalizeCategory(material.category).toLowerCase();
    if (categoryKey !== uncategorizedKey) {
      updatedMaterials.push(material);
      return;
    }

    const nameKey = material.name.toLowerCase();
    const existingSongId = songsByName.get(nameKey);
    if (existingSongId) {
      state.students.forEach((student) => {
        const wasGiven = Boolean(student.globalGiven[material.id]);
        if (wasGiven) {
          student.globalGiven[existingSongId] = true;
        }
        delete student.globalGiven[material.id];
      });
      movedCount += 1;
      return;
    }

    material.category = SONGS_CATEGORY;
    songsByName.set(nameKey, material.id);
    updatedMaterials.push(material);
    movedCount += 1;
  });

  if (movedCount > 0) {
    state.globalMaterials = updatedMaterials;
  }

  return movedCount;
}

function moveCategoryGlobalMaterialToSongs(categoryValue) {
  const sourceKey = normalizeCategory(categoryValue).toLowerCase();
  const songsKey = normalizeCategory(SONGS_CATEGORY).toLowerCase();
  if (sourceKey === songsKey) {
    return 0;
  }

  const songsByName = new Map();
  const updatedMaterials = [];
  let movedCount = 0;

  state.globalMaterials.forEach((material) => {
    const categoryKey = normalizeCategory(material.category).toLowerCase();
    const nameKey = material.name.toLowerCase();
    if (categoryKey === songsKey) {
      songsByName.set(nameKey, material.id);
    }
  });

  state.globalMaterials.forEach((material) => {
    const categoryKey = normalizeCategory(material.category).toLowerCase();
    if (categoryKey !== sourceKey) {
      updatedMaterials.push(material);
      return;
    }

    const nameKey = material.name.toLowerCase();
    const existingSongId = songsByName.get(nameKey);
    if (existingSongId) {
      state.students.forEach((student) => {
        const wasGiven = Boolean(student.globalGiven[material.id]);
        if (wasGiven) {
          student.globalGiven[existingSongId] = true;
        }
        delete student.globalGiven[material.id];
      });
      movedCount += 1;
      return;
    }

    material.category = SONGS_CATEGORY;
    songsByName.set(nameKey, material.id);
    updatedMaterials.push(material);
    movedCount += 1;
  });

  if (movedCount > 0) {
    state.globalMaterials = updatedMaterials;
  }

  return movedCount;
}

function removeGlobalMaterialsByIds(materialIds) {
  if (!(materialIds instanceof Set) || materialIds.size === 0) {
    return 0;
  }

  let removedCount = 0;
  state.globalMaterials = state.globalMaterials.filter((material) => {
    if (materialIds.has(material.id)) {
      removedCount += 1;
      return false;
    }
    return true;
  });

  if (removedCount === 0) {
    return 0;
  }

  state.students.forEach((student) => {
    materialIds.forEach((materialId) => {
      delete student.globalGiven[materialId];
    });
  });

  return removedCount;
}

function buildImportSummary(result) {
  const lines = [
    "Spreadsheet import complete.",
    `Rows read: ${result.rowsRead}`,
    `Students added: ${result.studentsAdded}`,
    `Global material added: ${result.globalMaterialsAdded}`,
    `Custom material added: ${result.customMaterialsAdded}`,
    `Goals added: ${result.goalsAdded}`,
    `Songs added: ${result.songsAdded}`,
    `Riffs added: ${result.riffsAdded}`,
    `Check marks/status updated: ${result.assignmentsUpdated}`
  ];

  if (result.duplicatesSkipped > 0) {
    lines.push(`Duplicate entries skipped: ${result.duplicatesSkipped}`);
  }
  if (result.skippedMissingStudent > 0) {
    lines.push(`Rows skipped (missing student): ${result.skippedMissingStudent}`);
  }
  if (result.skippedInvalid > 0) {
    lines.push(`Rows skipped (missing item): ${result.skippedInvalid}`);
  }
  if (!result.anyChanges) {
    lines.push("No changes were applied.");
  }

  return lines.join("\n");
}

function isSyncConfigured() {
  return (
    typeof SYNC_CONFIG.supabaseUrl === "string" &&
    SYNC_CONFIG.supabaseUrl.startsWith("https://") &&
    !SYNC_CONFIG.supabaseUrl.includes("YOUR_") &&
    typeof SYNC_CONFIG.supabaseAnonKey === "string" &&
    SYNC_CONFIG.supabaseAnonKey.length > 20 &&
    !SYNC_CONFIG.supabaseAnonKey.includes("YOUR_") &&
    typeof SYNC_CONFIG.studioId === "string" &&
    SYNC_CONFIG.studioId.trim().length > 0 &&
    !SYNC_CONFIG.studioId.includes("YOUR_")
  );
}

function normalizeTimestamp(value) {
  if (typeof value !== "string") {
    return new Date().toISOString();
  }
  const parsedMs = Date.parse(value);
  if (!Number.isFinite(parsedMs)) {
    return new Date().toISOString();
  }
  return new Date(parsedMs).toISOString();
}

function timestampMs(value) {
  const parsedMs = Date.parse(value);
  return Number.isFinite(parsedMs) ? parsedMs : 0;
}

function studentMatchKeys(student) {
  if (!student || typeof student !== "object") {
    return [];
  }

  const keys = [];
  if (typeof student.id === "string" && student.id) {
    keys.push(`id:${student.id}`);
  }

  const normalizedName = normalizeText(student.name).toLowerCase();
  if (normalizedName) {
    keys.push(`name:${normalizedName}`);
    if (DAYS.includes(student.day)) {
      keys.push(`name-day:${normalizedName}::${student.day.toLowerCase()}`);
    }
  }

  return keys;
}

function buildStudentLookup(students) {
  const lookup = new Map();

  students.forEach((student) => {
    studentMatchKeys(student).forEach((key) => {
      if (!lookup.has(key)) {
        lookup.set(key, student);
      }
    });
  });

  return lookup;
}

function mergeGoalsPreservingMet(localGoals, incomingGoals) {
  const localByText = new Map(
    localGoals.map((goal) => [normalizeText(goal.text).toLowerCase(), goal])
  );

  let changed = false;
  const mergedGoals = incomingGoals.map((goal) => {
    const localGoal = localByText.get(normalizeText(goal.text).toLowerCase());
    if (localGoal?.met && !goal.met) {
      changed = true;
      return {
        ...goal,
        met: true
      };
    }
    return goal;
  });

  return { goals: mergedGoals, changed };
}

function mergeSimpleTextEntries(localEntries, incomingEntries, prefix) {
  const mergedEntries = [...incomingEntries];
  const seen = new Set(
    incomingEntries.map((entry) => normalizeText(entry.text).toLowerCase()).filter(Boolean)
  );
  let changed = false;

  localEntries.forEach((entry) => {
    const text = normalizeText(entry.text);
    const key = text.toLowerCase();
    if (!text || seen.has(key)) {
      return;
    }
    seen.add(key);
    mergedEntries.push({
      id: typeof entry.id === "string" ? entry.id : uid(prefix),
      text
    });
    changed = true;
  });

  return { entries: mergedEntries, changed };
}

function mergeStatePreservingLocalStudentFields(localState, incomingState) {
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

    if (!incomingStudent.archived && localStudent.archived) {
      nextStudent = {
        ...nextStudent,
        archived: true,
        archivedAt: incomingStudent.archivedAt || localStudent.archivedAt
      };
      changed = true;
    } else if (incomingStudent.archived && !incomingStudent.archivedAt && localStudent.archivedAt) {
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
}

function isRemoteNewer(remoteTimestamp) {
  return timestampMs(remoteTimestamp) > timestampMs(stateUpdatedAt);
}

function hasMeaningfulDataInState(candidateState) {
  if (!candidateState || typeof candidateState !== "object") {
    return false;
  }

  const students = Array.isArray(candidateState.students) ? candidateState.students : [];
  const globalMaterials = Array.isArray(candidateState.globalMaterials)
    ? candidateState.globalMaterials
    : [];

  return students.length > 0 || globalMaterials.length > 0;
}

function hasMeaningfulData() {
  return hasMeaningfulDataInState(state);
}

function restoreStateFromRemote(remote, warningMessage, syncMessage) {
  state = sanitizeState(remote.data);
  stateUpdatedAt = normalizeTimestamp(remote.updatedAt);
  persistLocalEnvelope();
  render();
  setSyncSafetyNotice(warningMessage, "warning");
  syncStatus = syncMessage;
}

async function protectAgainstEmptyWrite(nextState) {
  if (hasMeaningfulDataInState(nextState)) {
    return { blocked: false };
  }

  const remote = await fetchRemoteEnvelope();
  if (remote && hasMeaningfulDataInState(remote.data)) {
    restoreStateFromRemote(
      remote,
      "This browser opened with an empty tracker, so the app protected the shared cloud data instead of overwriting it.",
      `Cloud sync: protected shared data (${formatSyncTime(remote.updatedAt)}).`
    );
    return {
      blocked: true,
      updatedAt: remote.updatedAt
    };
  }

  return { blocked: false };
}

function buildSyncHeaders(includeContentType = false) {
  const headers = {
    apikey: SYNC_CONFIG.supabaseAnonKey,
    Authorization: `Bearer ${SYNC_CONFIG.supabaseAnonKey}`
  };
  if (includeContentType) {
    headers["Content-Type"] = "application/json";
  }
  return headers;
}

function syncBaseUrl() {
  return SYNC_CONFIG.supabaseUrl.replace(/\/$/, "");
}

function formatSyncTime(value) {
  const ms = timestampMs(value);
  if (ms === 0) {
    return "";
  }
  return new Date(ms).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}

async function initializeSync() {
  await pullRemoteAndMerge({ forcePushIfMissing: true });
  if (maybeApplyAllStarterData()) {
    persistAndRender();
  }
}

async function syncNow() {
  if (!isSyncConfigured()) {
    return;
  }
  await pullRemoteAndMerge({ forcePushIfMissing: true, manual: true });
}

function scheduleCloudPush() {
  if (!isSyncConfigured()) {
    return;
  }
  if (pushTimer) {
    clearTimeout(pushTimer);
  }
  pushTimer = setTimeout(() => {
    void pushCurrentStateToCloud();
  }, PUSH_DEBOUNCE_MS);
}

async function pullRemoteAndMerge({ forcePushIfMissing = false, manual = false, silent = false } = {}) {
  if (!isSyncConfigured()) {
    return;
  }
  if (syncInFlight) {
    return;
  }

  syncInFlight = true;
  syncStatus = manual ? "Cloud sync: syncing now..." : "Cloud sync: syncing...";
  renderSyncStatus();

  try {
    const remote = await fetchRemoteEnvelope();

    if (!remote) {
      if (forcePushIfMissing && hasMeaningfulData()) {
        const writeResult = await upsertRemoteEnvelope(
          state,
          stateUpdatedAt,
          manual ? "manual-sync-upload" : "initial-cloud-upload"
        );
        if (writeResult.blocked) {
          return;
        }
        const remoteUpdatedAt = writeResult.updatedAt;
        stateUpdatedAt = normalizeTimestamp(remoteUpdatedAt);
        persistLocalEnvelope();
        syncStatus = `Cloud sync: uploaded (${formatSyncTime(stateUpdatedAt)}).`;
      } else {
        syncStatus = "Cloud sync: waiting for first shared save.";
      }
      return;
    }

    if (hasMeaningfulDataInState(remote.data) && !hasMeaningfulData()) {
      restoreStateFromRemote(
        remote,
        "This browser opened with an empty local copy, so the app loaded the shared cloud data instead of letting an empty state take over.",
        `Cloud sync: protected shared data (${formatSyncTime(remote.updatedAt)}).`
      );
      return;
    }

    if (isRemoteNewer(remote.updatedAt)) {
      if (!hasMeaningfulDataInState(remote.data) && hasMeaningfulData()) {
        const writeResult = await upsertRemoteEnvelope(
          state,
          new Date().toISOString(),
          "restore-after-empty-cloud"
        );
        if (writeResult.blocked) {
          return;
        }
        const remoteUpdatedAt = writeResult.updatedAt;
        stateUpdatedAt = normalizeTimestamp(remoteUpdatedAt);
        persistLocalEnvelope();
        setSyncSafetyNotice(
          "The shared cloud copy was empty, so the app restored it from the fuller local copy on this browser.",
          "success"
        );
        syncStatus = `Cloud sync: restored local data after empty cloud overwrite (${formatSyncTime(stateUpdatedAt)}).`;
        return;
      }

      const mergedRemote = mergeStatePreservingLocalStudentFields(state, remote.data);
      state = mergedRemote.state;

      if (mergedRemote.changed) {
        stateUpdatedAt = new Date().toISOString();
        persistLocalEnvelope();
        render();
        const writeResult = await upsertRemoteEnvelope(
          state,
          stateUpdatedAt,
          "restore-local-student-fields"
        );
        if (writeResult.blocked) {
          return;
        }
        const remoteUpdatedAt = writeResult.updatedAt;
        stateUpdatedAt = normalizeTimestamp(remoteUpdatedAt);
        persistLocalEnvelope();
        syncStatus = `Cloud sync: restored local student data (${formatSyncTime(stateUpdatedAt)}).`;
        return;
      }

      stateUpdatedAt = normalizeTimestamp(remote.updatedAt);
      persistLocalEnvelope();
      render();
      syncStatus = `Cloud sync: updated from cloud (${formatSyncTime(stateUpdatedAt)}).`;
      return;
    }

    if (forcePushIfMissing && hasMeaningfulData() && timestampMs(stateUpdatedAt) > timestampMs(remote.updatedAt)) {
      const writeResult = await upsertRemoteEnvelope(
        state,
        stateUpdatedAt,
        manual ? "manual-sync-upload" : "local-state-newer"
      );
      if (writeResult.blocked) {
        return;
      }
      const remoteUpdatedAt = writeResult.updatedAt;
      stateUpdatedAt = normalizeTimestamp(remoteUpdatedAt);
      persistLocalEnvelope();
      syncStatus = `Cloud sync: uploaded (${formatSyncTime(stateUpdatedAt)}).`;
      return;
    }

    if (!silent) {
      syncStatus = `Cloud sync: up to date (${formatSyncTime(remote.updatedAt)}).`;
    }
  } catch (error) {
    syncStatus = `Cloud sync error: ${error instanceof Error ? error.message : "unknown error"}`;
  } finally {
    syncInFlight = false;
    renderSyncStatus();
  }
}

async function pushCurrentStateToCloud() {
  if (!isSyncConfigured()) {
    return;
  }
  if (syncInFlight) {
    return;
  }

  syncInFlight = true;
  syncStatus = "Cloud sync: uploading...";
  renderSyncStatus();

  try {
    const writeResult = await upsertRemoteEnvelope(state, stateUpdatedAt, "scheduled-cloud-push");
    if (writeResult.blocked) {
      return;
    }
    const remoteUpdatedAt = writeResult.updatedAt;
    stateUpdatedAt = normalizeTimestamp(remoteUpdatedAt);
    persistLocalEnvelope();
    syncStatus = `Cloud sync: uploaded (${formatSyncTime(stateUpdatedAt)}).`;
  } catch (error) {
    syncStatus = `Cloud sync error: ${error instanceof Error ? error.message : "unknown error"}`;
  } finally {
    syncInFlight = false;
    renderSyncStatus();
  }
}

async function fetchRemoteEnvelope() {
  const params = new URLSearchParams({
    studio_id: `eq.${SYNC_CONFIG.studioId}`,
    select: "studio_id,payload,updated_at",
    limit: "1"
  });

  const response = await fetch(`${syncBaseUrl()}/rest/v1/tracker_state?${params.toString()}`, {
    method: "GET",
    headers: buildSyncHeaders(false)
  });

  if (!response.ok) {
    throw new Error(`read failed (${response.status})`);
  }

  const rows = await response.json();
  if (!Array.isArray(rows) || rows.length === 0) {
    return null;
  }

  const row = rows[0];
  return {
    data: sanitizeState(row.payload),
    updatedAt: normalizeTimestamp(row.updated_at)
  };
}

async function upsertRemoteEnvelope(nextState, nextUpdatedAt, backupReason = "cloud-write") {
  const guardResult = await protectAgainstEmptyWrite(nextState);
  if (guardResult.blocked) {
    return guardResult;
  }

  await saveAutoBackupSnapshot(backupReason, nextState, nextUpdatedAt);

  const body = [
    {
      studio_id: SYNC_CONFIG.studioId,
      payload: nextState,
      updated_at: normalizeTimestamp(nextUpdatedAt)
    }
  ];

  const response = await fetch(
    `${syncBaseUrl()}/rest/v1/tracker_state?on_conflict=studio_id`,
    {
      method: "POST",
      headers: {
        ...buildSyncHeaders(true),
        Prefer: "resolution=merge-duplicates,return=representation"
      },
      body: JSON.stringify(body)
    }
  );

  if (!response.ok) {
    throw new Error(`write failed (${response.status})`);
  }

  const rows = await response.json();
  if (!Array.isArray(rows) || rows.length === 0) {
    return {
      blocked: false,
      updatedAt: normalizeTimestamp(nextUpdatedAt)
    };
  }

  return {
    blocked: false,
    updatedAt: normalizeTimestamp(rows[0].updated_at)
  };
}
