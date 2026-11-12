# Firebase and External Runtime Inventory

**Inventory status: BASELINE RECORDED — OWNER VERIFICATION REQUIRED**  
**Last evidence review:** 2026-11-12  
**Purpose:** Establish every cloud service and external runtime that may store data, execute application code, authenticate users, deliver traffic, or support recovery. This document deliberately distinguishes confirmed evidence from selected/planned services and unknown runtime facts.

## 1. Executive status

### Firebase Web App registration and repository comparison — reviewed

- Firebase Console shows one registered Web App with nickname `multilingual-learning-web` under project `multilingual-learning-52e24`.
- The Web App ID is visible in the owner screenshot; no API key or SDK config values were copied into this inventory.
- The SDK setup panel offers npm, CDN and Config setup choices; npm is selected in the screenshot. This is setup guidance, not proof that the SDK is installed or initialized in the application.
- The console shows a “Link to a Firebase Hosting site” action. Hosting linkage/deployment is not evidenced by this view.
- Repository inspection of the `main` branch found only 13 tracked tree entries, with no application source tree, package manifest, Firebase SDK initialization/configuration, or deployed app code to compare. GitHub code searches for `firebase initializeApp`, `firebaseConfig`, and `getAuth initializeApp` returned no matches.
- Therefore Web App registration is verified, but SDK/runtime integration remains **UNVERIFIED / NOT PRESENT IN INSPECTED REPOSITORY**. This does not prove the app is not hosted elsewhere; it means no evidence is present in this repository snapshot.
- Screenshot and repository evidence reviewed on 2026-11-12.



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

The Firebase Project Settings / General, Authentication, Firestore, Realtime Database, Storage, Hosting, Functions and IAM product screenshots have been reviewed in this conversation on 2026-11-12. The Firebase / Google Cloud IAM evidence is summarized in Section 7 below. The remaining owner verification is limited to external provider inventory, unresolved Firebase identity-count discrepancy, and any console sections not yet evidenced (including App Hosting, FCM/Analytics/Crashlytics/Performance and effective IAM policy details).

Do not send any secret values or user-level personal data.

## 7. Firebase / Google Cloud IAM evidence — owner screenshots reviewed (2026-11-12)

Project: **Multilingual Learning**  
Firebase Project ID: `multilingual-learning-52e24`

### 7.1 Google Cloud Service Accounts list

- The Google Cloud IAM & Admin → Service Accounts list screenshot shows one listed account:
  `firebase-adminsdk-fbsvc@multilingual-learning-52e24.iam.gserviceaccount.com`.
- Display name: `firebase-adminsdk`; description: `Firebase Admin SDK Service Agent`; status: **Enabled**.
- The list's Key ID column shows **No keys**.
- The account details page also shows Enabled status.
- The account's Keys tab displays **No rows to display**. This supports the conclusion that no user-managed key is listed for this service account at the time of review. It does not prove that no credentials of any other kind exist.
- Advanced Settings displays Domain-wide Delegation and Google Workspace Marketplace OAuth Client informational warnings/options. The screenshots do not show either feature as configured/enabled. Do not infer activation from the warning panels.

### 7.2 Service-account access and project IAM principals

- The Service Account → Principals with access tab shows two principals with access to this service account: the project owner account (Owner (Legacy)) and the Firebase Admin SDK service account itself (Service Account Token Creator). This is the visible list in the supplied screenshot.
- Project IAM → View by principals shows two project-level principals:
  1. The owner's Google account, with **Owner (Legacy)**.
  2. The Firebase Admin SDK service account, with **Firebase Admin SDK Administrator Service Agent**, **Firebase Authentication Admin**, and **Service Account Token Creator** roles.
- Project IAM → View by roles screenshots show the same three Firebase-related roles assigned to the Firebase Admin SDK service account, and Owner (Legacy) assigned to the owner's account.
- These screenshots identify the visible principals and role names. They do not expose the complete permission definitions, inherited organization/folder grants, conditional bindings, deny policies, or effective permissions on every resource. A full least-privilege/effective-access audit is therefore still pending.
- No unknown third project-level principal is visible in the supplied Project IAM → View by principals screenshot. This is a screenshot-scoped observation, not an organization-wide identity audit.

