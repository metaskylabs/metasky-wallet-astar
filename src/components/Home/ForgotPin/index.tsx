import * as styles from '@styles/Modules/forgot-pin';
import { MLottie, MPinInput, PrimaryButton } from '@components/Shared';
import { FC, Fragment, ReactText, useEffect, useState } from 'react';
import AssetsImg from '@public/images';
import { useRouter } from 'next/router';
import ConfirmedPin from '@components/Profile/ConfirmedPin';
import {
  loginUserByEmailSendOtp,
  loginUserByEmailVerifyOtp,
  loginUserByPhoneSendOtp,
  loginUserByPhoneVerifyOtp,
  resetPin,
} from '@actions/auth';
import { Pages } from '@utils/navigation';
import { handleErrorMessage } from '@utils/handleResponseToast';
import generateToast from '@components/Shared/GenerateToast';
import { ToastType } from '@components/Shared/Toast';
import { motion } from 'framer-motion';
import { useTranslate } from '@utils/useTranslate';
import { useAnalytics } from '@utils/useAnalytics';
import { CLICK, EVENT_PAGE } from '@constants/analytics';
import { useUserSession } from '@utils/hooks/useUserSession';
import { trackClick } from '@utils/analytics';
import { APIStatusType } from '@typings/api/wrapper';

const ForgetPin: FC = () => {
  const router = useRouter();

  const { trackPage } = useAnalytics();

  useEffect(() => {
    trackPage(EVENT_PAGE.FORGET_PIN);
  }, []);

  const { isLoggedIn, email, phone_number } = useUserSession();
  let contactNumber;
  let contactEmail;
  if (isLoggedIn) {
    contactNumber = phone_number;
    contactEmail = email;
  }

  const [step, setStep] = useState(1);

  const handleNext = () => {
    setStep(step + 1);
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  return (
    <Fragment>
      {step == 1 && (contactNumber || contactEmail) && (
        <Otp
          nextStep={handleNext}
          contactNumber={contactNumber}
          contactEmail={contactEmail}
        />
      )}
      {step == 2 && (
        <NewPin previousStep={handlePrevious} nextStep={handleNext} />
      )}
      {step == 3 && <ConfirmedPin />}
    </Fragment>
  );
};

interface OtpProps {
  nextStep: () => void;
  contactNumber?: string;
  contactEmail?: string;
}

const Otp: FC<OtpProps> = ({ nextStep, contactNumber, contactEmail }) => {
  const { translate } = useTranslate();
  const [error, setError] = useState({ attemptsLeft: 3, isVisible: true });
  const [pin, setPin] = useState<string>(``);
  const [pinInValid, setPinInValid] = useState<boolean>(false);
  const [attemptRemaining, setAttemptRemaining] = useState<number>(3);
  const router = useRouter();

  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(0);
  const [loading, setLoading] = useState<boolean>(false);

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

  const verifyPin = (verificationPin: ReactText) => {
    const pin = verificationPin as string;
    setPin(pin);
  };

  const verfyOtp = async () => {
    try {
      setLoading(true);
      const response = contactNumber
        ? await loginUserByPhoneVerifyOtp({
            ph_no: contactNumber,
            otp: pin,
            referral_code: (router.query.referral_code as string) || ``,
          })
        : contactEmail &&
          (await loginUserByEmailVerifyOtp({
            email: contactEmail,
            otp: pin,
          }));

      if (response && response.status === APIStatusType.SUCCESS) {
        setPinInValid(false);
        setLoading(false);
        nextStep();
      }
    } catch (error) {
      handleErrorMessage(error);
      setPinInValid(true);
      setLoading(false);
      setAttemptRemaining((prevState) => prevState - 1);
    }
  };

  const resendOtpHandler = async (): Promise<void> => {
    setAttemptRemaining(3);
    setPinInValid(false);
    try {
      if (contactNumber) {
        const response = await loginUserByPhoneSendOtp({
          ph_no: contactNumber,
        });
        if (response.status === APIStatusType.SUCCESS) {
          setMinutes(1);
        }
      } else if (contactEmail) {
        const response = await loginUserByEmailSendOtp({ email: contactEmail });
        if (response.status === APIStatusType.SUCCESS) {
          setMinutes(1);
        }
      }
    } catch (error) {
      handleErrorMessage(error);
    }
  };
  const { trackClick } = useAnalytics();

  const pinStyle: any = pinInValid
    ? (styles.InvalidPinOtpStyle as React.CSSProperties)
    : (styles.pinOtpStyle as React.CSSProperties);

  useEffect(() => {
    if (pin.length < 6 && pinInValid) {
      setPinInValid(false);
    }
  }, [pin]);

  return (
    <Fragment>
      <motion.div
        css={styles.form}
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.2,
          default: { duration: 0.3 },
          ease: `easeIn`,
        }}
      >
        <div>
          <p css={styles.otpDescription}>
            {translate(`CODE_VERIFICATION_DESCRIPTION`)}
            <p css={styles.labelValue}>
              {contactNumber ? contactNumber : contactEmail}
            </p>
          </p>
        </div>
        <h4 css={styles.formLabel}>{translate(`ENTER_CODE`)}</h4>
        <div css={styles.formGroup}>
          <div css={styles.mobile}>
            <MPinInput
              length={6}
              focus={true}
              initialValue=""
              onChange={verifyPin}
              type="numeric"
              inputMode="number"
              style={styles.pinsContainer}
              inputStyle={pinStyle}
              inputFocusStyle={{
                border: `3px solid #4969F9`,
                WebkitAppearance: `none`,
              }}
            />
          </div>
        </div>
        {pinInValid && (
          <div css={error.isVisible ? styles.errorEnable : styles.errorDisable}>
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
            type="button"
            css={[
              styles.link,
              seconds === 0 && minutes === 0
                ? styles.resendOtpEnabled
                : styles.resendOtpDisable,
            ]}
            onClick={() => {
              trackClick(CLICK.RESEND_CODE);
              resendOtpHandler();
            }}
            disabled={seconds === 0 && minutes === 0 ? false : true}
          >
            {translate(`RESEND_CODE`)}
          </button>
        </div>
      </motion.div>
      <motion.div
        css={styles.buttonContainer}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          default: { duration: 0.3 },
          ease: `easeIn`,
        }}
      >
        <PrimaryButton
          addStyles={styles.button}
          onClick={() => {
            trackClick(CLICK.VALIDATE_CODE);
            verfyOtp();
          }}
          disabled={pin.length < 6 || loading}
        >
          {!loading && translate(`VALIDATE_CODE`)}
          <span>{loading && <MLottie addStyles={styles.loader} />}</span>
        </PrimaryButton>
      </motion.div>
    </Fragment>
  );
};
interface NewPinProps {
  previousStep: () => void;
  nextStep: () => void;
}

