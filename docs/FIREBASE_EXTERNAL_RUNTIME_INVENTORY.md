# Firebase and External Runtime Inventory

**Inventory status: BASELINE RECORDED — OWNER VERIFICATION REQUIRED**  
**Last evidence review:** 2026-11-12  
**Purpose:** Establish every cloud service and external runtime that may store data, execute application code, authenticate users, deliver traffic, or support recovery. This document deliberately distinguishes confirmed evidence from selected/planned services and unknown runtime facts.

## 1. Executive status

The currently inspected `main` branch contains the E13 backup workflows and evidence, but no Firebase application configuration, deployment manifest, Firebase project inventory, or production runtime deployment evidence. Therefore this inventory cannot truthfully declare Firebase or the production external runtime fully verified yet.

| Component | Current evidence-based status | What is known | What remains to verify |
|---|---|---|---|
| Firebase Authentication | SELECTED / DEPLOYMENT UNVERIFIED | Previously selected as the initial managed identity provider | Firebase project ID, enabled providers, tenant/account inventory, MFA, authorized domains, runtime integration |
| Cloud Firestore | NOT EVIDENCED | No deployed database evidence in inspected branch | Whether enabled; project/region; collections; rules; indexes; backups; data classification |
| Realtime Database | NOT EVIDENCED | No deployed database evidence in inspected branch | Whether enabled; instance/region; rules; data flows |
| Cloud Storage for Firebase | NOT EVIDENCED | No deployed bucket/runtime evidence in inspected branch | Whether enabled; bucket/region; rules; lifecycle; object inventory; billing plan |
| Firebase Hosting | NOT EVIDENCED | No deployed Hosting target evidence in inspected branch | Whether enabled; sites/domains; deploy workflow; headers/rewrites; rollback |
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
