import type { HeroVariant } from "@/lib/experiments";
import { HeroMosaic } from "../hero/HeroMosaic";
import { HeroSlider } from "../hero/HeroSlider";
import { EventTray } from "./EventTray";
import {
  Banners,
  Categories,
  FeaturedBrands,
  Footer,
  HowItWorks,
  Inspiration,
  Themes,
  Trending,
} from "./HomeSections";

/** Home de Valledupar. Solo el hero cambia entre variantes del A/B. */
export function Home({ variant }: { variant: HeroVariant }) {
  return (
    <>
      {variant === "b" ? <HeroSlider /> : <HeroMosaic />}
      <main>
        <Trending />
        <Categories />
        <HowItWorks />
        <Themes />
        <Inspiration />
        <FeaturedBrands />
        <Banners />
      </main>
      <Footer />
      <EventTray />
    </>
  );
}
