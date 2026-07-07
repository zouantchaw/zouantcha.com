import "./global.css";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Footer from "./components/footer";
import { baseUrl } from "./sitemap";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Wielfried Zouantcha",
    template: "%s | Wielfried Zouantcha",
  },
  description:
    "Wielfried Zouantcha is an engineer based in Washington DC working on customer engineering and full-stack development for KROW Workforce.",
  openGraph: {
    title: "Wielfried Zouantcha",
    description:
      "Engineer based in Washington DC working on customer engineering and full-stack development for KROW Workforce.",
    url: baseUrl,
    siteName: "Wielfried Zouantcha",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wielfried Zouantcha",
    description:
      "Engineer based in Washington DC working on customer engineering and full-stack development for KROW Workforce.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const cx = (...classes) => classes.filter(Boolean).join(" ");

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cx(
        "text-black bg-white dark:text-white dark:bg-black",
        GeistSans.variable,
        GeistMono.variable
      )}
    >
      <head>
        <script
          async
          src="https://cdn.seline.so/seline.js"
          data-token="dfbe2e89cb93290"
        ></script>
      </head>
      <body className="mx-auto min-h-screen max-w-2xl px-6 py-12 antialiased sm:py-16 md:py-20">
        <main className="flex min-w-0 flex-col gap-12">
          {children}
          <Footer />
          <Analytics />
          <SpeedInsights />
        </main>
      </body>
    </html>
  );
}
