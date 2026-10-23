import Link from "next/link";
import type { ComponentProps } from "react";

import { Button } from "@/components/ui/button";

type ButtonLinkProps = Omit<ComponentProps<typeof Button>, "render"> & {
  href: string;
  /** Opens the link in a new tab with safe rel attributes. */
  external?: boolean;
};

/**
 * A shadcn `Button` rendered as a Next.js `Link`.
 * `nativeButton={false}` keeps Base UI from warning about non-<button> elements.
 */
export function ButtonLink({
  href,
  external = false,
  ...props
}: ButtonLinkProps) {
  return (
    <Button
      nativeButton={false}
      render={
        <Link
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noreferrer noopener" : undefined}
        />
      }
      {...props}
    />
  );
}
