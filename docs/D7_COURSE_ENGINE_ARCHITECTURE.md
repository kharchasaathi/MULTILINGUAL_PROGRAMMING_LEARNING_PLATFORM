# D7 — Course Engine Architecture

**Status:** Complete — logical course-domain, progression and delivery architecture documented
**Date:** 2026-11-05
**Depends on:** B7–B12 curriculum framework; C1–C15 teaching/content contracts; D1–D6 platform architecture
**Baseline:** NestJS modular monolith, PostgreSQL/Prisma ORM 7 stable, REST/JSON `/api/v1`, six locales
**Scope:** Logical domain and service contracts. No course engine code, Prisma migration, lesson corpus, learner progress engine or production API is implemented.

## 1. Purpose and boundaries

D7 defines how the platform represents and publishes learning pathways and how learners discover, select and navigate them. It establishes the canonical relationship between track, level, module, chapter, topic, lesson and prerequisite; the boundary between curriculum catalogue and authored teaching content; versioning/publication; learner pathway selection; and the contract to downstream progress and assessment services.

D7 operationalizes the approved B7–B12 framework without expanding it. W3Schools remains the exclusive curriculum scope source. Existing B7–B10 maps and B11 dependencies are inputs, not a reason to invent additional curriculum topics. A missing mapping remains a coverage gap, not permission to fill it from memory.

D7 does not author lesson text, translate content, evaluate learner answers, calculate progress, generate AI content, run code, define payment entitlements, implement an admin panel or select hosting/search infrastructure. C1–C15 own teaching/review rules; D8 owns locale behavior; D9 AI; D10 progress; D11 admin; D13 communication; D14 end-to-end data flow. D5 owns final wire-level API contracts.

## 2. Core architecture decisions

1. **Catalogue and content are distinct bounded contexts.** Curriculum owns stable learning structure and source mapping. Content owns lesson identity, immutable lesson versions and locale variants. A course/module/topic does not contain copied lesson prose.
2. **Stable IDs, versioned releases.** Track, level, module, chapter, topic and lesson identities remain stable across edits. Published catalogue snapshots and lesson releases are immutable; corrections create new versions.
3. **Track-specific learning, not a single compulsory ladder.** A learner selects a pathway/specialization. B7–B10 entry/progression gates apply only to the selected track and mapped prerequisites; unrelated languages/tracks are not required.
4. **Prerequisites are explicit graph edges.** Required, conditional and recommended edges are evaluated against selected pathway context. Cycles, self-edges, missing nodes and contradictory conditions block publication.
5. **Completion is evidence-based.** Opening a lesson is not mastery. D7 supplies required learning structure and prerequisite policy; D10 owns learner progress state and completion evidence; D12/C12 owns assessment definitions and evaluation rules.
6. **Backend is authoritative.** The client may display navigation and cached public catalogue, but cannot decide publication, prerequisite satisfaction, entitlement, lesson availability or completion.
7. **Locale variants do not create duplicate curriculum nodes.** Stable topic/module/lesson IDs are locale-neutral. D8 resolves requested locale and approved fallback policy; unpublished locale variants are never silently represented as approved.
8. **C15 release authority governs visibility.** Only a current approved release manifest can make content learner-visible. AI output, draft status, quality score or a client flag cannot publish content.
9. **Source provenance is mandatory.** Every curriculum topic/module mapping retains W3Schools source URLs and source labels. This is provenance, not permission to reproduce protected source content.
10. **Public delivery is version-aware.** Catalogue responses expose current published snapshots only; private drafts and reviewer evidence remain restricted. Cache keys include release/version and locale where representation varies.

## 3. Domain vocabulary and hierarchy

The conceptual learning hierarchy is:

```text
Curriculum Track
  └── Level (Beginner / Intermediate / Advanced / Professional)
       └── Module (track-specific learning unit)
            ├── Chapter (ordered grouping; optional where source map has no chapter detail)
            │    └── Topic (stable W3Schools-mapped concept)
            └── Lesson references (authored content units)
                 └── Published lesson/locale versions (C1, C15)

Prerequisite graph connects learning nodes across this hierarchy.
A learner's selected pathway determines which conditional edges apply.
```

