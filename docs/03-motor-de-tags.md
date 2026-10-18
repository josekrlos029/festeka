# Motor de tags

El motor de tags es el corazón del producto: una taxonomía controlada por el equipo, con tags agrupados en facetas, sinónimos y jerarquía, que se aplica a marcas, servicios, álbumes y fotos. No son hashtags libres: el proveedor elige de un catálogo y puede proponer tags nuevos que un curador aprueba.

**Facetas (tipos de tag).**

| Faceta | Ejemplos | Se aplica a |
| --- | --- | --- |
| Categoría de servicio | Decoración, Inflables, Catering, Estaciones de comida, DJ, Orquesta, Fotografía, Video, Luces, Pirotecnia, Mobiliario, Pastelería, Animación, Locación | Marca, servicio |
| Tipo de evento | Infantil, Boda, 15 años, Baby shower, Bautizo, Grado, Corporativo, Aniversario | Marca, servicio, álbum, foto |
| Temática | Bob Esponja, Safari, Princesas, Futbol, Vallenato, Tropical, Halloween | Álbum, foto |
| Estilo | Minimalista, Rústico, Boho, Elegante, Neón | Marca, álbum, foto |
| Paleta de color | Dorado, Pastel, Blanco y verde, Arcoíris | Foto |
| Elemento | Arco de globos, Backdrop, Mesa de dulces, Cabina 360, Pantalla LED, Chispero frío | Foto, servicio |
| Espacio | Salón, Jardín, Finca, Playa, Casa, Conjunto | Álbum, foto |
| Escala / precio | Hasta 50 invitados, 50–150, 150+; rango de precio en COP | Servicio, álbum |
| Ciudad / zona | Valledupar, La Paz, Agustín Codazzi | Marca, álbum |

**Reglas del modelo.**

- Cada tag tiene `slug` único, nombre visible, faceta, padre opcional (Infantil → Fiesta infantil temática) y lista de sinónimos para la búsqueda.
- Un tag puede tener página propia indexable (temática y tipo de evento sí; paleta de color no).
- Herencia hacia abajo: una foto hereda ciudad y tipo de evento de su álbum, y el álbum hereda la categoría de la marca. Así el proveedor solo etiqueta lo específico de la foto.
- Los tags de foto tienen origen (`ia`, `proveedor`, `curador`) y confianza; solo los confirmados por proveedor o curador se indexan para SEO.

**Etiquetado asistido por IA.** Al subir una foto, un worker la envía a un modelo de visión con la lista de tags de la taxonomía como opciones cerradas. El modelo devuelve tags candidatos con confianza y una descripción corta para el texto alternativo. El proveedor ve los sugeridos ya marcados y confirma en un toque. Lo que el modelo detecte fuera del catálogo ("personaje no reconocido") queda como propuesta para el curador.

**Gobierno de la taxonomía.** El curador fusiona duplicados ("bob esponja", "bobesponja", "spongebob" → un tag con sinónimos), renombra sin romper URLs (redirección 301 del slug viejo) y revisa semanalmente los términos más buscados sin resultados para crear tags nuevos.

**Nota legal sobre personajes.** Temáticas como Bob Esponja son marcas registradas. La plataforma etiqueta y describe las fotos de fiestas reales; no usa logos ni imágenes oficiales del personaje en su propia marca, banners o anuncios.

---
[Índice de la documentación](README.md) · [Roadmap](../ROADMAP.md)
