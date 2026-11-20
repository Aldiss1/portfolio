/**
 * Ubah file ini untuk menjadikan portfolio milikmu.
 * Semua yang dirender situs (nama, bio, tautan, stack) berasal dari sini.
 */

export const site = {
  name: "Aldi Surya Saputra",
  initials: "AS",
  role: "Mahasiswa Teknik Informatika",
  tagline:
    "Mahasiswa Teknik Informatika Politeknik Negeri Malang yang membangun aplikasi web dengan Laravel dan Filament, dari database sampai antarmuka.",
  location: "Malang, Indonesia",
  email: "aldisuryasaputra693@gmail.com",
  url: "https://aldisuryasaputra.vercel.app",
  available: true,
  availableLabel: "Terbuka untuk magang",
  photo: "/foto.webp" as string | null,
  photoAlt: "Foto profil Aldi Surya Saputra",
  resume: "/resume.pdf",
  copyrightYear: 2026,
} as const;

export const education = {
  level: "D4 Teknik Informatika",
  school: "Politeknik Negeri Malang",
  period: "2024 — sekarang",
  gpa: "3,53",
  gpaScale: "skala 4,00",
} as const;

export const bio = [
  "Saya mahasiswa Teknik Informatika di Politeknik Negeri Malang dengan fokus pengembangan web di ekosistem Laravel — mulai dari merancang skema database, membangun backend dengan Eloquent, sampai menyusun panel admin memakai Filament.",
  "Sebagian besar pengalaman saya datang dari proyek berbasis mata kuliah (PBL) yang dikerjakan dalam tim: platform pemesanan paket wisata dan sistem pendaftaran siswa baru yang keduanya dibangun dengan Laravel, sistem informasi laboratorium, sampai aplikasi mobile Flutter dengan model machine learning yang berjalan offline. Saya senang mempelajari hal baru dan sedang mencari kesempatan magang untuk berkembang di tim nyata.",
] as const;

export const skills = [
  {
    title: "Web",
    items: ["PHP", "HTML", "CSS", "JavaScript", "TypeScript"],
  },
  {
    title: "Framework",
    items: ["Laravel", "Filament", "React", "Next.js", "Tailwind CSS"],
  },
  {
    title: "Mobile",
    items: ["Flutter", "Dart"],
  },
  {
    title: "Database",
    items: ["MySQL", "PostgreSQL", "SQLite"],
  },
  {
    title: "Perkakas",
    items: ["Git", "GitHub", "Figma", "VS Code", "Postman"],
  },
] as const;

export const experiences = [
  {
    type: "Magang",
    period: "Juli – Desember 2023",
    title: "Software Engineer Intern",
    organization: "Software House JV Partner",
    description: "Membuat frontend website Tukan Indonesia selama masa magang.",
  },
  {
    type: "Organisasi",
    title: "Ketua Departemen Internal",
    organization: "HMTI — Himpunan Mahasiswa Teknologi Informasi",
    description: "Memimpin departemen internal HMTI Politeknik Negeri Malang.",
  },
] as const;

export type SocialKey = "github" | "linkedin" | "instagram" | "email";

export const socials: {
  key: SocialKey;
  label: string;
  href: string;
}[] = [
  { key: "github", label: "GitHub", href: "https://github.com/Aldiss1" },
  { key: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/aldisuryasaputra/" },
  { key: "instagram", label: "Instagram", href: "https://www.instagram.com/_aldis16/" },
  { key: "email", label: "Email", href: `mailto:${site.email}` },
];

export const nav = [
  { label: "Tentang", href: "/#about" },
  { label: "Pendidikan", href: "/#education" },
  { label: "Pengalaman", href: "/#experience" },
  { label: "Karya", href: "/#work" },
  { label: "Kontak", href: "/#contact" },
] as const;
