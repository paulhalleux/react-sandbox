import { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";

import { FileInput, Select, Text, Tooltip } from "@/components/atoms";
import { Card } from "@/components/containers";

import { Examples } from "./__examples__";
import { JsonSchema, ValidationResult } from "./types";
import { ZodValidator } from "./validation";
import { JsonSchemaEditor } from "./";

/**
 * First iteration of a JSON Schema Editor.
 *
 * This component is not finished and probably won't be.
 * This is just a proof of concept to see if it's possible to create a JSON Schema Editor and find the limitations of a such component.
 * It allowed to discover the way JSON Schema works and how to validate it.
 *
 * Another implementation of a JSON Schema Editor will be done in the future.
 */
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
                setValidation(undefined);
              }}
            >
              {example.title}
            </Select.Option>
          ))}
        </Select>
        <Tooltip placement="bottom-start">
          <Tooltip.Trigger>
            <Text size="xs" className="mt-2" tabIndex={0}>
              Hover to see schema
            </Text>
          </Tooltip.Trigger>
          <Tooltip.Content className="!text-left max-w-[unset]">
            <pre>{JSON.stringify(schema, null, 2)}</pre>
          </Tooltip.Content>
        </Tooltip>
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

export const Custom: StoryObj = {
  render: function Render() {
    const [schema, setSchema] = useState<JsonSchema>();
    const [value, setValue] = useState<any>({});

    const onFileChange = (files: FileList | null) => {
      const file = files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            try {
              const schema = JSON.parse(e.target.result as string);
              setSchema(schema);
            } catch (error) {
              console.error(error);
            }
          }
        };
        reader.readAsText(file);
      }
    };

    return (
      <div>
        <FileInput onChange={onFileChange} />
        <hr className="my-3" />
        <JsonSchemaEditor
          value={value}
          onChange={setValue}
          schema={schema}
          references={{}}
          validator={ZodValidator}
          onSubmit={() => {}}
          validationResult={undefined}
        />
        <hr className="my-3" />
        <Card type="secondary" className="p-4 overflow-auto text-xs">
          <Text className="text-xs font-bold">Value</Text>
          <hr className="my-2" />
          <div className="overflow-auto">
            <pre>{JSON.stringify(value, null, 2)}</pre>
          </div>
        </Card>
      </div>
    );
  },
};
