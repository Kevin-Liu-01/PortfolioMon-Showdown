import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { ArenaFighter } from "./battleEngine";
import {
  getTrainerSpriteSrc,
  type TrainerId,
  type TrainerPose,
  type TrainerRenderMode,
} from "./trainerRoster";

export const TYPE_COLORS: Record<string, string> = {
  AI: "#a855f7",
  Data: "#3b82f6",
  Web: "#22c55e",
  Design: "#ec4899",
  Hardware: "#6b7280",
  Health: "#ef4444",
  Mobile: "#eab308",
  Game: "#f97316",
  Infra: "#0891b2",
};

export const ARENA_CLIP =
  "polygon(0 16px, 16px 0, calc(100% - 36px) 0, calc(100% - 24px) 12px, 100% 12px, 100% calc(100% - 16px), calc(100% - 16px) 100%, 24px 100%, 12px calc(100% - 12px), 0 calc(100% - 12px))";

export const ArenaSigil = ({
  accent = "#d8ff36",
  className = "h-8 w-8",
}: {
  accent?: string;
  className?: string;
}) => (
  <svg aria-hidden="true" viewBox="0 0 32 32" className={className} fill="none">
    <path
      d="M8 2.5h12l7.5 7.5v12L20 29.5H8L2.5 24V8Z"
      stroke={accent}
      strokeWidth="1.2"
    />
    <path d="M3 16h7m12 0h7" stroke={accent} strokeWidth="1.2" />
    <circle cx="16" cy="16" r="6" stroke={accent} strokeWidth="1.2" />
    <path d="m16 11 5 5-5 5-5-5Z" fill={accent} fillOpacity=".16" />
    <path d="M16 4v3m0 18v3" stroke={accent} strokeWidth="1.2" />
    <circle cx="16" cy="16" r="1.75" fill={accent} />
  </svg>
);

export const MoveGlyph = ({
  type,
  accent = TYPE_COLORS[type] ?? "#d8ff36",
  className = "h-10 w-10",
}: {
  type: string;
  accent?: string;
  className?: string;
}) => {
  const geometry = (() => {
    switch (type) {
      case "AI":
        return (
          <>
            <circle cx="24" cy="24" r="9" />
            <path d="M24 10v5m0 18v5M10 24h5m18 0h5M19 24l3 3 7-8" />
          </>
        );
      case "Data":
        return (
          <>
            <path d="M14 31h20M16 27l5-7 5 4 7-10" />
            <circle cx="16" cy="27" r="2" />
            <circle cx="21" cy="20" r="2" />
            <circle cx="26" cy="24" r="2" />
            <circle cx="33" cy="14" r="2" />
          </>
        );
      case "Web":
        return (
          <>
            <circle cx="16" cy="16" r="4" />
            <circle cx="33" cy="18" r="4" />
            <circle cx="24" cy="33" r="4" />
            <path d="m19.5 17 9.5 1m2 3.5-5 8M18.5 19.5l3.5 9.8" />
          </>
        );
      case "Design":
        return (
          <>
            <path d="m24 11 12 13-12 13-12-13Z" />
            <circle cx="24" cy="24" r="4" />
            <path d="M24 11v9m12 4h-8m-4 13v-9m-12-4h8" />
          </>
        );
      case "Hardware":
        return (
          <>
            <rect x="16" y="16" width="16" height="16" rx="1" />
            <path d="M20 20h8v8h-8zM20 10v6m8-6v6m-8 16v6m8-6v6M10 20h6m-6 8h6m16-8h6m-6 8h6" />
          </>
        );
      case "Health":
        return (
          <>
            <path d="M24 37S12 30 12 20c0-5 3-8 8-8 3 0 5 2 6 4 1-2 3-4 6-4 5 0 8 3 8 8 0 10-16 17-16 17Z" />
            <path d="M15 25h6l2-5 3 10 3-5h5" />
          </>
        );
      case "Mobile":
        return (
          <>
            <rect x="17" y="10" width="14" height="28" rx="3" />
            <path d="M21 14h6M22 34h4M14 20l-4 4 4 4m20-8 4 4-4 4" />
          </>
        );
      case "Game":
        return (
          <>
            <path d="M15 30c-2-1-3-4-2-8l2-6h18l2 6c1 4 0 7-2 8-2 0-5-5-7-5h-4c-2 0-5 5-7 5Z" />
            <path d="M18 20v6m-3-3h6M30 20h.1m3 3h.1" />
          </>
        );
      default:
        return (
          <>
            <path d="M14 16h20v7H14zm3 9h17v7H17z" />
            <path d="M10 12h20v4M14 35h20v-3M20 19h8m-8 9h8" />
          </>
        );
    }
  })();

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 48 48"
      className={className}
      fill="none"
      style={{ color: accent }}
    >
      <path
        d="M8 3h25l12 12v25l-5 5H15L3 33V8Z"
        fill="currentColor"
        fillOpacity=".07"
        stroke="currentColor"
        strokeOpacity=".28"
      />
      <g
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="square"
        strokeLinejoin="round"
      >
        {geometry}
      </g>
      <path d="M4 12V4h8M36 44h8v-8" stroke="currentColor" opacity=".75" />
      <rect x="39" y="8" width="3" height="3" fill="currentColor" />
    </svg>
  );
};

export const ArenaFrameArt = ({
  accent = "#d8ff36",
  animated = false,
  density = "quiet",
  className = "",
}: {
  accent?: string;
  animated?: boolean;
  density?: "quiet" | "full";
  className?: string;
}) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 100 100"
    preserveAspectRatio="none"
    className={`arena-frame-art arena-frame-art--${density} pointer-events-none absolute inset-[1px] z-30 h-[calc(100%-2px)] w-[calc(100%-2px)] ${className}`}
    style={{ ["--arena-accent" as string]: accent }}
    fill="none"
  >
    {density === "full" ? (
      <>
        <path
          d="M.7 3.4 3.4.7h76l3.8 2.7h16.1v93.1l-2.8 2.8H19l-3.8-2.6H.7Z"
          stroke={accent}
          strokeOpacity=".68"
          strokeWidth="1.25"
          vectorEffect="non-scaling-stroke"
        />
        <path
          className={animated ? "arena-frame-trace" : undefined}
          d="M.7 3.4 3.4.7h34m11 0h30.5l3.8 2.7h16.6M99.3 96.5l-2.8 2.8H58m-12 0H19l-3.8-2.6H.7"
          stroke={accent}
          strokeWidth="1.8"
          strokeLinecap="square"
          vectorEffect="non-scaling-stroke"
          pathLength="1"
        />
        <path
          d="M1.8 9V5l3.3-3.2h10M98.2 91v4l-3.2 3.2H85"
          stroke={accent}
          strokeOpacity=".34"
          vectorEffect="non-scaling-stroke"
        />
        <rect x="2" y="94" width="1.2" height="1.2" fill={accent} />
        <rect x="96.8" y="5" width="1.2" height="1.2" fill={accent} />
      </>
    ) : (
      <path
        className={animated ? "arena-frame-trace" : undefined}
        d="M.8 13V5L5 .8h18M77 .8h12L99.2 11v13M99.2 76v13L89 99.2H73M27 99.2H14L.8 90V76"
        stroke={accent}
        strokeOpacity=".7"
        strokeWidth="1.45"
        strokeLinecap="square"
        vectorEffect="non-scaling-stroke"
        pathLength="1"
      />
    )}
  </svg>
);

export const CircuitRule = ({
  accent = "#d8ff36",
  className = "",
}: {
  accent?: string;
  className?: string;
}) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 640 16"
    preserveAspectRatio="none"
    className={`h-4 w-full ${className}`}
    fill="none"
  >
    <path
      d="M0 8h124l8-6h98l8 6h164l8 6h98l8-6h124"
      stroke={accent}
      strokeOpacity=".38"
      vectorEffect="non-scaling-stroke"
    />
    <path
      className="arena-rule-signal"
      d="M0 8h124l8-6h98l8 6h164l8 6h98l8-6h124"
      stroke={accent}
      strokeWidth="1.5"
      strokeLinecap="square"
      vectorEffect="non-scaling-stroke"
      pathLength="1"
    />
    <rect x="316" y="4" width="8" height="8" rx="1" fill={accent} />
  </svg>
);

