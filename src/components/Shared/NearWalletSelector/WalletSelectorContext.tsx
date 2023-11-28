// import { setupCoin98Wallet } from '@near-wallet-selector/coin98-wallet';
import type { AccountState, WalletSelector } from '@near-wallet-selector/core';
import { setupWalletSelector } from '@near-wallet-selector/core';
// import { setupHereWallet } from '@near-wallet-selector/here-wallet';
// import { setupMathWallet } from '@near-wallet-selector/math-wallet';
// import { setupMeteorWallet } from '@near-wallet-selector/meteor-wallet';
// import { setupNarwallets } from "@near-wallet-selector/narwallets";
import type { WalletSelectorModal } from '@near-wallet-selector/modal-ui';
import { setupModal } from '@near-wallet-selector/modal-ui';
import { setupNearWallet } from '@near-wallet-selector/near-wallet';
// import { setupNearFi } from '@near-wallet-selector/nearfi';
// import { setupNightly } from '@near-wallet-selector/nightly';
// import { setupNightlyConnect } from '@near-wallet-selector/nightly-connect';
import { setupSender } from '@near-wallet-selector/sender';
// import { setupWalletConnect } from '@near-wallet-selector/wallet-connect';
import type { ReactNode } from 'react';
import React, {
  useCallback,
  useContext,
  useEffect,
  useState,
  useMemo,
} from 'react';
import { distinctUntilChanged, map } from 'rxjs';
// import { Loading } from '../components/Loading';
import { setupMyNearWallet } from '@near-wallet-selector/my-near-wallet';
// import { setupLedger } from '@near-wallet-selector/ledger';

// const NEAR_CONTRACT_ID = 'guest-book.testnet';
export const NEAR_CONTRACT_ID = `muzzammil-ms.testnet`;

declare global {
  interface Window {
    selector: WalletSelector;
    modal: WalletSelectorModal;
  }
}

interface WalletSelectorContextValue {
  selector: WalletSelector;
  modal: WalletSelectorModal;
  accounts: Array<AccountState>;
  accountId: string | null;
}

const WalletSelectorContext =
  React.createContext<WalletSelectorContextValue | null>(null);

export const WalletSelectorContextProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [selector, setSelector] = useState<WalletSelector | null>(null);
  const [modal, setModal] = useState<WalletSelectorModal | null>(null);
  const [accounts, setAccounts] = useState<Array<AccountState>>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const init = useCallback(async () => {
    const _selector = await setupWalletSelector({
      network: `testnet`,
      debug: true,
      modules: [setupMyNearWallet(), setupSender(), setupNearWallet()],
    });
    const _modal = setupModal(_selector, {
      contractId: NEAR_CONTRACT_ID,
    });
    const state = _selector.store.getState();
    setAccounts(state.accounts);

    // this is added for debugging purpose only
    // for more information (https://github.com/near/wallet-selector/pull/764#issuecomment-1498073367)
    window.selector = _selector;
    window.modal = _modal;

    setSelector(_selector);
    setModal(_modal);
    setLoading(false);
  }, []);

  useEffect(() => {
    init().catch((err) => {
      console.error(err);
      alert(`Failed to initialise wallet selector`);
    });
  }, [init]);

  useEffect(() => {
    if (!selector) {
      return;
    }

    const subscription = selector.store.observable
      .pipe(
        map((state) => state.accounts),
        distinctUntilChanged(),
      )
      .subscribe((nextAccounts) => {
        console.log(`Accounts Update`, nextAccounts);

        setAccounts(nextAccounts);
      });

    const onHideSubscription = modal?.on(`onHide`, ({ hideReason }) => {
      console.log(`The reason for hiding the modal ${hideReason}`);
    });

    return () => {
      subscription.unsubscribe();
      onHideSubscription?.remove();
    };
  }, [selector, modal]);

  const walletSelectorContextValue = useMemo<WalletSelectorContextValue>(
    () => ({
      selector: selector!,
      modal: modal!,
      accounts,
      accountId: accounts.find((account) => account.active)?.accountId || null,
    }),
    [selector, modal, accounts],
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <WalletSelectorContext.Provider value={walletSelectorContextValue}>
      {children}
    </WalletSelectorContext.Provider>
  );
};

export function useWalletSelector() {
  const context = useContext(WalletSelectorContext);

  if (!context) {
    throw new Error(
      `useWalletSelector must be used within a WalletSelectorContextProvider`,
    );
  }

  return context;
}
