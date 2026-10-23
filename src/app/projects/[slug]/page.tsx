import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeftIcon, ArrowUpRightIcon, CheckIcon } from "lucide-react";

import { ButtonLink } from "@/components/button-link";
import { Reveal } from "@/components/motion/reveal";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { getNextProject, getProject, projects } from "@/lib/projects";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

// Every project is prerendered at build time, so navigation can resolve params
// synchronously without a Suspense fallback.
export const instant = false;

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) return { title: "Proyek tidak ditemukan" };

  return {
    title: project.title,
    description: project.summary,
    openGraph: {
      title: project.title,
      description: project.summary,
      type: "article",
    },
  };
}

export default async function ProjectPage({
  params,
}: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  const next = getNextProject(slug);

  return (
    <article className="container-page py-12 sm:py-16">
      <Reveal>
        <Link
          href="/#work"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeftIcon className="size-4" />
          Semua karya
        </Link>
      </Reveal>

      <header className="mt-8 max-w-3xl">
        <Reveal delay={0.05}>
          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <span className="font-mono">{project.year}</span>
            <span aria-hidden>·</span>
            <span>{project.role}</span>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            {project.title}
          </h1>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            {project.summary}
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-8 flex flex-wrap gap-1.5">
            {project.stack.map((tech) => (
              <Badge
                key={tech}
                variant="secondary"
                className="rounded-md font-normal text-muted-foreground"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </Reveal>

        {project.links?.length ? (
          <Reveal delay={0.25}>
            <div className="mt-8 flex flex-wrap gap-3">
              {project.links.map((link) => (
                <ButtonLink
                  key={link.href}
                  variant="outline"
                  href={link.href}
                  external
                >
                  {link.label}
                  <ArrowUpRightIcon data-icon="inline-end" />
                </ButtonLink>
              ))}
            </div>
          </Reveal>
        ) : null}
      </header>

      <Separator className="my-12" />

      <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-20">
        <div className="max-w-2xl space-y-5">
          {project.description.map((paragraph, index) => (
            <Reveal key={index} delay={index * 0.05}>
              <p className="text-base leading-relaxed text-muted-foreground">
                {paragraph}
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="rounded-2xl border border-border/80 bg-card/40 p-6">
            <h2 className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted-foreground">
              Yang saya kerjakan
            </h2>
            <ul className="mt-4 space-y-3">
              {project.highlights.map((highlight) => (
                <li key={highlight} className="flex gap-2.5 text-sm leading-relaxed">
                  <CheckIcon className="mt-0.5 size-4 shrink-0 text-brand" />
                  <span className="text-foreground/80">{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>

      {next ? (
        <Reveal className="mt-20">
          <div className="rule-fade" />
          <Link
            href={`/projects/${next.slug}`}
            className="group mt-8 flex items-center justify-between gap-6 rounded-2xl border border-border/80 p-6 transition-colors hover:bg-muted/40"
          >
            <div>
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted-foreground">
                Proyek berikutnya
              </p>
              <p className="mt-2 text-xl font-medium tracking-tight">
                {next.title}
              </p>
            </div>
            <ArrowUpRightIcon className="size-5 shrink-0 text-muted-foreground transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
          </Link>
        </Reveal>
      ) : null}
    </article>
  );
}
