# Fixed365 site — working log

## 2026-10-07 — Redesign (abandoned) and phone number update

**Goal:** redesign `index.html` so it doesn't look AI-generated.

**Decisions so far**
- Direction: "local firm, real people". Warm off-white paper, serif headlines (Source Serif 4), Source Sans 3 body, one deep-green accent, hairline rules instead of coloured bands. No numbered cards, arrow-on-every-link or pill tags.
- No team photos available, so it has to feel human through type, layout and specifics. Real phone number and company number to be supplied by the owner.
- Stays a single static `index.html` (Azure Static Web Apps deploy unchanged).

**Done**
- Built a throwaway preview (session scratchpad, not in repo) and opened it in the browser for review.
- The superpowers visual-preview server couldn't start because Node.js isn't installed. Used a standalone HTML file instead.

**Outcome**
- Owner rejected the new-direction preview: they want to keep their existing design. Redesign dropped. `index.html` was never touched by it.
- Owner supplied an updated `index.html` (from Downloads). The only change is the real phone number 07950 428513 on the contact "Call" link (`tel:+447950428513`). Copied in, committed and pushed.

**Next steps / open items**
- If asked again: keep the existing navy/blue design and only remove specific "AI-looking" details, each one approved first.
- Company no. is still the placeholder `00000000` in the footer.
- The health-check form doesn't submit anywhere yet. Separate job.
