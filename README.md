# 🕉️ Bujji Ganesh Youth — SRP Committee Kurrollu

> **Official Web Application for Bujji Ganesh Youth (SRP Committee Kurrollu) — Ganesh Chaturthi Celebrations at Community Hall, Srungarapuram (Since 2007).**

[![React](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev/)
[![TanStack Router](https://img.shields.io/badge/TanStack-Router%20%26%20Start-emerald.svg)](https://tanstack.com/router)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS%20v4-38B2AC.svg)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF.svg)](https://vitejs.dev/)

---

## 📖 Overview

**Bujji Ganesh Youth (SRP Committee Kurrollu)** is a devotional and cultural portal commemorating **19+ years (2007 – 2026)** of unbroken Ganesh Chaturthi celebrations at the sacred **Community Hall, Srungarapuram**.

The website features immersive animations, seamless bilingual Telugu/English localization, dedicated devotional music on every page, interactive festival schedules, an annual memory gallery, and a blockbuster cinematic committee showcase featuring the 21 pillars of the committee.

---

## ✨ Key Highlights & Features

### 1. 👥 Pure Cinematic Committee Showcase (`/committee`)
- **Cinematic Member Slider**: Full-screen cinematic presentation of all 21 committee members with smooth transitions.
- **Blockbuster Movie Title Typography**: Telugu & English name title reveals inspired by high-impact visual aesthetics.
- **Real-time Audio Spectrum Visualizer**: Live Web Audio API canvas visualizer synchronized with the official committee anthem (*Sai Abhyankar • Karuppu God Mode BGM*).
- **Interactive 21-Member Grid**: Interactive cards with quick-reveal badges and direct navigation to individual profiles.

### 2. 🌐 Full Bilingual Experience (Telugu & English)
- Instant one-click language switcher (`EN` / `TE`) with persistent storage.
- First-class Telugu typography featuring Google Fonts (`Ramabhadra`, `Noto Serif Telugu`, `Noto Sans Telugu`) with unclipped glyphs and proper line-height for conjunct characters.

### 3. 🎵 Devotional Audio Experience
Every page features a dedicated soundtrack tailored to its mood:
| Page | Route | Soundtrack |
|---|---|---|
| **Home** | `/` | *Ganesh Aarti* |
| **About Us** | `/about` | *Ekadantaya Vakratundaya (Flute)* |
| **Events & Schedule** | `/events` | *Om Namah Shivaya (Devotional Mix)* |
| **Photo Gallery** | `/gallery` | *Jai Dev Jai Dev Aarti* |
| **Committee** | `/committee` | *Karuppu God Mode (SRP Committee Anthem)* |
| **Contact Us** | `/contact` | *Ekadantaya Vakratundaya (Flute)* |

### 4. 🪔 Sacred Devotional Animations & Micro-Interactions
- **Ganesha Sketch Loader**: Dynamic SVGs illustrating Lord Ganesha drawing on every page route transition.
- **Rotating Sacred Orbits**: Ambient background mandala wheel with gentle pulsing gold glow.
- **Devotional Petal Showers**: Realistic floating Marigold, Hibiscus, and Durva grass petals.
- **Mushak Footer Glide**: Lord Ganesha's vehicle (Mushak) gracefully glides across the bottom footer on scroll.

### 5. 📅 Event Timelines & Festival Gallery
- Interactive 11-day program schedule with muhurat countdowns and Add-to-Calendar integration.
- Categorized memory gallery for annual idols, celebrations, and ceremonies.

---

## 🛠️ Technology Stack

- **Framework**: [TanStack Start](https://tanstack.com/start) & [TanStack Router](https://tanstack.com/router)
- **UI Library**: [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with OKLCH festival color tokens (saffron, maroon, gold, cream)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Bundler & Dev Server**: [Vite 8](https://vitejs.dev/)
- **Hosting / Deployments**: Cloudflare Pages / Vercel compatible

---

## 📁 Project Architecture

```
Bujji_Ganesh_Youth/
├── public/
│   ├── audio/              # Dedicated audio tracks for each route
│   └── gallery/            # Festival photos & media
├── src/
│   ├── assets/             # Member cutout portraits & brand images
│   ├── components/
│   │   ├── committee/      # CinematicMemberSlider, CommitteeGrid, RealtimeAudioWaveform
│   │   ├── effects/        # GaneshaSketchLoader, DevotionalPetals, SacredOrbits
│   │   ├── layout/         # Header, Navigation, LanguageToggle
│   │   └── site/           # Footer, PageMusicPlayer, EventCard
│   ├── data/
│   │   ├── content.ts      # Announcements, FAQs, timeline data
│   │   ├── festival.ts     # Core festival muhurat, dates & bilingual dictionary
│   │   ├── gallery.ts      # Categorized photos and album lists
│   │   └── members.ts      # 21 Committee members (Telugu & English details)
│   ├── i18n/
│   │   └── language.tsx    # Context-based bilingual translation engine
│   ├── routes/             # TanStack file-based routes
│   │   ├── __root.tsx      # Root shell with global audio, fonts & effects
│   │   ├── index.tsx       # Homepage
│   │   ├── about.tsx       # 19+ Years History & Significance
│   │   ├── events.tsx      # Festival Schedule & Daily Programs
│   │   ├── gallery.tsx     # Memory & Idol Gallery
│   │   ├── committee.tsx   # Cinematic Committee Page
│   │   └── contact.tsx     # Location & Contact Info
│   ├── routeTree.gen.ts    # Auto-generated TanStack route tree
│   └── styles.css          # Design tokens, custom keyframe animations & typography
├── package.json
└── vite.config.ts
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18.0 or newer)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/chanduoneight/BujjiGaneshYouth.git
   cd BujjiGaneshYouth/Bujji_Ganesh_Youth
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

4. Build for production:
   ```bash
   npm run build
   ```

---

## 👨‍💻 Developer & Credits

Designed and developed with devotion by **Vaka Chandu**.

- **LinkedIn**: [linkedin.com/in/chandu-vaka-430a36289](https://www.linkedin.com/in/chandu-vaka-430a36289/)
- **Organization**: Bujji Ganesh Youth — SRP Committee Kurrollu
- **Location**: Srungarapuram Village, Duggirala Mandal, Guntur District, Andhra Pradesh

---

## 🙏 श्री గణేశాయ నమః | Ganpati Bappa Morya!
