import { Meta } from "@storybook/react";

import { Avatar } from "@/components/atoms";

import { AvatarGroup } from "./AvatarGroup.tsx";

const meta: Meta = {
  title: "Molecules/AvatarGroup",
  tags: ["autodocs"],
  component: AvatarGroup,
  argTypes: {},
};

export default meta;

export const Default = {
  args: {
    max: 5,
    children: [
      <Avatar key="a" name="John Doe" size="md" />,
      <Avatar key="b" name="Jane Doe" size="md" />,
      <Avatar key="c" name="John Doe" size="md" />,
      <Avatar key="d" name="Jane Doe" size="md" />,
      <Avatar key="e" name="John Doe" size="md" />,
      <Avatar key="f" name="Jane Doe" size="md" />,
      <Avatar key="g" name="John Doe" size="md" />,
      <Avatar key="h" name="Jane Doe" size="md" />,
    ],
  },
};

/**
 * Custom render with button. Clicking on the avatar will alert the name of the avatar.
 */
export const CustomRender = {
  args: {
    max: 5,
    children: [
      <Avatar key="a" name="John Doe" size="md" />,
      <Avatar key="b" name="Jane Doe" size="md" />,
      <Avatar key="c" name="John Doe" size="md" />,
      <Avatar key="d" name="Jane Doe" size="md" />,
      <Avatar key="e" name="John Doe" size="md" />,
      <Avatar key="f" name="Jane Doe" size="md" />,
      <Avatar key="g" name="John Doe" size="md" />,
      <Avatar key="h" name="Jane Doe" size="md" />,
    ],
    renderAvatar: (child: any) => (
      <button onClick={() => alert(child.props.name)}>{child}</button>
    ),
  },
};
