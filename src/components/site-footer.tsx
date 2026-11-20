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

      <div className="overflow-hidden">
        <p
          aria-hidden
          className="container-page font-extrabold uppercase leading-none tracking-tight text-ghost select-none text-[clamp(2.5rem,9.5vw,8.5rem)] whitespace-nowrap stretch-display"
        >
          {site.name}
        </p>
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
