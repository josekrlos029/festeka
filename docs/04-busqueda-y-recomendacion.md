# Búsqueda, indexación y recomendación

PostgreSQL es la fuente de verdad y Typesense es el índice de búsqueda: da tolerancia a errores, facetas, sinónimos y búsqueda vectorial en un solo servicio, y se puede autoalojar barato en GCP. Meilisearch es una alternativa equivalente; Elasticsearch es más de lo que el MVP necesita.

**Índices.**

| Índice | Un documento por | Campos clave |
| --- | --- | --- |
| `brands` | Marca × ciudad | nombre, descripción, categorías, tags por faceta, ciudad, zonas, rango de precio, verificada, calificación, `quality_score`, plan |
| `photos` | Foto publicada | descripción (alt), tags por faceta, temática, marca autora, marcas co-acreditadas, ciudad, tipo de evento, embedding de imagen |
| `tags` | Tag | nombre, sinónimos, faceta, conteo por ciudad (para autocompletado) |

**Sincronización.** Cada cambio en Postgres escribe un evento en una tabla outbox en la misma transacción; un worker lo publica en Pub/Sub y el indexador actualiza Typesense. Si el índice se corrompe, un job lo reconstruye completo desde Postgres.

**Interpretación de la consulta.** Antes de buscar, el texto se cruza con el diccionario de tags y sinónimos: "decoración bob esponja valledupar" se convierte en categoría = Decoración, temática = Bob Esponja, ciudad = Valledupar, y esos valores se aplican como filtros con peso alto. Lo que no coincide con ningún tag se busca como texto libre.

**Orden de resultados.**

1. Coincidencia de tags y texto (relevancia).
2. Ciudad y zona del usuario.
3. `quality_score` de la marca: perfil completo, verificada, fotos recientes, reseñas, tasa de respuesta a WhatsApp y cotizaciones.
4. Impulso por plan pagado, limitado a posiciones marcadas como "Destacado" para no degradar la confianza.

**Recomendación (fase 3).** Se construye en tres capas, de la más simple a la más costosa:

- **Por contenido:** marcas y fotos con tags en común (similitud de conjuntos ponderada por faceta).
- **Visual:** fotos parecidas por embedding de imagen (búsqueda vectorial en Typesense o pgvector).
- **Por comportamiento:** co-visitas y co-contrataciones ("quienes vieron este decorador también contactaron a este catering"), calculadas en batch diario sobre los eventos de BigQuery.

**Registro de búsquedas.** Cada búsqueda guarda consulta, filtros, ciudad, resultados y clics. Las búsquedas sin resultados alimentan la taxonomía y el onboarding de marcas que faltan; el agregado es la base del producto de datos de la fase 4.

---
[Índice de la documentación](README.md) · [Roadmap](../ROADMAP.md)
