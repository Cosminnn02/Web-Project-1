// ============================================================
//  MAISON VOYAGE — content model
//  A private travel atelier. Quiet, confident, never loud.
//  Mock data: swap in real destinations, pricing and imagery.
// ============================================================

export const BRAND = {
  name: "Maison Voyage",
  tagline: "A private travel atelier",
  email: "atelier@maisonvoyage.com",
  phone: "+41 22 000 0000",
  address: "Rue du Rhône 45, 1204 Geneva",
};

export const NAV_LINKS = [
  { label: "About", href: "/about" },
  { label: "Destinations", href: "/destinations" },
  { label: "The Process", href: "/process" },
  { label: "Contact", href: "/contact" },
];

// ------------------------------------------------------------
//  Destinations
//  `description` is the short card line; `story` carries the
//  detail page. `gallery` is [hero image, two supporting frames].
//  `coords` place the destination on the world map (equirectangular).
// ------------------------------------------------------------


export interface Destination {
  slug: string;
  name: string;
  region: string;
  continent: string;
  description: string;
  price: string;
  image: string;
  /* — detail page — */
  story: string;
  season: string;
  duration: string;
  highlights: string[];
  note: string;
  gallery: string[];
  coords: { lat: number; lon: number };
}

export const DESTINATIONS: Destination[] = [
  {
    slug: "santorini",
    name: "Santorini",
    region: "Cyclades, Greece",
    continent: "Europe",
    description: "Private villas above the caldera, held for a single guest at a time.",
    price: "From $18k",
    image: "/images/destinations/santorini-hero.jpg",
    story:
      "The caldera empties after the ferries leave — what remains is light, white stone, and the slow Aegean. We hold a villa above the rim, where the days are measured in swims, long lunches, and the color of the water at dusk.",
    season: "May – October",
    duration: "5 – 10 days",
    highlights: [
      "A private caldera villa, held for your dates alone",
      "A chef who cooks only for you",
      "A boat and captain, at your call, daily",
      "The island's cellars, opened privately",
      "The caldera at dusk — from your terrace",
    ],
    note: "Most guests ask for one quiet morning on the water. We make it happen — and leave the rest of the day deliberately unplanned.",
    gallery: [
      "/images/destinations/santorini-hero.jpg",
      "/images/destinations/santorini-1.jpg",
      "/images/destinations/santorini-2.jpg",
    ],
    coords: { lat: 36.4, lon: 25.4 },
  },
  {
    slug: "amalfi-coast",
    name: "Amalfi Coast",
    region: "Campania, Italy",
    continent: "Europe",
    description: "Cliffside villas and a private boat, timed to the light on the water.",
    price: "From $24k",
    image: "/images/destinations/amalfi-coast-hero.jpg",
    story:
      "A coast of cliffs and small towns, best known before the crowds arrive. We keep a palazzo above the sea, a boat that leaves when you wake, and a rhythm that has no schedule at all.",
    season: "April – June · September",
    duration: "7 – 12 days",
    highlights: [
      "A cliffside palazzo, private from roof to cellar",
      "A personal boat and captain, daily",
      "A table for two in a working vineyard",
      "A chef who cooks only for you",
      "The coast, after the day-trippers have gone",
    ],
    note: "We time your mornings to the light on the water. If a day asks for nothing, we let it be nothing.",
    gallery: [
      "/images/destinations/amalfi-coast-hero.jpg",
      "/images/destinations/amalfi-coast-1.jpg",
      "/images/destinations/amalfi-coast-2.jpg",
    ],
    coords: { lat: 40.6, lon: 14.6 },
  },
  {
    slug: "swiss-alps",
    name: "Swiss Alps",
    region: "Valais, Switzerland",
    continent: "Europe",
    description: "A private chalet, a personal guide, and the peaks when they belong to no one.",
    price: "From $28k",
    image: "/images/destinations/swiss-alps-hero.jpg",
    story:
      "Above the cloud line, the valley falls silent. A private chalet, a guide who knows every ridge, and a season when the peaks belong to no one — except, briefly, to you.",
    season: "December – March · June – September",
    duration: "5 – 10 days",
    highlights: [
      "A private chalet, chef and butler included",
      "A personal mountain guide, every day",
      "Heli access to untracked snow, in season",
      "An alpine lodge table, set for one evening",
      "The valley, after the lifts have closed",
    ],
    note: "Snow, or green, or both — we build the week around the season's best light, not the calendar.",
    gallery: [
      "/images/destinations/swiss-alps-hero.jpg",
      "/images/destinations/swiss-alps-1.jpg",
      "/images/destinations/swiss-alps-2.jpg",
    ],
    coords: { lat: 46.0, lon: 7.6 },
  },
  {
    slug: "lofoten-islands",
    name: "Lofoten Islands",
    region: "Norway",
    continent: "Europe",
    description: "Midnight-sun swims and a whitewashed rorbu above the fjord, to yourself.",
    price: "From $16k",
    image: "/images/destinations/lofoten-islands-hero.jpg",
    story:
      "A string of islands where the sun barely sets, the sea turns the color of slate, and the only sound is the tide. We keep a whitewashed rorbu above the fjord, and the days pass without urgency.",
    season: "Mid-June – mid-July",
    duration: "5 – 8 days",
    highlights: [
      "A whitewashed rorbu, above the fjord, to yourself",
      "A local guide — a fisher, not a performer",
      "Sea fishing, when the light allows",
      "Midnight-sun swims and long, unhurried dinners",
      "The islands, without a single other guest",
    ],
    note: "In Lofoten, the light does the work. Our only task is to keep everything else out of the way.",
    gallery: [
      "/images/destinations/lofoten-islands-hero.jpg",
      "/images/destinations/lofoten-islands-1.jpg",
      "/images/destinations/lofoten-islands-2.jpg",
    ],
    coords: { lat: 68.1, lon: 13.6 },
  },
  {
    slug: "kyoto",
    name: "Kyoto",
    region: "Kansai, Japan",
    continent: "Asia",
    description: "Private rooms above the rooftops, temple gardens emptied for one guest.",
    price: "From $22k",
    image: "/images/destinations/kyoto-hero.jpg",
    story:
      "The city wakes before the visitors do. We keep rooms above the rooftops, a guide who speaks the language of the temple garden, and mornings that begin with nothing but tea.",
    season: "Late March · November",
    duration: "6 – 12 days",
    highlights: [
      "Private rooms above the city, held for your stay",
      "A tea master, privately, at first light",
      "Temple gardens, emptied for you, in season",
      "A private dining table in the old quarter",
      "The approach to a shrine, before it opens",
    ],
    note: "We ask you for one thing: to walk slowly. The city has waited centuries; it can wait for you.",
    gallery: [
      "/images/destinations/kyoto-hero.jpg",
      "/images/destinations/kyoto-1.jpg",
      "/images/destinations/kyoto-2.jpg",
    ],
    coords: { lat: 35.0, lon: 135.8 },
  },
  {
    slug: "bali",
    name: "Bali",
    region: "Ubud & Uluwatu, Indonesia",
    continent: "Asia",
    description: "A jungle estate, a private pool, and a rhythm set by the light.",
    price: "From $14k",
    image: "/images/destinations/bali-hero.jpg",
    story:
      "A jungle estate, a private pool, and a rhythm set by the light. The island is generous and crowded at once — we keep you on the side of the first, far from the second.",
    season: "April – October",
    duration: "7 – 14 days",
    highlights: [
      "A private jungle estate, staffed for you alone",
      "A pool that belongs to no one",
      "Mornings with a teacher, not a tour",
      "The rice terraces, before the sun is up",
      "Evenings that end when you decide",
    ],
    note: "Bali rewards slowness. We schedule almost nothing, on purpose.",
    gallery: [
      "/images/destinations/bali-hero.jpg",
      "/images/destinations/bali-1.jpg",
      "/images/destinations/bali-2.jpg",
    ],
    coords: { lat: -8.4, lon: 115.2 },
  },
  {
    slug: "maldives",
    name: "The Maldives",
    region: "Atolls, Indian Ocean",
    continent: "Asia",
    description: "One island, one villa, one horizon — and a house reef minutes from the deck.",
    price: "From $32k",
    image: "/images/destinations/maldives-hero.jpg",
    story:
      "One island, one villa, one horizon. The atoll is quiet in a way you will need a day or two to notice — the water, the silence, the distance from everything.",
    season: "November – April",
    duration: "5 – 10 days",
    highlights: [
      "A single overwater villa, and a house reef",
      "A private boat, and a captain who knows the atoll",
      "Dining on the sand, or the deck, or the water",
      "A seaplane you will not think about",
      "The horizon, with nothing on it",
    ],
    note: "Some guests arrive with a list of things to do. By day three, the list is gone — and they are glad.",
    gallery: [
      "/images/destinations/maldives-hero.jpg",
      "/images/destinations/maldives-1.jpg",
      "/images/destinations/maldives-2.jpg",
    ],
    coords: { lat: 3.2, lon: 73.2 },
  },
  {
    slug: "marrakech",
    name: "Marrakech",
    region: "Morocco",
    continent: "Africa",
    description: "A restored riad, a private hammam, and the medina after the crowds have gone home.",
    price: "From $12k",
    image: "/images/destinations/marrakech-hero.jpg",
    story:
      "A restored riad, a private hammam, and the medina after the crowds have gone home. We open doors that do not appear on any map, and let the city keep its other secrets.",
    season: "October – May",
    duration: "4 – 8 days",
    highlights: [
      "A restored riad, held for your stay",
      "A private hammam, at any hour",
      "The medina after dusk, with a local host",
      "A chef from the souks, cooking in your riad",
      "The Atlas foothills, privately, for one day",
    ],
    note: "Marrakech is a city of doors. We know which ones open onto quiet.",
    gallery: [
      "/images/destinations/marrakech-hero.jpg",
      "/images/destinations/marrakech-1.jpg",
      "/images/destinations/marrakech-2.jpg",
    ],
    coords: { lat: 31.6, lon: -8.0 },
  },
  {
    slug: "serengeti",
    name: "The Serengeti",
    region: "Tanzania",
    continent: "Africa",
    description: "A private camp, a guide who reads the grass, and the migration at a respectful distance.",
    price: "From $30k",
    image: "/images/destinations/serengeti-hero.jpg",
    story:
      "The plains move in a rhythm older than maps. A private camp, a guide who reads the grass, and the migration — arranged so that you are never near it, unless you choose to be.",
    season: "June – October",
    duration: "6 – 12 days",
    highlights: [
      "A private tented camp, set in the open plain",
      "A guide who knows the plains by memory",
      "Fly-in access — no shared roads",
      "Dining under the stars, set for you alone",
      "The migration, followed at a distance that respects it",
    ],
    note: "We position the camp weeks ahead of the movement. When you arrive, it is already where it needs to be.",
    gallery: [
      "/images/destinations/serengeti-hero.jpg",
      "/images/destinations/serengeti-1.jpg",
      "/images/destinations/serengeti-2.jpg",
    ],
    coords: { lat: -2.3, lon: 34.8 },
  },
  {
    slug: "cape-town",
    name: "Cape Town",
    region: "Western Cape, South Africa",
    continent: "Africa",
    description: "A cliff estate between two oceans, and a cellar that opens for two.",
    price: "From $16k",
    image: "/images/destinations/cape-town-hero.jpg",
    story:
      "A city between two oceans, a cliff estate, and a cellar that opens for two. The light here is unlike anywhere else we keep — warm in winter, endless in summer.",
    season: "October – March",
    duration: "5 – 10 days",
    highlights: [
      "A cliff estate between the Atlantic and the sea",
      "A private cellar, opened for you",
      "A chef who cooks from the day market",
      "The peninsula, privately, by car or boat",
      "Table Mountain, before the city wakes",
    ],
    note: "Cape Town asks for one full day on the water. We have never once regretted giving it.",
    gallery: [
      "/images/destinations/cape-town-hero.jpg",
      "/images/destinations/cape-town-1.jpg",
      "/images/destinations/cape-town-2.jpg",
    ],
    coords: { lat: -33.9, lon: 18.4 },
  },
  {
    slug: "banff",
    name: "Banff",
    region: "Alberta, Canada",
    continent: "North America",
    description: "A lakeside lodge in the Rockies, a private guide, and the mountains in first light.",
    price: "From $18k",
    image: "/images/destinations/banff-hero.jpg",
    story:
      "A lakeside lodge in the Rockies, a private guide, and the mountains in first light. The park is vast and, in the right week, almost entirely yours.",
    season: "June – September · January",
    duration: "5 – 10 days",
    highlights: [
      "A lakeside lodge, held for your dates",
      "A private guide for the mountains",
      "A table by the water, at first light",
      "Hot springs, after the day's travel",
      "The Rockies, in a season of your choosing",
    ],
    note: "The mountain decides the schedule. We simply make sure everything is ready when it decides.",
    gallery: [
      "/images/destinations/banff-hero.jpg",
      "/images/destinations/banff-1.jpg",
      "/images/destinations/banff-2.jpg",
    ],
    coords: { lat: 51.2, lon: -115.6 },
  },
  {
    slug: "big-sur",
    name: "Big Sur",
    region: "California, USA",
    continent: "North America",
    description: "A cliffside house above the Pacific, a chef, and a coast with no neighbors.",
    price: "From $20k",
    image: "/images/destinations/big-sur-hero.jpg",
    story:
      "A cliffside house above the Pacific, a chef, and a coast with no neighbors. The road is famous; the house you wake to is not on it at all.",
    season: "May – October",
    duration: "4 – 8 days",
    highlights: [
      "A cliffside house above the sea, to yourself",
      "A chef, from the coast's small kitchens",
      "A private drive along the coast, at your pace",
      "Evenings on the deck, with no view you can name",
      "The fog, when it comes — and when it leaves",
    ],
    note: "Big Sur is best with almost nothing planned. We plan everything, so that nothing feels planned.",
    gallery: [
      "/images/destinations/big-sur-hero.jpg",
      "/images/destinations/big-sur-1.jpg",
      "/images/destinations/big-sur-2.jpg",
    ],
    coords: { lat: 36.3, lon: -121.8 },
  },
  {
    slug: "tulum",
    name: "Tulum",
    region: "Quintana Roo, Mexico",
    continent: "North America",
    description: "A cenote, a private beach, and the jungle at the edge of the sea.",
    price: "From $15k",
    image: "/images/destinations/tulum-hero.jpg",
    story:
      "A cenote, a private beach, and the jungle at the edge of the sea. The town is loud a mile away; where we keep you, the only sound is the water.",
    season: "November – May",
    duration: "5 – 10 days",
    highlights: [
      "A private beach, and a door to the jungle",
      "Cenote swims, before the day begins",
      "A chef who cooks from the market at dawn",
      "The ruins, privately, in the early light",
      "The sea, from a shore you will not share",
    ],
    note: "We time the cenote to the light in the water. It is not a small thing, and it is never rushed.",
    gallery: [
      "/images/destinations/tulum-hero.jpg",
      "/images/destinations/tulum-1.jpg",
      "/images/destinations/tulum-2.jpg",
    ],
    coords: { lat: 20.2, lon: -87.5 },
  },
  {
    slug: "cusco",
    name: "Cusco & Machu Picchu",
    region: "Andes, Peru",
    continent: "South America",
    description: "A private hacienda above the Andes, and the approach to Machu Picchu — unhurried.",
    price: "From $19k",
    image: "/images/destinations/cusco-hero.jpg",
    story:
      "A private hacienda above the Andes, a guide who grew up on this road, and the approach to Machu Picchu — unhurried, private, and entirely your own.",
    season: "May – September",
    duration: "7 – 14 days",
    highlights: [
      "A private hacienda above the valley",
      "A guide who knows the road by memory",
      "Machu Picchu, in the early morning, alone",
      "A table in a working kitchen, in the Andes",
      "The altitude, handled so you never notice it",
    ],
    note: "The mountain rewards the slow arrival. We build the days so that you climb into it, day by day.",
    gallery: [
      "/images/destinations/cusco-hero.jpg",
      "/images/destinations/cusco-1.jpg",
      "/images/destinations/cusco-2.jpg",
    ],
    coords: { lat: -13.5, lon: -72.0 },
  },
  {
    slug: "patagonia",
    name: "Patagonia",
    region: "Torres del Paine, Chile",
    continent: "South America",
    description: "A remote estancia, a private guide, and the wind at the end of the world.",
    price: "From $26k",
    image: "/images/destinations/patagonia-hero.jpg",
    story:
      "A remote estancia, a private guide, and the wind at the end of the world. The peaks rise out of the pampas like a rumor that becomes real.",
    season: "November – March",
    duration: "8 – 14 days",
    highlights: [
      "A remote estancia, held for your stay",
      "A private guide for the towers and the ice",
      "A table in the fields, under open sky",
      "The wind — which we plan around, not against",
      "The end of the world, without the crowds that come to see it",
    ],
    note: "Patagonia is weather first. We hold a day in reserve, always, and you will wonder why.",
    gallery: [
      "/images/destinations/patagonia-hero.jpg",
      "/images/destinations/patagonia-1.jpg",
      "/images/destinations/patagonia-2.jpg",
    ],
    coords: { lat: -49.3, lon: -72.3 },
  },
  {
    slug: "queenstown",
    name: "Queenstown",
    region: "Otago, New Zealand",
    continent: "Oceania",
    description: "A lakeside villa, a private heli, and the Southern Alps as your backdrop.",
    price: "From $21k",
    image: "/images/destinations/queenstown-hero.jpg",
    story:
      "A lakeside villa, a private heli, and the Southern Alps as your backdrop. The town advertises adventure; we keep the quieter side of it — the light, the lake, the silence after the rotors stop.",
    season: "December – March · July",
    duration: "5 – 10 days",
    highlights: [
      "A lakeside villa, set above the water",
      "A private heli, and a pilot who knows the range",
      "The Southern Alps, in first light",
      "A table with the lake, at dusk",
      "The after — the quiet, once the adventure is done",
    ],
    note: "Some guests want the mountain. Some want the silence after. We arrange both, in that order.",
    gallery: [
      "/images/destinations/queenstown-hero.jpg",
      "/images/destinations/queenstown-1.jpg",
      "/images/destinations/queenstown-2.jpg",
    ],
    coords: { lat: -45.0, lon: 168.7 },
  },
  {
    slug: "great-barrier-reef",
    name: "Great Barrier Reef",
    region: "Queensland, Australia",
    continent: "Oceania",
    description: "A private island, a house reef, and water so clear it seems to have no bottom.",
    price: "From $25k",
    image: "/images/destinations/great-barrier-reef-hero.jpg",
    story:
      "A private island, a house reef, and water so clear it seems to have no bottom. The reef is the largest living thing on earth — and, with us, almost entirely empty.",
    season: "June – October",
    duration: "5 – 10 days",
    highlights: [
      "A private island, staffed for you alone",
      "A house reef, minutes from the deck",
      "A boat and crew for the outer reefs",
      "Diving or snorkeling — or neither",
      "The horizon, in a blue you have not seen before",
    ],
    note: "The reef is best at a distance, or not at all. We keep the days light, and the water yours.",
    gallery: [
      "/images/destinations/great-barrier-reef-hero.jpg",
      "/images/destinations/great-barrier-reef-1.jpg",
      "/images/destinations/great-barrier-reef-2.jpg",
    ],
    coords: { lat: -18.3, lon: 147.7 },
  },
  {
    slug: "antarctica",
    name: "Antarctica",
    region: "The Southern Ocean",
    continent: "Antarctica",
    description: "A private expedition, a research station that receives you, and a continent that belongs to no one.",
    price: "From $65k",
    image: "/images/destinations/antarctica-hero.jpg",
    story:
      "A private expedition, a research station that receives you, and a continent that belongs to no one. It is the last true wilderness — and it asks only that you come quietly.",
    season: "November – February",
    duration: "12 – 21 days",
    highlights: [
      "A private expedition, by ship and zodiac",
      "A research station, opened for you",
      "The ice, at a distance that respects it",
      "A table by the window, as the light turns",
      "The continent that belongs to no one",
    ],
    note: "We have taken a small number of people here, over the years. Every one of them arrived quieter than they left.",
    gallery: [
      "/images/destinations/antarctica-hero.jpg",
      "/images/destinations/antarctica-1.jpg",
      "/images/destinations/antarctica-2.jpg",
    ],
    coords: { lat: -69.0, lon: -40.0 },
  },
];

