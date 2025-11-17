# LokalKu - Platform Direktori UMKM Lokal 🇮🇩

**LokalKu** adalah platform web direktori UMKM (Usaha Mikro Kecil dan Menengah) yang memudahkan pengguna untuk menemukan dan mengeksplorasi berbagai bisnis lokal di Indonesia. Dilengkapi dengan fitur pencarian cerdas, peta interaktif, dan AI chatbot assistant bernama **SABI AI** (Sahabat Bisnis) untuk membantu pengguna menemukan UMKM yang sesuai dengan kebutuhan mereka.

## Fitur Utama

### Landing Page
- Hero section dengan animasi modern
- Kategori UMKM populer
- Featured UMKM showcase
- Marquee benefits section dengan animasi 3D
- FAQ section
- Footer dengan informasi lengkap

### Direktori UMKM
- **Direktori Lengkap** - Tampilan grid/list dengan filter kategori, lokasi, rating, dan status
- **Kategori** - Browse UMKM berdasarkan kategori (Makanan & Minuman, Fashion, Kecantikan, Otomotif, dll)
- **Terbaru** - UMKM terbaru dengan sorting (newest, rating, reviews, trending)
- **Detail UMKM** - Informasi lengkap UMKM dengan galeri foto, lokasi, kontak, jam operasional
- Search & filter real-time
- Pagination untuk navigasi yang mudah

### Peta Interaktif
- **Peta Lengkap** - Visualisasi semua UMKM di peta dengan clustering
- **UMKM Terdekat** - Temukan UMKM di sekitar lokasi Anda
- Integrasi dengan Mapbox GL JS
- Detail popup untuk setiap UMKM

### Favorit
- Simpan UMKM favorit
- Persistent storage dengan localStorage
- Easy management favorit

### SABI AI Chatbot
- AI assistant powered by Google Gemini 2.5 Flash
- Jawab pertanyaan tentang UMKM
- Rekomendasi UMKM berdasarkan kebutuhan
- Tampilkan kartu UMKM interaktif
- Conversation history (max 50 messages)
- Rate limiting (20 messages/session)

### Halaman Informasi
- **About** - Tentang platform LokalKu
- **FAQ** - Pertanyaan yang sering diajukan
- **Syarat & Ketentuan** - Terms of service
- **Kebijakan Privasi** - Privacy policy

### Fitur Tambahan
- **Multi-language** - Support Bahasa Indonesia & English
- **Dark Mode** - Toggle tema terang/gelap
- **Responsive Design** - Optimal di semua device
- **Performance Optimized** - Code splitting, lazy loading, image optimization
- **SEO Friendly** - Meta tags, sitemap, robots.txt

## Tech Stack

### Frontend Framework & Libraries
- **React 18.3.1** - UI library
- **TypeScript** - Type-safe JavaScript
- **Vite 6.0.11** - Fast build tool & dev server
- **React Router DOM 6.23.0** - Routing

### UI & Styling
- **Hero UI 2.8.5** - Modern React UI component library
- **Tailwind CSS 4.1.11** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library
- **GSAP** - Professional-grade animation library

### Maps & Geolocation
- **Mapbox GL JS** - Interactive maps
- **React Map GL** - React wrapper for Mapbox
- **Google Maps API** - Additional map services

### AI & Machine Learning
- **Google Generative AI (Gemini 2.5 Flash)** - AI chatbot backend
- Custom chat UI components
- Session management & rate limiting

### Performance & Optimization
- **Code Splitting** - Route-based & component-based
- **Lazy Loading** - Images & routes
- **Image Optimization** - WebP support, responsive images
- **Bundle Optimization** - Manual chunk splitting (React, UI, Maps, AI)
- **GPU-accelerated Animations** - Transform-based animations
- **Web Workers** - Heavy computation offloading

### State Management & Utils
- **React Context API** - Language & theme state
- **LocalStorage** - Persistent favorites
- **SessionStorage** - Chat history

### Analytics & Monitoring
- **Vercel Analytics** - Usage analytics
- **Web Vitals** - Performance monitoring (CLS, INP, FCP, LCP, TTFB)

### Development Tools
- **ESLint** - Code linting
- **Terser** - JavaScript minification
- **Rollup Visualizer** - Bundle analysis
- **TypeScript Compiler** - Type checking

## Cara Menjalankan Project

### 1. Clone Repository

```bash
git clone https://github.com/ahmad-ritonga/lokalku-invofest-25.git
cd lokalku-invofest-25
```

### 2. Install Dependencies

Menggunakan npm:

```bash
npm install
```

Atau menggunakan yarn:

```bash
yarn install
```

Atau menggunakan pnpm:

```bash
pnpm install
```

### 3. Setup Environment Variables

Buat file `.env` di root folder dan isi dengan:

```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
```

**Cara mendapatkan API Keys:**
- **Gemini API**: https://makersuite.google.com/app/apikey
- **Google Maps API**: https://console.cloud.google.com/

### 4. Jalankan Development Server

```bash
npm run dev
```

Website akan berjalan di `http://localhost:3000`

### 5. Build untuk Production

```bash
npm run build
```

Output akan ada di folder `dist/`

### 6. Preview Production Build

```bash
npm run preview
```

Preview akan berjalan di `http://localhost:4173`

## Progress Fitur

### Selesai (100%)

#### Core Features
- Landing page dengan hero section, categories, featured UMKM
- Direktori UMKM lengkap (grid/list view, filter, search, pagination)
- Direktori berdasarkan kategori
- Direktori UMKM terbaru dengan sorting
- Detail page UMKM lengkap
- Peta interaktif dengan clustering
- UMKM terdekat berbasis lokasi
- Sistem favorit dengan localStorage
- Multi-language (Indonesia & English)
- Dark mode support

#### AI Chatbot (SABI AI)
- Chat interface dengan mascot
- Integrasi Google Gemini 2.5 Flash
- UMKM recommendation system
- Interactive UMKM cards dalam chat
- Conversation history management
- Rate limiting & error handling
- Quick replies untuk pertanyaan umum
- Welcome message & typing indicator

#### Halaman Informasi
- About page dengan team section
- FAQ dengan accordion
- Syarat & ketentuan
- Kebijakan privasi
- 404 Not Found page

#### Performance Optimization
- Code splitting (vendor chunks + page chunks)
- Lazy loading untuk routes & komponen
- Image optimization component (WebP, lazy load, blur placeholder)
- GPU-accelerated animations
- Web Worker untuk komputasi berat
- Resource hints (preconnect, preload)
- Performance monitoring (Web Vitals)
- Bundle optimization (98KB gzipped untuk React chunk)

#### SEO & Accessibility
- Meta tags (title, description, OG, Twitter)
- Robots.txt & sitemap
- Aria labels untuk accessibility
- Semantic HTML
- Responsive design

### Deployment
- Deployed di Vercel
- Production-ready build
- Analytics terintegrasi


---


## Kontribusi

Kontribusi selalu diterima! Silakan buat pull request atau buka issue untuk saran dan bug reports.

## License

Licensed under the [MIT license](./LICENSE).

## Developer

Developed by **Ahmad Rian Syaifullah Ritonga**

---

**LokalKu** - Temukan UMKM Lokal, Dukung Ekonomi Lokal 🇮🇩!
