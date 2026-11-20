# Redesain Portofolio — Swiss Minimal

Tanggal: 2026-11-19
Status: APPROVED (mockup ditunjukkan ke user, user: "sudah cukup" — lanjut eksekusi)
Owner: Aldi Surya Saputra (dengan bantuan agent)

## Intent & Why

Portofolio saat ini rapi tapi "sunyi": hampir monokrom, warna brand (indigo) nyaris tak terlihat, kartu proyek tanpa visual, dan keseluruhan terasa seperti template shadcn yang bersih tanpa kepribadian. Tujuannya: redesain penuh ke arah **Swiss minimal** yang modern dan **anti-slop** — bebas dari tampilan generik ala AI (gradient, glassmorphism, rounded corner, blob, warna ungu/indigo).

Hasil yang diharapkan: situs dengan identitas tipografi yang tegas, struktur grid yang terlihat, satu aksen warna yang dipakai berani, dan konten yang lebih lengkap (section Pendidikan + IPK, visual di kartu proyek).

## Goals

1. Identitas visual Swiss: grid ketat, whitespace, tipografi sebagai bintang, satu aksen warna.
2. Anti-slop: nol gradient, nol glassmorphism, nol rounded corner, nol shadow, nol blob, nol indigo.
3. Section Karya jadi pusat perhatian: setiap proyek punya "cover" visual tipografis yang konsisten.
4. Konten baru: section Pendidikan (D4 TI Polinema, 2024–sekarang, IPK 3,53) + data strip di hero.
5. Section Kontak (yang sudah ada di kode lokal tapi belum pernah di-deploy) ikut jadi bagian redesign dan ter-deploy.
6. Perbaikan teknis kecil: error 404 console (`resume.pdf?_rsc=...`), aset mati, optimasi foto.

## Non-goals

- Tidak ganti stack: tetap Next.js 16 + Tailwind v4 + shadcn + next-themes + motion.
- Tidak tambah dependensi baru (font lewat `next/font/google`).
- Tidak ubah isi teks proyek/bio (hanya layout), kecuali konten baru yang disepakati.
- Tidak sentuh halaman `cv/` (sudah punya desain sendiri).
- Tidak bikin CMS, i18n, atau blog.
- Tidak bikin screenshot aplikasi (agent tidak punya akses ke aplikasinya) — cover proyek dibuat tipografis.

## Anti-goals (ini = kegagalan meski secara teknis jalan)

- Hasilnya tetap terlihat seperti "template AI": kalau ada gradient, blur, rounded-2xl, atau warna ungu, itu gagal.
- Situs terasa kosong di layar besar (whitespace Swiss ≠ layout yang longgar tanpa struktur).
- Dark mode jadi "inversi asal" yang kontrasnya janggal.
- Animasi jadi berlebihan (Swiss = motion minimal dan fungsional).

## Constraints

- Stack: Next.js 16 (App Router, `cacheComponents` + `partialPrefetching` aktif), Tailwind v4, shadcn/ui, React 19.
- Kontak form tetap pakai route `/api/contact` (Resend) — jangan ubah kontraknya.
- Theme toggle (next-themes, class strategy) tetap ada; dark mode = inversi Swiss.
- A11y: focus-visible, aria-label, `prefers-reduced-motion` (sudah ada di `Reveal`, pertahankan).
- SEO: metadata, sitemap, robots, og-image tetap jalan (og-image di-update sesuai identitas baru).
- Bahasa situs: Indonesia.

## Approaches (yang dipertimbangkan)

| Arah | Deskripsi | Trade-off |
|---|---|---|
| Brutalist/editorial | Tipografi raksasa, garis grid tebal, mentah, mono-heavy, kontras ekstrem | Paling "berani", tapi berisiko terasa keras dan kurang profesional untuk target rekruter magang |
| **Swiss minimal** ✅ (dipilih) | Grid ketat, whitespace, satu aksen warna tegas, tipografi grotesque, struktur terlihat | Elegan dan profesional; risikonya bisa terasa "dingin" kalau aksen warnanya kurang berani — diatasi dengan merah Swiss yang dipakai tegas |
| Terminal/developer | Monospace-driven, nuansa code, gelap | Unik tapi niche; tidak cocok untuk portofolio yang juga dibaca non-technical (HR) |

Pemilih: user memilih **Swiss minimal** (2026-11-19).

## Desain

### Sistem desain

**Warna**

| Token | Light | Dark |
|---|---|---|
| background | `#FFFFFF` | `#0A0A0A` |
| foreground (ink) | `#111111` | `#F5F5F5` |
| muted | `#6F6F6F` | `#8A8A8A` |
| hairline (border) | `#E4E4E4` | `#262626` |
| accent (Swiss red) | `#E30613` | `#FF4438` |

