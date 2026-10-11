import { useState } from 'react';
import Logo from './Logo.jsx';
import { darkBand } from '../theme.js';

const LINKS = [['#stack', 'What we look after'], ['#services', 'How we help'], ['#start', 'How it starts']];

// base="/" on other pages (e.g. privacy.html) so the section links go back to the home page.
export default function Header({ base = "" }) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className={"site-header" + darkBand}>
      <div className="header-bar">
        <a href={base + "#top"} className="brand"><Logo /><span>Fixed<span className="brand-365">365</span></span></a>
        <nav className="nav-wide">
          {LINKS.map(([href, label]) => <a key={href} href={base + href} className="nav-link">{label}</a>)}
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
