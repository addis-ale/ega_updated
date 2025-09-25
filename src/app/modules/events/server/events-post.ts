import { db } from "@/db";
import { events } from "@/db/schema";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { desc, eq } from "drizzle-orm";

export const eventPostsRoute = createTRPCRouter({
  getMany: baseProcedure.query(async () => {
    const rows = await db
      .select()
      .from(events)
      .where(eq(events.isPosted, true))
      .orderBy(desc(events.createdAt));
    return rows.map((row) => ({
      id: row.id,
      title: row.title, // already camelCase thanks to Drizzle column alias
      description: row.description,
      coverImg: row.coverImg,
      location: row.location,
      eventDate: row.eventDate?.toISOString() ?? null,
      eventTime: row.eventTime ?? null,
    }));
  }),
});
