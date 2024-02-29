import { JsonSchema } from "../JsonSchemaEditor.types.ts";

import Address from "./address.schema.json";
import BlogPost from "./blog-post.schema.json";
import Calendar from "./calendar.schema.json";
import GeographicalLocation from "./geographical-location.schema.json";
import UserProfile from "./user-profile.schema.json";

export const Examples = [
  Address,
  BlogPost,
  Calendar,
  GeographicalLocation,
  UserProfile,
] as JsonSchema[];
