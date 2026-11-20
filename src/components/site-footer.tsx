import Link from "next/link";
import { ArrowUpIcon, MailIcon } from "lucide-react";

import { GithubIcon, InstagramIcon, LinkedinIcon } from "@/components/icons";
import { socials, site } from "@/lib/site";

const iconMap = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  instagram: InstagramIcon,
  email: MailIcon,
} as const;

export function SiteFooter() {
  const nameParts = site.name.split(" ");
  const markLine1 = nameParts.slice(0, 2).join(" ");
  const markLine2 = nameParts.slice(2).join(" ");

  return (
    <footer className="mt-24 border-t border-border">
      <div className="container-page flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-1">
          {socials.map((social) => {
            const Icon = iconMap[social.key];
            return (
              <Link
                key={social.key}
                href={social.href}
                target={social.href.startsWith("mailto:") ? undefined : "_blank"}
                rel="noreferrer noopener"
                aria-label={social.label}
                className="grid size-9 place-items-center border border-border text-muted-foreground transition-colors duration-150 hover:border-accent hover:text-accent"
              >
                <Icon className="size-4" />
              </Link>
            );
          })}
        </div>

        <Link
          href="#top"
          className="inline-flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted-foreground transition-colors duration-150 hover:text-accent"
        >
          Kembali ke atas
          <ArrowUpIcon aria-hidden className="size-3.5" />
        </Link>
      </div>

      <div className="container-page pb-2 sm:pb-0">
        {/* Wordmark selebar container. Dirender sebagai SVG dengan rasio
            natural supaya tidak pernah terpotong di lebar layar mana pun;
            textLength menjaga agar tetap pas meski font gagal dimuat.
            Satu baris di layar lebar (1338 × 71), dua baris di layar sempit
            (721 × 165) agar tetap punya bobot. */}
        <svg
          viewBox="0 0 1338 71"
          role="presentation"
          aria-hidden
          className="hidden w-full md:block"
        >
          <text
            x="0"
            y="70"
            textLength="1338"
            lengthAdjust="spacingAndGlyphs"
            className="fill-ghost font-extrabold uppercase stretch-display"
            style={{ fontSize: 100, letterSpacing: "-0.025em" }}
          >
            {site.name}
          </text>
        </svg>

        <svg
          viewBox="0 0 721 172"
          role="presentation"
          aria-hidden
          className="block w-full md:hidden"
        >
          <text
            x="0"
            y="70"
            textLength="721"
            lengthAdjust="spacingAndGlyphs"
            className="fill-ghost font-extrabold uppercase stretch-display"
            style={{ fontSize: 100, letterSpacing: "-0.025em" }}
          >
            {markLine1}
          </text>
          <text
            x="0"
            y="150"
            textLength="721"
            lengthAdjust="spacingAndGlyphs"
            className="fill-ghost font-extrabold uppercase stretch-display"
            style={{ fontSize: 100, letterSpacing: "-0.025em" }}
          >
            {markLine2}
          </text>
        </svg>
      </div>

      <div className="container-page flex flex-col gap-2 border-t border-border py-6 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {site.copyrightYear} {site.name}
        </p>
        <p>{site.location} — WIB</p>
      </div>
    </footer>
  );
}
