// Package httpapi define las rutas HTTP de la API (docs/09-api.md).
package httpapi

import (
	"encoding/json"
	"log/slog"
	"net/http"
	"time"
)

// City es una ciudad habilitada. Ver tabla `cities` en docs/08-modelo-de-datos.md.
type City struct {
	Slug   string `json:"slug"`
	Name   string `json:"name"`
	Status string `json:"status"`
}

// NewRouter arma el enrutador con la librería estándar (Go 1.22+ soporta métodos y patrones).
func NewRouter(logger *slog.Logger) http.Handler {
	mux := http.NewServeMux()

	mux.HandleFunc("GET /healthz", func(w http.ResponseWriter, _ *http.Request) {
		writeJSON(w, http.StatusOK, map[string]string{"status": "ok"})
	})

	mux.HandleFunc("GET /v1/cities", func(w http.ResponseWriter, _ *http.Request) {
		// TODO(sprint-1): leer de Postgres (Neon).
		writeJSON(w, http.StatusOK, map[string]any{
			"data": []City{{Slug: "valledupar", Name: "Valledupar", Status: "activa"}},
		})
	})

	return withLogging(logger, mux)
}

func writeJSON(w http.ResponseWriter, status int, body any) {
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	w.WriteHeader(status)
	_ = json.NewEncoder(w).Encode(body)
}

func withLogging(logger *slog.Logger, next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		start := time.Now()
		next.ServeHTTP(w, r)
		logger.Info("request", "method", r.Method, "path", r.URL.Path, "ms", time.Since(start).Milliseconds())
	})
}
