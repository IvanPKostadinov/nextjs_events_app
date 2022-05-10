import EventItem from './event-item';

function EventList(props) {
  const { items } = props;

  return (
    <ul>
      {items.map((event) => (
        <EventItem key={event.id} item={event} />
      ))}
    </ul>
  );
}

export default EventList;
