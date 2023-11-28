import { FC, useEffect, useState } from 'react';
import {
  BannerLeftImageWithCta,
  CardNfts,
  FullScreenKiteLoader,
  Header,
  LottieLoader,
  SecondaryButton,
} from '@components/Shared';
import { useSelector } from 'react-redux';
import { StoreState } from '@reducers';
import { utils } from '@styles/shared';
import AssetsImg from '@public/images';
import * as styles from '@styles/Modules/collectionNftList';
import { getMarketPlaceNftListing } from '@actions/marketPlaceNftList';
import { useRouter } from 'next/router';
import { MarketPlaceNftList } from '@typings/api/marketPlaceNftList';
import { State as marketPlaceNftList } from '@reducers/marketPlaceNftList';
import { handleErrorMessage } from '@utils/handleResponseToast';
import { StatusType } from '@typings/api/shared';
import EmptyCollection from '@components/CollectionDetails/EmptyCollecton';
import { Pages } from '@utils/navigation';
import { CLICK, EVENT_PAGE } from '@constants/analytics';
import { useTranslate } from '@utils/useTranslate';
import { getCurrencySymbol } from '@constants/currency';
import { NavTabs } from '@components/Shared/BottomNav/constants';
import BottomNav from '@components/Shared/BottomNav';
import HeaderWithButtonLayout from '@components/Shared/HeaderWithButtonLayout';
import { useAnalytics } from '@utils/useAnalytics';
import { route } from 'next/dist/server/router';
import { collection } from '@components/Detail/CollectionInfo/styles';

interface Filter {
  collectionID: string[];
}

