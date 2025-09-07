import { productRoute } from "@/app/modules/admin/products/server/products";
import { createTRPCRouter } from "../init";
export const appRouter = createTRPCRouter({
  products: productRoute,
});
// export type definition of API
export type AppRouter = typeof appRouter;
