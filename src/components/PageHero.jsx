import { darkBand } from '../theme.js';

// The top of a service page: the home hero's navy band and dot field, with the page's own headline on the
// left and something that shows the service on the right (a diagram or a working example).
// back: an optional layer drawn behind the copy and the right-hand side (the AI page's floating app logos).
// after: an optional band at the bottom of the hero, under the copy and the example.
export default function PageHero({ kicker, title, lede, actions, note, back, after, children }) {
  return (
    <section id="top" className={"hero page-hero" + darkBand}>
      <div className="hero-dots" aria-hidden="true" />
      {back}
      <div className="hero-inner">
        <div className="hero-copy">
          {kicker && <p className="hero-kicker">{kicker}</p>}
          <h1 className="hero-title">{title}</h1>
          <p className="hero-lede">{lede}</p>
          <div className="hero-actions">{actions}</div>
          {note && <p className="page-hero-note">{note}</p>}
        </div>
        <div className="page-hero-side">{children}</div>
      </div>
      {after}
    </section>
  );
}
