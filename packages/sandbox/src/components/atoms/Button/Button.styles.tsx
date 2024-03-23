import { clsx } from "clsx";
import { tv, VariantProps } from "tailwind-variants";

export const buttonStyles = tv({
  base: clsx(
    "flex items-center",
    "rounded-sm focus:outline-none font-medium",
    "focus:ring active:bg-contrast disabled:opacity-50 disabled:cursor-not-allowed"
  ),
  variants: {
    status: {
      default: "bg text-black border",
    },
    size: {
      sm: "h-6 px-2 text-xs",
      md: "h-7 px-3 text-xs",
      lg: "h-8 px-4 text-xs",
    },
    icon: {
      true: "aspect-square p-0 flex items-center justify-center",
    },
  },
  defaultVariants: {
    status: "default",
    size: "md",
  },
});

export type ButtonVariant = VariantProps<typeof buttonStyles>;
