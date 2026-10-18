# Design system

Los tokens viven en `apps/web/app/globals.css` (bloque `@theme` de Tailwind 4). Úsalos por nombre (`bg-accent`, `text-ink-2`) y no escribas colores sueltos en los componentes.

Mockups aprobados: canvas "Festeka — Mockups" en Claude (7 pantallas + 5 variantes del hero). La landing implementa la Home con los heros A y B, y el paso 2 de Arma tu evento.

## Color

| Token | Valor | Uso |
| --- | --- | --- |
| `ink` | `#1B1530` | Texto principal, fondos oscuros, botón secundario |
| `ink-2` | `#4A4560` | Texto secundario |
| `muted` | `#6B6680` | Texto terciario (mínimo 4,5:1 sobre blanco) |
| `line` | `#E7E4EE` | Bordes |
| `surface` | `#F6F4FA` | Fondos de sección |
| `accent` | `#D02F5A` | Acción principal: **Arma tu evento** y sus CTA |
| `accent-strong` | `#A8204A` | Hover del acento, textos en rosa |
| `accent-soft` | `#FDE8EE` | Fondos de bandas de Arma tu evento |
| `marigold` | `#F5B700` | Etiqueta "Arma tu evento", acentos sobre fondo oscuro (solo con texto `ink`) |
| `teal` | `#0E7C7B` | Verificada, WhatsApp, estados positivos |

Regla: el rosa `accent` se reserva para la acción de Arma tu evento. Si todo es rosa, nada destaca.

## Tipografía

- Display: **Bricolage Grotesque** (800) para títulos (`font-display`).
- Texto: **Figtree** (400–700) para todo lo demás (`font-sans`).
- Se cargan con `@fontsource-variable/*` desde npm (sin depender de Google Fonts en el build).

## Componentes base

| Componente | Archivo | Notas |
| --- | --- | --- |
| Encabezado con CTA fijo | `components/Header.tsx` | El botón "Arma tu evento" está en todas las páginas |
| Formulario corto del evento | `components/hero/HeroForm.tsx` | GET a `/arma-tu-evento`, funciona sin JS |
| Marcador de foto | `components/SceneImage.tsx` | Se reemplaza por `next/image` cuando haya fotos reales |
| Bandeja "Mi evento" | `components/home/EventTray.tsx` | Aparece al pasar el hero; en móvil, barra inferior |
| Tarjeta de recomendado | `components/planner/Planner.tsx` (`CandidateCard`) | Razones legibles, badge "Nuevo en Festeka" |

## Accesibilidad

- Botones de 44 px de alto como mínimo.
- Botones y enlaces reales (`button`, `a`), nunca `div` con `onClick`.
- `prefers-reduced-motion`: el slider no rota y las transiciones se anulan.
- Contraste AA en todo el texto.
