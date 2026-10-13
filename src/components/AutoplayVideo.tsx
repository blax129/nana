import { useEffect, useRef, useState } from 'react'

type Props = { src: string; poster: string; label: string; className?: string }

/** Fetch nearby films only; pause offscreen or when the browser tab is hidden. */
export function AutoplayVideo({ src, poster, label, className = '' }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const userPaused = useRef(false)
  const inView = useRef(false)
  const [loaded, setLoaded] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [blocked, setBlocked] = useState(false)

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
      { rootMargin: '300px' },
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
        void video
          .play()
          .then(() => setBlocked(false))
          .catch(() => setBlocked(true))
      } else video.pause()
    }
    const visibility = new IntersectionObserver(
      ([entry]) => {
        inView.current = entry.isIntersecting
        update()
      },
      { threshold: 0.2 },
    )
    visibility.observe(video)
    document.addEventListener('visibilitychange', update)
    return () => {
      visibility.disconnect()
      document.removeEventListener('visibilitychange', update)
      video.pause()
    }
  }, [loaded])

  function togglePlayback() {
    const video = videoRef.current
    if (!video) return
    userPaused.current = !video.paused
    if (video.paused) {
      setLoaded(true)
      void video
        .play()
        .then(() => setBlocked(false))
        .catch(() => setBlocked(true))
    } else video.pause()
  }
  return (
    <figure className={`media-film ${className}`}>
      <video
        ref={videoRef}
        src={loaded ? src : undefined}
        poster={poster}
        muted
        loop
        playsInline
        preload="none"
        aria-label={label}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
      <span className="film-label" aria-hidden="true">
        <span className={playing ? 'film-pulse' : ''} />
        {playing ? 'In motion' : 'Video'}
      </span>
      <button
        className="film-toggle"
        type="button"
        onClick={togglePlayback}
        aria-label={`${playing ? 'Pause' : 'Play'} ${label}`}
      >
        <span aria-hidden="true">{playing ? 'Ⅱ' : '▶'}</span>
        {playing ? 'Pause' : blocked ? 'Play video' : 'Play'}
      </button>
    </figure>
  )
}
