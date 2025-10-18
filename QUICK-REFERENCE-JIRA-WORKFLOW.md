# Quick Reference: JIRA User Story Actioning Workflow

## 🚀 Start Here

```
User says: "I want to action user story JNF-25"
│
├─ PHASE 1: CONFIRMATION
│  └─ Verify story and get YES/NO
│
├─ PHASE 2: BRANCH CREATION
│  └─ git checkout -b feature/JNF-25
│
├─ PHASE 3: STORY ANALYSIS
│  └─ Create breakdown document
│
├─ PHASE 4: RESEARCH & DOCUMENTATION
│  └─ Review all relevant docs and Google resources
│
├─ PHASE 5: JIRA UPDATE
│  └─ Add comment with methodology and plan
│
├─ PHASE 6: DEVELOPMENT
│  └─ Implement all tasks
│
├─ PHASE 7: TESTING
│  └─ Unit tests + manual verification
│
├─ PHASE 8: APPROVAL REQUEST
│  └─ Present to user for approval
│  └─ If NO: Loop back to Phase 6
│
├─ PHASE 9: COMMIT TO GITHUB
│  └─ git push origin feature/JNF-25
│  └─ Create Pull Request
│
├─ PHASE 10: AWAIT MERGE
│  └─ Update JIRA: "Ready for Review"
│  └─ Wait for main branch approval
│
└─ PHASE 11: COMPLETION
   └─ Verify merge to main
   └─ Close JIRA ticket
   └─ Report complete
```

---

## 📋 Phase Templates

### PHASE 1: User Story Presentation
```
📌 PRESENTING USER STORY FOR ACTIONING
Ticket: [ID]
Title: [Title]
Description: [Description]
Acceptance Criteria:
- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Criterion 3

✅ Proceed? YES / NO
```

### PHASE 3: Story Breakdown Template
```
## STORY COMPONENTS

### 1. Primary Objective
[Main goal]

### 2. Business Context
[Why needed]

### 3. Key Concepts
- Concept 1
- Concept 2

### 4. Technical Requirements
- Requirement 1
- Requirement 2

### 5. Dependencies
- Database Models: [List]
- API Endpoints: [List]
- Components: [List]
- Services: [List]

### 6. Potential Risks
⚠️ Risk 1: [Description]
⚠️ Risk 2: [Description]
```

### PHASE 3: Action List Template
```
## TASK 1: [Task Name]
Priority: High/Medium/Low
Effort: X hours
Acceptance: [How we know it's done]
Files: [List]

## TASK 2: [Task Name]
Priority: High/Medium/Low
Effort: X hours
Acceptance: [How we know it's done]
Files: [List]

TOTAL: X hours
```

### PHASE 4: Documentation Review Template
```
## Internal Documentation Review

📄 COMPLETE-SUMMARY.md
   ✅ / ❌ Relevant
   Key findings: [List]

📄 IMPLEMENTATION-INDEX.md
   ✅ / ❌ Relevant
   Key findings: [List]

📄 ultimate-detailed-implementation.md
   ✅ / ❌ Relevant
   Models: [List]
   Patterns: [List]

📄 ultimate-implementation-part2.md
   ✅ / ❌ Relevant
   Services: [List]
   Components: [List]

## External Research
- Topic: [Topic]
  Resource: [URL]
  Learning: [Key learning]
```

### PHASE 5: JIRA Comment Template
```
🚀 Development Started: [Date & Time]
👤 Developer: [Name]
🌿 Branch: feature/[TICKET_ID]

## METHODOLOGY
### Phase 1: Analysis ✅ COMPLETE
- Story breakdown ✅
- Action list ✅
- Documentation reviewed ✅

### Phase 2: Development [IN PROGRESS]
- Task 1: [Task Name]
- Task 2: [Task Name]

### Implementation Plan:
[Summary of action list]

### Documentation References:
[Links to docs]
```

### PHASE 8: Approval Request Template
```
🎯 DEVELOPMENT COMPLETE - AWAITING APPROVAL

## Summary
Ticket: [ID]
Branch: feature/[TICKET_ID]
Commits: [X commits]

## What Was Implemented
[Description]

## Acceptance Criteria Status
✅ Criterion 1: Complete
✅ Criterion 2: Complete
✅ Criterion 3: Complete

## Files Modified
- [File 1] - NEW/MODIFIED
- [File 2] - NEW/MODIFIED

## Testing Results
✅ Unit Tests: X/X passing
✅ Manual Verification: Complete

## Code Quality
✅ ESLint: Passing
✅ TypeScript: No errors
✅ Prettier: Formatted

---
❓ APPROVAL QUESTION

Is this implementation satisfactory?

Options:
1. ✅ APPROVE - Ready to merge
2. ❌ REQUEST CHANGES - Specify changes
3. 🔍 REQUEST REVIEW - Need more context
4. 📋 PROVIDE FEEDBACK - Give feedback

Response: [User choice]
```

