# ADR 0002 · Vercel + Cloud Run + Neon

- Estado: aceptada
- Fecha: 2026-10-18
- Reemplaza: la propuesta inicial del documento de diseño (web en Cloud Run y Cloud SQL)

## Contexto

El documento de diseño proponía todo en GCP, incluida la web en Cloud Run y Postgres en Cloud SQL. El stack habitual del equipo es frontend en Vercel, backend en Cloud Run, Neon como base de datos y Redis para caché. Además, la landing debe estar en línea desde ya con datos dummy.

## Decisión

| Pieza | Elección |
| --- | --- |
| Web | Next.js en Vercel |
| API y workers | Go en Cloud Run |
| Base de datos | Neon (PostgreSQL 16 serverless) |
| Caché | Redis (Upstash o Memorystore; se decide en el sprint 1) |
| Búsqueda | Typesense (ver ADR 0003) |
| Archivos, colas, analítica | Cloud Storage, Pub/Sub y BigQuery en GCP |

## Consecuencias

- Previews por PR en Vercel sin configuración, y ramas de Neon por PR para probar migraciones.
- La web llama a la API pública de Cloud Run: hay que configurar CORS y el caché de las respuestas públicas.
- Neon se conecta por TLS desde Cloud Run; usar el pooler de Neon (`-pooler` en el host) para no agotar conexiones.
- Los requerimientos que mencionaban Cloud Armor aplican a la API; la web queda protegida por Vercel.
