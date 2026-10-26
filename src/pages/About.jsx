import WhyChoose from "../components/WhyChoose";
import QuoteBanner from "../components/QuoteBanner";
import ourStoryImg from "../assets/products/our-story.jpg";
import { useDocumentTitle } from "../lib/useDocumentTitle";

const PROCESS = [
  { title: "Drawn in Portland", text: "Every piece starts as a full-size prototype that we live with for a month before it goes into production." },
  { title: "Made in small batches", text: "Our joiners build in runs of 20 to 40, so wood is matched by hand and nothing sits in a warehouse for a year." },
  { title: "Delivered by our own team", text: "Two people carry it in, assemble it in the room you choose and take every piece of packaging away." },
];

const DELIVERY = [
  ["Delivery", "Free on orders over $500, otherwise $49. Most pieces arrive in 2–4 weeks; we call to book a two-hour window."],
  ["Returns", "Changed your mind? Tell us within 30 days of delivery and we collect it for free and refund you in full."],
  ["Warranty", "10 years on every solid wood frame, 2 years on upholstery and hardware. Repairs are done in our workshop."],
];

export default function About() {
  useDocumentTitle("About");

  return (
    <>
      <section id="story" className="container-page scroll-mt-24 pt-12 md:pt-16">
        <div className="grid gap-10 md:grid-cols-2 md:items-end md:gap-16">
          <div>
            <h1 className="text-display-lg text-ink-900">We make fewer things, and make them to last</h1>
            <p className="mt-6 max-w-prose text-lg leading-relaxed text-ink-500">
              Anti started in 2014 in a one-room workshop with a simple
              objection to disposable furniture. Ten years on, we still design
              every piece around comfort first and build it with makers who
              care about the joints you never see.
            </p>
          </div>
          <img
            src={ourStoryImg}
            alt="Inside the Anti workshop"
            width={1200}
            height={900}
            loading="eager"
            decoding="async"
            className="aspect-[4/3] w-full rounded-xl bg-cream-200 object-cover"
          />
        </div>

        <ul className="mt-12 grid gap-8 border-t border-ink-900/15 pt-8 md:mt-20 md:grid-cols-3 md:gap-10 md:pt-10">
          {PROCESS.map((step, i) => (
            <li key={step.title}>
              <p className="text-sm tabular-nums text-ink-500">Step {i + 1}</p>
              <h2 className="mt-2 text-display-sm text-ink-900">{step.title}</h2>
              <p className="mt-3 text-ink-500">{step.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <WhyChoose showLink={false} />

      <section id="delivery" className="container-page scroll-mt-24 pt-14 md:pt-24">
        <h2 className="text-display-md text-ink-900">Delivery, returns and warranty</h2>
        <dl className="mt-10 divide-y divide-ink-900/10 border-y border-ink-900/10">
          {DELIVERY.map(([k, v]) => (
            <div key={k} className="grid gap-2 py-6 md:grid-cols-[14rem_1fr] md:gap-10">
              <dt className="font-display text-xl text-ink-900">{k}</dt>
              <dd className="max-w-prose text-ink-500">{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      <QuoteBanner />
    </>
  );
}
