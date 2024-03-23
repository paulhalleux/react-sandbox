import { Meta, StoryObj } from "@storybook/react";

import { cardStyles } from "./Card.styles.tsx";
import { Card } from "./Card.tsx";

const meta: Meta<typeof Card> = {
  title: "Containers/Card",
  tags: ["autodocs"],
  component: Card,
  argTypes: {
    type: {
      control: "select",
      options: Object.keys(cardStyles.variants.type),
    },
    children: {
      control: "disabled",
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: {
    type: "default",
    children: <>lorem ipsum</>,
  },
};
