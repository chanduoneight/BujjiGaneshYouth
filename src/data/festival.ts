/**
 * Central festival configuration.
 * Edit this file each year — nothing else needs to change.
 */

export type Bilingual = { en: string; te: string };

export const festival = {
  festivalName: { en: "Ganesh Chaturthi", te: "వినాయక చవితి" } as Bilingual,
  committeeTitle: { en: "Bujji Ganesh Youth", te: "బుజ్జి గణేష్ యూత్" } as Bilingual,
  committeeName: { en: "SRP Committee Kurrollu", te: "SRP కమిటీ కుర్రోళ్ళు" } as Bilingual,
  villageName: { en: "Srungarapuram Village", te: "శృంగారాపురం గ్రామం" } as Bilingual,
  year: 2026,
  /** Festival start (day 1) and end (visarjan day) — ISO local dates */
  /** Ganesh Chaturthi 2026: Monday, September 14, 2026 */
  /** Chaturthi Tithi Begins: 7:06 AM, Ends: 7:44 AM (Sept 15) */
  /** Auspicious Sthapana Muhurat: 11:02 AM to 1:31 PM */
  /** Ganesh Visarjan / Anant Chaturdashi: Thursday, September 24, 2026 */
  startDate: "2026-09-14T07:06:00+05:30",
  endDate: "2026-09-24T18:00:00+05:30",
  totalDays: 11,
  sthapanaMuhurat: {
    start: "2026-09-14T11:02:00+05:30",
    end: "2026-09-14T13:31:00+05:30",
  },
  chaturthi: {
    begins: "2026-09-14T07:06:00+05:30",
    ends: "2026-09-15T07:44:00+05:30",
  },
  visarjanDate: "2026-09-24T18:00:00+05:30",
  location: {
    en: "Community Hall, Srungarapuram",
    te: "కమ్యూనిటీ హాల్, శృంగారాపురం",
  } as Bilingual,
  description: {
    en: "Ten days of devotion, culture and community organised by the young volunteers of our village.",
    te: "మా గ్రామ యువ వాలంటీర్లు నిర్వహించే పది రోజుల భక్తి, సంస్కృతి మరియు సమాజ ఉత్సవం.",
  } as Bilingual,
} as const;

export const contact = {
  phone: "+919000000000",
  whatsapp: "919000000000",
  email: "bujjiganeshyouth@example.com",
  address: {
    en: "Community Hall, Srungarapuram Village, Duggirala Mandal, Guntur District - 522305",
    te: "కమ్యూనిటీ హాల్, శృంగారాపురం గ్రామం, దుగ్గిరాల మండలం, గుంటూరు జిల్లా - 522305",
  } as Bilingual,
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Community+Hall+Srungarapuram+Duggirala+Guntur",
  instagram: "https://instagram.com/",
  facebook: "https://facebook.com/",
  youtube: "https://youtube.com/",
};

export type CommitteeMember = {
  id: string;
  name: Bilingual;
  role: Bilingual;
  photo?: string;
  phone?: string;
  whatsapp?: string;
  description: Bilingual;
};

