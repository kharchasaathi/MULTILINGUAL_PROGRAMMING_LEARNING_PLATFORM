# E13 Data Store and Backup Coverage Inventory

**Status:** Initial evidence-based inventory; owner review and runtime discovery still required  
**Branch:** `docs/project-foundation`  
**Date:** 2026-11-12  
**Purpose:** Establish the actual authoritative data stores and backup coverage before enabling any paid cloud service or provisioning production infrastructure.

## 1. Architecture baseline

The approved planning baseline in `docs/D3_BACKEND_ARCHITECTURE.md` and `docs/D4_DATABASE_ARCHITECTURE.md` is a Next.js web/PWA + Expo mobile client, NestJS modular-monolith backend, and PostgreSQL system of record using Prisma ORM 7. Object bytes are intended to live in an object-storage provider; the provider is not finalized in D4. These are architecture decisions, not evidence of deployed services.

## 2. Evidence observed

| System / service | Evidence | Inventory conclusion | Backup treatment |
|---|---|---|---|
| PostgreSQL | D3/D4 specify PostgreSQL; owner reports no PostgreSQL server is currently running | Planned authoritative database; no live instance, endpoint, schema or production data source has been identified | E13 logical backup and pgBackRest/WAL/PITR apply once a real PostgreSQL service exists |
| Prisma | D3/D4 specify Prisma 7; repository tree has no Prisma schema or migrations | Planned ORM; no executable schema/migration deployment evidenced | Include schema/migration artifacts in release recovery; validate against restored DB |
| Firebase Authentication | Owner-provided Firebase Console screenshots show Email/Password enabled and Google provider enabled, with Web SDK client ID/secret fields | Firebase project has authentication-provider configuration; this does not establish that the learning application uses Firebase Auth at runtime | If adopted, document identity-provider configuration, authorized domains, provider settings and account recovery; do not back up passwords or OAuth secrets as ordinary data |
| Cloud Firestore | Owner-provided console screenshot shows the “Create database” onboarding action | No Firestore database is evidenced as provisioned | No Firestore data backup currently applicable; do not create it without an architecture decision |
| Firebase Storage | Owner-provided console screenshot shows Storage onboarding with “Upgrade project” and billing-account/Blaze requirement | No usable Storage bucket is evidenced; current screen requires a billing upgrade to proceed | Not an E13 dependency. Do not upgrade solely for E13 |
| Firebase Realtime Database | Owner-provided console screenshot shows “Create Database” onboarding | No Realtime Database instance is evidenced as provisioned | No RTDB backup currently applicable; do not create it without an architecture decision |
| Firebase Hosting | Owner-provided console screenshot shows “Get started” onboarding | No Hosting site/deployment is evidenced as configured | Not currently a data store; deployment/configuration backup belongs in infrastructure/release controls |
| Firebase App Hosting | Console navigation exposes App Hosting; no deployed service or configuration was shown | Not evidenced as provisioned | No current backup source identified |
| Backblaze B2 | E13 runbook records private, SSE-B2, versioned EU Central bucket; synthetic encrypted fixture live upload/download and exact-VersionId SHA-256 verification passed in GitHub Actions run #3 | Off-site object-storage path is tested only for a synthetic encrypted fixture; not a production database backup or PITR repository | Retain current E13 controls; separate pgBackRest key/prefix and live repository validation remain required |
| GitHub repository | Working branch contains E13 scripts, templates, workflows and architecture docs; no app runtime config or database migration tree found in recursive tree | Source/configuration evidence is present, but this is not a backup of live application data | Preserve Git history and release artifacts; do not treat Git as database backup |

## 3. Repository configuration scan

A recursive tree inspection of `docs/project-foundation` found the E13 shell utilities, PostgreSQL/pgBackRest templates, GitHub Actions workflows, D3/D4/E13 architecture documents and data matrices. It did not find:
- `firebase.json`, `.firebaserc`, Firestore rules/indexes, or Firebase Storage rules;
- `prisma/schema.prisma`, Prisma migrations, SQL migrations, or a database bootstrap script;
- application source directories or a deployed backend configuration;
- committed environment files (which must not be added if they contain credentials).

This is a repository-tree scan, not proof that no local files or cloud resources exist outside the inspected branch.

## 4. E13 coverage and gaps

