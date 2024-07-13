import Link from "next/link";

export const metadata = {
  title: "Projects",
  description: "Some projects I'm currently hacking on.",
};

export default function Page() {
  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">projects</h1>
      <p className="mb-8 text-gray-700 leading-relaxed">
        projects I'm currently hacking on.
      </p>

      <div className="space-y-10">
        {/* <div>
          <h2 className="font-semibold text-xl mb-2">bene</h2>
          <span className="text-gray-500 text-sm">
            A tool for managing and renting out party/event equipment.
          </span>
          <p className="mt-2 text-gray-700 leading-relaxed">
            <a href="https://app.rentbene.com" className="text-blue-600 hover:underline">Bene</a> is a tool I developed to streamline the management and leasing
            of party/event equipment. It addresses the need to track item
            locations, return dates, and facilitate the rental process. Built
            using the Vercel Platform Starter Kit, Bene leverages Next.js and
            Prisma ORM, with Vercel for hosting.
          </p>
          <Link
            href="https://github.com/zouantchaw/bene"
            className="text-blue-600 hover:underline mt-2 inline-block"
          >
            code
          </Link>
        </div> */}

        <div>
          <h2 className="font-semibold text-xl mb-2">mtlarchives</h2>
          <span className="text-gray-500 text-sm">
            A dataset of historical photographs of Montreal.
          </span>
          <p className="mt-2 text-gray-700 leading-relaxed">
            After discovering the Montreal Open Data portal's collection of
            historical photographs, I created an{" "}
            <a
              href="https://www.instagram.com/mtlarchives/"
              className="text-blue-600 hover:underline"
            >
              Instagram
            </a>{" "}
            to share these glimpses of the past. The account is approaching 3000
            followers. I also developed a{" "}
            <a
              href="https://mtlarchives.com"
              className="text-blue-600 hover:underline"
            >
              photo blog
            </a>{" "}
            powered by Next.js that attracts about 90 visitors monthly, further
            expanding the project's reach.
          </p>
          <Link
            href="https://github.com/zouantchaw/mtlarchives"
            className="text-blue-600 hover:underline mt-2 inline-block"
          >
            code
          </Link>
        </div>
      </div>
    </section>
  );
}
