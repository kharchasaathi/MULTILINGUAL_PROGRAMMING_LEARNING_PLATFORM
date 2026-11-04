# D6 — Authentication and Identity Architecture

**Status:** Complete — provider-neutral identity, authentication, session and authorization architecture documented
**Date:** 2026-11-05
**Depends on:** D1–D5; C15 content review and approval workflow
**Baseline:** NestJS modular monolith, PostgreSQL/Prisma ORM 7 stable, REST/JSON under `/api/v1`
**Scope:** Logical architecture and policy contract only. No identity provider, credentials service, session store, key manager or production authentication code is selected or implemented.

## 1. Purpose and boundaries

D6 defines how a person or service is represented, authenticated, resolved into a trusted request principal, authorized for a particular action/resource, and audited. It covers web/PWA and Expo mobile clients without allowing client claims to become authority.

D6 does not select an identity vendor, hosting region, email/SMS provider, OAuth client library, token-signing/key service, session store, CAPTCHA vendor, legal retention period or deployment topology. E1–E5 must complete threat modelling and detailed security controls before production authentication is enabled. D5 remains the wire-contract authority; D4 remains the logical persistence authority.

## 2. Architecture decisions

1. **Separate authentication from application identity.** An external identity system proves control of an authentication method; the platform maps its stable issuer/subject pair to an internal UUID principal.
2. **Provider-neutral boundary.** NestJS depends on an application-owned identity adapter and normalized claims contract. Vendor SDKs, tokens and provider-specific models remain in adapters.
3. **Server-resolved principal only.** Protected requests receive a principal only after cryptographic/protocol validation, issuer/audience/expiry checks, account-state checks and identity mapping. Never trust user IDs, role names, locale, subscription or reviewer claims supplied in request bodies or client storage.
4. **Deny by default and least privilege.** Every non-public operation declares required permission and resource scope. Authorization is enforced in backend use cases/services, not merely in UI routes or guards.
5. **Distinct roles and permissions.** Roles group permissions; permissions describe actions. Resource ownership and contextual constraints are evaluated separately. A role is not a blanket bypass.
6. **No self-approval or AI approval.** Enforce C15 author/reviewer separation, locale-specific review authority, publisher authority and independent high-risk release approval. AI/system automation cannot impersonate a human approver.
7. **No credential/token storage in application profile tables.** External credentials remain with the chosen identity provider. If first-party credentials are ever approved, their design requires a separate security decision and specialist review.
8. **Protocol and client transport remain gated.** Prefer standards-based OIDC/OAuth integration where compatible, but the concrete flow, browser cookie vs bearer-token transport, PKCE requirements, native redirect strategy and session persistence are not locked until provider and threat-model review.
9. **No long-lived secrets in browser storage.** Do not persist refresh tokens, access tokens or session secrets in localStorage, IndexedDB, application logs, analytics or URLs. Exact secure storage design must be validated per web/native platform before implementation.
10. **Identity failures fail closed.** Unknown issuer, invalid signature, expired/revoked session, disabled account, malformed claims or unavailable required authorization data must not grant access.

## 3. Logical architecture and trust boundaries

```text
Web / PWA                         Expo native
   | HTTPS                           | HTTPS
   +---------------+-----------------+
                   |
             NestJS API edge
       protocol / session validation
                   |
       normalized PrincipalContext
                   |
       account status + policy engine
                   |
       module use case + resource checks
                   |
       owning repository / PostgreSQL

External Identity Provider
   <---- OIDC/OAuth adapter boundary ---->
   (issuer, subject, authentication events)

Audit pipeline: security-relevant events -> append-only audit records
```

Trust boundaries:
- Browser/native app, cookies, authorization headers, redirects, deep links and device state are untrusted.
- Identity-provider metadata, discovery documents, JWKS, claims and webhook/event payloads are external inputs and must be validated.
- Principal context is trusted only after adapter validation and internal identity resolution.
- Role assignment, account status and resource ownership are authoritative only from backend-controlled records.
- Logs and audit events are sensitive data stores; secrets and raw credentials are prohibited.

## 4. Principal and identity model

### 4.1 Principal

A principal is the platform's internal actor identifier and context:
- `principalId`: internal UUID, stable and opaque.
- `actorType`: `human` or `service`.
- `accountStatus`: `pending`, `active`, `suspended`, `locked`, `deletion_pending`, `deleted`.
- `authenticationContext`: validated issuer, subject, authentication time, assurance/method metadata when supplied, and session reference; do not expose provider token.
- `effectivePermissions`: server-calculated permission set or policy handle, not client-supplied.
- `requestId` and correlation context.

