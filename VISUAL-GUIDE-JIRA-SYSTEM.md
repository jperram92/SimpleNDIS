# 📊 JIRA User Story Actioning System - Visual Guide

## System Overview Diagram

```
┌────────────────────────────────────────────────────────────────────────────┐
│                                                                            │
│        🎯 JIRA USER STORY ACTIONING SYSTEM - 11 PHASE WORKFLOW           │
│                                                                            │
└────────────────────────────────────────────────────────────────────────────┘

                              START: User Says
                         "I want to action JNF-25"
                                   │
                                   ▼
            ┌──────────────────────────────────────────┐
            │   PHASE 1: STORY SELECTION              │
            │   Confirm: YES / NO                     │
            │   ⏱️  Time: 30 seconds                  │
            └──────────────────┬───────────────────────┘
                               │ (YES)
                               ▼
            ┌──────────────────────────────────────────┐
            │   PHASE 2: BRANCH CREATION              │
            │   git checkout -b feature/JNF-25        │
            │   ⏱️  Time: 30 seconds                  │
            └──────────────────┬───────────────────────┘
                               │
                               ▼
            ┌──────────────────────────────────────────┐
            │   PHASE 3: STORY ANALYSIS               │
            │   - Breakdown objectives                │
            │   - List components                     │
            │   - Create action list                  │
            │   - Identify risks                      │
            │   ⏱️  Time: 15 minutes                  │
            └──────────────────┬───────────────────────┘
                               │
                               ▼
            ┌──────────────────────────────────────────┐
            │   PHASE 4: RESEARCH & DOCUMENTATION     │
            │   - Review: COMPLETE-SUMMARY.md         │
            │   - Review: IMPLEMENTATION-INDEX.md     │
            │   - Review: ultimate-detailed-impl.md   │
            │   - Review: ultimate-part2.md           │
            │   - Google search if needed             │
            │   ⏱️  Time: 30 minutes                  │
            └──────────────────┬───────────────────────┘
                               │
                               ▼
            ┌──────────────────────────────────────────┐
            │   PHASE 5: JIRA UPDATE                  │
            │   Add comment with:                     │
            │   - Methodology                         │
            │   - Implementation plan                 │
            │   - Documentation references           │
            │   ⏱️  Time: 5 minutes                   │
            └──────────────────┬───────────────────────┘
                               │
                               ▼
            ┌──────────────────────────────────────────┐
            │   PHASE 6: DEVELOPMENT                  │
            │   - Execute tasks one by one            │
            │   - Frequent commits (git add + commit) │
            │   - Review code quality                 │
            │   ⏱️  Time: 2-8 hours                   │
            └──────────────────┬───────────────────────┘
                               │
                               ▼
            ┌──────────────────────────────────────────┐
            │   PHASE 7: TESTING                      │
            │   - Run all unit tests                  │
            │   - Manual verification                │
            │   - Check acceptance criteria           │
            │   ⏱️  Time: 30 minutes                  │
            └──────────────────┬───────────────────────┘
                               │
                               ▼
            ┌──────────────────────────────────────────┐
            │   PHASE 8: APPROVAL REQUEST             │
            │   Present to user for decision:         │
            │                                         │
            │   ✅ APPROVE                           │ ──┐
            │   ❌ REQUEST CHANGES                   │  ├─ LOOP BACK TO PHASE 6
            │   🔍 REQUEST REVIEW                    │  │
            │   📋 PROVIDE FEEDBACK                  │ ──┘
            │                                         │
            │   ⏱️  Time: Depends on user            │
            └───┬───────────────────────────┬────────┘
                │ (APPROVE)                  │ (CHANGES/REVIEW/FEEDBACK)
                │                            │
                │ (Continue)                 └──────────────────┐
                │                                                │
                │                       Back to Phase 6 & 7      │
                │                                                │
                │                            ┌──────────────────┘
                │                            │
                ▼                            ▼
            ┌──────────────────────────────────────────┐
            │   PHASE 9: COMMIT TO GITHUB             │
            │   - git push origin feature/JNF-25      │
            │   - Create Pull Request                 │
            │   - Wait for CI/CD pipeline             │
            │   ⏱️  Time: 5 minutes                   │
            └──────────────────┬───────────────────────┘
                               │
                               ▼
            ┌──────────────────────────────────────────┐
            │   PHASE 10: AWAIT MERGE                 │
            │   - Team lead reviews PR                │
            │   - May request changes                 │
            │   - Merges to main branch               │
            │   ⏱️  Time: 2-24 hours                  │
            └──────────────────┬───────────────────────┘
                               │
                               ▼
            ┌──────────────────────────────────────────┐
            │   PHASE 11: COMPLETION                  │
            │   - Verify merge to main                │
            │   - Close JIRA ticket                   │
            │   - Generate completion report          │
            │   ⏱️  Time: 5 minutes                   │
            └──────────────────┬───────────────────────┘
                               │
                               ▼
                        ✅ STORY COMPLETE
                           Ready for next!
```

