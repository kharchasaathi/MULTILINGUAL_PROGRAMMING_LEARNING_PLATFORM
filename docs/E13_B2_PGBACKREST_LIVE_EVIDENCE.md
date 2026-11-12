# E13 — Backblaze B2 pgBackRest Live Integration Evidence

## Status

**Live synthetic integration: PASS. E13 overall: IN PROGRESS.**

## Run evidence

- GitHub Actions run: [43202129682](https://github.com/kharchasaathi/MULTILINGUAL_PROGRAMMING_LEARNING_PLATFORM/actions/runs/43202129682)
- Branch: `main`
- Commit tested: `1c643a12b00b8579a26524a071f23d8bd3ed475d`
- Run duration: 7m 24s
- Jobs: `validate=success`, `b2-pgbackrest-live=success`
- Test repository path: `/pgbackrest/e13-live-test/43202129682-1/`
- PostgreSQL: 16
- pgBackRest: 2.50
- Repository: Backblaze B2 bucket `kharchasaathi-e13-backup-primary`, region `eu-central-003`
- Encryption: pgBackRest AES-256-CBC repository cipher; B2 server-side encryption enabled on bucket.

## Assertions evidenced in job log

1. pgBackRest stanza creation completed successfully against B2.
2. `pgbackrest check` validated repository configuration and WAL archive.
3. WAL segment was successfully archived to the B2 repository.
4. Full physical backup completed successfully (22.1 MB database; 967 files).
5. A subsequent WAL segment was successfully archived.
6. Restore from B2 to a separate recovery directory completed successfully.
7. Recovered PostgreSQL started on an isolated port/socket.
8. Base-backup marker row was present after recovery.
9. Transaction committed after the selected PITR target was absent after recovery.
10. Job log emitted: `PASS: live B2 pgBackRest stanza, full physical backup, WAL archive, B2 restore and timestamp PITR.`

## Retention/expiration finding and corrective action

The tested script at commit `1c643a12b00b8579a26524a071f23d8bd3ed475d` set `repo1-retention-full=1`. The pgBackRest backup command consequently invoked `expire` after the full backup. The log records removal of one old WAL archive object under this run's isolated prefix:

`/pgbackrest/e13-live-test/43202129682-1/`

This did **not** use the `postgres/` prefix and did not target the logical-dump writer's namespace. However, the earlier statement that no remote deletion occurred was inaccurate: one test-prefix WAL object was expired.

Run #3 [43205848796](https://github.com/kharchasaathi/MULTILINGUAL_PROGRAMMING_LEARNING_PLATFORM/actions/runs/43205848796) tested the script after removing `repo1-retention-full=1`. The run passed backup and PITR, and the expire log explicitly stated that archive logs would not be expired. However, pgBackRest still invoked its default automatic `expire` command after backup. No object deletion was shown in this run, but the requirement that automatic expiration not run was therefore **not** met.

Corrective change committed as `c04efabb2cc46b1f95e3ce2f3c8a90f44dfde607`: the backup invocation now explicitly includes `--no-expire-auto`. The official pgBackRest command reference documents that automatic expiration is enabled by default and that `--no-expire-auto` disables it. This new change is **not yet live-tested**. A fresh B2 run must confirm the backup and PITR still pass and that no `expire command begin` appears after backup.

No cleanup command in the script removes remote objects. The ephemeral runner removes only its local recovery directory and socket.

## Scope limitations

This was a disposable synthetic database on a GitHub-hosted runner, not production data or a production recovery exercise. It does not establish:
- production PostgreSQL deployment, runtime archive configuration, or complete database inventory;
- approved business RPO/RTO or measured production recovery objectives;
- retention policy suitability, lifecycle policy, legal hold, or Object Lock design;
- monitoring, alert delivery, on-call ownership, or periodic restore scheduling;
- key escrow, recovery access, rotation, or compromise procedures;
- cross-region replication or independent account recovery;
- E11/E12 application-level recovery and consistency.

## Current gate decision

- Local PostgreSQL 16 PITR CI validation: PASS (separate local POSIX repository test).
- Live Backblaze B2 pgBackRest synthetic integration: PASS.
- Live-test no-expiration safeguard: IMPLEMENTED, RE-TEST REQUIRED.
- E13 overall: IN PROGRESS.
- E14: remains BLOCKED pending all E13 evidence and required owner approvals.
