import { Fragment } from 'react';
import Head from 'next/head';

import { getFeaturedEvents, getEventById } from '../../helpers/api-util';
import EventSummary from '../../components/event-detail/event-summary';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventContent from '../../components/event-detail/event-content';
import Comments from '../../components/input/comments';

function EventDetailPage(props) {
  // const router = useRouter();

  // const eventId = router.query.eventId;
  const event = props.selectedEvent;

  if (!event) {
    return (
      <div className='center'>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <Fragment>
      <Head>
        <title>{event.title}</title>
        <meta name='description' content={event.description} />
      </Head>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
      <Comments eventId={event.id} />
    </Fragment>
  );
}

export async function getStaticProps(context) {
  const eventId = context.params.eventId;

  const event = await getEventById(eventId);

  return {
    props: {
      selectedEvent: event,
    },
    revalidate: 30,
  };
}

export async function getStaticPaths() {
  const allEvents = await getFeaturedEvents();

  const paths = allEvents.map((event) => ({ params: { eventId: event.id } }));

  return {
    paths: paths,
    fallback: true, // because we don't fetch all the events' ids
    // fallback: 'blocking', -> Next.js will not show anything until we are done fetching the data
  };
}

export default EventDetailPage;
