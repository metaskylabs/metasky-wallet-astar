import React, { FC, forwardRef, useImperativeHandle, useState } from 'react';
import * as styles from './styles';
import AssetsImg from '@public/images';
import ButtonLayout from '@components/HOC/ButtonLayout.tsx';
import { PrimaryButton } from '@components/Shared';
import ModalStore from '@components/WalletConnect/store/ModalStore';
import { legacySignClient } from '@components/WalletConnect/utils/LegacyWalletConnectUtil';
import {
  approveEIP155Request,
  rejectEIP155Request,
} from '@components/WalletConnect/utils/EIPRequestHandler';
import { ChainIDToName } from '@actions/blockchain';
import generateToast from '@components/Shared/GenerateToast';
import Kite from '@components/Shared/Kite';
import { ToastType } from '@components/Shared/Toast';
import { AxiosError } from 'axios';
import BlockchainRequestSheet from './BlockchainRequestSheet';
import { formatJsonRpcError, formatJsonRpcResult } from '@json-rpc-tools/utils';
import { signClient } from '../utils/WalletConnectUtil';

const LegacyBlockchainRequest: FC<any> = forwardRef((props, ref) => {
  const [loading, setLoading] = useState(false);

  // Get request and wallet data from store
  const requestEvent = ModalStore.state.data?.legacyCallRequestEvent;
  const requestSession = ModalStore.state.data?.legacyRequestSession;

  useImperativeHandle(ref, () => ({ onReject }));

  // Ensure request and wallet are defined
  if (!requestEvent || !requestSession) {
    return <p>Missing request data</p>;
  }

  // Get required proposal data

  const { id, method, params } = requestEvent;
  const transaction = params[0];

  // // Remove unneeded key coming from v1 sample dapp that throws Ethers.
  // if (transaction[`gas`]) delete transaction[`gas`];

  async function onApprove() {
    try {
      if (requestEvent) {
        setLoading(true);
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
        setLoading(false);
        ModalStore.close();
      }
    } catch (err) {
      const axiosError = err as AxiosError;
      if (axiosError.response?.data.errorMessage) {
        onReject();
        generateToast({
          type: ToastType.ERROR,
          content: axiosError.response?.data.errorMessage,
        });
        ModalStore.close();
      }
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div css={styles.loaderContainer}>
        <Kite />
        Transaction in progress...
      </div>
    );
  }

  // Handle reject action
  async function onReject(errorMessage?: string) {
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
        error: errorMessage
          ? formatJsonRpcError(id, errorMessage).error
          : error,
      });
      ModalStore.close();
    }
  }

  return (
    <BlockchainRequestSheet
      chainIcon={
        requestSession.chainId === 137
          ? AssetsImg.ic_polygon.src
          : AssetsImg.ic_ethereum.src
      }
      chainName={ChainIDToName[requestSession.chainId]}
      data={transaction?.data}
      from={transaction?.from}
      onApprove={onApprove}
      to={transaction?.to}
      value={transaction?.value}
    />
  );
});

LegacyBlockchainRequest.displayName = `LegacyBlockchainRequest`;

const BlockchainRequest: FC<any> = forwardRef((props, ref) => {
  const requestEvent = ModalStore.state.data?.requestEvent;
  const requestSession = ModalStore.state.data?.requestSession;

  useImperativeHandle(ref, () => ({ onReject }));

  // Ensure request and wallet are defined
  if (!requestEvent || !requestSession) {
    return <p>Missing request data</p>;
  }

  // Get required proposal data

  const { topic, params } = requestEvent;
  const { request, chainId } = params;
  const transaction = request.params[0];

  // Handle approve action
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
    <BlockchainRequestSheet
      chainIcon={
        Number(chainId) === 137
          ? AssetsImg.ic_polygon.src
          : AssetsImg.ic_ethereum.src
      }
      chainName={ChainIDToName[Number(chainId)]}
      data={transaction?.data}
      from={transaction?.from}
      onApprove={onApprove}
      to={transaction?.to}
      value={transaction?.value}
    />
  );
});

BlockchainRequest.displayName = `BlockchainRequest`;

export { BlockchainRequest, LegacyBlockchainRequest };
