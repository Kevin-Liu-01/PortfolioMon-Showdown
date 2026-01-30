import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  const siteUrl = "https://www.kevin-liu.tech";
  const title = "Kevin Liu | PortfolioMon Showdown – Interactive Developer Portfolio";
  const description =
    "Battle your way through 29+ projects in this Pokémon Showdown-inspired portfolio! Kevin Liu (Princeton '28) showcases AI agents, hackathon-winning apps, games, and more as battle-ready PortfolioMons. Pick your team and fight!";
  const ogImage = `${siteUrl}/kevinportfolio.png`;
  const keywords =
    "Kevin Liu, Princeton, developer portfolio, interactive portfolio, Pokemon Showdown, PortfolioMon, CS student, web developer, AI projects, hackathon winner, React, Next.js, TypeScript, game developer, full-stack developer, Princeton University, Class of 2028";

  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />

        {/* Primary Meta Tags */}
        <meta name="title" content={title} />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content="Kevin Liu" />
        <meta name="robots" content="index, follow" />
        <meta name="theme-color" content="#0f172a" />
        <meta name="color-scheme" content="dark light" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="PortfolioMon Showdown - Kevin Liu's Interactive Developer Portfolio" />
        <meta property="og:site_name" content="PortfolioMon Showdown" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={siteUrl} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />
        <meta name="twitter:image:alt" content="PortfolioMon Showdown - Kevin Liu's Interactive Developer Portfolio" />
        <meta name="twitter:creator" content="@kevinliu_01" />

        {/* Favicons & Icons */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
        <link rel="canonical" href={siteUrl} />

        {/* Structured Data - JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "PortfolioMon Showdown",
              description: description,
              url: siteUrl,
              author: {
                "@type": "Person",
                name: "Kevin Liu",
                url: siteUrl,
                jobTitle: "Computer Science Student",
                affiliation: {
                  "@type": "CollegeOrUniversity",
                  name: "Princeton University",
                },
                knowsAbout: [
                  "Web Development",
                  "Artificial Intelligence",
                  "Game Development",
                  "Full-Stack Development",
                  "React",
                  "Next.js",
                  "TypeScript",
                ],
                sameAs: [
                  "https://github.com/Kevin-Liu-01",
                  "https://linkedin.com/in/kevin-liu-01",
                ],
              },
              potentialAction: {
                "@type": "SearchAction",
                target: `${siteUrl}/?search={search_term_string}`,
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />

        {/* Additional Structured Data - Software Application */}
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
                "An interactive portfolio experience inspired by Pokémon Showdown where each project is a battling PortfolioMon with unique abilities and stats.",
              author: {
                "@type": "Person",
                name: "Kevin Liu",
              },
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "5",
                ratingCount: "1",
              },
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
          crossOrigin="use-credentials"
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
