# 🔗 JIRA MCP Integration Guide

## What Was Updated

The `JIRA-USER-STORY-SYSTEM-PROMPT.md` has been updated to include **full JIRA MCP integration** throughout all 11 phases of the workflow. This means the system now knows to use JIRA MCP automatically without you having to reference it manually.

---

## Key Updates to the System Prompt

### ✅ Phase 1: Automatic JIRA MCP Fetch

**What Changed:**
- Added Step 1.1: "Fetch Ticket via JIRA MCP"
- System now automatically calls `mcp_atlassian_getJiraIssue()` when you say "I want to action JNF-2"
- Fetches real ticket data from your JIRA instance
- Displays actual acceptance criteria, priority, epic, description

**Before:**
```
You said: "I want to action user story JNF-2"
System: "What story details should I use?"
```

**After:**
```
You say: "I want to action user story JNF-2"
System: Calls JIRA MCP → Fetches JNF-2 from JIRA
System: Displays real ticket with actual acceptance criteria
```

---

### ✅ Phase 5: JIRA MCP Update (Before Development)

**What Changed:**
- Added explicit JIRA MCP integration
- System automatically calls:
  - `mcp_atlassian_addCommentToJiraIssue()` - Posts methodology comment
  - `mcp_atlassian_transitionJiraIssue()` - Changes status to "In Development"
  - `mcp_atlassian_editJiraIssue()` - Links related issues (optional)

**What Gets Posted to JIRA Automatically:**
```
🚀 Development Started: [Date & Time]
👤 Developer: [Team Member]
🌿 Branch: feature/JNF-2

## METHODOLOGY
- Analysis: ✅ COMPLETE
- Development: [IN PROGRESS]
- Action List: [Task breakdown]
- Research Findings: [Key learnings]
```

---

### ✅ Phase 10: JIRA MCP PR Status Update

**What Changed:**
- Added explicit JIRA MCP integration
- System automatically calls:
  - `mcp_atlassian_addCommentToJiraIssue()` - Posts PR details and testing results
  - `mcp_atlassian_transitionJiraIssue()` - Changes status to "In Review"

**What Gets Posted to JIRA Automatically:**
```
✅ Development Complete - Pull Request Created

**Pull Request:** [GitHub URL]
**Branch:** feature/JNF-2
**Status:** Ready for Review

✅ All acceptance criteria met
✅ Unit Tests: [X/X] passing
✅ Integration Tests: [X/X] passing
✅ Manual Verification: Complete
```

---

### ✅ Phase 11: JIRA MCP Ticket Closure

**What Changed:**
- Added explicit JIRA MCP integration
- System automatically calls:
  - `mcp_atlassian_addCommentToJiraIssue()` - Posts completion summary
  - `mcp_atlassian_transitionJiraIssue()` - Changes status to "Done"
  - `mcp_atlassian_editJiraIssue()` - Sets resolution to "Fixed"

**What Gets Posted to JIRA Automatically:**
```
🎉 User Story Successfully Completed & Merged to Production

✅ Merged to main branch: [Commit Hash]
✅ All tests passing in production
✅ Code deployed and live

## Acceptance Criteria - All Verified
✅ Criterion 1: Verified in Production
✅ Criterion 2: Verified in Production
✅ Criterion 3: Verified in Production

[Metrics, timeline, GitHub reference]
```

---

## 🔄 Complete Workflow with MCP

```
YOU SAY:
"I want to action user story JNF-2"
│
▼
SYSTEM AUTOMATICALLY:
├─ Phase 1: Calls JIRA MCP to fetch JNF-2 data ✅
├─ Phase 2-4: Local analysis work
├─ Phase 5: Calls JIRA MCP to add comment + update status ✅
├─ Phase 6-8: Development & testing
├─ Phase 9: Push to GitHub
├─ Phase 10: Calls JIRA MCP to add PR comment + update status ✅
├─ Phase 11: Calls JIRA MCP to add completion comment + close ✅
│
▼
JIRA TICKET JNF-2:
├─ Status: Done ✅
├─ Resolution: Fixed ✅
├─ 3 Comments with progress updates ✅
└─ Full audit trail of work ✅
```

---

## 📊 MCP Calls Per Phase

