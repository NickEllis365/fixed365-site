// Privacy notice (UK GDPR). Owner to confirm the controller name and retention periods before it goes live.
const UPDATED = '11 October 2026';

export default function PrivacyNotice() {
  return (
    <section className="legal">
      <div className="legal-inner">
        <h1 className="h2">Privacy notice</h1>
        <p className="legal-updated">Last updated {UPDATED}</p>

        <p>This notice explains what personal information Fixed365 collects, why, how long we keep it and what your rights are. We've kept it short and in plain English.</p>

        <h2>Who we are</h2>
        <p>Fixed365 is the trading name of Nick Ellis. We provide Microsoft 365 and Azure support to small businesses. For anything about your information, email <a href="mailto:hello@fixed365.co.uk">hello@fixed365.co.uk</a> or call 07950 428513.</p>

        <h2>What we collect and why</h2>
        <h3>If you contact us</h3>
        <p>When you use the form on our website, email or call us, we collect your name, work email, company name, team size and anything you tell us. We use it to reply and to arrange your health check. Our lawful basis is <strong>legitimate interests</strong>: answering people who've asked us to get in touch.</p>

        <h3>If we contact your business</h3>
        <p>We email some limited companies and LLPs that we think might benefit from our services. To do this we use publicly available business information:</p>
        <ul>
          <li>company details from <a href="https://find-and-update.company-information.service.gov.uk/" target="_blank" rel="noopener">Companies House</a>, including the names of directors</li>
          <li>contact details published on the business's own website</li>
          <li>business listings on Google Maps</li>
        </ul>
        <p>We only use business contact details, never personal email addresses, and we don't buy mailing lists. Our lawful basis is <strong>legitimate interests</strong>: telling businesses about a service relevant to them. We send one email and at most one short follow-up.</p>

        <h3>If you're a client</h3>
        <p>We keep the contact and account details we need to provide our services and to invoice you. Our lawful basis is <strong>contract</strong>. While supporting your Microsoft 365 or Azure setup we may see information held in your systems; we only access it to do the work you've asked for.</p>

        <h2>Saying no to marketing</h2>
        <p>You can ask us to stop at any time. Just reply "no thanks" to any email or contact us using the details above, and we'll stop straight away. We keep a short record (your email address and company name) only so that we never contact you again.</p>

        <h2>Who we share it with</h2>
        <p>We don't sell or rent your information. We use a few trusted services to run the business:</p>
        <ul>
          <li><strong>Microsoft</strong>: our email and files (Microsoft 365)</li>
          <li><strong>Web3Forms</strong>: delivers messages from our website form to our inbox</li>
          <li><strong>Google</strong>: we search Google Maps for business listings</li>
        </ul>
        <p>Some of these providers may process information outside the UK. Where they do, they use legal safeguards approved for UK data, such as adequacy regulations or the UK International Data Transfer Addendum.</p>

        <h2>How long we keep it</h2>
        <ul>
          <li><strong>Enquiries</strong>: up to 2 years after we last spoke, unless you become a client</li>
          <li><strong>Businesses we've contacted</strong>: up to 12 months after our last email if you don't reply, then deleted</li>
          <li><strong>"Don't contact me" list</strong>: kept for as long as we do marketing, so we can respect your choice</li>
          <li><strong>Clients</strong>: 6 years after our work ends, as required for tax and legal records</li>
        </ul>

        <h2>Your rights</h2>
        <p>You have the right to ask for a copy of your information, to have it corrected or deleted, to restrict or object to how we use it, and to have it transferred. Contact us using the details above and we'll respond within one month. There's no charge.</p>

        <h2>Complaints</h2>
        <p>If you're unhappy with how we've handled your information, please tell us first and we'll try to put it right. You can also complain to the Information Commissioner's Office at <a href="https://ico.org.uk/make-a-complaint/" target="_blank" rel="noopener">ico.org.uk</a> or on 0303 123 1113.</p>

        <h2>Changes</h2>
        <p>We'll update this notice if anything changes. The date at the top shows when it was last updated.</p>

        <p className="legal-back"><a href="/">Back to the home page</a></p>
      </div>
    </section>
  );
}
