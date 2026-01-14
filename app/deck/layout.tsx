import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Presentations",
  description: "View presentations and slide decks",
  robots: {
    index: false,
    follow: false,
  },
};

export default function DeckLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="deck-root">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Sora:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <style>{`
        .deck-root {
          min-height: 100dvh;
        }
        .font-cormorant {
          font-family: "Cormorant Garamond", serif;
        }
        .font-sora {
          font-family: "Sora", sans-serif;
        }
        .font-space {
          font-family: "Space Grotesk", monospace;
        }
      `}</style>
      {children}
    </div>
  );
}
