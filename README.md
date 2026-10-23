# Portfolio

Portfolio personal yang ringan dan cepat, dibangun dengan Next.js 16 (App Router), Tailwind CSS v4, dan shadcn/ui.

## Stack

| Lapisan | Pilihan |
| --- | --- |
| Framework | Next.js 16.4 (App Router, Turbopack, Cache Components) |
| Bahasa | TypeScript |
| Styling | Tailwind CSS v4 (token `@theme` di `globals.css`) |
| Komponen | shadcn/ui (primitive Base UI) + lucide-react |
| Animasi | `motion` (penerus Framer Motion) + `lenis` smooth scroll |
| Tema | next-themes (terang / gelap / sistem) |

## Perintah

```bash
npm run dev     # jalankan dev server di :3000
npm run build   # build produksi
npm run start   # sajikan hasil build
npm run lint    # eslint
```

## Struktur

```
src/
├── app/
│   ├── layout.tsx              # provider, font, metadata, header/footer
│   ├── page.tsx                # beranda: hero → tentang → karya
│   ├── projects/[slug]/        # halaman detail proyek (prerendered)
│   ├── sitemap.ts, robots.ts   # file SEO yang digenerate
│   └── globals.css             # token desain + utility kustom
├── components/
│   ├── ui/                     # primitive shadcn
│   ├── sections/               # hero, tentang, karya
│   ├── motion/reveal.tsx       # pembungkus animasi saat masuk viewport
│   └── site-header/footer.tsx
└── lib/
    ├── site.ts                 # nama, bio, statistik, skill, sosial  ← ubah di sini
    ├── projects.ts             # daftar proyek                         ← ubah di sini
    └── utils.ts
```

## Kustomisasi

1. **Data diri** — ubah `src/lib/site.ts` (nama, email, sosial, bio, skill, navigasi).
2. **Proyek** — ubah `src/lib/projects.ts`. Menambah satu entri otomatis memperbarui grid di beranda, halaman detail, sitemap, dan metadata halaman.
3. **Warna** — ubah `--brand` (dan token lain) di `src/app/globals.css`.
4. **CV** — taruh PDF di `public/resume.pdf` bila ingin menautkannya.

## Deploy

Langsung jalan di Vercel. Set `site.url` di `src/lib/site.ts` ke domain aslimu supaya metadata, sitemap, dan robots mengarah ke alamat yang benar.

# vercel
