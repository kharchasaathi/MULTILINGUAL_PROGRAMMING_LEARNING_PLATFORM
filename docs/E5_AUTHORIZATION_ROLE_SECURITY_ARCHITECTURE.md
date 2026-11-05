# E5 — Authorization, Permissions and Role Security Architecture

**Status:** Complete — authorization policy baseline documented; implementation and verification pending  
**Date:** 2026-11-05  
**Decision:** E-0005  
**Authority:** D6 identity/principal model; D11 admin roles/workspaces; E1 threat model; E3 application security; E4 authentication hardening  
**Scope:** Logical policy, governance and verification specification only. No policy engine, permission seed, role assignment, endpoint guard or runtime authorization control is implemented.

## 1. Purpose and boundary
E5 defines how authenticated human and service principals receive narrowly scoped authority and how every protected action is authorized. D6 owns identity and authentication; E4 hardens the principal trust boundary; E5 owns the permission vocabulary, role/grant governance and policy decision contract. D5 remains the API contract authority and D4 the persistence authority.

Authentication proves who or what is acting. Authorization determines whether that actor may perform this action on this resource, in this context, at this time. A successful login, role label, UI route, signed token claim or possession of an identifier never independently grants access.

## 2. Mandatory authorization invariants
1. Deny by default: no explicit matching allow means deny; unknown permission, resource, role, scope, policy version or evaluation error denies.
2. Server-side enforcement: authorize every request and re-authorize at the authoritative mutation boundary; UI hiding is usability only.
3. Least privilege: grant the smallest action set, resource scope, environment and duration necessary.
4. Ownership and tenant isolation: every object read/write is scoped to the owning principal/tenant and owning module; opaque IDs are not authorization.
5. Separation of duties: author, reviewer, approver and publisher conflicts are checked at grant time and action time.
6. No universal super-admin, wildcard permission, hidden bypass or role hierarchy that silently inherits dangerous privileges.
7. Roles are bundles of permissions, not authorities. Direct grants are exceptional, explicit, scoped, expiring and reviewed.
8. Privileged changes require independent approval, recent authentication/step-up and immutable audit evidence according to risk.
9. Service principals are non-human, environment-bound and cannot inherit human/admin roles.
10. Policy, role, grant and resource-state uncertainty fails closed; no fallback to a permissive policy.
11. AI, automation, support agents and system jobs cannot impersonate human approvers or bypass workflow gates.
12. Authorization decisions must be explainable to operators without exposing sensitive data or policy secrets to callers.

## 3. Authorization decision contract
Every decision evaluates a normalized immutable context:
- subject: internal principal ID, actor type, account state, authentication time/assurance, session reference;
- action: stable permission ID and operation purpose;
- resource: type, opaque ID, owner, tenant, classification, state and owning module;
- environment: deployment environment, request channel, time/risk signals and policy version;
- workflow: current state, assignment, approval evidence, separation-of-duties constraints;
- decision: allow or deny, reason code, policy version, matched rule IDs, obligations and correlation ID.

The policy decision point evaluates policy; the policy enforcement point blocks or permits the use case. The owning domain module supplies authoritative resource attributes and enforces the decision in the same transaction/consistency boundary as mutation where possible. Never authorize against stale client-provided ownership or workflow attributes.

## 4. Policy model: RBAC plus contextual attributes
Use role-based permission bundles for manageable job functions, combined with attribute/context checks for ownership, tenant, locale, assignment, resource state, data sensitivity, environment and separation of duties. This is a hybrid logical model, not a commitment to a vendor or policy language.

- RBAC answers which action families a role may request.
- Resource/attribute policy answers which specific records, locales, tenants and states are in scope.
- Workflow policy answers whether the action is valid in the current lifecycle and whether required independent approvals exist.
- Explicit deny constraints override role grants.
- Missing attributes never default to permissive values.
- Role inheritance is disabled by default; any future inheritance must be explicit, acyclic, reviewed and tested for privilege expansion.

## 5. Permission catalogue and naming
Permission IDs are stable, version-controlled identifiers using a consistent domain/resource/action namespace. Avoid broad admin.*, wildcard, all, generic manage or ambiguous verbs. Separate read, create, update, submit, assign, approve, publish, withdraw, export, grant and revoke capabilities.

The accompanying E5 permission catalogue is the initial vocabulary. It is a design baseline, not an assertion that endpoints already exist. New permissions require owning-module review, threat analysis, resource scope, risk classification, test cases and approval. Breaking changes are versioned and migrated; deleted permissions are denied, not silently remapped.

## 6. Role design and boundaries
Roles represent responsibilities. Suggested bounded role families (exact assignment eligibility and final bundles remain subject to review):
- Learner: own learning profile, enrollments, attempts and progress only.
- Learner Support Agent: minimum support context and approved case actions; no score/mastery mutation, reviewer-note access or role grants.
- Curriculum Manager: propose catalogue/source-map changes; cannot approve own changes.
- Content Author: create/edit own drafts and submit review; cannot review/approve/publish own work.
- Content Editor: editorial review within assignment; cannot waive specialist gates.
- Technical Reviewer: technical decision within assigned content/version scope.
- Native-language Reviewer: locale-specific decision for assigned locale only.
- Assessment Reviewer: assessment-definition review; cannot edit learner attempts/results.
- Accessibility Reviewer: accessibility gate evidence; cannot waive other specialist gates.
- Release Manager/Publisher: publish/withdraw only frozen releases with all approvals; cannot create missing approval.
- AI Operations Manager: redacted metrics and policy proposals; no secrets, content approval or permission grants.
- Progress Analyst: aggregate and explicitly scoped diagnostics, read-only.
- Security Administrator: request/approve/revoke access under independent controls; no content approval by role.
- Auditor: read-only audit/access history, no mutation.
- Platform Operator: approved operational settings within scope; no blanket learner-data access.
- Service role: machine-only narrowly scoped permissions for one workload/environment.

No role grants blanket access to all learner records, raw database, arbitrary exports, secrets or production infrastructure. Roles do not imply one another. Combined roles are evaluated for conflicts and prohibited combinations.

## 7. Resource scope and object-level enforcement
Every policy declares scope explicitly: self/owned resource, assigned resource, specific locale, tenant, aggregate, named resource set, environment or narrowly defined global operation. Global scope is exceptional and separately approved. Enforce tenant and owner predicates in the data access path, not after loading broad datasets. Apply field-level allowlists to prevent sensitive columns from leaking through otherwise authorized object reads.

List, search, count, export, download, attachment, background job and websocket/subscription paths require equivalent scope checks. Prevent insecure direct object references by authorizing each requested object and each bulk item. Aggregate queries must not reveal cross-tenant counts or small cohorts where re-identification is possible.

## 8. Separation of duties and workflow authorization
- Content author cannot review or approve own content version; reviewers must have explicit assignment and locale/specialty scope.
- A reviewer cannot publish; publisher cannot fabricate or waive required C14/C15 approval.
- AI output, model score or automated check is evidence only, never human approval.
- Assessment definition reviewers cannot change learner attempt results or mastery.
- Support agents cannot change marks, progress, subscriptions or privileged roles.
- Access requester cannot approve own grant; grant approver cannot approve own privilege elevation.
- High-impact settings, access changes, exports and security exceptions require independent approval/dual control according to risk policy.
- Check conflicts both when grants are assigned and at action time; revoke or suspend conflicting grants before allowing the action.
- Reassignment, delegation and emergency access are explicit, bounded, attributable and reviewable.

## 9. Grant lifecycle and governance
Every grant records subject, role/permission, scope, environment, requester, independent approver, reason, start, expiry, review date, status and policy version. No permanent exception by default. Use request → risk/conflict validation → independent approval → activation → periodic recertification → expiry/revocation.

Grant changes are atomic and versioned. Privilege elevation triggers step-up authentication and session/policy refresh. Revocation must invalidate cached effective permissions within a defined measurable objective. Emergency access is time-limited, least-privilege, alerting-enabled, reason-bound and post-reviewed. No self-grant, self-approval or shared admin account.

## 10. High-risk actions
Classify role/grant changes, publishing/withdrawal, learner account suspension, sensitive data export, bulk operations, payment/refund administration, security configuration, retention/deletion overrides and break-glass as high-risk. Require recent authentication/step-up, explicit permission, scoped target, reason, independent approval where appropriate, idempotency, audit, notification and rollback/compensation plan. Exact risk thresholds and assurance values are deferred for policy approval.

## 11. Cache, consistency and revocation
- Cache only server-computed decisions/attributes with bounded TTL and policy version.
- Cache keys include principal, action, resource/scope, environment and policy version; never reuse across tenants.
- Grants, account state, resource ownership, workflow state and policy version changes invalidate affected caches.
- Sensitive mutations require fresh authorization at commit boundary; stale cache must not permit a revoked grant.
- If the policy service, authoritative attribute source or revocation signal is unavailable, protected actions deny. Define availability and revocation objectives before deployment.
- Background jobs re-evaluate actor/service authority at execution time and preserve original requester/approver context.

## 12. Audit and decision explainability
Log policy decision ID, actor, actor type, action, resource reference, scope, allow/deny, reason code, policy version, matched rule IDs, request correlation, timestamp and approval reference. Avoid raw sensitive resource contents, tokens or excessive personal data. Protect audit integrity and restrict audit search/export. Denied decisions should be measurable and alert on privilege probing or policy drift. Provide safe operator-facing explanations; callers receive non-enumerating errors.

## 13. Admin and module integration
D11 navigation and buttons may reflect effective permissions but do not enforce them. Each admin API, backend use case, export and asynchronous operation repeats authorization. Modules own their data and resource attributes; a central policy layer cannot bypass module ownership or mutate foreign tables. D13 contracts carry trusted actor context and correlation metadata, not caller-controlled grants. D14 flows preserve approval, idempotency and audit evidence across asynchronous boundaries.

## 14. Deferred decisions
Final permission catalogue and bundle membership; exact role eligibility; tenant model; policy engine/library; attribute source and consistency; grant approval matrix; recertification cadence; step-up assurance thresholds; high-risk action classification; cache TTL and revocation SLA; break-glass process; audit retention and legal obligations. Resolve with named owners, threat review, implementation plan and E15 evidence.

## 15. Acceptance gates
1. Every protected operation maps to stable permission IDs and explicit resource scope.
2. Ownership, tenant, assignment, locale and workflow checks are enforced at the owning mutation boundary.
3. No self-approval, self-grant, blanket super-admin or client-trusted role path exists.
4. Grant, conflict, expiry, revocation, cache invalidation and emergency workflows are specified.
5. List/search/export/background-job paths have equivalent authorization requirements.
6. All future scenarios in the verification catalog pass in implementation before production approval; they are currently not executed.

**Verification status:** Design specification only. No policy engine, role seed, authorization endpoint, database migration, access review or test was implemented or executed.
**Execution gate:** Learner code execution remains disabled until E9, L13–L15 and E15 approval.
