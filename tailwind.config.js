function withOpacity(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `hsla(var(${variableName}), ${opacityValue})`;
    }
    return `hsl(var(${variableName}))`;
  };
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
  ],
  mode: "jit",
  theme: {
    extend: {
      container: {
        center: true,
        padding: "1rem",
        screens: {
          "2xl": "1240px",
        },
      },
      backgroundImage: {},
      maxWidth: {
        lg: "860px",
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: withOpacity("--background"),
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: withOpacity("--primary"),
          dark: withOpacity("--primary-dark"),
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: withOpacity("--secondary"),
          200: withOpacity("--secondary-200"),
          300: withOpacity("--secondary-300"),
          400: withOpacity("--secondary-400"),
          500: withOpacity("--secondary-500"),
          600: withOpacity("--secondary-600"),
          700: withOpacity("--secondary-700"),
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
        white: withOpacity("--white"),
        green: withOpacity("--green"),
        orange: withOpacity("--orange"),
        sky: withOpacity("--sky"),
        fuchsia: withOpacity("--fuchsia"),
        purple: withOpacity("--purple"),
        "light-steel-blue": withOpacity("--light-steel-blue"),
        "carolina-blue": withOpacity("--carolina-blue"),
        "ultramarine-blue": withOpacity("--ultramarine-blue"),
        "lavender-indigo": withOpacity("--lavender-indigo"),
        "steel-pink": withOpacity("--steel-pink"),
        "carmine-pink": withOpacity("--carmine-pink"),
        "meat-brown": withOpacity("--meat-brown"),
      },
      textColor: {
        primary: withOpacity("--color-text-primary"),
        destructive: withOpacity("--color-text-destructive"),
        muted: withOpacity("--color-text-muted"),
      },
      borderRadius: {
        xl: "calc(var(--radius) + 4px)", // 12px
        lg: "var(--radius)", // 8px
        md: "calc(var(--radius) - 2px)", // 6px
        sm: "calc(var(--radius) - 4px)", // 4px
      },
      backdropBlur: {
        xs: "2px",
      },
      boxShadow: {
        sm: "10px 10px 20px 0px rgba(19, 19, 22, 0.48)",
        md: "10px 10px 40px 0px #131316",
        lg: "0px 4px 20px 0px rgba(239, 48, 48, 0.40)",
        inner: "10px 10px 50px 0px rgba(0, 0, 0, 0.25) inset",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("tailwind-scrollbar")({ nocompatible: true }),
  ],
};
