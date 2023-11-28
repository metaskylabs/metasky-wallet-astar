import {
  consumeConsumableNFTPayload,
  getConsumableNFTPayload,
} from '@typings/api/consumableNFT';
import { MetaskyAPIWrap } from '@typings/api/wrapper';
import { ApiV1 } from './Axios';

export const getConsumableNFTdata = async (
  payload: getConsumableNFTPayload,
): Promise<MetaskyAPIWrap<any>> => {
  const response = await ApiV1.post(
    `/wallet/consumables/getConsumableNfts`,
    payload,
  );

  return response.data;
};

export const consumeNFT = async (
  payload: consumeConsumableNFTPayload,
): Promise<MetaskyAPIWrap<any>> => {
  const response = await ApiV1.post(
    `/wallet/consumables/consumeConsumableNft`,
    payload,
  );

  return response.data;
};
