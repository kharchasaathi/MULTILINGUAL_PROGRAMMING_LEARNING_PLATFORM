# Security Constitution
Status: Baseline policy; E1 architecture-level threat model completed. Detailed control design and security approval remain pending E2–E15.

## Threat model baseline
The platform-wide threat model is documented in `docs/E1_SYSTEM_SECURITY_THREAT_MODEL.md`; the machine-readable register is `docs/E1_THREAT_REGISTER.csv`. The model covers seven trust boundaries (client, public edge/API, application modules, data/events, external providers, future sandbox and privileged operations), asset classification, threat actors, STRIDE analysis, 30 tracked threats, D15 gate mapping, monitoring indicators and residual-risk conditions. E1 is design-time analysis only; it does not prove that controls are implemented or effective. Update the model whenever a trust boundary, data flow, provider, privileged capability or execution runtime changes.

## Principles
Secure by default, least privilege, defense in depth, privacy by design, and fail closed. Treat browser input, uploads, learner code, AI output, retrieved content, and third-party responses as untrusted.

## Identity and access
Use established authentication protocols and secure session handling. Never invent cryptography. Enforce authorization on every protected server operation. Separate learner, author, reviewer, and administrator privileges. Protect recovery and privileged actions.

## Application, API, and data
Validate inputs at trust boundaries; use versioned schemas, parameterized database operations, context-aware output encoding, rate limits, request-size limits, and safe error messages. Keep secrets server-side. Encrypt transport and use managed encryption at rest where available. Minimize personal data and define retention/deletion policies before launch. Log security events without credentials or unnecessary sensitive data.

## AI safety
Treat prompts, retrieved documents, code, and tool outputs as untrusted data, not policy instructions. Constrain tools and permissions. Prevent cross-user data exposure, secret disclosure, and unauthorized actions. Evaluate prompt injection and data-exfiltration risks.

## Learner code execution
Never run untrusted code in the main application process or privileged backend. Use isolated, disposable environments with strict CPU, memory, time, process, filesystem, and network controls. Deny network access by default. Patch runtimes and test isolation boundaries before enabling execution.

## Operations
Dependency and secret scanning; backups and recovery drills; incident response; monitoring; rollback; threat models and security acceptance tests for high-risk modules. No production launch before security review.

## Decisions still required
Authentication provider, data classification, retention, key management, sandbox technology, logging, incident process, and applicable compliance obligations.


## Risk acceptance and enablement gates
- A documented mitigation is not evidence that a control is deployed or effective.
- Critical risks require explicit disablement or isolation until independently tested and approved. Learner code execution remains disabled until E9, L13–L15 and E15 approval.
- High residual risks require a named owner, documented business rationale, compensating controls, expiry/review date and E15 approval; do not silently accept them.
- Protected actions fail closed when identity, authorization, ownership, signature verification or policy evaluation is unavailable.
- Threat register updates and control evidence are versioned. Security exceptions and emergency actions require attributable, audited approval.
