# Build prompt: Nana Ink & Nails portfolio website

You are working inside the `nana-ink-and-nails-website-starter` folder. Build a complete, production-quality portfolio website for a Nigerian tattoo and nail artist called **Nana Ink & Nails**.

The visual direction may take inspiration from the bold, portfolio-first feeling of the John Dias Tattoos website, but the final design must be original and must not copy its wording, exact layout, branding, code or imagery.

## Technical requirements

- Use React, Vite and TypeScript.
- Use clean component-based code and responsive CSS. Tailwind CSS is allowed if it is configured properly; otherwise use CSS modules or a well-organized global stylesheet.
- The finished project must run with `npm install` followed by `npm run dev`.
- Do not require a paid service, database or backend.
- Use only the supplied local images. Do not add stock tattoo photographs.
- Add brief, useful comments around important components and logic. Do not comment every basic line.
- Test for mobile, tablet and desktop layouts and fix overflow, broken spacing and unreadable text.

## Existing assets

- Brand logo: `assets/nana-ink-and-nails-logo.png`
- Brand/artist portrait: `assets/nana-brand-portrait.jpeg`
- Tattoo portfolio: all 16 images inside `assets/portfolio/`

Never modify, redraw or AI-enhance the portrait or tattoo photographs. Preserve them as authentic images of the artist and her work.

## Brand direction

Create a premium, artistic and welcoming visual identity based on the logo:

- Main background: near-black `#0B0B0B`
- Secondary background: charcoal `#171717`
- Warm light background: ivory `#F6F0E6`
- Primary accent: muted metallic gold `#C79A3B`
- Secondary accent/text: warm taupe `#8A7654`
- Use gold sparingly for borders, small icons, hover states and calls to action.
- Pair an elegant editorial serif such as Cormorant Garamond with a clean sans-serif such as Inter or Manrope.
- The site should feel feminine, confident and artistic without becoming overly decorative.
- Use subtle transitions and scroll reveals. Respect `prefers-reduced-motion`.

## Site structure

### 1. Navigation

- Logo/brand name on the left.
- Links: Home, Work, About, Services, FAQs and Contact.
- A gold **Book on WhatsApp** button.
- Sticky navigation that becomes compact after scrolling.
- Mobile menu with correct keyboard and screen-reader behavior.

### 2. Hero

- Create an original split-layout hero inspired by premium artist portfolios.
- Headline: **Wear Your Story. Own Your Art.**
- Supporting copy: **Custom tattoos and creative nail artistry, designed with intention by Nana.**
- Primary button: **Book on WhatsApp**.
- Secondary link: **Explore Her Work**.
- Feature `assets/portfolio/01-floral-butterfly-forearm.jpg` as the main hero image.
- Include a small location label: **Igando, Lagos · Home service available**.

### 3. Selected work

- Build a premium responsive gallery using all 16 supplied portfolio images.
- Put the strongest pieces first: floral butterfly, floral neck, theatre masks, Prime Junior lettering, anatomical heart and astronaut.
- Use filter tabs: All, Botanical, Lettering, Minimal and Symbolic.
- Add sensible category data based on each filename.
- Each card should have meaningful alt text, a subtle gold hover treatment and a click-to-open accessible lightbox.
- Do not place permanent text over the central tattoo area.
- Lazy-load images below the fold and prevent layout shift.

### 4. About Nana

Use this bio, adjusting only the location placeholder when the real location is provided:

> Nana is a Nigeria-based tattoo and nail artist who turns personal ideas into clean, expressive art. From minimal linework and lettering to botanical and symbolic pieces, she approaches every appointment with patience, creativity and close attention to detail. Her goal is to give every client a comfortable experience and artwork that feels personal to them.

Display the bio beside `assets/nana-brand-portrait.jpeg`. Treat this as the official face of the brand. Use an elegant portrait crop with `object-position` adjusted so her face remains clearly visible on mobile and desktop. Do not use the portrait as a tattoo example, alter her appearance or apply heavy filters. Do not invent awards, qualifications, years of experience or celebrity clients.

### 5. Services

Create elegant service cards for:

- Custom tattoos
- Fine-line and minimalist tattoos
- Lettering and symbolic tattoos
- Tattoo consultations
- Nail artistry

Tattoo work should remain the main focus. For nail artistry, do not invent nail photographs; use a tasteful text-only card and mention that clients can request the latest nail catalogue through WhatsApp.

### 6. Pricing note

Do not display fixed prices. Use this text:

> Every design is different. Pricing depends on the size, detail and placement of your tattoo. Send your idea through WhatsApp to receive a personal quote.

Add a WhatsApp call-to-action beside it.

### 7. Booking process

Show three simple steps:

1. Share your idea, placement and preferred size on WhatsApp.
2. Discuss the design, price and available date with Nana.
3. Confirm your appointment and receive preparation instructions.

Do not build a booking form. Every booking button must open WhatsApp directly.

Use this exact WhatsApp booking URL on every booking button:

`https://wa.me/2348024478190?text=Hi%20Nana%2C%20I%27d%20like%20to%20book%20a%20tattoo%20consultation.`

Add a floating WhatsApp button on mobile and desktop. Give it an accessible label.

Mention that home service is available, but clients must contact Nana first to confirm the location, availability and any travel cost. Do not claim that home service covers every part of Lagos.

### 8. FAQs

Include concise answers for:

- How do I get a price?
- How do I book an appointment?
- Can I bring my own design idea?
- How should I prepare for my appointment?
- Do you also offer nail services?

Avoid making unverified medical or hygiene claims. Keep aftercare wording general and advise clients to follow the artist's instructions.

### 9. Contact/footer

- Brand logo and short description.
- WhatsApp: `+234 802 447 8190` linked to the booking URL above.
- Call: `0903 750 4740` linked to `tel:+2349037504740`.
- Studio address: `No. 17 Aje Ejibiran Street, off Olowoila Bus Stop, Igando, Lagos`.
- TikTok: `https://www.tiktok.com/@nanainknails?_r=1&_t=ZS-9AR7ATyp0hK`
- Add a short **Home service available** note near the address and booking call-to-action.
- Do not display opening hours.
- Do not add an Instagram link unless one is supplied later.
- Copyright year generated dynamically.

## SEO and quality

- Set the page title to `Nana Ink & Nails | Tattoo Artist in Igando, Lagos`.
- Add a useful meta description focused on custom tattoos, nail artistry and available home service in Igando, Lagos.
- Add Open Graph metadata and use the logo as the social preview fallback.
- Add valid `LocalBusiness` JSON-LD with placeholders for the missing contact details. Do not invent an address, rating or review count.
- Add a favicon based on the supplied logo.
- Use semantic HTML, visible focus states, good colour contrast and descriptive link labels.
- Aim for strong Lighthouse performance and accessibility scores.
- Do not add testimonials or fake reviews.
- Do not show fixed pricing.

## Final checks

Before finishing:

1. Use the verified information in `BUSINESS_DETAILS_TO_REPLACE.md` exactly as supplied.
2. Search the codebase for placeholder values and `TODO` so no unfinished content is missed.
3. Run the build and correct every error.
4. Confirm that every WhatsApp button uses the same number and opens in a new tab safely.
5. Confirm all 16 portfolio images load and the lightbox works on mobile.
6. Summarize the files created, commands to run and any business details still needed.
