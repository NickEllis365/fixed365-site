import { HERO_LOGOS } from '../data.js';
import { darkBand } from '../theme.js';

export default function Hero() {
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
        <div className="hero-logos">
          <p className="hero-logos-label">The Microsoft tools we look after every day</p>
          <ul className="logo-grid">
            {HERO_LOGOS.map(([file, name]) => (
              <li key={file}><img src={`/logos/${file}.svg`} alt="" width="40" height="40" />{name}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
