import { useState } from 'react';
import { CATS, LOGOS, CAT_BLURBS } from '../data.js';

// Simple line icons for products that have no Microsoft logo.
const LINE_ICONS = {
  Bk: <path d="M20 12a8 8 0 1 1-2.34-5.66M20 4v4h-4" />,
  Ap: <path d="M4 6h16v10H4zM2 19h20M12 9v4M10 11l2 2 2-2" />,
  Lc: <path d="M14 3h5v5M10 14 19 5M8 6H5v13h13v-3M8 10h4M8 14h3" />,
  Dm: <path d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9s1.3-6.4 3.8-9z" />,
  Es: <path d="M3 6h14v10H3zM3 6l7 5 7-5M17 13l4 1.5v3c0 1.8-1.7 3-4 3.5-2.3-.5-4-1.7-4-3.5v-3z" />,
  Ce: <path d="M12 3l8 3v6c0 4.4-3.4 8-8 9-4.6-1-8-4.6-8-9V6zM8.5 12l2.5 2.5 4.5-5" />,
  Wb: <path d="M3 5h18v14H3zM3 9h18M6 7h.01M8.5 7h.01M7 12h6M7 15h4M15 12h3v4h-3z" />,
  Ai: <path d="M7 7h10v10H7zM10 3v4M14 3v4M10 17v4M14 17v4M3 10h4M3 14h4M17 10h4M17 14h4M10 10h4v4h-4z" />
};

function ProductIcon({ sym, size = 28 }) {
  if (LOGOS[sym]) return <img src={`/logos/${LOGOS[sym]}.svg`} alt="" width={size} height={size} className="cover-logo" />;
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className="cover-logo cover-line-icon" aria-hidden="true"
      fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      {LINE_ICONS[sym]}
    </svg>
  );
}

// An index of the five areas on the left; the chosen area's products as cards on the right, each
// showing what it is and what we do with it. On narrow screens the index becomes a swipeable row of
// buttons, and each card opens with a tap (the first one starts open).
export default function WhatWeCover() {
  const [cat, setCat] = useState(0);
  const [open, setOpen] = useState(0);       // narrow screens: which card is open (-1 = none)
  const c = CATS[cat];
  const pick = (i) => { setCat(i); setOpen(0); };

  return (
    <section id="stack" className="section">
      <div className="section-inner">
        <div className="cover-intro">
          <h2 className="h2">What we look after</h2>
          <p className="cover-note">It all comes with Microsoft 365 or Azure, plus the essentials around it. Pick an area to see what we do with each part.</p>
        </div>

        <div className="lk">
          <div className="lk-index" role="tablist" aria-label="Areas we look after">
            {CATS.map((g, i) => (
              <button key={g.name} type="button" role="tab" className="lk-cat" aria-selected={i === cat} onClick={e => { pick(i); e.currentTarget.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'smooth' }); }}>
                <span className="lk-num">{String(i + 1).padStart(2, '0')}</span>
                <span className="lk-cat-text">
                  <span className="lk-cat-name">{g.name}</span>
                  <span className="lk-cat-blurb">{CAT_BLURBS[g.name]}</span>
                </span>
                <span className="lk-count">{g.items.length}</span>
              </button>
            ))}
          </div>

          <div className="lk-cards" key={cat} role="tabpanel" aria-label={c.name}>
            {c.items.map(([sym, name, what, we], i) => (
              <article key={sym} className="lk-card" data-open={i === open || undefined}>
                <button type="button" className="lk-card-head" aria-expanded={i === open} onClick={() => setOpen(i === open ? -1 : i)}>
                  <ProductIcon sym={sym} size={40} />
                  <span className="lk-card-title">
                    <span className="lk-name">{name}</span>
                    <span className="lk-what">{what}</span>
                  </span>
                  <svg className="lk-chev" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
                </button>
                <ul className="lk-we">{we.map(w => <li key={w}>{w}</li>)}</ul>
              </article>
            ))}
            <a href="#contact" className="lk-ask">Ask us about any of these →</a>
          </div>
        </div>
      </div>
    </section>
  );
}
