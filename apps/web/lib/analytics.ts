"use client";

import { HERO_COOKIE, VISITOR_COOKIE } from "./experiments";

/**
 * Eventos de producto. Los nombres siguen la tabla de docs/10-experimento-ab-hero.md.
 * Hoy se envían a /api/events (que solo los registra en el log) y a window.dataLayer.
 * En el sprint 8 /api/events los reenvía a BigQuery.
 */
export type EventName =
  | "hero_view"
  | "hero_cta_click"
  | "hero_form_interact"
  | "hero_photo_click"
  | "hero_slide_view"
  | "hero_slider_nav"
  | "hero_search_click"
  | "hero_scroll_past"
  | "plan_view"
  | "plan_item_toggle"
  | "plan_quantity_change"
  | "plan_own_provider_add"
  | "plan_submit";

type Props = Record<string, string | number | boolean | null | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

function readCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

function sessionId(): string {
  try {
    const key = "fk_sid";
    let sid = sessionStorage.getItem(key);
    if (!sid) {
      sid = crypto.randomUUID();
      sessionStorage.setItem(key, sid);
    }
    return sid;
  } catch {
    return "no-session";
  }
}

function device(): "mobile" | "desktop" {
  return typeof window !== "undefined" && window.matchMedia("(max-width: 768px)").matches
    ? "mobile"
    : "desktop";
}

export function track(name: EventName, props: Props = {}) {
  if (typeof window === "undefined") return;
  const payload = {
    name,
    props,
    variant: readCookie(HERO_COOKIE),
    visitor_id: readCookie(VISITOR_COOKIE),
    session_id: sessionId(),
    city: "valledupar",
    device: device(),
    path: window.location.pathname,
    ts: new Date().toISOString(),
  };

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: name, ...payload });

  if (process.env.NODE_ENV !== "production") {
    console.debug("[track]", name, payload);
  }

  const body = JSON.stringify(payload);
  if (navigator.sendBeacon) {
    navigator.sendBeacon("/api/events", new Blob([body], { type: "application/json" }));
  } else {
    void fetch("/api/events", { method: "POST", body, keepalive: true, headers: { "content-type": "application/json" } });
  }
}
