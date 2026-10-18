/**
 * DATOS DUMMY. Todas las marcas, precios, calificaciones y conteos son de ejemplo.
 * Se reemplazan por la API (services/api) en los sprints 2 a 6 del ROADMAP.
 * Mantener la forma de estos tipos: es el contrato que la API debe devolver.
 */

export type Palette = {
  bg: string;
  floor: string;
  table: string;
  c1: string;
  c2: string;
  c3: string;
};

export const PALETTES = {
  bob: { bg: "#CFE8F5", floor: "#F2D27A", table: "#FFFFFF", c1: "#F5C518", c2: "#3FA7D6", c3: "#F28C38" },
  safari: { bg: "#E8E0C8", floor: "#B9A27A", table: "#F5F0E6", c1: "#6B8E4E", c2: "#D9A441", c3: "#8B5E3C" },
  princesas: { bg: "#F9DDE6", floor: "#E9C6D6", table: "#FFFFFF", c1: "#E87EA1", c2: "#C9A0DC", c3: "#F5D76E" },
  boda: { bg: "#EFEDE6", floor: "#CFC6B2", table: "#FFFFFF", c1: "#DCE8D2", c2: "#9DB58A", c3: "#F3E7C9" },
  neon: { bg: "#241B3A", floor: "#3A2F55", table: "#4B3E6B", c1: "#FF4FA3", c2: "#34E1F5", c3: "#F5E642" },
  corp: { bg: "#E4E9EE", floor: "#C5CED6", table: "#FFFFFF", c1: "#1F4E79", c2: "#9BB7D4", c3: "#E0A42F" },
} satisfies Record<string, Palette>;

export type PaletteKey = keyof typeof PALETTES;

export const CITY = { slug: "valledupar", name: "Valledupar" };

export type Brand = {
  slug: string;
  name: string;
  category: string;
  rating: number | null;
  reviews: number;
  priceFrom: string;
  initial: string;
  tint: string;
  verified: boolean;
  featured?: boolean;
  isNew?: boolean;
};

export const BRANDS: Brand[] = [
  { slug: "dulce-arco-deco", name: "Dulce Arco Deco", category: "Decoración infantil", rating: 4.9, reviews: 38, priceFrom: "Desde $450.000", initial: "D", tint: "#F9D1DC", verified: true, featured: true },
  { slug: "sabor-de-estacion", name: "Sabor de Estación", category: "Catering · Estaciones de comida", rating: 4.8, reviews: 52, priceFrom: "Desde $28.000 p/p", initial: "S", tint: "#FFD7B5", verified: true, featured: true },
  { slug: "lente-caribe", name: "Lente Caribe", category: "Fotografía y video", rating: 4.9, reviews: 61, priceFrom: "Desde $900.000", initial: "L", tint: "#E3DAF5", verified: true, featured: true },
  { slug: "brinca-brinca", name: "Brinca Brinca", category: "Inflables", rating: 4.7, reviews: 24, priceFrom: "Desde $180.000", initial: "B", tint: "#CDE7F0", verified: true, featured: true },
];

export const CATEGORIES = [
  { slug: "decoracion", name: "Decoración", sub: "Infantil · Boda · 15 años", tint: "#F9D1DC" },
  { slug: "inflables", name: "Inflables", sub: "Castillos · Toboganes · Piscinas de pelotas", tint: "#CDE7F0" },
  { slug: "catering", name: "Catering", sub: "Buffet · Estaciones · Pasabocas", tint: "#FFE3A3" },
  { slug: "fotografia", name: "Fotografía", sub: "Boda · Infantil · Cabina 360", tint: "#E3DAF5" },
  { slug: "video", name: "Video", sub: "Highlights · Drone · Reels", tint: "#D5ECD4" },
  { slug: "musica", name: "Música y DJ", sub: "DJ · Vallenato en vivo · Orquesta", tint: "#FFD7B5" },
  { slug: "luces", name: "Luces y sonido", sub: "Pantallas LED · Iluminación · Tarimas", tint: "#CDE7F0" },
  { slug: "pirotecnia", name: "Pirotecnia", sub: "Chisperos fríos · Show de fuegos", tint: "#F9D1DC" },
  { slug: "pasteleria", name: "Pastelería", sub: "Tortas · Mesas de dulces", tint: "#FFE3A3" },
  { slug: "animacion", name: "Animación", sub: "Recreacionistas · Personajes · Magia", tint: "#D5ECD4" },
  { slug: "mobiliario", name: "Mobiliario", sub: "Sillas · Mesas · Carpas", tint: "#E3DAF5" },
  { slug: "locaciones", name: "Locaciones", sub: "Salones · Fincas · Kioscos", tint: "#FFD7B5" },
];

