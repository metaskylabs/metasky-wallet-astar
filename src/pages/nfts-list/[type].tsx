/** @jsxImportSource @emotion/react */
import * as styles from '@styles/Modules/nftsList';
import {
  CardNfts,
  FullScreenKiteLoader,
  FullScreenPopUp,
  Header,
  LottieLoader,
  SecondaryButton,
} from '@components/Shared';
import { utils } from '@styles/shared';
import { useRouter } from 'next/router';
import { getListings } from '@actions/marketPlaceNft';
import { TokensType } from '@typings/api/wallet';
import React, { useCallback, useEffect, useState } from 'react';
import { handleErrorMessage } from '@utils/handleResponseToast';
import { NftList } from '@typings/api/nftList';
import Authentication from '@components/Authentication';
import { motion } from 'framer-motion';
import { Pages } from '@utils/navigation';
import { getTokensList } from '@actions/ownedNft';
import { useSelector } from 'react-redux';
import { StoreState } from '@reducers';
import { State as OwnedState } from '@reducers/ownedNft';
import { State as MarketPlaceState } from '@reducers/marketplaceListing';
import { useTranslate } from '@utils/useTranslate';
import { NavTabs } from '@components/Shared/BottomNav/constants';
import BottomNav from '@components/Shared/BottomNav';
import { useAnalytics } from '@utils/useAnalytics';
import { CLICK, EVENT_PAGE } from '@constants/analytics';
import { NFTFilter } from '@components/NFTListingFlow/NFTFilter';
import { useUserSession } from '@utils/hooks/useUserSession';

