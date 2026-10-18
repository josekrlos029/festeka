import { PALETTES, type PaletteKey } from "@/lib/data";

/**
 * Marcador de foto: un arco de globos ilustrado mientras no hay fotos reales.
 * Cuando lleguen las fotos de los proveedores, este componente se reemplaza por
 * next/image (priority solo en la primera foto del hero). Ver ROADMAP, sprint 3.
 */
const ARCH: [number, number, 1 | 2][] = [
  [340, 230, 1], [333, 184, 2], [313, 142, 1], [282, 109, 2], [243, 87, 1], [200, 80, 2],
  [157, 87, 1], [118, 109, 2], [87, 142, 1], [67, 184, 2], [60, 230, 1],
];
const ACCENTS: [number, number][] = [[337, 207], [298, 125], [222, 83], [137, 98], [77, 163]];

export function SceneImage({
  palette,
  label,
  className = "",
}: {
  palette: PaletteKey;
  label: string;
  className?: string;
}) {
  const p = PALETTES[palette];
  return (
    <svg
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={label}
      className={`absolute inset-0 h-full w-full ${className}`}
    >
      <rect width="400" height="300" fill={p.bg} />
      <rect y="232" width="400" height="68" fill={p.floor} />
      <rect x="125" y="188" width="150" height="48" rx="4" fill={p.table} />
      {ARCH.map(([cx, cy, c]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="24" fill={c === 1 ? p.c1 : p.c2} />
      ))}
      {ACCENTS.map(([cx, cy]) => (
        <circle key={`a-${cx}-${cy}`} cx={cx} cy={cy} r="12" fill={p.c3} />
      ))}
    </svg>
  );
}
