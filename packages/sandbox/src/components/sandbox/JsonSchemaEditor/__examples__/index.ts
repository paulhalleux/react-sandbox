import { JsonSchema } from "../types";

import AlphaNumeric from "./alphanumeric.schema.json";
import Array from "./array.schema.json";
import ArrayReference from "./array-reference.schema.json";
import Const from "./const.schema.json";
import Deprecated from "./deprecated.schema.json";
import EmailAddress from "./email.schema.json";
import Enum from "./enum.schema.json";
import Integer from "./integer.schema.json";
import Null from "./null.schema.json";
import Number from "./number.schema.json";
import Reference from "./reference.schema.json";
import String from "./string.schema.json";
import StringFormats from "./string-formats.schema.json";

export const Examples = [
  String,
  EmailAddress,
  AlphaNumeric,
  StringFormats,
  Number,
  Integer,
  Null,
  Enum,
  Array,
  Reference,
  Const,
  Deprecated,
  ArrayReference,
] as JsonSchema[];
