import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { db } from "@/db";
import { blogs } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
export const blogRoutes = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        title: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const [createdBlog] = await db
        .insert(blogs)
        .values({ title: input.title, userId: ctx.auth.user.id })
        .returning();
      return createdBlog;
    }),
  update: protectedProcedure
    .input(
      z.object({
        blogId: z.string(),
        title: z.string().optional(),
        content: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { blogId, ...rest } = input;
      const updateData: Record<string, unknown> = {};
      for (const [key, value] of Object.entries(rest)) {
        if (typeof value !== "undefined") {
          updateData[key] = value;
        }
      }
      const [updatedBlog] = await db
        .update(blogs)
        .set(updateData)
        .where(and(eq(blogs.id, blogId), eq(blogs.userId, ctx.auth.user.id)))
        .returning();
      if (!updatedBlog) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Blog not found with this Id!",
        });
      }
      return updatedBlog;
    }),
  getOne: protectedProcedure
    .input(
      z.object({
        blogId: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      const [existingBlog] = await db
        .select()
        .from(blogs)
        .where(
          and(eq(blogs.id, input.blogId), eq(blogs.userId, ctx.auth.user.id))
        );
      if (!existingBlog) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Blog Not Found!" });
      }
      return existingBlog;
    }),
});
