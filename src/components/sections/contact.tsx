import Link from "next/link";

import { ContactForm } from "@/components/contact-form";
import { CopyEmail } from "@/components/copy-email";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/section-heading";
import { site, socials } from "@/lib/site";

export function Contact() {
  const externalSocials = socials.filter(
    (social) => !social.href.startsWith("mailto:"),
  );

  return (
    <section id="contact" className="container-page scroll-mt-24 py-16 sm:py-24">
      <SectionHeading
        eyebrow="05 — Kontak"
        title="Punya proyek atau tawaran magang? Kirim pesan langsung dari sini."
      />

      <Reveal delay={0.05}>
        <CopyEmail email={site.email} />
      </Reveal>

      <div className="mt-14 grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
        <Reveal delay={0.1}>
          <ContactForm />
        </Reveal>

        <Reveal delay={0.15}>
          <div className="border-t border-border">
            <div className="flex items-baseline justify-between gap-6 border-b border-border py-3">
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted-foreground">
                Email
              </p>
              <Link
                href={`mailto:${site.email}`}
                className="text-sm text-foreground transition-colors hover:text-accent"
              >
                {site.email}
              </Link>
            </div>

            <div className="flex items-baseline justify-between gap-6 border-b border-border py-3">
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted-foreground">
                Lokasi
              </p>
              <p className="text-sm text-foreground">{site.location}</p>
            </div>

            <div className="flex items-baseline justify-between gap-6 border-b border-border py-3">
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted-foreground">
                Sosial
              </p>
              <ul className="flex flex-wrap justify-end gap-2">
                {externalSocials.map((social) => (
                  <li key={social.key}>
                    <Link
                      href={social.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex border border-border px-2.5 py-1 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-foreground transition-colors duration-150 hover:border-accent hover:text-accent"
                    >
                      {social.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {site.available ? (
              <p className="mt-6 inline-flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.14em]">
                <span aria-hidden className="size-2 bg-accent" />
                {site.availableLabel}
              </p>
            ) : null}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