// ------------------------------------------------------------
//  Helpers
// ------------------------------------------------------------

export const CONTINENTS = [
  "Europe",
  "Asia",
  "Africa",
  "North America",
  "South America",
  "Oceania",
  "Antarctica",
];

export function destinationsByContinent(): Array<{
  continent: string;
  items: Destination[];
}> {
  return CONTINENTS.map((continent) => ({
    continent,
    items: DESTINATIONS.filter((d) => d.continent === continent),
  })).filter((g) => g.items.length > 0);
}

export function getDestination(slug: string): Destination | undefined {
  return DESTINATIONS.find((d) => d.slug === slug);
}

/** The seven that anchor the home-page rail — spread across the collection. */
export const SIGNATURE_SLUGS = [
  "santorini",
  "amalfi-coast",
  "swiss-alps",
  "kyoto",
  "maldives",
  "serengeti",
  "patagonia",
];

export const SIGNATURE = DESTINATIONS.filter((d) =>
  SIGNATURE_SLUGS.includes(d.slug)
);

/** Same continent first, then the rest — for the "also held" rail. */
export function relatedTo(d: Destination, n = 3): Destination[] {
  const same = DESTINATIONS.filter((x) => x.slug !== d.slug && x.continent === d.continent);
  const rest = DESTINATIONS.filter((x) => x.slug !== d.slug && x.continent !== d.continent);
  return [...same, ...rest].slice(0, n);
}

