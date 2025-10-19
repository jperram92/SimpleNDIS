# 🚀 JIRA SYSTEM QUICK START - WITH COMMENTS

**Version:** 2.0 (Comment-Integrated)  
**Purpose:** Get started actioning JIRA stories in 3 steps

---

## 📌 3-Step Quick Start

### Step 1: Load the System Prompt

Copy the full text from:

```
Documentation/JIRA-USER-STORY-SYSTEM-PROMPT.md
```

Paste into your **GitHub Copilot system prompt** (or first message).

### Step 2: Request a Story

Say to Copilot:

```
I want to action user story JNF-2
```

### Step 3: Follow the Workflow

Copilot will:

1. ✅ Fetch JNF-2 from JIRA (with all comments)
2. ✅ Display full context (description + ALL comments)
3. ✅ Ask for confirmation
4. ✅ Guide through 11 phases (with JIRA auto-updates)

---

## 🎯 What Happens at Each Phase

| Phase  | What Copilot Does                  | Your Action       |
| ------ | ---------------------------------- | ----------------- |
| **1**  | Fetches ticket + displays comments | Say YES/NO        |
| **2**  | Shows branch creation command      | Run git command   |
| **3**  | Analyzes story using comments      | Review analysis   |
| **4**  | Creates implementation playbook    | Review playbook   |
| **5**  | Posts methodology to JIRA ✅       | Confirm ready     |
| **6**  | Guides implementation              | Code & commit     |
| **7**  | Tests acceptance criteria          | Verify tests pass |
| **8**  | Requests approval                  | Say YES/NO        |
| **9**  | Creates PR (you merge)             | Merge PR          |
| **10** | Posts PR details to JIRA ✅        | Confirm updated   |
| **11** | Closes ticket in JIRA ✅           | Confirm done      |

---

## 💡 Key: Comments Are Everything

**The ticket comments are your PRIMARY IMPLEMENTATION GUIDE.**

Example for JNF-2:

- **Comment 1:** "Use pnpm workspaces, Turborepo, follow IMPLEMENTATION-INDEX.md"
- **Comment 2:** "16-section detailed guide with all best practices"

The system will:

- ✅ Extract guidance from comments
- ✅ Build implementation playbook from comments
- ✅ Test implementation against comment guidance
- ✅ Cite comments in PR description

---

## 📋 MCP Auto-Updates

System automatically posts to JIRA at:

| Phase  | JIRA Update      | What Gets Posted                            |
| ------ | ---------------- | ------------------------------------------- |
| **5**  | Comment          | Methodology + comment analysis summary      |
| **10** | Comment + Status | PR details + change status to "In Review"   |
| **11** | Comment + Status | Completion notice + change status to "Done" |

**You don't need to touch JIRA UI - system handles it.**

---

## 🔄 Available Commands

### Action a Story

```
I want to action user story JNF-2
```

→ Fetches JNF-2, displays comments, starts Phase 1

### Reload System

```
Reload the JIRA User Story Actioning System
```

→ Restarts workflow from Phase 1

### Action Different Story

```
I want to action user story JNF-5
```

→ Fetches JNF-5, starts fresh workflow

### Get Help

```
How does the comment parsing work?
```

→ Shows explanation from system prompt

---

## ✅ Checklist: Before You Start

- [ ] JIRA User Story System Prompt loaded into Copilot
- [ ] You have access to JIRA (ndisapppoc.atlassian.net)
- [ ] You have Git set up locally
- [ ] You know your target ticket ID (e.g., JNF-2)

---

## 📊 What Comments Add to the Workflow

### Phase 1: Display

**Before:** Only description shown  
**After:** Description + all comments visible for review

### Phase 3: Analysis

**Before:** Manual analysis required  
**After:** Automated extraction of requirements + constraints from comments

### Phase 4: Playbook

**Before:** Generic playbook  
**After:** Playbook built from comment guidance (specific to ticket)

### Phase 5: Methodology Comment

**Before:** Generic comment  
**After:** Comment summarizes "I analyzed [#] ticket comments and extracted..."

### Phase 6: Implementation

**Before:** Generic guidance  
**After:** Implementation follows specific comment guidance

### Phase 9: PR

**Before:** Generic PR description  
**After:** PR cites specific comments + guidance used

---

## 🎓 Example Workflow: JNF-2

### You Say:

```
Load the JIRA User Story Actioning System from
Documentation/JIRA-USER-STORY-SYSTEM-PROMPT.md

I want to action user story JNF-2
```

### Copilot Does (Phase 1):

