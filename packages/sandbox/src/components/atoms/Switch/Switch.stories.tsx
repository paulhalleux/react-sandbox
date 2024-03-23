import { Meta, StoryObj } from "@storybook/react";

import { Label } from "@/components/atoms";

import { switchStyles } from "./Switch.styles.tsx";
import { Switch } from "./Switch.tsx";

const meta: Meta<typeof Switch> = {
  title: "Atoms/Switch",
  tags: ["autodocs"],
  component: Switch,
  argTypes: {
    size: {
      control: { type: "select" },
      options: Object.keys(switchStyles.variants.size),
    },
    label: { control: "disabled" },
    id: { control: "disabled" },
    name: { control: "disabled" },
    containerClassName: { control: "disabled" },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: {
    size: "sm",
    label: <Label htmlFor="switch">Switch label</Label>,
    name: "switch",
    id: "switch",
  },
};
