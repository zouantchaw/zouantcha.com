import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  const meta = {
    title: "Wielfried Zouantcha",
    description:
      "Welcome! This space is for sharing my thoughts and ideas about work, books, and personal projects.",
    image: "https://www.zouantcha.com/wz.jpg",
  };

  return (
    <Html lang="en">
      <Head>
        <meta name="robots" content="follow, index" />
        <meta name="description" content={meta.description} />
        <meta property="og:site_name" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:image" content={meta.image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@love_thegame_" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.image} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
