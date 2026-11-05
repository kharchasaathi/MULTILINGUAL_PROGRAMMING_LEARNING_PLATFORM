# E4 — Identity, Authentication and Authorization Hardening

**Status:** Complete — security requirements and verification design documented; implementation pending  
**Date:** 2026-11-05  
**Decision:** E-0004  
**Authority:** D6 identity architecture; E1 threat model; E2 network controls; E3 application security; D11 admin architecture  
**Scope:** Provider-neutral hardening baseline. No identity provider, credential store, MFA product, token format, session store, key manager or production control is selected, deployed or tested.

## 1. Purpose
E4 converts D6's logical identity model into security requirements for registration, authentication, account recovery, sessions, federation, service identities and authorization handoff. It does not supersede D6's unresolved technology choices or E5's detailed authorization/role design.

## 2. Non-negotiable invariants
1. The server resolves an internal opaque principal from a validated authentication event; client-supplied IDs, roles, email, locale, subscription or assurance claims never establish authority.
2. External identity is keyed by the exact normalized issuer/subject pair. Mutable email, phone and username are not identity keys.
3. Authentication and authorization are separate decisions. A valid login does not imply permission to any resource or action.
4. Protected operations deny by default when identity, account status, session, policy, ownership or required assurance cannot be established.
5. Credentials, access/refresh tokens, session secrets, recovery secrets and provider secrets never enter logs, analytics, URLs, client profile records or support tooling.
6. Account linking requires fresh proof of control of both identities, explicit intent, collision checks and audit; matching email alone is insufficient.
7. Privileged actions and sensitive account changes require recent authentication and an approved step-up policy; exact assurance levels remain a policy decision.
8. No self-grant, self-approval, reviewer impersonation or AI-mediated identity/permission change.
9. Identity provider outage or key/metadata uncertainty cannot silently downgrade authentication or grant access.
10. Account suspension, compromise response and logout/revocation must invalidate server-recognized sessions within a defined operational objective before launch.

## 3. Identity lifecycle
- Registration/invitation creates a pending internal principal; activation follows required contact verification and onboarding.
- Verification tokens are random, single-use, purpose-bound, short-lived, stored only as non-reversible verifiers, rate-limited and invalidated after success or account/security changes.
- Resend flows rotate prior tokens and return privacy-preserving responses that do not disclose whether an account exists.
- Account linking and unlinking are explicit, re-authenticated, collision-safe and audited. Prevent removal of the last usable authentication method without a verified replacement/recovery path.
- State transitions are server-owned: pending, active, suspended, locked, deletion_pending, deleted. Deleted identities cannot be reactivated by replaying old callbacks or tokens.
- Contact changes require re-verification and notification to the previous verified channel where feasible; high-risk changes require step-up.
- Merge, transfer, recovery and administrative override flows require a separately reviewed procedure and evidence trail.

## 4. Authentication and federation
- Use a standards-based OIDC/OAuth adapter where federation is selected; validate exact issuer, audience, signature, expiry, not-before, nonce, state, authorized redirect URI and protocol response before principal resolution.
- Use Authorization Code with PKCE for public clients when supported; never embed a client secret in web, PWA or native binaries.
- Bind callbacks to the initiating browser/app transaction; state and nonce are unpredictable, single-use, short-lived and protected against login CSRF and mix-up.
- Validate discovery/JWKS origin and key rotation safely. Unknown issuer, algorithm downgrade, invalid signature, ambiguous key ID or stale/untrusted metadata fails closed.
- Do not accept ID tokens as API access tokens. Enforce issuer/audience/type separation and intended token use.
- Avoid implicit and resource-owner-password flows. Any exception requires explicit security decision and review.
- Authentication error messages and timing must not reveal account existence. Apply layered rate limits, progressive abuse controls and credential-stuffing detection without easy denial-of-service account lockout.
- CAPTCHA or challenge mechanisms are supplementary abuse controls, not identity proof.

## 5. Passwords and authenticators
- Prefer provider-managed credentials unless first-party credential ownership is explicitly approved.
- If first-party passwords are later approved, use a maintained adaptive password-hashing implementation with per-password salt and tunable cost; never reversible encryption, plaintext, fast general-purpose hashes or custom cryptography. Reassess cost as infrastructure changes.
- Permit password managers, paste and long passphrases; do not impose arbitrary composition rules or silent truncation. Enforce a documented length/byte policy and block known-compromised/common passwords through a privacy-reviewed mechanism.
- Password reset uses single-use, purpose-bound, expiring tokens; success revokes relevant sessions and sends a security notification.
- MFA enrolment, replacement and removal require authenticated, audited flows. Recovery codes are high-entropy, one-time and stored as verifiers. MFA reset is high risk.
- Prefer phishing-resistant authenticators for privileged operators where supported. Exact MFA requirement and assurance policy are deferred to E5 and operational risk approval.
- Never log OTPs, recovery codes, password values, authenticator seeds or raw credential responses.

