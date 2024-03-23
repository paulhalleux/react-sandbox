import { Text } from "@/components/atoms";
import { Card } from "@/components/containers";
import { FilterRenderer } from "@/components/sandbox/FilterExpressionBuilder/renderers/FilterRenderer.tsx";

import { FieldSelector } from "./FieldSelector";
import {
  Expression,
  ExpressionComparisonOperator,
  FieldArray,
  FilterExpressionField,
} from "./FilterExpressionBuilder.types";

type FilterExpressionBuilderProps = {
  expression: Expression;
  onChange: (expression: Expression) => void;
  fields: FieldArray;
};

export function FilterExpressionBuilder({
  expression,
  onChange,
  fields,
}: FilterExpressionBuilderProps) {
  const onFieldSelect = (field: FilterExpressionField) => {
    onChange({
      ...expression,
      parts: [
        ...expression.parts,
        {
          field,
          operator: ExpressionComparisonOperator.Equal,
          value: "",
        },
      ],
    });
  };

  return (
    <Card>
      <header className="px-2 py-1.5 border-b">
        <Text size="xs" weight="bold">
          Filter Expression
        </Text>
      </header>
      <div className="p-2 flex flex-col gap-2">
        {expression.parts.map((part) => (
          <FilterRenderer
            key={part.field.path}
            part={part}
            onChange={() => {}}
          />
        ))}
      </div>
      <footer className="px-2 py-1.5 border-t">
        <FieldSelector fields={fields} onFieldSelect={onFieldSelect} />
      </footer>
    </Card>
  );
}
