import { Meta } from "@storybook/react";

import { Label } from "@/components/atoms";

import { Checkbox } from "./Checkbox.tsx";

const meta: Meta = {
  title: "Atoms/Checkbox",
  tags: ["autodocs"],
  component: Checkbox,
  argTypes: {
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
    label: <Label htmlFor="switch">Checkbox label</Label>,
  },
};
