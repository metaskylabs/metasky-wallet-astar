import { FC, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import * as styles from './styles';
import { AnnouncementCtaType } from '@typings/api/wallet';
import { handleErrorMessage } from '@utils/handleResponseToast';
import { getWalletAnnouncement } from '@actions/announcement';
import SwiperShimmer from '@components/Shimmer/SwiperShimmer';
import ShimmerCard from '@components/Shimmer/ShimmerCard';
import Announcement from '../Announcement';
import { useRouter } from 'next/router';
import { AnnouncementCTA, PWAPrompt } from '@utils/constants';
import SwiperCore, { Keyboard, Mousewheel, Pagination } from 'swiper';
import { useSelector } from 'react-redux';
import { StatusState, StoreState } from '@reducers';
import { State as announcementState } from '@reducers/announcement';
import { FetchingState } from '@constants/redux';
import { BottomFadeInAnimation, BottomSheet } from '@components/Shared';
import IOSPwaPrompt from '../IOSPwaPrompt';
import { isIOS, isSafari } from 'react-device-detect';
import { useTranslate } from '@utils/useTranslate';
import { useAnalytics } from '@utils/useAnalytics';
import { useUserSession } from '@utils/hooks/useUserSession';

SwiperCore.use([Keyboard, Mousewheel]);
interface AnnoucementSwiperProps {
  setTransferOpen: (b: boolean) => void;
}

const AnnoucementSwiper: FC<AnnoucementSwiperProps> = ({ setTransferOpen }) => {
  const router = useRouter();
  const { translate } = useTranslate();
  const { trackEvent, trackClick } = useAnalytics();
  const { list } = useSelector<StoreState, announcementState>(
    (state) => state.announcement,
  );
  const session = useUserSession();
  const { announcementStatus } = useSelector<StoreState, StatusState>(
    (state) => state.status,
  );
  const [isIosDevice, setIsIosDevice] = useState<boolean>(false);

  const [supportsPWA, setSupportsPWA] = useState(false);
  const [promptInstall, setPromptInstall] = useState(null);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setSupportsPWA(true);
      setPromptInstall(e);
    };
    window.addEventListener(`beforeinstallprompt`, handler);

    return () => window.removeEventListener(`transitionend`, handler);
  }, []);

  const handleInstallClick = () => {
    if (!promptInstall || !supportsPWA) {
      trackEvent(`PWA not supported`);
      // generateToast({
      //   content: translate(`PWA is not support currently`),
      //   type: ToastType.ERROR,
      // });
      return;
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    promptInstall.prompt();

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    promptInstall.userChoice.then((choiceResult: { outcome: string }) => {
      if (choiceResult.outcome === `accepted`) {
        trackEvent(`User accepted the install prompt`);
      } else {
        trackEvent(`User dismissed the install prompt`);
      }
    });
  };

  useEffect(() => {
    async function fetchAnnoucement() {
      try {
        await getWalletAnnouncement();
      } catch (err) {
        handleErrorMessage(err);
      }
    }

    fetchAnnoucement();
  }, []);

  const announcmnetClickHandler = (redirectionLink?: string) => {
    if (redirectionLink) {
      router.push(redirectionLink);
    }
  };

  const handleAnnouncementEvent = (data: any) => {
    trackClick(`Announcement`, {
      ...data,
    });
    if (
      (isIOS || isSafari) &&
      data.ctaType === AnnouncementCtaType.FUNCTION &&
      data.ctaLink === PWAPrompt.OPEN
    ) {
      setIsIosDevice(true);
    } else if (
      data.ctaType === AnnouncementCtaType.FUNCTION &&
      data.ctaLink === PWAPrompt.OPEN
    ) {
      handleInstallClick();
    } else if (
      data.ctaType === AnnouncementCtaType.FUNCTION &&
      data.ctaLink === AnnouncementCTA.TRANSFEROPEN
    ) {
      setTransferOpen(true);
    } else {
      announcmnetClickHandler(data.ctaLink);
    }
  };

  return (
    <BottomFadeInAnimation delay={0.2}>
      {announcementStatus === FetchingState.PENDING && (
        <SwiperShimmer spaceBetween={15} width={304} repeat={3}>
          <div css={styles.shimmerContainer}>
            <ShimmerCard isEffect={true} height={132} width={304}></ShimmerCard>
          </div>
        </SwiperShimmer>
      )}
      {list.length > 1 ? (
        <Swiper
          modules={[Pagination]}
          css={styles.headerSwiper}
          pagination={{ clickable: true }}
          keyboard={true}
          direction="horizontal"
          mousewheel={true}
          breakpoints={{
            320: {
              slidesPerView: 1.2,
            },
          }}
          cssMode={true}
          onSlideChange={(data) => {
            trackEvent(`Announcement Swiper scrolled`, {
              title: list[data.activeIndex]?.title,
              description: list[data.activeIndex]?.description,
              is_swiper_end: data.activeIndex + 1 === list.length,
              active_index: data.activeIndex,
            });
          }}
        >
          {list?.map((data, index) => (
            <SwiperSlide key={index}>
              <div key={index}>
                <Announcement
                  title={data.title}
                  ctaType={data.ctaType || ``}
                  ctaLink={data.ctaLink || ``}
                  description={data.description}
                  image={data.image}
                  backgroundColor={data.backgroundColor}
                  handleClick={() => handleAnnouncementEvent(data)}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        list.map((data, index) => (
          <div key={index}>
            <Announcement
              title={data.title}
              ctaType={data.ctaType || ``}
              ctaLink={data.ctaLink || ``}
              description={data.description}
              image={data.image}
              backgroundColor={data.backgroundColor}
              handleClick={() => handleAnnouncementEvent(data)}
            />
          </div>
        ))
      )}
      {announcementStatus !== FetchingState.PENDING && list.length === 0 && (
        <Announcement
          ctaType={``}
          ctaLink={``}
          title={`Metasky`}
          description={`Welcome to World’s Simplest XRP Wallet`}
          image={`https://skywallet-public-resources.s3.ap-southeast-1.amazonaws.com/announcements/metasky_white+logo.png`}
          backgroundColor={`linear-gradient(6.22deg, #9058DD 19.4%, #6F6DE2 94.82%);`}
        />
      )}
      {isIosDevice && (
        <BottomSheet isOpen={isIosDevice} onClose={() => setIsIosDevice(false)}>
          <IOSPwaPrompt />
        </BottomSheet>
      )}
    </BottomFadeInAnimation>
  );
};

export default AnnoucementSwiper;
