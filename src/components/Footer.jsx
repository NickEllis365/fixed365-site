import { darkBand } from '../theme.js';

export default function Footer() {
  return (
    <footer className={"site-footer" + darkBand}>
      <div className="footer-inner">
        <span>© 2026 Fixed365. Microsoft 365 &amp; cloud support for small businesses.</span>
        <span>hello@fixed365.co.uk · 07950 428513</span>
      </div>
    </footer>
  );
}
