import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      // This is the default structure (without attributes and the <div />) and we should recreate it to overwrite it.
      <Html lang='en'>
        <Head />
        <body>
          {/* we may use this <div> for React Portals */}
          <div id='overlays' />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument;