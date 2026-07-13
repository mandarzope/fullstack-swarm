# fullstack-swarm

Claude Code plugin — PRD-to-code pipeline via an eight-subagent swarm, spanning backend and UI tracks.

Drop in a product requirements document, run one command, and a coordinated swarm of specialized AI subagents decomposes it into track-tagged stories, designs architecture, writes UX specs, implements backend and frontend, and gates every UI-facing story behind real browser-driven visual QA — each stage in its own sandboxed context window.

This is the fullstack sibling of the backend-only [`agent-swarm`](https://github.com/mandar-zope/orchestrator) plugin: same orchestration model (typed state machine, no subagent-to-subagent dispatch, mandatory `<status>` handoff block), extended with a `track` (backend/ui/fullstack) on every story and three more subagents to carry UI work all the way to a verified screen.

## What you get

| Subagent | Tracks | Job |
|---|---|---|
| `project-manager` | all | Decomposes PRD → atomic, track-tagged user stories |
| `solution-architect` | all | Writes HLD + ADRs per story |
| `tech-lead` | all | Writes LLD (modules, signatures, test strategy), confirms track |
| `ux-designer` | ui, fullstack | Writes UX spec + shared design tokens — no code |
| `developer` | backend | Implements backend LLD, writes tests, runs suite |
| `frontend-developer` | ui, fullstack | Implements UX spec + LLD under `web/`, writes tests, builds |
| `qa-engineer` | all | Validates ACs, probes edge cases, PASS/FAIL — routes UI PASS to visual-qa |
| `visual-qa` | ui, fullstack | Runs the real app, drives flows with browser automation, screenshots, PASS/FAIL |

The orchestrator (you, via `CLAUDE.md`) routes every handoff through a typed state machine. Subagents cannot dispatch each other — all handoffs are explicit, and every story carries a `track` that determines which implementer, and whether a UX/visual-QA detour, it goes through.

## Install

`plugin install` only resolves plugins that appear in a **configured marketplace**; a bare directory path or bare repo is not a valid install target on its own.

**From GitHub, run once:**

```bash
claude plugin marketplace add mandarzope/fullstack-swarm
claude plugin install fullstack-swarm
```

Use `fullstack-swarm` (the `name` in `.claude-plugin/plugin.json`), not the repo path.

**From a local clone (local path as marketplace):**

```bash
claude plugin marketplace add /path/to/fullstack-swarm
claude plugin install fullstack-swarm
```

**Develop without installing** (loads the plugin for that session only):

```bash
claude --plugin-dir /path/to/fullstack-swarm
```

## Quick start (any project)

In the target project — a fresh repo or an existing one — with the plugin installed:

```
/swarm-init
```

This scaffolds `.claude/agents/`, `.claude/commands/`, `CLAUDE.md`, and the `prd/ stories/ design/ src/ web/ tests/` directories in the **current working directory**. Safe to re-run; skips files that already exist unless you pass `--force`.

Then:

```
prd/current.md          # write your PRD here
/ship-prd                # decomposes the PRD and runs the pipeline autonomously
/status                  # inspect the queue at any time
/next                    # advance manually if you stopped autonomous mode
```

## Status vocabulary

`DRAFT → READY_FOR_ARCH → READY_FOR_LLD → (READY_FOR_UX_DESIGN →) READY_FOR_BUILD → READY_FOR_QA → (READY_FOR_VISUAL_QA →) DONE`, with `FAILING_QA` / `FAILING_VISUAL_QA` / `BLOCKED` as branch points. Backend stories skip the parenthesized UI-only stages entirely. See `CLAUDE.md` for the full state machine and track-routing table.

## Repo layout

This repo doubles as a working example of the pipeline it ships: `.claude/agents/`, `.claude/commands/`, `CLAUDE.md`, and the `prd/ stories/ design/ src/ web/ tests/` scaffold at the root are a live copy of what `/swarm-init` writes into a fresh project, kept in sync by hand. The actual installable surface is `skills/` — those four skills (`swarm-init`, `ship-prd`, `status`, `next`) become the plugin's slash commands wherever it's installed.

## Why a separate plugin from `agent-swarm`

`agent-swarm` is deliberately backend-only and five agents — simple, fast, no UI opinions. `fullstack-swarm` adds a real track-routing state machine and three more roles because "PASS the tests" isn't the same bar as "a human would accept this screen." Use whichever one matches the project; they can't be merged into one plugin without either agent-swarm consumers gaining UI-track complexity they didn't ask for, or a runtime flag doing the same job less legibly.
