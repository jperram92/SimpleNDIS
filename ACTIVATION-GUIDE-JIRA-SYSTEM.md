# 🎯 JIRA User Story Actioning System - Activation Guide

## Welcome! 👋

This guide will help you activate and use the JIRA User Story Actioning System to efficiently implement user stories from your backlog.

---

## 📚 Documentation Files

Three key documents have been created:

### 1. **JIRA-USER-STORY-SYSTEM-PROMPT.md** (MAIN)
The complete system prompt with all 11 phases, templates, and detailed instructions.
- **Best for:** Understanding the full workflow
- **Read time:** 30 minutes
- **Contains:** Templates, commands, decision trees

### 2. **QUICK-REFERENCE-JIRA-WORKFLOW.md** (REFERENCE)
Quick lookup guide with templates and commands.
- **Best for:** Quick lookups while working
- **Read time:** 10 minutes
- **Contains:** Phase summaries, templates, decision tree

### 3. **This File** (YOU ARE HERE)
Activation guide to get started right now.
- **Best for:** Getting started
- **Read time:** 5 minutes
- **Contains:** Setup instructions, first steps

---

## 🚀 Quick Start (5 Minutes)

### Step 1: Understand the Workflow

The system has **11 phases**:

1. ✅ **User Story Selection** - Pick and confirm story
2. ✅ **Branch Creation** - Create `feature/JNF-XX` branch
3. ✅ **Story Analysis** - Break down requirements
4. ✅ **Research & Documentation Review** - Gather context
5. ✅ **JIRA Update** - Log methodology
6. ✅ **Development** - Implement code
7. ✅ **Testing** - Unit + manual tests
8. ✅ **Approval Request** - Present to user
9. ✅ **Commit to GitHub** - Push and create PR
10. ✅ **Await Merge** - Wait for review
11. ✅ **Completion** - Close ticket

### Step 2: Pick a User Story

Go to your JIRA board and select a story. For example:
- **JNF-25**: "Participant registration endpoint & UI"
- **JNF-27**: "Plan creation API and UI with budget allocation"
- **JNF-31**: "Timesheet submission endpoint & UI"

### Step 3: Activate the System

Say this to GitHub Copilot:

```
"I want to action user story JNF-25: Participant registration endpoint & UI"
```

### Step 4: Confirm When Prompted

When the system asks:
```
✅ Do you want to proceed with actioning this user story?
```

Respond:
```
YES
```

### Step 5: Follow the Workflow

The system will guide you through all phases. At each phase:
- You'll see what's happening
- Templates will be provided
- You'll be asked for confirmation or input
- Progress will be tracked

---

## 🎯 What Happens in Each Phase

### Phase 1: User Story Selection (30 seconds)
- System presents the story
- You confirm YES/NO
- If NO: Pick a different story
- If YES: Continue to Phase 2

### Phase 2: Branch Creation (30 seconds)
- System creates: `git checkout -b feature/JNF-25`
- Your local branch is ready
- Continue to Phase 3

### Phase 3: Story Analysis (15 minutes)
- System breaks down the story
- Creates action list
- Identifies dependencies
- Lists potential risks
- You review and confirm understanding

### Phase 4: Research & Documentation (30 minutes)
- System reviews all documentation:
  - `COMPLETE-SUMMARY.md`
  - `IMPLEMENTATION-INDEX.md`
  - `ultimate-detailed-implementation.md`
  - `ultimate-implementation-part2.md`
- System provides context summary
- You can request additional research
- Continue when ready

### Phase 5: JIRA Update (5 minutes)
- System updates ticket with:
  - Methodology summary
  - Implementation plan
  - Documentation references
- You can review the update
- JIRA ticket now reflects work in progress

### Phase 6: Development (2-8 hours depending on story)
- System implements each task
- Creates/modifies files
- Commits frequently
- You can review each commit
- Can request changes anytime

### Phase 7: Testing (30 minutes)
- System runs all tests
- Performs manual verification
- Creates test report
- You can run tests yourself if desired
- All acceptance criteria verified

