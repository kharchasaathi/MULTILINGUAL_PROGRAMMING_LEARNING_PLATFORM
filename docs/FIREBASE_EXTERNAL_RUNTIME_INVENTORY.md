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
| Cloud Firestore | NOT CREATED / NOT EVIDENCED AS ACTIVE (2026-11-26 screenshot) | Latest owner screenshot still shows the introductory “Create database” screen; Spark plan visible | No current database, region, collections, rules or indexes are evidenced; creation requires a separate approved design decision |
| Realtime Database | NOT CREATED / NOT EVIDENCED AS ACTIVE | Console shows the initial “Create Database” screen; Spark plan visible | No instance, region, rules or data flows to inventory; creation requires a separate approved architecture decision |
| Cloud Storage for Firebase | INACCESSIBLE ON CURRENT SPARK PLAN; BUCKET EXISTENCE/USAGE UNKNOWN | Latest owner screenshot shows “Upgrade project” and says a billing account (Blaze) is required; project is Spark. Firebase documentation says Spark projects cannot view or access existing buckets; existing bucket data, if any, remains inaccessible until billing is enabled | Do not infer that no bucket/data exists from the landing page. Bucket name, location, contents, usage and rules remain unverified. No upgrade authorized. Backblaze B2 is a separate service and remains the E13 backup target |
| Firebase Hosting | ACTIVE — OWNER SCREENSHOT VERIFIED 2026-11-26 | Hosting Overview shows a deployment on Nov 25, 2026 at 5:33 PM; Hosting Usage shows 998.57 MB current storage and 59.97 MB total downloads for the Nov 1–Dec 1 billing period. Project remains on Spark | Verify retained releases, per-site usage and exact current quota in Console; Hosting quota is project-level and independent of Cloud Storage and Firestore |
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


## 7. Latest owner Firebase usage screenshots and cost policy — 2026-11-26

**Evidence source:** Owner-provided Firebase Console screenshots reviewed in ChatGPT on 2026-11-26. These screenshots supersede the older 2026-11-12 Hosting and Storage observations where the evidence conflicts. They are point-in-time observations, not a live billing export.

### Project plan

- Firebase project: `multilingual-learning-52e24` (display name: `Multilingual Learning`).
- Billing plan shown in the Console: **Spark (no-cost)**.
- The owner has not authorized a Blaze upgrade, Cloud Storage activation, database creation, or any paid-service change.
- Continue on Spark unless the owner separately approves a reviewed cost and architecture proposal.

### Firebase Hosting — observed usage

- Hosting Overview screenshot shows a deployment marked **Deployed**, dated **Nov 25, 2026, 5:33 PM**.
- Hosting Usage screenshot shows **998.57 MB current Hosting storage**.
- The same Usage screen shows **59.97 MB total downloads** for the displayed **Nov 1–Dec 1 (PST)** billing period.
- The project Overview separately displays **54.1 MB downloads (7d total)**. This is a different time window and must not be added to the 59.97 MB billing-period figure.
- Firebase Hosting no-cost quota is **10 GB of storage per project** and **10 GB/month of data transfer**. At the screenshot snapshot, 998.57 MB is approximately 1 GB of the 10 GB Hosting storage allowance; roughly 9 GB remains, subject to retained releases and subsequent deploys. The 59.97 MB figure is the period's observed transfer usage; roughly 9.94 GB of the 10 GB monthly allowance remains at that snapshot.
- Hosting storage is **not a monthly-reset allowance**. It counts files belonging to current and retained previous releases. Hosting data transfer is **monthly** and resets with the billing period.
- Hosting usage is project-level across Hosting sites/channels. It is separate from Cloud Storage buckets and Firestore database storage.
- If Spark Hosting storage reaches 10 GB, new deployments are blocked until old releases are deleted or the project is upgraded. If Spark data transfer reaches 10 GB/month, sites can be disabled after the documented grace period.
- Review and limit retained releases to avoid unnecessary accumulated Hosting storage.

### Cloud Firestore — current evidence and free quota

