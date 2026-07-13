# Web

Frontend surface for `fullstack-swarm`.

## Marketing homepage

Open locally:

```bash
# from repo root
python3 -m http.server 8765 --directory web
# then visit http://localhost:8765/
```

Or open `web/index.html` directly in a browser.

Published via GitHub Pages from this folder (Actions workflow `.github/workflows/pages.yml`):

`https://mandarzope.github.io/fullstack-swarm/`

| File | Role |
|---|---|
| `index.html` | Homepage markup |
| `styles.css` | Design tokens (paper bg, Space Grotesk + Geist, brand accent) |
| `main.js` | Theme toggle, mobile nav, scroll reveals |

App code for `track: ui` / `fullstack` stories is also written here by `frontend-developer`, to the UX spec from `ux-designer`.
