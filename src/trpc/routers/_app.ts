import { productRoute } from "@/app/modules/admin/products/server/products";
import { createTRPCRouter } from "../init";
import { productImagesRoute } from "@/app/modules/admin/products/server/product-images";
import { productCategoriesRoute } from "@/app/modules/admin/products/server/product-categories";
import { shopItemsRoute } from "@/app/modules/market/shop/server/shop-items";
import { checkoutRoute } from "@/app/modules/market/shop/server/cart-checkout";
export const appRouter = createTRPCRouter({
  products: productRoute,
  productImages: productImagesRoute,
  productCategories: productCategoriesRoute,
  productItems: shopItemsRoute,
  checkout: checkoutRoute,
});
// export type definition of API
export type AppRouter = typeof appRouter;
