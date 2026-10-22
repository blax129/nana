import { useEffect, useRef, useState } from 'react'
import { ResponsiveImage } from './ResponsiveImage'
import { mapUrl } from '../data'
import { Inspirations } from './Galleries'
import { StudioReel } from './StudioReel'

export function scrollToSection(id: string) {
  const element = document.getElementById(id)
  element?.focus({ preventScroll: true })
  element?.scrollIntoView({
    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    block: 'start',
  })
}

export function Home({ ready, backdrop }: { ready: boolean; backdrop: boolean }) {
  const [showInspirations, setShowInspirations] = useState(false)
  const heroRef = useRef<HTMLElement>(null)
  useEffect(() => {
    const hero = heroRef.current
    if (!hero || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let frame = 0
    function update() {
      if (hero)
        hero.style.setProperty(
          '--hero-scroll',
          String(Math.max(0, Math.min(1, -hero.getBoundingClientRect().top / hero.offsetHeight))),
        )
      frame = 0
    }
    function schedule() {
      if (!frame) frame = requestAnimationFrame(update)
    }
    window.addEventListener('scroll', schedule, { passive: true })
    update()
    return () => {
      window.removeEventListener('scroll', schedule)
      cancelAnimationFrame(frame)
    }
  }, [])
  useEffect(() => {
    if (showInspirations) scrollToSection('home-results')
  }, [showInspirations])

  return (
    <>
      <section
        ref={heroRef}
        className={`hero${ready ? ' hero-ready' : ''}`}
        aria-label="Nana Ink and Nail"
        onPointerMove={(event) => {
          if (
            event.pointerType !== 'mouse' ||
            window.matchMedia('(prefers-reduced-motion: reduce)').matches
          )
            return
          const bounds = event.currentTarget.getBoundingClientRect()
          event.currentTarget.style.setProperty(
            '--hero-pointer',
            String((event.clientX - bounds.left) / bounds.width - 0.5),
          )
        }}
        onPointerLeave={(event) => event.currentTarget.style.setProperty('--hero-pointer', '0')}
      >
        <div className="hero-stage">
          <div className="portrait-frame">
            <div className="hero-photo-wrap">
              <ResponsiveImage
                src="/assets/nana-home-portrait.jpg"
                alt="Nana, tattoo and nail artist in Igando, Lagos"
                fetchPriority="high"
                sizes="(max-width: 680px) 320px, 400px"
              />
            </div>
          </div>
          <div className="portrait-signature">
            <svg className="signature-orbit" viewBox="0 0 400 220" fill="none" aria-hidden="true">
              <ellipse cx="200" cy="112" rx="184" ry="69" transform="rotate(-14 200 112)" />
              <path d="M25 167C90 202 305 174 377 53" />
            </svg>
            <span className="signature-star" aria-hidden="true">
              ✧
            </span>
            <h1 className="signature-name" aria-label="Nana Ink & Nails">
              <span className="signature-nana" aria-hidden="true">
                Nana<span>.</span>
              </span>
              <span className="signature-detail" aria-hidden="true">
                Ink <i>&</i> Nails
              </span>
            </h1>
          </div>
        </div>
      </section>
      <section className="about" id="about">
        <div className="wrap intro-copy">
          <p className="index-label">Meet Nana</p>
          <h2>
            Beauty. Art.
            <br />
            Confidence.
          </h2>
          <p>
            Welcome to Nana Ink & Nails in Igando, Lagos — a space for thoughtful tattoos and
            beautifully fitted artificial nails. Bring your ideas and inspiration; together, we'll
            create something that feels personal to you.
          </p>
          {!backdrop && <StudioReel />}
          <div className="actions">
            <a className="btn" href="#gallery">
              See gallery
            </a>
            <button className="btn btn-solid" onClick={() => scrollToSection('footer-contact')}>
              Get in touch
            </button>
            <button
              className="btn"
              aria-expanded={showInspirations}
              aria-controls="home-results"
              onClick={() => setShowInspirations(!showInspirations)}
            >
              Tattoo inspirations
            </button>
          </div>
        </div>
      </section>
      {showInspirations && (
        <section id="home-results" className="wrap inline-results" tabIndex={-1}>
          <h2 className="portfolio-heading">Tattoo inspirations</h2>
          <Inspirations />
        </section>
      )}
      <section className="statement">
        <div className="wrap">
          <p className="index-label">Find your space</p>
          <h2>
            Visit the studio.
            <br />
            Or stay in.
          </h2>
          <p className="statement-copy">
            Meet Nana at the Igando studio, or ask about an appointment at home. Choose a space
            where you feel comfortable, and confirm the details before your visit.
          </p>
          <div className="facts location-options">
            <a
              className="studio-card"
              href={mapUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="Find Igando studio on Google Maps"
            >
              <span className="studio-pin" aria-hidden="true">
                ⌖
              </span>
              <h3>Igando studio</h3>
              <p>No. 17 Aje Ejibiran Street, off Olowoila Bus Stop.</p>
              <span className="studio-directions">
                Open Google Maps <span aria-hidden="true">↗</span>
              </span>
            </a>
            <article className="home-service-card">
              <svg
                className="home-service-art"
                viewBox="0 0 180 110"
                role="img"
                aria-label="An artist travelling to your home"
              >
                <path
                  d="M98 52l31-27 31 27v45h-62Z M120 97V70h19v27"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  className="travel-path"
                  d="M12 96H88"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeDasharray="5 7"
                />
                <g className="travel-kit">
                  <rect
                    x="26"
                    y="64"
                    width="38"
                    height="27"
                    rx="5"
                    fill="#243329"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M36 64v-7h18v7M45 71v13M39 77h12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </g>
                <path
                  className="house-spark"
                  d="M159 17v12M153 23h12"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
              <h3>Home service</h3>
              <p>Share your location so Nana can confirm availability and any travel cost.</p>
            </article>
          </div>
        </div>
      </section>
    </>
  )
}
