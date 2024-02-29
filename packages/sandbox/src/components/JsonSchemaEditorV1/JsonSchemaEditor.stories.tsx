import { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Select } from "@/components/atoms";

import { Examples } from "./__examples__";
import { JsonSchema } from "./JsonSchemaEditor.types.ts";
import { JsonSchemaEditor } from "./";

const meta: Meta = {
  title: "Deprecated/JsonSchemaEditorV1",
  tags: ["autodocs"],
  component: JsonSchemaEditor,
  argTypes: {},
};

export default meta;

const ExampleMap = Examples.reduce(
  (acc, example) => ({
    ...acc,
    [example.$id]: example,
  }),
  {}
);

export const Default: StoryObj = {
  render: function Render() {
    const [schema, setSchema] = useState<JsonSchema>(Examples[0]);
    const [value, setValue] = useState<any>({});

    return (
      <div>
        <Select>
          {Examples.map((example) => (
            <Select.Option
              key={example.title}
              value={example.title}
              onClick={() => setSchema(example)}
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
        />
      </div>
    );
  },
};
