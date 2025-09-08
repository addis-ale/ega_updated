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
        rentOrSale: z.enum(["BOTH", "SALE", "RENT"]).optional(),
        categoryId: z.string().optional(),
        discountPercentage: z.string().optional(),
        sellingPrice: z.string().optional(),
        rentalPrice: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { id, isPosted, rentOrSale, ...rest } = input;
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
      const updateData: Record<string, unknown> = {};
      for (const [key, value] of Object.entries(rest)) {
        if (typeof value !== "undefined") {
          updateData[key] = value;
        }
      }
      if (typeof isPosted !== undefined) {
        updateData.isPosted = isPosted;
      }
      if (typeof rentOrSale !== undefined) {
        updateData.rentOrSale = rentOrSale;
        if (rentOrSale === "RENT") updateData.sellingPrice = null;
        else if (rentOrSale === "SALE") updateData.rentalPrice = null;
      }
      const [updatedProduct] = await db
        .update(products)
        .set({ ...updateData })
        .where(and(eq(products.id, id), eq(products.userId, ctx.auth.user.id)))
        .returning();

      return updatedProduct;
    }),
  remove: protectedProcedure
    .input(z.object({ productId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const [product] = await db
        .select()
        .from(products)
        .where(
          and(
            eq(products.id, input.productId),
            eq(products.userId, ctx.auth.user.id)
          )
        );
      if (!product) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Product not found",
        });
      }
      const [deletedProduct] = await db
        .delete(products)
        .where(and(eq(products.id, product.id)))
        .returning();
      return deletedProduct;
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
        .where(eq(products.id, input.productId));
      if (!existedProduct) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "No product found with this ID",
        });
      }
      return existedProduct;
    }),
});
