import { useState } from "react";
import { photo } from "../data/catalog";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (!EMAIL_RE.test(email.trim())) {
      setError("Enter an email address like name@example.com.");
      return;
    }
    setError("");
    setSubmitted(true);
  }

  return (
    <section className="container-page pt-14 md:pt-20">
      <div className="relative overflow-hidden rounded-xl2 bg-cream-200 px-7 py-10 sm:px-12 sm:py-12">
        {/* Styled corner from the hero room, fading into the card colour */}
        <img
          src={photo("newsletter-plant")}
          alt=""
          width={424}
          height={640}
          loading="lazy"
          decoding="async"
          className="pointer-events-none absolute inset-y-0 right-0 hidden h-full w-[42%] object-cover object-[center_62%] [mask-image:linear-gradient(to_right,transparent,black_45%)] md:block"
        />

        <div className="relative max-w-lg">
          <h2 className="text-display-sm text-ink-900">Stay Updated with Anti</h2>
          <p className="mt-2 text-sm text-ink-500">
            Subscribe to get special offers, new arrivals and design inspiration.
            One email a month, unsubscribe any time.
          </p>

          {submitted ? (
            <p role="status" className="mt-6 text-sm font-medium text-clay-600">
              You're subscribed — look out for our next email at {email}.
            </p>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="mt-6">
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  id="newsletter-email"
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-invalid={!!error}
                  aria-describedby={error ? "newsletter-error" : undefined}
                  placeholder="Enter your email"
                  className={`field ${error ? "border-red-700" : ""}`}
                />
                <button type="submit" className="btn-primary shrink-0">
                  Subscribe
                </button>
              </div>
              {error && (
                <p id="newsletter-error" className="mt-2 text-sm text-red-700">
                  {error}
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