Definitions:
- **Track:** a coherent learning route, e.g. web, Python or SQL; track catalogue identity is not the same as a language preference.
- **Level:** ordered progression band B7–B10. Level is descriptive and does not imply that all tracks contain equal module counts.
- **Module:** a planned unit in the approved curriculum maps; stable module ID and ordering within its parent scope.
- **Chapter:** an optional grouping beneath a module or source-defined tutorial section. Only create when supported by the captured W3Schools map; do not invent a chapter merely to fill UI.
- **Topic:** stable curriculum concept mapped to one or more W3Schools source labels/URLs. A topic may be reused in more than one module through explicit mapping.
- **Lesson:** authored instructional unit following C1. One topic may have multiple lessons; a lesson may cover a bounded set of topic IDs. Content identity/version is owned by Content module.
- **Pathway:** a learner-selected ordered view over one or more tracks/modules, with conditional dependencies resolved for that selection. It is not a new source curriculum.
- **Release:** immutable set of catalogue and content versions eligible for learner delivery, with C15 approvals and hashes.

### 3.1 Ownership boundaries

| Capability | Owner | Contract |
|---|---|---|
| Track, level, module, chapter, topic identity and ordering | Curriculum | Stable IDs, mappings, publication snapshot |
| W3Schools source mapping | Curriculum | URL, source label, capture provenance and status |
| Prerequisite graph and pathway rules | Curriculum | Typed edges, conditions, graph validation |
| Lesson identity, versions, locale blocks and assets | Content | C1 schema, immutable version and locale hash |
| Review assignments, approvals and release manifest | Authoring & Review | C14/C15 gates, hash-bound approval |
| Learner selection/enrolment | Learner/Curriculum boundary | Learner-owned selection, eligibility checks |
| Completion, mastery and remediation state | Learning Progress (D10) | Evidence events, scoring integration |
| Assessment item delivery and scoring | Assessment | C12 rules and protected answer keys |
| Locale selection/fallback | Language Engine (D8) | Supported locale, parity and fallback rules |
| Course discovery/navigation UI | Web/Mobile clients | API-driven display only |

No module may write another module's tables directly. Cross-module interaction uses application interfaces/events defined under D13.

## 4. Curriculum catalogue data contracts

Every node has:
- opaque UUID `id`;
- stable human-readable `code` where supplied by the curriculum map;
- `slug` unique within documented parent scope;
- `title`/label key (display translation is D8);
- `nodeType`, `parentId`, `position`;
- `trackId` and `levelId` where applicable;
- lifecycle state and immutable catalogue version reference;
- source mapping references and coverage status;
- created/updated timestamps and audit actor.

The code values in existing maps (for example B7-001 or B8-WEB-01) are import/source identifiers and should be retained as alternate keys, not used as authorization secrets or assumed to be globally unique without a namespace.

### 4.1 Source and coverage provenance

For each mapped topic/module:
- retain the W3Schools canonical URL and exact source label/category as captured;
- record source register/file and stable source row ID;
- record capture/review timestamp and mapping status (mapped, partial, needs-reconciliation, retired);
- allow multiple source URLs for a topic only when each is justified by the captured source map;
- distinguish `indexed`, `mapped_to_module`, `lesson_authored`, `reviewed` and `published` statuses. Never treat one as another.

B12 limitations remain visible: B3/B4 inventories are not exhaustive; B6's 3,232 records are indexed records, not completed lessons; B7–B10 maps are bounded learning sequences; the B3/B6 Spaces reconciliation remains open. D7 does not close those curriculum gaps.

### 4.2 Chapter policy

A chapter is optional. Use it only where the source catalogue/map supplies a meaningful chapter grouping or where an approved course design groups existing mapped topics without adding topics. A chapter may contain topics and lesson references; it does not become a new source topic. Where upstream chapter capture is partial/index-only, mark chapter coverage partial and do not imply exhaustive chapter completeness.

## 5. Prerequisite graph and progression rules

