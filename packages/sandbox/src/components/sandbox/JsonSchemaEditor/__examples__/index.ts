import { JsonSchema } from "../types";

import AlphaNumeric from "./alphanumeric.schema.json";
import Array from "./array.schema.json";
import ArrayReference from "./array-reference.schema.json";
import Boolean from "./boolean.schema.json";
import Const from "./const.schema.json";
import Deprecated from "./deprecated.schema.json";
import EmailAddress from "./email.schema.json";
import Enum from "./enum.schema.json";
import Integer from "./integer.schema.json";
import Null from "./null.schema.json";
import Number from "./number.schema.json";
import OneOfObjects from "./oneof-objects.schema.json";
import OneOfReferences from "./oneof-references.schema.json";
import Reference from "./reference.schema.json";
import String from "./string.schema.json";
import StringFormats from "./string-formats.schema.json";

export const Examples = [
  String,
  AlphaNumeric,
  EmailAddress,
  Number,
  Integer,
  Boolean,
  Null,
  Enum,
  Const,
  Deprecated,
  StringFormats,
  Array,
  ArrayReference,
  Reference,
  OneOfObjects,
  OneOfReferences,
] as JsonSchema[];
