import type { Bilingual } from "./festival";

import aarti from "@/assets/aarti.jpg";
import cultural from "@/assets/cultural.jpg";
import pandal from "@/assets/pandal.jpg";
import ganesha from "@/assets/ganesha-hero.jpg";

export const images = { aarti, cultural, pandal, ganesha };

export type EventCategory = "pooja" | "cultural" | "community" | "special";

export type FestivalEvent = {
  id: string;
  title: Bilingual;
  category: EventCategory;
  /** ISO date-time with +05:30 offset */
  date: string;
  time: Bilingual;
  location: Bilingual;
  description: Bilingual;
  image: string;
  durationMinutes: number;
};

export const eventCategories: { id: "all" | EventCategory; label: Bilingual }[] = [
  { id: "all", label: { en: "All", te: "అన్నీ" } },
  { id: "pooja", label: { en: "Pooja", te: "పూజ" } },
  { id: "cultural", label: { en: "Cultural", te: "సాంస్కృతికం" } },
  { id: "community", label: { en: "Community", te: "సమాజం" } },
  { id: "special", label: { en: "Special Events", te: "ప్రత్యేక కార్యక్రమాలు" } },
];

export const events: FestivalEvent[] = [
  {
    id: "prathisthapana",
    title: { en: "Ganesh Prathisthapana", te: "గణేష్ ప్రతిష్ఠాపన" },
    category: "pooja",
    date: "2026-09-14T08:00:00+05:30",
    time: { en: "8:00 AM", te: "ఉదయం 8:00" },
    location: { en: "Community Hall, Srungarapuram", te: "కమ్యూనిటీ హాల్, శృంగారాపురం" },
    description: {
      en: "Grand installation ceremony of Lord Ganesha with Vedic chanting and the first aarti.",
      te: "వేద మంత్రోచ్ఛారణతో వినాయకుడి ప్రతిష్ఠాపన మరియు తొలి హారతి.",
    },
    image: ganesha,
    durationMinutes: 120,
  },
  {
    id: "maha-aarti",
    title: { en: "Maha Aarti", te: "మహా హారతి" },
    category: "pooja",
    date: "2026-09-16T20:00:00+05:30",
    time: { en: "8:00 PM", te: "రాత్రి 8:00" },
    location: { en: "Community Hall, Srungarapuram", te: "కమ్యూనిటీ హాల్, శృంగారాపురం" },
    description: {
      en: "Join the entire village for an evening of devotion, lamps and collective prayer.",
      te: "దీపాలు, సామూహిక ప్రార్థనతో గ్రామం మొత్తం కలిసే భక్తి సాయంత్రం.",
    },
    image: aarti,
    durationMinutes: 60,
  },
  {
    id: "cultural-night",
    title: { en: "Cultural Night", te: "సాంస్కృతిక రాత్రి" },
    category: "cultural",
    date: "2026-09-18T18:30:00+05:30",
    time: { en: "6:30 PM", te: "సాయంత్రం 6:30" },
    location: { en: "Community Hall, Srungarapuram", te: "కమ్యూనిటీ హాల్, శృంగారాపురం" },
    description: {
      en: "Music, dance and traditional performances by children and youth of our village.",
      te: "మా గ్రామ పిల్లలు, యువత చేసే సంగీతం, నృత్యం, సంప్రదాయ ప్రదర్శనలు.",
    },
    image: cultural,
    durationMinutes: 180,
  },
  {
    id: "community-celebration",
    title: { en: "Community Celebration", te: "సామూహిక వేడుక" },
    category: "community",
    date: "2026-09-20T19:00:00+05:30",
    time: { en: "7:00 PM", te: "సాయంత్రం 7:00" },
    location: { en: "Community Hall, Srungarapuram", te: "కమ్యూనిటీ హాల్, శృంగారాపురం" },
    description: {
      en: "An evening bringing the village together with annadanam and shared celebration.",
      te: "అన్నదానం, ఉమ్మడి వేడుకతో గ్రామాన్ని ఒకటి చేసే సాయంత్రం.",
    },
    image: pandal,
    durationMinutes: 150,
  },
  {
    id: "nimajjanam",
    title: { en: "Ganesh Nimajjanam", te: "గణేష్ నిమజ్జనం" },
    category: "special",
    date: "2026-09-23T16:00:00+05:30",
    time: { en: "4:00 PM", te: "సాయంత్రం 4:00" },
    location: { en: "Community Hall, Srungarapuram", te: "కమ్యూనిటీ హాల్, శృంగారాపురం" },
    description: {
      en: "Grand immersion procession with drums, dance and a heartfelt farewell to Bappa.",
      te: "డప్పులు, నృత్యాలతో బప్పాకు హృదయపూర్వక వీడ్కోలు ఊరేగింపు.",
    },
    image: pandal,
    durationMinutes: 240,
  },
];

