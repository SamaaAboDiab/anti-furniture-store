import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { blogPosts, getPostBySlug, formatDate } from "../data/blog";
import { BlogCard } from "../components/BlogSection";
import { useDocumentTitle } from "../lib/useDocumentTitle";
import NotFound from "./NotFound";

export default function BlogPost() {
  const { slug } = useParams();
  const post = getPostBySlug(slug);
  useDocumentTitle(post?.title || "Page not found");

  if (!post) return <NotFound message="We couldn't find that article." />;

  const more = blogPosts.filter((p) => p.slug !== post.slug);

  return (
    <>
      <article className="container-page pt-10 md:pt-14">
        <div className="mx-auto max-w-3xl">
          <div className="flex justify-end">
            <Link to="/blog" className="btn-secondary">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" /> All posts
            </Link>
          </div>
          <h1 className="mt-8 text-display-lg text-ink-900">{post.title}</h1>
          <p className="mt-3 text-sm text-ink-500">
            <time dateTime={post.date}>{formatDate(post.date)}</time> — {post.readMinutes} min read
          </p>
        </div>

        <img
          src={post.image}
          alt=""
          width={1000}
          height={1000}
          decoding="async"
          className="mx-auto mt-8 aspect-[16/9] w-full max-w-5xl rounded-xl2 bg-cream-200 object-cover"
        />

        <div className="mx-auto mt-10 max-w-prose">
          <p className="text-lg leading-relaxed text-ink-700">{post.excerpt}</p>
          {post.body.map(([heading, text]) => (
            <section key={heading} className="mt-8">
              <h2 className="text-display-sm text-ink-900">{heading}</h2>
              <p className="mt-3 leading-relaxed text-ink-700">{text}</p>
            </section>
          ))}
          <Link to="/shop" className="btn-primary mt-10">
            Shop the collection
          </Link>
        </div>
      </article>

      <section className="container-page pt-14 md:pt-20">
        <h2 className="mb-8 text-display-md text-ink-900">Keep reading</h2>
        <ul className="grid grid-cols-2 gap-4 sm:gap-8">
          {more.map((p) => (
            <li key={p.slug}>
              <BlogCard post={p} />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
