---
description: Implementa una tarea del ROADMAP por su ID (ej. /tarea S3-02)
argument-hint: <ID de la tarea, ej. S1-02>
---

Implementa la tarea **$ARGUMENTS** de `ROADMAP.md`.

1. Lee la tarea, el criterio de salida de su sprint y los documentos de `docs/` que menciona. Revisa los ADR relacionados en `docs/adr/`.
2. Si algo es ambiguo o contradice los docs, pregúntame antes de escribir código.
3. Crea la rama `s<sprint>-<id>-<slug>` (por ejemplo `s3-02-subida-firmada`).
4. Implementa respetando las reglas de `CLAUDE.md`: el CTA de Arma tu evento, la regla de confianza, el A/B justo, los tokens de diseño y la accesibilidad.
5. Agrega pruebas y corre los comandos de CI del área que tocaste:
   - web: `pnpm lint && pnpm typecheck && pnpm build`
   - api: `cd services/api && go vet ./... && go test ./...`
6. Marca la tarea `[x]` en `ROADMAP.md`. Actualiza los docs o crea un ADR si cambió el contrato, el modelo o una decisión.
7. Resume qué cambió, cómo probarlo y qué queda pendiente.
