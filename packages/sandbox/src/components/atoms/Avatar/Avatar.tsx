import React from "react";

import { avatarStyles, AvatarVariant } from "./Avatar.styles.tsx";

export type AvatarProps = {
  name: string;
  imgSrc?: string;
  color?: string;
  textColor?: string;
  alt?: string;
} & Omit<React.ComponentPropsWithoutRef<"figure">, keyof AvatarVariant> &
  AvatarVariant;

export function Avatar({
  imgSrc,
  alt,
  name,
  className,
  color,
  textColor,
  size,
  ...props
}: AvatarProps) {
  const classes = avatarStyles({ size, className });
  return (
    <figure
      title={name}
      className={classes}
      {...props}
      style={{ backgroundColor: color, color: textColor }}
    >
      {imgSrc ? (
        <img src={imgSrc} alt={alt ?? name} className="object-contain" />
      ) : (
        <figcaption>{getInitials(name)}</figcaption>
      )}
    </figure>
  );
}

/**
 * Get the initials of a name
 * @param name The name to get the initials of
 * @returns The initials of the name with a maximum of 2
 */
function getInitials(name: string) {
  const initials = name.split(" ").map((n) => n[0]);
  if (initials.length === 1) return initials[0];
  return initials[0] + initials[initials.length - 1];
}
