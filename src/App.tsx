import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { portfolio, whatsappUrl } from './data'
import { ContactPage, Footer } from './components/Contact'
import { GalleryChoice, Inspirations, NailPortfolio, TattooPortfolio } from './components/Galleries'
import { Home } from './components/Home'

type Page = 'home' | 'gallery' | 'tattoo' | 'nail' | 'contact' | 'inspirations'
const pages: Page[] = ['home', 'gallery', 'tattoo', 'nail', 'contact', 'inspirations']
function pageFromHash(): Page {
  const value = location.hash.slice(1) as Page
  return pages.includes(value) ? value : 'home'
}

function Lightbox({
  index,
  onChange,
  onClose,
}: {
  index: number
  onChange: (index: number) => void
  onClose: () => void
}) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const previousFocus = document.activeElement as HTMLElement | null
    closeRef.current?.focus()
    return () => previousFocus?.focus()
  }, [])
  return (
    <div
      ref={dialogRef}
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label="Portfolio image"
      onClick={onClose}
      onKeyDown={(event) => {
        if (event.key === 'Escape') onClose()
        if (event.key === 'ArrowRight') onChange((index + 1) % portfolio.length)
        if (event.key === 'ArrowLeft') onChange((index - 1 + portfolio.length) % portfolio.length)
        if (event.key === 'Tab') {
          const buttons = dialogRef.current?.querySelectorAll<HTMLButtonElement>('button')
          if (!buttons?.length) return
          const first = buttons[0],
            last = buttons[buttons.length - 1]
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault()
            last.focus()
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault()
            first.focus()
          }
        }
      }}
    >
      <button
        ref={closeRef}
        className="lightbox-close"
        type="button"
        aria-label="Close image"
        onClick={onClose}
      >
        Close
      </button>
      <button
        className="lightbox-nav prev"
        type="button"
        aria-label="Previous image"
        onClick={(event) => {
          event.stopPropagation()
          onChange((index - 1 + portfolio.length) % portfolio.length)
        }}
      >
        Prev
      </button>
      <figure onClick={(event) => event.stopPropagation()}>
        <img src={portfolio[index].src} alt={portfolio[index].alt} />
      </figure>
      <button
        className="lightbox-nav next"
        type="button"
        aria-label="Next image"
        onClick={(event) => {
          event.stopPropagation()
          onChange((index + 1) % portfolio.length)
        }}
      >
        Next
      </button>
    </div>
  )
}

export default function App() {
  const [page, setPage] = useState<Page>(pageFromHash)
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      const saved = localStorage.getItem('nana-theme')
      if (saved === 'light' || saved === 'dark') return saved
    } catch {
      /* Storage can be disabled. */
    }
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
  })
  const [lightbox, setLightbox] = useState<number | null>(null)
  const backdrop = new URLSearchParams(location.search).has('galleryBackdrop')
  const [booting, setBooting] = useState(!backdrop)
  const [ready, setReady] = useState(backdrop)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.documentElement.style.colorScheme = theme
    try {
      localStorage.setItem('nana-theme', theme)
    } catch {
      /* Keep the in-memory theme. */
    }
  }, [theme])
  useEffect(() => {
    const delay = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 100 : 500
    const timer = window.setTimeout(() => setBooting(false), delay)
    return () => window.clearTimeout(timer)
  }, [])
  useEffect(() => {
    if (booting) return
    const timer = window.setTimeout(() => setReady(true), 180)
    return () => window.clearTimeout(timer)
  }, [booting])
  useEffect(() => {
    const onHash = () => {
      const hash = location.hash.slice(1)
      if (hash && !pages.includes(hash as Page)) return
      setPage(pageFromHash())
      setLightbox(null)
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [page])
  useEffect(() => {
    document.body.classList.toggle('no-scroll', booting || lightbox !== null)
    return () => document.body.classList.remove('no-scroll')
  }, [booting, lightbox])
  useEffect(() => {
    document.body.classList.toggle('portfolio-page', page === 'nail' || page === 'tattoo')
    document.body.classList.toggle('backdrop-preview', backdrop)
    return () => {
      document.body.classList.remove('portfolio-page', 'backdrop-preview')
    }
  }, [page, backdrop])

  return (
    <>
      <a className="skip-link" href="#content">
        Skip to content
      </a>
      {!['gallery', 'tattoo', 'nail'].includes(page) && (
        <header className="site-header">
          <a className="seal" href="#home" aria-label="Nana Ink and Nails home">
            <img src="/assets/nana-ink-and-nails-logo.png" alt="" />
          </a>
          <button
            className="theme-toggle theme-switch"
            type="button"
            role="switch"
            aria-checked={theme === 'dark'}
            aria-label="Dark mode"
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            <span className="switch-sun" aria-hidden="true">
              ☀
            </span>
            <span className="switch-moon" aria-hidden="true">
              ☾
            </span>
            <span className="switch-thumb" aria-hidden="true" />
          </button>
        </header>
      )}
      <main id="content">
        <div id="top" />
        {page === 'home' && <Home ready={ready} backdrop={backdrop} />}
        {page === 'gallery' && <GalleryChoice />}
        {page === 'tattoo' && <TattooPortfolio onOpen={setLightbox} />}
        {page === 'nail' && <NailPortfolio />}
        {page === 'contact' && <ContactPage />}
        {page === 'inspirations' && (
          <section className="page wrap">
            <a className="back-link" href="#home">
              ← Home
            </a>
            <h1 className="route-title">Tattoo inspirations</h1>
            <Inspirations />
          </section>
        )}
      </main>
      {page !== 'gallery' && (
        <>
          <Footer />
          <a
            className="float-book"
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="Book on WhatsApp"
          >
            Book<span aria-hidden="true">→</span>
          </a>
        </>
      )}
      {!ready && (
        <div className={`loader ${booting ? '' : 'is-leaving'}`} aria-hidden={!booting}>
          <div className="loader-frame">
            <img
              className="loader-logo"
              src="/assets/nana-ink-and-nails-logo.png"
              alt="Nana Ink & Nails"
              fetchPriority="high"
            />
          </div>
        </div>
      )}
      {lightbox !== null && (
        <Lightbox index={lightbox} onChange={setLightbox} onClose={() => setLightbox(null)} />
      )}
    </>
  )
}
