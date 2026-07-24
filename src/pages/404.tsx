import Head from "next/head";
import Link from "next/link";

export default function Custom404() {
  return (
    <>
      <Head>
        <title>Page Not Found — Kevin Liu | Software Developer Portfolio</title>
        <meta
          name="description"
          content="This page doesn't exist. Visit Kevin Liu's interactive developer portfolio at kevinliu.biz — a Pokémon Showdown-inspired battle game featuring 30+ projects."
        />
        <meta name="robots" content="noindex" />
      </Head>
      <main
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          fontFamily: "system-ui, sans-serif",
          background: "#0f172a",
          color: "#e2e8f0",
          textAlign: "center",
          padding: "2rem",
        }}
      >
        <h1 style={{ fontSize: "4rem", margin: 0, color: "#22d3ee" }}>404</h1>
        <p style={{ fontSize: "1.25rem", marginTop: "0.5rem" }}>
          This page doesn&apos;t exist.
        </p>
        <p style={{ color: "#94a3b8", marginTop: "1rem", maxWidth: "480px" }}>
          You might be looking for Kevin Liu&apos;s interactive developer
          portfolio — a Pokémon Showdown-inspired battle game showcasing 30+
          projects across AI, web, games, and health-tech.
        </p>
        <Link
          href="/"
          style={{
            marginTop: "2rem",
            padding: "0.75rem 2rem",
            background: "#22d3ee",
            color: "#0f172a",
            fontWeight: 700,
            textDecoration: "none",
            clipPath:
              "polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)",
          }}
        >
          Back to Portfolio
        </Link>
      </main>
    </>
  );
}
