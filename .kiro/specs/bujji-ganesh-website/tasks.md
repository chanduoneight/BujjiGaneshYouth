# Implementation Plan: Bujji Ganesh Youth Festival Website

## Overview

This implementation plan breaks down the development of 8 routes for a bilingual (English/Telugu) festival website built with TanStack Start v1.168 and TypeScript. Each route leverages pre-built components (SiteLayout, PageHero, EventCard, MemberCard, GalleryGrid, ProgramTimeline, Countdown) and a bilingual system using the `useLang()` hook. The site uses a saffron/maroon/cream/gold design system with data imported from `@/data/festival.ts` and `@/data/content.ts`.

## Tasks

- [ ] 1. Create missing components and utilities
  - [ ] 1.1 Create PageHero component
    - Implement PageHero component at `src/components/site/PageHero.tsx`
    - Accept props: kicker (optional), title, subtitle (optional)
    - Use design system classes for styling with saffron/maroon gradients
    - Support bilingual text via useLang() hook
    - _Requirements: 1.2, 2.2, 3.2, 4.2, 5.2, 6.2, 7.2, 8.2_
  
  - [ ] 1.2 Create CategoryFilter component
    - Implement reusable CategoryFilter component at `src/components/site/CategoryFilter.tsx`
    - Accept props: categories array, selected value, onSelect callback
    - Use button pills with gradient-saffron for selected state
    - Support bilingual category labels via useLang() hook
    - _Requirements: 7.4, 7.5, 7.6_
  
  - [ ] 1.3 Create calendar utility functions
    - Implement ICS file generation function in `src/lib/calendar.ts`
    - Implement Google Calendar URL generation function in `src/lib/calendar.ts`
    - Both functions accept FestivalEvent and bilingual strings (title, location, description)
    - Generate proper ISO 8601 formatted dates with timezone handling
    - _Requirements: 4.5, 4.6, 4.7, 4.8_

- [ ] 2. Implement homepage route (/)
  - [ ] 2.1 Create homepage route component
    - Create `src/routes/index.tsx` with all required sections
    - Wrap content in SiteLayout component
    - Display PageHero with kicker, title, and subtitle using translation keys
    - Add hero CTA buttons for schedule and gallery navigation
    - Display Countdown component
    - Create highlights section with 4 highlight cards
    - Display today's program using ProgramTimeline component
    - Display event preview with first 3 events using EventCard components
    - Display announcements section with latest 3 announcements
    - Display gallery preview using GalleryGrid with first 6 photos
    - Display committee preview with first 4 members using MemberCard components
    - Import data from `@/data/festival.ts` and `@/data/content.ts`
    - Use useLang() hook for bilingual content rendering
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 1.10, 9.1, 10.1_
  
  - [ ]* 2.2 Write unit tests for homepage route
    - Test SiteLayout wrapper is present
    - Test PageHero renders with correct props
    - Test all major sections render (Countdown, highlights, program, events, announcements, gallery, committee)
    - Test correct data slicing for previews (first 3 events, first 3 announcements, first 6 gallery items, first 4 members)
    - Test bilingual content displays correctly in both languages
    - _Requirements: 1.1-1.10_

- [ ] 3. Implement about route (/about)
  - [ ] 3.1 Create about route component
    - Create `src/routes/about.tsx` with devotional content
    - Wrap content in SiteLayout component
    - Display PageHero with title and festival description subtitle
    - Create Ganesha Symbolism section with educational content about elephant head, mouse vahana, modak, and broken tusk
    - Create Festival Significance section with historical context and community importance
    - Use static bilingual content defined in component
    - Use useLang() hook for bilingual rendering
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 9.1, 10.2_
  
  - [ ]* 3.2 Write unit tests for about route
    - Test SiteLayout wrapper is present
    - Test PageHero renders with correct title
    - Test Ganesha Symbolism section renders
    - Test Festival Significance section renders
    - Test bilingual content displays correctly in both languages
    - _Requirements: 2.1-2.5_