### PHASE 9: Pull Request Template
```
**PR Title:**
feat(JNF-25): [Feature Description]

**PR Description:**

## Overview
[What this PR does]

## Ticket
Closes #JNF-25

## Changes
- [Change 1]
- [Change 2]
- [Change 3]

## Acceptance Criteria Met
- ✅ [Criterion 1]
- ✅ [Criterion 2]
- ✅ [Criterion 3]

## Testing
- ✅ Unit tests: X/X passing
- ✅ Manual verification: Complete

## Files Changed
- [File 1]
- [File 2]
- [File 3]
```

### PHASE 10: JIRA Update (Ready for Review)
```
✅ Development Complete

**Pull Request:** [Link]
**Branch:** feature/JNF-25
**Status:** Ready for Review

All acceptance criteria met ✅
All tests passing ✅
CI/CD pipeline passing ✅

**Next Steps:**
1. Code review by team lead
2. Merge to main branch
3. Deploy to production
4. Close ticket
```

### PHASE 11: JIRA Update (Completed)
```
🎉 COMPLETED - Merged to Production

✅ Merged to main branch
✅ Commit: [Hash]
✅ All tests passing
✅ Code deployed

**Summary of Delivery:**
- Implementation: [Summary]
- Files: [Number] changed
- Tests: [Number] new
- Coverage: [Percentage]%

**Acceptance Criteria - All Met:**
✅ Criterion 1: Verified
✅ Criterion 2: Verified
✅ Criterion 3: Verified
```

---

## 🛠️ Essential Commands

### Git
```bash
git checkout -b feature/JNF-25      # Create branch
git add .                            # Stage changes
git commit -m "feat(JNF-25): ..."    # Commit
git push origin feature/JNF-25       # Push
git checkout main                    # Switch branches
git pull origin main                 # Update main
```

### Development
```bash
pnpm dev                     # Start dev server
pnpm test                    # Run tests
pnpm test:coverage          # Coverage report
pnpm lint --fix             # Fix linting
pnpm format                 # Format code
```

### Status Check
```bash
git branch                   # Show current branch
git status                   # Show changes
git log --oneline -n 5       # Show recent commits
```

---

## 📊 Documentation Reference by Phase

| Phase | Documents to Check |
|-------|-------------------|
| 3-4 | COMPLETE-SUMMARY.md, IMPLEMENTATION-INDEX.md |
| 4 | ultimate-detailed-implementation.md |
| 4 | ultimate-implementation-part2.md |
| 6 | ultimate-implementation-part2.md, Services section |
| 7 | IMPLEMENTATION-INDEX.md, Testing Strategy |

---

## ✅ Approval Decision Tree

```
User Reviews Delivery
│
├─ ✅ APPROVE
│  └─ Proceed to Phase 9: Commit & Push
│
├─ ❌ REQUEST CHANGES
│  ├─ Specify what needs to change
│  └─ Return to Phase 6: Development (implement changes)
│  └─ Return to Phase 7: Testing
│  └─ Return to Phase 8: Approval (re-present)
│
├─ 🔍 REQUEST REVIEW
│  ├─ Specify documentation area
│  └─ Return to Phase 4: Research (deeper dive)
│  └─ Update understanding
│  └─ Return to Phase 6 if changes needed
│  └─ Otherwise proceed to Phase 9
│
└─ 📋 PROVIDE FEEDBACK
   ├─ Incorporate feedback into implementation
   └─ Return to Phase 6: Development
   └─ Return to Phase 7: Testing
   └─ Return to Phase 8: Approval (re-present)
```

---

## 🎯 When to Use This System Prompt

### Best For:
✅ Actionable user stories with clear acceptance criteria  
✅ Stories that fit into 1-3 days of work  
✅ Stories with clear technical scope  
✅ Regular maintenance and feature development  

### Less Suitable For:
❌ Research/exploration tasks  
❌ Design-only stories  
❌ Multi-week epic stories  
❌ Blocked/dependent stories  

---

## 🔄 Loop Back Points

If user says "REQUEST CHANGES":
```
Phase 8 (Approval) ──→ Phase 6 (Development)
                           ↓
                      Phase 7 (Testing)
                           ↓
                      Phase 8 (Approval) [RE-PRESENT]
```

If user says "REQUEST REVIEW":
```
Phase 8 (Approval) ──→ Phase 4 (Research)
                           ↓
                   [Deeper dive into docs]
                           ↓
            Phase 6 (if implementation changes needed)
                      OR
            Phase 9 (if just understanding update)
```

---

## 📌 Key Success Factors

1. **Clear Scope**: Story must have specific acceptance criteria
2. **User Approval Gates**: User decides at Phase 1 and Phase 8
3. **Documentation First**: Review all docs before development
4. **Frequent Commits**: Small, focused commits for audit trail
5. **JIRA Integration**: Keep ticket updated throughout
6. **Testing Priority**: All tests must pass before approval request
7. **User Control**: Final merge approval is always user decision

---

## 🚀 How to Activate

**Say to the AI:**
```
"I want to action user story [JNF-XX]: [Story Title]"
```

**Then respond with:**
```
YES
```

**The AI will:**
- Present Phase 1: Story confirmation
- Guide through all 11 phases
- Use templates for consistency
- Request your approval at Phase 8
- Push to GitHub when approved
- Await your merge approval
- Complete when ticket is closed

---

**Version:** 1.0  
**Status:** Ready to Use  
**Last Updated:** October 19, 2025
