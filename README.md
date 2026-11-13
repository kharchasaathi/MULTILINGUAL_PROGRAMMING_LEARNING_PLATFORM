# MULTILINGUAL_PROGRAMMING_LEARNING_PLATFORM

A multilingual programming education platform designed to teach programming clearly and naturally in English and the 22 languages listed in the Eighth Schedule of the Constitution of India.

## Language expansion roadmap

### Phase 1 — Priority languages (10 locales including English)
- English (`en`)
- Telugu (`te`)
- Hindi (`hi`)
- Bengali (`bn`)
- Marathi (`mr`)
- Tamil (`ta`)
- Kannada (`kn`)
- Malayalam (`ml`)
- Gujarati (`gu`)
- Urdu (`ur`)

### Phase 2
- Punjabi (`pa`)
- Odia (`or`)
- Assamese (`as`)
- Nepali (`ne`)

### Phase 3 — Remaining scheduled Indian languages
- Bodo (`brx`)
- Dogri (`doi`)
- Kashmiri (`ks`)
- Konkani (`kok`)
- Maithili (`mai`)
- Manipuri / Meitei (`mni`)
- Sanskrit (`sa`)
- Santali (`sat`)
- Sindhi (`sd`)

The complete roadmap (language codes, phase, script, and implementation status) is registered in `public/content/curriculum-index.json` under `plannedLanguages`.

**Availability rule:** Only locales listed in the curriculum index's `languages` array have lesson content currently available. The `plannedLanguages` array is the approved expansion roadmap; planned locales must not be shown as selectable or described as complete until their translated lessons, language selector, fonts/script rendering, and automated validation are implemented and tested.

**Teaching-quality rule:** Each locale must preserve the same learning objectives, three-stage teaching flow, concept depth, examples, practice tasks, hints, and assessments. Translation must be natural and learner-friendly, not word-for-word substitution. Technical terms may remain in English when that improves clarity, with explanations in the learner's language. Native-language review should be used where available.

## E13 backup and recovery evidence

- Local PostgreSQL 16 + pgBackRest timestamp PITR CI validation: PASS (see the E13 project evidence maintained in the repository history).
- Backblaze B2 live pgBackRest integration: PASS for a disposable synthetic database in GitHub Actions run [43202129682](https://github.com/kharchasaathi/MULTILINGUAL_PROGRAMMING_LEARNING_PLATFORM/actions/runs/43202129682).
- Scope proven: B2 stanza creation, encrypted full physical backup, WAL archiving, restore from B2 to a separate data directory, and timestamp-based PITR assertions.
- Not proven: production recovery, approved RPO/RTO, retention policy, monitoring/alert delivery, key escrow/rotation, replication, or operational ownership.
- The first live run had `repo1-retention-full=1`; pgBackRest automatically ran `expire` and removed an old WAL object inside that run's isolated test prefix. It did not touch the separate `postgres/` logical-backup prefix. Run #3 still invoked pgBackRest's default automatic `expire` command, although the log reported no WAL expiration and no deletion. Run #4 [43207714271](https://github.com/kharchasaathi/MULTILINGUAL_PROGRAMMING_LEARNING_PLATFORM/actions/runs/43207714271) verified `--no-expire-auto`: full backup, WAL, B2 restore and timestamp PITR passed, and the complete job log contained no `expire command begin/end` entries. The disposable live-test safeguard is PASS; this does not define or approve production retention.

See [E13 B2 pgBackRest live evidence](docs/E13_B2_PGBACKREST_LIVE_EVIDENCE.md) and [verification catalog](docs/E13_BACKUP_RECOVERY_VERIFICATION_CATALOG.csv).
