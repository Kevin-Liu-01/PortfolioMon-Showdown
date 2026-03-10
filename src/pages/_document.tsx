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
        <meta name="subject" content="Kevin Liu — Developer Portfolio & Software Projects" />
        <meta name="topic" content="Software Development, Artificial Intelligence, Computer Science" />
        <meta name="classification" content="Developer Portfolio" />
        <meta name="category" content="Technology, Software Engineering, AI" />
        <meta name="coverage" content="Worldwide" />
        <meta name="distribution" content="global" />
        <meta name="rating" content="general" />
        <meta name="abstract" content="Interactive developer portfolio by Kevin Liu, a Princeton University CS student. Features 30+ projects across AI, web, games, health-tech, and hardware in a Pokémon Showdown-inspired battle game." />

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
        <meta property="og:updated_time" content="2026-03-10T00:00:00Z" />
        {/* OG Profile tags */}
        <meta property="profile:first_name" content="Kevin" />
        <meta property="profile:last_name" content="Liu" />
        <meta property="profile:username" content="Kevin-Liu-01" />

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
              Kevin Liu is a Computer Science student at Princeton University (Class of 2028)
              and a full-stack software developer specializing in artificial intelligence,
              machine learning, and interactive web applications. This is his interactive
              developer portfolio — a gamified, Pokémon Showdown-inspired experience
              showcasing 30+ projects. Enable JavaScript to play.
            </p>
            <h2>About Kevin Liu</h2>
            <p>
              Full-stack developer and AI engineer with professional experience at
              Amazon, Bloomberg L.P., AT&amp;T Labs Research, and Y Combinator-backed
              startups (Dedalus Labs, Sevenfold AI). Builds with React, Next.js,
              TypeScript, Python, and AI/ML technologies including LLMs, computer
              vision, and the Model Context Protocol (MCP).
            </p>
            <h2>Featured Projects</h2>
            <ul>
              <li><a href="https://dedalus-demo.vercel.app/">Dedalus</a> — AI agent SDK with MCP support (Y Combinator S25)</li>
              <li><a href="https://sevenfold-demo.vercel.app/">Sevenfold</a> — AI-powered research workspace</li>
              <li><a href="https://lumachor.vercel.app/home">Lumachor</a> — AI context engine for prompt engineering</li>
              <li><a href="https://recyclaible.vercel.app/">RecyclAIble</a> — Smart recycling (1st Place Hardware, PennApps XXIII)</li>
              <li><a href="https://hd-transcribe.vercel.app">HD Transcribe</a> — Speech model for Huntington&apos;s Disease</li>
              <li><a href="https://princeton-tower-defense.vercel.app/">Princeton Tower Defense</a> — Tower defense game</li>
              <li><a href="https://hackprinceton-podium.vercel.app/">Podium</a> — Hackathon judging platform</li>
              <li><a href="https://snelltech.vercel.app/">SnellTech</a> — Digital visual acuity exam</li>
              <li><a href="https://letmecook.vercel.app/">LetMeCook</a> — AI recipe generator</li>
              <li><a href="https://www.ommcofficial.org">OMMC</a> — Online Monmouth Math Competition</li>
            </ul>
            <h2>Experience</h2>
            <ul>
              <li>Founding Engineer — Dedalus Labs (Y Combinator S25), Jan 2026–Present</li>
              <li>Founding Engineer — Sevenfold AI, Jun–Nov 2025</li>
              <li>Software Development Engineer Intern — Amazon, Summer 2025</li>
              <li>Software Engineering Intern — Bloomberg L.P., Summer 2024</li>
              <li>AI Research Intern — AT&amp;T Labs Research, Fall 2023</li>
              <li>Software Engineering Intern — Bloomberg L.P., Summer 2023</li>
              <li>Full Stack Engineer — Johns Hopkins University (uCredit), Fall 2022</li>
            </ul>
            <h2>Education</h2>
            <p>Princeton University, B.S.E. in Computer Science, Class of 2028</p>
            <h2>Contact</h2>
            <ul>
              <li><a href="https://github.com/Kevin-Liu-01">GitHub</a></li>
              <li><a href="https://www.linkedin.com/in/kevin-liu-princeton/">LinkedIn</a></li>
              <li><a href="https://x.com/kevskgs">X (formerly Twitter)</a></li>
              <li><a href="https://www.kevin-liu.tech">Alternate Portfolio</a></li>
            </ul>
          </div>
        </noscript>
      </body>
    </Html>
  );
}
