#!/usr/bin/env bash
set -Eeuo pipefail
# Fail-closed cutover gate. Hook executables must be deployed and reviewed by
# the owning E11/E12 teams; this script never invents or silently skips hooks.
require_yes() {
  local name="$1"
  [[ "${!name:-}" == YES ]] || { echo "Cutover blocked: $name=YES is required" >&2; exit 1; }
}
require_exec() {
  local name="$1" path="${!1:-}"
  [[ -n "$path" && -x "$path" && -f "$path" ]] || {
    echo "Cutover blocked: $name must point to an approved executable hook" >&2; exit 1;
  }
}
require_yes RESTORE_DUAL_APPROVAL
require_yes RESTORE_CROSS_SYSTEM_RECONCILIATION
require_yes RESTORE_APPLICATION_SMOKE_TEST
require_yes RESTORE_CODE_EXECUTION_DISABLED
require_exec E11_TOMBSTONE_REPLAY_EXECUTABLE
require_exec E12_AUDIT_VERIFY_EXECUTABLE
"$E11_TOMBSTONE_REPLAY_EXECUTABLE"
"$E12_AUDIT_VERIFY_EXECUTABLE"
echo "E11 tombstone replay and E12 audit verification hooks passed. Independent owner sign-off is still required before cutover."
