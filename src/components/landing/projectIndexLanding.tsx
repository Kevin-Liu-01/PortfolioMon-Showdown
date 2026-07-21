import Image from "next/image";
import Link from "next/link";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent,
} from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  CircleDot,
  Github,
  Linkedin,
  Play,
} from "lucide-react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { SOCIAL_LINKS } from "../../constants/site";

type FeaturedProject = {
  readonly id: number;
  readonly name: string;
  readonly image: string;
  readonly url: string;
  readonly summary: string;
  readonly detail: string;
  readonly types: readonly [string, string];
  readonly year: string;
  readonly internal?: boolean;
};

const FEATURED_PROJECTS = [
  {
    id: 0,
    name: "Reticle",
    image: "/images/reticle.png",
    url: "https://reticle-demo.vercel.app/",
    summary: "Persistent computers for agents.",
    detail:
      "Sub-second machines, durable runtime, and a motion-rich control surface.",
    types: ["Infrastructure", "Interface"],
    year: "2026",
  },
  {
    id: 1,
    name: "Ariadne",
    image: "/images/ariadne.png",
    url: "https://ariadne.dedaluslabs.ai/",
    summary: "A phone-first agent for runway night.",
    detail:
      "An AI companion built around immediacy, place, and a little drama.",
    types: ["Agents", "Product"],
    year: "2026",
  },
  {
    id: 2,
    name: "Sandbox Arena",
    image: "/images/sandbox-arena.png",
    url: "https://sandboxarena.vercel.app/",
    summary: "Cloud sandboxes, put under pressure.",
    detail:
      "A live benchmark where infrastructure providers race head to head.",
    types: ["Data", "Experiment"],
    year: "2026",
  },
  {
    id: 5,
    name: "Agent Machines",
    image: "/images/agentmachines.png",
    url: "https://www.agent-machines.dev/",
    summary: "A switchboard for persistent workers.",
    detail:
      "Provision and inspect always-on agents across multiple substrates.",
    types: ["Agents", "Systems"],
    year: "2026",
  },
  {
    id: 7,
    name: "Sigil UI",
    image: "/images/sigil-ui.png",
    url: "https://sigil-ui-web.vercel.app/",
    summary: "An agent-first design system.",
    detail:
      "A broad component language built for software that thinks and acts.",
    types: ["Design system", "Web"],
    year: "2025",
  },
  {
    id: 13,
    name: "PortfolioMon",
    image: "/images/kevinportfolio.png",
    url: "#portfoliomon",
    summary: "My old portfolio, preserved as a game.",
    detail:
      "Forty real projects become a team-building, turn-based battle system.",
    types: ["Game", "Archive"],
    year: "2025—26",
    internal: true,
  },
] as const satisfies readonly FeaturedProject[];

const ARCHIVE_PROJECTS = [
  ["Kevin's Wiki", "A personal knowledge base", "https://wiki.kevinliu.biz/"],
  [
    "Aryan 21",
    "A birthday world for a friend",
    "https://aryan-birthday.vercel.app/",
  ],
  ["Princeton TD", "Tower defense in the browser", "https://ptd.quest/"],
  [
    "Loop",
    "An operator desk for agent skills",
    "https://loop-homepage.vercel.app/",
  ],
] as const;

const BAYER_4 = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
] as const;

const CHOPPED =
  "polygon(0 18px, 18px 0, calc(100% - 44px) 0, calc(100% - 32px) 12px, 100% 12px, 100% calc(100% - 18px), calc(100% - 18px) 100%, 32px 100%, 20px calc(100% - 12px), 0 calc(100% - 12px))";

