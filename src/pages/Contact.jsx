import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Send, CheckCircle2, ArrowRight, Truck, RotateCcw, Ruler } from "lucide-react";
import SectionHeader, { SectionFooterLink } from "../components/SectionHeader";
import { photo } from "../data/catalog";
import { useDocumentTitle } from "../lib/useDocumentTitle";

const INFO = [
  {
    icon: Mail,
    label: "Email us",
    value: "hello@anti-furniture.com",
    href: "mailto:hello@anti-furniture.com",
    note: "We reply within one working day",
  },
  {
    icon: Phone,
    label: "Call us",
    value: "+1 (555) 012-4830",
    href: "tel:+15550124830",
    note: "Mon–Fri, 9am–5pm PT",
  },
  {
    icon: MapPin,
    label: "Visit the showroom",
    value: "142 Maple Street, Portland",
    href: "https://maps.google.com/?q=142+Maple+Street+Portland+OR",
    note: "Open Tue–Sun, closed Mondays",
  },
];

const HOURS = [
  ["Monday", "Closed"],
  ["Tuesday – Friday", "10am – 6pm"],
  ["Saturday", "10am – 7pm"],
  ["Sunday", "11am – 5pm"],
];

const FAQ_LINK = { to: "/about#delivery", label: "Delivery & returns" };

const FAQ = [
  {
    icon: Truck,
    q: "How long does delivery take?",
    a: "Most pieces arrive in 2–4 weeks. We call you to book a two-hour window, then carry it in and assemble it.",
  },
  {
    icon: RotateCcw,
    q: "Can I return something?",
    a: "Yes — tell us within 30 days of delivery and we collect it for free and refund you in full.",
  },
  {
    icon: Ruler,
    q: "Do you make custom sizes?",
    a: "Many tables, sofas and shelves can be made in custom lengths or fabrics. Choose “Custom order” in the form and tell us the size you need.",
  },
];

const TOPICS = ["Existing order", "Choosing a piece", "Custom order", "Something else"];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const EMPTY = { name: "", email: "", topic: TOPICS[1], order: "", message: "" };

function validate(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = "Enter your name.";
  if (!EMAIL_RE.test(values.email.trim())) errors.email = "Enter an email address like name@example.com.";
  if (values.message.trim().length < 10) errors.message = "Write a message of at least 10 characters.";
  return errors;
}

