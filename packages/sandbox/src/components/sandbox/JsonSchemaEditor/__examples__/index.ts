import { JsonSchema } from "../types";

import AlphaNumeric from "./alphanumeric.schema.json";
import EmailAddress from "./email.schema.json";
import Integer from "./integer.schema.json";
import Null from "./null.schema.json";
import Number from "./number.schema.json";
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
] as JsonSchema[];
