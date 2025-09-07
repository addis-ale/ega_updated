import { db } from "@/db";
import { products } from "@/db/schema";
import {
  baseProcedure,
  createTRPCRouter,
  protectedProcedure,
} from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { and, eq } from "drizzle-orm";
import { z } from "zod";
export const productRoute = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const [newProduct] = await db
        .insert(products)
        .values({ name: input.name, userId: ctx.auth.user.id })
        .returning();
      return newProduct;
    }),
  getOne: baseProcedure
    .input(
      z.object({
        productId: z.string(),
      })
    )
    .query(async ({ input }) => {
      const [existedProduct] = await db
        .select()
        .from(products)
        .where(
          and(eq(products.id, input.productId), eq(products.isPosted, true))
        );
      if (!existedProduct) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "No product found with this ID",
        });
      }
      return existedProduct;
    }),
});