- Latest owner screenshot shows the Firestore introductory screen with **Create database**. Therefore, no Firestore database is evidenced as created in the current screenshot; verify again before creating one.
- Standard-edition free quota: **1 GiB stored data total**, **50,000 document reads/day**, **20,000 document writes/day**, **20,000 document deletes/day**, and **10 GiB outbound data transfer/month**.
- Stored-data quota is a total storage allowance, not a fresh 1 GiB each month. Read/write/delete quotas reset daily around midnight Pacific time; outbound transfer is monthly.
- Only **one Firestore database per project** qualifies for the free quota. Additional databases and certain features (including TTL deletes, PITR, backups, restores and clones) require billing.
- Do not create Firestore solely because it is available. First approve the data model, region, security rules, indexes, access patterns, retention and expected reads/writes.
- Potential future CodeSaathi use cases, if approved: learner profiles, course progress, quiz scores and bookmarks. The current static learning-site release records lesson progress in the learner's browser; cross-device server-side progress sync is not currently included.

### Cloud Storage for Firebase — billing gate and unknown usage

- Latest owner screenshot shows **Upgrade project** and says a billing account (Blaze) is required. The project is still Spark.
- Firebase documentation states that since **February 3, 2026**, Cloud Storage for Firebase requires the Blaze pay-as-you-go plan. On Spark, the owner cannot view or access Cloud Storage buckets in Firebase or Google Cloud Console; API requests can return 402/403. Existing bucket data, if any, remains in the bucket but is inaccessible until billing is enabled.
- Therefore the screenshot does **not** prove that no bucket exists or that stored data is zero. Bucket existence, name, location, size, rules and usage remain **UNKNOWN / OWNER VERIFICATION REQUIRED**.
- No Blaze upgrade is authorized by this note.
- Firebase documents legacy `*.appspot.com` default-bucket no-cost levels on Blaze of 5 GB stored, 1 GB downloaded/day, 20,000 uploads/day and 50,000 downloads/day. Do not assume these legacy-bucket allowances apply to every newer `*.firebasestorage.app` bucket; verify the exact bucket type, location and current pricing before enabling or uploading data.
- If future uploads (course media, learner files or user-generated content) require Cloud Storage, first estimate capacity and egress, check applicable no-cost levels and regional rates, set budget notifications, and obtain the owner's explicit approval.

### Google Cloud trial credits

- The Firebase pricing page may offer eligible customers **up to $300 in Google Cloud trial credits** when starting on Blaze.
- These credits are eligibility- and trial-term-dependent. They are not a recurring monthly Firebase storage allowance and must not be treated as guaranteed or permanent free capacity.
- Confirm eligibility, expiry, payment method requirements and applicable terms in the billing account before relying on any trial credit.

### CodeSaathi architecture and cost-control decisions

1. **Stay on Spark for now.** Do not upgrade the project to Blaze or enable paid services without a separate explicit owner approval.
2. Keep static course content (HTML, CSS, JavaScript, lesson JSON and small static assets) on Firebase Hosting while it remains within the project's 10 GB storage and 10 GB/month transfer no-cost levels.
3. Before each major content batch or release, inspect Hosting Usage and retained releases; avoid storing large videos or duplicate binary assets in Hosting.
4. Defer Firestore creation until learner accounts, cross-device progress, quiz results or bookmarks genuinely require server-side persistence. Design security rules and read/write-efficient data access before creation.
5. Defer Cloud Storage for Firebase until uploaded files or large media genuinely require object storage. First verify the bucket type and exact pricing/no-cost eligibility.
6. If Blaze is ever approved, create Google Cloud budget alerts and monitor service-level usage. **Budget alerts are notifications, not hard spending caps**, so they do not by themselves prevent charges.
7. Keep secrets, billing identifiers, payment details and user-level personal data out of GitHub notes. Record only aggregate usage and non-secret configuration facts.

### Official pricing and policy references

- Firebase Hosting usage, quotas and release retention: https://firebase.google.com/docs/hosting/usage-quotas-pricing
- Cloud Firestore pricing and free quota: https://firebase.google.com/docs/firestore/pricing
- Cloud Storage for Firebase billing requirements and inaccessible Spark buckets: https://firebase.google.com/docs/storage/faqs-storage-changes-announced-sept-2024
- Firebase pricing plans and conditional trial credits: https://firebase.google.com/pricing

**Decision recorded:** remain on Spark; do not enable Cloud Storage, create Firestore, or activate Blaze as part of this documentation update. Reassess only when a concrete CodeSaathi feature requires the service and the owner approves the cost/architecture.
