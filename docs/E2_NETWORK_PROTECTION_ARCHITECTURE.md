# E2 — Network Protection Architecture

**Status:** Complete — provider-neutral network security design documented  
**Date:** 2026-11-05 | **Decision:** E-0002 | **Branch:** docs/project-foundation

**Inputs:** D1–D15, E1 threat model/register, D3–D14 architecture documents, Security and Engineering Constitutions.  
**Scope:** Logical network requirements and future verification specifications only. No hosting vendor, VPC, firewall, DNS, certificate, WAF, service mesh, network policy or production control has been configured or tested.

## 1. Purpose and security posture

E2 translates E1 trust-boundary threats into network controls for public clients, web/PWA, native apps, public API, modular backend, data stores, workers, third-party providers, CI/CD and the future code-execution environment.

Required posture: **default deny; explicit allow; least privilege; authenticated workload identity; encrypted transport; environment separation; observable flows; fail closed.** Network reachability never grants business authorization. D6 and domain-module authorization remain mandatory.

## 2. Scope and assumptions

In scope: public ingress; DNS and TLS; edge/origin protection; application-to-data connectivity; worker and queue paths; provider egress and callbacks; uploads/downloads; environment isolation; CI/CD/control-plane access; future sandbox isolation; network telemetry, incident containment and recovery.

Not selected: cloud/hosting vendor or region; VPC/VNet and CIDRs; firewall/WAF/CDN/DDoS/DNS/certificate products; service mesh or VPN; exact ports/IP allowlists; SIEM/retention/SLO; compliance or PCI scope.

Assumptions:
1. Internet, client devices, user input, uploaded files and third-party responses are untrusted.
2. Private IP/DNS is not an authorization boundary.
3. Initial backend remains a modular monolith; modules use D13 application ports, not network listeners.
4. Data stores and workers are logically distinct dependencies even if initially hosted together.
5. Provider calls originate from server-side adapters; no secrets in clients.
6. Async delivery and provider/network failure are expected.
7. Learner code execution remains disabled until E9, L13–L15 and E15 evidence and approval.
8. Future sandbox workloads are hostile and isolated from application, data, control plane, metadata and other tenants.

## 3. Logical network zones

| Zone | Components | Required reachability |
|---|---|---|
| Z0 Public client | Browser, PWA, Android/iOS | Internet to approved public endpoints only |
| Z1 Public edge | DNS, TLS edge, CDN/WAF/reverse proxy candidate, API ingress | Published HTTPS routes; origins protected |
| Z2 Application | Next.js server/BFF where used, NestJS API, domain modules | Ingress only from Z1 or approved internal caller |
| Z3 Data | PostgreSQL, object storage, cache/queue, backup interfaces | Only named workloads and privileged operational identities |
| Z4 Worker | Outbox/inbox consumers, schedulers, reconciliation and notification jobs | Required queue/data/provider paths only |
| Z5 External providers | Identity, AI, payment, email/push, telemetry | Narrow outbound TLS; callbacks through Z1 |
| Z6 Control plane | CI/CD, secrets, deployment, observability, backup administration | Strongly authenticated, time-bound and audited |
| Z7 Future execution | Playground gateway, disposable sandbox | No route to Z2/Z3/Z4/Z6, metadata or other tenants |

These are logical policy zones, not a fixed subnet count. Equivalent enforcement may use security groups, private endpoints, workload identity, host policy or network appliances. The implementation must identify the actual enforcement point and evidence.

~~~mermaid
flowchart TB
 C["Z0 Public clients"] -->|"HTTPS only"| E["Z1 Public edge"]
 E -->|"Validated requests"| A["Z2 Application"]
 A -->|"Least privilege"| D["Z3 Data services"]
 A --> W["Z4 Workers"]
 W -->|"Scoped TLS egress"| P["Z5 Providers"]
 A -->|"Server adapters"| P
 O["Z6 CI/CD and operators"] -->|"Audited management path"| A
 O --> D
 G["Z7 Disposable sandbox"] -. "DENY: no route" .-> A
 G -. "DENY: no route" .-> D
 G -. "DENY: no route" .-> O
~~~

The dashed sandbox paths are prohibited reachability, not configured routes. Provider callbacks enter via public ingress and must be verified before state changes.

## 4. Public ingress and edge requirements

