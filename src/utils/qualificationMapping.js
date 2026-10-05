import { qualifications } from '../data/qualifications.js'

// Mock qualification mapping — compares extracted skills against required skills
// Returns a match result with percentage, matched skills, and skills to verify

export function mapQualification(workerTrade, extractedSkills) {
  const qual = qualifications.find((q) =>
    q.recommendedIfTrade.some((t) => t.toLowerCase() === (workerTrade || '').toLowerCase()),
  ) || qualifications[0]

  const required = qual.requiredSkills
  const normalizedExtracted = extractedSkills.map((s) => s.toLowerCase())

  const matched = required.filter((r) =>
    normalizedExtracted.some((e) => e.includes(r.toLowerCase()) || r.toLowerCase().includes(e)),
  )

  const toVerify = required.filter(
    (r) => !matched.some((m) => m.toLowerCase() === r.toLowerCase()),
  )

  const matchPercent = Math.round((matched.length / required.length) * 100)

  return {
    qualification: qual,
    matchedSkills: matched,
    skillsToVerify: toVerify,
    experienceMatch: matchPercent,
    skillsMatched: matched.length,
    additionalSkillsToVerify: toVerify.length,
  }
}
