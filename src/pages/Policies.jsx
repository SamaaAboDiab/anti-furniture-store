import { useDocumentTitle } from "../lib/useDocumentTitle";

// Placeholder policy text — have it reviewed before launch.
const SECTIONS = [
  {
    id: "terms",
    title: "Terms & Conditions",
    items: [
      "Prices are in US dollars and include sales tax. We confirm the total, including any delivery fee, before you pay.",
      "Delivery dates are estimates. We call to book a two-hour delivery window and will tell you right away if anything changes.",
      "You can return any item within 30 days of delivery. We collect it for free and refund the full price within 10 working days of collection.",
      "Frames carry a 10-year warranty; upholstery and hardware carry 2 years. The warranty covers manufacturing faults, not normal wear.",
    ],
  },
  {
    id: "privacy",
    title: "Privacy Policy",
    items: [
      "We collect only what we need to deliver your order and answer your messages: name, email, phone number and delivery address.",
      "We never sell your details. We share your address only with the delivery team taking your order to your door.",
      "Newsletter emails go only to people who subscribe, and every email has a one-click unsubscribe link.",
      "Email hello@anti-furniture.com to see, correct or delete the information we hold about you.",
    ],
  },
];

export default function Policies() {
  useDocumentTitle("Terms & privacy");

  return (
    <section className="container-page pt-12 md:pt-16">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-display-lg text-ink-900">Terms & privacy</h1>
        {SECTIONS.map((s) => (
          <section key={s.id} id={s.id} className="mt-12 scroll-mt-24">
            <h2 className="text-display-sm text-ink-900">{s.title}</h2>
            <ul className="mt-4 list-disc space-y-3 pl-5 leading-relaxed text-ink-700 marker:text-clay-500">
              {s.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </section>
  );
}
