import Head from 'next/head';

import EventList from '../components/events/event-list';
import NewsletterRegistration from '../components/input/newsletter-registration';
import { getFeaturedEvents } from '../helpers/api-util';

function HomePage(props) {
  return (
    <div>
      <Head>
        <title>NextJS Events</title>
        <meta
          name='description'
          content='Find a lot of new and exciting events.'
        />
      </Head>
      <NewsletterRegistration />
      <EventList items={props.events} />
    </div>
  );
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      events: featuredEvents,
    },
    revalidate: 1800,
  };
}

export default HomePage;
