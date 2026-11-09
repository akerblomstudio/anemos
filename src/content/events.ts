// Programpunkter. Lägg till, uppdatera eller avpublicera genom att ändra `published`.
// Poster med `demo: true` visas endast i utvecklingsmiljön och är tydligt märkta.

export const categories = {
  livemusik: "Livemusik",
  scenkonst: "Scenkonst och framträdanden",
  moten: "Konstnärliga möten",
  workshop: "Utbildningar och workshops",
  ovrigt: "Övrig kultur",
} as const;

export type CategoryKey = keyof typeof categories;

export type ProgramEvent = {
  slug: string;
  title: string;
  category: CategoryKey;
  start: string; // ISO
  end?: string;
  location: string;
  summary: string;
  description: string[];
  performers?: string[];
  price?: string; // endast om bekräftat
  ticketUrl?: string;
  ageLimit?: string;
  accessibility?: string; // endast om bekräftat
  contact?: string;
  image?: string;
  imageAlt?: string;
  published: boolean;
  demo?: boolean;
};

const allEvents: ProgramEvent[] = [
  {
    slug: "exempel-akustisk-kvall",
    title: "Exempel: Akustisk kväll",
    category: "livemusik",
    start: "2027-02-12T19:00:00",
    end: "2027-02-12T21:30:00",
    location: "Exempelplats, Malmö",
    summary: "Demonstrationspost för att visa hur en programpunkt ser ut.",
    description: [
      "Detta är exempeldata och ingen verklig programpunkt. Den syns bara i utvecklingsmiljön.",
    ],
    performers: ["Exempelartist"],
    ageLimit: "Exempel: ingen åldersgräns",
    published: true,
    demo: true,
  },
  {
    slug: "exempel-workshop",
    title: "Exempel: Workshop i låtskrivande",
    category: "workshop",
    start: "2025-10-04T13:00:00",
    location: "Exempelplats, Malmö",
    summary: "Demonstrationspost för ett tidigare arrangemang.",
    description: ["Detta är exempeldata och ingen verklig programpunkt."],
    published: true,
    demo: true,
  },
];

export function getEvents(): ProgramEvent[] {
  return allEvents
    .filter((e) => e.published && (!e.demo || import.meta.env.DEV))
    .sort((a, b) => a.start.localeCompare(b.start));
}

export function getEvent(slug: string) {
  return getEvents().find((e) => e.slug === slug);
}

export function isUpcoming(e: ProgramEvent, now = new Date()) {
  return new Date(e.end ?? e.start) >= now;
}

export function formatDate(iso: string) {
  return new Intl.DateTimeFormat("sv-SE", {
    weekday: "short", day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit",
  }).format(new Date(iso));
}
