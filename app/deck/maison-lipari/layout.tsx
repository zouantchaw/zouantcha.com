import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Maison Lipari — SEO & Social Audit",
  description: "Independent audit of Maison Lipari's SEO and social sharing implementation",
  robots: {
    index: false,
    follow: false,
  },
};

export default function MaisonLipariLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 overflow-hidden">
      {children}
    </div>
  );
}
