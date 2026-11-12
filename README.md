# MULTILINGUAL_PROGRAMMING_LEARNING_PLATFORM
A multilingual programming education platform supporting Telugu, English, Malayalam, Kannada, Tamil, and Hindi.

## E13 backup and recovery evidence

- Local PostgreSQL 16 + pgBackRest timestamp PITR CI validation: PASS (see the E13 project evidence maintained in the repository history).
- Backblaze B2 live pgBackRest integration: PASS for a disposable synthetic database in GitHub Actions run [43202129682](https://github.com/kharchasaathi/MULTILINGUAL_PROGRAMMING_LEARNING_PLATFORM/actions/runs/43202129682).
- Scope proven: B2 stanza creation, encrypted full physical backup, WAL archiving, restore from B2 to a separate data directory, and timestamp-based PITR assertions.
- Not proven: production recovery, approved RPO/RTO, retention policy, monitoring/alert delivery, key escrow/rotation, replication, or operational ownership.
- The first live run had `repo1-retention-full=1`; pgBackRest automatically ran `expire` and removed an old WAL object inside that run's isolated test prefix. It did not touch the separate `postgres/` logical-backup prefix. Run #3 still invoked pgBackRest's default automatic `expire` command, although the log reported no WAL expiration and no deletion. Run #4 [43207714271](https://github.com/kharchasaathi/MULTILINGUAL_PROGRAMMING_LEARNING_PLATFORM/actions/runs/43207714271) verified `--no-expire-auto`: full backup, WAL, B2 restore and timestamp PITR passed, and the complete job log contained no `expire command begin/end` entries. The disposable live-test safeguard is PASS; this does not define or approve production retention.

See [E13 B2 pgBackRest live evidence](docs/E13_B2_PGBACKREST_LIVE_EVIDENCE.md) and [verification catalog](docs/E13_BACKUP_RECOVERY_VERIFICATION_CATALOG.csv).
