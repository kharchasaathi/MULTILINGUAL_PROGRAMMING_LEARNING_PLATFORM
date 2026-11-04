# Security Constitution
Status: Baseline policy; detailed threat model pending.

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
