import { JsonSchemaDisplayOptions } from "../types/JsonSchemaDisplayOptions";

type UseDisplayLayoutArgs = {
  display: JsonSchemaDisplayOptions | undefined;
};

/**
 * Hook to get layout for display options
 */
export function useDisplayLayout({ display }: UseDisplayLayoutArgs) {
  if (!display) {
    return {};
  }

  const { layout } = display;
  if (layout.type === "columns") {
    return {
      className: `grid grid-cols-${layout.columns} gap-2.5`,
    };
  }

  return {
    className: undefined,
  };
}
