<p align="center">
  <img src="https://fullstack-swarm.com/assets/logo.png" alt="fullstack-swarm logo" width="120" height="120" />
</p>

# fullstack-swarm

**Turn a product requirements doc into working backend and UI code with an eight-agent swarm.** Drop in `prd/current.md`, run `/ship-prd`, and specialized subagents decompose, design, implement, and QA — including browser-driven visual checks for every UI story.

Works as a plugin for **Cursor** and **Claude Code**. Sibling of the backend-only [`agent-swarm`](https://github.com/mandarzope/fullstack-swarm) plugin, extended with `ui` / `fullstack` tracks, UX design, and visual QA.

<p align="center">
  <img src="https://fullstack-swarm.com/assets/readme-hero.jpg" alt="Eight specialized agents orchestrated from PRD through design, build, QA, and DONE" width="920" />
</p>

## Why it exists

Most agent setups dump everything into one context window. fullstack-swarm keeps a typed status machine in the main session and dispatches **one specialized subagent per stage**. Subagents never call each other — every handoff goes through the orchestrator — so you get clear artifacts (`stories/`, `design/`, `src/`, `web/`, `tests/`) and a queue you can inspect with `/status`.

## Quick start

### 1. Install the plugin

<details>
<summary><strong>Cursor</strong> (recommended for local try-out)</summary>

```bash
git clone git@github.com:mandarzope/fullstack-swarm.git
mkdir -p ~/.cursor/plugins/local
ln -s "$(pwd)/fullstack-swarm" ~/.cursor/plugins/local/fullstack-swarm
```

Restart Cursor (or reload plugins). Then open any project and continue with step 2.

</details>

<details>
<summary><strong>Claude Code</strong> — from GitHub</summary>

```bash
claude plugin marketplace add mandarzope/fullstack-swarm
claude plugin install fullstack-swarm
```

Use the plugin name `fullstack-swarm`, not the repo path.

</details>

<details>
<summary><strong>Claude Code</strong> — from a local clone</summary>

```bash
git clone git@github.com:mandarzope/fullstack-swarm.git
cd fullstack-swarm
claude plugin marketplace add "$(pwd)"
claude plugin install fullstack-swarm
```

Session-only (no install):

```bash
claude --plugin-dir /path/to/fullstack-swarm
```

</details>

### 2. Scaffold a project

In the **target** repo (fresh or existing):

```text
/swarm-init
```

This creates `prd/`, `stories/`, `design/`, `src/`, `web/`, `tests/`, `CLAUDE.md`, `.claude/agents/`, and `.cursor/rules/orchestrator.mdc`. Safe to re-run; skips existing files unless you pass `--force`.

### 3. Ship from a PRD

```bash
# write requirements
$EDITOR prd/current.md
```

Then in the agent:

```text
/ship-prd
```

Watch progress anytime:

```text
/status
```

Resume after a stop or human gate:

```text
/next
```

## Commands

| Command | What it does |
|---|---|
| `/swarm-init` | Scaffold dirs, agents, orchestrator rules |
| `/ship-prd` | Decompose `prd/current.md` and run the pipeline |
| `/status` | Read-only queue table + next dispatch |
| `/next` | Keep dispatching eligible stories until DONE / BLOCKED / stuck |

## The swarm

| Subagent | Tracks | Job |
|---|---|---|
| `project-manager` | all | PRD → atomic, track-tagged stories |
| `solution-architect` | all | HLD + ADRs |
| `tech-lead` | all | LLD + confirmed track |
| `ux-designer` | ui, fullstack | UX spec + design tokens (no code) |
| `developer` | backend | Implement + tests under `src/` |
| `frontend-developer` | ui, fullstack | Implement + tests under `web/` |
| `qa-engineer` | all | Functional QA report |
| `visual-qa` | ui, fullstack | Live browser checks + screenshots |

**Tracks:** `backend` skips UX and visual QA. `ui` / `fullstack` go through both.

**Statuses:**  
`DRAFT → READY_FOR_ARCH → READY_FOR_LLD → (READY_FOR_UX_DESIGN →) READY_FOR_BUILD → READY_FOR_QA → (READY_FOR_VISUAL_QA →) DONE`  
with `FAILING_QA` / `FAILING_VISUAL_QA` / `BLOCKED` as branch points. Full rules live in [`CLAUDE.md`](CLAUDE.md).

## Repo layout

| Path | Role |
|---|---|
| `.cursor-plugin/` | Cursor plugin manifests |
| `.claude-plugin/` | Claude Code plugin manifests |
| `agents/` · `commands/` · `skills/` · `rules/` | Installable plugin surface |
| `.claude/agents/` · `CLAUDE.md` · scaffold dirs | What `/swarm-init` writes into a project |

## Contributing

See [`CONTRIBUTING.md`](CONTRIBUTING.md) for how to change agents, skills, and manifests in sync.  
By participating, you agree to the [`CODE_OF_CONDUCT.md`](CODE_OF_CONDUCT.md).  
Security reports: [`SECURITY.md`](SECURITY.md).

## License

[MIT](LICENSE.md) © mandar-zope
