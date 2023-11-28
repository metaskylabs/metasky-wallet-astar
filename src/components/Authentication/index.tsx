import OtpVerification from '@components/Authentication/otpVerification';
import Login from '@components/Authentication/LogIn';
import CreatePin from '@components/Authentication/CreatePin';
import CreateAccount from '@components/Authentication/CreateAccount';
import { FC, Fragment, useEffect, useState } from 'react';
import ConfirmedPin from '@components/Authentication/ConfirmedPin';
import { isIOS, isSafari } from 'react-device-detect';
import { logEvent, setUserId } from '@utils/amplitude';

import {
  forgotPinSendOtp,
  loginUserByEmailSendOtp,
  loginUserByPhoneSendOtp,
  resetPin,
  setPin,
  setUserLogin,
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
} from '@typings/api/auth';
import {
  createOrUpdateToken,
  deleteToken,
  sendMessageToParent,
} from '@utils/helper';
import * as styles from '@components/Authentication/CreatePin/styles';
import { BottomSheet, FullScreenPopUp } from '@components/Shared';
import { IframeMessageType } from '@utils/constants';
import AuthMain from '@components/Authentication/AuthMain';
import { LoginMethods } from '@typings/api/wallet';
import SecondCustodialOptionPage from '@components/Authentication/SecondCustodialOptionPage';
import AdditionalDetails from '@components/AdditionalDetails';
import { getCountryList } from '@actions/user';
import { useTranslate } from '@utils/useTranslate';
import { isEmpty, isUndefined } from 'lodash';
import { emailRegex } from '@utils/regexes';
import { APIStatusType } from '@typings/api/wrapper';
import { setAccessTokenCookie } from '@utils/cookie';

interface AuthenticationProps {
  setLoginStatus?: (status: boolean) => void;
  isPopUp: boolean;
  onSuccess?: () => void;
  disableSuccessLoginToast?: boolean;
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
}) => {
  const router = useRouter();
  const { translate } = useTranslate();
  const { email: queryEmail, phone: queryPhone } = router.query;

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
  const [secondCustodialLoginOption, setSecondCustodialLoginOption] =
    useState<LoginMethods>(LoginMethods.EMAIL);

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
            event: IframeMessageType.loginSuccess,
            payload: {
              bearerToken: response.data?.accessToken,
            },
          }),
        );
        setCreatePinLoading(false);
        if (response.data?.accessToken) {
          setUserLogin(true);
          setAccessTokenCookie(response.data.accessToken);
          logEvent(`loginSuccess`);
        }
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
              Object.keys(response.data?.additionalParamRequired).length === 0)
          ) {
            router.push(Pages.HOME);
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
