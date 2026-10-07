import { CATS, LOGOS, CAT_BLURBS } from '../data.js';

export default function WhatWeCover() {
  return (
    <section id="stack" className="section">
      <div className="section-inner">
        <div className="cover-intro">
          <h2 className="h2">What we look after</h2>
          <p className="cover-note">Everything below comes with a Microsoft 365 or Azure subscription. Most businesses only use part of what they pay for; we set the rest up properly and keep it running.</p>
        </div>

        {CATS.map(c => (
          <div key={c.name} className="cover-group">
            <div className="cover-group-head">
              <h3>{c.name}</h3>
              <p>{CAT_BLURBS[c.name]}</p>
            </div>
            <div className="cover-items">
              {c.items.map(([sym, name, what, we]) => (
                <div key={sym} className="cover-item">
                  {LOGOS[sym]
                    ? <img src={`/logos/${LOGOS[sym]}.svg`} alt="" width="36" height="36" className="cover-logo" />
                    : <span className="cover-logo" aria-hidden="true" />}
                  <div>
                    <h4>{name}</h4>
                    <p className="cover-what">{what}</p>
                    <ul>{we.map(w => <li key={w}>{w}</li>)}</ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