### Phase 8: Approval Request (depends on you)
- System presents complete summary
- Shows all files changed
- Shows all tests passing
- **AWAITS YOUR DECISION:**
  - ✅ APPROVE → Proceed to Phase 9
  - ❌ REQUEST CHANGES → Back to Phase 6
  - 🔍 REQUEST REVIEW → Back to Phase 4 for deeper research
  - 📋 PROVIDE FEEDBACK → Incorporate and repeat

### Phase 9: Commit to GitHub (5 minutes)
- System pushes branch: `git push origin feature/JNF-25`
- Creates Pull Request with full details
- Waits for CI/CD pipeline
- Checks all tests pass
- PR is ready for review

### Phase 10: Await Merge (2-24 hours)
- Team lead reviews PR
- May request changes or approve
- System updates JIRA
- Waits for merge to main branch

### Phase 11: Completion (5 minutes)
- Verifies merge to main
- Closes JIRA ticket
- Generates completion report
- Ready for next story!

---

## 🎮 How to Use the System

### Starting a Story

```
You: "I want to action user story JNF-25: Participant registration endpoint & UI"

System: [Presents story details]

System: ✅ Do you want to proceed with actioning this user story?

You: YES

System: [Creates branch and begins analysis]
```

### During Development

```
System: [Shows task being implemented]

System: 🛠️ EXECUTING TASK: Create participant registration endpoint

You: [Review the work]

You: Continue / Request changes

System: [Implements next task or adjusts current task]
```

### At Approval Request

```
System: [Presents complete summary]

System: ❓ APPROVAL QUESTION
Is this implementation satisfactory?

Options:
1. ✅ APPROVE
2. ❌ REQUEST CHANGES
3. 🔍 REQUEST REVIEW
4. 📋 PROVIDE FEEDBACK

You: ✅ APPROVE [or specify changes needed]

System: [Proceeds to next phase or implements requested changes]
```

### Decision Points (You Control These)

- **Phase 1**: Confirm which story to action
- **Phase 3**: Confirm you understand the breakdown
- **Phase 4**: Confirm research is sufficient
- **Phase 8**: **MAJOR DECISION** - Approve or request changes
- **Phase 10**: Final approval to merge to main

---

## 💡 Tips for Success

### 1. **Clear Acceptance Criteria**
Before starting, make sure the story has clear acceptance criteria. Stories without clear criteria may need to go back to Phase 4 for additional research.

### 2. **Review Each Phase**
Don't rush through phases. Take time to understand the breakdown and research.

### 3. **Provide Feedback Early**
If you notice something during development, say so immediately rather than waiting for Phase 8.

### 4. **Trust the Documentation**
The system will reference your existing documentation. Review those files when referenced.

### 5. **Use REQUEST REVIEW**
If you're unsure if the implementation is correct, use "REQUEST REVIEW" at Phase 8 to have the system do a deeper analysis.

### 6. **Commit History Matters**
The system creates small, focused commits. You'll be able to review the git history to understand what was changed and why.

---

## 🔧 Technical Requirements

### Prerequisites

You need:
- ✅ GitHub Copilot access in VS Code
- ✅ Git installed and configured
- ✅ Node.js and pnpm for the project
- ✅ JIRA account with API access (for MCP integration)
- ✅ PostgreSQL running locally (for database operations)

### Assumed Knowledge

- Basic Git commands (`git checkout`, `git push`, etc.)
- Understanding of JIRA tickets and stories
- Basic understanding of your codebase
- Familiarity with Node.js/TypeScript/Next.js (for code review)

### What You Don't Need to Know

- How the AI will implement each task
- Specific implementation details
- Which files will be modified (AI figures this out)
- Testing frameworks and test structure

---

## 📋 Example: First Story

Let's say you want to action **JNF-25: Participant registration endpoint & UI**

### Conversation Flow:

```
You: "I want to action user story JNF-25: Participant registration endpoint & UI"

System: [Shows full story details, acceptance criteria, epic, priority]

System: ✅ Do you want to proceed with actioning this user story?

You: YES

System: [Creates feature/JNF-25 branch]

System: 📊 USER STORY BREAKDOWN: JNF-25
[Shows analysis of what needs to be built]

You: [Reviews the breakdown]

You: Continue

System: 📚 DOCUMENTATION REVIEW: JNF-25
[Reviews all internal documentation]
[May do Google search if needed]

You: [Reviews findings]

You: Continue

System: [Updates JIRA with methodology]

System: 🛠️ EXECUTING TASK 1: Create Prisma model for Participant
[Implements the model]
[Commits to feature branch]

System: ✅ TASK 1 COMPLETE - Participant model created

System: 🛠️ EXECUTING TASK 2: Create API endpoint
[Implements POST /api/participants endpoint]
[Adds validation and error handling]
[Commits to feature branch]

System: ✅ TASK 2 COMPLETE - API endpoint created

System: 🛠️ EXECUTING TASK 3: Create registration form component
[Implements React component]
[Adds form validation]
[Commits to feature branch]

System: ✅ TASK 3 COMPLETE - Registration form created

System: [Runs all tests]

System: ✅ All tests passing (15/15 unit tests, 8/8 integration tests)

System: 🎯 DEVELOPMENT COMPLETE - AWAITING APPROVAL

Summary:
- Branch: feature/JNF-25
- Commits: 3 commits
- Files: 5 files modified/created
- Tests: All passing
- Quality: ESLint ✅, TypeScript ✅, Prettier ✅

❓ APPROVAL QUESTION
Is this implementation satisfactory?

Options:
1. ✅ APPROVE
2. ❌ REQUEST CHANGES
3. 🔍 REQUEST REVIEW
4. 📋 PROVIDE FEEDBACK

You: ✅ APPROVE

System: [Pushes to GitHub]
[Creates PR]
[Waits for CI/CD]

System: ✅ CI/CD pipeline passing
✅ All checks complete
✅ PR ready for team review

System: [Updates JIRA ticket]
Status: "Ready for Review"
Comment: "Pull Request created - awaiting team review"

System: ⏳ Awaiting main branch merge approval from team lead...

[After team approves and merges to main...]

System: ✅ COMPLETED - Merged to Production

Ticket Status: Closed
All acceptance criteria verified in production
Delivery Report generated

🚀 Ready for next story!
```

---

## 🎓 Learning Path

### First Time Using System?

1. **Read This File** (5 min) ← You are here
2. **Read QUICK-REFERENCE-JIRA-WORKFLOW.md** (10 min)
3. **Action your first story** (1-8 hours depending on story)
4. **After first story, reference JIRA-USER-STORY-SYSTEM-PROMPT.md** as needed

### Experienced Users?

Just go straight to:
```
"I want to action user story JNF-XX: [Story Title]"
```

And follow along with the system.

---

## ❓ Frequently Asked Questions

### Q: What if I don't approve in Phase 8?

**A:** You have options:
- **REQUEST CHANGES** - Tell the system what needs fixing, it loops back to Phase 6
- **REQUEST REVIEW** - Have the system review documentation more deeply
- **PROVIDE FEEDBACK** - Give feedback that the system incorporates

You can loop through as many times as needed until you're satisfied.

### Q: Can I stop in the middle?

**A:** Yes! At any point, you can say "Stop and wait" or "Save progress". The branch will be saved in git and you can resume later.

### Q: What happens if tests fail?

**A:** The system will go back to Phase 6 and fix the implementation until all tests pass. You'll see test failures and the fixes.

### Q: Can I look at the code before approval?

**A:** Absolutely! The system commits frequently to the branch. You can review commits at any time with:
```bash
git log --oneline
git show [commit-hash]
```

### Q: What if the story is more complex than expected?