- Indigo (`--brand` oklch 264°) dihapus total; diganti `--accent` merah di atas.
- Tidak ada warna lain. Tidak ada gradient. Tidak ada opacity-wash di luar hairline.

**Tipografi**

- **Archivo** (variable, Google Fonts via `next/font`) untuk semua teks sans — display sampai body. Heading pakai weight 600–800, tracking ketat (`-0.02em` sampai `-0.04em`), dan untuk judul besar pakai **width axis expanded** (`font-stretch: 115–125%`) untuk kesan poster Swiss.
- **Geist Mono** (sudah ada) untuk: eyebrow/label section, meta data (tahun, periode), nav, tombol sekunder, caption. Uppercase + letter-spacing `0.14em` untuk label.
- Hierarki: hero name ~`clamp(3rem, 9vw, 7.5rem)`; judul section ~`clamp(2rem, 4vw, 3.5rem)`; body 16–18px, leading 1.5; meta 12–13px.
- Uppercase dipakai untuk: nama di hero, label, nav, tombol — bukan untuk paragraf.

**Grid & layout**

- Container: `max-width: 1280px`, padding-inline 24px (mobile) / 48px (desktop). Lebih lebar dari sekarang (72rem) supaya grid terasa "penuh".
- **Full-bleed hairline**: pemisah antar-section berupa garis 1px yang membentang penuh viewport (bukan hanya container). Ini pengganti kartu ber-border.
- Section: padding-block 96–128px (desktop), 64px (mobile).
- Setiap section punya header baris: `[0X] — LABEL` (mono, kecil) di kiri, bisa ada meta kecil di kanan — satu pola untuk semua section.
- Radius: **0 di seluruh situs** (override `--radius: 0` di theme).
- Shadow: **tidak ada**. Depth hanya dari hairline dan inversi warna.

**Komponen**

- **Tombol**: persegi, 1px border ink, uppercase mono 12–13px, padding 12–16px. Primary = bg ink, teks background. Hover: primary jadi bg accent; outline: border jadi accent + teks accent. Transisi 150ms.
- **Link inline**: underline 1px, hover underline accent + teks accent.
- **Status "Terbuka untuk magang"**: kotak kecil persegi merah 8×8px (bukan dot bulat, bukan pulse) + teks mono uppercase.
- **Input form**: persegi, 1px border hairline, focus = border ink (bukan ring biru), background tetap.
- **Badge/stack tech**: tidak pakai chip rounded — daftar teks mono dipisah koma, atau baris dengan hairline.

### Per halaman

**Header (sticky)**
- Solid background (tanpa backdrop-blur), hairline bawah.
- Kiri: kotak merah 28×28 berisi "AS" (putih, 600) + "ALDI SURYA SAPUTRA" mono uppercase 12px.
- Kanan (desktop): nav mono uppercase (TENTANG / PENDIDIKAN / PENGALAMAN / KARYA / KONTAK), jam live "MALANG — 14:32 WIB" (mono, update tiap menit, hidden < lg), theme toggle (ikon sun/moon di tombol persegi).
- Mobile: hamburger (Sheet) seperti sekarang, isi nav mono uppercase.

**Hero**
- Tanpa bg-grid pattern, tanpa glow (dihapus).
- Baris meta atas (mono): `[TERBUKA UNTUK MAGANG]` + di kanan: lokasi + email.
- Nama: "ALDI SURYA SAPUTRA" — Archivo expanded, uppercase, raksasa, 2 baris, tracking ketat. Ini pernyataan utama halaman (gaya poster).
- Baris role di bawah nama: "Mahasiswa Teknik Informatika — Politeknik Negeri Malang" (18–20px, ink, bukan muted).
- Kolom kanan: foto profil persegi (4:5), **tanpa** rounded/glow/frame dekoratif — hanya hairline 1px + caption mono di bawah ("A. S. — MALANG, 2026").
- Baris CTA: `LIHAT KARYA ↓` (primary) + `UNDUH CV` (outline). "Kirim email" dihapus dari hero (sudah ada di meta baris atas + section Kontak + footer).
- **Data strip** di bawah hero (di atas hairline full-bleed): 4 kolom data mono — `IPK 3,53` (angka merah) / `4 PROYEK` / `1 MAGANG` / `2024—SEKARANG`. Angka besar Archivo, label mono kecil.
- Motion: nama reveal dengan line-mask (clip-path dari bawah, 0.5s) atau fade+rise 12px; sisanya fade+rise 12px, 0.4s, stagger 0.05s.

**01 — Tentang**
- 2 kolom: kiri bio (18px, ink, max-width 60ch), kanan **tabel keahlian** (pengganti chip): baris per kategori — label mono uppercase di kiri, items di kanan (14px, ink), dipisah hairline. Baris hover: label jadi merah.

