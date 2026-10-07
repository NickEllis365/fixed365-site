# Fixed365 v5 — rebuild as React

Give this to Claude Code in the `fixed365` repo folder.

## Task
Rebuild `design/Fixed365 Website v5.dc.html` as a React site (Vite), matching the design exactly, and deploy it via the existing Azure Static Web Apps GitHub workflow.

- To view the design: open `design/Fixed365 Website v5.dc.html` in a browser (keep `support.js` and `_ds/` next to it).
- The file has two parts: the HTML template (markup with `{{ }}` holes, `<sc-for>` loops, `<sc-if>` conditionals) and a `class Component` script holding all data (product table, services, ticket, sizes) and logic. Port the data arrays as-is.
- Font: Archivo (load from Google Fonts: weights 400–900).
- Colours: ground #101A23, panel #14212C, darker band #0C151D, lines #263646 / #2C3E50 / #3A5064, text #EEF3F6, muted #B9C7D2 / #9FB0BF, accent sky #2BA3D9 (hover #57B9E4), category colours: Collaborate #2BA3D9, Secure #5ED1B6, Manage #F2B84B, Automate #B49CF0. Square corners everywhere.

## Sections
1. Sticky header: block-F logo + "Fixed365", nav, hamburger menu under 900px.
2. Hero: headline + animated block "F" (blocks fly in, blue block snaps in last; replays on hover/tap).
3. "What we cover": periodic-table style product grid (4 categories); hover/click a tile → detail panel.
4. "How we help": 4 services, each with an animated diagram (migration flow, security layers, Intune devices, support ticket timeline).
5. Getting started: 3 steps.
6. Contact: health-check form + phone 07950 428513, hello@fixed365.co.uk.
7. Footer.

## Form
Send via Web3Forms (https://api.web3forms.com/submit). Put the access key in `WEB3FORMS_KEY` (in the component). Show "Request sent." on success, an error message on failure.

## Azure deploy
Update `.github/workflows/azure-static-web-apps-*.yml`: `app_location: "/"`, `output_location: "dist"`. Keep the old `index.html` content out of the build root (Vite uses its own index.html). Test with `npm run build` before pushing.

## Must keep
- Works in Safari (iPhone + Mac) and Chrome.
- Mobile layout: everything stacks cleanly under 900px, buttons have gaps, tap targets ≥ 44px.
- `<title>` and meta description as in the design.
