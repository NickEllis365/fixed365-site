import { useEffect, useState } from 'react';
import Logo from './Logo.jsx';
import { darkBand } from '../theme.js';

const LINKS = [['#stack', 'What we look after'], ['#services', 'How we help'], ['#start', 'How it starts']];

// base="/" on other pages (e.g. privacy.html) so the section links go back to the home page.
export default function Header({ base = "" }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);   // page scrolled: bar tightens and gets a shadow
  const [active, setActive] = useState('');          // section currently on screen, underlined in the nav
  const close = () => setOpen(false);

  useEffect(() => {
    const onScroll = () => setScrolled(scrollY > 8);
    onScroll();
    addEventListener('scroll', onScroll, { passive: true });
    return () => removeEventListener('scroll', onScroll);
  }, []);

  // A section counts as current while it crosses the middle band of the screen.
  useEffect(() => {
    const sections = LINKS.map(([href]) => document.querySelector(href)).filter(Boolean);
    if (!sections.length) return;
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) setActive('#' + e.target.id);
        else setActive(a => (a === '#' + e.target.id ? '' : a));
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(s => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <header className={"site-header" + darkBand + (scrolled ? " is-scrolled" : "") + (open ? " is-open" : "")}>
      <div className="header-bar">
        <a href={base + "#top"} className="brand"><Logo /><span>Fixed<span className="brand-365">365</span></span></a>
        <nav className="nav-wide">
          {LINKS.map(([href, label]) => (
            <a key={href} href={base + href} className="nav-link" aria-current={active === href ? 'true' : undefined}>{label}</a>
          ))}
          <a href={base + "#contact"} className="btn-sky nav-cta">Free health check</a>
        </nav>
        <button type="button" className="menu-btn" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(o => !o)}>
          <span /><span /><span />
        </button>
      </div>
      {open && (
        <div className="mobile-menu">
          {LINKS.map(([href, label]) => <a key={href} href={base + href} onClick={close}>{label}</a>)}
          <a href={base + "#contact"} onClick={close} className="mobile-cta">Free health check</a>
        </div>
      )}
    </header>
  );
}
