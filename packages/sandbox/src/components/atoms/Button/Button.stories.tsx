import { Meta, StoryObj } from "@storybook/react";

import { buttonStyles } from "./Button.styles.tsx";
import { Button } from "./Button.tsx";

const meta: Meta<typeof Button> = {
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

type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: {
    children: "Button",
    status: "default",
    size: "md",
  },
};
