import { useEffect, useRef } from 'react'
import { portfolio } from '../data'
import { inspirationDescriptions, nailDescriptions } from '../galleryData'

export function GalleryChoice() {
  const firstLink = useRef<HTMLAnchorElement>(null)
  useEffect(() => {
    firstLink.current?.focus({ preventScroll: true })
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') location.hash = 'home'
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])
  return (
    <section
      className="gallery-choice"
      aria-label="Choose a gallery"
      onClick={(event) => {
        if (!(event.target as HTMLElement).closest('a,button')) location.hash = 'home'
      }}
    >
      <iframe
        className="gallery-backdrop"
        src={`${location.pathname}?galleryBackdrop=1#home`}
        title="Home page background"
        tabIndex={-1}
        aria-hidden="true"
        inert
      />
      {['Nails', 'Tattoos'].map((name, index) => (
        <a
          key={name}
          ref={index === 0 ? firstLink : undefined}
          className="gallery-choice-link"
          href={index === 0 ? '#nail' : '#tattoo'}
          aria-label={`${name} — explore the portfolio`}
        >
          <span className="choice-copy">
            <small>{index === 0 ? 'DETAILS THAT SHINE' : 'ART THAT STAYS'}</small>
            <strong>{name}</strong>
            <span>Explore the portfolio</span>
          </span>
          <span className="choice-arrow" aria-hidden="true">
            ↗
          </span>
        </a>
      ))}
    </section>
  )
}

function PortfolioHeading() {
  return (
    <>
      <h2 className="portfolio-heading">Portfolio</h2>
      <h3 className="portfolio-caption">a few of my recent work</h3>
    </>
  )
}
export function TattooPortfolio({ onOpen }: { onOpen: (index: number) => void }) {
  return (
    <section className="page wrap">
      <a className="back-link" href="#gallery">
        ← Gallery
      </a>
      <div className="portfolio-intro">
        <h1 className="route-title">Ink that feels like yours.</h1>
        <p>
          Every design is different. Pricing depends on the size, detail and placement of your
          tattoo. Send your idea through WhatsApp to receive a personal quote. Nail artistry is
          available too — ask Nana for the latest catalogue.
        </p>
      </div>
      <PortfolioHeading />
      <div className="gallery-grid">
        {portfolio.map((item, index) => (
          <button className="shot" key={item.src} onClick={() => onOpen(index)}>
            <img src={item.src} alt={item.alt} loading="lazy" />
          </button>
        ))}
        <video
          className="finished-work-video"
          src="/assets/studio/finished-tattoos.mp4"
          controls
          playsInline
          preload="metadata"
          aria-label="Finished tattoo portfolio video"
        />
      </div>
    </section>
  )
}
export function NailPortfolio() {
  return (
    <section className="page wrap">
      <a className="back-link" href="#gallery">
        ← Gallery
      </a>
      <div className="nail-intro">
        <h2 className="portfolio-heading">Nails, finished your way.</h2>
        <p>
          From a clean everyday set to a little extra expression, Nana fits artificial nails around
          your style. Get in touch to discuss your preferred shape, length and finish.
        </p>
      </div>
      <PortfolioHeading />
      <div className="nail-gallery">
        {nailDescriptions.map((alt, index) => (
          <img
            key={alt}
            src={`/assets/nails/photo-${String(index + 1).padStart(2, '0')}.jpeg`}
            alt={alt}
            loading="lazy"
            decoding="async"
          />
        ))}
      </div>
      <h2 className="portfolio-heading">In motion</h2>
      <div className="nail-gallery nail-videos">
        {Array.from({ length: 10 }, (_, index) => (
          <video
            key={index}
            controls
            playsInline
            preload="metadata"
            aria-label={`Nail portfolio video ${index + 1}`}
          >
            <source
              src={`/assets/nails/video-${String(index + 1).padStart(2, '0')}.mp4`}
              type="video/mp4"
            />
            Your browser does not support this video.
          </video>
        ))}
      </div>
    </section>
  )
}
export function Inspirations() {
  return (
    <>
      <p className="gallery-hint">
        Inspiration selected by Nana. Bring a favourite reference to discuss your own design, size
        and placement.
      </p>
      <div className="reference-gallery">
        {inspirationDescriptions.map((description, index) => {
          const src = `/assets/inspirations/reference-${String(index + 1).padStart(2, '0')}.jpeg`
          return (
            <a
              key={src}
              href={src}
              target="_blank"
              rel="noreferrer"
              aria-label={`View full image: ${description}`}
            >
              <img src={src} alt={description} loading="lazy" />
            </a>
          )
        })}
      </div>
    </>
  )
}
