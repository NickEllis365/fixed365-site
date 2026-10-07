# Fixed365 site — working log

## 2026-10-07 — Font/icon experiment reverted

- Tried Fraunces headings (with Public Sans, then Archivo body text) plus official Microsoft architecture icons in the "How we help" diagrams. Owner asked to go fully back to the original v5 design.
- Reset `main` to 395d5be (the live React v5 site). The experiment is kept on the local branch `backup/fraunces-icons` (not pushed) in case it's wanted later.
- Notes for next time: Microsoft's official icons are licensed only for diagrams/training/documentation. There are no diagram-use icons for Exchange, SharePoint, OneDrive or Teams.

## 2026-10-07 — v5 rebuilt as React (Vite)

**Task:** follow `v5-handoff/README.md` to rebuild `v5-handoff/design/Fixed365 Website v5.dc.html` as a React site, build it and push.

**What was done**
- Vite + React 18 project at the repo root: `index.html` (Vite entry), `src/main.jsx`, `src/App.jsx`, `src/data.js` (CATS/SVCS/TICKET/SIZES/BLOCKS ported as-is), `src/styles.css`, and one component per section in `src/components/` (Header, Hero, ProductTable, Services, GettingStarted, Contact, Footer, Logo).
- Hover states and the 900px breakpoint are in CSS (the design used JS width checks). Under 900px: hamburger menu, everything stacks, hero buttons go full-width (56px tall), and the product detail panel stops being sticky. Under 560px: the migration diagram stacks, there are 2 device columns, and team-size buttons go 2x2.
- iOS/Safari: `-webkit-backdrop-filter`, `appearance: none` on inputs, 17px input text (stops iOS zooming in), square corners.
- Added `prefers-reduced-motion` handling and a block-F `public/favicon.svg`.
- Meta description: the design file has none, so I used the one from the old site.
- Old single-file site moved to `legacy/index-v4.html` (outside the build).
- Azure workflow: `output_location: "dist"` (`app_location` was already `/`). Azure's build step runs `npm run build`.
- Node.js LTS installed for the user via winget (it wasn't on the machine).

**Verified**
- `npm run build` passes (dist: about 160 kB JS / 52 kB gzipped).
- Screenshots in headless Edge at 1366px desktop and in a true 390px frame: the layout matches the design and stacks cleanly on mobile.

**Open items**
- `WEB3FORMS_KEY` in `src/components/Contact.jsx` is EMPTY. Until a key is added, the form shows "Request sent." but sends nothing (same as the design). Get a free key at web3forms.com and paste it in.
- Not tested on a real iPhone or Mac Safari.

## 2026-10-07 — Earlier: redesign abandoned, phone number update
- A "local firm" restyle preview was rejected; the owner wants to keep their own design. Nothing from it was used.
- Real phone number 07950 428513 added to the old `index.html` and pushed (commit f484df1).
