import * as React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en-us">
        <Head />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/app_icons/icon-192x192.png"></link>
        <meta name="theme-color" content="#fff" />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
