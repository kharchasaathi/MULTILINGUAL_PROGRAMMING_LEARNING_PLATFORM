# D12 — Payment Architecture

**Status:** Complete at provider-neutral logical architecture and contract specification scope  
**Date:** 2026-11-05  
**Depends on:** D1–D6, D10–D11; product model A5  
**Baseline:** NestJS modular monolith, PostgreSQL/Prisma ORM 7, REST/JSON /api/v1, Next.js web/PWA and Expo native clients  
**Decision:** D-0010  
**Scope:** No payment gateway, merchant account, price, tax configuration, payment endpoint, database migration or live transaction is selected or implemented.

## 1. Purpose and governing principles

D12 defines a safe, auditable payment boundary for future paid plans, subscriptions and one-time purchases while preserving the approved initial-free model. Payment collection, payment state, subscription lifecycle and learner entitlements are separate concerns.

1. **Free-first launch:** the platform remains initially free. No paid plan, price, billing period, trial, discount or launch date is invented here.
2. **Provider-neutral boundary:** NestJS depends on an internal Payment Provider Adapter. A gateway is selected only after business, legal, security, settlement, refund and recurring mandate due diligence.
3. **No card-data custody:** use provider-hosted checkout or provider-controlled secure components. Platform systems must not receive/store PAN, CVV, PIN, OTP or raw payment credentials. Never log them.
4. **Server-authoritative state:** client redirect/success screens are informational only. A verified provider event and/or authenticated provider status query determines financial state.
5. **Payment is not entitlement:** payment, order, subscription and entitlement are distinct state machines. Access is granted only after authoritative entitlement policy evaluation.
6. **Idempotent money movement:** checkout, webhook processing, refunds and reconciliation must be safe under retries and duplicate/out-of-order events.
7. **Append-only financial history:** do not overwrite payment/refund/settlement evidence. Corrections are compensating records with audit.
8. **Least privilege:** no support agent, content author, AI process or learner client can alter payment state or grant paid access.
9. **No false certainty:** pending/unknown transactions remain pending until verified. Never report success solely from a browser return URL.
10. **Compliance before launch:** legal, tax, consumer, privacy, gateway, payment-network and recurring-payment obligations require specialist review for the actual merchant entity and target markets.

## 2. Goals and non-goals

Goals: define product/plan/price versioning; order and hosted checkout; one-time payments and optional future subscriptions; webhook verification; reconciliation and refunds; entitlement consistency; financial audit, privacy-safe reporting and future test criteria.

Non-goals: choosing a gateway (Razorpay, Cashfree, PayU, Stripe or other); selecting merchant entity, bank account, currency, geography or payment methods; defining paid tiers, prices, GST rates, coupons, trials, renewal cadence or cancellation policy; building UI/controllers/SDK adapters/migrations; providing legal/tax advice or asserting compliance.

## 3. Domain boundaries and ownership

| Domain | Owns | Must not own |
|---|---|---|
| Product Catalogue | Plan/feature definitions, public availability and immutable versions | Provider transaction truth |
| Pricing | Currency, amount, tax treatment and effective-dated price versions | Payment confirmation |
| Order | Purchase intent, immutable item/price snapshot and order lifecycle | Entitlement grant |
| Payment | Provider transaction references, attempts, verified status and financial evidence | Course progress |
| Subscription | Provider-neutral lifecycle and billing-period evidence | Product definition |
| Refund | Request, approval, provider execution and refund evidence | Direct access revocation policy |
| Entitlement | Effective learner access derived from order/subscription/admin policy | Raw payment credentials |
| Payment Adapter | Provider API translation, signature verification and status lookup | Product/business policy |
| Reconciliation | Compare internal records with provider reports | Silent data repair |
| Audit | Immutable privileged/financial action history | Payment state authority |

D12 does not replace D6 identity, D10 progress, D11 admin or D5 HTTP conventions. D11 surfaces operations through scoped permissions; payment services own mutations.

## 4. Product, plan and pricing model

A plan has stable ID, display name, feature/entitlement policy reference, status and immutable version. A price is separate and versioned: plan version, ISO currency, integer amount in minor units, tax treatment, effective interval, market/eligibility scope and publication status. Store money as integer minor units plus currency; never use binary floating-point.

The order snapshots exact plan, price, currency, tax inputs, discount allocation and accepted terms version. Later catalogue changes cannot mutate an existing order. Plan features map to explicit entitlement keys and limits; UI labels do not grant access. Free access is represented by a product/entitlement policy, not a zero-value fake gateway transaction. Discounts, coupons, trials, add-ons, proration and team plans are deferred. Price changes create new effective-dated versions. Tax is calculated by a versioned approved policy/service; no GST rate is hardcoded or inferred without finance/legal approval.

## 5. Checkout and payment flow

