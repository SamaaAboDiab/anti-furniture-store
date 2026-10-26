import { blogPosts } from "../data/blog";
import { BlogCard } from "../components/BlogSection";
import Newsletter from "../components/Newsletter";
import { useDocumentTitle } from "../lib/useDocumentTitle";

export default function Blog() {
  useDocumentTitle("Blog");

  return (
    <>
      <section className="container-page pt-12 md:pt-16">
        <h1 className="text-display-lg text-ink-900">The Anti Journal</h1>
        <p className="mt-3 max-w-prose text-lg text-ink-500">
          Styling ideas, buying guides and notes from the workshop.
        </p>
        <ul className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <li key={post.slug}>
              <BlogCard post={post} />
            </li>
          ))}
        </ul>
      </section>
      <Newsletter />
    </>
  );
}
