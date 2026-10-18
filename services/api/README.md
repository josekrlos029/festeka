# services/api

API REST de Festeka en Go. Se despliega en Cloud Run. Las rutas están en [docs/09-api.md](../../docs/09-api.md) y las de Arma tu evento en [docs/05](../../docs/05-arma-tu-evento.md).

```bash
go run ./cmd/api        # http://localhost:8080/healthz
go test ./...
docker build -t festeka-api .
```

Hoy solo existen `GET /healthz` y `GET /v1/cities` (con datos fijos). La conexión a Neon, las migraciones y la autenticación OTP llegan en el sprint 1.

Estructura prevista:

```text
cmd/api/            punto de entrada
internal/httpapi/   rutas y handlers
internal/store/     acceso a datos (sqlc + pgx)
internal/recommend/ motor de Arma tu evento v1 (sprint 6)
migrations/         migraciones SQL
```
