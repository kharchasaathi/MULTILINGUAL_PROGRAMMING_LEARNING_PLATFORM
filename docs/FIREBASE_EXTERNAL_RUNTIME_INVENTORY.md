# Firebase and External Runtime Inventory

**Inventory status: BASELINE RECORDED — OWNER VERIFICATION REQUIRED**  
**Last evidence review:** 2026-11-12  
**Purpose:** Establish every cloud service and external runtime that may store data, execute application code, authenticate users, deliver traffic, or support recovery. This document deliberately distinguishes confirmed evidence from selected/planned services and unknown runtime facts.

## 1. Executive status

### Firebase App Check — owner screenshot reviewed

- App Check console shows the initial “Get started” screen.
- No Firebase apps are evidenced as registered with App Check, and no enforcement status/configuration is shown in this view.
- App Check is therefore not configured/enforced based on the supplied screenshot; do not infer backend protection is active.
- No App Check provider was selected and no enforcement setting was changed during this review.
- Screenshot evidence received in chat on 2026-11-12.



### Cloud Functions for Firebase — owner screenshot reviewed

- Functions console shows an “Upgrade project” prompt and explicitly states that Functions requires a billing account (Blaze).
- Current project tier shown: Spark (no-cost). No deployed Functions are evidenced in this console view.
- No Blaze upgrade or function deployment was performed during this review.
- Any future Blaze upgrade or deployment requires separate explicit approval after cost, region, runtime, IAM and security review. Do not upgrade solely to complete this inventory.
- Screenshot evidence received in chat on 2026-11-12.



### Firebase Hosting — owner screenshot reviewed

- Hosting console shows the initial “Get started” screen; no Hosting site is evidenced as provisioned in this project view.
- The console notice states that from October 2026, default Hosting site provisioning is on-demand and an action may be required for programmatic deploys to new projects.
- Project billing tier visible: Spark (no-cost). No Hosting site was created and no deployment was run during this review.
- This is distinct from the two default Firebase domains listed under Authentication authorized domains; their presence does not prove a Hosting site is provisioned or deployed.
- Screenshot evidence received in chat on 2026-11-12.



### Cloud Storage for Firebase — owner screenshot reviewed

- Storage console shows an “Upgrade project” prompt and explicitly states that Storage requires a billing account (Blaze).
- Current project tier shown: Spark (no-cost). No Firebase Storage bucket is evidenced as provisioned in this view.
- Firebase Storage is therefore **not currently provisioned/available on the shown plan**. This does not affect the separate Backblaze B2 backup bucket already used for E13.
- No Blaze upgrade was performed or requested. Do not upgrade solely to complete this inventory; any future billing change requires a separate explicit cost/architecture approval.
- Screenshot evidence received in chat on 2026-11-12.



### Firebase Realtime Database — owner screenshot reviewed

- Realtime Database product page shows the initial “Create Database” action.
- No Realtime Database instance is evidenced as created for this Firebase project in the supplied console view.
- Project billing tier visible on the page: Spark (no-cost).
- No database instance was created and no billing plan was upgraded during this review.
- Screenshot evidence received in chat on 2026-11-12.



### Cloud Firestore — owner screenshot reviewed

- Firestore product page shows the introductory screen with a “Create database” action.
- No Firestore database is currently evidenced as created for this project in the supplied console view.
- Project billing tier visible on the page: Spark (no-cost).
- No database was created and no billing plan was upgraded during this review.
- Screenshot evidence received in chat on 2026-11-12.



### Firebase Authentication — authorized domains reviewed

- Authorized domains visible in Firebase console: `localhost`, `multilingual-learning-52e24.firebaseapp.com`, and `multilingual-learning-52e24.web.app`.
- The two Firebase Hosting default domains are present in the Authentication authorized-domain list. This proves authorization for authentication redirects, not that a Hosting deployment/site is active or serving the app.
- No custom domain is visible in the supplied screenshot.
- No domain was added or removed during review.
- Screenshot evidence received in chat on 2026-11-12.

### Firebase Authentication — sign-in methods reviewed

- Sign-in providers shown as **Enabled**: Email/Password and Google.
- Provider selection dialog shows check marks for Email/Password and Google; other listed providers (Phone, Anonymous, Facebook, Play Games, Game Center, Apple, GitHub, Microsoft, Twitter and Yahoo) were not shown as enabled. OpenID Connect and SAML are shown as locked/upgrade-gated options.
- SMS Multi-factor Authentication panel shows an “Upgrade to enable” prompt. MFA is therefore not evidenced as enabled; do not infer that MFA is configured.
- Project billing tier visible in console: Spark (no-cost). No upgrade was performed or recommended as part of this inventory.
- This establishes console provider configuration only. The project currently has zero Authentication users in the previously reviewed Users tab; actual web-app SDK integration and sign-in flow still need code/runtime verification.
- Screenshot evidence received in chat on 2026-11-12. No provider was enabled or modified during review.

