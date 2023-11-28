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
import { getCollectionNftListing } from '@actions/collectionNftList';
import { useRouter } from 'next/router';
import { CollectionNftList } from '@typings/api/collectionNftList';
import { State as collectionNftList } from '@reducers/collectionNftList';
import { handleErrorMessage } from '@utils/handleResponseToast';
import { StatusType } from '@typings/api/shared';
import EmptyCollection from '@components/CollectionDetails/EmptyCollecton';
import { click } from '@constants/analytics';
import { trackClick } from '@utils/analytics';
import { useTranslate } from '@utils/useTranslate';

const CollectionList: FC = () => {
  const { translate } = useTranslate();

  const router = useRouter();
  const collectionNftListState = useSelector<StoreState, collectionNftList>(
    (state) => state.collectionNftList,
  );
  const [collectionStatus, setCollectionStatus] = useState<{
    status: StatusType;
  }>();
  const [tokenList, setTokensList] = useState<CollectionNftList[]>([]);
  const [isNewListLoading, setIsNewListLoading] = useState<boolean>(false);

  async function fetchListings(
    pageNumber?: number,
    sort?: { key: string; value: 'ASC' | 'DESC' }[],
  ) {
    try {
      setIsNewListLoading(true);
      await getCollectionNftListing(
        router.query.id as string,
        10,
        pageNumber || collectionNftListState.pageNumber + 1,
        sort || collectionNftListState.sort,
        router.query.onSale ? (router.query.onSale as string) : ``,
      );
      setCollectionStatus({ status: StatusType.SUCCESS });
      setIsNewListLoading(false);
    } catch (err) {
      handleErrorMessage(err);
      setCollectionStatus({ status: StatusType.ERROR });
      router.push(`/404`);
    }
  }

  async function getNFTListing(onSale: string) {
    try {
      trackClick(click.collection, {
        collection_nft_id: router.query.id,
      });
      setCollectionStatus({ status: StatusType.LOADING });
      await getCollectionNftListing(
        router.query.id as string,
        10,
        1,
        [],
        onSale,
      );
      setCollectionStatus({ status: StatusType.SUCCESS });
    } catch (err) {
      handleErrorMessage(err);
      setCollectionStatus({ status: StatusType.ERROR });
      router.push(`/404`);
    }
  }

  useEffect(() => {
    if (router.query && router.isReady && router.query.id !== undefined) {
      getNFTListing(router.query.onSale ? (router.query.onSale as string) : ``);
    }
  }, [router.isReady, router.query]);

  useEffect(() => {
    setTokensList(collectionNftListState.list.listing);
  }, [collectionNftListState.list.listing]);

  useEffect(() => {
    if (router.isReady) {
      if (
        collectionNftListState.list.listing.length === 0 &&
        router.query.id !== undefined
      ) {
        getNFTListing(``);
      }
    }
  }, [collectionNftListState.list.listing, router.isReady]);

  const handleRoute = (data: CollectionNftList) => {
    if (data.on_sale) {
      router.push(`/purchase-nft/${data.sale_details?.listing_uuid}`);
    } else {
      router.push(
        {
          pathname: `/nft-details/${data.id}`,
          query: {
            data: JSON.stringify(data),
          },
        },
        `/nft-details/${data.id}`,
      );
    }
  };

  const handleCollectionDetailsRoute = (collection_id: string) => {
    trackClick(click.collection, {
      collection_details: collection_id,
    });
    router.push(`/collection/details/${collection_id}`);
  };

  if (collectionStatus?.status === StatusType.LOADING) {
    return (
      <FullScreenKiteLoader
        isOpen={collectionStatus?.status === StatusType.LOADING}
      >
        <div css={styles.loaderContentInfo}>{translate(`PAGE_LOADING`)}...</div>
      </FullScreenKiteLoader>
    );
  } else if (
    collectionStatus?.status === StatusType.SUCCESS &&
    tokenList.length > 0
  ) {
    return (
      <div>
        <Header
          title={translate(`COLLECTION`)}
          isBackEnabled={true}
          // sort={true}
          fetchListings={(page, sortData) =>
            fetchListings(page, [{ key: sortData.key, value: sortData.value }])
          }
        />
        <BannerLeftImageWithCta
          title={collectionNftListState.name && collectionNftListState.name}
          image={
            collectionNftListState.media_type == `image`
              ? collectionNftListState.image
              : AssetsImg.i_collectionDefault.src
          }
          ctaText={translate(`VIEW_MORE_DETAILS`)}
          onCtaClick={() =>
            handleCollectionDetailsRoute(collectionNftListState.id)
          }
        />
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
              />
            </div>
          ))}
        </section>
        {isNewListLoading ? (
          <LottieLoader />
        ) : (
          collectionNftListState.isLoadMoreEnabled &&
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
      </div>
    );
  } else if (
    collectionStatus?.status === StatusType.SUCCESS &&
    tokenList.length === 0
  ) {
    return (
      <div>
        <Header
          title={translate(`COLLECTION`)}
          isBackEnabled={true}
          sort={true}
          fetchListings={(page, sortData) =>
            fetchListings(page, [{ key: sortData.key, value: sortData.value }])
          }
        />
        <BannerLeftImageWithCta
          title={collectionNftListState.name && collectionNftListState.name}
          image={AssetsImg.i_collectionDefault.src}
          ctaText={translate(`VIEW_MORE_DETAILS`)}
          onCtaClick={() =>
            handleCollectionDetailsRoute(collectionNftListState.id)
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
      </div>
    );
  } else {
    return null;
  }
};

export default CollectionList;
