export enum ExpressionOperator {
  And = "and",
  Or = "or",
}

export enum ExpressionComparisonOperator {
  Equal = "eq",
  NotEqual = "ne",
  GreaterThan = "gt",
  GreaterThanOrEqual = "ge",
  LessThan = "lt",
  LessThanOrEqual = "le",
  Contains = "contains",
  StartsWith = "startsWith",
  EndsWith = "endsWith",
  IsNull = "isNull",
  IsNotNull = "isNotNull",
  In = "in",
  NotIn = "notIn",
  Between = "between",
  NotBetween = "notBetween",
}

export enum ExpressionFieldDataType {
  String = "string",
  Number = "number",
  Date = "date",
  Boolean = "boolean",
}

export type ExpressionPart = {
  field: FilterExpressionField;
  operator: ExpressionComparisonOperator;
  value: string;
};

export type Expression = {
  parts: Array<ExpressionPart>;
  operator: ExpressionOperator;
};

export type FilterExpressionFieldGroup = {
  label: string;
  fields: FieldArray;
};

export type FilterExpressionField = {
  label: string;
  path: string;
  type: ExpressionFieldDataType;
};

export type FieldArray = Array<
  FilterExpressionField | FilterExpressionFieldGroup
>;
