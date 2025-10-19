# Claims & Finance - User Stories

Epic: JNP-15

Purpose: Implement claim creation, GST calculation, immutable price snapshots for claims, submission/export to PACE/PRODA (mock), invoice generation from approved claims, and payment recording and tracking.

Source:

- Documentation/ultimate-implementation-part2.md (ClaimsService, InvoiceService)
- Documentation/IMPLEMENTATION-INDEX.md (Claims & Invoices API)

Research summary:

- Claims should be created from approved timesheets or manual billing entries. Each claim stores an immutable snapshot of item prices and quantities so historical claims remain auditable.
- Use Decimal (or monetary library) to store precise currency values; store subtotal, gst (10%), and total as Decimal fields.
- Claim lifecycle: DRAFT -> SUBMITTED -> APPROVED -> INVOICED -> PAID | REJECTED. Only DRAFT claims can be edited.
- Export: PACE/PRODA integration will be mocked; provide an export endpoint that returns a ZIP/JSON package matching expected PACE fields.
- Invoice generation: approved claims produce an Invoice record with invoiceNumber, dueDate, status, subtotal/gst/total. Invoice can be partially paid; track paidAmount and payment history.

Proposed Stories (9):

1. Claim creation & immutable price snapshot

   Summary: Create claim records from approved timesheets or manual claim creation UI. Capture item-level snapshots (unitPrice, quantity, total) at creation time.

   Acceptance Criteria:
   - Claim record persists claimItems with unitPrice, quantity, description and per-item total.
   - Subtotal, gst (10%), total fields calculated and stored as Decimal.
   - Claim stores timesheetId (optional) and is marked DRAFT by default.

2. Claim submission & approval workflow

   Summary: Implement endpoints to submit claims, review and approve/reject claims. Approval should move claim to APPROVED and make it eligible for invoicing.

   Acceptance Criteria:
   - POST /api/claims creates DRAFT claim; PUT edits DRAFT only.
   - POST /api/claims/:id/submit transitions DRAFT -> SUBMITTED.
   - POST /api/claims/:id/approve transitions SUBMITTED -> APPROVED and triggers invoice creation.
   - POST /api/claims/:id/reject transitions SUBMITTED -> REJECTED with rejectionReason.

3. GST calculation & currency precision

   Summary: Implement GST calculation (10%) and ensure accurate currency arithmetic using Decimal types.

   Acceptance Criteria:
   - GST calculated as subtotal \* 0.10 and stored alongside subtotal and total.
   - All financial fields use Decimal/precise storage; no floating point rounding errors in tests.

4. Claim export (PACE/PRODA mock)

   Summary: Provide an export endpoint to produce a mock PACE/PRODA package for submitted claims.

   Acceptance Criteria:
   - GET /api/claims/:id/export returns a JSON payload matching expected PACE schema and an option to download as ZIP.
   - Export includes claimItems, participant and provider details, invoice totals, and timestamps.

5. Invoice generation from approved claims

   Summary: When a claim is approved, auto-generate an Invoice with invoiceNumber, dueDate, totals, and status PENDING.

   Acceptance Criteria:
   - Invoice created with reference to claimId and providerId; invoiceNumber unique.
   - Invoice calculates dueDate (configurable, default 30 days).

6. Payment recording & reconciliation

   Summary: Implement endpoints to record payments against invoices and update invoice status to PAID when fully settled.

   Acceptance Criteria:
   - POST /api/invoices/:id/payments records a payment (method, amount, reference) and updates invoice paidAmount.
   - Invoice status transitions to PAID when paidAmount >= total.

7. Reporting & financial summary

   Summary: Provide endpoints to get financial summaries (period totals, outstanding invoices, paid invoices count).

   Acceptance Criteria:
   - GET /api/finance/summary?start=...&end=... returns totals for invoiced, paid, outstanding.

8. Tests & seeds for claims/finance flows

   Summary: Add seed data and integration tests covering claim creation from timesheet, submission, approval, invoice creation, and payment recording.

   Acceptance Criteria:
   - Seed script creates participants, providers, approved timesheets and claim drafts.
   - Integration tests validate GST, claim immutability, invoice creation and payment flows.

9. Docs: Claims & Finance API and runbook

   Summary: Add docs describing claim data shapes, API examples, export format, and runbook for reconciling payments.

   Acceptance Criteria:
   - Documentation file added to `Documentation/` with sample payloads and export spec.

Run instructions & notes:

- Use `Decimal` from Prisma/Database or `Decimal.js` for precise money arithmetic.
- Mocking external PACE/PRODA should be pluggable; create an `exports/mock/pace` module.

-- End of file
