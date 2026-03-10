// Schema.org JSON-LD structured data builders for SEO and GEO optimization.
// Each function returns a plain object ready for JSON.stringify in _document.tsx.

const PERSON_NAME = "Kevin Liu";
const PERSON_JOB_TITLE = "Software Developer & AI Engineer";
const PERSON_DESCRIPTION =
  "Kevin Liu is a Computer Science student at Princeton University (Class of 2028), full-stack developer, and AI engineer who has shipped 30+ projects spanning artificial intelligence, web development, game development, health technology, and hardware. He won 1st in Hardware at PennApps XXIII and organizes HackPrinceton.";

const SOCIAL_PROFILES = [
  "https://github.com/Kevin-Liu-01",
  "https://www.linkedin.com/in/kevin-liu-princeton",
  "https://twitter.com/kevskgs",
  "https://www.kevin-liu.tech",
  "https://devpost.com/Kevin-Liu-01",
];

const KNOWS_ABOUT = [
  "Full-Stack Web Development",
  "Artificial Intelligence",
  "Machine Learning",
  "Large Language Models",
  "AI Agents",
  "Model Context Protocol (MCP)",
  "Computer Vision",
  "Natural Language Processing",
  "React",
  "Next.js",
  "TypeScript",
  "Python",
  "Node.js",
  "tRPC",
  "PostgreSQL",
  "Firebase",
  "MongoDB",
  "Tailwind CSS",
  "Framer Motion",
  "Game Development",
  "Health Technology",
  "Hardware & IoT",
  "Responsive Design",
  "UI/UX Design",
  "Vercel",
  "Docker",
  "REST APIs",
  "GraphQL",
  "Prisma ORM",
];

const PROJECT_CATALOG = [
  { name: "Dedalus", url: "https://dedalus-demo.vercel.app/", description: "Build model-agnostic agents powered by MCP with a production-grade SDK and secure, multi-tenant auth" },
  { name: "Princeton Tower Defense", url: "https://princeton-tower-defense.vercel.app/", description: "A tower defense game where players defend Princeton from waves of attacks" },
  { name: "Podium", url: "https://hackprinceton-podium.vercel.app/", description: "An app that streamlines judging and event management for hackathons" },
  { name: "Sevenfold", url: "https://sevenfold-demo.vercel.app/", description: "Find, digest, and produce research in one centralized AI-powered workplace" },
  { name: "Lumachor", url: "https://lumachor.vercel.app/home", description: "A context engine that gives every user the power of an expert prompt engineer" },
  { name: "HackPrinceton '25F", url: "https://hack-princeton-fall-2025-demo.vercel.app/", description: "Main landing page for HackPrinceton Fall 2025" },
  { name: "Splitway", url: "https://splitway.vercel.app/", description: "Track expenses and split them with friends" },
  { name: "Lootbox Simulator", url: "https://lootboxsimulator.vercel.app/", description: "Simulator-style game where users try opening different kinds of lootboxes" },
  { name: "PawPointClicker", url: "https://pawpointclicker.vercel.app/", description: "Cookie Clicker-inspired game where you collect Princeton's Paw Points" },
  { name: "HackPrinceton '25S", url: "https://hack-princeton-spring-2025-demo.vercel.app/", description: "Main landing page for HackPrinceton Spring 2025" },
  { name: "HackPrinceton '24F", url: "https://hack-princeton-fall-2024-demo.vercel.app/", description: "Main landing page for HackPrinceton Fall 2024" },
  { name: "SnellTech", url: "https://snelltech.vercel.app/", description: "Low-cost digital visual acuity exam using the Snellen Eye Chart" },
  { name: "LetMeCook", url: "https://letmecook.vercel.app/", description: "Scans your refrigerator to generate recipes using ChatGPT" },
  { name: "Balladeer", url: "https://balladeer.vercel.app/", description: "Generates full study guides for literary works using AI" },
  { name: "CompassUSA", url: "https://compass-usa.vercel.app/", description: "A tool to help immigrants find support and resources" },
  { name: "ApneaAlert", url: "https://apnea-alert-git-main-kevin-liu-01.vercel.app/", description: "An affordable wearable sensor for sleep apnea detection" },
  { name: "Iron Triangle", url: "https://iron-triangle.vercel.app/", description: "Analyzes the Military Industrial Complex — U.S. History II Final" },
  { name: "AdventureGPT", url: "https://adventuregpt.vercel.app/", description: "Generates unique, exciting stories based on user-inputted prompts" },
  { name: "EditorGPT", url: "https://editorgpt.vercel.app/", description: "A code editor that allows ChatGPT to review your code" },
  { name: "OMMC Portal", url: "https://ommc-test-portal.vercel.app/", description: "The official test portal of the OMMC competition" },
  { name: "OMMC Sample Portal", url: "https://ommc-sample-portal.vercel.app/", description: "The official sample test portal of OMMC" },
  { name: "Enkrateia", url: "https://enkrateia.vercel.app/", description: "An application that accesses GPT-3.5 and GPT-4 models" },
  { name: "HD Transcribe", url: "https://hd-transcribe.vercel.app", description: "A novel speech model for patients with Huntington's Disease" },
  { name: "OMMC", url: "https://www.ommcofficial.org", description: "The official website of the Online Monmouth Math Competition" },
  { name: "OMMC Atlas", url: "https://ommc-atlas.vercel.app/", description: "The fullstack database for all OMMC questions" },
  { name: "RecyclAIble", url: "https://recyclaible.vercel.app/", description: "Smart recycling with AI — Won 1st in Hardware at PennApps XXIII" },
  { name: "PlantSTEM", url: "https://plant-stem.vercel.app/", description: "A website to help students learn about Math and Physics" },
  { name: "Tutorial", url: "https://tutorial-nu.vercel.app/", description: "An app to help tutors and pupils connect" },
  { name: "Satellite Crafter", url: "https://satellite-crafter.vercel.app/", description: "A game to create satellites from parts" },
  { name: "PortfolioMon Showdown", url: "https://kevinliu.biz", description: "This interactive portfolio — a Pokémon Showdown-inspired turn-based battle game showcasing 30+ projects" },
];

