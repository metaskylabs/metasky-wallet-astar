import LoginWithMetamask from '@components/Authentication/LoginWithMetamask';
import OtpVerification from '@components/Authentication/otpVerification';
import Login from '@components/Authentication/LogIn';
import CreatePin from '@components/Authentication/CreatePin';
import CreateAccount from '@components/Authentication/CreateAccount';
import { FC, Fragment, useEffect, useState } from 'react';
import ConfirmedPin from '@components/Authentication/ConfirmedPin';
import { isIOS, isSafari } from 'react-device-detect';
import { logEvent, setUserId } from '@utils/amplitude';

import {
  checkWhitelist,
  forgotPinSendOtp,
  loginUserByEmailSendOtp,
  loginUserByPhoneSendOtp,
  resetPin,
  setPin,
  setUserLogin,
  whiteListUsers,
} from '@actions/auth';
import IncorrectPin from './IncorrectPin';
import EmailOtpVerification from './EmailOtpVerification';
import {
  AuthenticationScreen,
  LocalStorageVariables,
} from '@constants/authentication';
import { useRouter } from 'next/router';
import { Pages } from '@utils/navigation';
import { ToastType } from '../Shared/Toast';
import generateToast from '../Shared/GenerateToast';
import { handleErrorMessage } from '@utils/handleResponseToast';
import {
  RecoveryStatus,
  SetPinResponse,
  WhitelistRefType,
  WhitelistRequest,
} from '@typings/api/auth';
import {
  createOrUpdateToken,
  deleteToken,
  sendMessageToParent,
} from '@utils/helper';
import * as styles from '@components/Authentication/CreatePin/styles';
import WhitelistSuccess from '@components/WhitelistSuccess';
import { BottomSheet, FullScreenPopUp } from '@components/Shared';
import { IframeMessageType } from '@utils/constants';
import NearLoading from '@components/Authentication/NearLoading';
import AuthMain from '@components/Authentication/AuthMain';
import { LoginMethods } from '@typings/api/wallet';
import SecondCustodialOptionPage from '@components/Authentication/SecondCustodialOptionPage';
import AdditionalDetails from '@components/AdditionalDetails';
import { getCountryList } from '@actions/user';
import { useTranslate } from '@utils/useTranslate';
import { useAccount } from 'wagmi';
import { isEmpty, isUndefined } from 'lodash';
import { emailRegex } from '@utils/regexes';
import { APIStatusType } from '@typings/api/wrapper';
import { setAccessTokenCookie } from '@utils/cookie';

interface AuthenticationProps {
  setLoginStatus?: (status: boolean) => void;
  isPopUp: boolean;
  onSuccess?: () => void;
  disableSuccessLoginToast?: boolean;
  disableMetamaskRedirect?: boolean;
}

const getCookie = (name: string) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    const popped = parts.pop();
    if (popped) {
      return popped.split(`;`).shift();
    }
  }
};

