---
description: Show the current pipeline state and what would dispatch next (read-only).
---

Read `stories/_queue.json`. Print:

1. A table of every story with: slug, title, `track`, status, owner subagent, deps.
2. A count of stories per status.
3. Any `BLOCKED` stories called out at the top.
4. The exact next dispatch the orchestrator would make if the user ran `/next`, including the
   subagent name (track-routed) and the prompt string.
5. If every story is `DONE`, say so explicitly.

Do not dispatch anything. This command is read-only.
