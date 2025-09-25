import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { db } from "@/db"; // your Drizzle db instance
import { user, products, blogs, events } from "@/db/schema";
import { sql } from "drizzle-orm";
import { isAdmin } from "@/lib/admin";
import { TRPCError } from "@trpc/server";

export const overViewRoutes = createTRPCRouter({
  overView: protectedProcedure.query(async ({ ctx }) => {
    if (!isAdmin(ctx.auth.user.id)) {
      throw new TRPCError({ code: "UNAUTHORIZED", message: "Unauthorized" });
    }
    // Total users
    const totalUsers = await db
      .select({
        count: sql<number>`COUNT(${user.id})`.mapWith(Number),
      })
      .from(user);

    // Total products posted vs draft
    const totalProducts = await db
      .select({
        posted:
          sql<number>`COUNT(*) FILTER (WHERE ${products.isPosted} = TRUE)`.mapWith(
            Number
          ),
        draft:
          sql<number>`COUNT(*) FILTER (WHERE ${products.isPosted} = FALSE)`.mapWith(
            Number
          ),
      })
      .from(products);

    // Total blogs published vs draft
    const totalBlogs = await db
      .select({
        published:
          sql<number>`COUNT(*) FILTER (WHERE ${blogs.isPublished} = TRUE)`.mapWith(
            Number
          ),
        draft:
          sql<number>`COUNT(*) FILTER (WHERE ${blogs.isPublished} = FALSE)`.mapWith(
            Number
          ),
      })
      .from(blogs);

    // Total events posted vs draft
    const totalEvents = await db
      .select({
        posted:
          sql<number>`COUNT(*) FILTER (WHERE ${events.isPosted} = TRUE)`.mapWith(
            Number
          ),
        draft:
          sql<number>`COUNT(*) FILTER (WHERE ${events.isPosted} = FALSE)`.mapWith(
            Number
          ),
      })
      .from(events);

    return {
      totalUsers: totalUsers[0].count,
      totalProductsPosted: totalProducts[0].posted,
      totalProductsDraft: totalProducts[0].draft,
      totalBlogsPublished: totalBlogs[0].published,
      totalBlogsDraft: totalBlogs[0].draft,
      totalEventsPosted: totalEvents[0].posted,
      totalEventsDraft: totalEvents[0].draft,
    };
  }),
});
