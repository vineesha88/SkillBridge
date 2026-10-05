# SkillBridge — AI-Assisted RPL Skill Assessment

SkillBridge is an AI-assisted digital platform designed to support
Recognition of Prior Learning (RPL) assessment.

It helps workers present their existing skills and experience, maps them
to a relevant NSQF-aligned qualification, guides practical assessment,
organizes evidence, supports standardized scoring, and helps a human
assessor make the final certification recommendation.

> **Important:** SkillBridge does not automatically certify workers.
> AI provides assistance and recommendations, while the human assessor
> remains responsible for the final decision.

---

## Problem

Many workers develop valuable skills through informal work, apprenticeships,
and on-the-job experience but may not have formal certification.

RPL assessment can involve:

- Manual skill and experience verification
- Inconsistent assessment between assessors
- Difficulty organizing practical evidence
- Repetitive scoring and documentation work
- Limited visibility of the assessment process
- Challenges in low-connectivity environments

SkillBridge aims to make this workflow more structured, evidence-based,
and consistent.

---

## Our Solution

SkillBridge follows an end-to-end assessment workflow:

**Experience → Qualification → Practical Tasks → Evidence → AI Assistance → Standardized Score → Human Decision**

### Core Workflow

1. **Worker Self-Declaration**
   - Worker enters previous experience, skills, work history, and practical abilities.

2. **AI-Assisted Skill Extraction**
   - The system identifies relevant skills and experience from the worker's declaration.

3. **NSQF Qualification Mapping**
   - Extracted skills are compared with available qualification data.
   - The system recommends the closest relevant qualification.

4. **Practical Assessment**
   - The worker is evaluated through guided practical tasks.
   - Tasks are linked to the selected qualification.

5. **Evidence Capture**
   - Photos/videos can be associated with practical assessment tasks.
   - Evidence helps support the worker's claimed competency.

6. **AI-Assisted Evidence Review**
   - The system can highlight missing or potentially insufficient evidence.
   - AI can provide observations and suggested scores for assessor review.

7. **Standardized Scoring**
   - Common assessment rubrics are used to improve consistency between assessments.

8. **Human Assessor Verification**
   - The assessor reviews evidence and AI suggestions.
   - The assessor can accept, modify, or request re-demonstration.

9. **Competency Profile**
   - The system generates a structured competency profile based on the assessment.

10. **Certification Recommendation**
    - A recommendation is generated for assessor review.
    - The final decision remains with the authorized human assessor.

---

## Key Features

### 1. AI-Assisted NSQF Mapping

Maps worker experience and declared skills to the closest available
NSQF-aligned qualification in the demonstration dataset.

### 2. Practical Task Assessment

Provides structured practical tasks so assessment follows a consistent
process.

### 3. Evidence-Based Assessment

Allows evidence such as photos and videos to be associated with
specific practical tasks.

### 4. AI-Assisted Scoring

Provides suggested observations and scores based on the assessment
workflow.

The assessor can modify the suggested score before making the final decision.

### 5. Evidence Integrity Checks

The system can help identify issues such as:

- Missing evidence
- Task/evidence mismatch
- Important steps not visible
- Duplicate or reused evidence
- Need for re-demonstration

These checks are assistance features and do not replace assessor judgment.

### 6. Standardized Rubrics

Uses common scoring criteria to support more consistent assessment
across workers and assessors.

### 7. Offline-Capable Workflow

The MVP demonstrates local data storage and synchronization concepts
for environments with limited connectivity.

### 8. Multilingual Interface

The worker-facing experience can support multiple languages,
including English, Hindi, and Telugu.

---

## Demonstration Trade

The current MVP demonstrates the workflow using an **Electrician**
trade.

Example practical assessment tasks include:

- Identifying tools
- Basic wiring
- Installing a switch/socket
- Troubleshooting a wiring fault

The qualification and assessment data used in the MVP are demonstration
data and are not presented as official government certification data.

---

## AI vs Human Decision

SkillBridge follows a human-in-the-loop approach.

```text
Worker Experience
       ↓
AI Skill Extraction
       ↓
Qualification Mapping
       ↓
Practical Assessment
       ↓
Evidence Collection
       ↓
AI-Assisted Review
       ↓
Suggested Score
       ↓
Human Assessor Review
       ↓
Final Recommendation / Decision
