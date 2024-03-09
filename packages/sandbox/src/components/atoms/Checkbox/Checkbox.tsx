import React, { ComponentPropsWithoutRef } from "react";
import { clsx } from "clsx";

import { checkboxStyles, CheckboxVariant } from "./Checkbox.styles";

export type CheckboxProps = ComponentPropsWithoutRef<"input"> & {
  label?: React.ReactNode;
  containerClassName?: string;
} & CheckboxVariant;

export function Checkbox({
  id = "checkbox",
  name = "checkbox",
  className,
  disabled,
  checked,
  onChange,
  label,
  ...props
}: CheckboxProps) {
  const classes = checkboxStyles();
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
      <span className="grid">{label}</span>
    </label>
  );
}
