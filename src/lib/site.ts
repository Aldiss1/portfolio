/**
 * Ubah file ini untuk menjadikan portfolio milikmu.
 * Semua yang dirender situs (nama, bio, tautan, stack) berasal dari sini.
 */

export const site = {
  name: "Aldi Surya Saputra",
  initials: "AS",
  role: "Mahasiswa Teknik Informatika",
  tagline:
    "Mahasiswa Teknik Informatika Politeknik Negeri Malang yang membangun web dari frontend sampai backend.",
  location: "Malang, Indonesia",
  email: "aldisuryasaputra693@gmail.com",
  url: "https://aldisuryasaputra.vercel.app",
  available: true,
  availableLabel: "Terbuka untuk magang",
  photo: null as string | null,
  photoAlt: "Foto profil Aldi Surya Saputra",
  resume: "/resume.pdf",
  copyrightYear: 2026,
} as const;

export const bio = [
  "Saya mahasiswa Teknik Informatika di Politeknik Negeri Malang. Ketertarikan saya ada di pengembangan web — mulai dari merancang tampilan, menulis kode frontend, sampai menyambungkannya ke database di sisi backend.",
  "Sebagian besar pengalaman saya datang dari proyek berbasis mata kuliah (PBL) yang dikerjakan dalam tim: sistem informasi laboratorium, platform pemesanan paket wisata, sampai aplikasi mobile Flutter dengan model machine learning yang berjalan offline. Saya senang mempelajari hal baru dan sedang mencari kesempatan magang untuk berkembang di tim nyata.",
] as const;

export const stats = [
  { label: "Proyek besar dikerjakan", value: "3" },
  { label: "Sertifikat & pelatihan", value: "3" },
  { label: "Teknologi dipelajari", value: "10+" },
] as const;

export const skills = [
  {
    title: "Web",
    items: ["HTML", "CSS", "JavaScript", "TypeScript", "PHP"],
  },
  {
    title: "Framework",
    items: ["React", "Next.js", "Laravel", "Filament", "Tailwind CSS"],
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

export type SocialKey = "github" | "linkedin" | "x" | "email";

export const socials: {
  key: SocialKey;
  label: string;
  href: string;
}[] = [
  { key: "github", label: "GitHub", href: "https://github.com/Aldiss1" },
  { key: "linkedin", label: "LinkedIn", href: "https://linkedin.com/in/aldisuryas" },
  { key: "x", label: "X", href: "https://x.com/aldisuryas" },
  { key: "email", label: "Email", href: `mailto:${site.email}` },
];

export const nav = [
  { label: "Tentang", href: "/#about" },
  { label: "Karya", href: "/#work" },
] as const;