| Data category | Current source of truth | E13 coverage now | Required next evidence |
|---|---|---|---|
| Relational application records | PostgreSQL (planned, not deployed) | CI logical backup/restore integration only; no production DB backup | Provision approved PostgreSQL environment; run live backup and isolated restore |
| Point-in-time history | PostgreSQL WAL (not configured) | Template only | pgBackRest stanza, physical base backup, continuous WAL archive, isolated timestamp PITR |
| User-uploaded files/media | Provider undecided; D4 asset bytes belong in object storage | Not implemented | Decide provider and inventory object bytes, metadata, ACLs, version IDs and consistency points |
| Identity/configuration | Firebase Auth console configuration observed; runtime use unconfirmed | Not backed up / not inventoried fully | Confirm identity provider and export non-secret configuration inventory; protect credentials in secret manager |
| Audit/outbox/inbox | PostgreSQL tables planned by D4 | No live records or real E12 integration | Implement and backup with consistent DB snapshot; test replay and audit verification |
| Deletion tombstones/legal holds | E11 policy and PostgreSQL model dependencies | Design/hooks only; no real replay | Implement retention/tombstone/hold replay and validate after restore |
| Search/AI derived indexes and caches | Not deployed | Rebuild/reconcile procedures only | Identify actual providers and rebuild from authorized source-of-truth data |

## 5. Billing decision — Firebase Blaze

**Decision for E13:** Do not purchase/upgrade Firebase Blaze at this stage. The E13 architecture selects Backblaze B2 for off-site backup and PostgreSQL for the authoritative database. Firebase Storage is not currently a dependency of the E13 backup/recovery design, and no production Firebase Storage bucket or application use has been evidenced.

Blaze may become necessary if the product later chooses Firebase Storage or another Firebase feature that requires billing. That decision must follow a documented provider/architecture review, usage estimate, budget alerts, billing-owner approval and a small controlled test. Blaze is pay-as-you-go; upgrading is not a fixed one-time purchase and can create variable charges. Enabling billing is not itself proof of a secure backup or recovery design.

## 6. Required owner confirmations

1. Confirm whether Firebase Authentication is intended to be the production identity provider or is only an initial console experiment.
2. Confirm that PostgreSQL remains the approved system of record (current D3/D4 decision).
3. Decide the object-storage provider for learner uploads/media separately from the B2 backup repository.
4. Confirm whether any Firebase data or user uploads already exist outside the visible onboarding screens.
5. Approve a cloud billing budget and alert thresholds before any paid-plan upgrade.

## 7. Acceptance boundary

This inventory is an initial documented baseline, not a complete cloud-account audit. It does not claim that all cloud projects, local environments, connected providers, buckets, secrets or production data have been discovered. E13 remains **IN PROGRESS** and E14 remains **BLOCKED**. No paid Firebase upgrade, database creation, bucket mutation, retention lock, key creation or production data transfer is authorized by this document.


## 8. Authoritative data-store register and ownership

The normalized, machine-readable inventory is maintained in `docs/E13_AUTHORITATIVE_DATA_STORE_REGISTER.csv` (25 records). It assigns an accountable owner role and operational custodian role to each domain, distinguishes authoritative stores from derived stores and provider boundaries, and records current evidence, classification, recovery requirement, reconciliation dependency and open confirmation.

The register deliberately separates:
- PostgreSQL application records (planned system of record; not deployed);
- identity-provider credentials/session state (Firebase Authentication selected as the initial provider in D6; console configuration is not proof of runtime adoption);
- product asset bytes (object-storage provider undecided) from the E13 B2 backup-artifact bucket;
- source code and architecture evidence in GitHub from live business data;
- authoritative audit/outbox/inbox/financial/progress records from logs, caches, indexes and other derived systems;
- provider-side records and secrets from the application's internal identifiers and metadata.

### 8.1 Domain ownership map

| Data domain | Accountable owner role | Operational custodian |
|---|---|---|
| Platform/core and database | Platform Architecture Owner | Platform Operations |
| Identity and credentials | Identity Product Owner | Identity/Security Operations |
| Learner profile and preferences | Learning Product Owner | Learner Platform Operations |
| Curriculum, lessons, localization and approvals | Learning Content / Content Governance Owner | Content Platform Operations |
| Assessment and progress | Assessment / Learning Progress Product Owner | Learning Platform Operations |
| AI task metadata and provenance | AI Product Owner | AI Platform Operations |
| Asset metadata and object bytes | Asset and Media Product Owner | Storage Operations |
| Audit and security events | Security and Audit Owner | Security Operations |
| Outbox/inbox and integration events | Platform Architecture Owner | Platform Operations |
| Notifications | Notification Product Owner | Platform Operations |
| Payments and entitlements | Payments / Entitlement Product Owner | Finance and Platform Operations |
| Search, caches and telemetry | Search / Platform Operations Owner | Platform Operations |
| Backup artifacts and recovery keys | Database and Backup Owner / Security Owner | Backup / Security Operations |
| Privacy tombstones and legal holds | Privacy and Legal Owner | Privacy Operations |
| Code execution artifacts | Code Execution Security Owner | Security Operations |
| Source code and CI | Engineering Owner | Repository Administrators |