**02 — Pendidikan** (section baru)
- Satu baris data besar ala Swiss: kiri "D4 TEKNIK INFORMATIKA" (Archivo 28–32px) + "Politeknik Negeri Malang" (16px, muted); tengah "2024 — SEKARANG" (mono); kanan **IPK 3,53** — angka Archivo expanded 56–64px warna merah + label mono "IPK / SKALA 4,00".
- Section tipis (padding lebih kecil), bukan kartu.

**03 — Pengalaman**
- Pengganti 2 kartu: **daftar baris full-width** dengan hairline antar-baris. Tiap baris: `[PERIODE mono] [JUDUL Archivo 20px + ORGANISASI 14px muted] [TIP: MAGANG/ORGANISASI — mono, kanan]`. Hover baris: teks judul jadi merah + panah kecil muncul.
- Deskripsi satu baris tetap ada di bawah judul (14px, muted).

**04 — Karya** (pusat perhatian)
- Pengganti grid kartu 3+1: **4 baris full-width** (list ala Swiss), dipisah hairline. Tiap baris (min-height ~220px desktop):
  - Kolom 1: nomor besar "01" Archivo expanded 64–80px, warna hairline (ghost) — jadi merah saat hover.
  - Kolom 2: judul Archivo 28–36px + ringkasan 15px muted (max 2 baris).
  - Kolom 3 (kanan, bawah): stack mono 12px + tahun mono.
  - Panah `↗` di kanan atas.
  - **Hover: inversi** — baris jadi bg ink, teks background (di dark mode: bg foreground), transisi 150ms. Ini interaksi "signature" situs.
- **Cover visual**: karena 3 dari 4 proyek tidak punya screenshot, tiap baris punya elemen tipografis: kata kunci proyek besar outline (stroke text, `text-stroke` 1px, warna hairline) di belakang/kanan — mis. "OCR" (SmartReceipt), "TRIP" (Trip Web), "LAB SE" (Lab SE), "PSB" (SMKN 2). Konsisten untuk semua proyek; kalau nanti user menyediakan screenshot, data model `Project.image` sudah ada dan baris bisa menampilkan gambar di kolom kanan (fitur opsional, tidak di-build sekarang).
- Link ke detail tetap `/projects/[slug]`.

**05 — Kontak**
- Heading besar: "PUNYA PROYEK ATAU TAWARAN MAGANG?" + sub "Kirim pesan langsung dari sini."
- **Email raksasa**: `aldisuryasaputra693@gmail.com` sebagai link Archivo 24–32px underline (word-break di mobile) — statement utama section.
- Grid 2 kolom: kiri form (input persegi, tombol primary "KIRIM PESAN"), kanan meta mono (EMAIL / LOKASI / SOSIAL sebagai daftar baris dengan hairline + link persegi kecil).
- Status "Terbuka untuk magang" di bawah meta.

**Footer**
- Hairline atas. Baris 1: nama besar outline (stroke text, 8–12vw, warna hairline) "ALDI SURYA SAPUTRA" membentang penuh — penutup poster. Di atasnya (overlap): social links mono + "KEMBALI KE ATAS ↑".
- Baris 2: `© 2026 ALDI SURYA SAPUTRA` (mono, kiri) + `MALANG, INDONESIA — WIB` (mono, kanan). Tagline "banyak kopi" dihapus (terlalu kasual untuk tone Swiss).

**Halaman detail proyek**
- Baris meta mono (tahun · role), judul Archivo expanded 48–64px, ringkasan 18px.
- Stack sebagai baris mono dengan hairline (bukan chip).
- Gambar (Lab SE): full-width, hairline 1px, tanpa rounded.
- "Yang saya kerjakan": list dengan penanda **kotak merah 8×8** (bukan ikon centang bulat).
- "Proyek berikutnya": baris full-width dengan hover inversi (pola sama dengan Karya).

**404**
- "404" Archivo expanded 160px+ warna merah, teks mono di bawah, tombol outline "KEMBALI KE BERANDA".

**OG image & favicon**
- OG: bg putih, teks hitam, satu kotak merah — "ALDI SURYA SAPUTRA / Mahasiswa Teknik Informatika / aldisuryasaputra.vercel.app". Tanpa foto (konsisten dengan identitas).
- Favicon: kotak merah berisi "AS" putih (ganti hitam).

### Motion

- `Reveal`: duration 0.4s, distance 12px, ease `[0.22, 1, 0.36, 1]`, stagger 0.05s. Reduced-motion: statis (sudah ada).
- Hover inversi baris Karya/Pengalaman: 150ms, tanpa translate.
- Nav link: underline sweep (scaleX dari kiri) 200ms, warna merah.
- Jam header: update tiap 30 detik, tanpa animasi.
- Tidak ada: pulse, parallax, magnetic, marquee, blob.

