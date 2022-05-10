import { useRouter } from 'next/router';

import { getEventById } from '../../dummy-data';

function EventDetailPage() {
  const router = useRouter();

  const eventId = router.query.eventId;

  const event = getEventById(eventId);

  if (!event) {
    return <p>No event found!</p>;
  }

  return (
    <div>
      <h1>{event.title}</h1>
    </div>
  );
}

export default EventDetailPage;