### 7.3 Metrics

- Service Account Metrics screenshots show “No data is available for the selected time frame” for the selected **1 hour** range across service-account usage, usage per API, authentication traffic and authentication traffic per key.
- This only establishes no chart data for that selected time window. It does not prove the account has never been used.

### 7.4 Service-account count discrepancy — unresolved

- Firebase Project Settings → Service Accounts previously displayed a link labeled **“2 service accounts”**.
- The subsequent Google Cloud IAM & Admin → Service Accounts list screenshot displayed only the single Firebase Admin SDK service account listed above.
- Project IAM → View by principals displayed two principals total, one human owner and one service account. This is not a count of service accounts.
- The reason for the Firebase “2 service accounts” label versus the one visible Google Cloud service-account row has not been established. Do not state that a second service account is absent or identify it without further evidence. Resolve by inspecting the Firebase service-account page's full account list/linked Google Cloud view, including filters and pagination, or by obtaining a non-secret service-account inventory from the project owner.

### 7.5 IAM security disposition

- **No IAM changes were made** during this evidence review.
- Do not disable/delete the Firebase Admin SDK service account or remove its Firebase-managed roles based solely on these screenshots.
- No user-managed key creation is indicated or required for this inventory.
- Owner (Legacy) is a highly privileged role. Retain only while operationally required; ensure the owner Google account has strong authentication (including 2-Step Verification) and avoid using Owner for routine application/runtime identities.
- Before any role reduction, first validate the project’s actual runtime integrations and the exact role permissions/dependencies. Any permission change requires a separately reviewed change plan and explicit owner approval.

### 7.6 Updated evidence-based status

| Component | Updated status | Evidence / remaining limitation |
|---|---|---|
| Project IAM principals | SCREENSHOT-VERIFIED: 2 VISIBLE | Owner + Firebase Admin SDK service account; no third principal visible in supplied view |
| Owner role | SCREENSHOT-VERIFIED | Owner (Legacy) assigned to owner's Google account |
| Firebase Admin SDK roles | SCREENSHOT-VERIFIED: PRINCIPAL IDENTIFIED | Three role names assigned to Firebase Admin SDK service account; effective permission analysis pending |
| Google Cloud Service Accounts list | SCREENSHOT-VERIFIED: 1 VISIBLE | One enabled Firebase Admin SDK service account row |
| User-managed service-account keys | NONE SHOWN | Key ID column says “No keys”; Keys tab has no rows |
| Service-account metrics | NO DATA IN SELECTED 1-HOUR WINDOW | Historical usage outside that window remains unknown |
| Firebase “2 service accounts” label | UNRESOLVED DISCREPANCY | Do not infer a second account is absent |
| Full IAM least-privilege audit | PENDING | Need effective permissions, inherited grants, conditions and policy review |

### 7.7 Remaining completion gates

1. Resolve the Firebase “2 service accounts” label versus the single visible Google Cloud Service Accounts row.
2. Inspect effective IAM permissions and inherited grants; do not modify roles during inventory.
3. Complete owner confirmation of external providers: PostgreSQL host, DNS/domain registrar, email/SMS, CDN/WAF, monitoring/logging, payment integrations and any additional APIs/object storage.
4. Verify any remaining Firebase products not yet evidenced, including App Hosting, FCM, Analytics, Crashlytics and Performance Monitoring.
5. Attach evidence references or dated evidence notes for each active/disabled external runtime.
6. Obtain explicit owner confirmation that the inventory of external services is complete.

Until these gates are satisfied, keep Inventory status **INCOMPLETE**. No Firebase Blaze upgrade, paid service activation, database creation, key creation, role modification or production configuration change is authorized by this inventory update.

## 8. Follow-up audit disposition — 2026-11-12

### 8.1 Effective permissions audit: evidence-bounded result

**Result: PARTIALLY REVIEWED — NOT A COMPLETE EFFECTIVE-PERMISSIONS AUDIT.**

