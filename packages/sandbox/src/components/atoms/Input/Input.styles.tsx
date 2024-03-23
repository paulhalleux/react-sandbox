import { clsx } from "clsx";
import { tv, VariantProps } from "tailwind-variants";

export const inputStyles = tv({
  base: clsx(
    "rounded-sm focus:outline-none font-medium",
    "focus:ring w-full",
    "placeholder-shown:font-normal",
    "disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed"
  ),
  variants: {
    size: {
      sm: "h-6 px-2 text-xs",
      md: "h-7 px-2 text-xs",
      lg: "h-8 px-3 text-xs",
    },
    invalid: {
      true: 'data-[invalid="true"]:ring-danger/15 data-[invalid="true"]:border-danger data-[invalid="true"]:placeholder-error',
    },
    variant: {
      default: "bg border",
      ghost: "bg-transparent",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "lg",
  },
});

export type InputVariant = VariantProps<typeof inputStyles>;
