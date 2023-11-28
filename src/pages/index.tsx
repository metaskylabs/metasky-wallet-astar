import * as styles from '@styles/Modules/home';
import {
  BackButton,
  BottomPopup,
  BottomSheet,
  FullScreenPopUp,
} from '@components/Shared';
import 'swiper/css';
import { useRouter } from 'next/router';
import { FC, Fragment, useEffect, useState } from 'react';
import { Pages } from '@utils/navigation';
import NftSwiper from '@components/Home/NftSwiper';
import HeaderTab from '@components/Home/HeaderTab';
import WalletGroupButton from '@components/Home/WalletGroupButton';
import { motion } from 'framer-motion';
import ComingSoon from '@components/ComingSoon';
import HomeScan from '@components/HomeScan';
import { createOrUpdateToken, getToken } from '@utils/helper';
import { WalletType } from '@constants/wallet';
import { LocalStorageVariables } from '@constants/authentication';
import Transfer from '@components/Transfer';
import PrivateRoute from '@components/PrivateRoute';
import { trackClick, trackScreen } from '@utils/analytics';
import { CLICK, click, EVENT_PAGE, screen } from '@constants/analytics';
import { useSelector } from 'react-redux';
import { StoreState } from '@reducers';
import { handleErrorMessage } from '@utils/handleResponseToast';
import { BalanceTokensResponse, LoginMethods } from '@typings/api/wallet';
import { getCampaignConfiguration, walletBalanceTokens } from '@actions/wallet';
import WalletTokens from '@components/Home/WalletTokens';
import { State as transferState } from '@reducers/transfer';
// import {
//   boot,
//   intercomHide,
//   intercomUnreadCount,
//   load,
//   update,
// } from '@utils/intercom';
import { getUnreadMessagesCount } from '@actions/intercom';
import BottomNav from '@components/Shared/BottomNav';
import { NavTabs } from '@components/Shared/BottomNav/constants';
import { BottomPopupSize } from '@components/Shared/BottomPopup';
import WalletDetails from '@components/Home/WalletDetails';
import { useAnalytics } from '@utils/useAnalytics';
import NOOB from '@constants/noob';
import { useUserSession } from '@utils/hooks/useUserSession';
import HomePageBanner from '@components/Home/HomePageBanner';

