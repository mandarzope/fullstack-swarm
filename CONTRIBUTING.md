# Contributing to fullstack-swarm

## Repo layout

- `skills/` — installable skills. Each `skills/<name>/SKILL.md` becomes a slash-invokable workflow. **`skills/swarm-init/SKILL.md` embeds the canonical copy of every file `/swarm-init` writes.**
- `agents/`, `commands/`, `rules/` — Cursor plugin components (auto-discovered with `.cursor-plugin/plugin.json`).
- `.claude/agents/`, `.claude/commands/`, `CLAUDE.md`, `prd/ stories/ design/ src/ web/ tests/` — live copy of what `/swarm-init` writes into a fresh project (Claude Code paths + scaffold). Kept in sync **by hand** with `skills/swarm-init/SKILL.md`.
- `.cursor-plugin/plugin.json` / `marketplace.json` — Cursor manifests.
- `.claude-plugin/plugin.json` / `marketplace.json` — Claude Code manifests.

## Making a change

1. Decide whether the change affects subagent behavior, dispatch rules, or scaffold content.
2. Edit `skills/swarm-init/SKILL.md` first — it's the canonical embedded copy of every file `/swarm-init` writes (`CLAUDE.md`, `.cursor/rules/orchestrator.mdc`, all 8 agent defs, all 3 commands, all scaffold READMEs/schemas).
3. Mirror the same edit into the corresponding root-level files so they stay identical:
   - `CLAUDE.md` and `rules/orchestrator.mdc` (orchestrator constitution; rule file keeps YAML frontmatter)
   - `agents/*.md` **and** `.claude/agents/*.md`
   - `commands/*.md` **and** `.claude/commands/*.md`
4. If you touched `skills/next/SKILL.md` or `skills/ship-prd/SKILL.md`, also mirror into both `commands/` and `.claude/commands/`.
5. Bump `version` in **all four** manifests so they match:
   - `.cursor-plugin/plugin.json`
   - `.cursor-plugin/marketplace.json`
   - `.claude-plugin/plugin.json`
   - `.claude-plugin/marketplace.json`

A diff between an embedded swarm-init block and its root-level counterpart is a bug.

## Testing locally

### Cursor

```bash
mkdir -p ~/.cursor/plugins/local
ln -s /path/to/this/repo ~/.cursor/plugins/local/fullstack-swarm
```

Restart Cursor, then in a scratch project: `/swarm-init`, drop a toy PRD, run `/ship-prd`.

### Claude Code

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
- Every subagent's mandatory final output is a `<status>` block with an exact schema. Changing its fields means updating `CLAUDE.md` / `rules/orchestrator.mdc` and `stories/_schema.json` in lockstep.
- Subagents cannot dispatch each other. Don't add instructions that imply otherwise.
- Keep the pipeline stack-agnostic. Don't bake in a specific backend language, frontend framework, or product domain — those belong in the project's own `CLAUDE.md`/LLDs, not in this plugin's agent definitions.
- Cursor ignores Claude-only frontmatter fields (`tools`, `model`); keep them for Claude Code compatibility.

## Reporting issues / proposing changes

Open an issue or PR against this repo. For anything that changes the status vocabulary or track-routing table, explain the failure mode you hit — these are load-bearing for the whole state machine, so changes need a concrete scenario, not just a preference.
