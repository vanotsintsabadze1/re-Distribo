import { z } from "zod";

export const companySchema = z.object({
  name: z.string().min(3).max(50),
  address: z.string().min(3).max(50),
  phone: z.string().min(3).max(50),
  email: z.string().email(),
});