export const THEMES: { name: string; count: string; palette: PaletteKey }[] = [
  { name: "Bob Esponja", count: "86 fotos · 9 marcas", palette: "bob" },
  { name: "Safari", count: "64 fotos · 7 marcas", palette: "safari" },
  { name: "Princesas", count: "58 fotos · 8 marcas", palette: "princesas" },
  { name: "Boda rústica", count: "72 fotos · 11 marcas", palette: "boda" },
  { name: "15 años neón", count: "54 fotos · 7 marcas", palette: "neon" },
  { name: "Cierre de año", count: "33 fotos · 6 marcas", palette: "corp" },
];

export type Photo = {
  id: string;
  title: string;
  theme: string;
  eventType: string;
  credit: string;
  brandSlug: string;
  palette: PaletteKey;
};

/** Fotos del hero. Las dos variantes del A/B usan exactamente las mismas fotos. */
export const HERO_PHOTOS: Photo[] = [
  { id: "p-bob-1", title: "Bob Esponja en salón", theme: "Bob Esponja", eventType: "Cumpleaños infantil", credit: "Decoración: Dulce Arco Deco", brandSlug: "dulce-arco-deco", palette: "bob" },
  { id: "p-boda-1", title: "Boda en finca", theme: "Boda rústica", eventType: "Boda", credit: "Decoración: Raíz Eventos", brandSlug: "raiz-eventos", palette: "boda" },
  { id: "p-neon-1", title: "15 años neón", theme: "Neón", eventType: "15 años", credit: "Luces: Luxor Luces", brandSlug: "luxor-luces", palette: "neon" },
  { id: "p-safari-1", title: "Safari primer año", theme: "Safari", eventType: "Cumpleaños infantil", credit: "Decoración: Globos y Sueños", brandSlug: "globos-y-suenos", palette: "safari" },
  { id: "p-princesas-1", title: "Princesas en conjunto", theme: "Princesas", eventType: "Cumpleaños infantil", credit: "Decoración: Mundo Pop Deco", brandSlug: "mundo-pop-deco", palette: "princesas" },
  { id: "p-corp-1", title: "Cierre de año", theme: "Cierre de año", eventType: "Corporativo", credit: "Catering: Sabor de Estación", brandSlug: "sabor-de-estacion", palette: "corp" },
];

export const INSPIRATION: (Photo & { tags: string[]; ratio: string })[] = [
  { id: "i1", title: "Arco de globos amarillo y azul", theme: "Bob Esponja", eventType: "Infantil", credit: "Dulce Arco Deco", brandSlug: "dulce-arco-deco", palette: "bob", tags: ["Bob Esponja", "Infantil", "Arco de globos"], ratio: "3 / 4" },
  { id: "i2", title: "Mesa principal boda en finca", theme: "Boda rústica", eventType: "Boda", credit: "Raíz Eventos", brandSlug: "raiz-eventos", palette: "boda", tags: ["Boda", "Rústico", "Finca"], ratio: "4 / 3" },
  { id: "i3", title: "Backdrop safari con follaje", theme: "Safari", eventType: "Infantil", credit: "Globos y Sueños", brandSlug: "globos-y-suenos", palette: "safari", tags: ["Safari", "Backdrop"], ratio: "1 / 1" },
  { id: "i4", title: "Mesa de dulces rosada", theme: "Princesas", eventType: "Infantil", credit: "Dulce Arco Deco", brandSlug: "dulce-arco-deco", palette: "princesas", tags: ["Princesas", "Mesa de dulces"], ratio: "3 / 4" },
  { id: "i5", title: "Pista con luces neón", theme: "Neón", eventType: "15 años", credit: "Luxor Luces", brandSlug: "luxor-luces", palette: "neon", tags: ["15 años", "Neón", "Pantalla LED"], ratio: "4 / 5" },
  { id: "i6", title: "Estación de mazorcas y arepas", theme: "Cierre de año", eventType: "Corporativo", credit: "Sabor de Estación", brandSlug: "sabor-de-estacion", palette: "corp", tags: ["Corporativo", "Estación de comida"], ratio: "4 / 3" },
  { id: "i7", title: "Torta temática fondo de mar", theme: "Bob Esponja", eventType: "Infantil", credit: "Horno de Luz", brandSlug: "horno-de-luz", palette: "bob", tags: ["Bob Esponja", "Pastelería"], ratio: "1 / 1" },
  { id: "i8", title: "Chisperos fríos en el vals", theme: "Neón", eventType: "15 años", credit: "Destello FX", brandSlug: "destello-fx", palette: "neon", tags: ["15 años", "Chispero frío"], ratio: "3 / 4" },
];

