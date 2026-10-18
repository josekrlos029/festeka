export function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true">
        <circle cx="16" cy="16" r="15" fill="#D02F5A" />
        <path d="M10 21l4-11 8 7-12 4z" fill="#FFFFFF" />
        <circle cx="23" cy="9" r="2" fill="#F5B700" />
        <circle cx="8" cy="11" r="1.6" fill="#F5B700" />
      </svg>
      <span
        className={`font-display text-[26px] font-extrabold tracking-tight ${dark ? "text-white" : "text-ink"}`}
      >
        Festeka
      </span>
    </span>
  );
}
