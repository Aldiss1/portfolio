import { ProjectRow } from "@/components/project-row";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/section-heading";
import { projects } from "@/lib/projects";

export function Work() {
  return (
    <section id="work" className="container-page scroll-mt-24 py-16 sm:py-24">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading
          eyebrow="04 — Karya pilihan"
          title="Beberapa hal yang sudah saya bangun."
          description="Dari aplikasi mobile berbasis machine learning sampai sistem informasi dan platform pemesanan — beberapa kodenya bisa dilihat di GitHub, dan yang sudah berjalan bisa dikunjungi langsung di situsnya."
        />
        <Reveal delay={0.1}>
          <span className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
            {projects.length} proyek
          </span>
        </Reveal>
      </div>

      <div className="mt-12 border-t border-border">
        {projects.map((project, index) => (
          <Reveal key={project.slug} delay={index * 0.05}>
            <ProjectRow project={project} index={index} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
