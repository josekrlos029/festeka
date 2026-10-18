# Riesgos y decisiones abiertas

El mayor riesgo no es técnico: es llenar el catálogo. Sin marcas y fotos etiquetadas no hay SEO ni tráfico, por eso el onboarding asistido va desde el día uno.

| Riesgo | Mitigación |
| --- | --- |
| Proveedores no suben ni etiquetan fotos | El equipo hace la carga inicial desde su Instagram con autorización; la IA etiqueta y el proveedor solo confirma |
| Contenido delgado penalizado por Google | Umbral de publicación por combinación y `noindex` hasta cumplirlo |
| Fotos subidas sin permiso del autor | Declaración de derechos, crédito obligatorio al fotógrafo, botón de reporte y retiro en 48 h |
| Uso de personajes con marca registrada | Etiquetar y describir fiestas reales; no usar imágenes oficiales del personaje en la marca ni en pauta |
| Clientes saltan a WhatsApp y no se mide nada | Clic trazado como lead con mensaje prellenado "Te encontré en Festeka" |
| Proveedores no responden cotizaciones | Penalización en `quality_score` y límite de solicitudes para marcas inactivas |
| El cliente cree que las recomendaciones están pagadas | Los N puestos no se venden; cada recomendado muestra su razón; lo patrocinado va aparte y marcado |
| Proveedores saturados de solicitudes de baja calidad | Tope de proveedores por solicitud, OTP obligatorio y límite semanal de solicitudes por proveedor configurable |

**Decisiones abiertas para aprobar.**

- [ ] Nombre definitivo y dominio (`festeka.co` u otro)
- [ ] Typesense autoalojado en GKE/Compute vs. Typesense Cloud administrado
- [ ] Modelo de visión para el etiquetado (API de Claude con visión o Google Vision + reglas)
- [ ] Proveedor de OTP y de WhatsApp Business API
- [ ] Pasarela de pagos para planes (Wompi, Mercado Pago u otra) — necesaria desde la fase 2
- [ ] Metas de catálogo para lanzar Valledupar (propuesta: 40 marcas, 400 fotos)
- [ ] Segunda ciudad y criterio para abrirla

---
[Índice de la documentación](README.md) · [Roadmap](../ROADMAP.md)
