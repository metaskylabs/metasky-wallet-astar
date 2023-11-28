import React, { FC, Fragment, useEffect, useRef, useState } from 'react';
import * as styles from './styles';
import AssetsImg from '@public/images';
import { SectionTitle } from '../../Shared';
import { useRouter } from 'next/router';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Navigation, Swiper as SwiperType } from 'swiper';
import { Title } from '@constants/feed';
import CircularWithIcon from '@components/Shared/Button/CircularWithIconButton';
import { FeedType } from '@typings/api/feed';
import ProgressBar from '../ProgressBar';
import FeedMedia from '@components/Shared/Card/FeedMedia';
import { StatusType } from '@typings/api/shared';
import { getFeeds } from '@actions/feed';
import ShimmerFeed from '@components/Shimmer/ShimmerFeed';
import Controller from './controller';
import { CLICK, click } from '@constants/analytics';
import { BottomFadeInAnimation } from '@components/Shared';
import { useAnalytics } from '@utils/useAnalytics';

interface FeedProps {
  setCurrentFeed: (feed_uuid: string) => void;
  setIsFeedDetailOpen: (isOpen: boolean) => void;
}

const Feed: FC<FeedProps> = ({ setCurrentFeed, setIsFeedDetailOpen }) => {
  const [feeds, setFeeds] = useState<{
    status: StatusType;
    data?: FeedType[];
  }>({ status: StatusType.LOADING });
  const [currentFeedIndex, setCurrentFeedIndex] = useState<number>(0);
  const [isMute, setIsMute] = useState<boolean>(true);
  const swiperRef = useRef<SwiperType>();
  const router = useRouter();
  const { trackClick } = useAnalytics();

  const handleDetailClick = () => {
    feeds.data && setCurrentFeed(feeds.data[currentFeedIndex]?.feed_uuid);
    setIsFeedDetailOpen(true);
    feeds.data &&
      trackClick(CLICK.FEED_DETAIL, {
        current_feed:
          feeds.data[swiperRef.current?.activeIndex as number].feed_uuid,
      });
  };

  const handleNext = () => {
    swiperRef.current?.slideNext();
    feeds.data &&
      trackClick(CLICK.FEED_NEXT, {
        current_feed:
          feeds.data[swiperRef.current?.activeIndex as number].feed_uuid,
      });
  };

  const handlePrev = () => {
    swiperRef.current?.slidePrev();
    feeds.data &&
      trackClick(CLICK.FEED_PREV, {
        current_feed:
          feeds.data[swiperRef.current?.activeIndex as number].feed_uuid,
      });
  };

  const fetchFeeds = async () => {
    try {
      const response = await getFeeds();
      if (response.data && response.data.feeds.length !== 0) {
        setFeeds({
          status: StatusType.SUCCESS,
          data: response.data.feeds,
        });
      } else {
        setFeeds({ status: StatusType.ERROR });
      }
    } catch (e) {
      setFeeds({ status: StatusType.ERROR });
    }
  };
  useEffect(() => {
    fetchFeeds();
  }, []);

  if (feeds.status === StatusType.SUCCESS) {
    return (
      <Fragment>
        <BottomFadeInAnimation>
          <div>
            <SectionTitle title={Title.TRENDINGNOW}>
              {feeds.data && feeds.data.length > 1 && (
                <div css={styles.navButtonsContainer}>
                  <CircularWithIcon
                    icon={AssetsImg.ic_leftArrowBlue.src}
                    onClick={handlePrev}
                  />
                  <CircularWithIcon
                    icon={AssetsImg.ic_rightArrowBlue.src}
                    onClick={handleNext}
                  />
                </div>
              )}
            </SectionTitle>
          </div>
          <section css={styles.dummyContainer}>
            <ProgressBar
              currentFeedIndex={currentFeedIndex}
              feeds={feeds?.data as FeedType[]}
            />
          </section>
          <div css={styles.feedContainer}>
            <div css={styles.swiperWrapper}>
              <Swiper
                modules={[Navigation, EffectCoverflow]}
                slidesPerView={1}
                css={styles.swiperContainer}
                effect={`coverflow`}
                coverflowEffect={{
                  rotate: 0,
                  slideShadows: false,
                }}
                onInit={(swiper) => {
                  swiperRef.current = swiper;
                }}
                speed={0}
                onSlideChange={(swiperData) => {
                  setCurrentFeedIndex(swiperData.activeIndex);
                }}
              >
                {feeds?.data?.map((feed, index) => {
                  return (
                    <SwiperSlide key={feed.feed_uuid}>
                      <div css={styles.mediaContainer}>
                        <FeedMedia
                          mediaType={feed.mediaType}
                          mediaUrl={feed.mediaLink}
                          isMute={isMute}
                          id={feed.feed_uuid}
                          currentMedia={
                            feeds.data && feeds.data[currentFeedIndex].feed_uuid
                          }
                        />
                        <Controller
                          handleDetailClick={handleDetailClick}
                          handleNext={handleNext}
                          handlePrev={handlePrev}
                          mediaType={feed.mediaType}
                          title={feed.heading}
                          isMute={isMute}
                          setIsMute={(isMute) => setIsMute(isMute)}
                        />
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          </div>
        </BottomFadeInAnimation>
      </Fragment>
    );
  } else if (feeds.status === StatusType.LOADING) {
    return (
      <div css={styles.shimmerContainer}>
        <ShimmerFeed />
      </div>
    );
  } else {
    return <></>;
  }
};

export default Feed;
