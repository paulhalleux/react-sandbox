import { Meta } from "@storybook/react";

import { cardStyles } from "./Card.styles.ts";
import { Card } from "./Card.tsx";

const meta: Meta = {
  title: "Containers/Card",
  tags: ["autodocs"],
  component: Card,
  argTypes: {
    children: {
      control: {
        disable: true,
      },
    },
    as: {
      control: {
        disable: true,
      },
    },
    type: {
      control: {
        type: "select",
        options: Object.keys(cardStyles.variants.type),
      },
    },
  },
};

export default meta;

export const Default = {
  args: {
    type: "default",
    children: <>lorem ipsum</>,
  },
};
