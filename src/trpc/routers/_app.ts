import { productRoute } from "@/app/modules/admin/products/server/products";
import { createTRPCRouter } from "../init";
import { productImagesRoute } from "@/app/modules/admin/products/server/product-images";
import { productCategoriesRoute } from "@/app/modules/admin/products/server/product-categories";
import { shopItemsRoute } from "@/app/modules/market/shop/server/shop-items";
import { favoriteRoute } from "@/app/modules/market/favorite/server/fav-items";
import { cartItemsRoute } from "@/app/modules/market/cart/server/cart-items";
import { checkoutRoute } from "@/app/modules/market/shop/server/cart-checkout";
import { blogRoutes } from "@/app/modules/admin/blogs/server/blogs";
import { blogPostsRoute } from "@/app/modules/blog/server/blog-posts";
import { eventsRoute } from "@/app/modules/admin/events/server/events";
import { eventPostsRoute } from "@/app/modules/events/server/events-post";
export const appRouter = createTRPCRouter({
  products: productRoute,
  productImages: productImagesRoute,
  productCategories: productCategoriesRoute,
  productItems: shopItemsRoute,
  favoriteItems: favoriteRoute,
  cartItems: cartItemsRoute,
  checkout: checkoutRoute,
  blogs: blogRoutes,
  blogPosts: blogPostsRoute,
  events: eventsRoute,
  eventPosts: eventPostsRoute,
});
// export type definition of API
export type AppRouter = typeof appRouter;
