import { AnyZodObject } from "zod";

export const validate = (
  schema: AnyZodObject,
  body?: AnyZodObject,
  query?: AnyZodObject
) => {
  try {
    schema.parse({
      body,
      query,
    });
    return [true, undefined];
  } catch (err) {
    return [false, err.message];
  }
};
