// Mock AI skill extraction — uses keyword matching on worker's declared experience
// This is a DEMONSTRATION of what an AI layer would do, not a real AI model.

const SKILL_KEYWORDS = {
  'Electrical wiring': ['wiring', 'wire', 'circuit'],
  Installation: ['installation', 'install', 'mounting', 'fixture'],
  Troubleshooting: ['troubleshooting', 'repair', 'fault', 'fix'],
  'Tool handling': ['tool', 'tools', 'equipment'],
  'Safety procedures': ['safety', 'safe', 'precaution'],
  Testing: ['testing', 'test', 'tester', 'multimeter'],
  'Fault diagnosis': ['diagnosis', 'diagnose', 'identify fault'],
  'Pipe fitting': ['pipe', 'plumbing', 'fitting'],
  'Arc welding': ['welding', 'weld', 'arc'],
  'Gas welding': ['gas welding', 'gas cut'],
}

export function extractSkills(worker) {
  if (!worker) return []

  const combinedText = [
    ...(worker.previousWork || []),
    ...(worker.declaredSkills || []),
    worker.trade || '',
  ]
    .join(' ')
    .toLowerCase()

  const found = new Set()

  for (const [skill, keywords] of Object.entries(SKILL_KEYWORDS)) {
    if (keywords.some((kw) => combinedText.includes(kw.toLowerCase()))) {
      found.add(skill)
    }
  }

  // Always include declared skills that map directly
  const declaredMap = {
    Wiring: 'Electrical wiring',
    'Tool handling': 'Tool handling',
    'Electrical safety': 'Safety procedures',
    Installation: 'Installation',
    Troubleshooting: 'Troubleshooting',
    Safety: 'Safety procedures',
    Testing: 'Testing',
    'Fault diagnosis': 'Fault diagnosis',
  }

  for (const ds of worker.declaredSkills || []) {
    if (declaredMap[ds]) found.add(declaredMap[ds])
  }

  return Array.from(found)
}