const NftsList = () => {
  const router = useRouter();
  const { query } = router;
  const ownedNft = useSelector<StoreState, OwnedState>(
    (state) => state.ownedNft,
  );
  const marketPlaceNft = useSelector<StoreState, MarketPlaceState>(
    (state) => state.marketPlaceNft,
  );
  const { translate } = useTranslate();
  // List of NFT tokens
  const [tokensList, setTokensList] = useState<NftList[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [marketplaceListing, setMarketplaceListing] = useState<boolean>(false);
  const session = useUserSession();
  const [isNewListLoading, setIsNewListLoading] = useState<boolean>(false);
  const { trackClick, trackPage } = useAnalytics();
  const [filtersApplied, setFiltersApplied] = useState(false);
  const [uniqueCollections, setUniqueCollections] = useState<
    { id: string; name: string }[]
  >([]);

  useEffect(() => {
    trackPage(EVENT_PAGE.MY_NFTS);
  }, []);

  // if page URL query is '/listings' fetch all NFT's that are available to buy
  const fetchListings = useCallback(
    async (
      pageNumber?: number,
      sort?: { key: string; value: 'ASC' | 'DESC' }[],
      filter?: string,
    ) => {
      try {
        setIsNewListLoading(true);
        setIsLoading(true);
        await getListings(
          pageNumber || marketPlaceNft.pageNumber + 1,
          sort || marketPlaceNft.sort,
          filter,
        );
        setIsNewListLoading(false);
        setIsLoading(false);
      } catch (err) {
        handleErrorMessage(err);
        setIsLoading(false);
        router.push(Pages.PAGE_NOT_FOUND);
      }
    },
    [marketPlaceNft.pageNumber, marketPlaceNft.sort, router],
  );

  // if page URL query is '/own' fetch all NFT's that user owns
  const fetchNfts = useCallback(
    async (
      sort_by?: string,
      collection_names?: string[],
      on_sale?: boolean,
    ) => {
      if (!session.isLoggedIn) {
        setIsLoggedIn(true);
        return;
      }
      const url = `/wallet/tokens/${TokensType.NFTS}/`;
      const query: string[] = [];
      if (sort_by) {
        query.push(`sort_by=${sort_by}`);
      }
      if (on_sale) {
        query.push(`on_sale=${on_sale}`);
      }
      if (collection_names && collection_names.length > 0) {
        const concatenated_names: string[] = [];
        collection_names.forEach((name) =>
          concatenated_names.push(`"${name}"`),
        );
        query.push(`collection=[${concatenated_names.join(`, `)}]`);
      }

      try {
        setIsLoading(true);
        await getTokensList(url, `?${query.join(`&`)}`);
        setIsLoading(false);
      } catch (err) {
        handleErrorMessage(err);
        setIsLoading(false);
        router.push(Pages.PAGE_NOT_FOUND);
      }
    },
    [router, session.isLoggedIn],
  );

  // This page works for 2 types/cases
  // Type 1: Listing all NFT tokens available to purchase
  // Type 2: Listing all NFT tokens that user already owns
  useEffect(() => {
    if (router.isReady) {
      if (query.type === `listings`) {
        fetchListings();
      } else if (query.type === `own`) {
        fetchNfts();
      } else {
        router.push(Pages.PAGE_NOT_FOUND);
      }
    }
  }, [query.type, router, fetchListings, fetchNfts]);

  // useEffect that puts data in the local states
  // after we fetch it and store the results in redux in prev useEffect
  useEffect(() => {
    if (query.type == `listings`) {
      setTokensList(marketPlaceNft.list.listing);
      setMarketplaceListing(true);
    } else {
      setTokensList(ownedNft.list);
      if (!filtersApplied) {
        // calculate and store name and ids of all unique collections
        setUniqueCollections(() => {
          const uniqueCollectionsSet = new Set<string>();
          const uniqueCollections: { id: string; name: string }[] = [];
          ownedNft.list.forEach((token) => {
            if (token.collection_new !== null) {
              const { id, name } = token.collection_new;
              if (!uniqueCollectionsSet.has(id)) {
                uniqueCollections.push({
                  id: id,
                  name: name,
                });
                uniqueCollectionsSet.add(id);
              }
            }
          });
          return uniqueCollections;
        });
        setFiltersApplied((prev) => (ownedNft.list.length > 0 ? true : prev));
      }
    }
  }, [ownedNft.list, marketPlaceNft.list.listing, query.type, filtersApplied]);

  //function that handles click on a particular NFT
  // redirects to NFT details page based on current page Type/case
  const handleRoute = (data: NftList) => {
    if (router.query.type == `listings`) {
      router.push(`${Pages.PURCHASE_NFT}/${data.listing_uuid}`);
    } else if (router.query.type == `own`) {
      router.push(
        `${Pages.NFT_DETAILS}/${data.id}?referrer_order_uuid=${
          data.order_uuid || ``
        }`,
      );
    }
  };

  return (
    <BottomNav currentTab={NavTabs.WALLET}>
      <div>
        <FullScreenPopUp isOpen={isLoggedIn}>
          <Authentication
            setLoginStatus={(status) => setIsLoggedIn(status)}
            isPopUp={true}
          />
        </FullScreenPopUp>
        <FullScreenKiteLoader isOpen={isLoading}>
          <div css={styles.loaderContentInfo}>
            {translate(`PAGE_LOADING`)}...
          </div>
        </FullScreenKiteLoader>
        <Header
          isBackEnabled
          sort={query.type === `listings` && true}
          title={translate(`MY_NFTs`)}
          fetchListings={(page, sortData) =>
            fetchListings(page, [{ key: sortData.key, value: sortData.value }])
          }
        />
        {/* sort and filter options only for '/own' NFT page*/}
        {!marketplaceListing && (
          <NFTFilter
            fetchNfts={fetchNfts}
            uniqueCollections={uniqueCollections}
          />
        )}
        {tokensList.length === 0 && (
          <p css={[utils.ml(24), utils.mr(24), utils.mt(24)]}>
            {translate(`NO_NFTs_FOUND`)}
          </p>
        )}
        <div css={[styles.nftContainer, utils.mt(24)]}>
          {tokensList?.map((token, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: i * 0.1,
                default: { duration: 0.3 },
                ease: `easeOut`,
              }}
              css={styles.nftCardContainer}
            >
              <CardNfts
                key={i}
                keys={i}
                addStyles={styles.nftCard}
                imageStyles={styles.nftCardImage}
                image={token.image} //{AssetsImg.i_default}
                mediaType={token.media_type}
                content={token.name}
                onClick={() => {
                  trackClick(CLICK.NFT_CARD_MY_NFTS, {
                    nft_uuid: token.id,
                  });
                  handleRoute(token);
                }}
                ribbon={
                  token.sale_details !== undefined || token.status === `PENDING`
                }
                ribbonText={
                  token.status === `PENDING`
                    ? translate(`RECEIVING`)
                    : token?.sale_details?.tag
                }
                marketplace={marketplaceListing}
                price={token.price}
                rarity={token.rarityRank}
                name={token.name}
                collectionDetails={token.collection_new}
              />
            </motion.div>
          ))}
        </div>
        {isNewListLoading ? (
          <LottieLoader />
        ) : (
          marketPlaceNft.isLoadMoreEnabled &&
          marketplaceListing && (
            <div css={styles.loadMoreContainer}>
              <SecondaryButton
                addStyles={styles.loadMoreButton}
                onClick={() => fetchListings()}
              >
                {translate(`LOAD_MORE`)}
              </SecondaryButton>
            </div>
          )
        )}
      </div>
    </BottomNav>
  );
};

export default NftsList;
