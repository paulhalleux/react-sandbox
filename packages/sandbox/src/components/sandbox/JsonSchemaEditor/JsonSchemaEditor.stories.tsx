import { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Select, Text } from "@/components/atoms";
import { Card } from "@/components/containers";

import { Examples } from "./__examples__";
import { JsonSchema, ValidationResult } from "./types";
import { ZodValidator } from "./validation";
import { JsonSchemaEditor } from "./";

const meta: Meta = {
  title: "Components/JsonSchemaEditor",
  tags: ["autodocs"],
  component: JsonSchemaEditor,
  argTypes: {},
};

export default meta;

const ExampleMap = Examples.reduce(
  (acc, example) =>
    example.$id
      ? {
          ...acc,
          [example.$id]: example,
        }
      : acc,
  {}
);

export const Default: StoryObj = {
  render: function Render() {
    const [schema, setSchema] = useState<JsonSchema>(Examples[0]);
    const [value, setValue] = useState<any>(Examples[0].default);
    const [validation, setValidation] = useState<ValidationResult>();

    return (
      <div>
        <Select title={JSON.stringify(schema, null, 4)}>
          {Examples.map((example) => (
            <Select.Option
              title={JSON.stringify(example, null, 4)}
              key={example.title}
              value={example.title}
              onClick={() => {
                setSchema(example);
                setValue(example.default);
                setValidation(undefined);
              }}
            >
              {example.title}
            </Select.Option>
          ))}
        </Select>
        <hr className="my-3" />
        <JsonSchemaEditor
          value={value}
          onChange={setValue}
          schema={schema}
          references={ExampleMap}
          validator={ZodValidator}
          onSubmit={setValidation}
          validationResult={validation}
        />
        <hr className="my-3" />
        <div className="grid grid-cols-2 gap-4">
          <Card type="secondary" className="p-4 overflow-auto text-xs">
            <Text className="text-xs font-bold">Value</Text>
            <hr className="my-2" />
            <div className="overflow-auto">
              <pre>{JSON.stringify(value, null, 2)}</pre>
            </div>
          </Card>
          <Card type="secondary" className="p-4 text-xs">
            <Text className="text-xs font-bold">Validation</Text>
            <hr className="my-2" />
            <div className="overflow-auto">
              <pre>{JSON.stringify(validation, null, 2)}</pre>
            </div>
          </Card>
        </div>
      </div>
    );
  },
};
