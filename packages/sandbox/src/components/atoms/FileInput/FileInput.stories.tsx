import { Meta, StoryObj } from "@storybook/react";

import { fileInputStyles } from "./FileInput.styles.tsx";
import { FileInput } from "./FileInput.tsx";

const meta: Meta<typeof FileInput> = {
  title: "Atoms/FileInput",
  tags: ["autodocs"],
  component: FileInput,
  argTypes: {
    size: {
      control: {
        type: "select",
      },
      options: Object.keys(fileInputStyles.variants.size),
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: {
    size: "md",
  },
};
