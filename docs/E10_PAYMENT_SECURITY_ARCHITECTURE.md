# E10 — Payment Security Architecture

**Status:** Complete at architecture, control-catalogue and verification-design scope; implementation and independent verification pending  
**Date:** 2026-11-05  
**Decision:** E-0011  
**Authority:** D12 payment domain; D13 outbox/inbox and delivery semantics; E1 threat model; E3 application security; E4 identity; E5 authorization; E6 database; E7 API; E11 privacy  
**Scope boundary:** Provider-neutral design. No gateway, merchant account, payment endpoint, migration, credential, transaction, PCI assessment or runtime control is implemented or approved.

## 1. Purpose and ownership

E10 hardens D12's payment architecture without changing the platform's free-first launch decision. D12 owns product/pricing/order/payment/subscription/refund/entitlement domain contracts and lifecycle ownership; E10 defines security invariants and verification. E7 owns API boundary controls, E6 persistence integrity, E5 permissions, E4 identity, E11 privacy, and D13 durable asynchronous delivery. Payment facts never become authority merely because they arrive from a browser, AI task, administrator UI or unverified callback.

## 2. Non-negotiable invariants

1. Use provider-hosted checkout or provider-controlled secure payment components. Platform systems must not receive or store PAN, CVV, PIN, OTP or raw payment credentials; never place them in logs, traces, analytics, support tickets, fixtures or crash reports.
2. The platform never stores or processes card authentication secrets. Tokenization/provider references do not make the platform PCI-compliant; determine actual PCI DSS scope with the acquirer/provider and a qualified assessor before accepting live payments.
3. Server-side catalogue and pricing are authoritative. Recompute availability, price version, currency, tax/discount eligibility and totals; ignore client-supplied amount, currency, plan, discount, tax, entitlement or payment status.
4. Bind every checkout to an authenticated principal, immutable order snapshot, merchant account, environment, provider and idempotency key. Never trust a redirect, query parameter, screenshot or client success callback as proof of payment.
5. Only verified provider evidence—signature-verified webhook and/or authenticated provider status lookup—may advance financial state. Validate provider account, environment, transaction reference, order correlation, amount, currency and permitted state transition.
6. Persist verified webhook receipt durably before acknowledging it. Verify exact raw request bytes with provider-defined signature rules, timestamp/replay window and active key; reject malformed, stale, wrong-account, wrong-environment and invalid signatures.
7. Treat callbacks as at-least-once, possibly delayed, duplicated or out of order. Use durable inbox uniqueness, event identity, bounded replay protection, aggregate version/sequence checks and idempotent consumers. Never regress a terminal/advanced state due to stale events.
8. Unknown/pending outcomes remain unknown/pending until authoritative reconciliation. Do not automatically create a second charge because a client timed out or a provider response was ambiguous.
9. Separate order, payment attempt, captured payment, refund, dispute/chargeback, subscription and entitlement state machines. Entitlement is derived by its owning policy from verified canonical facts; payment module does not directly write learner access tables.
10. Keep append-only financial evidence. Corrections use compensating records with actor, reason, reference and approval; never silently overwrite provider evidence or reconciliation history.
11. All payment mutations are authorized server-side. Learners cannot view another learner's orders; support cannot set payment success or self-approve refunds; AI cannot initiate charges/refunds or grant/revoke paid access.
12. Fail closed on signature, identity, permission, order, currency, amount, merchant, environment or state uncertainty. Preserve evidence and route to reconciliation/manual review rather than inventing success.

## 3. Trust boundaries and data flow

**Client → API:** untrusted client intent; E4 principal and E5 permissions; E7 strict schemas, CSRF/session protections where applicable, quotas and idempotency.  
**API → Pricing/Order:** server resolves published price and creates immutable order snapshot in an E6 transaction.  
**Payment Adapter → Provider:** server-only outbound credentials, fixed provider origin/allowlist, TLS validation, bounded timeouts, no secrets in URLs, environment-specific accounts and idempotent provider requests.  
**Provider → Webhook ingress:** isolated route; bounded body; raw-byte signature verification before parsing/processing; merchant/environment/order/amount/currency correlation; durable inbox receipt.  
**Payment → Entitlement:** verified domain event via D13 outbox; entitlement owner re-evaluates effective access and records source evidence.  
**Provider reports → Reconciliation:** restricted service identity, read-only import where possible, compare-only by default; variances create review cases, not silent state mutation.  
**Admin/support → Payment operations:** E5 scoped permission, recent authentication/step-up for high-risk actions, dual control for configured thresholds, reason and immutable audit.  
**Telemetry/storage:** E6 least privilege and integrity; E11 minimization, retention and deletion rules. No card data or raw provider secrets.

