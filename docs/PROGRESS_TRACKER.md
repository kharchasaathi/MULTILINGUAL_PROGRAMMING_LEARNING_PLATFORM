# Progress Tracker
Last updated: 2026-11-05

## Current execution position
- Current stage: B — Complete Curriculum Planning
- Current task: B4 — Inventory references
- Next action: Continue B4 by removing out-of-scope members and aligning every register to W3Schools-only topics. Do not add supplementary topics or perform external-source verification. Close B4 only after W3Schools-scope cleanup and required family decisions.
- Canonical checklist: [MASTER_STRUCTURE.md](MASTER_STRUCTURE.md)

## A — Project foundation
| Task | Status | Evidence |
|---|---|---|
| A1 Vision | Complete | Approved and documented |
| A2 Target students | Complete | Seven audience groups documented |
| A3 Platform goals | Complete | Product blueprint |
| A4 Six-language strategy | Complete | Telugu, English, Malayalam, Kannada, Tamil, Hindi |
| A5 Free/premium model | Complete | Initially free; future model undecided |
| A6 Success criteria | Complete | Product blueprint |
| A7 Master blueprint | Complete | docs/PROJECT_MASTER_BLUEPRINT.md |

## B — Curriculum planning
| Task | Status | Notes |
|---|---|---|
| B1 Categories | Complete | 15 curriculum families; 72 catalogue entries; detailed scope and limitations documented in docs/B1_W3SCHOOLS_CURRICULUM_INVENTORY.md |
| B2 Languages and technologies | Complete | 13 tutorial-scope programming languages, 7 editor-only extension candidates, plus separate markup/query/shell/data-format and technology registers; see docs/B2_PROGRAMMING_LANGUAGE_TECHNOLOGY_INVENTORY.md |
| B3 Tutorials | Complete | Final catalogue audit: 58 official Tutorials-index entries (12 HTML/CSS, 10 JavaScript, 23 Backend, 13 Data Analytics); wider global navigation separately classified; version tracks, learning paths, specialist resources, tools and legacy labels reconciled. Per-track chapter-tree evidence and limitations are recorded in docs/B3_TUTORIAL_TRACK_REGISTER.csv; no claim that every sidebar was fully captured. References/practice assets routed to B4/B5. |
| B4 References | In progress | W3Schools is the exclusive curriculum source. Existing mixed-source registers are provisional; remove all members not present on W3Schools and exclude them from B4 counts. Follow docs/B4_SOURCE_AND_VERIFICATION_POLICY.md. No external-source verification is required. |
| B5 Examples and exercises | Not started | Map topics; create original teaching material |
| B6 Master topic checklist | Not started | |
| B7 Beginner | Not started | |
| B8 Intermediate | Not started | |
| B9 Advanced | Not started | |
| B10 Professional | Not started | |
| B11 Prerequisites | Not started | |
| B12 Coverage approval | Not started | |

## G — Project management and GitHub
| Task | Status | Evidence |
|---|---|---|
| G1 Private repository | Complete | Repository verified |
| G2 AGENTS.md | Complete | File committed on working branch |
| G3 Master blueprint | Complete | File committed on working branch |
| G4 Security constitution | Complete | File committed on working branch |
| G5 Engineering constitution | Complete | File committed on working branch |
| G6 Development roadmap | Complete | File committed on working branch |
| G7 Decision log | Complete | File committed on working branch |
| G8 Progress tracker | Complete | File committed on working branch |
| G9 Branches and pull requests | In progress | Working branch created; PR policy pending |
| G10 GitHub Actions | Not started | |
| G11 Automated tests | Not started | |
| G12 Deployment workflow | Not started | |
| G13 Backup/version control | In progress | Git history active; backup policy pending |

## Other workstreams
C–F and H–S remain pending as listed in MASTER_STRUCTURE.md.

## Evidence and reporting
Only mark tasks complete when artifacts exist and acceptance criteria are met. Draft inventories are not exhaustive verified coverage. No application tests are claimed as executed during this planning/documentation phase.

## B4 W3Schools-only cleanup snapshot (2026-11-04)

The owner confirmed that W3Schools is the exclusive curriculum source. Clearly external-source rows were removed from the core B4 registers; two registers sourced entirely outside W3Schools were deleted. Current working row counts (not completion claims):

| Register | Current rows |
|---|---:|
| HTML reference member register | 309 |
| CSS reference member register | 507 |
| JavaScript/DOM reference member register | 894 |
| Python reference member register | 171 |
| Python keyword/exception/type register | 100 |
| SQL core reference member register | 348 |
| SQL advanced reference member register | 148 |
| JavaScript RegExp syntax register | 42 |

Removed out-of-scope content includes non-W3Schools HTML event/attribute supplements, CSS additions not listed in W3Schools, MDN-only JavaScript owner candidates and RegExp syntax rows, Python.org-only type/protocol/standard-library rows, and non-W3Schools SQL dialect rows. Deleted the Python protocol and Python standard-library registers because their entries were sourced entirely outside W3Schools.

These are cleaned working counts only. They do not establish complete W3Schools coverage. B4 remains in progress; remaining W3Schools reference families still need inventory. B5 remains blocked. No merge to `main`.


## B4 source capture update (2026-11-05)

- Added `docs/B4_HTML_REFERENCE_MEMBERS_CAPTURE_02.md` from W3Schools HTML Elements, Global Attributes, and Event Attributes reference pages.
- Captured the HTML element-name set and 18 global attributes; event families and representative names are recorded, but a normalized complete event-member register remains pending.
- Updated `docs/B4_W3SCHOOLS_REFERENCE_INVENTORY.md` to match the current W3Schools index label “Angular”.
- B4 remains IN PROGRESS. The HTML attributes/events and remaining reference-family member inventories, source mapping, deduplication, and acceptance review are still outstanding. No B4 completion claim is made.
