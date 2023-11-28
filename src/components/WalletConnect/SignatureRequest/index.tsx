import React, { FC, forwardRef, useImperativeHandle } from 'react';
import ModalStore from '@components/WalletConnect/store/ModalStore';
import { legacySignClient } from '@components/WalletConnect/utils/LegacyWalletConnectUtil';
import {
  getSignParamsMessage,
  getSignTypedDataAddress,
} from '@components/WalletConnect/utils/HelperUtil';
import {
  approveEIP155Request,
  rejectEIP155Request,
} from '@components/WalletConnect/utils/EIPRequestHandler';
import SignatureRequestSheet from './SignatureRequestSheet';
import { signClient } from '../utils/WalletConnectUtil';

export const LegacySignatureRequest: FC = () => {
  const requestEvent = ModalStore.state.data?.legacyCallRequestEvent;
  const requestSession = ModalStore.state.data?.legacyRequestSession;

  // Ensure request and wallet are defined
  if (!requestEvent || !requestSession) {
    return <p>Missing request data</p>;
  }

  // Get required request data
  const { id, method, params } = requestEvent;

  // Get message, convert it to UTF8 string if it is valid hex
  const message = getSignParamsMessage(params);

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

  return (
    <SignatureRequestSheet
      onApprove={onApprove}
      address={address}
      message={message}
      name={requestSession?.peerMeta?.name || ``}
      url={requestSession?.peerMeta?.url || ``}
    />
  );
};

const SignatureRequest: FC<any> = forwardRef((props, ref) => {
  // Get request and wallet data from store
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

  // Get message, convert it to UTF8 string if it is valid hex
  const message = getSignParamsMessage(request.params);
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
    <SignatureRequestSheet
      onApprove={onApprove}
      address={address}
      message={message}
      name={requestSession?.peer?.metadata?.name || ``}
      url={requestSession?.peer?.metadata?.url || ``}
    />
  );
});

SignatureRequest.displayName = `SignatureRequest`;

export { SignatureRequest };