const DitherMedia = ({
  src,
  alt,
  priority = false,
  className = "",
}: {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let disposed = false;
    const image = new window.Image();

    const paint = () => {
      if (disposed || !image.naturalWidth || !image.naturalHeight) return;
      const bounds = canvas.getBoundingClientRect();
      if (!bounds.width || !bounds.height) return;

      const pixelSize = bounds.width < 520 ? 2.6 : 3.2;
      const width = Math.max(1, Math.ceil(bounds.width / pixelSize));
      const height = Math.max(1, Math.ceil(bounds.height / pixelSize));
      canvas.width = width;
      canvas.height = height;

      const context = canvas.getContext("2d", { willReadFrequently: true });
      if (!context) return;
      context.imageSmoothingEnabled = true;

      const sourceRatio = image.naturalWidth / image.naturalHeight;
      const targetRatio = width / height;
      let sourceWidth = image.naturalWidth;
      let sourceHeight = image.naturalHeight;
      let sourceX = 0;
      let sourceY = 0;

      if (sourceRatio > targetRatio) {
        sourceWidth = image.naturalHeight * targetRatio;
        sourceX = (image.naturalWidth - sourceWidth) / 2;
      } else {
        sourceHeight = image.naturalWidth / targetRatio;
        sourceY = (image.naturalHeight - sourceHeight) / 2;
      }

      context.drawImage(
        image,
        sourceX,
        sourceY,
        sourceWidth,
        sourceHeight,
        0,
        0,
        width,
        height
      );

      const pixels = context.getImageData(0, 0, width, height);
      for (let y = 0; y < height; y += 1) {
        for (let x = 0; x < width; x += 1) {
          const offset = (y * width + x) * 4;
          const red = pixels.data[offset] ?? 0;
          const green = pixels.data[offset + 1] ?? 0;
          const blue = pixels.data[offset + 2] ?? 0;
          const luminance = red * 0.299 + green * 0.587 + blue * 0.114;
          const threshold = (((BAYER_4[y % 4]?.[x % 4] ?? 0) + 0.5) / 16) * 255;
          const value = luminance > threshold ? 244 : 12;
          pixels.data[offset] = value;
          pixels.data[offset + 1] = value;
          pixels.data[offset + 2] = value;
          pixels.data[offset + 3] = 255;
        }
      }
      context.putImageData(pixels, 0, 0);
    };

    image.onload = paint;
    image.src = src;
    const observer = new ResizeObserver(paint);
    observer.observe(canvas);
    return () => {
      disposed = true;
      observer.disconnect();
    };
  }, [src]);

  return (
    <div
      className={`group overflow-hidden bg-[#111] ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="(min-width: 1024px) 55vw, 100vw"
        className="object-cover opacity-0 saturate-[1.15] transition duration-700 ease-out group-hover:scale-[1.025] group-hover:opacity-100"
      />
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 h-full w-full transition duration-500 [image-rendering:pixelated] group-hover:scale-[1.015] group-hover:opacity-0"
      />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(105deg,transparent_35%,rgba(255,255,255,.18)_50%,transparent_65%)] opacity-0 transition duration-500 group-hover:translate-x-1/3 group-hover:opacity-100" />
    </div>
  );
};

const BallGlyph = ({ inverted = false }: { inverted?: boolean }) => (
  <span
    aria-hidden="true"
    className={`relative block h-8 w-8 overflow-hidden rounded-full border ${
      inverted
        ? "border-white bg-black text-white"
        : "border-black bg-white text-black"
    }`}
  >
    <span className="absolute inset-x-0 bottom-0 h-1/2 bg-current" />
    <span
      className={`absolute left-0 top-1/2 h-px w-full -translate-y-1/2 ${
        inverted ? "bg-white" : "bg-black"
      }`}
    />
    <span
      className={`absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border ${
        inverted ? "border-white bg-black" : "border-black bg-white"
      }`}
    />
  </span>
);

const ProjectCard = ({
  project,
  index,
  onEnter,
}: {
  project: FeaturedProject;
  index: number;
  onEnter: () => void;
}) => {
  const card = (
    <motion.article
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-90px" }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="group relative bg-black p-px"
      style={{ clipPath: CHOPPED }}
    >
      <div
        className="relative h-full bg-[#f4f3ec]"
        style={{ clipPath: CHOPPED }}
      >
        <div className="grid min-h-[440px] grid-cols-1 lg:grid-cols-12">
          <div
            className={`relative min-h-[280px] overflow-hidden border-black/20 lg:min-h-[440px] ${
              index % 2 === 0
                ? "border-b lg:col-span-7 lg:border-b-0 lg:border-r"
                : "border-b lg:order-2 lg:col-span-7 lg:border-b-0 lg:border-l"
            }`}
          >
            <DitherMedia
              src={project.image}
              alt={`${project.name} project preview`}
              className="absolute inset-0"
            />
            <div className="absolute left-4 top-4 flex items-center gap-2 font-kode text-[9px] uppercase tracking-[0.16em]">
              <span className="bg-white px-2 py-1 text-black">
                PKMN–{String(project.id).padStart(3, "0")}
              </span>
              <span className="bg-black px-2 py-1 text-white">
                {project.year}
              </span>
            </div>
            <div className="absolute bottom-4 right-4 bg-white p-2 text-black transition duration-300 group-hover:rotate-45">
              <ArrowUpRight className="h-4 w-4" />
            </div>
          </div>

          <div
            className={`flex flex-col justify-between p-6 sm:p-8 lg:col-span-5 lg:p-10 ${
              index % 2 === 0 ? "" : "lg:order-1"
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <span className="font-kode text-[9px] uppercase tracking-[0.2em] text-black/45">
                Field note / {String(index + 1).padStart(2, "0")}
              </span>
              {project.internal && <BallGlyph />}
            </div>
            <div className="my-12 lg:my-0">
              <h3 className="font-telegraf text-4xl font-black tracking-[-0.06em] sm:text-5xl">
                {project.name}
              </h3>
              <p className="mt-4 max-w-md font-nacelle text-xl font-medium leading-tight">
                {project.summary}
              </p>
              <p className="mt-4 max-w-sm font-nacelle text-sm leading-relaxed text-black/55 sm:text-base">
                {project.detail}
              </p>
            </div>
            <div className="flex items-end justify-between gap-4 border-t border-black pt-4">
              <div className="flex flex-wrap gap-2">
                {project.types.map((type) => (
                  <span
                    key={type}
                    className="border border-black/25 px-2 py-1 font-kode text-[8px] uppercase tracking-[0.14em]"
                  >
                    {type}
                  </span>
                ))}
              </div>
              <span className="font-kode text-[9px] uppercase tracking-[0.16em]">
                {project.internal ? "Play" : "Open"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );

  if (project.internal) {
    return (
      <button
        type="button"
        onClick={onEnter}
        className="block w-full text-left"
      >
        {card}
      </button>
    );
  }

  return (
    <Link href={project.url} target="_blank" rel="noopener noreferrer">
      {card}
    </Link>
  );
};

const ProjectIndexLanding = ({ onEnter }: { onEnter: () => void }) => {
  const [isLaunching, setIsLaunching] = useState(false);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 130,
    damping: 28,
    mass: 0.3,
  });

  const launch = useCallback(() => {
    if (!isLaunching) setIsLaunching(true);
  }, [isLaunching]);

  useEffect(() => {
    if (!isLaunching) return;
    const timer = window.setTimeout(onEnter, reduceMotion ? 120 : 1100);
    return () => window.clearTimeout(timer);
  }, [isLaunching, onEnter, reduceMotion]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === "b") launch();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [launch]);

  const followPointer = (event: MouseEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty(
      "--spot-x",
      `${event.clientX - bounds.left}px`
    );
    event.currentTarget.style.setProperty(
      "--spot-y",
      `${event.clientY - bounds.top}px`
    );
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "contrast(1.8) grayscale(1)" }}
      transition={{ duration: reduceMotion ? 0.1 : 0.45 }}
      className="bw-portfolio min-h-screen overflow-hidden bg-[#f4f3ec] text-[#0b0b0b]"
    >
      <motion.div
        className="fixed inset-x-0 top-0 z-[70] h-[3px] origin-left bg-black"
        style={{ scaleX: progress }}
      />

      <header className="sticky top-0 z-50 border-b border-black bg-[#f4f3ec]/95 backdrop-blur-md">
        <div className="mx-auto flex h-[72px] max-w-[1600px] items-center justify-between px-5 sm:px-8 lg:px-12">
          <Link href="#top" className="flex items-center gap-3">
            <span
              className="flex h-9 w-9 items-center justify-center bg-black font-kode text-[9px] text-white"
              style={{
                clipPath:
                  "polygon(0 8px, 8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%)",
              }}
            >
              KBL
            </span>
            <span>
              <span className="block font-telegraf text-sm font-black uppercase leading-none">
                Kevin Liu
              </span>
              <span className="mt-1 hidden font-kode text-[7px] uppercase tracking-[0.2em] text-black/45 sm:block">
                Engineer / designer / trainer
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-8 font-kode text-[9px] uppercase tracking-[0.18em] md:flex">
            <Link href="#work" className="hover:line-through">
              Work
            </Link>
            <Link href="#archive" className="hover:line-through">
              Archive
            </Link>
            <Link href="#contact" className="hover:line-through">
              Contact
            </Link>
          </nav>

          <button
            type="button"
            onClick={launch}
            className="group flex items-center gap-3 bg-black py-2 pl-4 pr-2 font-kode text-[8px] uppercase tracking-[0.15em] text-white hover:bg-[#333] sm:text-[9px]"
            style={{
              clipPath:
                "polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)",
            }}
          >
            Play PortfolioMon
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-black transition group-hover:rotate-180">
              <Play className="h-3 w-3 fill-current" />
            </span>
          </button>
        </div>
      </header>

      <section
        id="top"
        onMouseMove={followPointer}
        className="spotlight-field relative mx-auto grid min-h-[calc(100svh-72px)] max-w-[1600px] grid-cols-1 border-x border-black/20 lg:grid-cols-12"
      >
        <div className="relative z-10 flex flex-col justify-between border-b border-black p-5 sm:p-8 lg:col-span-7 lg:border-b-0 lg:border-r lg:p-12">
          <div className="flex items-center justify-between gap-4 font-kode text-[8px] uppercase tracking-[0.2em] text-black/50 sm:text-[9px]">
            <span>Trainer file / No. 028</span>
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 animate-pulse rounded-full bg-black" />
              Building now
            </span>
          </div>

          <div className="py-16 sm:py-24 lg:py-16">
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
              className="mb-6 font-kode text-[9px] uppercase tracking-[0.22em]"
            >
              Software with utility / interfaces with bite
            </motion.p>
            <h1 className="font-telegraf text-[clamp(4.3rem,9vw,9.8rem)] font-black leading-[0.76] tracking-[-0.085em]">
              I build
              <br />
              <span className="font-normal italic">useful</span>
              <br />
              worlds.
            </h1>
          </div>

          <div className="grid gap-6 border-t border-black pt-5 sm:grid-cols-2">
            <p className="max-w-md font-nacelle text-base font-medium leading-snug sm:text-lg">
              Founding engineer at Dedalus. I make agents, interfaces, and games
              feel inevitable.
            </p>
            <Link
              href="#work"
              className="group flex items-end justify-between font-kode text-[9px] uppercase tracking-[0.18em]"
            >
              Scan selected work
              <ArrowDown className="h-5 w-5 transition group-hover:translate-y-1" />
            </Link>
          </div>
        </div>

        <div className="relative min-h-[580px] overflow-hidden bg-black p-3 sm:p-5 lg:col-span-5 lg:min-h-0">
          <div
            className="relative h-full min-h-[550px] overflow-hidden bg-white"
            style={{ clipPath: CHOPPED }}
          >
            <DitherMedia
              src="/images/kevin_powerlifting_color.png"
              alt="Kevin Liu"
              priority
              className="absolute inset-0"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

            <motion.div
              className="pointer-events-none absolute left-1/2 top-1/2 h-[58%] w-[58%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/50"
              animate={{ rotate: 360 }}
              transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
            >
              {[0, 1, 2, 3].map((item) => (
                <span
                  key={item}
                  className="absolute left-1/2 top-1/2 h-1.5 w-1.5 rounded-full bg-white"
                  style={{
                    transform: `rotate(${item * 90}deg) translateY(-${
                      item % 2 === 0 ? 114 : 96
                    }px)`,
                    transformOrigin: "0 0",
                  }}
                />
              ))}
            </motion.div>

            <div className="absolute left-5 top-5 flex gap-2 font-kode text-[8px] uppercase tracking-[0.18em]">
              <span className="bg-white px-2 py-1 text-black">FIGHT / 01</span>
              <span className="bg-black px-2 py-1 text-white">BW MODE</span>
            </div>

            <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-7">
              <div className="mb-4 flex items-center justify-between border-b border-white/45 pb-3 font-kode text-[8px] uppercase tracking-[0.18em]">
                <span>Kevin Bowen Liu</span>
                <span>Princeton ’28</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                {[
                  ["40+", "Projects"],
                  ["06", "Disciplines"],
                  ["∞", "Curiosity"],
                ].map(([value, label]) => (
                  <div key={label} className="border border-white/35 p-3">
                    <span className="block font-telegraf text-2xl font-black">
                      {value}
                    </span>
                    <span className="font-kode text-[7px] uppercase tracking-[0.16em] text-white/60">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-0 opacity-[0.045] [background-image:linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] [background-size:56px_56px]" />
      </section>

      <div className="overflow-hidden border-y border-black bg-black py-3 text-white">
        <motion.div
          className="flex w-max items-center gap-8 font-kode text-[9px] uppercase tracking-[0.22em]"
          animate={{ x: [0, -720] }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        >
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="flex items-center gap-8">
              <span>Agents that act</span>
              <CircleDot className="h-3 w-3" />
              <span>Interfaces that move</span>
              <CircleDot className="h-3 w-3" />
              <span>Games that explain</span>
              <CircleDot className="h-3 w-3" />
            </div>
          ))}
        </motion.div>
      </div>

      <section
        id="work"
        className="mx-auto max-w-[1600px] scroll-mt-20 border-x border-black/20 px-5 py-20 sm:px-8 sm:py-28 lg:px-12"
      >
        <div className="mb-14 grid items-end gap-8 border-b border-black pb-6 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <p className="font-kode text-[9px] uppercase tracking-[0.2em] text-black/45">
              Field research / 06 selected
            </p>
            <h2 className="mt-3 font-telegraf text-5xl font-black tracking-[-0.07em] sm:text-7xl lg:text-8xl">
              Built in the wild.
            </h2>
          </div>
          <p className="max-w-md font-nacelle text-base leading-relaxed text-black/60 lg:col-span-4">
            Each image is rendered through an ordered-dither canvas. Hover to
            break the monochrome and inspect the real thing.
          </p>
        </div>

        <div className="space-y-7 sm:space-y-10">
          {FEATURED_PROJECTS.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onEnter={launch}
            />
          ))}
        </div>
      </section>

      <section
        id="portfoliomon"
        className="relative overflow-hidden border-y border-black bg-black text-white"
      >
        <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:radial-gradient(#fff_1px,transparent_1px)] [background-size:5px_5px]" />
        <div className="relative mx-auto grid max-w-[1600px] gap-10 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-12 lg:px-12">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 font-kode text-[9px] uppercase tracking-[0.2em] text-white/55">
              <BallGlyph inverted />
              Legacy artifact / Remastered
            </div>
            <h2 className="mt-10 font-telegraf text-[clamp(3.8rem,7vw,7.8rem)] font-black leading-[0.82] tracking-[-0.075em]">
              The old
              <br />
              portfolio
              <br />
              <span className="font-normal italic">still fights.</span>
            </h2>
            <p className="mt-8 max-w-md font-nacelle text-lg leading-relaxed text-white/65">
              PortfolioMon is no longer the website. It is one playable project—
              upgraded with forty builds, custom frames, status systems, and a
              full turn-based battle engine.
            </p>
          </div>

          <div className="flex flex-col justify-end lg:col-span-7">
            <div
              className="relative bg-white p-px"
              style={{ clipPath: CHOPPED }}
            >
              <DitherMedia
                src="/images/kevinportfolio.png"
                alt="PortfolioMon battle interface"
                className="relative aspect-[16/9]"
              />
              <div className="absolute left-4 top-4 bg-black px-3 py-2 font-kode text-[8px] uppercase tracking-[0.18em] text-white">
                Playable build / v2.6
              </div>
            </div>

            <button
              type="button"
              onClick={launch}
              disabled={isLaunching}
              className="group mt-4 flex w-full items-center justify-between bg-white px-5 py-5 text-left text-black transition hover:bg-[#d8ff36] disabled:cursor-wait sm:px-7 sm:py-6"
              style={{ clipPath: CHOPPED }}
            >
              <span>
                <span className="block font-kode text-[8px] uppercase tracking-[0.2em] text-black/50">
                  Press B anytime
                </span>
                <span className="mt-1 block font-telegraf text-2xl font-black tracking-[-0.04em] sm:text-4xl">
                  {isLaunching ? "Loading your team..." : "Enter PortfolioMon"}
                </span>
              </span>
              <ArrowRight className="h-7 w-7 transition group-hover:translate-x-2" />
            </button>
          </div>
        </div>
      </section>

      <section
        id="archive"
        className="mx-auto max-w-[1600px] scroll-mt-20 border-x border-black/20 px-5 py-20 sm:px-8 sm:py-28 lg:px-12"
      >
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="font-kode text-[9px] uppercase tracking-[0.2em] text-black/45">
              PC storage / More experiments
            </p>
            <h2 className="mt-3 font-telegraf text-5xl font-black tracking-[-0.06em] sm:text-6xl">
              The archive.
            </h2>
          </div>
          <div className="border-t border-black lg:col-span-8">
            {ARCHIVE_PROJECTS.map(([name, description, url], index) => (
              <Link
                key={name}
                href={url}
                target="_blank"
                className="group grid grid-cols-[36px_1fr_auto] items-center gap-4 border-b border-black py-5 sm:grid-cols-[54px_1fr_1fr_auto]"
              >
                <span className="font-kode text-[8px] text-black/40">
                  {String(index + 7).padStart(2, "0")}
                </span>
                <span className="font-telegraf text-xl font-bold tracking-[-0.03em] sm:text-2xl">
                  {name}
                </span>
                <span className="hidden font-nacelle text-sm text-black/50 sm:block">
                  {description}
                </span>
                <ArrowUpRight className="h-5 w-5 transition group-hover:rotate-45" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <footer id="contact" className="border-t border-black bg-[#d8ff36]">
        <div className="mx-auto max-w-[1600px] px-5 py-14 sm:px-8 sm:py-20 lg:px-12">
          <p className="font-kode text-[9px] uppercase tracking-[0.2em] text-black/55">
            New encounter available
          </p>
          <div className="mt-4 flex flex-col justify-between gap-10 sm:flex-row sm:items-end">
            <Link
              href="mailto:k.bowen.liu@gmail.com"
              className="font-telegraf text-[clamp(3.4rem,8vw,8.5rem)] font-black leading-[0.8] tracking-[-0.08em] hover:italic"
            >
              Let’s talk.
            </Link>
            <div className="flex items-center gap-3">
              <Link
                href={SOCIAL_LINKS.github}
                target="_blank"
                aria-label="GitHub"
                className="border border-black p-3 hover:bg-black hover:text-white"
              >
                <Github className="h-5 w-5" />
              </Link>
              <Link
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                aria-label="LinkedIn"
                className="border border-black p-3 hover:bg-black hover:text-white"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
              <span className="ml-3 font-kode text-[8px] uppercase tracking-[0.18em]">
                LA / Princeton
                <br />
                2026
              </span>
            </div>
          </div>
        </div>
      </footer>

      {isLaunching && (
        <>
          <motion.div
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 z-[90] bg-black [background-image:radial-gradient(#fff_1px,transparent_1px)] [background-size:5px_5px]"
            initial={{ opacity: 0, clipPath: "circle(0% at 50% 50%)" }}
            animate={{
              opacity: [0, 0.92, 1],
              clipPath: "circle(90% at 50% 50%)",
            }}
            transition={{
              duration: reduceMotion ? 0.1 : 0.62,
              ease: "circOut",
            }}
          />
          <motion.div
            aria-hidden="true"
            className="pointer-events-none fixed left-1/2 top-1/2 z-[100] h-28 w-28 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full border-[10px] border-white bg-black shadow-[0_0_0_10px_#101010]"
            initial={{ scale: 0, rotate: 0 }}
            animate={{ scale: reduceMotion ? 1 : 30, rotate: 540 }}
            transition={{
              duration: reduceMotion ? 0.1 : 1,
              delay: reduceMotion ? 0 : 0.18,
              ease: [0.76, 0, 0.24, 1],
            }}
          >
            <span className="absolute inset-x-0 bottom-0 h-1/2 bg-[linear-gradient(100deg,#ff5b35,#ffb800,#8b5cf6,#22d3ee)]" />
            <span className="absolute left-0 top-1/2 h-2 w-full -translate-y-1/2 bg-white" />
            <span className="absolute left-1/2 top-1/2 h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-white bg-black" />
          </motion.div>
        </>
      )}
    </motion.main>
  );
};

export default ProjectIndexLanding;
