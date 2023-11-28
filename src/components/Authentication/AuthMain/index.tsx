import { FC, Fragment, useEffect, useState } from 'react';
import * as styles from './styles';
import AssetsImg from '@public/images';
import {
  AuthenticationScreen,
  LocalStorageVariables,
} from '@constants/authentication';

import { FullScreenKiteLoader } from '@components/Shared';
import { useDisconnect } from 'wagmi';
import { ToastType } from '@components/Shared/Toast';
import generateToast from '@components/Shared/GenerateToast';
import { mixins, utils } from '@styles/shared';
import { motion } from 'framer-motion';
import { getToken } from '@utils/helper';
import useNearWallet from '@utils/hooks/NearWallet';

// import { UserWalletType } from "@pages/_app";
import { useRouter } from 'next/router';
import LoginWIthEmailInput from '@components/Authentication/shared/LoginWIthEmailInput';
import { LoginMethods } from '@typings/api/wallet';
import LoginWithMobileInput from '@components/Authentication/shared/LoginWithMobileInput';
import TertiaryButton from '@components/Shared/Button/TertiaryButton';
import { getCampaignConfiguration } from '@actions/wallet';
import { useWeb3Modal } from '@web3modal/react';
import { useTranslate } from '@utils/useTranslate';
import { Client } from '@constants/clients';
import { useAnalytics } from '@utils/useAnalytics';
import { CLICK, EVENT_PAGE } from '@constants/analytics';
import { useDispatch } from 'react-redux';

interface AuthMainProps {
  handleScreen: (screeName: AuthenticationScreen) => void;
  handleLoginWithEmail: (emailId: string) => void;
  setEmailID: (emailID: string) => void;
  loading: boolean;
  sendOtp: (number: string) => void;
  setMobileNumber: (mobileNo: string) => void;
  setSecondCustodialLoginOption: (value: LoginMethods) => void;
}

const fetchLoginMethods = async (clientId: string) => {
  const client = clientId || `default`;
  const payload = {
    clientId: client,
  };
  try {
    const response = await getCampaignConfiguration(payload);
    return response.data.login_methods;
  } catch (e) {}
};

