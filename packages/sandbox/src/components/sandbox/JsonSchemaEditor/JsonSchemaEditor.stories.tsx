import { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Select, Text } from "@/components/atoms";
import { JsonSchema } from "@/components/sandbox/JsonSchemaEditor/types";

import { Examples } from "./__examples__";
import { JsonSchemaEditor } from "./";

const meta: Meta = {
  title: "Components/JsonSchemaEditor",
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
    const [value, setValue] = useState<any>(Examples[0].default);

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
        <Text
          size="sm"
          className="mt-2"
          title={JSON.stringify(schema, null, 4)}
        >
          Hover for schema
        </Text>
        <hr className="my-3" />
        <JsonSchemaEditor
          value={value}
          onChange={setValue}
          schema={schema}
          references={ExampleMap}
        />
        <hr className="my-3" />
        <pre>{JSON.stringify(value, null, 2)}</pre>
      </div>
    );
  },
};
