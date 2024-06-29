import { BlogPosts } from "app/components/posts";

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        Hi, I'm Wiel 👋🏾
      </h1>
      <p className="mb-4">
        {`I'm a software developer, optimist, and family man. I currently `}
        <a href="/work">work</a>
        {` as a full stack developer at `}
        <a href="https://www.heyethos.com/">ethos</a>
        {` where I help build the future of customer loyalty.`}
      </p>
      <p className="mb-4">
        {`When I'm not working, I'm most likely `}
        <a href="/blog/books-read-2022">reading</a>
        {`, training, spending time with family and friends, or hacking on a side `}
        <a href="/projects">project</a>
        {`.`}
      </p>
      <div className="my-8">
        <BlogPosts />
      </div>
    </section>
  );
}
