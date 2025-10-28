import React from "react";
import {
  Sparkles,
  Code,
  Scale,
  Trash2,
  Lightbulb,
  Archive,
  Cpu,
  Server,
  Expand,
  Bookmark,
  Calculator,
  CreditCard,
  FileSearch,
  Eye,
  User,
  Library,
  Mic,
  Paperclip,
  Puzzle,
  Terminal,
  Variable,
  Flame,
  Bubbles,
  BedDouble,
  Zap,
  Trophy, // <-- Added Trophy
} from "lucide-react";

// --- CORE TYPE DEFINITIONS ---

export type StatusEffect = "burn" | "poison" | "sleep" | "stun" | null;

export type AnimationState =
  | "idle"
  | "attack"
  | "hit"
  | "faint"
  | "switchIn"
  | "switchOut";

export type TrainerState = "idle" | "commanding" | "win" | "lose";
export type DialogueState = { player: string; cpu: string };
export type NotificationType =
  | "info"
  | "turn"
  | "effectiveness"
  | "critical"
  | "status"
  | "miss";

export interface NotificationItem {
  id: number;
  message: string;
  type: NotificationType;
}

export interface Effect {
  type: "burn" | "poison" | "sleep" | "stun";
  chance: number;
}

export interface Move {
  name: string;
  power: number;
  type: string;
  accuracy: number;
  pp: number;
  critChance?: number;
  effect?: Effect;
  description: string;
}

export interface BattleReadyMove extends Move {
  currentPp: number;
}

export interface PortfolioMon {
  id: number;
  name: string;
  url: string;
  description: string;
  image: string;
  sprite: JSX.Element;
  type1: string;
  type2?: string;
  hp: number;
  stats: {
    hp: number;
    atk: number;
    def: number;
    spd: number;
  };
  moves: Move[];
}

export interface BattleReadyMon extends PortfolioMon {
  currentHp: number;
  status: StatusEffect;
  statusTurns: number;
  moves: BattleReadyMove[];
}

export interface Item {
  name: string;
  description: string;
  effect: ItemEffect;
}

export interface PlayerInventory {
  [itemName: string]: {
    item: Item;
    quantity: number;
  };
}

export type ItemEffect =
  | { type: "heal"; amount: number }
  | { type: "cureStatus" };

// --- UI SPECIFIC TYPES / STATES ---
export type ActionState = "moves" | "switch" | "items" | "itemTarget";

// --- STYLING & ICONS ---
export const statusEffectStyles: {
  [key in StatusEffect & string]: { bg: string; border: string; text: string };
} = {
  burn: { bg: "bg-orange-600", border: "bg-orange-400", text: "text-white" },
  poison: { bg: "bg-purple-600", border: "bg-purple-400", text: "text-white" },
  sleep: { bg: "bg-gray-500", border: "bg-gray-400", text: "text-white" },
  stun: { bg: "bg-yellow-500", border: "bg-yellow-300", text: "text-black" },
};

export const statusEffectIcons: {
  [key in StatusEffect & string]: JSX.Element;
} = {
  burn: <Flame className="h-3 w-3 sm:h-4 sm:w-4" />,
  poison: <Bubbles className="h-3 w-3 sm:h-4 sm:w-4" />,
  sleep: <BedDouble className="h-3 w-3 sm:h-4 sm:w-4" />,
  stun: <Zap className="h-3 w-3 sm:h-4 sm:w-4" />,
};

// --- ITEM DEFINITIONS ---
export const gameItems: { [key: string]: Item } = {
  "Code Snippet": {
    name: "Code Snippet",
    description: "A small, reusable piece of code. Restores 20 HP.",
    effect: { type: "heal", amount: 20 },
  },
  "API Key": {
    name: "API Key",
    description: "A consumable key that restores 50 HP.",
    effect: { type: "heal", amount: 50 },
  },
  "Server Patch": {
    name: "Server Patch",
    description: "A full server patch that restores 150 HP.",
    effect: { type: "heal", amount: 150 },
  },
  "System Restore": {
    name: "System Restore",
    description: "Restores a Project's HP to its maximum.",
    effect: { type: "heal", amount: 9999 }, // High value acts as a full heal
  },
  Debugger: {
    name: "Debugger",
    description: "A tool that cures any status condition.",
    effect: { type: "cureStatus" },
  },
};

export const initialInventory: PlayerInventory = {
  "Code Snippet": { item: gameItems["Code Snippet"], quantity: 5 },
  "API Key": { item: gameItems["API Key"], quantity: 3 },
  "Server Patch": { item: gameItems["Server Patch"], quantity: 1 },
  "System Restore": { item: gameItems["System Restore"], quantity: 1 },
  Debugger: { item: gameItems["Debugger"], quantity: 2 },
};

