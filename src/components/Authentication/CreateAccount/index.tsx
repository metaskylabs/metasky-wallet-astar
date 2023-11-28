import {
  checkWhitelist,
  setUserLogin,
  validatePin,
  whiteListUsers,
} from '@actions/auth';
import {
  BottomFadeInAnimation,
  BottomSheet,
  FullScreenKiteLoader,
  MLottie,
  MPinInput,
  PrimaryButton,
} from '@components/Shared';
// import PinInput from '@components/Shared/Card/PinInput';
import generateToast from '@components/Shared/GenerateToast';
import { ToastType } from '@components/Shared/Toast';
import {
  AuthenticationScreen,
  LocalStorageVariables,
} from '@constants/authentication';
import { colors, mixins } from '@styles/shared';
import { Pages } from '@utils/navigation';
import { useRouter } from 'next/router';
import { FC, Fragment, ReactText, useEffect, useState } from 'react';
import * as styles from './styles';
import { handleErrorMessage } from '@utils/handleResponseToast';
import { WhitelistRefType } from '@typings/api/auth';
import WhitelistSuccess from '@components/WhitelistSuccess';
import { deleteToken, sendMessageToParent } from '@utils/helper';
import { IframeMessageType } from '@utils/constants';
import { logEvent, setUserId } from '@utils/amplitude';
import { useTranslate } from '@utils/useTranslate';
import HeaderWithButtonLayout from '@components/Shared/HeaderWithButtonLayout';
import { useAnalytics } from '@utils/useAnalytics';
import { CLICK, EVENT_PAGE } from '@constants/analytics';
import { APIStatusType } from '@typings/api/wrapper';
import { setAccessTokenCookie } from '@utils/cookie';

interface CreateAccountProps {
  disableSuccessLoginToast?: boolean;
  handleScreen: (screeName: AuthenticationScreen) => void;
  setLoginStatus: (status: boolean) => void;
  mobileNo: string;
  isPopUp: boolean;
  handleForgetPin: () => void;
  authType: WhitelistRefType;
  refValue: string;
  onSuccess?: () => void;
}

