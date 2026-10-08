import { useState } from 'react';
import { CATS, LOGOS, CAT_BLURBS } from '../data.js';
import Logo from './Logo.jsx';

// Simple line icons for products that have no Microsoft logo.
const LINE_ICONS = {
  Bk: <path d="M20 12a8 8 0 1 1-2.34-5.66M20 4v4h-4" />,
  Ap: <path d="M4 6h16v10H4zM2 19h20M12 9v4M10 11l2 2 2-2" />,
  Lc: <path d="M14 3h5v5M10 14 19 5M8 6H5v13h13v-3M8 10h4M8 14h3" />,
  Dm: <path d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9s1.3-6.4 3.8-9z" />,
  Es: <path d="M3 6h14v10H3zM3 6l7 5 7-5M17 13l4 1.5v3c0 1.8-1.7 3-4 3.5-2.3-.5-4-1.7-4-3.5v-3z" />,
  Ce: <path d="M12 3l8 3v6c0 4.4-3.4 8-8 9-4.6-1-8-4.6-8-9V6zM8.5 12l2.5 2.5 4.5-5" />
};

function ProductIcon({ sym, size }) {
  if (LOGOS[sym]) return <img src={`/logos/${LOGOS[sym]}.svg`} alt="" width={size} height={size} className="cover-logo" />;
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className="cover-logo cover-line-icon" aria-hidden="true"
      fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      {LINE_ICONS[sym]}
    </svg>
  );
}

const ITEMS = CATS.flatMap(c => c.items.map(([sym, name, what, we]) => ({ sym, name, what, we, cat: c.name })));
const find = (sym) => ITEMS.find(it => it.sym === sym);

// Where each group sits around the hub on wide screens (CSS grid area), and where its
// connecting line starts, as a % of the map. Lines run behind the cards to the hub (HUB).
const HUB = { x: 50, y: 74 };
const PLACES = {
  Collaborate: { area: 'col', x: 16, y: 22 },
  Secure: { area: 'sec', x: 84, y: 22 },
  Essentials: { area: 'ess', x: 16, y: 74 },
  Manage: { area: 'man', x: 84, y: 74 },
  Automate: { area: 'aut', x: 50, y: 22 }
};

function Details({ item, size }) {
  return (
    <>
      <div className="hub-detail-head">
        <ProductIcon sym={item.sym} size={size} />
        <div>
          <p className="hub-detail-cat">{item.cat}</p>
          <p className="hub-detail-title">{item.name}</p>
        </div>
      </div>
      <p className="hub-detail-what">{item.what}</p>
      <ul>{item.we.map(w => <li key={w}>{w}</li>)}</ul>
      <a href="#contact" className="cover-ask">Ask us about {item.name}</a>
    </>
  );
}

// A map of the business: product groups around a central "your business" card that
// shows whichever product is hovered or picked. Narrow screens stack the groups and
// open a product's details under its group instead.
export default function WhatWeCover() {
  const [sel, setSel] = useState(null);   // product shown in the hub (null = intro)
  const [open, setOpen] = useState(null); // narrow screens: product expanded inline

  const pick = (sym) => { setSel(sym); setOpen(open === sym ? null : sym); };
  const current = sel && find(sel);

  return (
    <section id="stack" className="section">
      <div className="section-inner">
        <div className="cover-intro">
          <h2 className="h2">What we look after</h2>
          <p className="cover-note">Everything that keeps your business running, all connected and all looked after by us. Pick a product to see what we do with it.</p>
        </div>

        <div className="hub-map">
          <svg className="hub-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            {CATS.map(c => <line key={c.name} className={current?.cat === c.name ? "on" : undefined} x1={PLACES[c.name].x} y1={PLACES[c.name].y} x2={HUB.x} y2={HUB.y} />)}
          </svg>

          <div className="hub-core" aria-live="polite">
            {current
              ? <div key={current.sym} className="hub-core-inner"><Details item={current} size={44} /></div>
              : (
                <div className="hub-core-inner hub-intro">
                  <Logo size={48} />
                  <p className="hub-detail-title">Your business</p>
                  <p className="hub-detail-what">Every product around this plugs into it. Hover over or tap one to see what we do with it.</p>
                </div>
              )}
          </div>

          {CATS.map(c => {
            const openItem = c.items.some(it => it[0] === open) ? find(open) : null;
            return (
              <div key={c.name} className="hub-group" style={{ gridArea: PLACES[c.name].area }}>
                <h3 className="hub-group-head">{c.name}</h3>
                <p className="hub-group-blurb">{CAT_BLURBS[c.name]}</p>
                <div className="hub-tiles">
                  {c.items.map(([sym, name]) => (
                    <button key={sym} type="button" className="hub-tile" aria-pressed={sel === sym} aria-expanded={open === sym}
                      onClick={() => pick(sym)} onMouseEnter={() => setSel(sym)} onFocus={() => setSel(sym)}>
                      <ProductIcon sym={sym} size={30} />
                      <span>{name}</span>
                    </button>
                  ))}
                </div>
                {openItem && <div key={openItem.sym} className="hub-inline"><Details item={openItem} size={36} /></div>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
