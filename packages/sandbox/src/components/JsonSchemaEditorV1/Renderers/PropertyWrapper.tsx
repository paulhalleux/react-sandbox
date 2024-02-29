import { PropsWithChildren, useLayoutEffect } from "react";

import { Label } from "@/components/atoms";

import { useJsonSchemaEditor } from "../JsonSchemaEditor.context.tsx";
import { JsonSchemaType } from "../JsonSchemaEditor.types.ts";

type PropertyWrapperProps<Type extends JsonSchemaType> = PropsWithChildren<{
  propertyKey: string;
  property: Type;
  required?: boolean;
}>;

export function PropertyWrapper<Type extends JsonSchemaType>({
  propertyKey,
  property,
  children,
  required,
}: PropertyWrapperProps<Type>) {
  const { setPropertyValue } = useJsonSchemaEditor();

  useLayoutEffect(() => {
    if (property.default !== undefined) {
      setPropertyValue(propertyKey, property.default);
    }
  }, []);

  return (
    <div className="flex flex-col w-full gap-1">
      <Label required={required} htmlFor={propertyKey}>
        {property.title ?? propertyKey}
      </Label>
      {children}
    </div>
  );
}
