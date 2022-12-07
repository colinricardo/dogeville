const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  // prefix: "tw-",
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // NOTE: we remove the tailwind colors, and force usage of Audyo colors.
        // Uncomment this to get all the colors.
        // ...colors,
        theme: {
          DEFAULT: colors.white,
          dark: colors.neutral["900"],
        },
        brand: {
          DEFAULT: "#ec4f27",
          dark: "#ec4f27",
        },
        brandDark: {
          DEFAULT: "#C93712",
          dark: "#C93712",
        },
        brandLight: {
          DEFAULT: "#EF6E4D",
          dark: "#EF6E4D",
        },
        brandPale: {
          DEFAULT: "#FBD9D0",
          dark: "#FBD9D0",
        },
        white: {
          DEFAULT: colors.white,
          dark: colors.white,
        },
        primary: {
          DEFAULT: colors.black,
          dark: colors.white,
        },
        secondary: {
          DEFAULT: colors.neutral["500"],
          dark: colors.neutral["500"],
        },
        tertiary: {
          DEFAULT: colors.neutral["300"],
          dark: colors.neutral["700"],
        },
        layout: {
          DEFAULT: colors.neutral["100"],
          dark: colors.neutral["800"],
        },
        structure: {
          DEFAULT: colors.neutral["100"],
          dark: colors.neutral["800"],
        },
        plain: {
          DEFAULT: colors.neutral["100"],
          dark: colors.neutral["800"],
        },
        background: {
          DEFAULT: colors.white,
          dark: colors.black,
        },
        error: {
          DEFAULT: colors.red["700"],
          dark: colors.red["700"],
        },
        errorLight: {
          DEFAULT: colors.red["300"],
          dark: colors.red["300"],
        },
        errorPale: {
          DEFAULT: colors.red["100"],
          dark: colors.red["100"],
        },
        success: {
          DEFAULT: colors.green["700"],
          dark: colors.green["700"],
        },
        successLight: {
          DEFAULT: colors.green["300"],
          dark: colors.green["300"],
        },
        successPale: {
          DEFAULT: colors.green["100"],
          dark: colors.green["100"],
        },
        warning: {
          DEFAULT: colors.yellow["700"],
          dark: colors.yellow["700"],
        },
        warningLight: {
          DEFAULT: colors.yellow["300"],
          dark: colors.yellow["300"],
        },
        warningPale: {
          DEFAULT: colors.yellow["100"],
          dark: colors.yellow["100"],
        },
        transparent: {
          DEFAULT: colors.transparent,
          dark: colors.transparent,
        },
        purple: {
          DEFAULT: colors.purple["700"],
          dark: colors.purple["700"],
        },
        purplePale: {
          DEFAULT: colors.purple["100"],
          dark: colors.purple["100"],
        },
      },
      height: {
        content: "calc(100vh - 4rem)",
        drawer: "calc(100vh - 7rem)",
      },
      maxHeight: {
        content: "calc(100vh - 4rem)",
        drawer: "calc(100vh - 7rem)",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
