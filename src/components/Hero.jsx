import { useEffect, useRef, useState } from 'react';
import { BLOCKS, HERO_LOGOS } from '../data.js';
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
    </>
  );
}

// Hovering the F throws the product logos out in a ring around it, then pulls them back in.
// Positions are in % of the mark's width (container units), alternating near/far for a scattered look.
const BURST = HERO_LOGOS.map(([file], i) => {
  const a = (i / HERO_LOGOS.length) * 2 * Math.PI - Math.PI / 2;
  const r = i % 2 ? 44 : 56;
  return { file, x: Math.cos(a) * r, y: Math.sin(a) * r, rot: (i % 3 - 1) * 14 };
});

function LogoBurst({ out }) {
  return (
    <div className="hero-burst">
      {BURST.map((b, i) => (
        <img key={b.file} src={`/logos/${b.file}.svg`} alt="" className="hero-burst-logo" style={{
          transform: out
            ? `translate(-50%, -50%) translate(${b.x}cqw, ${b.y}cqw) rotate(${b.rot}deg) scale(1)`
            : 'translate(-50%, -50%) scale(.2)',
          opacity: out ? 1 : 0,
          transitionDelay: out ? `${i * 30}ms` : `${(BURST.length - i) * 20}ms`
        }} />
      ))}
    </div>
  );
}

export default function Hero() {
  const [built, setBuilt] = useState(false);
  const [burst, setBurst] = useState(false);
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
    setBurst(true);
    timers.current.push(
      setTimeout(() => setBuilt(true), 380),
      setTimeout(() => setBurst(false), 1900),
      setTimeout(() => { busy.current = false; }, 2600)
    );
  };

  return (
    <section id="top" className={"hero" + darkBand}>
      <div className="hero-inner">
        <div className="hero-copy">
          <h1 className="hero-title">Microsoft 365, set up right and kept that way.</h1>
          <p className="hero-lede">We set up, secure and support Microsoft 365 and Azure for small UK businesses. It's all we work on.</p>
          <div className="hero-actions">
            <a href="#contact" className="btn-sky btn-lg">Book a free health check</a>
            <a href="#stack" className="btn-outline btn-lg">See what we cover</a>
          </div>
        </div>
        <div className="hero-mark-wrap">
          <div className="hero-mark" onMouseEnter={replay} onClick={replay} aria-hidden="true">
            <LogoBurst out={burst} />
            <HeroMark built={built} />
          </div>
        </div>
        <div className="hero-logos">
          <p className="hero-logos-label">The Microsoft tools we look after every day</p>
          {/* The list is rendered twice so the strip can loop seamlessly; the copy is hidden from screen readers. */}
          <div className="logo-marquee">
            <ul className="logo-track">
              {[...HERO_LOGOS, ...HERO_LOGOS].map(([file, name], i) => (
                <li key={i} aria-hidden={i >= HERO_LOGOS.length || undefined}>
                  <img src={`/logos/${file}.svg`} alt="" width="40" height="40" />{name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
