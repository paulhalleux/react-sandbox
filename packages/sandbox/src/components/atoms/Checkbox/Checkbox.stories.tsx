import { Meta, StoryObj } from "@storybook/react";

import { Label } from "@/components/atoms";

import { Checkbox } from "./Checkbox.tsx";

const meta: Meta<typeof Checkbox> = {
  title: "Atoms/Checkbox",
  tags: ["autodocs"],
  component: Checkbox,
  argTypes: {
    label: { control: "disabled" },
    id: { control: "disabled" },
    name: { control: "disabled" },
    containerClassName: { control: "disabled" },
  },
};

export default meta;

type Story = StoryObj<typeof Checkbox>;
export const Default: Story = {
  args: {
    name: "switch",
    id: "switch",
    label: <Label htmlFor="switch">Checkbox label</Label>,
  },
};