---

## Phase Interaction Map

```
┌─────────────────────────────────────────────────────────────────────────┐
│  PHASE 1                                                                │
│  Selection                                                              │
│  (User Controls)                                                        │
│  └──► YES                                                               │
│       └──► PHASE 2: Branch Creation                                    │
│            └──► PHASE 3: Analysis (AI)                                 │
│                 └──► PHASE 4: Research (AI)                            │
│                      └──► PHASE 5: JIRA Update (AI)                    │
│                           └──► PHASE 6: Development (AI)               │
│                                ├──► Commit 1 (You can review)          │
│                                ├──► Commit 2 (You can review)          │
│                                └──► Commit 3 (You can review)          │
│                                     └──► PHASE 7: Testing (AI)         │
│                                          ├──► Unit Tests ✅             │
│                                          ├──► Integration Tests ✅      │
│                                          └──► Manual Verification ✅    │
│                                               └──► PHASE 8: Decision ◄──┤
│                                                    (User Controls)       │
│                                                    │                    │
│              ┌────────────────────────────────────┼────────────────┐   │
│              │                                    │                │   │
│              ▼                                    ▼                ▼   │
│         ✅ APPROVE                    ❌ CHANGES          🔍 REVIEW   │
│              │                             │                │         │
│              ▼                             ▼                ▼         │
│         PHASE 9:                     Back to               Phase 4:  │
│         Commit & PR                  Phase 6               Research  │
│              │                        (and 7)              (deeper)  │
│              ▼                             │                │         │
│         PHASE 10:                         │                │         │
│         Await Merge                       │                └────┐    │
│              │                            │                     │    │
│              ▼                            │                     ▼    │
│         PHASE 11:                         └──────────────► Back to Phase 6
│         Completion                                          (if needed)
│              │
│              ▼
│           ✅ DONE
│         (Ticket Closed)
│
└─────────────────────────────────────────────────────────────────────────┘

Legend:
AI = Automated implementation by GitHub Copilot
You = Your decision/approval required
◄──┤ = Feedback loop back to earlier phase
```

---

## Decision Tree: Phase 8 Approval

```
                    PHASE 8: APPROVAL REQUEST
                            │
                  Is implementation OK?
                            │
            ┌───────────────┼───────────────┐
            │               │               │
          YES              NO             UNSURE
            │               │               │
            │               │               │
            ▼               ▼               ▼
         ✅ APPROVE   ❌ REQUEST      🔍 REQUEST
                     CHANGES           REVIEW
            │               │               │
            │               │               │
            ▼               ▼               ▼
        PHASE 9        Phase 6          Phase 4
        Push to        (refine          (deeper
        GitHub         code)            analysis)
            │               │               │
            │               ▼               │
            │            Phase 7            │
            │            (test)             │
            │               │               │
            │               ▼               ▼
            │          Phase 8          Phase 6 or 9?
            │       (re-approval)    (decision by AI)
            │               │               │
            └───────────────┴───────────────┘
                            │
                            ▼
                        PHASE 9
                    Commit & Push
```

---

## Timeline: Example Story