### Firebase Authentication — owner screenshot reviewed

- Firebase Authentication console page is accessible for project `multilingual-learning-52e24`.
- The Users tab displays: “No users for this project yet”. Observed user count: zero at screenshot time.
- This confirms the Authentication product console is available, but does not establish that a sign-in provider is enabled or that application runtime sign-in is integrated.
- Sign-in methods, authorized domains, MFA and SDK/runtime integration remain unverified. No user account was created and no provider setting was changed.
- Screenshot evidence received in chat on 2026-11-12. No user-level identifiers are copied into this inventory.

### Firebase project identity — owner screenshot reviewed

- Project display name: `Multilingual Learning`.
- Firebase Project ID: `multilingual-learning-52e24`.
- Environment type in console: `Unspecified` (owner has not classified it as development, staging, or production).
- One registered Web App is visible: nickname `multilingual-learning-web`.
- The Web App panel displays a `Link to a Firebase Hosting site` action. This indicates this Web App is not currently shown as linked to a Hosting site in this panel; it does **not** prove that Firebase Hosting is disabled or that no Hosting site exists.
- The screenshot does not establish Authentication providers, database instances, Storage buckets, deployed Functions, or actual production traffic.
- Screenshot evidence received in chat on 2026-11-12. Support-account email and other unnecessary personal details are intentionally not copied into this inventory.



The currently inspected `main` branch contains the E13 backup workflows and evidence, but no Firebase application configuration, deployment manifest, Firebase project inventory, or production runtime deployment evidence. Therefore this inventory cannot truthfully declare Firebase or the production external runtime fully verified yet.

| Component | Current evidence-based status | What is known | What remains to verify |
|---|---|---|---|
| Firebase Authentication | CONSOLE CONFIGURATION PARTIALLY VERIFIED; ZERO USERS OBSERVED | Email/Password and Google enabled; zero users observed; authorized domains are localhost, multilingual-learning-52e24.firebaseapp.com and multilingual-learning-52e24.web.app; SMS MFA shows upgrade-to-enable | Verify SDK/runtime integration, user account linking/actions, password policy, SMS region policy and deployed app sign-in flow |
| Cloud Firestore | NOT CREATED / NOT EVIDENCED AS ACTIVE | Console shows the initial “Create database” screen; Spark plan visible | No current database, region, collections, rules or indexes to inventory; creation requires a separate approved design decision |
| Realtime Database | NOT CREATED / NOT EVIDENCED AS ACTIVE | Console shows the initial “Create Database” screen; Spark plan visible | No instance, region, rules or data flows to inventory; creation requires a separate approved architecture decision |
| Cloud Storage for Firebase | NOT PROVISIONED; BLAZE UPGRADE REQUIRED BY CONSOLE | Storage page shows “Upgrade project” and states a billing account (Blaze) is required; project is Spark | No Firebase Storage bucket to inventory; no upgrade authorized. Backblaze B2 is a separate service and remains the E13 backup target |
| Firebase Hosting | LINKAGE NOT SHOWN FOR THE REGISTERED WEB APP; PRODUCT STATUS UNKNOWN | General settings shows a “Link to a Firebase Hosting site” action for the web app | Inspect Hosting product directly for sites, domains and deployments; do not infer Hosting is disabled |
| Firebase App Hosting | NOT EVIDENCED | No deployment evidence | Whether enabled; backend/region; connected repository and build identity |
| Firebase Cloud Functions | NOT EVIDENCED | No function deployment evidence | Whether enabled; functions/regions/runtime/service accounts/secrets |
| Firebase Cloud Messaging | NOT EVIDENCED | No push integration evidence | Whether enabled; sender/project configuration; token handling |
| Firebase Analytics / Crashlytics / Performance | NOT EVIDENCED | No SDK or console evidence | Whether SDKs are present and what data is collected |
| GitHub repository | CONFIRMED | Project source and E13 workflows are in GitHub | Branch protections, required reviewers, token/app permissions, backup/export and recovery owner |
| GitHub Actions | CONFIRMED — TEST RUNNER | Disposable Ubuntu runner executed PostgreSQL 16 + pgBackRest live B2 backup/restore/PITR test; run 43207714271 | Production workload execution? scheduled jobs? runner permissions, artifact retention, alerting |
| Backblaze B2 | CONFIRMED — BACKUP TEST TARGET | Private bucket `kharchasaathi-e13-backup-primary`, region `eu-central-003`; E13 live synthetic backup and PITR passed | Production backup source, bucket ownership/account recovery, key custody/rotation, retention approval, monitoring, independent recovery |
| PostgreSQL production database | NOT EVIDENCED | PostgreSQL 16 disposable CI cluster tested successfully | Actual production host/service, version, region, owner, database names, data volume, HA, backups, network access, restore procedure |
| DNS / domain registrar | UNKNOWN | No deployment evidence in inspected branch | Registrar, DNS provider, zones, records, account owners, DNSSEC, recovery |
| CDN / WAF / edge protection | UNKNOWN | No deployment evidence | Provider, protected domains, rules, origin restrictions, TLS |
| Email / SMS provider | UNKNOWN | No deployment evidence | Provider, sender domains/numbers, API credentials custody, bounce/abuse controls |
| Payment / finance integrations | UNKNOWN | No deployment evidence | Provider, environment, webhook endpoints/signature validation, PCI scope, secrets |
| Monitoring / logging / alerting | NOT EVIDENCED | No production alert-delivery evidence | Provider, log retention, redaction, alert destinations, on-call ownership |
| Object storage other than B2 | UNKNOWN | No current runtime evidence | Any active S3/GCS/Azure/other buckets and their data classifications |
| External APIs / OAuth providers | UNKNOWN | No current runtime evidence | Complete provider list, scopes, service identities, callback URLs, rotation owners |

