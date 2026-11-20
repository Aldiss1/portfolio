"use client";

import { motion } from "motion/react";
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
 *
 * Markup is identical on server and client on purpose: branching on
 * `useReducedMotion()` during render makes the client drop the inline
 * `opacity: 0` style that the server emitted, which React reports as a
 * hydration mismatch and never patches — leaving the content invisible.
 * Reduced-motion visitors are handled by `<MotionConfig reducedMotion="user">`
 * in the root layout, which drops the positional animation after mount while
 * keeping a short fade.
 */
export function Reveal({
  children,
  delay = 0,
  distance = 12,
  className,
  id,
}: RevealProps) {
  return (
    <motion.div
      id={id}
      className={className}
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-72px" }}
      transition={{ duration: 0.4, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