These are accountable role assignments, not named-person assignments. Named owners and approval authority must be confirmed before production operations.

### 8.2 Inventory scope and limitations

- The 25-row register covers all data domains and provider seams currently specified by D3, D4, D6, D7-D14, E11-E13 and the inspected repository tree.
- D4's relational entity matrix remains the authoritative logical entity list. The register does not replace or rename D4 entities.
- D12 payment records are represented as a domain and remain governed by `D12_PAYMENT_DATA_CONTRACT_MATRIX.csv`; notification persistence/provider choices are not yet finalized.
- E12's canonical artifact is `E12_AUDIT_LOGGING_SECURITY_ARCHITECTURE.md`, not a file named `E12_AUDIT_LOGGING_ARCHITECTURE.md`.
- GitHub tree inspection found no app source/runtime deployment, Prisma schema/migrations, Firebase project config/rules, deployed Firestore/Realtime Database, product asset bucket, queue, search index, telemetry vendor or payment gateway in this branch. This is bounded repository evidence only.
- Backblaze B2 is currently evidenced as an E13 backup destination, not the product's user-uploaded asset store. Its synthetic live smoke test is not proof of database or product-media backup.
- No direct cloud-account API audit was performed. Console evidence is limited to screenshots supplied by the owner; external services and local environments may exist outside the inspected branch.

### 8.3 Task 01 acceptance checklist

| Acceptance item | Evidence / status |
|---|---|
| Approved source-of-truth architecture identified | D3/D4 PostgreSQL decision recorded |
| Logical data domains and supporting provider boundaries inventoried | 25-row authoritative register committed |
| Data classification mapped to E11/D4 categories | Classification recorded per register row |
| Accountable owner and operational custodian roles assigned | Role-level mapping recorded; named owner confirmation pending |
| Backup/recovery requirement and cross-store reconciliation captured | Recorded per register row |
| Current deployed versus planned state distinguished | Evidence and status columns recorded |
| External/runtime discovery confirmed by owner | Pending owner confirmation |
| Production owner sign-off | Pending |

**Task 01 status: IN PROGRESS — repository and architecture inventory is documented; owner confirmations and external runtime discovery are still required.**

### 8.4 Required owner confirmations to close Task 01

1. Firebase Authentication is now the selected initial identity adapter under D6. Before connecting it to a production app, inspect whether the Firebase project contains real accounts and preserve any existing identity data.
2. Is PostgreSQL still the approved authoritative application database, with no existing live production database or alternate authoritative data store?
3. Is Backblaze B2 used only for E13 backup artifacts today, with no learner uploads/media stored there or in another provider?
4. Are there any connected providers, local servers, cloud projects, databases, buckets, queues, analytics, monitoring, payment, email/SMS or AI services not visible in this repository inventory?
5. Confirm the role-level ownership map or provide the correct accountable owner roles where different.

Do not provide credentials, API keys, OAuth secrets, passwords or recovery codes in chat. Provider names, whether a service is used, and non-secret configuration facts are sufficient.

## 9. Identity-provider architecture decision — Firebase Authentication

D6 now selects Firebase Authentication as the initial managed identity provider while retaining the provider-neutral NestJS adapter boundary. PostgreSQL remains the authoritative application database and stores internal principal IDs, exact issuer/subject links, learner/application records, roles and permissions. Firebase Authentication manages authentication credentials and supported sign-in/recovery mechanisms only.

This decision does not select Firestore, Realtime Database, Firebase Storage, Firebase Hosting or Firebase App Hosting, and does not authorize a Firebase Blaze upgrade. It does not prove that the current Firebase project is already integrated or contains no users.

Before implementation, inspect the existing Firebase project/account inventory without deleting or overwriting data; validate project ID, authorized domains and redirect origins; complete E4/E7 web and native session/security review; protect Admin SDK credentials in a managed secret facility; and test issuer/audience/signature/expiry validation, UID mapping, account linking, revocation and recovery. Never share secrets in chat or commit them to Git.

Task 01 remains IN PROGRESS because external runtime discovery, existing Firebase account inventory and role-owner confirmation are outstanding. The identity provider choice itself is no longer an open question.