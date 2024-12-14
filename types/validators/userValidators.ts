import { z } from "zod";

export const userSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(1, { message: "Password field can't be empty" }),
});
