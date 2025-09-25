import { Calendar, MapPin, Clock, User } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface EventData {
  id: string;
  description: string | null;
  title: string;
  coverImg: string | null;
  location: string | null;
  eventDate: string | null;
}

interface EventCardProps {
  event: EventData;
  className?: string;
}

export function EventCard({ event, className = "" }: EventCardProps) {
  const formatDate = (dateString: string | null) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return {
      day: date.getDate(),
      month: date.toLocaleDateString("en-US", { month: "short" }).toUpperCase(),
      year: date.getFullYear(),
      time: date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }),
    };
  };

  const eventDateFormatted = formatDate(event.eventDate);

  return (
    <Card
      className={`group relative overflow-hidden bg-card border-0 shadow-2xl hover:shadow-3xl transition-all duration-700 hover:-translate-y-2 ${className}`}
    >
      {/* Cover Image Section */}
      <div className="relative h-80 overflow-hidden">
        {event.coverImg ? (
          <Image
            src={event.coverImg || "/placeholder.svg"}
            alt={event.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
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
              <span className="font-medium">{eventDateFormatted.time}</span>
            </div>
          )}

          {event.location && (
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4 text-primary" />
              <span className="font-medium">{event.location}</span>
            </div>
          )}

          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <User className="w-4 h-4 text-primary" />
            <span className="font-medium">
              Event ID: {event.id.slice(0, 8)}...
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <Button className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 transition-all duration-300 hover:shadow-lg">
            View Details
          </Button>
          <Button
            variant="outline"
            className="px-6 border-border hover:bg-accent hover:text-accent-foreground transition-all duration-300 bg-transparent"
          >
            Share
          </Button>
        </div>
      </div>
    </Card>
  );
}
