import Link from "next/link";
import { ArrowUpRightIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import type { Project } from "@/lib/projects";
import { cn } from "@/lib/utils";

export function ProjectCard({
  project,
  index,
  className,
}: {
  project: Project;
  index: number;
  className?: string;
}) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={cn(
        "group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border/80 bg-card/40 p-6 transition-all duration-300",
        "hover:-translate-y-1 hover:border-foreground/20 hover:bg-card hover:shadow-[0_16px_40px_-24px_rgba(0,0,0,0.35)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60",
        className
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-16 size-48 rounded-full bg-brand/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
      />

      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <span className="font-mono text-xs text-muted-foreground">
            {String(index + 1).padStart(2, "0")} · {project.year}
          </span>
          <ArrowUpRightIcon className="size-4 text-muted-foreground transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
        </div>

        <h3 className="mt-5 text-xl font-medium tracking-tight">
          {project.title}
        </h3>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
          {project.summary}
        </p>
      </div>

      <div className="relative mt-7 flex flex-wrap gap-1.5">
        {project.stack.slice(0, 4).map((tech) => (
          <Badge
            key={tech}
            variant="secondary"
            className="rounded-md font-normal text-muted-foreground"
          >
            {tech}
          </Badge>
        ))}
      </div>
    </Link>
  );
}
