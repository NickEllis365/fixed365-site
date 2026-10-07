import { useState } from 'react';
import { CATS, LOGOS, CAT_BLURBS } from '../data.js';

// Simple line icons for products that have no Microsoft logo.
const LINE_ICONS = {
  Bk: <path d="M20 12a8 8 0 1 1-2.34-5.66M20 4v4h-4" />,
  Ap: <path d="M4 6h16v10H4zM2 19h20M12 9v4M10 11l2 2 2-2" />,
  Lc: <path d="M14 3h5v5M10 14 19 5M8 6H5v13h13v-3M8 10h4M8 14h3" />
};

function ProductIcon({ sym }) {
  if (LOGOS[sym]) return <img src={`/logos/${LOGOS[sym]}.svg`} alt="" width="40" height="40" className="cover-logo" />;
  return (
    <svg viewBox="0 0 24 24" width="40" height="40" className="cover-logo cover-line-icon" aria-hidden="true"
      fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      {LINE_ICONS[sym]}
    </svg>
  );
}

export default function WhatWeCover() {
  const [open, setOpen] = useState(null);

  return (
    <section id="stack" className="section">
      <div className="section-inner">
        <div className="cover-intro">
          <h2 className="h2">What we look after</h2>
          <p className="cover-note">It all comes with Microsoft 365 or Azure. Tap a card to see what we do with it.</p>
        </div>

        {CATS.map(c => (
          <div key={c.name} className="cover-group">
            <h3 className="cover-group-head">{c.name} <span>{CAT_BLURBS[c.name]}</span></h3>
            <div className="cover-cards">
              {c.items.map(([sym, name, what, we]) => {
                const isOpen = open === sym;
                const toggle = () => setOpen(isOpen ? null : sym);
                return (
                  <div key={sym} role="button" tabIndex={0} className="cover-card" aria-expanded={isOpen}
                    onClick={toggle} onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); } }}>
                    <div className="cover-front">
                      <ProductIcon sym={sym} />
                      <span className="cover-name">{name}</span>
                      <span className="cover-what">{what}</span>
                      <span className="cover-hint" aria-hidden="true">What we do +</span>
                    </div>
                    <div className="cover-back">
                      <span className="cover-back-title">{name}</span>
                      <ul>{we.map(w => <li key={w}>{w}</li>)}</ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
