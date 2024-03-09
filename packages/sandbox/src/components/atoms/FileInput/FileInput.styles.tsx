import { clsx } from "clsx";
import { tv, VariantProps } from "tailwind-variants";

import { inputStyles } from "../Input/Input.styles.tsx";

export const fileInputStyles = tv({
  base: clsx(
    inputStyles.base,
    inputStyles.variants.variant.default,
    "appearance-none"
  ),
  variants: {
    size: inputStyles.variants.size,
  },
  defaultVariants: inputStyles.defaultVariants,
});

export type FileInputVariant = VariantProps<typeof fileInputStyles>;
