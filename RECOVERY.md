# React source restoration — completed

The site now builds entirely from editable React and TypeScript source. No recovered JavaScript bundle, injected enhancement script, or DOM mutation observer is used by the application.

- `src/main.tsx`: normal React root and stylesheet imports.
- `src/App.tsx`: routing, theme, logo loader, header and accessible image viewer.
- `src/components/Home.tsx`: portrait animation, introduction and location cards.
- `src/components/Galleries.tsx`: chooser, portfolios and inspiration gallery.
- `src/components/StudioReel.tsx`: silent reel with playback and visibility lifecycle.
- `src/components/Contact.tsx`: contact page and booking footer.
- `src/data.ts`, `src/galleryData.ts`: contact links and gallery content.
- `src/styles.css`, `src/refinements.css`: editable styling; cascade retained to preserve the approved design.
- `public/assets`: original gallery media, logo, portrait and studio reel.

Run `npm run dev` for editing. Run `npm run build` for type checking and production output, then `npm run preview -- --host 127.0.0.1 --port 5173` to preview it.

Historical material in `recovery-before-media-update` is a backup only, excluded from the app and deployment. The old runtime and DOM patches are archived in its `retired-runtime` subfolder. Do not use those as the source for future edits.

## Validation and editing

Use Node 22.18+ or Node 24+ (tests import typed data modules using native type stripping).

- `npm test`: type-checks, builds, verifies the complete media inventory, checks that obsolete scripts are excluded, and verifies booking copy covers both services.
- `npm run format`: formats editable source with Prettier.
- `npm run format:check`: checks formatting without changing files.

Browser verification after restoration: tattoo and nail navigation, gallery dismissal with Escape, image viewer next/close, light/dark switching, muted 18-second reel playback, and responsive layout. No runtime errors observed.