```markdown
📌 PHASE 1: USER STORY PRESENTATION - JNF-2

Ticket: JNF-2
Title: Monorepo bootstrap - pnpm + Turborepo
Status: To Do

[Description shown]

Acceptance Criteria:
✅ pnpm-workspace.yaml created
✅ turbo.json created with basic tasks
✅ pnpm install and pnpm build succeed locally

📝 TICKET COMMENTS & IMPLEMENTATION NOTES:

Comment 1 (by James BusinessBot - Oct 19):

- Use pnpm workspaces, Turborepo
- Follow IMPLEMENTATION-INDEX.md patterns
- CI should run lint + type-check

Comment 2 (by James BusinessBot - Oct 19):

- 16-section monorepo guide including:
  - Toolchain consistency (pnpm, Node versions)
  - Workspace layout (apps/_, packages/_)
  - pnpm specifics (hoisting, peer deps, workspace protocol)
  - Turborepo pipeline design
  - TypeScript architecture
  - Bundling & interop
  - [etc. - full comment shown]

✅ Do you want to proceed? (YES/NO)
```

### You Say: YES

### Copilot Does (Phase 2-4):

- Creates branch: `feature/JNF-2-monorepo-bootstrap-pnpm-turborepo`
- Analyzes story using comment guidance (16 sections)
- Creates playbook with 16 implementation steps (from comments)

### Copilot Does (Phase 5):

Posts to JIRA:

```markdown
**[Implementation Methodology Posted]**

Status: IN DEVELOPMENT (Phase 5 of 11)

✅ All ticket comments reviewed
✅ Key constraints from comments:

- Workspace layout: apps/_, packages/_, tooling/\*
- pnpm hoisting + workspace protocol
- Turborepo pipeline with caching
- [etc. - extracted from comments]

✅ 16 implementation areas identified from comment guidance

## Implementation Playbook (from comment guidance)

1. Toolchain consistency setup
2. Workspace layout creation
3. pnpm-workspace.yaml creation
4. [etc. - all 16 areas]

Ready for Phase 6 implementation.
```

### You Execute (Phase 6):

Follow playbook, implement monorepo per comment guidance

### Copilot Does (Phase 7):

- Run tests for 3 acceptance criteria
- All pass ✅

### You Approve (Phase 8):

Say: YES

### You Create PR (Phase 9):

Push branch, create PR with description referencing comments

### Copilot Does (Phase 10):

Posts to JIRA:

```markdown
**[PR Created - Awaiting Review]**

GitHub PR: #123
Branch: feature/JNF-2-monorepo-bootstrap-pnpm-turborepo

Implementation followed 16-area guidance from ticket comments:

- ✅ Toolchain consistency
- ✅ Workspace layout per comment guidance
- ✅ pnpm-workspace.yaml created
- ✅ turbo.json with tasks
- ✅ All 16 areas implemented

All acceptance criteria met ✅
Ready for code review.
```

Status changed to: **In Review**

### You Merge (Phase 9 → 11):

Merge PR on GitHub

### Copilot Does (Phase 11):

Posts to JIRA:

```markdown
**[Implementation Complete - PR Merged]**

PR #123 successfully merged.

✅ All 16 implementation areas completed
✅ All acceptance criteria verified
✅ Comment guidance fully implemented
✅ Code reviewed and approved

Story complete.
```

Status changed to: **Done** 🎉

---

## 🚨 Troubleshooting

### Q: Comments not showing in Phase 1?

**A:** Verify MCP connection active. System fetches all comments automatically.

### Q: How do I know which comments to follow?

**A:** All comments are shown in Phase 1. Use them all as guidance for implementation.

### Q: What if comment guidance conflicts with acceptance criteria?

**A:** Acceptance criteria are the source of truth. If conflict, flag in Phase 8 approval.

### Q: Can I skip comment parsing?

**A:** No - it's built into Phase 3 analysis. Comments inform entire workflow.

### Q: What if there are 10+ comments?

**A:** All are shown in Phase 1 and summarized in Phase 3. System handles it.

---

## 📍 System Files

| File                                       | Purpose                                         |
| ------------------------------------------ | ----------------------------------------------- |
| `JIRA-USER-STORY-SYSTEM-PROMPT.md`         | **Main system prompt** (load this into Copilot) |
| `JNF-2-PHASE-1-PRESENTATION.md`            | Example Phase 1 output with real comments       |
| `JIRA-SYSTEM-QUICK-START-WITH-COMMENTS.md` | This file                                       |

---

## 🎯 Next Step

1. Open: `Documentation/JIRA-USER-STORY-SYSTEM-PROMPT.md`
2. Copy the entire content
3. Paste into GitHub Copilot
4. Say: "I want to action user story JNF-2"
5. Follow the workflow!

---

**System Status:** 🟢 READY TO USE  
**Comments Integrated:** ✅ YES  
**MCP Active:** ✅ YES  
**Version:** 2.0