const AuthMain: FC<AuthMainProps> = ({
  handleScreen,
  handleLoginWithEmail,
  setEmailID,
  loading,
  sendOtp,
  setMobileNumber,
  setSecondCustodialLoginOption,
}) => {
  const nearWallet = useNearWallet();
  const isNearLoading = nearWallet.isLoading;
  const dispatch = useDispatch();
  const { open, isOpen } = useWeb3Modal();
  const { disconnect } = useDisconnect();
  const router = useRouter();
  // TODO:- title states are not required for current release
  // const [title, setTitle] = useState<string | undefined>(`Connect Wallet`);
  const [loginUsingOtherOptions, setLoginUsingOtherOptions] =
    useState<boolean>(false);
  const [loginMethodsArray, setLoginMethodsArray] = useState<React.ReactNode[]>(
    [],
  );
  const initialValues: { [key: string]: string } = {
    emailID: ``,
  };
  const [loginTypes, setLoginTypes] = useState<LoginMethods[]>([
    LoginMethods.EMAIL,
    LoginMethods.PHONE,
    LoginMethods.METAMASK,
  ]);
  const { translate } = useTranslate();
  const amplitude = useAnalytics();

  const [clientID, setClientID] = useState<string | boolean>(``);

  useEffect(() => {
    (async () => {
      if (router.isReady) {
        const clientId =
          (router.query.client_id as string) ||
          getToken(LocalStorageVariables.METACLIENTID) ||
          ``;
        setClientID(clientId);
        const loginType = await fetchLoginMethods(clientId || ``);
        if (loginType) {
          setLoginTypes(loginType);
        }

        amplitude.trackPage(EVENT_PAGE.LOGIN, {
          login_methods: loginType,
        });
      }
    })();
  }, [router.isReady]);

  useEffect(() => {
    (async () => {
      await setLoginMethods();
    })();
  }, [loginTypes]);

  useEffect(() => {
    nearWallet
      .getAccount()
      .then((account) => {
        if (account?.accountId) return nearWallet.signInAndGenerateToken();
      })
      .catch((e) => {
        console.log(e);
      });
  }, [router.isReady]);

  // TODO:- Removed this for current release
  // useEffect(() => {
  //   if (router.isReady) {
  //     if (router.query.client_id == `nayaab`) {
  //       setTitle(`Nayaab.World`);
  //     }
  //   }
  // }, [router.isReady]);

  const setLoginMethods = async () => {
    const loginMethodsComponent = loginTypes.map((loginMethod) => {
      switch (loginMethod) {
        case LoginMethods.EMAIL:
          if (loginTypes.indexOf(LoginMethods.EMAIL) === 0) {
            return (
              <LoginWIthEmailInput
                handleLoginWithEmail={(emailId) => {
                  disconnect();
                  handleLoginWithEmail(emailId);
                }}
                setEmailID={(value) => {
                  setEmailID(value);
                }}
                loading={loading}
              />
            );
          } else {
            setSecondCustodialLoginOption(LoginMethods.EMAIL);
            return (
              <button
                css={[styles.authButton, utils.mb(20), utils.mt(0)]}
                type="button"
                onClick={() => {
                  handleScreen(AuthenticationScreen.secondCustodialOptionPage);
                  amplitude.trackClick(CLICK.CONTINUE_WITH_EMAIL);
                }}
              >
                <span css={[styles.buttonIcon, utils.mr(24)]}>
                  <img src={AssetsImg.ic_loginWithPhoneLogo.src} alt="mail" />
                </span>
                {translate(`CONTINUE_WITH_EMAIL`)}
              </button>
            );
          }

        case LoginMethods.PHONE:
          if (loginTypes.indexOf(LoginMethods.PHONE) === 0) {
            return (
              <LoginWithMobileInput
                sendOtp={(number) => sendOtp(number)}
                loading={loading}
                setMobileNumber={(mobileNo) => setMobileNumber(mobileNo)}
              />
            );
          } else {
            setSecondCustodialLoginOption(LoginMethods.PHONE);
            return (
              <button
                css={[styles.authButton, utils.mb(20), utils.mt(0)]}
                type="button"
                onClick={() => {
                  handleScreen(AuthenticationScreen.secondCustodialOptionPage);
                  amplitude.trackClick(CLICK.CONTINUE_WITH_MOBILE);
                }}
              >
                <span css={[styles.buttonIcon, utils.mr(24)]}>
                  <img src={AssetsImg.ic_loginWithPhoneLogo.src} alt="mail" />
                </span>
                {translate(`CONTINUE_WITH_MOBILE_NUMBER`)}
              </button>
            );
          }

        case LoginMethods.METAMASK:
          return (
            <>
              {
                <button
                  css={[styles.authButton, utils.mb(20), utils.mt(0)]}
                  type="button"
                  onClick={async () => {
                    await open();
                    amplitude.trackClick(CLICK.CONTINUE_WITH_METAMASK);
                  }}
                >
                  <span css={styles.buttonIcon}>
                    <img
                      src={AssetsImg.ic_walletIcon.src}
                      alt="metamask"
                      width={25}
                      height={25}
                    />
                  </span>
                  {`Continue with Wallet`}
                </button>
              }
            </>
          );
        // case LoginMethods.NEAR:
        //   return (
        //     <div
        //       onClick={() => {
        //         logEvent(`loginClick`, {
        //           type: `near`,
        //         });
        //       }}
        //     >
        //       <a
        //         css={[styles.authButton, utils.mt(20), styles.anchorWebkit]}
        //         target="_blank"
        //         rel="noreferrer"
        //         href={nearUrl}
        //       >
        //         <span css={styles.buttonIcon}>
        //           <img src={AssetsImg.ic_nearLogo.src} alt="near" />
        //         </span>
        //         Continue with NEAR
        //       </a>
        //     </div>
        //   );
      }
    });
    setLoginMethodsArray(loginMethodsComponent);
  };
  return (
    <div
      css={[
        styles.loginContainer,
        mixins.flexJustifiedBetween,
        mixins.flexColumn,
      ]}
    >
      <FullScreenKiteLoader isOpen={isNearLoading}>
        <div css={styles.loaderContentInfo}>{translate(`PAGE_LOADING`)}...</div>
      </FullScreenKiteLoader>
      <motion.div
        css={[styles.logoContainer, utils.mt(43), utils.mb(43)]}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.2,
          default: { duration: 0.3 },
          ease: `easeIn`,
        }}
      >
        <img
          src={AssetsImg.ic_metasky.src}
          alt="metaskyLogo"
          css={styles.metaskyLogo}
        />
      </motion.div>

      <div
        css={[
          styles.formHeight,
          mixins.flexJustifiedBetween,
          mixins.flexColumn,
        ]}
      >
        <motion.section
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            default: { duration: 0.3 },
            ease: `easeIn`,
          }}
        >
          {/* TODO:remove after tanuki launch */}
          {loginMethodsArray[0]}
          {clientID === Client.TANUKI && (
            <div css={styles.metamaskLoginButton}>{loginMethodsArray[1]}</div>
          )}
          {loginMethodsArray.length > 1 && (
            <>
              {/* TODO: No need for this phase */}
              <div css={styles.textCenter}>
                <Fragment>
                  <div css={styles.hr}>
                    <span css={styles.hrSpan}>{translate(`OR`)}</span>
                  </div>

                  {loginUsingOtherOptions ? (
                    <Fragment>
                      {loginMethodsArray
                        .slice(clientID === `tanuki` ? 2 : 1)
                        .map((elem, index) => {
                          return (
                            <Fragment key={`key_${index}`}>{elem}</Fragment>
                          );
                        })}
                      {loginTypes.includes(LoginMethods.NEAR) && (
                        <button
                          css={[styles.authButton, utils.mb(20), utils.mt(0)]}
                          type="button"
                          onClick={() => {
                            amplitude.trackClick(CLICK.CONTINUE_WITH_NEAR);
                            nearWallet.signIn();
                          }}
                        >
                          <span css={[styles.buttonIcon, utils.mr(24)]}>
                            <img src={AssetsImg.ic_nearLogo.src} alt="near" />
                          </span>
                          {translate(`CONTINUE_WITH_NEAR`)}
                        </button>
                      )}
                    </Fragment>
                  ) : (
                    <TertiaryButton
                      addStyles={styles.loginUsingOtherOptions}
                      text={translate(`CONTINUE_USING_OTHER_OPTIONS`)}
                      onClick={() => {
                        setLoginUsingOtherOptions(true);
                        amplitude.trackClick(
                          CLICK.CONTINUE_WITH_OTHER_OPTIONS_LOGIN,
                        );
                      }}
                    />
                  )}
                </Fragment>
              </div>
            </>
          )}
        </motion.section>
      </div>
    </div>
  );
};

export default AuthMain;
