# Roadmap de Festeka

El MVP es la fase 1 en Valledupar: 8 sprints de 2 semanas (unas 16 semanas). Incluye directorio, portafolio etiquetado, búsqueda, landings SEO, contacto por WhatsApp, **Arma tu evento v1**, panel básico del proveedor y admin. Detalle de producto en [docs/](docs/README.md).

Cada tarea tiene un ID (`S3-02`) para pedírsela a Claude Code: *"Implementa S3-02 siguiendo ROADMAP.md y docs/"*. Marca `[x]` en el mismo PR que la completa.

## Fases

| Fase | Objetivo | Puerta para pasar a la siguiente |
| --- | --- | --- |
| 1 · MVP · Tráfico | Catálogo de Valledupar y Arma tu evento v1 en producción | 40 marcas y 400 fotos etiquetadas |
| 2 · SEO | Landings por ciudad y temática, guías, reseñas, Plan Destacado | Páginas indexadas y clics orgánicos crecientes |
| 3 · Recomendación | Arma tu evento v2, similares por foto, Plan Premium | Proveedores que responden leads |
| 4 · Monetización | Cobro por solicitud o adjudicación, informes de mercado | — |

---

## Sprint 0 · Landing de demostración (hecho)

- [x] S0-01 Monorepo con pnpm (`apps/web`) y módulo Go (`services/api`)
- [x] S0-02 Home de Valledupar con datos dummy (`apps/web/lib/data.ts`)
- [x] S0-03 A/B del hero: Mosaico (A) vs. Slider (B) asignado en `proxy.ts` con cookie fija
- [x] S0-04 Eventos de producto (`hero_*`, `plan_*`) a `/api/events` (solo log)
- [x] S0-05 Arma tu evento paso 2: recomendados, cantidades, selección, proveedores propios, tope de 20
- [x] S0-06 API Go esqueleto: `/healthz`, `/v1/cities`, Dockerfile para Cloud Run
- [x] S0-07 CI en GitHub Actions (lint, typecheck, build, go test)
- [x] S0-08 Documentación, ADR y este roadmap

## Sprint 1 · Base

- [ ] S1-01 Proyecto en Neon (ramas `main` y `dev`) y `DATABASE_URL` en `.env.example`
- [ ] S1-02 Migraciones con `goose` o `atlas` en `services/api/migrations`: `cities`, `zones`, `users`, `brands`, `brand_members`, `brand_coverage`, `tag_facets`, `tags`, `taggings`, `slug_redirects`, `outbox_events` (docs/08)
- [ ] S1-03 Capa de datos con `pgx` + `sqlc`; seed con Valledupar, sus zonas y la taxonomía inicial (facetas y tags de docs/03)
- [ ] S1-04 Config por variables de entorno, logs estructurados `slog`, manejo de errores con formato `{"error":{"code","message"}}`
- [ ] S1-05 Auth: `POST /v1/auth/otp` y `/v1/auth/verify` (proveedor de SMS por decidir; en dev, código fijo en el log), JWT de corta duración y refresh
- [ ] S1-06 Terraform mínimo en `infra/`: Artifact Registry, Cloud Run `api`, Secret Manager, Pub/Sub, bucket de medios
- [ ] S1-07 Deploy de la API a Cloud Run desde GitHub Actions al hacer merge a `main`
- [ ] S1-08 Admin de taxonomía (web, ruta protegida `/admin/tags`): crear, renombrar con 301, fusionar con sinónimos
- **Criterio de salida:** `GET /v1/cities` y `GET /v1/tags?facet=tematica` responden desde Neon en Cloud Run.

## Sprint 2 · Perfiles de marca

- [ ] S2-01 `GET /v1/brands/{slug}` y `PUT /v1/me/brands/{id}` con servicios y cobertura
- [ ] S2-02 Página pública `/marca/[slug]` (ISR) según el mockup "Perfil de marca"
- [ ] S2-03 Panel del proveedor: login OTP, editar perfil, servicios, cobertura y WhatsApp
- [ ] S2-04 Verificación de marca (RUT o cédula, revisión manual en admin) y sello "Verificada"
- [ ] S2-05 Onboarding asistido: el admin crea la marca e invita al dueño por WhatsApp
- [ ] S2-06 `POST /v1/leads`: clic a WhatsApp trazado con mensaje "Te encontré en Festeka"
- **Criterio de salida:** 10 marcas reales cargadas con perfil completo.

## Sprint 3 · Portafolio

- [ ] S3-01 Tablas `albums`, `album_credits`, `media`
- [ ] S3-02 Subida con URL firmada a Cloud Storage desde el navegador
- [ ] S3-03 `services/workers`: variantes WebP/AVIF (3 tamaños) y limpieza de EXIF
- [ ] S3-04 Co-créditos: invitar a otra marca a un álbum, que acepta o rechaza
- [ ] S3-05 Página `/foto/[slug]` con créditos, tags y "Agregar los N a mi evento"
- [ ] S3-06 Reemplazar `SceneImage` por `next/image` con las fotos reales
- **Criterio de salida:** un proveedor sube un álbum de 10 fotos y lo ve publicado.

## Sprint 4 · Tags con IA

