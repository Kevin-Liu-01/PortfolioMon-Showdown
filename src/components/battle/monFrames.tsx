import { motion } from "framer-motion";
import React from "react";

interface FrameProps {
  color: string;
}

const AuraFrame = ({ color }: FrameProps) => (
  <div className="pointer-events-none absolute inset-0">
    <motion.div
      className="absolute inset-[-8%] rounded-[40%]"
      style={{ background: `radial-gradient(ellipse at 50% 60%, rgba(${color}, 0.12) 0%, transparent 65%)` }}
      animate={{ scale: [1, 1.06, 1], opacity: [0.6, 1, 0.6] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div
      className="absolute inset-[-4%] rounded-[40%]"
      style={{ boxShadow: `inset 0 0 30px rgba(${color}, 0.15), 0 0 20px rgba(${color}, 0.08)` }}
      animate={{ opacity: [0.4, 0.8, 0.4] }}
      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
    />
  </div>
);

const PlasmaFrame = ({ color }: FrameProps) => (
  <div className="pointer-events-none absolute inset-0 overflow-visible">
    {Array.from({ length: 3 }, (_, i) => (
      <motion.div
        key={i}
        className="absolute inset-[-6%] rounded-[50%]"
        style={{
          border: `1px solid rgba(${color}, ${0.15 + i * 0.05})`,
          filter: `blur(${1 + i}px)`,
        }}
        animate={{ scale: [1, 1.04 + i * 0.02, 1], rotate: [0, i % 2 === 0 ? 3 : -3, 0] }}
        transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
      />
    ))}
    <motion.div
      className="absolute inset-[-3%]"
      style={{ background: `radial-gradient(ellipse at 30% 40%, rgba(${color}, 0.1) 0%, transparent 50%)` }}
      animate={{ opacity: [0.3, 0.7, 0.3] }}
      transition={{ duration: 4, repeat: Infinity }}
    />
  </div>
);

const EmberFrame = ({ color }: FrameProps) => (
  <div className="pointer-events-none absolute inset-0 overflow-visible">
    {Array.from({ length: 6 }, (_, i) => {
      const x = 10 + (i * 80) / 5;
      return (
        <motion.div
          key={i}
          className="absolute h-1 w-1 rounded-full"
          style={{
            left: `${x}%`,
            bottom: "-5%",
            background: `rgba(${color}, 0.8)`,
            boxShadow: `0 0 6px rgba(${color}, 0.6)`,
          }}
          animate={{
            y: [0, -40 - Math.random() * 60],
            x: [(Math.random() - 0.5) * 20, (Math.random() - 0.5) * 30],
            opacity: [0, 0.9, 0],
            scale: [0.5, 1.2, 0],
          }}
          transition={{ duration: 2 + Math.random(), repeat: Infinity, delay: i * 0.4, ease: "easeOut" }}
        />
      );
    })}
    <motion.div
      className="absolute inset-[-5%] rounded-[45%]"
      style={{ boxShadow: `0 0 25px rgba(${color}, 0.1), inset 0 0 25px rgba(${color}, 0.05)` }}
      animate={{ opacity: [0.3, 0.6, 0.3] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
  </div>
);

const PulseRingFrame = ({ color }: FrameProps) => (
  <div className="pointer-events-none absolute inset-0 overflow-visible">
    {Array.from({ length: 2 }, (_, i) => (
      <motion.div
        key={i}
        className="absolute inset-[5%] rounded-[50%]"
        style={{
          border: `1.5px solid rgba(${color}, 0.3)`,
          boxShadow: `0 0 8px rgba(${color}, 0.15)`,
        }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0.2, 0.6] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: i * 1.25 }}
      />
    ))}
    <motion.div
      className="absolute inset-0"
      style={{ background: `radial-gradient(circle at 50% 50%, rgba(${color}, 0.06) 0%, transparent 60%)` }}
    />
  </div>
);

const WispFrame = ({ color }: FrameProps) => (
  <div className="pointer-events-none absolute inset-0 overflow-visible">
    {Array.from({ length: 4 }, (_, i) => {
      const angle = (i / 4) * 360;
      return (
        <motion.div
          key={i}
          className="absolute h-8 w-2 rounded-full"
          style={{
            left: "50%",
            top: "50%",
            background: `linear-gradient(to top, rgba(${color}, 0.4), transparent)`,
            filter: "blur(2px)",
            transformOrigin: "50% 200%",
            rotate: angle,
          }}
          animate={{ opacity: [0.2, 0.6, 0.2], scaleY: [0.8, 1.2, 0.8] }}
          transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
        />
      );
    })}
    <motion.div
      className="absolute inset-[-4%] rounded-full"
      style={{ boxShadow: `0 0 30px rgba(${color}, 0.08)` }}
      animate={{ opacity: [0.3, 0.6, 0.3] }}
      transition={{ duration: 3, repeat: Infinity }}
    />
  </div>
);

const NexusFrame = ({ color }: FrameProps) => (
  <div className="pointer-events-none absolute inset-0">
    <svg viewBox="0 0 100 100" className="absolute inset-[-5%] h-[110%] w-[110%]" preserveAspectRatio="xMidYMid meet">
      <motion.circle
        cx="50" cy="50" r="46"
        fill="none"
        stroke={`rgba(${color}, 0.25)`}
        strokeWidth="0.5"
        strokeDasharray="2 6"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "50px 50px" }}
      />
      <motion.circle
        cx="50" cy="50" r="40"
        fill="none"
        stroke={`rgba(${color}, 0.15)`}
        strokeWidth="0.4"
        strokeDasharray="4 8"
        animate={{ rotate: [360, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "50px 50px" }}
      />
    </svg>
    <motion.div
      className="absolute inset-0"
      style={{ background: `radial-gradient(circle, rgba(${color}, 0.08) 0%, transparent 55%)` }}
      animate={{ opacity: [0.4, 0.8, 0.4] }}
      transition={{ duration: 3.5, repeat: Infinity }}
    />
  </div>
);

const ShimmerFrame = ({ color }: FrameProps) => (
  <div className="pointer-events-none absolute inset-0 overflow-hidden">
    <motion.div
      className="absolute inset-x-[-10%] h-[120%]"
      style={{
        background: `linear-gradient(180deg, transparent 0%, rgba(${color}, 0.08) 45%, rgba(${color}, 0.15) 50%, rgba(${color}, 0.08) 55%, transparent 100%)`,
      }}
      animate={{ y: ["-60%", "60%"] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div
      className="absolute inset-[-3%] rounded-[40%]"
      style={{ boxShadow: `0 0 20px rgba(${color}, 0.06)` }}
    />
  </div>
);

const VortexFrame = ({ color }: FrameProps) => (
  <div className="pointer-events-none absolute inset-0">
    <svg viewBox="0 0 100 100" className="absolute inset-[-5%] h-[110%] w-[110%]" preserveAspectRatio="xMidYMid meet">
      {[0, 90, 180, 270].map((startAngle, i) => {
        const r = 44;
        const a1 = (startAngle * Math.PI) / 180;
        const a2 = ((startAngle + 50) * Math.PI) / 180;
        const d = `M ${50 + r * Math.cos(a1)} ${50 + r * Math.sin(a1)} A ${r} ${r} 0 0 1 ${50 + r * Math.cos(a2)} ${50 + r * Math.sin(a2)}`;
        return (
          <motion.path
            key={i}
            d={d}
            fill="none"
            stroke={`rgba(${color}, ${0.2 + i * 0.05})`}
            strokeWidth="0.8"
            strokeLinecap="round"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 10 - i, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "50px 50px" }}
          />
        );
      })}
    </svg>
  </div>
);

const CrystalFrame = ({ color }: FrameProps) => (
  <div className="pointer-events-none absolute inset-0 overflow-visible">
    {Array.from({ length: 5 }, (_, i) => {
      const angle = (i / 5) * 360;
      const dist = 48;
      const rad = (angle * Math.PI) / 180;
      return (
        <motion.div
          key={i}
          className="absolute h-2 w-1 rounded-sm"
          style={{
            left: `${50 + Math.cos(rad) * dist}%`,
            top: `${50 + Math.sin(rad) * dist}%`,
            background: `rgba(${color}, 0.5)`,
            boxShadow: `0 0 4px rgba(${color}, 0.3)`,
            transform: `translate(-50%, -50%) rotate(${angle + 90}deg)`,
          }}
          animate={{ opacity: [0.3, 0.8, 0.3], scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
        />
      );
    })}
    <motion.div
      className="absolute inset-0"
      style={{ background: `radial-gradient(circle, rgba(${color}, 0.06) 0%, transparent 50%)` }}
    />
  </div>
);

const StormFrame = ({ color }: FrameProps) => (
  <div className="pointer-events-none absolute inset-0 overflow-visible">
    <motion.div
      className="absolute inset-[-8%] rounded-full"
      style={{
        background: `conic-gradient(from 0deg, transparent, rgba(${color}, 0.1), transparent, rgba(${color}, 0.06), transparent)`,
        filter: "blur(4px)",
      }}
      animate={{ rotate: [0, 360] }}
      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
    />
    <motion.div
      className="absolute inset-[-4%] rounded-full"
      style={{
        background: `conic-gradient(from 180deg, transparent, rgba(${color}, 0.08), transparent, rgba(${color}, 0.04), transparent)`,
        filter: "blur(3px)",
      }}
      animate={{ rotate: [360, 0] }}
      transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
    />
  </div>
);

const FlareFrame = ({ color }: FrameProps) => (
  <div className="pointer-events-none absolute inset-0 overflow-visible">
    <motion.div
      className="absolute left-[-10%] top-[20%] h-[60%] w-[120%]"
      style={{
        background: `radial-gradient(ellipse at 50% 50%, rgba(${color}, 0.1) 0%, transparent 60%)`,
        filter: "blur(8px)",
      }}
      animate={{ scaleX: [1, 1.1, 1], opacity: [0.4, 0.7, 0.4] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div
      className="absolute inset-[10%] rounded-full"
      style={{ boxShadow: `0 0 15px rgba(${color}, 0.1)` }}
      animate={{ opacity: [0.3, 0.6, 0.3] }}
      transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
    />
  </div>
);

const SpiritFrame = ({ color }: FrameProps) => (
  <div className="pointer-events-none absolute inset-0 overflow-visible">
    {Array.from({ length: 3 }, (_, i) => (
      <motion.div
        key={i}
        className="absolute rounded-full"
        style={{
          width: 4 + i * 2,
          height: 4 + i * 2,
          background: `rgba(${color}, ${0.4 - i * 0.1})`,
          boxShadow: `0 0 ${6 + i * 2}px rgba(${color}, 0.3)`,
          filter: "blur(1px)",
        }}
        animate={{
          left: [`${20 + i * 15}%`, `${60 - i * 10}%`, `${30 + i * 20}%`, `${20 + i * 15}%`],
          top: [`${70 - i * 10}%`, `${30 + i * 5}%`, `${50}%`, `${70 - i * 10}%`],
          opacity: [0.3, 0.7, 0.5, 0.3],
        }}
        transition={{ duration: 5 + i * 2, repeat: Infinity, ease: "easeInOut" }}
      />
    ))}
    <motion.div
      className="absolute inset-[-5%] rounded-[45%]"
      style={{ boxShadow: `0 0 25px rgba(${color}, 0.06)` }}
      animate={{ opacity: [0.3, 0.5, 0.3] }}
      transition={{ duration: 4, repeat: Infinity }}
    />
  </div>
);

export const FRAME_COMPONENTS: React.FC<FrameProps>[] = [
  AuraFrame,
  PlasmaFrame,
  EmberFrame,
  PulseRingFrame,
  WispFrame,
  NexusFrame,
  ShimmerFrame,
  VortexFrame,
  CrystalFrame,
  StormFrame,
  FlareFrame,
  SpiritFrame,
];

export const FRAME_COUNT = FRAME_COMPONENTS.length;

export function getMonFrame(monId: number): React.FC<FrameProps> {
  const idx = ((monId - 1) % FRAME_COUNT + FRAME_COUNT) % FRAME_COUNT;
  return FRAME_COMPONENTS[idx] ?? FRAME_COMPONENTS[0] ?? AuraFrame;
}

export const MonFrame = ({ monId, color }: { monId: number; color: string }) => {
  const FrameComponent = getMonFrame(monId);
  return <FrameComponent color={color} />;
};
