import { z } from "zod";
export const insertProductTitleSchema = z.object({
  name: z.string().min(1, { message: "Product name is required" }),
});
