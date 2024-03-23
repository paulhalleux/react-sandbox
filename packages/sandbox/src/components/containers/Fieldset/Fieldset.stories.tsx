import { Meta, StoryObj } from "@storybook/react";

import { Field } from "@/components/molecules";

import { Fieldset } from "./Fieldset.tsx";

const meta: Meta<typeof Fieldset> = {
  title: "Containers/Fieldset",
  tags: ["autodocs"],
  component: Fieldset,
  argTypes: {
    children: {
      control: {
        type: "disabled",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: {
    legend: "Legend",
    description: "Description",
    className: "gap-2.5",
    children: (
      <>
        <Field.Input
          label="Firstname"
          help="Enter you firstname"
          example="Eg. John"
        />
        <Field.Input
          label="Lastname"
          help="Enter you lastname"
          example="Eg. Doe"
        />
      </>
    ),
  },
};
