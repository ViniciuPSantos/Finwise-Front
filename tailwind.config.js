/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#0F1117",
        surface: "#1A1D2E",
        "surface-elevated": "#242840",
        primary: "#6C63FF",
        income: "#4ADE80",
        expense: "#F87171",
        warning: "#FBBF24",
        "text-secondary": "#A0AEC0",
        "text-primary": "#F1F5F9",
      },
      fontFamily: {
        sans: ["Sora", "system-ui", "sans-serif"],
        mono: ["'DM Mono'", "monospace"],
      },
      borderRadius: {
        sm: "4px",
        md: "8px",
        lg: "16px",
      },
      boxShadow: {
        card: "0 1px 3px rgba(0,0,0,0.4)",
        modal: "0 8px 32px rgba(0,0,0,0.6)",
      },
    },
  },
  plugins: [],
};