### 5.1 Edge contract

A prerequisite edge contains:
- source node and target node;
- dependency type: `required`, `conditional`, or `recommended`;
- condition expression ID/reference for conditional edges (never executable client code);
- hard-gate flag;
- remediation node references;
- source mapping and explanatory rationale;
- policy version and lifecycle status.

The existing B11 dependency map is authoritative for initial relationships. Preserve its 70 recorded edges and exact module identifiers. Do not infer extra edges from sequence numbers alone. A module's display order is not automatically a prerequisite.

### 5.2 Evaluation

For a requested target node and selected pathway:
1. Resolve active published catalogue snapshot and selected track/specialization.
2. Load incoming prerequisite edges for the target.
3. Ignore conditional edges whose approved condition is false/not applicable to this selected path; treat unknown condition as unresolved and block a hard-gated transition.
4. For each required/hard-gate edge, ask D10 for server-authoritative completion/mastery evidence at the required outcome/policy level.
5. Recommended edges may be displayed as preparation but do not block access unless an explicit policy version makes them required.
6. If a required prerequisite is unsatisfied, return a remediation path containing only the missing relevant nodes; preserve unrelated progress.
7. Re-evaluate on the server when starting a gated assessment or marking a gated transition. A previously rendered client route is not authorization.

### 5.3 Graph integrity

Before publication:
- reject self-edges, duplicate edges, missing endpoints and cross-release dangling references;
- reject cycles in required/conditional dependency graph; report the cycle path;
- require conditional expressions to use a bounded, typed, allowlisted rule vocabulary;
- ensure every remediation target exists and is reachable;
- detect impossible gates (target depends on itself indirectly, mutually exclusive conditions, or a required node not present in any supported pathway);
- version the graph; a changed edge invalidates dependent pathway readiness decisions where relevant.

A graph change must not silently erase learner evidence. D10 determines how changed prerequisites affect already completed learners; preserve prior evidence and apply an explicit migration/reassessment policy.

## 6. Pathway selection and learner navigation

A learner may select one or more supported pathways. Selection records:
- learner principal (server-resolved);
- selected track/specialization and current catalogue release;
- locale preference reference (D8 owns locale);
- optional goal/target module only if represented by approved curriculum;
- selection status and timestamps.

Rules:
- Do not force a learner to study every programming language or track.
- The common orientation module and B7–B10 entry rules apply according to B7/B11 definitions.
- A learner may browse public catalogue without enrollment if the product access policy permits; private progress remains authenticated.
- Switching pathways preserves completed evidence. It must not rewrite prior attempts or mark unrelated tracks complete.
- When a learner selects a new specialization, recompute only its applicable conditional prerequisites and explain missing foundations.
- A pathway recommendation can suggest a route but cannot silently enroll or override learner choice.
- Learner course navigation is derived from the published catalogue plus D10 progress evidence; client sorting must not change canonical order.

## 7. Publication, versioning and change management

### 7.1 Lifecycle

Catalogue nodes use controlled states: `draft`, `in_review`, `approved`, `published`, `stale`, `withdrawn`, `retired`, `archived`. The canonical state transitions and guards are in `D7_COURSE_LIFECYCLE_STATE_MACHINE.csv`.

A release is a frozen manifest containing:
- catalogue snapshot/version and dependency graph version;
- exact module/chapter/topic order and relationships;
- referenced lesson IDs and immutable lesson/locale version hashes;
- required locale set and actual locale approval status;
- source mapping revision;
- C15 approval/release references and release actor/time.

Only a release with all required current-hash approvals is learner-visible. Draft updates create a new candidate version. Published snapshots are never edited in place.

### 7.2 Change impact

For any change to module/topic order, prerequisites, lesson mapping, locale availability, glossary or other required dependency:
- compute impacted releases/pathways and learner-facing links;
- mark affected review/readiness evidence stale when dependency fingerprints change;
- submit changed content through C15 where content approval is required;
- publish a new release; retain old release history for audit and safe rollback;
- do not silently remap existing progress or delete old IDs.

