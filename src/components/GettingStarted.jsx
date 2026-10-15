// Three steps as numbered glass cards, joined by a sky line (the order you'd work with us in).
const STEPS = [
  ['First, a free health check.', "We review your tenant's security, licences and setup, then talk you through what we find."],
  ['Then we fix what matters.', 'You get a fixed-price plan for the gaps, done in the order that reduces your risk fastest.'],
  ['After that, we keep it that way.', 'Monthly support per user covers the help desk, monitoring, and changes as Microsoft updates things. No long contracts.'],
];

export default function GettingStarted() {
  return (
    <section id="start" className="section">
      <div className="section-inner start">
        <h2 className="h2">How it <span className="accent">starts</span></h2>
        <ol className="steps">
          {STEPS.map(([title, text], i) => (
            <li key={i} className="step">
              <span className="step-num">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="step-title">{title}</h3>
              <p className="step-text">{text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
