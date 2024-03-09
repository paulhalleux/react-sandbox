import { Config } from "tailwindcss/types";

const colorShades = {
  gray: 500,
  success: 600,
  danger: 600,
  warning: 600,
  info: 600,
};

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  safelist: [
    {
      pattern: /grid-cols-\d/,
    },
  ],
  theme: {
    fontFamily: {
      sans: ["Inter", "sans-serif"],
    },
    borderRadius: {
      DEFAULT: "5px",
      default: "5px",
      sm: "5px",
      md: "7px",
      lg: "8px",
      full: "9999px",
      none: "0",
    },
    extend: {
      borderColor: (utils) => ({
        DEFAULT: utils.theme("colors.gray.300"),
      }),
      placeholderColor: (utils) => ({
        DEFAULT: utils.theme("colors.gray.400"),
      }),
      textColor: (utils) => ({
        DEFAULT: utils.theme("colors.gray.800"),
        default: utils.theme("colors.gray.800"),
        secondary: utils.theme(`colors.gray.${colorShades.gray}`),
        danger: utils.theme(`colors.red.${colorShades.danger}`),
        success: utils.theme(`colors.green.${colorShades.success}`),
        warning: utils.theme(`colors.yellow.${colorShades.warning}`),
        info: utils.theme(`colors.blue.${colorShades.info}`),
      }),
    },
  },
  plugins: [],
};

export default config;
