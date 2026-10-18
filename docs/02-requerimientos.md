# Requerimientos

## Requerimientos funcionales

El MVP (fase 1) entrega Directorio, Portafolio, Tags, Búsqueda, Contacto, Panel proveedor y Admin; el resto llega por fases. Prioridad: M = obligatorio en su fase, D = deseable.

| ID | Módulo | Requerimiento | Fase | Prioridad |
| --- | --- | --- | --- | --- |
| RF-01 | Directorio | La plataforma organiza la oferta en Ciudad → Categoría → Marca → Servicio | 1 | M |
| RF-02 | Directorio | Cada marca tiene perfil público con logo, portada, descripción, ciudades y zonas que cubre, rango de precios, WhatsApp, Instagram y horario | 1 | M |
| RF-03 | Directorio | Una marca puede estar en varias categorías (p. ej. decoración + inflables) y varias ciudades | 1 | M |
| RF-04 | Directorio | Las marcas pasan por verificación (RUT o cédula + revisión de redes) y muestran sello "Verificada" | 1 | M |
| RF-05 | Portafolio | El proveedor sube "eventos realizados": álbum con fecha, ciudad, tipo de evento, temática y fotos/videos | 1 | M |
| RF-06 | Portafolio | Cada foto tiene página propia indexable, con sus tags, la marca autora y las marcas co-acreditadas ("decoración por X, fotos por Y") | 1 | M |
| RF-07 | Portafolio | Las imágenes se comprimen y sirven en WebP/AVIF en varios tamaños; el EXIF se limpia de datos de ubicación | 1 | M |
| RF-08 | Tags | Marcas, servicios, álbumes y fotos se etiquetan con tags de una taxonomía controlada (ver Motor de tags) | 1 | M |
| RF-09 | Tags | Al subir una foto, la IA sugiere tags (temática, colores, elementos, tipo de evento) y el proveedor confirma o corrige | 1 | M |
| RF-10 | Búsqueda | Búsqueda de texto libre con autocompletado, tolerancia a errores y sinónimos ("bob esponja" = "spongebob") | 1 | M |
| RF-11 | Búsqueda | Filtros facetados por ciudad, categoría, tipo de evento, temática, estilo, precio, verificado y calificación | 1 | M |
| RF-12 | Búsqueda | Pestañas de resultados: Marcas y Fotos (inspiración); desde una foto se llega a la marca | 1 | M |
| RF-13 | Contacto | Botón de WhatsApp con mensaje prellenado y trazado (cada clic se registra como lead) | 1 | M |
| RF-14 | Cliente | Registro con Google o celular + código OTP; favoritos y tableros de inspiración | 2 | M |
| RF-15 | Reseñas | Reseñas con calificación 1–5, solo de clientes con evento confirmado o invitación del proveedor; respuesta pública del proveedor | 2 | M |
| RF-16 | Contenido | Guías y landing pages editoriales ("Ideas fiesta Bob Esponja", "Precios decoración boda Valledupar") | 2 | M |
| RF-17 | Recomendación | "Marcas similares", "fotos parecidas" y "quienes vieron esto también vieron" | 3 | M |
| RF-18 | Recomendación | Recomendación por paquete: dado un decorador elegido, sugerir catering, fotógrafo e inflables que han trabajado con él | 3 | D |
| RF-19 | Cotizaciones | Arma tu evento: N recomendados por categoría (cantidad configurable), selección propia, envío único y comparativo (ver Arma tu evento) | 1 | M |
| RF-20 | Panel proveedor | Estadísticas: vistas de perfil, apariciones en búsqueda, clics a WhatsApp, cotizaciones recibidas | 1 | M |
| RF-21 | Panel proveedor | Planes y pagos (gratis, destacado, premium) con pasarela local; Destacado desde la fase 2 | 2–4 | M |
| RF-22 | Admin | Abrir y cerrar ciudades; una ciudad no se publica en Google hasta tener un mínimo de marcas por categoría | 1 | M |
| RF-23 | Admin | Gestión de taxonomía: crear, fusionar, renombrar tags y sinónimos sin romper URLs (redirecciones 301) | 1 | M |
| RF-24 | Admin | Cola de moderación de fotos, marcas y reseñas | 1 | M |
| RF-25 | Admin | Carga asistida de marcas (onboarding hecho por el equipo desde Instagram con autorización del proveedor) | 1 | M |

## Requerimientos no funcionales

El público entra casi todo desde el celular y desde Google, así que el rendimiento móvil y el SEO pesan más que cualquier otra cualidad.

| ID | Atributo | Requerimiento |
| --- | --- | --- |
| RNF-01 | Rendimiento | LCP < 2,5 s y CLS < 0,1 en móvil 4G para páginas públicas; búsqueda < 200 ms en el p95 |
| RNF-02 | Disponibilidad | 99,5 % mensual en páginas públicas y API |
| RNF-03 | Escalabilidad | Soportar 500 000 fotos y 10 000 marcas sin cambiar de arquitectura; servicios sin estado que escalan horizontalmente |
| RNF-04 | Imágenes | Originales en Cloud Storage, variantes WebP/AVIF servidas por CDN; tamaño máximo de subida 15 MB por foto y 200 MB por video |
| RNF-05 | Seguridad | OAuth/OTP, JWT de corta duración, roles por marca, límite de peticiones por IP en formularios, WAF (Cloud Armor) |
| RNF-06 | Privacidad | Cumplimiento de la Ley 1581 de 2012 (habeas data): autorización explícita de tratamiento de datos, política publicada y opción de borrado de cuenta |
| RNF-07 | Propiedad del contenido | El proveedor declara que tiene derecho a publicar sus fotos; marca de agua opcional con su logo; botón de reporte para fotos ajenas |
| RNF-08 | Observabilidad | Logs estructurados, trazas y métricas en Cloud Logging/Monitoring; alertas de error y latencia |
| RNF-09 | Analítica | Eventos de producto (búsqueda, vista, clic a WhatsApp, cotización) a BigQuery desde el día uno |
| RNF-10 | Accesibilidad | WCAG 2.1 AA en páginas públicas; texto alternativo en todas las fotos |
| RNF-11 | Multi-ciudad | Ciudad como dimensión de primer nivel en datos, URLs, búsqueda y analítica |
| RNF-12 | Idioma | Español de Colombia; precios en COP; el modelo admite otros idiomas a futuro sin rediseño |

---
[Índice de la documentación](README.md) · [Roadmap](../ROADMAP.md)
