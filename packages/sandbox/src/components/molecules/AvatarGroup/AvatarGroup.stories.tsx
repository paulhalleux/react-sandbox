import { Meta } from "@storybook/react";

import { Avatar } from "@/components/atoms";
import { avatarStyles } from "@/components/atoms/Avatar/Avatar.styles.tsx";

import { AvatarGroup } from "./AvatarGroup.tsx";

const meta: Meta = {
  title: "Molecules/AvatarGroup",
  tags: ["autodocs"],
  component: AvatarGroup,
  argTypes: {
    size: {
      control: {
        type: "select",
      },
      options: Object.keys(avatarStyles.variants.size),
    },
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
    max: 5,
    size: "md",
    children: [
      <Avatar key="a" name="Geoffrey Nicolas" size="md" />,
      <Avatar key="b" name="Mi Torp" size="md" />,
      <Avatar key="c" name="Clark MacGyver" size="md" />,
      <Avatar key="d" name="Bryon Aufderhar" size="md" />,
      <Avatar key="e" name="Gilbert O'Hara" size="md" />,
      <Avatar key="f" name="Hong Kovacek" size="md" />,
      <Avatar key="g" name="Lizbeth Kassulke" size="md" />,
      <Avatar key="h" name="Miss Carri Volkman" size="md" />,
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
      <Avatar key="a" name="Anya Feest" size="md" />,
      <Avatar key="b" name="Joan Mann" size="md" />,
      <Avatar key="c" name="Colby Ziemann" size="md" />,
      <Avatar key="d" name="Alisha Mante IV" size="md" />,
      <Avatar key="e" name="Miss Stanton Harris" size="md" />,
      <Avatar key="f" name="Adeline Marks" size="md" />,
      <Avatar key="g" name="Glen Howe" size="md" />,
      <Avatar key="h" name="Billie Harris" size="md" />,
    ],
    renderAvatar: (child: any) => (
      <button onClick={() => alert(child.props.name)}>{child}</button>
    ),
  },
};
