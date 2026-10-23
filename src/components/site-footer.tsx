import Link from "next/link";

import { GithubIcon, LinkedinIcon, XIcon } from "@/components/icons";
import { socials, site } from "@/lib/site";
import { MailIcon } from "lucide-react";

const iconMap = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  x: XIcon,
  email: MailIcon,
} as const;

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border/70">
      <div className="container-page flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium">{site.name}</p>
          <p className="text-sm text-muted-foreground">
            {site.role} · {site.location}
          </p>
        </div>

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
                className="grid size-9 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <Icon className="size-4" />
              </Link>
            );
          })}
        </div>
      </div>

      <div className="container-page flex flex-col gap-2 border-t border-border/70 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {site.copyrightYear} {site.name}. Hak cipta dilindungi.
        </p>
        <p>Dibangun dengan Next.js, Tailwind CSS, dan banyak kopi.</p>
      </div>
    </footer>
  );
}