- [ ] 4. Implement schedule route (/schedule)
  - [ ] 4.1 Create schedule route component with date calculations
    - Create `src/routes/schedule.tsx` displaying 10-day festival schedule
    - Wrap content in SiteLayout component
    - Display PageHero with schedule title and date range subtitle
    - Implement helper function `getDateForDay(dayIndex)` to calculate date from festival.startDate
    - Implement helper function `getCurrentMinutes(dayIndex)` to determine if day is today and return minutes from midnight
    - Create day cards for all 10 festival days using Array.from loop
    - Each day card displays day number, formatted date, and ProgramTimeline component
    - Pass highlightMinutes prop to ProgramTimeline for current time highlighting
    - Import festival data from `@/data/festival.ts` (startDate, totalDays)
    - Import dailyProgram from `@/data/content.ts`
    - Use useLang() hook for bilingual rendering
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 9.1, 10.3_
  
  - [ ]* 4.2 Write unit tests for schedule route
    - Test SiteLayout wrapper is present
    - Test PageHero renders with correct subtitle showing total days
    - Test 10 day cards are rendered
    - Test getDateForDay calculates dates correctly for first, middle, and last day
    - Test getCurrentMinutes returns undefined for past/future days and minutes for current day
    - Test bilingual content displays correctly
    - _Requirements: 3.1-3.5_

- [ ] 5. Implement events route (/events) with calendar integration
  - [ ] 5.1 Create events route component
    - Create `src/routes/events.tsx` displaying all festival events
    - Wrap content in SiteLayout component
    - Display PageHero with events title and event count subtitle
    - Create events grid with EventCard components for all events
    - Pass showCalendar={true} prop to EventCard components
    - Import events data from `@/data/content.ts`
    - Use useLang() hook for bilingual rendering
    - _Requirements: 4.1, 4.2, 4.3, 9.1, 10.4_
  
  - [ ] 5.2 Enhance EventCard with calendar integration
    - Modify existing `src/components/site/EventCard.tsx` to add calendar features
    - Add event detail dialog with full-size image, date, time, location, description
    - Add ICS download button to dialog that calls generateICS utility and triggers download
    - Add Google Calendar button to dialog that opens Google Calendar link in new tab
    - Import calendar utilities from `@/lib/calendar.ts`
    - Use useLang() hook to get bilingual strings for title, location, description
    - Dialog opens when card is clicked, closes on close button click
    - _Requirements: 4.4, 4.5, 4.6, 4.7, 4.8, 4.9_
  
  - [ ]* 5.3 Write property test for ICS file generation
    - **Property 1: ICS File Format Validity**
    - **Validates: Requirements 4.6**
    - Test that for any valid FestivalEvent object, the generated ICS file contains all required VCALENDAR fields
    - Verify VERSION, PRODID, VEVENT with UID, DTSTART, DTEND, SUMMARY, LOCATION, DESCRIPTION are present
    - Verify date format is valid ISO 8601 without hyphens/colons
    - _Requirements: 4.6_
  
  - [ ]* 5.4 Write unit tests for events route and EventCard
    - Test SiteLayout wrapper is present
    - Test PageHero renders with event count
    - Test all events render as EventCard components
    - Test EventCard dialog opens and closes correctly
    - Test ICS download triggers with correct filename
    - Test Google Calendar link opens in new tab with correct URL
    - Test bilingual content in dialog displays correctly
    - _Requirements: 4.1-4.9_

- [ ] 6. Checkpoint - Ensure core routes are working
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 7. Implement gallery route (/gallery) with lightbox
  - [ ] 7.1 Create gallery route component with category filtering
    - Create `src/routes/gallery.tsx` with photo gallery and filtering
    - Wrap content in SiteLayout component
    - Display PageHero with gallery title and subtitle
    - Add state for selectedCategory (default "all")
    - Implement CategoryFilter component with galleryCategories from content.ts
    - Use useMemo to filter gallery photos based on selectedCategory
    - Display GalleryGrid component with filtered photos
    - Import gallery and galleryCategories from `@/data/content.ts`
    - Use useLang() hook for bilingual rendering
    - _Requirements: 5.1, 5.2, 5.3, 5.10, 9.1, 10.5_
  
  - [ ] 7.2 Enhance GalleryGrid with lightbox functionality
    - Modify existing `src/components/site/GalleryGrid.tsx` to add lightbox
    - Add state for lightbox open/close and current image index
    - Open lightbox dialog when thumbnail is clicked
    - Display full-size image in lightbox with photo title and date
    - Add previous/next navigation arrow buttons
    - Implement navigation logic that cycles through photos array
    - Add close button to exit lightbox
    - Add keyboard support (ESC to close, arrow keys for navigation)
    - _Requirements: 5.4, 5.5, 5.6, 5.7, 5.8, 5.9_
  
  - [ ]* 7.3 Write property test for gallery filtering
    - **Property 2: Gallery Filtering Correctness**
    - **Validates: Requirements 5.3**
    - Test that for any selected gallery category, all filtered results match the selected category
    - Test that when category is "all", all gallery photos are included
    - Test that filtering is case-insensitive and handles all valid category values
    - _Requirements: 5.3_
  
  - [ ]* 7.4 Write unit tests for gallery route and lightbox
    - Test SiteLayout wrapper is present
    - Test PageHero renders
    - Test CategoryFilter renders with all gallery categories
    - Test filtering updates displayed photos correctly
    - Test lightbox opens with correct image when thumbnail clicked
    - Test previous/next navigation works correctly
    - Test navigation wraps around at boundaries (first/last image)
    - Test close button closes lightbox
    - Test bilingual content displays correctly
    - _Requirements: 5.1-5.10_

