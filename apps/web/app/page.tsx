import { Home } from "@/components/home/Home";

/**
 * "/" normalmente lo reescribe proxy.ts hacia /h/a o /h/b según la variante asignada.
 * Esta página es el respaldo (variante A) si el proxy no corre.
 */
export default function Page() {
  return <Home variant="a" />;
}
