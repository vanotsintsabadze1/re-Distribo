import { z } from "zod";

export const productSchema = z.object({
  Name: z.string().min(1, { message: "Name is required" }),
  Description: z.string().min(1, { message: "Description is required" }),
  ImageFiles: z.array(z.instanceof(File)).min(1, { message: "At least one image must be present" }),
});
