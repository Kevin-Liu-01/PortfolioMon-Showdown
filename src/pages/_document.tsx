import { Html, Head, Main, NextScript } from "next/document";
import { Analytics } from "@vercel/analytics/next"

export default function Document() {
  const siteUrl = "https://www.kevin-liu.tech";
  const title = "Kevin Liu | PortfolioMon Showdown ⁂ Portfolio Battle Game";
  const description =
    "Battle your way through 30+ projects in this Pokémon Showdown-inspired portfolio! Kevin Liu (Princeton '28) showcases AI agents, hackathon-winning apps, games, and more as battle-ready PortfolioMons. Pick your team and fight!";
  const ogImage = `${siteUrl}/kevinportfolio.png`;
  const keywords =
    "Kevin Liu, Princeton University, developer portfolio, interactive portfolio, PortfolioMon, Pokemon Showdown, computer science student, web developer, AI projects, machine learning, hackathon winner, React, Next.js, TypeScript, full-stack developer, game developer, Princeton Class of 2028, software engineer portfolio";

  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />

        {/* Primary Meta Tags */}
        <meta name="title" content={title} />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content="Kevin Liu" />
        <meta name="application-name" content="Kevin Liu's PortfolioMon Showdown" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="theme-color" content="#0f172a" />
        <meta name="color-scheme" content="dark light" />
        <meta name="referrer" content="origin-when-cross-origin" />
        <meta name="format-detection" content="telephone=no" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:secure_url" content={ogImage} />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="PortfolioMon Showdown ⁂ Kevin Liu's Interactive Developer Portfolio" />
        <meta property="og:site_name" content="PortfolioMon Showdown" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:updated_time" content="2026-02-11" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@kevskgs" />
        <meta name="twitter:creator" content="@kevskgs" />
        <meta name="twitter:url" content={siteUrl} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />
        <meta name="twitter:image:alt" content="Kevin Liu's PortfolioMon Showdown" />

        {/* Favicons & Icons */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
        <link rel="canonical" href={siteUrl} />

        {/* Sitemap & Robots */}
        <link rel="sitemap" type="application/xml" href={`${siteUrl}/sitemap.xml`} />

        {/* Structured Data - WebSite */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": `${siteUrl}/#website`,
              name: "PortfolioMon Showdown",
              alternateName: "Kevin Liu Portfolio",
              description: description,
              url: siteUrl,
              inLanguage: "en-US",
              author: {
                "@id": `${siteUrl}/#person`,
              },
              publisher: {
                "@id": `${siteUrl}/#person`,
              },
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: `${siteUrl}/?search={search_term_string}`,
                },
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />

        {/* Structured Data - Person (enables Knowledge Panel, richer snippets) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "@id": `${siteUrl}/#person`,
              name: "Kevin Liu",
              url: siteUrl,
              jobTitle: "Computer Science Student",
              alumniOf: {
                "@type": "CollegeOrUniversity",
                name: "Princeton University",
              },
              knowsAbout: [
                "Web Development",
                "Artificial Intelligence",
                "Machine Learning",
                "Game Development",
                "Full-Stack Development",
                "React",
                "Next.js",
                "TypeScript",
                "Python",
              ],
              sameAs: [
                "https://github.com/Kevin-Liu-01",
                "https://www.linkedin.com/in/kevin-liu-princeton",
              ],
              mainEntityOfPage: {
                "@type": "WebPage",
                "@id": `${siteUrl}/`,
              },
            }),
          }}
        />

        {/* Structured Data - Software Application */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "PortfolioMon Showdown",
              applicationCategory: "GameApplication",
              operatingSystem: "Web Browser",
              description:
                "An interactive portfolio experience inspired by Pokémon Showdown where each project is a battling PortfolioMon with unique abilities and stats. Explore 30+ projects including AI agents, hackathon-winning apps, and games.",
              author: {
                "@id": `${siteUrl}/#person`,
              },
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
            }),
          }}
        />

        {/* Structured Data - BreadcrumbList */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
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
            }),
          }}
        />
        {/*
            Notice the use of %PUBLIC_URL% in the tags above.
            It will be replaced with the URL of the `public` folder during the build.
            Only files inside the `public` folder can be referenced from the HTML.
            Unlike "/favicon.ico" or "favicon.ico", "%PUBLIC_URL%/favicon.ico" will
            work correctly both with client-side routing and a non-root public URL.
            Learn how to configure a non-root public URL by running `npm run build`.
        */}

        <link
          href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@900,700,500,301,701,300,501,401,901,400&f[]=general-sans@701,200,500,301,201,300,601,600,401,501,400,700&f[]=clash-grotesk@200,700,400,600,300,1,500&f[]=azeret-mono@501,701,800,801,200,401,500,601,900,600,300,901,700,400,100,1&display=swap"
          rel="stylesheet"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Kode+Mono:wght@400..700&family=Play:wght@400;700&family=Racing+Sans+One&family=Sedgwick+Ave+Display&family=TASA+Orbiter:wght@400..800&family=Young+Serif&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
        <Analytics />
      </body>
    </Html>
  );
}
