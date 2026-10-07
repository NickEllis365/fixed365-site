import { useState } from 'react';
import { SVCS, SVC_COLORS, TICKET, DEVICES } from '../data.js';
import { darkBand } from '../theme.js';

// Official Microsoft architecture icons (Azure and Entra icon sets), used in diagrams only.
function Icon({ name, size = 20 }) {
  return <img src={`/icons/${name}.svg`} alt="" width={size} height={size} className="ms-icon" />;
}

function Migrate() {
  return (
    <div className="diagram">
      <div className="diagram-label">Moving you onto Microsoft 365 and Azure</div>
      <div className="migrate-grid">
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
        <div className="migrate-targets">
          <div className="migrate-target">
            <div className="migrate-target-title">Microsoft 365</div>
            {['Exchange', 'SharePoint', 'OneDrive'].map(n => (
              <div key={n} className="migrate-target-row">{n} <span>✓</span></div>
            ))}
          </div>
          <div className="azure-target">
            <div className="migrate-target-title">Azure</div>
            <div className="azure-row"><span><Icon name="azure-vm" />Virtual machines</span><span>✓</span></div>
            <div className="azure-row"><span><Icon name="azure-virtual-desktop" />Azure Virtual Desktop</span><span>✓</span></div>
          </div>
        </div>
      </div>
      <div className="step-strip">
        {['Plan around how you work', 'Copy mail and files in the background', 'Switch over out of hours'].map((t, i) => (
          <div key={t}><span className="step-strip-num">0{i + 1}</span><span>{t}</span></div>
        ))}
      </div>
    </div>
  );
}

function Secure() {
  const layer = (name, items) => (
    <div className="layer-head">
      <span className="layer-name">{name}</span>
      <span className="layer-detail">
        {items.map(([icon, label]) => (
          <span key={label} className="layer-item">{icon && <Icon name={icon} />}{label}</span>
        ))}
      </span>
    </div>
  );
  return (
    <div className="diagram">
      <div className="diagram-label">Security in layers</div>
      <div className="layer">
        {layer('IDENTITY', [['entra-id', 'Entra ID'], [null, 'MFA'], [null, 'Conditional Access']])}
        <div className="layer" style={{ background: 'rgba(94,209,182,.06)' }}>
          {layer('DEVICES', [['intune', 'Intune compliance'], [null, 'Defender']])}
          <div className="layer" style={{ background: 'rgba(94,209,182,.1)' }}>
            {layer('DATA', [[null, 'Purview'], [null, 'DLP'], [null, 'Backup']])}
            <div className="layer-core">Your business</div>
          </div>
        </div>
      </div>
      <p className="diagram-note">Each layer stops what gets past the one before. We set them to Microsoft's own security baselines, then check them every month.</p>
    </div>
  );
}

function Devices() {
  const device = (name, delay) => (
    <div key={name} className="device" style={{ animationDelay: delay + 's' }}>
      <span className="device-name">{name}</span>
      <span className="device-badge">Compliant ✓</span>
    </div>
  );
  return (
    <div className="diagram">
      <div className="diagram-label">Every device, managed from one place</div>
      <div className="device-grid">
        {DEVICES.slice(0, 3).map((n, i) => device(n, i * 0.15))}
        <div className="intune-bar">
          <span className="intune-title"><Icon name="intune" size={28} />Intune</span>
          <span className="intune-detail">Policies · Apps · Updates · Remote wipe</span>
        </div>
        {DEVICES.slice(3).map((n, i) => device(n, 0.45 + i * 0.15))}
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
          {TICKET.map(([time, text], i) => (
            <div key={time} className="ticket-row" style={{ animationDelay: i * 0.5 + 's' }}>
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

export default function Services() {
  const [svc, setSvc] = useState(0);
  const Panel = PANELS[svc];

  return (
    <section id="services" className={"section section-dark" + darkBand}>
      <div className="section-inner">
        <div className="heading-group" style={{ maxWidth: 720 }}>
          <div className="eyebrow">How we help</div>
          <h2 className="h2">Four services, start to finish.</h2>
        </div>
        <div className="svc-body">
          <div className="svc-list">
            {SVCS.map(([title, line], i) => (
              <button key={title} type="button" className="svc-btn" onClick={() => setSvc(i)} aria-pressed={i === svc}
                style={{ borderLeftColor: i === svc ? SVC_COLORS[i] : 'transparent', background: i === svc ? 'var(--panel)' : 'transparent' }}>
                <span className="svc-title">{title}<span className="svc-num">0{i + 1}</span></span>
                <span className="svc-line">{line}</span>
              </button>
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