Evidence now available:
- Project-level IAM screenshot shows two visible principals: the owner account and the Firebase Admin SDK service account.
- The owner has Owner (Legacy).
- The Firebase Admin SDK service account has the three role bindings listed in Section 7.
- Service Account → Principals with access shows the owner and the same service account in the supplied view.
- The Service Account Keys page and list show no user-managed keys for the listed account.

What cannot be established from these screenshots:
- Effective permissions after inherited organization/folder/project/resource-level grants.
- IAM Conditions, Deny policies, principal access boundaries, organization policies or cross-project grants.
- The exact permissions included in each role and whether each permission is exercised by current runtime code.
- Whether additional principals are hidden by filters, organization-level policy, or a different project/resource scope.

No direct Google Cloud IAM Policy Analyzer/API result was available in this review. Therefore this is a screenshot-based role-binding review, not a certified least-privilege or effective-access audit. No IAM role changes are recommended from the available evidence.

### 8.2 Second service-account discrepancy: unresolved, bounded finding

Evidence:
- Firebase Project Settings → Service Accounts showed a link labeled “2 service accounts”.
- Google Cloud IAM & Admin → Service Accounts showed one visible row, the enabled Firebase Admin SDK service agent, with “No keys”.
- Project IAM → View by principals showed two principals total: one human owner and one service account. This is not a service-account count.

Finding:
- The screenshots do not establish what Firebase's “2 service accounts” count refers to. It may refer to a different grouping or managed identity listing, but that would be speculation.
- The only service account positively identified in the supplied Google Cloud Service Accounts list is the Firebase Admin SDK service agent.
- Do not mark a second account as absent, and do not create/delete/disable any account to reconcile the count.

Closure evidence required:
- Open the Firebase “2 service accounts” link and capture the resulting full list/page title and all visible entries; or provide a non-secret service-account inventory export from the exact project. Include active filters and pagination state. Never provide key material.

### 8.3 External providers inventory: evidence collected

| Provider / service | Evidence-based classification | Known details | Remaining owner/runtime verification |
|---|---|---|---|
| GitHub | CONFIRMED — source control | Repository MULTILINGUAL_PROGRAMMING_LEARNING_PLATFORM; working branch docs/project-foundation | Confirm repository owner/recovery owner, branch protection, app/token scopes and production deployment use |
| GitHub Actions | CONFIRMED — CI/test execution | Disposable GitHub-hosted runner used for PostgreSQL 16 + pgBackRest + B2 synthetic integration/PITR test; run 43207714271 recorded earlier in this inventory | Confirm whether any production workload or scheduled jobs run here; review permissions, environments, secret custody, artifact retention and alerting |
| Backblaze B2 | CONFIRMED — E13 backup test target | Private bucket kharchasaathi-e13-backup-primary; region eu-central-003; endpoint s3.eu-central-003.backblazeb2.com; isolated test prefix /pgbackrest/e13-live-test/43207714271-1/ in the documented successful synthetic run | Confirm account owner/recovery contact, production source/backup scope, key custody and rotation, retention/lifecycle policy, monitoring and independent recovery |
| PostgreSQL | TEST RUNTIME CONFIRMED; PRODUCTION HOST UNKNOWN | PostgreSQL 16 disposable CI database used in integration/PITR validation | Production provider, region, version, owner, HA, network controls, data classification, backup schedule and restore evidence |
| Firebase Authentication | CONSOLE CONFIG PARTIALLY VERIFIED | Project multilingual-learning-52e24; Email/Password and Google providers enabled in prior screenshots; zero users observed at screenshot time | Verify actual app SDK integration, sign-in flow, account lifecycle, abuse controls and production use |
| Firebase Hosting | NOT PROVISIONED IN EVIDENCE REVIEW | Hosting console showed Get Started; registered Web App panel showed Link to a Firebase Hosting site | Recheck current Hosting sites/domains/deployments only if the project intends to use Firebase Hosting |
| Firebase Storage / Functions | NOT PROVISIONED IN EVIDENCE REVIEW; BLAZE PROMPT SHOWN | Console showed upgrade-to-Blaze prompt for Storage and Functions; no deployment/bucket shown | No upgrade approved. Reassess only after a documented feature/runtime requirement and cost review |
| DNS / domain registrar | UNKNOWN | No provider/domain ownership evidence in inspected repository | Owner must identify registrar, DNS host, zones, records, DNSSEC and account recovery |
| CDN / WAF | UNKNOWN | No provider or deployment evidence | Owner must confirm whether used; if yes, provider, protected domains, rules, TLS and origin controls |
| Email / SMS delivery | UNKNOWN | No external delivery provider evidenced; Firebase Email/Password and Google sign-in are console providers, not proof of transactional email/SMS delivery | Owner must identify provider(s), sender identity, credentials custody and delivery/abuse controls |
| Monitoring / logging / alerting | NOT EVIDENCED | No production alert-delivery evidence found in reviewed inventory/repository evidence | Owner must identify provider, data retention/redaction, alert destination and response owner |
| Payments / finance APIs | UNKNOWN | No current Learning Platform payment provider evidenced | Confirm none, or list providers, webhook endpoints/signature validation and secrets custody |
| Other external APIs / object storage | UNKNOWN | No additional active runtime evidence in inspected files; B2 is the only evidenced object-storage target in E13 | Owner to confirm complete provider list and data flows |

