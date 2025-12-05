// Fire/EMS Drill app with endurance modes + global Supabase leaderboard
// Full version with 120+ questions (20 per main topic in dropdown)

(function () {
  // ====== SUPABASE CONFIG (already set up in your project) ======
  const SUPABASE_URL = 'https://jjtbyugsnjufjkhsjuir.supabase.co';
  const SUPABASE_KEY = 'sb_publishable_LA8En2i38dR4X3oqMlCTuQ_vdU0a7HE';
  // ===============================================================

  function init() {
    // ================== QUESTION BANK ==================
    // At least 20 per dropdown topic: Fire Behavior, SCBA, Ladders, ICS, HazMat, EMS Airway

    const QUESTIONS = [
      // ------------ FIRE: FIRE BEHAVIOR (20) ------------
      {
        id: 'FB-001',
        exam: 'TCFP',
        section: 'Firefighter I',
        topic: 'Fire Behavior',
        prompt: 'Which visual sign is a classic early indicator of impending flashover?',
        choices: [
          'Isolated “tongues” of flame in the hot gas layer (rollover)',
          'Clear upper air and smoke low to the floor',
          'Heavy white steam at floor level',
          'Blue flame hugging the floor only'
        ],
        answerIndex: 0,
        explanation: 'Rollover—isolated flames in the hot gas layer—is a major warning sign that flashover may be near.',
        difficulty: 1
      },
      {
        id: 'FB-002',
        exam: 'TCFP',
        section: 'Firefighter I',
        topic: 'Fire Behavior',
        prompt: 'The PRIMARY toxic gas responsible for many fire deaths is:',
        choices: ['Carbon dioxide', 'Carbon monoxide', 'Nitrogen', 'Ozone'],
        answerIndex: 1,
        explanation: 'Carbon monoxide is colorless, odorless, and highly toxic, binding to hemoglobin more readily than oxygen.',
        difficulty: 1
      },
      {
        id: 'FB-003',
        exam: 'TCFP',
        section: 'Firefighter I',
        topic: 'Fire Behavior',
        prompt: 'Which term describes the lowest temperature at which a liquid gives off enough vapors to ignite?',
        choices: ['Fire point', 'Flash point', 'Autoignition temperature', 'Boiling point'],
        answerIndex: 1,
        explanation: 'Flash point is the lowest temperature at which a liquid produces enough vapors to momentarily ignite.',
        difficulty: 1
      },
      {
        id: 'FB-004',
        exam: 'TCFP',
        section: 'Firefighter I',
        topic: 'Fire Behavior',
        prompt: 'A ventilation-limited fire is one in which:',
        choices: [
          'Fuel is plentiful but oxygen is restricted',
          'Oxygen is plentiful but fuel is restricted',
          'Both fuel and oxygen are unlimited',
          'Ventilation has no effect on fire behavior'
        ],
        answerIndex: 0,
        explanation: 'Ventilation-limited means growth is controlled primarily by available oxygen, not fuel.',
        difficulty: 2
      },
      {
        id: 'FB-005',
        exam: 'TCFP',
        section: 'Firefighter I',
        topic: 'Fire Behavior',
        prompt: 'Which of the following BEST describes backdraft conditions?',
        choices: [
          'Well-ventilated room with light gray smoke',
          'Room with high heat, smoke-stained windows, and no visible flame',
          'Room fully involved with fire venting out windows',
          'Outdoor brush fire with wind driving the flames'
        ],
        answerIndex: 1,
        explanation: 'Backdraft conditions: superheated, under-ventilated compartment, often with dark, pulsing smoke and no visible flame.',
        difficulty: 2
      },
      {
        id: 'FB-006',
        exam: 'TCFP',
        section: 'Firefighter I',
        topic: 'Fire Behavior',
        prompt: 'Which stage of fire is characterized by all combustibles in the compartment being involved?',
        choices: ['Incipient', 'Growth', 'Fully developed', 'Decay'],
        answerIndex: 2,
        explanation: 'In the fully developed stage, fire has spread throughout the compartment consuming all available fuel.',
        difficulty: 1
      },
      {
        id: 'FB-007',
        exam: 'TCFP',
        section: 'Firefighter I',
        topic: 'Fire Behavior',
        prompt: 'The transfer of heat through a solid object, such as a steel beam, is called:',
        choices: ['Convection', 'Radiation', 'Conduction', 'Conversion'],
        answerIndex: 2,
        explanation: 'Conduction is heat transfer through a solid medium.',
        difficulty: 1
      },
      {
        id: 'FB-008',
        exam: 'TCFP',
        section: 'Firefighter I',
        topic: 'Fire Behavior',
        prompt: 'Smoke that is turbulent, dark, and pushing under high pressure from small openings suggests:',
        choices: [
          'Light content fire with minimal heat',
          'High heat and a potentially hostile fire event',
          'Steam from successful suppression',
          'Safe conditions for overhaul'
        ],
        answerIndex: 1,
        explanation: 'Turbulent, pressurized dark smoke indicates high heat and potential for flashover or other rapid fire events.',
        difficulty: 2
      },
      {
        id: 'FB-009',
        exam: 'TCFP',
        section: 'Firefighter I',
        topic: 'Fire Behavior',
        prompt: 'In which type of building is early structural collapse MOST likely in a fire?',
        choices: [
          'Heavy timber mill construction',
          'Modern lightweight wood truss construction',
          'Masonry with full-dimension lumber joists',
          'Concrete tilt-wall warehouse'
        ],
        answerIndex: 1,
        explanation: 'Lightweight wood trusses fail quickly when exposed to fire due to small cross-sections and connectors.',
        difficulty: 2
      },
      {
        id: 'FB-010',
        exam: 'TCFP',
        section: 'Firefighter I',
        topic: 'Fire Behavior',
        prompt: 'The amount of heat released by a fire per unit of time is called:',
        choices: ['Heat capacity', 'Heat of combustion', 'Heat release rate', 'Specific heat'],
        answerIndex: 2,
        explanation: 'Heat Release Rate (HRR) is key to understanding modern fuel loads and fire growth.',
        difficulty: 2
      },
      {
        id: 'FB-011',
        exam: 'TCFP',
        section: 'Firefighter I',
        topic: 'Fire Behavior',
        prompt: 'Which form of heat transfer is MOST responsible for preheating fuels ahead of a fire?',
        choices: ['Conduction only', 'Radiation and convection', 'Convection only', 'Latent heat'],
        answerIndex: 1,
        explanation: 'Radiation and convection from the fire plume preheat fuels ahead of the flame front.',
        difficulty: 2
      },
      {
        id: 'FB-012',
        exam: 'TCFP',
        section: 'Firefighter I',
        topic: 'Fire Behavior',
        prompt: 'Autoignition temperature is defined as the temperature at which a fuel:',
        choices: [
          'Begins to off-gas vapors',
          'Will ignite and sustain combustion without an external ignition source',
          'Reaches its flash point',
          'Stops supporting combustion'
        ],
        answerIndex: 1,
        explanation: 'Autoignition temperature is the point at which a fuel self-ignites without a spark or flame.',
        difficulty: 2
      },
      {
        id: 'FB-013',
        exam: 'TCFP',
        section: 'Firefighter I',
        topic: 'Fire Behavior',
        prompt: 'Which factor MOST affects the time to flashover in modern residential fires?',
        choices: [
          'Type of drywall screws used',
          'Synthetic fuel loads and room geometry',
          'Color of furnishings',
          'Presence of smoke alarms'
        ],
        answerIndex: 1,
        explanation: 'High synthetic fuel loads and room geometry drive rapid HRR and quicker flashover in modern residences.',
        difficulty: 2
      },
      {
        id: 'FB-014',
        exam: 'TCFP',
        section: 'Firefighter I',
        topic: 'Fire Behavior',
        prompt: 'A fuel-controlled fire is MOST likely to occur in:',
        choices: [
          'A small sealed compartment',
          'The open air with plenty of oxygen',
          'A compartment with closed doors and windows',
          'A structure with no vent openings'
        ],
        answerIndex: 1,
        explanation: 'Outdoors or well-ventilated spaces usually produce fuel-controlled fires.',
        difficulty: 1
      },
      {
        id: 'FB-015',
        exam: 'TCFP',
        section: 'Firefighter I',
        topic: 'Fire Behavior',
        prompt: 'What is the primary reason modern furniture burns faster than legacy solid-wood furniture?',
        choices: [
          'Less mass overall',
          'Use of lightweight steel legs',
          'Foamed plastics and synthetics with high heat release rates',
          'Lower moisture content in modern wood'
        ],
        answerIndex: 2,
        explanation: 'Foamed plastics and synthetics have very high heat release rates compared to legacy solid wood.',
        difficulty: 2
      },
      {
        id: 'FB-016',
        exam: 'TCFP',
        section: 'Firefighter I',
        topic: 'Fire Behavior',
        prompt: 'Which condition MOST suggests impending collapse of a lightweight truss roof?',
        choices: [
          'Water coming through the ceiling',
          'Small isolated flames near eaves',
          'Prolonged fire involvement in the truss space',
          'Presence of multiple skylights'
        ],
        answerIndex: 2,
        explanation: 'Extended fire exposure in the truss space quickly weakens members and can lead to sudden collapse.',
        difficulty: 2
      },
      {
        id: 'FB-017',
        exam: 'TCFP',
        section: 'Firefighter I',
        topic: 'Fire Behavior',
        prompt: 'The neutral plane in a compartment fire is BEST described as:',
        choices: [
          'The point where flame height is maximum',
          'The level where hot smoke exits and cool air enters an opening',
          'The point of zero visibility',
          'The level of the greatest heat'
        ],
        answerIndex: 1,
        explanation: 'The neutral plane is the interface of outflowing hot gases and inflowing cooler air at an opening.',
        difficulty: 2
      },
      {
        id: 'FB-018',
        exam: 'TCFP',
        section: 'Firefighter I',
        topic: 'Fire Behavior',
        prompt: 'Which factor MOST affects how quickly a solid fuel will ignite?',
        choices: [
          'Surface area to mass ratio',
          'Color of the fuel',
          'Ambient humidity only',
          'Age of the structure'
        ],
        answerIndex: 0,
        explanation: 'Higher surface area to mass (like thin wood shavings) ignites faster than large solid pieces.',
        difficulty: 1
      },
      {
        id: 'FB-019',
        exam: 'TCFP',
        section: 'Firefighter I',
        topic: 'Fire Behavior',
        prompt: 'In a multi-story building fire, convection currents will usually cause:',
        choices: [
          'Heat and smoke to remain only on the fire floor',
          'Heat and smoke to travel upward through stairwells and shafts',
          'Fire to burn only downward',
          'Immediate extinguishment of flames'
        ],
        answerIndex: 1,
        explanation: 'Hot gases rise, moving through vertical openings such as stairwells and elevator shafts.',
        difficulty: 1
      },
      {
        id: 'FB-020',
        exam: 'TCFP',
        section: 'Firefighter I',
        topic: 'Fire Behavior',
        prompt: 'Which condition is MOST typical of the decay stage of a compartment fire?',
        choices: [
          'Rapid increase in heat release rate',
          'Complete burnout of all fuel',
          'Lower heat release, but still dangerous toxic gases',
          'No smoke and no heat remain'
        ],
        answerIndex: 2,
        explanation: 'In decay, heat release is reduced but toxic gases and oxygen-starved conditions remain dangerous.',
        difficulty: 1
      },

      // ------------ SCBA / PPE (20) ------------
      {
        id: 'SCBA-001',
        exam: 'TCFP',
        section: 'Firefighter I',
        topic: 'SCBA',
        prompt: 'SCBA must be worn any time firefighters operate in a(n):',
        choices: [
          'IDLH or potentially IDLH atmosphere',
          'Outdoor environment',
          'Area with visible flames only',
          'Area where smoke has fully cleared'
        ],
        answerIndex: 0,
        explanation: 'SCBA is required for any known or suspected IDLH atmosphere until monitoring proves otherwise.',
        difficulty: 1
      },
      {
        id: 'SCBA-002',
        exam: 'TCFP',
        section: 'Firefighter I',
        topic: 'SCBA',
        prompt: 'When the low-air alarm activates during interior operations, you should:',
        choices: [
          'Ignore it until your task is complete',
          'Immediately remove the facepiece',
          'Check your gauge and begin exiting with your crew',
          'Call a MAYDAY immediately'
        ],
        answerIndex: 2,
        explanation: 'Low-air alarm means you must exit while maintaining crew integrity; do not delay.',
        difficulty: 1
      },
      {
        id: 'SCBA-003',
        exam: 'TCFP',
        section: 'Firefighter I',
        topic: 'SCBA',
        prompt: 'Which component of SCBA reduces high cylinder pressure to an intermediate level?',
        choices: ['Facepiece', 'PASS device', 'Regulator', 'First-stage pressure reducer'],
        answerIndex: 3,
        explanation: 'The first-stage pressure reducer takes cylinder pressure down to a manageable intermediate pressure.',
        difficulty: 2
      },
      {
        id: 'SCBA-004',
        exam: 'TCFP',
        section: 'Firefighter I',
        topic: 'SCBA',
        prompt: 'Why are facial hair and beards prohibited in the facepiece seal area?',
        choices: [
          'They interfere with voice transmission only',
          'They increase carbon monoxide exposure',
          'They prevent a proper seal and may allow contaminant entry',
          'They damage the lens'
        ],
        answerIndex: 2,
        explanation: 'Anything in the seal area can compromise the facepiece seal and allow contaminants in.',
        difficulty: 1
      },
      {
        id: 'SCBA-005',
        exam: 'TCFP',
        section: 'Firefighter I',
        topic: 'SCBA',
        prompt: 'Which NFPA standard primarily addresses SCBA for firefighters?',
        choices: ['NFPA 10', 'NFPA 1851', 'NFPA 1981', 'NFPA 1001'],
        answerIndex: 2,
        explanation: 'NFPA 1981 covers Open-Circuit SCBA for Emergency Services.',
        difficulty: 2
      },
      {
        id: 'SCBA-006',
        exam: 'TCFP',
        section: 'Firefighter I',
        topic: 'SCBA',
        prompt: 'The proper method for donning SCBA on a moving apparatus is:',
        choices: [
          'Seat-mounted donning with seatbelt fastened',
          'Turnout gear only until arrival',
          'Donning while standing in the cab without a seatbelt',
          'Donning on the tailboard while moving'
        ],
        answerIndex: 0,
        explanation: 'Seat-mounted donning while belted is the only safe option if donning en route.',
        difficulty: 2
      },
      {
        id: 'SCBA-007',
        exam: 'TCFP',
        section: 'Firefighter I',
        topic: 'SCBA',
        prompt: 'Which step should be done FIRST in the daily SCBA inspection?',
        choices: [
          'Check cylinder pressure',
          'Don the SCBA and go on air',
          'Wash the facepiece',
          'Flow test the regulator'
        ],
        answerIndex: 0,
        explanation: 'Verifying full cylinder pressure is a key first step in daily checks.',
        difficulty: 1
      },
      {
        id: 'SCBA-008',
        exam: 'TCFP',
        section: 'Firefighter I',
        topic: 'SCBA',
        prompt: 'A firefighter in a smoky hallway with zero visibility should maintain orientation by:',
        choices: [
          'Holding a wall, hoseline, or lifeline',
          'Walking quickly upright',
          'Relying only on memory',
          'Following the sound of voices'
        ],
        answerIndex: 0,
        explanation: 'Maintaining physical contact with a wall or line helps ensure you can find your way out.',
        difficulty: 1
      },
      {
        id: 'SCBA-009',
        exam: 'TCFP',
        section: 'Firefighter I',
        topic: 'SCBA',
        prompt: 'To conserve air while on SCBA, firefighters should:',
        choices: [
          'Breathe rapidly and shallowly',
          'Use skip-breathing or controlled breathing techniques',
          'Hold their breath as long as possible',
          'Turn the cylinder valve halfway'
        ],
        answerIndex: 1,
        explanation: 'Controlled breathing or skip-breathing conserves air and maintains comfort under stress.',
        difficulty: 2
      },
      {
        id: 'SCBA-010',
        exam: 'TCFP',
        section: 'Firefighter I',
        topic: 'SCBA',
        prompt: 'Which of the following BEST describes an IDLH atmosphere?',
        choices: [
          'Any environment above 21% oxygen',
          'Any atmosphere that is immediately dangerous to life or health',
          'Any area with a small amount of dust',
          'Any outdoor fireground'
        ],
        answerIndex: 1,
        explanation: 'IDLH is defined as an atmosphere that poses an immediate threat to life or health or impairs escape.',
        difficulty: 1
      },
      {
        id: 'SCBA-011',
        exam: 'TCFP',
        section: 'Firefighter I',
        topic: 'SCBA',
        prompt: 'When cleaning a contaminated SCBA facepiece, firefighters should use:',
        choices: [
          'Strong solvents and wire brushes',
          'Mild soap and warm water or manufacturer-approved cleaner',
          'Bleach full strength',
          'Abrasive pads'
        ],
        answerIndex: 1,
        explanation: 'Manufacturer-approved cleaners or mild soap/warm water prevent damage to seals and lens.',
        difficulty: 1
      },
      {
        id: 'SCBA-012',
        exam: 'TCFP',
        section: 'Firefighter I',
        topic: 'SCBA',
        prompt: 'A PASS device is designed to:',
        choices: [
          'Assist with ventilation',
          'Signal when a firefighter is motionless or in distress',
          'Measure oxygen concentration',
          'Lower cylinder pressure'
        ],
        answerIndex: 1,
        explanation: 'The PASS emits a loud alarm if the firefighter is motionless or manually activated for distress.',
        difficulty: 1
      },
      {
        id: 'SCBA-013',
        exam: 'TCFP',
        section: 'Firefighter I',
        topic: 'SCBA',
        prompt: 'The “Buddy system” and two-in/two-out requirement exist mainly to:',
        choices: [
          'Reduce hose damage',
          'Ensure proper ICS documentation',
          'Maintain firefighter safety and rapid rescue ability',
          'Increase fireground speed'
        ],
        answerIndex: 2,
        explanation: 'Working in teams allows for immediate assistance and supports rapid intervention if conditions worsen.',
        difficulty: 1
      },
      {
        id: 'SCBA-014',
        exam: 'TCFP',
        section: 'Firefighter I',
        topic: 'SCBA',
        prompt: 'After closing the cylinder valve, the line pressure should be bled off to:',
        choices: [
          'Test the low-air alarm and verify valve closure',
          'Cool the regulator',
          'Increase cylinder pressure',
          'Check for radio interference'
        ],
        answerIndex: 0,
        explanation: 'Bleeding line pressure allows you to confirm that the cylinder valve is closed and the low-air alarm works.',
        difficulty: 2
      },
      {
        id: 'SCBA-015',
        exam: 'TCFP',
        section: 'Firefighter I',
        topic: 'SCBA',
        prompt: 'SCBA cylinders must be hydrostatically tested:',
        choices: [
          'Every year',
          'According to DOT and manufacturer schedules, often every 3 or 5 years',
          'Only when damaged',
          'Once at purchase only'
        ],
        answerIndex: 1,
        explanation: 'Hydrotesting follows DOT/manufacturer intervals, commonly 3 or 5 years depending on cylinder type.',
        difficulty: 2
      },
      {
        id: 'SCBA-016',
        exam: 'TCFP',
        section: 'Firefighter I',
        topic: 'SCBA',
        prompt: 'Which best practice reduces the risk of heat stress while wearing full PPE and SCBA?',
        choices: [
          'Wearing extra clothing under PPE',
          'Rehab, hydration, and rotating crews',
          'Avoiding rehab until operations end',
          'Removing the coat but keeping the SCBA on air'
        ],
        answerIndex: 1,
        explanation: 'Formal rehab, cooling, hydration, and crew rotation are essential to manage heat stress.',
        difficulty: 1
      },
      {
        id: 'SCBA-017',
        exam: 'TCFP',
        section: 'Firefighter I',
        topic: 'SCBA',
        prompt: 'A firefighter who becomes disoriented in a structure and cannot quickly locate an exit should:',
        choices: [
          'Remove the facepiece for better visibility',
          'Sit down and wait silently',
          'Call a MAYDAY and follow department procedures',
          'Run in one direction until an exit is found'
        ],
        answerIndex: 2,
        explanation: 'Calling a MAYDAY early and following disorientation procedures increases chances of rescue.',
        difficulty: 2
      },
      {
        id: 'SCBA-018',
        exam: 'TCFP',
        section: 'Firefighter I',
        topic: 'SCBA',
        prompt: 'Which PPE component provides primary protection for the lower torso and legs?',
        choices: ['Helmet', 'Turnout pants with liner', 'Gloves', 'Hood'],
        answerIndex: 1,
        explanation: 'Turnout pants and coat with thermal and moisture barriers protect the core and extremities.',
        difficulty: 1
      },
      {
        id: 'SCBA-019',
        exam: 'TCFP',
        section: 'Firefighter I',
        topic: 'SCBA',
        prompt: 'The protective hood is designed mainly to protect:',
        choices: [
          'Face and eyes',
          'Hands and wrists',
          'Ears, neck, and areas not fully covered by coat and helmet',
          'Boot soles'
        ],
        answerIndex: 2,
        explanation: 'The hood protects vulnerable skin at the neck, ears, and face below the helmet and mask.',
        difficulty: 1
      },
      {
        id: 'SCBA-020',
        exam: 'TCFP',
        section: 'Firefighter I',
        topic: 'SCBA',
        prompt: 'Which of the following best practice statements is TRUE about PPE and cancer risk?',
        choices: [
          'Dirty gear shows experience and should not be washed',
          'Cleaning and decontaminating PPE reduces carcinogen exposure',
          'Wearing SCBA only during knockdown is sufficient',
          'Soot on the neck is harmless'
        ],
        answerIndex: 1,
        explanation: 'Regular cleaning and on-scene gross decon of PPE reduce cumulative carcinogen exposure.',
        difficulty: 2
      },

      // ------------ LADDERS (20) ------------
      {
        id: 'LAD-001',
        exam: 'TCFP',
        section: 'Firefighter I',
        topic: 'Ladders',
        prompt: 'The recommended climbing angle for a ground ladder is approximately:',
        choices: ['45°', '60°', '75°', '90°'],
        answerIndex: 2,
        explanation: 'A 75° angle (1:4 ratio) gives safe balance between stability and climbing ease.',
        difficulty: 1
      },
      {
        id: 'LAD-002',
        exam: 'TCFP',
        section: 'Firefighter I',
        topic: 'Ladders',
        prompt: 'When placing a ladder to access a roof, the tip should generally extend at least:',
        choices: [
          '1 rung above the roof',
          '3–5 rungs above the roof edge',
          'Just level with the roof edge',
          '10 rungs above the roof edge'
        ],
        answerIndex: 1,
        explanation: 'Extending 3–5 rungs gives a handhold for firefighters stepping on or off the roof.',
        difficulty: 1
      },
      {
        id: 'LAD-003',
        exam: 'TCFP',
        section: 'Firefighter I',
        topic: 'Ladders',
        prompt: 'The proper way to determine ladder distance from the building is:',
        choices: [
          'Place the butt at half the ladder’s working length',
          'Use the 1/4 rule: distance = ladder working length ÷ 4',
          'Place the butt directly against the wall',
          'Use any distance that feels stable'
        ],
        answerIndex: 1,
        explanation: 'The base should be placed one-quarter the ladder’s working length away from the wall.',
        difficulty: 1
      },
      {
        id: 'LAD-004',
        exam: 'TCFP',
        section: 'Firefighter I',
        topic: 'Ladders',
        prompt: 'When working from a ladder with a tool, firefighters should:',
        choices: [
          'Lean out as far as possible',
          'Always stay below the top two rungs and maintain three points of contact',
          'Stand on the top rung for maximum reach',
          'Face away from the structure for visibility'
        ],
        answerIndex: 1,
        explanation: 'NFPA guidance: do not stand on or above the top two rungs; maintain three points of contact.',
        difficulty: 1
      },
      {
        id: 'LAD-005',
        exam: 'TCFP',
        section: 'Firefighter I',
        topic: 'Ladders',
        prompt: 'A ladder used to access a window for rescue should generally be placed so the tip is:',
        choices: [
          'Even with the windowsill',
          'Just below the windowsill',
          'Just above the top of the window',
          'On the opposite side of the building'
        ],
        answerIndex: 2,
        explanation: 'For rescue, ladder tips usually are placed just above the window to ease victim removal.',
        difficulty: 2
      },
      {
        id: 'LAD-006',
        exam: 'TCFP',
        section: 'Firefighter I',
        topic: 'Ladders',
        prompt: 'Which person gives commands during a two-firefighter raise of an extension ladder?',
        choices: [
          'The firefighter at the butt',
          'The firefighter at the tip',
          'The company officer only',
          'Whoever is closest to the building'
        ],
        answerIndex: 0,
        explanation: 'The firefighter at the butt usually acts as the “butt firefighter” and gives commands.',
        difficulty: 1
      },
      {
        id: 'LAD-007',
        exam: 'TCFP',
        section: 'Firefighter I',
        topic: 'Ladders',
        prompt: 'Before climbing, extension ladder halyard ends should be:',
        choices: [
          'Left loose to allow movement',
          'Tied off or secured to prevent fly section movement',
          'Wrapped around a rung once',
          'Cut off'
        ],
        answerIndex: 1,
        explanation: 'Halyard should be tied to a rung to prevent unintended fly movement.',
        difficulty: 1
      },
      {
        id: 'LAD-008',
        exam: 'TCFP',
        section: 'Firefighter I',
        topic: 'Ladders',
        prompt: '“Fly out” versus “fly in” on extension ladders should be determined by:',
        choices: [
          'Manufacturer’s instructions and department SOPs',
          'Personal preference',
          'Weight of the firefighter',
          'Wind direction'
        ],
        answerIndex: 0,
        explanation: 'Always follow manufacturer and department policy on whether the fly section is out or in.',
        difficulty: 2
      },
      {
        id: 'LAD-009',
        exam: 'TCFP',
        section: 'Firefighter I',
        topic: 'Ladders',
        prompt: 'Which hazard is MOST associated with placing ladders near overhead power lines?',
        choices: [
          'Conduction of electricity through metal ladders',
          'Increased ladder bounce',
          'Lower friction at the butt',
          'UV degradation of halyard'
        ],
        answerIndex: 0,
        explanation: 'Metal and even wet fiberglass can conduct electricity; stay well clear of power lines.',
        difficulty: 1
      },
      {
        id: 'LAD-010',
        exam: 'TCFP',
        section: 'Firefighter I',
        topic: 'Ladders',
        prompt: 'When carrying a ladder through a narrow passage as part of a team, firefighters should:',
        choices: [
          'Walk at different speeds',
          'Communicate turns and obstacles clearly',
          'Carry the ladder vertically only',
          'Look only straight ahead'
        ],
        answerIndex: 1,
        explanation: 'Clear verbal communication prevents striking obstacles or members.',
        difficulty: 1
      },
      {
        id: 'LAD-011',
        exam: 'TCFP',
        section: 'Firefighter I',
        topic: 'Ladders',
        prompt: 'Ground ladders must be visually inspected:',
        choices: [
          'Only after fires',
          'At least monthly or after each use, per department policy',
          'Once per year',
          'Only when damaged'
        ],
        answerIndex: 1,
        explanation: 'Routine inspections help catch damage early and are required by standards and SOPs.',
        difficulty: 1
      },
      {
        id: 'LAD-012',
        exam: 'TCFP',
        section: 'Firefighter I',
        topic: 'Ladders',
        prompt: 'A 24-foot extension ladder is BEST suited for:',
        choices: [
          'Single-story roof access only',
          'Second-story windows or roof access on many residences',
          'Reaching a fourth-floor balcony',
          'Interior attic scuttle access'
        ],
        answerIndex: 1,
        explanation: '24-foot ladders are common for second-story access on residential structures.',
        difficulty: 1
      },
      {
        id: 'LAD-013',
        exam: 'TCFP',
        section: 'Firefighter I',
        topic: 'Ladders',
        prompt: 'When footing a ladder for a climbing firefighter, the firefighter at the butt should:',
        choices: [
          'Face the building and grasp the beams',
          'Face away from the building and hold the rungs',
          'Stand to the side',
          'Climb directly behind the other firefighter'
        ],
        answerIndex: 0,
        explanation: 'Facing the building while securing the beams provides stability for the climber.',
        difficulty: 1
      },
      {
        id: 'LAD-014',
        exam: 'TCFP',
        section: 'Firefighter I',
        topic: 'Ladders',
        prompt: 'During ventilation operations from a ladder, firefighters should primarily work off:',
        choices: [
          'The top rung',
          'The ladder’s tip only',
          'A ladder rung below the working level with leg lock if needed',
          'The roof only, not the ladder'
        ],
        answerIndex: 2,
        explanation: 'Working from a rung below the objective with a leg lock increases stability.',
        difficulty: 2
      },
      {
        id: 'LAD-015',
        exam: 'TCFP',
        section: 'Firefighter I',
        topic: 'Ladders',
        prompt: 'Which is a sign that a wooden ladder should be taken out of service?',
        choices: [
          'Minor scratches',
          'Small paint marks',
          'Cracks, rot, or loose rungs',
          'Dust on the beams'
        ],
        answerIndex: 2,
        explanation: 'Cracks, rot, or loose components indicate structural compromise and require removal from service.',
        difficulty: 1
      },
      {
        id: 'LAD-016',
        exam: 'TCFP',
        section: 'Firefighter I',
        topic: 'Ladders',
        prompt: 'Portable ladders should NOT be painted because paint:',
        choices: [
          'Adds too much weight',
          'Prevents heat transfer',
          'Can hide damage or defects',
          'Is electrically conductive'
        ],
        answerIndex: 2,
        explanation: 'Paint can conceal cracks or other damage; use clear sealers or manufacturer-approved coatings instead.',
        difficulty: 2
      },
      {
        id: 'LAD-017',
        exam: 'TCFP',
        section: 'Firefighter I',
        topic: 'Ladders',
        prompt: 'When moving a victim down a ladder with two firefighters, the victim is usually:',
        choices: [
          'Carried over the firefighter’s shoulder',
          'Placed in a stokes basket only',
          'Faced toward the ladder, supported by a firefighter above and one below',
          'Slid headfirst down the beams'
        ],
        answerIndex: 2,
        explanation: 'Victims are generally faced toward the ladder, supported between two firefighters for control.',
        difficulty: 2
      },
      {
        id: 'LAD-018',
        exam: 'TCFP',
        section: 'Firefighter I',
        topic: 'Ladders',
        prompt: 'Which action is MOST important before raising any ladder?',
        choices: [
          'Checking the halyard length',
          'Ensuring overhead is clear of wires and obstructions',
          'Extending to full length',
          'Loosening all hardware'
        ],
        answerIndex: 1,
        explanation: 'Overhead hazards, especially power lines, must be identified before a raise.',
        difficulty: 1
      },
      {
        id: 'LAD-019',
        exam: 'TCFP',
        section: 'Firefighter I',
        topic: 'Ladders',
        prompt: 'What is the PRIMARY purpose of heeling (footing) a ladder?',
        choices: [
          'To keep the tip from hitting the building',
          'To prevent the base from slipping',
          'To measure the correct angle',
          'To hold the halyard'
        ],
        answerIndex: 1,
        explanation: 'Footing stabilizes the butt to prevent ladder slip during climbing or work.',
        difficulty: 1
      },
      {
        id: 'LAD-020',
        exam: 'TCFP',
        section: 'Firefighter I',
        topic: 'Ladders',
        prompt: 'How should ground ladders be stored on a fire apparatus?',
        choices: [
          'In direct sunlight whenever possible',
          'Secured, clean, and ready for immediate deployment',
          'Unsecured for quick access',
          'Stacked vertically inside the cab'
        ],
        answerIndex: 1,
        explanation: 'Ladders must be secured, protected, and accessible so they can be deployed rapidly and safely.',
        difficulty: 1
      },

      // ------------ ICS (20) ------------
      {
        id: 'ICS-001',
        exam: 'TCFP',
        section: 'Firefighter II',
        topic: 'ICS',
        prompt: 'Who has overall responsibility for managing the incident in ICS?',
        choices: [
          'Operations Section Chief',
          'Incident Commander',
          'Safety Officer',
          'Liaison Officer'
        ],
        answerIndex: 1,
        explanation: 'The Incident Commander (IC) is ultimately responsible for incident management.',
        difficulty: 1
      },
      {
        id: 'ICS-002',
        exam: 'TCFP',
        section: 'Firefighter II',
        topic: 'ICS',
        prompt: 'Span of control is generally considered optimal when one supervisor manages:',
        choices: ['1–2 personnel', '3–7 personnel', '8–12 personnel', 'More than 12 personnel'],
        answerIndex: 1,
        explanation: 'ICS guidance sets span of control at 3–7, with 5 being ideal.',
        difficulty: 1
      },
      {
        id: 'ICS-003',
        exam: 'TCFP',
        section: 'Firefighter II',
        topic: 'ICS',
        prompt: 'The ICS principle that each person reports to only one supervisor is called:',
        choices: [
          'Unified Command',
          'Modular Organization',
          'Unity of Command',
          'Chain of Custody'
        ],
        answerIndex: 2,
        explanation: 'Unity of Command prevents conflicting instructions and clarifies supervision.',
        difficulty: 1
      },
      {
        id: 'ICS-004',
        exam: 'TCFP',
        section: 'Firefighter II',
        topic: 'ICS',
        prompt: 'Which ICS section is responsible for ordering resources and tracking costs?',
        choices: ['Operations', 'Planning', 'Logistics', 'Finance/Administration'],
        answerIndex: 3,
        explanation: 'Finance/Administration handles cost tracking, procurement, and financial issues.',
        difficulty: 2
      },
      {
        id: 'ICS-005',
        exam: 'TCFP',
        section: 'Firefighter II',
        topic: 'ICS',
        prompt: 'Which ICS section develops the Incident Action Plan (IAP) when it is written?',
        choices: ['Operations', 'Planning', 'Logistics', 'Safety'],
        answerIndex: 1,
        explanation: 'Planning Section collects information and prepares the IAP.',
        difficulty: 2
      },
      {
        id: 'ICS-006',
        exam: 'TCFP',
        section: 'Firefighter II',
        topic: 'ICS',
        prompt: 'Divisions in ICS are usually defined by:',
        choices: ['Function', 'Geographic area', 'Agency', 'Time period'],
        answerIndex: 1,
        explanation: 'Divisions are typically geographic (e.g., Division A, Division 2).',
        difficulty: 1
      },
      {
        id: 'ICS-007',
        exam: 'TCFP',
        section: 'Firefighter II',
        topic: 'ICS',
        prompt: 'Groups in ICS are usually defined by:',
        choices: ['Function', 'Geographic area', 'Agency', 'Rank'],
        answerIndex: 0,
        explanation: 'Groups are functional (e.g., Ventilation Group, Rescue Group).',
        difficulty: 1
      },
      {
        id: 'ICS-008',
        exam: 'TCFP',
        section: 'Firefighter II',
        topic: 'ICS',
        prompt: 'Which position is responsible for overall safety of personnel at an incident?',
        choices: [
          'Safety Officer',
          'Liaison Officer',
          'Public Information Officer',
          'Operations Section Chief'
        ],
        answerIndex: 0,
        explanation: 'The Safety Officer monitors conditions and has the authority to stop unsafe operations.',
        difficulty: 1
      },
      {
        id: 'ICS-009',
        exam: 'TCFP',
        section: 'Firefighter II',
        topic: 'ICS',
        prompt: 'The initial command post should be located:',
        choices: [
          'As close to the fire building as possible',
          'In a safe, visible location with good access and view of the incident',
          'Inside the structure',
          'At the furthest hydrant'
        ],
        answerIndex: 1,
        explanation: 'Command should be safe, visible, and allow good situational awareness.',
        difficulty: 1
      },
      {
        id: 'ICS-010',
        exam: 'TCFP',
        section: 'Firefighter II',
        topic: 'ICS',
        prompt: 'Unified Command is used when:',
        choices: [
          'Only one agency is involved',
          'Multiple agencies or jurisdictions share responsibility',
          'Incidents are minor in scope',
          'The IC wants to delegate safety'
        ],
        answerIndex: 1,
        explanation: 'Unified Command allows agencies with jurisdiction to jointly manage the incident.',
        difficulty: 2
      },
      {
        id: 'ICS-011',
        exam: 'TCFP',
        section: 'Firefighter II',
        topic: 'ICS',
        prompt: 'The purpose of the accountability system on the fireground is to:',
        choices: [
          'Track apparatus mileage',
          'Track the location and function of all personnel',
          'Record incident costs',
          'Assign radio frequencies'
        ],
        answerIndex: 1,
        explanation: 'Accountability is critical for firefighter safety and rapid intervention.',
        difficulty: 1
      },
      {
        id: 'ICS-012',
        exam: 'TCFP',
        section: 'Firefighter II',
        topic: 'ICS',
        prompt: 'Which ICS form typically outlines the Incident Objectives and strategy?',
        choices: ['ICS 201', 'ICS 202', 'ICS 205', 'ICS 214'],
        answerIndex: 1,
        explanation: 'ICS 202 documents incident objectives and the basic strategy for the operational period.',
        difficulty: 2
      },
      {
        id: 'ICS-013',
        exam: 'TCFP',
        section: 'Firefighter II',
        topic: 'ICS',
        prompt: 'The Operations Section Chief is responsible for:',
        choices: [
          'Overall incident command',
          'Developing the IAP',
          'Directing tactical operations to meet incident objectives',
          'Tracking costs'
        ],
        answerIndex: 2,
        explanation: 'Operations carries out tactical operations under the IC’s objectives.',
        difficulty: 1
      },
      {
        id: 'ICS-014',
        exam: 'TCFP',
        section: 'Firefighter II',
        topic: 'ICS',
        prompt: 'Staging in ICS is primarily used to:',
        choices: [
          'Store extra hose',
          'Pre-position resources awaiting assignment',
          'House rehab operations',
          'Park civilian vehicles'
        ],
        answerIndex: 1,
        explanation: 'Staging keeps uncommitted resources ready for rapid assignment.',
        difficulty: 1
      },
      {
        id: 'ICS-015',
        exam: 'TCFP',
        section: 'Firefighter II',
        topic: 'ICS',
        prompt: 'The Liaison Officer’s primary role is to:',
        choices: [
          'Manage media relations',
          'Coordinate with assisting and cooperating agencies',
          'Supervise ventilation',
          'Track personnel'
        ],
        answerIndex: 1,
        explanation: 'Liaison handles contacts and coordination with other agencies.',
        difficulty: 1
      },
      {
        id: 'ICS-016',
        exam: 'TCFP',
        section: 'Firefighter II',
        topic: 'ICS',
        prompt: 'The Public Information Officer (PIO) is responsible for:',
        choices: [
          'Fireground tactics',
          'Investigating cause of fire',
          'Interfacing with the media and public',
          'Ordering resources'
        ],
        answerIndex: 2,
        explanation: 'PIO releases information to media and the public per IC direction.',
        difficulty: 1
      },
      {
        id: 'ICS-017',
        exam: 'TCFP',
        section: 'Firefighter II',
        topic: 'ICS',
        prompt: 'A Branch in ICS is established when:',
        choices: [
          'There are too many divisions/groups for effective span of control',
          'The IC wants to delegate planning',
          'Only one division is present',
          'Finance is activated'
        ],
        answerIndex: 0,
        explanation: 'Branches group divisions/groups to maintain span of control.',
        difficulty: 2
      },
      {
        id: 'ICS-018',
        exam: 'TCFP',
        section: 'Firefighter II',
        topic: 'ICS',
        prompt: '“All units stand by for PAR” means the IC is asking for:',
        choices: [
          'New assignment requests',
          'Personnel Accountability Report from all units',
          'Pump discharge pressures',
          'Incident critique'
        ],
        answerIndex: 1,
        explanation: 'PAR verifies that crews are intact and accounted for.',
        difficulty: 1
      },
      {
        id: 'ICS-019',
        exam: 'TCFP',
        section: 'Firefighter II',
        topic: 'ICS',
        prompt: 'The term “division A” typically refers to:',
        choices: [
          'Back side of the building',
          'The front (street) side of the building',
          'Roof sector',
          'Interior search crew'
        ],
        answerIndex: 1,
        explanation: 'Division A is normally the front or address side of the structure.',
        difficulty: 1
      },
      {
        id: 'ICS-020',
        exam: 'TCFP',
        section: 'Firefighter II',
        topic: 'ICS',
        prompt: 'Which best describes the modular organization principle of ICS?',
        choices: [
          'All ICS positions must be filled at every incident',
          'The organization expands or contracts based on incident needs',
          'Only planning and operations exist',
          'ICS is only for large incidents'
        ],
        answerIndex: 1,
        explanation: 'ICS is scalable—positions are added or removed as incident complexity changes.',
        difficulty: 1
      },

      // ------------ HAZMAT (20) ------------
      {
        id: 'HZ-001',
        exam: 'TCFP',
        section: 'HazMat Awareness',
        topic: 'HazMat',
        prompt: 'At the awareness level, firefighters should primarily:',
        choices: [
          'Stop the release and plug the leak',
          'Perform offensive entry with full PPE',
          'Recognize the presence of hazardous materials, isolate, and notify',
          'Overpack damaged containers'
        ],
        answerIndex: 2,
        explanation: 'Awareness level focuses on recognize–isolate–notify, not mitigation.',
        difficulty: 1
      },
      {
        id: 'HZ-002',
        exam: 'TCFP',
        section: 'HazMat Awareness',
        topic: 'HazMat',
        prompt: 'The four-digit UN/NA number on an orange panel identifies:',
        choices: [
          'The shipping company',
          'The specific hazardous material',
          'The driver’s license number',
          'The container pressure rating'
        ],
        answerIndex: 1,
        explanation: 'UN/NA numbers identify the specific material for reference in the ERG.',
        difficulty: 1
      },
      {
        id: 'HZ-003',
        exam: 'TCFP',
        section: 'HazMat Awareness',
        topic: 'HazMat',
        prompt: 'The DOT hazard class for flammable liquids is:',
        choices: ['Class 1', 'Class 2', 'Class 3', 'Class 6'],
        answerIndex: 2,
        explanation: 'Class 3 covers flammable and combustible liquids.',
        difficulty: 2
      },
      {
        id: 'HZ-004',
        exam: 'TCFP',
        section: 'HazMat Awareness',
        topic: 'HazMat',
        prompt: 'The “hot zone” at a HazMat incident is the area:',
        choices: [
          'Used for staging of apparatus',
          'Where contamination is likely and entry is restricted',
          'Where media are placed',
          'Used only for rehab'
        ],
        answerIndex: 1,
        explanation: 'The hot zone is the exclusion area where contamination and highest hazards exist.',
        difficulty: 1
      },
      {
        id: 'HZ-005',
        exam: 'TCFP',
        section: 'HazMat Awareness',
        topic: 'HazMat',
        prompt: 'The FIRST choice for information at a highway HazMat incident when safe to do so is usually:',
        choices: [
          'The ERG book only',
          'Placards, labels, and the shipping papers (bill of lading)',
          'Media reports',
          'Social media posts'
        ],
        answerIndex: 1,
        explanation: 'Placards/labels plus shipping papers provide initial identification of the material.',
        difficulty: 1
      },
      {
        id: 'HZ-006',
        exam: 'TCFP',
        section: 'HazMat Awareness',
        topic: 'HazMat',
        prompt: 'If you suspect a toxic inhalation hazard (TIH) gas leak in a low-lying area, you should expect the gas to:',
        choices: [
          'Rise quickly and dissipate',
          'Stay close to the ground and flow with contours',
          'Explode immediately',
          'Be harmless outdoors'
        ],
        answerIndex: 1,
        explanation: 'Many TIH gases are heavier than air and will collect in low areas.',
        difficulty: 2
      },
      {
        id: 'HZ-007',
        exam: 'TCFP',
        section: 'HazMat Awareness',
        topic: 'HazMat',
        prompt: 'The NFPA 704 marking system (diamond) is primarily used to:',
        choices: [
          'Indicate DOT shipping class',
          'Provide general hazard info for fixed facilities',
          'Mark all highway tankers',
          'Rate firefighter performance'
        ],
        answerIndex: 1,
        explanation: 'NFPA 704 diamonds identify general hazard levels at fixed facilities.',
        difficulty: 1
      },
      {
        id: 'HZ-008',
        exam: 'TCFP',
        section: 'HazMat Awareness',
        topic: 'HazMat',
        prompt: 'In the NFPA 704 system, the blue quadrant represents:',
        choices: ['Flammability', 'Instability/reactivity', 'Special hazards', 'Health hazard'],
        answerIndex: 3,
        explanation: 'Blue = health, red = flammability, yellow = reactivity, white = special.',
        difficulty: 1
      },
      {
        id: 'HZ-009',
        exam: 'TCFP',
        section: 'HazMat Awareness',
        topic: 'HazMat',
        prompt: 'The recommended safe action if you see a leaking chlorine railcar from a distance is to:',
        choices: [
          'Approach from upwind and uphill, stay back, and call for HazMat team',
          'Approach from downwind for best visibility',
          'Enter the plume to rescue rail workers without PPE',
          'Spray water directly into the leak from any direction'
        ],
        answerIndex: 0,
        explanation: 'Stay upwind/uphill, isolate the area, and request HazMat specialists.',
        difficulty: 2
      },
      {
        id: 'HZ-010',
        exam: 'TCFP',
        section: 'HazMat Awareness',
        topic: 'HazMat',
        prompt: 'The ERG “green pages” primarily provide:',
        choices: [
          'Initial isolation and protective action distances',
          'Telephone numbers for media',
          'Placard color charts',
          'Truck maintenance schedules'
        ],
        answerIndex: 0,
        explanation: 'Green pages detail protective action distances for toxic inhalation hazards.',
        difficulty: 1
      },
      {
        id: 'HZ-011',
        exam: 'TCFP',
        section: 'HazMat Awareness',
        topic: 'HazMat',
        prompt: 'Which level of PPE provides fully encapsulating suit with SCBA?',
        choices: ['Level A', 'Level B', 'Level C', 'Level D'],
        answerIndex: 0,
        explanation: 'Level A offers highest skin and respiratory protection with encapsulating suit and SCBA.',
        difficulty: 2
      },
      {
        id: 'HZ-012',
        exam: 'TCFP',
        section: 'HazMat Awareness',
        topic: 'HazMat',
        prompt: 'At an awareness level, firefighters should establish the isolation perimeter by:',
        choices: [
          'Using ERG distances and keeping people out',
          'Performing plug-and-patch on containers',
          'Burning off vapors',
          'Removing all PPE for communication'
        ],
        answerIndex: 0,
        explanation: 'Isolation uses ERG distances and control zones; mitigation is for tech/ops levels.',
        difficulty: 1
      },
      {
        id: 'HZ-013',
        exam: 'TCFP',
        section: 'HazMat Awareness',
        topic: 'HazMat',
        prompt: 'The term LC50 refers to:',
        choices: [
          'The lowest combustible concentration',
          'The concentration that is lethal to 50% of a test population',
          'The leak control factor',
          'The maximum corrosive level'
        ],
        answerIndex: 1,
        explanation: 'LC50 is a toxicity measure—lethal concentration for 50% of test animals.',
        difficulty: 2
      },
      {
        id: 'HZ-014',
        exam: 'TCFP',
        section: 'HazMat Awareness',
        topic: 'HazMat',
        prompt: '“BLEVE” stands for:',
        choices: [
          'Boiling Liquid Expanding Vapor Explosion',
          'Basic Liquid Evaporation Event',
          'Boiling Level Emergency Valve Ejection',
          'Bulk Liquid Expansion Ventilation Exercise'
        ],
        answerIndex: 0,
        explanation: 'BLEVE is a catastrophic failure of a vessel containing pressurized liquid above its boiling point.',
        difficulty: 2
      },
      {
        id: 'HZ-015',
        exam: 'TCFP',
        section: 'HazMat Awareness',
        topic: 'HazMat',
        prompt: 'Which approach is safest when dealing with unknown vapors at a HazMat scene?',
        choices: [
          'Approach from downwind and downhill',
          'Approach from upwind, uphill, and upstream if possible',
          'Approach from any direction quickly',
          'Approach only after removing PPE'
        ],
        answerIndex: 1,
        explanation: 'Upwind/uphill/upstream reduces exposure risk from drifting vapors and liquids.',
        difficulty: 1
      },
      {
        id: 'HZ-016',
        exam: 'TCFP',
        section: 'HazMat Awareness',
        topic: 'HazMat',
        prompt: 'Decontamination corridors are usually established between the:',
        choices: [
          'Hot and warm zones',
          'Warm and cold zones',
          'Cold zone and staging area only',
          'Hot zone and media area'
        ],
        answerIndex: 1,
        explanation: 'Decon usually occurs in the warm zone to prevent contamination of cold zone.',
        difficulty: 2
      },
      {
        id: 'HZ-017',
        exam: 'TCFP',
        section: 'HazMat Awareness',
        topic: 'HazMat',
        prompt: 'Which is a key sign of potential terrorist or criminal HazMat incident?',
        choices: [
          'Presence of only one drum',
          'Unusual devices, secondary devices, or multiple victims without obvious cause',
          'Clear labeling and shipping papers',
          'Normal traffic patterns'
        ],
        answerIndex: 1,
        explanation: 'Multiple victims, unusual devices, or inconsistent scene clues may indicate criminal/terrorist activity.',
        difficulty: 2
      },
      {
        id: 'HZ-018',
        exam: 'TCFP',
        section: 'HazMat Awareness',
        topic: 'HazMat',
        prompt: 'A pesticide label lists a signal word “DANGER/POISON.” This indicates:',
        choices: [
          'Relatively low toxicity',
          'Moderate toxicity',
          'High toxicity',
          'Non-toxic substance'
        ],
        answerIndex: 2,
        explanation: '“Danger/Poison” is reserved for highly toxic pesticides.',
        difficulty: 2
      },
      {
        id: 'HZ-019',
        exam: 'TCFP',
        section: 'HazMat Awareness',
        topic: 'HazMat',
        prompt: 'The purpose of the Safety Data Sheet (SDS) is to:',
        choices: [
          'Provide emergency response and hazard information for chemicals',
          'List only shipping instructions',
          'Serve as a purchase receipt',
          'Track employee time'
        ],
        answerIndex: 0,
        explanation: 'SDS contain hazard, handling, and emergency information for chemicals.',
        difficulty: 1
      },
      {
        id: 'HZ-020',
        exam: 'TCFP',
        section: 'HazMat Awareness',
        topic: 'HazMat',
        prompt: 'At a HazMat incident, defensive operations include:',
        choices: [
          'Plugging a tank from inside',
          'Building dikes and dams to control spread of product',
          'Performing interior offensive entry',
          'Overpacking a leaking drum from inside the hot zone without PPE'
        ],
        answerIndex: 1,
        explanation: 'Defensive actions protect people and environment without directly stopping the release at the point.',
        difficulty: 2
      },

      // ------------ EMS AIRWAY (20) ------------
      {
        id: 'EMS-AW-001',
        exam: 'NREMT',
        section: 'Airway/Respiration/Ventilation',
        topic: 'EMS Airway',
        prompt: 'The MOST reliable indicator that BVM ventilations are effective is:',
        choices: [
          'Fogging of the mask',
          'Adequate chest rise and fall with each breath',
          'High ventilatory rate',
          'Noise from the valve'
        ],
        answerIndex: 1,
        explanation: 'Visible chest rise shows air is actually reaching the lungs.',
        difficulty: 1
      },
      {
        id: 'EMS-AW-002',
        exam: 'NREMT',
        section: 'Airway/Respiration/Ventilation',
        topic: 'EMS Airway',
        prompt: 'An oropharyngeal airway (OPA) is contraindicated in a patient who:',
        choices: [
          'Is unresponsive without gag reflex',
          'Has an intact gag reflex',
          'Is being ventilated by BVM',
          'Is being suctioned'
        ],
        answerIndex: 1,
        explanation: 'OPA can cause vomiting or laryngospasm if gag reflex is intact.',
        difficulty: 1
      },
      {
        id: 'EMS-AW-003',
        exam: 'NREMT',
        section: 'Airway/Respiration/Ventilation',
        topic: 'EMS Airway',
        prompt: 'The recovery position is MOST appropriate for an unresponsive patient who:',
        choices: [
          'Is not breathing',
          'Is breathing adequately and has no suspected spinal trauma',
          'Has severe chest trauma',
          'Has suspected hip fracture'
        ],
        answerIndex: 1,
        explanation: 'Recovery position protects the airway in unresponsive, breathing patients without spine concerns.',
        difficulty: 1
      },
      {
        id: 'EMS-AW-004',
        exam: 'NREMT',
        section: 'Airway/Respiration/Ventilation',
        topic: 'EMS Airway',
        prompt: 'You find a patient with gurgling respirations. Your FIRST action should be to:',
        choices: [
          'Insert an OPA',
          'Begin ventilations',
          'Suction the airway',
          'Place in Trendelenburg'
        ],
        answerIndex: 2,
        explanation: 'Gurgling indicates fluid in airway; suction before ventilations.',
        difficulty: 1
      },
      {
        id: 'EMS-AW-005',
        exam: 'NREMT',
        section: 'Airway/Respiration/Ventilation',
        topic: 'EMS Airway',
        prompt: 'The correct rate of artificial ventilations for an adult apneic patient with a pulse is:',
        choices: [
          '4–6 breaths per minute',
          '8–10 breaths per minute',
          '10–12 breaths per minute',
          '20–24 breaths per minute'
        ],
        answerIndex: 2,
        explanation: 'Adult ventilation rate is about 1 breath every 5–6 seconds (10–12/min).',
        difficulty: 1
      },
      {
        id: 'EMS-AW-006',
        exam: 'NREMT',
        section: 'Airway/Respiration/Ventilation',
        topic: 'EMS Airway',
        prompt: 'Snoring respirations usually indicate:',
        choices: [
          'Lower airway spasm',
          'Fluids in the airway',
          'Partially blocked upper airway by the tongue',
          'Adequate airway'
        ],
        answerIndex: 2,
        explanation: 'Snoring suggests the tongue is partially occluding the pharynx, corrected by airway positioning.',
        difficulty: 1
      },
      {
        id: 'EMS-AW-007',
        exam: 'NREMT',
        section: 'Airway/Respiration/Ventilation',
        topic: 'EMS Airway',
        prompt: 'The head-tilt chin-lift maneuver is NOT used when:',
        choices: [
          'The patient is unresponsive and not breathing',
          'Spinal trauma is suspected',
          'The patient has no gag reflex',
          'The patient is sitting upright'
        ],
        answerIndex: 1,
        explanation: 'Use jaw-thrust without head tilt when spinal injury is suspected.',
        difficulty: 1
      },
      {
        id: 'EMS-AW-008',
        exam: 'NREMT',
        section: 'Airway/Respiration/Ventilation',
        topic: 'EMS Airway',
        prompt: 'A conscious adult with complete airway obstruction who cannot speak or cough should receive:',
        choices: [
          'Back blows only',
          'Abdominal thrusts (Heimlich maneuver)',
          'Finger sweeps',
          'Chest compressions only'
        ],
        answerIndex: 1,
        explanation: 'Abdominal thrusts relieve severe foreign-body airway obstruction in conscious adults.',
        difficulty: 1
      },
      {
        id: 'EMS-AW-009',
        exam: 'NREMT',
        section: 'Airway/Respiration/Ventilation',
        topic: 'EMS Airway',
        prompt: 'Adequate breathing in an adult is BEST indicated by:',
        choices: [
          'Respiratory rate of 8 with shallow breaths',
          'Respiratory rate of 16 with good tidal volume and normal skin color',
          'Use of accessory muscles and nasal flaring',
          'Noisy respirations'
        ],
        answerIndex: 1,
        explanation: 'Adequate rate with normal depth and good skin signs suggests adequate ventilation.',
        difficulty: 1
      },
      {
        id: 'EMS-AW-010',
        exam: 'NREMT',
        section: 'Airway/Respiration/Ventilation',
        topic: 'EMS Airway',
        prompt: 'For a 3-year-old child with respiratory distress, the MOST appropriate position is:',
        choices: [
          'Supine with chin tucked',
          'Sitting upright in a position of comfort',
          'Prone with head down',
          'Trendelenburg position'
        ],
        answerIndex: 1,
        explanation: 'Children often prefer upright position; forcing supine may worsen distress.',
        difficulty: 2
      },
      {
        id: 'EMS-AW-011',
        exam: 'NREMT',
        section: 'Airway/Respiration/Ventilation',
        topic: 'EMS Airway',
        prompt: 'When ventilating a patient with a BVM and OPA, you should:',
        choices: [
          'Ventilate forcefully to make the chest rise quickly',
          'Squeeze the bag just enough to see chest rise over 1 second',
          'Ventilate as fast as possible',
          'Use oxygen only if saturation is low'
        ],
        answerIndex: 1,
        explanation: 'Slow, controlled ventilations with visible chest rise reduce risk of gastric distention and barotrauma.',
        difficulty: 1
      },
      {
        id: 'EMS-AW-012',
        exam: 'NREMT',
        section: 'Airway/Respiration/Ventilation',
        topic: 'EMS Airway',
        prompt: 'The MOST appropriate device to deliver high-concentration oxygen to a breathing patient with signs of hypoxia is:',
        choices: [
          'Nasal cannula at 2 L/min',
          'Nonrebreather mask at 15 L/min',
          'Simple face mask at 4 L/min',
          'Pocket mask without oxygen'
        ],
        answerIndex: 1,
        explanation: 'Nonrebreather at 10–15 L/min delivers up to ~90% oxygen.',
        difficulty: 1
      },
      {
        id: 'EMS-AW-013',
        exam: 'NREMT',
        section: 'Airway/Respiration/Ventilation',
        topic: 'EMS Airway',
        prompt: 'Agonal respirations are BEST described as:',
        choices: [
          'Rapid and shallow',
          'Slow, regular, and effective',
          'Gasping, irregular breaths that do not provide adequate ventilation',
          'Normal respirations after exertion'
        ],
        answerIndex: 2,
        explanation: 'Agonal respirations are not adequate; treat as apnea and start ventilations.',
        difficulty: 2
      },
      {
        id: 'EMS-AW-014',
        exam: 'NREMT',
        section: 'Airway/Respiration/Ventilation',
        topic: 'EMS Airway',
        prompt: 'Inserting a nasopharyngeal airway (NPA) is appropriate when the patient:',
        choices: [
          'Is responsive with clenched teeth',
          'Has facial fractures with clear fluid from the nose',
          'Is semi-conscious with an intact gag reflex and no suspected basilar skull fracture',
          'Is apneic with no gag reflex'
        ],
        answerIndex: 2,
        explanation: 'NPA is useful when gag reflex is present and no contraindication like basilar skull fracture exists.',
        difficulty: 2
      },
      {
        id: 'EMS-AW-015',
        exam: 'NREMT',
        section: 'Airway/Respiration/Ventilation',
        topic: 'EMS Airway',
        prompt: 'Which sound MOST suggests lower airway obstruction such as asthma?',
        choices: ['Stridor', 'Rales (crackles)', 'Wheezing', 'Snoring'],
        answerIndex: 2,
        explanation: 'Wheezing is a high-pitched sound from narrowed lower airways, common in asthma.',
        difficulty: 2
      },
      {
        id: 'EMS-AW-016',
        exam: 'NREMT',
        section: 'Airway/Respiration/Ventilation',
        topic: 'EMS Airway',
        prompt: 'Stridor heard in an adult patient most often indicates:',
        choices: [
          'Fluid in the lower lungs',
          'Upper airway obstruction at the larynx',
          'Normal breathing',
          'Asthma exacerbation in the bronchioles'
        ],
        answerIndex: 1,
        explanation: 'Stridor is high-pitched inspiratory sound from partial upper airway obstruction.',
        difficulty: 2
      },
      {
        id: 'EMS-AW-017',
        exam: 'NREMT',
        section: 'Airway/Respiration/Ventilation',
        topic: 'EMS Airway',
        prompt: 'Which is the BEST initial oxygen device for a COPD patient with mild distress and adequate breathing?',
        choices: [
          'Nasal cannula at 2 L/min',
          'Nonrebreather at 15 L/min',
          'BVM at 20 breaths per minute',
          'No oxygen regardless of saturation'
        ],
        answerIndex: 0,
        explanation: 'Nasal cannula at low flow is often used initially; titrate based on patient status and protocols.',
        difficulty: 2
      },
      {
        id: 'EMS-AW-018',
        exam: 'NREMT',
        section: 'Airway/Respiration/Ventilation',
        topic: 'EMS Airway',
        prompt: 'During BVM ventilation of a suspected spinal-injury patient, airway should be opened with:',
        choices: [
          'Head-tilt chin-lift',
          'Jaw-thrust maneuver',
          'No airway maneuver',
          'Chin-down technique'
        ],
        answerIndex: 1,
        explanation: 'Jaw-thrust maintains neutral spine while opening the airway.',
        difficulty: 1
      },
      {
        id: 'EMS-AW-019',
        exam: 'NREMT',
        section: 'Airway/Respiration/Ventilation',
        topic: 'EMS Airway',
        prompt: 'In a newborn with poor respiratory effort immediately after birth, the FIRST step is to:',
        choices: [
          'Begin chest compressions',
          'Provide vigorous suctioning and drying, then stimulate',
          'Administer high-flow oxygen via NRB',
          'Insert an OPA'
        ],
        answerIndex: 1,
        explanation: 'Warm, dry, position, suction if needed, and stimulate are the first steps of neonatal resuscitation.',
        difficulty: 2
      },
      {
        id: 'EMS-AW-020',
        exam: 'NREMT',
        section: 'Airway/Respiration/Ventilation',
        topic: 'EMS Airway',
        prompt: 'A patient with severe respiratory distress who is tiring and becoming lethargic is at high risk for:',
        choices: [
          'Improved ventilation',
          'Respiratory failure and arrest',
          'Hypertension only',
          'Sudden recovery'
        ],
        answerIndex: 1,
        explanation: 'Fatigue in severe distress signals impending respiratory failure; prepare to ventilate.',
        difficulty: 2
      }
    ];
    // ================== END QUESTION BANK ==================

    // ---------- DOM refs ----------
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

    // ---------- State ----------
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

    // ---------- Username (call sign) ----------
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

    // ---------- Local storage for stats ----------
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

    // ---------- Supabase helpers ----------
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
        const res = await fetch(`${SUPABASE_URL}/rest/v1/scores`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            apikey: SUPABASE_KEY,
            Authorization: `Bearer ${SUPABASE_KEY}`,
            Prefer: 'resolution=merge-duplicates'
          },
          body: JSON.stringify(payload)
        });

        if (!res.ok) {
          const text = await res.text();
          console.warn('Supabase sync failed', res.status, text);
          if (leaderboardNoteEl) {
            leaderboardNoteEl.textContent = `Sync error (${res.status}). Check console.`;
          }
        }
      } catch (e) {
        console.warn('Failed to sync score to Supabase', e);
        if (leaderboardNoteEl) {
          leaderboardNoteEl.textContent = 'Sync error (network).';
        }
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
        if (!res.ok) {
          const text = await res.text();
          console.warn('Supabase leaderboard load failed', res.status, text);
          if (leaderboardNoteEl) {
            leaderboardNoteEl.textContent = `Leaderboard error (${res.status}).`;
          }
          return;
        }
        const data = await res.json();
        renderLeaderboard(data);
      } catch (e) {
        console.warn('Failed to load leaderboard from Supabase', e);
        if (leaderboardNoteEl) {
          leaderboardNoteEl.textContent = 'Could not load leaderboard (network).';
        }
      }
    }

    // ---------- UI helpers ----------
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

    // Fisher–Yates shuffle
    function shuffleQuestions(arr) {
      const a = [...arr];
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
    }

    function pickQuestions(topicValue, mode) {
      let pool = QUESTIONS;
      if (topicValue !== 'all') {
        pool = QUESTIONS.filter(q => q.topic === topicValue);
      }
      const shuffled = shuffleQuestions(pool);

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

    // ---------- Events + startup ----------
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
