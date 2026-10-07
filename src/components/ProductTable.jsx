import { useState } from 'react';
import { CATS } from '../data.js';

export default function ProductTable() {
  const [prod, setProd] = useState('In');
  let cur = null;

  const rows = CATS.map((c, ci) => (
    <div key={c.name} className="cat-row">
      <div className="cat-label">
        <span style={{ width: 24, height: 4, background: c.color }} />
        <span className="cat-name">{c.name}</span>
      </div>
      {c.items.map(([sym, name, what, we], i) => {
        const sel = sym === prod;
        if (sel) cur = { sym, name, what, we, cat: c.name, color: c.color };
        const pick = () => { if (prod !== sym) setProd(sym); };
        return (
          <button key={sym} type="button" className="tile" onClick={pick} onMouseEnter={pick} aria-pressed={sel}
            style={{
              borderColor: sel ? c.color : '#2C3E50', background: sel ? c.color : '#14212C',
              color: sel ? '#0B1219' : '#EEF3F6', transform: sel ? 'translateY(-4px)' : 'none'
            }}>
            <span className="tile-num">{String(ci * 4 + i + 1).padStart(2, '0')}</span>
            <span className="tile-sym">{sym}</span>
            <span className="tile-short">{name}</span>
          </button>
        );
      })}
    </div>
  ));

  return (
    <section id="stack" className="section">
      <div className="section-inner">
        <div className="stack-head">
          <div className="heading-group" style={{ maxWidth: 680 }}>
            <div className="eyebrow">What we cover</div>
            <h2 className="h2">The whole Microsoft 365 stack.</h2>
          </div>
          <p className="stack-note">Pick any product to see what we do with it.</p>
        </div>
        <div className="stack-body">
          <div className="stack-grid">{rows}</div>
          <div className="stack-detail">
            <div key={cur.sym} className="detail-card">
              <div className="detail-head">
                <div className="detail-sym" style={{ background: cur.color }}>{cur.sym}</div>
                <div className="detail-titles">
                  <span className="detail-cat" style={{ color: cur.color }}>{cur.cat}</span>
                  <span className="detail-name">{cur.name}</span>
                </div>
              </div>
              <p className="detail-what">{cur.what}</p>
              <div className="detail-list">
                {cur.we.map(w => (
                  <div key={w} className="detail-item">
                    <span style={{ width: 8, height: 8, flex: '0 0 8px', background: cur.color, transform: 'translateY(-2px)' }} />{w}
                  </div>
                ))}
              </div>
              <a href="#contact" className="detail-cta">Ask us about {cur.name} <span>→</span></a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