```
JNF-25: Participant Registration Endpoint & UI
Status: STARTING

TIME    PHASE                    STATUS              NOTES
────    ─────────────────────    ────────────        ──────────────────
9:00    Phase 1: Selection       ✅ User confirms    YES - Proceed
9:05    Phase 2: Branch          ✅ Created          feature/JNF-25
9:05    Phase 3: Analysis        ✅ Complete         Action list: 3 tasks
9:20    Phase 4: Research        ✅ Complete         Found patterns
9:25    Phase 5: JIRA Update     ✅ Complete         Ticket updated
9:30    Phase 6: Development     🚀 IN PROGRESS      Task 1 starting
9:45                             ✅ Commit 1         Database model
10:15                            ✅ Commit 2         API endpoint
10:45                            ✅ Commit 3         React component
11:00   Phase 7: Testing         🧪 IN PROGRESS      Running tests
11:15                            ✅ COMPLETE         All pass (15/15)
11:20   Phase 8: Approval        ⏳ WAITING          Presented to user
11:25                            ✅ USER: APPROVE    Ready for GitHub
11:30   Phase 9: Commit & PR     ✅ Complete         PR #123 created
11:35                            ✅ CI/CD passing    All checks ✅
14:00   Phase 10: Await Merge    ⏳ WAITING          Team reviews PR
16:00                            ✅ MERGED           Merged to main
16:05   Phase 11: Completion     ✅ COMPLETE         Ticket closed
────    ──────────────────────   ───────────        ──────────────────

TOTAL TIME: ~7 hours (story complexity dependent)
```

---

## File Dependencies Map

```
┌────────────────────────────────────────────────────────────────┐
│                                                                │
│         GITHUB COPILOT AI SYSTEM                              │
│                                                                │
│         References During Workflow:                           │
│                                                                │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │ Phase 4: Research                                       │  │
│  │                                                         │  │
│  │ 📄 Documentation Files Referenced:                      │  │
│  │                                                         │  │
│  │ 1. COMPLETE-SUMMARY.md                                 │  │
│  │    └─ Project overview, feature matrix                │  │
│  │                                                         │  │
│  │ 2. IMPLEMENTATION-INDEX.md                            │  │
│  │    └─ Technology stack, architecture, services        │  │
│  │                                                         │  │
│  │ 3. ultimate-detailed-implementation.md                │  │
│  │    └─ Monorepo structure, authentication, patterns    │  │
│  │                                                         │  │
│  │ 4. ultimate-implementation-part2.md                   │  │
│  │    └─ UI components, services, API examples           │  │
│  │                                                         │  │
│  │ 5. Google Search (if docs insufficient)               │  │
│  │    └─ Best practices, NDIS specifics                  │  │
│  │                                                         │  │
│  └─────────────────────────────────────────────────────────┘  │
│                                                                │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │ Phase 6: Development                                   │  │
│  │                                                         │  │
│  │ 📁 Project Files Modified:                             │  │
│  │                                                         │  │
│  │ • Prisma Schema (Database models)                      │  │
│  │ • TypeScript Components (UI)                           │  │
│  │ • Service Files (Business logic)                       │  │
│  │ • API Routes (Next.js endpoints)                       │  │
│  │ • Test Files (Unit/Integration)                        │  │
│  │                                                         │  │
│  └─────────────────────────────────────────────────────────┘  │
│                                                                │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │ Phase 9: Commit to GitHub                              │  │
│  │                                                         │  │
│  │ 📊 Git Operations:                                     │  │
│  │                                                         │  │
│  │ • git push origin feature/JNF-25                       │  │
│  │ • GitHub PR creation (with template)                  │  │
│  │ • CI/CD pipeline triggers                              │  │
│  │ • Automated tests run                                  │  │
│  │                                                         │  │
│  └─────────────────────────────────────────────────────────┘  │
│                                                                │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │ Phase 5 & 10: JIRA Integration                          │  │
│  │                                                         │  │
│  │ 🔗 JIRA MCP Commands:                                  │  │
│  │                                                         │  │
│  │ • Add comment with methodology (Phase 5)               │  │
│  │ • Update status to "In Development"                    │  │
│  │ • Update status to "In Review" (Phase 9)               │  │
│  │ • Add final comment when complete (Phase 11)           │  │
│  │ • Close ticket                                         │  │
│  │                                                         │  │
│  └─────────────────────────────────────────────────────────┘  │
│                                                                │
└────────────────────────────────────────────────────────────────┘

YOU (HUMAN)
└─ Decision Gates:
   ├─ Phase 1: Confirm story
   ├─ Phase 8: Approve / Request changes / Request review
   └─ Phase 10: Final merge approval
```

