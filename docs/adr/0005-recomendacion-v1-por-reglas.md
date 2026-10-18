# ADR 0005 · Arma tu evento v1 con recomendación por reglas, y los puestos no se venden

- Estado: aceptada
- Fecha: 2026-10-18

## Contexto

Arma tu evento es el producto de valor: N recomendados por categoría (configurable) y el cliente elige o agrega los suyos. En el lanzamiento no hay datos históricos para un modelo de comportamiento.

## Decisión

- v1 (MVP): filtros duros + puntaje ponderado (tags 35 %, `quality_score` 25 %, respuesta 20 %, presupuesto 10 %, zona 10 %), diversidad y un puesto de exploración para marcas nuevas. Ver docs/05.
- Cada puntaje se guarda en `recommendation_logs` para calibrar los pesos y entrenar la v2.
- **Regla de confianza:** los N puestos no se venden. Lo pagado solo aparece como puesto adicional marcado "Patrocinado".

## Consecuencias

- El plan nunca sale vacío si hay al menos 3 marcas verificadas por categoría (meta de catálogo).
- Los pesos son configuración, no código: se ajustan desde el admin sin desplegar.
