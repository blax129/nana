import { AutoplayVideo } from './AutoplayVideo'
export function StudioReel() {
  return (
    <AutoplayVideo
      className="studio-moment"
      src="/assets/studio/nana-at-work-web.mp4"
      poster="/assets/studio/nana-at-work.jpg"
      label="studio reel"
    />
  )
}
