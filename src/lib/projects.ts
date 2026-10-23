export type Project = {
  slug: string;
  title: string;
  year: string;
  role: string;
  summary: string;
  description: string[];
  highlights: string[];
  stack: string[];
  links?: { label: string; href: string }[];
  featured?: boolean;
};

/**
 * Proyek contoh — ganti dengan karya nyata milikmu.
 * Tambahkan satu objek baru dan grid di beranda, halaman detail, sitemap,
 * serta metadata akan ikut menyesuaikan otomatis.
 */
export const projects: Project[] = [
  {
    slug: "sipustaka",
    title: "SIPustaka",
    year: "2025",
    role: "Tugas besar basis data",
    summary:
      "Sistem informasi perpustakaan sekolah untuk mengelola buku, anggota, dan peminjaman dalam satu tempat.",
    description: [
      "SIPustaka dibuat untuk menggantikan pencatatan peminjaman buku yang masih manual di perpustakaan sekolah. Petugas bisa mendata buku, mencatat anggota, dan memproses peminjaman serta pengembalian lewat satu dashboard.",
      "Saya mengerjakan bagian perancangan basis data dan alur backend: membuat skema tabel relasional, menulis query untuk laporan peminjaman, lalu menghubungkannya ke antarmuka berbasis Laravel Blade.",
    ],
    highlights: [
      "Merancang skema relasional untuk buku, anggota, dan transaksi peminjaman dengan relasi yang rapi.",
      "Membuat laporan peminjaman dan pengembalian yang bisa difilter berdasarkan tanggal.",
      "Menambahkan validasi stok supaya buku tidak bisa dipinjam melebihi jumlah yang tersedia.",
    ],
    stack: ["Laravel", "PHP", "MySQL", "Bootstrap"],
    links: [{ label: "Lihat repositori", href: "https://github.com/aldisuryas" }],
    featured: true,
  },
  {
    slug: "website-himpunan",
    title: "Website Himpunan",
    year: "2025",
    role: "Proyek organisasi",
    summary:
      "Website profil dan pusat informasi himpunan jurusan, dipakai untuk publikasi kegiatan dan pendaftaran anggota baru.",
    description: [
      "Website ini menjadi wajah himpunan di internet: profil jurusan, daftar pengurus, agenda kegiatan, dan formulir pendaftaran anggota baru. Sebelumnya semua informasi hanya tersebar di media sosial.",
      "Saya memegang peran pengembangan frontend dan deploy. Halaman dibangun dengan Next.js dan Tailwind CSS, lalu di-deploy ke Vercel supaya pembaruan konten bisa langsung tayang.",
    ],
    highlights: [
      "Membangun halaman profil, agenda, dan galeri kegiatan yang responsif di ponsel.",
      "Membuat formulir pendaftaran anggota yang datanya masuk ke spreadsheet panitia.",
      "Menyerahkan dokumentasi singkat agar pengurus berikutnya bisa memperbarui konten sendiri.",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    links: [{ label: "Lihat situs", href: "https://example.com" }],
    featured: true,
  },
  {
    slug: "kasir-warung",
    title: "Aplikasi Kasir Warung",
    year: "2024",
    role: "Proyek pribadi",
    summary:
      "Aplikasi kasir sederhana untuk warung kecil: catat transaksi, hitung total, dan lihat rekap penjualan harian.",
    description: [
      "Aplikasi ini lahir dari pengalaman membantu warung keluarga yang masih mencatat penjualan di buku tulis. Tujuannya sederhana: mempercepat proses hitung total dan membuat rekap harian lebih mudah dibaca.",
      "Antarmuka dibuat sesederhana mungkin agar tetap nyaman dipakai di layar ponsel. Data transaksi disimpan di MySQL lewat API kecil berbasis Node.js.",
    ],
    highlights: [
      "Membuat alur transaksi tiga langkah: pilih barang, atur jumlah, lalu simpan pembayaran.",
      "Menampilkan rekap penjualan harian dan daftar barang paling sering terjual.",
      "Menguji aplikasi langsung bersama pemilik warung dan menyesuaikan tombol agar mudah dijangkau satu tangan.",
    ],
    stack: ["React", "Node.js", "MySQL", "Tailwind CSS"],
  },
  {
    slug: "company-profile-umkm",
    title: "Company Profile UMKM",
    year: "2024",
    role: "Proyek magang",
    summary:
      "Website profil untuk usaha kecil yang menampilkan katalog produk, cerita usaha, dan kontak pemesanan.",
    description: [
      "Proyek ini dikerjakan saat magang untuk membantu sebuah UMKM punya halaman resmi sendiri. Sebelumnya produk hanya dipromosikan lewat status WhatsApp.",
      "Saya menangani desain antarmuka hingga implementasi: menyusun struktur halaman, memotret ulang katalog produk, dan memastikan halaman tetap ringan saat dibuka dengan koneksi lambat.",
    ],
    highlights: [
      "Membangun halaman katalog produk dengan foto yang dioptimalkan agar cepat dimuat.",
      "Menambahkan tombol pemesanan langsung ke WhatsApp dengan pesan yang sudah terisi.",
      "Menyusun panduan singkat agar pemilik usaha bisa mengganti foto dan teks sendiri.",
    ],
    stack: ["Next.js", "Tailwind CSS", "Vercel"],
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getNextProject(slug: string) {
  const index = projects.findIndex((project) => project.slug === slug);
  if (index === -1) return undefined;
  return projects[(index + 1) % projects.length];
}
