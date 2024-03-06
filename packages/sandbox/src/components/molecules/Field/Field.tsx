import React from "react";
import { omit } from "lodash";

import {
  Input,
  type InputProps,
  Label,
  Select,
  type SelectProps,
  Switch,
  type SwitchProps,
  Text,
} from "@/components/atoms";

/**
 * Field component props
 */
export type FieldComponentProps<ValueType, AdditionalProps> = Omit<
  FieldProps<ValueType> & AdditionalProps,
  InvalidPropsKeys
>;

/**
 * Field wrapper related props
 */
type FieldProps<ValueType> = React.PropsWithChildren<{
  label?: string;
  required?: boolean;
  id?: string;
  name?: string;
  error?: string;
  help?: string;
  example?: string;
  displayOptional?: boolean;
  addon?: React.ReactNode;
  value?: ValueType;
  onChange?: (value: ValueType) => void;
}>;

export const Field = {
  Input: asField<string, InputProps>(({ value, onChange, ...props }) => {
    return (
      <Input
        type="text"
        {...props}
        value={value ?? ""}
        onChange={(e) => onChange?.(e.target.value)}
        invalid={props.error !== undefined}
      />
    );
  }),
  Select: asField<string | number, SelectProps>(({ onChange, ...props }) => {
    return (
      <Select onChange={(e) => onChange?.(e.target.value)} {...props}>
        {props.children}
      </Select>
    );
  }),
  Switch: asField<boolean, SwitchProps>(({ onChange, value, ...props }) => {
    return (
      <Switch
        checked={value}
        onChange={(e) => onChange?.(e.target.checked)}
        {...omit(props, ["label"])}
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
    FieldComponentProps<ValueType, Omit<AdditionalProps, "onChange" | "value">>
  >
) {
  return (
    props: FieldProps<ValueType> & Omit<AdditionalProps, "value" | "onChange">
  ) => (
    <div data-name={props.name} className="flex flex-col gap-1.5 w-full">
      {props.label && (
        <Label
          required={props.required}
          htmlFor={props.id}
          help={props.help ? <Text.Lines text={props.help} /> : undefined}
          requiredDisplay={props.displayOptional ? "optional" : "required"}
          addon={props.addon}
        >
          <span className="flex items-center gap-1">{props.label}</span>
        </Label>
      )}
      <Component {...withoutInvalidProps(props)} />
      {props.error && (
        <Text size="xxs" color="danger">
          {props.error}
        </Text>
      )}
      {props.example && !props.error && (
        <Text size="xxs" color="secondary">
          {props.example}
        </Text>
      )}
    </div>
  );
}

const InvalidProps = ["help", "example", "displayOptional", "addon"] as const;
type InvalidPropsKeys = (typeof InvalidProps)[number];

/**
 * Omit invalid props
 * @param props The props to clean
 * @returns The cleaned props
 */
function withoutInvalidProps<Props extends Record<string, any>>(
  props: Props
): Omit<typeof props, InvalidPropsKeys> {
  return omit(props, InvalidProps);
}
