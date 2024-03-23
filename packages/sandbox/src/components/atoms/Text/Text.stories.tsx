import { Meta, StoryObj } from "@storybook/react";

import { textStyles } from "./Text.styles.tsx";
import { Text } from "./Text.tsx";

const meta: Meta<typeof Text> = {
  title: "Atoms/Text",
  tags: ["autodocs"],
  component: Text,
  argTypes: {
    size: {
      control: { type: "select" },
      options: Object.keys(textStyles.variants.size),
    },
    weight: {
      control: { type: "select" },
      options: Object.keys(textStyles.variants.weight),
    },
    color: {
      control: { type: "select" },
      options: Object.keys(textStyles.variants.color),
    },
    underline: {
      control: { type: "boolean" },
    },
    italic: {
      control: { type: "boolean" },
    },
    strikethrough: {
      control: { type: "boolean" },
    },
    as: {
      control: { disable: true },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: {
    children: "Hello, world!",
    size: "md",
    weight: "normal",
    color: "default",
    underline: false,
    italic: false,
    strikethrough: false,
  },
};

export const Lines = {
  render: () => (
    <Text.Lines
      text={`This component splits the text into lines\nand renders each line as a separate text element.`}
    />
  ),
};
