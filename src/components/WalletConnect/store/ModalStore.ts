import { SessionTypes } from '@walletconnect/types';
import {
  IClientMeta,
  IWalletConnectSession,
} from '@walletconnect/legacy-types';
import { proxy } from 'valtio';
import { Web3WalletTypes } from '@walletconnect/web3wallet';

/**
 * Types
 */
interface ModalData {
  proposal?: Web3WalletTypes.EventArguments['session_proposal'];
  requestEvent?: Web3WalletTypes.EventArguments['session_request'];
  requestSession?: SessionTypes.Struct;
  legacyProposal?: {
    id: number;
    params: [{ chainId: number; peerId: string; peerMeta: IClientMeta }];
  };
  legacyCallRequestEvent?: { id: number; method: string; params: any[] };
  legacyRequestSession?: IWalletConnectSession;
}

interface State {
  open: boolean;
  view?:
    | 'SessionProposalModal'
    | 'SessionSignModal'
    | 'SessionSignTypedDataModal'
    | 'SessionSendTransactionModal'
    | 'SessionUnsuportedMethodModal'
    | 'SessionSignCosmosModal'
    | 'SessionSignSolanaModal'
    | 'SessionSignPolkadotModal'
    | 'SessionSignNearModal'
    | 'SessionSignElrondModal'
    | 'LegacySessionProposalModal'
    | 'LegacySessionSignModal'
    | 'LegacySessionSignTypedDataModal'
    | 'LegacySessionSendTransactionModal'
    | 'SwitchNetworkChain';
  data?: ModalData;
}

/**
 * State
 */
const state = proxy<State>({
  open: false,
});

/**
 * Store / Actions
 */
const ModalStore = {
  state,

  open(view: State['view'], data: State['data']) {
    state.view = view;
    state.data = data;
    state.open = true;
  },

  close() {
    state.open = false;
  },
};

export default ModalStore;