1. Authenticated learner requests an available plan/price version.
2. Order service validates principal, market, eligibility, price, currency, terms and current entitlement.
3. Create order and payment attempt atomically with unique order reference and idempotency key.
4. Adapter creates provider checkout using server-held credentials and allowlisted return URL.
5. Return only opaque provider checkout URL/session reference; never expose secret keys.
6. Learner enters payment credentials only on provider-controlled surfaces.
7. Browser/native return route displays neutral pending state and fetches authenticated order status.
8. Provider webhook arrives independently; verify signature against raw bytes, timestamp/replay window and endpoint secret. Persist receipt durably before acknowledgment.
9. Process idempotently; validate merchant/account/currency/amount/order. Query provider status if ambiguous or high risk.
10. On verified success, transition payment/order and emit entitlement evaluation via transactional outbox.
11. On failure/cancel/expiry, retain history and offer safe retry/support.

No client flag, redirect parameter, amount, user ID or plan ID can mark an order paid.

## 6. State machines

### Order
DRAFT → PENDING_PAYMENT → PAID | PAYMENT_FAILED | CANCELLED | EXPIRED.
PAID requires verified success and exact amount/currency/order match. Failed orders may permit a new attempt under policy; prior attempts remain immutable. A captured payment is not erased by cancellation; refund is separate. A paid order is never changed back to unpaid.

### Payment attempt
CREATED → CHECKOUT_CREATED → PENDING_PROVIDER → SUCCEEDED | FAILED | CANCELLED | EXPIRED | UNKNOWN.
UNKNOWN means timeout/ambiguous outcome. Query provider and reconcile before retry to avoid duplicate charges. Duplicate/out-of-order events cannot regress terminal success. Refund does not rewrite payment success.

### Refund
REQUESTED → UNDER_REVIEW → APPROVED → SUBMITTED_TO_PROVIDER → PENDING_PROVIDER → SUCCEEDED | FAILED | REJECTED.
Refund cannot exceed refundable captured amount less prior successful/pending refunds. Partial/multiple refunds require cumulative checks. Approval limits/reasons/dual control are open policy. Success requires provider evidence.

### Optional subscription
INCOMPLETE → ACTIVE → PAST_DUE → PAUSED | CANCEL_AT_PERIOD_END → CANCELLED | EXPIRED.
Billing periods, renewal attempts, grace, dunning, mandate, proration and cancellation timing require product/legal approval. Do not enable recurring billing before provider, mandate, consent, notification and regulatory review. Each renewal has its own verified evidence.

## 7. Provider adapter and webhook contract

Provider-neutral operations: create hosted checkout; verify raw webhook; normalize verified event; fetch payment status; request/fetch refund; fetch settlement/transaction report; cancel or schedule subscription cancellation only if approved.

Webhook requirements:
- Verify provider-specific cryptographic signature over raw request bytes before trusting payload.
- Enforce timestamp/replay controls where supported; rotate secrets safely.
- Validate merchant account, environment, order reference, provider transaction ID, currency, gross amount and event type.
- Deduplicate by provider + merchant account + event ID. If no stable event ID, define a canonical dedupe key.
- Persist verified receipt before asynchronous processing and acknowledge only after durable receipt.
- Use transactional inbox/outbox; retries are bounded, observable and idempotent.
- Signature proves origin/integrity, not business correctness; payload remains subject to validation.
- For ambiguous/out-of-order events, query provider and reconcile.
- Never expose raw webhook payloads or credentials to clients; redact logs.

## 8. Entitlement integration

Entitlement is a separate policy projection, not a checkout field. A grant references principal, entitlement key, source order/subscription/admin grant, policy version, start/end and status. Free access comes from free product policy; paid access comes only from verified paid order or active subscription period.

Refund, chargeback, cancellation, expiry and admin suspension trigger policy reevaluation. Revocation timing and grace rules must be approved/versioned. Multiple sources may grant the same entitlement; removing one source must not revoke another valid source. Entitlement updates are idempotent/audited and clients receive server-derived access. D10 progress/mastery is never reset by payment events. Manual grants are exceptional, scoped, time-limited and audited under D6/D11.

## 9. Refunds, disputes and chargebacks

Requests are authenticated, order-linked and idempotent. Eligibility follows approved product terms, capture state, service-consumption policy and applicable law; this document defines no refund window. High-value exceptions may require independent approval. Provider refund reference/status are retained. Partial refunds preserve remaining refundable balance. Disputes/chargebacks are separate restricted cases with deadlines. Chargeback triggers entitlement reevaluation, never deletion of payment history. Reconcile gross capture, provider fees, refunds, chargebacks, net settlement and bank payout separately.

## 10. Data and financial integrity

Logical entities are in D12_PAYMENT_DATA_CONTRACT_MATRIX.csv. Requirements: UUID IDs; unique order reference; provider transaction uniqueness within provider + merchant account; integer minor units and ISO currency; immutable price/order/terms snapshots; append-only payment, webhook, refund, dispute and reconciliation evidence; unique idempotency scope; unique webhook dedupe key; database constraints against duplicate successful capture mapping; transactional outbox to entitlement. Financial access is module-owned/scoped/audited. PAN/CVV/OTP/PIN are prohibited. Retention, deletion, encryption/key management and backup require D4/E approval.

