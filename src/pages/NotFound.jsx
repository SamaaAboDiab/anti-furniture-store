import { Link } from "react-router-dom";
import { useDocumentTitle } from "../lib/useDocumentTitle";

export default function NotFound({ message = "The page you're looking for doesn't exist or has moved." }) {
  useDocumentTitle("Page not found");

  return (
    <section className="container-page flex flex-col items-start py-16 md:py-32">
      <h1 className="text-display-lg text-ink-900">Page not found</h1>
      <p className="mt-4 max-w-prose text-lg text-ink-500">{message}</p>
      <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
        <Link to="/shop" className="btn-primary">Shop all furniture</Link>
        <Link to="/" className="link-underline">Go to the home page</Link>
      </div>
    </section>
  );
}
