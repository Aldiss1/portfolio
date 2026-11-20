# Swiss Minimal Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesain penuh portofolio Next.js ke arah Swiss minimal anti-slop (grid ketat, tipografi Archivo expanded, aksen merah, radius 0, tanpa gradient/shadow/rounded), plus konten baru (section Pendidikan, data strip, jam live) dan perbaikan teknis (404 console, aset mati, foto).

**Architecture:** Redesign di level token (globals.css) + rewrite per-section di `src/components/sections/*` mengikuti pola yang sudah ada (data di `src/lib/site.ts` & `projects.ts`, komponen presentasional). Tidak ada arsitektur baru; tidak ada dependensi baru.

**Tech Stack:** Next.js 16 (App Router, Turbopack), Tailwind CSS v4, shadcn/ui (Base UI), React 19, next-themes, motion, next/font (Archivo variable + Geist Mono).

**Spec:** `docs/superpowers/specs/2026-11-19-swiss-redesign-design.md`

## Global Constraints

- **Anti-slop (anti-goals spec):** nol gradient, nol glassmorphism/backdrop-blur, nol shadow, nol rounded corner, nol blob/aurora, nol indigo/ungu. Pelanggaran = task gagal.
- **Warna (persis dari spec):** light — bg `#FFFFFF`, ink `#111111`, muted `#6F6F6F`, hairline `#E4E4E4`, accent `#E30613`, ghost `#D8D8D8`; dark — bg `#0A0A0A`, ink `#F5F5F5`, muted `#8A8A8A`, hairline `#262626`, accent `#FF4438`, ghost `#3A3A3A`. Tidak ada warna lain.
- **Radius:** `--radius: 0` (semua komponen shadcn ikut karena memakai `var(--radius-*)`).
- **Font:** Archivo (variable, axis `wdth`) untuk semua sans; Geist Mono untuk label/meta. Label = uppercase + `letter-spacing: 0.14em` + size 10–12px. Display besar = `font-stretch: 115–125%` + weight 700–800 + `letter-spacing: -0.02em` sampai `-0.04em`.
- **Layout:** container `max-width: 1280px`, padding-inline 24px (mobile) / 48px (desktop ≥64rem). Pemisah section = hairline 1px full-bleed (lebar viewport, bukan container). Section padding-block 64px (mobile) / 96–128px (desktop).
- **Motion:** Reveal 0.4s, distance 12px, ease `[0.22, 1, 0.36, 1]`, stagger 0.05s; hover 150ms; `prefers-reduced-motion` = render statis.
- **Bahasa UI:** Indonesia. Commit message: Indonesia (ikuti riwayat repo).
- **Kontrak yang tidak boleh berubah:** route `/api/contact` (request/response), next-themes (class strategy), metadata/sitemap/robots, a11y (aria-label, focus-visible).
- **AGENTS.md:** ini Next.js 16 — sebelum menulis kode yang menyentuh API Next (font, Link, image, metadata), baca dulu doc terkait di `node_modules/next/dist/docs/01-app/` (mis. `01-getting-started/13-fonts.md`, `04-linking-and-navigating.md`).
- **Verifikasi standar tiap task:** `npm run build` sukses + `npm run lint` bersih + screenshot dev server (light & dark bila relevan). Dev server: `npm run dev -- -p 3111` (background).

## Review Focus

Gagal-mode yang tidak di-cover langkah verifikasi rutin; masing-masing di-pin ke task pemilik:

1. **Dark mode — kontras & inversi:** aksen `#FF4438` di `#0A0A0A` harus terbaca; baris inversi (hover Karya/Pengalaman) di dark mode = bg `#F5F5F5` teks `#0A0A0A`, bukan hitam. → Task 1 (screenshot dark), Task 7 (screenshot hover dark).
2. **Mobile 390px — overflow:** nama hero raksasa, data strip, grid baris Karya, dan nama outline footer tidak boleh causing horizontal scroll. → Task 4 & Task 9 (screenshot 390px, cek `document.documentElement.scrollWidth <= 390`).
3. **Reduced motion — konten tak boleh tersangkut opacity-0:** semua section terlihat tanpa scroll. → Task 2 (verifikasi cabang `useReducedMotion` di `Reveal`).
4. **Form tanpa `RESEND_API_KEY`:** submit menampilkan "Layanan email belum dikonfigurasi." (API sudah return 500 + pesan), tidak hang, tidak crash. → Task 8 (test submit lokal tanpa .env).
5. **Kontrol ikon-only:** theme toggle, hamburger, dan link panah harus punya `aria-label`; focus-visible terlihat (ring ink, bukan biru). → Task 3 (cek via accessibility snapshot).

---

