import { FC, useEffect, useState } from 'react';
import BottomNav from '@components/Shared/BottomNav';
import ProfileSectionHome from '@components/NewHome/ProfileSection';
import AnnoucementSwiper from '@components/Home/AnnoucementSwiper';
import NOOB from '@constants/noob';
import Feed from '@components/Home/Feed';
import { BottomPopup } from '@components/Shared';
import { BottomPopupSize } from '@components/Shared/BottomPopup';
import FeedDetail from '@components/Home/FeedDetails';
import ProfileSidePanel from '@components/NewHome/ProfileSidePanel';
import * as styles from '@styles/Modules/home';
import { useRouter } from 'next/router';
import { NavTabs } from '@components/Shared/BottomNav/constants';
import Logout from '@components/Logout';
import ReferAndEarn from '@components/ReferAndEarn';
import MyReward from '@components/NewHome/MyRewards';
import ChangePin from '@components/Authentication/ChangePin';
import CreatePin from '@components/Authentication/CreatePin';
import { setPin } from '@actions/auth';
import generateToast from '@components/Shared/GenerateToast';
import { ToastType } from '@components/Shared/Toast';
import { handleErrorMessage } from '@utils/handleResponseToast';
import EditProfile from '@components/Home/EditProfile';
import ForgetPin from '@components/Home/ForgotPin';
import SetUserPreferences from '@components/Profile/SetUserPreferences';
import { useAnalytics } from '@utils/useAnalytics';
import { EVENT_PAGE } from '@constants/analytics';
import NFTTransferFlow from '@components/NFTTransferFlow';
import { APIStatusType } from '@typings/api/wrapper';
import CustomerSupport from '@components/CustomerSupportBottomSheet';

