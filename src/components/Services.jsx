import { useEffect, useRef, useState } from 'react';
import { SVCS, TICKET, DEVICES } from '../data.js';
import { darkBand } from '../theme.js';

function Logo({ name, size = 20 }) {
  return <img src={`/logos/${name}.svg`} alt="" width={size} height={size} className="ms-icon" />;
}

function Migrate() {
  return (
    <div className="diagram">
      <div className="diagram-label">Moving you onto Microsoft 365 and Azure</div>
      <div className="migrate-grid">
        <div className="migrate-step">From</div>
        <div className="migrate-sources">
          <div className="box">Old email server</div>
          <div className="box">Google Workspace</div>
          <div className="box">File shares &amp; USB drives</div>
          <div className="box">Office server</div>
        </div>
        <div className="migrate-lines">
          {[0, 0.55, 1.1, 1.65].map(d => (
            <div key={d} className="flow-line"><span className="flow-dot" style={{ animationDelay: d + 's' }} /></div>
          ))}
        </div>
        <div className="migrate-step migrate-step-to" aria-hidden="true">↓ To</div>
        <div className="migrate-targets">
          <div className="azure-target">
            <div className="migrate-target-title">Microsoft 365</div>
            {[['exchange', 'Exchange'], ['sharepoint', 'SharePoint'], ['onedrive', 'OneDrive']].map(([f, n]) => (
              <div key={f} className="azure-row"><span><Logo name={f} />{n}</span></div>
            ))}
          </div>
          <div className="azure-target">
            <div className="migrate-target-title"><Logo name="azure" size={22} />Azure</div>
            <div className="azure-row"><span>Virtual machines</span></div>
            <div className="azure-row"><span>Azure Virtual Desktop</span></div>
          </div>
        </div>
      </div>
      <p className="diagram-note">We plan around how you work, copy mail and files across in the background, then switch over out of hours.</p>
    </div>
  );
}

function Secure() {
  const layer = (name, items) => (
    <div className="layer-head">
      <span className="layer-name">{name}</span>
      <span className="layer-detail">
        {items.map(([logo, label]) => (
          <span key={label} className="layer-item">{logo && <Logo name={logo} />}{label}</span>
        ))}
      </span>
    </div>
  );
  return (
    <div className="diagram">
      <div className="diagram-label">Security in layers</div>
      <div className="layer">
        {layer('Identity', [['entra-id', 'Entra ID'], [null, 'MFA'], [null, 'Conditional Access']])}
        <div className="layer" style={{ background: 'rgba(94,209,182,.06)' }}>
          {layer('Devices', [['intune', 'Intune'], ['defender', 'Defender']])}
          <div className="layer" style={{ background: 'rgba(94,209,182,.1)' }}>
            {layer('Data', [['purview', 'Purview'], [null, 'Backup']])}
            <div className="layer-core">Your business</div>
          </div>
        </div>
      </div>
      <p className="diagram-note">Each layer stops what gets past the one before. We set them to Microsoft's own security baselines, then check them every month.</p>
    </div>
  );
}

function Devices() {
  const device = (name, i) => (
    <div key={i} className="device">
      <span className="device-name">{name}</span>
      <span className="device-badge">Compliant</span>
    </div>
  );
  return (
    <div className="diagram">
      <div className="diagram-label">Every device, managed from one place</div>
      <div className="device-grid">
        {DEVICES.slice(0, 3).map((n, i) => device(n, i))}
        <div className="intune-bar">
          <span className="intune-title"><Logo name="intune" size={28} />Intune</span>
          <span className="intune-detail">Policies, apps, updates and remote wipe</span>
        </div>
        {DEVICES.slice(3).map((n, i) => device(n, i + 3))}
      </div>
      <p className="diagram-note">New laptops arrive ready to use with Autopilot. A lost phone can be wiped in minutes, and updates install without anyone chasing them.</p>
    </div>
  );
}

function Support() {
  return (
    <div className="diagram">
      <div className="diagram-label">Example ticket</div>
      <div className="ticket">
        <div className="ticket-track"><span className="ticket-fill" /></div>
        <div className="ticket-list">
          {TICKET.map(([time, text]) => (
            <div key={time} className="ticket-row">
              <span className="ticket-time">{time}</span>
              <span className="ticket-text">{text}</span>
            </div>
          ))}
        </div>
      </div>
      <p className="diagram-note">You talk to an engineer who knows your setup. No call centre, no ticket bouncing between teams.</p>
    </div>
  );
}

const PANELS = [Migrate, Secure, Devices, Support];

// Under 900px the services become an accordion: each one is a panel that opens (and closes) in place.
const NARROW = '(max-width: 899px)';

function Chevron() {
  return (
    <svg className="svc-chev" viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

export default function Services() {
  // -1 = all closed (only possible on narrow screens); the desktop panel then falls back to the first service.
  const [svc, setSvc] = useState(0);
  const Panel = PANELS[Math.max(svc, 0)];
  const buttons = useRef([]);
  const tapped = useRef(false);

  // On narrow screens, bring the tapped service to the top once its details have opened
  // (closing the previous one can shift it upwards, off screen).
  useEffect(() => {
    if (!tapped.current || svc < 0 || !window.matchMedia(NARROW).matches) return;
    tapped.current = false;
    buttons.current[svc]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [svc]);

  const pick = (i) => {
    const narrow = window.matchMedia(NARROW).matches;
    tapped.current = true;
    setSvc(narrow && i === svc ? -1 : i);
  };

  return (
    <section id="services" className={"section section-dark" + darkBand}>
      <div className="section-inner">
        <div className="heading-group" style={{ maxWidth: 720 }}>
          <h2 className="h2">How we help</h2>
          <p className="section-lede">Pick a service to see how it works in practice.</p>
        </div>
        <div className="svc-body">
          <div className="svc-list">
            {SVCS.map(([title, line], i) => (
              <div key={title} className="svc-item" data-open={i === svc || undefined}>
                <button type="button" className="svc-btn" ref={el => { buttons.current[i] = el; }}
                  onClick={() => pick(i)} aria-pressed={i === svc} aria-expanded={i === svc}>
                  <span className="svc-title">{title}<Chevron /></span>
                  <span className="svc-line">{line}</span>
                </button>
                {i === svc && <div className="svc-inline"><Panel /></div>}
              </div>
            ))}
          </div>
          <div className="svc-panel">
            <Panel key={svc} />
          </div>
        </div>
      </div>
    </section>
  );
}
