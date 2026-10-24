import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/section-heading";
import { projects } from "@/lib/projects";

export function Work() {
  return (
    <section id="work" className="container-page scroll-mt-24 py-16 sm:py-20">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading
          eyebrow="02 — Karya pilihan"
          title="Beberapa hal yang sudah saya bangun."
          description="Proyek berskala besar yang saya kerjakan bersama tim — dari aplikasi mobile berbasis machine learning sampai sistem informasi dan platform pemesanan berbasis Laravel. Semuanya ada di GitHub."
        />
        <Reveal delay={0.1}>
          <span className="font-mono text-xs text-muted-foreground">
            {projects.length} proyek
          </span>
        </Reveal>
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <Reveal key={project.slug} delay={(index % 3) * 0.08}>
            <ProjectCard project={project} index={index} className="h-full" />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
