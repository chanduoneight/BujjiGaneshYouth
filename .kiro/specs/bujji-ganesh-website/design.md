# Design Document: Bujji Ganesh Youth Festival Website

## Overview

This design document describes the architecture and implementation for a bilingual (English/Telugu) festival website built with TanStack Start v1.168. The website provides information about a 10-day Ganesha festival through 8 main routes, leveraging pre-built components and a saffron/maroon/cream/gold design system.

## Architecture

### Technology Stack

- **Framework**: TanStack Start v1.168 (file-based routing with React)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom design system
- **State Management**: React Context (for language preference)
- **Data Storage**: Client-side localStorage (for language preference)
- **Calendar Integration**: ICS file generation + Google Calendar links

### Project Structure

```
src/
├── routes/                    # TanStack Start file-based routes
│   ├── index.tsx             # Homepage (/)
│   ├── about.tsx             # About page (/about)
│   ├── schedule.tsx          # Schedule page (/schedule)
│   ├── events.tsx            # Events page (/events)
│   ├── gallery.tsx           # Gallery page (/gallery)
│   ├── committee.tsx         # Committee page (/committee)
│   ├── announcements.tsx     # Announcements page (/announcements)
│   └── contact.tsx           # Contact page (/contact)
├── components/
│   └── site/                 # Site-specific components
│       ├── SiteLayout.tsx    # Main layout with nav/footer
│       ├── PageHero.tsx      # Page header component
│       ├── Countdown.tsx     # Festival countdown
│       ├── EventCard.tsx     # Event display card
│       ├── MemberCard.tsx    # Committee member card
│       ├── GalleryGrid.tsx   # Photo gallery grid
│       └── ProgramTimeline.tsx # Daily schedule timeline
├── data/
│   ├── festival.ts           # Festival configuration & committee data
│   └── content.ts            # Events, announcements, gallery data
├── i18n/
│   └── language.tsx          # Bilingual system context & hooks
└── lib/
    └── utils.ts              # Utility functions
```

## Component Architecture

### Layout Component Hierarchy

```
SiteLayout
├── AnnouncementBar (top banner)
├── Navbar (desktop navigation)
├── main (page content)
│   └── [Route Component]
│       └── PageHero (page header)
│           └── [Route-specific content]
├── Footer (site footer)
└── BottomNav (mobile navigation)
```

### Bilingual System

The website uses React Context to manage language preference:

**Hook**: `useLang()` from `@/i18n/language.tsx`

**API**:
- `lang: "en" | "te"` - Current language
- `setLang(lang)` - Change language (persists to localStorage)
- `b(bilingualObject)` - Extract current language from `{ en: string, te: string }`
- `t(dictionaryKey)` - Look up UI string from built-in dictionary

**Storage**: Language preference is stored in localStorage under key `"bgy-lang"`

**Type**: All content data uses the `Bilingual` type:
```typescript
type Bilingual = { en: string; te: string };
```

## Data Model

### Festival Configuration (`festival.ts`)

```typescript
// Core festival data
festival: {
  festivalName: Bilingual
  committeeTitle: Bilingual
  committeeName: Bilingual
  villageName: Bilingual
  year: number
  startDate: string (ISO 8601 with +05:30 timezone)
  endDate: string
  totalDays: number (10)
  location: Bilingual
  description: Bilingual
}

// Contact information
contact: {
  phone: string
  whatsapp: string
  email: string
  address: Bilingual
  mapsUrl: string
  instagram: string
  facebook: string
  youtube: string
}

// Committee members
CommitteeMember: {
  id: string
  name: Bilingual
  role: Bilingual
  photo?: string
  phone?: string
  whatsapp?: string
  description: Bilingual
}

committeeMembers: CommitteeMember[] (8 members)

responsibilities: Array<{
  id: string
  label: Bilingual
  text: Bilingual
}> (8 responsibilities)
```

### Content Data (`content.ts`)

