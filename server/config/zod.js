import * as z from "zod";

const passwordSchema = z
  .string()
  .min(6, "Password must be at least 6 characters long")
  .max(50, "Password must be at most 100 characters long")
  .includes(/[A-Z]/, "Password must contain at least one uppercase letter")
  .includes(/[a-z]/, "Password must contain at least one lowercase letter")
  .includes(/\d/, "Password must contain at least one number")
  .includes(
    /[@$!%*?&]/,
    "Password must contain at least one special character",
  );

export const userSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters long")
    .max(50, "Name must be at most 50 characters long"),
  email: z.string().trim().email("Invalid email address"),
  password: passwordSchema,
});
