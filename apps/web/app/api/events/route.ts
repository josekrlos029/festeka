import { NextResponse } from "next/server";

/**
 * Recibe los eventos de producto (lib/analytics.ts).
 * Hoy solo valida y registra en el log (visible en los logs de Vercel).
 * Sprint 8: reenviar a BigQuery (o a la API Go en /v1/events). Ver docs/10-experimento-ab-hero.md.
 */
const ALLOWED = /^(hero|plan)_[a-z_]+$/;

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return new NextResponse(null, { status: 400 });
  }
  const name = typeof body === "object" && body !== null ? (body as { name?: unknown }).name : undefined;
  if (typeof name !== "string" || !ALLOWED.test(name)) {
    return new NextResponse(null, { status: 400 });
  }
  console.log(JSON.stringify({ type: "product_event", ...(body as object) }));
  return new NextResponse(null, { status: 204 });
}