```typescript
// Events
FestivalEvent: {
  id: string
  title: Bilingual
  category: "pooja" | "cultural" | "community" | "special"
  date: string (ISO 8601 with +05:30 timezone)
  time: Bilingual
  location: Bilingual
  description: Bilingual
  image: string
  durationMinutes: number
}

events: FestivalEvent[] (5 events)

// Announcements
Announcement: {
  id: string
  title: Bilingual
  category: "important" | "pooja" | "events" | "volunteers" | "community" | "general"
  date: string
  description: Bilingual
  important: boolean
}

announcements: Announcement[] (5 announcements)

// Gallery
GalleryPhoto: {
  id: string
  image: string
  title: Bilingual
  category: "ganesha" | "pooja" | "decorations" | "cultural" | "community" | "procession" | "visarjan" | "village"
  date: string
}

gallery: GalleryPhoto[] (8 photos)

// Daily Program
ProgramItem: {
  time: Bilingual
  minutes: number (minutes from midnight)
  title: Bilingual
}

dailyProgram: Record<"morning" | "afternoon" | "evening" | "night", ProgramItem[]>
```

## Route Designs

### 1. Homepage Route (`/`)

**File**: `src/routes/index.tsx`

**Purpose**: Landing page showcasing festival overview, countdown, highlights, today's program, event preview, announcements, gallery preview, and committee preview.

**Layout Structure**:
```typescript
<SiteLayout>
  <PageHero 
    kicker={t("namah")} 
    title={t("heroHeadline")} 
    subtitle={t("heroSupport")} 
  />
  <HeroActions /> // CTA buttons for schedule & gallery
  <Countdown />
  <HighlightsSection /> // Grid of 4 highlight cards
  <TodaysProgramSection /> // Daily schedule timeline
  <EventsPreviewSection /> // 3 EventCards
  <AnnouncementsSection /> // Latest 3 announcements
  <GalleryPreviewSection /> // GalleryGrid with 4-6 photos
  <CommitteePreviewSection /> // 4 MemberCards
</SiteLayout>
```

**Data Sources**:
- `festival` from `@/data/festival.ts` - Festival name, dates, description
- `highlights` from `@/data/content.ts` - Feature highlights
- `dailyProgram` from `@/data/content.ts` - Today's schedule
- `events` from `@/data/content.ts` - Upcoming events (slice first 3)
- `announcements` from `@/data/content.ts` - Recent announcements (slice first 3)
- `gallery` from `@/data/content.ts` - Photo preview (slice first 6)
- `committeeMembers` from `@/data/festival.ts` - Committee preview (slice first 4)

**State Management**:
- Uses `useLang()` hook for bilingual content rendering
- No local state required (all data is static)

**User Interactions**:
- Click CTA buttons → Navigate to `/schedule` or `/gallery`
- Click EventCard "View Details" → Opens event dialog (handled by EventCard component)
- Click announcement → Navigate to `/announcements`
- Click gallery photo → Opens lightbox (handled by GalleryGrid component)
- Click "View Full Gallery" → Navigate to `/gallery`
- Click "View Full Committee" → Navigate to `/committee`

### 2. About Route (`/about`)

**File**: `src/routes/about.tsx`

**Purpose**: Devotional information about Lord Ganesha and the festival's spiritual significance.

**Layout Structure**:
```typescript
<SiteLayout>
  <PageHero 
    title={t("aboutTitle")} 
    subtitle={b(festival.description)} 
  />
  <ContentSection>
    <GaneshaSymbolismContent /> // Educational content about Ganesha
    <FestivalSignificanceContent /> // Cultural and spiritual importance
  </ContentSection>
</SiteLayout>
```

**Content Areas**:
1. **Ganesha Symbolism Section**:
   - Elephant head symbolism
   - Mouse vahana meaning
   - Modak significance
   - Broken tusk story

2. **Festival Significance Section**:
   - Historical context
   - Community importance
   - Cultural traditions
   - Village celebration meaning

**Data Sources**:
- `festival.description` from `@/data/festival.ts`
- Static bilingual content (defined in component)

**State Management**:
- Uses `useLang()` hook for bilingual rendering
- No local state

### 3. Schedule Route (`/schedule`)

**File**: `src/routes/schedule.tsx`

**Purpose**: Display complete 10-day festival schedule with daily programs.

