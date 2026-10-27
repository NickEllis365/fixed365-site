import PageHero from '../components/PageHero.jsx';
import WhatWeCover from '../components/WhatWeCover.jsx';
import Services, { PANELS } from '../components/Services.jsx';
import GettingStarted from '../components/GettingStarted.jsx';
import Contact from '../components/Contact.jsx';
import { SVC_GROUPS } from '../data.js';

export default function Microsoft365Page() {
  const Support = PANELS.Support;
  return (
    <>
      <PageHero
        kicker="Microsoft 365 support for small UK businesses"
        title="A real engineer who knows your Microsoft 365."
        lede="We set up, secure and support Microsoft 365 and Azure for small UK businesses, and help you put AI like Copilot to work safely."
        actions={<>
          <a href="#contact" className="btn-sky btn-lg">Book a free health check</a>
          <a href="#stack" className="btn-outline btn-lg">See what we cover</a>
        </>}>
        <div className="svc-panel page-panel"><Support /></div>
      </PageHero>
      <WhatWeCover />
      <Services groups={[SVC_GROUPS[0]]} title={<>How we <span className="accent">help</span></>}
        lede="Moving you over, locking it down, looking after every device, and support when something goes wrong." />
      <GettingStarted />
      <Contact preset={['Microsoft 365']} />
    </>
  );
}
