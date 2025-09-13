import { and, eq, ilike, gte, lte, or, asc, desc } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/db";
import { products } from "@/db/schema";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
export const shopItemsRoute = createTRPCRouter({
  getMany: baseProcedure
    .input(
      z.object({
        search: z.string().nullish(),
        categoryId: z.string().nullish(),
        minPrice: z.number().nullish(),
        maxPrice: z.number().nullish(),
        type: z.enum(["RENT", "SALE"]).nullish(),
        sort: z
          .enum([
            "NEWEST", // createdAt desc
            "POPULAR", // maybe order by views or sales count
            "PRICE_LOW_HIGH", // price asc
            "PRICE_HIGH_LOW", // price desc
          ])
          .nullish(),
      })
    )
    .query(async ({ input }) => {
      const { categoryId, search, minPrice, maxPrice, type, sort } = input;

      const items = await db
        .select()
        .from(products)
        .where(
          and(
            eq(products.isPosted, true),
            categoryId ? eq(products.categoryId, categoryId) : undefined,
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