const NewPin: FC<NewPinProps> = ({ previousStep, nextStep }) => {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(``);
  const [testPin, setTestPin] = useState(`default`);

  const [notMatched, setNotMatched] = useState(false);
  const [pin, setCreatePin] = useState<string>(``);
  const [pinInValid, setPinInValid] = useState<boolean>(false);
  const [isMatched, setIsMatched] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);

  const [confirmSetPin, setConfirmPin] = useState<string>(``);
  const router = useRouter();
  const { translate } = useTranslate();
  const { trackClick } = useAnalytics();

  const verifyPin = (verificationPin: ReactText) => {
    const pin = verificationPin as string;
    setCreatePin(pin);
  };

  const setPin = async (pin: string): Promise<void> => {
    try {
      setIsLoading(true);
      const response = await resetPin({ pin: pin });
      if (response) {
        setIsLoading(false);
        nextStep();
      } else {
        setIsLoading(false);
        generateToast({
          content: `Something went wrong, please try again later`,
          type: ToastType.ERROR,
        });
      }
    } catch (error) {
      setIsLoading(false);
      handleErrorMessage(error);
    }
  };

  const confirmPin = (verificationPin: ReactText) => {
    const confirmPin = verificationPin as string;
    setConfirmPin(confirmPin);
    if (confirmPin.length === 4) {
      if (pin === confirmSetPin) {
        setPinInValid(false);
        setIsMatched(true);
      } else {
        setPinInValid(true);
        setIsMatched(false);
      }
    }
  };

  const createPin = async () => {
    if (confirmSetPin.length === 4 && pin.length === 4) {
      if (pin !== confirmSetPin) {
        generateToast({
          content: translate(`PIN_ERROR`),
          type: ToastType.ERROR,
        });
      } else {
        setPin(pin);
      }
    } else {
      generateToast({
        content: `Please enter valid pin`,
        type: ToastType.INFO,
      });
    }
  };

  useEffect(() => {
    if (confirmSetPin.length === 4) {
      if (pin === confirmSetPin) {
        setTestPin(`success`);
        setPinInValid(false);
        setIsMatched(true);
      } else {
        setTestPin(`error`);
        setPinInValid(true);
        setIsMatched(false);
      }
    } else {
      setTestPin(`default`);
      setErrorMessage(``);
    }
  }, [confirmSetPin, pin]);

  return (
    <Fragment>
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.2,
          default: { duration: 0.3 },
          ease: `easeIn`,
        }}
      >
        <h4 css={styles.title}>{translate(`SET_NEW_PIN`)}</h4>
        <div css={styles.inputContainer}>
          <div css={styles.mobile}>
            <MPinInput
              length={4}
              focus={true}
              initialValue=""
              onChange={verifyPin}
              type="numeric"
              inputMode="number"
              style={styles.pinsContainer}
              inputStyle={styles.pinStyle as any}
              inputFocusStyle={{
                border: `3px solid #4969F9`,
                WebkitAppearance: `none`,
              }}
            />
          </div>
        </div>
        <h4 css={styles.title}>{translate(`CONFIRM_NEW_PIN`)}</h4>
        <div css={styles.inputContainer}>
          <div css={styles.mobile}>
            <MPinInput
              length={4}
              initialValue=""
              onChange={confirmPin}
              type="numeric"
              inputMode="number"
              style={styles.pinsContainer}
              inputStyle={
                testPin === `default`
                  ? (styles.pinStyle as any)
                  : pinInValid === true
                  ? (styles.InvalidPinStyle as any)
                  : (styles.successPinStyle as any)
              }
              inputFocusStyle={{
                border: `3px solid #4969F9`,
                WebkitAppearance: `none`,
              }}
            />
          </div>
        </div>
      </motion.div>
      {(notMatched || pinInValid) && (
        <motion.div
          css={error ? styles.errorEnable : styles.errorDisable}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.1,
            default: { duration: 0.3 },
            ease: `easeIn`,
          }}
        >
          <p>{errorMessage} </p>
        </motion.div>
      )}
      <motion.div
        css={styles.buttonContainer}
        initial={{ opacity: 0, y: 70 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          default: { duration: 0.3 },
          ease: `easeIn`,
        }}
      >
        <PrimaryButton
          addStyles={styles.button}
          onClick={() => {
            trackClick(CLICK.SET_NEW_PIN);
            createPin();
          }}
        >
          {!isLoading && translate(`SET_NEW_PIN`)}
          <span>{isLoading && <MLottie addStyles={styles.loader} />}</span>
        </PrimaryButton>
      </motion.div>
    </Fragment>
  );
};

export default ForgetPin;
