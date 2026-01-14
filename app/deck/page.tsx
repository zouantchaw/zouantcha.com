import Link from "next/link"

export default function DeckIndex() {
  const decks = [
    {
      slug: "maison-lipari",
      title: "Maison Lipari",
      subtitle: "SEO & Social Sharing Audit",
      date: "January 2026",
      protected: true,
    },
  ]

  return (
    <div className="min-h-screen bg-[#1B1B1B] flex items-center justify-center p-6">
      <div className="max-w-lg w-full">
        <h1 className="font-cormorant text-4xl text-white mb-2">Presentations</h1>
        <p className="text-white/60 font-sora text-sm mb-8">Select a deck to view</p>

        <div className="space-y-4">
          {decks.map((deck) => (
            <Link
              key={deck.slug}
              href={`/deck/${deck.slug}`}
              className="block bg-white/5 hover:bg-white/10 rounded-xl p-6 transition-all group"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="font-cormorant text-2xl text-white group-hover:text-[#C6A85A] transition-colors">
                    {deck.title}
                  </h2>
                  <p className="font-sora text-sm text-white/60 mt-1">{deck.subtitle}</p>
                  <p className="font-sora text-xs text-white/40 mt-2">{deck.date}</p>
                </div>
                {deck.protected && (
                  <span className="px-2 py-1 bg-[#C6A85A]/20 text-[#C6A85A] rounded text-xs font-sora">
                    Protected
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
