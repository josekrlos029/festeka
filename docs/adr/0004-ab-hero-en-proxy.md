# ADR 0004 · Asignación del A/B del hero en `proxy.ts`

- Estado: aceptada
- Fecha: 2026-10-18

## Contexto

El hero de la Home se decide con un A/B entre Mosaico (A) y Slider (B), descrito en docs/10. La asignación no debe parpadear, debe ser fija por visitante y no debe afectar el SEO.

## Decisión

- `apps/web/proxy.ts` (el antes llamado middleware en Next.js 16) asigna la variante 50/50, la guarda en la cookie `fk_hero` y reescribe `/` hacia `/h/a` o `/h/b`.
- `/h/a` y `/h/b` son páginas estáticas con `noindex` y canonical a `/`.
- Los bots siempre ven A, sin cookies.
- `?hero=a|b` fuerza una variante para QA.
- Las variables `HERO_EXPERIMENT=off` y `HERO_FORCE=a|b` controlan el experimento desde Vercel sin desplegar código.
- Sin herramienta externa de flags por ahora. Si se suman más experimentos, migrar a GrowthBook o PostHog manteniendo los mismos nombres de eventos.

## Consecuencias

- Las dos variantes siguen siendo estáticas y rápidas (LCP).
- El análisis se hace en BigQuery con los eventos de `lib/analytics.ts`.
