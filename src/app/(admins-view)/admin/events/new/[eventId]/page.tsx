import { BackLink } from "@/components/back-link";

interface Props {
  params: Promise<{ eventId: string }>;
}
const EventSetUpPage = async ({ params }: Props) => {
  const { eventId } = await params;
  return (
    <div>
      <BackLink href="/admin/events" label="Back to Events" />
      <div>event id setup view{eventId}</div>
    </div>
  );
};

export default EventSetUpPage;