1. Publish only approved hostnames and HTTPS routes. Never expose database, queue, cache, object-store administration, worker control, metrics, debug or orchestration interfaces publicly.
2. Prevent direct-origin bypass. Origin must authenticate the approved edge or enforce an equivalent restricted ingress policy.
3. Require TLS 1.2 minimum; prefer TLS 1.3. Disable obsolete protocols and weak ciphers. Redirect HTTP to HTTPS; never transmit credentials over cleartext.
4. Normalize host, method, path, content type, content length, forwarded headers and request framing consistently at edge and origin.
5. Reject unknown hostnames, unsupported methods, malformed encodings, unexpected protocol upgrades, oversized bodies and ambiguous framing.
6. Apply layered rate/concurrency limits by route class, principal/account, network signal and global capacity. Do not rely on IP-only limits because of carrier NAT and shared networks.
7. Use stricter budgets for login, recovery, OTP, search, upload, AI, assessment, checkout and webhook routes.
8. Restrict CORS to exact approved origins/methods/headers. Never combine wildcard origins with credentials. CORS is not authorization.
9. For cookie-authenticated mutations, use appropriate SameSite policy, CSRF tokens and Origin/Referer validation. CORS alone is not CSRF protection.
10. Trust forwarded client IP headers only from configured proxies. Client-supplied correlation IDs are not identity evidence.
11. Public health endpoints disclose minimal liveness/readiness only; detailed diagnostics require authenticated operator access.
12. Apply request timeout, connection, upload, pagination, response-size and concurrency ceilings.

## 5. TLS and certificate lifecycle

- Encrypt client-to-edge, edge-to-origin, workload-to-data and workload-to-provider traffic.
- Validate certificate chain and hostname for all outbound TLS. No certificate-validation bypass or insecure downgrade.
- Automate certificate issuance/renewal where possible; inventory ownership, expiry alerts, rotation and revocation procedures.
- Use mutual TLS or equivalent workload identity for sensitive service links when supported and operationally justified.
- Separate environment certificates, trust roots and credentials. Never copy production private keys into lower environments.
- Database TLS must validate server identity; client certificates may be used where supported.
- Never place private keys, bearer tokens, cookies, webhook secrets or provider credentials in URLs, client bundles, source control, logs or telemetry.
- At-rest encryption and KMS selection belong to E11/platform operations; E2 requires encrypted transit but selects no KMS.

## 6. East-west and data-plane controls

### Application and data
- Z3 has no public inbound route. Allow only named application/worker identities and required ports.
- Separate database runtime, migration, read-only reporting and break-glass roles. Runtime roles must not be owner/superuser.
- No shared superuser credentials; no direct public DB administration.
- Object storage is private by default. Signed URLs are short-lived, object-scoped and issued only after application authorization. Object keys are not authorization.
- Cache/queue access is authenticated and encrypted where supported; isolate credentials/namespaces.
- Backups and replicas inherit source classification and must not become broadly reachable.

### Modules and workers
- Initial modules communicate through D13 application ports in-process; no per-module network listeners.
- Modules cannot bypass ownership by directly writing another module's tables or private storage.
- Future network service extraction requires owner, service identity, explicit caller/resource authorization, versioned schema, timeouts, retries, circuit breaker and reviewed network rule.
- Workers receive only required queue/topic and data scopes. Ordinary consumers need no public inbound listener.
- Separate worker identities by risk class where practical. Worker egress is restricted to approved provider endpoints and required data services.
- Replay is privileged/audited. A poisoned message cannot select arbitrary network destinations or privileged operations.

## 7. Egress, SSRF and provider boundaries

**Default deny outbound access.** Every allowed destination requires a recorded purpose, owner, environment, protocol/port, data class, authentication method, expected volume, failure behavior and review/expiry date.

- Provider adapters use fixed configured endpoints. User-controlled URLs, redirects, webhook targets, imports, image URLs, package registries or AI tool arguments must never become unrestricted server-side fetch destinations.
- Any required URL fetch uses an SSRF-safe broker: HTTPS-only by default; resolve and validate destination IP at connection time; block loopback, private, link-local, multicast, reserved and metadata ranges for IPv4 and IPv6; revalidate each redirect and DNS answer; limit redirects, time, bytes and ports; prevent DNS rebinding.
- Reject URL credentials, unusual IP encodings, unsupported schemes/ports and redirects to prohibited destinations. Do not forward ambient cookies or authorization headers.
- Block cloud metadata and control-plane endpoints from application and worker egress unless a documented provider workload-identity path requires them.
- Sandbox egress is entirely denied by default. Any future package mirror or lab networking requires a controlled proxy, destination/protocol/DNS/bandwidth/time/response limits and E9/E15 approval.
- Provider webhooks enter through Z1; verify signature, timestamp/replay window, merchant/account/environment and event state. Source IP alone is not proof.
- Outbound failures fail closed for security decisions; never bypass TLS, allowlists, signatures or policy gates to restore availability.

