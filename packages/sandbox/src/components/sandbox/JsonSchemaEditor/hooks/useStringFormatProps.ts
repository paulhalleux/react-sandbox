import { useMemo } from "react";
import { z } from "zod";

import { JsonSchemaFormat, JsonSchemaString } from "../types";

const FormatPropsMap: Record<JsonSchemaFormat, Record<string, any>> = {
  "date-time": {
    inputProps: {
      type: "datetime-local",
    },
    schema: z.coerce.date(),
  },
  date: {
    inputProps: {
      type: "date",
    },
    schema: z.coerce.date(),
  },
  time: {
    inputProps: {
      type: "time",
    },
    schema: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)(:([0-5]\d))?$/),
  },
  email: {
    inputProps: {
      type: "email",
    },
    schema: z.string().email(),
  },
  "idn-email": {
    inputProps: {
      type: "text",
    },
    schema: z.string().email(),
  },
  hostname: {
    inputProps: {
      type: "text",
    },
    schema: z
      .string()
      .regex(
        /^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)+([A-Za-z]|[A-Za-z][A-Za-z0-9\-]*[A-Za-z0-9])$/
      ),
  },
  "idn-hostname": {
    inputProps: {
      type: "text",
    },
    schema: z
      .string()
      .regex(
        /^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)+([A-Za-z]|[A-Za-z][A-Za-z0-9\-]*[A-Za-z0-9])$/
      ),
  },
  ipv4: {
    inputProps: {
      type: "text",
    },
    schema: z.string().ip({ version: "v4" }),
  },
  ipv6: {
    inputProps: {
      type: "text",
    },
    schema: z.string().ip({ version: "v6" }),
  },
  uri: {
    inputProps: {
      type: "text",
    },
    schema: z.string(),
  },
  "uri-reference": {
    inputProps: {
      type: "text",
    },
    schema: z.string(),
  },
  iri: {
    inputProps: {
      type: "text",
    },
    schema: z.string(),
  },
  "iri-reference": {
    inputProps: {
      type: "text",
    },
    schema: z.string(),
  },
  "uri-template": {
    inputProps: {
      type: "text",
    },
    schema: z.string(),
  },
  "json-pointer": {
    inputProps: {
      type: "text",
    },
    schema: z.string(),
  },
  "relative-json-pointer": {
    inputProps: {
      type: "text",
    },
    schema: z.string(),
  },
  regex: {
    inputProps: {
      type: "text",
    },
    schema: z.string(),
  },
};

export function useStringFormatProps(definition: JsonSchemaString) {
  return useMemo(() => {
    if (!definition.format)
      return {
        inputProps: {
          type: "text",
        },
        schema: z.string(),
      };
    return FormatPropsMap[definition.format] ?? {};
  }, [definition]);
}