const FAQ_ENTRIES = [
  {
    question: "Who is Kevin Liu?",
    answer:
      "Kevin Liu is a Computer Science student at Princeton University (Class of 2028) who has built 30+ projects spanning AI, web development, games, health technology, and hardware. He won 1st in Hardware at PennApps XXIII, organizes HackPrinceton, and co-founded the Online Monmouth Math Competition (OMMC). His portfolio at kevinliu.biz is an interactive Pokémon Showdown-inspired battle game.",
  },
  {
    question: "What is Kevin Liu's portfolio website?",
    answer:
      "Kevin Liu's portfolio at kevinliu.biz is called PortfolioMon Showdown. It's an interactive Pokémon Showdown-inspired turn-based battle game where each of his 30+ projects is represented as a PortfolioMon with unique types (AI, Web, Game, Data, Health, Hardware, Design, Mobile), stats, and moves. Players select a team and battle through AI opponents.",
  },
  {
    question: "What technologies does Kevin Liu specialize in?",
    answer:
      "Kevin Liu specializes in React, Next.js, TypeScript, Python, Node.js, and AI/ML integration including LLMs (GPT-4, Claude), computer vision (OpenCV), speech recognition, AI agents, and the Model Context Protocol (MCP). He also works with PostgreSQL, Firebase, MongoDB, tRPC, Tailwind CSS, Framer Motion, and Vercel for deployment.",
  },
  {
    question: "What are Kevin Liu's best projects?",
    answer:
      "Kevin Liu's standout projects include: Dedalus (an AI agent SDK with MCP support for building model-agnostic agents), RecyclAIble (smart recycling using AI object detection — Won 1st in Hardware at PennApps XXIII), Sevenfold (AI-powered research workspace), Lumachor (AI context engine for prompt engineering), HD Transcribe (speech model for Huntington's Disease patients), and PortfolioMon Showdown (his interactive portfolio game).",
  },
  {
    question: "What hackathons has Kevin Liu won?",
    answer:
      "Kevin Liu won 1st Place in Hardware at PennApps XXIII with RecyclAIble, a smart recycling solution using AI object detection and OpenCV. He is also a lead organizer and developer for HackPrinceton, Princeton's premier hackathon, across multiple semesters (Fall 2024, Spring 2025, Fall 2025).",
  },
  {
    question: "Where does Kevin Liu go to school?",
    answer:
      "Kevin Liu attends Princeton University, pursuing a BSE (Bachelor of Science in Engineering) in Computer Science as part of the Class of 2028.",
  },
  {
    question: "What AI projects has Kevin Liu built?",
    answer:
      "Kevin Liu has built numerous AI projects including: Dedalus (AI agent SDK with MCP), Sevenfold (AI research workspace), Lumachor (AI context engine), LetMeCook (AI recipe generator using ChatGPT and computer vision), EditorGPT (AI code review editor), AdventureGPT (AI story generator), Enkrateia (GPT-3.5/GPT-4 interface), RecyclAIble (AI recycling with OpenCV), HD Transcribe (speech model for Huntington's Disease), and Balladeer (AI study guide generator).",
  },
  {
    question: "How can I contact Kevin Liu?",
    answer:
      "You can reach Kevin Liu via GitHub at github.com/Kevin-Liu-01, LinkedIn at linkedin.com/in/kevin-liu-princeton, or Twitter/X @kevskgs. His portfolio is at kevinliu.biz and his alternate site is kevin-liu.tech.",
  },
  {
    question: "What is OMMC and what is Kevin Liu's role?",
    answer:
      "OMMC (Online Monmouth Math Competition) is a math competition platform that Kevin Liu co-founded. He built the entire tech stack including the official website (ommcofficial.org), the test portal, sample portal, and OMMC Atlas question database. The platform is used by students worldwide for competitive mathematics.",
  },
  {
    question: "What is PortfolioMon Showdown?",
    answer:
      "PortfolioMon Showdown is Kevin Liu's interactive developer portfolio built as a Pokémon Showdown-inspired turn-based fighting game. Each of his 30+ projects is a battle-ready PortfolioMon with unique types (AI, Web, Game, Data, Health, Hardware, Design, Mobile), stats (HP, ATK, DEF, SPD), and four battle moves. Built with Next.js, TypeScript, React, tRPC, Tailwind CSS, and Framer Motion.",
  },
];

