import Head from 'next/head';

import '../styles/globals.css';
import Layout from '../components/layout/layout';

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        {/* If some of these elements are repeated down the tree, they will be overwritten.
            If not - they will be merged.
            If we want repeating elements -> we add key="some-key" */}
        <title>Next Events</title>
        <meta name='description' content='Next Events' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