- [ ] S4-01 Worker de etiquetado: modelo de visión con la taxonomía como opciones cerradas; guarda `taggings` con origen `ia` y confianza
- [ ] S4-02 UI de confirmación en un toque (mockup "Panel del proveedor")
- [ ] S4-03 Términos fuera del catálogo → tags `propuesto` para el curador
- [ ] S4-04 Cola de moderación en admin: fotos, marcas y tags propuestos
- [ ] S4-05 Texto alternativo generado y editable
- **Criterio de salida:** el 80 % de las fotos queda etiquetado con a lo sumo una corrección del proveedor.

## Sprint 5 · Búsqueda

- [ ] S5-01 Decidir Typesense Cloud vs. autoalojado (ADR 0003) y desplegarlo
- [ ] S5-02 Worker indexador desde el outbox; job de reindexado completo
- [ ] S5-03 Interpretación de la consulta: diccionario de tags y sinónimos → filtros (docs/04)
- [ ] S5-04 `GET /v1/search` y `GET /v1/suggest` con facetas y conteos
- [ ] S5-05 Página `/buscar` con pestañas Fotos y Marcas, filtros facetados y banner de Arma tu evento
- [ ] S5-06 `search_logs` y reporte de búsquedas sin resultados
- **Criterio de salida:** "decoración bob esponja" devuelve fotos y marcas correctas en menos de 200 ms (p95).

## Sprint 6 · Arma tu evento I

- [ ] S6-01 Tablas `event_requests`, `request_categories`, `request_items`, `recommendation_rules`, `recommendation_logs` (docs/05)
- [ ] S6-02 Admin de reglas: cantidades por global, tipo de evento, categoría y ciudad; tope por solicitud; reparto de presupuesto
- [ ] S6-03 Motor de recomendación v1: filtros duros, puntaje, diversidad, puesto de exploración y razones (ADR 0005)
- [ ] S6-04 `POST /v1/event-requests` devuelve el plan; `PATCH` de categorías e ítems; `GET .../more`
- [ ] S6-05 Conectar `apps/web/app/arma-tu-evento` a la API (hoy usa `lib/data.ts`) y guardar el borrador
- [ ] S6-06 Proveedores propios: buscar por nombre en la categoría o invitar por nombre y WhatsApp
- **Criterio de salida:** un plan real de Valledupar con al menos 3 marcas por categoría.

## Sprint 7 · Arma tu evento II

- [ ] S7-01 Envío con OTP; `quote_invites` por cada ítem seleccionado
- [ ] S7-02 WhatsApp Business API: plantilla de solicitud al proveedor con datos anonimizados
- [ ] S7-03 Respuesta estructurada del proveedor en su panel (precio, incluye, anticipo, vigencia, fotos)
- [ ] S7-04 Comparativo por categoría (pantalla "Cotización y comparativo") a las 24 h o con 3 respuestas
- [ ] S7-05 Bandeja "Mi evento" con estado real del plan; "Agregar a mi evento" en tarjetas, perfil y fotos
- [ ] S7-06 Recordatorio por WhatsApp de planes sin enviar
- [ ] S7-07 Penalización en `quality_score` a proveedores que no responden
- **Criterio de salida:** una solicitud real llega a 10 proveedores y el cliente recibe el comparativo.

## Sprint 8 · SEO y lanzamiento

- [ ] S8-01 Landings programáticas `/valledupar/[categoria]/[...]` con umbral de publicación y `noindex` (docs/06)
- [ ] S8-02 Sitemaps segmentados (incluido el de imágenes) y datos estructurados `LocalBusiness`, `ImageObject`, `BreadcrumbList`
- [ ] S8-03 `/api/events` → BigQuery; tablero del A/B en Looker Studio
- [ ] S8-04 Arrancar el A/B del hero con fotos reales (checklist de docs/10)
- [ ] S8-05 Estadísticas del proveedor (`GET /v1/me/stats`)
- [ ] S8-06 Pruebas de carga, Core Web Vitals en verde en móvil, política de datos (Ley 1581)
- [ ] S8-07 Dominio `festeka.co`, `NEXT_PUBLIC_DEMO=false` (quita el `noindex` global) y lanzamiento
- **Criterio de salida:** lanzamiento público en Valledupar con 40 marcas y 400 fotos.

## En paralelo (negocio)

- [ ] N-01 Cargar 40 marcas y 400 fotos de Valledupar antes del sprint 8, con al menos 3 marcas verificadas por categoría
- [ ] N-02 Entrevistar a 15–20 proveedores para fijar precios de planes
- [ ] N-03 Registrar la marca Festeka en la SIC y asegurar `festeka.co`, `festeka.com` y @festeka

---

## Fase 2 · SEO (backlog)

- Reseñas verificadas (RF-15), tableros y favoritos (RF-14), guías editoriales (RF-16)
- Plan Destacado con pasarela local (Wompi o Mercado Pago)
- Segunda ciudad del Caribe

## Fase 3 · Recomendación (backlog)

- Arma tu evento v2: combos por co-créditos, co-contrataciones, similitud visual con las fotos de referencia
- Comparativo normalizado con IA (las cifras siempre salen de lo que escribió el proveedor)
- Plan Premium y pauta en guías

## Fase 4 · Monetización (backlog)

- Cobro por solicitud recibida o por adjudicación (nunca por el puesto en la recomendación)
- Informes de mercado agregados y anónimos
