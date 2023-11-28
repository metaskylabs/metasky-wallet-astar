import { MetaskyAPIWrap } from '@typings/api/wrapper';
import { ApiV1 } from '@actions/Axios';
import {
  BuyCoinPayload,
  BuyCoinResponse,
  MakeTransferPayload,
  MakeTransferRespone,
  PreviewTransferPayload,
  PreviewTransferResponse,
  WalletBalanceResponse,
} from '@typings/api/transfer';

export const makeTransfer = async (
  payload: MakeTransferPayload,
): Promise<MetaskyAPIWrap<MakeTransferRespone>> => {
  const response = await ApiV1.post(`/wallet/transfer-asset`, payload);
  return response.data;
};

export const previewTransfer = async (
  payload: PreviewTransferPayload,
): Promise<MetaskyAPIWrap<PreviewTransferResponse>> => {
  const response = await ApiV1.get(
    `/wallet/preview-transfer?nft_uuid=${payload.nft_uuid}&token_uuid=${payload.token_uuid}&quantity=${payload.quantity}&to_address=${payload.to_address}`,
  );
  return response.data;
};

export const getWalletBalance = async (): Promise<
  MetaskyAPIWrap<WalletBalanceResponse[]>
> => {
  const response = await ApiV1.get(`/wallet/balance/nfts`);
  return response.data;
};

export const buyCoin = async (
  payload: BuyCoinPayload,
): Promise<MetaskyAPIWrap<BuyCoinResponse>> => {
  const response = await ApiV1.post(`/marketplace/buy-coin`, payload);
  return response.data;
};
