import { productRoute } from "@/app/modules/admin/products/server/products";
import { createTRPCRouter } from "../init";
import { productImagesRoute } from "@/app/modules/admin/products/server/product-images";
import { productCategoriesRoute } from "@/app/modules/admin/products/server/product-categories";
export const appRouter = createTRPCRouter({
  products: productRoute,
  productImages: productImagesRoute,
  productCategories: productCategoriesRoute,
});
// export type definition of API
export type AppRouter = typeof appRouter;