## 6. Session and token lifecycle
- Select cookie/session or native token transport only after client-specific threat review; D6 remains provider-neutral.
- Browser sessions, if cookie-based, use Secure, HttpOnly and appropriate SameSite attributes, narrow host/path scope, CSRF protection for state-changing requests and no session identifiers in URLs.
- Rotate session identifiers after authentication, privilege/assurance changes and recovery. Enforce idle and absolute expiry, server-side revocation and bounded concurrent sessions according to approved policy.
- Refresh credentials, if used, rotate on every use; detect reuse, revoke the token family and raise a security event. Never permit indefinite sliding sessions.
- Access credentials are audience- and scope-limited, short-lived, and validated for issuer, signature, algorithm, expiry, not-before, token type and intended audience.
- Logout revokes server-side session/refresh state; client deletion alone is not sufficient. Account suspension, credential reset, MFA reset and compromise response trigger appropriate session revocation.
- Clock skew, key rotation, provider outage and revocation-store outage have explicit bounded behavior; uncertainty denies protected access.
- Never store long-lived secrets in localStorage, URLs, logs, analytics or unencrypted native preferences. Native secure storage must be selected and tested before release.

## 7. Recovery and high-risk changes
- Recovery must not be weaker than normal authentication. Use verified channels, single-use tokens, rate limits, abuse telemetry and privacy-preserving responses.
- Recovery completion invalidates recovery tokens, rotates relevant credentials and revokes existing sessions as policy requires; notify the account through independent verified channels.
- Email/phone replacement, account linking, MFA reset, credential reset, role/grant change and deletion cancellation require step-up and audit.
- Support staff cannot ask users for passwords, OTPs, recovery codes or session tokens; support workflows cannot directly impersonate users.
- Emergency recovery requires a documented, attributable, time-limited, dual-reviewed exception and post-event review.

## 8. Authorization handoff
- Construct a minimal immutable request principal only after protocol validation and internal identity resolution.
- Include opaque principal ID, actor type, account state, validated authentication time/assurance, session reference and correlation ID. Do not expose raw provider tokens.
- Effective permissions and resource scope are loaded/calculated server-side; role names in tokens or client state are hints at most and never the sole authority.
- Recheck account status, permission, ownership, tenant and workflow state at the authoritative mutation boundary to prevent stale-grant and TOCTOU errors.
- Missing, malformed, stale or conflicting claims deny access. Avoid fallback to anonymous or broad default roles.
- E5 owns permission catalogue, role bundles, scope model, conflict rules and grant/review workflows. E4 defines the authentication trust boundary only.

## 9. Service identities
- Service principals are distinct from human accounts and cannot use interactive login.
- Assign one workload identity per service/environment with narrowly scoped permissions and explicit owner, purpose, expiry/rotation and revocation path.
- Prefer short-lived workload federation over static secrets. Where secrets are unavoidable, store in an approved secret manager, rotate and prevent exposure in CI output.
- No shared human/service accounts, embedded credentials, wildcard service grants or ambient production credentials for CI.
- Authenticate and authorize asynchronous events independently; validate producer identity, schema, replay/idempotency and permitted event type.

## 10. Abuse resistance and monitoring
Monitor privacy-minimized signals for failed authentication spikes, credential stuffing, unusual device changes where lawful, verification/resend abuse, recovery attempts, MFA reset, refresh reuse, session anomalies, account linking, privilege elevation and provider/key validation failures.
Use layered per-account, per-network and global controls with safe thresholds, backoff and alerting. Avoid permanent lockout as the only control. Keep telemetry free of credentials, raw tokens and unnecessary personal data.

## 11. Audit
Record actor/principal, action, target, outcome, server timestamp, correlation ID, authentication context reference and reason/approval reference for security-relevant lifecycle changes. Audit registration/verification, login outcome categories, recovery, linking, MFA changes, session revocation, suspension/deletion, service credential lifecycle and privileged access changes. Protect audit records from ordinary operator modification; never record secret material.

## 12. Client-specific requirements
- Web/PWA: defend login and callback flows against CSRF, open redirects, clickjacking and token leakage; do not persist long-lived secrets in browser-readable storage.
- Android/iOS: use claimed redirect URIs/app links with ownership verification, PKCE, state/nonce binding and platform secure storage; protect against deep-link interception and debug-build leakage.
- All clients: clear local sensitive state on logout/account switch, but rely on server revocation for actual invalidation.

## 13. Traceability
- D6 is identity/principal authority; D5 is API contract authority; D4 is persistence authority.
- E1 account takeover, impersonation, privilege abuse, credential theft, session theft, recovery abuse and identity-provider compromise threats map to the E4 control matrix.
- E2 protects transport, origin and egress; E3 enforces request validation, application authorization and safe audit/output. E4 depends on both and does not replace E5.
- D11 privileged workspaces consume server-resolved principal and E5 permission decisions; UI visibility is never a security boundary.

## 14. Deferred decisions
Identity provider and tenant model; credential ownership; exact password policy; MFA baseline and assurance levels; session/token format and lifetime; browser/native transport; session store and revocation SLA; key management and rotation cadence; recovery support model; device-risk signals; service identity mechanism; privacy/legal retention; account deletion grace period. Each requires named owner, threat review, implementation evidence and E15 approval before production enablement.

## 15. Acceptance gates
1. D6 invariants are preserved and unresolved provider-specific decisions remain explicitly open.
2. Every lifecycle, protocol, recovery, session and service-identity control has an owner and verification scenario.
3. E1 threat traceability and E3 request-principal handoff are documented.
4. Authentication failures, provider outages and revocation uncertainty fail closed.
5. No credential/token secret is exposed to clients, logs, analytics or support tools.
6. E4 design is reviewed before implementation; tests and operational evidence are required before production enablement.

**Verification status:** The accompanying catalog contains future scenarios only. No authentication provider, endpoint, credential store, MFA, session revocation, penetration test or runtime control was executed or verified by this milestone.  
**Execution gate:** Learner code execution remains disabled until E9, L13–L15 and E15 approval.