export type BattleEffectAnchors = {
  player: { x: number; y: number };
  cpu: { x: number; y: number };
};

export const BATTLE_EFFECT_DEFAULTS: BattleEffectAnchors = {
  player: { x: 26, y: 67 },
  cpu: { x: 76, y: 48 },
};

export const IsometricBattleInsignia = ({
  accent = "#d8ff36",
  className = "h-24 w-40",
}: {
  accent?: string;
  className?: string;
}) => (
  <motion.svg
    aria-hidden="true"
    viewBox="0 0 160 96"
    preserveAspectRatio="xMidYMid meet"
    className={className}
    fill="none"
  >
    <path
      d="M80 8 156 46 80 84 4 46Z"
      fill={accent}
      fillOpacity=".045"
      stroke={accent}
      strokeOpacity=".62"
      strokeWidth="1.3"
    />
    <motion.path
      d="M80 19 134 46 80 73 26 46Z"
      stroke={accent}
      strokeOpacity=".52"
      strokeDasharray="7 6 2 6"
      animate={{ strokeDashoffset: [0, -42] }}
      transition={{ duration: 5.5, repeat: Infinity, ease: "linear" }}
    />
    <path
      d="M80 31 110 46 80 61 50 46ZM4 46h22m108 0h22M80 8v11m0 54v11"
      stroke={accent}
      strokeOpacity=".76"
      strokeWidth="1.4"
    />
    <path
      d="M38 25 122 67M122 25 38 67"
      stroke={accent}
      strokeOpacity=".2"
      strokeDasharray="2 7"
    />
    <path
      d="m80 39 14 7-14 7-14-7Z"
      fill={accent}
      fillOpacity=".24"
      stroke={accent}
    />
    <motion.circle
      cx="80"
      cy="46"
      r="3"
      fill={accent}
      animate={{ scale: [0.75, 1.35, 0.75] }}
      transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      style={{ transformOrigin: "80px 46px" }}
    />
  </motion.svg>
);

export const BattlefieldVector = ({
  playerColor = "#41d9ff",
  cpuColor = "#ff4f9a",
}: {
  playerColor?: string;
  cpuColor?: string;
}) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 1200 520"
    preserveAspectRatio="none"
    className="pointer-events-none absolute inset-0 h-full w-full"
    fill="none"
  >
    <path
      d="M600 20 1100 260 600 500 100 260Z"
      stroke="white"
      strokeOpacity=".16"
      strokeWidth="1.25"
      vectorEffect="non-scaling-stroke"
    />
    <g>
      {Array.from({ length: 7 }, (_, index) => {
        const t = (index + 1) / 8;
        const leftTop = { x: 600 - 500 * t, y: 20 + 240 * t };
        const rightBottom = { x: 1100 - 500 * t, y: 260 + 240 * t };
        const rightTop = { x: 600 + 500 * t, y: 20 + 240 * t };
        const leftBottom = { x: 100 + 500 * t, y: 260 + 240 * t };
        return (
          <g key={index}>
            <path
              d={`M${leftTop.x} ${leftTop.y} ${rightBottom.x} ${rightBottom.y}`}
              stroke="white"
              strokeOpacity={index === 3 ? ".15" : ".065"}
              strokeDasharray={index === 3 ? "0" : "3 11"}
              vectorEffect="non-scaling-stroke"
            />
            <path
              d={`M${rightTop.x} ${rightTop.y} ${leftBottom.x} ${leftBottom.y}`}
              stroke="white"
              strokeOpacity={index === 3 ? ".15" : ".065"}
              strokeDasharray={index === 3 ? "0" : "3 11"}
              vectorEffect="non-scaling-stroke"
            />
          </g>
        );
      })}
    </g>
    <ellipse
      cx="312"
      cy="382"
      rx="192"
      ry="96"
      stroke={playerColor}
      strokeOpacity=".34"
      vectorEffect="non-scaling-stroke"
    />
    <ellipse
      cx="912"
      cy="280"
      rx="176"
      ry="88"
      stroke={cpuColor}
      strokeOpacity=".34"
      vectorEffect="non-scaling-stroke"
    />
    <g>
      <path
        d="M600 220 680 260 600 300 520 260Z"
        fill="#d8ff36"
        fillOpacity=".04"
        stroke="#d8ff36"
        strokeOpacity=".52"
      />
      <path
        d="M600 238 644 260 600 282 556 260ZM520 260h36m88 0h36"
        stroke="#d8ff36"
        strokeOpacity=".48"
      />
      <path
        d="m600 252 16 8-16 8-16-8Z"
        fill="#d8ff36"
        fillOpacity=".36"
        stroke="#d8ff36"
      />
    </g>
    {[
      { x: 174, y: 306, color: playerColor },
      { x: 1020, y: 204, color: cpuColor },
    ].map((pylon) => (
      <g key={`${pylon.x}-${pylon.y}`}>
        <path
          d={`M${pylon.x} ${pylon.y}v-58`}
          stroke={pylon.color}
          strokeOpacity=".48"
          strokeWidth="1.4"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d={`m${pylon.x} ${pylon.y - 62} 18 9-18 9-18-9Z`}
          fill={pylon.color}
          fillOpacity=".16"
          stroke={pylon.color}
          strokeOpacity=".62"
          vectorEffect="non-scaling-stroke"
        />
      </g>
    ))}
    <path
      d="M100 260 600 20M1100 260 600 500"
      stroke="#d8ff36"
      strokeOpacity=".18"
      strokeDasharray="5 14"
      vectorEffect="non-scaling-stroke"
    />
  </svg>
);

