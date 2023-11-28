import { FC, ReactText, useEffect, useState } from 'react';
import * as styles from './styles';
import Header from '@components/Shared/Header';
import { AuthenticationScreen } from '@constants/authentication';
import {
  BottomFadeInAnimation,
  MLottie,
  MPinInput,
  PrimaryButton,
} from '@components/Shared';
import { colors, mixins, utils } from '@styles/shared';
import { motion } from 'framer-motion';
import ButtonLayout from '@components/HOC/ButtonLayout.tsx';
import { Authentication } from '@utils/constants';
import { useTranslate } from '@utils/useTranslate';
import HeaderWithButtonLayout from '@components/Shared/HeaderWithButtonLayout';
import { useAnalytics } from '@utils/useAnalytics';
import { CLICK, EVENT_PAGE } from '@constants/analytics';

interface CreatePinProps {
  setPin: (pin: string) => void;
  handleScreen: (screeName: AuthenticationScreen) => void;
  loading?: boolean;
  noHeader?: boolean;
}

const CreatePin: FC<CreatePinProps> = ({
  setPin,
  handleScreen,
  loading,
  noHeader,
}) => {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(``);
  const [testPin, setTestPin] = useState(`default`);

  const [notMatched, setNotMatched] = useState(false);
  const [pin, setCreatePin] = useState<string>(``);
  const [pinInValid, setPinInValid] = useState<boolean>(false);
  const [isMatched, setIsMatched] = useState<boolean>(false);

  const [confirmSetPin, setConfirmPin] = useState<string>(``);
  const { translate } = useTranslate();
  const { trackPage, trackClick } = useAnalytics();

  useEffect(() => {
    trackPage(EVENT_PAGE.CREATE_PIN);
  }, []);

  const verifyPin = (verificationPin: ReactText) => {
    const pin = verificationPin as string;
    setCreatePin(pin);
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
    if (pin === ``) {
      setNotMatched(true);
      setErrorMessage(translate(`EMPTY_PIN_ERROR`));
    } else if (pin !== confirmSetPin) {
      setNotMatched(true);
      setErrorMessage(translate(`PIN_ERROR`));
    } else {
      setErrorMessage(``);
      setNotMatched(false);
      setPin(pin);
    }
  };

  useEffect(() => {
    if (confirmSetPin.length === 4) {
      if (pin === confirmSetPin) {
        setTestPin(`success`);
        setErrorMessage(``);
        setPinInValid(false);
        setIsMatched(true);
      } else {
        setTestPin(`error`);
        setErrorMessage(translate(`PIN_ERROR`));
        setPinInValid(true);
        setIsMatched(false);
      }
    } else {
      setTestPin(`default`);
      setErrorMessage(``);
    }
  }, [confirmSetPin, pin]);

  const pinStyle: any =
    testPin === `default`
      ? styles.pinStyle
      : pinInValid === true
      ? styles.InvalidPinStyle
      : styles.successPinStyle;

  const onKeyPressHandler = (event: KeyboardEvent) => {
    if (event.key === `Enter` && pin.length === 4) {
      createPin();
    }
  };

  return (
    <HeaderWithButtonLayout
      ctaContent={
        <BottomFadeInAnimation addedStyle={styles.ctaContainer} delay={0.2}>
          <PrimaryButton
            addStyles={styles.button}
            disabled={loading}
            onClick={() => {
              createPin();
              trackClick(CLICK.SET_PIN);
            }}
          >
            {!loading && <p>{translate(`SET_PIN`)}</p>}
            <span>{loading && <MLottie addStyles={styles.loader} />}</span>
          </PrimaryButton>
        </BottomFadeInAnimation>
      }
      title={!noHeader ? translate(Authentication.createPin.header) : undefined}
    >
      <div css={styles.createPinContainer}>
        <BottomFadeInAnimation>
          <p css={styles.text}>
            {translate(Authentication.createPin.description)}
          </p>
          <div css={styles.mb}>
            <h4 css={styles.formLabel}>
              {translate(Authentication.createPin.setPin)}
            </h4>
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
                  inputStyle={styles.pinStyle as React.CSSProperties}
                  inputFocusStyle={{
                    border: `3px solid ${colors.Primary_Blue}`,
                    WebkitAppearance: `none`,
                  }}
                />
              </div>
            </div>
            <h4 css={styles.formLabel}>
              {translate(Authentication.createPin.reEnterPin)}
            </h4>
            <div css={styles.formGroup}>
              <div css={styles.mobile}>
                <MPinInput
                  length={4}
                  secret={true}
                  masked={true}
                  initialValue=""
                  onChange={confirmPin}
                  type="numeric"
                  inputMode="number"
                  style={styles.pinsContainer}
                  inputStyle={pinStyle}
                  inputFocusStyle={{
                    border: `3px solid ${colors.Primary_Blue}`,
                    WebkitAppearance: `none`,
                  }}
                  onKeyPress={onKeyPressHandler}
                />
              </div>
            </div>
            {(notMatched || pinInValid) && (
              <div
                css={
                  notMatched || pinInValid
                    ? styles.errorEnable
                    : styles.errorDisable
                }
              >
                <aside>{errorMessage} </aside>
              </div>
            )}
          </div>
        </BottomFadeInAnimation>
      </div>
    </HeaderWithButtonLayout>
  );
};

export default CreatePin;
