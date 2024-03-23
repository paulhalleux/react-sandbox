import React, { ComponentPropsWithoutRef } from "react";
import { clsx } from "clsx";

import { switchStyles, SwitchVariant } from "./Switch.styles.tsx";

export type SwitchProps = Omit<
  ComponentPropsWithoutRef<"input">,
  keyof SwitchVariant
> & {
  label?: React.ReactNode;
  containerClassName?: string;
} & SwitchVariant;

export function Switch({
  id = "switch",
  name = "switch",
  className,
  disabled,
  checked,
  onChange,
  label,
  size,
  ...props
}: SwitchProps) {
  const classes = switchStyles({ size });
  return (
    <label
      className={clsx(
        "inline-flex items-center cursor-pointer gap-2 select-none w-max",
        className
      )}
    >
      <input
        type="checkbox"
        className="sr-only peer"
        id={id}
        name={name}
        disabled={disabled}
        checked={checked}
        onChange={onChange}
        {...props}
      />
      <div className={classes} />
      {label}
    </label>
  );
}
