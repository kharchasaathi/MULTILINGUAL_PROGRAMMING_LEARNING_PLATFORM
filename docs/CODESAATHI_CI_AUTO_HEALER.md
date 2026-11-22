# CodeSaathi CI Auto-Healer

## What it does

The workflow `.github/workflows/codesaathi-ci-auto-healer.yml` listens for completed runs of the verified workflows: `SQL course validation`, `Added lessons browser, technical and accessibility review`, `Python Course Validation`, `F1.7 curriculum validation`, and `CodeSaathi Project Health Management`.

1. Reads the failed workflow run and its failed job/step metadata through the GitHub Actions API.
2. Retries failed jobs once only when the failed step is GitHub runner provisioning (`Set up job`).
3. Opens one deduplicated GitHub issue for deterministic, unknown, or still-failing runs.
4. Includes the workflow run URL, branch, commit SHA, failed jobs, failed steps, classification, and recovery decision.

## Safety boundaries

- It never checks out or executes the failed run's source code.
- It never reads or executes workflow artifacts.
- It does not retry checkout, dependency installation, browser setup, content assertions, tests, lint, compilation, security checks, or other project steps.
- It has a one-retry ceiling; no retry loops.
- It does not edit source code, generate repair commits, or merge pull requests.
- A maintainer must diagnose and approve any code repair.

## Required repository settings

- The workflow must be present on the repository's default branch for `workflow_run` events to be received.
- The repository Actions settings must allow the workflow's `GITHUB_TOKEN` to create issues.
- The token permissions declared in the workflow are limited to `actions: write`, `contents: read`, and `issues: write`.

## Manual inspection

Use the workflow's **Run workflow** action and supply a failed run ID. The run must belong to this repository and have a `failure` conclusion. This is useful for testing the diagnostic path against an older failed run.

## Extension path

This is the safe monitoring and bounded-retry foundation. Autonomous AI code repair is intentionally not enabled in this phase: it needs an explicitly configured model credential, a narrow repair policy, dedicated validation, and human review. Add repair-PR generation only after recurring failure classes have been observed and safe deterministic fixes can be allow-listed. It must not run untrusted PR code in a privileged `workflow_run` context.


## AI-assisted repair draft PR workflow

The optional workflow `.github/workflows/codesaathi-ai-repair-pr.yml` adds a human-reviewed repair proposal path. It is deliberately **manual-only** (`workflow_dispatch`) and is not triggered automatically by untrusted pull-request events.

### One-time configuration

1. Add an OpenAI API key as the repository Actions secret `OPENAI_API_KEY`.
2. Optionally set the repository Actions variable `OPENAI_REPAIR_MODEL` to a model enabled for the API project. If unset, the workflow uses `gpt-6.2-sol`.
3. Keep the repository's default Actions workflow token permission at Read and write (already confirmed by the repository owner). The workflow further scopes permissions per job.

### Run

From Actions → **CodeSaathi AI Repair PR** → Run workflow:
- `issue_number`: an open `[CI Auto-Healer]` issue.
- `target_branch`: the exact failed run branch recorded in that issue.

The workflow verifies the issue/run relationship and that the run failed on the selected branch. It obtains failed logs, identifies only referenced `scripts/*.mjs` files, and asks the Responses API for a structured, minimal replacement proposal.

### Safety gates

- AI repair is opt-in and manual; no issue label automatically invokes it.
- Only existing `scripts/*.mjs` files explicitly referenced by the failed log are eligible. At most three files and 50 KB per file are accepted.
- Workflow files, dependencies, secrets, application content, and arbitrary new files are outside the allow-list.
- The target branch is checked out as data only in the proposal job; no repository code is executed there.
- The proposed files are syntax-checked in a separate job with no secrets and read-only permissions.
- A separate PR job rechecks the path/size policy, applies the validated proposal, and opens a **draft PR**. It does not run repository code, approve, or merge.
- Full project tests and human review remain mandatory before merge. A syntax check is not proof of semantic correctness.
- If logs do not identify an eligible source file, the model refuses a safe proposal, the API key is missing, or validation fails, the workflow stops without a PR.

This workflow creates a guarded AI-assisted draft PR proposal, not autonomous production repair. The first live run still requires the owner to configure `OPENAI_API_KEY` and manually dispatch it against a suitable diagnostic issue.
