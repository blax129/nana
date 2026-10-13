import { test } from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, readFileSync, statSync } from 'node:fs'
import { phoneUrl, portfolio, whatsappUrl } from '../src/data.ts'
import { nailDescriptions, inspirationDescriptions } from '../src/galleryData.ts'

test('all curated gallery and studio assets survive a production build', () => {
  assert.equal(portfolio.length, 16)
  assert.equal(nailDescriptions.length, 19)
  assert.equal(inspirationDescriptions.length, 61)
  const numbered = (folder, prefix, count, extension) =>
    Array.from(
      { length: count },
      (_, i) => `/assets/${folder}/${prefix}-${String(i + 1).padStart(2, '0')}.${extension}`,
    )
  const media = [
    ...portfolio.map((item) => item.src),
    ...numbered('nails', 'photo', 19, 'jpeg'),
    ...numbered('nails', 'video', 10, 'mp4'),
    ...numbered('inspirations', 'reference', 61, 'jpeg'),
    '/assets/nana-brand-portrait.jpeg',
    '/assets/nana-ink-and-nails-logo.png',
    '/assets/studio/nana-at-work.mp4',
    '/assets/studio/nana-at-work.jpg',
    '/assets/studio/finished-tattoos.mp4',
  ]
  assert.equal(new Set(media).size, media.length)
  for (const path of media) {
    assert.ok(statSync(`public${path}`).size > 0, `Empty source media: ${path}`)
    assert.equal(
      statSync(`dist${path}`).size,
      statSync(`public${path}`).size,
      `Missing/truncated build asset: ${path}`,
    )
  }
})
test('production uses the React build without recovered runtime scripts', () => {
  const html = readFileSync('dist/index.html', 'utf8')
  assert.match(html, /src="\/assets\/index-.*\.js"/)
  for (const retired of ['site-runtime.js', 'gallery-refinement.js']) {
    assert.ok(!html.includes(retired))
    assert.ok(!existsSync(`dist/${retired}`))
  }
})
test('booking covers both services', () => {
  assert.equal(new URL(whatsappUrl).pathname, '/2349021639937')
  assert.equal(phoneUrl, 'tel:+2349021639937')
  const message = new URL(whatsappUrl).searchParams.get('text')
  assert.match(message, /tattoo/)
  assert.match(message, /nail/)
})

test('responsive images and video posters are present in the build', () => {
  const dimensions = JSON.parse(readFileSync('src/imageDimensions.json', 'utf8'))
  let originals = 0,
    mobile = 0
  for (const [src, size] of Object.entries(dimensions)) {
    assert.ok(size.width > 0 && size.height > 0)
    const base = src.replace('/assets/', '/assets/optimized/').replace(/\.[^.]+$/, '')
    originals += statSync(`public${src}`).size
    mobile += statSync(`dist${base}-640.webp`).size
    assert.ok(statSync(`dist${base}-1080.webp`).size > 0)
  }
  assert.ok(mobile < originals / 2, 'Responsive mobile images should save at least 50%')
  for (let index = 1; index <= 10; index++)
    assert.ok(
      statSync(`dist/assets/nails/video-${String(index).padStart(2, '0')}-poster.webp`).size > 0,
    )
  assert.ok(statSync('dist/assets/studio/finished-tattoos-poster.webp').size > 0)
})
