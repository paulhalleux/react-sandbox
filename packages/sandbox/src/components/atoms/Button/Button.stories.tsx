import { Meta } from "@storybook/react";

import { buttonStyles } from "./Button.styles.tsx";
import { Button } from "./Button.tsx";

const meta: Meta = {
  title: "Atoms/Button",
  tags: ["autodocs"],
  component: Button,
  argTypes: {
    status: {
      control: { type: "select" },
      options: Object.keys(buttonStyles.variants.status),
    },
    size: {
      control: { type: "select" },
      options: Object.keys(buttonStyles.variants.size),
    },
  },
};

export default meta;

export const Default = {
  args: {
    children: "Button",
    status: "default",
    size: "md",
  },
};
