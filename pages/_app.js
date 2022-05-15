import Head from 'next/head';

import '../styles/globals.css';
import Layout from '../components/layout/layout';
import Notification from '../components/ui/notification';
import { NotificationContextProvider } from '../store/notification-context';

function MyApp({ Component, pageProps }) {
  return (
    <NotificationContextProvider>
      <Layout>
        <Head>
          {/* If some of these elements are repeated down the tree, they will be overwritten.
            If not - they will be merged.
            If we want repeating elements -> we add key="some-key" */}
          <title>Next Events</title>
          <meta name='description' content='Next Events' />
          <meta
            name='viewport'
            content='initial-scale=1.0, width=device-width'
          />
        </Head>
        <Component {...pageProps} />
        <Notification title='Test' message='This is a test' status='pending' />
      </Layout>
    </NotificationContextProvider>
  );
}

export default MyApp;