export type AnnouncementCategory =
  | "important"
  | "pooja"
  | "events"
  | "volunteers"
  | "community"
  | "general";

export type Announcement = {
  id: string;
  title: Bilingual;
  category: AnnouncementCategory;
  date: string;
  description: Bilingual;
  important: boolean;
};

export const announcementCategories: { id: "all" | AnnouncementCategory; label: Bilingual }[] = [
  { id: "all", label: { en: "All", te: "అన్నీ" } },
  { id: "important", label: { en: "Important", te: "ముఖ్యమైనవి" } },
  { id: "pooja", label: { en: "Pooja", te: "పూజ" } },
  { id: "events", label: { en: "Events", te: "కార్యక్రమాలు" } },
  { id: "volunteers", label: { en: "Volunteers", te: "వాలంటీర్లు" } },
  { id: "community", label: { en: "Community", te: "సమాజం" } },
  { id: "general", label: { en: "General", te: "సాధారణం" } },
];

export const announcements: Announcement[] = [
  {
    id: "volunteers",
    title: { en: "Volunteers Needed", te: "వాలంటీర్లు కావాలి" },
    category: "volunteers",
    date: "2026-09-05T10:00:00+05:30",
    description: {
      en: "SRP Committee Kurrollu welcomes young volunteers to help with decorations, cultural programs, crowd management and festival activities.",
      te: "అలంకరణలు, సాంస్కృతిక కార్యక్రమాలు, రద్దీ నిర్వహణ, ఉత్సవ కార్యకలాపాలలో సహాయపడేందుకు యువ వాలంటీర్లను SRP కమిటీ కుర్రోళ్ళు ఆహ్వానిస్తోంది.",
    },
    important: true,
  },
  {
    id: "prathisthapana-timing",
    title: { en: "Prathisthapana Timing Confirmed", te: "ప్రతిష్ఠాపన సమయం ఖరారు" },
    category: "pooja",
    date: "2026-09-06T09:00:00+05:30",
    description: {
      en: "The installation pooja will begin at 8:00 AM on the first day. Please reach the pandal by 7:30 AM.",
      te: "మొదటి రోజు ఉదయం 8:00 గంటలకు ప్రతిష్ఠాపన పూజ ప్రారంభమవుతుంది. దయచేసి 7:30 కల్లా పందిరికి చేరుకోండి.",
    },
    important: true,
  },
  {
    id: "cultural-entries",
    title: { en: "Cultural Program Entries Open", te: "సాంస్కృతిక కార్యక్రమ నమోదు ప్రారంభం" },
    category: "events",
    date: "2026-09-07T17:00:00+05:30",
    description: {
      en: "Children and youth who wish to perform on Cultural Night can give their names to the cultural coordinator.",
      te: "సాంస్కృతిక రాత్రిలో ప్రదర్శన ఇవ్వాలనుకునే పిల్లలు, యువత తమ పేర్లను సాంస్కృతిక సమన్వయకర్తకు ఇవ్వవచ్చు.",
    },
    important: false,
  },
  {
    id: "eco-friendly",
    title: { en: "Eco-Friendly Celebration", te: "పర్యావరణ హిత వేడుక" },
    category: "community",
    date: "2026-09-07T11:00:00+05:30",
    description: {
      en: "Please use clay idols and natural flowers, and drop all waste in the bins placed around the pandal.",
      te: "దయచేసి మట్టి విగ్రహాలు, సహజ పూలను వాడండి; చెత్తను పందిరి చుట్టూ ఉంచిన బుట్టల్లో వేయండి.",
    },
    important: false,
  },
  {
    id: "parking",
    title: { en: "Parking Near the Ground", te: "మైదానం వద్ద పార్కింగ్" },
    category: "general",
    date: "2026-09-08T08:00:00+05:30",
    description: {
      en: "Two-wheelers and cars may be parked at the village ground so the main street stays clear for the procession.",
      te: "ఊరేగింపు కోసం మెయిన్ స్ట్రీట్ ఖాళీగా ఉండేలా ద్విచక్ర వాహనాలు, కార్లను గ్రామ మైదానంలో నిలపండి.",
    },
    important: false,
  },
];

