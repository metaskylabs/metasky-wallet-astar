import React, { FC, forwardRef, useImperativeHandle } from 'react';
import * as styles from './styles';
import AssetsImg from '@public/images';
import ButtonLayout from '@components/HOC/ButtonLayout.tsx';
import { PrimaryButton } from '@components/Shared';
import Link from 'next/link';
import { textTruncate } from '@utils/helper';
import ModalStore from '@components/WalletConnect/store/ModalStore';
import { legacySignClient } from '@components/WalletConnect/utils/LegacyWalletConnectUtil';
import {
  getSignTypedDataAddress,
  getSignTypedDataParamsData,
} from '@components/WalletConnect/utils/HelperUtil';
import {
  approveEIP155Request,
  rejectEIP155Request,
} from '@components/WalletConnect/utils/EIPRequestHandler';
import TypedSignatureRequestSheet from './TypedSignatureRequestSheet';
import { signClient } from '../utils/WalletConnectUtil';

export const LegacyTypedSignatureRequest: FC = () => {
  // Get request and wallet data from store
  const requestEvent = ModalStore.state.data?.legacyCallRequestEvent;
  const requestSession = ModalStore.state.data?.legacyRequestSession;

  // Ensure request and wallet are defined
  if (!requestEvent || !requestSession) {
    return <p>Missing request data</p>;
  }

  // Get required request data
  const { id, method, params } = requestEvent;

  console.log(requestEvent);

  // // Remove unneeded key coming from v1 sample dapp that throws Ethers.
  // if (transaction[`gas`]) delete transaction[`gas`];

  const data = getSignTypedDataParamsData(params);

  const address = getSignTypedDataAddress(params);

  // Handle approve action (logic varies based on request method)
  async function onApprove() {
    if (requestEvent) {
      const { result } = await approveEIP155Request({
        id,
        topic: ``,
        params: {
          request: { method, params },
          chainId: String(requestSession?.chainId),
        },
      });

      legacySignClient.approveRequest({
        id,
        result,
      });
      ModalStore.close();
    }
  }

  // Handle reject action
  async function onReject() {
    if (requestEvent) {
      const { error } = rejectEIP155Request({
        id,
        topic: ``,
        params: {
          request: { method, params },
          chainId: String(requestSession?.chainId),
        },
      });
      legacySignClient.rejectRequest({
        id,
        error,
      });
      ModalStore.close();
    }
  }

  console.log(requestSession?.peerMeta?.name);

  return (
    <TypedSignatureRequestSheet
      address={address}
      icon={
        !!requestSession?.peerMeta?.icons
          ? requestSession?.peerMeta?.icons[0]
          : AssetsImg.i_collectionDefault.src
      }
      message={JSON.stringify(data)}
      name={requestSession?.peerMeta?.name || ``}
      onApprove={onApprove}
      url={requestSession?.peerMeta?.url || ``}
    />
  );
};

const TypedSignatureRequest: FC<any> = forwardRef((props, ref) => {
  const requestEvent = ModalStore.state.data?.requestEvent;
  const requestSession = ModalStore.state.data?.requestSession;
  useImperativeHandle(ref, () => ({ onReject }));

  // Ensure request and wallet are defined
  if (!requestEvent || !requestSession) {
    return <p>Missing request data</p>;
  }

  // Get required request data
  const { topic, params } = requestEvent;
  const { request, chainId } = params;

  // Get data
  const data = getSignTypedDataParamsData(request.params);
  const address = getSignTypedDataAddress(request.params);

  // Handle approve action (logic varies based on request method)
  async function onApprove() {
    if (requestEvent) {
      const response = await approveEIP155Request(requestEvent);
      await signClient.respondSessionRequest({
        topic,
        response,
      });
      ModalStore.close();
    }
  }

  // Handle reject action
  async function onReject() {
    if (requestEvent) {
      const response = rejectEIP155Request(requestEvent);
      await signClient.respondSessionRequest({
        topic,
        response,
      });
      ModalStore.close();
    }
  }

  return (
    <TypedSignatureRequestSheet
      address={address}
      icon={
        !!requestSession?.peer?.metadata?.icons
          ? requestSession?.peer?.metadata?.icons[0]
          : AssetsImg.i_collectionDefault.src
      }
      message={JSON.stringify(data)}
      name={requestSession?.peer?.metadata?.name || ``}
      onApprove={onApprove}
      url={requestSession?.peer?.metadata?.url || ``}
    />
  );
});

TypedSignatureRequest.displayName = `TypedSignatureRequest`;

export { TypedSignatureRequest };
