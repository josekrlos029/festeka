"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { track, type EventName } from "@/lib/analytics";

type Props = ComponentProps<typeof Link> & {
  event: EventName;
  props?: Record<string, string | number | boolean | null | undefined>;
};

/** Link que registra un evento antes de navegar. */
export function TrackedLink({ event, props, onClick, ...rest }: Props) {
  return (
    <Link
      {...rest}
      onClick={(e) => {
        track(event, props);
        onClick?.(e);
      }}
    />
  );
}
