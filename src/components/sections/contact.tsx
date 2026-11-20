import Link from "next/link";

import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/section-heading";
import { site, socials } from "@/lib/site";

export function Contact() {
  const externalSocials = socials.filter(
    (social) => !social.href.startsWith("mailto:"),
  );

  return (
    <section id="contact" className="container-page scroll-mt-24 py-16 sm:py-20">
      <SectionHeading
        eyebrow="04 — Kontak"
        title="Punya proyek atau tawaran magang? Kirim pesan langsung dari sini."
        description={
          <>
            Formulir ini mengirim email ke{" "}
            <Link
              href={`mailto:${site.email}`}
              className="text-foreground underline-offset-4 hover:underline"
            >
              {site.email}
            </Link>
            . Bisa juga menghubungi saya lewat sosial media di bawah.
          </>
        }
      />

      <div className="mt-12 grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
        <Reveal delay={0.06}>
          <ContactForm />
        </Reveal>

        <Reveal delay={0.12}>
          <div className="space-y-8">
            <div>
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted-foreground">
                Email
              </p>
              <Link
                href={`mailto:${site.email}`}
                className="mt-2 block text-base text-foreground underline-offset-4 hover:underline"
              >
                {site.email}
              </Link>
            </div>

            <div>
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted-foreground">
                Lokasi
              </p>
              <p className="mt-2 text-base text-foreground">{site.location}</p>
            </div>

            <div>
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted-foreground">
                Sosial
              </p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {externalSocials.map((social) => (
                  <li key={social.key}>
                    <Link
                      href={social.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex rounded-md border border-border/80 bg-muted/40 px-3 py-1.5 text-sm text-foreground/80 transition-colors hover:bg-muted hover:text-foreground"
                    >
                      {social.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {site.available ? (
              <p className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-background/70 px-3 py-1 text-xs font-medium text-muted-foreground">
                <span className="size-1.5 rounded-full bg-accent animate-pulse-dot" />
                {site.availableLabel}
              </p>
            ) : null}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
