import { useSnapshot } from 'valtio';
import { BottomSheet } from '@components/Shared';
import ModalStore from '@components/WalletConnect/store/ModalStore';
import {
  NetworkSelect,
  LegacyNetworkSelect,
} from '@components/WalletConnect/NetworkSelect';
import {
  LegacySignatureRequest,
  SignatureRequest,
} from '@components/WalletConnect/SignatureRequest';
import {
  BlockchainRequest,
  LegacyBlockchainRequest,
} from '@components/WalletConnect/BlockchainRequest';
import {
  LegacyTypedSignatureRequest,
  TypedSignatureRequest,
} from '@components/WalletConnect/TypedSignatureRequest';
import { useRef } from 'react';
import SwitchChainSheet from './SwitchChainSheet';

export default function WalletConnectModal() {
  const { open, view } = useSnapshot(ModalStore.state);
  const ref = useRef<any>();

  const onCloseModal = async () => {
    if (ref.current?.onReject) {
      ref.current?.onReject(`User cancelled the operation`);
    }
    ModalStore.close();
  };

  return (
    <BottomSheet onClose={onCloseModal} isOpen={open}>
      {view === `LegacySessionProposalModal` && <LegacyNetworkSelect />}
      {view === `LegacySessionSignModal` && <LegacySignatureRequest />}
      {view === `LegacySessionSignTypedDataModal` && (
        <LegacyTypedSignatureRequest />
      )}
      {view === `LegacySessionSendTransactionModal` && (
        <LegacyBlockchainRequest ref={ref} />
      )}
      {view === `SessionProposalModal` && <NetworkSelect ref={ref} />}
      {view === `SessionSignModal` && <SignatureRequest ref={ref} />}
      {view === `SessionSignTypedDataModal` && (
        <TypedSignatureRequest ref={ref} />
      )}
      {view === `SessionSendTransactionModal` && (
        <BlockchainRequest ref={ref} />
      )}
      {view === `SwitchNetworkChain` && <SwitchChainSheet />}
      {/*{view === `SessionSendTransactionModal` && (*/}
      {/*  <SessionSendTransactionModal />*/}
      {/*)}*/}
      {/*{view === `SessionUnsuportedMethodModal` && (*/}
      {/*  <SessionUnsuportedMethodModal />*/}
      {/*)}*/}
      {/*{view === `SessionSignCosmosModal` && <SessionSignCosmosModal />}*/}
      {/*{view === `SessionSignSolanaModal` && <SessionSignSolanaModal />}*/}
      {/*{view === `SessionSignPolkadotModal` && <SessionSignPolkadotModal />}*/}
      {/*{view === `SessionSignNearModal` && <SessionSignNearModal />}*/}
      {/*{view === `SessionSignElrondModal` && <SessionSignElrondModal />}*/}
      {/*{view === `LegacySessionProposalModal` && <LegacySessionProposalModal />}*/}
      {/*{view === `LegacySessionSignModal` && <LegacySessionSignModal />}*/}
      {/*{view === `LegacySessionSignTypedDataModal` && (*/}
      {/*  <LegacySessionSignTypedDataModal />*/}
      {/*)}*/}
      {/*{view === `LegacySessionSendTransactionModal` && (*/}
      {/*  <LegacySessionSendTransactionModal />*/}
      {/*)}*/}
    </BottomSheet>
  );
}
