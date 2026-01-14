import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Maison Lipari — SEO & Social Audit",
  description: "Independent audit of Maison Lipari's SEO and social sharing implementation",
  robots: {
    index: false,
    follow: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function MaisonLipariLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
