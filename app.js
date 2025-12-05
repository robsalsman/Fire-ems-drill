// Endurance-enabled Fire/EMS drill app

const QUESTIONS = [
  {
    id: 'FFI-FB-001',
    exam: 'TCFP',
    section: 'Firefighter I',
    topic: 'Fire Behavior',
    prompt: 'Which of the following is an early warning sign of impending flashover in a compartment fire?',
    choices: [
      'Isolated flames in the hot gas layer near the ceiling',
      'Sudden drop in room temperature',
      'Complete absence of visible smoke',
      'Water steaming off surfaces after application'
    ],
    answerIndex: 0,
    explanation: 'Isolated, rolling flames (“rollover”) in the upper smoke layer are a classic early warning of flashover.',
    difficulty: 1
  },
  {
    id: 'FFI-SCBA-001',
    exam: 'TCFP',
    section: 'Firefighter I',
    topic: 'SCBA',
    prompt: 'When should SCBA be worn on a structure fire incident?',
    choices: [
      'Only when visible flames are present',
      'Any time you enter or may enter an atmosphere that is IDLH or potentially IDLH',
      'Only during interior attack operations',
      'Only when ordered by the safety officer'
    ],
    answerIndex: 1,
    explanation: 'SCBA is required for any known or suspected IDLH environment, including overhaul until air monitoring clears the area.',
    difficulty: 1
  },
  {
    id: 'FFI-LADDERS-001',
    exam: 'TCFP',
    section: 'Firefighter I',
    topic: 'Ladders',
    prompt: 'At what approximate angle should a ground ladder be placed for safe climbing?',
    choices: [
      '45 degrees',
      '60 degrees',
      '75 degrees',
      '90 degrees'
    ],
    answerIndex: 2,
    explanation: 'Around 75 degrees (1:4 ratio base distance to working length) provides a safe climbing angle.',
    difficulty: 1
  },
  {
    id: 'FFII-ICS-001',
    exam: 'TCFP',
    section: 'Firefighter II',
    topic: 'ICS',
    prompt: 'Who has overall responsibility for managing the incident under the Incident Command System (ICS)?',
    choices: [
      'Operations Section Chief',
      'Incident Commander',
      'Safety Officer',
      'Public Information Officer'
    ],
    answerIndex: 1,
    explanation: 'The Incident Commander is responsible for overall management of the incident.',
    difficulty: 1
  },
  {
    id: 'HAZ-001',
    exam: 'TCFP',
    section: 'HazMat Awareness',
    topic: 'HazMat',
    prompt: 'A four-digit UN/NA identification number on an orange panel is used to:',
    choices: [
      'Indicate building construction type',
      'Identify a specific hazardous material',
      'Show the maximum allowable storage quantity',
      'Indicate the nearest fire hydrant'
    ],
    answerIndex: 1,
    explanation: 'The 4-digit UN/NA number is a unique identifier for the hazardous material, referenced in the ERG.',
    difficulty: 1
  },
  {
    id: 'EMS-AIRWAY-001',
    exam: 'NREMT',
    section: 'EMS Foundations',
    topic: 'EMS Airway',
    prompt: 'A responsive adult who is choking and cannot speak or cough should receive:',
    choices: [
      'Back blows only',
      'Abdominal thrusts until the obstruction clears or they become unresponsive',
      'Blind finger sweeps',
      'Immediate chest compressions without assessment'
    ],
    answerIndex: 1,
    explanation: 'Current basic airway management for a conscious choking adult is abdominal thrusts until relieved or they become unresponsive.',
    difficulty: 1
  },
  {
    id: 'EMS-CARD-001',
    exam: 'NREMT',
    section: 'EMS Foundations',
    topic: 'EMS Cardiology',
    prompt: 'The most important first step in managing a suspected cardiac arrest is:',
    choices: [
      'Obtain a full medical history',
      'Apply oxygen via non-rebreather mask',
      'Start high-quality CPR and have someone activate EMS and get an AED',
      'Place the patient in a position of comfort'
    ],
    answerIndex: 2,
    explanation: 'Early, effective CPR and rapid defibrillation with an AED significantly improve survival in cardiac arrest.',
    difficulty: 1
  }
];

// DOM refs
const streakEl = document.getElementById('streak');
const xpEl = document.getElementById('xp');
const enduranceLevelEl = document.getElementById('enduranceLevel');

const topicSelect = document.getElementById('topicSelect');
const modeSelect = document.getElementById('modeSelect');
const stressModeCheckbox = document.getElementById('stressMode');
const startBtn = document.getElementById('startBtn');
const stressNotice = document.getElementById('stressNotice');

