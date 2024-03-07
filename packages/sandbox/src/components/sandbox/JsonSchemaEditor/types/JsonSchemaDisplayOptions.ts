/**
 * Display options for the JSON schema editor
 */
export type JsonSchemaDisplayOptions = {
  layout: LayoutColumn;
};

/**
 * Layout options for the JSON schema editor
 */
export type LayoutColumn = {
  type: "columns";
  columns: number;
};
