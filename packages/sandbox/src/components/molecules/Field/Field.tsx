import React from "react";

import { Input, InputProps, Label } from "@/components/atoms";

/**
 * Field component props
 */
export type FieldComponentProps<ValueType> = {
  value?: ValueType;
  onChange?: (value: ValueType) => void;
} & FieldProps;

/**
 * Field wrapper related props
 */
type FieldProps = React.PropsWithChildren<{
  label?: string;
  required?: boolean;
  id?: string;
  name?: string;
  invalid?: boolean;
}>;

export const Field = {
  Input: asField<string, InputProps>(({ value, onChange, ...props }) => {
    return (
      <Input
        type="text"
        {...props}
        value={value ?? ""}
        onChange={(e) => onChange?.(e.target.value)}
        invalid={props.invalid}
      />
    );
  }),
};

/**
 * Higher order component to wrap a field component
 * @param Component The field component to wrap
 * @returns A new component that wraps the field component and provides the field props
 */
export function asField<ValueType, AdditionalProps = {}>(
  Component: React.ComponentType<
    FieldComponentProps<ValueType> & Omit<AdditionalProps, "onChange" | "value">
  >
) {
  return (
    props: FieldComponentProps<ValueType> & FieldProps & AdditionalProps
  ) => {
    return (
      <div data-name={props.name} className="flex flex-col gap-1.5 mb-2.5">
        {props.label && (
          <Label required={props.required} htmlFor={props.id}>
            {props.label}
          </Label>
        )}
        <Component {...props} />
      </div>
    );
  };
}
