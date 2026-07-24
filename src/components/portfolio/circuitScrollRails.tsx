import { useEffect, useState } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

const OUTER_DEPTH = 18;
const INNER_DEPTH = 34;
const ENTER_START = 240;
const ENTER_END = 320;
const EXIT_START = 680;
const EXIT_END = 760;

const SECTION_LABELS: Readonly<Record<string, string>> = {
  top: "HERO / 00",
  moments: "MOMENTS / 01",
  work: "WORK / 02",
  components: "LAB / 03",
  philosophy: "FIELD MANUAL / 04",
  wiki: "WIKI / 05",
  archive: "TOOLS / 06",
  contact: "CONTACT / 07",
};

const mapX = (side: "left" | "right", value: number) =>
  side === "left" ? value : 1000 - value;

const buildCircuitPath = (side: "left" | "right") => {
  const outer = mapX(side, OUTER_DEPTH);
  const inner = mapX(side, INNER_DEPTH);
  return `M ${outer} 0 V ${ENTER_START} L ${inner} ${ENTER_END} V ${EXIT_START} L ${outer} ${EXIT_END} V 1000`;
};

const buildMattePath = (side: "left" | "right") =>
  `${buildCircuitPath(side)} H ${side === "left" ? 0 : 1000} V 0 Z`;

const labelFor = (element: HTMLElement, index: number) => {
  if (element.dataset.circuitSection) return element.dataset.circuitSection;
  if (element.id.startsWith("philosophy-")) {
    return `FIELD NOTE / ${String(index + 1).padStart(2, "0")}`;
  }
  return (
    SECTION_LABELS[element.id] ??
    `FIELD / ${String(index + 1).padStart(2, "0")}`
  );
};

const CircuitScrollRails = () => {
  const [active, setActive] = useState({ index: 0, label: "HERO / 00" });
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 150,
    damping: 28,
    mass: 0.25,
  });

  useEffect(() => {
    let frame = 0;
    let sections: HTMLElement[] = [];

    const collect = () => {
      const candidates = Array.from(
        document.querySelectorAll<HTMLElement>(
          "[data-circuit-section], main section[id], main footer[id], main a[id^='philosophy-']"
        )
      );
      sections = candidates.filter(
        (element, index) => candidates.indexOf(element) === index
      );
    };

    const sync = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        if (!sections.length) collect();
        const focusLine = window.innerHeight * 0.46;
        let bestIndex = 0;
        let bestDistance = Number.POSITIVE_INFINITY;

        sections.forEach((section, index) => {
          const bounds = section.getBoundingClientRect();
          const distance =
            bounds.top <= focusLine && bounds.bottom >= focusLine
              ? 0
              : Math.min(
                  Math.abs(bounds.top - focusLine),
                  Math.abs(bounds.bottom - focusLine)
                );
          if (distance < bestDistance) {
            bestDistance = distance;
            bestIndex = index;
          }
        });

        const section = sections[bestIndex];
        if (!section) return;
        const next = { index: bestIndex, label: labelFor(section, bestIndex) };
        setActive((current) =>
          current.index === next.index && current.label === next.label
            ? current
            : next
        );
      });
    };

    collect();
    sync();
    window.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, []);

  const leftPath = buildCircuitPath("left");
  const rightPath = buildCircuitPath("right");

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[64] overflow-hidden text-black dark:text-white"
    >
      <svg
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
      >
        {(["left", "right"] as const).map((side) => {
          const path = side === "left" ? leftPath : rightPath;
          const mattePath = buildMattePath(side);
          return (
            <g key={side}>
              <motion.path
                d={mattePath}
                animate={{ d: mattePath }}
                transition={{
                  duration: reduceMotion ? 0 : 0.7,
                  ease: [0.22, 1, 0.36, 1],
                }}
                fill="#080807"
              />
              <motion.path
                d={path}
                animate={{ d: path }}
                transition={{
                  duration: reduceMotion ? 0 : 0.7,
                  ease: [0.22, 1, 0.36, 1],
                }}
                fill="none"
                stroke={side === "left" ? "#d8ff36" : "rgba(255,255,255,.5)"}
                strokeWidth={side === "left" ? "1.4" : "0.8"}
                vectorEffect="non-scaling-stroke"
                style={side === "left" ? { pathLength: progress } : undefined}
                className={side === "right" ? "opacity-45" : undefined}
              />

              <motion.rect
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.75, 1], rotate: [0, 90, 0] }}
                transition={{
                  duration: reduceMotion ? 0 : 2.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                x={mapX(side, INNER_DEPTH) - 2.5}
                y={(ENTER_END + EXIT_START) / 2 - 2.5}
                width="5"
                height="5"
                fill="#d8ff36"
              />
            </g>
          );
        })}
      </svg>

      <motion.div
        key={active.label}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute right-1 top-1/2 -translate-y-1/2 bg-[#d8ff36] px-1 py-2 font-kode text-[5px] uppercase tracking-[0.16em] text-black [writing-mode:vertical-rl] sm:right-2 sm:text-[6px]"
      >
        {active.label}
      </motion.div>
      <div className="absolute bottom-24 left-1 font-kode text-[5px] uppercase tracking-[0.14em] text-white/45 [writing-mode:vertical-rl] sm:bottom-28 sm:left-2">
        Signal / {String(active.index + 1).padStart(2, "0")}
      </div>
    </div>
  );
};

export default CircuitScrollRails;
