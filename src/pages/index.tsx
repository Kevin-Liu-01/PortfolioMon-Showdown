import Head from "next/head";
import { type NextPage } from "next";
import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "../components/navbar";
import GameScreenManager from "../components/game/gameScreenManager";
import ProjectIndexLanding from "../components/landing/projectIndexLanding";

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
  const [translate, setTranslate] = useState(false);
  const [font, setFont] = useState<string>(FONT_CLASSES[1] ?? "font-nacelle");
  const [hasEntered, setHasEntered] = useState(false);

  const enterWorld = useCallback(() => setHasEntered(true), []);
  const exitWorld = useCallback(() => setHasEntered(false), []);

  const fontInitializer = () => {
    setFont((currentFont) => {
      const currentIndex = FONT_CLASSES.indexOf(currentFont);
      const nextIndex = (currentIndex + 1) % FONT_CLASSES.length;
      return FONT_CLASSES[nextIndex] ?? FONT_CLASSES[0] ?? "font-nacelle";
    });
  };

  return (
    <div>
      <Head>
        <title>
          Kevin Liu — Engineer, Designer &amp; Builder | Princeton CS &apos;28
        </title>
        <meta
          name="description"
          content="Kevin Liu is a founding engineer at Dedalus and a Princeton CS student building agent infrastructure, expressive interfaces, and browser games. Explore selected work and play PortfolioMon, his archived Pokémon-inspired portfolio battle game."
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />
        <meta name="theme-color" content="#0a0a0a" />
      </Head>
      <AnimatePresence mode="wait">
        {!hasEntered ? (
          <ProjectIndexLanding key="project-index" onEnter={enterWorld} />
        ) : (
          <motion.main
            key="playground"
            initial={{
              opacity: 0,
              scale: 1.025,
              filter: "saturate(1.4) blur(8px)",
            }}
            animate={{ opacity: 1, scale: 1, filter: "saturate(1) blur(0px)" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className={`relative h-screen overflow-hidden bg-slate-100 dark:bg-slate-900 ${font}`}
          >
            <div className="relative z-20">
              <Navbar
                menuHandler={() => setTranslate(!translate)}
                fontInitializer={fontInitializer}
              />
            </div>

            <button
              type="button"
              onClick={exitWorld}
              className="absolute left-3 top-[5.2rem] z-[100] border border-white/40 bg-black/80 px-3 py-2 font-kode text-[8px] uppercase tracking-[0.16em] text-white backdrop-blur-md transition hover:border-white hover:bg-white hover:text-black"
              style={{
                clipPath:
                  "polygon(7px 0, 100% 0, 100% calc(100% - 7px), calc(100% - 7px) 100%, 0 100%, 0 7px)",
              }}
            >
              ← Exit to portfolio
            </button>

            <div className="relative z-10 h-[calc(100vh-4.8rem)] w-full">
              <GameScreenManager />
            </div>
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;
