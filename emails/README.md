# Build-log email base

`base.tsx` owns EmailLayout → Header → Section → Cta → Footer. It follows
Radar A4.7's React Email structure: one column, tables, inline styles, a hosted
PNG, preheader, explicit language and a rendered plain-text alternative.
`build-log.tsx` supplies issue content; `confirmation.tsx` uses the same base.
There is one CTA per message. List-Unsubscribe headers remain in the sending adapter.

## Tokens and site mapping

| Role | Site source | Email |
| --- | --- | --- |
| Paper / ink | global.css | #ffffff / #171717 |
| Secondary / rules | personal-index.css | #616161 / #d9dde5 |
| Link / action | --index-blue | #2449d8; inline underline; square cobalt CTA |
| Body | IBM Plex Sans 400, 18–20px | Arial, Helvetica, sans-serif; 17px / 27px |
| Headings | Site mixes Instrument Serif 400 with sans navigation | Compact Arial 600; H1 28/34, H2 20/26; no oversized serif fallback |
| Metadata | IBM Plex Mono 400, 12px | Courier New, Courier, monospace; 12/20 |
| Name mark | IBM Plex Sans 600, 22/28, −0.6px | Exact lowercase “wiel zouantcha ↗” rasterized using the live site's loaded font |
| Spacing | 12, 20, 24, 28, 32, 56px site rhythm | 24px gutters; 24/28/32px section rhythm; max 600px |

Arial's compact proportions are a stable web-safe approximation of IBM Plex
Sans; Helvetica is its Mac fallback. Courier New preserves fixed-width metadata.
Gmail needs no downloaded fonts. The name remains exact in a 440×80 PNG displayed
at 220×40, with a white backing so it stays readable on inverted backgrounds.
The staging asset is served by the site's own static assets at
`https://zouantcha-site-staging.wiel.workers.dev/email/wiel-wordmark@2x.png`.
Production confirmations select the production asset origin; deploy the PNG to
production before promoting these templates. No production deployment is part of
this change.

Dark mode is progressive enhancement: the inline light palette works by itself.
The small optional style block adds dark surfaces, pale cobalt links and readable
body/secondary text. The footer breaks the street number and each address word with U+200D joiners
and resets Apple data-detector links. Plain text removes the invisible joiners.
Browser sandboxes cannot certify Gmail/iOS's proprietary address detectors;
inbox receipt remains the final client check.

For another brand, keep the component order and table layout, replace the tokens,
host a 2× PNG, choose explicit web-safe stacks, then run the same rendering gate.

Run `pnpm emails:preview [output-directory]` for issue + confirmation HTML/text,
style-stripped Gmail-like variants, a safe sample operator payload and lint results.
Preview URLs are inert. Never save real unsubscribe/confirmation capabilities in
screenshots or reports. The preview command does not send email.

The operator payload retains `paragraphs` for older staging tooling and adds
validated structured `issue` content (number/date/preheader/intro/built/broke/
numbers/closing/CTA). Rendering is asynchronous; callers must await it.
