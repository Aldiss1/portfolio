import { ArrowRightIcon, DownloadIcon, MailIcon } from "lucide-react";

import { ButtonLink } from "@/components/button-link";
import { Reveal } from "@/components/motion/reveal";
import { ProfilePhoto } from "@/components/profile-photo";
import { site } from "@/lib/site";
import { projects } from "@/lib/projects";

const stats = [
  { label: "Proyek", value: String(projects.length) },
  { label: "Fokus", value: "Laravel" },
  { label: "Pendidikan", value: "D-IV Informatika" },
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
            <span className="text-muted-foreground">{site.location}</span>
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
                  href="/#contact"
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
          <dl className="mt-14 grid grid-cols-1 border-t border-border sm:grid-cols-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex items-baseline justify-between gap-4 border-b border-border py-4 sm:block sm:border-r sm:border-b-0 sm:py-5 sm:pr-3 sm:pl-6 sm:last:border-r-0 sm:last:pl-6 sm:first:pl-0"
              >
                <dt className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-muted-foreground sm:text-[0.65rem]">
                  {stat.label}
                </dt>
                <dd className="font-serif text-[clamp(1.5rem,3vw,2.5rem)] leading-none tracking-[-0.01em] whitespace-nowrap">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
