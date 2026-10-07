import { useState } from 'react';
import Logo from './Logo.jsx';
import { SIZES } from '../data.js';

// Web3Forms access key (https://web3forms.com). While empty, the form shows
// "Request sent." without sending anything, exactly as the v5 design does.
const WEB3FORMS_KEY = '';

export default function Contact() {
  const [size, setSize] = useState(0);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [err, setErr] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    if (!WEB3FORMS_KEY) { setSent(true); return; }
    setSending(true);
    setErr(false);
    try {
      const body = {
        access_key: WEB3FORMS_KEY, subject: 'New health check request', from_name: 'Fixed365 website',
        name: fd.get('name'), email: fd.get('email'), company: fd.get('company'), team_size: SIZES[size]
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
        <div className="contact-pitch">
          <h2 className="contact-title">Book your free health check.</h2>
          <p className="contact-lede">Thirty minutes on a call. You get a clear list of what's right, what's risky and what it would take to fix.</p>
          <div className="contact-links">
            <a href="tel:+447950428513">Call 07950 428513</a>
            <a href="mailto:hello@fixed365.co.uk">hello@fixed365.co.uk</a>
          </div>
        </div>
        <div className="contact-form-wrap">
          {!sent ? (
            <form onSubmit={submit} className="contact-form">
              <label className="field">Your name<input name="name" required autoComplete="name" /></label>
              <label className="field">Work email<input name="email" type="email" required autoComplete="email" /></label>
              <label className="field">Company<input name="company" autoComplete="organization" /></label>
              <div className="field" role="group" aria-label="Team size">Team size
                <div className="sizes">
                  {SIZES.map((label, i) => (
                    <button key={label} type="button" onClick={() => setSize(i)} aria-pressed={i === size}
                      style={{
                        borderColor: i === size ? '#2BA3D9' : 'var(--line-3)', background: i === size ? '#2BA3D9' : 'var(--bg)',
                        color: i === size ? '#0B1219' : 'var(--text)'
                      }}>{label}</button>
                  ))}
                </div>
              </div>
              <button type="submit" className="submit" disabled={sending}>
                {sending ? 'Sending…' : 'Request my health check'}
              </button>
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
