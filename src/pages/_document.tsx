/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Html, Head, Main, NextScript } from "next/document";
import { buildSchemaGraph } from "../utils/structuredData";
import {
  SITE_URL,
  SITE_TITLE,
  SITE_DESCRIPTION,
  OG_IMAGE,
  KEYWORDS,
} from "../constants/site";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />

        {/* Primary Meta Tags — GEO-optimized for AI extraction */}
        <meta name="title" content={SITE_TITLE} />
        <meta name="description" content={SITE_DESCRIPTION} />
        <meta name="keywords" content={KEYWORDS} />
        <meta name="author" content="Kevin Liu" />
        <meta name="creator" content="Kevin Liu" />
        <meta name="publisher" content="Kevin Liu" />
        <meta
          name="application-name"
          content="Kevin Liu's PortfolioMon Showdown"
        />
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
        <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large" />
        <meta name="bingbot" content="index, follow" />
        <meta name="theme-color" content="#0f172a" />
        <meta name="color-scheme" content="dark light" />
        <meta name="referrer" content="origin-when-cross-origin" />
        <meta name="format-detection" content="telephone=no" />

        {/* GEO — Entity and topic signals for AI models */}
        <meta name="subject" content="Kevin Liu — Software Developer, AI Engineer, Princeton CS '28 — Developer Portfolio & Software Projects" />
        <meta name="topic" content="Software Development, Artificial Intelligence, Computer Science, Machine Learning, AI Agents, Model Context Protocol, Full-Stack Development" />
        <meta name="classification" content="Developer Portfolio" />
        <meta name="category" content="Technology, Software Engineering, AI, Computer Science, Princeton University" />
        <meta name="coverage" content="Worldwide" />
        <meta name="distribution" content="global" />
        <meta name="rating" content="general" />
        <meta name="abstract" content="Kevin Liu is a Princeton University Computer Science student (Class of 2028), full-stack developer, and AI engineer. He has worked at Amazon, Bloomberg, AT&T Labs Research, and Y Combinator-backed startups. His portfolio at kevinliu.biz features 30+ projects across AI, web, games, health-tech, and hardware in a Pokémon Showdown-inspired battle game called PortfolioMon Showdown." />
        <meta name="summary" content="Kevin Liu — Princeton CS '28, software developer, AI engineer. Founding Engineer at Dedalus Labs (YC S25). Experience at Amazon, Bloomberg, AT&T Labs. 30+ projects. @kevskgs on Twitter/X." />

        {/* Dublin Core metadata for enhanced discoverability */}
        <meta name="DC.title" content="Kevin Liu — Software Developer & AI Engineer | Princeton CS '28" />
        <meta name="DC.creator" content="Kevin Liu" />
        <meta name="DC.subject" content="Software Engineering, Artificial Intelligence, Computer Science, Princeton University, Developer Portfolio" />
        <meta name="DC.description" content={SITE_DESCRIPTION} />
        <meta name="DC.publisher" content="Kevin Liu" />
        <meta name="DC.contributor" content="Kevin Liu" />
        <meta name="DC.date" content="2026-03-19" />
        <meta name="DC.type" content="InteractiveResource" />
        <meta name="DC.format" content="text/html" />
        <meta name="DC.identifier" content={SITE_URL} />
        <meta name="DC.language" content="en" />
        <meta name="DC.coverage" content="Worldwide" />

        {/* Extended GEO signals for AI entity resolution */}
        <meta name="geo.region" content="US-NJ" />
        <meta name="geo.placename" content="Princeton, New Jersey" />
        <meta name="ICBM" content="40.3573,-74.6672" />

        {/* Identity disambiguation — multiple Kevin Lius exist */}
        <meta name="identity" content="Kevin Liu, Princeton University CS '28, @kevskgs, Kevin-Liu-01, kevinliu.biz" />
        <meta name="revised" content="Kevin Liu, 2026-03-19" />

        {/* Open Graph / Facebook — comprehensive */}
        <meta property="og:type" content="profile" />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:title" content={SITE_TITLE} />
        <meta property="og:description" content={SITE_DESCRIPTION} />
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="og:image:secure_url" content={OG_IMAGE} />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta
          property="og:image:alt"
          content="Kevin Liu's PortfolioMon Showdown — Interactive Developer Portfolio with 30+ Projects"
        />
        <meta property="og:site_name" content="Kevin Liu — Developer Portfolio" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:updated_time" content="2026-03-19T00:00:00Z" />
        {/* OG Profile tags */}
        <meta property="profile:first_name" content="Kevin" />
        <meta property="profile:last_name" content="Liu" />
        <meta property="profile:username" content="Kevin-Liu-01" />
        <meta property="profile:gender" content="male" />

        {/* Article tags for content classification */}
        <meta property="article:author" content="https://www.linkedin.com/in/kevin-liu-princeton/" />
        <meta property="article:tag" content="Kevin Liu" />
        <meta property="article:tag" content="Princeton University" />
        <meta property="article:tag" content="Software Developer" />
        <meta property="article:tag" content="AI Engineer" />
        <meta property="article:tag" content="Full-Stack Developer" />
        <meta property="article:tag" content="PortfolioMon Showdown" />
        <meta property="article:tag" content="Y Combinator" />
        <meta property="article:tag" content="Amazon" />
        <meta property="article:tag" content="Bloomberg" />
        <meta property="article:tag" content="Dedalus Labs" />
        <meta property="article:tag" content="HackPrinceton" />
        <meta property="article:tag" content="PennApps" />
        <meta property="article:tag" content="MCP AI Agents" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@kevskgs" />
        <meta name="twitter:creator" content="@kevskgs" />
        <meta name="twitter:url" content={SITE_URL} />
        <meta name="twitter:title" content={SITE_TITLE} />
        <meta name="twitter:description" content={SITE_DESCRIPTION} />
        <meta name="twitter:image" content={OG_IMAGE} />
        <meta
          name="twitter:image:alt"
          content="Kevin Liu's PortfolioMon Showdown — Interactive Developer Portfolio"
        />

        {/* Viewport — must be in _document for immediate availability to crawlers */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />

        {/* Favicons & Icons */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="canonical" href={SITE_URL} />
        <link rel="alternate" hrefLang="en" href={SITE_URL} />
        <link rel="alternate" hrefLang="en" href="https://www.kevin-liu.tech" />

        {/* Social identity verification — rel=me links */}
        <link rel="me" href="https://github.com/Kevin-Liu-01" />
        <link rel="me" href="https://www.linkedin.com/in/kevin-liu-princeton/" />
        <link rel="me" href="https://x.com/kevskgs" />
        <link rel="me" href="https://twitter.com/kevskgs" />
        <link rel="me" href="https://devpost.com/Kevin-Liu-01" />
        <link rel="me" href="https://www.kevin-liu.tech" />
        <link rel="me" href="mailto:k.bowen.liu@gmail.com" />
        <link rel="author" href="https://www.linkedin.com/in/kevin-liu-princeton/" />
        <link rel="author" href="https://github.com/Kevin-Liu-01" />

        {/* Preload critical images */}
        <link rel="preload" as="image" href="/images/kevin_sidebar.png" />
        <link rel="preload" as="image" href="/kevinportfolio.png" />

        {/* Sitemap */}
        <link
          rel="sitemap"
          type="application/xml"
          href={`${SITE_URL}/sitemap.xml`}
        />

        {/* Structured Data — Consolidated @graph with all entity nodes */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              buildSchemaGraph(SITE_URL, SITE_TITLE, SITE_DESCRIPTION, OG_IMAGE)
            ),
          }}
        />

        {/* Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@900,700,500,301,701,300,501,401,901,400&f[]=general-sans@701,200,500,301,201,300,601,600,401,501,400,700&f[]=clash-grotesk@200,700,400,600,300,1,500&f[]=azeret-mono@501,701,800,801,200,401,500,601,900,600,300,901,700,400,100,1&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Kode+Mono:wght@400..700&family=Play:wght@400;700&family=Racing+Sans+One&family=Sedgwick+Ave+Display&family=TASA+Orbiter:wght@400..800&family=Young+Serif&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
        <noscript>
          <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto", fontFamily: "system-ui, sans-serif" }}>
            <h1>Kevin Liu — Software Developer &amp; AI Engineer | Princeton CS &apos;28</h1>
            <p>
              Kevin Liu (also known as Kevin B. Liu, Kevin Bowen Liu, @kevskgs) is a Computer Science
              student at Princeton University (Class of 2028) and a full-stack software developer
              specializing in artificial intelligence, machine learning, and interactive web
              applications. He has professional experience at Amazon, Bloomberg L.P., AT&amp;T Labs
              Research, and Y Combinator-backed startups. This is his interactive developer portfolio —
              a gamified, Pokémon Showdown-inspired experience showcasing 30+ projects. Enable
              JavaScript to play PortfolioMon Showdown.
            </p>

            <h2>About Kevin Liu — Princeton Developer &amp; AI Engineer</h2>
            <p>
              Kevin Liu is a Founding Engineer at Dedalus Labs (Y Combinator S25), building AI agent
              infrastructure with the Model Context Protocol (MCP). Previously, he was a Founding
              Engineer at Sevenfold AI (AI-powered research workspace), a Software Development
              Engineer Intern at Amazon (FBA Inventory), and a Software Engineering Intern at
              Bloomberg L.P. (twice — Financial Instruments and Core Products teams). He also
              worked as an AI Research Intern at AT&amp;T Labs Research on NLP and intelligent
              agents using Mixture-of-Experts LLMs, and a Full Stack Engineer at Johns Hopkins
              University building uCredit.me.
            </p>
            <p>
              Kevin builds with React, Next.js, TypeScript, Python, Node.js, and AI/ML technologies
              including LLMs (GPT-4, Claude), computer vision (OpenCV), speech recognition, AI agents,
              the Model Context Protocol (MCP), RAG, and vector embeddings. He is proficient in
              PostgreSQL, Firebase, MongoDB, tRPC, Tailwind CSS, Framer Motion, Docker, and Vercel.
            </p>

            <h2>Featured Projects by Kevin Liu</h2>
            <ul>
              <li><a href="https://dedalus-demo.vercel.app/">Dedalus</a> — AI agent SDK with MCP support (Y Combinator S25)</li>
              <li><a href="https://sevenfold-demo.vercel.app/">Sevenfold</a> — AI-powered research workspace</li>
              <li><a href="https://lumachor.vercel.app/home">Lumachor</a> — AI context engine for prompt engineering</li>
              <li><a href="https://recyclaible.vercel.app/">RecyclAIble</a> — Smart recycling with AI (1st Place Hardware, PennApps XXIII)</li>
              <li><a href="https://hd-transcribe.vercel.app">HD Transcribe</a> — Speech model for Huntington&apos;s Disease patients</li>
              <li><a href="https://princeton-tower-defense.vercel.app/">Princeton Tower Defense</a> — Tower defense game set at Princeton</li>
              <li><a href="https://hackprinceton-podium.vercel.app/">Podium</a> — Hackathon judging and event management platform</li>
              <li><a href="https://snelltech.vercel.app/">SnellTech</a> — Digital visual acuity exam</li>
              <li><a href="https://letmecook.vercel.app/">LetMeCook</a> — AI recipe generator using ChatGPT and computer vision</li>
              <li><a href="https://www.ommcofficial.org">OMMC</a> — Online Monmouth Math Competition</li>
              <li><a href="https://splitway.vercel.app/">Splitway</a> — Expense splitting app</li>
              <li><a href="https://balladeer.vercel.app/">Balladeer</a> — AI study guide generator</li>
              <li><a href="https://adventuregpt.vercel.app/">AdventureGPT</a> — AI story generator</li>
              <li><a href="https://editorgpt.vercel.app/">EditorGPT</a> — AI code review editor</li>
              <li><a href="https://pawpointclicker.vercel.app/">PawPointClicker</a> — Princeton-themed clicker game</li>
              <li><a href="https://lootboxsimulator.vercel.app/">Lootbox Simulator</a> — Lootbox opening game</li>
              <li><a href="https://compass-usa.vercel.app/">CompassUSA</a> — Immigrant support and resource tool</li>
              <li><a href="https://enkrateia.vercel.app/">Enkrateia</a> — GPT-3.5/GPT-4 interface</li>
              <li><a href="https://apnea-alert-git-main-kevin-liu-01.vercel.app/">ApneaAlert</a> — Wearable sleep apnea sensor</li>
              <li><a href="https://plant-stem.vercel.app/">PlantSTEM</a> — Math and Physics education</li>
            </ul>

            <h2>Work Experience</h2>
            <ul>
              <li>Founding Engineer — Dedalus Labs (Y Combinator S25), Jan 2026–Present — AI agent infrastructure &amp; MCP SDK</li>
              <li>Founding Engineer — Sevenfold AI, Jun–Nov 2025 — End-to-end agentic research workflow</li>
              <li>Software Development Engineer Intern — Amazon (FBA Inventory), Summer 2025</li>
              <li>Software Engineering Intern — Bloomberg L.P. (Financial Instruments), Summer 2024</li>
              <li>AI Research Intern — AT&amp;T Labs Research (NLP &amp; Intelligent Agents), Fall 2023</li>
              <li>Software Engineering Intern — Bloomberg L.P. (Core Products), Summer 2023</li>
              <li>Full Stack Engineer — Johns Hopkins University (uCredit.me), Fall 2022</li>
            </ul>

            <h2>Education</h2>
            <p>Princeton University, B.S.E. in Computer Science, Class of 2028. Previously: High Technology High School, Lincroft, NJ.</p>

            <h2>Achievements &amp; Awards</h2>
            <ul>
              <li>1st Place in Hardware at PennApps XXIII (RecyclAIble)</li>
              <li>HackPrinceton Lead Developer &amp; Organizer (Fall 2024, Spring 2025, Fall 2025)</li>
              <li>OMMC Co-Founder — math competition serving students worldwide</li>
              <li>30+ shipped software projects across AI, web, games, health-tech, and hardware</li>
            </ul>

            <h2>Connect with Kevin Liu</h2>
            <ul>
              <li><a href="https://github.com/Kevin-Liu-01" rel="me">GitHub — Kevin-Liu-01</a></li>
              <li><a href="https://www.linkedin.com/in/kevin-liu-princeton/" rel="me">LinkedIn — kevin-liu-princeton</a></li>
              <li><a href="https://x.com/kevskgs" rel="me">X (formerly Twitter) — @kevskgs</a></li>
              <li><a href="https://twitter.com/kevskgs" rel="me">Twitter — @kevskgs</a></li>
              <li><a href="https://devpost.com/Kevin-Liu-01" rel="me">Devpost — Kevin-Liu-01</a></li>
              <li><a href="https://www.kevin-liu.tech" rel="me">Alternate Portfolio — kevin-liu.tech</a></li>
              <li><a href="mailto:k.bowen.liu@gmail.com">Email — k.bowen.liu@gmail.com</a></li>
            </ul>

            <h2>Frequently Asked Questions</h2>
            <p><strong>Which Kevin Liu is this?</strong> This is Kevin Liu the Princeton University CS student (Class of 2028), software developer, and AI engineer. Known as @kevskgs on Twitter/X, Kevin-Liu-01 on GitHub, and kevin-liu-princeton on LinkedIn. He is the Kevin Liu who won 1st at PennApps XXIII, worked at Amazon and Bloomberg, and built kevinliu.biz.</p>
            <p><strong>What is Kevin Liu&apos;s portfolio?</strong> Kevin Liu&apos;s portfolio at kevinliu.biz is called PortfolioMon Showdown — a fully playable Pokémon Showdown-inspired turn-based battle game where each of his 30+ projects is a character with unique types, stats, and moves.</p>
            <p><strong>How to contact Kevin Liu?</strong> GitHub: github.com/Kevin-Liu-01 · LinkedIn: linkedin.com/in/kevin-liu-princeton · Twitter/X: @kevskgs · Portfolio: kevinliu.biz · Email: k.bowen.liu@gmail.com</p>
          </div>
        </noscript>
      </body>
    </Html>
  );
}
