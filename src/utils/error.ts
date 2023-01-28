import { type ZodError } from "zod";

export const formatErrors = (errors: ZodError) => {
  return Object.fromEntries(
    errors.errors.map(({ path, message }) => [path.join("."), message])
  );
};
