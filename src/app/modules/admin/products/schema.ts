import { z } from "zod";
export const insertProductTitleSchema = z.object({
  name: z.string().min(1, { message: "Product name is required" }),
});
export const insertProductDescriptionSchema = z.object({
  description: z
    .string()
    .min(10, { message: "atleart 10 characters of description is required" }),
});

export const insertProductImagesSchema = z.object({
  imageUrl: z.string().min(1, "At least one image is required"),
});
export const insertCategorySchema = z.object({
  categoryId: z.string(),
});
export const insertRentOrSaleSchema = z.object({
  rentOrSale: z.string(),
});
