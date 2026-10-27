import { useLayoutEffect, useRef, useState } from 'react';

// The screen is 16:9, like a 1920 x 1080 monitor. The dashboard is laid out once at CANVAS size and scaled to the
// screen, the way a screenshot is. Below MIN_SCREEN px wide (phones) the text would be too small to read, so the
// dashboard goes back to its normal stacked layout inside a slim frame.
const CANVAS = [720, 405], MIN_SCREEN = 560;
function useScreenScale() {
  const ref = useRef(null);
  const [scale, setScale] = useState(0);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fit = () => { const w = el.clientWidth; setScale(w >= MIN_SCREEN ? w / CANVAS[0] : 0); };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return [ref, scale];
}

// AI dashboards: a working example, laid out like a real report. Three views (Overview, Services, Sources) on the
// rail, and an Ask bar that takes typed questions or suggestions, jumps to the right view and highlights what it
// used. Sources can be connected from a picker. Everything is made-up example data, labelled as such, and the
// numbers agree with each other: the services add up to the September and August sales.
const MONTHS = [['Apr', 41200], ['May', 46800], ['Jun', 52100], ['Jul', 49300], ['Aug', 44600], ['Sep', 53900]];
const DAYS = [['Mon', 31], ['Tue', 24], ['Wed', 22], ['Thu', 26], ['Fri', 38], ['Sat', 12]];
const OVERDUE = [['INV-2291', 'Holiday lets client', '£2,480', '41 days'], ['INV-2307', 'Farm shop client', '£915', '33 days'], ['INV-2318', 'Dental practice client', '£1,760', '19 days']];
const RING = [['Invoices', 58, '#2BA3D9'], ['Online shop', 27, '#5ED1B6'], ['Card payments', 15, '#F2B84B']];
const KPIS = [['Sales (Sep)', '£53,900', '+21% on Aug', 'up'], ['Overdue', '£5,155', '3 invoices', 'warn'], ['Call-outs', '153', 'Apr to Sep', '']];
// [service, September £, September jobs, August £]. September adds up to £53,900, August to £44,600.
const SERVICES = [['Installations', 24300, 9, 21800], ['Servicing', 11800, 59, 10200], ['Repairs', 9600, 48, 7900],
  ['Maintenance plans', 5400, 27, 2700], ['Call-out fees', 2800, 35, 2000]];
const EXTRA_SERVICES = ['Emergency call-outs', 'Landlord safety checks', 'Parts and materials'];
const logo = s => '/logos/apps/' + s + '.svg';
const CONNECTED = [['xero', 'Xero', 'Invoices'], ['shopify', 'Shopify', 'Online shop'], ['stripe', 'Stripe', 'Card payments'], ['hubspot', 'HubSpot', 'Customers']];
const AVAILABLE = [['quickbooks', 'QuickBooks'], ['sage', 'Sage'], ['square', 'Square', true], ['googlesheets', 'Google Sheets'], ['gmail', 'Gmail'],
  ['calendly', 'Calendly'], ['mailchimp', 'Mailchimp'], ['zendesk', 'Zendesk', true], ['dropbox', 'Dropbox'], ['asana', 'Asana']];

const gbp = n => '£' + n.toLocaleString('en-GB');
const QA = [
  { q: 'How did September compare with August?', keys: ['september', 'august', 'compare', 'month', 'sep', 'aug', 'last month'],
    view: 'overview', focus: 'chart', chart: 'months', hi: [4, 5],
    a: 'Sales were £53,900 in September, up £9,300 (21%) on August. The best month of the last six.' },
  { q: 'Who owes us money?', keys: ['owe', 'owes', 'overdue', 'invoice', 'unpaid', 'debt', 'late', 'chase'],
    view: 'invoices', focus: 'table', a: '3 invoices are overdue, £5,155 in total. The oldest is 41 days late.' },
  { q: 'Which day do we get the most call-outs?', keys: ['day', 'busiest', 'call-outs', 'callouts', 'weekday', 'friday'],
    view: 'overview', focus: 'chart', chart: 'days', hi: [4], a: 'Friday, with 38 call-outs over the last six months. Monday is next with 31.' },
  { q: 'Where do our sales come from?', keys: ['where', 'come from', 'channel', 'shop', 'card', 'split', 'source'],
    view: 'overview', focus: 'ring', a: '58% from invoices, 27% from the online shop and 15% from card payments.' },
  { q: "What's our best-selling service?", keys: ['best', 'top', 'selling', 'sells', 'most money', 'biggest'],
    view: 'services', rows: ['Installations'], a: 'Installations: £24,300 in September from 9 jobs, 45% of all sales.' },
  { q: 'Which service grew the most?', keys: ['grew', 'growth', 'grow', 'growing', 'increase', 'fastest'],
    view: 'services', rows: ['Maintenance plans'], a: 'Maintenance plans doubled, from £2,700 in August to £5,400 in September (+£2,700).' },
  { q: 'How many jobs did we do in September?', keys: ['how many', 'jobs', 'number of', 'count', 'volume'],
    view: 'services', rows: SERVICES.map(s => s[0]), a: '178 jobs in September, up from 145 in August. Servicing was the busiest with 59.' },
  { q: "What's our average job value?", keys: ['average', 'avg', 'per job', 'job value', 'typical'],
    view: 'services', rows: [], a: '£303 per job in September (£53,900 across 178 jobs). Installations average £2,700.' },
];
// Typed questions: the suggestion sharing the most key words wins. No match: say so, and offer suggestions.
const answer = text => {
  const t = ' ' + text.toLowerCase() + ' ';
  let best = -1, score = 0;
  QA.forEach((x, i) => { const s = x.keys.filter(k => t.includes(k)).length; if (s > score) { score = s; best = i; } });
  return best;
};

