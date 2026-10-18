# Arma tu evento: recomendación y cotización (producto central)

Arma tu evento es el producto de valor de Festeka. El cliente describe su fiesta y la plataforma le sugiere N proveedores por categoría (3 por defecto, configurable). Él quita, cambia o agrega los suyos y, con un solo envío, pide cotización a todos. Por eso entra al MVP en una versión 1 basada en reglas; la versión con IA y el cobro llegan después.

**Flujo del cliente.**

1. **Cuéntanos tu evento:** tipo, temática, fecha y hora, barrio o zona, invitados, presupuesto total y, si quiere, fotos de referencia de sus tableros.
2. **Plan sugerido:** la plataforma propone las categorías típicas de ese tipo de evento (infantil: decoración, inflables, catering, torta, fotografía, video, animación). En cada una muestra N proveedores recomendados con la razón: "23 fotos de Bob Esponja", "cubre Novalito", "responde en menos de 1 hora".
3. **Ajuste:** en cada categoría el cliente desmarca recomendados, pide más opciones, cambia la cantidad (de 1 al máximo), agrega proveedores propios, quita la categoría o agrega otra.
4. **Envío:** confirma su celular con OTP y envía. Cada proveedor seleccionado recibe la solicitud por WhatsApp y en su panel, con los datos del cliente anonimizados hasta que responda.
5. **Respuestas:** el proveedor cotiza en un formulario corto (precio total, qué incluye, anticipo, vigencia, fotos de trabajos parecidos) o marca "No disponible".
6. **Comparativo:** por categoría, cuando llegan las respuestas o pasan 24 horas. El cliente elige, pide ajuste o descarta; después del evento se le pide reseña.

**Proveedores propios.** El cliente puede sumar marcas que no le recomendamos de tres formas: desde sus favoritos, buscando por nombre dentro de la categoría, o invitando a un proveedor que aún no está en Festeka (nombre y WhatsApp). En el último caso el proveedor recibe la solicitud con un enlace para crear su perfil gratis, así cada cotización también trae oferta nueva a la plataforma.

**Cantidades configurables.** Se resuelven de lo más específico a lo más general; los valores son una propuesta inicial.

| Nivel | Quién lo define | Ejemplo |
| --- | --- | --- |
| Solicitud | Cliente | Cambia la cantidad con + y − entre 1 y el máximo |
| Ciudad | Admin | En una ciudad nueva con poca oferta, 2 por categoría |
| Categoría | Admin | Locaciones y pirotecnia: 2 |
| Tipo de evento | Admin | Boda: decoración, catering, fotografía, video y música 3; luces 2 |
| Global | Admin | 3 por categoría, máximo 5, tope de 20 proveedores por solicitud |

El tope total evita que un cliente cotice con todo el mercado y que los proveedores reciban solicitudes que no van a convertirse.

**Cómo se eligen los recomendados (v1, por reglas).**

1. **Filtros duros:** la marca está activa y verificada, cubre la ciudad y la zona, no tiene la fecha bloqueada, ofrece la categoría y el tipo de evento, y su rango de precio cruza el presupuesto asignado a esa categoría.
2. **Puntaje** (pesos iniciales para calibrar con datos):
   - Coincidencia de tags con la solicitud y con las fotos de referencia, ponderada por faceta: 35 %
   - `quality_score` (perfil completo, fotos recientes, reseñas): 25 %
   - Tasa y tiempo de respuesta a cotizaciones: 20 %
   - Ajuste al presupuesto: 10 %
   - Cercanía a la zona del evento: 10 %
3. **Diversidad:** máximo una marca del mismo dueño por categoría y, cuando existe, al menos una opción en cada franja de precio.
4. **Exploración:** uno de los N puestos rota entre marcas nuevas o con poca exposición que pasan los filtros, marcado "Nuevo en Festeka". Así el ranking no se congela en las mismas tres marcas.
5. **Explicación:** cada recomendado muestra una o dos razones legibles, sacadas de los componentes del puntaje.

**Regla de confianza.** Los puestos de Arma tu evento no se venden. Los planes pagos dan visibilidad en búsqueda y landings, no en la recomendación. Si algún día se cobra por aparecer ahí, será un puesto adicional marcado "Patrocinado", nunca uno de los N.

**Versión 2 (fase 3).** Suma el comportamiento: combos de marcas que trabajan juntas (co-créditos en álbumes), co-contrataciones y tasa de adjudicación. También agrega similitud visual con las fotos de referencia, y la IA redacta el resumen para el proveedor y normaliza el comparativo. Las cifras siempre salen de lo que el proveedor escribió.

