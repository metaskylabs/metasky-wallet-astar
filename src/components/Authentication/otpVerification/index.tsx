import { FC, ReactText, useEffect, useState } from 'react';
import * as styles from './styles';
import AssetsImg from '@public/images';
import { AuthenticationScreen } from '@constants/authentication';
import {
  forgotPinVerifyOtp,
  loginUserByEmailVerifyOtp,
  loginUserByPhoneVerifyOtp,
} from '@actions/auth';
import { mixins } from '@styles/shared';
import {
  BottomFadeInAnimation,
  MLottie,
  MPinInput,
  PrimaryButton,
} from '@components/Shared';
import { handleErrorMessage } from '@utils/handleResponseToast';
import { RecoveryStatus, WhitelistRefType } from '@typings/api/auth';
import { updateDemography } from '@actions/profile';
import { useRouter } from 'next/router';
import { useTranslate } from '@utils/useTranslate';
import HeaderWithButtonLayout from '@components/Shared/HeaderWithButtonLayout';
import { useAnalytics } from '@utils/useAnalytics';
import { CLICK, EVENT_PAGE } from '@constants/analytics';
import { APIStatusType } from '@typings/api/wrapper';
import { useDispatch } from 'react-redux';
import { setAccessTokenCookie, setRefreshTokenCookie } from '@utils/cookie';

interface OtpVerificationProps {
  mobileNo: string;
  handleScreen: (screeName: AuthenticationScreen) => void;
  setRecoveryStatus: (recoveryStatus: RecoveryStatus) => void;
  resendOtp: (mobileNo: string) => void;
  isForgetFlow?: boolean;
  resendOtpForForgetPin: () => void;
  authType: WhitelistRefType;
  emailID?: string;
  name?: string;
  city?: string;
  handleUserBlockerDetails?: boolean;
  setUserBlockerDetails?: any;
  onDemographyUpdateSuccess?: () => void;
}