**Important separation:** Backblaze B2 is confirmed as an E13 synthetic backup test target; this does not establish that a production PostgreSQL database exists or that production backups are running. The successful disposable CI test is not production deployment evidence.

### 8.4 Final owner confirmation: not yet attestable

The repository and screenshots do not allow the assistant to make an owner attestation on the user's behalf. The owner must explicitly confirm the completeness of the external-provider list and any services used outside this repository.

Required owner response:
- Confirm whether GitHub, GitHub Actions, Backblaze B2 and Firebase Authentication are the only services currently used for this platform/project.
- Confirm whether a production PostgreSQL host, domain/DNS provider, email/SMS provider, CDN/WAF, monitoring/alerting provider, payment provider, or any other API/object storage exists.
- If any exist, identify provider and environment only; do not provide secrets.
- Confirm whether the Firebase “2 service accounts” link has been opened and the second identity identified, or authorize leaving the discrepancy explicitly unresolved.

Until the owner supplies this attestation and the unresolved technical evidence is collected, **Inventory status remains INCOMPLETE**. This is a deliberate evidence gate, not a failed implementation.

### 8.5 No-change statement

During this follow-up:
- No Firebase billing upgrade was made.
- No Firebase product was activated.
- No service account or key was created, deleted, disabled or rotated.
- No IAM role or policy was modified.
- No production database, DNS, deployment or external provider configuration was changed.

## 9. Owner confirmation — external provider scope (2026-11-12)

**Owner confirmation received:** The owner confirms that the services currently used for this project are limited to:
- GitHub — source control
- GitHub Actions — CI/test execution
- Backblaze B2 — E13 backup test target
- Firebase Authentication — identity provider

The owner confirms that no other external providers are currently used for this project, including a production PostgreSQL host, DNS/domain provider, CDN/WAF, transactional email/SMS provider, monitoring/alerting provider, payment/finance API, or additional object-storage/API provider.

Scope qualification:
- PostgreSQL 16 exists only as a disposable CI test runtime in the evidence reviewed; no production PostgreSQL host is currently used/identified.
- Backblaze B2 is used as an E13 backup test target; this confirmation does not assert that production database backups are active.
- Firebase Authentication is currently used; other Firebase products are not assumed active merely because they appear in the console.

**Owner confirmation status: COMPLETE for the currently used external-provider list.**

### 9.1 Overall inventory disposition

Owner provider-scope confirmation is complete, and the provider list is now bounded to the four services above. The overall Firebase / External Runtime Inventory remains **INCOMPLETE** because two technical evidence gates remain:
1. The Firebase “2 service accounts” label versus one visible Google Cloud Service Accounts row remains unresolved.
2. Full effective IAM permissions (including inherited grants, conditions, deny policies and policy analyzer results) have not been verified.

Additionally, Firebase products not evidenced as active (App Hosting, FCM, Analytics, Crashlytics and Performance Monitoring) remain recorded as not evidenced, not as confirmed disabled.

