# Nana Ink & Nails

Responsive portfolio website for Nana Ink & Nails in Igando, Lagos, built with React, TypeScript, and Vite.

Includes tattoo and nail galleries, a silent studio reel, animated portrait and logo loader, light/dark themes, and booking/contact links.

## Local development

Use Node.js 22.18+ or Node.js 24+.

```sh
npm ci
npm run dev
```

## Validate and build

```sh
npm test
npm run format:check
npm run build
npm run preview
```

`npm test` builds the application, verifies gallery media, checks the production entry point, and validates booking links. Production files are generated in `dist/`.

## Editing

- `src/App.tsx`: routes, theme, loader, header, and image viewer.
- `src/components/`: home page, galleries, contact sections, and studio reel.
- `src/data.ts` and `src/galleryData.ts`: contact information and gallery content.
- `src/styles.css` and `src/refinements.css`: styling and responsive layouts.
- `public/assets/`: website photos, videos, and branding.

The site builds entirely from editable source. Historical recovery backups are local-only and are not required to run or build the project.
