import { Reveal } from "@/components/motion/reveal";
import { education } from "@/lib/site";

export function Education() {
  return (
    <section
      id="education"
      className="container-page scroll-mt-24 py-12 sm:py-16"
    >
      <Reveal>
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-muted-foreground">
          02 — Pendidikan
        </p>
      </Reveal>

      <Reveal delay={0.05}>
        <div className="mt-6 grid gap-6 border-y border-border py-8 md:grid-cols-[1fr_auto_auto] md:items-center md:gap-12">
          <div>
            <h2 className="text-2xl font-bold tracking-tight stretch-wide sm:text-3xl">
              {education.level}
            </h2>
            <p className="mt-1 text-base text-muted-foreground">
              {education.school}
            </p>
          </div>

          <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
            {education.period}
          </p>

          <div className="flex items-baseline gap-3 md:flex-col md:items-end md:gap-1">
            <span className="text-5xl font-extrabold tracking-tight text-accent stretch-display sm:text-6xl">
              {education.gpa}
            </span>
            <span className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted-foreground">
              IPK / {education.gpaScale}
            </span>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