No service, billing plan, IAM role, key, database, domain or runtime configuration was changed as part of this owner confirmation.
## 10. Official IAM role-definition review — 2026-11-12

Google Cloud official role documentation was reviewed for the three role names visible in the project IAM screenshots:
- Firebase Admin SDK Administrator Service Agent (`roles/firebase.sdkAdminServiceAgent`): Google describes this as read/write access to Firebase products available in the Admin SDK and warns not to grant service-agent roles to principals other than service agents.
- Firebase Authentication Admin (`roles/firebaseauth.admin`): full read/write access to Firebase Authentication resources, including authentication configuration and user operations.
- Service Account Token Creator (`roles/iam.serviceAccountTokenCreator`): allows creation of short-lived OAuth access tokens, OIDC ID tokens, signed JWTs and signed blobs for the target service account.

Official references:
- https://docs.cloud.google.com/iam/docs/roles-permissions/firebase
- https://docs.cloud.google.com/iam/docs/roles-permissions/firebaseauth
- https://docs.cloud.google.com/iam/docs/service-account-permissions

Security interpretation:
- The Firebase Admin SDK Administrator Service Agent role is consistent by name with the Firebase Admin SDK service identity shown in the screenshots. Do not remove it without dependency validation.
- Firebase Authentication Admin is broad for Authentication. Because the principal is the Firebase Admin SDK service account, its presence may be part of the managed SDK setup; actual necessity must be checked against deployed runtime use and Google-managed service-agent behavior.
- Service Account Token Creator is a sensitive impersonation/token-minting permission. The screenshots show it on the Firebase Admin SDK service account itself in the project-level role list and in the Service Account → Principals with access view. The exact binding scope and whether it is a self-binding or a resource-specific grant must be confirmed from the full IAM policy. Do not remove it based only on the role name.
- This review checked official role definitions, not the project's effective permission evaluation. It does not replace IAM Policy Analyzer, inherited-policy review, IAM Conditions/Deny analysis, or audit-log review.

Disposition: ROLE DEFINITIONS REVIEWED; EFFECTIVE IAM AUDIT REMAINS PENDING.

## 11. Google Cloud Service Accounts list — follow-up screenshot reviewed (2026-11-12)

A direct screenshot of **Google Cloud → IAM & Admin → Service Accounts** was supplied after navigating from the Firebase Project Settings “2 service accounts” link.

Observed in the Service Accounts table:
- Exactly one visible row is shown, with no visible additional rows on the captured page.
- Email: `firebase-adminsdk-fbsvc@multilingual-learning-52e24.iam.gserviceaccount.com`.
- Name: `firebase-adminsdk`.
- Description: `Firebase Admin SDK Service Agent`.
- Status: **Enabled**.
- Key ID column: **No keys**.
- The screenshot does not show an active filter or pagination controls indicating additional rows, but a single screenshot cannot prove there are no identities in another project, organization scope, or a different filtered view.

Reconciliation:
- This confirms that the Google Cloud Service Accounts list displayed **one visible service-account row** in the supplied project view.
- The Firebase Project Settings label “2 service accounts” remains unexplained. It must not be reinterpreted as two rows in the Google Cloud list.
- Project IAM’s two principals remain one human owner plus one service account; that principal count is not a service-account count.
- No second service account has been identified from the available screenshots. Do not state categorically that no second account exists.
- No service account was created, deleted, disabled or modified. No key was created or rotated.

Updated status:
| Check | Evidence-based result |
|---|---|
| Google Cloud Service Accounts list | 1 visible row in supplied screenshot |
| Listed identity | Firebase Admin SDK service account |
| Status | Enabled |
| User-managed keys | No keys shown |
| Firebase “2 service accounts” label | Still unresolved; requires explanation from exact Firebase-linked account listing or Google Cloud inventory/API evidence |

Next technical check: obtain the Firebase-linked service-account listing in a way that exposes its actual entries (for example, desktop browser/full-page view or a project-scoped service-account inventory export). Do not ask the owner to share private keys, JSON credentials, access tokens or secrets. If the Firebase label continues to resolve to the same IAM page, record the discrepancy as unresolved rather than repeatedly navigating to that page.


