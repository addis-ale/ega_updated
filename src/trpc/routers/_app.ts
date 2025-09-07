import { productRoute } from "@/app/modules/admin/products/server/products";
import { createTRPCRouter } from "../init";
import { productImagesRoute } from "@/app/modules/admin/products/server/productImages";
export const appRouter = createTRPCRouter({
  products: productRoute,
  productImages: productImagesRoute,
});
// export type definition of API
export type AppRouter = typeof appRouter;
