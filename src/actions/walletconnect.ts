import { MetaskyAPIWrap } from '@typings/api/wrapper';
import { ApiV1 } from '@actions/Axios';
import {
  SendTxResponse,
  SignAndSendTxPayload,
  SignMessagePayload,
  SignMessageResponse,
} from '@typings/api/walletconnect';

export const signWalletConnectMesssage = async (
  payload: SignMessagePayload,
): Promise<MetaskyAPIWrap<SignMessageResponse>> => {
  const response = await ApiV1.post(`/walletconnect/sign-message`, payload);

  return response.data;
};

export const signAndSendTransaction = async (
  payload: SignAndSendTxPayload,
): Promise<MetaskyAPIWrap<SendTxResponse>> => {
  const response = await ApiV1.post(`/walletconnect/send-transaction`, payload);

  return response.data;
};

export const signTypedData = async (
  payload: SignMessagePayload,
): Promise<MetaskyAPIWrap<SignMessageResponse>> => {
  const response = await ApiV1.post(
    `/walletconnect/sign-typed-message`,
    payload,
  );

  return response.data;
};
