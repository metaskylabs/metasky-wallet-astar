import * as styles from '@styles/Modules/BenefitsDetails';
import {
  BottomFadeInAnimation,
  BottomPopup,
  FullScreenKiteLoader,
  FullScreenPopUp,
  MLottie,
  PrimaryButton,
} from '@components/Shared';
import 'swiper/css';
import { Fragment, useEffect, useState } from 'react';
import { getBenefitAccessInfo, getWalletBenefitsById } from '@actions/wallet';
import {
  AccessBenefit,
  BenefitTypes,
  WalletBenefitsResponse,
} from '@typings/api/wallet';
import { useRouter } from 'next/router';
import Authentication from '@components/Authentication';
import ShimmerCard from '@components/Shimmer/ShimmerCard';
import ShimmerLargeImage from '@components/Shimmer/ShimmerLargeImage';
import { click, screen } from '@constants/analytics';
import { mixins } from '@styles/shared';
import { StatusType } from '@typings/api/shared';
import { handleErrorMessage } from '@utils/handleResponseToast';
import { LocalStorageVariables } from '@constants/authentication';
import { StoreState } from '@reducers';
import { useSelector } from 'react-redux';
import NOOB from '@constants/noob';
import ErrorBottomSheet from '@components/Shared/ErrorBottomSheet';
import { getTimeDifferenceFromNow, isTimeRemaining } from '@utils/Time';
import CountdownTimer from '@components/Auction/CountdownTimer';
import useLinkHandler from '@utils/hooks/useLinkHandler';
import { useTranslate } from '@utils/useTranslate';
import BottomNav from '@components/Shared/BottomNav';
import { NavTabs } from '@components/Shared/BottomNav/constants';
import EmptyBenefits from '@components/Benefits/EmptyBenefits';
import { ButtonSize } from '@components/Shared/Button/PrimaryButton';
import HeaderWithButtonLayout from '@components/Shared/HeaderWithButtonLayout';
import { BottomPopupSize } from '@components/Shared/BottomPopup';
import useCustomBack from '@utils/hooks/custom-back';
import { useUserSession } from '@utils/hooks/useUserSession';
import ClaimBenefit from '@components/Benefits/Claim';
import { useAnalytics } from '@utils/useAnalytics';
import RichText from '@components/Shared/RichText';
import AssetsImg from '@public/images';

