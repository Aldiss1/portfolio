import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/section-heading";
import { experiences } from "@/lib/site";

export function Experience() {
  return (
    <section id="experience" className="container-page scroll-mt-24 py-16 sm:py-20">
      <SectionHeading
        eyebrow="02 — Pengalaman"
        title="Magang dan organisasi yang membentuk cara saya bekerja."
      />

      <div className="mt-12 grid gap-4 md:grid-cols-2">
        {experiences.map((item, index) => (
          <Reveal key={item.organization} delay={index * 0.08} className="h-full">
            <div className="h-full rounded-2xl border border-border/80 bg-card/40 p-6">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted-foreground">
                  {item.type}
                </p>
                {"period" in item ? (
                  <p className="font-mono text-xs text-muted-foreground">{item.period}</p>
                ) : null}
              </div>
              <h3 className="mt-3 text-xl font-medium tracking-tight">
                {item.title}
              </h3>
              <p className="mt-1 text-sm text-foreground/80">{item.organization}</p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