const Icon = ({ d, size = 18 }) => <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{d}</svg>;
const VIEWS = [
  ['overview', 'Overview', <><path d="M4 20V10M10 20V4M16 20v-7M22 20H2" /></>],
  ['services', 'Services', <><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 10h18M9 10v10" /></>],
  ['invoices', 'Invoices', <><path d="M6 3h12v18l-3-2-3 2-3-2-3 2z" /><path d="M9 8h6M9 12h6" /></>],
  ['sources', 'Sources', <><circle cx="6" cy="6" r="2.5" /><circle cx="18" cy="6" r="2.5" /><circle cx="12" cy="18" r="2.5" /><path d="M8 7.5l3 8M16 7.5l-3 8" /></>],
];

// A column chart with a real axis: gridlines at round values, labels on the left.
function Chart({ data, hi, money, wait }) {
  const top = money ? 60000 : 45, step = top / 3;   // three steps of whole numbers: £20k or 15 call-outs
  const fmt = v => money ? (v ? '£' + v / 1000 + 'k' : '£0') : v;
  return (
    <div className="dch" role="img" aria-label={data.map(([k, v]) => `${k} ${money ? gbp(v) : v}`).join(', ')}>
      <div className="dch-grid">{[3, 2, 1, 0].map(i => <span key={i}><em>{fmt(step * i)}</em></span>)}</div>
      <div className="dch-cols">
        {data.map(([k, v], i) => (
          <div key={k} className={'dch-col' + (hi.includes(i) ? ' is-hi' : '')}>
            <span className="dch-fill" style={{ height: wait ? '3%' : (v / top) * 100 + '%' }} />
            <span className="dch-key">{k}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Overview({ cur, filling }) {
  const days = cur?.chart === 'days';
  let turn = 0;
  const ring = RING.map(([, p, c]) => `${c} ${turn}% ${(turn += p)}%`).join(', ');
  const focus = f => !filling && cur?.focus === f ? ' is-focus' : '';
  return (
    <>
      <div className="dash-kpis">
        {KPIS.map(([label, value, note, tone]) => (
          <div key={label} className="dash-kpi">
            <span className="dash-kpi-label">{label}</span>
            {filling ? <span className="dash-skel" style={{ width: '70%', height: 22 }} /> : <strong>{value}</strong>}
            {filling ? <span className="dash-skel" style={{ width: '50%' }} /> : <span className={'dash-kpi-note ' + tone}>{note}</span>}
          </div>
        ))}
      </div>
      <div className="dash-row">
        <div className={'dash-card dash-chart' + focus('chart')}>
          <span className="dash-card-title">{days ? 'Call-outs by day' : 'Monthly sales'}</span>
          <Chart key={filling + (days ? 'd' : 'm')} data={days ? DAYS : MONTHS} hi={filling || !cur ? [] : cur.hi || []} money={!days} wait={filling} />
        </div>
        <div className={'dash-card dash-ring' + focus('ring')}>
          <span className="dash-card-title">Where sales come from</span>
          <div className="dash-donut" style={{ background: filling ? '#213C59' : `conic-gradient(${ring})` }}><span /></div>
          <ul>{RING.map(([n, p, c]) => <li key={n}><i style={{ background: c }} />{n}<b>{filling ? '' : p + '%'}</b></li>)}</ul>
        </div>
      </div>
    </>
  );
}

function Invoices({ cur }) {
  return (
    <div className={'dash-card dash-due' + (cur?.focus === 'table' ? ' is-focus' : '')}>
      <div className="dash-card-head">
        <span className="dash-card-title">Overdue invoices</span>
        <span className="dash-card-sub">£5,155 across 3</span>
      </div>
      <table className="dash-table">
        <thead><tr><th>Invoice</th><th>Customer</th><th>Amount</th><th>Overdue</th></tr></thead>
        <tbody>{OVERDUE.map(r => <tr key={r[0]}>{r.map((c, j) => <td key={j}>{c}</td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}

function Services({ cur, extra, addService }) {
  const rows = [...SERVICES, ...extra.map(n => [n, 0, 0, 0])];
  const max = SERVICES[0][1];
  const lit = cur?.view === 'services' ? cur.rows : [];
  const left = EXTRA_SERVICES.filter(n => !extra.includes(n));
  return (
    <div className="dash-card dash-svc">
      <div className="dash-card-head">
        <span className="dash-card-title">Sales by service, September <small>vs August</small></span>
        {left.length > 0 && <button type="button" className="dash-add" onClick={() => addService(left[0])} title={'Track ' + left[0]}>+ Track a service</button>}
      </div>
      <table className="dash-table dash-svc-table">
        <thead><tr><th>Service</th><th>Sales</th><th>Jobs</th><th>Change</th></tr></thead>
        <tbody>
          {rows.map(([n, sep, jobs, aug]) => {
            const ch = aug ? Math.round((sep - aug) / aug * 100) : null;
            return (
              <tr key={n} className={lit.includes(n) ? 'is-lit' : undefined}>
                <td><span className="svc-name">{n}</span><span className="svc-bar"><i style={{ width: (sep / max) * 100 + '%' }} /></span></td>
                <td>{sep ? gbp(sep) : '–'}</td>
                <td>{sep ? jobs : '–'}</td>
                <td className={ch > 0 ? 'up' : ''}>{ch === null ? <span className="svc-new">Tracking from today</span> : (ch > 0 ? '+' : '') + ch + '%'}</td>
              </tr>
            );
          })}
        </tbody>
        <tfoot><tr><td>Total</td><td>{gbp(53900)}</td><td>178</td><td className="up">+21%</td></tr></tfoot>
      </table>
    </div>
  );
}

function Sources({ added, connect }) {
  const rows = [...CONNECTED.map(([s, n, what]) => [s, n, what, 'done']), ...added];
  const left = AVAILABLE.filter(([s]) => !added.some(a => a[0] === s));
  return (
    <div className="dash-card dash-src">
      <span className="dash-card-title">Connected sources</span>
      <ul className="src-list">
        {rows.map(([s, n, what, state, dark]) => (
          <li key={s}>
            <img src={logo(s)} alt="" className={dark ? 'app-dark' : undefined} />
            <span className="src-name">{n}<small>{what}</small></span>
            <span className={'src-state ' + state}>{state === 'done' ? (CONNECTED.some(c => c[0] === s) ? 'Synced 2 min ago' : 'Synced just now') : 'Connecting…'}</span>
          </li>
        ))}
      </ul>
      {left.length > 0 && (
        <>
          <span className="dash-card-title src-add-title">Add a source</span>
          <div className="src-pick">
            {left.map(([s, n, dark]) => (
              <button key={s} type="button" onClick={() => connect(s, n, dark)} title={'Connect ' + n}>
                <img src={logo(s)} alt="" className={dark ? 'app-dark' : undefined} />{n}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// The working example on its own, so the AI dashboards page can show it in its hero too.
// filling: the AI page's intro, while data is still flying in from the apps round it: grey placeholders and a
// "pulling in" line until the last of it lands.
export function DashPanel({ filling = false }) {
  const [view, setView] = useState('overview');
  const [pick, setPick] = useState(0);            // index into QA, or -1 for "couldn't answer that"
  const [text, setText] = useState('');
  const [asked, setAsked] = useState('');
  const [extra, setExtra] = useState([]);
  const [added, setAdded] = useState([]);
  const cur = pick >= 0 ? QA[pick] : null;

  const ask = i => { setPick(i); setAsked(''); if (i >= 0) setView(QA[i].view); };
  const submit = e => {
    e.preventDefault();
    if (!text.trim()) return;
    const i = answer(text);
    setPick(i); setAsked(text.trim()); setText('');
    if (i >= 0) setView(QA[i].view);
  };
  const connect = (s, n, dark) => {
    setAdded(a => [...a, [s, n, 'New source', 'busy', dark]]);
    setTimeout(() => setAdded(a => a.map(x => x[0] === s ? [s, n, 'New source', 'done', dark] : x)), 1400);
  };
  const [screen, scale] = useScreenScale();
  const sources = CONNECTED.length + added.filter(a => a[3] === 'done').length;
  const said = filling ? 'Pulling in your numbers…'
    : cur ? cur.a : "I can't answer that from this example. Try one of the questions below.";

  return (
    <div className={'monitor' + (scale ? ' is-scaled' : '')}>
    <div className="monitor-body">
    <span className="monitor-cam" aria-hidden="true" />
    <div className="monitor-screen" ref={screen}>
    <div className="monitor-canvas" style={scale ? { width: CANVAS[0], height: CANVAS[1], transform: `scale(${scale})` } : undefined}>
    <div className={'dash-panel' + (filling ? ' is-filling' : '')}>
      <div className="dash-head">
        <span className="dash-title"><span className="dash-mark" aria-hidden="true" />Sales overview</span>
        <span className="dash-range">Apr – Sep 2026</span>
        <span className="dash-live"><i />{filling ? 'Syncing' : 'Live'}<span className="dash-count">{filling ? '' : ` · ${sources} sources`}</span></span>
        <span className="dash-tag">Example data</span>
      </div>
      <div className="dash-body">
        <nav className="dash-rail" aria-label="Dashboard views">
          {VIEWS.map(([id, label, d]) => (
            <button key={id} type="button" className={view === id ? 'on' : undefined} aria-pressed={view === id} disabled={filling}
              onClick={() => setView(id)}><Icon d={d} /><span>{label}</span></button>
          ))}
        </nav>
        <div className="dash-main">
          <div className="dash-view" key={view}>
            {view === 'overview' && <Overview cur={cur} filling={filling} />}
            {view === 'services' && <Services cur={cur} extra={extra} addService={n => setExtra(x => [...x, n])} />}
            {view === 'invoices' && <Invoices cur={cur} />}
            {view === 'sources' && <Sources added={added} connect={connect} />}
          </div>
          <div className="dash-ask-bar">
            <div className="dash-asked" aria-live="polite">
              <span className="dash-spark" aria-hidden="true"><Icon size={14} d={<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" />} /></span>
              <span>{asked && <em className="dash-you">“{asked}”</em>}{said}</span>
            </div>
            <div className="dash-ask-row">
            <form className="dash-input" onSubmit={submit}>
              <input type="text" value={text} onChange={e => setText(e.target.value)} disabled={filling}
                placeholder="Ask a question about your numbers…" aria-label="Ask a question about your numbers" />
              <button type="submit" disabled={filling || !text.trim()} aria-label="Ask"><Icon size={16} d={<path d="M5 12h14M13 6l6 6-6 6" />} /></button>
            </form>
            <div className="dash-ask" role="group" aria-label="Suggested questions">
              {QA.map((x, i) => [x, i]).filter(([, i]) => i !== pick).slice(0, 2).map(([x, i]) => (
                <button key={x.q} type="button" className="dash-q" disabled={filling} onClick={() => ask(i)}>{x.q}</button>
              ))}
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
    </div>
    </div>
    <div className="monitor-stand" aria-hidden="true"><span /><i /></div>
    </div>
  );
}

export default function AIDashboards() {
  return (
    <section id="dashboards" className="section dash">
      <div className="section-inner dash-inner">
        <div className="dash-copy">
          <h2 className="h2">AI dashboards: ask your business a question</h2>
          <p className="section-lede">Your sales, invoices and jobs in one live dashboard, built in Microsoft 365. Then ask it things in plain English and get an answer, not a spreadsheet.</p>
          <ul className="svc-points">
            <li>Pulls from Excel, SharePoint and the systems you already use</li>
            <li>Refreshed automatically, so the numbers are always today's</li>
            <li>Shared securely with the people who need it, on any device</li>
            <li>Set up and looked after by us</li>
          </ul>
          <div className="dash-actions">
            <a href="#contact" className="btn-sky btn-lg">Talk to us about a dashboard</a>
            <a href="/ai-dashboards/" className="btn-outline btn-lg">How it works</a>
          </div>
        </div>
        <DashPanel />
      </div>
    </section>
  );
}
