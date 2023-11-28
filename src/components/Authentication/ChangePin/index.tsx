import {
  BottomFadeInAnimation,
  MLottie,
  MPinInput,
  PrimaryButton,
} from '@components/Shared';
import * as styles from './styles';
import { FC, ReactText, useEffect, useState } from 'react';
import {
  loginUserByEmailSendOtp,
  loginUserByPhoneSendOtp,
  validatePin,
} from '@actions/auth';
import generateToast from '@components/Shared/GenerateToast';
import { ToastType } from '@components/Shared/Toast';
import { handleErrorMessage } from '@utils/handleResponseToast';
import { useAnalytics } from '@utils/useAnalytics';
import { CLICK, EVENT_PAGE } from '@constants/analytics';
import { APIStatusType } from '@typings/api/wrapper';
import { useUserSession } from '@utils/hooks/useUserSession';

interface ChangePinProps {
  nextStep?: () => void;
  setForgetPin: () => void;
}

const ChangePin: FC<ChangePinProps> = ({ nextStep, setForgetPin }) => {
  const [incorrectPin, setInCorrectPin] = useState(false);
  const [pin, setPin] = useState<string>(``);
  const [testPin, setTestPin] = useState(`default`);
  const [isLoading, setIsLoading] = useState(false);
  const { trackPage, trackClick } = useAnalytics();
  const { isLoggedIn, email, phone_number } = useUserSession();

  const onLogin = async () => {
    try {
      if (pin.length === 4) {
        setIsLoading(true);
        const payload = { pin: pin };
        const response = await validatePin(payload);
        if (
          response.status === APIStatusType.SUCCESS &&
          response.data.accessToken
        ) {
          setIsLoading(false);
          setInCorrectPin(false);
          setTestPin(`success`);
          if (nextStep) {
            nextStep();
          }
        } else {
          setInCorrectPin(true);
          setTestPin(`error`);
          setIsLoading(false);
        }
      } else {
        generateToast({
          content: `Please enter your PIN`,
          type: ToastType.INFO,
        });
      }
    } catch (error) {
      handleErrorMessage(error);
      setTestPin(`default`);
      setIsLoading(false);
    }
  };

  const verifyPin = (verificationPin: ReactText) => {
    const pin = verificationPin as string;
    setPin(pin);
  };

  const handleForgotPin = async () => {
    try {
      let contactNumber;
      let contactEmail;
      if (isLoggedIn) {
        contactNumber = phone_number;
        contactEmail = email;
      }
      if (contactNumber) {
        const payload = { ph_no: contactNumber };
        const response = await loginUserByPhoneSendOtp(payload);
        if (response.status === APIStatusType.SUCCESS) {
          setForgetPin();
        }
      } else if (contactEmail) {
        const payload = { email: contactEmail };
        const response = await loginUserByEmailSendOtp(payload);
        if (response.status === APIStatusType.SUCCESS) {
          setForgetPin();
        }
      }
    } catch (error) {
      handleErrorMessage(error);
    }
  };

  const pinStyle: any =
    testPin === `default`
      ? styles.pinStyle
      : incorrectPin === true
      ? styles.InvalidPinStyle
      : styles.successPinStyle;

  useEffect(() => {
    if (pin.length < 4 && incorrectPin) {
      setInCorrectPin(false);
      setTestPin(`default`);
    }
  }, [pin]);

  useEffect(() => {
    trackPage(EVENT_PAGE.CHANGE_PIN);
  }, []);

  return (
    <div css={styles.mainContainer}>
      <div>
        <BottomFadeInAnimation addedStyle={styles.formLabel} delay={0.2}>
          Enter PIN
        </BottomFadeInAnimation>
        <BottomFadeInAnimation addedStyle={styles.formGroup} delay={0.3}>
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
              inputStyle={pinStyle}
              inputFocusStyle={{
                border: `3px solid #4969F9`,
                WebkitAppearance: `none`,
              }}
            />
          </div>
        </BottomFadeInAnimation>
        <BottomFadeInAnimation
          addedStyle={styles.forgetPinContainer}
          delay={0.3}
        >
          <h2
            css={styles.forgetPinText}
            onClick={() => {
              trackClick(CLICK.FORGET_PIN);
              handleForgotPin();
            }}
          >
            Forgot PIN?
          </h2>
        </BottomFadeInAnimation>
      </div>
      <BottomFadeInAnimation addedStyle={styles.btnContainer}>
        <PrimaryButton
          addStyles={styles.btn}
          onClick={() => {
            trackClick(CLICK.CONTINUE_CHANGE_PIN);
            onLogin();
          }}
        >
          {!isLoading && `CONTINUE`}
          <span>{isLoading && <MLottie addStyles={styles.loader} />}</span>
        </PrimaryButton>
      </BottomFadeInAnimation>
    </div>
  );
};
export default ChangePin;
