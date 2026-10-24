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
  /** Catatan kecil di halaman detail, mis. alasan repositori tidak ditautkan. */
  note?: string;
  featured?: boolean;
};

/**
 * Daftar karya. Tambahkan satu objek baru dan grid di beranda, halaman
 * detail, sitemap, serta metadata akan ikut menyesuaikan otomatis.
 */
export const projects: Project[] = [
  {
    slug: "smartreceipt",
    title: "SmartReceipt Analyzer",
    year: "2026",
    role: "Proyek PBL — tim pengembang aplikasi",
    summary:
      "Aplikasi mobile untuk memindai struk belanja, mengenali item lewat OCR, dan mengelompokkan pengeluaran secara otomatis — seluruhnya berjalan offline.",
    description: [
      "SmartReceipt berawal dari masalah kecil yang sering dialami mahasiswa: struk belanja menumpuk, dan mencatat pengeluaran satu per satu terasa merepotkan. Aplikasi ini memindai struk lewat kamera, membaca teksnya dengan OCR, lalu memecahnya menjadi daftar item beserta nominalnya.",
      "Bagian paling menantang adalah mengenali nama item yang ditulis singkat dan penuh noise khas printer thermal. Saya membangun pipeline machine learning on-device: teks hasil OCR dinormalisasi, diubah menjadi vektor TF-IDF, lalu diklasifikasikan dengan Multinomial Naive Bayes ke 15 kategori belanja. Model dilatih pada 6.026 sampel sintetis yang diperkaya katalog produk retail Indonesia, dengan pembagian data berbasis produk unik agar evaluasi benar-benar mengukur kemampuan model pada produk yang belum pernah dilihat.",
      "Karena semua proses berjalan di perangkat, aplikasi tetap bisa dipakai tanpa koneksi internet dan data pengeluaran tidak pernah keluar dari ponsel.",
    ],
    highlights: [
      "Membangun pipeline OCR → normalisasi teks → TF-IDF → Naive Bayes yang berjalan offline di dalam aplikasi Flutter.",
      "Melatih model 15 kategori pada 6.026 sampel, lengkap dengan leakage guard supaya produk data uji tidak muncul di data latih.",
      "Menyusun parser struk yang memisahkan nama item, kuantitas, dan harga dari teks OCR yang tidak rapi.",
      "Menambahkan dashboard analitik dan prediksi pengeluaran dari riwayat transaksi yang tersimpan lokal.",
    ],
    stack: ["Flutter", "Dart", "OCR", "TF-IDF", "Naive Bayes", "SQLite"],
    links: [
      {
        label: "Lihat repositori",
        href: "https://github.com/Aldiss1/PBL_SmartReceipt",
      },
    ],
    featured: true,
  },
  {
    slug: "trip-web",
    title: "Trip Web",
    year: "2026",
    role: "Proyek tim — backend & panel admin",
    summary:
      "Aplikasi pemesanan paket wisata: katalog destinasi, jadwal keberangkatan, promo, dan pengelolaan booking lewat satu panel admin.",
    description: [
      "Trip Web adalah platform pemesanan paket wisata yang mempertemukan calon peserta dengan pengelola perjalanan. Pengunjung bisa melihat destinasi, memeriksa jadwal keberangkatan, dan mengajukan pendaftaran; pengelola memproses semuanya dari satu panel admin.",
      "Saya menangani backend dan panel admin berbasis Laravel dan Filament: resource untuk destinasi, jadwal, promo, booking, dan testimoni, pengaturan situs yang bisa diubah tanpa menyentuh kode, notifikasi pendaftaran baru, serta ekspor laporan ke Excel. Saya juga membuat command terjadwal untuk membatalkan booking yang kedaluwarsa agar kuota jadwal tidak tertahan.",
      "Repositori bersifat privat karena dipakai untuk kebutuhan operasional klien.",
    ],
    highlights: [
      "Membangun resource Filament untuk destinasi, jadwal, promo, booking, dan testimoni.",
      "Membuat command terjadwal yang otomatis membatalkan booking kedaluwarsa dan melepas kembali kuotanya.",
      "Menambahkan ekspor laporan pendaftaran ke Excel serta notifikasi untuk pengelola.",
    ],
    stack: ["Laravel", "PHP", "Filament", "MySQL", "Tailwind CSS"],
    note: "Repositori privat — dipakai untuk operasional klien.",
    featured: true,
  },
  {
    slug: "lab-se",
    title: "Sistem Informasi Lab SE",
    year: "2025",
    role: "Proyek PBL — pengembang web",
    summary:
      "Sistem informasi laboratorium Software Engineering untuk mengelola anggota, penelitian, publikasi, dan konten profil dalam satu panel admin.",
    description: [
      "Lab SE adalah sistem informasi untuk mengelola kegiatan laboratorium Software Engineering di kampus. Sebelumnya data anggota, penelitian dosen, dan publikasi tercatat terpisah-pisah, sehingga sulit dilihat sebagai satu gambaran utuh.",
      "Saya mengerjakan modul admin beserta lapisan basis datanya: CRUD anggota, jabatan, penelitian, dan publikasi, halaman blog, serta pengelolaan roadmap laboratorium. Bagian yang paling saya dalami adalah sisi PostgreSQL — menyusun stored procedure dan materialized view untuk laporan yang sering dibuka, sekaligus menambahkan filter input untuk menutup celah SQL injection.",
      "Repositori proyek ini bersifat privat karena memuat dokumen dan data internal laboratorium.",
    ],
    highlights: [
      "Membangun panel admin dengan modul anggota, jabatan, penelitian, publikasi, blog, dan roadmap.",
      "Menulis stored procedure dan materialized view PostgreSQL agar laporan berat tidak membebani query harian.",
      "Menerapkan lapisan anti-injection dan validasi input di seluruh endpoint PHP.",
    ],
    stack: ["PHP", "PostgreSQL", "Bootstrap", "JavaScript"],
    note: "Repositori privat — memuat dokumen internal laboratorium.",
  },
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