A principal is not automatically a learner, author, reviewer or administrator. Those capabilities are separate profile and role assignments.

### 4.2 External identity mapping

Map the exact pair `(issuer, subject)` to one internal principal. Normalize issuer identifiers consistently; do not key accounts by email address, phone number, display name or mutable username. Email/phone are verified contact attributes, not primary identity keys. Account linking requires fresh authentication of both identities, explicit user intent, collision checks, audit and recovery handling; never auto-link merely because two providers return the same email.

### 4.3 Account lifecycle

Define explicit, audited transitions:
- Registration/invitation creates or links an identity and internal principal in `pending` state.
- Verification/required onboarding permits activation.
- Suspended/locked accounts cannot obtain normal application permissions.
- Recovery does not silently change identity ownership or restore privileged roles.
- Deletion requests revoke sessions and access promptly, then enter policy-governed deletion/anonymization. Preserve records only where approved legal, security, fraud or audit obligations require it; retention periods remain open.
- Reinstatement requires authorized action, reason, identity proof appropriate to risk and audit evidence.

## 5. Authentication flows

### 5.1 Registration and sign-in

- Use the selected identity provider's supported standards-based authorization flow; validate state, nonce, issuer, audience, signature, expiry and redirect URI.
- For public clients, require PKCE when supported/required by the chosen protocol profile. Exact flow is a provider/security decision.
- Do not accept arbitrary return URLs; use an allowlist and exact redirect matching.
- Normalize provider errors; never reveal whether a particular email/phone is registered in public responses.
- Apply per-IP, per-account/identifier and global abuse controls without making one attacker able to lock out another user's account indefinitely.
- Verification challenges must be short-lived, single-use, rate-limited and bound to intended action and principal/contact. Never log challenge secrets.
- Email/phone verification requirements and provider delivery channel remain policy/vendor decisions.

### 5.2 Session and token lifecycle

The concrete session transport is deliberately unresolved. Before implementation, choose one supported pattern per client class and document its threat model:
- **Web/PWA:** evaluate a server-managed session using Secure, HttpOnly, appropriately scoped SameSite cookies and CSRF protection for state-changing requests; or a standards-based BFF arrangement. Do not put bearer/refresh secrets in browser-readable storage.
- **Native:** evaluate authorization-code + PKCE with platform-appropriate secure credential storage and controlled refresh; never embed a client secret in the app.
- Do not mix cookie and bearer semantics implicitly. D5 must describe the chosen request authentication mechanism once approved.
- Enforce absolute and idle session expiry, rotation/re-authentication policy, revocation on logout, account suspension, credential/security changes and suspected compromise.
- If refresh tokens are used, rotate on use, detect reuse, revoke the affected token family and record a security event. Store only appropriately protected hashes/references server-side where applicable.
- Logout must revoke the server session/refresh family; clearing client UI alone is insufficient.
- Concurrent session/device listing and user-initiated revocation are planned capabilities; exact limits and UX are open.

### 5.3 Step-up authentication and recovery

Require stronger/recent authentication for sensitive operations such as changing identity contacts, linking accounts, changing MFA, exporting/deleting account data, granting privileged roles, publishing critical releases and security administration. The assurance method and freshness window are risk-policy decisions.

MFA is a planned capability, not yet mandated by an unreviewed provider choice. Evaluate phishing-resistant methods where available; recovery codes must be single-use and stored only as protected verifiers. Recovery must not bypass reviewer/publisher separation or grant administrative roles. Help-desk recovery requires documented identity verification, dual control for privileged accounts and immutable audit.

## 6. Authorization model

### 6.1 Evaluation order

For each request:
1. Determine whether the route is explicitly public.
2. Validate authentication/session and resolve internal principal.
3. Check account status and required assurance/freshness.
4. Check action permission for the actor.
5. Load resource through its owning module and verify tenant/owner/relationship scope.
6. Apply contextual rules, separation-of-duties, locale and workflow-state constraints.
7. Execute the use case; write audit evidence for privileged/security-sensitive actions.

Any missing policy, unknown role, unresolved resource ownership or policy-engine error denies access. Return privacy-preserving not-found for resources whose existence is sensitive, consistent with D5.

### 6.2 Role catalogue

