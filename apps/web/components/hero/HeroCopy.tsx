/** Título y bajada del hero: los mismos en A y B. */
export function HeroCopy({ onDark = false }: { onDark?: boolean }) {
  return (
    <>
      <p className={`flex items-center gap-2 text-sm font-semibold ${onDark ? "text-on-night" : "text-ink-2"}`}>
        <span className="h-2 w-2 rounded-full bg-teal" aria-hidden="true" />
        Valledupar · fiestas reales, proveedores reales
      </p>
      <h1
        className={`font-display text-[clamp(36px,4.6vw,62px)] font-extrabold leading-[1.02] tracking-[-0.03em] ${
          onDark ? "text-white" : "text-ink"
        }`}
      >
        Cuéntanos tu fiesta. Te sugerimos a quién contratar.
      </h1>
      <p className={`max-w-[640px] text-lg leading-relaxed ${onDark ? "text-[#E4E0EE]" : "text-ink-2"}`}>
        Decoración, inflables, catering, foto y más, recomendados para tu temática, tu zona y tu presupuesto.
        Una sola solicitud, todas las cotizaciones.
      </p>
    </>
  );
}
