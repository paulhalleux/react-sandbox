import { create } from "@storybook/theming/create";

export const Theme = create({
  base: "light",
  brandTitle: `Documentation`,
  brandImage: require("../src/assets/logo.svg"),
  appBorderRadius: 0,

  appBg: "#FFF",

  colorPrimary: "#1E88E5",
  colorSecondary: "rgba(0,0,0,0.5)",
  barSelectedColor: "#1E88E5",
});