// ------------------------------------------------------------
//  Curated Experiences — the signature "impossible to book" list.
//  `word` is the ghosted watermark behind each act.
// ------------------------------------------------------------

export interface Experience {
  eyebrow: string;
  title: string;
  description: string;
  details: string[];
  word: string;
  video: string;
  image: string;
}

export const EXPERIENCES: Experience[] = [
  {
    title: "A Private Yacht Day",
    eyebrow: "On the Water",
    word: "Celebrate",
    description:
      "Your own crew, your own course, and the horizon unshared. We arrange the vessel, the captain, and the provisions — you choose the light and the pace.",
    details: [
      "A captain and crew, dedicated to you",
      "Provisions composed around your table",
      "Anchors dropped wherever the day leads",
    ],
    image: "/images/pool/yacht.jpg",
    video: "yacht-e58b3f7a.mp4",
  },
  {
    title: "Sunset in a Vineyard",
    eyebrow: "At Golden Hour",
    word: "Explore",
    description:
      "A table for two among the rows, as the light turns to gold. The estate opens its cellar, and the evening is measured in pours, not minutes.",
    details: [
      "A private table among the vines",
      "The cellar, opened for two",
      "An evening that ends when you decide",
    ],
    image: "/images/pool/vineyard.jpg",
    video: "vineyard-236aa879.mp4",
  },
  {
    title: "Private Gallery Access",
    eyebrow: "After Closing",
    word: "Observe",
    description:
      "The collection after closing, with the curator at your side. No crowds, no glass between you and the work — only the conversation it invites.",
    details: [
      "The gallery, emptied for you",
      "A curator, not a guide",
      "Works you will not find in any catalogue",
    ],
    image: "/images/pool/gallery.jpg",
    video: "gallery-0c3c6a92.mp4",
  },
  {
    title: "A Spa Retreat",
    eyebrow: "In Silence",
    word: "Relax",
    description:
      "Days measured in silence, water, and unhurried care. A private suite, a private therapist, and a schedule that belongs entirely to you.",
    details: [
      "A suite held for you alone",
      "Therapists who know your name",
      "A rhythm set by you, not the clock",
    ],
    image: "/images/pool/spa.jpg",
    video: "spa-8fb3a06d.mp4",
  },
  {
    title: "A Cultural Immersion",
    eyebrow: "By Hand",
    word: "Create",
    description:
      "A master, a craft, and an afternoon that changes how you see. We open the doors that are usually closed, and introduce you to the hands behind the work.",
    details: [
      "A master craftsman, privately",
      "A workshop that does not open to the public",
      "An afternoon you will carry home",
    ],
    image: "/images/pool/craft.jpg",
    video: "craft-6020c33a.mp4",
  },
];

