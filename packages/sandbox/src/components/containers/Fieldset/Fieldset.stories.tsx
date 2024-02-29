import { Meta } from "@storybook/react";

import { Input } from "@/components/atoms";

import { Fieldset } from "./Fieldset.tsx";

const meta: Meta = {
  title: "Containers/Fieldset",
  tags: ["autodocs"],
  component: Fieldset,
  argTypes: {
    children: {
      control: {
        disable: true,
      },
    },
  },
};

export default meta;

export const Default = {
  args: {
    children: (
      <>
        <Input />
        <Input />
      </>
    ),
    legend: "Legend",
    description: "Description",
  },
};
