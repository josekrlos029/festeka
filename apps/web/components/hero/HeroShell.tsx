"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { track } from "@/lib/analytics";
import type { HeroVariant } from "@/lib/experiments";

/**
 * Envuelve el hero y registra hero_view y hero_scroll_past
 * (el visitante bajó más allá del hero sin hacer clic en él).
 */
export function HeroShell({
  variant,
  className,
  children,
}: {
  variant: HeroVariant;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const clicked = useRef(false);

  useEffect(() => {
    const start = performance.now();
    requestAnimationFrame(() =>
      track("hero_view", { variant, paint_ms: Math.round(performance.now() - start) }),
    );

    const el = ref.current;
    if (!el) return;
    let reported = false;
    const io = new IntersectionObserver(
      ([entry]) => {
        const passed = !entry.isIntersecting && entry.boundingClientRect.bottom < 0;
        if (passed && !clicked.current && !reported) {
          reported = true;
          track("hero_scroll_past", { variant });
        }
      },
      { threshold: 0 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [variant]);

  return (
    <section
      ref={ref}
      data-hero-variant={variant}
      className={className}
      onClickCapture={() => {
        clicked.current = true;
      }}
    >
      {children}
    </section>
  );
}
