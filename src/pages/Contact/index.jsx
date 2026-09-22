import { useState } from 'react';

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '', email: '', subject: '', message: '', consent: false,
  });
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');
    
    // Frontend-only simulation
    setTimeout(() => {
      setStatus('sent');
      setForm({ name: '', email: '', subject: '', message: '', consent: false });
    }, 1200);
  };

  return (
    <main id="primary-content" className="ft-page-main">
      <header className="ft-inner-hero ft-inner-hero--page">
        <div className="ft-inner-hero__grid" aria-hidden="true"></div>
        <div className="ft-shell">
          <p className="ft-eyebrow">
            <span aria-hidden="true"></span>Bridget Kelly Support
          </p>
          <h1>Contact Us</h1>
        </div>
      </header>

      <div className="ft-shell ft-page-wrap">
        <article className="ft-page-article page type-page status-publish hentry">
          <div className="ft-entry-content entry-content">

            <h2>Get in touch</h2>
            <p>
              Have a question about a review, a buying guide, or the Bridget Kelly
              website? Use the options below to reach the right team.
            </p>

            <h2>Editorial enquiries</h2>
            <p>
              For corrections, press releases, product loan requests or review
              pitches, email us at{' '}
              <a href="mailto:editorial@bridgetkelly.com">editorial@bridgetkelly.com</a>.
              Please include the article title or product name in the subject line.
            </p>

            <h2>Advertising &amp; partnerships</h2>
            <p>
              For advertising opportunities, sponsored content or affiliate
              partnership enquiries, visit the{' '}
              <a href="/advertise">Advertise page</a> or email{' '}
              <a href="mailto:partnerships@bridgetkelly.com">partnerships@bridgetkelly.com</a>.
            </p>

            <h2>Store &amp; order support</h2>
            <p>
              For issues with an order, a return or a product bought through the
              Bridget Kelly shop, email{' '}
              <a href="mailto:orders@bridgetkelly.com">orders@bridgetkelly.com</a> with
              your order number.
            </p>

            <h2>Security disclosures</h2>
            <p>
              If you have identified a security vulnerability affecting BridgetKelly.com,
              email us with the subject <strong>Security Report</strong>. Describe
              the issue and the steps needed to reproduce it without attempting to
              access data that does not belong to you, disrupt the service, or
              expose credentials.
            </p>

            <h2>Before contacting us</h2>
            <ul>
              <li>Check that the URL and error message are copied accurately.</li>
              <li>
                For WordPress Assistant issues, confirm the Bridget Kelly AI Bridge is
                installed and that you are authorized to administer the WordPress site.
              </li>
              <li>For store issues, keep your order confirmation available.</li>
              <li>
                Remove passwords, tokens, payment credentials, and other secrets
                from screenshots or copied logs.
              </li>
            </ul>

            <h2>Send a message</h2>
            <p>You can also use the form below to contact Bridget Kelly.</p>

            {/* Custom styled contact form — replaces Contact Form 7 */}
            <div className="ft-cf7">
              <div className="ft-cf7__intro">
                <p><span className="ft-cf7__eyebrow">FrediTech Support</span></p>
                <h3>How can we help?</h3>
                <p>Tell us what you need and include the details that will help us respond efficiently.</p>
              </div>

              <form onSubmit={handleSubmit} noValidate>
                <div className="ft-cf7__grid">
                  <label className="ft-cf7__field">
                    <span>Full name <em>*</em></span>
                    <input
                      type="text"
                      name="name"
                      placeholder="Your full name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      autoComplete="name"
                    />
                  </label>
                  <label className="ft-cf7__field">
                    <span>Email address <em>*</em></span>
                    <input
                      type="email"
                      name="email"
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={handleChange}
                      required
                      autoComplete="email"
                    />
                  </label>
                </div>

                <label className="ft-cf7__field">
                  <span>Subject <em>*</em></span>
                  <select name="subject" value={form.subject} onChange={handleChange} required>
                    <option value="">Select a topic…</option>
                    <option value="editorial">Editorial enquiry</option>
                    <option value="advertising">Advertising / partnership</option>
                    <option value="store">Store / order support</option>
                    <option value="security">Security disclosure</option>
                    <option value="other">Other</option>
                  </select>
                </label>

                <label className="ft-cf7__field">
                  <span>Message <em>*</em></span>
                  <textarea
                    name="message"
                    placeholder="Describe your question or issue in detail…"
                    value={form.message}
                    onChange={handleChange}
                    required
                  />
                </label>

                <div className="ft-cf7__security">
                  <strong>Before you submit:</strong> do not include passwords, API
                  tokens or payment details in your message.
                </div>

                <div className="ft-cf7__consent">
                  <label>
                    <input
                      type="checkbox"
                      name="consent"
                      checked={form.consent}
                      onChange={handleChange}
                      required
                    />
                    <span>
                      I agree that Bridget Kelly may store and process my data to
                      respond to my enquiry. See our{' '}
                      <a href="/privacy-policy">Privacy Policy</a>.
                    </span>
                  </label>
                </div>

                <div className="ft-cf7__actions">
                  <button
                    type="submit"
                    className="ft-cf7__submit"
                    disabled={status === 'sending' || status === 'sent'}
                  >
                    {status === 'sending' ? 'Sending…' : status === 'sent' ? 'Sent ✓' : 'Send message'}
                  </button>
                  <span className="ft-cf7__hint">
                    We typically reply within 2–3 business days.
                  </span>
                </div>

                {status === 'sent' && (
                  <div className="wpcf7-response-output" style={{ borderColor: '#86c89a', background: '#f2fff6', color: '#17602b' }}>
                    Thank you for your message. We&apos;ll be in touch shortly.
                  </div>
                )}
                {status === 'error' && (
                  <div className="wpcf7-response-output" style={{ borderColor: '#f0a5a5', background: '#fff5f5', color: '#8a1c1c' }}>
                    Something went wrong. Please try again or email us directly.
                  </div>
                )}
              </form>
            </div>

          </div>
        </article>
      </div>
    </main>
  );
}
