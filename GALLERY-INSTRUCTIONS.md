# Gallery Photo Upload Instructions

## 📸 How to Add Photos to Gallery

### Step 1: Upload Your Images

Place your images in the appropriate folder:

- **2026 Festival Photos**: `public/gallery/2026/`
- **Logo Inauguration Photos**: `public/gallery/logo-inauguration/`
- **Celebration Photos**: `public/gallery/celebrations/`
- **Yearly Idols**: `public/gallery/idols/`

**Recommended Image Format:**
- Format: JPG or PNG
- Size: Optimized for web (under 2MB recommended)
- Resolution: 1920x1080 or similar aspect ratio

### Step 2: Register Your Images

Open the file: `src/data/gallery.ts`

Add your images following this format:

```typescript
export const galleryItems: GalleryItem[] = [
  {
    id: "logo-2026-1",
    category: "logo",
    src: "/gallery/logo-inauguration/photo1.jpg",
    alt: "Logo Inauguration Ceremony 2026",
    year: 2026
  },
  {
    id: "celebration-2026-1",
    category: "celebrations",
    src: "/gallery/celebrations/celebration1.jpg",
    alt: "Ganesh Chaturthi Main Event 2026",
    year: 2026
  },
  // Add more photos here...
];
```

### Step 3: Rebuild the Project

After adding images, rebuild the project:

```bash
npm run build
```

Or if the dev server is running, it will auto-reload.

## 📁 Folder Structure

```
public/
└── gallery/
    ├── logo-inauguration/     # Logo related photos
    │   ├── photo1.jpg
    │   ├── photo2.jpg
    │   └── ...
    └── celebrations/          # Festival celebration photos
        ├── celebration1.jpg
        ├── celebration2.jpg
        └── ...
```

## 🎨 Gallery Categories

The gallery has **3 filter buttons**:

1. **📸 All Photos** - Shows all images
2. **🎨 Logo Inauguration** - Shows only logo-related photos
3. **🎉 Celebrations** - Shows only celebration photos

## ⚙️ Image Configuration Fields

- **id**: Unique identifier (e.g., "logo-2026-1")
- **category**: Either "logo" or "celebrations"
- **src**: Path to image starting with "/gallery/"
- **alt**: Description for accessibility and SEO
- **year** (optional): Year of the event

## 💡 Tips

- Use descriptive file names (e.g., `logo-inauguration-2026.jpg` instead of `IMG_001.jpg`)
- Keep images optimized for web to ensure fast loading
- Add meaningful alt text for better accessibility
- Images are displayed in a responsive grid (1 column mobile, 2 columns tablet, 3 columns desktop)

## 🙏 గణపతి బప్పా మోరియా!
