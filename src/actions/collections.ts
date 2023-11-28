import { Dispatch } from '@utils/redux/dispatch';
import createActions from '@utils/redux/createActions';
import { ApiV1 } from './Axios';
import { ActionType } from '@reducers/collections';
import { CollectionSummary } from '@typings/api/collection';

export const getCollectionList = async (filter?: string) => {
  return createActions(
    `collectionListStatus`,
    async (dispatch: Dispatch) => {
      let url = `/wallet/new/collections`;
      if (filter) {
        url += `?filters=${filter}`;
      }
      const response = await ApiV1.get(url);
      dispatch({
        type: ActionType.SET_COLLECTION_LIST,
        payload: response.data.data.collections,
      });
    },
    (_err) => {
      throw _err;
    },
  );
};

export const fetchCollectionDetails = async (
  tokenUUID: string,
): Promise<CollectionSummary> => {
  const response: any = await ApiV1.get(
    `/club/contract/token?token_uuid=${tokenUUID}`,
  );

  const { data }: { data: any } = response.data;

  if (data) {
    const collection: CollectionSummary = {
      image: data.logo,
      name: data.name,
      description: data.additional_data.description,
      tokenUUID: data.token_uuid,
      onChainAddress: data.onchain_address,
      chain: data.chain,
      chainId: data.chainId,
      symbol: data.additional_data.symbol,
      instagramLink: getSocialLink(
        data.additional_data.social_links,
        `instagram`,
      ),
      facebookLink: getSocialLink(
        data.additional_data.social_links,
        `facebook`,
      ),
      discordLink: getSocialLink(data.additional_data.social_links, `discord`),
      twitterLink: getSocialLink(data.additional_data.social_links, `twitter`),
      category: data.additional_data.category,
      tags: data.additional_data.tags || [],
      isFree: data.is_free_nft,
      markeplaceId: data.markeplaceId,
      listingId: data.listing_id,
      price: data.price,
      claimLimit: data.additional_data.claim_limit,
    };
    return collection;
  }
  return response;
};

const getSocialLink = (data: any[], platform: string) => {
  const item = data.find((d) => d.platform === platform);
  return item ? item.url : ``;
};

export interface ClaimCollectionNFTResponse {
  nftUUID: string;
  error: string;
}

export const claimContractNFT = async (
  tokenUUID: string,
  walletUUID: string,
): Promise<ClaimCollectionNFTResponse> => {
  try {
    const response: any = await ApiV1.post(`/club/contract/claim`, {
      token_uuid: tokenUUID,
      wallet_uuid: walletUUID,
    });

    const { data }: { data: any } = response.data;

    if (data.nft_uuid) {
      return { nftUUID: data.nft_uuid, error: `` };
    }
    return { nftUUID: ``, error: `` };
  } catch (error: any) {
    return { nftUUID: ``, error: `Sorry! ${error.response.data.errorMessage}` };
  }
};

export const fetchCollectionTemplateDetails = async (templateID: string) => {
  const response: any = await ApiV1.get(
    `/club/contract/template_grouped_listings/${templateID}`,
  );

  const { data }: { data: any } = response.data;

  return data;
};
