import { AnyZodObject } from "zod";

export const validate = (
  schema: AnyZodObject,
  config: {
    body: Object;
    query: Object;
  }
) => {
  const { body, query } = config;

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
