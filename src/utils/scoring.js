// Standardized scoring logic — keeps scoring separate from UI

export function calculateTotalScore(rubricScores) {
  if (!rubricScores || rubricScores.length === 0) return { total: 0, max: 0 }
  const total = rubricScores.reduce((sum, r) => sum + (r.score || 0), 0)
  const max = rubricScores.reduce((sum, r) => sum + (r.maxScore || 0), 0)
  return { total, max }
}

export function scoreToPercentage(total, max) {
  if (!max || max === 0) return 0
  return Math.round((total / max) * 100)
}

// Mock AI evidence review — returns a suggested score and observation
// This simulates what an AI review layer would produce
export function generateAIReview(taskId, evidenceItems) {
  const hasEvidence = evidenceItems && evidenceItems.length > 0
  const hasVideo = evidenceItems && evidenceItems.some((e) => e.type === 'video')

  if (!hasEvidence) {
    return {
      observation: 'No evidence submitted. Cannot provide assessment suggestion.',
      suggestedScore: 0,
      maxScore: 2,
      confidence: 'Low',
    }
  }

  const reviews = {
    task1: {
      observation:
        'Evidence appears to demonstrate tool identification. Most common tools are correctly identified. Safe handling posture is visible.',
      suggestedScore: 2,
      maxScore: 2,
      confidence: 'High',
    },
    task2: {
      observation:
        'Evidence appears to demonstrate the wiring task. The main connection sequence is visible. Safety verification is incomplete.',
      suggestedScore: hasVideo ? 2 : 1,
      maxScore: 2,
      confidence: 'Moderate',
    },
    task3: {
      observation:
        'Installation appears correct. Wire connections are properly terminated. Faceplate mounting is neat. Earth connection visible.',
      suggestedScore: 2,
      maxScore: 2,
      confidence: 'High',
    },
    task4: {
      observation:
        'Troubleshooting approach is systematic. Fault identification is correct. However, safety procedure is not clearly visible in the submitted evidence.',
      suggestedScore: 1,
      maxScore: 2,
      confidence: 'Moderate',
    },
  }

  return reviews[taskId] || {
    observation: 'Evidence reviewed. Task appears to be demonstrated.',
    suggestedScore: 1,
    maxScore: 2,
    confidence: 'Moderate',
  }
}

// Evidence integrity checks — rule-based demonstration
export function checkEvidenceIntegrity(taskId, evidenceItems, taskProgress) {
  const flags = []

  if (!evidenceItems || evidenceItems.length === 0) {
    flags.push({ level: 'error', message: 'Missing evidence — no evidence submitted for this task' })
    return flags
  }

  // Check for duplicate filenames
  const fileNames = evidenceItems.map((e) => e.fileName)
  const duplicates = fileNames.filter((name, idx) => fileNames.indexOf(name) !== idx)
  if (duplicates.length > 0) {
    flags.push({ level: 'error', message: 'Duplicate evidence detected — same file submitted multiple times' })
  }

  flags.push({ level: 'ok', message: 'Task matches assigned assessment' })
  flags.push({ level: 'ok', message: 'Evidence available for review' })

  // Task-specific safety checks
  if (taskId === 'task2' || taskId === 'task4') {
    const hasVideo = evidenceItems.some((e) => e.type === 'video')
    if (!hasVideo) {
      flags.push({
        level: 'warning',
        message: 'Safety procedure requires assessor verification — video evidence recommended',
      })
    } else {
      flags.push({ level: 'warning', message: 'Safety step requires assessor verification' })
    }
  }

  if (taskId === 'task4') {
    flags.push({
      level: 'warning',
      message: 'Important assessment step not clearly visible — assessor should verify in person',
    })
  }

  return flags
}
