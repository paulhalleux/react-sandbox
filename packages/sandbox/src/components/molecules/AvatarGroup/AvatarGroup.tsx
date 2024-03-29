import React, { ReactNode } from "react";
import { clsx } from "clsx";

import { Avatar, AvatarProps, Text } from "@/components/atoms";
import { avatarStyles } from "@/components/atoms/Avatar/Avatar.styles";
import { ContextMenu } from "@/components/molecules";

export type AvatarGroupProps = {
  max?: number;
  size?: AvatarProps["size"];
  renderAvatar?: (child: ReactNode, props: AvatarProps) => React.ReactNode;
} & React.ComponentPropsWithoutRef<"div">;

export function AvatarGroup({
  children,
  max = 5,
  className,
  size,
  renderAvatar = (child) => child,
  ...props
}: AvatarGroupProps) {
  const ChildrenArray = React.Children.toArray(children);
  const AvatarChildren = ChildrenArray.filter(
    (child) => React.isValidElement(child) && child.type === Avatar
  );

  const correctedMax = Math.max(1, max);
  const classes = avatarStyles({ size });

  return (
    <div className={clsx("flex -space-x-1.5", className)} {...props}>
      {AvatarChildren.slice(0, correctedMax).map((child) => {
        if (!React.isValidElement<React.ComponentProps<typeof Avatar>>(child))
          return null;

        return renderAvatar(
          React.cloneElement(child, {
            size,
            className: clsx(classes, "ring-[3px] ring-white"),
          }),
          child.props
        );
      })}
      {correctedMax < ChildrenArray.length && (
        <ContextMenu.Popover
          placement="bottom-end"
          trigger={
            <button
              className={clsx(
                classes,
                "cursor-pointer ring-[3px] ring-white bg-gray-100"
              )}
            >
              +{ChildrenArray.length - correctedMax}
            </button>
          }
        >
          {AvatarChildren.slice(correctedMax).map((child) => {
            if (
              !React.isValidElement<React.ComponentProps<typeof Avatar>>(child)
            )
              return null;

            return (
              <ContextMenu.Item
                asChild
                displayOnly
                key={child.key}
                className="flex items-center gap-1.5"
              >
                {renderAvatar(
                  React.cloneElement(child, {
                    size: "xs",
                  }),
                  child.props
                )}
                <Text size="xs">{child.props.name}</Text>
              </ContextMenu.Item>
            );
          })}
        </ContextMenu.Popover>
      )}
    </div>
  );
}
