import { useEffect, useState } from 'react';
import PageHero from '../components/PageHero.jsx';
import { DashPanel } from '../components/AIDashboards.jsx';
import Contact from '../components/Contact.jsx';

// Apps people already run their business on (logos are their owners' trademarks). dark: shown in white on the navy.
const app = s => '/logos/apps/' + s + '.svg', ms = s => '/logos/' + s + '.svg';
const APPS = [
  [app('xero'), 'Xero'], [app('quickbooks'), 'QuickBooks'], [app('sage'), 'Sage'], [app('hubspot'), 'HubSpot'],
  [app('shopify'), 'Shopify'], [app('stripe'), 'Stripe'], [ms('power-bi'), 'Power BI'], [app('mailchimp'), 'Mailchimp'],
  [app('gmail'), 'Gmail'], [app('googlesheets'), 'Google Sheets'], [app('zapier'), 'Zapier'], [ms('copilot'), 'Copilot'],
  [app('notion'), 'Notion', true], [ms('teams'), 'Teams'], [app('calendly'), 'Calendly'], [app('dropbox'), 'Dropbox'],
  [app('asana'), 'Asana'], [app('trello'), 'Trello'], [app('googledrive'), 'Google Drive'], [app('square'), 'Square', true],
  [app('etsy'), 'Etsy'], [app('zendesk'), 'Zendesk', true], [ms('outlook'), 'Outlook'], [app('airtable'), 'Airtable'],
  [ms('sharepoint'), 'SharePoint'], [app('googlegemini'), 'Gemini'], [app('make'), 'Make'], [app('claude'), 'Claude'],
];
const Logo = ([src, name, dark]) => <img src={src} alt="" className={dark ? 'app-dark' : undefined} title={name} />;

// Orbit (the default): the first 16, one size, evenly spaced round the example dashboard: a row above it, a column
// down its right and a row below. They drift together at one gentle pace. Positions are the logo centres, in %.
const ORBIT = [[55, 6], [63, 6], [71, 6], [79, 6], [87, 6], [95, 6], [96, 26], [96, 42], [96, 58], [96, 74],
  [95, 93], [87, 93], [79, 93], [71, 93], [63, 93], [55, 93]];
function Orbit() {
  return (
    <div className="app-float" aria-hidden="true">
      {ORBIT.map(([x, y], i) => (
        <span key={APPS[i][1]} data-app={APPS[i][1]} className="app-tile" style={{ left: x + '%', top: y + '%', animationDelay: -(i * 0.8) + 's' }}>{Logo(APPS[i])}</span>
      ))}
    </div>
  );
}

// What each app sends in during the intro.
const SAYS = { Xero: 'Invoice', QuickBooks: 'Bill', Sage: 'Payroll', HubSpot: 'New lead', Shopify: 'Order', Stripe: 'Payment',
  'Power BI': 'Report', Mailchimp: 'Sign-up', Gmail: 'Enquiry', 'Google Sheets': 'Rows', Zapier: 'Update', Copilot: 'Summary',
  Notion: 'Notes', Teams: 'Message', Calendly: 'Booking', Dropbox: 'File' };

