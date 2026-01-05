import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
        sans: ['Outfit', 'sans-serif'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        purple: {
          900: "hsl(var(--purple-900))",
          700: "hsl(var(--purple-700))",
          500: "hsl(var(--purple-500))",
          400: "hsl(var(--purple-400))",
          300: "hsl(var(--purple-300))",
          200: "hsl(var(--purple-200))",
          100: "hsl(var(--purple-100))",
        },
        violet: {
          600: "hsl(var(--violet-600))",
          500: "hsl(var(--violet-500))",
          400: "hsl(var(--violet-400))",
          300: "hsl(var(--violet-300))",
        },
        slate: {
          900: "hsl(var(--slate-900))",
          700: "hsl(var(--slate-700))",
          500: "hsl(var(--slate-500))",
          300: "hsl(var(--slate-300))",
          100: "hsl(var(--slate-100))",
        },
        gold: {
          500: "hsl(var(--gold-500))",
          400: "hsl(var(--gold-400))",
        },
        teal: {
          600: "hsl(var(--teal-600))",
          500: "hsl(var(--teal-500))",
          400: "hsl(var(--teal-400))",
          300: "hsl(var(--teal-300))",
          100: "hsl(var(--teal-100))",
        },
        cyan: {
          600: "hsl(var(--cyan-600))",
          500: "hsl(var(--cyan-500))",
          400: "hsl(var(--cyan-400))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
        "4xl": "2.5rem",
      },
      transitionDuration: {
        '400': '400ms',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "slide-up": {
          from: { transform: "translateY(20px)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
        "scale-in": {
          from: { transform: "scale(0.95)", opacity: "0" },
          to: { transform: "scale(1)", opacity: "1" },
        },
        "gradient-shift": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px) translateX(0px)" },
          "50%": { transform: "translateY(-30px) translateX(20px)" },
        },
        "blob-morph": {
          "0%": { borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%" },
          "25%": { borderRadius: "58% 42% 75% 25% / 76% 46% 54% 24%" },
          "50%": { borderRadius: "50% 50% 33% 67% / 55% 27% 73% 45%" },
          "75%": { borderRadius: "33% 67% 58% 42% / 63% 68% 32% 37%" },
          "100%": { borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
        "slide-up": "slide-up 0.5s ease-out",
        "scale-in": "scale-in 0.3s ease-out",
        "gradient-shift": "gradient-shift 10s ease infinite",
        "float": "float 15s ease-in-out infinite",
        "blob-morph": "blob-morph 20s ease-in-out infinite",
        "shimmer": "shimmer 2s infinite linear",
      },
      backgroundImage: {
        "gradient-hero-primary": "linear-gradient(135deg, hsl(260 50% 25%) 0%, hsl(260 45% 35%) 50%, hsl(270 50% 45%) 100%)",
        "gradient-hero-accent": "linear-gradient(135deg, hsl(270 50% 35%) 0%, hsl(270 45% 45%) 50%, hsl(280 45% 55%) 100%)",
        "gradient-premium": "linear-gradient(135deg, hsl(260 50% 35%) 0%, hsl(270 50% 45%) 100%)",
        "gradient-card": "linear-gradient(135deg, hsl(0 0% 100%) 0%, hsl(260 15% 98%) 100%)",
        "gradient-mesh": "linear-gradient(135deg, hsl(260 15% 98%) 0%, hsl(0 0% 100%) 100%)",
        "gradient-subtle": "linear-gradient(180deg, hsl(260 20% 99%) 0%, hsl(260 15% 96%) 100%)",
      },
      boxShadow: {
        soft: "0 4px 20px -4px rgba(0, 0, 0, 0.06)",
        medium: "0 10px 40px -10px rgba(0, 0, 0, 0.08)",
        strong: "0 20px 60px -15px rgba(0, 0, 0, 0.1)",
        float: "0 10px 40px -10px rgba(0, 0, 0, 0.08)",
        "float-hover": "0 20px 50px -10px rgba(0, 0, 0, 0.12)",
        presence: "0 10px 40px -10px rgba(0, 0, 0, 0.08)",
        "presence-hover": "0 20px 50px -10px rgba(0, 0, 0, 0.12)",
        "glow-purple": "0 0 20px rgba(109, 40, 217, 0.3)",
        "glow-teal": "0 0 20px rgba(20, 184, 166, 0.3)",
      },
      backdropBlur: {
        xs: "2px",
      },
      scale: {
        "108": "1.08",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
