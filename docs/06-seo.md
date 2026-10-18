# SEO técnico por ciudad

El SEO se basa en páginas programáticas generadas de la combinación ciudad × categoría × tag, renderizadas en el servidor (Next.js) y publicadas solo cuando tienen contenido suficiente. La ventaja frente a Instagram es que cada foto y cada combinación es una página que Google puede indexar.

**Estructura de URLs.**

| Página | URL | Ejemplo de búsqueda que captura |
| --- | --- | --- |
| Ciudad | `/valledupar` | "proveedores eventos Valledupar" |
| Categoría en ciudad | `/valledupar/decoracion` | "decoradores en Valledupar" |
| Categoría + tipo de evento | `/valledupar/decoracion/infantil` | "decoración fiestas infantiles Valledupar" |
| Categoría + temática | `/valledupar/decoracion/tematica/bob-esponja` | "decoración Bob Esponja Valledupar" |
| Ideas por temática (inspiración) | `/ideas/bob-esponja` | "ideas fiesta Bob Esponja" |
| Marca | `/marca/globos-y-suenos` | nombre de la marca |
| Foto | `/foto/arco-globos-bob-esponja-8f3k2` | búsqueda de imágenes en Google |
| Guía editorial | `/guias/cuanto-cuesta-decoracion-boda-valledupar` | preguntas de precio |

**Reglas.**

- **Umbral de publicación:** una combinación solo se indexa si tiene al menos 3 marcas o 12 fotos; si no, responde con `noindex` y enlaza a la página padre. Evita contenido delgado en ciudades nuevas.
- **Datos estructurados:** `LocalBusiness` con `aggregateRating` en marcas, `ImageObject` con autor en fotos, `BreadcrumbList` en todas, `FAQPage` en guías.
- **Imágenes:** nombre de archivo y `alt` generados de los tags ("arco de globos amarillo fiesta Bob Esponja Valledupar"), sitemap de imágenes, tamaños responsivos.
- **Sitemaps** segmentados por ciudad y tipo de página, regenerados cuando cambian los datos.
- **Enlazado interno:** cada página enlaza a hermanas (otras temáticas en la ciudad), a la página padre y a marcas relacionadas.
- **Rendimiento:** Core Web Vitals en verde en móvil (LCP < 2,5 s); páginas con ISR (regeneración incremental) y CDN.
- **Google Business Profile:** guía para que cada marca enlace su perfil de Festeka como sitio web, lo que da enlaces locales.

**Apertura de una ciudad.** Se carga la oferta (meta inicial: 40 marcas y 400 fotos etiquetadas en Valledupar), se publican las combinaciones que pasan el umbral y se acompaña con guías locales y contenido en redes. Luego se replica en ciudades cercanas del Caribe.

---
[Índice de la documentación](README.md) · [Roadmap](../ROADMAP.md)
