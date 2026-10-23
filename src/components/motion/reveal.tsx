"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Seconds to wait before the animation starts. */
  delay?: number;
  /** Pixels to travel upward. */
  distance?: number;
  className?: string;
  id?: string;
};

/**
 * Fades content in the first time it scrolls into view.
 * Falls back to a plain, static render for reduced-motion visitors.
 */
export function Reveal({
  children,
  delay = 0,
  distance = 18,
  className,
  id,
}: RevealProps) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return (
      <div id={id} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      id={id}
      className={className}
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-72px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
