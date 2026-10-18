# Experimento A/B del hero: Mosaico vs. Slider

El hero de la Home se decide con una prueba A/B entre la variante A (mosaico de fotos con formulario) y la B (slider a pantalla completa con formulario encima). Gana la que más visitantes lleva a empezar Arma tu evento, siempre que no empeore la velocidad de carga ni el rebote.

**Hipótesis.** B genera más interacción con las fotos y más clics hacia proveedores; A genera más clics en "Ver mis recomendados" porque el formulario compite menos con la imagen.

**Métricas.**

| Tipo | Métrica | Cómo se calcula |
| --- | --- | --- |
| Principal | Inicio de Arma tu evento desde el hero | Visitantes con `hero_cta_click` ÷ visitantes con `hero_view` |
| Secundaria | Alcance de clics a proveedores | Visitantes con al menos un `hero_photo_click` ÷ `hero_view`, y marcas distintas que recibieron clic |
| Secundaria | Interacción total con el hero | Visitantes con cualquier clic del hero (CTA, foto, flechas, puntos, búsqueda) ÷ `hero_view` |
| Secundaria | Conversión final | Solicitudes enviadas ÷ visitantes, por variante, en 7 días |
| Secundaria | Exposición de marcas (solo B) | Slides vistos por visitante y marcas mostradas por sesión |
| Guarda | Velocidad de carga | LCP p75 en móvil; si una variante supera 2,5 s se corrige antes de seguir |
| Guarda | Rebote | Sesiones de una sola página sin clic en el hero |

**Eventos a registrar** (a BigQuery, cada uno con `variant`, `visitor_id`, `session_id`, ciudad y dispositivo):

| Evento | Propiedades |
| --- | --- |
| `hero_view` | variante, tiempo hasta pintar la imagen principal |
| `hero_cta_click` | botón (`ver_recomendados`, `arma_tu_evento_header`) |
| `hero_form_interact` | campo (tipo, temática, fecha, invitados) |
| `hero_photo_click` | photo_id, brand_id, posición o número de slide |
| `hero_slide_view` | número de slide, brand_id, automático o manual (solo B) |
| `hero_slider_nav` | `flecha`, `punto`, `pausa` (solo B) |
| `hero_search_click` | enlace "busca un proveedor puntual" |
| `hero_scroll_past` | el visitante bajó más allá del hero sin clic |

**Asignación.**

- 50/50 por visitante, no por visita: un ID anónimo en cookie mantiene a la persona en la misma variante durante todo el experimento.
- Se asigna en el servidor (middleware de Next.js) para que no haya parpadeo entre variantes y la página siga renderizándose completa.
- Googlebot y otros bots siempre ven A y no cuentan en el análisis.
- La asignación puede hacerse con una herramienta de feature flags (GrowthBook o PostHog, por ejemplo) o con lógica propia en el middleware; el análisis se hace en BigQuery en cualquiera de los dos casos.

**Tamaño y duración.** Con una tasa base supuesta de 8 % de clic en el CTA, detectar una mejora a 10 % (25 % relativo) con 95 % de confianza y 80 % de potencia requiere unos 3.200 visitantes por variante, unos 6.400 en total. La prueba dura mínimo 2 semanas completas, para cubrir dos fines de semana, y no se detiene antes de llegar a la muestra aunque una variante parezca ganar. Si el tráfico de Valledupar no alcanza en 4 semanas, se amplía a la segunda ciudad o se acepta detectar solo diferencias más grandes.

**Condiciones para que la prueba sea justa.**

- Mismo texto de título, mismo formulario y mismo CTA en ambas variantes; solo cambia el componente de fotos.
- En B: la primera foto se carga con prioridad y las demás de forma diferida; el slider se pausa al pasar el cursor o al enfocar el formulario, y no rota si el usuario tiene "reducir movimiento" activado.
- Fotos reales y equivalentes en ambas variantes, de las mismas marcas.

**Lectura del resultado.** Si A y B empatan en la métrica principal, gana la que tenga mejor LCP, por costo de mantenimiento. Un mapa de calor (Microsoft Clarity u otro) ayuda a entender el porqué, pero la decisión se toma con los eventos.

## Implementación actual

| Pieza | Archivo |
| --- | --- |
| Asignación 50/50, cookie fija, bots a A, `?hero=a\|b` para QA | `apps/web/proxy.ts` |
| Constantes, nombres de cookies, interruptores `HERO_EXPERIMENT=off` y `HERO_FORCE=a\|b` | `apps/web/lib/experiments.ts` |
| Variantes estáticas (noindex, canonical a `/`) | `apps/web/app/h/[variant]/page.tsx` |
| Variante A (mosaico) | `apps/web/components/hero/HeroMosaic.tsx` |
| Variante B (slider) | `apps/web/components/hero/HeroSlider.tsx` |
| Título, formulario y CTA idénticos en ambas | `HeroCopy.tsx`, `HeroForm.tsx` |
| `hero_view` y `hero_scroll_past` | `HeroShell.tsx` |
| Envío de eventos (`sendBeacon` + `dataLayer`) | `apps/web/lib/analytics.ts` → `apps/web/app/api/events/route.ts` |

Hoy `/api/events` solo escribe cada evento en el log (visible en los logs de Vercel). En el sprint 8 se envían a BigQuery.

**Antes de arrancar la prueba de verdad:** reemplazar los marcadores de foto por fotos reales (las mismas en A y B), conectar BigQuery y quitar el `noindex` global (`NEXT_PUBLIC_DEMO=false`).

---
[Índice de la documentación](README.md) · [Roadmap](../ROADMAP.md)
