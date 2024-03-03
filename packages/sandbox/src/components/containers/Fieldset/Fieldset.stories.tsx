import { Meta } from "@storybook/react";

import { Field } from "@/components/molecules";

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
    legend: "Legend",
    description: "Description",
    className: "gap-2.5",
  },
};
