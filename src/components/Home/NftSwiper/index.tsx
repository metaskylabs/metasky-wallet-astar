import { getTokensList } from '@actions/ownedNft';
import { CardNfts, DefaultCard, HeaderOne } from '@components/Shared';
import { TokensType } from '@typings/api/wallet';
import { handleErrorMessage } from '@utils/handleResponseToast';
import { Pages } from '@utils/navigation';
import router from 'next/router';
import { State as OwnedState } from '@reducers/ownedNft';
import { FC, Fragment, useEffect } from 'react';
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
import { FetchingState } from '@constants/redux';
import { useTranslate } from '@utils/useTranslate';
import { State as profileState } from '@reducers/user';
import { CLICK } from '@constants/analytics';
import { useAnalytics } from '@utils/useAnalytics';
import { useUserSession } from '@utils/hooks/useUserSession';

SwiperCore.use([Keyboard, Mousewheel]);

const NftSwiper = () => {
  const { list } = useSelector<StoreState, OwnedState>(
    (state) => state.ownedNft,
  );
  const user = useSelector<StoreState, profileState>((state) => state.user);

  const { ownedNftStatus } = useSelector<StoreState, StatusState>(
    (state) => state.status,
  );
  const session = useUserSession();

  useEffect(() => {
    async function fetchNfts(url: string) {
      try {
        await getTokensList(url);
      } catch (err) {
        handleErrorMessage(err);
      }
    }
    if (session.isLoggedIn) fetchNfts(`/wallet/tokens/${TokensType.NFTS}`);
  }, [session.isLoggedIn, session.token]);

  const handleNftRoute = (data: NftList) => {
    router.push(
      `${Pages.NFT_DETAILS}/${data.id}?referrer_order_uuid=${
        data.order_uuid || ``
      }`,
    );
  };

  const { translate } = useTranslate();
  const { trackClick, trackEvent } = useAnalytics();

  return (
    <motion.div
      initial={{ opacity: 0, y: 90 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.4,
        default: { duration: 0.5 },
        ease: `easeIn`,
      }}
    >
      <div css={styles.nftCardWrapper}>
        <HeaderOne
          title={`${translate(`MY_NFTS`)} ${
            user.summary != null && user.summary.total_nft_count
              ? `(${user.summary.total_nft_count})`
              : ``
          }`}
        >
          {list?.length > 0 && (
            <span
              css={styles.seeAll}
              onClick={() => {
                router.push(
                  {
                    pathname: Pages.NFT_LIST,
                    query: { list: JSON.stringify(list) },
                  },
                  `${Pages.NFT_LIST}`,
                );
                trackClick(CLICK.SEE_ALL);
              }}
            >
              {translate(`SEE_ALL`)}
            </span>
          )}
        </HeaderOne>
      </div>
      {list.length > 0 && (
        <Fragment>
          <Swiper
            slidesPerView={`auto`}
            spaceBetween={20}
            keyboard={true}
            direction="horizontal"
            mousewheel={true}
            css={styles.swiperWrapper}
            cssMode={true}
            onToEdge={(data) => {
              if (data.activeIndex !== 0) {
                //used to send event of last nft in swiper
                trackEvent(`NFT Swiper scrolled`, {
                  id: list[data.activeIndex + 1]?.id,
                  name: list[data.activeIndex + 1]?.name,
                  is_swiper_end: true,
                  active_index: data.activeIndex + 1,
                });
              }
            }}
            onSlideChange={(data) => {
              trackEvent(`NFT Swiper scrolled`, {
                id: list[data.activeIndex]?.id,
                name: list[data.activeIndex]?.name,
                is_swiper_end: false,
                active_index: data.activeIndex,
              });
            }}
          >
            {list?.length > 0 &&
              list?.slice(0, 10).map((data, index) => (
                <SwiperSlide key={index} style={{ width: 225 }}>
                  <CardNfts
                    hightDesc={true}
                    image={data.image}
                    mediaType={data.media_type}
                    ribbon={
                      data.sale_details !== undefined ||
                      data.status === `PENDING`
                    }
                    ribbonText={
                      data.status === `PENDING`
                        ? translate(`RECEIVING`)
                        : data?.sale_details?.tag
                    }
                    onClick={() => handleNftRoute(data)}
                    name={data.name}
                  />
                </SwiperSlide>
              ))}
          </Swiper>
        </Fragment>
      )}
      {ownedNftStatus !== FetchingState.PENDING && list.length === 0 && (
        <DefaultCard
          image={AssetsImg.ic_nftEmpty.src}
          title={translate(`NO_NFTS_TITLE`)}
          addStyles={styles.metamaskMB}
        />
      )}
      {ownedNftStatus === FetchingState.PENDING && list.length === 0 && (
        <SwiperShimmer width={225} spaceBetween={20} repeat={3}>
          <div css={styles.shimmerContainer}>
            <ShimmerCard
              isEffect={true}
              height={200}
              borderRadius={4}
            ></ShimmerCard>
            <ShimmerCard
              isEffect={true}
              height={20}
              width={200}
              borderRadius={2}
            ></ShimmerCard>
            <ShimmerCard
              isEffect={true}
              height={20}
              width={160}
              borderRadius={2}
            ></ShimmerCard>
          </div>
        </SwiperShimmer>
      )}
    </motion.div>
  );
};

export default NftSwiper;
