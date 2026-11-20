import { ArrowRightIcon, DownloadIcon } from "lucide-react";

import { ButtonLink } from "@/components/button-link";
import { Reveal } from "@/components/motion/reveal";
import { ProfilePhoto } from "@/components/profile-photo";
import { education, site } from "@/lib/site";
import { projects } from "@/lib/projects";

const stats = [
  { value: education.gpa, label: `IPK / ${education.gpaScale}`, accent: true },
  { value: String(projects.length), label: "Proyek" },
  { value: "1", label: "Magang" },
  { value: "2024—", label: "Sekarang" },
];

export function Hero() {
  return (
    <section className="relative">
      <div className="container-page pt-10 pb-16 sm:pt-14 sm:pb-20">
        <Reveal>
          <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-[0.7rem] uppercase tracking-[0.14em]">
            {site.available ? (
              <span className="inline-flex items-center gap-2">
                <span aria-hidden className="size-2 bg-accent" />
                {site.availableLabel}
              </span>
            ) : (
              <span />
            )}
            <span className="text-muted-foreground">
              {site.location} — {site.email}
            </span>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-12 lg:grid-cols-[1.55fr_1fr] lg:items-end lg:gap-16">
          <div>
            <Reveal delay={0.05}>
              <h1 className="text-[clamp(3rem,9vw,7.5rem)] leading-[0.94] font-extrabold tracking-[-0.03em] uppercase stretch-display">
                Aldi Surya
                <br className="hidden sm:block" /> Saputra
              </h1>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-6 text-lg font-medium sm:text-xl">
                {site.role} — Politeknik Negeri Malang
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink size="lg" href="/#work">
                  Lihat karya
                  <ArrowRightIcon data-icon="inline-end" />
                </ButtonLink>
                <ButtonLink
                  size="lg"
                  variant="outline"
                  external
                  href={site.resume}
                >
                  <DownloadIcon data-icon="inline-start" />
                  Unduh CV
                </ButtonLink>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.12} className="mx-auto w-full max-w-[360px] lg:mx-0">
            <ProfilePhoto />
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <dl className="mt-14 grid grid-cols-2 border-t border-border sm:grid-cols-4">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={
                  index === 0
                    ? "border-b border-border py-5 pr-4 sm:border-b-0 sm:border-r sm:pl-0 sm:first:pl-0"
                    : "border-b border-border py-5 pr-4 sm:border-b-0 sm:border-r sm:pl-4 last:border-r-0 sm:last:pl-4"
                }
              >
                <dt
                  className={
                    stat.accent
                      ? "text-4xl font-bold tracking-tight text-accent stretch-wide"
                      : "text-4xl font-bold tracking-tight stretch-wide"
                  }
                >
                  {stat.value}
                </dt>
                <dd className="mt-1.5 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted-foreground">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
