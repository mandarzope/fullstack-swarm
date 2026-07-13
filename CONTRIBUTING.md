# Contributing to fullstack-swarm

## Repo layout

- `skills/` — the actual installable surface. Each `skills/<name>/SKILL.md` becomes a slash command wherever the plugin is installed. **This is the source of truth.**
- `.claude/agents/`, `.claude/commands/`, `CLAUDE.md`, `prd/ stories/ design/ src/ web/ tests/` — a live copy of what `/swarm-init` writes into a fresh project, kept here so this repo can dogfood its own pipeline. Kept in sync **by hand** with `skills/swarm-init/SKILL.md`.
- `.claude-plugin/plugin.json` / `marketplace.json` — plugin manifests.

## Making a change

1. Decide whether the change affects subagent behavior, dispatch rules, or scaffold content.
2. Edit `skills/swarm-init/SKILL.md` first — it's the canonical embedded copy of every file `/swarm-init` writes (`CLAUDE.md`, all 8 agent defs, all 3 commands, all scaffold READMEs/schemas).
3. Mirror the same edit into the corresponding root-level file (`CLAUDE.md`, `.claude/agents/*.md`, `.claude/commands/*.md`) so the two stay identical. A diff between an embedded block and its root-level counterpart is a bug.
4. If you touched `skills/next/SKILL.md` or `skills/ship-prd/SKILL.md`, also mirror into `.claude/commands/next.md` / `ship-prd.md`.
5. Bump `version` in both `.claude-plugin/plugin.json` and `.claude-plugin/marketplace.json` (they must match).

## Testing locally

Load the plugin for one session without installing:

```bash
claude --plugin-dir /path/to/this/repo
```

Or install from this directory as a local marketplace (persists across sessions):

```bash
claude plugin marketplace add /path/to/this/repo
claude plugin install fullstack-swarm
```

Then in a scratch project directory: `/swarm-init`, drop a toy PRD in `prd/current.md`, run `/ship-prd`, and watch the queue in `stories/_queue.json` move through the full state machine — including at least one `ui`/`fullstack` story so the UX-design and visual-QA stages actually run.

## What to keep in mind when editing an agent definition

- Every subagent's `description` frontmatter must start with `MUST BE USED` — that's what tells the orchestrating session when to dispatch it.
- Every subagent's mandatory final output is a `<status>` block with an exact schema. Changing its fields means updating `CLAUDE.md`'s "Mandatory subagent output" section and `stories/_schema.json` in lockstep.
- Subagents cannot dispatch each other. Don't add instructions that imply otherwise.
- Keep the pipeline stack-agnostic. Don't bake in a specific backend language, frontend framework, or product domain — those belong in the project's own `CLAUDE.md`/LLDs, not in this plugin's agent definitions.

## Reporting issues / proposing changes

Open an issue or PR against this repo. For anything that changes the status vocabulary or track-routing table, explain the failure mode you hit — these are load-bearing for the whole state machine, so changes need a concrete scenario, not just a preference.
