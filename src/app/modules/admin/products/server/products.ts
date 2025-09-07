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
  update: protectedProcedure
    .input(
      z.object({
        name: z.string().optional(),
        id: z.string(),
        isPosted: z.boolean().optional(),
        description: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { id, isPosted, ...rest } = input;
      const [product] = await db
        .select()
        .from(products)
        .where(and(eq(products.id, id), eq(products.userId, ctx.auth.user.id)));
      if (!product) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Product not found",
        });
      }
      const [updatedProduct] = await db
        .update(products)
        .set(rest)
        .where(and(eq(products.id, id), eq(products.userId, ctx.auth.user.id)))
        .returning();
      return updatedProduct;
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