**A:** Use **REQUEST REVIEW** in Phase 8. The system will:
- Do deeper research
- Review more documentation
- Provide additional analysis
- Help determine if changes are needed

### Q: How do I reject a story and start over?

**A:** In Phase 1, after seeing the story, just say "NO" and pick a different story. The branch won't be created and nothing is committed.

### Q: Can I action multiple stories at once?

**A:** Yes, but each story gets its own branch:
- Story 1: `feature/JNF-25`
- Story 2: `feature/JNF-27`
- Story 3: `feature/JNF-31`

You can switch between them with `git checkout`.

### Q: What if I find a bug after merge?

**A:** Create a new story for the bug fix. The system treats each story independently.

---

## 🚀 Ready to Start?

### To Action Your First Story:

1. ✅ Have a JIRA ticket ready (with acceptance criteria)
2. ✅ Make sure git is configured
3. ✅ Have your project open in VS Code
4. ✅ Open GitHub Copilot chat

### Then Say:

```
I want to action user story [JNF-XX]: [Story Title]
```

### Then Say:

```
YES
```

### Then Follow the System

The system will guide you through all 11 phases!

---

## 📚 Reference Documents

### Main System Prompt
- **File:** `JIRA-USER-STORY-SYSTEM-PROMPT.md`
- **Purpose:** Complete reference with all phases and templates
- **When to use:** Deep dive, understanding workflow, templates

### Quick Reference
- **File:** `QUICK-REFERENCE-JIRA-WORKFLOW.md`
- **Purpose:** Quick lookup during work
- **When to use:** Phase summaries, templates, decision trees

### Getting Started
- **File:** This file (`Activation-Guide.md`)
- **Purpose:** Onboarding and first steps
- **When to use:** First time setup, FAQ

### Project Documentation
- **File:** `Documentation/COMPLETE-SUMMARY.md`
- **Purpose:** Project context and status
- **When to use:** Understanding project scope

- **File:** `Documentation/IMPLEMENTATION-INDEX.md`
- **Purpose:** Technical reference and roadmap
- **When to use:** Understanding architecture

- **File:** `Documentation/ultimate-detailed-implementation.md`
- **Purpose:** Implementation patterns and examples
- **When to use:** Phase 4 research

- **File:** `Documentation/ultimate-implementation-part2.md`
- **Purpose:** Service and component examples
- **When to use:** Phase 4 research, Phase 6 development

---

## ✅ Checklist Before Starting

- [ ] Read this activation guide (5 min)
- [ ] Have a JIRA ticket selected (JNF-XX)
- [ ] Git is configured and project is open
- [ ] VS Code has GitHub Copilot enabled
- [ ] Node.js, pnpm, and PostgreSQL are installed
- [ ] Database is accessible
- [ ] You understand acceptance criteria are important

---

## 🎯 Success Criteria

After completing a user story with this system, you will have:

1. ✅ Fully implemented user story
2. ✅ All acceptance criteria met
3. ✅ All tests passing
4. ✅ Code reviewed and approved
5. ✅ Merged to main branch
6. ✅ JIRA ticket closed
7. ✅ Full audit trail in git commits
8. ✅ JIRA comments documenting the work

---

## 🆘 Need Help?

### If Something Seems Wrong:

1. At Phase 8, use **REQUEST REVIEW**
   - System will do deeper analysis
   - System will check documentation
   - System will provide additional context

2. Ask the system for clarification
   - "Explain this decision"
   - "Why did you choose this approach?"
   - "How does this relate to the documentation?"

3. Review the git history
   - `git log --oneline` - See all commits
   - `git show [commit]` - See specific changes
   - `git diff feature/JNF-25 main` - See all changes vs main

---

## 🚀 Let's Get Started!

You have everything you need. 

**Say this to GitHub Copilot:**

```
I want to action user story [JNF-XX]: [Story Title]
```

The system will handle the rest!

---

**Status:** Ready for Use ✅  
**Version:** 1.0  
**Last Updated:** October 19, 2025

Good luck! 🎉
