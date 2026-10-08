import { useState } from 'react';
import { CATS, LOGOS, SCENARIOS } from '../data.js';

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

const PRODUCTS = CATS.flatMap(c => c.items.map(([sym, name]) => ({ sym, name })));
const nameOf = (sym) => PRODUCTS.find(p => p.sym === sym).name;

function Answer({ s }) {
  const [, answer, syms, steps] = s;
  return (
    <>
      <div className="prob-answer-main">
        <p className="prob-answer-title">{answer}</p>
        <ul className="prob-steps">{steps.map(t => <li key={t}>{t}</li>)}</ul>
        <a href="#contact" className="cover-ask">Talk to us about this</a>
      </div>
      <div className="prob-uses">
        <p className="prob-uses-label">What we'd use</p>
        <ul>
          {syms.map(sym => <li key={sym}><ProductIcon sym={sym} size={28} />{nameOf(sym)}</li>)}
        </ul>
      </div>
    </>
  );
}

// Problem-first: pick an everyday problem, see how we'd sort it and with what.
// Wide screens show the answer under the grid; narrow screens open it under the tapped problem.
export default function WhatWeCover() {
  const [sel, setSel] = useState(0);

  return (
    <section id="stack" className="section">
      <div className="section-inner">
        <div className="cover-intro">
          <h2 className="h2">What we look after</h2>
          <p className="cover-note">Start with what's bothering you. Pick one and we'll show you how we'd sort it.</p>
        </div>

        <div className="prob-grid">
          {SCENARIOS.map((s, i) => (
            <div key={s[0]} className="prob-item">
              <button type="button" className="prob-btn" aria-expanded={i === sel} onClick={() => setSel(i)}>
                {s[0]}
              </button>
              {i === sel && <div className="prob-answer prob-answer-inline"><Answer s={s} /></div>}
            </div>
          ))}
        </div>

        <div key={sel} className="prob-answer prob-answer-wide" aria-live="polite"><Answer s={SCENARIOS[sel]} /></div>

        <div className="prob-all">
          <p className="prob-uses-label">Everything we look after</p>
          <ul>
            {PRODUCTS.map(p => <li key={p.sym}><ProductIcon sym={p.sym} size={20} />{p.name}</li>)}
          </ul>
        </div>
      </div>
    </section>
  );
}
