import { useEffect, useRef, useState, type CSSProperties } from 'react'

type Props = { src: string; poster: string; label: string; className?: string; priority?: boolean }

/** Fetch nearby films only; pause offscreen or when the browser tab is hidden. */
export function AutoplayVideo({ src, poster, label, className = '', priority = false }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const userPaused = useRef(false)
  const inView = useRef(false)
  const [aspect, setAspect] = useState(9 / 16)
  const [loaded, setLoaded] = useState(priority)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const loadObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoaded(true)
          loadObserver.disconnect()
        }
      },
      { rootMargin: '1000px' },
    )
    loadObserver.observe(video)
    return () => loadObserver.disconnect()
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video || !loaded) return
    const update = () => {
      if (inView.current && !document.hidden && !userPaused.current) {
        video.muted = true
        void video.play().catch(() => {})
      } else video.pause()
    }
    const visibility = new IntersectionObserver(
      ([entry]) => {
        inView.current = entry.isIntersecting && entry.intersectionRatio >= 0.01
        update()
      },
      { threshold: 0.01 },
    )
    visibility.observe(video)
    document.addEventListener('visibilitychange', update)
    video.addEventListener('canplay', update)
    return () => {
      visibility.disconnect()
      document.removeEventListener('visibilitychange', update)
      video.removeEventListener('canplay', update)
      video.pause()
    }
  }, [loaded])

  function togglePlayback() {
    const video = videoRef.current
    if (!video) return
    userPaused.current = !video.paused
    if (video.paused) {
      if (!loaded) video.src = src
      setLoaded(true)
      void video.play().catch(() => {})
    } else video.pause()
  }
  return (
    <figure
      className={`media-film ${className}`}
      style={{ '--film-aspect': aspect } as CSSProperties}
    >
      <video
        ref={videoRef}
        src={loaded ? src : undefined}
        poster={poster}
        muted
        loop
        autoPlay={priority}
        playsInline
        preload={loaded ? 'auto' : 'none'}
        role="button"
        tabIndex={0}
        aria-label={`${playing ? 'Pause' : 'Play'} ${label}`}
        onClick={togglePlayback}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            togglePlayback()
          }
        }}
        onLoadedMetadata={(event) => {
          const video = event.currentTarget
          if (video.videoHeight && !className.includes('studio-moment'))
            setAspect(video.videoWidth / video.videoHeight)
        }}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
      <span
        className={`film-affordance ${playing ? 'is-playing' : 'is-paused'}`}
        aria-hidden="true"
      >
        {playing ? 'Ⅱ' : '▶'}
      </span>
    </figure>
  )
}