Initial role names are policy groups, not direct permissions:
- `learner`
- `author`
- `curriculum_reviewer`
- `technical_reviewer`
- `native_language_reviewer`
- `assessment_reviewer`
- `accessibility_reviewer`
- `content_editor`
- `release_manager`
- `content_administrator`
- `auditor`
- `platform_security_administrator`
- `service_principal` (non-human, narrowly scoped)

Assignments are granted by authorized administration, scoped where appropriate (locale, content family, project or environment), time-bounded where practical, reviewed periodically and audited. No self-service role escalation.

### 6.3 Permission model

Permission identifiers use `resource:action` naming, for example `lesson:read_published`, `lesson:create_draft`, `review:decide_technical`, `review:decide_locale`, `release:publish`, `account:manage_roles`. The complete starter matrix is in `D6_AUTHORIZATION_POLICY_MATRIX.csv`.

Role membership alone is insufficient:
- authors can edit their own drafts but cannot approve their own work;
- reviewers can decide only assigned gate, locale and immutable hash;
- reviewers cannot publish unless separately authorized as release manager and C15 permits independent release approval;
- release managers can publish only when all mandatory current-hash gates pass and they are not the author or a conflicted reviewer;
- content administrators can withdraw under C15 but cannot silently rewrite approved history;
- auditors are read-only;
- security administrators manage access controls but do not gain content approval by virtue of that role;
- service principals receive explicit machine permissions and never human approval permissions.

## 7. API integration with D5

D5 remains authoritative for routes and response envelopes. D6 adds these contract requirements:
- Protected endpoints require a server-resolved principal; public endpoints are explicitly allowlisted.
- Authentication errors use stable D5 codes such as `UNAUTHENTICATED`; authorization denials use `FORBIDDEN` or privacy-preserving `NOT_FOUND`.
- Identity/role/permission fields in request bodies are ignored or rejected when clients attempt to set authoritative values.
- Role changes, account linking, recovery, session revocation and privileged content actions are idempotent or concurrency-protected as appropriate.
- Never return provider access/refresh/ID tokens, internal policy details, MFA secrets or recovery verifiers.
- Do not finalize auth headers/cookie requirements in OpenAPI until the transport decision is approved. Document security schemes in the generated OpenAPI contract at implementation time.
- Rate-limit sign-in, verification, recovery, account linking and privileged mutation routes. Limits and thresholds require load/abuse testing.

## 8. Persistence alignment with D4

D4's `identity_principal` remains the internal identity anchor. D6 proposes the following logical additions for D4 schema refinement; these are not deployed tables:
- `identity_external_link`: principal, issuer, subject, linked-at, verification/assurance metadata; unique issuer+subject.
- `identity_account_state_event`: append-only lifecycle transitions, actor, reason and timestamp.
- `identity_role_assignment`: principal, role, scope, grantor, validity interval, revocation metadata.
- `identity_permission_policy_version`: versioned policy definition and activation metadata.
- `identity_session`: session reference, principal, client class/device metadata, created/last-seen/idle-expiry/absolute-expiry/revoked timestamps.
- `identity_refresh_token_family`: protected token verifier/reference, rotation/reuse/revocation state if refresh tokens are selected.
- `identity_verification_challenge`: purpose, protected verifier, expiry, consumed state and attempt count.
- `identity_mfa_factor` and `identity_recovery_code`: only if MFA is approved; secrets protected and never readable by ordinary application queries.
- `audit_security_event`: append-only actor, event type, target, result, request/correlation IDs, timestamp and minimal safe context.

Every table requires explicit owner module, foreign keys, unique/check constraints, indexes justified by query patterns, migration review and retention classification. Avoid storing raw provider tokens, passwords, challenge values or recovery codes. D4 matrix should be reconciled before Prisma migrations are authored.

## 9. Security, privacy and abuse controls

- TLS for deployed traffic; secure headers and strict redirect/origin policy.
- Validate issuer, audience, signature algorithm allowlist, key rotation, token timestamps and protocol state; reject algorithm confusion and unsigned tokens.
- Protect cookies against theft/CSRF if cookie sessions selected; protect native credentials using platform secure storage.
- Prevent account enumeration, credential stuffing, brute force, replay, session fixation, refresh-token replay and open redirects.
- Use bounded rate limits and risk-based step-up; avoid permanent lockout denial-of-service.
- Enforce server-side object ownership and role scope on every read/write; test IDOR across all resource types.
- Log security events with minimal metadata; never log passwords, raw tokens, authorization headers, verification codes, recovery codes, full sensitive claims or secrets.
- Apply data minimization to IP/device metadata; define retention, user access/deletion and data residency only after privacy/legal review.
- Privileged role grants/revocations, publisher actions and emergency withdrawals require reason, actor, timestamp and auditable evidence.
- Provider outage must not silently fall back to insecure local authentication. Define graceful public-content availability separately from protected operations.

