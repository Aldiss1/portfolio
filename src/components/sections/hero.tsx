import Link from "next/link";
import { ArrowRightIcon, MapPinIcon } from "lucide-react";

import { GithubIcon, LinkedinIcon, XIcon } from "@/components/icons";
import { ButtonLink } from "@/components/button-link";
import { Reveal } from "@/components/motion/reveal";
import { ProfilePhoto } from "@/components/profile-photo";
import { Separator } from "@/components/ui/separator";
import { socials, site, stats } from "@/lib/site";

const iconMap = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  x: XIcon,
  email: null,
} as const;

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-grid" />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-glow" />

      <div className="container-page pt-16 pb-20 sm:pt-24 sm:pb-24">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:items-center lg:gap-16">
          <div>
            {site.available ? (
              <Reveal>
                <span className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-background/70 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
                  <span className="size-1.5 rounded-full bg-brand animate-pulse-dot" />
                  {site.availableLabel}
                </span>
              </Reveal>
            ) : null}

            <Reveal delay={0.06}>
              <h1 className="mt-6 text-5xl font-semibold tracking-tight text-balance sm:text-6xl lg:text-7xl">
                {site.name}
              </h1>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
                {site.role} di Politeknik Negeri Malang yang senang mengubah ide
                menjadi aplikasi web —{" "}
                <span className="text-foreground">
                  dari merancang tampilan, menulis kode, sampai menyambungkannya
                  ke database.
                </span>
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <ButtonLink size="lg" href="/#work">
                  Lihat karya
                  <ArrowRightIcon data-icon="inline-end" />
                </ButtonLink>
                <ButtonLink
                  size="lg"
                  variant="outline"
                  href={`mailto:${site.email}`}
                >
                  Kirim email
                </ButtonLink>
              </div>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                  <MapPinIcon className="size-4" />
                  {site.location}
                </span>
                <Separator
                  orientation="vertical"
                  className="hidden h-4 sm:block"
                />
                <Link
                  href={`mailto:${site.email}`}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {site.email}
                </Link>
                <Separator
                  orientation="vertical"
                  className="hidden h-4 sm:block"
                />
                <div className="flex items-center gap-1">
                  {socials.map((social) => {
                    const Icon = iconMap[social.key];
                    return (
                      <Link
                        key={social.key}
                        href={social.href}
                        target={
                          social.href.startsWith("mailto:")
                            ? undefined
                            : "_blank"
                        }
                        rel="noreferrer noopener"
                        aria-label={social.label}
                        className="grid size-8 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                      >
                        {Icon ? (
                          <Icon className="size-4" />
                        ) : (
                          <span className="text-xs font-medium">@</span>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.2} className="mx-auto w-full max-w-[320px] lg:mx-0">
            <ProfilePhoto />
          </Reveal>
        </div>

        <Reveal delay={0.3} className="mt-20">
          <div className="rule-fade" />
          <dl className="grid grid-cols-1 gap-6 pt-8 sm:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-1">
                <dt className="order-2 text-sm text-muted-foreground">
                  {stat.label}
                </dt>
                <dd className="order-1 text-2xl font-semibold tracking-tight">
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
