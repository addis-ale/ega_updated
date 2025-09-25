import { Calendar, MapPin, Clock } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { EventData } from "../../types";
import { formatTime12Hour } from "@/lib/format-12hr-time";
import { getEventStatus } from "@/lib/event-status";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface EventCardProps {
  event: EventData[number];
}

export function EventCard({ event }: EventCardProps) {
  const formatDate = (dateString: string | null) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return {
      day: date.getDate(),
      month: date.toLocaleDateString("en-US", { month: "short" }).toUpperCase(),
      year: date.getFullYear(),
    };
  };

  const eventDateFormatted = formatDate(event.eventDate);
  const status = getEventStatus(event.eventDate, event.eventTime);
  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: event.title,
          text: event.description || "Check out this event!",
          url: `${window.location.origin}/events`, // event details page
        });
      } else {
        // fallback if not supported
        await navigator.clipboard.writeText(
          `${window.location.origin}/events/${event.id}`
        );
        toast.success("Link copied to clipboard!");
      }
    } catch {
      toast.error("Error while sharing");
    }
  };

  return (
    <Card
      className={cn(
        `group relative overflow-hidden bg-card border-0 shadow-2xl hover:shadow-3xl transition-all duration-700 hover:-translate-y-2`,
        status === "ENDED"
          ? "opacity-50 grayscale hover:opacity-70 hover:grayscale-0"
          : ""
      )}
    >
      {/* Cover Image Section */}
      <div className="relative h-80 overflow-hidden">
        {event.coverImg ? (
          <div className="relative w-full h-full">
            <Image
              src={event.coverImg}
              alt={event.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </div>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/20 via-accent/30 to-primary/40 flex items-center justify-center">
            <div className="text-center space-y-4">
              <Calendar className="w-16 h-16 text-primary mx-auto opacity-60" />
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                Event Image
              </p>
            </div>
          </div>
        )}

        {/* Date Overlay */}
        {eventDateFormatted && (
          <div className="absolute top-6 left-6 bg-background/95 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-border/50">
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground leading-none">
                {eventDateFormatted.day}
              </div>
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mt-1">
                {eventDateFormatted.month}
              </div>
              <div className="text-xs text-muted-foreground">
                {eventDateFormatted.year}
              </div>
            </div>
          </div>
        )}
        <div className="absolute top-6 right-6">
          <span
            className={`px-3 py-1 text-xs font-bold rounded-full ${
              status === "UPCOMING"
                ? "bg-blue-100 text-blue-700"
                : status === "ACTIVE"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {status}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-8 space-y-6">
        {/* Title */}
        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-foreground leading-tight text-balance group-hover:text-primary transition-colors duration-300">
            {event.title}
          </h2>

          {event.description && (
            <p className="text-muted-foreground leading-relaxed text-pretty">
              {event.description}
            </p>
          )}
        </div>

        {/* Event Details */}
        <div className="space-y-4">
          {eventDateFormatted && (
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Clock className="w-4 h-4 text-primary" />
              <span className="font-medium">
                {formatTime12Hour(event.eventTime!)}
              </span>
            </div>
          )}

          {event.location && (
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4 text-primary" />
              <span className="font-medium">{event.location}</span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <Button
            variant="outline"
            onClick={handleShare}
            className="px-6 border-border hover:bg-accent hover:text-accent-foreground transition-all duration-300 bg-transparent"
          >
            Share
          </Button>
        </div>
      </div>
    </Card>
  );
}
