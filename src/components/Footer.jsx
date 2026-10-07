import { darkBand } from '../theme.js';

export default function Footer() {
  return (
    <footer className={"site-footer" + darkBand}>
      <div className="footer-inner">
        <span>© 2026 Fixed365. Microsoft 365 &amp; cloud support for small businesses.</span>
        <span>
          <a href="mailto:hello@fixed365.co.uk">hello@fixed365.co.uk</a> · <a href="tel:+447950428513">07950 428513</a> · <a href="https://www.linkedin.com/company/fixed-365/" target="_blank" rel="noopener">LinkedIn</a>
        </span>
      </div>
    </footer>
  );
}
