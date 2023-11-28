import * as styles from './styles';
import { Timer } from '@components/Shared';
import { FC, Fragment, useState } from 'react';
import Image from 'next/image';
import AssetsImg from '@public/images';
import { colors, typography } from '@styles/shared';

const OtpSent: FC = () => {
  const [resend, setResend] = useState(false);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(5);
  const handleTimeOut = () => {
    setResend(true);
  };
  const handleResendclick = () => {
    setResend(false);
    setMinutes(0);
    setSeconds(5);
  };
  return (
    <Fragment>
      <div css={styles.bottomSheetContainer}>
        <div css={styles.imgContainer}>
          <img src={AssetsImg.ic_verification.src} />
        </div>
        <div css={styles.textContainer}>
          <h2 css={styles.title}>Code Verification</h2>
          <p css={styles.otpSubtitle}>
            A one-time safe link has been sent to your registered email ID
          </p>
          <div css={styles.timerContainer}>
            <Timer minutesLeft={4} secondsLeft={30} onTimeOut={handleTimeOut} />
          </div>
          <h2
            css={resend ? styles.resendOtpText : styles.resendOtpTextDisabled}
            onClick={handleResendclick}
          >
            Resend Verification Link
          </h2>
        </div>
      </div>
    </Fragment>
  );
};

export default OtpSent;