## 4. Price, order and checkout integrity

- Use integer minor units and explicit ISO currency; prohibit binary floating-point for money.
- Price/plan records are versioned and effective-dated. Orders snapshot item/plan version, price version, amount, currency, tax inputs, discount allocation, terms version and customer reference as applicable.
- Recalculate all totals on the server. Validate discount/coupon eligibility, usage limits, expiry, stacking and ownership atomically to prevent races and overspend.
- Checkout creation requires a valid unpaid order, authenticated owner, supported provider/method/currency and a unique idempotency scope bound to principal + operation + canonical request hash.
- Persist internal attempt and correlation identifiers before external calls where possible. Use D13 outbox/saga recovery for the external boundary; never hold a database transaction open across a provider network call.
- Provider response is evidence to reconcile, not an unrestricted state command. Validate hosted checkout URL against expected provider origin before returning it to the client.
- Return URLs are allowlisted, non-open-redirect destinations and convey only opaque correlation references. A return page queries server-owned order/payment status.

## 5. Webhook verification and event processing

1. Route is dedicated to one provider/account/environment configuration; body size/content type/encoding are bounded.
2. Preserve exact raw bytes for signature calculation; do not parse and reserialize before verification.
3. Verify provider-defined signature algorithm, key ID, timestamp and tolerance; use constant-time comparison where applicable. Rotate keys with controlled overlap and emergency revocation.
4. Verify expected merchant account, live/test environment, event type, provider transaction uniqueness and order correlation.
5. Compare amount and currency against immutable order/payment attempt snapshot; mismatch or unknown mapping is quarantined and alerted.
6. Store a durable inbox record with provider event ID, payload hash, received time, signature/key metadata, provider/account/environment, correlation ID and processing state. Encrypt/restrict raw payload; retain only what is necessary.
7. Enforce unique event identity and idempotent state transition. Handle duplicates, retries, late and out-of-order events. Acknowledgment means durable receipt only, not entitlement completion.
8. Publish resulting internal facts via transactional outbox; consumers are idempotent and cannot bypass owning module authority.
9. Re-fetch provider status through authenticated server-to-server API for ambiguous, inconsistent or high-risk events. Do not accept webhook fields as authorization instructions.

## 6. Financial state, refunds and disputes

- Define explicit transition tables for order, payment attempt, authorization/capture, refund, dispute and subscription; invalid transitions are rejected and audited.
- Partial/multiple refunds are bounded by captured amount minus completed refunds; currency and provider references must match. Duplicate refund requests are idempotent.
- Separate refund request, risk/eligibility review, approval and provider execution. E5 permissions and separation-of-duties apply; high-value/exception thresholds require approved dual control before production.
- A refund is not complete because an admin clicked a button or provider API accepted a request; wait for verified provider status/event and reconcile.
- Chargebacks/disputes have independent states, deadlines, evidence access and restricted workflow. Never erase original capture/refund records.
- Refund, reversal, dispute or chargeback triggers entitlement owner's policy reevaluation; preserve independent valid entitlement sources and avoid blanket account lockout.
- Subscription renewals/cancellations/grace/dunning are not enabled by this security design. If D12 later enables recurring billing, each renewal requires verified period/amount/currency evidence, mandate/consent governance, idempotency, retry limits, cancellation semantics and legal review.

## 7. Reconciliation, ledger and consistency

- Reconcile internal order/payment/refund/dispute records against provider transaction and settlement reports on an approved cadence; cadence/SLO remain undecided.
- Compare provider transaction IDs, merchant account, environment, order, amount, currency, status, fees/settlement and timestamps. Detect missing, duplicated, mismatched, delayed and orphaned records.
- Reconciliation is compare-and-report by default. Any correction is a separately authorized, evidence-backed compensating action with approval and audit.
- Keep financial event history append-only; use unique constraints, transaction boundaries, optimistic concurrency and idempotency to prevent double capture/refund/entitlement.
- D13 outbox/inbox supports at-least-once delivery; monitor lag, retries, quarantine and dead-letter state. Rebuild entitlement projections from canonical sources rather than editing payment evidence.
- Define accounting/settlement ledger ownership, reconciliation frequency, retention and RPO/RTO with finance/legal/operations before launch; no amounts, tax rates or accounting treatment are invented here.

## 8. API, identity and authorization

