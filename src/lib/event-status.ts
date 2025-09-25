export function getEventStatus(
  eventDate: string | null,
  eventTime: string | null
) {
  if (!eventDate) return "UNKNOWN";

  const now = new Date();
  const eventDateTime = new Date(eventDate);

  // If eventTime exists, merge into eventDateTime
  if (eventTime) {
    const [hours, minutes, seconds] = eventTime.split(":").map(Number);
    eventDateTime.setHours(hours ?? 0, minutes ?? 0, seconds ?? 0, 0);
  }

  if (now < eventDateTime) return "UPCOMING";
  if (now.toDateString() === eventDateTime.toDateString()) {
    return "ACTIVE";
  }
  return "ENDED";
}
