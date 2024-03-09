import { tv, VariantProps } from "tailwind-variants";

export const cardStyles = tv({
  base: "rounded border",
  variants: {
    type: {
      default: "bg-white",
      secondary: "bg-gray-50",
    },
    elevation: {
      sm: "shadow-sm",
      md: "shadow-md",
    },
  },
  defaultVariants: {
    type: "default",
  },
});

export type CardVariant = VariantProps<typeof cardStyles>;
