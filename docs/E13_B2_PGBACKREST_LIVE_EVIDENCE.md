# E13 — Backblaze B2 pgBackRest Live Integration Evidence

## Status

**Live synthetic integration: PASS. E13 overall: IN PROGRESS.**

## Definitive passing run

- GitHub Actions run: [43207714271](https://github.com/kharchasaathi/MULTILINGUAL_PROGRAMMING_LEARNING_PLATFORM/actions/runs/43207714271)
- Tested commit: `38e7e2ce6b15e466222dc47c757baba6e001735f`
- Duration: 7m 50s
- Jobs: `validate=success`, `b2-pgbackrest-live=success`
- Test repository prefix: `/pgbackrest/e13-live-test/43207714271-1/`
- PostgreSQL: 16; pgBackRest: 2.50
- B2 bucket: `kharchasaathi-e13-backup-primary`, region `eu-central-003`
- Encryption: pgBackRest AES-256-CBC repository encryption; bucket-side encryption enabled.

## Assertions evidenced in the passing run

1. pgBackRest stanza creation against B2 succeeded.
2. Repository/WAL check succeeded.
3. WAL archive to B2 succeeded.
4. Full physical backup completed successfully.
5. A later WAL segment was archived.
6. Restore from B2 to a separate recovery directory completed.
7. Recovered PostgreSQL started on an isolated port/socket.
8. Base-backup marker row was present after recovery.
9. A transaction committed after the PITR target was absent after recovery.
10. The job emitted: `PASS: live B2 pgBackRest stanza, full physical backup, WAL archive, B2 restore and timestamp PITR.`

## Automatic expiration safeguard

The first live run invoked automatic expiration and removed one old WAL object inside its run-scoped disposable test prefix. Run #3 still invoked the default `expire` command, although no object removal was shown in that run.

The live test was corrected to explicitly pass `--no-expire-auto` to the backup command. Run #4 (above) proves:
- backup log includes `--no-expire-auto`;
- the complete live job log contains no `expire command begin` or `expire command end`;
- backup, WAL, B2 restore and PITR assertions still pass.

The safeguard is PASS for this disposable integration test. It does not define or approve a production retention policy.

## Scope limitations

This was a disposable synthetic database on a GitHub-hosted runner, not a production recovery exercise. It does not establish:
- production PostgreSQL deployment, runtime archive configuration, or complete database inventory;
- approved business RPO/RTO or measured production recovery objectives;
- production retention policy, lifecycle policy, legal hold, or Object Lock design;
- monitoring, alert delivery, on-call ownership, or periodic restore scheduling;
- key escrow, recovery access, rotation, or compromise procedures;
- cross-region replication or independent account recovery;
- E11/E12 application-level recovery and consistency.

## Current gate decision

- Local PostgreSQL 16 PITR CI validation: PASS (separate local POSIX repository test).
- Live Backblaze B2 pgBackRest synthetic integration: PASS.
- Live-test no-auto-expire safeguard: PASS in run `43207714271`.
- E13 overall: IN PROGRESS.
- E14: remains BLOCKED pending all E13 evidence and required owner approvals.
