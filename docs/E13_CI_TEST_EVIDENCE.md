# E13 CI test evidence

**Workflow:** E13 backup and recovery checks  
**GitHub Actions run:** [41973333842](https://github.com/kharchasaathi/MULTILINGUAL_PROGRAMMING_LEARNING_PLATFORM/actions/runs/41973333842)  
**Commit tested:** `f171716a51d8d78845bb381c143a874e7eb2e88c`  
**Result:** Both jobs completed successfully.

## Job results

- `mocked-tests`: Bash syntax checks passed; mocked backup/verify/restore tests passed; tampered artifact was rejected; confirmation and isolation-attestation guards blocked unauthorized restore attempts.
- `postgres-age-integration`: disposable PostgreSQL 16 service and real age keypair used; source database populated; pg_dump custom archive encrypted; checksum/manifest verified; archive decrypted; pg_restore completed into a separately created empty recovery database; restored rows matched expected values.

## What this proves

The committed logical backup utility can complete a real encrypted PostgreSQL logical-backup and restore round trip in the CI test environment. It also verifies basic checksum tamper detection and operator guard behavior.

## What this does not prove

No production database or credentials were used. This run does not prove PITR/WAL recovery, off-site/immutable storage, provider/KMS key escrow, scheduled jobs/alerts, cross-system object/event/audit consistency, E11 deletion/legal-hold replay, E12 audit integration, restore under regional outage, measured RPO/RTO, application smoke tests or production cutover readiness. Those remain E13 acceptance gates.


## GitHub Actions run 57 — 2026-11-05

Run: https://github.com/kharchasaathi/MULTILINGUAL_PROGRAMMING_LEARNING_PLATFORM/actions/runs/41975104725  
Commit: `1714ef9948e9b0b3320a0154b4c881ad268f4135`  
Conclusion: **success** — all three jobs completed successfully.

- `mocked-tests`: Bash syntax and existing mocked backup/restore security tests passed.
- `s3-publisher-contract`: Bash syntax, replication/lifecycle JSON parsing, mocked S3 publisher checks, pgBackRest backup wrapper/freshness monitor tests, and fail-closed E11/E12 recovery gate tests passed. No AWS credentials or live S3 service were used.
- `postgres-age-integration`: real PostgreSQL 16 + age encrypted logical backup, verification and restore round-trip passed.

This run does **not** validate a live AWS bucket, KMS/IAM, cross-account replication, pgBackRest S3 stanza, PostgreSQL WAL archiving, PITR restore, key escrow, production alerts, E11/E12 real hooks or measured RPO/RTO.
