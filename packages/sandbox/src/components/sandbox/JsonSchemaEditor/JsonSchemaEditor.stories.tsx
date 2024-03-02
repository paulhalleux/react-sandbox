import { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Select } from "@/components/atoms";
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
        <Select>
          {Examples.map((example) => (
            <Select.Option
              key={example.title}
              value={example.title}
              onClick={() => {
                setSchema(example);
                setValue(example.default);
              }}
            >
              {example.title}
            </Select.Option>
          ))}
        </Select>
        <hr className="my-3" />
        <div className="grid grid-cols-6 gap-4">
          <div className="col-span-4">
            <JsonSchemaEditor
              value={value}
              onChange={setValue}
              schema={schema}
              references={ExampleMap}
              validator={ZodValidator}
              onSubmit={setValidation}
            />
          </div>
          <Card className="p-4 overflow-auto text-xs col-span-2">
            <pre>{JSON.stringify(validation, null, 2)}</pre>
          </Card>
        </div>
        <hr className="my-3" />
        <Card className="p-4 overflow-auto text-xs">
          <pre>{JSON.stringify(value, null, 2)}</pre>
        </Card>
      </div>
    );
  },
};
