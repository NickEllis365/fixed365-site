import { useState } from 'react';
import Logo from './Logo.jsx';
import { SIZES } from '../data.js';
import { throwConfetti } from '../confetti.js';
import { darkBand } from '../theme.js';

// Web3Forms access key (https://web3forms.com). It's a public key meant to live in
// front-end code; submissions are emailed to the address registered with Web3Forms.
const WEB3FORMS_KEY = '1166aaa0-0e28-4048-8f44-d16fbddaf765';

// What they'd like help with (any number, optional). Matches "What we do".
const HELP = ['Microsoft 365', 'Security', 'Devices', 'Websites', 'AI & Copilot', 'Not sure yet'];

// Small line icons for the contact rows (drawn in currentColor).
const Icon = ({ d }) => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{d}</svg>
);
const PHONE = <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />;
const MAIL = <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>;
const LINKEDIN = <><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7" /></>;
const ARROW = <path d="M5 12h14M13 6l6 6-6 6" />;

export default function Contact() {
  const [size, setSize] = useState(0);
  const [help, setHelp] = useState([]);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [err, setErr] = useState(false);

  const toggleHelp = h => setHelp(list => list.includes(h) ? list.filter(x => x !== h) : [...list, h]);

  const submit = async (e) => {
    e.preventDefault();
    throwConfetti(e.nativeEvent.submitter || e.target.querySelector('.submit'));
    const fd = new FormData(e.target);
    if (!WEB3FORMS_KEY) { setSent(true); return; }
    setSending(true);
    setErr(false);
    try {
      const body = {
        access_key: WEB3FORMS_KEY, subject: 'New health check request', from_name: 'Fixed365 website',
        name: fd.get('name'), email: fd.get('email'), phone: fd.get('phone') || '', company: fd.get('company'),
        help_with: help.join(', '), team_size: SIZES[size],
        botcheck: Boolean(fd.get('botcheck'))
      };
      const r = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(body)
      });
      const j = await r.json();
      if (j.success) setSent(true); else setErr(true);
    } catch (_) {
      setErr(true);
    }
    setSending(false);
  };

  return (
    <section id="contact" className="contact">
      <div className="contact-inner">
        <div className={"contact-pitch" + darkBand}>
          <p className="contact-kicker">Free health check</p>
          <h2 className="contact-title">Book your free <span className="accent">health check.</span></h2>
          <p className="contact-lede">Thirty minutes on a call. You come away with a clear list of:</p>
          <ul className="contact-gets">
            <li>What's set up right</li>
            <li>What's risky</li>
            <li>What it would take to fix</li>
          </ul>
          <div className="contact-links">
            <a href="tel:+447950428513"><span className="contact-ico"><Icon d={PHONE} /></span><span><small>Call</small>07950 428513</span></a>
            <a href="mailto:hello@fixed365.co.uk"><span className="contact-ico"><Icon d={MAIL} /></span><span><small>Email</small>hello@fixed365.co.uk</span></a>
            <a href="https://www.linkedin.com/company/fixed-365/" target="_blank" rel="noopener"><span className="contact-ico"><Icon d={LINKEDIN} /></span><span><small>LinkedIn</small>Follow us</span></a>
          </div>
        </div>
        <div className="contact-form-wrap">
          {!sent ? (
            <form onSubmit={submit} className="contact-form">
              <div className="form-head">
                <h3>Tell us a little about you</h3>
                <p>Takes under a minute. We'll email you within one working day to book a time.</p>
              </div>
              <div className="field-row">
                <label className="field">Your name<input name="name" required autoComplete="name" placeholder="Jane Smith" /></label>
                <label className="field">Company<input name="company" autoComplete="organization" placeholder="Smith & Co" /></label>
              </div>
              <div className="field-row">
                <label className="field">Work email<input name="email" type="email" required autoComplete="email" placeholder="jane@smithandco.co.uk" /></label>
                <label className="field"><span>Phone <span className="optional">optional</span></span><input name="phone" type="tel" autoComplete="tel" placeholder="07…" /></label>
              </div>
              {/* Spam trap: hidden from people, bots tick it and Web3Forms rejects the submission. */}
              <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" style={{ display: 'none' }} aria-hidden="true" />
              <div className="field" role="group" aria-label="What would you like help with?">
                <span>What would you like help with? <span className="optional">pick any</span></span>
                <div className="chips">
                  {HELP.map(h => (
                    <button key={h} type="button" className="chip" onClick={() => toggleHelp(h)} aria-pressed={help.includes(h)}>{h}</button>
                  ))}
                </div>
              </div>
              <div className="field" role="group" aria-label="Team size">
                <span>Team size</span>
                <div className="sizes">
                  {SIZES.map((label, i) => (
                    <button key={label} type="button" className="chip" onClick={() => setSize(i)} aria-pressed={i === size}>{label}</button>
                  ))}
                </div>
              </div>
              <button type="submit" className="submit" disabled={sending}>
                <span>{sending ? 'Sending…' : 'Request my health check'}</span><Icon d={ARROW} />
              </button>
              <p className="form-note">We'll only use your details to reply to you. See our <a href="/privacy.html">privacy notice</a>.</p>
              {err && <div className="form-error">Something went wrong. Please call or email us instead.</div>}
            </form>
          ) : (
            <div className="sent">
              <Logo size={56} />
              <div className="sent-title">Request sent.</div>
              <div className="sent-text">We'll email you within one working day to book a time.</div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
