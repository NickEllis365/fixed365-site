import PageHero from '../components/PageHero.jsx';
import { PANELS } from '../components/Services.jsx';
import Contact from '../components/Contact.jsx';

// What's included: the points from "What we do" > Websites and the Websites tile, in a little more detail.
const INCLUDED = [
  ['Designed around your business', 'Built around what you do, with your own logo and photos.'],
  ['Looks right on phones', 'Laid out for phones as well as laptops, so it reads properly wherever people find you.'],
  ['Your own domain, with a padlock', 'Hosted for you on Microsoft Azure, on your own web address, with a secure padlock.'],
  ['Enquiries straight to your inbox', 'A contact form that sends every enquiry to your email.'],
  ['Changes when you need them', 'New prices, new photos, a new service: ask and we update it.'],
];

const AROUND = [
  ['Domain hosting', 'Your domain names registered and renewed so they never lapse, with the DNS for your email and website managed in one place.'],
  ['Email security', 'SPF, DKIM and DMARC set up and monitored, so nobody can easily send email pretending to be you.'],
];

export default function WebsitesPage() {
  const Diagram = PANELS.Websites;
  return (
    <>
      <PageHero
        kicker="Websites for small UK businesses"
        title="A simple, fast website, built and looked after for you."
        lede="Designed around your business, right on phones, and sending enquiries straight to your inbox. We host it, and make changes when you need them."
        actions={<>
          <a href="#contact" className="btn-sky btn-lg">Ask about a website</a>
          <span className="svc-price page-price">From £400</span>
        </>}>
        <div className="svc-panel page-panel"><Diagram /></div>
      </PageHero>

      <section className="section">
        <div className="section-inner">
          <h2 className="h2">What you <span className="accent">get</span></h2>
          <dl className="page-rows">
            {INCLUDED.map(([t, d]) => <div key={t}><dt>{t}</dt><dd>{d}</dd></div>)}
          </dl>
        </div>
      </section>

      <section className="section section-dark theme-dark">
        <div className="section-inner">
          <div className="heading-group" style={{ maxWidth: 720 }}>
            <h2 className="h2">Your domain and email, <span className="accent">sorted too</span></h2>
            <p className="section-lede">A website lives on your domain, and so does your email. We can look after both.</p>
          </div>
          <dl className="page-rows">
            {AROUND.map(([t, d]) => <div key={t}><dt>{t}</dt><dd>{d}</dd></div>)}
          </dl>
          <a href="/email-check/" className="btn-outline btn-lg page-link">Check your email security for free</a>
        </div>
      </section>

      <Contact preset={['Websites']} />
    </>
  );
}
