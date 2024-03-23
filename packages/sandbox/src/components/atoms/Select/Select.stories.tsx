import { Meta, StoryObj } from "@storybook/react";

import { selectStyles } from "./Select.styles.tsx";
import { Select } from "./Select.tsx";

const meta: Meta<typeof Select> = {
  title: "Atoms/Select",
  tags: ["autodocs"],
  component: Select,
  argTypes: {
    children: {
      control: { type: "disabled" },
    },
    size: {
      control: { type: "select" },
      options: Object.keys(selectStyles.variants.size),
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: {
    size: "md",
    children: (
      <>
        <Select.Option value="1">Option 1</Select.Option>
        <Select.Option value="2">Option 2</Select.Option>
        <Select.Option value="3">Option 3</Select.Option>
      </>
    ),
  },
};
