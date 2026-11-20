import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/section-heading";
import { bio, skills } from "@/lib/site";

export function About() {
  return (
    <section id="about" className="container-page scroll-mt-24 py-16 sm:py-24">
      <SectionHeading
        eyebrow="01 — Tentang"
        title="Mahasiswa TI yang senang membangun sesuatu yang benar-benar dipakai."
      />

      <div className="mt-12 grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
        <div className="space-y-5">
          {bio.map((paragraph, index) => (
            <Reveal key={index} delay={index * 0.05}>
              <p className="max-w-[60ch] text-lg leading-relaxed text-foreground/90">
                {paragraph}
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <dl className="border-t border-border">
            {skills.map((group) => (
              <div
                key={group.title}
                className="group flex items-baseline justify-between gap-6 border-b border-border py-3"
              >
                <dt className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted-foreground transition-colors group-hover:text-accent">
                  {group.title}
                </dt>
                <dd className="text-right text-sm text-foreground">
                  {group.items.join(", ")}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