const Authentication: FC<AuthenticationProps> = ({
  setLoginStatus,
  isPopUp,
  onSuccess,
  disableSuccessLoginToast,
  disableMetamaskRedirect,
}) => {
  const router = useRouter();
  const { translate } = useTranslate();
  const {
    whitelist,
    account_id,
    public_key,
    client_id,
    gated,
    email: queryEmail,
    phone: queryPhone,
  } = router.query;

  const [currentScreen, setCurrentScreen] = useState<AuthenticationScreen>(
    AuthenticationScreen.authMain,
  );
  const [mobileNo, setMobileNo] = useState<string>(``);
  const [emailID, setEmailID] = useState<string>(``);
  const [otpLoading, setOtpLoading] = useState<boolean>(false);
  const [createPinLoading, setCreatePinLoading] = useState<boolean>(false);
  const [recoveryStatus, setRecoveryStatus] = useState<RecoveryStatus>({
    recoveryModeEnabled: false,
    preferredRecoveryMode: undefined,
  });
  const [isForgetFlow, setForgetFlow] = useState<boolean>(false);
  const [authType, setAuthType] = useState<WhitelistRefType | undefined>(
    undefined,
  );
  const [isWhitelisted, setIsWhitelisted] = useState<boolean>(false);
  const [showClientName, setShowClientName] = useState<boolean>(false);
  // const [showUserDetailsPopup, setShowUserDetailsPopup] = useState(false);
  // const [requiredUserDetails, setRequiredUserDetails] = useState({});
  const [secondCustodialLoginOption, setSecondCustodialLoginOption] =
    useState<LoginMethods>(LoginMethods.EMAIL);
  const [whitelistingSheetStatus, setWhitelistingSheetStatus] = useState<{
    open: boolean;
    message?: string;
    address?: string;
  }>({
    open: false,
  });
  const { isConnected, address } = useAccount();

  useEffect(() => {
    (async () => {
      if (address && isConnected && !disableMetamaskRedirect) {
        setCurrentScreen(AuthenticationScreen.loginWithMetamask);
      }
    })();
  }, [address, isConnected]);

  useEffect(() => {
    if (router.isReady) {
      if (client_id == `nayaab`) {
        setShowClientName(true);
      } else {
        setShowClientName(false);
      }
    }
  }, [router.isReady]);

  // Country code API call
  async function fetchCountryCode() {
    try {
      await getCountryList();
    } catch (err) {
      handleErrorMessage(err);
    }
  }

  useEffect(() => {
    fetchCountryCode();
  }, []);

  useEffect(() => {
    if (typeof document !== `undefined`) {
      const lastCookie = document.cookie;
      const interval = setInterval(() => {
        const cookie = document.cookie;
        if (getCookie(`whitelist`) === `true` && whitelist) {
          openWhitelistSuccess();
        }
      }, 1000);
      return () => {
        clearInterval(interval);
      };
    }
  }, [whitelist]);

  useEffect(() => {
    if (typeof window !== `undefined`) {
      if (isWhitelisted) {
        if (isIOS || isSafari) {
          window.open(`https://nayaab.world/success/`, `_self`);
          return;
        }
        document.cookie = `whitelist=true; SameSite=None; Secure`;
        window.open(`https://nayaab.world/nft?open=true`, `_self`);
        window.close();
      }
    }
  }, [isWhitelisted]);

  const openWhitelistSuccess = async () => {
    if (!whitelistingSheetStatus.open) {
      sendMessageToParent(
        JSON.stringify({ event: IframeMessageType.whitelistComplete }),
      );
      sendMessageToParent(IframeMessageType.close);
      await setWhitelistingSheetStatus({
        open: true,
        message: `The connected wallet has already been whitelisted.`,
      });
      await setCurrentScreen(AuthenticationScreen.whitelistSuccess);
    }
  };
  const callWhitelistApi = async (
    payload: WhitelistRequest,
    setPinData?: SetPinResponse | null,
  ) => {
    try {
      const whiteListResponse = await whiteListUsers(payload);
      sendMessageToParent(
        JSON.stringify({ event: IframeMessageType.whitelistComplete }),
      );
      if (
        whiteListResponse?.message === `You have been successfully whitelisted.`
      ) {
        setWhitelistingSheetStatus({
          open: true,
          message: `You’ve been successfully whitelisted and your wallet has been created.`,
          address: setPinData
            ? client_id === `nayaab` || client_id === `azadi`
              ? setPinData.walletAddresses.nearAddress
              : setPinData.walletAddresses.ethAddress
            : undefined,
        });
        setCurrentScreen(AuthenticationScreen.whitelistSuccess);
        deleteToken(LocalStorageVariables.METAWHITELIST);
        createOrUpdateToken(
          LocalStorageVariables.IS_NEAR_USER_WHITELISTED,
          `true`,
        );

        sendMessageToParent(IframeMessageType.close);
      } else {
        setWhitelistingSheetStatus({
          open: true,
          message: `The connected wallet has already been whitelisted.`,
        });
        setCurrentScreen(AuthenticationScreen.whitelistSuccess);
        deleteToken(LocalStorageVariables.METAWHITELIST);
        createOrUpdateToken(
          LocalStorageVariables.IS_NEAR_USER_WHITELISTED,
          `true`,
        );

        sendMessageToParent(IframeMessageType.close);
      }
    } catch (error) {
      handleErrorMessage(error);
    }
  };
  useEffect(() => {
    if (router.isReady && account_id && public_key && whitelist) {
      const payload = {
        chain: `NEAR`,
        ref: account_id as string,
        refType: WhitelistRefType.PUBLIC_ADDRESS,
      };
      (async () => {
        try {
          setCurrentScreen(AuthenticationScreen.nearLoading);
          await callWhitelistApi(payload);
          setIsWhitelisted(true);
        } catch (e) {
          console.log(e);
        }
      })();
    }
  }, [router.isReady]);

  const sendOtp = async (number: string): Promise<void> => {
    try {
      setOtpLoading(true);
      setMobileNo(number);
      const payload = { ph_no: number };
      const response = await loginUserByPhoneSendOtp(payload);
      if (response.status === APIStatusType.SUCCESS) {
        setOtpLoading(false);
        setAuthType(WhitelistRefType.MOBILE);
        setCurrentScreen(AuthenticationScreen.otpVerification);
      }
    } catch (error) {
      setOtpLoading(false);
      handleErrorMessage(error);
    }
  };

  const setNewPin = async (pin: string): Promise<void> => {
    try {
      setCreatePinLoading(true);
      const payload = { pin: pin };
      let response;
      if (isForgetFlow) {
        response = await resetPin(payload);
        setForgetFlow(false);
      } else {
        response = await setPin(payload);
      }
      if (response.status === APIStatusType.SUCCESS) {
        if (response.data && response.data.userUUID) {
          setUserId(response.data.userUUID);
        }
        sendMessageToParent(
          JSON.stringify({
            wallet_address: response.data?.walletAddresses,
          }),
        );
        sendMessageToParent(
          JSON.stringify({
            metaToken: response.data?.accessToken,
            walletAddress: response.data?.walletAddresses.nearAddress,
          }),
        );
        sendMessageToParent(
          JSON.stringify({
            event: IframeMessageType.loginSuccess,
            payload: {
              bearerToken: response.data?.accessToken,
              walletAddress: response.data?.walletAddresses,
            },
          }),
        );
        setCreatePinLoading(false);
        if (response.data?.accessToken) {
          setUserLogin(true);
          setAccessTokenCookie(response.data.accessToken);
          logEvent(`loginSuccess`);
          if (gated) {
            try {
              const checkWhitelistResponse = await checkWhitelist();
              sendMessageToParent(
                JSON.stringify({
                  user_details: checkWhitelistResponse.data,
                  wallet_address: response.data.walletAddresses,
                }),
              );
              sendMessageToParent(
                JSON.stringify({
                  metaToken: response.data.accessToken,
                }),
              );
            } catch (err) {
              sendMessageToParent(
                `{"user_details":{"isWhitelisted":false,"hasNft":false}}`,
              );
            }
          }
        }
        if (whitelist) {
          let whitelistPayload: WhitelistRequest;
          whitelistPayload = {
            ref: mobileNo,
            refType: WhitelistRefType.MOBILE,
          };
          if (authType == WhitelistRefType.EMAIL) {
            whitelistPayload = {
              ref: emailID,
              refType: WhitelistRefType.EMAIL,
            };
          }

          await callWhitelistApi(whitelistPayload, response.data);
        } else {
          if (!disableSuccessLoginToast)
            generateToast({
              content: translate(`LOGGED_IN_SUCCESSFULLY`),
              type: ToastType.SUCCESS,
            });
          if (isPopUp) {
            onSuccess && onSuccess();
            setLoginStatus && setLoginStatus(false);
          } else {
            if (
              response.data?.additionalParamRequired === null ||
              (response.data?.additionalParamRequired &&
                Object.keys(response.data?.additionalParamRequired).length ===
                  0)
            ) {
              router.push(Pages.HOME);
            }
          }
        }
      } else {
        // console.log(response);
        setCreatePinLoading(false);
        generateToast({
          content: translate(`SOMETHING_WENT_WRONG_TOAST`),
          type: ToastType.ERROR,
        });
      }
    } catch (error) {
      setCreatePinLoading(false);
      handleErrorMessage(error);
    }
  };
  const handleForgetPin = async () => {
    if (recoveryStatus.recoveryModeEnabled) {
      try {
        await forgotPinSendOtp();
        setForgetFlow(true);
        setCurrentScreen(AuthenticationScreen.otpVerification);
      } catch (error) {
        handleErrorMessage(error);
      }
    } else {
      setCurrentScreen(AuthenticationScreen.createPin);
    }
  };

  const handleLoginWithEmail = async (email: string) => {
    try {
      setOtpLoading(true);
      const payload = { email };
      const response = await loginUserByEmailSendOtp(payload);
      if (response.status === APIStatusType.SUCCESS) {
        setOtpLoading(false);
        setAuthType(WhitelistRefType.EMAIL);
        setCurrentScreen(AuthenticationScreen.otpVerification);
      }
    } catch (error) {
      setOtpLoading(false);
      handleErrorMessage(error);
    }
  };

  useEffect(() => {
    if (!isEmpty(queryEmail) && !isUndefined(queryEmail)) {
      const email = (queryEmail as string).trim();
      if (emailRegex.test(email)) {
        setEmailID(email);
        handleLoginWithEmail(email);
      } else {
        handleErrorMessage({}, translate(`PLEASE_ENTER_VALID_EMAIL_ID`));
      }
    }
  }, [queryEmail]);

  useEffect(() => {
    if (!isEmpty(queryPhone) && !isUndefined(queryPhone)) {
      let phone = (queryPhone as string).trim();
      phone = `${phone.includes(`+`) ? `` : `+`}${phone}`;
      setMobileNo(phone);
      sendOtp(phone);
    }
  }, [queryPhone]);

  const getActiveComponent = () => {
    switch (currentScreen) {
      case AuthenticationScreen.authMain:
        return (
          <AuthMain
            setSecondCustodialLoginOption={(value) =>
              setSecondCustodialLoginOption(value)
            }
            handleLoginWithEmail={handleLoginWithEmail}
            setEmailID={(value) => {
              setEmailID(value);
            }}
            handleScreen={(screenName: AuthenticationScreen) => {
              setCurrentScreen(screenName);
            }}
            loading={otpLoading}
            sendOtp={(number) => sendOtp(number)}
            setMobileNumber={(value) => {
              setMobileNo(value);
            }}
          />
        );
      case AuthenticationScreen.secondCustodialOptionPage:
        return (
          <SecondCustodialOptionPage
            setEmailID={(value) => {
              setEmailID(value);
            }}
            handleLoginWithEmail={handleLoginWithEmail}
            secondCustodialLoginOption={secondCustodialLoginOption}
            handleScreen={(screenName: AuthenticationScreen) =>
              setCurrentScreen(screenName)
            }
            sendOtp={(number) => sendOtp(number)}
            setMobileNumber={(value) => {
              setMobileNo(value);
            }}
            loading={otpLoading}
          />
        );
      case AuthenticationScreen.otpVerification:
        return (
          <OtpVerification
            authType={authType!}
            mobileNo={mobileNo}
            emailID={emailID}
            resendOtp={
              authType === WhitelistRefType.MOBILE
                ? sendOtp
                : handleLoginWithEmail
            }
            isForgetFlow={isForgetFlow}
            setRecoveryStatus={(recoveryStatus) =>
              setRecoveryStatus(recoveryStatus)
            }
            resendOtpForForgetPin={handleForgetPin}
            handleScreen={(screenName: AuthenticationScreen) => {
              if (screenName == AuthenticationScreen.authMain) {
                setAuthType(undefined);
              }
              setCurrentScreen(screenName);
            }}
          />
        );
      case AuthenticationScreen.createPin:
        return (
          <CreatePin
            setPin={setNewPin}
            handleScreen={(screenName: AuthenticationScreen) => {
              if (
                screenName === AuthenticationScreen.otpVerification &&
                isForgetFlow
              ) {
                handleForgetPin();
              } else {
                setCurrentScreen(screenName);
              }
            }}
            loading={createPinLoading}
          />
        );
      case AuthenticationScreen.createAccount:
        return (
          <CreateAccount
            handleScreen={(screenName: AuthenticationScreen) => {
              setCurrentScreen(screenName);
            }}
            handleForgetPin={handleForgetPin}
            mobileNo={mobileNo}
            setLoginStatus={(status: boolean) => {
              if (setLoginStatus) {
                setLoginStatus(status);
              }
            }}
            isPopUp={isPopUp}
            authType={authType!}
            refValue={authType === WhitelistRefType.EMAIL ? emailID : mobileNo}
            disableSuccessLoginToast={disableSuccessLoginToast}
            onSuccess={onSuccess}
          />
        );
      case AuthenticationScreen.confirmedScreen:
        return <ConfirmedPin />;
      case AuthenticationScreen.emailOtpVerification:
        return <EmailOtpVerification />;

      case AuthenticationScreen.login:
        return (
          <Login
            handleScreen={(screenName: AuthenticationScreen) =>
              setCurrentScreen(screenName)
            }
          />
        );
      case AuthenticationScreen.incorrectPin:
        return (
          <IncorrectPin
            handleScreen={(screenName: AuthenticationScreen) =>
              setCurrentScreen(screenName)
            }
          />
        );
      case AuthenticationScreen.loginWithMetamask:
        return (
          <LoginWithMetamask
            handleScreen={(screenName: AuthenticationScreen) =>
              setCurrentScreen(screenName)
            }
            setLoginStatus={(status: boolean) => {
              if (setLoginStatus) {
                setLoginStatus(status);
              }
            }}
            isPopUp={isPopUp}
            disableSuccessLoginToast={disableSuccessLoginToast}
            onSuccess={onSuccess}
          />
        );
      case AuthenticationScreen.whitelistSuccess:
        return (
          <BottomSheet isOpen={true} addStyles={styles.bottomSheetHeight}>
            <WhitelistSuccess
              walletType="Metasky"
              message={whitelistingSheetStatus?.message}
              address={whitelistingSheetStatus?.address}
            />
          </BottomSheet>
        );
      case AuthenticationScreen.nearLoading:
        return <NearLoading />;
      default:
        return (
          <AuthMain
            setSecondCustodialLoginOption={(value) =>
              setSecondCustodialLoginOption(value)
            }
            handleLoginWithEmail={handleLoginWithEmail}
            setEmailID={(value) => {
              setEmailID(value);
            }}
            handleScreen={(screenName: AuthenticationScreen) => {
              setCurrentScreen(screenName);
            }}
            loading={otpLoading}
            sendOtp={(number) => sendOtp(number)}
            setMobileNumber={(value) => {
              setMobileNo(value);
            }}
          />
        );
    }
  };
  return getActiveComponent();
};
export default Authentication;
