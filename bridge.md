# Fixed365 site — working log

## 2026-10-07 — LIVE: `light-theme` merged into `main` (29db083) and deployed to Azure; deploy succeeded and the live site serves the new build and logos.

## 2026-10-07 — Interactive product cards in "What we look after" (branch `light-theme`)

- Owner: the logos look great, but there were too many words; they want interactive cards.
- `WhatWeCover.jsx`: each product is a card showing its logo, name, one-liner and a "What we do +" hint. Hovering (on devices with a mouse) or tapping/clicking (or Enter/Space) flips the content to the three "what we do" points. One card is open at a time. Cards are `div role="button"` with `aria-expanded` (a `<ul>` inside a `<button>` isn't valid HTML).
- Simple line icons stand in for the products with no Microsoft logo (Backup, Autopilot, Licensing).
- Layout: 4 per row on desktop (cards 236px tall), 2 on tablet (264px), 1 on phones. On phones closed cards are compact and an opened card grows to fit its list.
- Verified: build passes; desktop closed + all-open (no overflow; Exchange is the longest) and phone closed + one-open screenshots.
- Testing note: headless Edge iframe screenshots at 390px started coming back blank (the DOM rendered fine); loading the page directly at 500px wide gives the same phone layout and works.

## 2026-10-07 — "Less AI" pass + real Microsoft app logos (branch `light-theme`)

**Owner feedback:** the site still looked AI-made. They agreed with this list of tells: uppercase labels above headings, huge squashed headlines, arrows on every button, 01/02/03 numbering, grid background with a glowing abstract block, symmetric cards, pill tabs, coloured dots, snappy fragment headlines, made-up people. They also wanted visible M365 logos and asked us not to claim "we know every setting".

**Owner decision on logos:** use the real app logos, knowing it's outside Microsoft's published icon terms (we explained this twice; their call as owner). Logos come from Wikimedia Commons SVGs in `public/logos/`: Outlook, Exchange, Teams, SharePoint, OneDrive, Entra ID, Defender, Purview, Intune, Azure, Power Automate, Copilot, Power BI. Each was checked for scripts/external refs. Backup, Autopilot and Licensing have no logo.

**What changed**
- Hero: grid background gone. The interactive block "F" was removed, but the owner liked it, so it is BACK on the right (flies in, replays on hover/tap). The 8 app logos sit in a full-width row under the hero text ("The Microsoft tools we look after every day"). Headline is calmer (Archivo 800, less tight, smaller). Lede is now "…for small UK businesses. It's all we work on."
- "What we look after" (`WhatWeCover.jsx`): no tabs or cards; all 15 products are listed under plain category headings, with their logo, a one-liner and three bullets. Category blurbs are in `CAT_BLURBS` in `data.js`.
- "How we help": no labels, no 01–04. Diagrams use the real logos (Exchange/SharePoint/OneDrive/Azure in migrate; Entra/Intune/Defender/Purview in security; Intune bar). Device names replaced with device types. The migration steps strip is now one sentence.
- "How it starts" (`GettingStarted.jsx`): three short paragraphs instead of 01/02/03 cards.
- Arrows removed from all buttons and links; all font-weight 900 → 800; smaller corners (6–12px); no shadows; menu labels match the section names.
- Removed: `SVC_COLORS`, `public/icons/`.

**Verified:** build passes; desktop full-page and 390px mobile screenshots checked; fixed the service buttons showing a grey default background.

**Status:** live (see top entry).

**Still worth doing (needs owner content):** a real photo, client quotes, location, years in business and a price guide would do more for the "not AI" feel than any styling.

## 2026-10-07 — Lighter, friendlier pages + new "What we cover" (branch `light-theme`)

**Owner decisions**
- Lighter site: owner picked the "light + dark bands" version and asked for it to be "more friendly".
- "What we cover": owner didn't like the periodic-table style, so it was replaced.
- Logos: official Microsoft icons only (Intune, Entra ID, Azure), inside the "How we help" diagrams.

**What changed**
- Theme: colours are now CSS variables (`src/styles.css`). The page is light (`class="theme-light"` on `<html>`); the header, hero, "How we help" and footer stay dark via `darkBand` in `src/theme.js`. The dark navy is a little bluer and softer than before. Category label colours are darkened automatically on light backgrounds (`color-mix`, falling back to the plain colour).
- Friendlier: rounded corners (8/12/16/20px), soft shadows on light panels, pill tabs, rounded badges, a rounded contact card. Fonts unchanged (Archivo).
- "What we cover" (`src/components/WhatWeCover.jsx`, replaces `ProductTable.jsx`): category pill tabs (Collaborate / Secure / Manage / Automate) and a card for each product showing its name, one line on what it is, three "what we do" points and an "Ask us about…" link. Same data as before (`CATS`).
- Icons (`public/icons/`): Entra ID (Microsoft Entra icon set, Oct 2023), Intune, Azure Virtual Machine and Azure Virtual Desktop (Azure icon set V24). Used in Secure (identity: Entra ID; devices: Intune), Manage devices (Intune bar) and Migrate (a new "Office server → Azure" target with VM + AVD rows).
- Microsoft has no diagram-use icons for SharePoint or OneDrive.

**Licence caution**
- Microsoft's icon terms allow use "in architectural diagrams, training materials, or documentation". The Entra page also says "Don't use Microsoft product icons in Marketing communications." A business website is arguably marketing even when the icons are inside diagrams. Flagged to the owner.

**Verified:** `npm run build` passes; screenshots at desktop (all sections, all three icon diagrams) and at 390px mobile.

**Status:** committed on branch `light-theme`, not merged or pushed. Waiting for the owner's OK.

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