const OtpVerification: FC<OtpVerificationProps> = ({
  mobileNo,
  resendOtp,
  handleScreen,
  setRecoveryStatus,
  isForgetFlow,
  resendOtpForForgetPin,
  authType,
  emailID,
  name,
  city,
  handleUserBlockerDetails,
  setUserBlockerDetails,
  onDemographyUpdateSuccess,
}) => {
  const [error, setError] = useState({ attemptsLeft: 3, isVisible: true });
  const [pin, setPin] = useState<string>(``);
  const [pinInValid, setPinInValid] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [attemptRemaining, setAttemptRemaining] = useState<number>(3);
  const router = useRouter();
  const dispatch = useDispatch();

  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(0);

  const { translate } = useTranslate();

  const amplitude = useAnalytics();

  useEffect(() => {
    const myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(myInterval);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  useEffect(() => {
    amplitude.trackPage(EVENT_PAGE.OTP_VEERIFICATION);
  }, []);

  const verifyPin = (verificationPin: ReactText) => {
    const pin = verificationPin as string;
    // console.log(pin);
    setPin(pin);
  };

  const verifyOtpByEmail = async () => {
    try {
      setLoading(true);
      const payload = {
        otp: pin,
      };

      const response = await forgotPinVerifyOtp(payload);
      setPinInValid(false);
      setLoading(false);
      if (response.data.accessToken) {
        setAccessTokenCookie(response.data.accessToken);
        handleScreen(AuthenticationScreen.createPin);
      }
    } catch (error) {
      handleErrorMessage(error);
      setPinInValid(true);
      setLoading(false);
      setAttemptRemaining((prevState) => prevState - 1);
    }
  };

  const verifyOtpByPhone = async () => {
    try {
      setLoading(true);
      const payload = {
        ph_no: mobileNo.trim(),
        otp: pin,
        referral_code: (router.query.referral_code as string) || ``,
      };
      const response = await loginUserByPhoneVerifyOtp(payload);
      // console.log(`token`, response);

      if (
        response.status === APIStatusType.SUCCESS &&
        response.data.refreshToken
      ) {
        setRefreshTokenCookie(response.data.refreshToken);
      }
      if (
        response.status === APIStatusType.SUCCESS &&
        response.data.pin_exists
      ) {
        setPinInValid(false);
        setLoading(false);
        setRecoveryStatus({
          recoveryModeEnabled: response.data.recovery_mode_enabled,
          preferredRecoveryMode: response.data.preferred_recovery_mode,
        });
        handleScreen(AuthenticationScreen.createAccount);
      } else {
        setLoading(false);
        handleScreen(AuthenticationScreen.createPin);
      }
    } catch (error) {
      handleErrorMessage(error);
      setPinInValid(true);
      setLoading(false);
      setAttemptRemaining((prevState) => prevState - 1);
    }
  };

  const verifyEmail = async () => {
    if (handleUserBlockerDetails) {
      try {
        const payload = {
          name: name || undefined,
          email: emailID || undefined,
          city: city || undefined,
          otp: pin,
        };
        const response = await updateDemography(payload);
        if (response && onDemographyUpdateSuccess) {
          onDemographyUpdateSuccess();
          // router.push(Pages.HOME);
        }
      } catch (error) {
        handleErrorMessage(error);
      }
    } else {
      try {
        setLoading(true);
        const payload = {
          email: emailID && emailID.trim(),
          otp: pin,
          referral_code: (router.query.referral_code as string) || ``,
        };
        const response = await loginUserByEmailVerifyOtp(payload);

        if (
          response.status === APIStatusType.SUCCESS &&
          response.data.refreshToken
        ) {
          setRefreshTokenCookie(response.data.refreshToken);
        }
        if (
          response.status === APIStatusType.SUCCESS &&
          response.data.pin_exists
        ) {
          setPinInValid(false);
          setLoading(false);
          setRecoveryStatus({
            recoveryModeEnabled: response.data.recovery_mode_enabled,
            preferredRecoveryMode: response.data.preferred_recovery_mode,
          });
          handleScreen(AuthenticationScreen.createAccount);
        } else {
          setLoading(false);
          handleScreen(AuthenticationScreen.createPin);
        }
      } catch (error) {
        handleErrorMessage(error);
        setPinInValid(true);
        setLoading(false);
        setAttemptRemaining((prevState) => prevState - 1);
      }
    }
  };

  const resendOtpHandler = async () => {
    setAttemptRemaining(3);
    setPinInValid(false);
    if (isForgetFlow) {
      resendOtpForForgetPin();
    } else {
      if (authType === WhitelistRefType.EMAIL && emailID) {
        resendOtp(emailID);
      } else {
        resendOtp(mobileNo);
      }
    }
    setMinutes(1);
    setSeconds(0);
  };

  useEffect(() => {
    if (attemptRemaining === 0) {
      return handleScreen(AuthenticationScreen.incorrectPin);
    }
    return;
  }, [attemptRemaining === 0]);

  useEffect(() => {
    if (pin.length < 6 && pinInValid) {
      setPinInValid(false);
    }
  }, [pin]);

  const onKeyPressHandler = (event: KeyboardEvent) => {
    if (event.key === `Enter` && pin.length === 6) {
      if (isForgetFlow) {
        verifyOtpByEmail();
      } else if (authType === WhitelistRefType.EMAIL) {
        verifyEmail();
      } else {
        verifyOtpByPhone();
      }
    }
  };

  return (
    <HeaderWithButtonLayout
      ctaContent={
        <BottomFadeInAnimation addedStyle={styles.ctaContainer} delay={0.3}>
          <PrimaryButton
            addStyles={styles.button}
            onClick={() => {
              amplitude.trackClick(CLICK.VALIDATE_CODE);
              isForgetFlow
                ? verifyOtpByEmail()
                : authType === WhitelistRefType.EMAIL
                ? verifyEmail()
                : verifyOtpByPhone();
            }}
            disabled={pin.length < 6 || loading}
          >
            {!loading && <p>{translate(`VALIDATE_CODE`)}</p>}
            <span>{loading && <MLottie addStyles={styles.loader} />}</span>
          </PrimaryButton>
        </BottomFadeInAnimation>
      }
      title={translate(`VERIFY_CODE`)}
    >
      <div css={[mixins.flexColumn, mixins.flexJustifiedBetween]}>
        <BottomFadeInAnimation delay={0.2}>
          <h4 css={styles.formLabel}>
            {`${translate(`ENTER_VERIFICATION_CODE_SENT_TO`)} `}
            {emailID || mobileNo}
          </h4>
          <div css={styles.formGroup}>
            <div css={styles.mobile}>
              <MPinInput
                length={6}
                focus={true}
                initialValue={pin}
                onChange={verifyPin}
                type="numeric"
                inputMode="number"
                style={styles.pinsContainer}
                inputStyle={
                  pinInValid
                    ? (styles.InvalidPinStyle as React.CSSProperties)
                    : (styles.pinStyle as React.CSSProperties)
                }
                inputFocusStyle={{
                  border: `3px solid #4969F9`,
                  WebkitAppearance: `none`,
                }}
                onKeyPress={onKeyPressHandler}
              />
            </div>
          </div>
          {pinInValid && (
            <div
              css={error.isVisible ? styles.errorEnable : styles.errorDisable}
            >
              <p>
                {translate(`INCORRECT_CODE`)} - {attemptRemaining}
                {` `}
                {translate(`ATTEMPTS_LEFT`)}
              </p>
            </div>
          )}
          <div css={styles.remaining}>
            <div css={styles.time}>
              <span css={styles.timeIcon}>
                <img src={AssetsImg.ic_clock.src} alt="Close" />
              </span>
              <span css={styles.timerContainer}>
                {minutes < 10 ? `0${minutes}` : minutes}:
                {seconds < 10 ? `0${seconds}` : seconds}
              </span>
            </div>
            <button
              css={[
                styles.link,
                seconds === 0 && minutes === 0
                  ? styles.resendOtpEnabled
                  : styles.resendOtpDisable,
              ]}
              type="button"
              onClick={() => {
                resendOtpHandler();
                amplitude.trackClick(CLICK.RESEND_CODE);
              }}
              disabled={seconds === 0 && minutes === 0 ? false : true}
            >
              {translate(`RESEND_CODE`)}
            </button>
          </div>
        </BottomFadeInAnimation>
      </div>
    </HeaderWithButtonLayout>
  );
};

export default OtpVerification;
