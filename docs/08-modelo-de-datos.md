# Modelo de datos

El modelo gira en torno a una tabla de etiquetado polimórfica (`taggings`) que une cualquier entidad con cualquier tag, y a la co-autoría de álbumes (`album_credits`), que permite decir quién hizo qué en cada fiesta.

| Tabla | Campos principales | Notas |
| --- | --- | --- |
| `cities` | id, slug, nombre, departamento, estado (`borrador`, `activa`), lat/lng | Una ciudad se publica cuando el admin la activa |
| `zones` | id, city_id, slug, nombre | Barrios o municipios cercanos que cubre una marca |
| `brands` | id, slug, nombre, descripción, logo_url, portada_url, whatsapp, instagram, rango_precio_min/max, verificada, quality_score, plan_id, estado | Dueño en `brand_members` |
| `brand_members` | brand_id, user_id, rol (`dueño`, `editor`) | Colaboradores de la marca |
| `brand_coverage` | brand_id, city_id, zone_id | Dónde presta servicio |
| `services` | id, brand_id, nombre, descripción, precio_desde, unidad (por evento, por persona, por hora) | Lo que ofrece cada marca |
| `albums` | id, brand_id, título, fecha_evento, city_id, zone_id, invitados_aprox, estado | Un evento realizado |
| `album_credits` | album_id, brand_id, rol (`decoración`, `fotografía`…), estado (`pendiente`, `aceptado`) | Co-autoría: la marca invitada acepta el crédito |
| `media` | id, album_id, tipo (foto, video), storage_key, ancho, alto, alt, embedding, estado_moderación | Variantes generadas por el worker |
| `tag_facets` | id, slug, nombre, indexable | Temática, estilo, tipo de evento… |
| `tags` | id, facet_id, parent_id, slug, nombre, sinónimos[], estado (`activo`, `propuesto`, `fusionado`), merged_into_id | Taxonomía controlada |
| `taggings` | tag_id, entity_type, entity_id, origen (`ia`, `proveedor`, `curador`), confianza, confirmado | Etiquetado de marcas, servicios, álbumes y media |
| `users` | id, nombre, email, celular, rol, consentimiento_datos_at | Clientes, proveedores y admins |
| `boards` / `board_items` | user_id, nombre / board_id, media_id | Tableros de inspiración |
| `reviews` | id, brand_id, user_id, album_id?, calificación, texto, respuesta, estado | Moderadas |
| `leads` | id, brand_id, user_id?, canal (`whatsapp`, `formulario`), origen (página, búsqueda), creado_at | Base para estadísticas y cobro por lead |
| `quote_requests` | Reemplazada por event_requests (ver Arma tu evento) | Ya no se usa |
| `quote_invites` | quote_request_id, brand_id, estado, enviado_at, respondido_at | A quién se envió |
| `quote_responses` | quote_invite_id, precio_total, incluye[], anticipo, vigencia, notas | Respuesta estructurada |
| `search_logs` | id, consulta, filtros_json, city_id, total_resultados, clic_entidad, creado_at | También se exporta a BigQuery |
| `outbox_events` | id, agregado, tipo, payload, publicado_at | Sincronización con Pub/Sub |
| `slug_redirects` | slug_viejo, slug_nuevo, tipo | Para 301 al renombrar o fusionar |

---
[Índice de la documentación](README.md) · [Roadmap](../ROADMAP.md)
