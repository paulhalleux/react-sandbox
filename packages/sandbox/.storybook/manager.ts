import { addons } from "@storybook/manager-api";
import { Theme } from "./theme";

import "./manager.css";

addons.setConfig({
  theme: Theme,
});