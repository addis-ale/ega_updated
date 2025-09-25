"use client";

import { EmptyState } from "@/components/empty-state";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { EventCard } from "../components/event-card";

export const AdminEventsView = () => {
  const trpc = useTRPC();
  const { data: events } = useSuspenseQuery(trpc.events.getMany.queryOptions());
  if (!events || events.length === 0) {
    return (
      <EmptyState
        title="No Events Yet"
        description="You haven't created any events. Click the button and add your first event."
      />
    );
  }

  return (
    <div className="container mx-auto px-6 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
};
