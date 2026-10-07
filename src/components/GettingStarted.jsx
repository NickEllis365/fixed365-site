const STEPS = [
  ['01', 'Free health check', 'We review your tenant\'s security, licences and setup, then talk you through what we find.'],
  ['02', 'Fix what matters', 'A fixed-price plan for the gaps, done in the order that reduces your risk fastest.'],
  ['03', 'Kept fixed', 'Monthly support per user: help desk, monitoring and changes as Microsoft updates things.']
];

export default function GettingStarted() {
  return (
    <section id="start" className="section">
      <div className="section-inner">
        <div className="heading-group" style={{ maxWidth: 720 }}>
          <div className="eyebrow">Getting started</div>
          <h2 className="h2">Three steps, no long contracts.</h2>
        </div>
        <div className="steps">
          {STEPS.map(([num, title, text]) => (
            <div key={num} className="step">
              <span className="step-num">{num}</span>
              <span className="step-title">{title}</span>
              <span className="step-text">{text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
