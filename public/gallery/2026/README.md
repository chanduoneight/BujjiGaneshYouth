# 2026 Festival Gallery Photos

Place all your upcoming 2026 festival photos here:
- `public/gallery/2026/`

### Example filenames:
- `day1-sthapana.jpg`
- `day2-pooja.jpg`
- `annadanam.jpg`
- `visarjan.jpg`

### How to show them on the website:
Open `src/data/gallery.ts` and add an entry:
```typescript
{
  id: "celebration-2026-sthapana",
  category: "celebrations",
  src: "/gallery/2026/day1-sthapana.jpg",
  alt: "2026 Sthapana Celebration",
  title: {
    en: "2026 Sthapana Pooja",
    te: "2026 వినాయక ప్రతిష్ట పూజ",
  },
  year: 2026,
}
```
