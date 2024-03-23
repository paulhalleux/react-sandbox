import { Input, Select, Text } from "@/components/atoms";

import {
  ExpressionComparisonOperator,
  ExpressionPart,
} from "../FilterExpressionBuilder.types";

type FilterRendererProps = {
  part: ExpressionPart;
  onChange: (part: ExpressionPart) => void;
};

export function FilterRenderer({ part }: FilterRendererProps) {
  return (
    <div className="grid grid-cols-3 gap-2 items-center">
      <Text ellipsis size="xs" className="max-w-32 w-full">
        {part.field.label}
      </Text>
      <Select size="sm" value={part.operator}>
        {Object.entries(ExpressionComparisonOperator).map(([key, value]) => (
          <Select.Option key={key} value={value}>
            {key}
          </Select.Option>
        ))}
      </Select>
      <Input size="sm" value={part.value} />
    </div>
  );
}