## 8. DNS security

- Use organization-controlled zones and least-privilege DNS administration with MFA, role separation, change audit and recovery.
- Use DNSSEC where supported and operationally validated; document key rollover ownership and limitations.
- Inventory public and private records; remove stale aliases and verify target ownership to prevent dangling CNAME/subdomain takeover.
- Keep internal service discovery private. Do not publish internal names, addresses or environment metadata.
- Internal DNS is not authorization; authenticate service identity and caller.
- Use controlled workload resolvers. SSRF fetchers validate resolved IPs at connection time and after redirects.
- Document TTL and rollback expectations for production DNS changes.

## 9. Environment and privileged access isolation

- Development, test, staging and production use separate identities, credentials, data stores, provider projects/accounts and network policy boundaries.
- Staging cannot connect to production databases, queues, object storage, secrets or control-plane APIs.
- Production data is not copied to lower environments except through approved minimized/de-identified processes.
- CI runners have no ambient production network reachability. Deployment uses narrowly scoped, short-lived, audited credentials and protected environments.
- Admin access requires approved identity, risk-appropriate MFA/step-up, time-bound privilege and audit. No public database administration endpoint.
- Tenant isolation is enforced at application/data layers as well as network layers; segmentation does not replace BOLA/IDOR checks.
- Emergency access is approved, attributable, time-limited, alerted and reviewed after use.

## 10. Future sandbox — hard enablement gate

Execution stays disabled until E9, L13–L15 and E15 approval. A validated future runtime must be disposable per job and have:
- No route to application, data, worker, control-plane, host management, metadata or other-tenant networks.
- No host networking, privileged mode, host socket, host mounts, shared writable volumes or ambient cloud credentials.
- Default-deny ingress/egress; no public listener or tenant-to-tenant route.
- Only a narrow bounded job-control channel; no general control-plane API.
- CPU, memory, process, disk, file-descriptor, wall-time and output limits; network limits if controlled egress is ever approved.
- Per-job tenant identity, minimal ephemeral credentials if unavoidable, short lifetime and complete cleanup.
- Pinned/provenanced images, patch policy, execution audit and escape/egress monitoring.
- Independent tests for host escape, metadata/private IP access, cross-tenant access, exfiltration and resource exhaustion.

Any uncertain isolation, policy drift or failed check keeps execution disabled or terminates the job. Sandbox must never share production application credentials or trust zone.

## 11. Availability and DoS controls

- Layer edge, route, identity, worker and provider quotas; distinguish anonymous/authenticated budgets.
- Bound request/upload/archive expansion, decompression ratio, response, pagination, query complexity, concurrency, execution time and output.
- Stream large uploads/downloads with backpressure; avoid unbounded memory buffering.
- Enforce per-user, per-plan and global AI/search/code-analysis budgets server-side.
- Protect authentication/recovery against credential stuffing and enumeration without attacker-triggered permanent lockout.
- Use bounded retries with jitter, queue depth limits, circuit breakers and dead-letter quarantine.
- Shed non-critical work during overload; preserve payment/progress integrity and never bypass authorization.
- Provider outage must not cause retry storms or false financial state; reconcile unknown payment outcomes.
- DDoS/CDN/WAF provider capabilities and commercial limits remain vendor-selection work; document tested capacity and escalation before launch.

## 12. Telemetry and incident response

Collect minimum necessary metadata and protect log access. Never log credentials, authorization headers, cookies, payment secrets or unnecessary bodies.

Required signals:
- Ingress TLS failures, invalid host/method, rejected sizes, rate limits, origin bypass attempts, anomalous traffic and 4xx/5xx spikes.
- Egress denied destinations, unexpected protocols/ports, DNS anomalies, metadata/private-range attempts, unusual volume and provider failures.
- East-west denied connections, unexpected DB/queue access, new listeners, service identity anomalies and cross-environment traffic.
- DNS record changes, resolver anomalies, NXDOMAIN spikes and dangling targets.
- Firewall/policy drift, certificate expiry/rotation failures, privileged access and deployment identity anomalies.
- Sandbox internal/metadata attempts, unexpected egress, cross-tenant routes, resource-limit breaches and escape indicators.