// ------------------------------------------------------------
//  The Process — three quiet steps.
// ------------------------------------------------------------

export interface Step {
  n: string;
  title: string;
  description: string;
  image: string;
}

export const STEPS: Step[] = [
  {
    n: "01",
    title: "A conversation",
    description: "One long call, or a letter. We ask what you are looking for — and, more often, what you are trying to leave behind.",
    image: "/images/destinations/santorini-hero.jpg",
  },
  {
    n: "02",
    title: "A proposal, in writing",
    description: "Within a week, a single document: the route, the houses, the people. Nothing generic, nothing padded. You amend it by hand if you wish.",
    image: "/images/pool/craft.jpg",
  },
  {
    n: "03",
    title: "The journey, held",
    description: "A single point of contact, reachable at any hour, for the length of the trip. The rest of the machinery stays out of sight.",
    image: "/images/destinations/maldives-hero.jpg",
  },
];

// ------------------------------------------------------------
//  Featured Itinerary — the composed week on the dark act (mock).
// ------------------------------------------------------------

export interface Itinerary {
  eyebrow: string;
  title: string;
  duration: string;
  description: string;
  highlights: string[];
  image: string;
  imageMain: string;
  imageLeft: string;
  imageRight: string;
  imageExtra1: string;
  imageExtra2: string;
}

