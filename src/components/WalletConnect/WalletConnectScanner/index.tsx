import { parseUri } from '@walletconnect/utils';
import { Fragment, useState } from 'react';
import { createLegacySignClient } from '@components/WalletConnect/utils/LegacyWalletConnectUtil';
import { signClient } from '@components/WalletConnect/utils/WalletConnectUtil';
import ScanWithInput from '@components/ScanWithInput';

export default function WalletConnectScanner(props: {
  onScanComplete: () => void;
  onClose?: () => void;
}) {
  const [loading, setLoading] = useState(false);

  const onConnect = async (url: string) => {
    if (loading) return;
    try {
      setLoading(true);
      const text = url;
      if (text) {
        const { version } = parseUri(text);
        if (version === 1) {
          createLegacySignClient({ uri: url });
        } else {
          await signClient.core.pairing.pair({ uri: url });
        }
        props.onScanComplete();
      }

      // Route the provided URI to the v1 SignClient if URI version indicates it, else use v2.
    } catch (err: unknown) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScanWithInput
      title="Wallet Connect"
      buttonName="Continue"
      inputLabel="Enter WalletConnet URI Manually"
      inputPlaceholder="Wallet Connect String"
      onScanComplete={onConnect}
      onClose={props.onClose}
    />
  );
}
