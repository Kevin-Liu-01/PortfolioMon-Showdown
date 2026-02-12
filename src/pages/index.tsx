import Head from "next/head";
import { type NextPage } from "next";
import { useState } from "react";
import Navbar from "../components/navbar";
import GameScreenManager from "../components/game/gameScreenManager";

const FONT_CLASSES = [
  "font-orbiter",
  "font-general",
  "font-clash",
  "font-satoshi",
  "font-kode",
  "font-play",
  "font-racing",
];

const Home: NextPage = () => {
  const [translate, setTranslate] = useState(false);
  // --- PAGE LAYOUT STATE ---
  // const [pattern, setPattern] = useState("cross");
  const [font, setFont] = useState(FONT_CLASSES[0]); // Start with the first font
  console.log(font);
  // --- PAGE LAYOUT HANDLERS ---
  // const patternBG = () =>
  //   setPattern((p) =>
  //     p === "cross" ? "dots" : p === "dots" ? "paper" : "cross"
  //   );
  const fontInitializer = () => {
    setFont((currentFont) => {
      const currentIndex = FONT_CLASSES.indexOf(currentFont);
      // Calculate the next index, wrapping around to the beginning if needed
      const nextIndex = (currentIndex + 1) % FONT_CLASSES.length;
      return FONT_CLASSES[nextIndex];
    });
  };
  // const patternStyles = () =>
  //   `absolute inset-0 z-0 h-full w-full pattern-gray-500/10 pattern-bg-transparent pattern-size-6 transition-opacity duration-300 ${
  //     pattern === "cross"
  //       ? "pattern-cross"
  //       : pattern === "dots"
  //       ? "pattern-dots"
  //       : "pattern-paper"
  //   }`;

  return (
    <div>
      <Head>
        <title>Kevin Liu | PortfolioMon Showdown – Battle Through 29+ Projects</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="description" content="Interactive developer portfolio by Kevin Liu (Princeton '28). Explore 29+ projects—AI agents, hackathon winners, games—brought to life as battle-ready PortfolioMons in this Pokémon Showdown-inspired experience." />
        <meta name="theme-color" content="#0f172a" />
      </Head>
      <main
        className={`relative h-screen overflow-hidden bg-slate-100 dark:bg-slate-900 ${font}`}
        style={{
          // This style logic for special fonts remains the same
          fontFamily:
            font === "font-orbiter" ? "'Orbiter', sans-serif" : undefined,
        }}
      >
        {/* <div className={patternStyles()} /> */}
        <div className="relative z-20">
          <Navbar
            menuHandler={() => setTranslate(!translate)}
            fontInitializer={fontInitializer}
          />
        </div>

        <div className="relative z-10 h-[calc(100vh-4.8rem)] w-full">
          <GameScreenManager />
        </div>
      </main>
    </div>
  );
};

export default Home;