- [ ] 8. Implement committee route (/committee)
  - [ ] 8.1 Create committee route component
    - Create `src/routes/committee.tsx` with committee information
    - Wrap content in SiteLayout component
    - Display PageHero with committee title and intro subtitle
    - Create Team Section with SectionHeading and grid of MemberCard components for all 8 members
    - Create Responsibilities Section with SectionHeading and grid of responsibility cards
    - Create Mission Section with SectionHeading and mission statement blockquote
    - Import committeeMembers and responsibilities from `@/data/festival.ts`
    - Use useLang() hook for bilingual rendering with b() function
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 6.7, 9.1, 10.6_
  
  - [ ]* 8.2 Write unit tests for committee route
    - Test SiteLayout wrapper is present
    - Test PageHero renders
    - Test Team Section renders with all 8 MemberCard components
    - Test Responsibilities Section renders with all 8 responsibility cards
    - Test Mission Section renders with mission statement
    - Test bilingual content displays correctly in both languages
    - _Requirements: 6.1-6.7_

- [ ] 9. Implement announcements route (/announcements) with filtering
  - [ ] 9.1 Create announcements route component with category filtering and sorting
    - Create `src/routes/announcements.tsx` with announcements list
    - Wrap content in SiteLayout component
    - Display PageHero with announcements title and count subtitle
    - Add state for selectedCategory (default "all")
    - Implement CategoryFilter component with announcementCategories from content.ts
    - Use useMemo to filter announcements based on selectedCategory
    - Use useMemo to sort filtered announcements by date (most recent first)
    - Create AnnouncementCard component for displaying individual announcements
    - AnnouncementCard shows important badge, date, title, description
    - Import announcements and announcementCategories from `@/data/content.ts`
    - Use useLang() hook for bilingual rendering and locale-aware date formatting
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 7.6, 7.7, 7.8, 9.1, 10.7_
  
  - [ ]* 9.2 Write property test for announcement filtering
    - **Property 3: Announcement Filtering Correctness**
    - **Validates: Requirements 7.5, 7.6**
    - Test that for any selected announcement category, all filtered results match the selected category
    - Test that when category is "all", all announcements are included
    - Test that important announcements display the important badge regardless of category
    - _Requirements: 7.5, 7.6_
  
  - [ ]* 9.3 Write unit tests for announcements route
    - Test SiteLayout wrapper is present
    - Test PageHero renders with announcement count
    - Test CategoryFilter renders with all announcement categories
    - Test filtering updates displayed announcements correctly
    - Test announcements are sorted by date (newest first)
    - Test important badge displays for announcements with important: true
    - Test date formatting uses correct locale (te-IN vs en-IN)
    - Test bilingual content displays correctly
    - _Requirements: 7.1-7.8_

