import { FC, Fragment, useEffect } from 'react';
import * as styles from './styles';
import Image from 'next/image';
import AssetsImg from '@public/images';
import { useRouter } from 'next/router';
import { Pages } from '@utils/navigation';

const EmailOtpVerification: FC = ({}) => {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push(Pages.HOME);
    }, 2000);
  });

  return (
    <Fragment>
      <div css={styles.textCenter}>
        <div css={styles.icon}>
          <img src={AssetsImg.ic_authEmailOtp.src} alt="Error" />
        </div>
        <h4 css={styles.title}>Code Verification</h4>
        <p css={styles.text}>
          A one-time safe link has been sent to{` `}
          <span css={styles.subText}>kanika.khurana@procreator.in</span>
        </p>
        <p css={styles.contactUs}>Resend Verification Link</p>
      </div>
    </Fragment>
  );
};

export default EmailOtpVerification;
