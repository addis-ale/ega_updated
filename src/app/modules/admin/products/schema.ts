import { z } from "zod";
export const insertProductTitleSchema = z.object({
  name: z.string().min(1, { message: "Product name is required" }),
});
export const insertProductDescriptionSchema = z.object({
  description: z
    .string()
    .min(10, { message: "atleart 10 characters of description is required" }),
});
