import { ApiV1 } from '@actions/Axios';
import {
  CollectionDetails,
  DoTransactionDetails,
  fetchAssetFile,
  GetLoginMethodsPayload,
  GetCampignConfigurationResponse,
  oneListingRequest,
  TokensListResponse,
  TransactionDetails,
  WalletBenefitsResponse,
  BalanceTokensResponse,
  GetListingsRespone,
  AccessBenefit,
  WalletAnnouncements,
} from '@typings/api/wallet';
import { MetaskyAPIWrap } from '@typings/api/wrapper';
import axios from 'axios';
import fileDownload from 'js-file-download';
import { getAccessToken } from '@utils/cookie';

export const getWalletBenefits = async (
  url: string,
): Promise<MetaskyAPIWrap<WalletBenefitsResponse[]>> => {
  const response = await ApiV1.get(url);

  return response.data;
};

export const getWalletBenefitsById = async (
  url: string,
  access: boolean,
): Promise<MetaskyAPIWrap<WalletBenefitsResponse>> => {
  const response = await ApiV1.get(`${url}?access=${access}`);

  return response.data;
};

export const getBenefitAccessInfo = async (
  benefitId: string,
  nftId?: string,
): Promise<MetaskyAPIWrap<AccessBenefit>> => {
  const response = await ApiV1.get(
    `/wallet/access-benefit/${benefitId}?nftId=${nftId || ``}`,
  );
  return response.data;
};

export const getTokenDetails = async (
  url: string,
): Promise<MetaskyAPIWrap<TokensListResponse>> => {
  const response = await ApiV1.get(url);

  return response.data;
};

export const getTransactions = async (
  pageNumber: number,
): Promise<MetaskyAPIWrap<TransactionDetails[]>> => {
  const response = await ApiV1.get(
    `/wallet/transactions?pageNumber=${pageNumber}&pageSize=10&allFields=false`,
  );

  return response.data;
};

export const getTransactionById = async (
  id: string,
): Promise<MetaskyAPIWrap<TransactionDetails>> => {
  const response = await ApiV1.get(`wallet/transactions/${id}`);

  return response.data;
};

export const makeTransaction = async (
  payload: DoTransactionDetails,
): Promise<MetaskyAPIWrap<TransactionDetails>> => {
  const response = await ApiV1.post(`wallet/transactions`, payload);

  return response.data;
};

export const getCollection = async (
  id: string,
): Promise<MetaskyAPIWrap<CollectionDetails>> => {
  const response = await ApiV1.get(`wallet/collection/${id}`);

  return response.data;
};

export const getOneListing = async (
  payload: oneListingRequest,
): Promise<MetaskyAPIWrap<GetListingsRespone>> => {
  const response = await ApiV1.get(
    `/marketplace/listing/${payload.listing_uuid}`,
  );

  return response.data;
};

export const getCampaignConfiguration = async (
  payload: GetLoginMethodsPayload,
): Promise<MetaskyAPIWrap<GetCampignConfigurationResponse>> => {
  const response = await ApiV1.get(
    `/configurations/campaign/${payload.clientId}`,
  );

  return response.data;
};

export const downloadBenefit = async (payload: fetchAssetFile) => {
  const response = await axios({
    url: payload.assetLink,
    method: `GET`,
    responseType: `arraybuffer`,
    headers: {
      AccessToken: getAccessToken() || ``,
    },
  });
  let extension = null;
  if (response.headers[`content-type`] === `audio/mpeg`) {
    extension = `.mp3`;
  }
  if (response.headers[`content-type`] === `application/zip`) {
    extension = `.zip`;
  }

  fileDownload(response.data, payload.assetName.replace(/ /g, `_`) + extension);
};

export const walletBalanceTokens = async (): Promise<
  MetaskyAPIWrap<BalanceTokensResponse[]>
> => {
  const response = await ApiV1.get(`wallet/balance/tokens`);

  return response.data;
};

export const getWalletAnnouncements = async (): Promise<
  WalletAnnouncements[]
> => {
  const response = await ApiV1.get(`/announcements/wallet`);
  return response.data.data.map((announcement: any) => ({
    backgroundColor: announcement.backgroundColor,
    ctaLink: announcement.ctaLink,
    ctaType: announcement.ctaType,
    description: announcement.description,
    image: announcement.image,
    title: announcement.title,
  }));
};