Retiring a topic/module prevents new pathway selection according to policy but preserves references for historical learner records. Replacements require explicit supersession mapping and D10 migration decision.

### 7.3 Locale publication

Catalogue labels and lesson variants are separate concerns. A learner-requested locale is served only when the locale representation is approved for the current release. D8 defines fallback policy; absent an approved fallback, return a clear locale-unavailable response rather than silently showing another language. Never translate code, identifiers, commands, filenames or expected output.

## 8. Learner-facing course delivery contract

The course engine provides logical read operations:
- list published tracks and levels;
- retrieve track/module/chapter/topic detail;
- retrieve ordered module/topic/lesson navigation for a published release;
- retrieve a learner's selected pathways and eligibility/remediation summary;
- evaluate prerequisite readiness for a target node;
- resolve lesson references to Content API representations for the requested approved locale.

Response rules:
- stable IDs and canonical ordering;
- current release/version and locale metadata;
- only published/approved content references;
- prerequisite state labelled `satisfied`, `blocked`, `recommended` or `not_applicable`;
- no answer keys, reviewer comments, internal drafts or private author metadata;
- pagination for large catalogues (D5 cursor rules);
- ETag/version token for cacheable published catalogue representations;
- authenticated endpoints derive learner identity from D6 principal; never accept a learnerId as authority.

D5's existing `GET /tracks`, `GET /tracks/{trackId}`, `GET /tracks/{trackId}/modules`, `GET /modules/{moduleId}` and `GET /topics/{topicId}` remain the base public catalogue endpoints. The following logical contract additions require D5/OpenAPI reconciliation before implementation:
- `GET /tracks/{trackId}/levels`
- `GET /modules/{moduleId}/chapters`
- `GET /chapters/{chapterId}`
- `GET /modules/{moduleId}/topics`
- `GET /pathways` and `GET /pathways/{pathwayId}` (published pathway definitions only)
- `GET /learners/me/pathways`, `POST /learners/me/pathways`, `DELETE /learners/me/pathways/{selectionId}`
- `GET /learners/me/learning-readiness?targetNodeId=...`
- `GET /nodes/{nodeId}/prerequisites`
- `GET /releases/{releaseId}` restricted to authorized staff where not public.

These are proposed logical routes, not deployed endpoints. D5 remains the source of wire schemas, error envelopes, pagination, idempotency and OpenAPI security definitions.

## 9. Persistence alignment with D4

D4 already defines `curriculum_track`, `curriculum_level`, `curriculum_module`, `curriculum_topic`, `curriculum_module_topic`, `curriculum_prerequisite`, `content_lesson`, immutable content versions and review/release records. D7 refines, rather than replaces, those entities.

Proposed logical additions/refinements (not migrations):
- `curriculum_catalogue_release`: immutable published catalogue snapshot and hash.
- `curriculum_chapter`: optional chapter identity, parent module, order and lifecycle.
- `curriculum_module_chapter`: explicit ordered module/chapter mapping only if a chapter may be reused; otherwise chapter has one module parent and no join is needed.
- `curriculum_pathway`: curated pathway definition over existing tracks/modules, versioned and source-bounded.
- `curriculum_pathway_node`: ordered membership and optional/required selection flags.
- `learner_pathway_selection`: learner's selected pathway, status and release reference; unique active selection according to product policy.
- `curriculum_source_mapping`: normalized many-to-many source URLs/labels/register references where current topic fields are insufficient.
- `curriculum_supersession`: old-to-new node mapping with effective release and reason.

Do not duplicate lesson body, locale text, review decision or progress state in Curriculum tables. Exact entity names, FKs, indexes and retention are finalized during D4 schema refinement before migrations.

## 10. Security, privacy and resilience

