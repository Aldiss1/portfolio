import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeftIcon, ArrowUpRightIcon } from "lucide-react";

import { ButtonLink } from "@/components/button-link";
import { Reveal } from "@/components/motion/reveal";
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
          className="inline-flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted-foreground transition-colors duration-150 hover:text-accent"
        >
          <ArrowLeftIcon className="size-3.5" />
          Semua karya
        </Link>
      </Reveal>

      <header className="mt-8 max-w-4xl">
        <Reveal delay={0.05}>
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted-foreground">
            {project.year} · {project.role}
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight uppercase text-balance stretch-wide sm:text-6xl">
            {project.title}
          </h1>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            {project.summary}
          </p>
        </Reveal>
      </header>

      <Reveal delay={0.18}>
        <p className="mt-8 border-y border-border py-3 font-mono text-xs uppercase tracking-[0.1em] text-muted-foreground">
          {project.stack.join(" · ")}
        </p>
      </Reveal>

      {project.links?.length ? (
        <Reveal delay={0.2}>
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

      {project.note ? (
        <Reveal delay={0.2}>
          <p className="mt-4 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted-foreground">
            {project.note}
          </p>
        </Reveal>
      ) : null}

      {project.image ? (
        <Reveal delay={0.1} className="mt-12">
          <div className="overflow-hidden border border-border">
            <Image
              src={project.image.src}
              alt={project.image.alt}
              width={project.image.width}
              height={project.image.height}
              sizes="(max-width: 1024px) 100vw, 1200px"
              className="h-auto w-full"
            />
          </div>
        </Reveal>
      ) : null}

      <div className="mt-16 grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-20">
        <div className="max-w-2xl space-y-5">
          {project.description.map((paragraph, index) => (
            <Reveal key={index} delay={index * 0.05}>
              <p className="text-base leading-relaxed text-foreground/90">
                {paragraph}
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="border border-border p-6">
            <h2 className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted-foreground">
              Yang saya kerjakan
            </h2>
            <ul className="mt-4 space-y-3">
              {project.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="flex gap-3 text-sm leading-relaxed"
                >
                  <span
                    aria-hidden
                    className="mt-1.5 size-2 shrink-0 bg-accent"
                  />
                  <span className="text-foreground/85">{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>

      {next ? (
        <Reveal className="mt-20">
          <Link
            href={`/projects/${next.slug}`}
            className="group flex items-center justify-between gap-6 border border-border p-6 transition-colors duration-150 hover:bg-foreground hover:text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent"
          >
            <div>
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted-foreground transition-colors duration-150 group-hover:text-background/70">
                Proyek berikutnya
              </p>
              <p className="mt-2 text-xl font-bold tracking-tight">
                {next.title}
              </p>
            </div>
            <ArrowUpRightIcon className="size-5 shrink-0 text-muted-foreground transition-all duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
          </Link>
        </Reveal>
      ) : null}
    </article>
  );
}
