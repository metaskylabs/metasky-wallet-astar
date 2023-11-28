import 'bootstrap/dist/css/bootstrap.css';
import { WagmiConfig } from 'wagmi';
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
import useInitialization from '@components/WalletConnect/hooks/useInitialization';
import useWalletConnectEventsManager from '@components/WalletConnect/hooks/useWalletConnectEventsManager';
import { createLegacySignClient } from '@components/WalletConnect/utils/LegacyWalletConnectUtil';
import WalletConnectModal from '@components/WalletConnect/WalletConnectModal/WalletConnectModal';
import '@near-wallet-selector/modal-ui/styles.css';

initAmplitude();
// initElasticRum();

import { Web3Modal } from '@web3modal/react';
import { WalletSelectorContextProvider } from '@components/Shared/NearWalletSelector/WalletSelectorContext';
import { ethereumClient, wagmiClient } from '@utils/web3modal-client';

if (!process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID) {
  throw new Error(
    `You need to provide NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID env variable`,
  );
}

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

  // Wallet Connect changes

  const walletConnectInitialized = useInitialization();

  useWalletConnectEventsManager(walletConnectInitialized);

  createLegacySignClient();

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
        <script
          defer
          src={`${process.env.NEXT_PUBLIC_ONMETA_BASE_URL}/onmeta-sdk.js`}
        ></script>
      </Head>
      <WagmiConfig config={wagmiClient}>
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
        <WalletSelectorContextProvider>
          <HocWrapper>
            <Component {...pageProps} />
            <div css={styles.modalWrapper} id="modal" />
          </HocWrapper>
        </WalletSelectorContextProvider>
        <Web3Modal
          projectId={process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || ``}
          ethereumClient={ethereumClient}
          enableNetworkView={false}
          themeMode={`light`}
          desktopWallets={[]}
          explorerRecommendedWalletIds={["c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96",
          "1aedbcfc1f31aade56ca34c38b0a1607b41cccfa3de93c946ef3b4ba2dfab11c",
        "7674bb4e353bf52886768a3ddc2a4562ce2f4191c80831291218ebd90f5f5e26",
      "9ce87712b99b3eb57396cc8621db8900ac983c712236f48fb70ad28760be3f6a"]}
          enableExplorer={false}
        />
      </WagmiConfig>
    </StoreProvider>
  );
}
