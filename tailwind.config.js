/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        pine: {
          950: "#052B20", 900: "#06372A", 800: "#084A37",
          700: "#0B5E43", 600: "#0E7351", 500: "#12936A", 400: "#1FB07F",
        },
        mint: {
          600: "#1FA971", 500: "#34C28E", 400: "#5AD3A4", 300: "#7BE0B4",
          200: "#A7E8CE", 100: "#D6F4E6", 50: "#EBF9F2",
        },
        brass: {
          700: "#9C7A2E", 600: "#BE9540", 500: "#D9B25A",
          400: "#E6C77F", 200: "#F1E1B4", 100: "#FAF1D9",
        },
        paper: { DEFAULT: "#F6F4EC", card: "#FFFFFF", sunk: "#EFEDE2" },
        line: { DEFAULT: "#E2E0D4", strong: "#CFCDBF" },
        ink: { 900: "#14201B", 700: "#2E3A33", 500: "#5C6B63", 400: "#7E8C83" },
        vault: {
          bg: "#0A1410", card: "#11201A", elev: "#193127", line: "#24382E",
        },
        cream: { 100: "#EAF3EE", 300: "#B7C9BF", 500: "#8AA193" },
        income: { DEFAULT: "#1FA971", soft: "#D6F4E6" },
        expense: { DEFAULT: "#D9543D", soft: "#FBE3DC" },
        warning: { DEFAULT: "#E0A93C", soft: "#FBEFD4" },
        info: "#2E7D8C",
        cat: {
          1: "#0B5E43", 2: "#D9B25A", 3: "#2E7D8C", 4: "#C0683E",
          5: "#7A5CA3", 6: "#1FA971", 7: "#B5495E", 8: "#5C6B63",
        },
        background: "#F6F4EC",
        surface: "#FFFFFF",
        "surface-elevated": "#EFEDE2",
        primary: "#0B5E43",
        "primary-hover": "#084A37",
        accent: "#34C28E",
        "text-primary": "#14201B",
        "text-secondary": "#5C6B63",
        "text-on-dark": "#EAF3EE",
      },
      fontFamily: {
        display: ["'Bricolage Grotesque'", "'Hanken Grotesk'", "sans-serif"],
        sans: ["'Hanken Grotesk'", "system-ui", "-apple-system", "sans-serif"],
        mono: ["'Space Mono'", "ui-monospace", "monospace"],
      },
      fontSize: {
        display: ["56px", { lineHeight: "1.02", letterSpacing: "-0.03em", fontWeight: "800" }],
        h1: ["34px", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "800" }],
        h2: ["24px", { lineHeight: "1.18", letterSpacing: "-0.015em", fontWeight: "700" }],
        h3: ["18px", { lineHeight: "1.25", letterSpacing: "-0.01em", fontWeight: "700" }],
        money: ["30px", { lineHeight: "1.0", letterSpacing: "-0.01em", fontWeight: "700" }],
      },
      borderRadius: {
        xs: "6px", sm: "10px", md: "14px", lg: "20px", xl: "28px", pill: "999px",
      },
      boxShadow: {
        xs: "0 1px 2px rgba(20,32,27,0.06)",
        sm: "0 2px 6px rgba(20,32,27,0.07)",
        card: "0 4px 16px rgba(20,32,27,0.07), 0 1px 3px rgba(20,32,27,0.05)",
        pop: "0 12px 36px rgba(20,32,27,0.14), 0 2px 8px rgba(20,32,27,0.08)",
        pine: "0 10px 28px rgba(11,94,67,0.28)",
        vault: "0 8px 28px rgba(0,0,0,0.45)",
      },
      transitionTimingFunction: {
        DEFAULT: "cubic-bezier(0.22, 0.61, 0.36, 1)",
        spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
    },
  },
  plugins: [],
};