---

## Technology Stack Integration

```
┌─────────────────────────────────────────────────────────────────┐
│                    TECHNOLOGY STACK                             │
└─────────────────────────────────────────────────────────────────┘

GitHub Copilot
    └─ Implements code per system prompt

       Uses:
       ├─ TypeScript (Language)
       ├─ Next.js (Framework)
       ├─ React (UI)
       ├─ Prisma (ORM)
       ├─ PostgreSQL (Database)
       ├─ Zod (Validation)
       ├─ Tailwind CSS (Styling)
       └─ pnpm (Package manager)

Git
    ├─ Creates branches: feature/JNF-XX
    ├─ Commits code: git commit -m "feat(JNF-25): ..."
    └─ Pushes: git push origin feature/JNF-25

GitHub
    ├─ Receives push
    ├─ Triggers CI/CD
    ├─ Runs tests
    ├─ Creates PR
    └─ Awaits merge approval

JIRA
    ├─ Receives ticket ID
    ├─ Gets updated with methodology (Phase 5)
    ├─ Gets updated with status changes
    └─ Gets closed when complete (Phase 11)

Your Local Machine
    ├─ Runs: pnpm dev
    ├─ Runs: pnpm test
    ├─ Runs: git commands
    └─ Reviews code changes

VS Code
    ├─ GitHub Copilot extension
    ├─ Git integration
    ├─ Terminal
    └─ Code editor
```

---

## Approval Loop Flowchart

```
                        PHASE 8 APPROVAL
                    Comprehensive Summary
                         Presented
                              │
                              ▼
                    ┌──────────────────┐
                    │ Do you approve?  │
                    └────┬─────┬───┬───┘
                         │     │   │
            ┌────────────┘     │   └─────────────┐
            │                  │                 │
            ▼                  ▼                 ▼
        YES ✅             NO ❌             REVIEW 🔍
        APPROVE            REQUEST           REQUEST
                           CHANGES           DEEPER
                                             ANALYSIS
            │                  │                 │
            │                  │                 │
            ▼                  ▼                 ▼
        ┌────────────────┐ ┌─────────────┐ ┌──────────┐
        │ PHASE 9:       │ │ Specify     │ │ Phase 4: │
        │ Commit & Push  │ │ changes     │ │ Deeper   │
        │ to GitHub      │ │ needed      │ │ Research │
        │                │ │             │ │          │
        │ - git push     │ │ ┌─────────┐ │ │ - Review │
        │ - Create PR    │ │ │Back to  │ │ │   docs   │
        │ - Wait CI/CD   │ │ │Phase 6: │ │ │ - Google │
        │                │ │ │ Develop │ │ │   search │
        └────────────────┘ │ │ and     │ │ │ - Provide│
            │              │ │ refine  │ │ │   context│
            │              │ │         │ │ │          │
            │              │ │ Then:   │ │ │ ┌──────┐ │
            │              │ │ Phase 7 │ │ │ │Back  │ │
            │              │ │ (test)  │ │ │ │to    │ │
            │              │ │         │ │ │ │Phase │ │
            │              │ │ Then:   │ │ │ │6 or  │ │
            │              │ │ Phase 8 │ │ │ │9     │ │
            │              │ │ Re-eval │ │ │ │      │ │
            │              │ └─────────┘ │ │ └──────┘ │
            │              │       │     │ │    │     │
            │              └───────┼─────┼─┼────┘     │
            │                      │     │ │          │
            │                      ▼     ▼ ▼          │
            │                    PHASE 9 (or 6/7)    │
            │                                         │
            └─────────────────────┬───────────────────┘
                                  │
                                  ▼
                            PHASE 10:
                        Await Main Merge
                                  │
                                  ▼
                            PHASE 11:
                        Complete & Close
```

