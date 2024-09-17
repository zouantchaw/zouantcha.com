import Link from "next/link";

export const metadata = {
  title: "Projects",
  description: "Cool stuff I'm building on the side.",
};

export default function Page() {
  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">projects</h1>
      <p className="mb-8 text-gray-700 leading-relaxed">
        projects I'm currently hacking on.
      </p>

      <div className="space-y-10">
        <div>
          <h2 className="font-semibold text-xl mb-2">mtlarchives</h2>
          <span className="text-gray-500 text-sm">
            Bringing Montreal's history to the digital age.
          </span>
          <p className="mt-2 text-gray-700 leading-relaxed">
            Stumbled upon this goldmine of old Montreal pics on the city's Open
            Data portal. Thought it'd be cool to share, so I whipped up an{" "}
            <a
              href="https://www.instagram.com/mtlarchives/"
              className="text-blue-600 hover:underline"
            >
              Instagram
            </a>{" "}
            account. It's blowing up - almost 3k followers now! Got inspired and
            built a{" "}
            <a
              href="https://mtlarchives.com"
              className="text-blue-600 hover:underline"
            >
              photo blog
            </a>{" "}
            with Next.js. It's not breaking the internet yet, but we're getting
            about 90 curious history buffs checking it out each month.
          </p>
          <Link
            href="https://github.com/zouantchaw/mtlarchives"
            className="text-blue-600 hover:underline mt-2 inline-block"
          >
            peek at the code
          </Link>
        </div>
      </div>
    </section>
  );
}
