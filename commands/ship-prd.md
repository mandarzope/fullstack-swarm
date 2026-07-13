---
name: ship-prd
description: Kick off the track-aware agent swarm pipeline from prd/current.md, autonomously draining stories until all DONE, BLOCKED, or stuck.
---

Read `CLAUDE.md` to refresh the orchestration rules and track routing. Then verify:

1. `prd/current.md` exists and is non-empty.
2. `stories/_queue.json` exists and contains an empty stories array.

If `prd/current.md` is missing, tell the user and stop.

If `_queue.json` is non-empty, ask the user whether to overwrite (start fresh) or merge
(decompose only the new sections of the PRD). Do not proceed without an answer.

If both conditions are clean, dispatch the `project-manager` subagent with this prompt:

> Decompose `prd/current.md` into user stories, tagging each with a `track`
> (backend/ui/fullstack). Read `stories/_schema.json` before writing `stories/_queue.json`.
> Follow your subagent definition exactly. Surface any ambiguities as `questions_for_human`.
> End with the mandatory `<status>` block.

After the project-manager returns, parse the `<status>` block, update `stories/_queue.json`
accordingly, and announce the queue state.

**Autonomous continuation:** immediately run the same autonomous loop as `/next`: repeatedly
apply the dispatch decision rules from `CLAUDE.md` in priority order, dispatch eligible
stories in parallel batches (cap 7), update `_queue.json` after each batch, and continue
without waiting for another `/next`.

**Stop conditions:**
- Any story `BLOCKED` — report and stop.
- Every story in the queue is `DONE` — report a short success summary and stop.
- No eligible batch and not the "empty queue + PRD present" special case — report and stop,
  do not spin.
