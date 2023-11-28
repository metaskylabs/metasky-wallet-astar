import { getListings } from '@actions/marketPlaceNft';
import { CardNfts, DefaultCard, HeaderOne } from '@components/Shared';
import { handleErrorMessage } from '@utils/handleResponseToast';
import { Pages } from '@utils/navigation';
import { useRouter } from 'next/router';
import { FC, Fragment, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import * as styles from './styles';
import AssetsImg from '@public/images';
import { NftList } from '@typings/api/nftList';
import ShimmerCard from '@components/Shimmer/ShimmerCard';
import SwiperShimmer from '@components/Shimmer/SwiperShimmer';
import { motion } from 'framer-motion';
import SwiperCore, { Keyboard, Mousewheel } from 'swiper';
import { useSelector } from 'react-redux';
import { StatusState, StoreState } from '@reducers';
import { State as MarketPlaceState } from '@reducers/marketplaceListing';
import { FetchingState } from '@constants/redux';
import { useTranslate } from '@utils/useTranslate';
import { WalletType } from '@constants/wallet';
import { useUserSession } from '@utils/hooks/useUserSession';

SwiperCore.use([Keyboard, Mousewheel]);

const MarketplaceSwiper = () => {
  const { list } = useSelector<StoreState, MarketPlaceState>(
    (state) => state.marketPlaceNft,
  );
  const { marketplaceNftStatus } = useSelector<StoreState, StatusState>(
    (state) => state.status,
  );
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { translate } = useTranslate();
  const session = useUserSession();

  useEffect(() => {
    async function fetchListings() {
      try {
        await getListings(1, []);
      } catch (err) {
        handleErrorMessage(err);
      }
    }
    if (router.isReady) {
      fetchListings();
    }
  }, [router.isReady]);

  const handleMarketplaceRoute = (data: NftList) => {
    setIsLoading(true);
    router.push(
      {
        pathname: `${Pages.PURCHASE_NFT}/${data.listing_uuid}`,
        query: {
          data: JSON.stringify(data),
        },
      },
      `${Pages.PURCHASE_NFT}/${data.listing_uuid}`,
    );
  };

  return (
    <Fragment>
      {list?.listing?.length === 0 ? null : (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.5,
            default: { duration: 0.5 },
            ease: `easeIn`,
          }}
        >
          <div css={styles.nftCardWrapper}>
            <HeaderOne title="Buy NFTs">
              {list?.listing?.length > 0 && (
                <span
                  css={styles.seeAll}
                  onClick={() =>
                    router.push(
                      {
                        pathname: Pages.LISTINGS,
                        query: { list: JSON.stringify(list) },
                      },
                      `${Pages.LISTINGS}`,
                    )
                  }
                >
                  {translate(`SEE_ALL`)}
                </span>
              )}
            </HeaderOne>
          </div>
          {marketplaceNftStatus === FetchingState.PENDING && (
            <SwiperShimmer width={225} spaceBetween={20} repeat={3}>
              <div css={styles.shimmerContainer}>
                <ShimmerCard
                  isEffect={true}
                  height={200}
                  borderRadius={10}
                ></ShimmerCard>
                <ShimmerCard
                  isEffect={true}
                  height={40}
                  width={200}
                  borderRadius={50}
                ></ShimmerCard>
              </div>
            </SwiperShimmer>
          )}
          {list?.listing?.length > 0 && (
            <Fragment>
              <Swiper
                slidesPerView={`auto`}
                spaceBetween={20}
                keyboard={true}
                direction="horizontal"
                mousewheel={true}
                css={styles.swiperWrapper}
                cssMode={true}
              >
                {list?.listing?.map((data, index) => (
                  <SwiperSlide key={index} style={{ width: 225 }}>
                    <CardNfts
                      image={data.image}
                      addStyles={styles.nftListingCardHeight}
                      mediaType={data.media_type}
                      ribbon={false}
                      ctaText={data.action_text}
                      loading={isLoading}
                      content={data.name}
                      onClick={() => {
                        handleMarketplaceRoute(data);
                      }}
                      imageStyles={styles.cardNFTImage}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
              {/* TODO: This dependency should be removed */}
              {/* {isLoggedIn && <section css={styles.marketplaceMB}></section>} */}
            </Fragment>
          )}
          {list?.listing?.length === 0 &&
            marketplaceNftStatus !== FetchingState.PENDING && (
              <Fragment>
                <DefaultCard
                  image={AssetsImg.ic_nftEmpty.src}
                  title={`No NFTs to buy currently`}
                  addStyles={styles.homeMB}
                />
                {session.isLoggedIn && (
                  <section css={styles.marketplaceMB}></section>
                )}
              </Fragment>
            )}
        </motion.div>
      )}
    </Fragment>
  );
};

export default MarketplaceSwiper;
