import { useState } from 'react';
import { CATS, LOGOS, CAT_BLURBS } from '../data.js';

// Simple line icons for products that have no Microsoft logo.
const LINE_ICONS = {
  Bk: <path d="M20 12a8 8 0 1 1-2.34-5.66M20 4v4h-4" />,
  Ap: <path d="M4 6h16v10H4zM2 19h20M12 9v4M10 11l2 2 2-2" />,
  Lc: <path d="M14 3h5v5M10 14 19 5M8 6H5v13h13v-3M8 10h4M8 14h3" />,
  Dm: <path d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9s1.3-6.4 3.8-9z" />,
  Es: <path d="M3 6h14v10H3zM3 6l7 5 7-5M17 13l4 1.5v3c0 1.8-1.7 3-4 3.5-2.3-.5-4-1.7-4-3.5v-3z" />,
  Ce: <path d="M12 3l8 3v6c0 4.4-3.4 8-8 9-4.6-1-8-4.6-8-9V6zM8.5 12l2.5 2.5 4.5-5" />
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

// Every product, flattened, so the detail panel can look one up by its symbol.
const ITEMS = CATS.flatMap(c => c.items.map(([sym, name, what, we]) => ({ sym, name, what, we, cat: c.name })));
const find = (sym) => ITEMS.find(it => it.sym === sym);

function Details({ item, size }) {
  return (
    <>
      <div className="cover-detail-head">
        <ProductIcon sym={item.sym} size={size} />
        <div>
          <p className="cover-detail-cat">{item.cat}</p>
          <p className="cover-detail-title">{item.name}</p>
        </div>
      </div>
      <p className="cover-detail-what">{item.what}</p>
      <ul>{item.we.map(w => <li key={w}>{w}</li>)}</ul>
      <a href="#contact" className="cover-ask">Ask us about {item.name}</a>
    </>
  );
}

// Wide screens: tiles on the left, one detail panel on the right that follows hover, focus and clicks.
// Narrow screens: no side panel; a tapped tile opens its details under its own group (tap again to close).
export default function WhatWeCover() {
  const [sel, setSel] = useState('Ex');      // what the side panel shows
  const [open, setOpen] = useState(null);    // narrow screens: which tile is expanded, if any

  const choose = (sym) => { setSel(sym); setOpen(open === sym ? null : sym); };
  const current = find(sel);

  return (
    <section id="stack" className="section">
      <div className="section-inner">
        <div className="cover-intro">
          <h2 className="h2">What we look after</h2>
          <p className="cover-note">It all comes with Microsoft 365 or Azure, plus the essentials around it. Pick a product to see what we do with it.</p>
        </div>

        <div className="cover-explorer">
          <div className="cover-groups">
            {CATS.map(c => {
              const openItem = c.items.some(it => it[0] === open) ? find(open) : null;
              return (
                <div key={c.name} className="cover-group">
                  <h3 className="cover-group-head">{c.name} <span>{CAT_BLURBS[c.name]}</span></h3>
                  <div className="cover-tiles">
                    {c.items.map(([sym, name]) => (
                      <button key={sym} type="button" className="cover-tile" aria-pressed={sel === sym}
                        aria-expanded={open === sym} onClick={() => choose(sym)}
                        onMouseEnter={() => setSel(sym)} onFocus={() => setSel(sym)}>
                        <ProductIcon sym={sym} />
                        <span>{name}</span>
                      </button>
                    ))}
                  </div>
                  {openItem && <div key={openItem.sym} className="cover-detail"><Details item={openItem} size={36} /></div>}
                </div>
              );
            })}
          </div>

          <aside className="cover-panel" aria-live="polite">
            <div key={current.sym} className="cover-panel-inner"><Details item={current} size={56} /></div>
          </aside>
        </div>
      </div>
    </section>
  );
}
