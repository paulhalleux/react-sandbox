import React from "react";

import { selectStyles, SelectVariant } from "./Select.styles.tsx";

export type SelectProps = React.PropsWithChildren &
  React.ComponentPropsWithoutRef<"select"> &
  SelectVariant;

export function Select({ children, size, className, ...rest }: SelectProps) {
  const { base, chevron } = selectStyles({ size, className });
  return (
    <div className="relative w-full">
      <span className={chevron()} />
      <select className={base()} {...rest}>
        {children}
      </select>
    </div>
  );
}

function SelectOption({
  children,
  ...rest
}: React.PropsWithChildren<React.ComponentPropsWithoutRef<"option">>) {
  return <option {...rest}>{children}</option>;
}

Select.Option = SelectOption;
