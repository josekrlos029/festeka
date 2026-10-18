# ADR 0003 · Typesense como índice de búsqueda

- Estado: aceptada (falta decidir si es Cloud o autoalojado)
- Fecha: 2026-10-18

## Contexto

La búsqueda necesita tolerancia a errores ("bob esponja" con o sin espacio), sinónimos, facetas con conteos (ciudad, categoría, temática, estilo, precio) y, en la fase 3, búsqueda por similitud visual.

## Decisión

- Postgres es la fuente de verdad. Typesense es un índice derivado que se puede reconstruir completo en cualquier momento.
- Sincronización con patrón outbox: tabla `outbox_events` → Pub/Sub → worker indexador.
- Tres colecciones: `brands`, `photos` y `tags` (ver docs/04).

## Alternativas

- Meilisearch: equivalente para este caso.
- Postgres FTS + `pg_trgm`: más simple, pero con facetas y tolerancia a errores más pobres.
- Elasticsearch: más de lo que el MVP necesita.

## Pendiente

Typesense Cloud (menos operación) o autoalojado en una VM de GCE (menor costo). Se decide en el sprint 5.
