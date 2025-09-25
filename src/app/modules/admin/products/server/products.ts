import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  MAX_PAGE_SIZE,
  MIN_PAGE_SIZE,
} from "@/constants";
import { db } from "@/db";
import { products } from "@/db/schema";
import { isAdmin } from "@/lib/admin";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { and, count, desc, eq, ilike } from "drizzle-orm";
import { z } from "zod";
export const productRoute = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      if (!isAdmin(ctx.auth.user.id)) {
        throw new TRPCError({ code: "UNAUTHORIZED", message: "Unauthorized" });
      }
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
  getOne: protectedProcedure
    .input(
      z.object({
        productId: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      const [existedProduct] = await db
        .select()
        .from(products)
        .where(
          and(
            eq(products.id, input.productId),
            eq(products.userId, ctx.auth.user.id)
          )
        );
      if (!existedProduct) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "No product found with this ID",
        });
      }
      return existedProduct;
    }),
  getMany: protectedProcedure
    .input(
      z.object({
        page: z.number().default(DEFAULT_PAGE),
        pageSize: z
          .number()
          .min(MIN_PAGE_SIZE)
          .max(MAX_PAGE_SIZE)
          .default(DEFAULT_PAGE_SIZE),
        search: z.string().nullish(),
      })
    )
    .query(async ({ input, ctx }) => {
      const { page, pageSize, search } = input;
      const myProducts = await db
        .select()
        .from(products)
        .where(
          and(
            eq(products.userId, ctx.auth.user.id),
            search ? ilike(products.name, `%${search}%`) : undefined
          )
        )
        .orderBy(desc(products.createdAt))
        .limit(pageSize)
        .offset((page - 1) * pageSize);
      const [total] = await db
        .select({ count: count() })
        .from(products)
        .where(
          and(
            eq(products.userId, ctx.auth.user.id),
            search ? ilike(products.name, `%${search}%`) : undefined
          )
        );
      const totalPage = Math.ceil(total.count / pageSize);
      return {
        items: myProducts,
        total: total.count,
        totalPage,
      };
    }),
});
