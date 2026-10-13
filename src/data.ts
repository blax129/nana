export type PortfolioItem = {
  src: string
  title: string
  category: 'Botanical' | 'Lettering' | 'Minimal' | 'Symbolic'
  alt: string
}

export const whatsappUrl =
  'https://wa.me/2349021639937?text=' +
  encodeURIComponent(
    "Hi Nana! I'd love to book an appointment. Could you share your availability and help me plan my tattoo or artificial nail set?",
  )
export const phoneUrl = 'tel:+2349021639937'
export const mapUrl =
  'https://www.google.com/maps/search/?api=1&query=No.%2017%20Aje%20Ejibiran%20Street%2C%20off%20Olowoila%20Bus%20Stop%2C%20Igando%2C%20Lagos'
export const tiktokUrl = 'https://www.tiktok.com/@nanainknails?_r=1&_t=ZS-9AR7ATyp0hK'

export const portfolio: PortfolioItem[] = [
  {
    src: '/assets/portfolio/01-floral-butterfly-forearm.jpg',
    title: 'Botanical Butterfly',
    category: 'Botanical',
    alt: 'Black ink butterfly and floral tattoo flowing along a forearm',
  },
  {
    src: '/assets/portfolio/02-floral-neck.jpg',
    title: 'Floral Neck Detail',
    category: 'Botanical',
    alt: 'Fine black floral tattoo placed behind the ear and along the neck',
  },
  {
    src: '/assets/portfolio/03-theatre-masks-forearm.jpg',
    title: 'Dual Expressions',
    category: 'Symbolic',
    alt: 'Comedy and tragedy masks tattooed in black linework on a forearm',
  },
  {
    src: '/assets/portfolio/04-prime-junior-lettering.jpg',
    title: 'Prime Junior',
    category: 'Lettering',
    alt: 'Prime Junior name tattoo in bold script lettering on a forearm',
  },
  {
    src: '/assets/portfolio/05-anatomical-heart-dream.jpg',
    title: 'Dream Heart',
    category: 'Symbolic',
    alt: 'Anatomical heart and Dream lettering tattoo on a forearm',
  },
  {
    src: '/assets/portfolio/06-astronaut-chest.jpg',
    title: 'Peace Astronaut',
    category: 'Symbolic',
    alt: 'Small smiling astronaut tattoo with peace signs on the upper chest',
  },
  {
    src: '/assets/portfolio/07-minimal-tree-chest.jpg',
    title: 'Rooted',
    category: 'Minimal',
    alt: 'Small minimalist tree tattoo placed near the collarbone',
  },
  {
    src: '/assets/portfolio/08-arabic-calligraphy-shoulder.jpg',
    title: 'Faith in Script',
    category: 'Lettering',
    alt: 'Bold Arabic calligraphy tattoo on the shoulder blade',
  },
  {
    src: '/assets/portfolio/09-spider-tattoo.jpg',
    title: 'Midnight Spider',
    category: 'Symbolic',
    alt: 'Small black spider tattoo on skin',
  },
  {
    src: '/assets/portfolio/10-melting-smiley-arm.jpg',
    title: 'Melted Mood',
    category: 'Symbolic',
    alt: 'Melting smiley face tattoo in black ink on the arm',
  },
  {
    src: '/assets/portfolio/11-lightbulb-forearm.jpg',
    title: 'Inner Light',
    category: 'Minimal',
    alt: 'Small sketch-style lightbulb tattoo on the forearm',
  },
  {
    src: '/assets/portfolio/12-small-hearts-hand.jpg',
    title: 'Little Hearts',
    category: 'Minimal',
    alt: 'Five small heart tattoos arranged along the back of a hand',
  },
  {
    src: '/assets/portfolio/13-saturn-arm.jpg',
    title: 'Saturn',
    category: 'Minimal',
    alt: 'Small outlined Saturn tattoo on the arm',
  },
  {
    src: '/assets/portfolio/14-neck-script.jpg',
    title: 'Neck Script',
    category: 'Lettering',
    alt: 'Vertical black script tattoo placed behind the ear',
  },
  {
    src: '/assets/portfolio/15-bold-lettering-forearm.jpg',
    title: 'Statement Lettering',
    category: 'Lettering',
    alt: 'Bold blue and black name lettering tattoo across a forearm',
  },
  {
    src: '/assets/portfolio/16-minimal-linework-forearm.jpg',
    title: 'Quiet Linework',
    category: 'Minimal',
    alt: 'Small delicate black linework tattoo on a forearm',
  },
]

export const services = [
  ['01', 'Custom tattoos', 'A personal design shaped around your idea, placement and size.'],
  ['02', 'Fine-line & minimal', 'Clean, understated pieces for clients who like subtle details.'],
  ['03', 'Lettering & symbols', 'Names, words and symbols composed for the placement you choose.'],
  ['04', 'Consultations', 'Talk through the reference, scale and quote directly with Nana.'],
  ['05', 'Nail artistry', 'Ask on WhatsApp for the latest nail catalogue and available designs.'],
] as const

export const steps = [
  ['01', 'Share your idea', 'Send your reference, placement and preferred size on WhatsApp.'],
  [
    '02',
    'Shape the details',
    'Discuss the design, personal quote and an available date with Nana.',
  ],
  [
    '03',
    'Confirm your visit',
    'Confirm the appointment and receive preparation guidance directly.',
  ],
] as const

export const faqs = [
  {
    question: 'How do I get a price?',
    answer:
      'Send your idea, preferred size and body placement on WhatsApp. Nana will review the details and give you a personal quote.',
  },
  {
    question: 'How do I book an appointment?',
    answer:
      'Start a WhatsApp conversation, agree on the design, price and date, then follow the confirmation instructions Nana sends you.',
  },
  {
    question: 'Can I bring my own design idea?',
    answer:
      'Yes. You can send references or describe what you have in mind. Nana will help shape it into a design that suits the chosen placement.',
  },
  {
    question: 'How should I prepare?',
    answer:
      'Rest well, eat before your appointment and follow the preparation guidance Nana sends after your booking is confirmed.',
  },
  {
    question: 'Do you offer home service?',
    answer:
      'Yes, subject to your location, availability and any travel cost. Send your location on WhatsApp so Nana can confirm.',
  },
  {
    question: 'Do you also offer nail services?',
    answer:
      'Yes. Ask for the latest nail catalogue on WhatsApp to see current styles and availability.',
  },
]
