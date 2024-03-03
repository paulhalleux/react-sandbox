import { Meta, StoryObj } from "@storybook/react";

import { Field } from "./Field";

const meta: Meta = {
  title: "Molecules/Field",
  tags: ["autodocs"],
  component: Field.Input,
  argTypes: {},
};

export default meta;

export const Input: StoryObj<typeof meta> = {
  args: {
    label: "Label",
    help: "Help text",
    example: "Example text",
    required: true,
    displayOptional: true,
  },
};

export const WithError: StoryObj<typeof meta> = {
  args: {
    label: "Label",
    help: "Help text",
    example: "Example text",
    error: "Error message",
    required: true,
    displayOptional: true,
  },
};