- Public catalogue endpoints return published records only; drafts/reviewer data require D6 authorization.
- Learner pathway operations bind principal from authenticated context; reject or ignore client-supplied principal IDs.
- Enforce object-level authorization for learner selections and readiness details.
- Validate all node IDs, filters, locale codes, condition IDs and cursor scope at runtime.
- Never evaluate arbitrary condition expressions, SQL fragments or user-supplied graph code.
- Limit graph depth/node count and bound traversal work; cache immutable published graph snapshots.
- Prevent IDOR on private pathway selections, readiness and progress references.
- Use transaction + uniqueness constraints for concurrent pathway selection and publication.
- Public cache invalidation is release-keyed; private learner responses are not shared-cacheable.
- Preserve source attribution and content provenance; do not store copied W3Schools lesson text/code.
- Do not expose answer keys, unpublished lesson versions or reviewer comments through navigation responses.
- Any imported curriculum CSV is untrusted input: schema-validate, preserve source IDs, detect duplicates, reject malformed URLs outside W3Schools and produce a reconciliation report.

## 11. Acceptance criteria and future test plan

D7 is accepted as an architecture artifact when:
- hierarchy and module ownership are unambiguous;
- B7–B12 scope and B11's recorded dependencies are preserved without curriculum expansion;
- optional chapter behavior and incomplete source maps are explicit;
- prerequisite edge types, conditions, cycle detection and remediation are specified;
- learner pathway selection is track-specific and preserves unrelated evidence;
- catalogue/content/review/progress/assessment/locale boundaries are explicit;
- published catalogue and locale delivery are immutable and C15-gated;
- D4/D5 alignment and unresolved implementation decisions are recorded.

Future tests (not executed in this planning task):
1. Import every B7–B10 map row with stable source ID and no duplicate module identity.
2. Preserve all 70 B11 dependency edges exactly; reject duplicate/self/missing-node edges.
3. Detect direct and indirect cycles and report the cycle path.
4. Reject unknown conditional-expression identifiers and arbitrary expression payloads.
5. Verify condition false skips only the conditional edge; unknown condition blocks hard gates.
6. Ensure recommended prerequisites never block by default.
7. Verify selected-track readiness does not require unrelated language tracks.
8. Verify prerequisite remediation returns only missing relevant nodes.
9. Verify a learner cannot claim mastery by opening a lesson.
10. Verify client cannot submit another principal's ID for pathway selection.
11. Prevent duplicate active selections under concurrent requests according to selection policy.
12. Verify pathway switching preserves existing progress evidence.
13. Ensure a missing chapter map remains explicitly partial rather than synthesizing chapters.
14. Verify source URLs are W3Schools-only and source register references remain intact.
15. Verify topic reuse across modules does not duplicate stable topic identity.
16. Ensure lesson body/locale content remains owned by Content module.
17. Block publication with missing C15 approvals, stale hash or unavailable required locale.
18. Ensure a changed prerequisite graph invalidates only affected readiness evidence.
19. Ensure a new catalogue release does not mutate prior published snapshot.
20. Verify retired nodes remain resolvable for historical learner records but not new selection.
21. Ensure public endpoints never return draft, reviewer or answer-key data.
22. Verify locale-unavailable behavior follows D8 policy and never silently substitutes an unapproved locale.
23. Verify ETag and cursor pagination are scoped to the catalogue release and query.
24. Verify imported CSV validation rejects malformed schema, duplicate IDs and non-W3Schools URLs.
25. Verify graph traversal depth and node-count limits under adversarial input.
26. Verify all pathway mutation operations are idempotent/concurrency-safe as required by D5.

## 12. Open decisions and handoff

Before implementation:
- Decide whether pathways are curated static definitions only or allow learner-configured optional module selections.
- Decide whether chapters are always single-parent or reusable through a join table.
- Define exact completion/mastery evidence thresholds with D10/C12; D7 will consume, not invent them.
- Define default locale and locale fallback policy with D8.
- Reconcile proposed logical routes and response schemas into D5 OpenAPI contracts.
- Refine D4 entity matrix/Prisma schema and catalogue release storage.
- Define content publication dependency fingerprint and rollback procedure with C15/D14.
- Set catalogue graph traversal limits, cache TTL/invalidation and public/private caching policy during F/security/performance work.

**Handoff:** D8 — Design the language engine. D7 does not claim course data imported, course UI built, APIs deployed, learner progress calculated, lessons authored or tests executed.
