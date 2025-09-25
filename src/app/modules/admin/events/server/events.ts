import { db } from "@/db";
import { events } from "@/db/schema";
import { isAdmin } from "@/lib/admin";
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
      if (!isAdmin(ctx.auth.user.id)) {
        throw new TRPCError({ code: "UNAUTHORIZED", message: "Unauthorized" });
      }
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
        eventDate: z
          .string()
          .transform((val) => new Date(val))
          .optional(),
        eventTime: z
          .string()
          .regex(/^([0-1]\d|2[0-3]):([0-5]\d)(:[0-5]\d)?$/, {
            message: "Invalid time format. Use HH:MM or HH:MM:SS",
          })
          .optional(),

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
  getOne: protectedProcedure
    .input(
      z.object({
        eventId: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      const [existingEvent] = await db
        .select()
        .from(events)
        .where(
          and(eq(events.userId, ctx.auth.user.id), eq(events.id, input.eventId))
        );
      if (!existingEvent) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Event not found with this ID",
        });
      }
      return existingEvent;
    }),
  remove: protectedProcedure
    .input(
      z.object({
        eventId: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const [removedEvent] = await db
        .delete(events)
        .where(
          and(eq(events.id, input.eventId), eq(events.userId, ctx.auth.user.id))
        )
        .returning();
      if (!removedEvent) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Event not found with this Id",
        });
      }
      return removedEvent;
    }),
  getMany: protectedProcedure.query(async ({ ctx }) => {
    const myEvents = await db
      .select()
      .from(events)
      .where(eq(events.userId, ctx.auth.user.id));
    return myEvents;
  }),
});
