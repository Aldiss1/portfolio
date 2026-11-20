import Link from "next/link";
import type { ComponentProps } from "react";

import { Button } from "@/components/ui/button";

type ButtonLinkProps = Omit<ComponentProps<typeof Button>, "render"> & {
  href: string;
  /** Opens the link in a new tab with safe rel attributes. */
  external?: boolean;
};

/**
 * A URL that Next's router should not handle: external origins, `mailto:`/`tel:`,
 * and static assets such as `/resume.pdf`. Passing these to `<Link>` makes the
 * router prefetch them as RSC routes, which 404s in the console.
 */
function isInternalRoute(href: string) {
  if (/^(https?:)?\/\//i.test(href) || /^(mailto|tel):/i.test(href)) {
    return false;
  }
  const path = href.split(/[?#]/)[0];
  return !/\.[a-z0-9]{2,}$/i.test(path);
}

/**
 * A shadcn `Button` rendered as a link.
 * Internal routes use Next's `Link` for client-side navigation; everything else
 * renders a plain anchor so no RSC prefetch is attempted.
 */
export function ButtonLink({
  href,
  external = false,
  ...props
}: ButtonLinkProps) {
  const internal = isInternalRoute(href);

  return (
    <Button
      nativeButton={false}
      render={
        internal ? (
          <Link href={href} />
        ) : (
          <a
            href={href}
            target={external ? "_blank" : undefined}
            rel={external ? "noreferrer noopener" : undefined}
          />
        )
      }
      {...props}
    />
  );
}