### Phase 1: Get Ticket Data
```javascript
mcp_atlassian_getJiraIssue(
  cloudId: "your-cloud-id",
  issueIdOrKey: "JNF-2"
)
// Returns: Real ticket data from JIRA
```

### Phase 5: Add Development Comment & Update Status
```javascript
mcp_atlassian_addCommentToJiraIssue(
  cloudId: "your-cloud-id",
  issueIdOrKey: "JNF-2",
  commentBody: "🚀 Development Started..."
)

mcp_atlassian_transitionJiraIssue(
  cloudId: "your-cloud-id",
  issueIdOrKey: "JNF-2",
  transition: {id: "11"}  // "In Development"
)
```

### Phase 10: Add PR Comment & Update Status
```javascript
mcp_atlassian_addCommentToJiraIssue(
  cloudId: "your-cloud-id",
  issueIdOrKey: "JNF-2",
  commentBody: "✅ Development Complete - PR Created..."
)

mcp_atlassian_transitionJiraIssue(
  cloudId: "your-cloud-id",
  issueIdOrKey: "JNF-2",
  transition: {id: "21"}  // "In Review"
)
```

### Phase 11: Add Completion Comment & Close
```javascript
mcp_atlassian_addCommentToJiraIssue(
  cloudId: "your-cloud-id",
  issueIdOrKey: "JNF-2",
  commentBody: "🎉 User Story Completed..."
)

mcp_atlassian_transitionJiraIssue(
  cloudId: "your-cloud-id",
  issueIdOrKey: "JNF-2",
  transition: {id: "31"}  // "Done"
)

mcp_atlassian_editJiraIssue(
  cloudId: "your-cloud-id",
  issueIdOrKey: "JNF-2",
  fields: {resolution: {name: "Fixed"}}
)
```

---

## 🎯 How to Use Updated System

### Setup (One Time)
1. Get your JIRA Cloud ID (e.g., from URL: `https://yoursite.atlassian.net/`)
2. Ensure you have JIRA API access
3. Load the updated `JIRA-USER-STORY-SYSTEM-PROMPT.md` into GitHub Copilot

### Per Ticket
1. Say: "I want to action user story JNF-2"
2. System fetches real ticket via MCP
3. You confirm: YES
4. System runs all 11 phases with automatic MCP updates
5. JIRA ticket automatically updated at each phase
6. Ticket closed when complete

---

## ✅ What You Get Now

### Automatic JIRA Updates at 4 Key Points:

**Phase 1:** ✅ Fetches real ticket data
- No manual copy-paste needed
- Real acceptance criteria displayed
- Actual priority and epic shown

**Phase 5:** ✅ Posts methodology comment
- Documents analysis complete
- Shows action list
- Posts research findings
- Status updated to "In Development"

**Phase 10:** ✅ Posts PR details
- Shares PR link in JIRA
- Shows test results
- Status updated to "In Review"

**Phase 11:** ✅ Posts completion & closes ticket
- Final summary posted
- Metrics included
- Status updated to "Done"
- Resolution set to "Fixed"

---

## 🔐 Requirements for MCP to Work

✅ Valid JIRA Cloud ID  
✅ JIRA API access configured  
✅ Project key correct (JNF for SimpleNDIS)  
✅ User has permission to update tickets  
✅ Atlassian MCP tools activated  

---

## 🚀 You're Ready to Use MCP!

Now when you activate the workflow:

```
I want to action user story JNF-2
```

The system will:
1. Automatically fetch JNF-2 from JIRA ✅
2. Present real ticket data ✅
3. Update JIRA throughout the workflow ✅
4. Post progress comments ✅
5. Close the ticket when done ✅

**No manual JIRA updates needed!** 🎉

---

## 📝 Next Steps

1. Load updated `JIRA-USER-STORY-SYSTEM-PROMPT.md` into GitHub Copilot
2. Test with a real ticket: "I want to action user story JNF-2"
3. Watch as JIRA MCP automatically fetches and updates your ticket
4. All updates will appear in JIRA with full audit trail

---

**Status:** ✅ JIRA MCP Integration Complete  
**Version:** 2.0 (Updated with MCP)  
**Last Updated:** October 19, 2025

