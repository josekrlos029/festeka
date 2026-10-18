# CLAUDE.md

Guía para Claude Code en este repositorio. Léela completa antes de cambiar código.

## Qué es Festeka

Es el directorio y buscador de proveedores de eventos de Valledupar: decoración, inflables, catering, foto, video, música, luces, pirotecnia, etc. Todo se indexa con un motor de tags.

El producto central es **Arma tu evento**: el cliente describe su fiesta, la plataforma sugiere N proveedores por categoría (3 por defecto, configurable) y el cliente elige o agrega los suyos para cotizar con todos en un solo envío.

- Producto y requerimientos: `docs/` (empieza por `docs/README.md`)
- Plan de trabajo: `ROADMAP.md`. Cada tarea tiene un ID como `S3-02`.
- Decisiones de arquitectura: `docs/adr/`

## Estructura

```text
apps/web/           Next.js 16 (App Router, TS, Tailwind 4) · se despliega en Vercel
  app/              rutas: / (reescrita a /h/a|b), /arma-tu-evento, /api/events
  components/       hero/, home/, planner/ + Header, Logo, SceneImage, TrackedLink
  lib/              data.ts (DUMMY), analytics.ts, experiments.ts
  proxy.ts          asignación del A/B del hero (antes "middleware")
services/api/       API Go 1.24 (stdlib net/http) · Cloud Run
docs/               documentación de producto y ADR
ROADMAP.md          sprints y tareas
```

## Comandos

```bash
pnpm install                 # en la raíz
pnpm dev                     # web en http://localhost:3000
pnpm lint && pnpm typecheck && pnpm build   # lo mismo que corre CI

cd services/api
go run ./cmd/api             # API en http://localhost:8080
go vet ./... && go test ./...
```

Antes de dar una tarea por terminada, corre los comandos de CI del área que tocaste. Todos deben pasar.

## Cómo trabajar una tarea del roadmap

1. Lee la tarea en `ROADMAP.md` y los documentos de `docs/` que menciona.
2. Crea la rama `s<sprint>-<id>-<slug>`, por ejemplo `s3-02-subida-firmada`.
3. Implementa con pruebas: Go con `testing` y `httptest`; web con pruebas de los cálculos puros y Playwright para los flujos clave cuando existan.
4. Marca `[x]` en `ROADMAP.md` dentro del mismo PR.
5. Si cambia el contrato, el modelo o una decisión, actualiza el doc correspondiente o crea un ADR nuevo.

## Reglas del producto que el código debe respetar

- **Arma tu evento es la acción principal.** El color `accent` (#D02F5A) se reserva para sus CTA. Su botón está en el encabezado de todas las páginas públicas.
- **Regla de confianza:** los puestos recomendados no se venden. Lo pagado nunca ocupa uno de los N puestos; si existe, va como puesto adicional marcado "Patrocinado". No escribas código que ordene la recomendación por plan pagado.
- **El A/B del hero debe ser justo.** Las variantes A y B solo difieren en el componente de fotos. `HeroCopy` y `HeroForm` son compartidos; no les agregues diferencias por variante. Los nombres de eventos están en `docs/10-experimento-ab-hero.md`: no los cambies sin actualizar el doc.
- **Datos dummy:** `apps/web/lib/data.ts` es temporal, pero sus tipos (`PlanCategory`, `Candidate`, `Photo`, `Brand`, `PLAN_RULES`) son el contrato que la API debe devolver. Al conectar la API, conserva esa forma o actualiza el contrato en docs/05 y docs/09.
- **Personajes con marca registrada** (por ejemplo Bob Esponja): solo como texto o tag. Nunca se usan logos ni imágenes oficiales en la marca, los banners o los anuncios.
- **Multi-ciudad desde el día uno:** no fijes "Valledupar" en la lógica. Usa `CITY` o el parámetro de ciudad.
- **Privacidad (Ley 1581):** nada de datos personales en URL ni en eventos de analítica. El `visitor_id` es anónimo.

## Convenciones

- Textos de la interfaz y documentación en español de Colombia; precios en COP con `formatCOP`.
- Identificadores de código en inglés; comentarios en español cuando explican una regla de negocio.
- Usa los tokens de `app/globals.css` (`bg-accent`, `text-ink-2`, `bg-surface`…) y no escribas colores hex en los componentes, salvo los tintes de datos dummy.
- Accesibilidad: elementos `button` y `a` reales, objetivos de al menos 44 px, `aria-label` en botones de solo ícono, respetar `prefers-reduced-motion`.
- Server Components por defecto; `"use client"` solo donde haya estado o eventos.

## Notas de versiones (importante)

- **Next.js 16:** el middleware se llama `proxy.ts` (función `proxy`). `params` y `searchParams` son `Promise`. La documentación exacta de la versión instalada está en `apps/web/node_modules/next/dist/docs/`; consúltala antes de usar APIs de Next.
- **TypeScript se queda en 6.x:** typescript-eslint todavía no soporta TS 7.
- **Fuentes:** se cargan con `@fontsource-variable/*`, no con `next/font/google`, para que el build no dependa de la red.
- **Tailwind 4:** la configuración vive en CSS (`@theme` en `globals.css`) y no existe `tailwind.config.js`.

## Despliegue

- **Web:** el proyecto de Vercel apunta a este repo con Root Directory = `apps/web`. Cada push a `main` despliega a producción y cada PR genera un preview.
- **Variables de entorno de la web:** ver `apps/web/.env.example`.
- **API:** Cloud Run, a partir del sprint 1 (S1-06 y S1-07).
