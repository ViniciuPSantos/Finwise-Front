/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#F5F3EC",       
        surface: "#FFFFFF",          
        "surface-elevated": "#EFEBE0",

        sidebar: "#0B0E0C",          
        "sidebar-hover": "#16241B",  

        primary: "#1E5E3F",          
        "primary-hover": "#1A5236", 
        accent: "#3FAE73",           

        income: "#2E9E5B",           
        expense: "#E0533D",          
        warning: "#D9A441",          

        "text-primary": "#1A1D1A",   
        "text-secondary": "#6B7280", 
        "text-on-dark": "#E8EDE9",   
      },
      fontFamily: {
        sans: ["Sora", "system-ui", "sans-serif"],
        mono: ["'DM Mono'", "monospace"],
      },
      borderRadius: {
        sm: "4px",
        md: "8px",
        lg: "16px",
        xl: "24px",
      },
      boxShadow: {
        card: "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
        modal: "0 8px 32px rgba(0,0,0,0.12)",
      },
    },
  },
  plugins: [],
};