const dashboard = document.getElementById('dashboard');
const quizSection = document.getElementById('quiz');
const summarySection = document.getElementById('summary');

const timerContainer = document.getElementById('timerContainer');
const timerEl = document.getElementById('timer');
const breathingCueEl = document.getElementById('breathingCue');

const sessionMinutesEl = document.getElementById('sessionMinutes');

const questionCountEl = document.getElementById('questionCount');
const questionTopicEl = document.getElementById('questionTopic');
const questionTextEl = document.getElementById('questionText');
const choicesEl = document.getElementById('choices');
const nextBtn = document.getElementById('nextBtn');
const feedbackEl = document.getElementById('feedback');

const summaryTextEl = document.getElementById('summaryText');
const enduranceSummaryEl = document.getElementById('enduranceSummary');
const againBtn = document.getElementById('againBtn');

// State
let state = {
  streak: 0,
  xp: 0,
  bestEnduranceMinutes: 0,
  sessionQuestions: [],
  currentIndex: 0,
  correctCount: 0,
  stressMode: false,
  perQuestionTimer: null,
  timeLeft: 20,
  mode: 'quick',
  sessionEndTime: null,
  sessionStartTime: null,
  sessionTimerInterval: null,
  examMode: false,  // true for 120-min exam sim
  answered: false
};

function loadState() {
  const saved = JSON.parse(localStorage.getItem('fireDrillState') || '{}');
  state.streak = saved.streak || 0;
  state.xp = saved.xp || 0;
  state.bestEnduranceMinutes = saved.bestEnduranceMinutes || 0;
  updateHeader();
}

function saveState() {
  localStorage.setItem('fireDrillState', JSON.stringify({
    streak: state.streak,
    xp: state.xp,
    bestEnduranceMinutes: state.bestEnduranceMinutes
  }));
}

function updateHeader() {
  streakEl.textContent = `Streak: ${state.streak}`;
  xpEl.textContent = `XP: ${state.xp}`;
  enduranceLevelEl.textContent = `Endurance: ${state.bestEnduranceMinutes} min`;
}

function modeToDuration(mode) {
  switch (mode) {
    case 'focus30': return 30;
    case 'focus60': return 60;
    case 'exam120': return 120;
    default: return 0;  // Quick drill = question-limited, not time-limited
  }
}

function pickQuestions(topicValue, mode) {
  let pool = QUESTIONS;
  if (topicValue !== 'all') {
    pool = QUESTIONS.filter(q => q.topic === topicValue);
  }
  const shuffled = [...pool].sort(() => Math.random() - 0.5);

  if (mode === 'quick') {
    return shuffled.slice(0, Math.min(20, shuffled.length));
  }
  if (mode === 'focus30') {
    return shuffled.slice(0, Math.min(40, shuffled.length)); // rough
  }
  if (mode === 'focus60') {
    return shuffled.slice(0, Math.min(80, shuffled.length));
  }
  if (mode === 'exam120') {
    return shuffled.slice(0, Math.min(150, shuffled.length));
  }
  return shuffled;
}

function startSessionTimer(durationMinutes) {
  if (!durationMinutes) {
    sessionMinutesEl.textContent = '∞';
    return;
  }
  state.sessionStartTime = Date.now();
  state.sessionEndTime = state.sessionStartTime + durationMinutes * 60000;
  updateSessionTimeLeft();
  state.sessionTimerInterval = setInterval(updateSessionTimeLeft, 1000 * 15); // update every 15s
}

function updateSessionTimeLeft() {
  if (!state.sessionEndTime) return;
  const now = Date.now();
  const remainingMs = state.sessionEndTime - now;
  const remainingMin = Math.max(0, Math.ceil(remainingMs / 60000));
  sessionMinutesEl.textContent = remainingMin;
  if (remainingMs <= 0) {
    endDrill(true);
  }
}

function clearSessionTimer() {
  if (state.sessionTimerInterval) {
    clearInterval(state.sessionTimerInterval);
    state.sessionTimerInterval = null;
  }
  state.sessionEndTime = null;
}

function startDrill() {
  state.mode = modeSelect.value;
  state.sessionQuestions = pickQuestions(topicSelect.value, state.mode);
  state.currentIndex = 0;
  state.correctCount = 0;
  state.stressMode = stressModeCheckbox.checked;
  state.examMode = state.mode === 'exam120';

  dashboard.classList.add('hidden');
  summarySection.classList.add('hidden');
  quizSection.classList.remove('hidden');

  stressNotice.classList.toggle('hidden', !state.stressMode);
  timerContainer.classList.toggle('hidden', !state.stressMode);

  const durationMinutes = modeToDuration(state.mode);
  startSessionTimer(durationMinutes);

  showQuestion();
