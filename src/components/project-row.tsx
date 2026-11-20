import Link from "next/link";
import { ArrowUpRightIcon } from "lucide-react";

import type { Project } from "@/lib/projects";

/**
 * Satu baris karya bergaya Swiss: nomor ghost, judul, kata kunci outline,
 * dan inversi warna penuh saat hover (hitam↔putih, bukan sekadar shadow).
 */
export function ProjectRow({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group grid gap-4 border-b border-border px-1 py-8 transition-colors duration-150 hover:bg-foreground hover:text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent lg:grid-cols-[88px_1fr_140px_72px] lg:items-center lg:gap-6 lg:px-6"
    >
      <span className="text-4xl font-extrabold tracking-tight text-ghost transition-colors duration-150 group-hover:text-accent lg:text-5xl stretch-display">
        {String(index + 1).padStart(2, "0")}
      </span>

      <div>
        <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">
          {project.title}
        </h3>
        <p className="mt-2 max-w-[52ch] text-sm leading-relaxed text-muted-foreground transition-colors duration-150 group-hover:text-background/75">
          {project.summary}
        </p>
        <p className="mt-4 font-mono text-[0.7rem] uppercase tracking-[0.1em] text-muted-foreground transition-colors duration-150 group-hover:text-background/75">
          {project.stack.join(" · ")}
        </p>
      </div>

      <span
        aria-hidden
        className="hidden text-right text-6xl font-extrabold tracking-tight text-ghost transition-colors duration-150 group-hover:text-ghost-inverted lg:block stretch-display"
      >
        {project.keyword}
      </span>

      <span className="flex items-center justify-between gap-3 lg:flex-col lg:items-end lg:gap-2">
        <span className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted-foreground transition-colors duration-150 group-hover:text-background/75">
          {project.year}
        </span>
        <ArrowUpRightIcon
          aria-hidden
          className="size-5 text-muted-foreground transition-all duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
        />
      </span>
    </Link>
  );
}
