import { Meta, StoryObj } from "@storybook/react";

import { inputStyles } from "./Input.styles.tsx";
import { Input } from "./Input.tsx";

const meta: Meta<typeof Input> = {
  title: "Atoms/Input",
  tags: ["autodocs"],
  component: Input,
  argTypes: {
    size: {
      control: { type: "select" },
      options: Object.keys(inputStyles.variants.size),
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: {
    size: "md",
  },
};
