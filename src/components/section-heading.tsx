import type { ReactNode } from "react";

import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: ReactNode;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
}: SectionHeadingProps) {
  return (
    <Reveal className={cn("max-w-2xl", className)}>
      <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-muted-foreground">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}