**Layout Structure**:
```typescript
<SiteLayout>
  <PageHero 
    title={t("schedule")} 
    subtitle={`${festival.totalDays} ${t("days")} • ${festivalDateRange}`} 
  />
  <ScheduleContainer>
    {Array.from({ length: festival.totalDays }).map((_, dayIndex) => (
      <DayCard key={dayIndex}>
        <DayHeader day={dayIndex + 1} date={getDateForDay(dayIndex)} />
        <ProgramTimeline highlightMinutes={getCurrentMinutes(dayIndex)} />
      </DayCard>
    ))}
  </ScheduleContainer>
</SiteLayout>
```

**Data Sources**:
- `festival.startDate`, `festival.totalDays` from `@/data/festival.ts`
- `dailyProgram` from `@/data/content.ts` - Daily schedule template (shared across all days)
- `dayParts` from `@/data/content.ts` - Day part labels (morning, afternoon, evening, night)

**State Management**:
- Uses `useLang()` hook
- No local state (date calculations are derived)

**Helper Functions**:
```typescript
// Calculate date for a specific festival day
function getDateForDay(dayIndex: number): Date {
  const start = new Date(festival.startDate);
  return new Date(start.getTime() + dayIndex * 86400000);
}

// Get current minutes from midnight (for highlighting current/upcoming program)
function getCurrentMinutes(dayIndex: number): number | undefined {
  const dayDate = getDateForDay(dayIndex);
  const now = new Date();
  if (dayDate.toDateString() === now.toDateString()) {
    return now.getHours() * 60 + now.getMinutes();
  }
  return undefined;
}
```

**Visual Design**:
- Each day is displayed in a card with gradient border
- ProgramTimeline component shows 4 time blocks (morning, afternoon, evening, night)
- Current/upcoming program items are highlighted with saffron gradient dot
- Past items use muted gray dot

### 4. Events Route (`/events`)

**File**: `src/routes/events.tsx`

**Purpose**: Display all festival events with calendar integration (ICS download + Google Calendar).

**Layout Structure**:
```typescript
<SiteLayout>
  <PageHero 
    title={t("events")} 
    subtitle={`${events.length} ${t("events")}`} 
  />
  <EventsGrid>
    {events.map(event => (
      <EventCard 
        key={event.id} 
        event={event} 
        showCalendar={true} 
      />
    ))}
  </EventsGrid>
</SiteLayout>
```

**Data Sources**:
- `events` from `@/data/content.ts` - All festival events

**State Management**:
- Uses `useLang()` hook
- EventCard component manages dialog state internally
- No route-level state

**Calendar Integration**:

The EventCard component handles calendar functionality:

1. **ICS File Generation** (handled in EventCard):
```typescript
function generateICS(event: FestivalEvent, title: string, location: string, description: string): string {
  const start = new Date(event.date);
  const end = new Date(start.getTime() + event.durationMinutes * 60000);
  
  // Format: YYYYMMDDTHHmmssZ
  const formatICSDate = (date: Date) => 
    date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  
  const icsContent = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Bujji Ganesh Youth//Festival//EN",
    "BEGIN:VEVENT",
    `UID:${event.id}@bujjiganeshyouth`,
    `DTSTAMP:${formatICSDate(new Date())}`,
    `DTSTART:${formatICSDate(start)}`,
    `DTEND:${formatICSDate(end)}`,
    `SUMMARY:${title}`,
    `LOCATION:${location}`,
    `DESCRIPTION:${description}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  
  return `data:text/calendar;charset=utf-8,${encodeURIComponent(icsContent)}`;
}
```

2. **Google Calendar Link** (alternative implementation):
```typescript
function generateGoogleCalendarURL(event: FestivalEvent, title: string, location: string, description: string): string {
  const start = new Date(event.date);
  const end = new Date(start.getTime() + event.durationMinutes * 60000);
  
  // Format: YYYYMMDDTHHmmss
  const formatGoogleDate = (date: Date) => 
    date.toISOString().replace(/[-:]/g, "").split(".")[0];
  
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: title,
    dates: `${formatGoogleDate(start)}/${formatGoogleDate(end)}`,
    details: description,
    location: location,
  });
  
  return `https://www.google.com/calendar/render?${params.toString()}`;
}
```

**Event Detail Dialog** (managed by EventCard):
- Full-size event image
- Date, time, location details
- Full description
- ICS download button
- Google Calendar button (opens in new tab)

### 5. Gallery Route (`/gallery`)

**File**: `src/routes/gallery.tsx`

**Purpose**: Photo gallery with category filtering and lightbox viewing.

**Layout Structure**:
```typescript
<SiteLayout>
  <PageHero 
    title={t("galleryTitle")} 
    subtitle={t("gallerySubtitle")} 
  />
  <CategoryFilter 
    categories={galleryCategories} 
    selected={selectedCategory} 
    onSelect={setSelectedCategory} 
  />
  <GalleryGrid photos={filteredPhotos} />
