import { productRoute } from "@/app/modules/admin/products/server/products";
import { createTRPCRouter } from "../init";
import { productImagesRoute } from "@/app/modules/admin/products/server/product-images";
import { productCategoriesRoute } from "@/app/modules/admin/products/server/product-categories";
import { shopItemsRoute } from "@/app/modules/market/shop/server/shop-items";
import { favoriteRoute } from "@/app/modules/market/favorite/server/fav-items";
import { cartItemsRoute } from "@/app/modules/market/cart/server/cart-items";
export const appRouter = createTRPCRouter({
  products: productRoute,
  productImages: productImagesRoute,
  productCategories: productCategoriesRoute,
  productItems: shopItemsRoute,
  favoriteItems: favoriteRoute,
  cartItems: cartItemsRoute,
});
// export type definition of API
export type AppRouter = typeof appRouter;