**Presupuesto por categoría.** El presupuesto total se reparte con una distribución por tipo de evento que define el admin al inicio y que luego se recalcula con las cotizaciones reales. El cliente puede mover el reparto.

**Estados.**

| Objeto | Estados |
| --- | --- |
| Solicitud | `borrador` → `plan_sugerido` → `enviada` → `en_respuesta` → `comparativo_listo` → `adjudicada` → `cerrada` / `expirada` |
| Proveedor en la solicitud | Origen: `recomendado`, `favorito`, `búsqueda`, `invitado` · Estado: `seleccionado`, `enviado`, `visto`, `respondido`, `no_disponible`, `expirado` |

**Datos.** Tablas nuevas o que cambian:

| Tabla | Campos principales |
| --- | --- |
| `event_requests` (reemplaza `quote_requests`) | id, user_id, city_id, zone_id, fecha_evento, tipo_evento_tag, temática_tag, invitados, presupuesto_total, referencias[], estado |
| `request_categories` | request_id, category_tag_id, cantidad, presupuesto_asignado |
| `request_items` | request_id, category_tag_id, brand_id (nulo si es invitado), nombre_invitado, whatsapp_invitado, origen, posición, razones_json, seleccionado |
| `recommendation_rules` | alcance (`global`, `tipo_evento`, `categoría`, `ciudad`), referencia_id, cantidad_default, cantidad_max, tope_total, distribución_presupuesto_json |
| `recommendation_logs` | request_id, brand_id, puntaje, componentes_json, mostrado, seleccionado, cotizó, adjudicado |

`quote_invites` y `quote_responses` se mantienen y cuelgan de cada `request_item` seleccionado. `recommendation_logs` es lo que permite calibrar pesos y, más adelante, entrenar la versión 2.

**API.**

| Método y ruta | Uso |
| --- | --- |
| `POST /v1/event-requests` | Crea el borrador y devuelve el plan sugerido |
| `GET /v1/event-requests/{id}` | Plan con categorías, recomendados y seleccionados |
| `PATCH /v1/event-requests/{id}/categories/{cat}` | Cambiar cantidad o presupuesto, quitar la categoría |
| `GET /v1/event-requests/{id}/categories/{cat}/more` | Más opciones para esa categoría |
| `POST /v1/event-requests/{id}/items` | Agregar un proveedor propio o invitar uno que no está |
| `PATCH /v1/event-requests/{id}/items/{item}` | Marcar o desmarcar |
| `POST /v1/event-requests/{id}/submit` | Enviar (requiere OTP) |
| `GET /v1/event-requests/{id}/comparison` | Comparativo por categoría |
| `/v1/admin/recommendation-rules` | Configurar cantidades, topes y reparto |

**Dónde se destaca en la interfaz.** Es la acción principal de todo el sitio:

- Botón "Arma tu evento" fijo en el encabezado de todas las páginas públicas.
- Hero de la home y de cada landing de ciudad con el formulario corto como primera acción.
- Banner en resultados de búsqueda y en landings de temática, con el plan prellenado ("Infantil · Bob Esponja").
- "Agregar a mi evento" en cada tarjeta de marca, en el perfil y en los créditos de cada foto ("Agregar los 4 a mi evento").
- Bandeja flotante "Mi evento" con los proveedores ya elegidos, en todas las páginas; en móvil, barra inferior fija.
- Recordatorio por WhatsApp al cliente que dejó un plan sin enviar.

**Métricas del producto.** Tasa de inicio (visitas que abren Arma tu evento), tasa de envío, proveedores por solicitud, porcentaje de recomendados que el cliente mantiene, porcentaje de proveedores propios y tasa de respuesta de proveedores en 24 horas.

## Estado de la implementación

- `apps/web/app/arma-tu-evento` tiene el paso 2 (plan sugerido, cantidades, selección, proveedores propios, tope de 20) con datos dummy de `apps/web/lib/data.ts`.
- La forma de los datos dummy (`PlanCategory`, `Candidate`, `PLAN_RULES`) es el contrato que debe devolver `POST /v1/event-requests` en el sprint 6.
- El envío es una simulación: no hay OTP ni WhatsApp todavía (sprint 7).

---
[Índice de la documentación](README.md) · [Roadmap](../ROADMAP.md)
