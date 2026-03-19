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
  const [font, setFont] = useState(FONT_CLASSES[0]);

  const fontInitializer = () => {
    setFont((currentFont) => {
      const currentIndex = FONT_CLASSES.indexOf(currentFont);
      const nextIndex = (currentIndex + 1) % FONT_CLASSES.length;
      return FONT_CLASSES[nextIndex];
    });
  };

  return (
    <div>
      <Head>
        <title>Kevin Liu | Software Developer &amp; AI Engineer — Princeton CS &apos;28 | PortfolioMon Showdown | @kevskgs</title>
        <meta name="description" content="Kevin Liu (@kevskgs) is a Princeton University CS student (Class of 2028), full-stack developer, and AI engineer who has worked at Amazon, Bloomberg, AT&T Labs, and Y Combinator-backed startups. He has built 30+ projects across AI, web, games, and health-tech. Explore his interactive developer portfolio — a Pokémon Showdown-inspired battle game called PortfolioMon Showdown at kevinliu.biz." />
        <meta name="theme-color" content="#0f172a" />
      </Head>
      <main
        className={`relative h-screen overflow-hidden bg-slate-100 dark:bg-slate-900 ${font}`}
        style={{
          fontFamily:
            font === "font-orbiter" ? "'Orbiter', sans-serif" : undefined,
        }}
      >
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
