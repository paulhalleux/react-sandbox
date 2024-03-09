import { Meta } from "@storybook/react";

import { avatarStyles } from "./Avatar.styles.tsx";
import { Avatar } from "./Avatar.tsx";

const meta: Meta = {
  title: "Atoms/Avatar",
  tags: ["autodocs"],
  component: Avatar,
  argTypes: {
    size: {
      control: { type: "select" },
      options: Object.keys(avatarStyles.variants.size),
    },
    color: { control: "color" },
    textColor: { control: "color" },
  },
};

export default meta;

export const Default = {
  args: {
    name: "John Doe",
    size: "md",
  },
};

/**
 * This story demonstrates the usage of the `Avatar` component with an image.
 */
export const WithImage = {
  args: {
    name: "John Doe",
    size: "md",
    imgSrc: "https://placehold.co/200x200/000000/FFF",
  },
};

/**
 * This story demonstrates the usage of the `Avatar` component with a color.
 */
export const WithColor = {
  args: {
    name: "John Doe",
    size: "md",
    color: "red",
    textColor: "white",
  },
};
