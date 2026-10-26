import { Gem, Hammer, Sparkles, HeartHandshake } from "lucide-react";
import SectionHeader from "./SectionHeader";

const REASONS = [
  { icon: Gem, title: "Premium Materials", sub: "Solid oak, walnut and natural linen" },
  { icon: Hammer, title: "Expert Craftsmanship", sub: "Made with care and precision" },
  { icon: Sparkles, title: "Stylish & Functional", sub: "Designs that fit your lifestyle" },
  { icon: HeartHandshake, title: "Customer First", sub: "Real people, ready to help" },
];

export default function WhyShop() {
  return (
    <section className="container-page pt-14 md:pt-20">
      <SectionHeader title="Why Shop With Anti?" center />
      <ul className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
        {REASONS.map(({ icon: Icon, title, sub }) => (
          <li key={title} className="text-center">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-clay-100">
              <Icon className="h-6 w-6 text-clay-600" strokeWidth={1.5} aria-hidden="true" />
            </span>
            <p className="mt-4 text-sm font-medium text-ink-900">{title}</p>
            <p className="mx-auto mt-1 max-w-[12rem] text-sm text-ink-500">{sub}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