### Task 1: Design tokens & tipografi (fondasi)

**Files:**
- Modify: `src/app/globals.css`
- Modify: `src/app/layout.tsx`
- Modify: `src/app/icon.svg`
- Modify: `src/app/opengraph-image.tsx`

**Interfaces:**
- Consumes: tidak ada.
- Produces: token CSS `--background/--foreground/--muted/--muted-foreground/--border/--input/--ring/--accent/--accent-foreground/--ghost/--ghost-inverted`, `--radius: 0`, variabel font `--font-archivo`; utility `stretch-display` (`font-stretch: 120%`), `stretch-wide` (`font-stretch: 115%`), `text-ghost` (stroke text warna `var(--ghost)`), `text-ghost-inverted` (stroke `var(--ghost-inverted)`); `container-page` dengan max-width 80rem.

- [ ] **Step 1: Baca doc font Next 16**

Read: `node_modules/next/dist/docs/01-app/01-getting-started/13-fonts.md`. Pastikan sintaks `axes` untuk variable font dengan axis tambahan masih sama di versi terpasang.

- [ ] **Step 2: Ganti token warna & radius di `globals.css`**

Ganti seluruh blok `:root` dan `.dark` dengan palet hex dari Global Constraints (termasuk `--card`, `--popover`, `--primary`, `--secondary`, `--destructive` = nilai accent, `--ring` = ink, `--sidebar-*` = turunan bg/ink/hairline). Hapus token `--chart-*` + baris `@theme inline`-nya, hapus `--brand` (ganti `--accent`), hapus utility `bg-grid`, `bg-glow`, `animate-pulse-dot` + keyframes `pulse-dot`. Tambah token `--ghost`/`--ghost-inverted` (light: `#D8D8D8`/`#4A4A4A`, dark: `#3A3A3A`/`#B5B5B5`) + mapping `@theme inline` (`--color-ghost`, `--color-ghost-inverted`, `--color-accent`). Set `--radius: 0`. Update `::selection` memakai `--accent`. `container-page`: `max-width: 80rem`. Tambah utility `stretch-display`, `stretch-wide`, `text-ghost`, `text-ghost-inverted`.

- [ ] **Step 3: Ganti font di `layout.tsx`**

Hapus `Geist` (sans), tambah `Archivo` dari `next/font/google` dengan `variable: "--font-archivo"`, `subsets: ["latin"]`, `axes: ["wdth"]`. Pertahankan `Geist_Mono`. `html className` = `${archivo.variable} ${geistMono.variable} h-full antialiased`. Di `globals.css`: `--font-sans: var(--font-archivo)`.

- [ ] **Step 4: Favicon & OG image Swiss**

`icon.svg`: rect `fill="#E30613"`, teks "AS" `fill="#fff"`. `opengraph-image.tsx`: bg `#FFFFFF`, teks `#111111`, satu kotak `#E30613` 64×64 berisi "AS" putih; layout: baris atas (kotak + nama + role), bawah (tagline besar + lokasi + URL). Tanpa foto.

- [ ] **Step 5: Verifikasi**

Run: `npm run build && npm run lint`
Expected: sukses, tanpa error.

Run: `npm run dev -- -p 3111` (background) → buka http://localhost:3111, screenshot light + dark (toggle tema).
Expected: situs render dengan font Archivo, radius 0 di semua elemen, tidak ada indigo di mana pun, hairline `#E4E4E4`. (Komponen lama masih memakai class lama — tampilan "campur" wajar di task ini.)

- [ ] **Step 6: Commit**

```bash
git add src/app/globals.css src/app/layout.tsx src/app/icon.svg src/app/opengraph-image.tsx
git commit -m "feat: token desain Swiss (merah, radius 0, Archivo) + favicon & OG image"
```

---

### Task 2: Komponen dasar Swiss + fix 404 console

**Files:**
- Modify: `src/components/button-link.tsx`
- Modify: `src/components/ui/button.tsx`
- Modify: `src/components/ui/input.tsx`
- Modify: `src/components/ui/textarea.tsx`
- Modify: `src/components/section-heading.tsx`
- Modify: `src/components/motion/reveal.tsx`

**Interfaces:**
- Consumes: token dari Task 1 (`--accent`, `--ring`, `--radius`).
- Produces: `ButtonLink` yang render `<a>` untuk href non-internal (eksternal, mailto, aset ber-extension); `Button` varian Swiss (mono uppercase, primary = `bg-primary text-primary-foreground hover:bg-accent`, outline = `border-foreground hover:border-accent hover:text-accent`, size lg `h-11 px-6`); `Input`/`Textarea` focus = `border-foreground` tanpa ring; `SectionHeading` = label mono + h2 Archivo; `Reveal` 0.4s/12px.

