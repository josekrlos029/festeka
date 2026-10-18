# ADR 0001 · Monorepo con pnpm workspaces

- Estado: aceptada
- Fecha: 2026-10-18

## Contexto

Festeka tiene un frontend Next.js, una API Go y, desde el sprint 3, workers Go. El equipo es pequeño (1–2 personas más Claude Code) y los cambios suelen tocar web y API a la vez: contrato de datos, tipos y documentación.

## Decisión

Un solo repositorio:

- `apps/web`: Next.js, gestionado con pnpm workspaces.
- `services/api` y `services/workers`: módulos Go independientes, cada uno con su `go.mod`.
- `docs/` y `ROADMAP.md` en la raíz, como fuente de verdad del producto.

## Consecuencias

- Un PR puede cambiar contrato, API y frontend juntos.
- Vercel construye solo `apps/web` (Root Directory = `apps/web`).
- CI separa los jobs `web` y `api` y corre los dos en cada PR.