// --- PORTFOLIO-MON DATA ---
export const portfolioMonData: PortfolioMon[] = [
  {
    id: 1,
    name: "Podium",
    url: "https://hackprinceton-podium.vercel.app/", // Placeholder URL
    description:
      "An app that streamlines judging & Event Management for Hackathons.",
    image: "/images/podium.png",
    sprite: <Trophy />,
    type1: "Web",
    type2: "Data",
    hp: 290,
    stats: { hp: 290, atk: 115, def: 100, spd: 110 },
    moves: [
      {
        name: "Final Judging",
        power: 100,
        type: "Data",
        accuracy: 0.9,
        pp: 10,
        critChance: 0.15,
        description: "A powerful final decision that hits hard.",
      },
      {
        name: "Live Leaderboard",
        power: 85,
        type: "Web",
        accuracy: 1.0,
        pp: 15,
        critChance: 0.1,
        description: "A real-time update that reliably strikes the foe.",
      },
      {
        name: "Spam Prevention",
        power: 70,
        type: "Web",
        accuracy: 0.95,
        pp: 15,
        critChance: 0.05,
        effect: { type: "stun", chance: 0.3 },
        description: "Blocks the foe's advance, may cause a stun.",
      },
      {
        name: "Score Finalize",
        power: 90,
        type: "Data",
        accuracy: 1.0,
        pp: 10,
        critChance: 0.2,
        description: "Locks in the score with a critical, precise strike.",
      },
    ],
  },
  {
    id: 2, // Re-indexed from 1
    name: "Lumachor",
    url: "https://lumachor.vercel.app/home",
    description:
      "A context engine that gives every user the power of an expert prompt engineer.",
    image: "/images/lumachor.png",
    sprite: <Sparkles />,
    type1: "AI",
    type2: "Web",
    hp: 280,
    stats: { hp: 280, atk: 140, def: 80, spd: 100 },
    moves: [
      {
        name: "Context Injection",
        power: 95,
        type: "AI",
        accuracy: 1.0,
        pp: 10,
        critChance: 0.2,
        description: "A powerful strike with a high critical-hit ratio.",
      },
      {
        name: "Vectorize",
        power: 70,
        type: "Data",
        accuracy: 1.0,
        pp: 20,
        critChance: 0.1,
        description: "Converts data into a solid attack vector.",
      },
      {
        name: "Logic Overload",
        power: 60,
        type: "AI",
        accuracy: 0.9,
        pp: 15,
        critChance: 0.05,
        effect: { type: "stun", chance: 0.4 },
        description: "Confuses the foe with complex data, may cause a stun.",
      },
      {
        name: "API Call",
        power: 50,
        type: "Web",
        accuracy: 1.0,
        pp: 25,
        critChance: 0.05,
        description: "A quick and reliable call that deals damage.",
      },
    ],
  },
  {
    id: 3, // Re-indexed from 2
    name: "HackPrinceton '25F",
    url: "https://hack-princeton-fall-2025-demo.vercel.app/",
    description:
      "Main landing page for HackPrinceton Fall 2025, Princeton's premier hackathon.",
    image: "/images/hackprinceton25f.png",
    sprite: <Code />,
    type1: "Web",
    type2: "Design",
    hp: 270,
    stats: { hp: 270, atk: 115, def: 75, spd: 130 },
    moves: [
      {
        name: "Vercel Deploy",
        power: 70,
        type: "Web",
        accuracy: 1.0,
        pp: 20,
        critChance: 0.1,
        description: "A swift deployment that strikes reliably and fast.",
      },
      {
        name: "Next.js Build",
        power: 90,
        type: "Web",
        accuracy: 0.95,
        pp: 15,
        critChance: 0.15,
        description: "A fast and powerful server-side attack.",
      },
      {
        name: "DDoS Attack",
        power: 80,
        type: "Web",
        accuracy: 0.85,
        pp: 10,
        critChance: 0.1,
        effect: { type: "stun", chance: 0.3 },
        description: "Floods the opponent's server, may cause a stun.",
      },
      {
        name: "Framer Motion",
        power: 75,
        type: "Design",
        accuracy: 0.9,
        pp: 15,
        critChance: 0.1,
        description: "A flashy animation that deals solid damage.",
      },
    ],
  },
  {
    id: 4, // Re-indexed from 3
    name: "Splitway",
    url: "https://splitway.vercel.app/",
    description: "Track expenses and split them with friends.",
    image: "/images/splitway.png",
    sprite: <Expand />,
    type1: "Web",
    type2: "Data",
    hp: 280,
    stats: { hp: 280, atk: 105, def: 100, spd: 95 },
    moves: [
      {
        name: "Calculate Split",
        power: 70,
        type: "Data",
        accuracy: 1.0,
        pp: 20,
        critChance: 0.1,
        description: "Divides the target's focus, causing consistent damage.",
      },
      {
        name: "Firebase Sync",
        power: 85,
        type: "Web",
        accuracy: 0.95,
        pp: 15,
        critChance: 0.1,
        description: "A real-time strike that's hard to counter.",
      },
      {
        name: "Corrupted Data",
        power: 45,
        type: "Data",
        accuracy: 0.9,
        pp: 20,
        critChance: 0.05,
        effect: { type: "poison", chance: 0.4 },
        description: "Injects bad data that slowly drains the foe's HP.",
      },
      {
        name: "Debt Reminder",
        power: 0,
        type: "Web",
        accuracy: 1.0,
        pp: 15,
        critChance: 0.1,
        effect: { type: "stun", chance: 0.3 },
        description: "A nagging reminder that may daze the opponent.",
      },
    ],
  },
  {
    id: 5, // Re-indexed from 4
    name: "Lootbox Simulator",
    url: "https://lootboxsimulator.vercel.app/",
    description:
      "Simulator-style game where users can try opening different kinds of lootboxes.",
    image: "/images/lootboxsimulator.png",
    sprite: <Archive />,
    type1: "Game",
    type2: "Web",
    hp: 250,
    stats: { hp: 250, atk: 145, def: 55, spd: 125 },
    moves: [
      {
        name: "Jackpot",
        power: 120,
        type: "Game",
        accuracy: 0.8,
        pp: 5,
        critChance: 0.1,
        description: "A high-risk, high-reward attack with massive power.",
      },
      {
        name: "Gacha Pull",
        power: 40,
        type: "Game",
        accuracy: 1.0,
        pp: 20,
        critChance: 0.05,
        effect: { type: "stun", chance: 0.2 },
        description: "A weak but flashy attack that might stun the opponent.",
      },
      {
        name: "Legendary Roll",
        power: 95,
        type: "Game",
        accuracy: 0.9,
        pp: 10,
        critChance: 0.25,
        description: "A lucky pull that results in a powerful critical hit.",
      },
      {
        name: "Rage Quit",
        power: 80,
        type: "Game",
        accuracy: 0.9,
        pp: 10,
        critChance: 0.3,
        effect: { type: "burn", chance: 0.25 },
        description: "An angry outburst that can leave the opponent burned.",
      },
    ],
  },
  {
    id: 6, // Re-indexed from 5
    name: "PawPointClicker",
    url: "https://pawpointclicker.vercel.app/",
    description:
      "Cookie Clicker inspired game where you collect Princeton's Paw Points.",
    image: "/images/pawpointclicker.png",
    sprite: <CreditCard />,
    type1: "Game",
    type2: "Web",
    hp: 240,
    stats: { hp: 240, atk: 150, def: 50, spd: 130 },
    moves: [
      {
        name: "Incremental Gain",
        power: 125,
        type: "Game",
        accuracy: 0.8,
        pp: 5,
        critChance: 0.1,
        description: "A massive attack that builds up over time.",
      },
      {
        name: "TigerCard Swipe",
        power: 65,
        type: "Data",
        accuracy: 1.0,
        pp: 25,
        critChance: 0.1,
        description: "A quick swipe that always hits.",
      },
      {
        name: "Prestige",
        power: 100,
        type: "Game",
        accuracy: 0.9,
        pp: 10,
        critChance: 0.25,
        description: "Resets progress for a huge burst of power.",
      },
      {
        name: "Late Meal",
        power: 0,
        type: "Game",
        accuracy: 0.9,
        pp: 10,
        critChance: 0.05,
        effect: { type: "poison", chance: 0.5 },
        description: "A questionable meal that has a high chance to poison.",
      },
    ],
  },
  {
    id: 7, // Re-indexed from 6
    name: "HackPrinceton '25S",
    url: "https://hack-princeton-spring-2025-demo.vercel.app/",
    description:
      "Main landing page for HackPrinceton Spring 2025, Princeton's premier hackathon.",
    image: "/images/hackprinceton25s.png",
    sprite: <Code />,
    type1: "Web",
    type2: "Design",
    hp: 275,
    stats: { hp: 275, atk: 120, def: 80, spd: 115 },
    moves: [
      {
        name: "Responsive Grid",
        power: 75,
        type: "Design",
        accuracy: 1.0,
        pp: 20,
        critChance: 0.1,
        description: "Adapts to the opponent, dealing consistent damage.",
      },
      {
        name: "Component Library",
        power: 85,
        type: "Web",
        accuracy: 1.0,
        pp: 15,
        critChance: 0.1,
        description: "A well-structured attack that's hard to break.",
      },
      {
        name: "Spam Applications",
        power: 60,
        type: "Data",
        accuracy: 0.95,
        pp: 15,
        critChance: 0.1,
        effect: { type: "stun", chance: 0.2 },
        description: "Floods the foe with applications, may cause a stun.",
      },
      {
        name: "Hot Reload",
        power: 70,
        type: "Web",
        accuracy: 0.9,
        pp: 10,
        effect: { type: "burn", chance: 0.2 },
        description: "A rapid update that can burn the opponent's system.",
      },
    ],
  },
  {
    id: 8, // Re-indexed from 7
    name: "HackPrinceton '24F",
    url: "https://hack-princeton-fall-2024-demo.vercel.app/",
    description:
      "Main landing page for HackPrinceton Fall 2024, Princeton's premier hackathon.",
    image: "/images/hackprinceton24f.png",
    sprite: <Code />,
    type1: "Web",
    type2: "Design",
    hp: 280,
    stats: { hp: 280, atk: 125, def: 85, spd: 105 },
    moves: [
      {
        name: "Legacy Code",
        power: 95,
        type: "Web",
        accuracy: 0.9,
        pp: 10,
        critChance: 0.15,
        description:
          "A powerful but slightly unpredictable blast from the past.",
      },
      {
        name: "Sponsor Carousel",
        power: 70,
        type: "Design",
        accuracy: 1.0,
        pp: 15,
        critChance: 0.1,
        description: "A spinning attack that hits multiple times.",
      },
      {
        name: "48 Hour Jam",
        power: 105,
        type: "Game",
        accuracy: 0.85,
        pp: 5,
        critChance: 0.2,
        description: "A frantic burst of energy that hits hard.",
      },
      {
        name: "Code Freeze",
        power: 0,
        type: "Web",
        accuracy: 0.8,
        pp: 10,
        critChance: 0.05,
        effect: { type: "stun", chance: 0.6 },
        description: "A sudden halt to development that may stun the foe.",
      },
    ],
  },
  {
    id: 9, // Re-indexed from 8
    name: "SnellTech",
    url: "https://snelltech.vercel.app/",
    description:
      "Low-cost digital visual acuity exam using the Snellen Eye Chart.",
    image: "/images/snelltech.png",
    sprite: <Eye />,
    type1: "Health",
    type2: "Web",
    hp: 300,
    stats: { hp: 300, atk: 100, def: 100, spd: 85 },
    moves: [
      {
        name: "Acuity Test",
        power: 75,
        type: "Health",
        accuracy: 0.95,
        pp: 15,
        critChance: 0.1,
        description: "Targets the foe's weak points with precision.",
      },
      {
        name: "Glare",
        power: 55,
        type: "Design",
        accuracy: 0.95,
        pp: 15,
        effect: { type: "stun", chance: 0.3 },
        description: "A harsh light that may stun the opponent.",
      },
      {
        name: "Optical Illusion",
        power: 0,
        type: "Design",
        accuracy: 0.9,
        pp: 10,
        effect: { type: "sleep", chance: 0.5 },
        description: "A confusing pattern that might lull the foe to sleep.",
      },
      {
        name: "20/20 Vision",
        power: 95,
        type: "Health",
        accuracy: 1.0,
        pp: 10,
        critChance: 0.25,
        description: "A perfectly aimed strike with a high crit chance.",
      },
    ],
  },
  {
    id: 10, // Re-indexed from 9
    name: "LetMeCook",
    url: "https://letmecook.vercel.app/",
    description: "Scans your refrigerator to generate recipes using ChatGPT.",
    image: "/images/letmecook.png",
    sprite: <Lightbulb />,
    type1: "AI",
    type2: "Mobile",
    hp: 280,
    stats: { hp: 280, atk: 130, def: 70, spd: 100 },
    moves: [
      {
        name: "Flash Fry",
        power: 80,
        type: "AI",
        accuracy: 0.95,
        pp: 15,
        effect: { type: "burn", chance: 0.3 },
        description: "A blast of heat with a chance to burn.",
      },
      {
        name: "GPT Generate",
        power: 95,
        type: "AI",
        accuracy: 0.95,
        pp: 10,
        critChance: 0.15,
        description: "A powerful, creative burst of AI energy.",
      },
      {
        name: "Spoiled Food",
        power: 40,
        type: "Data",
        accuracy: 0.95,
        pp: 15,
        critChance: 0.05,
        effect: { type: "poison", chance: 0.5 },
        description: "A nasty attack with a high chance of poisoning.",
      },
      {
        name: "Gourmet Meal",
        power: 110,
        type: "AI",
        accuracy: 0.85,
        pp: 5,
        critChance: 0.2,
        description: "A perfectly crafted attack that hits incredibly hard.",
      },
    ],
  },
  {
    id: 11, // Re-indexed from 10
    name: "Balladeer",
    url: "https://balladeer.vercel.app/",
    description: "Generates full study guides for literary works.",
    image: "/images/balladeer.jpg",
    sprite: <Library />,
    type1: "AI",
    type2: "Data",
    hp: 260,
    stats: { hp: 260, atk: 135, def: 70, spd: 115 },
    moves: [
      {
        name: "Textual Evidence",
        power: 85,
        type: "Data",
        accuracy: 1.0,
        pp: 15,
        critChance: 0.15,
        description: "A well-supported attack that always finds its mark.",
      },
      {
        name: "Literary Analysis",
        power: 100,
        type: "AI",
        accuracy: 0.9,
        pp: 10,
        critChance: 0.1,
        description: "A deep, insightful attack that cuts through defenses.",
      },
      {
        name: "Writer's Block",
        power: 0,
        type: "AI",
        accuracy: 0.9,
        pp: 10,
        effect: { type: "stun", chance: 0.6 },
        description: "A frustrating move that has a high chance to stun.",
      },
      {
        name: "Plot Twist",
        power: 75,
        type: "Game",
        accuracy: 1.0,
        pp: 15,
        critChance: 0.2,
        description: "An unexpected turn of events with a high crit rate.",
      },
    ],
  },
  {
    id: 12, // Re-indexed from 11
    name: "CompassUSA",
    url: "https://compass-usa.vercel.app/",
    description: "A tool to help immigrants find support and resources.",
    image: "/images/compassusa.jpg",
    sprite: <User />,
    type1: "Web",
    type2: "Data",
    hp: 320,
    stats: { hp: 320, atk: 90, def: 110, spd: 80 },
    moves: [
      {
        name: "Resource Finder",
        power: 75,
        type: "Data",
        accuracy: 1.0,
        pp: 20,
        critChance: 0.1,
        description: "Finds the right resource to strike the enemy.",
      },
      {
        name: "Bureaucracy",
        power: 0,
        type: "Data",
        accuracy: 0.9,
        pp: 15,
        effect: { type: "sleep", chance: 0.4 },
        description: "Buries the opponent in paperwork, may cause sleep.",
      },
      {
        name: "Community Aid",
        power: 80,
        type: "Web",
        accuracy: 1.0,
        pp: 15,
        critChance: 0.1,
        description: "A helping hand that deals reliable damage.",
      },
      {
        name: "Green Card",
        power: 90,
        type: "Data",
        accuracy: 0.9,
        pp: 10,
        critChance: 0.1,
        effect: { type: "stun", chance: 0.3 },
        description: "A powerful move that may leave the foe stunned.",
      },
    ],
  },
  {
    id: 13, // Re-indexed from 12
    name: "ApneaAlert",
    url: "https://apnea-alert-git-main-kevin-liu-01.vercel.app/",
    description: "An affordable wearable sensor to help you sleep soundly.",
    image: "/images/apnea-alert.png",
    sprite: <Cpu />,
    type1: "Health",
    type2: "Hardware",
    hp: 320,
    stats: { hp: 320, atk: 90, def: 115, spd: 75 },
    moves: [
      {
        name: "Sensor Sweep",
        power: 70,
        type: "Hardware",
        accuracy: 1.0,
        pp: 15,
        critChance: 0.1,
        description: "A precise scan that targets weaknesses.",
      },
      {
        name: "Health Alert",
        power: 95,
        type: "Health",
        accuracy: 0.9,
        pp: 10,
        critChance: 0.2,
        description: "A piercing alarm with a high critical-hit ratio.",
      },
      {
        name: "Sleep Study",
        power: 0,
        type: "Health",
        accuracy: 0.9,
        pp: 10,
        critChance: 0.05,
        effect: { type: "sleep", chance: 0.8 },
        description:
          "A non-damaging move that has a very high chance to cause sleep.",
      },
      {
        name: "Short Circuit",
        power: 75,
        type: "Hardware",
        accuracy: 0.95,
        pp: 15,
        effect: { type: "burn", chance: 0.25 },
        description: "A hardware malfunction that can burn the opponent.",
      },
    ],
  },
  {
    id: 14, // Re-indexed from 13
    name: "Iron Triangle",
    url: "https://iron-triangle.vercel.app/",
    description: "U.S. History II Final; Analyzes Military Industrial Complex.",
    image: "/images/irontriangle.png",
    sprite: <Scale />,
    type1: "Data",
    type2: "Design",
    hp: 300,
    stats: { hp: 300, atk: 110, def: 105, spd: 70 },
    moves: [
      {
        name: "MIC Analysis",
        power: 85,
        type: "Data",
        accuracy: 0.95,
        pp: 10,
        critChance: 0.15,
        description: "A critical analysis of the foe's structure.",
      },
      {
        name: "Historical Rebuke",
        power: 90,
        type: "Data",
        accuracy: 0.9,
        pp: 10,
        critChance: 0.1,
        description: "A powerful argument backed by historical precedent.",
      },
      {
        name: "Policy Paper",
        power: 0,
        type: "Data",
        accuracy: 0.85,
        pp: 15,
        critChance: 0.05,
        effect: { type: "sleep", chance: 0.5 },
        description: "A long, dense paper that bores the foe to sleep.",
      },
      {
        name: "Lobbyist",
        power: 75,
        type: "Web",
        accuracy: 1.0,
        pp: 15,
        critChance: 0.1,
        description: "A persuasive move that damages the opponent's will.",
      },
    ],
  },
  {
    id: 15, // Re-indexed from 14
    name: "AdventureGPT",
    url: "https://adventuregpt.vercel.app/",
    description:
      "Generates unique, exciting stories based on a user-inputted prompt.",
    image: "/images/adventuregpt.png",
    sprite: <Sparkles />,
    type1: "AI",
    type2: "Game",
    hp: 260,
    stats: { hp: 260, atk: 140, def: 60, spd: 130 },
    moves: [
      {
        name: "Story Weave",
        power: 80,
        type: "AI",
        accuracy: 1.0,
        pp: 15,
        critChance: 0.1,
        description: "Weaves a complex narrative to attack the foe.",
      },
      {
        name: "Prompt Burst",
        power: 105,
        type: "AI",
        accuracy: 0.9,
        pp: 10,
        critChance: 0.2,
        description: "A sudden, powerful burst of creative energy.",
      },
      {
        name: "Narrative Hook",
        power: 70,
        type: "Game",
        accuracy: 0.95,
        pp: 15,
        critChance: 0.1,
        effect: { type: "stun", chance: 0.3 },
        description: "An engaging hook that may leave the opponent captivated.",
      },
      {
        name: "Deus Ex Machina",
        power: 130,
        type: "Game",
        accuracy: 0.75,
        pp: 5,
        critChance: 0.1,
        description: "An unlikely event that deals massive damage.",
      },
    ],
  },
  {
    id: 16, // Re-indexed from 15
    name: "EditorGPT",
    url: "https://editorgpt.vercel.app/",
    description: "A code editor that allows ChatGPT to review your code.",
    image: "/images/editorgpt.png",
    sprite: <FileSearch />,
    type1: "AI",
    type2: "Web",
    hp: 280,
    stats: { hp: 280, atk: 130, def: 80, spd: 105 },
    moves: [
      {
        name: "Code Review",
        power: 90,
        type: "AI",
        accuracy: 1.0,
        pp: 10,
        critChance: 0.15,
        description: "Finds and exploits a flaw in the opponent's defense.",
      },
      {
        name: "Bug Squish",
        power: 70,
        type: "Web",
        accuracy: 1.0,
        pp: 20,
        critChance: 0.1,
        description: "A satisfyingly effective and reliable attack.",
      },
      {
        name: "Refactor",
        power: 85,
        type: "Web",
        accuracy: 0.9,
        pp: 15,
        critChance: 0.1,
        description: "Restructures the opponent's code base for damage.",
      },
      {
        name: "Syntax Error",
        power: 60,
        type: "Web",
        accuracy: 0.9,
        pp: 15,
        effect: { type: "burn", chance: 0.3 },
        description: "A glaring error that burns the opponent's focus.",
      },
    ],
  },
  {
    id: 17, // Re-indexed from 16
    name: "OMMC Portal",
    url: "https://ommc-test-portal.vercel.app/",
    description: "The official test portal of the OMMC competition.",
    image: "/images/ommcportal.jpg",
    sprite: <Calculator />,
    type1: "Web",
    type2: "Data",
    hp: 290,
    stats: { hp: 290, atk: 110, def: 95, spd: 100 },
    moves: [
      {
        name: "Test Submission",
        power: 90,
        type: "Data",
        accuracy: 1.0,
        pp: 10,
        critChance: 0.1,
        description: "A final, powerful submission of data.",
      },
      {
        name: "Proctor Mode",
        power: 70,
        type: "Web",
        accuracy: 0.9,
        pp: 15,
        critChance: 0.05,
        effect: { type: "stun", chance: 0.4 },
        description: "An intimidating gaze that may paralyze the opponent.",
      },
      {
        name: "Score Calculation",
        power: 95,
        type: "Data",
        accuracy: 0.95,
        pp: 10,
        critChance: 0.2,
        description: "A swift calculation that results in a critical hit.",
      },
      {
        name: "Server Crash",
        power: 110,
        type: "Web",
        accuracy: 0.8,
        pp: 5,
        description: "A devastating crash that deals immense damage.",
      },
    ],
  },
  {
    id: 18, // Re-indexed from 17
    name: "OMMC Sample Portal",
    url: "https://ommc-sample-portal.vercel.app/",
    description: "The official sample test portal of OMMC.",
    image: "/images/ommcsampleportal.png",
    sprite: <Calculator />,
    type1: "Web",
    type2: "Data",
    hp: 270,
    stats: { hp: 270, atk: 105, def: 75, spd: 120 },
    moves: [
      {
        name: "Practice Round",
        power: 65,
        type: "Data",
        accuracy: 1.0,
        pp: 25,
        critChance: 0.1,
        description: "A quick and reliable attack for warming up.",
      },
      {
        name: "Sample Questions",
        power: 80,
        type: "Data",
        accuracy: 0.95,
        pp: 15,
        critChance: 0.1,
        description: "Presents tricky questions to damage the opponent.",
      },
      {
        name: "Mock Test",
        power: 90,
        type: "Web",
        accuracy: 0.9,
        pp: 10,
        critChance: 0.15,
        description: "A simulated attack that packs a real punch.",
      },
      {
        name: "Toxic Comment",
        power: 0,
        type: "Web",
        accuracy: 0.9,
        pp: 10,
        effect: { type: "poison", chance: 0.5 },
        description: "Leaves a nasty comment that may poison the foe.",
      },
    ],
  },
  {
    id: 19, // Re-indexed from 18
    name: "Enkrateia",
    url: "https://enkrateia.vercel.app/",
    description:
      "An application that accesses the ChatGPT 3.5 and GPT-4 models.",
    image: "/images/enkrateia.png",
    sprite: <Terminal />,
    type1: "AI",
    type2: "Web",
    hp: 250,
    stats: { hp: 250, atk: 150, def: 55, spd: 135 },
    moves: [
      {
        name: "GPT-4 Query",
        power: 110,
        type: "AI",
        accuracy: 0.9,
        pp: 5,
        critChance: 0.15,
        description: "A costly but devastatingly powerful API call.",
      },
      {
        name: "API Overload",
        power: 80,
        type: "Web",
        accuracy: 0.9,
        pp: 10,
        critChance: 0.1,
        effect: { type: "burn", chance: 0.3 },
        description: "Floods the API, causing damage and a potential burn.",
      },
      {
        name: "Model Fine-Tune",
        power: 95,
        type: "AI",
        accuracy: 0.95,
        pp: 10,
        critChance: 0.2,
        description: "A highly-tuned query that hits for critical damage.",
      },
      {
        name: "Token Stream",
        power: 70,
        type: "Data",
        accuracy: 1.0,
        pp: 20,
        critChance: 0.1,
        description: "A rapid stream of data that chips away at the foe.",
      },
    ],
  },
  {
    id: 20, // Re-indexed from 19
    name: "HD Transcribe",
    url: "https://hd-transcribe.vercel.app",
    description:
      "Accesses a novel speech model for patients with Huntington's Disease.",
    image: "/images/hd-transcribe.png",
    sprite: <Mic />,
    type1: "AI",
    type2: "Health",
    hp: 325,
    stats: { hp: 325, atk: 95, def: 100, spd: 75 },
    moves: [
      {
        name: "Speech Recognition",
        power: 85,
        type: "AI",
        accuracy: 1.0,
        pp: 15,
        critChance: 0.1,
        description: "Perfectly understands and counters the foe's pattern.",
      },
      {
        name: "Acoustic Model",
        power: 90,
        type: "Hardware",
        accuracy: 0.95,
        pp: 10,
        critChance: 0.15,
        description: "A sound-based attack that resonates for high damage.",
      },
      {
        name: "Data Breach",
        power: 60,
        type: "Data",
        accuracy: 0.95,
        pp: 15,
        critChance: 0.1,
        effect: { type: "poison", chance: 0.3 },
        description: "Uses sensitive data to inflict a lasting ailment.",
      },
      {
        name: "Sonic Boom",
        power: 100,
        type: "Hardware",
        accuracy: 0.9,
        pp: 5,
        critChance: 0.1,
        description: "A powerful blast of sound waves.",
      },
    ],
  },
  {
    id: 21, // Re-indexed from 20
    name: "OMMC",
    url: "https://www.ommcofficial.org",
    description:
      "The official website of the Online Monmouth Math Competition.",
    image: "/images/ommc.png",
    sprite: <Variable />,
    type1: "Web",
    type2: "Design",
    hp: 300,
    stats: { hp: 300, atk: 105, def: 105, spd: 90 },
    moves: [
      {
        name: "Community Hub",
        power: 75,
        type: "Web",
        accuracy: 1.0,
        pp: 15,
        critChance: 0.1,
        description: "A welcoming attack that rallies support.",
      },
      {
        name: "Competition Day",
        power: 95,
        type: "Game",
        accuracy: 0.9,
        pp: 10,
        critChance: 0.2,
        description: "A high-stakes attack with critical potential.",
      },
      {
        name: "Sponsor Plea",
        power: 65,
        type: "Design",
        accuracy: 0.95,
        pp: 20,
        critChance: 0.05,
        effect: { type: "stun", chance: 0.25 },
        description: "A persuasive visual appeal that may daze the opponent.",
      },
      {
        name: "Problem Writing",
        power: 85,
        type: "Data",
        accuracy: 0.95,
        pp: 10,
        critChance: 0.1,
        description: "Constructs a difficult problem to attack the foe.",
      },
    ],
  },
  {
    id: 22, // Re-indexed from 21
    name: "OMMC Atlas",
    url: "https://ommc-atlas.vercel.app/",
    description: "The fullstack database for all OMMC questions.",
    image: "/images/ommc-atlas.png",
    sprite: <Server />,
    type1: "Data",
    type2: "Web",
    hp: 290,
    stats: { hp: 290, atk: 110, def: 100, spd: 100 },
    moves: [
      {
        name: "Database Query",
        power: 90,
        type: "Data",
        accuracy: 1.0,
        pp: 10,
        critChance: 0.1,
        description: "A powerful and precise data-driven strike.",
      },
      {
        name: "Full-Stack Build",
        power: 85,
        type: "Web",
        accuracy: 1.0,
        pp: 15,
        critChance: 0.1,
        description: "A comprehensive attack hitting front and back.",
      },
      {
        name: "Data Corruption",
        power: 70,
        type: "Data",
        accuracy: 0.9,
        pp: 15,
        effect: { type: "poison", chance: 0.3 },
        description: "Floods the target with bad data, potentially poisoning.",
      },
      {
        name: "Admin Panel",
        power: 70,
        type: "Web",
        accuracy: 1.0,
        pp: 20,
        critChance: 0.1,
        description: "Asserts control, dealing moderate damage.",
      },
    ],
  },
  {
    id: 23, // Re-indexed from 22
    name: "RecyclAIble",
    url: "https://recyclaible.vercel.app/",
    description:
      "Hackathon project for smart recycling. Won 1st in Hardware at PennApps XXIII!",
    image: "/images/recyclaible.png",
    sprite: <Trash2 />,
    type1: "AI",
    type2: "Hardware",
    hp: 290,
    stats: { hp: 290, atk: 135, def: 90, spd: 80 },
    moves: [
      {
        name: "Object Detection",
        power: 95,
        type: "AI",
        accuracy: 0.95,
        pp: 10,
        critChance: 0.15,
        description: "An advanced AI attack that rarely misses.",
      },
      {
        name: "Overheat",
        power: 80,
        type: "Hardware",
        accuracy: 0.9,
        pp: 15,
        critChance: 0.1,
        effect: { type: "burn", chance: 0.4 },
        description: "A risky move with a high chance to burn the opponent.",
      },
      {
        name: "OpenCV",
        power: 80,
        type: "AI",
        accuracy: 1.0,
        pp: 15,
        critChance: 0.1,
        description: "Uses computer vision to find and strike weak points.",
      },
      {
        name: "Shred",
        power: 70,
        type: "Hardware",
        accuracy: 0.95,
        pp: 15,
        description: "Shreds the opponent's defenses.",
      },
    ],
  },
  {
    id: 24, // Re-indexed from 23
    name: "PlantSTEM",
    url: "https://plant-stem.vercel.app/",
    description: "A website to help students learn about Math and Physics.",
    image: "/images/plantstem.png",
    sprite: <Bookmark />,
    type1: "Web",
    type2: "Data",
    hp: 280,
    stats: { hp: 280, atk: 110, def: 90, spd: 110 },
    moves: [
      {
        name: "Physics Lesson",
        power: 80,
        type: "Data",
        accuracy: 1.0,
        pp: 15,
        critChance: 0.1,
        description: "Uses the laws of physics to deal damage.",
      },
      {
        name: "Chess Strategy",
        power: 70,
        type: "Game",
        accuracy: 0.9,
        pp: 15,
        critChance: 0.1,
        effect: { type: "stun", chance: 0.3 },
        description: "A complex maneuver that outsmarts and stuns the foe.",
      },
      {
        name: "Study Session",
        power: 95,
        type: "Data",
        accuracy: 0.9,
        pp: 10,
        critChance: 0.15,
        description: "An intense session that overloads the opponent.",
      },
      {
        name: "Pop Quiz",
        power: 75,
        type: "Data",
        accuracy: 1.0,
        pp: 15,
        critChance: 0.25,
        description: "A surprise attack with a high critical-hit ratio.",
      },
    ],
  },
  {
    id: 25, // Re-indexed from 24
    name: "Tutorial",
    url: "https://tutorial-nu.vercel.app/",
    description: "An app to help tutors and pupils connect.",
    image: "/images/tutorial.png",
    sprite: <Paperclip />,
    type1: "Web",
    type2: "Data",
    hp: 290,
    stats: { hp: 290, atk: 110, def: 95, spd: 105 },
    moves: [
      {
        name: "Tutor Connect",
        power: 80,
        type: "Web",
        accuracy: 1.0,
        pp: 15,
        critChance: 0.1,
        description: "Forms a connection to deal reliable damage.",
      },
      {
        name: "Pupil Search",
        power: 75,
        type: "Data",
        accuracy: 0.95,
        pp: 20,
        critChance: 0.1,
        description: "Searches for a weakness and strikes.",
      },
      {
        name: "Ad Spam",
        power: 65,
        type: "Web",
        accuracy: 0.9,
        pp: 15,
        effect: { type: "poison", chance: 0.3 },
        description: "Spams the opponent with ads, may inflict poison.",
      },
      {
        name: "Homework",
        power: 60,
        type: "Data",
        accuracy: 0.9,
        pp: 15,
        critChance: 0.05,
        effect: { type: "poison", chance: 0.25 },
        description: "Assigns tedious work that drains the foe over time.",
      },
    ],
  },
  {
    id: 26, // Re-indexed from 25
    name: "Satellite Crafter",
    url: "https://satellite-crafter.vercel.app/",
    description: "My first app! A game to create satellites from parts.",
    image: "/images/satellitecrafter.png",
    sprite: <Puzzle />,
    type1: "Game",
    type2: "Hardware",
    hp: 260,
    stats: { hp: 260, atk: 125, def: 65, spd: 115 },
    moves: [
      {
        name: "First Commit",
        power: 65,
        type: "Web",
        accuracy: 1.0,
        pp: 25,
        critChance: 0.2,
        description: "A foundational attack that often crits.",
      },
      {
        name: "Component Assembly",
        power: 80,
        type: "Hardware",
        accuracy: 0.95,
        pp: 15,
        critChance: 0.1,
        description: "Builds up parts for a solid hardware attack.",
      },
      {
        name: "Orbital Launch",
        power: 115,
        type: "Hardware",
        accuracy: 0.8,
        pp: 5,
        critChance: 0.1,
        description: "A powerful, all-or-nothing launch attack.",
      },
      {
        name: "Spaghetti Code",
        power: 70,
        type: "Game",
        accuracy: 0.9,
        pp: 10,
        critChance: 0.1,
        effect: { type: "stun", chance: 0.3 },
        description: "A messy but effective attack that may confuse and stun.",
      },
    ],
  },
  {
    id: 27, // Re-indexed from 26
    name: "PortfolioMon",
    url: "https://github.com/Kevin-Liu-01/PortfolioMon-Showdown",
    description:
      "This portfolio website, built as a Pokemon Showdown-inspired turn-based fighting game.",
    image: "/images/kevinportfolio.png",
    sprite: <Code />,
    type1: "Web",
    type2: "Game",
    hp: 310,
    stats: { hp: 310, atk: 110, def: 110, spd: 110 },
    moves: [
      {
        name: "Source Code",
        power: 95,
        type: "Data",
        accuracy: 1.0,
        pp: 10,
        critChance: 0.15,
        description:
          "Reveals the underlying code, a powerful and precise strike.",
      },
      {
        name: "UI Overhaul",
        power: 80,
        type: "Design",
        accuracy: 1.0,
        pp: 15,
        critChance: 0.1,
        description: "A visually stunning move that deals consistent damage.",
      },
      {
        name: "Game Logic",
        power: 85,
        type: "Game",
        accuracy: 0.95,
        pp: 15,
        critChance: 0.1,
        description:
          "Executes complex game logic to outsmart and damage the foe.",
      },
      {
        name: "Responsive Breakpoint",
        power: 70,
        type: "Web",
        accuracy: 1.0,
        pp: 20,
        description: "Adapts its structure to always land a solid hit.",
      },
    ],
  },
];