enum SheetType {
  WALLET_DETAILS,
}
const Home: FC = () => {
  const router = useRouter();
  const [comingSoon, setComingSoon] = useState(false);

  const [transferLoading, setTransferLoading] = useState<boolean>(false);
  const [transferOpen, setTransferOpen] = useState(false);
  const [isOpen, setIsopen] = useState(false);
  const session = useUserSession();
  const [refreshKey, setRefreshKey] = useState<string>(`0`);
  const [coinList, setCoinList] = useState<BalanceTokensResponse[] | undefined>(
    [],
  );
  const [coinResponseLoading, setCoinLoading] = useState<boolean>(false);
  const transfer = useSelector<StoreState, transferState>(
    (state) => state.transfer,
  );
  const [openScan, setOpenScan] = useState(false);
  const [currentBottomSheet, setCurrentBottomSheet] = useState<{
    size?: BottomPopupSize;
    isOpen: boolean;
    component?: SheetType;
  }>({ isOpen: false });
  const [isNonCustodialDisabled, setIsNonCustodialDisabled] = useState(false);

  const amplitude = useAnalytics();

  useEffect(() => {
    amplitude.trackPage(EVENT_PAGE.WALLET);
  }, []);

  useEffect(() => {
    const setsessions = () => {
      const { client_id, forwardUrl } = router.query;

      if (client_id) {
        createOrUpdateToken(
          LocalStorageVariables.METACLIENTID,
          client_id.toString(),
        );
      }
      if (forwardUrl) {
        router.push(forwardUrl as string);
      }
    };

    if (router.isReady) {
      setsessions();
    }
    // checkIfLoggedIn();
  }, [router.isReady]);

  useEffect(() => {
    async function fetchWalletBalance() {
      try {
        setCoinLoading(true);
        const response = await walletBalanceTokens();
        setCoinList(response.data);
        setCoinLoading(false);
      } catch (err) {
        handleErrorMessage(err);
        setCoinLoading(false);
      }
    }
    if (session.isLoggedIn) {
      fetchWalletBalance();
    }
  }, [session.isLoggedIn, session.token]);

  const onRefreshFund = async () => {
    setRefreshKey((key) => key + 1);
  };

  // useEffect(() => {
  //   if (typeof window !== `undefined`) {
  //     load();
  //     boot();
  //     intercomHide();
  //     update(true);
  //     intercomUnreadCount(getUnreadMessagesCount);
  //   }
  // }, []);

  const renderSheet = () => {
    if (currentBottomSheet.component === SheetType.WALLET_DETAILS) {
      return (
        <WalletDetails
          isNonCustodialDisabled={isNonCustodialDisabled}
          onClose={() => {
            amplitude.trackClick(CLICK.CLOSE_WALLET_DETAILS);
            setCurrentBottomSheet({ isOpen: false });
          }}
        />
      );
    }
  };

  return (
    <Fragment>
      <PrivateRoute>
        <BottomNav currentTab={NavTabs.WALLET}>
          <BottomPopup
            isOpen={openScan}
            onClose={() => setOpenScan(false)}
            size={BottomPopupSize.BIG}
            title={`Scan`}
          >
            <HomeScan onClose={() => setOpenScan(false)} />
          </BottomPopup>
          <div>
            <motion.div
              css={styles.headerContainer}
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.05,
                default: { duration: 0.5 },
                ease: `easeIn`,
              }}
            >
              <HeaderTab
                refreshAssets={onRefreshFund}
                setIsopen={() =>
                  setCurrentBottomSheet({
                    isOpen: true,
                    component: SheetType.WALLET_DETAILS,
                  })
                }
                isOpen={isOpen}
              />

              {/*<AnnoucementSwiper*/}
              {/*  key={refreshKey}*/}
              {/*  setTransferOpen={setTransferOpen}*/}
              {/*/>*/}
              <motion.div
                css={styles.walletBtnWrapper}
                initial={{ opacity: 0, y: 80 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.3,
                  default: { duration: 0.5 },
                  ease: `easeIn`,
                }}
              >
                <WalletGroupButton
                  connectWalletHandler={() => {
                    // [MutliWallet] - Todo: Discuss new behaviour with backend team
                    trackClick(click.homepageTransfer);
                    if (!session.isLoggedIn) router.push(Pages.LOGIN);
                    if (session.wallets?.includes(WalletType.SKYWALLET)) {
                      // setComingSoon(true);
                      setTransferOpen(true);
                    } else {
                      router.push(Pages.LOGIN);
                    }
                  }}
                  transferHandler={() => setOpenScan(true)}
                  transitionRoute={() => {
                    if (session.isLoggedIn) {
                      router.push(Pages.TRANSACTION);
                    } else {
                      router.push(Pages.LOGIN);
                    }
                  }}
                />
              </motion.div>
            </motion.div>
            <HomePageBanner />
            <NftSwiper key={refreshKey} />

            <WalletTokens
              coinList={coinList}
              coinResponseLoading={coinResponseLoading}
            />
            {transferOpen && (
              <Transfer
                transferLoading={transferLoading}
                setTransferOpen={(b) => setTransferOpen(b)}
                setTransferLoading={setTransferLoading}
                defaultNftUid={transfer.transfer_uuid}
              />
            )}
            {comingSoon && (
              <BottomSheet
                isOpen={comingSoon}
                onClose={() => setComingSoon(false)}
                addStyles={styles.logoutBottomSheet}
              >
                <ComingSoon />
              </BottomSheet>
            )}
          </div>
        </BottomNav>
      </PrivateRoute>
      <BottomPopup
        isOpen={currentBottomSheet.isOpen}
        size={currentBottomSheet.size}
      >
        {currentBottomSheet && renderSheet()}
      </BottomPopup>
    </Fragment>
  );
};

export default Home;
