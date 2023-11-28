import { IWalletConnectSession } from '@walletconnect/legacy-types';
import LegacySignClient from '@walletconnect/client';
import ModalStore from '@components/WalletConnect/store/ModalStore';
import { EIP155_SIGNING_METHODS } from '@components/WalletConnect/data/EIP155Data';
import { Logger } from '@utils/logger';

export let legacySignClient: LegacySignClient;

export function createLegacySignClient({ uri }: { uri?: string } = {}) {
  // If URI is passed always create a new session,
  // otherwise fall back to cached session if client isn't already instantiated.
  if (uri) {
    deleteCachedLegacySession();
    legacySignClient = new LegacySignClient({ uri, storageId: `wc_outward` });
  } else if (!legacySignClient && getCachedLegacySession()) {
    const session = getCachedLegacySession();
    legacySignClient = new LegacySignClient({
      session,
      storageId: `wc_outward`,
    });
  } else {
    return;
  }

  legacySignClient.on(`session_request`, (error, payload) => {
    if (error) {
      throw new Error(`legacySignClient > session_request failed: ${error}`);
    }
    ModalStore.open(`LegacySessionProposalModal`, { legacyProposal: payload });
  });

  legacySignClient.on(`connect`, () => {
    Logger.debug(`legacySignClient > connect`);
  });

  legacySignClient.on(`error`, (error) => {
    throw new Error(`legacySignClient > on error: ${error}`);
  });

  legacySignClient.on(`call_request`, (error, payload) => {
    Logger.debug(payload);
    Logger.debug(error);
    if (error) {
      throw new Error(`legacySignClient > call_request failed: ${error}`);
    }
    onCallRequest(payload);
  });

  legacySignClient.on(`disconnect`, async () => {
    deleteCachedLegacySession();
  });
}

const onCallRequest = async (payload: {
  id: number;
  method: string;
  params: any[];
}) => {
  switch (payload.method) {
    case EIP155_SIGNING_METHODS.ETH_SIGN:
    case EIP155_SIGNING_METHODS.PERSONAL_SIGN:
      return ModalStore.open(`LegacySessionSignModal`, {
        legacyCallRequestEvent: payload,
        legacyRequestSession: legacySignClient.session,
      });

    case EIP155_SIGNING_METHODS.ETH_SIGN_TYPED_DATA:
    case EIP155_SIGNING_METHODS.ETH_SIGN_TYPED_DATA_V3:
    case EIP155_SIGNING_METHODS.ETH_SIGN_TYPED_DATA_V4:
      return ModalStore.open(`LegacySessionSignTypedDataModal`, {
        legacyCallRequestEvent: payload,
        legacyRequestSession: legacySignClient.session,
      });

    case EIP155_SIGNING_METHODS.ETH_SEND_TRANSACTION:
    case EIP155_SIGNING_METHODS.ETH_SIGN_TRANSACTION:
      return ModalStore.open(`LegacySessionSendTransactionModal`, {
        legacyCallRequestEvent: payload,
        legacyRequestSession: legacySignClient.session,
      });

    case `wallet_switchEthereumChain`:
      ModalStore.open(`SwitchNetworkChain`, {});
      break;

    default:
      alert(`${payload.method} is not supported for WalletConnect v1`);
  }
};

function getCachedLegacySession(): IWalletConnectSession | undefined {
  if (typeof window === `undefined`) return;

  const local = window.localStorage
    ? window.localStorage.getItem(`wc_outward`)
    : null;

  let session = null;
  if (local) {
    try {
      session = JSON.parse(local);
    } catch (error) {
      throw error;
    }
  }
  return session;
}

function deleteCachedLegacySession(): void {
  if (typeof window === `undefined`) return;
  window.localStorage.removeItem(`wc_outward`);
}
