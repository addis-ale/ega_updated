import { CreateNewEventView } from "@/app/modules/admin/events/ui/views/create-event-view";
import { BackLink } from "@/components/back-link";

const CreateNewEvent = () => {
  return (
    <>
      <BackLink href="/admin/events" label="Back to events" />
      <CreateNewEventView />
    </>
  );
};

export default CreateNewEvent;
