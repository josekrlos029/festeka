import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Planner, type EventSummary } from "@/components/planner/Planner";
import { EVENT_TYPES } from "@/lib/data";

export const metadata: Metadata = {
  title: "Arma tu evento",
  description: "Te sugerimos proveedores por categoría para tu fiesta en Valledupar. Tú eliges con quién cotizar.",
};

type Search = Record<string, string | string[] | undefined>;

function first(v: string | string[] | undefined) {
  return Array.isArray(v) ? v[0] : v;
}

export default async function ArmaTuEventoPage({ searchParams }: { searchParams: Promise<Search> }) {
  const sp = await searchParams;
  const tipo = first(sp.tipo);
  const summary: EventSummary = {
    eventType: EVENT_TYPES.includes(tipo as (typeof EVENT_TYPES)[number]) ? (tipo as string) : "Cumpleaños infantil",
    theme: first(sp.tematica)?.trim() || "",
    date: first(sp.fecha) || "",
    guests: Number(first(sp.invitados)) || 65,
    budget: Number(first(sp.presupuesto)) || 3000000,
    zone: first(sp.zona) || "Valledupar",
    source: first(sp.desde) || "directo",
  };

  return (
    <div className="min-h-screen bg-surface">
      <Header />
      {/* key: si cambian los parámetros, el plan se recalcula desde cero */}
      <Planner key={JSON.stringify(summary)} summary={summary} />
    </div>
  );
}
