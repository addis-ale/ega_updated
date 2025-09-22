import { z } from "zod";
import { and, desc, eq } from "drizzle-orm";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { db } from "@/db";
import { cartItems, carts, productImages, products } from "@/db/schema";
import { TRPCError } from "@trpc/server";
type CartItemImage = {
  url: string;
  isCover: boolean | null;
};

type CartItemProduct = {
  id: string;
  name: string;
  images: CartItemImage[];
};

type CartItemWithProduct = {
  id: string;
  quantity: number;
  actionType: string;
  salePriceAtAdd: string | null;
  rentalPriceAtAdd: string | null;
  rentalStartDate: Date | null;
  rentalEndDate: Date | null;
  rentalDateDuration: number | null;
  product: CartItemProduct;
};

export const cartItemsRoute = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        productId: z.string(),
        quantity: z.number().min(1).default(1),
        actionType: z.enum(["SALE", "RENT"]),
        salePriceAtAdd: z.string().optional(),
        rentalPriceAtAdd: z.string().optional(),
        rentalStartDate: z
          .string()
          .transform((val) => new Date(val))
          .optional(),
        rentalEndDate: z
          .string()
          .transform((val) => new Date(val))
          .optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Ensure the user has a cart
      let [cart] = await db
        .select()
        .from(carts)
        .where(and(eq(carts.userId, ctx.auth.user.id)));

      if (!cart) {
        [cart] = await db
          .insert(carts)
          .values({
            userId: ctx.auth.user.id,
          })
          .returning();
      }

      // Insert item into cart
      const [item] = await db
        .insert(cartItems)
        .values({
          cartId: cart.id,
          productId: input.productId,
          quantity: input.quantity,
          actionType: input.actionType,
          salePriceAtAdd: input.salePriceAtAdd ?? null,
          rentalPriceAtAdd: input.rentalPriceAtAdd ?? null,
          rentalStartDate: input.rentalStartDate ?? null,
          rentalEndDate: input.rentalEndDate ?? null,
          rentalDateDuration:
            input.rentalStartDate && input.rentalEndDate
              ? Math.ceil(
                  (input.rentalEndDate.getTime() -
                    input.rentalStartDate.getTime()) /
                    (1000 * 60 * 60 * 24)
                )
              : null,
        })
        .onConflictDoUpdate({
          target: [cartItems.cartId, cartItems.productId],
          set: {
            quantity: input.quantity,
            actionType: input.actionType,
            salePriceAtAdd: input.salePriceAtAdd ?? null,
            rentalPriceAtAdd: input.rentalPriceAtAdd ?? null,
            rentalStartDate: input.rentalStartDate ?? null,
            rentalEndDate: input.rentalEndDate ?? null,
          },
        })
        .returning();

      return item;
    }),
  update: protectedProcedure
    .input(
      z.object({
        cartItemId: z.string(),
        quantity: z.number().optional(),
        rentalStartDate: z
          .string()
          .transform((val) => new Date(val))
          .optional(),
        rentalEndDate: z
          .string()
          .transform((val) => new Date(val))
          .optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { cartItemId, ...rest } = input;
      const updateData: Record<string, unknown> = {};
      for (const [key, value] of Object.entries(rest)) {
        if (typeof value !== "undefined") {
          updateData[key] = value;
        }
      }
      const [userCart] = await db
        .select()
        .from(carts)
        .where(eq(carts.userId, ctx.auth.user.id));
      if (!userCart) {
        throw new TRPCError({ code: "UNAUTHORIZED", message: "Unauthorized" });
      }
      const [updatedCartItem] = await db
        .update(cartItems)
        .set(updateData)
        .where(
          and(eq(cartItems.id, cartItemId), eq(cartItems.cartId, userCart.id))
        )
        .returning();
      return updatedCartItem;
    }),
  getMany: protectedProcedure.query(async ({ ctx }) => {
    // 1. Get the user's cart
    const [userCart] = await db
      .select()
      .from(carts)
      .where(eq(carts.userId, ctx.auth.user.id));

    if (!userCart) return [];

    // 2. Fetch cart items with product + image joins
    const result = await db
      .select({
        id: cartItems.id,
        quantity: cartItems.quantity,
        actionType: cartItems.actionType,
        salePriceAtAdd: cartItems.salePriceAtAdd,
        rentalPriceAtAdd: cartItems.rentalPriceAtAdd,
        rentalStartDate: cartItems.rentalStartDate,
        rentalEndDate: cartItems.rentalEndDate,
        rentalDateDuration: cartItems.rentalDateDuration,
        productName: products.name,
        imageUrl: productImages.imageUrl,
        isCover: productImages.isCoverImage,
        productId: products.id,
      })
      .from(cartItems)
      .innerJoin(products, eq(cartItems.productId, products.id))
      .leftJoin(productImages, eq(products.id, productImages.productId))
      .where(eq(cartItems.cartId, userCart.id))
      .orderBy(desc(cartItems.productId));

    // 3. Group using Map with correct typing
    const groupedMap = new Map<string, CartItemWithProduct>();

    for (const row of result) {
      if (!groupedMap.has(row.id)) {
        groupedMap.set(row.id, {
          id: row.id,
          quantity: row.quantity,
          actionType: row.actionType,
          salePriceAtAdd: row.salePriceAtAdd,
          rentalPriceAtAdd: row.rentalPriceAtAdd,
          rentalStartDate: row.rentalStartDate,
          rentalEndDate: row.rentalEndDate,
          rentalDateDuration: row.rentalDateDuration,
          product: {
            id: row.productId,
            name: row.productName,
            images: [],
          },
        });
      }

      const item = groupedMap.get(row.id)!;
      if (row.imageUrl) {
        item.product.images.push({
          url: row.imageUrl,
          isCover: row.isCover,
        });
      }
    }

    return Array.from(groupedMap.values());
  }),
  remove: protectedProcedure
    .input(
      z.object({
        cartItemId: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const [userCart] = await db
        .select()
        .from(carts)
        .where(eq(carts.userId, ctx.auth.user.id));
      if (!userCart) {
        throw new TRPCError({ code: "UNAUTHORIZED", message: "Unauthorized" });
      }
      const [removed] = await db
        .delete(cartItems)
        .where(
          and(
            eq(cartItems.id, input.cartItemId),
            eq(cartItems.cartId, userCart.id)
          )
        )
        .returning();
      return removed;
    }),
});
