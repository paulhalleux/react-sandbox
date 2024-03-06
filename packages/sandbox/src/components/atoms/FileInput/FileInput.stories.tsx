import { Meta } from "@storybook/react";

import { fileInputStyles } from "./FileInput.styles.tsx";
import { FileInput } from "./FileInput.tsx";

const meta: Meta = {
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

export const Default = {
  args: {
    size: "md",
  },
};
