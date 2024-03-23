import { Meta, StoryObj } from "@storybook/react";

import { Label } from "./Label.tsx";

const meta: Meta<typeof Label> = {
  title: "Atoms/Label",
  tags: ["autodocs"],
  component: Label,
  argTypes: {
    required: {
      control: { type: "boolean" },
    },
    requiredDisplay: {
      control: {
        type: "select",
        options: ["optional", "required"],
      },
    },
    help: {
      control: { type: "text" },
    },
    addon: {
      control: { type: "text" },
    },
    htmlFor: {
      control: "disabled",
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: {
    children: "Hello, world!",
    required: false,
    help: "This is a help message.",
    addon: "This is an addon",
    requiredDisplay: "optional",
  },
};