</SiteLayout>
```

**Data Sources**:
- `gallery` from `@/data/content.ts` - All gallery photos
- `galleryCategories` from `@/data/content.ts` - Category filter options

**State Management**:
```typescript
const [selectedCategory, setSelectedCategory] = useState<"all" | GalleryCategory>("all");

const filteredPhotos = useMemo(() => {
  if (selectedCategory === "all") return gallery;
  return gallery.filter(photo => photo.category === selectedCategory);
}, [selectedCategory]);
```

**Category Filter Component**:
```typescript
function CategoryFilter({ 
  categories, 
  selected, 
  onSelect 
}: { 
  categories: Array<{ id: string; label: Bilingual }>;
  selected: string;
  onSelect: (id: string) => void;
}) {
  const { b } = useLang();
  
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {categories.map(cat => (
        <button
          key={cat.id}
          onClick={() => onSelect(cat.id)}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-medium transition-colors",
            selected === cat.id
              ? "gradient-saffron text-primary-foreground"
              : "bg-muted text-muted-foreground hover:bg-accent"
          )}
        >
          {b(cat.label)}
        </button>
      ))}
    </div>
  );
}
```

**Lightbox Functionality** (handled by GalleryGrid):
- Click photo → Opens lightbox dialog with full-size image
- Previous/Next navigation arrows (cycles through filtered photos)
- Close button
- Photo title and date display
- Keyboard navigation (ESC to close, arrow keys for navigation)

### 6. Committee Route (`/committee`)

**File**: `src/routes/committee.tsx`

**Purpose**: Display committee member information and organizational structure.

**Layout Structure**:
```typescript
<SiteLayout>
  <PageHero 
    title={t("meetCommittee")} 
    subtitle={t("committeeIntro")} 
  />
  <TeamSection>
    <SectionHeading>{t("ourTeam")}</SectionHeading>
    <MembersGrid>
      {committeeMembers.map(member => (
        <MemberCard key={member.id} member={member} />
      ))}
    </MembersGrid>
  </TeamSection>
  
  <ResponsibilitiesSection>
    <SectionHeading>{t("ourResponsibilities")}</SectionHeading>
    <ResponsibilitiesGrid>
      {responsibilities.map(resp => (
        <ResponsibilityCard key={resp.id}>
          <h3>{b(resp.label)}</h3>
          <p>{b(resp.text)}</p>
        </ResponsibilityCard>
      ))}
    </ResponsibilitiesGrid>
  </ResponsibilitiesSection>
  
  <MissionSection>
    <SectionHeading>{t("ourMission")}</SectionHeading>
    <MissionStatement>
      <blockquote>{t("missionText")}</blockquote>
      <cite>{t("committeeQuote")}</cite>
    </MissionStatement>
  </MissionSection>
