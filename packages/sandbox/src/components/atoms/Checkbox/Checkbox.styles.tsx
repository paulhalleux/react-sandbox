import { clsx } from "clsx";
import { tv, VariantProps } from "tailwind-variants";

export const checkboxStyles = tv({
  base: clsx(
    "grow shrink-0",
    "relative border rounded-sm peer bg-contrast h-4 w-4",
    "peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-gray-100 peer-focus:ring-offset-0",
    "peer-checked:bg-primary/5 peer-checked:border-primary transition-colors peer-focus:ring peer-checked:peer-focus:ring-primary/10",
    "after:absolute after:w-1/2 after:h-1/4 after:top-1/2 after:start-1/2 after:-translate-y-2/3 after:-translate-x-1/2 after:-rotate-45",
    "after:border-b after:border-l after:border-primary after:hidden peer-checked:after:block"
  ),
});

export type CheckboxVariant = VariantProps<typeof checkboxStyles>;