## 11. Security, privacy and compliance gates

Before launch require:
- Merchant entity, jurisdiction, supported countries/currencies and settlement due diligence.
- Gateway contract/security review, supported payment-method verification and support escalation.
- PCI DSS scope assessment with qualified specialist; hosted checkout reduces exposure but does not automatically eliminate merchant obligations.
- Applicable RBI/payment aggregator and recurring e-mandate requirements reviewed for selected India flows/provider; do not assume all instruments/mandates share identical rules.
- Consumer terms, pricing display, cancellation/refund policy, renewal consent, receipts/invoices, grievance channel and tax treatment reviewed by legal/finance.
- Data minimization, privacy notice, purpose, retention, access/export/erasure and breach response reviewed.
- Secret manager/KMS, rotation, least privilege, environment separation and webhook isolation.
- Fraud/risk controls, velocity limits, rate limits, bot/abuse protection and manual review.
- Monitoring for webhook lag, unknown payments, mismatches, refund failures, chargebacks, settlement variance and outages.
- Incident playbook, reconciliation cadence, backup/restore and rollback rehearsal.
- Never store/log PAN, CVV, PIN, OTP, full bank credentials or authentication secrets. Never request these in support.

## 12. Admin and operational controls

D11 may show scoped order/payment/refund/subscription/dispute/reconciliation summaries. Support sees minimum necessary masked references. Refund request, review, approval and provider submission are separate actions. No admin alters provider event, payment success or settlement evidence. Reconciliation correction is a compensating adjustment with evidence. Exports require permission, purpose, bounds, masking and audit. AI cannot initiate charges/refunds or change entitlements.

## 13. API contract candidates (D5 reconciliation required)

GET /api/v1/billing/plans  
GET /api/v1/billing/plans/{planId}/prices  
POST /api/v1/orders  
GET /api/v1/orders/{orderId}  
POST /api/v1/orders/{orderId}/checkout  
GET /api/v1/me/entitlements  
POST /api/v1/refund-requests  
GET /api/v1/refund-requests/{refundRequestId}  
Restricted admin: order/refund/dispute/reconciliation reads and approved commands. Provider webhooks are isolated server-to-server ingress, not learner-authenticated routes.

Learner identity comes from D6; amount/currency/price version/availability are revalidated server-side. Writes use idempotency and expected-version where relevant. No client route sets payment or entitlement state.

## 14. Acceptance and future test plan

Architecture acceptance: plan/price versioning, order/payment/subscription/refund states, adapter, webhook verification, entitlement boundaries, data integrity, security/compliance, admin operations, API candidates and open decisions documented.

Future tests (not executed):
1 client success redirect cannot mark paid; 2 server price snapshot overrides client amount; 3 checkout retry idempotent; 4 duplicate webhook processed once; 5 invalid signature rejected; 6 replay rejected/deduplicated; 7 raw bytes used for signature; 8 wrong merchant/environment rejected; 9 amount/currency/order mismatch quarantined; 10 out-of-order event cannot regress success; 11 unknown outcome reconciled before retry; 12 durable receipt before acknowledgment; 13 worker retry cannot duplicate entitlement; 14 payment without valid order grants nothing; 15 entitlement only after verified payment; 16 revoking one source preserves another valid source; 17 refund cannot exceed captured balance; 18 duplicate refund idempotent; 19 refund success needs provider confirmation; 20 refund/chargeback triggers policy reevaluation; 21 renewal needs verified period evidence; 22 cancellation follows approved policy; 23 free plan creates no fake transaction; 24 price update cannot mutate old order; 25 money uses integer minor units; 26 provider transaction IDs unique by merchant; 27 PAN/CVV/OTP/PIN never stored/logged; 28 secrets absent from clients; 29 learner cannot view another learner order; 30 support cannot self-approve refund; 31 admin cannot set payment succeeded; 32 exports masked/audited; 33 provider outage leaves pending/unknown; 34 reconciliation detects missing event/mismatch/variance; 35 terms/tax snapshot bound to order; 36 chargeback separately audited; 37 rate/fraud controls limit abuse; 38 all changes audited/correlated; 39 entitlement API is server-derived; 40 PWA/native resume handles pending safely.

## 15. Deferred decisions and handoff

Open: gateway and merchant contract; legal entity/markets; methods/currencies/settlement; paid plan catalogue/pricing; GST/tax/invoices; trial/discount/refund/cancellation rules; recurring billing/mandates; provider fees/reconciliation cadence; fraud thresholds; PCI scope; retention/legal hold; refund dual-control; grace/dunning; exact D5 schemas/webhook route; provider SLA and incident escalation.

**Next task: D13 — Design module communication.**
