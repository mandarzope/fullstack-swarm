# Homepage Overrides — fullstack-swarm

> Extends `../MASTER.md`. Rules here win on the marketing homepage.

## Intent

Developer-tool landing page: warm paper light mode, OLED dark mode, Space Grotesk display + Geist body, purple brand dot, split hero with paper-grid terminal demo.

## Color overrides

| Role | Light | Dark | Notes |
|------|-------|------|-------|
| Background | `#f9f8f5` | `#121212` | Warm paper / OLED |
| Foreground | `#171717` | `#f4f1ea` | Near-black / warm off-white |
| Muted surface | `#f2f0ed` | `#1a1a1a` | Section / marquee |
| Secondary | `#eeece8` | `#1c1c1c` | Buttons, chips |
| Border | `rgba(176,168,155,0.4)` | `rgba(90,87,80,0.45)` | Soft taupe |
| Brand accent | `#6200FF` | `#6200FF` | Wordmark dot |
| Primary CTA | `#171717` on `#fff` | `#f4f1ea` on `#121212` | Inverted solid |

## Typography overrides

- **Display / brand / H1–H2:** Space Grotesk (not Inter)
- **Body / UI:** Geist Sans
- **Code / terminal:** Geist Mono
- Brand name in hero is larger than the tagline (brand-first)

## Layout pattern

1. Sticky blur header (wordmark · nav · GitHub · theme toggle)
2. Split hero: left copy + CTAs + marquee; right paper-grid + terminal trace
3. Feature strip (3 columns, hairline grid — not card shadows)
4. Pipeline board on paper grid
5. Agent table
6. Install code panels
7. Command grid
8. FAQ accordion
9. Final CTA band
10. Minimal footer

## Motion

- Marquee ticker on hero stats
- Terminal `rise-in` on load
- IntersectionObserver fade/slide for feature/command/FAQ blocks (150–420ms, `cubic-bezier(0.16,1,0.3,1)`)
- Respect `prefers-reduced-motion`

## Anti-patterns for this page

- No Inter / Roboto / system-only stacks for display
- No purple gradient washes or glow blobs (accent is the brand dot only)
- No dashboard clutter in the first viewport
- No inset hero image cards — terminal is the dominant right-pane visual