// --- GAME LOGIC & UTILITIES ---

export const typeChart: { [attacker: string]: { [defender: string]: number } } =
  {
    AI: {
      Data: 2,
      Web: 0.5,
      Hardware: 0.5,
      Game: 2,
      Health: 1,
      Design: 1,
      Mobile: 1,
    },
    Data: {
      AI: 0.5,
      Design: 2,
      Health: 2,
      Game: 0.5,
      Web: 1,
      Hardware: 1,
      Mobile: 1,
    },
    Web: {
      Mobile: 2,
      AI: 2,
      Design: 0.5,
      Data: 0.5,
      Hardware: 1,
      Game: 1,
      Health: 1,
    },
    Design: {
      Web: 2,
      Game: 2,
      Data: 0.5,
      AI: 1,
      Hardware: 1,
      Health: 1,
      Mobile: 1,
    },
    Hardware: {
      AI: 2,
      Health: 0.5,
      Mobile: 2,
      Web: 0.5,
      Game: 1,
      Data: 1,
      Design: 1,
    },
    Health: {
      Hardware: 2,
      Game: 0.5,
      Data: 0.5,
      AI: 1,
      Web: 1,
      Design: 1,
      Mobile: 1,
    },
    Mobile: {
      Web: 0.5,
      Hardware: 0.5,
      Game: 2,
      Design: 2,
      AI: 1,
      Data: 1,
      Health: 1,
    },
    Game: {
      AI: 0.5,
      Design: 0.5,
      Health: 2,
      Data: 2,
      Mobile: 0.5,
      Web: 1,
      Hardware: 1,
    },
  };

export const getTypeEffectiveness = (
  moveType: string,
  defender: BattleReadyMon
): { multiplier: number; message: string } => {
  if (!typeChart[moveType]) return { multiplier: 1, message: "" };

  let multiplier = 1;
  const effectiveness1 = typeChart[moveType][defender.type1] ?? 1;
  multiplier *= effectiveness1;

  if (defender.type2) {
    const effectiveness2 = typeChart[moveType][defender.type2] ?? 1;
    multiplier *= effectiveness2;
  }

  let message = "";
  if (multiplier > 1) message = "It's super effective!";
  if (multiplier < 1 && multiplier > 0) message = "It's not very effective...";
  if (multiplier === 0) message = "It had no effect...";

  return { multiplier, message };
};
