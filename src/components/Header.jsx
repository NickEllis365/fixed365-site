import { useEffect, useState } from 'react';
import Logo from './Logo.jsx';
import { darkBand } from '../theme.js';

// The service pages, plus "How it starts" on the home page. A page link is underlined while you're on that page.
const LINKS = [['/microsoft-365/', 'Microsoft 365'], ['/websites/', 'Websites'], ['/ai-dashboards/', 'AI dashboards'], ['/#start', 'How it starts']];

// base="/" on other pages (e.g. privacy.html) so the home links go back to the home page.
// cta: where "Free health check" goes. Service pages have their own contact form, so they pass "#contact".
export default function Header({ base = "", cta = base + "#contact" }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);   // page scrolled: bar floats as a glass panel
  const [active, setActive] = useState('');          // section currently on screen, underlined in the nav
  const close = () => setOpen(false);

  useEffect(() => {
    const onScroll = () => setScrolled(scrollY > 8);
    onScroll();
    addEventListener('scroll', onScroll, { passive: true });
    return () => removeEventListener('scroll', onScroll);
  }, []);

  // On a service page its link stays underlined. On the home page "How it starts" is underlined while that
  // section crosses the middle band of the screen.
  useEffect(() => {
    const page = LINKS.find(([href]) => !href.includes('#') && location.pathname.startsWith(href));
    if (page) { setActive(page[0]); return; }
    const sections = LINKS.filter(([href]) => href.startsWith('/#') && location.pathname === '/')
      .map(([href]) => document.querySelector(href.slice(1))).filter(Boolean);
    if (!sections.length) return;
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) setActive('/#' + e.target.id);
        else setActive(a => (a === '/#' + e.target.id ? '' : a));
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(s => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <header className={"site-header" + darkBand + (scrolled && !open ? " is-floating" : "") + (open ? " is-open" : "")}>
      <div className="header-bar">
        <a href={base + "#top"} className="brand"><Logo /><span>Fixed<span className="brand-365">365</span></span></a>
        <nav className="nav-wide">
          {LINKS.map(([href, label]) => (
            <a key={href} href={href} className="nav-link" aria-current={active === href ? 'true' : undefined}>{label}</a>
          ))}
          <a href={cta} className="btn-sky nav-cta">Free health check</a>
        </nav>
        <button type="button" className="menu-btn" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(o => !o)}>
          <span /><span /><span />
        </button>
      </div>
      {open && (
        <div className="mobile-menu">
          {LINKS.map(([href, label]) => <a key={href} href={href} onClick={close}>{label}</a>)}
          <a href={cta} onClick={close} className="mobile-cta">Free health check</a>
        </div>
      )}
    </header>
  );
}