export const ITINERARY: Itinerary = {
  eyebrow: "A week, composed",
  title: "The Amalfi Coast",
  duration: "Seven days · two guests",
  description:
    "A palazzo above the sea, a boat that leaves when you wake, and a week arranged around the light on the water — nothing more, nothing rushed.",
  highlights: [
    "A cliffside palazzo, private from roof to cellar",
    "A personal boat and captain, daily",
    "A table for two in a working vineyard",
    "The coast, after the day-trippers have gone",
  ],
  image:
    "/pics/pexels-pixabay-358223.jpg",
  // Foreground gallery — a 5-image ring: center | sides | behind.
  // Local pictures in /public/pics, mapped to the itinerary's highlights.
  imageMain:
    "/pics/pexels-alejandro-henriquez-558322658-19102632.jpg",
  imageLeft: "/pics/pexels-dendoktoor-9100844.jpg",
  imageRight: "/pics/pexels-celalkeser-33966954.jpg",
  imageExtra1: "/pics/pexels-qaarif-16018410.jpg",
  imageExtra2: "/pics/pexels-pixabay-358223.jpg",
};

// ------------------------------------------------------------
//  Testimonial — the quiet endorsement.
// ------------------------------------------------------------

export const TESTIMONIAL = {
  quote:
    "They did not sell us a trip. They removed everything that was not the trip. It was the first journey in years that felt entirely our own.",
  author: "A client, since 2019",
  detail: "Santorini & the Amalfi Coast — 2019",
};

// ------------------------------------------------------------
//  Small stats — used in the brand statement.
// ------------------------------------------------------------

export const STATS = [
  { value: 18, suffix: "", label: "Destinations, held privately" },
  { value: 1, suffix: "", label: "Guest at a time, in every house" },
  { value: 24, suffix: "h", label: "A single point of contact, always" },
];

