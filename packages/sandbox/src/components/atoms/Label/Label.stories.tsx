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
    help: {
      control: { type: "text" },
    },
    addon: {
      control: { type: "text" },
    },
    htmlFor: {
      control: { disable: true },
    },
  },
};

export default meta;

export const Default = {
  args: {
    children: "Hello, world!",
    required: false,
    help: "This is a help message.",
    addon: "This is an addon",
    requiredDisplay: "optional",
  },
};