export type GalleryCategory =
  | "ganesha"
  | "pooja"
  | "decorations"
  | "cultural"
  | "community"
  | "procession"
  | "visarjan"
  | "village";

export type GalleryPhoto = {
  id: string;
  image: string;
  title: Bilingual;
  category: GalleryCategory;
  date: string;
};

export const galleryCategories: { id: "all" | GalleryCategory; label: Bilingual }[] = [
  { id: "all", label: { en: "All", te: "అన్నీ" } },
  { id: "ganesha", label: { en: "Ganesha", te: "గణేశుడు" } },
  { id: "pooja", label: { en: "Pooja", te: "పూజ" } },
  { id: "decorations", label: { en: "Decorations", te: "అలంకరణలు" } },
  { id: "cultural", label: { en: "Cultural Programs", te: "సాంస్కృతిక కార్యక్రమాలు" } },
  { id: "community", label: { en: "Community", te: "సమాజం" } },
  { id: "procession", label: { en: "Procession", te: "ఊరేగింపు" } },
  { id: "visarjan", label: { en: "Visarjan", te: "నిమజ్జనం" } },
  { id: "village", label: { en: "Village Memories", te: "గ్రామ జ్ఞాపకాలు" } },
];

/** Replace or extend these photos with real festival pictures each year. */
export const gallery: GalleryPhoto[] = [
  {
    id: "g1",
    image: ganesha,
    title: { en: "Our Ganesha idol at the pandal", te: "పందిరిలో మా గణేశుడి విగ్రహం" },
    category: "ganesha",
    date: "2025-08-27",
  },
  {
    id: "g2",
    image: aarti,
    title: { en: "Evening aarti with brass lamps", te: "ఇత్తడి దీపాలతో సాయంత్ర హారతి" },
    category: "pooja",
    date: "2025-08-28",
  },
  {
    id: "g3",
    image: pandal,
    title: { en: "Marigold decorations at dusk", te: "సందె వేళ బంతిపూల అలంకరణ" },
    category: "decorations",
    date: "2025-08-28",
  },
  {
    id: "g4",
    image: cultural,
    title: { en: "Folk dance on cultural night", te: "సాంస్కృతిక రాత్రిలో జానపద నృత్యం" },
    category: "cultural",
    date: "2025-08-30",
  },
  {
    id: "g5",
    image: pandal,
    title: { en: "The village gathers at the pandal", te: "పందిరి వద్ద గ్రామం కలిసిన వేళ" },
    category: "community",
    date: "2025-08-31",
  },
  {
    id: "g6",
    image: cultural,
    title: { en: "Drums leading the procession", te: "ఊరేగింపును నడిపిన డప్పులు" },
    category: "procession",
    date: "2025-09-05",
  },
  {
    id: "g7",
    image: aarti,
    title: { en: "Last aarti before visarjan", te: "నిమజ్జనానికి ముందు చివరి హారతి" },
    category: "visarjan",
    date: "2025-09-05",
  },
  {
    id: "g8",
    image: ganesha,
    title: { en: "Golden glow over our village Bappa", te: "మా గ్రామ బప్పాపై బంగారు కాంతి" },
    category: "village",
    date: "2025-09-05",
  },
];

