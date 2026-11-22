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

      <div className="mt-6 border-t border-border">
        {education.map((entry, index) => (
          <Reveal key={entry.school} delay={0.05 + index * 0.05}>
            <div className="grid gap-3 border-b border-border py-6 md:grid-cols-[1fr_auto] md:items-center md:gap-12">
              <div>
                <h2 className="text-lg font-bold tracking-tight stretch-wide sm:text-xl">
                  {entry.level}
                </h2>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  {entry.school}
                </p>
              </div>

              <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
                {entry.period}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