### Konten baru (disepakati user)

- Section Pendidikan: D4 Teknik Informatika, Politeknik Negeri Malang, 2024–sekarang, IPK 3,53/4,00 (sumber: `cv/index.html`).
- Data strip hero: IPK 3,53 · 4 proyek · 1 magang · 2024—sekarang.
- Nav: tambah item "Pendidikan" (menjadi 5 item).
- Jam live header (lokasi + waktu WIB).

### Perbaikan teknis (ikut dalam redesign)

1. **Fix 404 console `resume.pdf?_rsc=...`**: `ButtonLink` memakai `next/link` untuk href aset (PDF) → Next.js prefetch sebagai route RSC dan 404. Solusi: `ButtonLink` render `<a>` biasa ketika href bukan route internal (deteksi: ada extension file / diawali `http` / `mailto:`).
2. **Hapus aset mati**: `public/projects/image.png` (1,7 MB) dan `public/Gemini_Generated_Image_*.jpeg` (1,3 MB) — tidak dirujuk kode mana pun.
3. **Optimasi foto**: `public/foto.png` (1,4 MB PNG) → konversi ke WebP, update `site.photo`.
4. **Badge "1 Insight"** (widget oranye pojok kiri bawah, muncul di production): cari sumbernya (kemungkinan fitur Next.js/Vercel) dan matikan di production.
5. **Commit & deploy**: seluruh perubahan (termasuk section Kontak yang selama ini untracked) di-commit dan ter-deploy ke Vercel.

## Keputusan yang di-resolve saat review (2026-11-19)

- **Arah keseluruhan**: user melihat mockup (hero + section Karya) lalu berkata "sudah cukup" → diartikan **setuju, lanjut**. Tidak ada revisi arah.
- **Heading section**: user tidak memilih eksplisit. **Keputusan builder: pertahankan kalimat besar** (label mono + heading Archivo). Alasan: konsisten dengan non-goal "tidak ubah isi teks, hanya layout", dan copy-nya sudah kuat. Boleh ditolak user kapan saja.

## Keputusan builder (bukan kesepakatan user — boleh ditolak saat review)

- Aksen warna: **merah Swiss `#E30613`** menggantikan indigo (alasan: indigo = warna paling "AI-slop"; merah = identitas Swiss klasik dan tegas).
- Font display: **Archivo** (variable, termasuk width axis) menggantikan Geist Sans untuk teks sans.
- Kartu proyek → **baris full-width dengan hover inversi** (bukan grid 2×2) — menghindari masalah 3+1 dan memberi tiap proyek presence penuh.
- Cover proyek: **tipografis** (kata kunci outline), bukan screenshot — karena 3 dari 4 proyek tidak punya screenshot; data model sudah siap kalau nanti ada gambar.
- Header solid tanpa blur; status indicator kotak merah statis (bukan dot pulse).
- Tagline footer "dan banyak kopi" dihapus.
- **Scope commit**: commit seluruh pekerjaan redesign + `public/resume.pdf` (konten live di balik tombol "UNDUH CV") + `docs/` + update `.gitignore` (`.env.example` exception, `.superpowers/`). File `cv/*.docx`/`cv/*.pdf` yang termodifikasi ikut di-commit (konsisten dengan riwayat commit user soal CV). File `cv/CV_Aldi_Surya_Saputra.ID.bak.docx` TIDAK di-commit (produk sampingan backup) — masuk `.gitignore`.
- **Resend**: tidak ada `.env` lokal dan tidak ada bukti env var di Vercel → **milestone aksi user** sebelum fase deploy/verify: user harus membuat API key Resend dan menyetel `RESEND_API_KEY` + `CONTACT_FROM_EMAIL` di Vercel. Form harus degrade gracefully: kalau key belum ada, submit menampilkan pesan error yang jelas, dan link email tetap tersedia sebagai fallback.

## Yang dibiarkan untuk builder

- Detail class Tailwind per komponen (selama mengikuti sistem di atas).
- Implementasi jam live (interval + cleanup, SSR-safe).
- Rincian break-point per section (prinsip: mobile = stack 1 kolom, hairline tetap).
- Cara mematikan badge "1 Insight" (investigasi dulu; kalau tidak bisa dimatikan lewat config, laporkan ke user).

## Verifikasi

- `npm run build` sukses; `npm run lint` bersih.
- Lighthouse (production build): performance > 90, a11y > 95.
- Manual: light + dark, desktop (1440) + mobile (390), semua section, hover states, form kontak (submit sukses/error), halaman detail 4 proyek, 404, og-image.
- Console production: nol error (termasuk `resume.pdf?_rsc` yang hilang).
- Screenshot perbandingan sebelum/sesudah untuk review user.