## 12. Policy Analyzer custom query — three role permission rows observed (2026-11-12)

Owner supplied screenshots of a Google Cloud IAM Policy Analyzer custom query with:
- Scope: project **Multilingual Learning**.
- Principal: `firebase-adminsdk-fbsvc@multilingual-learning-52e24.iam.gserviceaccount.com`.
- Advanced option: **List permissions inside roles** enabled.
- Query completed and displayed **219 result rows**, paginated as 1–50, 51–100, 101–150, 151–200 and 201–219.

Across the supplied page screenshots, the Role column visibly contains all three role names already identified in Project IAM:
1. Firebase Admin SDK Administrator Service Agent
2. Firebase Authentication Admin
3. Service Account Token Creator

Interpretation and limits:
- The 219 figure is the number of permission/result rows returned by this query, not 219 separate roles or 219 independent principals.
- The screenshots establish that Policy Analyzer expanded permission entries for all three role names for the selected principal within the selected project scope.
- The screenshots are not sufficiently legible to transcribe every permission identifier reliably. Do not infer or publish a complete permission list from these images.
- This query alone does not establish whether every listed permission is exercised by application code, nor does it prove absence of inherited/conditional/deny effects beyond the query's displayed scope and analysis semantics.
- No IAM role, binding, service account or key was modified during this query.

### 12.1 Required follow-up: inspect binding details

The result table provides a **View Binding** action on each row. Next inspect a row whose Role is **Service Account Token Creator**, and capture the binding detail panel/page showing:
- the resource/project on which the binding exists;
- all principals/members in the binding;
- any IAM condition;
- whether the selected service account is a member of its own service-account-level binding or whether this is only a project-level grant.

Do not remove or edit the binding. The purpose is to establish exact scope and membership before any security recommendation. After this, inspect the Firebase Authentication Admin binding similarly if needed.

Updated disposition: **Policy Analyzer query completed; all three role names observed among 219 permission rows; binding-scope and condition review still pending.** This is not a completed effective-access or least-privilege audit.


## 13. Service Account Token Creator binding details — owner screenshot reviewed (2026-11-12)

The owner opened **View binding** for the Policy Analyzer result row whose role was **Service Account Token Creator**.

The visible Policy binding details panel shows:
- Resource/header: **Binding for** `firebase-adminsdk-fbsvc@multilingual-learning-52e24.iam.gserviceaccount.com`.
- Role: `roles/iam.serviceAccountTokenCreator`.
- Member: `serviceAccount:firebase-adminsdk-fbsvc@multilingual-learning-52e24.iam.gserviceaccount.com`.
- No `condition` field is visible in the displayed binding JSON.

Evidence-bounded interpretation:
- This is a binding on the Firebase Admin SDK service-account resource, and the only member shown is the same service account. It is therefore a **self-binding** in the displayed resource-level policy, not evidence that another principal has Token Creator on this service account.
- The screenshot does not show any additional members in this binding.
- No condition is shown in the visible JSON. This is not a complete review of conditions or inherited grants elsewhere in the project/organization.
- The role's presence means the service account is granted the Token Creator role on itself in this resource policy. Do not overstate this as proof that an external principal can impersonate it, or as proof of exploitable privilege escalation. The exact operational necessity and Google-managed setup behavior still need validation against the Firebase Admin SDK service-agent lifecycle and audit logs.
- No policy, binding, role, service account or key was modified.

Updated status:
| Check | Result |
|---|---|
| Token Creator binding resource | Firebase Admin SDK service-account resource |
| Binding member | Same Firebase Admin SDK service account (self-binding) |
| Additional members shown | None in supplied JSON |
| IAM condition | No condition field visible in supplied JSON |
| External impersonation by another principal | Not established by this binding screenshot |
| Security disposition | Record as self-binding; retain pending Google-managed dependency validation; no change |

### 13.1 Next binding review

Inspect **Firebase Authentication Admin** using its **View Binding** action in the Policy Analyzer results. Capture the binding details showing the resource/header, role, members and any condition. Do not edit the binding. The Firebase Admin SDK Administrator Service Agent binding can be reviewed afterward if needed.