export const TRENDING = ["Decoración Bob Esponja", "Catering para boda", "Fotógrafo 15 años", "Inflables", "Chisperos fríos", "Estaciones de comida"];

export const EVENT_TYPES = ["Cumpleaños infantil", "Boda", "15 años", "Baby shower", "Corporativo", "Grado"] as const;

/* -------------------------------------------------------------------------- */
/* Arma tu evento                                                              */
/* -------------------------------------------------------------------------- */

export type Candidate = {
  name: string;
  rating: string;
  price: string;
  tint: string;
  reasons: string[];
  isNew?: boolean;
};

export type PlanCategory = {
  id: string;
  name: string;
  budgetShare: number; // fracción del presupuesto total
  defaultQty: number;
  pool: Candidate[];
};

/** Reglas de cantidades (docs/05-arma-tu-evento.md · Cantidades configurables). */
export const PLAN_RULES = { defaultQty: 3, maxQty: 5, maxPerRequest: 20 };

const POOLS: Record<string, Omit<PlanCategory, "budgetShare" | "defaultQty">> = {
  deco: { id: "deco", name: "Decoración", pool: [
    { name: "Dulce Arco Deco", rating: "4.9 (38)", price: "Desde $450.000", tint: "#FFE3A3", reasons: ["23 fotos de {tema}", "Responde en menos de 1 hora"] },
    { name: "Globos y Sueños", rating: "4.8 (29)", price: "Desde $380.000", tint: "#CDE7F0", reasons: ["17 fotos de {tema}", "Dentro de tu presupuesto"] },
    { name: "Arcoíris Deco", rating: "Nueva", price: "Desde $320.000", tint: "#F9D1DC", isNew: true, reasons: ["Eventos en salón", "Cubre tu zona"] },
    { name: "Mundo Pop Deco", rating: "4.7 (15)", price: "Desde $300.000", tint: "#D5ECD4", reasons: ["12 fotos de {tema}"] },
    { name: "Fiesta Viva", rating: "4.6 (21)", price: "Desde $500.000", tint: "#E3DAF5", reasons: ["9 eventos parecidos"] },
  ] },
  infl: { id: "infl", name: "Inflables", pool: [
    { name: "Brinca Brinca", rating: "4.7 (24)", price: "Desde $180.000", tint: "#CDE7F0", reasons: ["Trabajó con Dulce Arco Deco", "Disponible en tu fecha"] },
    { name: "Saltarines del Valle", rating: "4.8 (33)", price: "Desde $200.000", tint: "#FFD7B5", reasons: ["Montaje en salón"] },
    { name: "InflaFest", rating: "4.5 (12)", price: "Desde $150.000", tint: "#D5ECD4", reasons: ["El de menor precio en tu zona"] },
    { name: "Castillos Mágicos", rating: "4.6 (18)", price: "Desde $220.000", tint: "#F9D1DC", reasons: ["Castillos para 6 a 10 años"] },
    { name: "Rebote Kids", rating: "4.4 (9)", price: "Desde $170.000", tint: "#E3DAF5", reasons: ["Piscina de pelotas"] },
  ] },
  cat: { id: "cat", name: "Catering", pool: [
    { name: "Sabor de Estación", rating: "4.8 (52)", price: "Desde $28.000 p/p", tint: "#FFD7B5", reasons: ["Estaciones para niños y adultos", "Responde en 2 horas"] },
    { name: "Mesa Caribe", rating: "4.7 (40)", price: "Desde $24.000 p/p", tint: "#FFE3A3", reasons: ["Menú temático"] },
    { name: "Sazón Vallenata", rating: "4.9 (27)", price: "Desde $30.000 p/p", tint: "#D5ECD4", reasons: ["Mejor calificada en catering"] },
    { name: "Cocina Abierta", rating: "4.5 (14)", price: "Desde $22.000 p/p", tint: "#CDE7F0", reasons: ["Pasabocas y bebidas"] },
    { name: "Pasabocas Gourmet", rating: "4.6 (19)", price: "Desde $18.000 p/p", tint: "#F9D1DC", reasons: ["Solo pasabocas"] },
  ] },
  torta: { id: "torta", name: "Torta y mesa de dulces", pool: [
    { name: "Horno de Luz", rating: "4.8 (44)", price: "Desde $120.000", tint: "#CDE7F0", reasons: ["Tortas temáticas de {tema}"] },
    { name: "Dulce Capricho", rating: "4.7 (31)", price: "Desde $95.000", tint: "#F9D1DC", reasons: ["Mesa de dulces completa"] },
    { name: "Azúcar Glas", rating: "4.6 (17)", price: "Desde $110.000", tint: "#FFE3A3", reasons: ["Cupcakes decorados"] },
    { name: "Tortas Mía", rating: "4.5 (11)", price: "Desde $80.000", tint: "#D5ECD4", reasons: ["Entrega en tu zona"] },
    { name: "La Repostería de Ana", rating: "4.7 (22)", price: "Desde $130.000", tint: "#E3DAF5", reasons: ["Tortas de tres pisos"] },
  ] },
  foto: { id: "foto", name: "Fotografía", pool: [
    { name: "Lente Caribe", rating: "4.9 (61)", price: "Desde $350.000", tint: "#E3DAF5", reasons: ["La más contratada en tu tipo de evento"] },
    { name: "Foco Vivo", rating: "4.8 (26)", price: "Desde $300.000", tint: "#CDE7F0", reasons: ["Entrega en 5 días"] },
    { name: "Clic Fiestas", rating: "4.6 (14)", price: "Desde $250.000", tint: "#FFE3A3", reasons: ["Incluye 20 fotos impresas"] },
    { name: "Momentos Studio", rating: "4.7 (20)", price: "Desde $380.000", tint: "#FFD7B5", reasons: ["Cabina 360 opcional"] },
    { name: "Retrato 360", rating: "4.5 (10)", price: "Desde $280.000", tint: "#D5ECD4", reasons: ["Photo booth temático"] },
  ] },
  video: { id: "video", name: "Video", pool: [
    { name: "Toma Uno", rating: "4.8 (19)", price: "Desde $400.000", tint: "#D5ECD4", reasons: ["Reel de 60 segundos"] },
    { name: "Reel Fiesta", rating: "Nueva", price: "Desde $250.000", tint: "#FFE3A3", isNew: true, reasons: ["Video vertical para redes"] },
    { name: "Cuadro Vivo", rating: "4.6 (12)", price: "Desde $450.000", tint: "#CDE7F0", reasons: ["Drone incluido"] },
    { name: "Dron Valle", rating: "4.5 (8)", price: "Desde $300.000", tint: "#F9D1DC", reasons: ["Tomas aéreas"] },
    { name: "Edita Films", rating: "4.7 (15)", price: "Desde $500.000", tint: "#E3DAF5", reasons: ["Video completo editado"] },
  ] },
  anim: { id: "anim", name: "Animación", pool: [
    { name: "Recrea Kids", rating: "4.9 (35)", price: "Desde $200.000", tint: "#FFD7B5", reasons: ["Personajes de {tema}"] },
    { name: "Show Burbujas", rating: "4.7 (16)", price: "Desde $180.000", tint: "#CDE7F0", reasons: ["Show de 45 minutos"] },
    { name: "Magia Total", rating: "4.6 (13)", price: "Desde $220.000", tint: "#E3DAF5", reasons: ["Mago y globoflexia"] },
    { name: "Payasín y Amigos", rating: "4.5 (20)", price: "Desde $150.000", tint: "#FFE3A3", reasons: ["Recreación clásica"] },
    { name: "Animarte", rating: "4.6 (9)", price: "Desde $190.000", tint: "#D5ECD4", reasons: ["Pintucaritas"] },
  ] },
  musica: { id: "musica", name: "Música y DJ", pool: [
    { name: "Nota Alta", rating: "4.9 (47)", price: "Desde $600.000", tint: "#E3DAF5", reasons: ["DJ y vallenato en vivo"] },
    { name: "Parranda Fina", rating: "4.8 (22)", price: "Desde $1.200.000", tint: "#FFD7B5", reasons: ["Conjunto vallenato"] },
    { name: "DJ Sonido Caribe", rating: "4.6 (18)", price: "Desde $450.000", tint: "#CDE7F0", reasons: ["Incluye sonido"] },
    { name: "Orquesta Brisa", rating: "4.7 (12)", price: "Desde $2.500.000", tint: "#D5ECD4", reasons: ["Orquesta de 8 músicos"] },
    { name: "Mix Eventos", rating: "Nueva", price: "Desde $400.000", tint: "#FFE3A3", isNew: true, reasons: ["Hora loca incluida"] },
  ] },
  luces: { id: "luces", name: "Luces y pantallas", pool: [
    { name: "Luxor Luces", rating: "4.8 (30)", price: "Desde $700.000", tint: "#E3DAF5", reasons: ["Pantallas LED y pista"] },
    { name: "Destello FX", rating: "4.7 (16)", price: "Desde $350.000", tint: "#FFE3A3", reasons: ["Chisperos fríos"] },
    { name: "Tarima Pro", rating: "4.5 (11)", price: "Desde $900.000", tint: "#CDE7F0", reasons: ["Tarima y sonido"] },
    { name: "Neón Party", rating: "Nueva", price: "Desde $300.000", tint: "#F9D1DC", isNew: true, reasons: ["Ambientación neón"] },
    { name: "Iluminarte", rating: "4.6 (9)", price: "Desde $500.000", tint: "#D5ECD4", reasons: ["Iluminación arquitectónica"] },
  ] },
};