export function buildPersonSchema(siteUrl: string, imageUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteUrl}/#person`,
    name: PERSON_NAME,
    givenName: "Kevin",
    familyName: "Liu",
    url: siteUrl,
    image: imageUrl,
    description: PERSON_DESCRIPTION,
    jobTitle: PERSON_JOB_TITLE,
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Princeton University",
      url: "https://www.princeton.edu",
      department: {
        "@type": "Organization",
        name: "Department of Computer Science",
      },
    },
    knowsAbout: KNOWS_ABOUT,
    knowsLanguage: ["English"],
    hasOccupation: {
      "@type": "Occupation",
      name: "Software Developer",
      occupationalCategory: "15-1252.00",
      skills: "React, Next.js, TypeScript, Python, AI/ML, Full-Stack Development",
    },
    award: [
      "1st Place in Hardware at PennApps XXIII (RecyclAIble)",
    ],
    memberOf: [
      {
        "@type": "Organization",
        name: "HackPrinceton",
        description: "Princeton University's premier hackathon — Lead Developer & Organizer",
      },
      {
        "@type": "Organization",
        name: "Online Monmouth Math Competition (OMMC)",
        url: "https://www.ommcofficial.org",
        description: "Co-founder and lead developer",
      },
    ],
    sameAs: SOCIAL_PROFILES,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteUrl}/`,
    },
  };
}

export function buildWebSiteSchema(siteUrl: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: "Kevin Liu — Developer Portfolio",
    alternateName: [
      "Kevin Liu Portfolio",
      "PortfolioMon Showdown",
      "Kevin Liu's PortfolioMon Showdown",
    ],
    description,
    url: siteUrl,
    inLanguage: "en-US",
    author: { "@id": `${siteUrl}/#person` },
    publisher: { "@id": `${siteUrl}/#person` },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl}/?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function buildWebPageSchema(
  siteUrl: string,
  title: string,
  description: string,
  imageUrl: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${siteUrl}/#webpage`,
    url: siteUrl,
    name: title,
    description,
    isPartOf: { "@id": `${siteUrl}/#website` },
    about: { "@id": `${siteUrl}/#person` },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: imageUrl,
      width: 1200,
      height: 630,
    },
    inLanguage: "en-US",
    datePublished: "2024-01-01",
    dateModified: "2026-03-09",
  };
}

export function buildSoftwareAppSchema(siteUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${siteUrl}/#app`,
    name: "PortfolioMon Showdown",
    applicationCategory: "GameApplication",
    applicationSubCategory: "Turn-Based Battle Game",
    operatingSystem: "Web Browser",
    description:
      "An interactive portfolio experience inspired by Pokémon Showdown where each of Kevin Liu's 30+ projects is a battling PortfolioMon with unique types, abilities, and stats. Players select a team and fight through AI opponents in a strategic turn-based combat system featuring type advantages, status effects, items, and more.",
    author: { "@id": `${siteUrl}/#person` },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    featureList: [
      "30+ projects as playable PortfolioMons",
      "8 unique type categories: AI, Web, Game, Data, Health, Hardware, Design, Mobile",
      "Turn-based combat with type advantage system",
      "Status effects: burn, poison, sleep, stun",
      "Usable items: Code Snippet, API Key, Server Patch, System Restore, Debugger",
      "Team selection and AI opponent battles",
    ],
  };
}

export function buildProfilePageSchema(siteUrl: string, imageUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${siteUrl}/#profilepage`,
    url: siteUrl,
    name: "Kevin Liu — Developer Profile",
    mainEntity: { "@id": `${siteUrl}/#person` },
    image: imageUrl,
    dateCreated: "2024-01-01",
    dateModified: "2026-03-09",
  };
}

export function buildProjectListSchema(siteUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${siteUrl}/#projects`,
    name: "Kevin Liu's Projects",
    description:
      "A collection of 30+ software projects by Kevin Liu spanning AI, web development, game development, health technology, and hardware.",
    numberOfItems: PROJECT_CATALOG.length,
    itemListElement: PROJECT_CATALOG.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "SoftwareSourceCode",
        name: project.name,
        url: project.url,
        description: project.description,
        author: { "@id": `${siteUrl}/#person` },
      },
    })),
  };
}

export function buildBreadcrumbSchema(siteUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
    ],
  };
}

export function buildFAQSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ENTRIES.map((entry) => ({
      "@type": "Question",
      name: entry.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: entry.answer,
      },
    })),
  };
}
