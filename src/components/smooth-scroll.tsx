"use client";

import { ReactLenis } from "lenis/react";
import { useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

/**
 * Smooth inertia scrolling for the whole page.
 * Disabled when the visitor prefers reduced motion.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) return <>{children}</>;

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.11,
        wheelMultiplier: 1,
        touchMultiplier: 1.4,
        anchors: { offset: -88 },
      }}
    >
      {children}
    </ReactLenis>
  );
}
