import { db } from "@/db";
import { events } from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { and, eq } from "drizzle-orm";
import { z } from "zod";
export const eventsRoute = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        title: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const [createdEvent] = await db
        .insert(events)
        .values({
          title: input.title,
          userId: ctx.auth.user.id,
        })
        .returning();
      return createdEvent;
    }),
  update: protectedProcedure
    .input(
      z.object({
        eventId: z.string(),
        title: z.string().optional(),
        description: z.string().optional(),
        coverImg: z.string().optional(),
        location: z.string().optional(),
        eventDate: z.string().optional(),
        status: z.enum(["UPCOMING", "ENDED", "ACTIVE"]).optional(),
        isPosted: z.boolean().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { eventId, ...rest } = input;
      const updateData: Record<string, unknown> = {};
      for (const [key, value] of Object.entries(rest)) {
        if (typeof value !== "undefined") {
          updateData[key] = value;
        }
      }
      const [updatedEvent] = await db
        .update(events)
        .set(updateData)
        .where(and(eq(events.userId, ctx.auth.user.id), eq(events.id, eventId)))
        .returning();
      if (!updatedEvent) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Event not found" });
      }
      return updatedEvent;
    }),
});
