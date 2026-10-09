import { HERO_LOGOS } from './data.js';

// Confetti thrown from an element (the form's submit button): paper bits in the site colours,
// mixed with the Microsoft product logos and our F. Each piece follows a simple physics path
// (launch, drag, gravity, spin) worked out up front and played with the Web Animations API.

// Our F, drawn in the page's text colour so it shows up in both light and dark themes.
const fLogo = (c) => 'data:image/svg+xml,' + encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="22 22 56 56">' +
  `<rect x="22" y="22" width="18" height="56" fill="${c}"/><rect x="44" y="22" width="34" height="16" fill="${c}"/>` +
  `<rect x="44" y="42" width="22" height="16" fill="${c}"/><rect x="58" y="62" width="20" height="16" fill="#2BA3D9"/></svg>`
);
const PAPER = ['#2BA3D9', '#10243B', '#5ED1B6', '#F2B84B', '#B49CF0', '#7CCBEE'];
const rand = (a, b) => a + Math.random() * (b - a);

function piece(layer, kind, x, y) {
  const el = document.createElement(kind.src ? 'img' : 'span');
  const size = kind.src ? rand(26, 40) : rand(8, 13);
  if (kind.src) { el.src = kind.src; el.alt = ''; }
  else el.style.background = kind.color;
  Object.assign(el.style, {
    position: 'absolute', left: x + 'px', top: y + 'px', width: size + 'px',
    height: (kind.src ? size : size * rand(0.4, 0.7)) + 'px', marginLeft: -size / 2 + 'px', marginTop: -size / 2 + 'px',
    borderRadius: kind.src ? '0' : '2px', willChange: 'transform, opacity',
    filter: kind.src ? 'drop-shadow(0 4px 8px rgba(0,0,0,.2))' : 'none'
  });
  layer.appendChild(el);

  // Launch upwards in a wide cone, then let drag slow it and gravity pull it down.
  const angle = rand(-Math.PI * 0.8, -Math.PI * 0.2);
  const speed = rand(16, kind.src ? 27 : 32);
  let vx = Math.cos(angle) * speed, vy = Math.sin(angle) * speed, px = 0, py = 0;
  let rot = rand(0, 360);
  const spin = rand(-14, 14), flutter = rand(0.08, 0.2), steps = 70;
  const frames = [];
  for (let i = 0; i <= steps; i++) {
    const flip = kind.src ? 1 : Math.cos(i * flutter * 3);   // paper bits tumble; logos just spin
    frames.push({
      transform: `translate(${px}px, ${py}px) rotate(${rot}deg) scaleY(${flip})`,
      opacity: i > steps * 0.75 ? 1 - (i - steps * 0.75) / (steps * 0.25) : 1
    });
    vx *= 0.96; vy = vy * 0.96 + 0.55;
    px += vx + Math.sin(i * flutter) * (kind.src ? 0.4 : 1.2); py += vy; rot += spin;
  }
  return el.animate(frames, { duration: rand(2400, 3200), easing: 'linear', fill: 'forwards' });
}

export function throwConfetti(fromEl) {
  if (!fromEl || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const r = fromEl.getBoundingClientRect();
  const x = r.left + r.width / 2, y = r.top + r.height / 2;
  const layer = document.createElement('div');
  layer.setAttribute('aria-hidden', 'true');
  Object.assign(layer.style, { position: 'fixed', inset: '0', pointerEvents: 'none', zIndex: '1000', overflow: 'hidden' });
  document.body.appendChild(layer);

  const ink = getComputedStyle(fromEl).getPropertyValue('--text').trim() || '#10243B';
  const kinds = [
    ...HERO_LOGOS.map(([file]) => ({ src: `/logos/${file}.svg` })),
    ...Array.from({ length: 5 }, () => ({ src: fLogo(ink) })),
    ...Array.from({ length: 55 }, (_, i) => ({ color: PAPER[i % PAPER.length] }))
  ];
  const anims = kinds.map(k => piece(layer, k, x + rand(-r.width / 3, r.width / 3), y));
  Promise.all(anims.map(a => a.finished)).finally(() => layer.remove());
}