---

## Documentation Reference Matrix

```
┌──────────┬──────────────────────────┬─────────────────────────────┐
│ Phase    │ Primary Document         │ Key Sections                │
├──────────┼──────────────────────────┼─────────────────────────────┤
│ 1        │ ACTIVATION-GUIDE         │ Quick Start, 5-min walkthrough│
│          │                          │                             │
│ 2        │ QUICK-REFERENCE          │ Phase 2 template            │
│          │                          │ Git commands                │
│          │                          │                             │
│ 3        │ SYSTEM-PROMPT            │ Story Breakdown template    │
│          │ QUICK-REFERENCE          │ Phase 3 details            │
│          │                          │                             │
│ 4        │ COMPLETE-SUMMARY.md      │ Feature matrix              │
│          │ IMPLEMENTATION-INDEX.md  │ Architecture overview       │
│          │ ultimate-detailed-*.md   │ Patterns & examples         │
│          │ ultimate-*-part2.md      │ Service implementations     │
│          │                          │                             │
│ 5        │ SYSTEM-PROMPT            │ JIRA Update templates (×2)  │
│          │ QUICK-REFERENCE          │ JIRA comment templates      │
│          │                          │                             │
│ 6        │ ultimate-*-part2.md      │ Service implementations     │
│          │ SYSTEM-PROMPT            │ Code quality checklist      │
│          │                          │ Development template        │
│          │                          │                             │
│ 7        │ IMPLEMENTATION-INDEX.md  │ Testing strategy            │
│          │ SYSTEM-PROMPT            │ Test checklist              │
│          │ QUICK-REFERENCE          │ Verification template       │
│          │                          │                             │
│ 8        │ SYSTEM-PROMPT            │ Approval template           │
│          │ QUICK-REFERENCE          │ Decision tree               │
│          │ ACTIVATION-GUIDE         │ FAQ (approval section)      │
│          │                          │                             │
│ 9        │ SYSTEM-PROMPT            │ PR template                 │
│          │ QUICK-REFERENCE          │ Git commands                │
│          │                          │                             │
│ 10       │ SYSTEM-PROMPT            │ Merge awaiting section      │
│          │ JIRA MCP docs            │ Status updates              │
│          │                          │                             │
│ 11       │ SYSTEM-PROMPT            │ Completion template         │
│          │ COMPLETION REPORT        │ Metrics & summary           │
│          │                          │                             │
└──────────┴──────────────────────────┴─────────────────────────────┘
```

---

## Success Criteria Checklist

```
BEFORE STARTING A STORY:
    ☐ Story has clear acceptance criteria
    ☐ Story is in JIRA
    ☐ Git is configured
    ☐ Dev environment ready (Node, pnpm, PostgreSQL)
    ☐ You've read ACTIVATION-GUIDE-JIRA-SYSTEM.md

DURING STORY IMPLEMENTATION:
    ☐ Phase 1: Story confirmed (YES)
    ☐ Phase 2: Branch created
    ☐ Phase 3: Story breakdown understood
    ☐ Phase 4: Documentation reviewed
    ☐ Phase 5: JIRA updated with plan
    ☐ Phase 6: Code implemented
    ☐ Phase 7: All tests passing
    ☐ Phase 8: Decision made (APPROVE/CHANGE/REVIEW)

AFTER APPROVAL:
    ☐ Phase 9: Pushed to GitHub
    ☐ Phase 9: PR created with full context
    ☐ Phase 9: CI/CD pipeline passing
    ☐ Phase 10: Team review approved
    ☐ Phase 10: Merged to main
    ☐ Phase 11: JIRA ticket closed
    ☐ Phase 11: Completion report generated

QUALITY GATES:
    ☐ TypeScript: No errors
    ☐ ESLint: Passing
    ☐ Prettier: Code formatted
    ☐ Tests: All passing (100% coverage if applicable)
    ☐ Manual verification: All criteria met

DELIVERABLES:
    ☐ Code changes in main branch
    ☐ Tests added and passing
    ☐ Documentation updated
    ☐ JIRA ticket closed
    ☐ Git history shows clear commits
```

