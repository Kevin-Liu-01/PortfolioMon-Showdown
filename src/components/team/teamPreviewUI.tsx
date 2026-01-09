import { motion } from "framer-motion";
import { useGame } from "../../providers/gameProvider";
import { TypeBadge } from "../battle/battle";
import { AnimatedBackground, HighTechEffects, PulsingCircuit } from "./teamUI";
import Image from "next/image";

// New component for the visual effects in the center
const ClashEffects = () => (
  <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center sm:rotate-90">
    {/* Bright Lens Flare */}
    <motion.div
      className="absolute h-96 w-96 rounded-full bg-yellow-300/50"
      style={{ filter: "blur(100px)" }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: [0, 1.5, 1.2], opacity: [0, 1, 0] }}
      transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
    />
    {/* Spark Burst */}
    {[...Array(20)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute h-1 w-12 rounded-full bg-yellow-200"
        style={{
          rotate: Math.random() * 360,
          originX: 0,
        }}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{
          scaleX: [0, 1, 0],
          opacity: [0, 1, 0],
          x: (Math.random() - 0.5) * 500,
        }}
        transition={{
          duration: 0.7,
          delay: 0.8 + Math.random() * 0.3,
          ease: "easeOut",
        }}
      />
    ))}
  </div>
);

export const TeamPreviewScreen = () => {
  const { playerTeamState, cpuTeamState, startBattle, background } = useGame();

  // Variants for staggering the team card animations
  const teamContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.5,
        staggerChildren: 0.2,
      },
    },
  };

  const playerCardVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  };

  const cpuCardVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-auto bg-slate-100 text-slate-900 dark:bg-slate-900 dark:text-white">
      <AnimatedBackground />
      <HighTechEffects />
      <PulsingCircuit />
      <div className="absolute inset-0 aspect-video h-full w-full overflow-hidden rounded opacity-30">
        <Image
          src={`/images/backgrounds/background-${background}.jpg`}
          alt={`Background ${background}`}
          fill
          className="object-cover"
        />
      </div>
      <div className="relative z-20 flex h-full flex-col items-center py-6 sm:py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 drop-shadow-lg dark:text-white sm:text-5xl md:text-6xl">
            BATTLE START!
          </h1>
          <p className="mt-2 hidden text-sm text-slate-600 dark:text-slate-300 sm:block sm:text-lg">
            Your team is ready for the challenge.
          </p>
        </motion.div>
        <div className="mt-3 flex w-full max-w-[90rem] flex-col items-center justify-between sm:mt-8 sm:flex-row">
          <motion.div
            className="w-full space-y-3"
            variants={teamContainerVariants}
            initial="hidden"
            animate="visible"
          >
            <h2 className="text-center text-base font-bold text-cyan-600 dark:text-cyan-400 sm:text-2xl">
              YOUR TEAM
            </h2>
            {playerTeamState.map((p) => (
              <motion.div
                key={p.id}
                variants={playerCardVariants}
                className="w-[20rem] bg-cyan-300 p-px pr-4 shadow-lg backdrop-blur-sm transition-all hover:pr-2 dark:bg-cyan-700 sm:w-[22rem]"
                style={{
                  clipPath:
                    "polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 0 100%)",
                }}
              >
                <div
                  className="flex h-full w-full items-center gap-4 bg-slate-200/80 p-2 dark:bg-slate-800/80 sm:p-3"
                  style={{
                    clipPath:
                      "polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 0 100%)",
                  }}
                >
                  <div
                    className="relative h-10 w-14 flex-shrink-0 bg-slate-300/50 p-1 dark:bg-slate-900/50 sm:h-16 sm:w-24"
                    style={{
                      clipPath:
                        "polygon(0 10px, 10px 0, 100% 0, 100% 100%, 0 100%)",
                    }}
                  >
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <p className="truncate text-sm font-bold text-slate-800 dark:text-white sm:text-base">
                      {p.name}
                    </p>
                    <div className="mt-1 flex gap-1">
                      <TypeBadge type={p.type1} size="xs" />
                      {p.type2 && <TypeBadge type={p.type2} size="xs" />}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="relative z-20 m-4 sm:m-12">
            <ClashEffects />
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1, transition: { delay: 0.6 } }}
              className="relative z-10 font-kode text-3xl font-black text-slate-400 dark:text-white sm:text-6xl"
            >
              VS
            </motion.div>
          </div>

          <motion.div
            className="w-full space-y-3"
            variants={teamContainerVariants}
            initial="hidden"
            animate="visible"
          >
            <h2 className="text-center  text-base font-bold text-red-500 sm:text-2xl">
              CPU TEAM
            </h2>
            {cpuTeamState.map((p) => (
              <motion.div
                key={p.id}
                variants={cpuCardVariants}
                className="w-[20rem] bg-red-300 p-px pl-4 text-right shadow-lg backdrop-blur-sm transition-all hover:pl-2 dark:bg-red-500 sm:w-[22rem]"
                style={{
                  clipPath:
                    "polygon(16px 0, 100% 0, 100% 100%, 0 100%, 0 16px)",
                }}
              >
                <div
                  className="flex h-full w-full items-center justify-end gap-4 bg-slate-200/80 p-2 dark:bg-slate-800/80 sm:p-3"
                  style={{
                    clipPath:
                      "polygon(16px 0, 100% 0, 100% 100%, 0 100%, 0 16px)",
                  }}
                >
                  <div>
                    <p className="truncate text-sm font-bold text-slate-800 dark:text-white sm:text-base">
                      {p.name}
                    </p>
                    <div className="mt-1 flex justify-end gap-1">
                      <TypeBadge type={p.type1} size="xs" />
                      {p.type2 && <TypeBadge type={p.type2} size="xs" />}
                    </div>
                  </div>
                  <div
                    className="relative h-10 w-14 flex-shrink-0 bg-slate-300/50 p-1 dark:bg-slate-900/50 sm:h-16 sm:w-24"
                    style={{
                      clipPath:
                        "polygon(0 0, 100% 0, 100% 10px, calc(100% - 10px) 100%, 0 100%)",
                    }}
                  >
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
        <motion.button
          initial={{ scale: 0, y: 50 }}
          animate={{
            scale: 1,
            y: 0,
            transition: {
              type: "spring",
              stiffness: 200,
              damping: 15,
              delay: 1.2,
            },
          }}
          whileHover={{
            scale: 1.05,
            boxShadow: "0px 0px 25px rgba(45, 212, 191, 0.7)",
          }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
          onClick={startBattle}
          className="relative mt-10 bg-green-500 px-10 py-4 text-2xl font-bold text-white shadow-lg"
          style={{
            clipPath:
              "polygon(15% 0%, 85% 0%, 100% 50%, 85% 100%, 15% 100%, 0% 50%)",
          }}
        >
          FIGHT!
        </motion.button>
      </div>
    </div>
  );
};
