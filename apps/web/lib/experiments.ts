/**
 * Experimento A/B del hero (docs/10-experimento-ab-hero.md).
 * La asignación ocurre en proxy.ts; aquí viven las constantes compartidas.
 */
export const HERO_VARIANTS = ["a", "b"] as const;
export type HeroVariant = (typeof HERO_VARIANTS)[number];

export const HERO_COOKIE = "fk_hero";
export const VISITOR_COOKIE = "fk_vid";

/** Duración de la asignación: dura todo el experimento. */
export const HERO_COOKIE_MAX_AGE = 60 * 60 * 24 * 60; // 60 días
export const VISITOR_COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 año

/** Los bots siempre ven la variante de control y no cuentan en el análisis. */
export const BOT_UA =
  /bot|crawl|spider|slurp|bingpreview|facebookexternalhit|whatsapp|lighthouse|headless|preview/i;

export function isHeroVariant(value: string | undefined | null): value is HeroVariant {
  return value === "a" || value === "b";
}

/**
 * Apaga el experimento con HERO_EXPERIMENT=off (todos ven A).
 * Fuerza una variante con HERO_FORCE=a|b (útil en previews de Vercel).
 */
export function experimentConfig() {
  const forced = process.env.HERO_FORCE;
  return {
    active: process.env.HERO_EXPERIMENT !== "off",
    forced: isHeroVariant(forced) ? forced : null,
  };
}
