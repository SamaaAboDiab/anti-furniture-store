import { Link } from "react-router-dom";
import { blogPosts, formatDate } from "../data/blog";
import SectionHeader, { SectionFooterLink } from "./SectionHeader";

const LINK = { to: "/blog", label: "View All Posts" };

export function BlogCard({ post }) {
  return (
    <Link to={`/blog/${post.slug}`} className="group block">
      <div className="aspect-[4/3] overflow-hidden rounded-xl bg-cream-200 ring-1 ring-ink-900/5">
        <img
          src={post.image}
          alt=""
          width={1000}
          height={1000}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />
      </div>
      <h3 className="mt-4 font-body text-[0.9375rem] font-medium text-ink-900 transition-colors group-hover:text-clay-600">
        {post.title}
      </h3>
      <p className="mt-1 text-sm text-ink-500">
        <time dateTime={post.date}>{formatDate(post.date)}</time> — {post.readMinutes} min read
      </p>
    </Link>
  );
}

export default function BlogSection() {
  return (
    <section className="container-page pt-14 md:pt-20">
      <SectionHeader title="From Our Blog" link={LINK} />
      <ul className="-mx-4 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-6 sm:overflow-visible sm:px-0 sm:pb-0">
        {blogPosts.map((post) => (
          <li key={post.slug} className="w-[78%] shrink-0 snap-start sm:w-auto">
            <BlogCard post={post} />
          </li>
        ))}
      </ul>
      <SectionFooterLink link={LINK} />
    </section>
  );
}
