# PostgreSQL backup utility

First executable E13 slice: encrypted logical PostgreSQL backups, checksum/manifest verification and explicitly confirmed restore. This is not a complete PITR/DR platform.

## Dependencies
PostgreSQL client tools compatible with the server major version, age CLI, Bash 4+, GNU sha256sum. Store backup directory outside the database host with restricted access.

## Backup
Set PGHOST, PGDATABASE, PGUSER, PGPASSWORD through protected secret delivery, BACKUP_DIR and AGE_RECIPIENT (public age recipient), then run:
\`\`\`bash
bash ops/backup/backup-postgres.sh
\`\`\`

## Verify
\`\`\`bash
bash ops/backup/verify-backup.sh /secure-backups/name.dump.age
\`\`\`
Checks checksum and manifest only, not decryption or recoverability.

## Restore (destructive)
Restore uses pg_restore --clean --if-exists. Use a newly provisioned isolated recovery database, verify its identity and obtain approval:
\`\`\`bash
export AGE_IDENTITY_FILE=/run/secrets/backup-age-identity
export RESTORE_CONFIRM=YES
bash ops/backup/restore-postgres.sh /secure-backups/name.dump.age
\`\`\`
Also set PGHOST, PGDATABASE and PGUSER. Never point a routine drill at production.

## Still requires provider/operations implementation
- Cross-account/region immutable copies, retention locks, scheduling and freshness/coverage alerts.
- Continuous WAL archiving, base backups and tested PostgreSQL PITR (not configured here).
- Object-store bytes/metadata snapshots coordinated with DB snapshot.
- Separate escrow and recovery tests for age identity/KMS keys.
- E11 deletion tombstones/legal holds replay after restore.
- E12 audit evidence backup, integrity validation and independently protected audit of backup/restore actions.
- Isolated restore drills, application smoke tests, reconciliation and approved cutover.
No production backup, remote copy, PITR, key escrow, restore drill or certification is claimed.
