# API principal

API REST versionada (`/v1`) en Go, documentada con OpenAPI; el frontend público la consume desde el servidor de Next.js y el panel desde el navegador con JWT.

| Método y ruta | Uso | Acceso |
| --- | --- | --- |
| `GET /v1/cities` | Ciudades activas | Público |
| `GET /v1/search?q=&city=&facets=` | Búsqueda unificada; devuelve marcas, fotos, facetas con conteos y tags interpretados | Público |
| `GET /v1/suggest?q=&city=` | Autocompletado de tags, marcas y temáticas | Público |
| `GET /v1/brands/{slug}` | Perfil de marca con servicios, álbumes, reseñas | Público |
| `GET /v1/photos/{id}` | Foto con tags, créditos y fotos similares | Público |
| `GET /v1/pages/{city}/{category}/{tag}` | Datos de una landing programática y si pasa el umbral de indexación | Público (SSR) |
| `POST /v1/leads` | Registra clic a WhatsApp o contacto | Público, con límite de peticiones |
| `POST /v1/auth/otp` · `POST /v1/auth/verify` | Login por celular | Público |
| `PUT /v1/me/brands/{id}` | Editar perfil de marca | Proveedor |
| `POST /v1/me/albums` · `POST /v1/me/albums/{id}/media` | Crear álbum y pedir URL firmada de subida | Proveedor |
| `GET /v1/me/media/{id}/tag-suggestions` | Tags sugeridos por IA | Proveedor |
| `PUT /v1/me/media/{id}/tags` | Confirmar tags | Proveedor |
| `POST /v1/me/albums/{id}/credits` | Invitar a otra marca a co-acreditarse | Proveedor |
| `GET /v1/me/stats` | Estadísticas del proveedor | Proveedor |
| `POST /v1/quotes` · `GET /v1/quotes/{id}` | Crear solicitud y ver comparativo | Cliente (fase 1, rutas en Arma tu evento) |
| `POST /v1/me/quote-invites/{id}/response` | Responder cotización | Proveedor (fase 1) |
| `/v1/admin/*` | Taxonomía, moderación, ciudades, onboarding | Admin |

Las rutas de Arma tu evento (`/v1/event-requests/...`) están en [05-arma-tu-evento.md](05-arma-tu-evento.md). Reemplazan a `POST /v1/quotes`.

---
[Índice de la documentación](README.md) · [Roadmap](../ROADMAP.md)
