import React, { ComponentPropsWithoutRef } from "react";

import {
  switchStyles,
  SwitchVariant,
} from "@/components/atoms/Switch/Switch.styles.ts";

export type SwitchProps = ComponentPropsWithoutRef<"input"> & {
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
  const { input, track, container } = switchStyles({ size });
  return (
    <label className={container({ className: className })}>
      <input
        type="checkbox"
        className={input()}
        id={id}
        name={name}
        disabled={disabled}
        checked={checked}
        onChange={onChange}
        {...props}
      />
      <div className={track()} />
      {label}
    </label>
  );
}