// The data flow: each app in turn pulses and sends a label curving in towards the dashboard, speeding up as it goes
// and slipping under the panel's edge. When the last one is in, the dashboard fills (onFilled); after that a dot
// trickles in from a random app every second or so. It flies from whichever logos are on screen (the orbit on
// desktop, the two columns beside the phone on phones). Reduced motion skips straight to the filled dashboard.
function useDataFlow(on, onFilled) {
  useEffect(() => {
    if (!on) return;
    const hero = document.querySelector('.page-hero'), layer = hero?.querySelector('.app-flow');
    const tiles = [...(hero?.querySelectorAll('.app-tile, .app-side li') || [])].filter(el => el.offsetParent);
    const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!layer || !tiles.length || calm) { onFilled(); return; }
    const timers = [];
    const fly = (tile, label) => {
      const panel = hero.querySelector('.dash-panel'), frame = hero.querySelector('.monitor-body') || panel;
      if (!panel) return;
      const h = hero.getBoundingClientRect(), a = tile.getBoundingClientRect(), p = frame.getBoundingClientRect();
      let x0 = a.left + a.width / 2 - h.left, y0 = a.top + a.height / 2 - h.top;
      const x1 = p.left + p.width * (0.3 + Math.random() * 0.4) - h.left, y1 = p.top + p.height * (0.45 + Math.random() * 0.3) - h.top;
      // Start just outside the logo, on the side facing the dashboard, so the label is seen leaving it.
      { const d = Math.hypot(x1 - x0, y1 - y0) || 1; x0 += (x1 - x0) / d * 34; y0 += (y1 - y0) / d * 34; }
      // A gentle curve: the control point sits off to one side of the straight line.
      const dx = x1 - x0, dy = y1 - y0, side = Math.random() < 0.5 ? -1 : 1;
      const cx = x0 + dx * 0.35 - dy * 0.25 * side, cy = y0 + dy * 0.35 + dx * 0.25 * side;
      const el = document.createElement('span');
      el.className = label ? 'packet' : 'packet dot';
      if (label) el.textContent = label;
      layer.appendChild(el);
      const frames = [];
      for (let i = 0; i <= 14; i++) {
        const s = i / 14, x = (1 - s) ** 2 * x0 + 2 * (1 - s) * s * cx + s * s * x1, y = (1 - s) ** 2 * y0 + 2 * (1 - s) * s * cy + s * s * y1;
        frames.push({ transform: `translate(${x}px, ${y}px) translate(-50%, -50%) scale(${1 - s * 0.45})`, opacity: s < 0.04 ? s * 25 : 1 });
      }
      const ms = label ? 1600 : 1200;
      el.animate(frames, { duration: ms, easing: 'cubic-bezier(.5, 0, .9, .4)', fill: 'forwards' }).finished.then(() => el.remove(), () => el.remove());
      tile.querySelector('img')?.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.22)' }, { transform: 'scale(1)' }], { duration: 420, easing: 'ease-out' });
      timers.push(setTimeout(() => panel.animate([{ borderColor: '#2BA3D9' }, { borderColor: '#23405F' }], { duration: 500 }), ms * 0.7));
    };
    tiles.forEach((tile, i) => timers.push(setTimeout(() => fly(tile, SAYS[tile.dataset.app]), 400 + i * 150)));
    const done = 400 + tiles.length * 150 + 1200;
    timers.push(setTimeout(onFilled, done));
    let tick;
    timers.push(setTimeout(() => { tick = setInterval(() => fly(tiles[Math.floor(Math.random() * tiles.length)]), 1000); }, done + 800));
    return () => { timers.forEach(clearTimeout); clearInterval(tick); layer.replaceChildren(); };
  }, [on]);
}

// Strip (demo, /ai-dashboards/?logos=strip): two slow rows scrolling sideways under the hero, in opposite directions.
// Each row is drawn twice so it loops without a gap; the copy is hidden from screen readers.
function Strip() {
  const rows = [APPS.slice(0, 14), APPS.slice(14)];
  return (
    <div className="app-strip" aria-label="Some of the apps it can work with">
      {rows.map((row, r) => (
        <div key={r} className="app-strip-row">
          <ul className={'app-strip-track' + (r ? ' rev' : '')}>
            {[...row, ...row].map((x, i) => <li key={i} aria-hidden={i >= row.length || undefined}>{Logo(x)}<span>{x[1]}</span></li>)}
          </ul>
        </div>
      ))}
    </div>
  );
}

// Phones: twelve of the apps in two slim columns either side of the phone, drifting like the desktop orbit, and
// sending their data into it on load.
function AppSides() {
  return (
    <ul className="app-side" aria-label="Some of the apps it can work with">
      {APPS.slice(0, 12).map(x => <li key={x[1]} data-app={x[1]}>{Logo(x)}</li>)}
    </ul>
  );
}