- Candidate D12 routes remain subject to D5/OpenAPI review and E7 route inventory; no endpoint is implemented by E10.
- E4 resolves the principal. Never trust client userId, role, plan, order owner, payment status or provider event identity.
- E5 permissions separately cover order read, checkout creation, refund request, refund approval, refund execution, dispute handling, reconciliation read/import/adjustment and financial export.
- Scope reads to owner/tenant and field allowlists. Admin exports require purpose, bounded range, masking and audit.
- Rate-limit checkout creation, coupon attempts, refund requests, status polling and webhook ingress. Use anti-automation/fraud signals without treating them as payment proof.
- Provider webhooks are server-to-server only; no browser session or CORS configuration authenticates a provider.

## 9. Secrets, environment and provider isolation

- Store API keys, webhook secrets, signing material and certificates only in an approved managed secret/KMS boundary; never source code, frontend bundles, mobile apps, URLs, logs or database business rows.
- Use separate provider accounts/keys/webhook endpoints for development, test, staging and live. Reject cross-environment event/credential use.
- Restrict outbound requests to fixed provider API hosts; validate TLS certificates/hostnames, disable unsafe redirects, set timeouts and prevent SSRF through provider-controlled URLs.
- Rotate keys with overlap, versioning, audit and rollback; revoke compromised credentials immediately and reconcile in-flight attempts.
- No provider, merchant, region, settlement account, payment method or key technology is selected by this document.

## 10. Privacy, audit and incident response

- Apply E11 data inventory, purpose limitation, minimization, notices, rights, retention and legal-hold rules to customer/payment metadata and provider payloads.
- Store only necessary provider references, masked display metadata and transaction evidence. Never store PAN/CVV/PIN/OTP or authentication secrets. Avoid full payloads in logs/traces.
- Record immutable audit events for price publication, order creation, checkout attempt, webhook verification/rejection, state transition, refund/dispute decisions, privileged reads/exports, reconciliation variance and manual adjustment.
- Correlate events across order, attempt, provider event, outbox/inbox, entitlement and audit without exposing sensitive identifiers to ordinary logs.
- Monitor signature failures, replay/duplicate rates, amount/currency mismatches, unknown merchant/environment, pending age, provider outage, refund spikes, chargebacks, outbox lag and reconciliation variance.
- Incident playbooks cover credential compromise, forged/replayed callbacks, duplicate charges, provider outage, data exposure, settlement variance and fraudulent admin action; preserve evidence, disable affected path, rotate/revoke secrets and reconcile before resuming.

## 11. Compliance and production gates

No PCI DSS compliance or certification is claimed. Before live payment acceptance, the actual merchant/provider integration must undergo documented PCI DSS scope determination with the acquiring bank/provider and qualified assessor as applicable, plus legal/tax/consumer/privacy review for the merchant entity, launch jurisdictions, payment methods, recurring mandates, invoices, refunds and disputes. Hosted checkout can reduce scope but does not automatically remove all obligations.

Production gate evidence must include provider/merchant due diligence; exact D5 schemas and D12 state machines; key custody/rotation; verified webhook test evidence; duplicate/out-of-order/replay handling; amount/currency/merchant/environment binding; idempotent refunds; entitlement ownership; reconciliation and incident exercises; privacy/retention; audit integrity; operational alerts; and E14 independent testing followed by E15 explicit approval. No live payments until approved.

## 12. Deferred decisions

Gateway/provider and merchant contract; legal entity/markets; payment methods/currencies/settlement; tax/GST/invoice treatment; paid plans/prices/discounts; recurring mandates and cancellation policy; refund/chargeback policy; fraud thresholds; provider webhook signature scheme and retry policy; KMS/secrets product; dual-control thresholds; reconciliation cadence; accounting ledger ownership; PCI scope; data retention/legal hold; incident SLOs and provider escalation.

## 13. Acceptance gates

1. D12 domain ownership and E4/E5/E6/E7/E11 boundaries are mapped without cross-module writes.
2. No card authentication data enters platform systems, logs or test fixtures.
3. Client cannot set amount, currency, owner, payment status or entitlement.
4. Checkout and webhook are bound to provider, merchant, environment, immutable order, amount and currency.
5. Raw-byte signature verification, timestamp/replay defense, key rotation and durable inbox are specified.
6. Duplicate, retry, out-of-order and ambiguous provider outcomes cannot duplicate or regress financial state.
7. Refund/dispute, reconciliation, append-only evidence and independent approval are specified.
8. Entitlement is derived only by its owner from verified payment facts.
9. Secrets, privacy, audit, telemetry and incident controls are specified.
10. PCI/legal/finance reviews and E14/E15 evidence are mandatory before live payments.

**Verification status:** Design only. The accompanying 60 controls and 55 verification scenarios are specifications, not deployed controls or executed tests. No gateway, merchant account, API, migration, credential, payment, PCI assessment or production integration has been implemented.