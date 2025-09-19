import { z } from "zod";
import { and, eq, inArray } from "drizzle-orm";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { db } from "@/db";
import { cartItems, carts, productImages, products } from "@/db/schema";

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

  getMany: protectedProcedure.query(async ({ ctx }) => {
    const [userCart] = await db
      .select()
      .from(carts)
      .where(eq(carts.userId, ctx.auth.user.id));

    if (!userCart) return [];
    const myCartItems = await db
      .select({
        cartItemId: cartItems.productId,
      })
      .from(cartItems)

      .where(eq(cartItems.cartId, userCart.id));
    const cartItemIds = myCartItems.map((id) => id.cartItemId);
    const myCart = await db
      .select()
      .from(products)
      .where(
        and(inArray(products.id, cartItemIds), eq(products.isPosted, true))
      )
      .innerJoin(
        productImages,
        and(
          eq(productImages.productId, products.id),
          eq(productImages.isCoverImage, true)
        )
      );
    return myCart;
  }),
  //TODO: update and remove item from cart
});
