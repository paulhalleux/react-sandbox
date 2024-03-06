import { Meta } from "@storybook/react";

import { Label } from "@/components/atoms";

import { switchStyles } from "./Switch.styles.ts";
import { Switch } from "./Switch.tsx";

const meta: Meta = {
  title: "Atoms/Switch",
  tags: ["autodocs"],
  component: Switch,
  argTypes: {
    size: {
      control: { type: "select" },
      options: Object.keys(switchStyles.variants.size),
    },
    label: { control: { disable: true } },
    id: { control: { disable: true } },
    name: { control: { disable: true } },
  },
};

export default meta;

export const Default = {
  args: {
    name: "switch",
    id: "switch",
    size: "sm",
    label: <Label htmlFor="switch">Switch label</Label>,
  },
};
