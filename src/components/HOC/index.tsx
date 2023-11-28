import { useRouter } from 'next/router';
import { FC, Fragment, ReactNode, useEffect, useRef, useState } from 'react';
import * as styles from './styles';
import Splashscreen from '@components/SplashScreen';
import { detectIncognito } from '@utils/detectIncognito';
import IncognitoScreen from '@components/Shared/IncognitoShield/IncognitoScreen';
import { Pages } from '@utils/navigation';
import { setUserLogin } from '@actions/auth';
import { useSelector } from 'react-redux';
import { StoreState } from '@reducers';
import { State as userProfileState } from '@reducers/user';
import { getUserProfile } from '@actions/user';
import { handleErrorMessage } from '@utils/handleResponseToast';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// import { withTransaction } from '@elastic/apm-rum-react';
import { saveParamsInCookies } from '@utils/Storage';
import { paramsInCookies } from '@constants/hoc';
import ConfirmPreferenceChange from '@components/Profile/ConfirmPreferenceChange';
import {
  handleResize,
  sendingMessageToParent,
  setTokens,
} from '@components/HOC/helper';
import ExtraDetails from '@components/Authentication/ExtraDetails';

//
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import { WalletType } from '@constants/wallet';
import { useUserSession } from '@utils/hooks/useUserSession';
import { sendMessageToParent } from '@utils/helper';
import { IframeMessageType } from '@utils/constants';
import AccountSelector, { ConnectedAccount } from '@components/AccountSelector';
import { BottomPopup } from '@components/Shared';
import NOOB from '@constants/noob';
import { getBalanceSummary } from '@actions/profile';

function inIframe() {
  return window !== window.parent;
}

interface HocWrapperProps {
  children: ReactNode;
}

const HocWrapper: FC<HocWrapperProps> = ({ children }) => {
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  const [isIncognito, setIsCognito] = useState(false);
  const user = useSelector<StoreState, userProfileState>((state) => state.user);
  const { isLoggedIn, token, wallets } = useUserSession();
  const [accountSelectorConfig, setAccountSelectorConfig] = useState<{
    isOpen: boolean;
    onSelect: (account?: ConnectedAccount) => void;
  }>({ isOpen: false, onSelect: NOOB });

  useEffect(() => {
    detectIncognito().then((result) => {
      setIsCognito(result.isPrivate);
    });
  }, []);

  const fetchProfile = async () => {
    try {
      await Promise.all([getUserProfile(), getBalanceSummary()]);
    } catch (err) {
      handleErrorMessage(err);
    }
  };

  useEffect(() => {
    if (ref && ref.current) handleResize(ref);
  }, []);

  useEffect(() => {
    sendingMessageToParent(user);
  }, [user?.profile, user?.isLogin]);

  //removing for now to check if we really require or not
  // useEffect(() => {
  //   if (router.isReady) {
  //     router.events.on(`routeChangeComplete`, () => {
  //       // setSplashOpen(false);
  //       if (ref.current) {
  //         ref.current.scrollTo({ top: 0, behavior: `smooth` });
  //       }
  //     });
  //   }
  // }, [router.isReady]);

  useEffect(() => {
    if (router.isReady) {
      setUserLogin(isLoggedIn);
    }
  }, [user.profile, router.isReady, isLoggedIn]);

  useEffect(() => {
    if (
      router.isReady &&
      router.query.account_selector === `true` &&
      isLoggedIn
    ) {
      setAccountSelectorConfig({
        isOpen: true,
        onSelect: (account) => {
          setAccountSelectorConfig({ isOpen: false, onSelect: NOOB });
          if (!account) {
            return;
          }
          sendMessageToParent(
            JSON.stringify({
              event: IframeMessageType.accountSelected,
              account: account,
            }),
          );
        },
      });
    }
  }, [router.isReady, isLoggedIn]);

  useEffect(() => {
    if (user.isLogin) {
      fetchProfile();
    }
  }, [user.isLogin, token]);

  useEffect(() => {
    if (!isLoggedIn) {
      sendMessageToParent(
        JSON.stringify({ event: IframeMessageType.loggedOut }),
      );
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (router?.query) {
      setTokens(router.query);
      saveParamsInCookies(router.query, paramsInCookies);
    }
  }, [router.query]);

  if (typeof window !== `undefined`) {
    // Add event listener
    window.addEventListener(`resize`, () => handleResize(ref));
  }

  const getIntermediateSheet = () => {
    if (accountSelectorConfig.isOpen) {
      return (
        <BottomPopup isOpen title="Select Account">
          <AccountSelector onChange={accountSelectorConfig.onSelect} />
        </BottomPopup>
      );
    }
    return (
      <>
        {wallets?.includes(WalletType.SKYWALLET) && <ConfirmPreferenceChange />}
        <ExtraDetails />
      </>
    );
  };

  if (isIncognito && !inIframe() && router.pathname !== Pages.CONTACTUS) {
    return (
      <div ref={ref} css={[styles.container]}>
        <IncognitoScreen />
      </div>
    );
  } else {
    return (
      <Fragment>
        {/* App splash screen */}
        <Splashscreen />
        {/* Render section for application*/}
        <div ref={ref} css={[styles.container]}>
          {getIntermediateSheet()}
          {children}
        </div>
      </Fragment>
    );
  }
};

// export default withTransaction(`HocWrapper`, `component`)(HocWrapper);
export default HocWrapper;
