import { Select } from "@/components/atoms";
import { Field } from "@/components/molecules";

import { useDefaultRendererProps } from "../hooks/useDefaultRendererProps.tsx";
import { useJsonSchemaEditor } from "../JsonSchemaEditor.context";
import { RendererProps } from "../SchemaRenderer";
import { JsonSchemaEnum } from "../types";

const NullValue = "null";

/**
 * Renderer for null schema type
 */
export function EnumRenderer({
  definition,
  required,
  path,
}: RendererProps<JsonSchemaEnum>) {
  const { getPropertyValue, setPropertyValue } = useJsonSchemaEditor();
  const defaultProps = useDefaultRendererProps({ path, definition, required });

  const hasNull = definition.enum.includes(null);

  const onChange = (value: string | number) => {
    if (typeof value === "number") {
      return;
    }

    const parts = value.split(":");
    const butFirst = parts.slice(1).join(":");
    const type = parts[0];
    const newValue = MapValueType[type as keyof typeof MapValueType](butFirst);

    setPropertyValue(path, newValue);
  };

  return (
    <Field.Select
      value={getValue(getPropertyValue(path) ?? NullValue)}
      onChange={onChange}
      {...defaultProps}
    >
      {hasNull && (
        <Select.Option value={NullValue}>-- No value --</Select.Option>
      )}
      {definition.enum.filter(NonNull).map((value) => {
        const optionValue = getValue(value);
        return (
          <Select.Option key={optionValue} value={optionValue}>
            {value}
          </Select.Option>
        );
      })}
    </Field.Select>
  );
}

/**
 * Check if a value is not null
 * @param value - Value to check
 * @returns True if the value is not null
 */
function NonNull<TValue>(value: TValue): value is NonNullable<typeof value> {
  return value !== null;
}

/**
 * Get the string representation of values.
 * @param value - Value to get the string representation of
 * @returns The string representation of the value
 */
function getValue(value: number | string | boolean) {
  return `${typeof value}:${value}`;
}

/**
 * Map a string representation of a value to its original value.
 */
const MapValueType: Record<string, (value: string) => unknown> = {
  string: (value: string) => value,
  number: (value: string) => Number(value),
  boolean: (value: string) => value === "true",
  null: () => null,
};
