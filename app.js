// Endurance-enabled Fire/EMS drill app with global Supabase leaderboard

(function () {
  // ====== YOUR SUPABASE CONFIG (from .env.local) ======
  const SUPABASE_URL = 'https://jjtbyugsnjufjkhsjuir.supabase.co';
  const SUPABASE_KEY = 'sb_publishable_LA8En2i38dR4X3oqMlCTuQ_vdU0a7HE';
  // ====================================================

  function init() {
    // Question bank for practice drills
    const QUESTIONS = [
  // ------------ FIRE: FIRE BEHAVIOR ------------
  {
    id: 'FFI-FB-001',
    exam: 'TCFP',
    section: 'Firefighter I',
    topic: 'Fire Behavior',
    prompt: 'Which of the following is a classic early indicator of impending flashover in a compartment fire?',
    choices: [
      'Isolated pockets of flame in the hot gas layer near the ceiling',
      'A sudden decrease in smoke density',
      'Blue, clean-burning flames at floor level',
      'A rapid drop in interior temperature'
    ],
    answerIndex: 0,
    explanation: 'Isolated or “rolling” flames in the overhead hot gas layer (rollover) signal that flashover may be near.',
    difficulty: 1
  },
  {
    id: 'FFI-FB-002',
    exam: 'TCFP',
    section: 'Firefighter I',
    topic: 'Fire Behavior',
    prompt: 'What is the primary product of combustion that causes death in structure fires?',
    choices: ['Carbon dioxide', 'Carbon monoxide', 'Nitrogen', 'Hydrogen cyanide only'],
    answerIndex: 1,
    explanation: 'Carbon monoxide is colorless, odorless, and highly toxic, responsible for many fire-related deaths.',
    difficulty: 1
  },
  {
    id: 'FFI-FB-003',
    exam: 'TCFP',
    section: 'Firefighter I',
    topic: 'Fire Behavior',
    prompt: 'A fuel-limited fire is best described as one where:',
    choices: [
      'Oxygen is abundant but fuel is confined',
      'Both fuel and oxygen are unlimited',
      'Fuel is restricted and ventilation has little effect',
      'Ventilation completely controls fire growth'
    ],
    answerIndex: 2,
    explanation: 'In a fuel-limited fire, there is not enough fuel to sustain more growth; adding air has minimal effect.',
    difficulty: 2
  },
  {
    id: 'FFI-FB-004',
    exam: 'TCFP',
    section: 'Firefighter I',
    topic: 'Fire Behavior',
    prompt: 'In modern lightweight construction, why can structural collapse occur earlier than expected?',
    choices: [
      'Steel trusses are always used instead of wood',
      'Fuel loads are lower than in legacy construction',
      'Engineered components fail rapidly when exposed to heat',
      'Gypsum board is more resistant to heat'
    ],
    answerIndex: 2,
    explanation: 'Lightweight engineered components lose strength quickly in fire, leading to early structural failure.',
    difficulty: 2
  },
  {
    id: 'FFI-FB-005',
    exam: 'TCFP',
    section: 'Firefighter I',
    topic: 'Fire Behavior',
    prompt: 'Which term describes a rapid transition from growth stage to fully developed fire involving all exposed combustibles?',
    choices: ['Backdraft', 'Rollover', 'Flashover', 'Autoignition'],
    answerIndex: 2,
    explanation: 'Flashover is the near-simultaneous ignition of all exposed combustibles in a compartment.',
    difficulty: 1
  },

  // ------------ FIRE: PPE / SCBA ------------
  {
    id: 'FFI-PPE-001',
    exam: 'TCFP',
    section: 'Firefighter I',
    topic: 'SCBA',
    prompt: 'When should SCBA be worn on a structure fire incident?',
    choices: [
      'Only when visible flames are present',
      'Only during interior attack',
      'Any time you enter or may enter an IDLH or potentially IDLH atmosphere',
      'Only when directed by the chief officer'
    ],
    answerIndex: 2,
    explanation: 'SCBA is required for any known or suspected IDLH environment, including overhaul until monitoring confirms it is safe.',
    difficulty: 1
  },
  {
    id: 'FFI-PPE-002',
    exam: 'TCFP',
    section: 'Firefighter I',
    topic: 'SCBA',
    prompt: 'What is the correct action when your low-air alarm activates during interior operations?',
    choices: [
      'Continue working until the bottle is empty',
      'Check your gauge and immediately begin exiting with your crew',
      'Switch masks with your partner',
      'Silence the alarm and keep searching'
    ],
    answerIndex: 1,
    explanation: 'Low-air alarm means you must initiate an exit while maintaining crew integrity and situational awareness.',
    difficulty: 1
  },
  {
    id: 'FFI-PPE-003',
    exam: 'TCFP',
    section: 'Firefighter I',
    topic: 'SCBA',
    prompt: 'Which component of the structural PPE ensemble provides thermal protection to the lower torso and legs?',
    choices: ['Helmet', 'Boots', 'Turnout pants with liner', 'Protective hood'],
    answerIndex: 2,
    explanation: 'Turnout pants and coat with thermal liners provide the main body thermal protection.',
    difficulty: 1
  },
  {
    id: 'FFI-PPE-004',
    exam: 'TCFP',
    section: 'Firefighter I',
    topic: 'SCBA',
    prompt: 'Why is it important to fully close your SCBA cylinder valve before removing it from service?',
    choices: [
      'To keep moisture out of the cylinder',
      'To prevent accidental filling',
      'To ensure the regulator drains and doesn’t falsely show residual pressure',
      'It is not important as long as pressure is low'
    ],
    answerIndex: 2,
    explanation: 'Closing the cylinder allows the regulator pressure to bleed off and gives a true zero reading during checks.',
    difficulty: 2
  },
  {
    id: 'FFI-PPE-005',
    exam: 'TCFP',
    section: 'Firefighter I',
    topic: 'SCBA',
    prompt: 'A facepiece seal leak is MOST likely to occur when:',
    choices: [
      'The head harness is overtightened',
      'Facial hair is present where the seal contacts the skin',
      'The user is seated upright',
      'The cylinder is more than half full'
    ],
    answerIndex: 1,
    explanation: 'Beards or stubble in the seal area can prevent an airtight seal and are prohibited for SCBA users.',
    difficulty: 1
  },

  // ------------ FIRE: LADDERS / HOSE / VENT / ICS / HAZMAT ------------
  {
    id: 'FFI-LAD-001',
    exam: 'TCFP',
    section: 'Firefighter I',
    topic: 'Ladders',
    prompt: 'The proper climbing angle for a ground ladder is approximately:',
    choices: ['45 degrees', '60 degrees', '75 degrees', '90 degrees'],
    answerIndex: 2,
    explanation: 'About 75 degrees (1:4 ratio of vertical to horizontal distance) is the safe climbing angle.',
    difficulty: 1
  },
  {
    id: 'FFI-LAD-002',
    exam: 'TCFP',
    section: 'Firefighter I',
    topic: 'Ladders',
    prompt: 'When extending a two-section extension ladder, the fly section should generally be:',
    choices: [
      'Inside the bed section',
      'Outside the bed section as per manufacturer recommendations',
      'Either inside or outside with no difference',
      'Fully retracted for safety'
    ],
    answerIndex: 1,
    explanation: 'Most modern ladders are designed to be used fly-out; always follow manufacturer guidelines and department SOPs.',
    difficulty: 2
  },
  {
    id: 'FFI-HOSE-001',
    exam: 'TCFP',
    section: 'Firefighter I',
    topic: 'Hose & Streams',
    prompt: 'Which nozzle pattern provides maximum reach and penetration for interior attack?',
    choices: ['Wide fog', 'Narrow fog', 'Straight stream', 'Broken stream'],
    answerIndex: 2,
    explanation: 'A straight stream has greater reach and penetration for attacking seat of the fire.',
    difficulty: 1
  },
  {
    id: 'FFI-HOSE-002',
    exam: 'TCFP',
    section: 'Firefighter I',
    topic: 'Hose & Streams',
    prompt: 'The most common size hoseline for initial interior attack in many departments is:',
    choices: ['1 inch', '1¾ inch', '2½ inch', '3 inch'],
    answerIndex: 1,
    explanation: 'A 1¾-inch line balances fire flow with maneuverability for most interior attacks.',
    difficulty: 1
  },
  {
    id: 'FFI-VENT-001',
    exam: 'TCFP',
    section: 'Firefighter I',
    topic: 'Ventilation',
    prompt: 'Positive pressure ventilation (PPV) should be coordinated with:',
    choices: [
      'Immediately upon arrival without communication',
      'Fire attack and interior crews, to avoid pushing fire onto them',
      'Dispatch, prior to water supply',
      'Salvage operations only'
    ],
    answerIndex: 1,
    explanation: 'PPV must be coordinated with interior attack so that airflow does not worsen conditions or spread fire.',
    difficulty: 2
  },
  {
    id: 'FFI-VENT-002',
    exam: 'TCFP',
    section: 'Firefighter I',
    topic: 'Ventilation',
    prompt: 'Vertical ventilation is MOST effective when:',
    choices: [
      'A hole is cut anywhere on the roof',
      'It is performed directly over the fire room when structural conditions allow',
      'It is done on the leeward side only',
      'It is delayed until after overhaul'
    ],
    answerIndex: 1,
    explanation: 'Vent over the fire compartment (if safe) to release heat and smoke from the area of involvement.',
    difficulty: 2
  },
  {
    id: 'FFII-ICS-001',
    exam: 'TCFP',
    section: 'Firefighter II',
    topic: 'ICS',
    prompt: 'Who has overall responsibility for managing an incident within the Incident Command System?',
    choices: [
      'Operations Section Chief',
      'Safety Officer',
      'Incident Commander',
      'Public Information Officer'
    ],
    answerIndex: 2,
    explanation: 'The Incident Commander is ultimately responsible for overall incident management.',
    difficulty: 1
  },
  {
    id: 'FFII-ICS-002',
    exam: 'TCFP',
    section: 'Firefighter II',
    topic: 'ICS',
    prompt: 'Span of control is generally considered optimal when one supervisor manages:',
    choices: ['1–2 subordinates', '3–7 subordinates', '8–12 subordinates', '12 or more subordinates'],
    answerIndex: 1,
    explanation: 'ICS recommends span of control between 3 and 7 individuals, with 5 being ideal.',
    difficulty: 1
  },
  {
    id: 'HAZ-AWR-001',
    exam: 'TCFP',
    section: 'HazMat Awareness',
    topic: 'HazMat',
    prompt: 'The four-digit UN/NA number on an orange panel is used to:',
    choices: [
      'Identify the carrier company',
      'Identify the specific hazardous material',
      'Show the maximum container pressure',
      'Indicate the evacuation distance'
    ],
    answerIndex: 1,
    explanation: 'The UN/NA number uniquely identifies the hazardous material and is referenced in the ERG.',
    difficulty: 1
  },
  {
    id: 'HAZ-AWR-002',
    exam: 'TCFP',
    section: 'HazMat Awareness',
    topic: 'HazMat',
    prompt: 'At the awareness level, the primary responsibility of firefighters at a HazMat incident is to:',
    choices: [
      'Stop the leak and plug the container',
      'Rescue victims in the hot zone',
      'Recognize, isolate, and notify',
      'Overpack damaged drums'
    ],
    answerIndex: 2,
    explanation: 'Awareness-level personnel should recognize the presence of hazardous materials, isolate the area, and notify appropriate resources.',
    difficulty: 1
  },

  // ------------ FIRE: RESCUE / ROPES / WATER SUPPLY ------------
  {
    id: 'FFI-RESCUE-001',
    exam: 'TCFP',
    section: 'Firefighter I',
    topic: 'Rescue',
    prompt: 'When conducting a primary search, the BEST way to maintain orientation is to:',
    choices: [
      'Always stand upright',
      'Rely solely on flashlights',
      'Use walls, hoselines, or lifelines as physical reference points',
      'Move quickly without contact to save time'
    ],
    answerIndex: 2,
    explanation: 'Maintaining contact with walls, hoselines, or lifelines helps firefighters stay oriented and find their way out.',
    difficulty: 1
  },
  {
    id: 'FFI-ROPES-001',
    exam: 'TCFP',
    section: 'Firefighter I',
    topic: 'Ropes',
    prompt: 'Which knot is commonly used to hoist a charged hoseline?',
    choices: ['Clove hitch with overhand safety', 'Figure eight on a bight', 'Bowline', 'Half hitch only'],
    answerIndex: 0,
    explanation: 'A clove hitch backed up with an overhand safety is commonly used to secure and hoist hoselines.',
    difficulty: 2
  },
  {
    id: 'FFI-WATER-001',
    exam: 'TCFP',
    section: 'Firefighter I',
    topic: 'Water Supply',
    prompt: 'Which appliance is used to allow additional hose lines to be connected to a hydrant without interrupting flow?',
    choices: ['Wye', 'Siamese', 'Gated wye', 'Hydrant gate valve'],
    answerIndex: 3,
    explanation: 'A hydrant gate valve allows another line to be added or removed while maintaining flow from the hydrant.',
    difficulty: 2
  },

  // ============ EMS: AIRWAY ============
  {
    id: 'EMS-AIRWAY-001',
    exam: 'NREMT',
    section: 'Airway/Respiration/Ventilation',
    topic: 'EMS Airway',
    prompt: 'A responsive adult who is choking and cannot speak or cough should receive:',
    choices: [
      'Back blows only',
      'Abdominal thrusts until the obstruction clears or they become unresponsive',
      'Blind finger sweeps',
      'Immediate chest compressions without assessment'
    ],
    answerIndex: 1,
    explanation: 'Abdominal thrusts are indicated for a conscious choking adult who cannot cough, speak, or breathe.',
    difficulty: 1
  },
  {
    id: 'EMS-AIRWAY-002',
    exam: 'NREMT',
    section: 'Airway/Respiration/Ventilation',
    topic: 'EMS Airway',
    prompt: 'The MOST reliable indicator of adequate ventilation in a patient receiving BVM ventilations is:',
    choices: [
      'Visible chest rise and fall with each ventilation',
      'Fogging in the mask',
      'Ventilating as fast as possible',
      'High-pitched airway sounds'
    ],
    answerIndex: 0,
    explanation: 'Visible, equal chest rise and fall indicates that air is moving effectively into the lungs.',
    difficulty: 1
  },
  {
    id: 'EMS-AIRWAY-003',
    exam: 'NREMT',
    section: 'Airway/Respiration/Ventilation',
    topic: 'EMS Airway',
    prompt: 'Inserting an oropharyngeal airway (OPA) is contraindicated when the patient:',
    choices: [
      'Is unresponsive with no gag reflex',
      'Has a suspected cervical spine injury',
      'Exhibits an intact gag reflex',
      'Is being assisted with a BVM'
    ],
    answerIndex: 2,
    explanation: 'An OPA should not be used in patients with an intact gag reflex because it may cause vomiting or laryngospasm.',
    difficulty: 1
  },
  {
    id: 'EMS-AIRWAY-004',
    exam: 'NREMT',
    section: 'Airway/Respiration/Ventilation',
    topic: 'EMS Airway',
    prompt: 'A 4-year-old child in respiratory distress is best positioned:',
    choices: [
      'Supine with head extended',
      'In a position of comfort, usually sitting upright',
      'Prone with head turned to the side',
      'Trendelenburg position'
    ],
    answerIndex: 1,
    explanation: 'Children in respiratory distress often prefer to sit upright; forcing supine position may worsen distress.',
    difficulty: 2
  },

  // ============ EMS: CARDIOLOGY ============
  {
    id: 'EMS-CARD-001',
    exam: 'NREMT',
    section: 'Cardiology/Resuscitation',
    topic: 'EMS Cardiology',
    prompt: 'The most important initial step in managing a suspected cardiac arrest is to:',
    choices: [
      'Apply oxygen via nonrebreather mask',
      'Obtain a detailed medical history',
      'Begin high-quality CPR and have someone activate EMS/get an AED',
      'Place the patient in a position of comfort'
    ],
    answerIndex: 2,
    explanation: 'Early, high-quality CPR and rapid defibrillation drastically improve survival in cardiac arrest.',
    difficulty: 1
  },
  {
    id: 'EMS-CARD-002',
    exam: 'NREMT',
    section: 'Cardiology/Resuscitation',
    topic: 'EMS Cardiology',
    prompt: 'Which finding is MOST concerning in a patient with chest pain?',
    choices: [
      'Sharp pain that worsens with movement',
      'Dull, pressure-like pain radiating to the jaw or arm',
      'Localized pain reproducible with palpation',
      'Brief stabbing pain lasting less than one second'
    ],
    answerIndex: 1,
    explanation: 'Pressure-like pain with radiation is classic for myocardial ischemia and must be treated emergently.',
    difficulty: 1
  },
  {
    id: 'EMS-CARD-003',
    exam: 'NREMT',
    section: 'Cardiology/Resuscitation',
    topic: 'EMS Cardiology',
    prompt: 'Hypoperfusion (shock) is BEST indicated by:',
    choices: [
      'Warm, dry skin and bounding pulses',
      'Cool, clammy skin and altered mental status',
      'Slow, regular pulse with normal mentation',
      'Pink, dry skin and brisk capillary refill'
    ],
    answerIndex: 1,
    explanation: 'Cool, clammy skin with altered mental status suggests inadequate tissue perfusion.',
    difficulty: 1
  },

  // ============ EMS: TRAUMA ============
  {
    id: 'EMS-TRAUMA-001',
    exam: 'NREMT',
    section: 'Trauma',
    topic: 'Trauma',
    prompt: 'The FIRST priority in managing a patient with severe external bleeding is to:',
    choices: [
      'Start oxygen via nonrebreather',
      'Apply direct pressure to the wound',
      'Obtain a baseline set of vital signs',
      'Give the patient something to drink'
    ],
    answerIndex: 1,
    explanation: 'Direct pressure is the primary first step for life-threatening external hemorrhage.',
    difficulty: 1
  },
  {
    id: 'EMS-TRAUMA-002',
    exam: 'NREMT',
    section: 'Trauma',
    topic: 'Trauma',
    prompt: 'A patient thrown from a motorcycle and found lying unresponsive should initially be managed with:',
    choices: [
      'Manual c-spine stabilization and airway assessment',
      'Splinting of extremities first',
      'Walking them to the ambulance',
      'Immediate history-taking from bystanders'
    ],
    answerIndex: 0,
    explanation: 'Mechanism suggests spinal injury; manual stabilization and airway/breathing assessment take priority.',
    difficulty: 1
  },
  {
    id: 'EMS-TRAUMA-003',
    exam: 'NREMT',
    section: 'Trauma',
    topic: 'Trauma',
    prompt: 'Which sign is most consistent with tension pneumothorax?',
    choices: [
      'Bilateral equal breath sounds',
      'Bradycardia with bounding pulses',
      'Severe respiratory distress with absent breath sounds on one side and hypotension',
      'Pink frothy sputum'
    ],
    answerIndex: 2,
    explanation: 'Absent breath sounds on one side, respiratory distress, and signs of shock suggest tension pneumothorax.',
    difficulty: 2
  },

  // ============ EMS: MEDICAL / OB / PEDS / OPERATIONS ============
  {
    id: 'EMS-MED-001',
    exam: 'NREMT',
    section: 'Medical',
    topic: 'Medical',
    prompt: 'A patient with altered mental status and a medical alert bracelet stating “diabetic” is found cool and clammy. You should suspect:',
    choices: ['Hypoglycemia', 'Hyperglycemia', 'Stroke', 'Alcohol intoxication only'],
    answerIndex: 0,
    explanation: 'Cool, pale, clammy skin and AMS in a diabetic strongly suggest hypoglycemia.',
    difficulty: 1
  },
  {
    id: 'EMS-MED-002',
    exam: 'NREMT',
    section: 'Medical',
    topic: 'Medical',
    prompt: 'Which of the following is an appropriate question when assessing a patient with difficulty breathing?',
    choices: [
      '“How many cups of coffee do you drink?”',
      '“Do you feel short of breath when lying flat?”',
      '“What did you eat for breakfast?”',
      '“Have you ever broken a bone?”'
    ],
    answerIndex: 1,
    explanation: 'Orthopnea (worse when lying flat) can indicate heart failure and fluid in the lungs.',
    difficulty: 2
  },
  {
    id: 'EMS-OB-001',
    exam: 'NREMT',
    section: 'OB/Peds',
    topic: 'OB',
    prompt: 'During a field delivery, the first action after the baby’s head delivers and you see the cord loosely around the neck is to:',
    choices: [
      'Clamp and cut the cord immediately',
      'Gently slip the cord over the baby’s head if possible',
      'Pull firmly on the cord to speed delivery',
      'Push the baby back in'
    ],
    answerIndex: 1,
    explanation: 'A loose nuchal cord should be gently slipped over the head if possible; clamping/cutting is reserved for tight cords.',
    difficulty: 2
  },
  {
    id: 'EMS-PEDS-001',
    exam: 'NREMT',
    section: 'OB/Peds',
    topic: 'Pediatrics',
    prompt: 'Which sign is MOST concerning in a pediatric patient with respiratory distress?',
    choices: [
      'Mild nasal flaring',
      'Playful behavior and normal skin color',
      'Grunting respirations and head bobbing',
      'Heart rate appropriate for age'
    ],
    answerIndex: 2,
    explanation: 'Grunting and head bobbing indicate impending respiratory failure in children.',
    difficulty: 2
  },
  {
    id: 'EMS-OPS-001',
    exam: 'NREMT',
    section: 'Operations',
    topic: 'Operations',
    prompt: 'The primary purpose of standard precautions (body substance isolation) is to:',
    choices: [
      'Protect the patient from infection',
      'Protect EMS providers from exposure to blood and body fluids',
      'Comply with local fire codes',
      'Avoid documentation'
    ],
    answerIndex: 1,
    explanation: 'Gloves, eye protection, and other barriers are used to prevent provider exposure to potentially infectious materials.',
    difficulty: 1
  },
  {
    id: 'EMS-OPS-002',
    exam: 'NREMT',
    section: 'Operations',
    topic: 'Operations',
    prompt: 'You arrive at a scene with multiple patients and downed power lines. Your FIRST action should be to:',
    choices: [
      'Begin triage immediately',
      'Move the power lines with a dry tool',
      'Stage at a safe distance and request the power company',
      'Transport the most critical patient at once'
    ],
    answerIndex: 2,
    explanation: 'Scene safety comes first; stay clear and request utility company before entering the hazard area.',
    difficulty: 1
  }
];

    // DOM refs
    const streakEl = document.getElementById('streak');
    const xpEl = document.getElementById('xp');
    const enduranceLevelEl = document.getElementById('enduranceLevel');
    const usernameDisplayEl = document.getElementById('usernameDisplay');

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

    const leaderboardListEl = document.getElementById('leaderboardList');
    const leaderboardNoteEl = document.getElementById('leaderboardNote');

    if (!startBtn) {
      console.error('Start button not found; check HTML IDs.');
      return;
    }

    // State
    let state = {
      streak: 0,
      xp: 0,
      bestEnduranceMinutes: 0,
      sessions: 0,
      username: null,
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
      examMode: false,
      answered: false
    };

    // ---------- USERNAME (CALL SIGN) ----------
    function promptForUsername() {
      let name = '';
      while (!name) {
        name = window.prompt('Enter your call sign (nickname used on the leaderboard):');
        if (name === null) continue;
        name = name.trim();
      }
      return name;
    }

    function ensureUsername() {
      try {
        const stored = localStorage.getItem('fireDrillUsername');
        if (stored) {
          state.username = stored;
        } else {
          const name = promptForUsername();
          state.username = name;
          localStorage.setItem('fireDrillUsername', name);
        }
      } catch (e) {
        if (!state.username) {
          state.username = promptForUsername();
        }
      }
      if (usernameDisplayEl) {
        usernameDisplayEl.textContent = `Call sign: ${state.username}`;
      }
    }

    // ---------- LOCAL STORAGE FOR STATS ----------
    function safeLoad() {
      try {
        const saved = JSON.parse(localStorage.getItem('fireDrillState') || '{}');
        state.streak = saved.streak || 0;
        state.xp = saved.xp || 0;
        state.bestEnduranceMinutes = saved.bestEnduranceMinutes || 0;
        state.sessions = saved.sessions || 0;
      } catch (e) {
        // ignore
      }
      updateHeader();
    }

    function safeSave() {
      try {
        localStorage.setItem(
          'fireDrillState',
          JSON.stringify({
            streak: state.streak,
            xp: state.xp,
            bestEnduranceMinutes: state.bestEnduranceMinutes,
            sessions: state.sessions
          })
        );
      } catch (e) {
        // ignore
      }
    }

    // ---------- SUPABASE HELPERS ----------
    async function syncScoreToSupabase() {
      if (!SUPABASE_URL || !SUPABASE_KEY || !state.username) return;

      const payload = [
        {
          username: state.username,
          xp: state.xp,
          best_endurance_minutes: state.bestEnduranceMinutes,
          sessions: state.sessions
        }
      ];

      try {
        await fetch(`${SUPABASE_URL}/rest/v1/scores`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            apikey: SUPABASE_KEY,
            Authorization: `Bearer ${SUPABASE_KEY}`,
            Prefer: 'resolution=merge-duplicates'
          },
          body: JSON.stringify(payload)
        });
      } catch (e) {
        console.warn('Failed to sync score to Supabase', e);
      }
    }

    function renderLeaderboard(rows) {
      if (!leaderboardListEl) return;
      leaderboardListEl.innerHTML = '';

      if (!rows || rows.length === 0) {
        if (leaderboardNoteEl) {
          leaderboardNoteEl.textContent = 'No scores yet. Finish a session to claim your spot.';
        }
        return;
      }

      if (leaderboardNoteEl) {
        leaderboardNoteEl.textContent = 'Top call signs (by XP):';
      }

      rows.forEach((row, index) => {
        const li = document.createElement('li');
        const you = row.username === state.username ? ' (you)' : '';
        li.textContent = `${index + 1}. ${row.username}${you} – ${row.xp} XP – ${row.best_endurance_minutes} min – ${row.sessions} sessions`;
        leaderboardListEl.appendChild(li);
      });
    }

    async function loadLeaderboard() {
      if (!SUPABASE_URL || !SUPABASE_KEY) return;
      try {
        const res = await fetch(
          `${SUPABASE_URL}/rest/v1/scores?select=username,xp,best_endurance_minutes,sessions&order=xp.desc&limit=20`,
          {
            headers: {
              apikey: SUPABASE_KEY,
              Authorization: `Bearer ${SUPABASE_KEY}`
            }
          }
        );
        const data = await res.json();
        renderLeaderboard(data);
      } catch (e) {
        console.warn('Failed to load leaderboard from Supabase', e);
      }
    }

    // ---------- UI HELPERS ----------
    function updateHeader() {
      streakEl.textContent = `Streak: ${state.streak}`;
      xpEl.textContent = `XP: ${state.xp}`;
      enduranceLevelEl.textContent = `Endurance: ${state.bestEnduranceMinutes} min`;
    }

    function modeToDuration(mode) {
      switch (mode) {
        case 'focus30':
          return 30;
        case 'focus60':
          return 60;
        case 'exam120':
          return 120;
        default:
          return 0;
      }
    }

    function pickQuestions(topicValue, mode) {
      let pool = QUESTIONS;
      if (topicValue !== 'all') {
        pool = QUESTIONS.filter(q => q.topic === topicValue);
      }
      const shuffled = [...pool].sort(() => Math.random() - 0.5);

      if (mode === 'quick') return shuffled.slice(0, Math.min(20, shuffled.length));
      if (mode === 'focus30') return shuffled.slice(0, Math.min(40, shuffled.length));
      if (mode === 'focus60') return shuffled.slice(0, Math.min(80, shuffled.length));
      if (mode === 'exam120') return shuffled.slice(0, Math.min(150, shuffled.length));
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
      state.sessionTimerInterval = setInterval(updateSessionTimeLeft, 15000);
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
    }

    function showQuestion() {
      clearPerQuestionTimer();
      feedbackEl.textContent = '';
      nextBtn.classList.add('hidden');
      choicesEl.innerHTML = '';
      state.answered = false;

      if (state.currentIndex >= state.sessionQuestions.length) {
        endDrill(false);
        return;
      }

      const q = state.sessionQuestions[state.currentIndex];
      questionCountEl.textContent = `Question ${state.currentIndex + 1} of ${state.sessionQuestions.length}`;
      questionTopicEl.textContent = q.topic;
      questionTextEl.textContent = q.prompt;

      q.choices.forEach((choice, idx) => {
        const btn = document.createElement('button');
        btn.className = 'choice-btn';
        btn.textContent = choice;
        btn.addEventListener('click', () => handleAnswer(idx));
        choicesEl.appendChild(btn);
      });

      if (state.stressMode) {
        state.timeLeft = 20;
        timerEl.textContent = state.timeLeft;
        breathingCueEl.textContent = 'Breathe in…';
        state.perQuestionTimer = setInterval(() => {
          state.timeLeft--;
          timerEl.textContent = state.timeLeft;
          breathingCueEl.textContent = state.timeLeft % 4 < 2 ? 'Breathe in…' : 'Breathe out…';
          if (state.timeLeft <= 0) {
            clearPerQuestionTimer();
            handleAnswer(null);
          }
        }, 1000);
      } else {
        timerEl.textContent = '-';
      }
    }

    function clearPerQuestionTimer() {
      if (state.perQuestionTimer) {
        clearInterval(state.perQuestionTimer);
        state.perQuestionTimer = null;
      }
    }

    function handleAnswer(selectedIndex) {
      if (state.answered) return;
      state.answered = true;
      clearPerQuestionTimer();

      const q = state.sessionQuestions[state.currentIndex];
      const buttons = choicesEl.querySelectorAll('.choice-btn');

      buttons.forEach((btn, idx) => {
        btn.disabled = true;
        if (idx === q.answerIndex) btn.classList.add('correct');
        if (selectedIndex !== null && idx === selectedIndex && idx !== q.answerIndex) {
          btn.classList.add('incorrect');
        }
      });

      if (selectedIndex === q.answerIndex) {
        state.correctCount++;
        state.xp += state.examMode ? 8 : 5;
        if (!state.examMode) feedbackEl.textContent = 'Correct.';
      } else if (selectedIndex === null) {
        if (!state.examMode) {
          feedbackEl.textContent = `Time up. Correct answer: ${q.choices[q.answerIndex]}. ${q.explanation}`;
        }
      } else {
        if (!state.examMode) {
          feedbackEl.textContent = `Incorrect. ${q.explanation}`;
        }
      }

      updateHeader();
      safeSave();
      nextBtn.classList.remove('hidden');
    }

    function nextQuestion() {
      state.currentIndex++;
      showQuestion();
    }

    function endDrill(timeExpired) {
      clearPerQuestionTimer();
      clearSessionTimer();
      quizSection.classList.add('hidden');
      summarySection.classList.remove('hidden');

      const total = state.sessionQuestions.length;
      const pct = total ? Math.round((state.correctCount / total) * 100) : 0;
      const now = Date.now();
      let usedMinutes = 0;
      if (state.sessionStartTime) {
        usedMinutes = Math.round((now - state.sessionStartTime) / 60000);
      }

      summaryTextEl.textContent =
        `You answered ${state.correctCount} of ${total} correctly (${pct}%).` +
        (timeExpired ? ' Session ended because the endurance time was up.' : '');
      enduranceSummaryEl.textContent = usedMinutes
        ? `Focus time this session: ~${usedMinutes} minutes.`
        : '';

      if (usedMinutes > state.bestEnduranceMinutes) {
        state.bestEnduranceMinutes = usedMinutes;
      }

      state.streak++;
      state.sessions++;

      updateHeader();
      safeSave();
      syncScoreToSupabase();
      loadLeaderboard();
    }

    // Event wiring + startup
    startBtn.addEventListener('click', startDrill);
    nextBtn.addEventListener('click', nextQuestion);
    againBtn.addEventListener('click', () => {
      summarySection.classList.add('hidden');
      dashboard.classList.remove('hidden');
    });

    safeLoad();
    ensureUsername();
    loadLeaderboard();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
