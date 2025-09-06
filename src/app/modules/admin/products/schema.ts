import { z } from "zod";
export const insertProductTitleSchema = z.object({
  title: z.string().min(1, { message: "Product name is required" }),
});
