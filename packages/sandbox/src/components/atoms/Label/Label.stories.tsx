import { Meta } from "@storybook/react";

import { Label } from "./Label.tsx";

const meta: Meta = {
  title: "Atoms/Label",
  tags: ["autodocs"],
  component: Label,
  argTypes: {
    required: {
      control: { type: "boolean" },
    },
  },
};

export default meta;

export const Default = {
  args: {
    children: "Hello, world!",
    required: false,
  },
};
