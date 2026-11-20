import { ArrowRightIcon } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/section-heading";
import { experiences } from "@/lib/site";

export function Experience() {
  return (
    <section
      id="experience"
      className="container-page scroll-mt-24 py-16 sm:py-24"
    >
      <SectionHeading
        eyebrow="03 — Pengalaman"
        title="Magang dan organisasi yang membentuk cara saya bekerja."
      />

      <div className="mt-12 border-t border-border">
        {experiences.map((item, index) => (
          <Reveal key={item.organization} delay={index * 0.05}>
            <div className="group grid gap-2 border-b border-border py-6 md:grid-cols-[160px_1fr_auto] md:items-start md:gap-8">
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
                {"period" in item ? item.period : "—"}
              </p>

              <div>
                <h3 className="text-xl font-bold tracking-tight transition-colors duration-150 group-hover:text-accent">
                  {item.title}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {item.organization}
                </p>
                <p className="mt-3 max-w-[60ch] text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>

              <div className="flex items-center gap-3 md:justify-end">
                <span className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted-foreground">
                  {item.type}
                </span>
                <ArrowRightIcon
                  aria-hidden
                  className="size-4 -translate-x-1 text-accent opacity-0 transition-all duration-150 group-hover:translate-x-0 group-hover:opacity-100"
                />
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
