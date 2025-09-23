import { db } from "@/db";
import { blogs } from "@/db/schema";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { desc, eq } from "drizzle-orm";

export const blogPostsRoute = createTRPCRouter({
  getMany: baseProcedure.query(async () => {
    const allBlogs = await db
      .select()
      .from(blogs)
      .where(eq(blogs.isPublished, true))
      .orderBy(desc(blogs.createdAt));
    return allBlogs;
  }),
});