## 10. Threat scenarios and mitigations

| Threat | Required mitigation/evidence |
|---|---|
| Forged/expired/wrong-audience token | Strict signature, issuer, audience, time and algorithm validation; negative tests |
| Account takeover / credential stuffing | Provider controls, throttling, MFA/step-up policy, suspicious-event response |
| Account-link collision | Fresh proof of both identities, explicit consent, unique mapping and audit |
| Session theft/replay | Secure transport/storage, rotation, revocation, expiry and reuse detection |
| CSRF / open redirect | CSRF defense for cookie-authenticated writes; exact redirect allowlist |
| IDOR / privilege escalation | Resource-scoped server authorization and cross-role tests |
| Reviewer self-approval | C15 separation-of-duties enforced transactionally in service layer |
| Stale role or revoked session | Revalidation/revocation strategy and bounded authorization cache, if any |
| Recovery abuse | Single-use short-lived challenges, step-up/dual control, notification and audit |
| Provider/JWKS outage or compromise | Fail-closed validation, key-rotation handling, incident and recovery plan |
| Leaked secrets in telemetry | Structured redaction, log access control and automated secret-pattern tests |
| Overprivileged machine identity | Narrow scopes, rotation, environment separation and no human-only permissions |

## 11. Acceptance criteria and implementation test plan

D6 is accepted as an architecture artifact when:
- principal and external identity mapping are unambiguous and stable;
- client-supplied identity/role claims are never authoritative;
- registration, sign-in, verification, linking, recovery, logout and revocation boundaries are specified;
- web and native session choices have explicit security decision gates;
- roles, permission semantics, resource scopes and C15 separation-of-duties are documented;
- D4/D5 integration and unresolved vendor/protocol decisions are recorded;
- threat scenarios, privacy controls and future tests are enumerated.

Future tests (not executed in this planning task):
1. Reject invalid signature, issuer, audience, algorithm, expiry, nonce and state.
2. Reject unknown/unlinked external subject and disabled principal.
3. Ensure same email from two issuers does not auto-link accounts.
4. Enforce unique issuer+subject mapping under concurrency.
5. Require proof of both identities for account linking.
6. Reject expired, reused and wrong-purpose verification challenges.
7. Prevent account enumeration in public responses.
8. Enforce throttling without attacker-triggered permanent lockout.
9. Revoke session on logout and account suspension.
10. Detect refresh-token reuse and revoke its family, if refresh tokens are selected.
11. Reject CSRF on cookie-authenticated state changes, if cookie sessions are selected.
12. Reject open redirect and invalid native redirect/deep-link state.
13. Deny every protected route without a valid principal.
14. Deny suspended, locked and deletion-pending accounts.
15. Enforce resource ownership and prevent cross-user IDOR.
16. Enforce locale/content scope on reviewer decisions.
17. Prevent author self-review and self-approval.
18. Prevent reviewer from publishing without separate release authority.
19. Require all current-hash C15 gates before publication.
20. Prevent AI/service principal from recording human approval.
21. Ensure auditor is read-only and security administrator cannot approve content by default.
22. Reject client attempts to assign role, principal ID or entitlement.
23. Ensure sensitive credentials/claims never appear in logs or API responses.
24. Verify privileged changes create append-only audit events.
25. Verify provider outage fails closed for protected routes.
26. Verify role revocation takes effect within the approved revocation bound.

## 12. Open decisions and handoff

Must be resolved before implementation/release:
- Identity provider and supported issuer/tenant model.
- OIDC/OAuth profile, web BFF/cookie vs other web transport, native PKCE and redirect configuration.
- Session store, access/session lifetime, idle/absolute expiry and revocation latency.
- MFA methods, mandatory roles, recovery and account-linking UX.
- Email/SMS verification provider and abuse-control thresholds.
- Key/JWKS management, rotation and incident response.
- Role grant authority, scope model and periodic access review.
- Privacy notice, data residency, retention/deletion and legal requirements.
- Audit storage/retention, security monitoring and SLOs.

**Handoff:** D7 — Design the course engine. E1–E5 must later turn these architecture controls into a threat model and implementation-grade security requirements. No production authentication or authorization implementation is claimed.