## 14. Firebase Admin SDK Administrator Service Agent binding details — owner screenshot reviewed (2026-11-12)

The owner supplied a Policy Analyzer **Policy binding details** screenshot for the Firebase Admin SDK Administrator Service Agent role.

Visible binding JSON:
- Resource/header: **Binding for** `firebase-adminsdk-fbsvc@multilingual-learning-52e24.iam.gserviceaccount.com`.
- Role: `roles/firebase.sdkAdminServiceAgent`.
- Member: `serviceAccount:firebase-adminsdk-fbsvc@multilingual-learning-52e24.iam.gserviceaccount.com`.
- No `condition` field is visible in the displayed JSON.

Evidence-bounded interpretation:
- The displayed binding is on the Firebase Admin SDK service-account resource and its only visible member is that same service account. This is a self-binding in the displayed resource-level policy.
- No additional member or condition is visible in the supplied JSON.
- This screenshot is for `roles/firebase.sdkAdminServiceAgent`, **not** `roles/firebaseauth.admin`. The Firebase Authentication Admin binding remains uninspected and must not be marked verified from this screenshot.
- No role, binding, service account or key was modified.

Updated status: Firebase Admin SDK Administrator Service Agent binding resource/member verified as a self-binding in the displayed policy; Authentication Admin binding review still pending.


## 15. Firebase Authentication Admin binding details — owner screenshot reviewed (2026-11-12)

The owner supplied a Policy Analyzer **Policy binding details** screenshot for Firebase Authentication Admin.

Visible binding JSON:
- Resource/header: **Binding for** `firebase-adminsdk-fbsvc@multilingual-learning-52e24.iam.gserviceaccount.com`.
- Role: `roles/firebaseauth.admin`.
- Member: `serviceAccount:firebase-adminsdk-fbsvc@multilingual-learning-52e24.iam.gserviceaccount.com`.
- No `condition` field is visible in the displayed JSON.

Evidence-bounded interpretation:
- The displayed binding is on the Firebase Admin SDK service-account resource and the only visible member is that same service account. This is a self-binding in the displayed resource-level policy.
- No additional member or condition is visible in the supplied JSON.
- The binding is consistent with the Firebase Admin SDK service account being granted Firebase Authentication Admin permissions on itself. The role is broad for Firebase Authentication; this screenshot does not prove which operations the application actually performs.
- No role, binding, service account or key was modified.

### 15.1 IAM binding review summary

For all three roles shown in the earlier Policy Analyzer result set, supplied binding screenshots now show:
| Role | Resource/header | Visible member | Condition shown |
|---|---|---|---|
| `roles/iam.serviceAccountTokenCreator` | Firebase Admin SDK service account | Same service account | No |
| `roles/firebase.sdkAdminServiceAgent` | Firebase Admin SDK service account | Same service account | No |
| `roles/firebaseauth.admin` | Firebase Admin SDK service account | Same service account | No |

These screenshots establish three self-bindings in the displayed service-account resource policy. They do not by themselves prove that these bindings are unnecessary, nor do they prove the absence of other project/folder/organization-level grants, conditional bindings, deny policies, or principal access boundary effects. No IAM changes are recommended from this evidence alone.

### 15.2 Remaining IAM audit work

- Review the **Policy history** tab for each binding only if needed to establish when/how the bindings changed; current screenshots show the Binding tab, not history.
- Check project/folder/organization inherited allow policies, IAM Conditions, deny policies and principal access boundary policies using the appropriate effective-access tools.
- Validate whether the Firebase-managed service-agent roles are expected for this Firebase project and whether the service account is automatically managed by Google.
- Review Cloud Audit Logs for actual service-account activity, impersonation/token creation and Firebase Admin API use, with a clearly defined time window and available log retention.
- Inspect application code/runtime configuration for Firebase Admin SDK initialization and the exact APIs used. Never share service-account private keys or secrets.
- Resolve the Firebase Settings “2 service accounts” label discrepancy separately; current Cloud Service Accounts page screenshot showed one visible row.

Audit status: three resource-level self-bindings are evidenced; overall effective IAM / least-privilege audit remains **incomplete**. No permissions or services have been changed.
