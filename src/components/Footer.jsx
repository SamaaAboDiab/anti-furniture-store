import { Link } from "react-router-dom";
import { categories } from "../data/catalog";
import PaymentIcons from "./PaymentIcons";

const COLUMNS = [
  {
    title: "Shop",
    links: [
      { label: "All Products", to: "/shop" },
      ...categories.slice(0, 4).map((c) => ({ label: c.name, to: `/shop?room=${c.slug}` })),
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", to: "/about" },
      { label: "Our Story", to: "/about#story" },
      { label: "Blog", to: "/blog" },
      { label: "Contact", to: "/contact" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help Center", to: "/contact" },
      { label: "Shipping & Delivery", to: "/about#delivery" },
      { label: "Returns & Refunds", to: "/about#delivery" },
      { label: "Terms & Conditions", to: "/policies#terms" },
      { label: "Privacy Policy", to: "/policies#privacy" },
    ],
  },
];

const SOCIAL = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/",
    path: "M14 8.5h2.5V5H14c-2.5 0-4 1.6-4 4.1V11H8v3.5h2V21h3.5v-6.5H16l.5-3.5h-3V9.4c0-.6.3-.9.9-.9z",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/",
    path: "M8 3h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H8zm4 3.5a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7zm0 2a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM17 6.2a.9.9 0 1 1 0 1.8.9.9 0 0 1 0-1.8z",
  },
  {
    label: "Pinterest",
    href: "https://www.pinterest.com/",
    path: "M12 2a10 10 0 0 0-3.6 19.3c-.1-.8-.2-2 0-2.9l1.3-5.4s-.3-.7-.3-1.6c0-1.5.9-2.6 2-2.6.9 0 1.4.7 1.4 1.5 0 .9-.6 2.3-.9 3.6-.3 1.1.5 2 1.6 2 1.9 0 3.4-2 3.4-4.9 0-2.6-1.9-4.4-4.5-4.4-3 0-4.8 2.3-4.8 4.6 0 .9.4 1.9.8 2.4l.1.4-.3 1.2c0 .2-.2.3-.4.2-1.3-.6-2.1-2.5-2.1-4.1 0-3.3 2.4-6.4 7-6.4 3.7 0 6.5 2.6 6.5 6.1 0 3.7-2.3 6.6-5.5 6.6-1.1 0-2.1-.6-2.4-1.2l-.7 2.5c-.2.9-.9 2.1-1.3 2.8A10 10 0 1 0 12 2z",
  },
];

export default function Footer() {
  return (
    <footer className="mt-16 bg-moss-900 text-cream-100 md:mt-20">
      <div className="container-page grid grid-cols-2 gap-10 py-16 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div className="col-span-2 md:col-span-1">
          <Link to="/" className="font-display text-3xl text-cream-50">
            Anti
          </Link>
          <p className="mt-3 max-w-xs text-sm text-cream-100/65">Furniture for the way you live.</p>
          <ul className="mt-6 flex gap-3">
            {SOCIAL.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Anti on ${s.label}`}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-cream-100/20 text-cream-100/75 transition-colors hover:border-cream-50 hover:text-cream-50"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                    <path d={s.path} fillRule="evenodd" />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {COLUMNS.map((col) => (
          <div key={col.title}>
            <h2 className="font-body text-sm font-medium text-cream-50">{col.title}</h2>
            <ul className="mt-4 space-y-1">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="inline-block py-1 text-sm text-cream-100/60 transition-colors hover:text-cream-50">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-cream-100/10">
        <div className="container-page flex flex-col items-center justify-between gap-4 py-6 sm:flex-row">
          <p className="text-xs text-cream-100/50">© {new Date().getFullYear()} Anti. All rights reserved.</p>
          <PaymentIcons />
        </div>
      </div>
    </footer>
  );
}