/** Replace names, photos and phone numbers as they are confirmed. */
export const committeeMembers: CommitteeMember[] = [
  {
    id: "president",
    name: { en: "Committee Member 1", te: "కమిటీ సభ్యుడు 1" },
    role: { en: "Festival President", te: "ఉత్సవ అధ్యక్షుడు" },
    description: {
      en: "Guides the committee and leads the festival planning for our village.",
      te: "కమిటీకి మార్గనిర్దేశం చేస్తూ గ్రామ ఉత్సవ ప్రణాళికను నడిపిస్తారు.",
    },
  },
  {
    id: "secretary",
    name: { en: "Committee Member 2", te: "కమిటీ సభ్యుడు 2" },
    role: { en: "Festival Secretary", te: "ఉత్సవ కార్యదర్శి" },
    description: {
      en: "Coordinates daily arrangements and keeps every team informed.",
      te: "రోజువారీ ఏర్పాట్లను సమన్వయం చేస్తూ అన్ని బృందాలకు సమాచారం అందిస్తారు.",
    },
  },
  {
    id: "treasurer",
    name: { en: "Committee Member 3", te: "కమిటీ సభ్యుడు 3" },
    role: { en: "Treasurer", te: "కోశాధికారి" },
    description: {
      en: "Maintains transparent accounts of all festival arrangements.",
      te: "ఉత్సవ ఏర్పాట్ల లెక్కలను పారదర్శకంగా నిర్వహిస్తారు.",
    },
  },
  {
    id: "pooja",
    name: { en: "Committee Member 4", te: "కమిటీ సభ్యుడు 4" },
    role: { en: "Pooja & Rituals Coordinator", te: "పూజ మరియు ఆచారాల సమన్వయకర్త" },
    description: {
      en: "Arranges the priest, pooja materials and daily aarti timings.",
      te: "పురోహితుడు, పూజా సామగ్రి, రోజువారీ హారతి సమయాలను ఏర్పాటు చేస్తారు.",
    },
  },
  {
    id: "cultural",
    name: { en: "Committee Member 5", te: "కమిటీ సభ్యుడు 5" },
    role: { en: "Cultural Programs Coordinator", te: "సాంస్కృతిక కార్యక్రమాల సమన్వయకర్త" },
    description: {
      en: "Plans music, dance and village performances every evening.",
      te: "ప్రతి సాయంత్రం సంగీతం, నృత్యం, గ్రామ ప్రదర్శనలను ప్లాన్ చేస్తారు.",
    },
  },
  {
    id: "decoration",
    name: { en: "Committee Member 6", te: "కమిటీ సభ్యుడు 6" },
    role: { en: "Decoration & Stage Coordinator", te: "అలంకరణ మరియు వేదిక సమన్వయకర్త" },
    description: {
      en: "Designs the pandal, lighting and stage for the whole festival.",
      te: "పందిరి, లైటింగ్, వేదిక అలంకరణను రూపొందిస్తారు.",
    },
  },
  {
    id: "volunteer",
    name: { en: "Committee Member 7", te: "కమిటీ సభ్యుడు 7" },
    role: { en: "Volunteer Team Coordinator", te: "వాలంటీర్ బృంద సమన్వయకర్త" },
    description: {
      en: "Assigns duties to volunteers and manages crowd support.",
      te: "వాలంటీర్లకు విధులు కేటాయించి, రద్దీ నిర్వహణ చూస్తారు.",
    },
  },
  {
    id: "youth",
    name: { en: "Committee Member 8", te: "కమిటీ సభ్యుడు 8" },
    role: { en: "Youth Activities Coordinator", te: "యువ కార్యక్రమాల సమన్వయకర్త" },
    description: {
      en: "Organises games, competitions and youth participation.",
      te: "ఆటలు, పోటీలు, యువత భాగస్వామ్యాన్ని నిర్వహిస్తారు.",
    },
  },
];

export const responsibilities: { id: string; label: Bilingual; text: Bilingual }[] = [
  {
    id: "pooja",
    label: { en: "Pooja & Rituals", te: "పూజ మరియు ఆచారాలు" },
    text: {
      en: "Daily suprabhatam, abhishekam, naivedyam and aarti performed on time.",
      te: "రోజువారీ సుప్రభాతం, అభిషేకం, నైవేద్యం, హారతి సమయానికి నిర్వహణ.",
    },
  },
  {
    id: "decorations",
    label: { en: "Decorations", te: "అలంకరణలు" },
    text: {
      en: "Pandal design, flowers, lighting and the stage backdrop.",
      te: "పందిరి డిజైన్, పూలు, లైటింగ్, వేదిక అలంకరణ.",
    },
  },
  {
    id: "cultural",
    label: { en: "Cultural Programs", te: "సాంస్కృతిక కార్యక్రమాలు" },
    text: {
      en: "Bhajans, folk dance, singing and village talent evenings.",
      te: "భజనలు, జానపద నృత్యం, పాటలు, గ్రామ ప్రతిభా సాయంత్రాలు.",
    },
  },
  {
    id: "volunteers",
    label: { en: "Volunteers", te: "వాలంటీర్లు" },
    text: {
      en: "Duty rosters, queue management and help desks for visitors.",
      te: "డ్యూటీ జాబితాలు, వరుస నిర్వహణ, సందర్శకుల సహాయ కేంద్రాలు.",
    },
  },
  {
    id: "publicity",
    label: { en: "Publicity", te: "ప్రచారం" },
    text: {
      en: "Announcements, posters and updates for the whole village.",
      te: "ప్రకటనలు, పోస్టర్లు, గ్రామం మొత్తానికి సమాచారం.",
    },
  },
  {
    id: "cleanliness",
    label: { en: "Cleanliness", te: "పరిశుభ్రత" },
    text: {
      en: "Waste bins, daily cleaning and an eco-friendly celebration.",
      te: "చెత్త బుట్టలు, రోజువారీ శుభ్రత, పర్యావరణ హిత వేడుకలు.",
    },
  },
  {
    id: "events",
    label: { en: "Event Management", te: "కార్యక్రమ నిర్వహణ" },
    text: {
      en: "Sound, seating, timing and smooth running of every program.",
      te: "సౌండ్, సీటింగ్, సమయపాలన, ప్రతి కార్యక్రమ సజావు నిర్వహణ.",
    },
  },
  {
    id: "procession",
    label: { en: "Procession", te: "ఊరేగింపు" },
    text: {
      en: "Visarjan route, safety, drums and the farewell procession.",
      te: "నిమజ్జన మార్గం, భద్రత, డప్పులు, వీడ్కోలు ఊరేగింపు.",
    },
  },
];