- [ ] **Step 1: Baca doc linking Next 16**

Read: `node_modules/next/dist/docs/01-app/01-getting-started/04-linking-and-navigating.md` (bagian prefetching) — konfirmasi perilaku `<Link>` terhadap URL aset.

- [ ] **Step 2: Fix `ButtonLink`**

Tambah helper `isInternalRoute(href: string): boolean` di `button-link.tsx`: false jika href match `^(https?:)?\/\/`, `^mailto:`, `^tel:`, atau path-nya (sebelum `#`/`?`) punya extension file (`/\.[a-z0-9]{2,}$/i`). Render: internal → `render={<Link .../>}` seperti sekarang; non-internal → `render={<a href target rel />}`.

- [ ] **Step 3: Styling Swiss di `button.tsx`, `input.tsx`, `textarea.tsx`**

`buttonVariants`: base tambah `font-mono text-xs uppercase tracking-[0.12em]`; hapus `rounded-lg` (radius global 0 sudah cukup, tapi class eksplisit dihapus agar jelas); `default`: `bg-primary text-primary-foreground hover:bg-accent hover:text-white`; `outline`: `border-foreground bg-transparent hover:border-accent hover:text-accent`; size `default` `h-10 px-5`, `lg` `h-11 px-6`. `Input`/`Textarea`: ganti `focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50` dengan `focus-visible:border-foreground focus-visible:ring-0`.

- [ ] **Step 4: `SectionHeading` & `Reveal`**

`SectionHeading`: eyebrow = `font-mono text-[0.7rem] uppercase tracking-[0.16em] text-muted-foreground` (tanpa perubahan besar), h2 = `font-sans font-bold tracking-tight stretch-wide` size `text-3xl sm:text-4xl` (kalimat besar dipertahankan — keputusan doc). `Reveal`: `duration: 0.4`, `distance = 12` (default param), ease tetap `[0.22, 1, 0.36, 1]`.

- [ ] **Step 5: Verifikasi build + 404 hilang**

Run: `npm run build && npm run lint` → sukses.
Buka http://localhost:3111 di browser, tunggu load, cek console:
Expected: **tidak ada** error 404 `resume.pdf?_rsc=...` (sebelumnya ada di production; verifikasi juga dengan hover tombol "Unduh CV").

