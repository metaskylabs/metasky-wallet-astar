import { FC, forwardRef, useImperativeHandle } from 'react';
import ModalStore from '@components/WalletConnect/store/ModalStore';
import { legacySignClient } from '@components/WalletConnect/utils/LegacyWalletConnectUtil';
import generateToast from '@components/Shared/GenerateToast';
import { ToastType } from '@components/Shared/Toast';
import { signClient } from '../utils/WalletConnectUtil';
import { SessionTypes } from '@walletconnect/types';
import NetworkSelectSheet from './NetworkSelectSheet';
import { getSdkError } from '@walletconnect/utils';

export function isEIP155Chain(chain: string) {
  return chain.includes(`eip155`);
}

interface NetworkProps {
  assetImage: string;
  name: string;
  address: string;
  chainId: number;
}

const NetworkSelect: FC<any> = forwardRef((props, ref) => {
  const proposal = ModalStore.state.data?.proposal;
  useImperativeHandle(ref, () => ({ onReject }));

  // Ensure proposal is defined
  if (!proposal) {
    return <p>Missing proposal data</p>;
  }

  const icon = proposal?.params?.proposer?.metadata?.icons?.[0];
  const url = proposal?.params?.proposer?.metadata?.url;
  const name = proposal?.params?.proposer?.metadata?.name;

  async function onApprove(selectedNetwork: NetworkProps) {
    if (proposal) {
      const requiredNamespaces = proposal.params.requiredNamespaces;
      const optionalNamespaces = proposal.params.optionalNamespaces;
      const relays = proposal.params.relays;
      const namespaces: SessionTypes.Namespaces = {};
      Object.keys(requiredNamespaces).forEach((key) => {
        const accounts: string[] = [];
        requiredNamespaces[key]?.chains?.map((chain) => {
          if (isEIP155Chain(chain))
            accounts.push(`${chain}:${selectedNetwork.address}`);
        });
        namespaces[key] = {
          accounts,
          methods: requiredNamespaces[key].methods,
          events: requiredNamespaces[key].events,
        };
      });
      Object.keys(optionalNamespaces).forEach((key) => {
        const accounts: string[] = [];
        optionalNamespaces[key]?.chains?.map((chain) => {
          if (isEIP155Chain(chain))
            accounts.push(`${chain}:${selectedNetwork.address}`);
        });
        namespaces[key] = {
          ...(namespaces[key] || {}),
          accounts: namespaces[key]
            ? [...namespaces[key].accounts, ...accounts]
            : accounts,
          methods: namespaces[key]?.methods || optionalNamespaces[key].methods,
          events: namespaces[key]?.events || optionalNamespaces[key].events,
        };
      });
      await signClient.approveSession({
        id: proposal.id,
        relayProtocol: relays[0].protocol,
        namespaces,
      });
    }
    ModalStore.close();
    generateToast({
      content: `WalletConnect connected`,
      type: ToastType.SUCCESS,
    });
  }

  async function onReject() {
    if (proposal) {
      await signClient.rejectSession({
        id: proposal.id,
        reason: getSdkError(`USER_REJECTED_METHODS`),
      });
    }
    ModalStore.close();
  }

  return (
    <NetworkSelectSheet
      icon={icon}
      url={url}
      name={name}
      onApprove={onApprove}
    />
  );
});

NetworkSelect.displayName = `NetworkSelect`;

export { NetworkSelect };

export const LegacyNetworkSelect: FC = () => {
  // Get proposal data and wallet address from store
  const legacyProposal = ModalStore.state.data?.legacyProposal;
  // Ensure proposal is defined
  if (!legacyProposal) {
    return <p>Missing proposal data</p>;
  }

  const icon = legacyProposal?.params?.[0]?.peerMeta?.icons?.[0];
  const url = legacyProposal?.params?.[0]?.peerMeta?.url;
  const name = legacyProposal?.params?.[0]?.peerMeta?.name;

  async function onApprove(selectedNetwork: NetworkProps) {
    if (legacyProposal) {
      legacySignClient.approveSession({
        accounts: [selectedNetwork.address],
        chainId: selectedNetwork.chainId,
      });
    }
    ModalStore.close();
    generateToast({
      content: `WalletConnect connected`,
      type: ToastType.SUCCESS,
    });
  }

  return (
    <NetworkSelectSheet
      icon={icon}
      url={url}
      name={name}
      onApprove={onApprove}
    />
  );
};