---

## Quick Stats

```
SYSTEM METRICS:

Phases:              11
Decision Points:     5 (user controls 3 major gates)
Templates:           10+
Documentation:       4 core documents
Code Examples:       50+ in source materials

PER STORY:
Average Time:        1-8 hours (depends on complexity)
Commits:             3-10 small focused commits
Test Coverage:       80%+ (minimum)
Files Modified:      2-15 files typically
Approval Gates:      2 major gates (Phase 1, Phase 8)

QUALITY:
Tests Required:      Unit + Integration + Manual
Code Review:         AI + Team Lead
Audit Trail:         Complete (Git + JIRA)
Documentation:       Updated at each phase

OUTCOMES:
Acceptance:          100% (user approves before merge)
Tests:              100% passing (before approval)
Deployment:         Ready for production
Ticket:             Closed with full history
```

---

## How Different Roles Use the System

```
DEVELOPER:
    Phase 1: Confirm story
    Phase 3: Understand breakdown
    Phase 4: Review documentation (optional)
    Phase 6: Review code being created
    Phase 8: Approve / Request changes
    Phase 9: Monitor PR

PROJECT MANAGER:
    Phase 1: Assign story
    Phase 5: See JIRA updates
    Phase 8: Informed of status
    Phase 11: See completion

TECH LEAD:
    Phase 4: Optionally deeper research
    Phase 7: Review test results
    Phase 8: Approve implementation
    Phase 9: Review PR
    Phase 10: Approve merge to main

QA/TESTER:
    Phase 7: See automated tests
    Phase 7: Manual verification documented
    Phase 11: Test in production
    Phase 11: Close testing cycle

DEVOPS:
    Phase 9: Monitor CI/CD
    Phase 10: Trigger deployment (optional)
    Phase 11: Monitor production
```

---

## File Size Reference

```
SYSTEM DOCUMENTS CREATED:

📄 JIRA-USER-STORY-SYSTEM-PROMPT.md
   Size: 15+ KB
   Content: Complete 11-phase workflow
   Best for: Deep reference
   Read time: 30 minutes

📄 QUICK-REFERENCE-JIRA-WORKFLOW.md
   Size: 8+ KB
   Content: Templates and quick lookup
   Best for: During work
   Read time: 10 minutes

📄 ACTIVATION-GUIDE-JIRA-SYSTEM.md
   Size: 10+ KB
   Content: Getting started guide
   Best for: First time setup
   Read time: 5 minutes

📄 SYSTEM-SUMMARY.md
   Size: 12+ KB
   Content: Overview of everything
   Best for: Understanding what was created
   Read time: 15 minutes

📄 VISUAL-GUIDE.md (This file)
   Size: 15+ KB
   Content: Diagrams and flowcharts
   Best for: Visual learners
   Read time: 10 minutes

TOTAL: 60+ KB of structured guidance
```

---

## 🚀 How to Activate This System

```
STEP 1: READ THIS VISUAL GUIDE
   └─ Understand the overall workflow

STEP 2: READ ACTIVATION-GUIDE
   └─ Get practical start instructions

STEP 3: PICK A JIRA TICKET
   └─ Select from your backlog

STEP 4: SAY TO GITHUB COPILOT
   "I want to action user story JNF-25: [Title]"

STEP 5: RESPOND "YES" WHEN PROMPTED
   └─ System begins Phase 1

STEP 6: FOLLOW THE SYSTEM
   └─ System guides you through all 11 phases

STEP 7: DECIDE AT PHASE 8
   └─ Approve, request changes, or request review

STEP 8: SYSTEM COMMITS TO GITHUB
   └─ When you approve

STEP 9: YOU APPROVE FINAL MERGE
   └─ When ready

RESULT: ✅ Story complete and merged!
```

---

**Visual Guide Version:** 1.0  
**Status:** Ready to Use  
**Created:** October 19, 2025
