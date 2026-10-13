import type { ImgHTMLAttributes } from 'react'
import dimensions from '../imageDimensions.json'

type Props = ImgHTMLAttributes<HTMLImageElement> & { src: string; alt: string }
export function ResponsiveImage({
  src,
  alt,
  sizes = '(max-width: 680px) calc(100vw - 32px), 620px',
  ...props
}: Props) {
  const size = (dimensions as Record<string, { width: number; height: number }>)[src]
  const base = src.replace('/assets/', '/assets/optimized/').replace(/\.[^.]+$/, '')
  return (
    <img
      src={size ? `${base}-1080.webp` : src}
      srcSet={size ? `${base}-640.webp 640w, ${base}-1080.webp 1080w` : undefined}
      sizes={sizes}
      alt={alt}
      width={size?.width}
      height={size?.height}
      decoding="async"
      {...props}
    />
  )
}
