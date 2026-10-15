import Logo from './Logo.jsx';
import { darkBand } from '../theme.js';

// base="/" on other pages (e.g. privacy.html) so the section links go back to the home page.
export default function Footer({ base = "" }) {
  return (
    <footer className={"site-footer" + darkBand}>
      <div className="footer-inner">
        <div className="footer-brand">
          <a href={base + "#top"} className="brand"><Logo /><span>Fixed<span className="brand-365">365</span></span></a>
          <p>Microsoft 365 &amp; cloud support for small businesses.</p>
          <a href={base + "#contact"} className="btn-sky footer-cta">Book a free health check</a>
        </div>
        <nav className="footer-col" aria-label="Site">
          <h3>Explore</h3>
          <a href={base + "#stack"}>What we look after</a>
          <a href={base + "#services"}>What we do</a>
          <a href={base + "#start"}>How it starts</a>
        </nav>
        <div className="footer-col">
          <h3>Contact</h3>
          <a href="mailto:hello@fixed365.co.uk">hello@fixed365.co.uk</a>
          <a href="tel:+447950428513">07950 428513</a>
          <a href="https://www.linkedin.com/company/fixed-365/" target="_blank" rel="noopener">LinkedIn</a>
        </div>
      </div>
      <div className="footer-base">
        <span>© 2026 Fixed365</span>
        <a href="/privacy.html">Privacy notice</a>
      </div>
    </footer>
  );
}
