import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { NavLink, Link, useLocation } from "react-router-dom";
import { ShoppingCart, Menu, X, Mail, Phone, ChevronRight } from "lucide-react";
import { useCart } from "../context/cart";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/collections", label: "Collections" },
  { to: "/about", label: "About" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
];

const linkClass = ({ isActive }) =>
  `relative rounded-md py-2 text-sm transition-colors duration-200 ${
    isActive
      ? "font-medium text-clay-600 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:rounded-full after:bg-clay-500"
      : "text-ink-700 hover:text-ink-900"
  }`;

// Full-height side drawer for small screens. Rendered into <body> through a
// portal: the header's backdrop-blur would otherwise trap position:fixed
// inside the header's own box.
function MobileDrawer({ open, onClose, onNavClick, count }) {
  const panelRef = useRef(null);
  const returnFocusRef = useRef(null);

  // Lock page scroll while open, move focus in, and restore it on close
  useEffect(() => {
    if (!open) return;
    returnFocusRef.current = document.activeElement;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    // Focus the panel itself (not the close button) so no focus ring flashes on tap;
    // Tab then moves straight into the links.
    panelRef.current?.focus();

    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      // Keep Tab inside the drawer
      if (e.key === "Tab" && panelRef.current) {
        const items = panelRef.current.querySelectorAll("a[href], button:not([disabled])");
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
      returnFocusRef.current?.focus?.();
    };
  }, [open, onClose]);

  return createPortal(
    <div className={`fixed inset-0 z-[60] lg:hidden ${open ? "" : "pointer-events-none"}`} inert={!open}>
      {/* Backdrop */}
      <div
        onClick={onClose}
        aria-hidden="true"
        className={`absolute inset-0 bg-ink-900/40 backdrop-blur-[2px] transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        id="mobile-nav"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        tabIndex={-1}
        className={`absolute inset-y-0 outline-none right-0 flex h-[100dvh] w-[86%] max-w-sm flex-col bg-cream-50 transition-[transform,box-shadow] duration-300 ease-out ${
          open ? "translate-x-0 shadow-[-24px_0_48px_-24px_rgba(42,37,33,0.35)]" : "translate-x-full shadow-none"
        }`}
      >
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-ink-900/5 px-5">
          <Link to="/" onClick={() => onNavClick("/")} className="font-display text-[1.75rem] leading-none tracking-tight text-ink-900">
            Anti
          </Link>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="-mr-2 flex h-11 w-11 items-center justify-center rounded-full text-ink-900 transition-colors hover:bg-cream-200"
          >
            <X className="h-6 w-6" strokeWidth={1.5} />
          </button>
        </div>

        <nav aria-label="Main" className="flex-1 overflow-y-auto px-3 py-4">
          <ul className="space-y-1">
            {LINKS.map((link, i) => (
              <li
                key={link.to}
                className={`transition-all duration-300 ease-out ${open ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"}`}
                style={{ transitionDelay: open ? `${80 + i * 35}ms` : "0ms" }}
              >
                <NavLink
                  to={link.to}
                  end={link.to === "/"}
                  onClick={() => onNavClick(link.to)}
                  className={({ isActive }) =>
                    `flex min-h-[52px] items-center justify-between rounded-xl px-3 font-display text-xl transition-colors ${
                      isActive ? "bg-cream-200 text-clay-600" : "text-ink-900 hover:bg-cream-100"
                    }`
                  }
                >
                  {link.label}
                  <ChevronRight className="h-4 w-4 text-ink-300" aria-hidden="true" />
                </NavLink>
              </li>
            ))}
          </ul>

          <Link
            to="/cart"
            onClick={() => onNavClick("/cart")}
            className="mx-3 mt-4 flex items-center justify-between rounded-xl border border-ink-900/10 bg-white px-4 py-3 text-sm text-ink-900"
          >
            <span className="flex items-center gap-3">
              <ShoppingCart className="h-5 w-5 text-clay-600" strokeWidth={1.5} aria-hidden="true" />
              Your cart
            </span>
            <span className="rounded-full bg-clay-100 px-2.5 py-0.5 text-xs font-semibold tabular-nums text-clay-700">
              {count} {count === 1 ? "item" : "items"}
            </span>
          </Link>
        </nav>

        <div className="shrink-0 space-y-4 border-t border-ink-900/5 p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
          <Link to="/shop" onClick={() => onNavClick("/shop")} className="btn-primary w-full">
            Get Started
          </Link>
          <div className="flex flex-col gap-2 text-sm text-ink-500">
            <a href="mailto:hello@anti-furniture.com" className="flex items-center gap-2 hover:text-clay-600">
              <Mail className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" /> hello@anti-furniture.com
            </a>
            <a href="tel:+15550124830" className="flex items-center gap-2 hover:text-clay-600">
              <Phone className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" /> +1 (555) 012-4830
            </a>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { count } = useCart();
  const location = useLocation();
  const closeMenu = useCallback(() => setOpen(false), []);

  // Close the mobile menu on any navigation (logo, cart, back button…)
  useEffect(() => {
    setOpen(false);
  }, [location.pathname, location.search]);

  // Close it too if the screen grows past the mobile breakpoint
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = (e) => e.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Clicking a link to the page you're already on scrolls back to the top
  // (the route doesn't change, so the usual scroll reset wouldn't run).
  function handleNavClick(to) {
    if (location.pathname !== to) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    setOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-ink-900/5 bg-cream-50/90 backdrop-blur-md">
      <div className="container-page flex h-16 items-center justify-between gap-6 md:h-20">
        <Link to="/" onClick={() => handleNavClick("/")} className="font-display text-[1.75rem] leading-none tracking-tight text-ink-900">
          Anti
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-8 lg:flex">
          {LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.to === "/"} onClick={() => handleNavClick(link.to)} className={linkClass}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-4">
          <NavLink
            to="/cart"
            onClick={() => handleNavClick("/cart")}
            aria-label={`Cart, ${count} item${count === 1 ? "" : "s"}`}
            className="relative flex h-11 w-11 items-center justify-center rounded-full text-ink-900 transition-colors hover:bg-cream-200 hover:text-clay-600"
          >
            <ShoppingCart className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
            {count > 0 && (
              <span
                aria-hidden="true"
                className="absolute right-0.5 top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-clay-500 px-1 text-[10px] font-semibold text-white"
              >
                {count > 99 ? "99+" : count}
              </span>
            )}
          </NavLink>
          <Link to="/shop" onClick={() => handleNavClick("/shop")} className="btn-primary max-sm:hidden">
            Get Started
          </Link>
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen(true)}
            className="-mr-2 flex h-11 w-11 items-center justify-center rounded-full text-ink-900 transition-colors hover:bg-cream-200 lg:hidden"
          >
            <Menu className="h-6 w-6" strokeWidth={1.5} />
          </button>
        </div>
      </div>

      <MobileDrawer open={open} onClose={closeMenu} onNavClick={handleNavClick} count={count} />
    </header>
  );
}
