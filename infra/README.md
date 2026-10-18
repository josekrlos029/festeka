# infra

Terraform para GCP. Se crea en el sprint 1 (ROADMAP S1-06).

Recursos previstos (docs/07-arquitectura.md):

- Artifact Registry para las imágenes de `services/api` y `services/workers`.
- Cloud Run: `api` y `workers`.
- Pub/Sub: tópico `outbox-events` y suscripciones de los workers.
- Cloud Storage: buckets `festeka-media-originals` (privado) y `festeka-media-public` (variantes, con CDN).
- Secret Manager: `DATABASE_URL` de Neon, claves de WhatsApp y SMS, clave del modelo de visión.
- BigQuery: dataset `festeka_events`.

Neon (base de datos) y Vercel (web) se administran desde sus propios paneles o con sus proveedores de Terraform, si se decide más adelante.
