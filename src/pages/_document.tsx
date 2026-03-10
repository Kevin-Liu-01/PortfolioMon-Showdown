/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Html, Head, Main, NextScript } from "next/document";
import {
  buildPersonSchema,
  buildWebSiteSchema,
  buildWebPageSchema,
  buildSoftwareAppSchema,
  buildProfilePageSchema,
  buildProjectListSchema,
  buildBreadcrumbSchema,
  buildFAQSchema,
} from "../utils/structuredData";

const SITE_URL = "https://kevinliu.biz";
const SITE_TITLE =
  "Kevin Liu | Software Developer & AI Engineer — Princeton CS '28";
const SITE_DESCRIPTION =
  "Kevin Liu is a Computer Science student at Princeton University (Class of 2028) who builds AI-powered applications, interactive games, and full-stack web platforms. Explore 30+ projects — including AI agent SDKs, hackathon-winning apps, health-tech tools, and browser games — showcased as battle-ready PortfolioMons in this Pokémon Showdown-inspired interactive portfolio.";
const OG_IMAGE = `${SITE_URL}/kevinportfolio.png`;
const KEYWORDS = [
  "Kevin Liu",
  "Kevin Liu Princeton",
  "Kevin Liu developer",
  "Kevin Liu portfolio",
  "Kevin Liu computer science",
  "Princeton University developer",
  "Princeton CS 2028",
  "full-stack developer",
  "AI engineer",
  "software engineer",
  "web developer portfolio",
  "interactive developer portfolio",
  "PortfolioMon Showdown",
  "Pokemon Showdown portfolio",
  "React developer",
  "Next.js developer",
  "TypeScript developer",
  "AI projects portfolio",
  "machine learning projects",
  "hackathon winner",
  "PennApps winner",
  "HackPrinceton developer",
  "MCP AI agents",
  "Dedalus AI SDK",
  "Sevenfold research",
  "Lumachor context engine",
  "Princeton Tower Defense",
  "game developer",
  "health tech developer",
  "OMMC math competition",
  "computer science student projects",
  "Kevin Liu GitHub",
].join(", ");

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
        <meta property="og:updated_time" content="2026-03-09T00:00:00Z" />
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

        {/* Favicons & Icons */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
        <link rel="canonical" href={SITE_URL} />
        <link rel="alternate" href="https://www.kevin-liu.tech" />

        {/* Sitemap */}
        <link
          rel="sitemap"
          type="application/xml"
          href={`${SITE_URL}/sitemap.xml`}
        />

        {/* Structured Data — WebSite */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(buildWebSiteSchema(SITE_URL, SITE_DESCRIPTION)),
          }}
        />

        {/* Structured Data — Person (Knowledge Panel, entity recognition) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(buildPersonSchema(SITE_URL, OG_IMAGE)),
          }}
        />

        {/* Structured Data — WebPage */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              buildWebPageSchema(SITE_URL, SITE_TITLE, SITE_DESCRIPTION, OG_IMAGE)
            ),
          }}
        />

        {/* Structured Data — SoftwareApplication */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(buildSoftwareAppSchema(SITE_URL)),
          }}
        />

        {/* Structured Data — ProfilePage (GEO-critical for person entities) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(buildProfilePageSchema(SITE_URL, OG_IMAGE)),
          }}
        />

        {/* Structured Data — ItemList (all 30 projects as a collection) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(buildProjectListSchema(SITE_URL)),
          }}
        />

        {/* Structured Data — BreadcrumbList */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(buildBreadcrumbSchema(SITE_URL)),
          }}
        />

        {/* Structured Data — FAQPage (GEO-critical for AI answer extraction) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(buildFAQSchema()),
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
      </body>
    </Html>
  );
}