/** Categorías típicas por tipo de evento, con el reparto inicial del presupuesto. */
const TEMPLATES: Record<string, [string, number, number][]> = {
  "Cumpleaños infantil": [["deco", 0.33, 3], ["infl", 0.12, 3], ["cat", 0.25, 3], ["torta", 0.1, 3], ["foto", 0.1, 3], ["video", 0.05, 2], ["anim", 0.05, 2]],
  "Baby shower": [["deco", 0.4, 3], ["cat", 0.3, 3], ["torta", 0.15, 3], ["foto", 0.15, 2]],
  Boda: [["deco", 0.25, 3], ["cat", 0.35, 3], ["foto", 0.12, 3], ["video", 0.1, 3], ["musica", 0.12, 3], ["luces", 0.06, 2]],
  "15 años": [["deco", 0.2, 3], ["luces", 0.15, 3], ["musica", 0.15, 3], ["cat", 0.3, 3], ["foto", 0.1, 3], ["video", 0.1, 2]],
  Corporativo: [["cat", 0.45, 3], ["luces", 0.2, 3], ["musica", 0.15, 2], ["deco", 0.1, 2], ["foto", 0.1, 2]],
  Grado: [["cat", 0.35, 3], ["deco", 0.2, 3], ["musica", 0.2, 3], ["foto", 0.15, 3], ["luces", 0.1, 2]],
};

export function planFor(eventType: string): PlanCategory[] {
  const template = TEMPLATES[eventType] ?? TEMPLATES["Cumpleaños infantil"];
  return template.map(([id, budgetShare, defaultQty]) => ({ ...POOLS[id], budgetShare, defaultQty }));
}

export const EXTRA_CATEGORY_IDS = Object.keys(POOLS);

export function categoryById(id: string): Omit<PlanCategory, "budgetShare" | "defaultQty"> | undefined {
  return POOLS[id];
}

export function formatCOP(value: number): string {
  return new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(value);
}
