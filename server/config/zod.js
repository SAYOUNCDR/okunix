const z = require("zod");

const passwordSchema = z
  .string()
  .min(6, "Password must be at least 6 characters long")
  .max(50, "Password must be at most 100 characters long")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/\d/, "Password must contain at least one number")
  .regex(
    /[@$!%*?&]/,
    "Password must contain at least one special character",
  );

const userSchema = z.object({
  username: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters long")
    .max(50, "Name must be at most 50 characters long"),
  email: z.string().trim().toLowerCase().email("Invalid email address"),
  password: passwordSchema,
});

const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email("Invalid email address"),
  password: z.string(),
});

module.exports = { userSchema, loginSchema };