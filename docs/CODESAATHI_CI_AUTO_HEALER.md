# CodeSaathi CI Auto-Healer

## What it does

The workflow `.github/workflows/codesaathi-ci-auto-healer.yml` listens for completed runs of the selected CodeSaathi validation and deployment workflows.

1. Reads the failed workflow run and its failed job/step metadata through the GitHub Actions API.
2. Retries failed jobs once only when every failed step matches the narrow setup/download/cache allow-list.
3. Opens one deduplicated GitHub issue for deterministic, unknown, or still-failing runs.
4. Includes the workflow run URL, branch, commit SHA, failed jobs, failed steps, classification, and recovery decision.

## Safety boundaries

- It never checks out or executes the failed run's source code.
- It never reads or executes workflow artifacts.
- It does not retry content assertions, tests, lint, compilation, security checks, or other deterministic failures.
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

This is the safe monitoring and bounded-retry foundation. A future repair-PR generator should be a separate, explicitly gated workflow with a strict allow-list of repair classes, dedicated validation, and human review. It must not run untrusted PR code in a privileged `workflow_run` context.
