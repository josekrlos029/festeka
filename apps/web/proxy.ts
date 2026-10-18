import { NextResponse, type NextRequest } from "next/server";
import {
  BOT_UA,
  HERO_COOKIE,
  HERO_COOKIE_MAX_AGE,
  VISITOR_COOKIE,
  VISITOR_COOKIE_MAX_AGE,
  experimentConfig,
  isHeroVariant,
  type HeroVariant,
} from "./lib/experiments";

/**
 * Asignación del A/B del hero en el servidor (sin parpadeo).
 * - 50/50 por visitante, fija con cookie durante todo el experimento.
 * - Bots: siempre A, sin cookies.
 * - QA: "/?hero=b" fuerza la variante y la guarda en la cookie.
 */
export function proxy(request: NextRequest) {
  const { active, forced } = experimentConfig();
  const ua = request.headers.get("user-agent") ?? "";
  const isBot = BOT_UA.test(ua);

  const queryVariant = request.nextUrl.searchParams.get("hero");
  const cookieVariant = request.cookies.get(HERO_COOKIE)?.value;

  let variant: HeroVariant;
  if (!active || isBot) variant = "a";
  else if (forced) variant = forced;
  else if (isHeroVariant(queryVariant)) variant = queryVariant;
  else if (isHeroVariant(cookieVariant)) variant = cookieVariant;
  else variant = Math.random() < 0.5 ? "a" : "b";

  const url = request.nextUrl.clone();
  url.pathname = `/h/${variant}`;
  url.searchParams.delete("hero");
  const response = NextResponse.rewrite(url);

  if (!isBot && active) {
    const secure = request.nextUrl.protocol === "https:";
    if (cookieVariant !== variant) {
      response.cookies.set(HERO_COOKIE, variant, { maxAge: HERO_COOKIE_MAX_AGE, path: "/", sameSite: "lax", secure });
    }
    if (!request.cookies.get(VISITOR_COOKIE)) {
      response.cookies.set(VISITOR_COOKIE, crypto.randomUUID(), {
        maxAge: VISITOR_COOKIE_MAX_AGE,
        path: "/",
        sameSite: "lax",
        secure,
      });
    }
  }
  return response;
}

export const config = {
  matcher: ["/"],
};
