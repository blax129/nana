import { faqs, mapUrl, phoneUrl, services, steps, tiktokUrl, whatsappUrl } from '../data'

type ContactKind = 'tiktok' | 'whatsapp' | 'call'
function ContactIcon({ kind }: { kind: ContactKind }) {
  return (
    <svg className={`footer-icon ${kind}-icon`} viewBox="0 0 24 24" aria-hidden="true">
      {kind === 'tiktok' ? (
        <path
          fill="currentColor"
          d="M14 2h3c.3 2.6 1.8 4.2 4 4.5v3a9 9 0 0 1-4-1.3v7.5A6.3 6.3 0 1 1 11 9.4v3.2a3.1 3.1 0 1 0 3 3.1V2Z"
        />
      ) : (
        <>
          {kind === 'whatsapp' && (
            <path
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Z"
            />
          )}
          <path
            fill="currentColor"
            d="M8.2 6.8c-.4 0-1.3.7-1.3 2 0 2.4 3.5 6.5 6.8 7.3 1.4.3 2.8-.5 3-1.5l.1-.8-2.6-1.3-.9 1.1c-.2.2-.4.2-.7.1-1.3-.6-2.4-1.6-3-2.8-.2-.3-.1-.5.1-.7l.7-.9-1-2.4-.3-.1Z"
          />
        </>
      )}
    </svg>
  )
}
export function Footer() {
  return (
    <footer className="site-footer booking-footer">
      <div className="wrap">
        <h2>Your next look starts here.</h2>
        <p>
          A new tattoo or a fresh nail set — tell Nana what you have in mind. Let’s plan your design
          and find a date that works for you.
        </p>
        <a className="btn btn-solid" href={whatsappUrl} target="_blank" rel="noreferrer">
          Book
        </a>
        <div className="footer-contacts" id="footer-contact" tabIndex={-1}>
          <a href={tiktokUrl} target="_blank" rel="noreferrer">
            <ContactIcon kind="tiktok" />
            <span>
              <small>TikTok</small>
              <span>@nanainknails ↗</span>
            </span>
          </a>
          <a href={whatsappUrl} target="_blank" rel="noreferrer">
            <ContactIcon kind="whatsapp" />
            <span>
              <small>WhatsApp</small>
              <span>+234 802 447 8190 ↗</span>
            </span>
          </a>
          <a href={phoneUrl}>
            <ContactIcon kind="call" />
            <span>
              <small>Call</small>
              <span>0903 750 4740 ↗</span>
            </span>
          </a>
        </div>
        <p className="copyright">
          © {new Date().getFullYear()} Nana Ink & Nails. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
export function ContactPage() {
  return (
    <section className="page contact-page">
      <div className="wrap page-intro">
        <p className="index-label">03</p>
        <h1>Contact</h1>
        <p>Connect today to talk through your idea and book a consultation.</p>
      </div>
      <div className="wrap contact-links">
        <a href={whatsappUrl} target="_blank" rel="noreferrer">
          <small>WhatsApp</small>
          <strong>+234 802 447 8190</strong>
        </a>
        <a href={phoneUrl}>
          <small>Call</small>
          <strong>0903 750 4740</strong>
        </a>
        <a href={mapUrl} target="_blank" rel="noreferrer">
          <small>Visit</small>
          <strong>No. 17 Aje Ejibiran Street, Igando, Lagos</strong>
        </a>
        <a href={tiktokUrl} target="_blank" rel="noreferrer">
          <small>TikTok</small>
          <strong>@nanainknails</strong>
        </a>
      </div>
      <div className="wrap home-note">
        <strong>Home service available.</strong>
        <span>
          {' '}
          Confirm your location, availability and any travel cost with Nana before booking.
        </span>
      </div>
      <div className="wrap steps">
        {steps.map(([number, title, description]) => (
          <article key={number}>
            <span>{number}</span>
            <h2>{title}</h2>
            <p>{description}</p>
          </article>
        ))}
      </div>
      <div className="wrap services">
        <h2>Services</h2>
        <ul>
          {services.map(([number, title, description]) => (
            <li key={number}>
              <span>{number}</span>
              <div>
                <strong>{title}</strong>
                <p>{description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="wrap faq">
        <h2>Before you book</h2>
        {faqs.map((item) => (
          <details key={item.question}>
            <summary>{item.question}</summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  )
}