const CreateAccount: FC<CreateAccountProps> = ({
  handleScreen,
  mobileNo,
  setLoginStatus,
  isPopUp,
  handleForgetPin,
  refValue,
  authType,
  onSuccess,
  disableSuccessLoginToast,
}) => {
  const [incorrectPin, setInCorrectPin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pin, setPin] = useState<string>(``);
  const [attemptRemaining, setAttemptRemaining] = useState<number>(3);
  const router = useRouter();
  const [whitelistingSheetStatus, setWhitelistingSheetStatus] = useState<{
    open: boolean;
    message?: string;
    address?: string;
  }>({
    open: false,
  });
  const [isWhitelistApiCalled, setIsWhitelistApiCalled] =
    useState<boolean>(false);
  const { translate } = useTranslate();
  const amplitude = useAnalytics();

  useEffect(() => {
    amplitude.trackPage(EVENT_PAGE.ENTER_PIN);
  }, []);

  const { whitelist, client_id, gated } = router.query;

  const verifyPin = (verificationPin: ReactText) => {
    const pin = verificationPin as string;
    setPin(pin);
  };

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await validatePin({ pin: pin });
      if (response.status === APIStatusType.SUCCESS) {
        if (!!response.data.userUUID) {
          setUserId(response.data.userUUID);
        }
        sendMessageToParent(
          JSON.stringify({
            wallet_address: response.data.walletAddresses,
          }),
        );
        sendMessageToParent(
          JSON.stringify({
            metaToken: response.data.accessToken,
            walletAddress: response.data.walletAddresses.nearAddress,
          }),
        );
        sendMessageToParent(
          JSON.stringify({
            event: IframeMessageType.loginSuccess,
            payload: {
              bearerToken: response.data.accessToken,
              walletAddress: response.data.walletAddresses,
            },
          }),
        );
        if (response.data.accessToken) {
          setUserLogin(true);
          setAccessTokenCookie(response.data.accessToken);
          setIsWhitelistApiCalled(true);
          setLoading(false);
          setInCorrectPin(false);
          logEvent(`loginSuccess`);

          if (gated) {
            try {
              const checkWhitelistResponse = await checkWhitelist();
              sendMessageToParent(
                JSON.stringify({
                  user_details: checkWhitelistResponse.data,
                }),
              );
            } catch (err) {
              sendMessageToParent(
                `{"user_details":{"isWhitelisted":false,"hasNft":false}}`,
              );
            }
          }

          if (whitelist) {
            try {
              const whiteListResponse = await whiteListUsers({
                ref: refValue,
                refType: authType,
              });
              sendMessageToParent(
                JSON.stringify({ event: IframeMessageType.whitelistComplete }),
              );
              if (
                whiteListResponse?.message ===
                `You have been successfully whitelisted.`
              ) {
                setWhitelistingSheetStatus({
                  open: true,
                  message: translate(`WHITELISTING_SUCCESSFUL`),
                  address:
                    client_id === `nayaab` || client_id === `azadi`
                      ? response.data.walletAddresses.nearAddress
                      : response.data.walletAddresses.ethAddress,
                });
                deleteToken(LocalStorageVariables.METAWHITELIST);
                sendMessageToParent(IframeMessageType.close);
              } else {
                setWhitelistingSheetStatus({
                  open: true,
                  message: translate(`ALREADY_WHITELISTED`),
                  address:
                    client_id === `nayaab`
                      ? response.data.walletAddresses.nearAddress
                      : response.data.walletAddresses.ethAddress,
                });
                deleteToken(LocalStorageVariables.METAWHITELIST);
                sendMessageToParent(IframeMessageType.close);
              }
            } catch (error) {
              setLoading(false);
              const errorMssg = translate(`WHITELISTING_FAILED`);
              handleErrorMessage(error, errorMssg);
            }
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
                response.data.additionalParamRequired === null ||
                Object.keys(response.data.additionalParamRequired).length === 0
              ) {
                router.push(Pages.HOME);
              }
            }
          }
        }
      } else {
        setLoading(false);
        setInCorrectPin(true);
        setAttemptRemaining((prevState) => prevState - 1);
      }
    } catch (error) {
      setLoading(false);
      setInCorrectPin(true);
      setAttemptRemaining((prevState) => prevState - 1);
      handleErrorMessage(error);
    }
  };

  useEffect(() => {
    if (attemptRemaining === 0) {
      return handleScreen(AuthenticationScreen.incorrectPin);
    }
    return;
  }, [attemptRemaining === 0]);

  useEffect(() => {
    if (pin.length < 4 && incorrectPin) {
      setInCorrectPin(false);
    }
  }, [pin]);

  useEffect(() => {
    window.addEventListener(`message`, function (e) {
      if (e.data.status === `success`) {
        setIsWhitelistApiCalled(false);
        setWhitelistingSheetStatus({
          open: true,
          message: e.data.message,
          address: e.data.wallet_address,
        });
      } else if (e.data.status === `fail`) {
        generateToast({
          content: e.data.error_message,
          type: ToastType.ERROR,
        });
        handleScreen(AuthenticationScreen.authMain);
        setIsWhitelistApiCalled(false);
      }
    });
  }, []);

  const onKeyPressHandler = (event: KeyboardEvent) => {
    if (event.key === `Enter` && pin.length === 4) {
      onLogin();
    }
  };

  return (
    <Fragment>
      {whitelistingSheetStatus.open && isPopUp ? (
        <WhitelistSuccess
          walletType="Metasky"
          message={whitelistingSheetStatus.message}
          address={whitelistingSheetStatus.address}
        />
      ) : whitelistingSheetStatus.open ? (
        <BottomSheet
          isOpen={whitelistingSheetStatus.open}
          addStyles={styles.bottomSheetHeight}
        >
          <WhitelistSuccess
            walletType="Metasky"
            message={whitelistingSheetStatus.message}
            address={whitelistingSheetStatus.address}
          />
        </BottomSheet>
      ) : (
        <HeaderWithButtonLayout
          ctaContent={
            <BottomFadeInAnimation addedStyle={styles.ctaContainer} delay={0.2}>
              <PrimaryButton
                addStyles={styles.button}
                disabled={pin.length < 4 || loading}
                onClick={() => {
                  amplitude.trackClick(CLICK.CONTINUE_PIN);
                  onLogin();
                }}
              >
                {!loading && <p>{translate(`CONTINUE`)}</p>}
                <span>{loading && <MLottie addStyles={styles.loader} />}</span>
              </PrimaryButton>
            </BottomFadeInAnimation>
          }
          title={translate(`LOG_IN`)}
        >
          <Fragment>
            <div
              css={[
                styles.accountContainer,
                mixins.flexJustifiedBetween,
                mixins.flexColumn,
              ]}
            >
              <BottomFadeInAnimation>
                <p css={styles.text}>{translate(`ENTER_PIN_DESCRIPTION`)}</p>
                <div css={styles.pinWrapper}>
                  <h4 css={styles.formLabel}>{translate(`ENTER_PIN`)}</h4>
                  <div css={styles.formGroup}>
                    <div css={styles.mobile}>
                      <MPinInput
                        length={4}
                        focus={true}
                        secret={true}
                        masked={true}
                        initialValue=""
                        onChange={verifyPin}
                        type="numeric"
                        inputMode="number"
                        style={styles.pinsContainer}
                        inputStyle={
                          incorrectPin
                            ? (styles.InvalidPinStyle as React.CSSProperties)
                            : (styles.pinStyle as React.CSSProperties)
                        }
                        inputFocusStyle={{
                          border: `3px solid ${colors.Primary_Blue}`,
                          WebkitAppearance: `none`,
                        }}
                        onKeyPress={onKeyPressHandler}
                      />
                    </div>
                  </div>
                  <div
                    css={[
                      styles.textRight,
                      incorrectPin
                        ? mixins.flexAlignCenterJustifiedBetween
                        : mixins.flexJustifiedEnd,
                    ]}
                  >
                    {incorrectPin && (
                      <div css={styles.errorEnable}>
                        <p>
                          {translate(`INCORRECT_PIN`)} - {attemptRemaining}
                          {` `}
                          {translate(`ATTEMPTS_LEFT`)}
                        </p>
                      </div>
                    )}
                    <button
                      css={[styles.forgotLink]}
                      onClick={() => {
                        amplitude.trackClick(CLICK.FORGET_PIN);
                        handleForgetPin();
                      }}
                    >
                      {translate(`FORGOT_PIN`)}?
                    </button>
                  </div>
                </div>
              </BottomFadeInAnimation>

              <FullScreenKiteLoader isOpen={isWhitelistApiCalled}>
                {translate(`LOADING`)} ..
              </FullScreenKiteLoader>
            </div>
          </Fragment>
        </HeaderWithButtonLayout>
      )}
    </Fragment>
  );
};

export default CreateAccount;
