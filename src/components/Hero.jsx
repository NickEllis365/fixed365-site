import { useEffect, useRef, useState } from 'react';
import { BLOCKS } from '../data.js';
import { darkBand } from '../theme.js';

function HeroMark({ built }) {
  return (
    <>
      {BLOCKS.map((k, i) => {
        const delay = built ? (i === 3 ? 900 : i * 140) : 0;
        return (
          <div key={i} style={{
            position: 'absolute', left: k.l + '%', top: k.t + '%', width: k.w + '%', height: k.h + '%', background: k.c,
            transform: built ? 'none' : k.from, opacity: built ? 1 : 0,
            transition: `transform 900ms cubic-bezier(.2,.9,.25,1.15) ${delay}ms, opacity 500ms ease ${delay}ms`,
            boxShadow: i === 3 && built ? '0 0 60px rgba(43,163,217,.45)' : 'none'
          }} />
        );
      })}
      <div style={{ position: 'absolute', inset: '8%', border: '1px dashed var(--line-dash)', pointerEvents: 'none' }} />
    </>
  );
}

export default function Hero() {
  const [built, setBuilt] = useState(false);
  const busy = useRef(false);
  const timers = useRef([]);

  useEffect(() => {
    timers.current.push(setTimeout(() => setBuilt(true), 250));
    return () => timers.current.forEach(clearTimeout);
  }, []);

  const replay = () => {
    if (busy.current) return;
    busy.current = true;
    setBuilt(false);
    timers.current.push(
      setTimeout(() => setBuilt(true), 380),
      setTimeout(() => { busy.current = false; }, 2200)
    );
  };

  return (
    <section id="top" className={"hero" + darkBand}>
      <div className="hero-inner">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-dot" />Microsoft 365 &amp; cloud specialists</div>
          <h1 className="hero-title">Microsoft 365, set up right and kept that way.</h1>
          <p className="hero-lede">We set up, secure and support Microsoft 365 and Azure for small UK businesses. Because it's all we work on, we know every setting.</p>
          <div className="hero-actions">
            <a href="#contact" className="btn-sky btn-lg hero-primary">Book a free health check <span>→</span></a>
            <a href="#stack" className="btn-outline btn-lg">See what we cover</a>
          </div>
        </div>
        <div className="hero-mark-wrap">
          <div className="hero-mark" onMouseEnter={replay} onClick={replay} aria-hidden="true">
            <HeroMark built={built} />
          </div>
        </div>
      </div>
    </section>
  );
}
