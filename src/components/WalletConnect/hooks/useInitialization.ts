import { useCallback, useEffect, useState } from 'react';
import { createSignClient } from '@components/WalletConnect/utils/WalletConnectUtil';

export default function useInitialization() {
  const [initialized, setInitialized] = useState(false);

  const onInitialize = useCallback(async () => {
    try {
      await createSignClient();

      setInitialized(true);
    } catch (err: unknown) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    if (!initialized) {
      onInitialize();
    }
  }, [initialized, onInitialize]);

  return initialized;
}