export const VersusCore = () => (
  <div className="relative flex h-40 w-40 items-center justify-center lg:h-48 lg:w-48">
    <motion.svg
      aria-hidden="true"
      viewBox="0 0 180 180"
      className="absolute inset-0 h-full w-full"
      fill="none"
    >
      <motion.g
        style={{ transformOrigin: "90px 90px" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      >
        <path
          d="m90 4 58 24 28 62-28 62-58 24-58-24L4 90l28-62Z"
          stroke="#d8ff36"
          strokeOpacity=".42"
          strokeDasharray="16 8 2 8"
        />
        <path
          d="M90 14v18m0 116v18M14 90h18m116 0h18"
          stroke="#d8ff36"
          strokeWidth="2"
        />
      </motion.g>
      <motion.g
        style={{ transformOrigin: "90px 90px" }}
        animate={{ rotate: -360 }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      >
        <circle
          cx="90"
          cy="90"
          r="57"
          stroke="white"
          strokeOpacity=".24"
          strokeDasharray="2 9"
        />
        <path
          d="M90 40 140 90 90 140 40 90Z"
          stroke="white"
          strokeOpacity=".18"
        />
      </motion.g>
      <path
        d="m90 50 35 17 9 38-25 30H71l-25-30 9-38Z"
        fill="#06080b"
        stroke="#d8ff36"
        strokeOpacity=".72"
      />
      <path d="M50 90h80" stroke="#d8ff36" strokeOpacity=".38" />
    </motion.svg>
    <motion.strong
      initial={{ scale: 0, rotate: -18, opacity: 0 }}
      animate={{ scale: [0, 1.16, 1], rotate: 0, opacity: 1 }}
      transition={{ delay: 0.32, duration: 0.62, ease: "backOut" }}
      className="relative z-10 font-telegraf text-5xl font-black italic tracking-[-0.08em] text-white lg:text-6xl"
    >
      VS
    </motion.strong>
    <motion.span
      className="absolute left-[18%] right-[18%] top-1/2 h-px bg-[#d8ff36] shadow-[0_0_16px_#d8ff36]"
      animate={{ scaleX: [0.25, 1, 0.25], opacity: [0.3, 1, 0.3] }}
      transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
    />
  </div>
);

export const ResultSeal = ({
  victory,
  className = "h-24 w-24",
}: {
  victory: boolean;
  className?: string;
}) => {
  const accent = victory ? "#d8ff36" : "#ff5151";
  return (
    <motion.svg
      aria-hidden="true"
      viewBox="0 0 120 120"
      className={className}
      fill="none"
      initial={{ scale: 0.6, rotate: -24, opacity: 0 }}
      animate={{ scale: 1, rotate: 0, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.65, ease: "backOut" }}
    >
      <path
        d="m60 4 14 10 17-2 7 16 15 8-3 17 8 15-12 13-1 18-17 4-10 14-18-6-18 6-10-14-17-4-1-18L2 68l8-15-3-17 15-8 7-16 17 2Z"
        stroke={accent}
        strokeWidth="2"
      />
      <circle cx="60" cy="60" r="40" stroke={accent} strokeOpacity=".35" />
      <circle
        cx="60"
        cy="60"
        r="31"
        fill={accent}
        fillOpacity=".1"
        stroke={accent}
      />
      <path
        d={victory ? "m40 61 13 13 28-31" : "m43 43 34 34M77 43 43 77"}
        stroke={accent}
        strokeWidth="6"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
      <path d="M60 10v10m0 80v10M10 60h10m80 0h10" stroke={accent} />
    </motion.svg>
  );
};

export const ArenaImage = ({
  src,
  alt,
  priority = false,
  sizes,
  fit = "cover",
  accent = "#d8ff36",
  pixelated = false,
  className = "",
}: {
  src: string;
  alt: string;
  priority?: boolean;
  sizes: string;
  fit?: "cover" | "contain";
  accent?: string;
  pixelated?: boolean;
  className?: string;
}) => {
  const [loaded, setLoaded] = useState(false);
  const isContained = fit === "contain";

  useEffect(() => setLoaded(false), [src]);

  return (
    <div className={`isolate overflow-hidden bg-[#0a0d12] ${className}`}>
      <div
        className={`absolute inset-0 bg-[linear-gradient(110deg,#111827_20%,#283244_42%,#111827_64%)] bg-[length:220%_100%] transition-opacity duration-300 ${
          loaded
            ? "opacity-0"
            : "animate-[arena-shimmer_1.2s_linear_infinite] opacity-100"
        }`}
      />
      {isContained && (
        <>
          <Image
            src={src}
            alt=""
            aria-hidden="true"
            fill
            sizes={sizes}
            loading={priority ? "eager" : "lazy"}
            fetchPriority={priority ? "high" : "auto"}
            className="saturate-75 scale-110 object-cover opacity-30 blur-xl"
          />
          <div className="absolute inset-0 bg-black/[0.34]" />
        </>
      )}
      <Image
        src={src}
        alt={alt}
        fill
        preload={priority}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        sizes={sizes}
        onLoad={() => setLoaded(true)}
        className={`transition duration-300 ease-out ${
          isContained ? "z-[1] object-contain" : "object-cover"
        } ${
          pixelated
            ? "contrast-[1.08] saturate-[0.88] [image-rendering:pixelated]"
            : ""
        } ${
          loaded
            ? "scale-100 opacity-100 blur-0"
            : "scale-[1.03] opacity-0 blur-sm"
        } ${pixelated && loaded ? "duration-0" : ""}`}
      />
      {isContained && (
        <svg
          aria-hidden="true"
          viewBox="0 0 160 90"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-[5px] z-[2] h-[calc(100%-10px)] w-[calc(100%-10px)]"
          fill="none"
        >
          <path
            d="M.5 12V.5H20M140 .5h19.5V12M159.5 78v11.5H140M20 89.5H.5V78"
            stroke={accent}
            strokeOpacity=".72"
            strokeWidth="1.15"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M.5 27v-7m0 50v-7M159.5 27v-7m0 50v-7M72 .5h16M72 89.5h16"
            stroke={accent}
            strokeOpacity=".36"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M76 45h8M80 41v8"
            stroke={accent}
            strokeOpacity=".42"
            strokeWidth=".8"
            vectorEffect="non-scaling-stroke"
          />
          <circle cx="80" cy="45" r="7" stroke={accent} strokeOpacity=".18" />
        </svg>
      )}
    </div>
  );
};

export const TrainerSprite = ({
  trainer,
  state = "idle",
  mode = "battle",
  flip = false,
  priority = true,
  animated = true,
  label,
}: {
  trainer: TrainerId;
  state?: TrainerPose;
  mode?: TrainerRenderMode;
  flip?: boolean;
  priority?: boolean;
  animated?: boolean;
  label: string;
}) => {
  const src = getTrainerSpriteSrc(trainer, mode);

  return (
    <motion.div
      className={`relative h-full w-full origin-bottom ${
        flip ? "-scale-x-100" : ""
      }`}
      animate={
        !animated
          ? undefined
          : state === "commanding"
          ? {
              y: [0, -5, -2, 0],
              x: flip ? [0, -7, -3, 0] : [0, 7, 3, 0],
              scale: [1, 1.045, 1.02, 1],
            }
          : state === "win"
          ? {
              y: [0, -10, 0, -5, 0],
              rotate: [0, 2, -1, 1, 0],
              scale: [1, 1.04, 1, 1.025, 1],
            }
          : state === "lose"
          ? { y: 7, rotate: flip ? -4 : 4, opacity: 0.68, scale: 0.96 }
          : { y: [0, -2.5, 0], scale: [1, 1.008, 1] }
      }
      transition={{
        duration: state === "idle" ? 3.6 : state === "win" ? 1 : 0.56,
        repeat: animated && state === "idle" ? Infinity : 0,
        ease: state === "idle" ? "easeInOut" : [0.22, 1, 0.36, 1],
      }}
    >
      <motion.svg
        aria-hidden="true"
        viewBox="0 0 120 36"
        preserveAspectRatio="none"
        className="absolute inset-x-[8%] bottom-[1%] h-[24%] w-[84%] overflow-visible"
        fill="none"
        animate={
          animated
            ? { opacity: [0.22, 0.52, 0.22], scaleX: [0.94, 1.04, 0.94] }
            : { opacity: 0.34, scaleX: 1 }
        }
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <ellipse
          cx="60"
          cy="18"
          rx="54"
          ry="11"
          stroke="#d8ff36"
          strokeOpacity=".42"
          vectorEffect="non-scaling-stroke"
        />
        <ellipse
          cx="60"
          cy="18"
          rx="39"
          ry="7"
          stroke="white"
          strokeOpacity=".22"
          strokeDasharray="3 7"
          vectorEffect="non-scaling-stroke"
        />
      </motion.svg>
      <Image
        key={src}
        src={src}
        alt={label}
        fill
        sizes="180px"
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        unoptimized
        className={`z-10 object-contain drop-shadow-[0_14px_18px_rgba(0,0,0,.75)] [image-rendering:pixelated] ${
          mode === "chibi" ? "object-center" : "object-bottom"
        }`}
      />
      {(state === "commanding" || state === "win") && (
        <motion.svg
          aria-hidden="true"
          viewBox="0 0 100 100"
          className="pointer-events-none absolute inset-0 z-20 h-full w-full"
          fill="none"
          initial={{ opacity: 0, scale: 0.72, rotate: -18 }}
          animate={{
            opacity: [0, 0.75, 0],
            scale: [0.72, 1.05, 1.22],
            rotate: 18,
          }}
          transition={{
            duration: state === "win" ? 0.9 : 0.56,
            ease: "circOut",
          }}
        >
          <path
            d="M18 58c8-28 52-40 70-10M14 69c18 17 54 18 75-3"
            stroke="#d8ff36"
            strokeWidth="1.4"
            strokeDasharray="8 7"
          />
          <path d="m84 43 8 5-8 5M20 64l-9 5 8 6" stroke="white" />
        </motion.svg>
      )}
    </motion.div>
  );
};

export const TypePill = ({ type }: { type: string }) => (
  <span
    className="arena-cut-outline relative inline-flex items-center gap-1.5 border px-2 py-1 font-kode text-[7px] font-bold uppercase tracking-[0.14em] text-white"
    style={{
      ["--arena-stroke" as string]: `${TYPE_COLORS[type] ?? "#5f6877"}bb`,
      borderColor: `${TYPE_COLORS[type] ?? "#5f6877"}aa`,
      background: `linear-gradient(110deg, ${
        TYPE_COLORS[type] ?? "#5f6877"
      }d9, ${TYPE_COLORS[type] ?? "#5f6877"}78)`,
      clipPath:
        "polygon(5px 0, calc(100% - 4px) 0, 100% 4px, 100% 100%, 0 100%, 0 5px)",
    }}
  >
    <span className="h-1 w-1 rotate-45 bg-white/[0.90]" />
    {type}
  </span>
);

export const StatMeter = ({
  label,
  value,
  max = 160,
  color = "#d8ff36",
}: {
  label: string;
  value: number;
  max?: number;
  color?: string;
}) => (
  <div className="grid grid-cols-[36px_1fr_34px] items-center gap-2">
    <span className="font-kode text-[7px] uppercase tracking-[0.14em] text-white/[0.48]">
      {label}
    </span>
    <div className="relative h-1.5 overflow-hidden bg-white/[0.10]">
      <motion.div
        className="h-full"
        style={{ backgroundColor: color }}
        initial={{ width: 0 }}
        animate={{ width: `${Math.min(100, (value / max) * 100)}%` }}
        transition={{ duration: 0.55, ease: "circOut" }}
      />
      <span className="absolute inset-y-0 left-1/4 w-px bg-black/[0.35]" />
      <span className="absolute inset-y-0 left-1/2 w-px bg-black/[0.35]" />
      <span className="absolute inset-y-0 left-3/4 w-px bg-black/[0.35]" />
    </div>
    <span className="text-right font-kode text-[8px] text-white/[0.72]">
      {value}
    </span>
  </div>
);

export const HealthBar = ({
  fighter,
  compact = false,
}: {
  fighter: ArenaFighter;
  compact?: boolean;
}) => {
  const percentage = Math.max(0, (fighter.currentHp / fighter.mon.hp) * 100);
  const color =
    percentage > 55 ? "#d8ff36" : percentage > 24 ? "#ffbd2e" : "#ff5151";

  return (
    <div className={compact ? "space-y-1.5" : "space-y-2"}>
      <div className="flex items-end justify-between gap-3">
        <div className="min-w-0">
          <div className="flex min-w-0 items-baseline gap-2">
            <span className="shrink-0 font-kode text-[7px] tracking-[0.13em] text-white/[0.35]">
              NO.{String(fighter.mon.id).padStart(3, "0")}
            </span>
            <p className="truncate font-telegraf text-base font-black tracking-[-0.02em] text-white sm:text-2xl">
              {fighter.mon.name}
            </p>
          </div>
          <div className="mt-1 flex gap-1">
            <TypePill type={fighter.mon.type1} />
            {fighter.mon.type2 && <TypePill type={fighter.mon.type2} />}
            {fighter.status && (
              <span className="bg-white px-2 py-1 font-kode text-[8px] uppercase text-black">
                {fighter.status}
              </span>
            )}
            {fighter.barrier > 0 && (
              <span className="border border-blue-300 bg-blue-400/[0.16] px-2 py-1 font-kode text-[7px] uppercase text-blue-200">
                Guard {Math.round(fighter.barrier * 100)}%
              </span>
            )}
            {fighter.critBoost > 0 && (
              <span className="border border-purple-300 bg-purple-400/[0.16] px-2 py-1 font-kode text-[7px] uppercase text-purple-200">
                Focus +{Math.round(fighter.critBoost * 100)}
              </span>
            )}
          </div>
        </div>
        <div className="shrink-0 text-right">
          <span className="block font-kode text-[9px] text-white/[0.72]">
            {fighter.currentHp}/{fighter.mon.hp}
          </span>
          <span className="font-kode text-[6px] uppercase tracking-[0.12em] text-white/[0.30]">
            {Math.round(percentage)}% integrity
          </span>
        </div>
      </div>
      <div className="relative h-2 overflow-hidden bg-white/[0.12]">
        <motion.div
          className="h-full"
          style={{ backgroundColor: color }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
        />
        <span className="absolute inset-y-0 left-1/4 w-px bg-black/[0.40]" />
        <span className="absolute inset-y-0 left-1/2 w-px bg-black/[0.40]" />
        <span className="absolute inset-y-0 left-3/4 w-px bg-black/[0.40]" />
      </div>
    </div>
  );
};

type ArenaFighterState = "idle" | "attack" | "hit" | "faint" | "switch";
type ProjectRigVariant =
  | "biped"
  | "quadruped"
  | "arachnid"
  | "winged"
  | "serpent"
  | "mech";

const PROJECT_RIGS: ProjectRigVariant[] = [
  "biped",
  "quadruped",
  "arachnid",
  "winged",
  "serpent",
  "mech",
];

const PixelJoint = ({
  x,
  y,
  color,
  size = 15,
}: {
  x: number;
  y: number;
  color: string;
  size?: number;
}) => (
  <rect
    x={x - size / 2}
    y={y - size / 2}
    width={size}
    height={size}
    fill="#07090d"
    stroke={color}
    strokeWidth="4"
  />
);

const ProjectBattleRig = ({
  monId,
  type,
  color,
  side,
  state,
}: {
  monId: number;
  type: string;
  color: string;
  side: "player" | "cpu";
  state: ArenaFighterState;
}) => {
  const variant =
    PROJECT_RIGS[(monId + type.length * 3) % PROJECT_RIGS.length] ?? "biped";
  const activeTransition =
    state === "idle"
      ? {
          duration: 2.8 + (monId % 4) * 0.22,
          repeat: Infinity,
          ease: "easeInOut" as const,
        }
      : { duration: 0.46, repeat: 0, ease: [0.22, 1, 0.36, 1] as const };
  const stride = side === "player" ? 1 : -1;
  const limbStroke = {
    stroke: color,
    strokeWidth: 13,
    strokeLinecap: "square" as const,
    strokeLinejoin: "miter" as const,
    fill: "none",
    vectorEffect: "non-scaling-stroke" as const,
  };
  const limbMotion =
    state === "attack"
      ? { x: [0, stride * 18, stride * 4, 0], y: [0, -7, 2, 0] }
      : state === "hit"
      ? { x: [0, -stride * 11, stride * 6, 0], y: [0, 6, -2, 0] }
      : state === "faint"
      ? { y: 42, rotate: stride * 7 }
      : state === "switch"
      ? { scaleX: [1, 0.68, 0.18], skewY: [0, stride * 4, 0] }
      : {
          y: [0, -3, 0, 2, 0],
          rotate: [0, stride * 0.7, 0, -stride * 0.5, 0],
        };

  const squareTrail = Array.from({ length: 5 }, (_, index) => (
    <motion.rect
      key={`trail-${index}`}
      x={side === "player" ? 64 - index * 20 : 556 + index * 20}
      y={184 + (index % 2) * 18}
      width={10 + (index % 2) * 4}
      height={10 + (index % 2) * 4}
      fill={color}
      initial={false}
      animate={
        state === "attack"
          ? { x: stride * (35 + index * 13), opacity: [0, 0.85, 0] }
          : { x: 0, opacity: 0 }
      }
      transition={{ duration: 0.5, delay: index * 0.025 }}
    />
  ));

  return (
    <motion.svg
      aria-hidden="true"
      viewBox="0 0 640 400"
      preserveAspectRatio="xMidYMid meet"
      className="pointer-events-none absolute inset-[-9%] z-0 h-[118%] w-[118%] overflow-visible [shape-rendering:crispEdges]"
      initial={false}
      animate={limbMotion}
      transition={activeTransition}
      style={{
        filter: `drop-shadow(0 14px 15px rgba(0,0,0,.64)) drop-shadow(0 0 8px ${color}55)`,
      }}
    >
      <path
        d="M160 78h320l48 42v162l-46 42H158l-46-42V120Z"
        fill="#07090d"
        stroke={color}
        strokeWidth="7"
        strokeLinejoin="miter"
      />
      <path
        d="M178 91h284l42 36v147l-36 36H172l-36-36V128Z"
        fill={color}
        fillOpacity=".09"
        stroke={color}
        strokeOpacity=".34"
        strokeWidth="3"
      />

      {variant === "biped" && (
        <>
          <motion.g
            style={{ transformOrigin: "128px 166px" }}
            animate={{ rotate: state === "attack" ? -18 : [0, -4, 0, 3, 0] }}
            transition={activeTransition}
          >
            <path d="M130 160H80v-42H34v78h42" {...limbStroke} />
            <PixelJoint x={80} y={160} color={color} />
            <path d="M35 197h35v22H28v-11" {...limbStroke} />
          </motion.g>
          <motion.g
            style={{ transformOrigin: "512px 166px" }}
            animate={{ rotate: state === "attack" ? 13 : [0, 3, 0, -4, 0] }}
            transition={activeTransition}
          >
            <path d="M510 160h50v-42h46v78h-42" {...limbStroke} />
            <PixelJoint x={560} y={160} color={color} />
            <path d="M605 197h-35v22h42v-11" {...limbStroke} />
          </motion.g>
          <motion.g
            animate={{ y: state === "attack" ? [0, -10, 0] : [0, 3, 0] }}
            transition={activeTransition}
          >
            <path d="M230 310v47h-30v27h-54" {...limbStroke} />
            <path d="M410 310v47h30v27h54" {...limbStroke} />
            <PixelJoint x={230} y={354} color={color} />
            <PixelJoint x={410} y={354} color={color} />
          </motion.g>
          <path d="M244 78V42h28V16M396 78V42h-28V16" {...limbStroke} />
          <PixelJoint x={272} y={42} color={color} size={12} />
          <PixelJoint x={368} y={42} color={color} size={12} />
        </>
      )}

      {variant === "quadruped" && (
        <>
          {[188, 270, 370, 452].map((x, index) => (
            <motion.g
              key={x}
              style={{ transformOrigin: `${x}px 302px` }}
              animate={{
                rotate:
                  state === "attack"
                    ? index % 2
                      ? 10
                      : -10
                    : index % 2
                    ? [2, -4, 2]
                    : [-2, 4, -2],
              }}
              transition={{ ...activeTransition, delay: index * 0.04 }}
            >
              <path
                d={`M${x} 298v42h${index % 2 ? 19 : -19}v42h${
                  index % 2 ? 28 : -28
                }`}
                {...limbStroke}
              />
              <PixelJoint
                x={x + (index % 2 ? 19 : -19)}
                y={340}
                color={color}
                size={13}
              />
            </motion.g>
          ))}
          <motion.path
            d="M505 148h60v-36h45v-52"
            {...limbStroke}
            animate={{ rotate: state === "attack" ? -12 : [0, 7, -3, 0] }}
            transition={activeTransition}
            style={{ transformOrigin: "505px 148px" }}
          />
          <path
            d="M180 80 154 38h46l28 40M460 80l26-42h-46l-28 40"
            {...limbStroke}
          />
        </>
      )}

      {variant === "arachnid" && (
        <>
          {[
            "M142 132H86L42 76H10",
            "M128 178H68L20 158H-18",
            "M128 226H62L20 254H-18",
            "M146 274H88L44 334H8",
            "M498 132h56l44-56h32",
            "M512 178h60l48-20h38",
            "M512 226h66l42 28h38",
            "M494 274h58l44 60h36",
          ].map((d, index) => (
            <motion.path
              key={d}
              d={d}
              {...limbStroke}
              animate={{
                y:
                  state === "attack"
                    ? index % 2
                      ? -12
                      : 12
                    : index % 2
                    ? [0, 4, 0]
                    : [0, -4, 0],
              }}
              transition={{ ...activeTransition, delay: (index % 4) * 0.04 }}
            />
          ))}
          {[128, 512].flatMap((x) =>
            [132, 178, 226, 274].map((y) => (
              <PixelJoint
                key={`${x}-${y}`}
                x={x}
                y={y}
                color={color}
                size={12}
              />
            ))
          )}
          <path d="M274 78 300 32h40l26 46" {...limbStroke} />
        </>
      )}

      {variant === "winged" && (
        <>
          <motion.path
            d="M132 126 48 64 12 98l70 72-82 12 78 62 68-22"
            fill={color}
            fillOpacity=".14"
            stroke={color}
            strokeWidth="8"
            animate={{
              scaleY: state === "attack" ? [1, 1.24, 0.94, 1] : [1, 1.05, 1],
            }}
            transition={activeTransition}
            style={{ transformOrigin: "132px 178px" }}
          />
          <motion.path
            d="M508 126 592 64l36 34-70 72 82 12-78 62-68-22"
            fill={color}
            fillOpacity=".14"
            stroke={color}
            strokeWidth="8"
            animate={{
              scaleY: state === "attack" ? [1, 1.24, 0.94, 1] : [1, 1.05, 1],
            }}
            transition={activeTransition}
            style={{ transformOrigin: "508px 178px" }}
          />
          <path d="M245 310v48l-38 26M395 310v48l38 26" {...limbStroke} />
          <path d="M280 78 300 24h40l20 54" {...limbStroke} />
          <PixelJoint x={245} y={358} color={color} />
          <PixelJoint x={395} y={358} color={color} />
        </>
      )}

      {variant === "serpent" && (
        <>
          <motion.path
            d="M442 304v40h82v34h80v-52h-38"
            {...limbStroke}
            animate={{ x: state === "attack" ? [0, 34, -8, 0] : [0, 9, -4, 0] }}
            transition={activeTransition}
          />
          {[474, 524, 574, 606].map((x, index) => (
            <PixelJoint
              key={x}
              x={x}
              y={index === 0 ? 344 : index === 1 ? 362 : 378}
              color={color}
            />
          ))}
          <motion.path
            d="M150 142H82v-38H34v68H4"
            {...limbStroke}
            animate={{ rotate: state === "attack" ? -14 : [0, -4, 3, 0] }}
            transition={activeTransition}
            style={{ transformOrigin: "150px 142px" }}
          />
          <path
            d="M238 80 202 34h44l34 44M402 80l36-46h-44l-34 44"
            {...limbStroke}
          />
        </>
      )}

      {variant === "mech" && (
        <>
          <motion.g
            animate={{ x: state === "attack" ? -20 : [0, -3, 0] }}
            transition={activeTransition}
          >
            <path d="M140 150H76v34H28v48h54" {...limbStroke} />
            <path d="M28 218 4 194v70l24-24" {...limbStroke} />
            <PixelJoint x={76} y={184} color={color} />
          </motion.g>
          <motion.g
            animate={{ x: state === "attack" ? 20 : [0, 3, 0] }}
            transition={activeTransition}
          >
            <path d="M500 150h64v34h48v48h-54" {...limbStroke} />
            <path d="m612 218 24-24v70l-24-24" {...limbStroke} />
            <PixelJoint x={564} y={184} color={color} />
          </motion.g>
          <path d="M176 310v36h288v-36" {...limbStroke} />
          <rect
            x="164"
            y="340"
            width="312"
            height="42"
            fill="#07090d"
            stroke={color}
            strokeWidth="8"
          />
          {[188, 244, 300, 356, 412, 468].map((x) => (
            <rect
              key={x}
              x={x}
              y="350"
              width="26"
              height="22"
              fill={color}
              fillOpacity=".28"
              stroke={color}
              strokeWidth="3"
            />
          ))}
          <path d="M286 78V26h68v52M304 26V4h32v22" {...limbStroke} />
        </>
      )}

      {squareTrail}
      <g opacity=".9">
        <rect x="102" y="108" width="18" height="18" fill={color} />
        <rect x="520" y="274" width="18" height="18" fill={color} />
        <path d="M112 78h58M470 324h58" stroke={color} strokeWidth="5" />
      </g>
      <text
        x="320"
        y="374"
        textAnchor="middle"
        fill={color}
        fontFamily="monospace"
        fontSize="13"
        fontWeight="700"
        letterSpacing="4"
      >
        {variant.toUpperCase()} / RIG-{String((monId % 9) + 1).padStart(2, "0")}
      </text>
    </motion.svg>
  );
};

export const FighterVisual = ({
  fighter,
  side,
  state = "idle",
}: {
  fighter: ArenaFighter;
  side: "player" | "cpu";
  state?: ArenaFighterState;
}) => {
  const type = fighter.mon.type1;
  const color = TYPE_COLORS[type] ?? "#d8ff36";

  return (
    <motion.div
      key={`${side}-${fighter.mon.id}`}
      data-testid={`fighter-${side}`}
      className="relative aspect-[16/10] w-full [transform-style:preserve-3d]"
      initial={{ x: side === "player" ? -70 : 70, y: 12, scale: 0.92 }}
      animate={
        state === "attack"
          ? {
              x: side === "player" ? [0, 12, 62, 0] : [0, -12, -62, 0],
              y: [0, -8, -20, 0],
              rotate: side === "player" ? [0, -2, 3, 0] : [0, 2, -3, 0],
              scale: [1, 1.025, 1.09, 1],
              filter: [
                "brightness(1)",
                "brightness(1.12)",
                "brightness(1.3)",
                "brightness(1)",
              ],
            }
          : state === "hit"
          ? {
              x: side === "player" ? [0, -14, 9, -6, 0] : [0, 14, -9, 6, 0],
              rotate: side === "player" ? [0, -2, 1, 0] : [0, 2, -1, 0],
              scale: [1, 0.955, 1.02, 1],
              filter: [
                "brightness(1)",
                "brightness(1.65)",
                "brightness(1)",
                "brightness(1)",
              ],
            }
          : state === "faint"
          ? {
              opacity: 0,
              y: 70,
              rotate: side === "player" ? -5 : 5,
              scale: 0.78,
            }
          : state === "switch"
          ? {
              x: side === "player" ? [0, -35, -90] : [0, 35, 90],
              scaleX: [1, 0.72, 0.1],
              scaleY: [1, 1.08, 0.88],
              filter: ["brightness(1)", "brightness(1.4)", "brightness(2)"],
            }
          : {
              opacity: 1,
              x: [0, 0, side === "player" ? 1.5 : -1.5, 0],
              y: [0, -2, -2, 0, 0],
              rotate: [0, 0.35, 0, -0.25, 0],
              scale: 1,
            }
      }
      transition={{
        duration: state === "idle" ? 3.4 + (fighter.mon.id % 4) * 0.24 : 0.5,
        repeat: state === "idle" ? Infinity : 0,
        ease: state === "idle" ? "easeInOut" : [0.22, 1, 0.36, 1],
      }}
    >
      <ProjectBattleRig
        monId={fighter.mon.id}
        type={type}
        color={color}
        side={side}
        state={state}
      />

      <motion.div
        className="arena-cut-outline arena-panel absolute inset-x-[12%] bottom-[18%] top-[12%] z-10 overflow-hidden border bg-black"
        style={{
          ["--arena-accent" as string]: color,
          ["--arena-stroke" as string]: `${color}aa`,
          borderColor: `${color}aa`,
          boxShadow: `0 14px 36px rgba(0,0,0,.42), 0 0 18px ${color}18`,
        }}
        animate={{
          clipPath:
            state === "attack"
              ? "polygon(0 9%, 7% 0, 94% 0, 100% 14%, 96% 100%, 8% 96%, 0 82%)"
              : state === "hit"
              ? "polygon(4% 0, 98% 5%, 100% 88%, 91% 100%, 3% 95%, 0 12%)"
              : "polygon(0 12%, 8% 0, 92% 0, 100% 13%, 100% 86%, 91% 100%, 7% 100%, 0 88%)",
          skewX: state === "hit" ? [0, side === "player" ? -2 : 2, 0] : 0,
        }}
        transition={{ duration: state === "idle" ? 0 : 0.34 }}
      >
        <ArenaFrameArt accent={color} />
        <ArenaImage
          src={fighter.mon.image}
          alt={`${fighter.mon.name} battle sprite`}
          priority
          sizes="(min-width: 1024px) 38vw, 85vw"
          fit="contain"
          accent={color}
          pixelated
          className="absolute inset-0"
        />
        <div className="arena-pixel-matrix pointer-events-none absolute inset-0 z-[4] opacity-45 mix-blend-overlay" />
        <div className="from-black/58 absolute inset-0 bg-gradient-to-t via-transparent to-black/5" />
        <motion.div
          className="absolute inset-y-0 w-1/4 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          animate={{ x: ["-150%", "450%"] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-x-0 top-0 h-px"
          style={{ backgroundColor: color, boxShadow: `0 0 14px ${color}` }}
          animate={{ y: [0, 138, 0] }}
          transition={{ duration: 5.2, repeat: Infinity, ease: "linear" }}
        />
        <span
          className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2 py-1 font-kode text-[8px] uppercase tracking-[0.16em] text-black"
          style={{ backgroundColor: color }}
        >
          <ArenaSigil accent="#07090d" className="h-3 w-3" /> No.
          {String(fighter.mon.id).padStart(3, "0")} / {type}
        </span>
      </motion.div>
    </motion.div>
  );
};

export type ArenaVisualEvent = {
  id: number;
  moveName: string;
  moveType: string;
  source: "player" | "cpu";
  stage: "charge" | "impact" | "miss" | "status" | "item" | "switch";
  damage?: number;
  critical?: boolean;
  hitCount?: number;
  effectiveness?: number;
  barrierAbsorbed?: number;
  executed?: boolean;
  stab?: boolean;
};

const EffectGeometry = ({ type, color }: { type: string; color: string }) => {
  if (type === "AI") {
    return (
      <>
        {[0, 1, 2].map((row) => (
          <motion.div
            key={row}
            className="absolute left-[12%] right-[12%] h-px"
            style={{ top: `${30 + row * 18}%`, backgroundColor: color }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: [0, 1, 0.7], opacity: [0, 1, 0] }}
            transition={{ duration: 0.7, delay: row * 0.06 }}
          />
        ))}
        {[0, 1, 2, 3].map((node) => (
          <motion.span
            key={node}
            className="absolute h-3 w-3 rounded-full border-2"
            style={{
              left: `${22 + node * 18}%`,
              top: `${25 + (node % 2) * 34}%`,
              borderColor: color,
            }}
            animate={{ scale: [0, 1.8, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 0.7, delay: node * 0.05 }}
          />
        ))}
      </>
    );
  }

  if (type === "Data" || type === "Infra") {
    return (
      <>
        {Array.from({ length: 12 }, (_, index) => (
          <motion.span
            key={index}
            className="absolute top-0 w-px"
            style={{ left: `${7 + index * 8}%`, backgroundColor: color }}
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: [0, `${35 + (index % 4) * 15}%`, 0],
              opacity: [0, 1, 0],
            }}
            transition={{ duration: 0.7, delay: index * 0.025 }}
          />
        ))}
        <motion.div
          className="absolute inset-x-[8%] h-px"
          style={{ backgroundColor: color }}
          animate={{ top: ["8%", "92%"], opacity: [0, 1, 0] }}
          transition={{ duration: 0.65, ease: "circIn" }}
        />
      </>
    );
  }

  if (type === "Design" || type === "Web") {
    return (
      <>
        {[0, 1, 2, 3].map((index) => (
          <motion.div
            key={index}
            className="absolute left-1/2 top-1/2 border"
            style={{
              width: 90 + index * 70,
              height: 55 + index * 42,
              borderColor: color,
            }}
            initial={{
              x: "-50%",
              y: "-50%",
              scale: 0,
              rotate: index * 20,
              opacity: 1,
            }}
            animate={{ scale: 1.7, rotate: 120 + index * 34, opacity: 0 }}
            transition={{
              duration: 0.75,
              delay: index * 0.045,
              ease: "circOut",
            }}
          />
        ))}
      </>
    );
  }

  if (type === "Hardware") {
    return (
      <>
        {[0, 1, 2, 3, 4, 5].map((index) => (
          <motion.div
            key={index}
            className="absolute left-1/2 top-1/2 border-2 bg-black/[0.45]"
            style={{
              width: 34 + (index % 3) * 22,
              height: 28 + (index % 2) * 24,
              borderColor: color,
            }}
            initial={{
              x: "-50%",
              y: "-50%",
              rotate: index * 30,
              scale: 0,
              opacity: 0,
            }}
            animate={{
              x: `calc(-50% + ${(index % 3) * 86 - 86}px)`,
              y: `calc(-50% + ${Math.floor(index / 3) * 96 - 48}px)`,
              rotate: index % 2 ? -90 : 90,
              scale: [0, 1.15, 0.65],
              opacity: [0, 1, 0],
            }}
            transition={{ duration: 0.7, delay: index * 0.035 }}
          />
        ))}
        <motion.div
          className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 border-[8px] border-dashed"
          style={{ borderColor: color }}
          animate={{ rotate: 180, scale: [0.4, 1.1, 0.2], opacity: [0, 1, 0] }}
          transition={{ duration: 0.72 }}
        />
      </>
    );
  }

  if (type === "Health") {
    return (
      <>
        <motion.svg
          aria-hidden="true"
          viewBox="0 0 320 180"
          preserveAspectRatio="none"
          className="absolute inset-[6%] h-[88%] w-[88%] overflow-visible"
          fill="none"
        >
          <motion.path
            d="M0 92h76l18-42 28 86 24-56 20 28h154"
            stroke={color}
            strokeWidth="5"
            vectorEffect="non-scaling-stroke"
            style={{ filter: `drop-shadow(0 0 8px ${color})` }}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: [0, 1, 1], opacity: [0, 1, 0] }}
            transition={{ duration: 0.72 }}
          />
        </motion.svg>
        {[0, 1, 2, 3].map((index) => (
          <motion.span
            key={index}
            className="absolute h-10 w-3 bg-white"
            style={{
              left: `${22 + index * 19}%`,
              top: `${28 + (index % 2) * 28}%`,
              boxShadow: `0 0 14px ${color}`,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1, 0], opacity: [0, 1, 0], rotate: [0, 90] }}
            transition={{ duration: 0.56, delay: index * 0.08 }}
          >
            <span className="absolute left-1/2 top-1/2 h-3 w-10 -translate-x-1/2 -translate-y-1/2 bg-white" />
          </motion.span>
        ))}
      </>
    );
  }

  if (type === "Mobile") {
    return (
      <>
        {[0, 1, 2, 3, 4].map((index) => (
          <motion.div
            key={index}
            className="absolute top-1/2 h-[70%] w-[15%] -translate-y-1/2 border-2 bg-black/[0.48]"
            style={{ left: `${7 + index * 19}%`, borderColor: color }}
            initial={{ y: index % 2 ? "-140%" : "40%", opacity: 0 }}
            animate={{
              y: [
                index % 2 ? "-140%" : "40%",
                "-50%",
                index % 2 ? "40%" : "-140%",
              ],
              opacity: [0, 1, 0],
              scaleX: [0.65, 1, 0.65],
            }}
            transition={{ duration: 0.72, delay: index * 0.035 }}
          >
            <span className="absolute inset-x-[24%] bottom-[7%] h-1 bg-white" />
          </motion.div>
        ))}
      </>
    );
  }

  if (type === "Game") {
    return (
      <>
        {Array.from({ length: 20 }, (_, index) => {
          const angle = (index / 20) * Math.PI * 2;
          const distance = 80 + (index % 4) * 30;
          return (
            <motion.span
              key={index}
              className="absolute left-1/2 top-1/2 h-3 w-3 border border-white"
              style={{ backgroundColor: index % 3 ? color : "white" }}
              initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
              animate={{
                x: Math.cos(angle) * distance,
                y: Math.sin(angle) * distance,
                scale: [0, 1.4, 0.4],
                opacity: [0, 1, 0],
                rotate: index * 45,
              }}
              transition={{ duration: 0.66, delay: (index % 5) * 0.025 }}
            />
          );
        })}
      </>
    );
  }

  return (
    <>
      {Array.from({ length: 16 }, (_, index) => {
        const angle = (index / 16) * Math.PI * 2;
        return (
          <motion.span
            key={index}
            className="absolute left-1/2 top-1/2 h-2 w-10 origin-left"
            style={{
              background: `linear-gradient(90deg, ${color}, transparent)`,
              rotate: `${angle}rad`,
            }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{
              x: Math.cos(angle) * 170,
              y: Math.sin(angle) * 170,
              scaleX: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 0.7,
              delay: (index % 4) * 0.025,
              ease: "circOut",
            }}
          />
        );
      })}
    </>
  );
};

