import { db } from "@/db";
import { categories } from "@/db/schema";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";

export const productCategoriesRoute = createTRPCRouter({
  getMany: baseProcedure.query(async () => {
    const allCategories = await db.select().from(categories);

    return allCategories;
  }),
});
