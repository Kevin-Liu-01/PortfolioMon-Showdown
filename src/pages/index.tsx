import Head from "next/head";
import { type NextPage } from "next";
import { useState } from "react";
import GameScreenManager from "../components/game/gameScreenManager";
import Navbar from "../components/navbar";

const FONT_CLASSES = [
  "font-orbiter",
  "font-nacelle",
  "font-radio",
  "font-pangram",
  "font-telegraf",
  "font-mori",
  "font-kode",
];

const Home: NextPage = () => {
  const [, setTranslate] = useState(false);
  const [font, setFont] = useState(FONT_CLASSES[0]);

  const cycleFont = () => {
    setFont((currentFont) => {
      const currentIndex = FONT_CLASSES.indexOf(currentFont);
      return FONT_CLASSES[(currentIndex + 1) % FONT_CLASSES.length]!;
    });
  };

  return (
    <>
      <Head>
        <title>PortfolioMon Showdown — Kevin Liu</title>
        <meta
          name="description"
          content="Kevin Liu's original Pokémon-inspired interactive portfolio: build a team from his projects and battle through PortfolioMon Showdown."
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />
        <meta name="theme-color" content="#0f172a" />
      </Head>

      <main className={`relative h-screen overflow-hidden bg-slate-100 dark:bg-slate-900 ${font}`}>
        <div className="relative z-20">
          <Navbar
            menuHandler={() => setTranslate((current) => !current)}
            fontInitializer={cycleFont}
          />
        </div>

        <div className="relative z-10 h-[calc(100vh-4.8rem)] w-full">
          <GameScreenManager />
        </div>
      </main>
    </>
  );
};

export default Home;