export const MoveEffectLayer = ({
  event,
  anchors = BATTLE_EFFECT_DEFAULTS,
}: {
  event: ArenaVisualEvent | null;
  anchors?: BattleEffectAnchors;
}) => {
  const color = event ? TYPE_COLORS[event.moveType] ?? "#d8ff36" : "#d8ff36";
  const playerPoint = anchors.player;
  const cpuPoint = anchors.cpu;
  const originPoint = event?.source === "player" ? playerPoint : cpuPoint;
  const targetPoint = event?.source === "player" ? cpuPoint : playerPoint;
  const effectPoint =
    event?.stage === "item" || event?.stage === "switch"
      ? originPoint
      : targetPoint;
  const target = `${targetPoint.x}% ${targetPoint.y}%`;

  return (
    <AnimatePresence>
      {event && (
        <motion.div
          key={event.id}
          data-testid="battle-move-effect"
          className="pointer-events-none absolute inset-0 z-[80] overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.12 }}
        >
          <motion.div
            className="absolute inset-0 bg-black"
            initial={{ opacity: 0 }}
            animate={{
              opacity: event.stage === "impact" ? [0, 0.18, 0] : [0, 0.08, 0],
            }}
            transition={{ duration: 0.65 }}
          />
          {event.stage === "impact" && (
            <motion.div
              className="absolute h-[72%] w-[12%] -translate-x-1/2 -translate-y-1/2 -skew-x-[18deg] bg-white"
              style={{
                left: `${targetPoint.x}%`,
                top: `${targetPoint.y}%`,
                boxShadow: `0 0 60px ${color}`,
              }}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: [0, 1, 0.2], opacity: [0, 0.48, 0] }}
              transition={{ duration: 0.34, ease: "circOut" }}
            />
          )}
          <div className="arena-scanlines absolute inset-0 opacity-45" />
          <motion.div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(circle at ${effectPoint.x}% ${effectPoint.y}%, ${color}55, transparent 31%)`,
            }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.78 }}
          />

          {event.stage === "charge" && (
            <svg
              aria-hidden="true"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="absolute inset-0 h-full w-full overflow-visible"
              fill="none"
            >
              <motion.path
                d={`M${originPoint.x} ${originPoint.y} L${targetPoint.x} ${targetPoint.y}`}
                stroke={color}
                strokeWidth="1.2"
                vectorEffect="non-scaling-stroke"
                style={{ filter: `drop-shadow(0 0 9px ${color})` }}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: [0, 1, 1], opacity: [0, 1, 0] }}
                transition={{ duration: 0.62, ease: "circIn" }}
              />
              <motion.rect
                x={originPoint.x - 0.8}
                y={originPoint.y - 1.4}
                width="2.8"
                height="2.8"
                fill="white"
                initial={{ opacity: 0 }}
                animate={{
                  x: [0, targetPoint.x - originPoint.x],
                  y: [0, targetPoint.y - originPoint.y],
                  opacity: [0, 1, 1, 0],
                  rotate: [0, 90, 180],
                }}
                transition={{ duration: 0.62, ease: "circIn" }}
              />
            </svg>
          )}

          <div
            className="absolute h-[54%] w-[46%] -translate-x-1/2 -translate-y-1/2 overflow-visible"
            style={{ left: `${effectPoint.x}%`, top: `${effectPoint.y}%` }}
          >
            <EffectGeometry type={event.moveType} color={color} />
          </div>

          <motion.div
            className="absolute left-1/2 top-[43%] min-w-[220px] max-w-[78%] -translate-x-1/2 -translate-y-1/2 overflow-hidden border px-5 py-2.5 text-center text-white sm:top-[18%] sm:min-w-[280px] sm:px-7 sm:py-3"
            style={{
              ["--arena-stroke" as string]: `${color}aa`,
              borderColor: `${color}99`,
              background: "rgba(0,0,0,.88)",
              boxShadow: `0 0 34px ${color}24`,
              clipPath: ARENA_CLIP,
            }}
            initial={{ y: -25, opacity: 0, scale: 0.94 }}
            animate={{ y: 0, opacity: [0, 1, 1, 0], scale: [0.94, 1.04, 1, 1] }}
            transition={{ duration: 0.95, times: [0, 0.18, 0.74, 1] }}
          >
            <ArenaFrameArt accent={color} animated />
            <ArenaSigil
              accent={`${color}66`}
              className="absolute -left-4 -top-5 h-20 w-20 opacity-25"
            />
            <span
              className="block font-kode text-[8px] uppercase tracking-[0.2em]"
              style={{ color }}
            >
              {event.stage === "impact"
                ? "Impact confirmed"
                : event.stage === "miss"
                ? "Targeting fault"
                : event.stage === "item"
                ? "Inventory protocol"
                : event.stage === "switch"
                ? "Active slot rerouted"
                : event.stage === "status"
                ? "Status protocol"
                : "Command uplink / executing"}
            </span>
            <strong className="mt-1 block font-telegraf text-xl font-black tracking-[-0.02em] sm:text-3xl">
              {event.moveName}
            </strong>
          </motion.div>

          {event.stage === "impact" && (
            <>
              {[0, 1, 2].map((ring) => (
                <motion.div
                  key={ring}
                  className="absolute h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full border-2"
                  style={{
                    left: target.split(" ")[0],
                    top: target.split(" ")[1],
                    borderColor: color,
                    boxShadow: `0 0 30px ${color}44`,
                  }}
                  initial={{ scale: 0.15, opacity: 0.9 }}
                  animate={{ scale: 1.4 + ring * 0.45, opacity: 0 }}
                  transition={{
                    duration: 0.62,
                    delay: ring * 0.06,
                    ease: "circOut",
                  }}
                />
              ))}
              <motion.div
                className="absolute -translate-x-1/2 -translate-y-1/2 text-center font-telegraf text-6xl font-black text-white sm:text-8xl"
                style={{
                  left: target.split(" ")[0],
                  top: target.split(" ")[1],
                  textShadow: `0 0 28px ${color}`,
                }}
                initial={{ scale: 0.2, opacity: 0, rotate: -8 }}
                animate={{
                  scale: [0.2, 1.25, 1],
                  opacity: [0, 1, 0],
                  rotate: [8, -4, 0],
                }}
                transition={{ duration: 0.65, ease: "circOut" }}
              >
                {event.damage ? `−${event.damage}` : "!"}
                {Boolean(event.hitCount && event.hitCount > 1) && (
                  <span className="absolute -right-12 top-1/2 font-kode text-sm tracking-[0.1em] text-white sm:-right-16 sm:text-xl">
                    ×{event.hitCount}
                  </span>
                )}
              </motion.div>
              {Array.from(
                { length: Math.max(0, (event.hitCount ?? 1) - 1) },
                (_, index) => (
                  <motion.span
                    key={`hit-${index}`}
                    className="absolute h-1.5 w-16"
                    style={{
                      left: target.split(" ")[0],
                      top: target.split(" ")[1],
                      background: `linear-gradient(90deg, transparent, ${color}, white)`,
                    }}
                    initial={{
                      x: index % 2 ? 80 : -80,
                      opacity: 0,
                      rotate: -25 + index * 16,
                    }}
                    animate={{
                      x: 0,
                      opacity: [0, 1, 0],
                      scaleX: [0.4, 1.4, 0.2],
                    }}
                    transition={{ duration: 0.34, delay: 0.1 + index * 0.08 }}
                  />
                )
              )}
            </>
          )}

          {(event.stage === "item" || event.stage === "switch") && (
            <>
              {[0, 1, 2, 3].map((ring) => (
                <motion.div
                  key={ring}
                  className="absolute h-24 w-24 -translate-x-1/2 -translate-y-1/2 border"
                  style={{
                    left: `${originPoint.x}%`,
                    top: `${originPoint.y}%`,
                    borderColor: color,
                  }}
                  initial={{ rotate: ring * 22, scale: 0.2, opacity: 0 }}
                  animate={{
                    rotate: ring % 2 ? -120 : 120,
                    scale: 1 + ring * 0.35,
                    opacity: [0, 0.8, 0],
                  }}
                  transition={{ duration: 0.7, delay: ring * 0.05 }}
                />
              ))}
              <motion.div
                className="absolute h-px w-[42%] -translate-x-1/2 bg-white"
                style={{
                  left: `${originPoint.x}%`,
                  top: `${originPoint.y}%`,
                  boxShadow: `0 0 24px ${color}`,
                }}
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: [0, 1, 0.4], opacity: [0, 1, 0] }}
                transition={{ duration: 0.55 }}
              />
            </>
          )}

          {event.stage === "miss" && (
            <motion.div
              className="absolute -translate-x-1/2 -translate-y-1/2 border-y border-white/[0.40] px-8 py-3 font-kode text-2xl font-bold tracking-[0.28em] text-white sm:px-12 sm:py-4 sm:text-5xl"
              style={{ left: `${targetPoint.x}%`, top: `${targetPoint.y}%` }}
              initial={{ opacity: 0, x: -30, skewX: -12 }}
              animate={{ opacity: [0, 1, 1, 0], x: [30, 0, 0, -30] }}
              transition={{ duration: 0.7 }}
            >
              {event.moveName}
            </motion.div>
          )}

          {event.critical && (
            <>
              <motion.div
                className="absolute inset-0 border-[14px]"
                style={{ borderColor: color }}
                animate={{ opacity: [0, 0.9, 0] }}
                transition={{ duration: 0.32 }}
              />
              <motion.span
                className="absolute bottom-[16%] left-1/2 -translate-x-1/2 bg-white px-4 py-2 font-kode text-[10px] font-bold uppercase tracking-[0.24em] text-black"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: [0, 1, 1], opacity: [0, 1, 0] }}
                transition={{ duration: 0.7 }}
              >
                Critical execution
              </motion.span>
            </>
          )}

          {event.stage === "impact" &&
            (event.executed ||
              event.stab ||
              Boolean(event.effectiveness && event.effectiveness > 1)) && (
              <motion.div
                className="absolute bottom-[10%] left-1/2 flex -translate-x-1/2 gap-1.5 font-kode text-[7px] font-bold uppercase tracking-[0.14em]"
                initial={{ y: 16, opacity: 0 }}
                animate={{ y: 0, opacity: [0, 1, 1, 0] }}
                transition={{ duration: 0.9 }}
              >
                {event.stab && (
                  <span className="border border-white/[0.35] bg-black/[0.75] px-2 py-1 text-white">
                    STAB 1.2×
                  </span>
                )}
                {Boolean(event.effectiveness && event.effectiveness > 1) && (
                  <span className="bg-[#d8ff36] px-2 py-1 text-black">
                    Super {event.effectiveness}×
                  </span>
                )}
                {event.executed && (
                  <span className="bg-red-500 px-2 py-1 text-white">
                    Execute
                  </span>
                )}
              </motion.div>
            )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const ArenaBackdrop = () => (
  <div className="pointer-events-none absolute inset-0 overflow-hidden bg-[#07090d]">
    <div className="arena-grid absolute inset-0 opacity-60" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,rgba(255,255,255,.065),transparent_38%),radial-gradient(circle_at_8%_85%,rgba(8,145,178,.13),transparent_28%),radial-gradient(circle_at_92%_20%,rgba(236,72,153,.11),transparent_28%)]" />
    <div className="arena-scanlines absolute inset-0 opacity-35" />
    <BattlefieldVector playerColor="#0891b2" cpuColor="#ec4899" />
    <motion.div
      className="absolute inset-x-0 top-0 h-16 border-b border-[#d8ff36]/[0.16] bg-gradient-to-b from-[#d8ff36]/[0.05] to-transparent"
      animate={{ y: ["-120%", "110vh"] }}
      transition={{
        duration: 9,
        repeat: Infinity,
        ease: "linear",
        repeatDelay: 5,
      }}
    />
    <motion.div
      className="absolute -right-44 -top-44 h-[520px] w-[520px] opacity-25"
      animate={{ rotate: 360 }}
      transition={{ duration: 46, repeat: Infinity, ease: "linear" }}
    >
      <ArenaSigil accent="#d8ff36" className="h-full w-full" />
    </motion.div>
    <svg
      aria-hidden="true"
      viewBox="0 0 420 780"
      preserveAspectRatio="none"
      className="absolute bottom-0 left-0 h-[78%] w-[34%] opacity-20"
      fill="none"
    >
      <path
        d="M0 760h76l42-80V520l66-76V278l72-78V72L312 0"
        stroke="#41d9ff"
        strokeWidth="1.2"
        vectorEffect="non-scaling-stroke"
      />
      <path
        className="arena-vector-dash"
        d="M0 716h44l42-80V492l66-76V250l72-78V44L268 0"
        stroke="#41d9ff"
        strokeDasharray="4 14"
        vectorEffect="non-scaling-stroke"
      />
      {[120, 260, 410, 566, 690].map((cy) => (
        <circle key={cy} cx="86" cy={cy} r="4" fill="#d8ff36" />
      ))}
    </svg>
    <motion.div
      className="absolute left-[18%] top-[8%] h-72 w-72 rounded-full bg-white/[0.025] blur-3xl"
      animate={{ x: [-30, 55, -30], y: [0, 28, 0], scale: [1, 1.15, 1] }}
      transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
    />
  </div>
);
