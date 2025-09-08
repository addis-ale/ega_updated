import { db } from "@/db";
import { productImages, products } from "@/db/schema";
import {
  baseProcedure,
  createTRPCRouter,
  protectedProcedure,
} from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { and, eq } from "drizzle-orm";
import { z } from "zod";
export const productImagesRoute = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        productId: z.string(),
        imageUrl: z.string(),
      })
    )
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
          message: "product not found",
        });
      }
      const existingImages = await db
        .select()
        .from(productImages)
        .where(eq(productImages.productId, product.id));

      if (existingImages.length >= 6) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "A product can have a maximum of 6 images",
        });
      }

      const [createdImage] = await db
        .insert(productImages)
        .values({ imageUrl: input.imageUrl, productId: product.id })
        .returning();
      return createdImage;
    }),
  update: protectedProcedure
    .input(z.object({ productId: z.string(), id: z.string() }))
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
          message: "product not found",
        });
      }

      await db
        .update(productImages)
        .set({
          isCoverImage: false,
        })
        .where(eq(productImages.productId, input.productId));

      const [updatedProductImage] = await db
        .update(productImages)
        .set({
          isCoverImage: true,
        })
        .where(
          and(
            eq(productImages.productId, input.productId),
            eq(productImages.id, input.id)
          )
        )
        .returning();
      return updatedProductImage;
    }),
  delete: protectedProcedure
    .input(
      z.object({
        productId: z.string(),
        id: z.string(),
      })
    )
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
          message: "product not found",
        });
      }
      const [deletedImage] = await db
        .delete(productImages)
        .where(
          and(
            eq(productImages.id, input.id),
            eq(productImages.productId, product.id)
          )
        )
        .returning();
      const allImages = await db
        .select()
        .from(productImages)
        .where(eq(productImages.productId, input.productId));
      if (allImages.length === 0) {
        await db
          .update(products)
          .set({
            isPosted: false,
          })
          .where(
            and(
              eq(products.id, input.productId),
              eq(products.userId, ctx.auth.user.id)
            )
          );
      }
      return deletedImage;
    }),
  getMany: baseProcedure
    .input(z.object({ productId: z.string() }))
    .query(async ({ input }) => {
      const allImages = await db
        .select()
        .from(productImages)
        .where(eq(productImages.productId, input.productId));
      return allImages;
    }),
});
