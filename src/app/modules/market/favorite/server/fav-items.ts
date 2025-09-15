import { and, eq, inArray } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/db";
import { favoriteItems, favorites, productImages, products } from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";

export const favoriteRoute = createTRPCRouter({
  toggle: protectedProcedure
    .input(
      z.object({
        productId: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      let [existedFav] = await db
        .select()
        .from(favorites)
        .where(eq(favorites.userId, ctx.auth.user.id));

      if (!existedFav) {
        [existedFav] = await db
          .insert(favorites)
          .values({ userId: ctx.auth.user.id })
          .returning();
      }

      const [existingItem] = await db
        .select()
        .from(favoriteItems)
        .where(
          and(
            eq(favoriteItems.favoriteId, existedFav.id),
            eq(favoriteItems.productId, input.productId)
          )
        );

      if (existingItem) {
        await db
          .delete(favoriteItems)
          .where(eq(favoriteItems.id, existingItem.id));
        return { action: "removed", itemId: existingItem.id };
      } else {
        const [myFav] = await db
          .insert(favoriteItems)
          .values({
            productId: input.productId,
            favoriteId: existedFav.id,
          })
          .returning();
        return { action: "added", item: myFav };
      }
    }),
  getMany: protectedProcedure.query(async ({ ctx }) => {
    const [userFavorites] = await db
      .select()
      .from(favorites)
      .where(eq(favorites.userId, ctx.auth.user.id));

    if (!userFavorites) return [];
    const favoriteProducts = await db
      .select({
        favoriteItemId: favoriteItems.productId,
      })
      .from(favoriteItems)

      .where(eq(favoriteItems.favoriteId, userFavorites.id));
    const favProductIds = favoriteProducts.map((id) => id.favoriteItemId);
    const myFav = await db
      .select()
      .from(products)
      .where(
        and(inArray(products.id, favProductIds), eq(products.isPosted, true))
      )
      .innerJoin(
        productImages,
        and(
          eq(productImages.productId, products.id),
          eq(productImages.isCoverImage, true)
        )
      );
    return myFav;
  }),
});