- [ ] **Step 6: Verifikasi reduced-motion (Review Focus #3)**

Baca ulang `reveal.tsx`: cabang `useReducedMotion()` harus return div statis tanpa `initial` opacity-0. (Sudah ada; pastikan tidak berubah saat edit.)

- [ ] **Step 7: Commit**

```bash
git add src/components/button-link.tsx src/components/ui/button.tsx src/components/ui/input.tsx src/components/ui/textarea.tsx src/components/section-heading.tsx src/components/motion/reveal.tsx
git commit -m "feat: komponen dasar Swiss + fix 404 prefetch resume.pdf"
```

---

### Task 3: Header Swiss + jam live

**Files:**
- Create: `src/components/site-clock.tsx`
- Modify: `src/components/site-header.tsx`
- Modify: `src/components/theme-toggle.tsx` (opsional: class tombol persegi)

**Interfaces:**
- Consumes: token Task 1; `nav` dari `src/lib/site.ts` (5 item — item "Pendidikan" ditambahkan di Task 5; header cukup memetakan `nav`).
- Produces: `SiteClock` (komponen client, render `MALANG — HH:MM WIB`), header solid (tanpa blur) dengan wordmark + nav mono uppercase + jam + theme toggle.

- [ ] **Step 1: Buat `SiteClock`**

Komponen `"use client"`: state `time: string | null` (null = SSR, render `--:--`); `useEffect` format `Intl.DateTimeFormat("id-ID", { timeZone: "Asia/Jakarta", hour: "2-digit", minute: "2-digit", hour12: false })`, update tiap 30 detik, cleanup interval. Render `<span className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted-foreground">MALANG — {time ?? "--:--"} WIB</span>`. Tanpa `suppressHydrationWarning` (state awal identik server/client).

- [ ] **Step 2: Rewrite `SiteHeader`**

Sticky, `bg-background` solid + `border-b border-border` (hapus logika `scrolled`/backdrop-blur — header selalu solid). Kiri: kotak `size-7 bg-accent text-accent-foreground grid place-items-center text-[0.7rem] font-semibold` berisi `site.initials` + nama `font-mono text-xs uppercase tracking-[0.12em]`. Nav (≥md): item `nav` sebagai `font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground hover:text-foreground` + underline sweep merah (pseudo/`after:` scaleX dari kiri, 200ms). Kanan: `<SiteClock />` (hidden <lg), theme toggle (tombol `size-8 border border-border`), hamburger (mobile, `size-8 border border-border`). Sheet mobile: item nav mono uppercase.

- [ ] **Step 3: Verifikasi**

Run: `npm run build && npm run lint` → sukses.
Screenshot desktop 1440px: header solid, jam WIB tampil (bukan `--:--` setelah hydrate), nav 4 item (Pendidikan belum ada — wajar). Screenshot mobile 390px: hamburger + sheet terbuka.
Cek accessibility snapshot: tombol "Ganti tema" dan "Buka menu" punya label (Review Focus #5).

- [ ] **Step 4: Commit**

```bash
git add src/components/site-clock.tsx src/components/site-header.tsx src/components/theme-toggle.tsx
git commit -m "feat: header Swiss solid + jam live WIB"
```

---

### Task 4: Hero + foto profil + data strip

**Files:**
- Modify: `src/components/sections/hero.tsx`
- Modify: `src/components/profile-photo.tsx`
- Modify: `src/lib/site.ts` (data `education` — dipakai Task 5, didefinisikan di sini agar satu sumber)

**Interfaces:**
- Consumes: token Task 1; `ButtonLink` Task 2; `site`, `socials` dari `site.ts`; `projects.length` dari `src/lib/projects.ts`.
- Produces: `site.education = { level, school, period, gpa, gpaScale }` (dipakai Task 5); hero dengan meta baris, nama raksasa, 2 CTA, foto + caption, data strip 4 kolom.

- [ ] **Step 1: Tambah `education` di `site.ts`**

```ts
export const education = {
  level: "D4 Teknik Informatika",
  school: "Politeknik Negeri Malang",
  period: "2024 — sekarang",
  gpa: "3,53",
  gpaScale: "skala 4,00",
} as const;
```

- [ ] **Step 2: Rewrite `ProfilePhoto`**

Hapus prop `decorative` + seluruh frame/glow. Render: `div` dengan `border border-border` berisi `Image` (fill, `aspect-[4/5]`, `object-cover`) + caption di bawah: `font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted-foreground` → "A. S. — MALANG, 2026". Placeholder (jika `site.photo` null) tetap ada, gaya hairline.

- [ ] **Step 3: Rewrite `Hero`**

Hapus `bg-grid`/`bg-glow`. Struktur (grid `lg:grid-cols-[1.55fr_1fr]`):
- Baris meta (mono 11px, space-between): kiri = kotak merah `size-2 bg-accent` + `site.availableLabel` uppercase; kanan = `{site.location} — {site.email}` (hidden di mobile kecil).
- Nama: `text-[clamp(3rem,9vw,7.5rem)] leading-[0.94] font-extrabold tracking-[-0.03em] uppercase stretch-display` — "Aldi Surya" baris 1, "Saputra" baris 2 (pakai `<br className="hidden sm:block" />` agar mobile wrap alami).
- Role: `text-lg font-medium` (ink, bukan muted).
- CTA: `ButtonLink size="lg"` "Lihat karya" (default) + `ButtonLink size="lg" variant="outline"` "Unduh CV" (href `site.resume`, `external`). Hapus tombol "Kirim email".
- Kolom kanan: `<ProfilePhoto />`.
- Data strip (di bawah grid, `border-t border-border`, grid 4 kolom dengan `border-r` antar-kolom, mobile = grid 2 kolom): `3,53` (angka `text-accent`, label "IPK / SKALA 4,00") · `projects.length` ("PROYEK") · `1` ("MAGANG") · `2024—` ("SEKARANG"). Angka: `text-4xl font-bold stretch-wide tracking-tight`; label mono 10px.
- Baris social icons + lokasi lama di bawah CTA: **hapus** (lokasi sudah di meta baris; social ada di footer + Kontak).
- Reveal: stagger 0.05s per blok.

- [ ] **Step 4: Verifikasi**

Run: `npm run build && npm run lint` → sukses.
Screenshot desktop 1440px (light + dark): nama raksasa terbaca, foto persegi hairline, data strip 4 kolom, tanpa grid pattern/glow.
Screenshot mobile 390px: `document.documentElement.scrollWidth <= 390` (cek via console), nama wrap tanpa overflow, data strip 2×2 (Review Focus #2).

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/hero.tsx src/components/profile-photo.tsx src/lib/site.ts
git commit -m "feat: hero Swiss (nama raksasa, data strip) + foto profil hairline"
```

---

### Task 5: Tentang (tabel keahlian) + section Pendidikan

**Files:**
- Modify: `src/components/sections/about.tsx`
- Create: `src/components/sections/education.tsx`
- Modify: `src/app/page.tsx`
- Modify: `src/lib/site.ts` (nav)

**Interfaces:**
- Consumes: `site.education`, `bio`, `skills` dari `site.ts`; `SectionHeading` Task 2.
- Produces: section `#about` (eyebrow "01 — TENTANG") + section `#education` (eyebrow "02 — PENDIDIKAN") dengan band IPK merah; nav 5 item.

- [ ] **Step 1: Tambah nav "Pendidikan" di `site.ts`**

`nav` = Tentang, **Pendidikan** (`/#education`), Pengalaman, Karya, Kontak (urutan ini; header Task 3 otomatis ikut).

- [ ] **Step 2: Rewrite `About`**

Eyebrow "01 — TENTANG", judul kalimat lama dipertahankan. Grid `lg:grid-cols-[1.15fr_1fr]`: kiri = paragraf `bio` (`text-lg text-foreground/90 leading-relaxed max-w-[60ch]`); kanan = **tabel keahlian** (pengganti chip): per grup `skills` → baris `flex justify-between border-b border-border py-3` dengan `dt` mono uppercase 11px muted di kiri, `dd` `text-sm text-foreground` (items dipisah ", ") di kanan. Hover baris: `dt` jadi `text-accent`.

- [ ] **Step 3: Buat `Education`**

Section `#education` (padding lebih kecil: `py-12 sm:py-16`), eyebrow "02 — PENDIDIKAN". Satu baris `grid md:grid-cols-[1fr_auto_auto]` items-baseline, `border-y border-border`:
- Kolom 1: `education.level` (`text-2xl sm:text-3xl font-bold tracking-tight`) + `education.school` (`text-base text-muted-foreground`).
- Kolom 2: `education.period` (mono 12px muted).
- Kolom 3: `education.gpa` (`text-5xl sm:text-6xl font-extrabold stretch-display text-accent tracking-tight`) + label "IPK / {gpaScale}" (mono 10px muted).

- [ ] **Step 4: Pasang di `page.tsx`**

Urutan: `<Hero /> <About /> <Education /> <Experience /> <Work /> <Contact />`.

- [ ] **Step 5: Verifikasi**

Run: `npm run build && npm run lint` → sukses.
Screenshot desktop: tabel keahlian rapi dengan hairline, band Pendidikan dengan IPK merah besar; header nav kini 5 item. Screenshot mobile 390px: band Pendidikan stack tanpa overflow.

- [ ] **Step 6: Commit**

```bash
git add src/components/sections/about.tsx src/components/sections/education.tsx src/app/page.tsx src/lib/site.ts
git commit -m "feat: tabel keahlian + section Pendidikan (IPK) + nav 5 item"
```

---

### Task 6: Pengalaman — baris full-width

**Files:**
- Modify: `src/components/sections/experience.tsx`

**Interfaces:**
- Consumes: `experiences` dari `site.ts`; `SectionHeading`.
- Produces: section `#experience` (eyebrow "03 — PENGALAMAN") sebagai daftar baris.

- [ ] **Step 1: Rewrite `Experience`**

Eyebrow "03 — PENGALAMAN", judul kalimat lama dipertahankan. Ganti grid kartu dengan `div` `border-t border-border`; tiap item = baris `grid md:grid-cols-[140px_1fr_auto] gap-4 border-b border-border py-6`:
- Kolom 1: `item.period` (jika ada) mono 12px muted — item tanpa `period` (HMTI) render `item.type` di sini? Tidak: kolom 1 = period atau "—".
- Kolom 2: `item.title` (`text-xl font-bold tracking-tight`) + `item.organization` (`text-sm text-muted-foreground`) + `item.description` (`text-sm text-muted-foreground mt-2`).
- Kolom 3: `item.type` mono 11px uppercase muted, kanan-rata.
- Hover baris: judul `group-hover:text-accent`, panah kecil `→` muncul di kanan (opacity 0 → 1, 150ms).

- [ ] **Step 2: Verifikasi**

Run: `npm run build && npm run lint` → sukses.
Screenshot desktop (light + dark): 2 baris dengan hairline, hover state terlihat (screenshot dengan kursor di atas baris via browser tool). Mobile: stack 1 kolom.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/experience.tsx
git commit -m "feat: pengalaman sebagai daftar baris Swiss"
```

---

### Task 7: Karya — baris full-width + ghost keyword + hover inversi

**Files:**
- Modify: `src/lib/projects.ts`
- Create: `src/components/project-row.tsx`
- Modify: `src/components/sections/work.tsx`
- Delete: `src/components/project-card.tsx`

**Interfaces:**
- Consumes: `projects` + `Project` dari `projects.ts`; token `--ghost`/`--ghost-inverted` Task 1.
- Produces: `Project` kini punya field `keyword: string` (1–4 huruf, uppercase); `ProjectRow({ project, index })` = baris full-width dengan hover inversi; section `#work` (eyebrow "04 — KARYA PILIHAN").

- [ ] **Step 1: Tambah `keyword` di `projects.ts`**

`Project.keyword: string` (wajib). Nilai: `smartreceipt` → "OCR", `trip-web` → "TRIP", `lab-se` → "LAB", `pendaftaran-smkn-2-singosari` → "PSB".

- [ ] **Step 2: Buat `ProjectRow`**

`<Link href={/projects/${slug}}>` sebagai baris: `group grid lg:grid-cols-[84px_1fr_130px_96px] gap-5 border-b border-border px-6 py-8 items-center transition-colors duration-150 hover:bg-foreground hover:text-background`.
- Kolom 1: `String(index+1).padStart(2,"0")` — `text-5xl font-extrabold stretch-display text-ghost transition-colors group-hover:text-accent`.
- Kolom 2: judul `text-2xl sm:text-3xl font-bold tracking-tight` + ringkasan `text-sm text-muted-foreground group-hover:text-background/60 mt-2 max-w-[52ch]` + stack `font-mono text-[0.7rem] uppercase tracking-[0.1em] text-muted-foreground group-hover:text-background/60 mt-4` (dipisah " · ").
- Kolom 3: `project.keyword` — `text-ghost text-6xl font-extrabold stretch-display text-right group-hover:text-ghost-inverted` (hide <lg).
- Kolom 4: `project.year` mono 11px muted + `↗` (`group-hover:text-accent`, translate diagonal saat hover).
- Dark mode: `hover:bg-foreground` otomatis = `#F5F5F5` (token) — verifikasi eksplisit (Review Focus #1).

- [ ] **Step 3: Rewrite `Work` + hapus `ProjectCard`**

Eyebrow "04 — KARYA PILIHAN", judul kalimat lama dipertahankan, meta kanan "4 proyek" dipertahankan (mono). Grid diganti `div border-t border-border` berisi `ProjectRow` per proyek (Reveal stagger 0.05s). Hapus `project-card.tsx` (pastikan tidak ada import tersisa — grep `project-card`).

- [ ] **Step 4: Verifikasi**

Run: `npm run build && npm run lint` → sukses.
Screenshot desktop light: 4 baris, ghost keyword outline terlihat. Screenshot hover (kursor di baris 2): inversi hitam, nomor merah, ghost stroke gelap. Screenshot dark + hover: inversi putih (Review Focus #1). Mobile 390px: kolom ghost & nomor collapse (grid 1 kolom, nomor di atas judul), tanpa overflow.

- [ ] **Step 5: Commit**

```bash
git add src/lib/projects.ts src/components/project-row.tsx src/components/sections/work.tsx
git rm src/components/project-card.tsx
git commit -m "feat: karya sebagai baris full-width dengan hover inversi + ghost keyword"
```

---

### Task 8: Kontak — email raksasa + form Swiss

**Files:**
- Modify: `src/components/sections/contact.tsx`
- Modify: `src/components/contact-form.tsx`

**Interfaces:**
- Consumes: `site`, `socials`; `Button`, `Input`, `Textarea`, `Label` (Task 2); route `/api/contact` (kontrak tidak berubah).
- Produces: section `#contact` (eyebrow "05 — KONTAK") dengan email raksasa + form persegi.

- [ ] **Step 1: Rewrite `Contact`**

Eyebrow "05 — KONTAK", judul "Punya proyek atau tawaran magang?" (kalimat lama dipertahankan, tanpa deskripsi paragraf lama). Di bawah judul: **email raksasa** — `<a href={mailto}>` `text-2xl sm:text-3xl font-bold tracking-tight underline decoration-1 underline-offset-8 hover:text-accent hover:decoration-accent break-all`. Grid `lg:grid-cols-[1.15fr_1fr]` di bawahnya: kiri = `<ContactForm />`; kanan = meta (EMAIL / LOKASI / SOSIAL) sebagai baris `border-b border-border py-3` (label mono 11px muted, value `text-sm`), social = link persegi kecil `border border-border px-3 py-1.5 font-mono text-xs uppercase`; status "Terbuka untuk magang" = kotak merah `size-2` + teks mono (bukan pill).

- [ ] **Step 2: Styling `ContactForm`**

Input/textarea sudah persegi dari Task 2. Tambah `h-11` pada input, `text-base` pada textarea. Tombol submit: `size="lg"` default (primary). Pesan error: `text-sm text-accent` (bukan `text-destructive` — token destructive kini = merah sama, tapi class `text-accent` lebih eksplisit). Blok success: `border border-border` (tanpa rounded), ikon check dipertahankan.

- [ ] **Step 3: Verifikasi build + form tanpa API key (Review Focus #4)**

Run: `npm run build && npm run lint` → sukses.
Lokal (tanpa `.env`): buka http://localhost:3111/#contact, isi form valid, submit.
Expected: muncul error "Layanan email belum dikonfigurasi." (dari API 500), form tidak hang, tidak ada crash. Screenshot desktop light + dark: email raksasa + form persegi.

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/contact.tsx src/components/contact-form.tsx
git commit -m "feat: kontak Swiss (email raksasa, form persegi)"
```

---

### Task 9: Footer + 404 + halaman detail proyek

**Files:**
- Modify: `src/components/site-footer.tsx`
- Modify: `src/app/not-found.tsx`
- Modify: `src/app/projects/[slug]/page.tsx`

**Interfaces:**
- Consumes: token Task 1; `site`, `socials`; `projects`/`getNextProject`.
- Produces: footer dengan nama outline raksasa; 404 dengan angka merah; detail proyek gaya Swiss (stack hairline, bullet kotak merah, next-project inversi).

- [ ] **Step 1: Rewrite `SiteFooter`**

`border-t border-border`. Bagian atas: nama outline — `text-[clamp(3rem,10vw,9rem)] font-extrabold stretch-display uppercase tracking-tight text-ghost leading-none select-none` (satu baris, `whitespace-nowrap overflow-hidden` agar tidak overflow — Review Focus #2). Di atas nama (overlap negatif kecil atau baris biasa): social links mono + link "KEMBALI KE ATAS ↑" (`href="#top"` — tambah `id="top"` di `<header>` Task 3 sudah lewat; kalau belum, pasang di `layout.tsx` body). Baris bawah: `border-t border-border`, `© {year} {name}` mono 11px kiri + `MALANG, INDONESIA — WIB` mono 11px kanan. Hapus tagline "banyak kopi".

- [ ] **Step 2: Rewrite `not-found.tsx`**

Tengah halaman: "404" `text-[clamp(6rem,20vw,12rem)] font-extrabold stretch-display text-accent leading-none`, di bawah: "Halaman tidak ditemukan." (`text-lg text-muted-foreground`), `ButtonLink variant="outline"` "KEMBALI KE BERANDA" (`href="/"`).

- [ ] **Step 3: Rewrite `projects/[slug]/page.tsx`**

Pertahankan `generateStaticParams`/`generateMetadata`/logika data. Layout:
- Breadcrumb "← Semua karya" (mono, `hover:text-accent`).
- Meta baris: `year · role` mono 12px muted.
- Judul: `text-4xl sm:text-6xl font-extrabold stretch-wide tracking-tight uppercase` (nama proyek di-uppercase).
- Ringkasan `text-lg text-muted-foreground`.
- Stack: baris `border-y border-border py-3 font-mono text-xs uppercase tracking-[0.1em] text-muted-foreground` (items dipisah " · ") — bukan chip.
- Links: `ButtonLink variant="outline"` (sudah Swiss dari Task 2).
- Gambar (jika ada): `border border-border` (tanpa rounded), full-width.
- Deskripsi + "Yang saya kerjakan": grid `lg:grid-cols-[1.3fr_1fr]`; panel kanan = `border border-border p-6` (tanpa rounded), bullet = `size-2 bg-accent` (kotak, bukan ikon centang) + teks `text-sm`.
- "Proyek berikutnya": baris full-width `group border border-border p-6 transition-colors duration-150 hover:bg-foreground hover:text-background` dengan pola kolom sama seperti `ProjectRow` (label mono + judul + `↗`).

- [ ] **Step 4: Verifikasi**

Run: `npm run build && npm run lint` → sukses.
Screenshot: footer desktop + mobile 390px (nama outline tidak overflow, `scrollWidth <= 390`); halaman 404 (buka URL acak); kelima halaman detail (smartreceipt, trip-web, lab-se, pendaftaran-smkn-2-singosari) light + dark — lab-se menampilkan gambar ber-hairline; next-project hover inversi.

- [ ] **Step 5: Commit**

```bash
git add src/components/site-footer.tsx src/app/not-found.tsx "src/app/projects/[slug]/page.tsx"
git commit -m "feat: footer outline, 404 merah, detail proyek Swiss"
```

---

### Task 10: Aset, pembersihan, investigasi badge

**Files:**
- Create: `public/foto.webp` (dari `public/foto.png`)
- Delete: `public/foto.png`, `public/projects/image.png`, `public/Gemini_Generated_Image_t7if9vt7if9vt7if.jpeg`
- Modify: `src/lib/site.ts` (`photo`)
- Modify: `.gitignore`

**Interfaces:**
- Consumes: tidak ada.
- Produces: `site.photo = "/foto.webp"`; repo tanpa aset mati.

- [ ] **Step 1: Konversi foto**

Run: `sips -s format webp -s formatOptions 80 public/foto.png --out public/foto.webp`
Expected: `foto.webp` dibuat (target < 300 KB). Update `site.photo` ke `"/foto.webp"`. Hapus `foto.png`.

- [ ] **Step 2: Hapus aset mati**

Hapus `public/projects/image.png` dan `public/Gemini_Generated_Image_t7if9vt7if9vt7if.jpeg` (sudah diverifikasi tidak dirujuk — grep ulang `image.png|Gemini` di `src/` sebelum hapus).

- [ ] **Step 3: `.gitignore`**

Tambah `*.bak.docx` (agar `cv/CV_Aldi_Surya_Saputra.ID.bak.docx` tidak ikut ter-commit).

- [ ] **Step 4: Investigasi badge "1 Insight"**

Cari sumbernya: grep `insight` di `node_modules/next/dist/` (case-insensitive, batasi hasil) + cek `next.config.ts`/fitur Next 16. Jika ada flag config untuk mematikannya di production → set. Jika tidak bisa dimatikan via config → catat di laporan akhir ke user (jangan tebar perubahan spekulatif).

- [ ] **Step 5: Verifikasi**

Run: `npm run build && npm run lint` → sukses.
Screenshot hero: foto WebP tampil normal (light + dark). `ls public/` bersih dari file yang dihapus.

- [ ] **Step 6: Commit**

```bash
git add public/foto.webp src/lib/site.ts .gitignore
git rm public/foto.png public/projects/image.png public/Gemini_Generated_Image_t7if9vt7if9vt7if.jpeg
git commit -m "chore: foto WebP, hapus aset mati, gitignore backup"
```

---

### Task 11: Verifikasi akhir, commit scope, deploy

**Files:**
- Tidak ada perubahan kode (kecuali perbaikan kecil yang ditemukan saat verifikasi).

**Interfaces:**
- Consumes: seluruh task sebelumnya.
- Produces: situs ter-deploy dengan seluruh redesign + section Kontak live.

- [ ] **Step 1: Build & lint final**

Run: `npm run build && npm run lint`
Expected: sukses, nol error.

- [ ] **Step 2: Screenshot komprehensif (sebelum/sesudah)**

Dev server port 3111. Ambil screenshot: (a) beranda full — light & dark, 1440px; (b) beranda — 390px, light & dark; (c) 4 halaman detail — light; (d) 404; (e) hover state baris Karya (light + dark). Simpan di `/private/var/folders/54/csgp22_s0vj3090ydtsdsz9m0000gn/T/opencode/` (bukan di repo). Bandingkan dengan screenshot "sebelum" dari audit awal.

- [ ] **Step 3: Cek console & overflow**

Di browser: console beranda + 1 halaman detail — **nol error** (termasuk `resume.pdf?_rsc`). Di 390px: `document.documentElement.scrollWidth <= 390` di beranda + detail.

- [ ] **Step 4: Lighthouse (best-effort)**

Run: `npx lighthouse http://localhost:3111 --only-categories=performance,accessibility --output=json --output-path=/tmp/lh-swiss.json --chrome-flags="--headless=new"`
Expected: performance ≥ 90, accessibility ≥ 95. Jika Chrome tidak tersedia di mesin ini, catat dan lewati (jangan install browser hanya untuk ini).

- [ ] **Step 5: Commit scope (keputusan doc)**

```bash
git add -A
git status  # pastikan cv/CV_Aldi_Surya_Saputra.ID.bak.docx TIDAK masuk (sudah di-gitignore)
git commit -m "feat: redesain Swiss minimal penuh (hero, section, detail, footer) + section Kontak"
```

- [ ] **Step 6: Deploy**

Run: `git push` (Vercel auto-deploy via `.vercel/project.json`).
Tunggu deploy, lalu verifikasi live di `https://aldisuryasaputra.vercel.app`: section Kontak ada (form + meta), nav 5 item, console nol error, `resume.pdf` terbuka, screenshot beranda live.

- [ ] **Step 7: Laporan ke user**

Ringkas: yang berubah, hasil lighthouse, status investigasi badge "1 Insight", dan **pengingat milestone user**: set `RESEND_API_KEY` + `CONTACT_FROM_EMAIL` di Vercel agar form benar-benar mengirim email (sebelumnya form menampilkan "Layanan email belum dikonfigurasi.").
