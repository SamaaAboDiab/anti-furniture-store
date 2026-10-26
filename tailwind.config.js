/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // Palette taken from the Stitch reference design
      colors: {
        cream: {
          50: "#FDFBF8",
          100: "#FAF6F0",
          200: "#F3EBE0",
          300: "#E8DCCB",
        },
        ink: {
          900: "#2A2521",
          700: "#4A4238",
          500: "#6F675C",
          300: "#B8AFA2",
        },
        clay: {
          100: "#F4E9DF",
          400: "#C99B6E",
          500: "#A86F47",
          600: "#8F5C3A",
          700: "#7D4C2E",
        },
        moss: {
          700: "#45473A",
          800: "#37392B",
          900: "#282A20",
        },
      },
      fontFamily: {
        display: ['"Fraunces"', "Georgia", "serif"],
        body: ['"Inter"', "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["clamp(2.75rem, 5.6vw, 5rem)", { lineHeight: "1.02", letterSpacing: "-0.02em" }],
        "display-lg": ["clamp(2.25rem, 4vw, 3.25rem)", { lineHeight: "1.08", letterSpacing: "-0.015em" }],
        "display-md": ["clamp(1.75rem, 2.6vw, 2.25rem)", { lineHeight: "1.15", letterSpacing: "-0.01em" }],
        "display-sm": ["1.375rem", { lineHeight: "1.25" }],
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      boxShadow: {
        card: "0 12px 32px -12px rgba(96, 74, 53, 0.18)",
        soft: "0 2px 12px rgba(96, 74, 53, 0.06)",
      },
      keyframes: {
        fade: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
      },
      maxWidth: {
        page: "80rem",
        prose: "34rem",
      },
    },
  },
  plugins: [],
};
