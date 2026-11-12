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
