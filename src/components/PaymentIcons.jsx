// Card-shaped payment marks (38×24), drawn inline so they need no image
// requests. Simplified versions of each brand's mark in its own colors.

function Card({ label, bg = "#FFFFFF", children }) {
  return (
    <svg viewBox="0 0 38 24" className="h-6 w-[38px]" role="img" aria-label={label}>
      <rect width="38" height="24" rx="4" fill={bg} />
      <rect
        x="0.5"
        y="0.5"
        width="37"
        height="23"
        rx="3.5"
        fill="none"
        stroke={bg === "#000000" ? "#FFFFFF" : "#000000"}
        strokeOpacity={bg === "#000000" ? 0.3 : 0.08}
      />
      {children}
    </svg>
  );
}

const ICONS = [
  {
    label: "Visa",
    render: () => (
      <Card label="Visa">
        <text
          x="19"
          y="16"
          textAnchor="middle"
          fontFamily="Arial, Helvetica, sans-serif"
          fontSize="11"
          fontWeight="900"
          fontStyle="italic"
          fill="#1A1F71"
          letterSpacing="-0.3"
        >
          VISA
        </text>
      </Card>
    ),
  },
  {
    label: "Mastercard",
    render: () => (
      <Card label="Mastercard">
        <circle cx="15" cy="12" r="7" fill="#EB001B" />
        <circle cx="23" cy="12" r="7" fill="#F79E1B" />
        <path d="M19 6.4a7 7 0 0 1 0 11.2 7 7 0 0 1 0-11.2z" fill="#FF5F00" />
      </Card>
    ),
  },
  {
    label: "American Express",
    render: () => (
      <Card label="American Express" bg="#1F72CD">
        <text
          x="19"
          y="15.5"
          textAnchor="middle"
          fontFamily="Arial, Helvetica, sans-serif"
          fontSize="8.5"
          fontWeight="900"
          fill="#FFFFFF"
          letterSpacing="0.2"
        >
          AMEX
        </text>
      </Card>
    ),
  },
  {
    label: "PayPal",
    render: () => (
      <Card label="PayPal">
        {/* Two overlapping "P" bowls, the PayPal monogram */}
        <path d="M15.2 5.5h5.1c2.6 0 3.8 1.4 3.4 3.6-.5 2.7-2.4 4-5 4h-1.6l-.9 5.4h-2.9l1.9-13z" fill="#003087" />
        <path d="M17.6 8h4.9c2.4 0 3.4 1.3 3 3.3-.5 2.5-2.2 3.7-4.6 3.7h-1.4l-.8 4.5h-2.7l1.6-11.5z" fill="#009CDE" />
        <path d="M17.6 8h2.7c.9 0 1.4.2 1.8.5-.4 2.6-2.4 4.6-5 4.6h-.6l.9-5.1z" fill="#012169" />
      </Card>
    ),
  },
  {
    label: "Apple Pay",
    render: () => (
      <Card label="Apple Pay" bg="#000000">
        {/* Simplified apple glyph */}
        <path
          d="M11.9 9.2c.6 0 1.3-.4 1.6-.9.4-.5.6-1.1.5-1.7-.6 0-1.2.4-1.6.9-.3.4-.6 1-.5 1.7zm1.9.3c-.9-.1-1.7.5-2.1.5s-1.1-.5-1.8-.5c-.9 0-1.8.6-2.3 1.4-1 1.7-.3 4.3.7 5.7.5.7 1 1.4 1.8 1.4.7 0 1-.5 1.8-.5s1.1.5 1.8.5c.8 0 1.2-.7 1.7-1.4.5-.8.8-1.6.8-1.6s-1.5-.6-1.5-2.3c0-1.4 1.2-2.1 1.2-2.2-.7-1-1.7-1.1-2.1-1.1z"
          fill="#FFFFFF"
        />
        <text x="17.5" y="15.8" fontFamily="-apple-system, Helvetica, Arial, sans-serif" fontSize="8.5" fontWeight="600" fill="#FFFFFF">
          Pay
        </text>
      </Card>
    ),
  },
];

export default function PaymentIcons() {
  return (
    <ul className="flex flex-wrap justify-center gap-2" aria-label="Accepted payment methods">
      {ICONS.map((icon) => (
        <li key={icon.label}>{icon.render()}</li>
      ))}
    </ul>
  );
}
