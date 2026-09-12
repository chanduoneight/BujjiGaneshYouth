import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { Bilingual } from "@/data/festival";

export type Lang = "en" | "te";

const STORAGE_KEY = "bgy-lang";

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  /** Pick the right side of a bilingual value */
  b: (value: Bilingual) => string;
  /** Look up a UI string key */
  t: (key: keyof typeof dictionary) => string;
};

export const dictionary = {
  home: { en: "Home", te: "హోమ్" },
  about: { en: "About", te: "మా గురించి" },
  aboutLong: { en: "About Ganesha", te: "గణేశుడి గురించి" },
  schedule: { en: "Schedule", te: "కార్యక్రమాల షెడ్యూల్" },
  events: { en: "Events", te: "కార్యక్రమాలు" },
  gallery: { en: "Gallery", te: "ఫోటోలు" },
  committee: { en: "Committee", te: "కమిటీ" },
  announcements: { en: "Announcements", te: "ప్రకటనలు" },
  contact: { en: "Contact", te: "సంప్రదించండి" },
  more: { en: "More", te: "మరిన్ని" },
  menu: { en: "Menu", te: "మెనూ" },
  namah: { en: "श्री गणेशाय नमः", te: "శ్రీ గణేశాయ నమః" },
  bappaMorya: { en: "Ganpati Bappa Morya 🙏", te: "గణపతి బప్పా మోరియా 🙏" },
  bappaMangalMorya: {
    en: "Ganpati Bappa Morya, Mangal Murti Morya!",
    te: "గణపతి బప్పా మోరియా, మంగళ మూర్తి మోరియా!",
  },
  heroHeadline: {
    en: "Welcome to Our Ganesh Chaturthi Celebrations",
    te: "మా వినాయక చవితి వేడుకలకు స్వాగతం",
  },
  heroSupport: {
    en: "Celebrating devotion, friendship, tradition and the spirit of our village together.",
    te: "భక్తి, స్నేహం, సంప్రదాయం, మా గ్రామ స్ఫూర్తిని కలిసి జరుపుకుంటున్నాం.",
  },
  ctaSchedule: { en: "View Festival Schedule", te: "ఉత్సవ షెడ్యూల్ చూడండి" },
  ctaGallery: { en: "Explore Gallery", te: "ఫోటోలు చూడండి" },
  countdownTitle: { en: "Ganesh Chaturthi Begins In", te: "వినాయక చవితి ప్రారంభానికి" },
  days: { en: "Days", te: "రోజులు" },
  hours: { en: "Hours", te: "గంటలు" },
  minutes: { en: "Minutes", te: "నిమిషాలు" },
  seconds: { en: "Seconds", te: "సెకన్లు" },
  festivalBegun: { en: "Ganpati Bappa Morya! 🙏", te: "గణపతి బప్పా మోరియా! 🙏" },
  highlights: { en: "Festival Highlights", te: "ఉత్సవ విశేషాలు" },
  todaysProgram: { en: "Today's Program", te: "నేటి కార్యక్రమం" },
  nextProgram: { en: "Next Program", te: "తదుపరి కార్యక్రమం" },
  upcomingEvents: { en: "Upcoming Events", te: "రాబోయే కార్యక్రమాలు" },
  viewDetails: { en: "View Details", te: "వివరాలు చూడండి" },
  latestAnnouncements: { en: "Latest Announcements", te: "తాజా ప్రకటనలు" },
  viewAllAnnouncements: { en: "View All Announcements", te: "అన్ని ప్రకటనలు చూడండి" },
  important: { en: "Important", te: "ముఖ్యం" },
  aboutTitle: {
    en: "Lord Ganesha — The Remover of Obstacles",
    te: "విఘ్నాలను తొలగించే వినాయకుడు",
  },
  readMore: { en: "Read More", te: "మరింత చదవండి" },
  galleryTitle: { en: "Our Ganesh Festival Memories", te: "మా గణేష్ ఉత్సవ జ్ఞాపకాలు" },
  gallerySubtitle: {
    en: "Moments of devotion, friendship and celebration.",
    te: "భక్తి, స్నేహం, వేడుకల క్షణాలు.",
  },
  viewGallery: { en: "View Full Gallery", te: "పూర్తి గ్యాలరీ చూడండి" },
  meetCommittee: { en: "Meet Our Committee", te: "మా కమిటీని కలవండి" },
  committeeIntro: {
    en: "A group of young hearts united by devotion, friendship and love for our village.",
    te: "భక్తి, స్నేహం, గ్రామంపై ప్రేమతో ఏకమైన యువ హృదయాల బృందం.",
  },
  committeeQuote: {
    en: "Together we serve. Together we celebrate. Together we make memories.",
    te: "కలిసి సేవ చేస్తాం. కలిసి జరుపుకుంటాం. కలిసి జ్ఞాపకాలు సృష్టిస్తాం.",
  },
  viewCommittee: { en: "View Full Committee", te: "పూర్తి కమిటీ చూడండి" },
  call: { en: "Call", te: "కాల్" },
  whatsapp: { en: "WhatsApp", te: "వాట్సాప్" },
  callUs: { en: "Call Us", te: "మాకు కాల్ చేయండి" },
  directions: { en: "Get Directions", te: "దారి చూపించు" },
  contactTitle: { en: "Contact Us", te: "మమ్మల్ని సంప్రదించండి" },
  name: { en: "Name", te: "పేరు" },
  phone: { en: "Phone", te: "ఫోన్" },
  message: { en: "Message", te: "సందేశం" },
  send: { en: "Send Message", te: "సందేశం పంపండి" },
  sent: {
    en: "Thank you! Your message has reached the committee.",
    te: "ధన్యవాదాలు! మీ సందేశం కమిటీకి చేరింది.",
  },
  errName: { en: "Please enter your name.", te: "దయచేసి మీ పేరు రాయండి." },
  errPhone: { en: "Please enter a valid 10-digit phone number.", te: "సరైన 10 అంకెల ఫోన్ నంబర్ ఇవ్వండి." },
  errMessage: { en: "Please write a short message.", te: "దయచేసి చిన్న సందేశం రాయండి." },
  addToCalendar: { en: "Add to Calendar", te: "క్యాలెండర్‌లో చేర్చండి" },
  day: { en: "Day", te: "రోజు" },
  ourTeam: { en: "Our Team", te: "మా బృందం" },
  ourResponsibilities: { en: "Our Responsibilities", te: "మా బాధ్యతలు" },
  ourMission: { en: "Our Mission", te: "మా లక్ష్యం" },
  missionText: {
    en: "To bring our village together through devotion, culture, friendship and community spirit while preserving the traditions of our Ganesh festival.",
    te: "మా గణేష్ ఉత్సవ సంప్రదాయాలను కాపాడుతూ, భక్తి, సంస్కృతి, స్నేహం, సమాజ స్ఫూర్తితో గ్రామాన్ని ఏకం చేయడం.",
  },
  contactLocation: { en: "Reach Us", te: "మమ్మల్ని చేరుకోండి" },
  footerTagline: {
    en: "Celebrating devotion, friendship, tradition and community.",
    te: "భక్తి, స్నేహం, సంప్రదాయం, సమాజాన్ని జరుపుకుంటున్నాం.",
  },
  madeWith: { en: "Made with ❤️ for our village", te: "మా గ్రామం కోసం ❤️ తో తయారుచేయబడింది" },
  quickLinks: { en: "Quick Links", te: "త్వరిత లింకులు" },
  noResults: { en: "Nothing here yet.", te: "ఇక్కడ ఇంకా ఏమీ లేదు." },
  
  // About Page
  aboutPageTitle: { en: "About Our Celebration", te: "మా వేడుక గురించి" },
  aboutPageSubtitle: {
    en: "A journey of faith, friendship, and festivity brought to life by the youth of our community",
    te: "మా యువత తీసుకువచ్చిన విశ్వాసం, స్నేహం మరియు వేడుకల ప్రయాణం",
  },
  whyWeCelebrate: { en: "Why We Celebrate", te: "మనం ఎందుకు జరుపుకుంటాం" },
  whyWeCelebrateText1: {
    en: "Ganesh Chaturthi celebrates the birth of Lord Ganesha, the remover of obstacles and the symbol of wisdom, prosperity, and new beginnings. We celebrate this festival to seek His blessings for happiness, success, and a positive life.",
    te: "వినాయక చవితి అడ్డంకులను తొలగించే, జ్ఞానం, సంపద మరియు కొత్త ప్రారంభాలకు చిహ్నమైన గణేశుని జన్మదినాన్ని జరుపుకుంటుంది. సంతోషం, విజయం మరియు సానుకూల జీవితం కోసం ఆయన ఆశీర్వాదాలను పొందడానికి మనం ఈ పండుగను జరుపుకుంటాం.",
  },
  whyWeCelebrateText2: {
    en: "Lord Ganesha, with his elephant head and gentle smile, represents the perfect blend of strength and compassion. He is invoked at the beginning of every new venture, every important journey, reminding us that with faith and perseverance, no obstacle is too great to overcome.",
    te: "ఏనుగు తల మరియు సున్నితమైన చిరునవ్వుతో ఉన్న గణేశుడు బలం మరియు కరుణ యొక్క పరిపూర్ణ సమ్మేళనాన్ని సూచిస్తాడు. ప్రతి కొత్త ప్రయత్నం, ప్రతి ముఖ్యమైన ప్రయాణం ప్రారంభంలో ఆయనను ప్రార్థిస్తాము, విశ్వాసం మరియు పట్టుదలతో ఏ అడ్డంకి కూడా అధిగమించలేనిది కాదని గుర్తు చేస్తాడు.",
  },
  importance: { en: "Importance", te: "ప్రాముఖ్యత" },
  importanceText1: {
    en: "Ganesh Chaturthi brings people together through faith, devotion, and community spirit. It reminds us to overcome obstacles with wisdom, embrace new beginnings, and spread peace, kindness, and happiness among everyone.",
    te: "వినాయక చవితి విశ్వాసం, భక్తి మరియు సామాజిక స్ఫూర్తి ద్వారా ప్రజలను ఏకం చేస్తుంది. జ్ఞానంతో అడ్డంకులను అధిగమించడం, కొత్త ప్రారంభాలను స్వీకరించడం మరియు అందరిలో శాంతి, దయ మరియు సంతోషాన్ని వ్యాపింపజేయడం మనకు గుర్తు చేస్తుంది.",
  },
  importanceText2: {
    en: "In our fast-paced modern world, this festival serves as a beautiful reminder to pause, reflect, and reconnect with our roots. It strengthens family bonds, builds community harmony, and instills values of devotion, discipline, and service in the younger generation.",
    te: "మన వేగవంతమైన ఆధునిక ప్రపంచంలో, ఈ పండుగ ఆగి, ఆలోచించి, మన మూలాలతో తిరిగి కలవడానికి అందమైన గుర్తుగా ఉంటుంది. ఇది కుటుంబ బంధాలను బలోపేతం చేస్తుంది, సమాజ సామరస్యాన్ని పెంపొందిస్తుంది మరియు యువ తరంలో భక్తి, క్రమశిక్షణ మరియు సేవా విలువలను నింపుతుంది.",
  },
  importanceText3: {
    en: "The festival transcends religious boundaries, bringing together people from all walks of life in a shared celebration of hope, joy, and cultural heritage.",
    te: "ఈ పండుగ మత సరిహద్దులను దాటి, జీవితంలోని అన్ని రంగాల ప్రజలను ఆశ, ఆనందం మరియు సాంస్కృతిక వారసత్వం యొక్క ఉమ్మడి వేడుకలో ఏకం చేస్తుంది.",
  },
  ourTraditions: { en: "Our Traditions", te: "మా సంప్రదాయాలు" },
  ourTraditionsText: {
    en: "The festival is celebrated with the installation of Lord Ganesha's idol, daily prayers, aarti, devotional songs, cultural programs, and sharing of prasadam. The celebrations conclude with the traditional Ganesh Visarjan, symbolizing a beautiful cycle of creation and renewal.",
    te: "గణేశుని విగ్రహం స్థాపన, రోజువారీ పూజలు, హారతి, భక్తి గీతాలు, సాంస్కృతిక కార్యక్రమాలు మరియు ప్రసాదం పంపిణీతో పండుగ జరుపుకోబడుతుంది. సృష్టి మరియు పునరుద్ధరణ యొక్క అందమైన చక్రాన్ని సూచిస్తూ సాంప్రదాయ గణేష్ నిమజ్జనంతో వేడుకలు ముగుస్తాయి.",
  },
  culturalPrograms: { en: "Cultural Programs", te: "సాంస్కృతిక కార్యక్రమాలు" },
  culturalProgramsDesc: {
    en: "Traditional dance performances, devotional music, and folk art presentations that showcase our rich heritage.",
    te: "మన గొప్ప వారసత్వాన్ని ప్రదర్శించే సాంప్రదాయ నృత్య ప్రదర్శనలు, భక్తి సంగీతం మరియు జానపద కళా ప్రదర్శనలు.",
  },
  dailyRituals: { en: "Daily Rituals", te: "రోజువారీ పూజలు" },
  dailyRitualsDesc: {
    en: "Morning and evening aarti, bhajans, and special pujas performed with devotion and joy by our community.",
    te: "మా సమాజం భక్తి మరియు ఆనందంతో నిర్వహించే ఉదయం మరియు సాయంత్రం హారతి, భజనలు మరియు ప్రత్యేక పూజలు.",
  },
  visarjanCeremony: { en: "Visarjan Ceremony", te: "నిమజ్జన వేడుక" },
  visarjanCeremonyDesc: {
    en: "The grand procession with drums, music, and dancing as we bid farewell to Bappa, carrying prayers for His return next year.",
    te: "వచ్చే ఏడాది ఆయన తిరిగి రావాలని ప్రార్థనలతో బప్పకు వీడ్కోలు పలుకుతూ డప్పులు, సంగీతం మరియు నృత్యంతో కూడిన గొప్ప ఊరేగింపు.",
  },
  ourStory: { en: "Our Story & 19+ Years Journey", te: "మా కథ & 19+ ఏళ్ల ప్రస్థానం" },
  ourStoryText1: {
    en: "In the year 2007, the young, energetic youth of Srungarapuram — affectionately known as 'SRP Committee Kurrollu' (Bujji Ganesh Youth) — united with a shared devotion and vision: to establish Lord Vinayaka at the Community Hall, Srungarapuram and transform the festival into an epicenter of divine blessings, brotherhood, and joy.",
    te: "2007వ సంవత్సరంలో, శృంగారాపురం గ్రామ యువకులు — 'SRP కమిటీ కుర్రోళ్ళు' (బుజ్జి గణేష్ యూత్) — అపారమైన భక్తి, స్నేహంతో ఏకమయ్యారు. శృంగారాపురం కమ్యూనిటీ హాల్ వద్ద శ్రీ వినాయక స్వామిని ప్రతిష్టించి, ఊరందరికీ దివ్య ఆశీస్సులు, ఆనందం మరియు ఐక్యతను పంచే మహోన్నత వేడుకకు నాంది పలికారు.",
  },
  ourStoryText2: {
    en: "What started in 2007 with humble beginnings has blossomed over 19+ unbroken years into a celebrated annual milestone. Year after year, from 2007 to till this year (2026), at the very same sacred ground of Community Hall, Srungarapuram, the SRP Kurrollu work tirelessly — designing majestic mandapams, organizing sacred Vedic rituals, hosting mass Annadanams, and spreading the divine grace of Lord Ganesha to every household.",
    te: "2007లో నిరాడంబరంగా మొదలైన ఈ ఉత్సవం, గడచిన 19+ ఏళ్లలో గ్రామానికే తలమానికమైన మహా సంప్రదాయంగా ఎదిగింది. 2007 నుండి నేటి 2026 వరకు ప్రతి ఏటా అదే పవిత్ర శృంగారాపురం కమ్యూనిటీ హాల్ ప్రాంగణంలో, SRP కుర్రోళ్ళు అహర్నిశలు శ్రమించి — దివ్యమైన మండప అలంకరణలు, వేద మంత్రోచ్ఛారణలతో పూజలు, అన్నదానాలు మరియు వినాయకుని దివ్య ఆశీర్వాదాలను ప్రతి ఇంటికి చేరవేస్తున్నారు.",
  },
  ourStoryText3: {
    en: "For nearly two decades, this festival has stood as proof that when youth unite with devotion and pure intention, miracles happen. Through late-night pandal decorations, resonant morning bhajans, serving food with love, and the unforgettable energetic Visarjan processions, the SRP Committee Kurrollu continue to keep the spirit of Srungarapuram vibrant with divine energy and blessings.",
    te: "యువత భక్తితో మరియు నిస్వార్థ సేవా భావంతో ఏకమైతే ఎలాంటి అద్భుతాలు సృష్టించవచ్చో గత రెండు దశాబ్దాలుగా ఈ ఉత్సవం నిరూపిస్తోంది. రాత్రింబవళ్ళు చేసే మండప ఏర్పాట్లు, ఉదయపు భజనలు, ప్రేమతో వడ్డించే అన్నప్రసాదాలు మరియు డప్పుల మోతతో సాగే ఘన నిమజ్జన శోభాయాత్రలతో SRP కమిటీ కుర్రోళ్ళు శృంగారాపురంలో దివ్య చైతన్యాన్ని, ఆశీస్సులను నింపుతున్నారు.",
  },
  srpHistoryTitle: {
    en: "Our Sacred Legacy (2007 – 2026)",
    te: "మా పవిత్ర చరిత్ర & ప్రస్థానం (2007 – నేటి వరకు)",
  },
  srpHistorySubtitle: {
    en: "19+ Years of Divine Celebrations by SRP Committee Kurrollu at Community Hall, Srungarapuram",
    te: "శృంగారాపురం కమ్యూనిటీ హాల్ వేదికగా SRP కమిటీ కుర్రోళ్ళు జరిపే 19+ ఏళ్ల దివ్య వినాయక చవితి సంబరాలు",
  },
  srpHistoryIntro: {
    en: "Since 2007, under the divine grace of Lord Vighneshwara, the SRP Committee Kurrollu have transformed the Community Hall of Srungarapuram into a haven of prayer, devotion, and festive joy. Discover the journey of faith that has guided us through almost two decades.",
    te: "2007 సంవత్సరం నుండి నేటి వరకు, విఘ్ననాయకుని దివ్య ఆశీస్సులతో SRP కమిటీ కుర్రోళ్ళు శృంగారాపురం కమ్యూనిటీ హాల్‌ను భక్తి, ప్రార్థనలు మరియు పండుగ సంబరాల దివ్య క్షేత్రంగా తీర్చిదిద్దారు. దాదాపు రెండు దశాబ్దాలుగా సాగుతున్న మా పవిత్ర ప్రయాణాన్ని వీక్షించండి.",
  },
  historyEra1Year: { en: "2007", te: "2007" },
  historyEra1Title: { en: "The Sacred Inception", te: "పవిత్ర ప్రారంభం" },
  historyEra1Desc: {
    en: "The founding youth of Srungarapuram (SRP Kurrollu) came together with boundless faith to install their very first Ganesh idol at the Community Hall, marking the birth of an enduring devotional legacy.",
    te: "శృంగారాపురం గ్రామ యువకులు (SRP కుర్రోళ్ళు) దృఢమైన విశ్వాసంతో కమ్యూనిటీ హాల్ వద్ద మొదటిసారి గణపతి విగ్రహాన్ని ప్రతిష్టించి, ఒక చిరస్మరణీయ భక్తి ప్రస్థానానికి పునాది వేశారు.",
  },
  historyEra2Year: { en: "2012", te: "2012" },
  historyEra2Title: { en: "Expanding Traditions & Annadanam", te: "సంప్రదాయాల విస్తరణ & అన్నదానం" },
  historyEra2Desc: {
    en: "The festival grew with elaborate lighting, cultural activities for village children, daily pujas, and grand community Annadanam, blessing hundreds of devotees every day.",
    te: "విస్తృత విద్యుద్దీపాలంకరణలు, చిన్నారుల సాంస్కృతిక ప్రదర్శనలు, నిత్య పూజలు మరియు వందలాది మంది భక్తులకు భోజనం అందించే మహా అన్నదానంతో ఉత్సవం సరికొత్త రూపు సంతరించుకుంది.",
  },
  historyEra3Year: { en: "2018", te: "2018" },
  historyEra3Title: { en: "Youth Grandeur & High Energy", te: "యువ వైభవం & సాంస్కృతిక శోభ" },
  historyEra3Desc: {
    en: "With innovative pandal themes, powerful dhol processions, and widespread community participation, the SRP Kurrollu established our celebration as the pride of Srungarapuram.",
    te: "సృజనాత్మక మండప థీమ్‌లు, ఉత్తేజభరితమైన డప్పు వాయిద్యాల ఊరేగింపు మరియు సమస్త గ్రామ ప్రజల భాగస్వామ్యంతో SRP కుర్రోళ్ళ వేడుక గ్రామానికే గర్వకారణంగా నిలిచింది.",
  },
  historyEra4Year: { en: "2026", te: "2026" },
  historyEra4Title: { en: "19+ Years of Eternal Grace", te: "19+ ఏళ్ల దివ్య ఆశీస్సులు" },
  historyEra4Desc: {
    en: "Celebrating 19+ unbroken years of divine blessings at Community Hall, Srungarapuram. Carrying forward our rich heritage with modern energy, brotherhood, and devotion.",
    te: "శృంగారాపురం కమ్యూనిటీ హాల్ వేదికగా 19+ ఏళ్ల ఎడతెగని దివ్య ప్రయాణాన్ని ఘనంగా జరుపుకుంటున్నాం. యువత ఐక్యతతో మన సంప్రదాయాలను సగర్వంగా ముందుకు నడిపిస్తున్నాం.",
  },
  venueCardTitle: {
    en: "Sacred Venue: Community Hall, Srungarapuram",
    te: "పవిత్ర వేదిక: కమ్యూనిటీ హాల్, శృంగారాపురం",
  },
  venueCardDesc: {
    en: "Every year since 2007, the Community Hall of Srungarapuram has been sanctified by Vedic chants, aromatic camphor, devotional singing, and the joyous energy of devotees seeking Bappa's divine blessings.",
    te: "2007 నుండి ప్రతి సంవత్సరం, శృంగారాపురం కమ్యూనిటీ హాల్ వేద మంత్రాలు, కర్పూర హారతులు, భక్తి గీతాలు మరియు గణపతి ఆశీస్సులు కోరే భక్తుల ఆనంద తరంగాలతో పునీతమవుతోంది.",
  },
  venueSublabel: {
    en: "The Eternal Festival Venue",
    te: "శాశ్వత పవిత్ర ఉత్సవ వేదిక",
  },
  statYears: { en: "19+ Years", te: "19+ ఏళ్ళు" },
  statYearsLabel: { en: "Unbroken Legacy (Since 2007)", te: "నిరంతర ఉత్సవం (2007 నుండి)" },
  statVenue: { en: "Community Hall", te: "కమ్యూనిటీ హాల్" },
  statVenueLabel: { en: "Srungarapuram Venue", te: "శృంగారాపురం వేదిక" },
  statOrganizers: { en: "SRP Kurrollu", te: "SRP కుర్రోళ్ళు" },
  statOrganizersLabel: { en: "Bujji Ganesh Youth", te: "బుజ్జి గణేష్ యూత్" },
  statBlessings: { en: "100% Divine", te: "సంపూర్ణ దివ్యం" },
  statBlessingsLabel: { en: "Blessings & Unity", te: "ఆశీస్సులు & ఐక్యత" },
  bujjiGaneshYouth: { en: "Bujji Ganesh Youth", te: "బుజ్జి గణేష్ యూత్" },
  bujjiGaneshYouthText1: {
    en: "SRP Committee Kurrollu (Bujji Ganesh Youth) celebrates Ganesh Chaturthi with boundless energy, brotherhood, and deep devotion. From humble beginnings in 2007 at Community Hall, Srungarapuram to this very day, our youth remain united in service and faith.",
    te: "SRP కమిటీ కుర్రోళ్ళు (బుజ్జి గణేష్ యూత్) అంతులేని ఉత్సాహం, సోదరభావం మరియు గాఢమైన భక్తితో వినాయక చవితిని జరుపుకుంటున్నారు. 2007లో శృంగారాపురం కమ్యూనిటీ హాల్ వద్ద ప్రారంభమైన ఈ ప్రయాణం నేటికీ సేవాభావం మరియు విశ్వాసంతో ముందుకు సాగుతోంది.",
  },
  bujjiGaneshYouthText2: {
    en: "With the divine blessings of Lord Ganesha, we continue our 19+ year sacred mission: keeping our cultural heritage alive, fostering friendship across all generations, and bringing peace and prosperity to Srungarapuram.",
    te: "శ్రీ గణేశుని దివ్య ఆశీస్సులతో, మేము మా 19+ ఏళ్ల పవిత్ర సంకల్పాన్ని ముందుకు తీసుకెళ్తున్నాం: మన సాంస్కృతిక వారసత్వాన్ని సజీవంగా ఉంచడం, అన్ని తరాల మధ్య స్నేహాన్ని పెంపొందించడం మరియు శృంగారాపురానికి శాంతి, సౌభాగ్యాలను చేకూర్చడం.",
  },
  togetherMessage: {
    en: "Together we celebrate, together we serve, and together we receive Lord Ganesha's blessings.",
    te: "కలిసి జరుపుకుంటాం, కలిసి సేవ చేస్తాం, కలిసి గణేశుని దివ్య ఆశీస్సులను పొందుతాం.",
  },
  ourValues: { en: "Our Values", te: "మా విలువలు" },
  devotion: { en: "Devotion", te: "భక్తి" },
  devotionDesc: {
    en: "Deep faith and reverence in every prayer, ritual, and celebration",
    te: "ప్రతి ప్రార్థన, ఆచారం మరియు వేడుకలో లోతైన విశ్వాసం మరియు గౌరవం",
  },
  unity: { en: "Unity", te: "ఐక్యత" },
  unityDesc: {
    en: "Bringing people together across ages, backgrounds, and beliefs",
    te: "వయస్సులు, నేపథ్యాలు మరియు నమ్మకాలను దాటి ప్రజలను ఏకం చేయడం",
  },
  service: { en: "Service", te: "సేవ" },
  serviceDesc: {
    en: "Selflessly working to create joy and meaningful experiences for all",
    te: "అందరికీ ఆనందం మరియు అర్థవంతమైన అనుభవాలను సృష్టించడానికి నిస్వార్థంగా పనిచేయడం",
  },
  closingBlessing: {
    en: "May Lord Ganesha bless you with wisdom, prosperity, and happiness",
    te: "గణేశుడు మిమ్మల్ని జ్ఞానం, సంపద మరియు సంతోషంతో ఆశీర్వదించుగాక",
  },
  visitUsDuringFestival: { en: "Visit Us During the Festival", te: "పండుగ సమయంలో మమ్మల్ని సందర్శించండి" },
  visitUsText: {
    en: "We welcome everyone to join us in celebrating Ganesh Chaturthi. Come experience the devotion, culture, and community spirit.",
    te: "వినాయక చవితి జరుపుకోవడంలో మాతో చేరడానికి మేము అందరినీ స్వాగతిస్తున్నాము. భక్తి, సంస్కృతి మరియు సామాజిక స్ఫూర్తిని అనుభవించండి.",
  },
  followUs: { en: "Follow Us", te: "మమ్మల్ని అనుసరించండి" },
  stayConnected: {
    en: "Stay connected with our festival updates and celebrations",
    te: "మా పండుగ నవీకరణలు మరియు వేడుకలతో అనుసంధానంగా ఉండండి",
  },
  getInTouch: { en: "Get in touch with us for any queries or information about the festival", te: "పండుగ గురించి ఏవైనా ప్రశ్నలు లేదా సమాచారం కోసం మాతో సంప్రదించండి" },
  
  // Gallery Page
  galleryPageTitle: { en: "Festival Gallery", te: "పండుగ గ్యాలరీ" },
  galleryPageSubtitle: {
    en: "Relive the beautiful moments and divine Ganesh idols of our celebrations",
    te: "మా వినాయక చవితి వేడుకలు మరియు దివ్య విగ్రహాల అందమైన క్షణాలను వీక్షించండి",
  },
  allPhotos: { en: "All Photos", te: "అన్ని ఫోటోలు" },
  yearlyIdols: { en: "Yearly Idols", te: "గణపతి విగ్రహాలు" },
  logoInauguration: { en: "Logo Inauguration", te: "లోగో ప్రారంభోత్సవం" },
  celebrations: { en: "Celebrations", te: "వేడుకలు" },
  noPhotosYet: { en: "No photos in this category yet. Check back soon!", te: "ఈ వర్గంలో ఇంకా ఫోటోలు లేవు. త్వరలో తిరిగి చూడండి!" },
  uploadPhotos: { en: "Upload photos to see them here", te: "వాటిని ఇక్కడ చూడటానికి ఫోటోలను అప్‌లోడ్ చేయండి" },

  // Cinematic Committee Slider
  "committee.cinematic.title": { en: "Our Committee", te: "మన కమిటీ" },
  "committee.cinematic.subtitle": { en: "The youth force behind the celebration", te: "ఉత్సవాల వెనుక ఉన్న యువశక్తి" },
  "committee.cinematic.castLine": { en: "SRP KURROLLU • SRUNGARAPURAM • SINCE 2007", te: "SRP కుర్రోళ్ళు • శృంగారాపురం • 2007 నుండి" },
  "committee.cinematic.member": { en: "COMMITTEE MEMBER", te: "కమిటీ సభ్యుడు" },
  "committee.cinematic.scrollHint": { en: "Swipe to Explore", te: "స్వైప్ చేయండి" },
  "committee.cinematic.gridTitle": { en: "The Full Committee", te: "కమిటీ సభ్యులందరూ" },
  "committee.cinematic.gridSubtitle": { en: "23 members. One family. Infinite devotion.", te: "23 మంది సభ్యులు • ఒకే కుటుంబం • అపారమైన భక్తి" },
} satisfies Record<string, Bilingual>;

const LanguageContext = createContext<Ctx | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "te" || saved === "en") setLangState(saved);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang === "te" ? "te" : "en";
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    window.localStorage.setItem(STORAGE_KEY, l);
  }, []);

  const value = useMemo<Ctx>(
    () => ({
      lang,
      setLang,
      b: (v: Bilingual) => v[lang],
      t: (key) => dictionary[key][lang],
    }),
    [lang, setLang],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used inside LanguageProvider");
  return ctx;
}