</SiteLayout>
```

**Data Sources**:
- `committeeMembers` from `@/data/festival.ts` - All committee members (8)
- `responsibilities` from `@/data/festival.ts` - Committee responsibilities (8)

**State Management**:
- Uses `useLang()` hook
- No local state

**Member Card Interactions** (handled by MemberCard):
- Call button → Opens phone dialer (`tel:` link)
- WhatsApp button → Opens WhatsApp chat (opens in new tab)

### 7. Announcements Route (`/announcements`)

**File**: `src/routes/announcements.tsx`

**Purpose**: Display all festival announcements with category filtering.

**Layout Structure**:
```typescript
<SiteLayout>
  <PageHero 
    title={t("announcements")} 
    subtitle={`${announcements.length} ${t("announcements")}`} 
  />
  <CategoryFilter 
    categories={announcementCategories} 
    selected={selectedCategory} 
    onSelect={setSelectedCategory} 
  />
  <AnnouncementsList>
    {filteredAnnouncements.map(announcement => (
      <AnnouncementCard key={announcement.id} announcement={announcement} />
    ))}
  </AnnouncementsList>
</SiteLayout>
```

**Data Sources**:
- `announcements` from `@/data/content.ts` - All announcements
- `announcementCategories` from `@/data/content.ts` - Category filter options

**State Management**:
```typescript
const [selectedCategory, setSelectedCategory] = useState<"all" | AnnouncementCategory>("all");

const filteredAnnouncements = useMemo(() => {
  if (selectedCategory === "all") return announcements;
  return announcements.filter(ann => ann.category === selectedCategory);
}, [selectedCategory]);

// Sort by date (most recent first)
const sortedAnnouncements = useMemo(() => {
  return [...filteredAnnouncements].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}, [filteredAnnouncements]);
```

**AnnouncementCard Component**:
```typescript
function AnnouncementCard({ announcement }: { announcement: Announcement }) {
  const { b, lang } = useLang();
  
  const dateLabel = new Date(announcement.date).toLocaleDateString(
    lang === "te" ? "te-IN" : "en-IN",
    { day: "numeric", month: "long", year: "numeric" }
  );
  
  return (
    <article className={cn(
      "surface-card p-5",
      announcement.important && "border-l-4 border-primary"
    )}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            {announcement.important && (
              <span className="gradient-saffron text-primary-foreground px-2 py-0.5 text-xs font-semibold rounded-full">
                {t("important")}
              </span>
            )}
            <span className="text-muted-foreground text-xs">{dateLabel}</span>
          </div>
          <h3 className="text-maroon font-display text-lg font-semibold mt-2">
            {b(announcement.title)}
          </h3>
          <p className="text-foreground/80 mt-2 text-sm leading-relaxed">
            {b(announcement.description)}
          </p>
        </div>
      </div>
    </article>
  );
}
```

**Category Filter**: Reuses the same CategoryFilter component pattern from gallery route.

### 8. Contact Route (`/contact`)

**File**: `src/routes/contact.tsx`

**Purpose**: Display contact information and provide a contact form with client-side validation.

**Layout Structure**:
```typescript
<SiteLayout>
  <PageHero 
    title={t("contactTitle")} 
    subtitle={b(contact.address)} 
  />
  <ContactContainer>
    <ContactInfoSection>
      <LocationCard>
        <h3>{t("contactLocation")}</h3>
        <address>{b(contact.address)}</address>
        <Button asChild>
          <a href={contact.mapsUrl} target="_blank" rel="noopener noreferrer">
            {t("directions")}
          </a>
        </Button>
      </LocationCard>
      
      <ContactCard>
        <h3>{t("contact")}</h3>
        <ContactLink href={`tel:${contact.phone}`}>
          <Phone /> {contact.phone}
        </ContactLink>
        <ContactLink href={`https://wa.me/${contact.whatsapp}`}>
          <MessageCircle /> {t("whatsapp")}
        </ContactLink>
        <ContactLink href={`mailto:${contact.email}`}>
          <Mail /> {contact.email}
        </ContactLink>
      </ContactCard>
      
      <SocialCard>
        <h3>Social Media</h3>
        <SocialLinks>
          <SocialLink href={contact.instagram} aria-label="Instagram">
            <Instagram />
          </SocialLink>
          <SocialLink href={contact.facebook} aria-label="Facebook">
            <Facebook />
          </SocialLink>
          <SocialLink href={contact.youtube} aria-label="YouTube">
            <Youtube />
          </SocialLink>
        </SocialLinks>
      </SocialCard>
    </ContactInfoSection>
    
    <ContactFormSection>
      <ContactForm />
    </ContactFormSection>
  </ContactContainer>
