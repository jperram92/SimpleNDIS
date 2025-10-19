# Timesheets & Approvals - User Stories

Epic: JNF-14

Purpose: Implement timesheet submission, review and approval workflow, approval notifications, and linkage to claims.

Source:

- Documentation/ultimate-implementation-part2.md (TimesheetService)
- Documentation/IMPLEMENTATION-INDEX.md (Timesheets API)

Stories:

1. Backend: Timesheet model & Prisma migration

   Summary: Add a `Timesheet` model (if not present) and necessary DB fields to support drafts, submission, approval, rejection with reason, approver, timestamps, and audit logs. Add Prisma migration and seed data.

   Acceptance Criteria:
   - Prisma schema contains `Timesheet` model with fields: id, participantId, supportWorkerId, periodStart, periodEnd, hours, status (draft/submitted/approved/rejected), submittedAt, approvedAt, rejectedAt, approverId, rejectionReason, createdAt, updatedAt.
   - Migration file created and migrates successfully in CI.
   - Seed script adds sample draft and submitted timesheets.

2. Backend: Timesheet endpoints & state transitions

   Summary: Implement REST/GraphQL endpoints to create/update timesheets, submit timesheets, and change state (approve/reject) with validation.

   Acceptance Criteria:
   - POST /api/timesheets creates a draft timesheet.
   - PUT /api/timesheets/:id updates a draft only.
   - POST /api/timesheets/:id/submit transitions draft -> submitted and records `submittedAt`.
   - POST /api/timesheets/:id/approve transitions submitted -> approved, records `approvedAt` and `approverId`, and triggers claim draft creation.
   - POST /api/timesheets/:id/reject transitions submitted -> rejected, records `rejectedAt`, `rejectionReason`, and notifies the submitter.

3. Backend: Approval notifications & audit logging

   Summary: Implement notification sending (in-app + email placeholder) when timesheets are submitted, approved, or rejected, and write audit logs for each transition.

   Acceptance Criteria:
   - Notification created for approver when timesheet submitted.
   - Notification created for submitter on approval or rejection with reason.
   - AuditLog entries created for each state transition containing userId, action, timestamp, and payload.

4. Backend: Trigger claim draft on approval

   Summary: When a timesheet is approved, automatically create a Claim draft linked to the timesheet with calculated amounts.

   Acceptance Criteria:
   - Claim draft created with reference to timesheetId, participantId, providerId, amount, currency, and status=draft.
   - Claim draft appears in the Claims API list and can be edited by billing staff.

5. UI: Timesheet submission & approver dashboard

   Summary: Implement a page for support workers to create and submit timesheets, and an approver dashboard to list pending timesheets with approve/reject actions.

   Acceptance Criteria:
   - Support worker can create/edit draft, preview, and submit.
   - Approver sees pending list with participant, period, hours, and can approve or reject with reason.
   - UI shows success/failure notifications and updates status in real-time (optimistic UI acceptable).

6. Tests: Unit & integration tests for workflow

   Summary: Add unit tests for TimesheetService and integration tests covering submit -> approve -> claim creation flows.

   Acceptance Criteria:
   - Unit tests for validation and state transition guards.
   - Integration tests use seeded data and verify claim draft creation on approval.

7. Docs: `Documentation/timesheet-user-stories.md` (this file)

   Summary: This document summarizes user stories, APIs, payloads, and acceptance criteria for the Timesheets epic.

8. Ops: CI checks for migrations & seeds

   Summary: Ensure CI runs Prisma migrations and seeds and runs the integration tests for timesheets.

   Acceptance Criteria:
   - GitHub Actions config includes migration step and seeds for timesheet tests.

Runbook/Notes:

- Use TimesheetService.createTimesheet, submitTimesheet, approveTimesheet from docs as reference implementations.
- Approval should be idempotent and guarded: only submitted timesheets may be approved/rejected.

-- End of file
