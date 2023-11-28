import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { cloneDeep, isUndefined } from 'lodash';
import { CollectionSummary } from '@typings/api/collection';
import {
  ClaimCollectionNFTResponse,
  claimContractNFT,
  fetchCollectionDetails,
} from '@actions/collections';

export interface CollectionDetailsProvider {
  hookStateLoading: boolean | null;
  collection: CollectionSummary;
  claimAnNFT: (walletUUID: string) => Promise<ClaimCollectionNFTResponse>;
}

const initialCollectionDetails: CollectionSummary = {
  name: ``,
  image: ``,
  description: ``,
  tokenUUID: ``,
  onChainAddress: ``,
  chainId: ``,
  symbol: ``,
  instagramLink: ``,
  facebookLink: ``,
  discordLink: ``,
  twitterLink: ``,
  category: ``,
  tags: [],
  isFree: true,
  chain: ``,
  markeplaceId: ``,
  listingId: ``,
  price: 0,
  claimLimit: ``,
};

export default function useClaimCollectionDetails(tokenUUID: string) {
  const [hookStateLoading, setHookStateLoading] = useState<boolean | null>(
    true,
  );

  const [collection, setCollection] = useState<CollectionSummary>(
    cloneDeep(initialCollectionDetails),
  );

  const getCollectionDetails = useCallback(async () => {
    setHookStateLoading(true);
    try {
      if (!isUndefined(tokenUUID)) {
        const collection = await fetchCollectionDetails(tokenUUID);
        setCollection(collection);
        setHookStateLoading(false);
      }
    } catch (error) {
      setHookStateLoading(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokenUUID]);

  const claimAnNFT = async (
    walletUUID: string,
  ): Promise<ClaimCollectionNFTResponse> => {
    const res = await claimContractNFT(tokenUUID, walletUUID);
    return res;
  };

  useEffect(() => {
    getCollectionDetails();
  }, [getCollectionDetails]);

  const collectionDetailsProvider: CollectionDetailsProvider = {
    hookStateLoading,
    collection,
    claimAnNFT,
  };

  return collectionDetailsProvider;
}