export enum BottomSheetComponent {
  MY_OFFERS = `My Offers`,
  CHANGE_PIN = `Change Pin`,
  REWARDS = `My Rewards`,
  REFER_EARN = `Refer & Earn`,
  LOGOUT = `Logout`,
  FEED = `Trending Now`,
  CREATE_PIN = `Create Pin`,
  EDIT_PROFILE = `Edit Profile`,
  TRANSFER = `Transfer`,
  FORGOT_PIN = `Forgot Pin`,
  LANGUAGE_AND_CURRENCY = `Language & Currency`,
  CUSTOMER_SUPPORT = `Customer Support`,
}
const Home: FC = () => {
  const router = useRouter();

  const [currentFeedId, setCurrentFeedId] = useState<string>(``);
  const [currentBottomSheet, setCurrentBottomSheet] = useState<{
    isOpen: boolean;
    component?: BottomSheetComponent;
    size?: BottomPopupSize;
    onBack?: () => void;
  }>({ isOpen: false });
  const [openSideProfilePanel, setOpenSideProfilePanel] =
    useState<boolean>(false);

  const { trackClick, trackPage, trackEvent } = useAnalytics();
  // Remove after v2 is deployed to prod
  useEffect(() => {
    if (router.isReady) {
      if (router.query.pass != `nav-2-key`) {
        // router.push(`/`);
      }
    }
  }, [router.isReady]);

  useEffect(() => {
    trackPage(EVENT_PAGE.HOME);
  }, []);
  const setNewPin = async (pin: string): Promise<void> => {
    try {
      const payload = { pin };
      const response = await setPin(payload);
      if (response.status === APIStatusType.SUCCESS) {
        setCurrentBottomSheet({
          isOpen: false,
        });
        generateToast({
          content: `New Pin Set Successfully`,
          type: ToastType.SUCCESS,
        });
      }
    } catch (error) {
      handleErrorMessage(error);
    }
  };
  //TODO: switch case
  const renderSheet = () => {
    if (currentBottomSheet.component === BottomSheetComponent.EDIT_PROFILE) {
      return (
        <EditProfile
          onSuccess={() => {
            trackEvent(`Edit Bottom Sheet Closed`);
            setCurrentBottomSheet({ isOpen: false });
          }}
        />
      );
    } else if (currentBottomSheet.component === BottomSheetComponent.TRANSFER) {
      return (
        <NFTTransferFlow
          onBack={() => setCurrentBottomSheet({ isOpen: false })}
        />
      );
    } else if (currentBottomSheet.component === BottomSheetComponent.FEED) {
      return <FeedDetail feedId={currentFeedId} />;
    } else if (currentBottomSheet.component === BottomSheetComponent.LOGOUT) {
      return (
        <Logout onClose={() => setCurrentBottomSheet({ isOpen: false })} />
      );
    } else if (
      currentBottomSheet.component === BottomSheetComponent.REFER_EARN
    ) {
      return <ReferAndEarn />;
    } else if (currentBottomSheet.component === BottomSheetComponent.REWARDS) {
      return <MyReward />;
    } else if (
      currentBottomSheet.component === BottomSheetComponent.CHANGE_PIN
    ) {
      return (
        <ChangePin
          nextStep={() => {
            setCurrentBottomSheet({
              isOpen: true,
              component: BottomSheetComponent.CREATE_PIN,
              size: BottomPopupSize.MEDIUM,
            });
          }}
          setForgetPin={() =>
            setCurrentBottomSheet({
              isOpen: true,
              component: BottomSheetComponent.FORGOT_PIN,
              size: BottomPopupSize.MEDIUM,
              onBack: () =>
                setCurrentBottomSheet({
                  isOpen: true,
                  component: BottomSheetComponent.CHANGE_PIN,
                  size: BottomPopupSize.MEDIUM,
                }),
            })
          }
        />
      );
    } else if (
      currentBottomSheet.component === BottomSheetComponent.CREATE_PIN
    ) {
      return (
        <CreatePin
          setPin={setNewPin}
          noHeader={true}
          handleScreen={() => {
            trackEvent(`Create Pin Bottom Sheet Closed`);
            setCurrentBottomSheet({ isOpen: false });
          }}
        />
      );
    } else if (
      currentBottomSheet.component === BottomSheetComponent.FORGOT_PIN
    ) {
      return <ForgetPin />;
    } else if (
      currentBottomSheet.component ===
      BottomSheetComponent.LANGUAGE_AND_CURRENCY
    )
      return (
        <SetUserPreferences
          onClose={() => setCurrentBottomSheet({ isOpen: false })}
          isOpen={true}
        />
      );
    else if (
      currentBottomSheet.component === BottomSheetComponent.CUSTOMER_SUPPORT
    )
      return <CustomerSupport />;
  };

  // Handle back use cases for bottom-sheet
  const handleBack = () => NOOB;

  return (
    <>
      <BottomNav currentTab={NavTabs.HOME}>
        <ProfileSectionHome
          openProfilePanel={() => setOpenSideProfilePanel(true)}
        />

        <AnnoucementSwiper
          setTransferOpen={() =>
            setCurrentBottomSheet({
              isOpen: true,
              component: BottomSheetComponent.TRANSFER,
              size: BottomPopupSize.MEDIUM,
            })
          }
        />

        <div css={styles.feedSection}>
          <Feed
            setCurrentFeed={(feed_uuid) => setCurrentFeedId(feed_uuid)}
            setIsFeedDetailOpen={(isOpen) =>
              setCurrentBottomSheet({
                isOpen: isOpen,
                component: BottomSheetComponent.FEED,
                size: BottomPopupSize.BIG,
              })
            }
          />
        </div>
      </BottomNav>
      {/* Side menu */}
      <ProfileSidePanel
        isOpen={openSideProfilePanel}
        onClose={() => setOpenSideProfilePanel(false)}
        handleBottomSheetCom={(sheetType, size) => {
          setCurrentBottomSheet({
            isOpen: true,
            component: sheetType,
            size: size,
          });
          setOpenSideProfilePanel(false);
        }}
      />
      {/* Single bottom-sheet for multiple component */}
      <BottomPopup
        size={currentBottomSheet.size}
        isOpen={currentBottomSheet.isOpen}
        onClose={() => {
          trackClick(`Close in ${currentBottomSheet.component}`);
          setCurrentBottomSheet({ isOpen: false });
        }}
        title={currentBottomSheet.component}
        onBack={currentBottomSheet.onBack}
        isBackEnabled={!!currentBottomSheet.onBack}
      >
        {currentBottomSheet.component && renderSheet()}
      </BottomPopup>
    </>
  );
};

export default Home;