export default function Contact() {
  useDocumentTitle("Contact");
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(null);

  const set = (key) => (e) => {
    setValues((v) => ({ ...v, [key]: e.target.value }));
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }));
  };

  function handleSubmit(e) {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    const firstInvalid = Object.keys(found)[0];
    if (firstInvalid) {
      document.getElementById(`contact-${firstInvalid}`)?.focus();
      return;
    }
    setSent({ name: values.name.trim().split(" ")[0], email: values.email.trim() });
    setValues(EMPTY);
  }

  const fieldProps = (key) => ({
    id: `contact-${key}`,
    name: key,
    value: values[key],
    onChange: set(key),
    "aria-invalid": !!errors[key],
    "aria-describedby": errors[key] ? `contact-${key}-error` : undefined,
    className: `field ${errors[key] ? "border-red-700 focus:border-red-700 focus:ring-red-700/15" : ""}`,
  });

  const errorText = (key) =>
    errors[key] && (
      <p id={`contact-${key}-error`} className="mt-2 text-sm text-red-700">
        {errors[key]}
      </p>
    );

  return (
    <>
      {/* Banner, styled like the home hero */}
      <section className="container-page pt-4 md:pt-6">
        <div className="relative overflow-hidden rounded-xl2 bg-cream-200">
          <img
            src={photo("scene-minimal-living")}
            alt=""
            width={1024}
            height={1024}
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover object-[center_55%]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-cream-50/95 via-cream-50/85 to-cream-50/55 md:via-cream-50/75 md:to-cream-50/10" />
          <div className="relative px-6 pb-24 pt-14 sm:px-10 md:px-14 md:pb-28 md:pt-20">
            <h1 className="text-display-xl text-ink-900">Get in Touch</h1>
            <p className="mt-4 max-w-md text-base leading-relaxed text-ink-700 sm:text-lg">
              Questions about an order, help measuring a room, or a custom
              piece — a real person on our team will answer.
            </p>
          </div>
        </div>

        {/* Contact options, overlapping the banner like the home features bar */}
        <ul className="relative z-10 mx-auto -mt-14 grid max-w-[calc(100%-2rem)] grid-cols-1 gap-3 sm:max-w-[calc(100%-4rem)] md:grid-cols-3 md:gap-5">
          {INFO.map(({ icon: Icon, label, value, href, note }) => (
            <li key={label}>
              <a
                href={href}
                {...(href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
                className="group flex h-full items-start gap-4 rounded-xl2 border border-ink-900/5 bg-white p-4 shadow-card sm:p-5 transition-transform duration-200 hover:-translate-y-0.5"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-clay-100 transition-colors group-hover:bg-clay-500">
                  <Icon className="h-5 w-5 text-clay-600 transition-colors group-hover:text-white" strokeWidth={1.5} aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm text-ink-500">{label}</span>
                  <span className="mt-0.5 block truncate font-medium text-ink-900 group-hover:text-clay-600">{value}</span>
                  <span className="mt-1 block text-xs text-ink-500">{note}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="container-page pt-14 md:pt-20">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-10">
          {/* Form */}
          <div className="rounded-xl2 border border-ink-900/5 bg-white p-6 shadow-soft sm:p-10">
            {sent ? (
              <div role="status" className="flex min-h-[420px] flex-col items-center justify-center text-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-clay-100">
                  <CheckCircle2 className="h-8 w-8 text-clay-600" strokeWidth={1.5} aria-hidden="true" />
                </span>
                <h2 className="mt-6 text-display-md text-ink-900">Thanks, {sent.name}!</h2>
                <p className="mt-3 max-w-sm text-ink-700">
                  Your message is on its way. We'll reply to{" "}
                  <strong className="font-medium text-ink-900">{sent.email}</strong> within one working day.
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  <button type="button" onClick={() => setSent(null)} className="btn-secondary">
                    Send another message
                  </button>
                  <Link to="/shop" className="btn-primary">
                    Continue shopping
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <h2 className="text-display-md text-ink-900">Send us a message</h2>
                <p className="mt-2 text-sm text-ink-500">All fields are required unless marked optional.</p>

                <div className="mt-8 grid gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="contact-name" className="field-label">Name</label>
                    <input type="text" autoComplete="name" placeholder="Jane Cooper" {...fieldProps("name")} />
                    {errorText("name")}
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="field-label">Email</label>
                    <input type="email" autoComplete="email" inputMode="email" placeholder="name@example.com" {...fieldProps("email")} />
                    {errorText("email")}
                  </div>
                </div>

                <fieldset className="mt-6">
                  <legend className="field-label">What can we help with?</legend>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {TOPICS.map((t) => (
                      <label key={t} className="cursor-pointer">
                        <input
                          type="radio"
                          name="topic"
                          value={t}
                          checked={values.topic === t}
                          onChange={set("topic")}
                          className="peer sr-only"
                        />
                        <span className="flex min-h-[44px] w-full items-center justify-center whitespace-nowrap rounded-full border border-ink-900/15 bg-white px-3 text-center text-sm text-ink-700 transition-colors hover:border-clay-500 peer-checked:border-clay-500 peer-checked:bg-clay-500 peer-checked:text-white peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-clay-600">
                          {t}
                        </span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                {values.topic === TOPICS[0] && (
                  <div className="mt-6">
                    <label htmlFor="contact-order" className="field-label">
                      Order number <span className="font-normal text-ink-500">(optional)</span>
                    </label>
                    <input type="text" placeholder="e.g. ANTI-10482" {...fieldProps("order")} />
                    <p className="mt-2 text-xs text-ink-500">You'll find it in your order confirmation email.</p>
                  </div>
                )}

                <div className="mt-6">
                  <label htmlFor="contact-message" className="field-label">Message</label>
                  <textarea
                    rows={6}
                    placeholder="Tell us what you need. Room measurements help if you're asking about sizes."
                    {...fieldProps("message")}
                  />
                  {errorText("message")}
                </div>

                <div className="mt-8 flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs text-ink-500">
                    We only use your details to reply. See our{" "}
                    <Link to="/policies#privacy" className="underline underline-offset-2 hover:text-clay-600">privacy policy</Link>.
                  </p>
                  <button type="submit" className="btn-primary w-full shrink-0 sm:w-auto sm:px-8">
                    Send message <Send className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Showroom — stretches to the form's height, the photo takes up the slack */}
          <div className="flex flex-col overflow-hidden rounded-xl2 border border-ink-900/5 bg-white shadow-soft">
            <div className="relative aspect-[16/9] bg-cream-200 lg:aspect-auto lg:min-h-[200px] lg:flex-1">
              <img
                src={photo("scene-living")}
                alt="Sofas and a walnut sideboard on display in the Anti showroom"
                width={1024}
                height={1024}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
            <div className="p-6 sm:p-8">
              <h2 className="text-display-sm text-ink-900">Visit our showroom</h2>
              <p className="mt-2 text-sm text-ink-500">
                Sit on every sofa and see the wood up close. No appointment needed.
              </p>
              <dl className="mt-5 space-y-2 text-sm">
                {HOURS.map(([day, time]) => (
                  <div key={day} className="flex justify-between gap-4">
                    <dt className="text-ink-700">{day}</dt>
                    <dd className={time === "Closed" ? "text-ink-500" : "font-medium tabular-nums text-ink-900"}>{time}</dd>
                  </div>
                ))}
              </dl>
              <a
                href="https://maps.google.com/?q=142+Maple+Street+Portland+OR"
                target="_blank"
                rel="noreferrer"
                className="link-underline mt-6"
              >
                Get directions <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="container-page pt-14 md:pt-20">
        <SectionHeader
          title="Quick answers"
          intro="The questions we hear most often."
          link={FAQ_LINK}
        />
        <ul className="grid gap-3 md:grid-cols-3 md:gap-5">
          {FAQ.map(({ icon: Icon, q, a }) => (
            <li key={q} className="grid grid-cols-[auto_1fr] gap-x-4 rounded-xl2 border border-ink-900/5 bg-white p-5 shadow-soft sm:p-7 md:block">
              <span className="row-span-2 flex h-10 w-10 items-center justify-center rounded-full bg-clay-100 md:h-11 md:w-11">
                <Icon className="h-5 w-5 text-clay-600" strokeWidth={1.5} aria-hidden="true" />
              </span>
              <h3 className="font-body text-base font-medium text-ink-900 md:mt-5">{q}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-500 md:mt-2">{a}</p>
            </li>
          ))}
        </ul>
        <SectionFooterLink link={FAQ_LINK} />
      </section>
    </>
  );
}
