import { useEffect, useRef, useState } from 'react';

// Free email security check: can someone send email pretending to be this domain?
// Every lookup runs in the visitor's browser against Cloudflare's public DNS (DNS over HTTPS), so the domain
// never reaches us and nothing is stored. It reads the same public records a receiving mail server reads.
const DOH = 'https://cloudflare-dns.com/dns-query';
async function dns(name, type) {
  const r = await fetch(`${DOH}?name=${encodeURIComponent(name)}&type=${type}`, { headers: { accept: 'application/dns-json' } });
  if (!r.ok) throw new Error('lookup failed');
  const j = await r.json();
  // TXT records come back quoted, sometimes split into several quoted chunks: join them back up.
  return { status: j.Status, answers: (j.Answer || []).map(a => ({ type: a.type, data: String(a.data).replace(/"\s*"/g, '').replace(/^"|"$/g, '') })) };
}

// Whatever they type (an email address, a web address or a domain) becomes the bare domain.
export const toDomain = s => String(s || '').trim().toLowerCase()
  .replace(/^mailto:/, '').replace(/^.*@/, '').replace(/^https?:\/\//, '').replace(/^www\./, '').split(/[/?#\s]/)[0].replace(/\.$/, '');
const looksLikeDomain = d => /^[a-z0-9-]+(\.[a-z0-9-]+)+$/.test(d);

async function check(domain) {
  const [mx, txt, dmarc, s1, s2, google] = await Promise.all([
    dns(domain, 'MX'), dns(domain, 'TXT'), dns('_dmarc.' + domain, 'TXT'),
    dns('selector1._domainkey.' + domain, 'CNAME'), dns('selector2._domainkey.' + domain, 'CNAME'), dns('google._domainkey.' + domain, 'TXT'),
  ]);
  if (mx.status === 3 && txt.status === 3) return { missing: true };
  const mxHosts = mx.answers.filter(a => a.type === 15).map(a => a.data.split(' ').pop().replace(/\.$/, '').toLowerCase());
  const host = mxHosts.some(h => h.endsWith('mail.protection.outlook.com')) ? 'Microsoft 365'
    : mxHosts.some(h => /(^|\.)(google|googlemail)\.com$/.test(h)) ? 'Google Workspace' : mxHosts.length ? 'other' : 'none';
  const spf = txt.answers.filter(a => a.type === 16 && /^v=spf1\b/i.test(a.data)).map(a => a.data);
  const dm = dmarc.answers.filter(a => a.type === 16 && /^v=DMARC1/i.test(a.data)).map(a => a.data)[0] || '';
  const policy = (dm.match(/\bp=(none|quarantine|reject)\b/i) || [])[1]?.toLowerCase() || (dm ? 'none' : '');
  const dkim = host === 'Microsoft 365' ? (s1.answers.length || s2.answers.length ? 'on' : 'off')
    : host === 'Google Workspace' ? (google.answers.some(a => /v=DKIM1|k=rsa|p=/i.test(a.data)) ? 'on' : 'off') : 'unknown';
  return { host, mxHosts, spf, dm, policy, dkim };
}

// The findings in plain words: good, needs work, or missing, with what it means and what fixes it.
function findings(d, r) {
  const at = '@' + d, out = [];
  out.push(r.host === 'none'
    ? { state: 'bad', title: 'Where your email goes', text: `No mail server is set up, so ${d} can't receive email.`, fix: 'Point your MX records at your email provider.' }
    : { state: 'info', title: 'Where your email goes', text: r.host === 'other' ? `Your email is handled by ${r.mxHosts[0]}.` : `Your email runs on ${r.host}.` });
  const spf = r.spf[0] || '', all = (spf.match(/([-~?+])all\b/) || [])[1];
  out.push(!r.spf.length
    ? { state: 'bad', title: 'Who can send as you (SPF)', text: `Nothing lists which servers are allowed to send email for ${at}.`, fix: 'Add an SPF record that names your email provider.' }
    : r.spf.length > 1
    ? { state: 'bad', title: 'Who can send as you (SPF)', text: `There are ${r.spf.length} SPF records. There should be exactly one, so receiving servers may ignore them all.`, fix: 'Merge them into a single SPF record.' }
    : all === '-' || all === '~'
    ? { state: 'good', title: 'Who can send as you (SPF)', text: `You list which servers may send email for ${at}, and anything else is ${all === '-' ? 'rejected' : 'treated as suspicious'}.` }
    : { state: 'warn', title: 'Who can send as you (SPF)', text: 'You have an SPF record, but it doesn\'t tell receivers what to do with email from anywhere else.', fix: 'End the SPF record with ~all or -all.' });
  out.push(!r.policy
    ? { state: 'bad', title: 'Blocking fake emails (DMARC)', text: `Nothing tells other email systems what to do with fake emails sent as ${at}, so they're usually delivered.`, fix: 'Add a DMARC record, then move it to quarantine or reject once your real email checks out.' }
    : r.policy === 'none'
    ? { state: 'warn', title: 'Blocking fake emails (DMARC)', text: 'DMARC is set to watch only (p=none): fake emails are reported but still delivered.', fix: 'Move the policy to quarantine, then reject, once your real email passes.' }
    : { state: 'good', title: 'Blocking fake emails (DMARC)', text: `Fake emails sent as ${at} are ${r.policy === 'reject' ? 'rejected' : 'sent to spam'} by receivers that check (p=${r.policy}).` });
  out.push(r.dkim === 'on'
    ? { state: 'good', title: 'Signing your emails (DKIM)', text: `${r.host} signs the email you send, so receivers can tell it's really from you.` }
    : r.dkim === 'off'
    ? { state: 'warn', title: 'Signing your emails (DKIM)', text: `Signing doesn't look switched on in ${r.host}, so your real emails are easier to mistake for fakes.`, fix: `Switch on DKIM signing in ${r.host} and add the two records it gives you.` }
    : { state: 'info', title: 'Signing your emails (DKIM)', text: 'This depends on your email provider\'s settings, so it can\'t be checked from outside.' });
  return out;
}

const LABEL = { good: 'Good', warn: 'Needs work', bad: 'Missing', info: 'Info' };

export default function EmailCheck() {
  const [input, setInput] = useState('');
  const [state, setState] = useState({ busy: false, domain: '', result: null, error: '' });
  const resultRef = useRef(null);

  const run = async (raw) => {
    const domain = toDomain(raw);
    if (!looksLikeDomain(domain)) { setState({ busy: false, domain: '', result: null, error: 'Enter a domain like yourbusiness.co.uk, or an email address.' }); return; }
    setState({ busy: true, domain, result: null, error: '' });
    // Keep the domain in the address bar, so a result can be shared or bookmarked.
    history.replaceState(null, '', `?d=${encodeURIComponent(domain)}`);
    try {
      const r = await check(domain);
      setState({ busy: false, domain, result: r, error: r.missing ? `We couldn't find ${domain}. Check the spelling and try again.` : '' });
      requestAnimationFrame(() => resultRef.current?.focus());
    } catch {
      setState({ busy: false, domain, result: null, error: 'The lookup didn\'t go through. Check your connection and try again.' });
    }
  };

  // A link with ?d=example.co.uk runs the check straight away.
  useEffect(() => {
    const d = new URLSearchParams(location.search).get('d');
    if (d) { setInput(d); run(d); }
  }, []);

  const { busy, domain, result, error } = state;
  const list = result && !result.missing ? findings(domain, result) : [];
  const spoofable = result && !result.missing && (!result.policy || result.policy === 'none');
  const toFix = list.filter(f => f.state === 'bad' || f.state === 'warn');
  const mail = `mailto:hello@fixed365.co.uk?subject=${encodeURIComponent(`Email security check for ${domain}`)}&body=${encodeURIComponent(`Hi Nick,\n\nI ran the email security check for ${domain}. Could you help me fix what it found?\n\n`)}`;

  return (
    <section className="ec">
      <div className="ec-inner">
        <h1 className="h2">Can someone send email pretending to be you?</h1>
        <p className="ec-lede">Enter your business domain or email address. In a few seconds you'll see whether fake emails in your name would be blocked, and what to fix if not.</p>

        <form className="ec-form" onSubmit={e => { e.preventDefault(); run(input); }}>
          <label className="field ec-field">
            <span>Your domain or email address</span>
            <input value={input} onChange={e => setInput(e.target.value)} placeholder="e.g. yourbusiness.co.uk" autoComplete="off" autoCapitalize="none" spellCheck="false" inputMode="url" />
          </label>
          <button className="submit ec-go" disabled={busy}>{busy ? 'Checking…' : 'Check my email'}</button>
        </form>
        <p className="form-note">The check runs in your browser using Cloudflare's public DNS lookup. It only reads public records; we don't see or keep the domain you check.</p>

        {error && <p className="form-error" role="alert">{error}</p>}

        {list.length > 0 && (
          <div className="ec-result" ref={resultRef} tabIndex={-1} aria-live="polite">
            <div className={'ec-verdict ' + (spoofable ? 'is-bad' : 'is-good')}>
              <p className="ec-domain">{domain}</p>
              <h2>{spoofable ? `Someone could send email that looks like it's from @${domain}.` : `Fake emails sent as @${domain} should be stopped.`}</h2>
              <p>{spoofable
                ? 'Most attacks on small businesses start with an email like that: a fake invoice, a changed bank detail, a "quick favour" from the boss.'
                : toFix.length ? 'The main protection is in place. There are still a couple of things worth tidying up below.' : 'Your records are set up well. Nice work.'}</p>
            </div>
            <ul className="ec-list">
              {list.map(f => (
                <li key={f.title} className={'ec-item is-' + f.state}>
                  <span className="ec-pill">{LABEL[f.state]}</span>
                  <div><h3>{f.title}</h3><p>{f.text}</p>{f.fix && <p className="ec-fix">To fix: {f.fix}</p>}</div>
                </li>
              ))}
            </ul>
            {toFix.length > 0 && (
              <div className="ec-cta">
                <div>
                  <h3>Want these fixed?</h3>
                  <p>It's usually a short job, done without disturbing your email. I'm Nick, based in Newton Abbot, and I look after this for small businesses around Devon.</p>
                </div>
                <div className="ec-cta-acts">
                  <a className="btn-sky btn-lg" href={mail}>Ask me to fix it</a>
                  <a className="btn-outline btn-lg" href="/#contact">Book a free health check</a>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
