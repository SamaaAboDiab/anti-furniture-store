import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function SectionHeader({ title, intro, link, center = false }) {
  if (center) {
    return (
      <div className="mb-10 text-center">
        <h2 className="text-display-md text-ink-900">{title}</h2>
        {intro && <p className="mx-auto mt-2 max-w-prose text-ink-500">{intro}</p>}
      </div>
    );
  }

  return (
    <div className="mb-8 flex items-end justify-between gap-4">
      <div>
        <h2 className="text-display-md text-ink-900">{title}</h2>
        {intro && <p className="mt-2 max-w-prose text-sm text-ink-500 sm:text-base">{intro}</p>}
      </div>
      {link && (
        <Link to={link.to} className="btn-secondary shrink-0 max-sm:hidden">
          {link.label} <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      )}
    </div>
  );
}

// Mobile-only version of the header link, placed under the content
export function SectionFooterLink({ link }) {
  return (
    <Link to={link.to} className="btn-secondary mt-8 w-full sm:hidden">
      {link.label} <ArrowRight className="h-4 w-4" aria-hidden="true" />
    </Link>
  );
}