const CollectionList: FC = () => {
  const router = useRouter();
  const [filter, setFilter] = useState<string>(``);
  const marketPlaceNftListState = useSelector<StoreState, marketPlaceNftList>(
    (state) => state.marketPlaceNftList,
  );
  const [collectionStatus, setCollectionStatus] = useState<{
    status: StatusType;
  }>({ status: StatusType.LOADING });
  const [tokenList, setTokensList] = useState<MarketPlaceNftList[]>([]);
  const [isNewListLoading, setIsNewListLoading] = useState<boolean>(false);
  const { translate } = useTranslate();
  const { trackPage, trackClick } = useAnalytics();

  async function fetchListings(
    pageNumber?: number,
    sort?: { key: string; value: 'ASC' | 'DESC' }[],
  ) {
    try {
      setIsNewListLoading(true);
      await getMarketPlaceNftListing(
        pageNumber || marketPlaceNftListState.pageNumber + 1,
        sort || marketPlaceNftListState.sort,
        router.query.filters as string,
      );
      setCollectionStatus({ status: StatusType.SUCCESS });
      setIsNewListLoading(false);
    } catch (err) {
      handleErrorMessage(err);
      setCollectionStatus({ status: StatusType.ERROR });
      router.push(Pages.PAGE_NOT_FOUND);
    }
  }

  async function getNFTListing(
    pageNumber?: number,
    sort?: { key: string; value: 'ASC' | 'DESC' }[],
    filter?: string,
  ) {
    try {
      setCollectionStatus({ status: StatusType.LOADING });
      await getMarketPlaceNftListing(
        pageNumber || marketPlaceNftListState.pageNumber + 1,
        sort || marketPlaceNftListState.sort,
        filter,
      );
      setCollectionStatus({ status: StatusType.SUCCESS });
    } catch (err) {
      handleErrorMessage(err);
      setCollectionStatus({ status: StatusType.ERROR });
    }
  }

  useEffect(() => {
    if (router.query.filters !== undefined) {
      getNFTListing(1, [], router.query.filters as string);
      trackPage(EVENT_PAGE.MARKET_LISTINGS, {
        collection_ids: JSON.parse(router.query.filters as string)
          .collectionIds,
      });
    }
  }, [router.isReady, router.query]);

  useEffect(() => {
    setTokensList(marketPlaceNftListState.list.listing);
  }, [marketPlaceNftListState.list.listing]);

  // useEffect(() => {
  //   if (router.isReady) {
  //     if (
  //       marketPlaceNftListState.list.listing.length === 0 &&
  //       router.query.id !== undefined
  //     ) {
  //       getNFTListing(``,filter);
  //     }
  //   }
  // }, [marketPlaceNftListState.list.listing, router.isReady]);

  const handleRoute = (data: MarketPlaceNftList) => {
    trackClick(CLICK.NFT_CARD_MARKET_LISTINGS, {
      listing_uuid: data.sale_details?.listing_uuid,
      nft_uuid: data.nft_uuid,
    });
    if (data.isOwner) {
      router.push(
        {
          pathname: `${Pages.NFT_DETAILS}/${data.nft_uuid}`,
          query: {
            data: JSON.stringify(data),
          },
        },
        `${Pages.NFT_DETAILS}/${data.nft_uuid}`,
      );
    } else {
      router.push(`${Pages.PURCHASE_NFT}/${data.sale_details?.listing_uuid}`);
    }
  };

  const handleCollectionDetailsRoute = (collection_id: string) => {
    router.push(`${Pages.COLLECTION_DETAILS}/${collection_id}`);
  };

  if (collectionStatus?.status === StatusType.LOADING) {
    return (
      <FullScreenKiteLoader
        isOpen={collectionStatus?.status === StatusType.LOADING}
      >
        <div css={styles.loaderContentInfo}>
          Page is Loading. Please wait...
        </div>
      </FullScreenKiteLoader>
    );
  } else if (
    collectionStatus?.status === StatusType.SUCCESS &&
    tokenList.length > 0
  ) {
    return (
      <BottomNav currentTab={NavTabs.WALLET}>
        <Header
          title={translate(`MARKET`)}
          isBackEnabled={true}
          sort={true}
          fetchListings={(page, sortData) =>
            fetchListings(page, [{ key: sortData.key, value: sortData.value }])
          }
        />
        {marketPlaceNftListState.collections.length < 2 && (
          <BannerLeftImageWithCta
            title={
              marketPlaceNftListState.collections[0].name &&
              marketPlaceNftListState.collections[0].name
            }
            image={
              marketPlaceNftListState.collections[0].media_type == `image`
                ? marketPlaceNftListState.collections[0].image
                : AssetsImg.i_collectionDefault.src
            }
            ctaText={translate(`VIEW_MORE_DETAILS`)}
            onCtaClick={() => {
              trackClick(CLICK.VIEW_MORE_DETAILS, {
                collection_id: marketPlaceNftListState.collections[0].id,
              });
              handleCollectionDetailsRoute(
                marketPlaceNftListState.collections[0].id,
              );
            }}
          />
        )}
        <section css={[styles.nftContainer, utils.mt(24)]}>
          {tokenList.map((nft, i) => (
            <div key={nft.id} css={styles.nftCardContainer}>
              <CardNfts
                key={nft.id}
                keys={i}
                addStyles={styles.nftCard}
                imageStyles={styles.nftCardImage}
                image={nft.image}
                mediaType={nft.media_type}
                content={nft.name}
                onClick={() => handleRoute(nft)}
                marketplace={true}
                price={nft.sale_details?.price}
                rarity={nft.rarityRank}
                name={nft.name}
                ctaText={`>`}
                ribbon={nft.on_sale}
                ribbonText={translate(`ON_SALE`)}
                currencySymbol={getCurrencySymbol(nft.sale_details?.currency)}
              />
            </div>
          ))}
        </section>
        {isNewListLoading ? (
          <LottieLoader />
        ) : (
          marketPlaceNftListState.isLoadMoreEnabled &&
          tokenList && (
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
      </BottomNav>
    );
  } else if (
    collectionStatus?.status === StatusType.SUCCESS &&
    tokenList.length === 0
  ) {
    return (
      <BottomNav currentTab={NavTabs.WALLET}>
        <Header
          title={translate(`COLLECTION`)}
          isBackEnabled={true}
          sort={true}
          fetchListings={(page, sortData) =>
            fetchListings(page, [{ key: sortData.key, value: sortData.value }])
          }
        />
        <BannerLeftImageWithCta
          title={
            marketPlaceNftListState.collections[0]?.name &&
            marketPlaceNftListState.collections[0].name
          }
          image={AssetsImg.i_collectionDefault.src}
          ctaText={translate(`VIEW_MORE_DETAILS`)}
          onCtaClick={() =>
            handleCollectionDetailsRoute(
              marketPlaceNftListState.collections[0].id,
            )
          }
        />
        <section
          css={[
            styles.emptyCollectionContainer,
            utils.mt(24),
            utils.heightPercent(70),
          ]}
        >
          <EmptyCollection
            title={translate(`NO_NFT_AVAILABLE`)}
            description={translate(`FILTER_NOT_FOUND`)}
          />
        </section>
      </BottomNav>
    );
  } else {
    return (
      <BottomNav currentTab={NavTabs.WALLET}>
        <HeaderWithButtonLayout
          onBack={router.back}
          title={translate(`MARKET`)}
          secondaryBack
        >
          <section
            css={[
              styles.emptyCollectionContainer,
              utils.mt(24),
              utils.heightPercent(70),
            ]}
          >
            <EmptyCollection
              title={translate(`NO_NFT_AVAILABLE`)}
              description={translate(`FILTER_NOT_FOUND`)}
            />
          </section>
        </HeaderWithButtonLayout>
      </BottomNav>
    );
  }
};

export default CollectionList;
