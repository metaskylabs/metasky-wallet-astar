import 'bootstrap/dist/css/bootstrap.css';
import { Provider as StoreProvider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { Global } from '@emotion/react';
import global from '@styles/shared/global';
import React, { useEffect } from 'react';
import HocWrapper from '@components/HOC';
import Script from 'next/script';

import * as styles from '@styles/Modules/app';
import {
  initAmplitude,
  // initElasticRum
} from '@utils/amplitude';
import { getOrCreateStore } from '@utils/redux/createStore';
import 'bootstrap/dist/css/bootstrap.min.css';
import Head from 'next/head';
import { useRouter } from 'next/router';
import AssetsImg from '@public/images';

initAmplitude();
// initElasticRum();

export default function App({ Component, pageProps }: any) {
  const router = useRouter();

  const store = getOrCreateStore();

  useEffect(() => {
    if (!router.isReady) return;
    router.events.on(`routeChangeStart`, (o) => {
      const history = store.getState().routerHistory.history;
      if (history[history.length - 1] === o) {
        history.pop();
        store.dispatch({ type: `SET_HISTORY`, payload: [...history] });
      } else {
        history.push(`${window.location.pathname}${window.location.search}`);
        store.dispatch({ type: `SET_HISTORY`, payload: [...history] });
      }
    });
  }, [router.isReady]);

  return (
    <StoreProvider store={store}>
      <Head>
        <title>SkyWallet</title>
        <meta name="viewport" content="viewport-fit=cover" />
        <link rel="manifest" href="/manifest.json" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
        />
        <link rel="shortcut icon" href={AssetsImg.i_favicon_with_bg.src} />
      </Head>
      <Script
        id="gtmScript"
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GTM_KEY}`}
      />
      <Script strategy="lazyOnload" id="gtmInital">
        {`window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GTM_KEY}', { debug_mode: true });`}
      </Script>
      <div css={styles.backgroundArea} />
      <Global styles={global} />
      <Toaster
        toastOptions={{
          position: `top-center`,
          duration: 2000,
        }}
      />

      <HocWrapper>
        <Component {...pageProps} />
        <div css={styles.modalWrapper} id="modal" />
      </HocWrapper>
    </StoreProvider>
  );
}