Centralize security events with synchronized timestamps and correlation IDs. E12 defines severity, owner, runbook, escalation and evidence retention. Alert on telemetry gaps and policy drift; missing logs are not proof of no attack. Containment must support credential revocation, workload/zone isolation, route/provider disablement, destination blocking, certificate/secret rotation and forensic preservation. Network changes are versioned, reviewed, attributable and rollback-capable.

## 13. Fail-closed matrix

| Failure | Required behavior |
|---|---|
| TLS/certificate validation fails | Stop; no downgrade or validation bypass |
| DNS resolves to prohibited/ambiguous IP | Reject connection/fetch |
| Egress policy unavailable | Deny new unapproved flows |
| Origin cannot authenticate edge | Reject request |
| Identity/authorization unavailable | Deny protected operation |
| Invalid/replayed webhook | Reject/quarantine; no state transition |
| Private data endpoint unreachable | No public fallback |
| Telemetry unavailable | Alert; pause high-risk actions per E12 |
| Sandbox isolation uncertain | Keep execution disabled/terminate job |
| Rate-limit state unavailable | Conservative bounded fallback, never unlimited |

## 14. Ownership and integration

| Owner | Responsibility |
|---|---|
| Platform/Infrastructure | Zones, ingress/egress, DNS, TLS, segmentation and network telemetry |
| D6 Identity | Principal/session and workload identity; not firewall policy |
| D3/D5 API | Request validation and authorization; never assume private network means permission |
| Domain modules | Resource ownership, state transitions and data minimization |
| D13 | Queue access, retry/replay and event integrity |
| D9 AI | Approved provider adapter and bounded egress needs |
| D12 Payments | Callback verification and financial authority; not source-IP trust |
| D11 Admin | Privileged workflow and access approval; no direct public DB access |
| E9/Playground | Runtime isolation and job limits |
| E12 | Alerts, incident response and evidence |
| E14/E15 | Independent verification and final security acceptance |

## 15. Network flow register

Every production flow must record: flow ID; source zone/workload identity; destination zone/service/hostname and service identity; direction/protocol/port; encryption/authentication; purpose/data class/expected volume; environment; owner/approver/review expiry; enforcement point/config evidence; logging/alert; failure behavior and rollback.

Baseline: deny all inbound and outbound flows absent from the approved version-controlled register. Temporary rules require owner, expiry, approval and audit evidence.

The companion control matrix has 32 requirements. The verification catalog has 30 future scenarios. Neither represents deployed control evidence.

## 16. Deferred decisions

Hosting vendor/region/account topology; edge/CDN/WAF/DDoS and origin-auth method; DNS registrar/resolver/DNSSEC; certificate authority and mTLS approach; subnet/CIDR/routes/firewall/private endpoints; service identity technology if services split; flow-log/SIEM platform and retention; provider endpoint allowlists; sandbox technology/package mirror/possible controlled egress; capacity/rate limits/SLO/incident escalation; legal and payment-network obligations.

Decisions require deployment constraints, due diligence, cost/operability review and E12/E14 evidence. Do not infer them from this logical design.

## 17. Future verification plan

The 30-scenario catalog covers endpoint/origin exposure; TLS; host/framing/rate/CORS/CSRF; public data exposure and least privilege; environment and CI isolation; egress/SSRF/redirects/IPv4/IPv6/metadata/DNS rebinding; DNS takeover; webhook boundaries; worker access; sandbox isolation; DoS; telemetry, drift, containment and rollback.

Tests are specified, **not executed**. E14 must record environment, date, tool/version, result, evidence and remediation. E15 independently reviews critical controls and residual risks.

## 18. Exit criteria and conclusion

- [x] E1 threats mapped to network controls.
- [x] Zones, permitted-flow principles and ownership defined.
- [x] Ingress, TLS, east-west, data-plane and egress requirements defined.
- [x] SSRF, DNS, metadata and provider boundaries addressed.
- [x] Environment, control-plane and sandbox isolation specified.
- [x] DoS, telemetry, incident containment and fail-closed behavior specified.
- [x] Control matrix and verification catalog versioned.
- [x] Vendor/topology choices explicitly deferred.
- [x] Tracker, constitution and decision log updated.
- [ ] Infrastructure configured and independently verified — pending implementation/operations.
- [ ] E14 tests executed and E15 approval — pending.

**Conclusion:** E2 establishes a provider-neutral network protection baseline with deny-by-default, explicit owned flows and observability. It does not authorize production deployment, public exposure, payment/AI activation or code execution. No network infrastructure/control was configured or validated. **Next: E3.**
