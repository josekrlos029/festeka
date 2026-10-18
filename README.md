# Festeka

Directorio y buscador de proveedores de eventos en Valledupar: decoración, inflables, catering, foto, video, música, luces y más.

Su producto central es **Arma tu evento**: cuentas tu fiesta, te sugerimos 3 proveedores por categoría, eliges con quién cotizar (o agregas los tuyos) y pides todas las cotizaciones en un solo envío.

> Estado: **demo** con datos de ejemplo. Las marcas, precios y fotos son ficticios. El sitio no se indexa hasta el lanzamiento.

## Qué hay hoy

- **Home** (`/`) con el A/B del hero en marcha: A (mosaico) y B (slider), asignados 50/50 con una cookie fija por visitante.
- **Arma tu evento** (`/arma-tu-evento`): recomendados por categoría, cantidades configurables, selección, proveedores propios y tope por solicitud.
- **Eventos de producto** (`hero_*`, `plan_*`) que hoy se registran en `/api/events`.
- **API Go** en esqueleto (`/healthz`, `/v1/cities`), lista para Cloud Run.

Para probar una variante del hero a mano: `/?hero=a` o `/?hero=b`.

## Desarrollo

Requisitos: Node 22+, pnpm 10 y Go 1.24.

```bash
pnpm install
pnpm dev                        # http://localhost:3000

cd services/api && go run ./cmd/api   # http://localhost:8080/healthz
```

Para trabajar con Claude Code: abre el repo y pide una tarea por su ID, por ejemplo *"Implementa S1-02 siguiendo ROADMAP.md"*. Las reglas del proyecto están en [CLAUDE.md](CLAUDE.md).

## Despliegue en Vercel

1. En Vercel: **Add New → Project → Import** `josekrlos029/festeka`.
2. **Root Directory:** `apps/web`. Vercel detecta Next.js y pnpm automáticamente.
3. Variables de entorno (opcionales; ver `apps/web/.env.example`): `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_DEMO=true`, `HERO_EXPERIMENT=on`.
4. **Deploy.** Desde ahí, cada push a `main` despliega a producción y cada PR genera un preview.

## Documentación

- [docs/](docs/README.md): visión, requerimientos, motor de tags, búsqueda, Arma tu evento, SEO, arquitectura, modelo de datos, API, A/B, design system y riesgos.
- [ROADMAP.md](ROADMAP.md): sprints y tareas del MVP y de las fases 2 a 4.
- [docs/adr/](docs/adr/): decisiones de arquitectura.
