import { Config } from "tailwindcss/types";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  safelist: [
    {
      pattern: /grid-cols-\d/,
    },
    {
      pattern: /text-\w+-\d{3}/,
    },
  ],
  theme: {
    textColor: {
      DEFAULT: "#000000",
      white: "#ffffff",
      secondary: "#6b6c7e",
      danger: "#f44336",
      warning: "#ff9800",
      success: "#4caf50",
      info: "#2196f3",
      primary: "#1800ac",
    },
    borderColor: {
      DEFAULT: "#dcdee1",
      white: "#ffffff",
      dark: "#aaaaaf",
      danger: "#f44336",
      warning: "#ff9800",
      success: "#4caf50",
      info: "#2196f3",
      primary: "#1800ac",
    },
    backgroundColor: {
      DEFAULT: "#ffffff",
      black: "#000000",
      contrast: "#fafafc",
      ["contrast-secondary"]: "#f2f2f5",
      primary: "#1800ac",
    },
    borderRadius: {
      DEFAULT: "4px",
      sm: "4px",
      full: "9999px",
      none: "0",
    },
    ringColor: {
      DEFAULT: "#000000",
      white: "#ffffff",
      danger: "#f44336",
      primary: "#1800ac",
    },
    ringOpacity: {
      DEFAULT: "0.05",
      white: "1",
      primary: "0.1",
    },
    ringWidth: {
      DEFAULT: "2px",
      none: "0",
    },
    outline: {
      DEFAULT: ["2px solid #4c9aff", "2px"],
    },
    fontFamily: {
      sans: ["Inter", "sans-serif"],
    },
    extend: {},
  },
  plugins: [],
};

export default config;