enum BottomSheetComponent {
  BENEFIT_ERROR,
}
function BenefitsDetails() {
  const router = useRouter();
  const { trackClick, trackPage } = useAnalytics();
  const { translate } = useTranslate();
  const { query } = router;
  const [benefitDetails, setBenefitDetails] = useState<{
    status?: StatusType;
    data?: WalletBenefitsResponse;
  }>({ status: StatusType.LOADING });
  const [apiLoadingState, setApiLoadingState] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isKiteLoaderOpen, setIsKiteLoaderOpen] = useState<boolean>(false);
  const session = useUserSession();
  const [benefitError, setBenefitError] = useState<{
    title: string;
    description: string;
    img?: string;
    hasAction?: boolean;
    actionButtonText?: string;
    actionUrl?: string;
  }>({ title: ``, description: `` });
  const { onBack } = useCustomBack();
  const [currentBottomSheet, setCurrentBottomSheet] = useState<{
    isOpen: boolean;
    component?: BottomSheetComponent;
    size?: BottomPopupSize;
    onClose?: () => void;
  }>({ isOpen: false });
  const [claimBenefitOpen, setClaimBenefitOpen] = useState<boolean>(false);
  const [accessBenefitResponse, setAccessBenefitResponse] =
    useState<AccessBenefit>();
  const { linkHandler } = useLinkHandler();
  const allowAccess = !Boolean(benefitDetails.data?.unClickable);

  useEffect(() => {
    if (router.isReady) {
      getBenefitDetails();
      trackPage(screen.benefitsDetail);
    }
  }, [router.isReady]);

  function getApiUrl() {
    const benefit_uuid = query.id as string;
    return `wallet/benefit/${benefit_uuid}`;
  }

  async function getBenefitDetails() {
    try {
      setBenefitDetails({ status: StatusType.LOADING });
      const url = getApiUrl();
      if (url) {
        const response = await getWalletBenefitsById(url, false);
        setBenefitDetails({ status: StatusType.SUCCESS, data: response.data });
      } else {
        setBenefitDetails({ status: StatusType.ERROR });
      }
    } catch (error) {
      handleErrorMessage(error);
      // router.push(`/404`); TODO: 404 page is not necessary for this release
      setBenefitDetails({ status: StatusType.ERROR });
    }
  }

  const onAccessBenefit = async (benefitId: string) => {
    setIsKiteLoaderOpen(true);
    return getBenefitAccessInfo(benefitId, router.query.nftId as string)
      .then(async (response) => {
        if (response.data.ctaLink) {
          await linkHandler(
            response?.data?.type,
            response?.data?.ctaLink,
            response?.data?.ctaTarget,
            response?.data?.ctaLinkAs,
          );
        } else if (response?.data?.type === BenefitTypes.BENEFIT_STREAM) {
          console.log(`benefitAccessNowClick`, {
            uuid: `${benefitDetails?.data?.id}`,
          });
        } else {
          setClaimBenefitOpen(true);
          setAccessBenefitResponse(response.data);
        }
        setApiLoadingState(false);
        setIsKiteLoaderOpen(false);
      })
      .catch((err) => {
        setIsKiteLoaderOpen(false);
        if (err?.response?.data?.toastContext?.show_toast === false) {
          setBenefitError({
            img: err?.response?.data?.toastContext?.toast_image,
            title: err?.response?.data?.toastContext?.toast_message,
            description: err?.response?.data?.toastContext?.toast_description,
            hasAction: err?.response?.data?.toastContext?.has_action,
            actionButtonText:
              err?.response?.data?.toastContext?.action_button_text,
            actionUrl: err?.response?.data?.toastContext?.navigate_to,
          });
          setCurrentBottomSheet({
            isOpen: true,
            component: BottomSheetComponent.BENEFIT_ERROR,
            onClose: () => {
              setCurrentBottomSheet({ isOpen: false });
              setBenefitError({
                title: ``,
                description: ``,
              });
            },
          });
        } else {
          handleErrorMessage(err);
        }
      });
  };

  const handleAccessNow = async () => {
    trackClick(click.benefitsAccess, {
      benefit_id: benefitDetails?.data?.id,
      benefit_name: benefitDetails?.data?.name,
    });

    setApiLoadingState(true);
    onAccessBenefit(benefitDetails?.data?.id || ``)
      .then(() => {
        setApiLoadingState(false);
      })
      .catch(() => {
        setApiLoadingState(false);
      });
  };

  const renderSheet = () => {
    if (currentBottomSheet.component === BottomSheetComponent.BENEFIT_ERROR) {
      return (
        <ErrorBottomSheet
          img={benefitError.img}
          title={benefitError.title}
          description={benefitError.description}
          hasAction={benefitError.hasAction}
          buttonText={benefitError.actionButtonText}
          onActionClick={() => {
            if (benefitError.actionUrl) {
              linkHandler(``, benefitError.actionUrl);
            }
          }}
        />
      );
    }
  };

  const getPage = () => {
    if (!session.isLoggedIn && !isLoggedIn) {
      return (
        <FullScreenPopUp isOpen={true}>
          <Authentication
            onSuccess={() => {
              setIsLoggedIn(true);
              getBenefitDetails();
            }}
            isPopUp={true}
          />
        </FullScreenPopUp>
      );
    }
    if (benefitDetails?.status === StatusType.LOADING) {
      return (
        <HeaderWithButtonLayout
          secondaryBack
          onBack={onBack}
          title={`Benefits`}
        >
          <ShimmerLargeImage />
          <ShimmerCard height={30} borderRadius={10} isEffect={true} />
          <ShimmerCard height={240} borderRadius={10} isEffect={true} />
        </HeaderWithButtonLayout>
      );
    }
    if (benefitDetails?.status === StatusType.SUCCESS && benefitDetails?.data) {
      return (
        <Fragment>
          <HeaderWithButtonLayout
            secondaryBack
            onBack={onBack}
            title={`Benefits`}
          >
            <div css={styles.container}>
              <BottomFadeInAnimation>
                <img
                  src={benefitDetails.data?.image}
                  css={styles.imageComp}
                  className="benefitImg"
                  onLoad={() => {
                    const imgRef = document.getElementsByClassName(
                      `benefitImg`,
                    )[0] as HTMLDivElement;
                    imgRef.style.display = `block`;
                  }}
                />
              </BottomFadeInAnimation>
              <BottomFadeInAnimation>
                <h2 css={styles.bodyContainerTokenTitle}>
                  {benefitDetails?.data.name}
                </h2>

                {benefitDetails.data?.ctaButton &&
                  (allowAccess ? (
                    <BottomFadeInAnimation>
                      <PrimaryButton
                        size={ButtonSize.BIG}
                        onClick={handleAccessNow}
                        disabled={apiLoadingState}
                        addStyles={styles.cta}
                      >
                        {apiLoadingState ? (
                          <MLottie addStyles={styles.loader} />
                        ) : (
                          <p>{benefitDetails.data?.ctaButton}</p>
                        )}
                      </PrimaryButton>
                    </BottomFadeInAnimation>
                  ) : (
                    <p css={styles.disabledButton}>
                      {benefitDetails.data?.ctaButton} &nbsp;
                      <img src={AssetsImg.i_lock.src} width={30} />
                    </p>
                  ))}
                {benefitDetails?.data?.startTime &&
                  isTimeRemaining(
                    new Date(benefitDetails?.data?.startTime)
                      .getTime()
                      .toString(),
                  ) && (
                    <CountdownTimer
                      addedStyles={styles.timerContainer}
                      onTimerFinish={NOOB}
                      remainingTimeInSecond={getTimeDifferenceFromNow(
                        new Date(benefitDetails?.data?.startTime).getTime(),
                      )}
                    />
                  )}
                {benefitDetails.data?.description && (
                  <div css={styles.bodyContainerDescription}>
                    <RichText content={benefitDetails.data?.description} />
                  </div>
                )}
              </BottomFadeInAnimation>
            </div>
          </HeaderWithButtonLayout>
          <FullScreenKiteLoader isOpen={isKiteLoaderOpen}>
            <div css={styles.loaderContentInfo}>
              Page is Loading. Please wait...
            </div>
          </FullScreenKiteLoader>
          <BottomPopup
            onClose={currentBottomSheet.onClose}
            size={BottomPopupSize.MEDIUM}
            isOpen={currentBottomSheet.isOpen}
          >
            {currentBottomSheet.isOpen && renderSheet()}
          </BottomPopup>
          {claimBenefitOpen && accessBenefitResponse && (
            <ClaimBenefit
              image={benefitDetails.data.image}
              onClose={() => setClaimBenefitOpen(false)}
              benefitDetails={accessBenefitResponse}
            />
          )}
        </Fragment>
      );
    } else {
      return (
        <HeaderWithButtonLayout
          secondaryBack
          onBack={onBack}
          title={`Benefits`}
        >
          <div
            css={[
              mixins.flexAlignJustifiedCenter,
              styles.emptyBenefitContainer,
            ]}
          >
            <EmptyBenefits />
          </div>
        </HeaderWithButtonLayout>
      );
    }
  };

  return <BottomNav currentTab={NavTabs.HOME}>{getPage()}</BottomNav>;
}

export default BenefitsDetails;
