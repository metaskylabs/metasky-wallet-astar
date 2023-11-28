// import ModalStore from '@/store/ModalStore'
import { useCallback, useEffect } from 'react';
import { SignClientTypes } from '@walletconnect/types';
import { EIP155_SIGNING_METHODS } from '@components/WalletConnect/data/EIP155Data';
import { signClient } from '@components/WalletConnect/utils/WalletConnectUtil';
import ModalStore from '@components/WalletConnect/store/ModalStore';
import { Web3WalletTypes } from '@walletconnect/web3wallet';

export default function useWalletConnectEventsManager(initialized: boolean) {
  /******************************************************************************
   * 1. Open session proposal modal for confirmation / rejection
   *****************************************************************************/
  const onSessionProposal = useCallback(
    (proposal: Web3WalletTypes.EventArguments['session_proposal']) => {
      ModalStore.open(`SessionProposalModal`, { proposal });
    },
    [],
  );

  /******************************************************************************
   * 3. Open request handling modal based on method that was used
   *****************************************************************************/
  const onSessionRequest = useCallback(
    async (requestEvent: Web3WalletTypes.EventArguments['session_request']) => {
      const { topic, params, id } = requestEvent;
      const { request } = params;
      const requestSession = signClient.engine.signClient.session.get(topic);
      switch (request.method) {
        case EIP155_SIGNING_METHODS.ETH_SIGN:
        case EIP155_SIGNING_METHODS.PERSONAL_SIGN:
          return ModalStore.open(`SessionSignModal`, {
            requestEvent,
            requestSession,
          });

        case EIP155_SIGNING_METHODS.ETH_SIGN_TYPED_DATA:
        case EIP155_SIGNING_METHODS.ETH_SIGN_TYPED_DATA_V3:
        case EIP155_SIGNING_METHODS.ETH_SIGN_TYPED_DATA_V4:
          return ModalStore.open(`SessionSignTypedDataModal`, {
            requestEvent,
            requestSession,
          });

        case EIP155_SIGNING_METHODS.ETH_SEND_TRANSACTION:
        case EIP155_SIGNING_METHODS.ETH_SIGN_TRANSACTION:
          return ModalStore.open(`SessionSendTransactionModal`, {
            requestEvent,
            requestSession,
          });
        default:
          return ModalStore.open(`SessionUnsuportedMethodModal`, {
            requestEvent,
            requestSession,
          });
      }
    },
    [],
  );

  /******************************************************************************
   * Set up WalletConnect event listeners
   *****************************************************************************/
  useEffect(() => {
    if (initialized) {
      signClient.on(`session_proposal`, onSessionProposal);
      signClient.on(`session_request`, onSessionRequest);
      // TODOs
      // signClient.on(`session_ping`, (data) => console.log(`ping`, data));
      // signClient.on(`session_event`, (data) => console.log(`event`, data));
      // signClient.on(`session_update`, (data) => console.log(`update`, data));
      // signClient.on(`session_delete`, (data) => console.log(`delete`, data));
    }
  }, [initialized, onSessionProposal, onSessionRequest]);
}