## 2. Confirmed E13 runtime evidence

- GitHub Actions run [43207714271](https://github.com/kharchasaathi/MULTILINGUAL_PROGRAMMING_LEARNING_PLATFORM/actions/runs/43207714271) passed the synthetic live B2 integration.
- Test used PostgreSQL 16 and pgBackRest 2.50 on a disposable GitHub-hosted Ubuntu runner.
- B2 repository used the private bucket `kharchasaathi-e13-backup-primary`, region `eu-central-003`.
- Test repository prefix was isolated per run: `/pgbackrest/e13-live-test/43207714271-1/`.
- Full physical backup, WAL archive, B2 restore and timestamp PITR assertions passed.
- Backup invocation used `--no-expire-auto`; complete live job log had no `expire command begin/end`.
- This validates the test path only. It does not prove a production PostgreSQL instance or production Firebase services exist or are configured.

## 3. Required Firebase console verification

An authorized project owner must inspect Firebase Console and record, without sharing secret values:

1. Firebase project display name and Project ID.
2. Project settings: project number, default resource location, registered web/android apps and package/bundle IDs.
3. Authentication: enabled sign-in providers, authorized domains, MFA settings, account/user count (aggregate only), service accounts and identity integration.
4. Firestore: enabled/disabled, database ID, location, collections (names only), security rules status, indexes, backup/PITR configuration.
5. Realtime Database: enabled/disabled, instance URL (URL may be recorded if non-sensitive), location, rules.
6. Storage: enabled/disabled, bucket name and location, rules, lifecycle/retention, billing plan. Do not upgrade billing as part of inventory.
7. Hosting/App Hosting: sites, custom domains, connected repositories, deployment targets and last deploy.
8. Functions/Cloud Run: deployed services, regions, runtime versions, service accounts, secrets references and ingress.
9. FCM/Analytics/Crashlytics/Performance: enabled/disabled and app SDK presence.
10. IAM: privileged principals, service accounts, key creation policy and least-privilege review. Never export or paste private keys.

## 4. Required external runtime verification

For each active external provider, capture only non-secret metadata:

- provider/service name and purpose;
- production vs staging vs development;
- owning account/team and recovery owner;
- project/account/tenant identifier (non-secret);
- region/data residency;
- public domains/endpoints;
- data classes stored or processed;
- authentication method and secret storage location (never secret values);
- network ingress/egress and webhook/callback dependencies;
- backup, retention, export and restore capability;
- monitoring, alert destination and escalation owner;
- billing/cost owner and quota limits;
- decommission/exit procedure.

## 5. Evidence rules and completion gates

- Do not mark a service ACTIVE solely because it was selected in a plan.
- Do not infer that a service is disabled merely because its configuration is absent from Git.
- Console screenshots or exported non-secret configuration must support each ACTIVE/DISABLED assertion.
- Do not include API keys, service-account JSON, passwords, B2 application keys, encryption passphrases, OAuth client secrets, access tokens, private URLs containing credentials, or personal user records in this document.
- Use aggregate counts and redact email addresses and identifiers.
- No Firebase Blaze upgrade, paid service activation, database creation, migration, key rotation, deletion, or production configuration change is authorized by this inventory task.
- Mark this inventory COMPLETE only when the owner has reviewed all Firebase products and external providers, attached evidence references, and explicitly confirmed that no additional runtime exists.

## 6. Owner evidence still required

**Current state: INCOMPLETE — verification evidence required.**

The next input needed is a Firebase Console project overview screenshot (Project settings / General) with sensitive identifiers and email addresses redacted. Then review Authentication, Firestore, Realtime Database, Storage, Hosting, Functions and IAM one at a time. If a product is not used, record it as DISABLED only after confirming that in the console.

Do not send any secret values or user-level personal data.
