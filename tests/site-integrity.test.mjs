import { test } from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, readFileSync, statSync } from 'node:fs'
import { portfolio, whatsappUrl } from '../src/data.ts'
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
  const message = new URL(whatsappUrl).searchParams.get('text')
  assert.match(message, /tattoo/)
  assert.match(message, /nail/)
})
