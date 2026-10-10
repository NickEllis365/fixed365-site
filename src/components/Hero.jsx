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

// Hovering the F blows the product logos out like an explosion, at the same moment the blocks split,
// then they fall back in as the F rebuilds. Every hover picks new random directions, distances and spins.
const rand = (a, b) => a + Math.random() * (b - a);

function explode(burstEl) {
  if (!burstEl || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  // On phones the F is a small 92px mark, so the spread is sized from the screen instead.
  // On desktop it follows the F's size, kept within the screen height so laptops get a smaller burst.
  const w = innerWidth < 900 ? innerWidth * 0.6 : Math.min(burstEl.offsetWidth, innerHeight * 0.5);
  const n = burstEl.children.length;
  [...burstEl.children].forEach((el, i) => {
    el.getAnimations().forEach(a => a.cancel());
    const angle = (i / n) * 2 * Math.PI + rand(-0.35, 0.35);   // spread round, but never evenly
    const dist = w * rand(0.34, 0.66);
    const x = Math.cos(angle) * dist, y = Math.sin(angle) * dist;
    const spin = rand(-260, 260), size = rand(0.75, 1.15);
    const fall = w * rand(0.04, 0.1);                            // a little gravity while they hang
    const back = rand(0.62, 0.74);                               // each one turns back at its own moment
    const at = (dx, dy, r, sc) => `translate(-50%, -50%) translate(${dx}px, ${dy}px) rotate(${r}deg) scale(${sc})`;
    el.animate([
      { offset: 0, transform: at(0, 0, 0, 0.3), opacity: 0, easing: 'cubic-bezier(.12,.9,.3,1.35)' },
      { offset: 0.06, opacity: 1 },
      { offset: 0.34, transform: at(x, y, spin * 0.6, size), opacity: 1, easing: 'ease-in-out' },
      { offset: back, transform: at(x * 1.05, y * 1.05 + fall, spin, size), opacity: 1, easing: 'cubic-bezier(.55,-0.35,.75,.2)' },
      { offset: 0.94, transform: at(0, 0, spin * 1.3, 0.45), opacity: 1 },
      { offset: 1, transform: at(0, 0, spin * 1.3, 0.3), opacity: 0 }
    ], { duration: 1500, fill: 'none' });
  });
}

const LogoBurst = ({ burstRef }) => (
  <div className="hero-burst" ref={burstRef}>
    {HERO_LOGOS.map(([file]) => <img key={file} src={`/logos/${file}.svg`} alt="" className="hero-burst-logo" />)}
  </div>
);

export default function Hero() {
  const [built, setBuilt] = useState(false);
  const busy = useRef(false);
  const timers = useRef([]);
  const burstRef = useRef(null);

  useEffect(() => {
    timers.current.push(setTimeout(() => setBuilt(true), 250));
    return () => timers.current.forEach(clearTimeout);
  }, []);

  const replay = () => {
    if (busy.current) return;
    busy.current = true;
    setBuilt(false);
    explode(burstRef.current);
    timers.current.push(
      setTimeout(() => setBuilt(true), 380),
      setTimeout(() => { busy.current = false; }, 2200)
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
            <LogoBurst burstRef={burstRef} />
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
