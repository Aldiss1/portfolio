import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/section-heading";
import { bio, skills } from "@/lib/site";

export function About() {
  return (
    <section id="about" className="container-page scroll-mt-24 py-16 sm:py-20">
      <SectionHeading
        eyebrow="01 — Tentang"
        title="Mahasiswa TI yang senang membangun sesuatu yang benar-benar dipakai."
      />

      <div className="mt-12 grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
        <div className="space-y-5">
          {bio.map((paragraph, index) => (
            <Reveal key={index} delay={index * 0.06}>
              <p className="text-base leading-relaxed text-muted-foreground">
                {paragraph}
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <dl className="grid gap-8 sm:grid-cols-2 lg:grid-cols-1">
            {skills.map((group) => (
              <div key={group.title}>
                <dt className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted-foreground">
                  {group.title}
                </dt>
                <dd className="mt-3 flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-md border border-border/80 bg-muted/40 px-2.5 py-1 text-xs text-foreground/80"
                    >
                      {item}
                    </span>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
