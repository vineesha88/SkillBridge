export const practicalTasks = [
  {
    id: 'task1',
    title: 'Identify electrical tools',
    description:
      'Identify and name common electrical tools used in wiring and installation work. Explain the purpose and safe handling of each tool.',
    competency: 'Tool identification and safe handling',
    safetyInstruction: 'Ensure all tools are de-energized and placed on a non-conductive surface.',
    evidenceRequired: 'Photo or short video showing tool identification with assessor present.',
    criteria: [
      'Correctly identifies at least 5 common electrical tools',
      'Demonstrates safe handling posture',
      'Explains purpose of each tool',
    ],
  },
  {
    id: 'task2',
    title: 'Perform basic wiring connection',
    description:
      'Complete a basic electrical wiring connection for a lighting circuit, including connecting wires to a switch and lamp holder.',
    competency: 'Wiring and connection',
    safetyInstruction: 'Power must be switched off at the mains. Verify with a tester before beginning.',
    evidenceRequired: 'Photo or video of the completed wiring connection.',
    criteria: [
      'Correct wire selection (phase, neutral, earth)',
      'Proper stripping and termination',
      'Connections are secure and correctly placed',
      'Safety procedure followed',
    ],
  },
  {
    id: 'task3',
    title: 'Install a switch/socket',
    description:
      'Install a standard electrical switch or socket on a mounting box, including wiring connections and faceplate fixing.',
    competency: 'Installation',
    safetyInstruction: 'Ensure circuit is isolated and verified dead before installation.',
    evidenceRequired: 'Photo or video of the installed switch/socket.',
    criteria: [
      'Correct mounting box preparation',
      'Proper wire connections to switch/socket terminals',
      'Faceplate fixed neatly and securely',
      'Earth connection made where required',
    ],
  },
  {
    id: 'task4',
    title: 'Identify and troubleshoot a wiring fault',
    description:
      'Given a simulated wiring fault, identify the nature of the fault, explain the diagnostic process, and correct the fault.',
    competency: 'Troubleshooting and fault diagnosis',
    safetyInstruction: 'Use insulated tools and PPE. Do not work on live circuits without assessor approval.',
    evidenceRequired: 'Video showing the troubleshooting process and correction.',
    criteria: [
      'Systematic fault identification approach',
      'Correct use of testing equipment',
      'Fault correctly identified and explained',
      'Fault corrected safely',
      'Post-repair testing performed',
    ],
  },
]

export const taskStatuses = {
  NOT_STARTED: 'Not Started',
  IN_PROGRESS: 'In Progress',
  EVIDENCE_SUBMITTED: 'Evidence Submitted',
  VERIFIED: 'Verified',
}
