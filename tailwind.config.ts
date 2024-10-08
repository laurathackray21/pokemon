import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
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
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        "background-alt": "hsl(var(--background-alt))",
        foreground: "hsl(var(--foreground))",
        header: "hsl(var(--header))",
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
        pokemon: {
          blue: {
            DEFAULT: "hsl(var(--blue))",
            foreground: "hsl(var(--blue-foreground))",
          },
          green: {
            DEFAULT: "hsl(var(--green))",
            foreground: "hsl(var(--green-foreground))",
          },
          red: {
            DEFAULT: "hsl(var(--red))",
            foreground: "hsl(var(--red-foreground))",
          },
          yellow: {
            DEFAULT: "hsl(var(--yellow))",
            foreground: "hsl(var(--yellow-foreground))",
          },
          black: {
            DEFAULT: "hsl(var(--black))",
            foreground: "hsl(var(--black-foreground))",
          },
          white: {
            DEFAULT: "hsl(var(--white))",
            foreground: "hsl(var(--white-foreground))",
          },
          brown: {
            DEFAULT: "hsl(var(--brown))",
            foreground: "hsl(var(--brown-foreground))",
          },
          purple: {
            DEFAULT: "hsl(var(--purple))",
            foreground: "hsl(var(--purple-foreground))",
          },
          pink: {
            DEFAULT: "hsl(var(--pink))",
            foreground: "hsl(var(--pink-foreground))",
          },
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