</SiteLayout>
```

**Data Sources**:
- `contact` from `@/data/festival.ts` - All contact information

**Contact Form Component**:

```typescript
type FormData = {
  name: string;
  phone: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

function ContactForm() {
  const { t } = useLang();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = t("errName");
    }
    
    // Phone validation (10 digits)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone = t("errPhone");
    }
    
    // Message validation
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      newErrors.message = t("errMessage");
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Client-side only - no backend submission
      setSubmitted(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({ name: "", phone: "", message: "" });
        setSubmitted(false);
      }, 3000);
    }
  };
  
  const handleChange = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };
  
  if (submitted) {
    return (
      <div className="surface-card p-8 text-center">
        <CheckCircle className="text-primary mx-auto h-16 w-16" />
        <p className="text-foreground mt-4 text-lg font-medium">{t("sent")}</p>
      </div>
    );
  }
  
  return (
    <form onSubmit={handleSubmit} className="surface-card p-6 space-y-4">
      <div>
        <label htmlFor="name" className="text-foreground block text-sm font-medium mb-2">
          {t("name")}
        </label>
        <input
          id="name"
          type="text"
          value={formData.name}
          onChange={handleChange("name")}
          className={cn(
            "w-full px-4 py-2 rounded-lg border bg-background",
            errors.name ? "border-destructive" : "border-input"
          )}
        />
        {errors.name && (
          <p className="text-destructive mt-1 text-sm">{errors.name}</p>
        )}
      </div>
      
      <div>
        <label htmlFor="phone" className="text-foreground block text-sm font-medium mb-2">
          {t("phone")}
        </label>
        <input
          id="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange("phone")}
          className={cn(
            "w-full px-4 py-2 rounded-lg border bg-background",
            errors.phone ? "border-destructive" : "border-input"
          )}
        />
        {errors.phone && (
          <p className="text-destructive mt-1 text-sm">{errors.phone}</p>
        )}
      </div>
      
      <div>
        <label htmlFor="message" className="text-foreground block text-sm font-medium mb-2">
          {t("message")}
        </label>
        <textarea
          id="message"
          value={formData.message}
          onChange={handleChange("message")}
          rows={4}
          className={cn(
            "w-full px-4 py-2 rounded-lg border bg-background resize-none",
            errors.message ? "border-destructive" : "border-input"
          )}
        />
        {errors.message && (
          <p className="text-destructive mt-1 text-sm">{errors.message}</p>
        )}
      </div>
      
      <Button type="submit" className="w-full min-h-11 rounded-full">
        {t("send")}
      </Button>
    </form>
  );
}
```

**Validation Rules**:
- **Name**: Required, non-empty after trim
- **Phone**: Required, exactly 10 digits (spaces allowed but stripped for validation)
- **Message**: Required, minimum 10 characters after trim

**Form Behavior**:
- Real-time error clearing (errors clear when user starts typing in a field)
- Submit validation (all fields validated on submit)
- Success feedback (shows check icon + success message for 3 seconds)
- Auto-reset after success
- No backend submission (client-side validation only)

## Error Handling

### Data Loading Errors

Since all data is statically imported, there are no runtime data loading errors. TypeScript provides compile-time type safety for data structure validation.

### Form Validation Errors

Form validation errors are displayed inline with red text and red border on the invalid field. The error message is cleared when the user starts typing in that field.

### Route Not Found

TanStack Start handles 404 errors automatically. No custom error page is required for this implementation.

## Performance Considerations

### Image Optimization

- All images use `loading="lazy"` attribute for lazy loading
- Images are served from the `@/assets` directory (processed by Vite)
- Gallery images use responsive sizing based on column width

### Code Splitting

TanStack Start automatically code-splits by route, so each route is loaded only when accessed.

### Data Loading

All data is static and imported at build time, resulting in zero loading states and instant navigation.

### Memoization

Filter operations use `useMemo` to prevent unnecessary recalculations:
- Gallery filtering by category
- Announcement filtering by category and sorting by date

## Accessibility

### Semantic HTML

- All routes use semantic HTML5 elements (`<main>`, `<article>`, `<section>`, `<nav>`, `<footer>`)
- Proper heading hierarchy (h1 → h2 → h3)
- Form inputs have associated `<label>` elements with correct `htmlFor` attributes

### ARIA Labels

- Icon-only buttons have `aria-label` attributes
- Decorative elements have `aria-hidden="true"`
- Dialog components use proper ARIA roles and attributes

### Keyboard Navigation

- All interactive elements are keyboard accessible
- Focus states are visible (handled by design system)
- Dialogs trap focus and restore focus on close
- Lightbox supports arrow key navigation and ESC to close

### Screen Reader Support

- Alternative text for all images
- Form validation errors are announced via `aria-describedby` (implicit via input + error association)
- Live regions for dynamic content (countdown timer)

### Language Support

- `lang` attribute set on `<html>` element based on selected language
- Date formatting uses locale-aware `toLocaleDateString()` with "te-IN" or "en-IN"

## Design System Integration

### Color Scheme

The website uses CSS custom properties defined in `src/styles.css`:

- **Primary (Saffron)**: `--saffron` - Used for highlights, active states, CTAs
- **Secondary (Maroon)**: `--maroon` - Used for headings, emphasis
- **Background (Cream)**: `--cream` - Used for page backgrounds
- **Accent (Gold)**: `--gold` - Used for borders, decorative elements

### Gradient Classes

- `.gradient-saffron` - Saffron gradient background
- `.gradient-maroon` - Maroon gradient background with mandala pattern

### Component Classes

- `.surface-card` - Card surface with shadow and rounded corners
- `.mandala-bg` - Background with mandala pattern overlay
- `.shadow-lift` - Hover shadow effect
- `.shadow-gold` - Gold-tinted shadow

### Typography

- Font Display: `font-display` class (used for headings)
- Font sizes follow Tailwind's type scale
- Line heights are relaxed for better readability

## Testing Strategy

Testing follows the Fast Task workflow with property-based and example-based tests.

### Unit Tests

**Form Validation Logic** (`contact.tsx`):
- Example tests for specific validation cases (empty name, invalid phone format, short message)
- Edge case tests for boundary conditions (exactly 10 digits, whitespace-only inputs)

**Date Calculation Functions** (`schedule.tsx`):
- Example tests verifying date calculations for festival days
- Edge case tests for first and last day of festival

**ICS File Generation** (`EventCard.tsx`):
- Property tests for ICS file format correctness across various event data
- Example tests for specific event scenarios

### Integration Tests

**Route Rendering**:
- Each route has integration tests verifying:
  - SiteLayout wrapper is present
  - PageHero renders with correct content
  - Key sections/components are rendered
  - Bilingual content displays correctly in both languages

**Component Interactions**:
- EventCard dialog open/close
- GalleryGrid lightbox navigation
- Category filters update displayed content
- Form submission flow (validation → success → reset)

### Property-Based Tests

Following the prework analysis, these properties should be tested:

**Property 1: ICS File Format Validity**

*For any* valid `FestivalEvent` object, the generated ICS file SHALL contain all required VCALENDAR fields (VERSION, PRODID, VEVENT with UID, DTSTART, DTEND, SUMMARY, LOCATION, DESCRIPTION) in valid iCalendar format.

**Validates: Requirements 4.6**

**Property 2: Announcement Filtering Correctness**

*For any* selected announcement category and announcement dataset, all filtered results SHALL match the selected category, and when category is "all", all announcements SHALL be included.

**Validates: Requirements 7.5, 7.6**

**Property 3: Form Validation Rejects Invalid Input**

*For any* form data where name is empty OR phone is not 10 digits OR message length is less than 10 characters, the form validation SHALL return false and display appropriate error messages.

**Validates: Requirements 8.9**

**Property 4: Bilingual Function Returns Correct Language**

*For any* `Bilingual` object `{ en: string, te: string }` and current language setting ("en" or "te"), the `b()` function SHALL return the value corresponding to the current language.

**Validates: Requirements 10.1-10.11**

**Property 5: Gallery Filtering Correctness**

*For any* selected gallery category and gallery photo dataset, all filtered results SHALL match the selected category, and when category is "all", all photos SHALL be included.

**Validates: Requirements 5.3, 5.4**

## Deployment Considerations

### Build Configuration

TanStack Start uses Vite for building. The build process:
1. Type-checks all TypeScript files
2. Bundles routes with code-splitting
3. Processes and optimizes images
4. Generates route tree
5. Outputs static assets to `dist/`

### Environment Variables

No environment variables are required for this implementation. All configuration is in `festival.ts` and can be updated annually.

### Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge) - last 2 versions
- Mobile browsers (iOS Safari, Chrome for Android)
- No IE11 support required

### CDN Integration

Static assets (images, fonts, compiled JS/CSS) should be served from a CDN for optimal performance.

## Maintenance and Updates

### Annual Updates

To update the festival for a new year, modify `src/data/festival.ts`:

```typescript
export const festival = {
  year: 2027, // Update year
  startDate: "2027-09-XX...", // Update dates
  endDate: "2027-09-YY...",
  // Other fields remain the same or update as needed
};
```

Update events in `src/data/content.ts` with new dates and details.

### Content Updates

- **Committee Members**: Update `committeeMembers` array in `festival.ts`
- **Events**: Update `events` array in `content.ts`
- **Announcements**: Update `announcements` array in `content.ts`
- **Gallery**: Update `gallery` array in `content.ts` with new photo imports

### Adding New Routes

To add a new route:
1. Create file in `src/routes/` (e.g., `donations.tsx`)
2. Import and use `SiteLayout` and `PageHero`
3. Add navigation link to `src/components/site/nav-links.ts`
4. Add translation keys to `src/i18n/language.tsx`

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: ICS File Format Validity

*For any* valid `FestivalEvent` object with a date, duration, title, location, and description, the generated ICS file content SHALL be a valid iCalendar format containing all required fields (BEGIN:VCALENDAR, VERSION:2.0, PRODID, BEGIN:VEVENT, UID, DTSTAMP, DTSTART, DTEND, SUMMARY, LOCATION, DESCRIPTION, END:VEVENT, END:VCALENDAR) with properly formatted ISO timestamps.

**Validates: Requirements 4.6**

### Property 2: Announcement Category Filter Correctness

*For any* selection of announcement category (including "all") and any set of announcements, the filtered results SHALL contain only announcements matching the selected category when a specific category is chosen, and SHALL contain all announcements when "all" is selected.

**Validates: Requirements 7.5, 7.6**

### Property 3: Gallery Category Filter Correctness

*For any* selection of gallery category (including "all") and any set of gallery photos, the filtered results SHALL contain only photos matching the selected category when a specific category is chosen, and SHALL contain all photos when "all" is selected.

**Validates: Requirements 5.3, 5.4**

### Property 4: Contact Form Validation Rejects Invalid Input

*For any* form submission where the name field is empty or whitespace-only OR the phone field does not contain exactly 10 digits OR the message field is shorter than 10 characters, the validation function SHALL return false and generate appropriate error messages for each invalid field.

**Validates: Requirements 8.9**

### Property 5: Bilingual Content Extraction Correctness

*For any* bilingual object containing both English (`en`) and Telugu (`te`) string values, and for any valid language setting ("en" or "te"), the bilingual extraction function `b()` SHALL return the string value corresponding to the current language setting.

**Validates: Requirements 10.1-10.11**

### Property 6: Event Date Calculation Preserves Day Offset

*For any* festival day index between 0 and `totalDays - 1`, the calculated date for that day SHALL be exactly `dayIndex` days after the festival start date, maintaining the correct timezone offset.

**Validates: Requirements 3.3, 3.5**

### Property 7: Form Field Error Clearing on Input Change

*For any* form field with an existing validation error, when the user modifies the content of that field, the error message for that specific field SHALL be cleared while preserving errors for other fields.

**Validates: Requirements 8.9**

---

*This design document provides the architectural foundation for implementing all 8 routes of the Bujji Ganesh Youth Festival Website using TanStack Start v1.168, existing components, and the established design system.*
