/**
 * Gallery images configuration
 */

export type GalleryCategory = "idols" | "celebrations" | "logo";

export type GalleryItem = {
  id: string;
  category: GalleryCategory;
  src: string;
  alt: string;
  title: { en: string; te: string };
  year?: number;
};

export const galleryItems: GalleryItem[] = [
  // Every Year Ganesh Idols (2026 down to 2020)
  {
    id: "ganesh-idol-2026",
    category: "idols",
    src: "/assets/2026.jpeg",
    alt: "Lord Ganesha Idol 2026 - Bujji Ganesh Youth",
    title: {
      en: "Ganesh Idol 2026",
      te: "శ్రీ గణపతి విగ్రహం 2026",
    },
    year: 2026,
  },
  {
    id: "ganesh-idol-2025",
    category: "idols",
    src: "/assets/2025.jpeg",
    alt: "Lord Ganesha Idol 2025 - Bujji Ganesh Youth",
    title: {
      en: "Ganesh Idol 2025",
      te: "శ్రీ గణపతి విగ్రహం 2025",
    },
    year: 2025,
  },
  {
    id: "ganesh-idol-2024",
    category: "idols",
    src: "/assets/2024.jpeg",
    alt: "Lord Ganesha Idol 2024 - Bujji Ganesh Youth",
    title: {
      en: "Ganesh Idol 2024",
      te: "శ్రీ గణపతి విగ్రహం 2024",
    },
    year: 2024,
  },
  {
    id: "ganesh-idol-2023",
    category: "idols",
    src: "/assets/2023.jpeg",
    alt: "Lord Ganesha Idol 2023 - Bujji Ganesh Youth",
    title: {
      en: "Ganesh Idol 2023",
      te: "శ్రీ గణపతి విగ్రహం 2023",
    },
    year: 2023,
  },
  {
    id: "ganesh-idol-2022",
    category: "idols",
    src: "/assets/2022.jpeg",
    alt: "Lord Ganesha Idol 2022 - Bujji Ganesh Youth",
    title: {
      en: "Ganesh Idol 2022",
      te: "శ్రీ గణపతి విగ్రహం 2022",
    },
    year: 2022,
  },
  {
    id: "ganesh-idol-2021",
    category: "idols",
    src: "/assets/2021.jpeg",
    alt: "Lord Ganesha Idol 2021 - Bujji Ganesh Youth",
    title: {
      en: "Ganesh Idol 2021",
      te: "శ్రీ గణపతి విగ్రహం 2021",
    },
    year: 2021,
  },
  {
    id: "ganesh-idol-2020",
    category: "idols",
    src: "/assets/2020.jpeg",
    alt: "Lord Ganesha Idol 2020 - Bujji Ganesh Youth",
    title: {
      en: "Ganesh Idol 2020",
      te: "శ్రీ గణపతి విగ్రహం 2020",
    },
    year: 2020,
  },

  // Celebrations
  {
    id: "celebration-ganesha-darshan",
    category: "celebrations",
    src: "/gallery/celebrations/ganesha-darshan.jpg",
    alt: "Lord Ganesha Sthapana & Divine Darshan",
    title: {
      en: "Lord Ganesha Divine Darshan",
      te: "శ్రీ గణపతి దివ్య దర్శనం",
    },
    year: 2026,
  },
  {
    id: "celebration-village-pandal",
    category: "celebrations",
    src: "/gallery/celebrations/village-pandal.jpg",
    alt: "Grand Festival Pandal & Mandapam",
    title: {
      en: "Grand Village Pandal & Mandapam",
      te: "గ్రామ వినాయక పందిరి మరియు వేదిక",
    },
    year: 2026,
  },
  {
    id: "celebration-maha-aarti",
    category: "celebrations",
    src: "/gallery/celebrations/maha-aarti.jpg",
    alt: "Maha Aarti & Deepotsavam Ceremony",
    title: {
      en: "Maha Aarti & Deepotsavam",
      te: "మహా హారతి మరియు దీపోత్సవం",
    },
    year: 2026,
  },
  {
    id: "celebration-cultural-programs",
    category: "celebrations",
    src: "/gallery/celebrations/cultural-programs.jpg",
    alt: "Evening Cultural & Folk Performances",
    title: {
      en: "Cultural Programs & Folk Performances",
      te: "సాంస్కృతిక కార్యక్రమాలు మరియు నృత్యాలు",
    },
    year: 2026,
  },

  // Logo Inauguration
  {
    id: "logo-inauguration-2026",
    category: "logo",
    src: "/gallery/logo-inauguration/logo-inauguration.jpg",
    alt: "Official Logo Inauguration 2026 - Bujji Ganesh Youth",
    title: {
      en: "Official Logo Inauguration Ceremony",
      te: "అధికారిక లోగో ప్రారంభోత్సవం",
    },
    year: 2026,
  },
];
