import { useState } from 'react';
import { CATS } from '../data.js';

export default function WhatWeCover() {
  const [cat, setCat] = useState(0);
  const c = CATS[cat];

  return (
    <section id="stack" className="section">
      <div className="section-inner">
        <div className="cover-head">
          <div className="heading-group" style={{ maxWidth: 680 }}>
            <div className="eyebrow">What we cover</div>
            <h2 className="h2">The whole Microsoft 365 stack.</h2>
          </div>
          <p className="cover-note">Pick an area to see what we look after and what we do with it.</p>
        </div>

        <div className="cover-tabs" role="tablist" aria-label="Areas we cover">
          {CATS.map((k, i) => (
            <button key={k.name} type="button" role="tab" id={`cover-tab-${i}`} aria-controls="cover-panel"
              aria-selected={i === cat} className="cover-tab" onClick={() => setCat(i)}>
              <span className="cover-dot" style={{ background: k.color }} />
              {k.name}
              <span className="cover-count">{k.items.length}</span>
            </button>
          ))}
        </div>

        <div key={c.name} id="cover-panel" role="tabpanel" aria-labelledby={`cover-tab-${cat}`}
          className="cover-grid" style={{ '--cat': c.color }}>
          {c.items.map(([sym, name, what, we]) => (
            <article key={sym} className="cover-card">
              <div className="cover-badge" aria-hidden="true">{sym}</div>
              <h3 className="cover-name">{name}</h3>
              <p className="cover-what">{what}</p>
              <ul className="cover-list">
                {we.map(w => <li key={w}>{w}</li>)}
              </ul>
              <a href="#contact" className="cover-ask">Ask us about {name} →</a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