- [ ] 10. Implement contact route (/contact) with form validation
  - [ ] 10.1 Create contact route component with contact information
    - Create `src/routes/contact.tsx` with contact info and form
    - Wrap content in SiteLayout component
    - Display PageHero with contact title and address subtitle
    - Create ContactInfoSection with three cards: Location, Contact, Social
    - Location card shows address and directions button (opens mapsUrl)
    - Contact card shows phone (tel: link), WhatsApp (wa.me link), email (mailto: link) with icons
    - Social card shows Instagram, Facebook, YouTube links with icon buttons
    - Create ContactFormSection with ContactForm component
    - Import contact data from `@/data/festival.ts`
    - Use useLang() hook for bilingual rendering
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5, 9.1, 10.8_
  
  - [ ] 10.2 Create ContactForm component with client-side validation
    - Create ContactForm component at `src/components/site/ContactForm.tsx`
    - Add state for formData (name, phone, message) and errors
    - Add state for submitted success feedback
    - Implement validateForm function with validation rules:
      - Name: required, non-empty after trim
      - Phone: required, exactly 10 digits (spaces allowed but stripped)
      - Message: required, minimum 10 characters after trim
    - Implement handleSubmit that validates and shows success feedback (no backend submission)
    - Implement handleChange that clears field error when user starts typing
    - Display validation errors inline with red text and red border
    - Show success state with check icon and success message for 3 seconds
    - Auto-reset form after success
    - Use useLang() hook for error messages and labels
    - _Requirements: 8.6, 8.7, 8.8, 8.9, 8.10, 8.11, 8.12_
  
  - [ ]* 10.3 Write property test for form validation
    - **Property 4: Form Validation Correctness**
    - **Validates: Requirements 8.9, 8.11**
    - Test that for any form input, validation rules are consistently applied
    - Test that invalid inputs always produce appropriate error messages
    - Test that valid inputs never produce errors
    - Test phone number validation accepts various formats with/without spaces
    - _Requirements: 8.9, 8.11_
  
  - [ ]* 10.4 Write unit tests for contact route and form
    - Test SiteLayout wrapper is present
    - Test PageHero renders with address
    - Test all three contact info cards render
    - Test all contact links have correct href values
    - Test ContactForm renders with all fields
    - Test form validation displays errors for invalid inputs
    - Test form shows success feedback on valid submission
    - Test form resets after success
    - Test real-time error clearing when user types
    - Test bilingual content displays correctly
    - _Requirements: 8.1-8.12_

- [ ] 11. Final checkpoint and design system verification
  - [ ] 11.1 Verify all routes use SiteLayout and design system
    - Verify all 8 routes are wrapped with SiteLayout component
    - Verify all routes use PageHero component at the top
    - Verify design system classes are used consistently (gradient-saffron, gradient-maroon, surface-card)
    - Verify color scheme (saffron, maroon, cream, gold) is applied correctly across all routes
    - Verify layout consistency when navigating between routes
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5, 9.6, 9.7_
  
  - [ ] 11.2 Verify bilingual system integration across all routes
    - Verify all 8 routes use useLang() hook correctly
    - Verify b() function is used for bilingual objects (title, description fields)
    - Verify t() function is used for translation key strings (UI labels, buttons, errors)
    - Test language switching works correctly on each route
    - Test all user-facing text displays in both English and Telugu
    - _Requirements: 10.1-10.11_
  
  - [ ] 11.3 Final integration testing and verification
    - Test navigation between all 8 routes works correctly
    - Test all interactive elements work (buttons, links, forms, dialogs, lightbox)
    - Test all data displays correctly from festival.ts and content.ts
    - Ensure all tests pass, ask the user if questions arise.
    - _Requirements: All requirements_

## Notes

- Tasks marked with `*` are optional testing tasks and can be skipped for faster MVP delivery
- All routes leverage pre-built components from `src/components/site/` directory
- The bilingual system uses React Context via `useLang()` hook from `@/i18n/language.tsx`
- All data is statically imported from `@/data/festival.ts` and `@/data/content.ts` - no API calls needed
- Calendar integration (ICS download and Google Calendar) is handled client-side with no backend
- Form submission is client-side validation only with visual feedback - no backend submission
- The design system uses CSS custom properties defined in `src/styles.css` for theming
- TanStack Start automatically handles code-splitting by route for optimal performance
- All routes follow the pattern: SiteLayout → PageHero → Route-specific content
- Property-based tests validate universal correctness properties from the design document
- Each task references specific requirements for traceability and validation

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1", "1.2", "1.3"] },
    { "id": 1, "tasks": ["2.1", "3.1", "4.1"] },
    { "id": 2, "tasks": ["2.2", "3.2", "4.2", "5.1"] },
    { "id": 3, "tasks": ["5.2", "7.1", "8.1", "9.1", "10.1"] },
    { "id": 4, "tasks": ["5.3", "5.4", "7.2", "10.2"] },
    { "id": 5, "tasks": ["7.3", "7.4", "8.2", "9.2", "9.3", "10.3", "10.4"] },
    { "id": 6, "tasks": ["11.1", "11.2"] },
    { "id": 7, "tasks": ["11.3"] }
  ]
}
```
