import { clsx } from "clsx";
import { tv, VariantProps } from "tailwind-variants";

import { inputStyles } from "../Input/Input.styles.tsx";

export const selectStyles = tv({
  base: clsx(inputStyles.base, "appearance-none"),
  variants: {
    size: inputStyles.variants.size,
  },
  slots: {
    chevron:
      "absolute w-1.5 h-1.5 right-3 top-[50%] translate-y-[-50%] rotate-45 border-b border-r border-gray-600",
  },
  defaultVariants: inputStyles.defaultVariants,
});

export type SelectVariant = VariantProps<typeof selectStyles>;
