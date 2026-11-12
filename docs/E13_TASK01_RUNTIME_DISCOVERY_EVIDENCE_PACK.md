# E13 Task 01 — Runtime Discovery and Owner Evidence Pack

**Status:** Prepared; evidence collection and owner confirmation pending  
**Date:** 2026-11-12  
**Branch:** `docs/project-foundation`  
**Purpose:** Close the external-runtime discovery gap for BKP-001 without sharing credentials or changing cloud resources.

## 1. Safety rules

- Do not paste passwords, API keys, OAuth client secrets, service-account JSON, recovery codes, private keys, access tokens, session cookies or database connection strings into GitHub issues, commits, screenshots or chat.
- Do not create, delete, upgrade, enable, disable, migrate, upload, restore or modify any cloud resource during discovery.
- Use read-only console views only. If a console prompts for a paid upgrade or billing activation, stop; do not accept or enable it for this inventory task.
- Redact email addresses, phone numbers, learner identifiers and other personal data. Only aggregate counts, resource names/regions, status and non-secret configuration are needed.
- If no resource exists, record “none observed” with the date and scope checked. Do not infer absence from a repository scan.

## 2. Evidence collection checklist

| ID | Area | Read-only evidence required | Record in inventory |
|---|---|---|---|
| RD-01 | Firebase project | Project ID (non-secret), project display name, project environment (test/staging/prod), checked date | Project inventory and environment |
| RD-02 | Firebase Authentication | Enabled sign-in providers; aggregate user count; whether any real users exist; whether users are test-only; no user list export | Provider status and aggregate account count |
| RD-03 | Firestore | Whether a database exists; database/region; whether documents exist (aggregate count if readily visible) | Database presence, region and deployed/planned state |
| RD-04 | Realtime Database | Whether an instance exists; region; whether data exists | Instance presence, region and deployed/planned state |
| RD-05 | Firebase Storage | Whether a bucket exists; bucket name and region; whether objects exist; billing gate state only | Product-media vs backup purpose; object presence |
| RD-06 | Firebase Hosting / App Hosting | Whether a site/app is deployed; site identifiers and public URL only | Hosting runtime and environment |
| RD-07 | Other Google Cloud resources | Cloud SQL, buckets, Pub/Sub, queues, Secret Manager, logging/monitoring or other services relevant to platform data | Service, project, region, purpose, status |
| RD-08 | Backblaze B2 | Account/bucket list, bucket region, privacy, versioning, Object Lock state, replication destination/rule status, aggregate object count | Confirm backup-only purpose or identify product data |
| RD-09 | PostgreSQL outside GitHub | Managed DB or server exists? Provider, environment, region, database name (not connection string), approximate size/backup status | Actual authoritative DB and backup method |
| RD-10 | Local/on-prem runtime | Any developer PC, office server, NAS, VPS or local database holding project/learner data? Identify owner and backup location without credentials | External data store and custodian |
| RD-11 | Third-party integrations | Payment, email/SMS, analytics, AI, search, queue, telemetry, support or file providers actually connected | Provider, data purpose, region and status |
| RD-12 | Ownership | Confirm or correct each role in the E13 register; name the accountable person internally if appropriate | Role confirmation; do not commit personal contact details |

## 3. Minimal response format

For each row use one of:
- `PRESENT` — resource exists; provide only non-secret metadata requested above.
- `NONE_OBSERVED` — checked the named project/account/environment and found no resource.
- `UNKNOWN_NO_ACCESS` — could not inspect; state which scope was unavailable.
- `NOT_APPLICABLE` — the service is not used by this project.

Record the checked date, project/account scope and evidence location. Screenshots are optional when a concise console summary is sufficient. If screenshots are used, crop/redact personal data and all secret material before sharing.

## 4. Firebase Authentication account safety gate

Firebase Authentication is the selected initial identity provider in D6, but the production app integration is not implemented. Before any integration:
1. Confirm the Firebase project ID and environment.
2. Inspect aggregate account count and determine whether any existing accounts belong to real users.
3. Do not delete, disable, bulk-export, migrate, link or overwrite accounts during E13 discovery.
4. Preserve existing users; later migration/linking requires a separate approved plan, user impact assessment and tested rollback.
5. Confirm issuer/project identity and account recovery ownership without sharing Admin SDK credentials.

## 5. Task 01 close criteria

Task 01 can be accepted only when all are true:
- [ ] The 25-domain authoritative register is reconciled to D3/D4 and the 39/39 entity crosswalk.
- [ ] All in-scope cloud projects/accounts and local runtimes are either inspected or explicitly marked unknown with a named follow-up owner.
- [ ] Firebase Auth account presence and environment are confirmed without exposing personal data.
- [ ] Product asset storage is distinguished from E13 backup artifact storage.
- [ ] Actual PostgreSQL authoritative source (or explicit not-yet-deployed state) is confirmed.
- [ ] Third-party providers and operational stores are reconciled with DS-001–DS-025.
- [ ] Accountable owner roles and operational custodians are confirmed.
- [ ] Platform Architecture, Database/Backup, Identity, Storage, Privacy and Audit owners approve the inventory scope relevant to them.
- [ ] Evidence is dated and linked; no secrets or unnecessary personal data are stored.

## 6. Current known baseline (repository-bounded)

- PostgreSQL is the approved logical system of record in D4, but no deployed DB/runtime is evidenced in the inspected branch.
- Firebase Authentication is selected as the initial managed identity provider; production integration and actual account inventory remain unconfirmed.
- Firestore, Realtime Database, Firebase Storage and Firebase Hosting are not evidenced as deployed in the inspected branch. This is not proof about the cloud console.
- Backblaze B2 bucket `kharchasaathi-e13-backup-primary` is the E13 backup artifact destination. The documented synthetic live smoke test does not establish that product media is stored there.
- The repository scan is not a cloud-account audit and does not establish the absence of external services.

## 7. Evidence handling

Store non-secret evidence references in the inventory or a controlled internal evidence register. Do not commit raw console exports, user lists, service-account files, credential screenshots or database dumps. If evidence must be retained, use an approved restricted evidence location with an owner, purpose, access list and retention period.
