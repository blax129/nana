import { useEffect, useRef, useState } from 'react'

export function StudioReel() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const userPaused = useRef(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !userPaused.current) void video.play().catch(() => {})
        else video.pause()
      },
      { threshold: 0.25 },
    )
    observer.observe(video)
    return () => {
      observer.disconnect()
      video.pause()
    }
  }, [])

  function togglePlayback() {
    const video = videoRef.current
    if (!video) return
    userPaused.current = !video.paused
    if (video.paused) void video.play().catch(() => {})
    else video.pause()
  }

  return (
    <figure className="studio-moment">
      <video
        ref={videoRef}
        src="/assets/studio/nana-at-work.mp4"
        poster="/assets/studio/nana-at-work.jpg"
        muted
        loop
        playsInline
        preload="metadata"
        aria-label="Nana at work in the studio, silent highlights"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
      <button type="button" className="reel-toggle" onClick={togglePlayback}>
        {playing ? 'Pause' : 'Play'} studio reel
      </button>
    </figure>
  )
}
