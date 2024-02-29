import { JsonSchema } from "../types";

import AlphaNumeric from "./alphanumeric.schema.json";
import EmailAddress from "./email.schema.json";
import String from "./string.schema.json";
import StringFormats from "./string-formats.schema.json";

export const Examples = [
  String,
  EmailAddress,
  AlphaNumeric,
  StringFormats,
] as JsonSchema[];
