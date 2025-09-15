import { and, eq, ilike, gte, lte, or, asc, desc, inArray } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/db";
import { productImages, products } from "@/db/schema";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
export const shopItemsRoute = createTRPCRouter({
  getMany: baseProcedure
    .input(
      z.object({
        search: z.string().nullish(),
        categoryIds: z.array(z.string()).nullish(),
        minPrice: z.number().nullish(),
        maxPrice: z.number().nullish(),
        type: z.enum(["RENT", "SALE"]).nullish(),
        sort: z
          .enum(["NEWEST", "POPULAR", "PRICE_LOW_HIGH", "PRICE_HIGH_LOW"])
          .nullish(),
      })
    )
    .query(async ({ input }) => {
      const { categoryIds, search, minPrice, maxPrice, type, sort } = input;
      const items = await db
        .select()
        .from(products)
        .where(
          and(
            eq(products.isPosted, true),
            categoryIds && categoryIds.length > 0
              ? inArray(products.categoryId, categoryIds)
              : undefined,

            search ? ilike(products.name, `%${search}%`) : undefined,
            minPrice
              ? or(
                  gte(products.sellingPrice, String(minPrice)),
                  gte(products.rentalPrice, String(minPrice))
                )
              : undefined,
            maxPrice
              ? or(
                  lte(products.sellingPrice, String(maxPrice)),
                  lte(products.rentalPrice, String(maxPrice))
                )
              : undefined,
            type ? eq(products.rentOrSale, type) : undefined
          )
        )
        .innerJoin(
          productImages,
          and(
            eq(productImages.productId, products.id),
            eq(productImages.isCoverImage, true)
          )
        )
        .orderBy(() => {
          switch (sort) {
            case "NEWEST":
              return desc(products.createdAt);
            case "POPULAR":
              return desc(products.views);
            case "PRICE_LOW_HIGH":
              return asc(products.sellingPrice ?? products.rentalPrice);
            case "PRICE_HIGH_LOW":
              return desc(products.sellingPrice ?? products.rentalPrice);
            default:
              return desc(products.createdAt);
          }
        });

      return items;
    }),
});
