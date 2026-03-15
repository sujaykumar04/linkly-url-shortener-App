/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      backgroundImage: {
        "custom-gradient": "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
        "custom-gradient-2": "linear-gradient(135deg, #6366f1 0%, #ec4899 100%)",
        "card-gradient": "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
        "hero-glow": "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(99,102,241,0.15), transparent)",
      },
      colors: {
        // Brand
        primary: {
          50:  "#eef2ff",
          100: "#e0e7ff",
          200: "#c7d2fe",
          300: "#a5b4fc",
          400: "#818cf8",
          500: "#6366f1",
          600: "#4f46e5",
          700: "#4338ca",
          800: "#3730a3",
          900: "#312e81",
        },
        // Light mode surfaces
        surface: {
          DEFAULT: "#ffffff",
          secondary: "#f8fafc",
          border: "#e2e8f0",
        },
        // Dark mode surfaces
        dark: {
          bg:        "#0f0f13",
          surface:   "#17171d",
          surface2:  "#1e1e26",
          border:    "#2a2a35",
          muted:     "#6b7280",
        },
        // Keep legacy names so existing classes don't break
        navbarColor: "#ffffff",
        btnColor:    "#6366f1",
        linkColor:   "#4f46e5",
      },
      boxShadow: {
        custom:  "0 4px 24px rgba(99,102,241,0.10)",
        right:   "10px 0px 10px -5px rgba(0,0,0,0.08)",
        card:    "0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)",
        "card-hover": "0 4px 20px rgba(99,102,241,0.15)",
        glow:    "0 0 40px rgba(99,102,241,0.25)",
      },
      fontFamily: {
        sans:        ["Inter", "system-ui", "sans-serif"],
        roboto:      ["Inter", "sans-serif"],
        montserrat:  ["Inter", "sans-serif"],
        mono:        ["JetBrains Mono", "Fira Code", "monospace"],
      },
      borderRadius: {
        xl:  "12px",
        "2xl": "16px",
        "3xl": "24px",
      },
      animation: {
        "fade-in":    "fadeIn 0.4s ease forwards",
        "slide-up":   "slideUp 0.4s ease forwards",
        "pulse-slow": "pulse 3s cubic-bezier(0.4,0,0.6,1) infinite",
      },
      keyframes: {
        fadeIn:  { "0%": { opacity: 0 }, "100%": { opacity: 1 } },
        slideUp: { "0%": { opacity: 0, transform: "translateY(16px)" }, "100%": { opacity: 1, transform: "translateY(0)" } },
      },
    },
  },
  plugins: [],
};
