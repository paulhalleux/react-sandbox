import { Meta } from "@storybook/react";

import { inputStyles } from "./Input.styles.tsx";
import { Input } from "./Input.tsx";

const meta: Meta = {
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

export const Default = {
  args: {
    size: "md",
  },
};
