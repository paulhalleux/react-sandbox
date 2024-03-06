import { AlertTriangle } from "lucide-react";

import { Text, Tooltip } from "@/components/atoms";

import { useJsonSchemaEditor } from "../JsonSchemaEditor.context";
import { JsonSchema } from "../types";

type UseDefaultRendererPropsArgs = {
  path: string;
  definition: JsonSchema;
  required?: boolean;
};

/**
 * Hook to get default renderer props
 */
export function useDefaultRendererProps({
  path,
  definition,
  required,
}: UseDefaultRendererPropsArgs) {
  const { validationResult } = useJsonSchemaEditor();

  return {
    id: path,
    name: path,
    label: definition.title,
    placeholder: definition.description,
    help: definition.$comment,
    example: definition.examples?.[0],
    error: validationResult?.errors[path]?.message,
    displayOptional: false,
    required,
    addon: definition.deprecated ? (
      <Tooltip>
        <Tooltip.Trigger>
          <Text color="warning" className="flex items-center gap-1">
            <AlertTriangle size={12} />
            Deprecated
          </Text>
        </Tooltip.Trigger>
        <Tooltip.Content>
          <Text.Lines text={definition.deprecatedReason} />
        </Tooltip.Content>
      </Tooltip>
    ) : undefined,
  };
}
