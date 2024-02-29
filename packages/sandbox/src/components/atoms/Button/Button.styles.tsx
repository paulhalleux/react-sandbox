import { clsx } from "clsx";
import { tv, VariantProps } from "tailwind-variants";

export const buttonStyles = tv({
  base: clsx(
    "flex items-center",
    "rounded-sm focus:outline-none font-medium",
    "focus:ring-2 focus:ring-offset-0 focus:ring-gray-100",
    "active:bg-gray-50"
  ),
  variants: {
    status: {
      default: "bg-white text-black border border-gray-300",
    },
    size: {
      sm: "h-6 px-2 text-xs",
      md: "h-8 px-3 text-xs",
    },
  },
  defaultVariants: {
    status: "default",
    size: "md",
  },
});

export type ButtonVariant = VariantProps<typeof buttonStyles>;
