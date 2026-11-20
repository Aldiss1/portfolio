import { ArrowRightIcon, DownloadIcon, MailIcon } from "lucide-react";

import { ButtonLink } from "@/components/button-link";
import { Reveal } from "@/components/motion/reveal";
import { ProfilePhoto } from "@/components/profile-photo";
import { site } from "@/lib/site";
import { projects } from "@/lib/projects";

const stats = [
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
                  href={`mailto:${site.email}`}
                >
                  <MailIcon data-icon="inline-start" />
                  Kirim email
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

          {/* Foto adalah elemen LCP: sengaja tanpa animasi reveal agar tidak
              menunda render dan menurunkan skor performance. */}
          <div className="mx-auto w-full max-w-[360px] lg:mx-0">
            <ProfilePhoto />
          </div>
        </div>

        <Reveal delay={0.2}>
          <dl className="mt-14 grid grid-cols-3 border-t border-border">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="border-r border-border py-5 pr-3 last:border-r-0 sm:pl-6 sm:last:pl-6 sm:first:pl-0"
              >
                <dt className="text-[clamp(1.35rem,6.5vw,2.25rem)] leading-none font-bold tracking-tight whitespace-nowrap stretch-wide">
                  {stat.value}
                </dt>
                <dd className="mt-1.5 font-mono text-[0.6rem] uppercase tracking-[0.12em] text-muted-foreground sm:text-[0.65rem] sm:tracking-[0.14em]">
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