export type ProgramItem = { time: Bilingual; minutes: number; title: Bilingual };
export type DayPart = "morning" | "afternoon" | "evening" | "night";

export const dayParts: { id: DayPart; label: Bilingual }[] = [
  { id: "morning", label: { en: "Morning", te: "ఉదయం" } },
  { id: "afternoon", label: { en: "Afternoon", te: "మధ్యాహ్నం" } },
  { id: "evening", label: { en: "Evening", te: "సాయంత్రం" } },
  { id: "night", label: { en: "Night", te: "రాత్రి" } },
];

/** Daily program template, shared by every festival day. */
export const dailyProgram: Record<DayPart, ProgramItem[]> = {
  morning: [
    {
      time: { en: "6:00 AM", te: "ఉదయం 6:00" },
      minutes: 360,
      title: { en: "Ganesh Suprabhatam", te: "గణేష్ సుప్రభాతం" },
    },
    {
      time: { en: "8:00 AM", te: "ఉదయం 8:00" },
      minutes: 480,
      title: { en: "Special Pooja & Abhishekam", te: "ప్రత్యేక పూజ మరియు అభిషేకం" },
    },
  ],
  afternoon: [
    {
      time: { en: "12:00 PM", te: "మధ్యాహ్నం 12:00" },
      minutes: 720,
      title: { en: "Maha Naivedyam", te: "మహా నైవేద్యం" },
    },
    {
      time: { en: "3:00 PM", te: "మధ్యాహ్నం 3:00" },
      minutes: 900,
      title: { en: "Community Activities", te: "సామూహిక కార్యక్రమాలు" },
    },
  ],
  evening: [
    {
      time: { en: "6:30 PM", te: "సాయంత్రం 6:30" },
      minutes: 1110,
      title: { en: "Cultural Program", te: "సాంస్కృతిక కార్యక్రమం" },
    },
    {
      time: { en: "7:30 PM", te: "సాయంత్రం 7:30" },
      minutes: 1170,
      title: { en: "Bhajans", te: "భజనలు" },
    },
  ],
  night: [
    {
      time: { en: "8:00 PM", te: "రాత్రి 8:00" },
      minutes: 1200,
      title: { en: "Maha Aarti", te: "మహా హారతి" },
    },
  ],
};

export const highlights: { id: string; icon: string; title: Bilingual; text: Bilingual }[] = [
  {
    id: "pooja",
    icon: "flame",
    title: { en: "Daily Pooja", te: "రోజువారీ పూజ" },
    text: {
      en: "Join us every day for Ganesh Puja and Aarti.",
      te: "ప్రతిరోజూ గణేష్ పూజ, హారతికి మాతో చేరండి.",
    },
  },
  {
    id: "cultural",
    icon: "music",
    title: { en: "Cultural Programs", te: "సాంస్కృతిక కార్యక్రమాలు" },
    text: {
      en: "Celebrate our village traditions with music, dance and cultural performances.",
      te: "సంగీతం, నృత్యం, ప్రదర్శనలతో మా గ్రామ సంప్రదాయాలను జరుపుకోండి.",
    },
  },
  {
    id: "community",
    icon: "users",
    title: { en: "Community", te: "సమాజం" },
    text: {
      en: "Bringing friends, families and youth together in the spirit of celebration.",
      te: "స్నేహితులు, కుటుంబాలు, యువతను వేడుక స్ఫూర్తితో ఒకటి చేస్తున్నాం.",
    },
  },
  {
    id: "visarjan",
    icon: "waves",
    title: { en: "Visarjan", te: "నిమజ్జనం" },
    text: {
      en: "Join us as we respectfully bid farewell to Lord Ganesha.",
      te: "వినాయకుడికి భక్తితో వీడ్కోలు పలికే వేళ మాతో చేరండి.",
    },
  },
];
