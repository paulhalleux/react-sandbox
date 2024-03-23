import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import {
  Expression,
  ExpressionOperator,
} from "./FilterExpressionBuilder.types";
import { FilterExpressionBuilder } from "./";

const meta: Meta = {
  title: "Components/FilterExpressionBuilder",
  tags: ["autodocs"],
  component: FilterExpressionBuilder,
  argTypes: {
    children: { control: "disabled" },
  },
};

export default meta;

export const Default: StoryObj<typeof meta> = {
  render: function Render({ fields }) {
    const [expression, setExpression] = React.useState<Expression>({
      operator: ExpressionOperator.And,
      parts: [],
    });

    return (
      <FilterExpressionBuilder
        expression={expression}
        onChange={setExpression}
        fields={fields}
      />
    );
  },
  args: {
    fields: [
      {
        label: "Field Group",
        fields: [
          { label: "Field 1", path: "1.1", type: "string" },
          { label: "Field 2", path: "1.2", type: "number" },
          {
            label: "Field Group 2",
            fields: [
              { label: "Field 1", path: "1.3.1", type: "string" },
              { label: "Field 2", path: "1.3.2", type: "number" },
            ],
          },
        ],
      },
      { label: "Field 2", path: "2", type: "string" },
      { label: "Field 3", path: "3", type: "number" },
      { label: "Field 4", path: "4", type: "date" },
      { label: "Field 5", path: "5", type: "boolean" },
    ],
  },
};