const SOURCES = ['Excel spreadsheets', 'SharePoint lists and files', 'Your accounts software', 'Your CRM'];

// Questions an owner usually has to dig through spreadsheets for. Examples only, not customer quotes.
const ASKS = [
  'Which customers haven\'t ordered since the summer?',
  'Who owes us money, and for how long?',
  'Which jobs went over the quote?',
  'What did we spend on materials last quarter?',
  'Are we busier than this time last year?',
  'Which day do we get the most enquiries?',
];

const STEPS = [
  ['A short call', 'About the numbers you check most, and where they live now.'],
  ['We connect and build', 'We link those sources up and build the dashboard around the questions you ask.'],
  ['Your team opens it', 'In Microsoft 365, on a laptop or a phone, with access only for the people who need it.'],
  ['We look after it', 'It refreshes on its own, and we add to it when your questions change.'],
];

export default function AIDashboardsPage() {
  const strip = new URLSearchParams(location.search).get('logos') === 'strip';
  const [filling, setFilling] = useState(!strip);
  useDataFlow(!strip, () => setFilling(false));
  return (
    <>
      <PageHero
        kicker="AI dashboards for small UK businesses"
        title="Ask your business a question."
        lede="We bring your sales, invoices and jobs together in one live dashboard in Microsoft 365. Then you can ask it things in plain English and get an answer, not a spreadsheet."
        back={strip ? null : <><Orbit /><div className="app-flow" aria-hidden="true" /></>}
        after={strip ? <Strip /> : null}
        note="Works with the apps you already use: QuickBooks, Xero, Sage, Shopify, HubSpot, Google and Microsoft 365, and plenty more."
        actions={<>
          <a href="#contact" className="btn-sky btn-lg">Talk to us about a dashboard</a>
          <a href="#sources" className="btn-outline btn-lg">What goes in</a>
        </>}>
        <DashPanel filling={filling} />
        {!strip && <AppSides />}
      </PageHero>

      <section id="sources" className="section">
        <div className="section-inner">
          <div className="heading-group" style={{ maxWidth: 720 }}>
            <h2 className="h2">Your numbers, from where they <span className="accent">already live</span></h2>
            <p className="section-lede">The dashboard reads from the places you already keep things, so nobody has to type figures into a new system.</p>
          </div>
          <div className="diagram page-diagram">
            <div className="migrate-grid">
              <div className="migrate-step">From</div>
              <div className="migrate-sources">{SOURCES.map(s => <div key={s} className="box">{s}</div>)}</div>
              <div className="migrate-lines">
                {[0, 0.55, 1.1, 1.65].map(d => (
                  <div key={d} className="flow-line"><span className="flow-dot" style={{ animationDelay: d + 's' }} /></div>
                ))}
              </div>
              <div className="migrate-step migrate-step-to" aria-hidden="true">↓ To</div>
              <div className="migrate-targets">
                <div className="azure-target">
                  <div className="migrate-target-title"><img src="/logos/power-bi.svg" alt="" width="22" height="22" className="ms-icon" />Your dashboard</div>
                  <div className="azure-row"><span>Live in Microsoft 365</span></div>
                  <div className="azure-row"><span>Refreshed automatically</span></div>
                  <div className="azure-row"><span>Ask it in plain English</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={"section section-dark theme-dark"}>
        <div className="section-inner">
          <div className="heading-group" style={{ maxWidth: 720 }}>
            <h2 className="h2">The questions you'd normally <span className="accent">dig for</span></h2>
            <p className="section-lede">For example. Yours will be about your own business.</p>
          </div>
          <ul className="ask-list">{ASKS.map(q => <li key={q}>{q}</li>)}</ul>
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <h2 className="h2">How we <span className="accent">set it up</span></h2>
          <dl className="page-rows">
            {STEPS.map(([t, d]) => <div key={t}><dt>{t}</dt><dd>{d}</dd></div>)}
          </dl>
        </div>
      </section>

      <Contact preset={['AI dashboards']} />
    </>
  );
}
