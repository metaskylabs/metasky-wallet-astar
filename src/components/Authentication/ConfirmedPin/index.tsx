import { FC, Fragment } from 'react';
import * as styles from './styles';
import Image from 'next/image';
import AssetsImg from '@public/images';
import { useRouter } from 'next/router';
import { Pages } from '@utils/navigation';
import { PrimaryButton } from '@components/Shared';

interface ConfirmedPinProps {
  text?: string;
  status?: boolean;
}

const ConfirmedPin: FC<ConfirmedPinProps> = ({ text, status }) => {
  const router = useRouter();

  return (
    <div css={styles.textCenter}>
      <div css={styles.icon}>
        <img src={AssetsImg.i_authConfirmed.src} alt="Error" />
      </div>
      {status && (
        <>
          <h4 css={styles.title}>Wallet Connected</h4>
          <p css={styles.text}>{text}</p>
        </>
      )}
      {status === false && (
        <Fragment>
          <p css={styles.text}>{text}</p>
          <PrimaryButton
            onClick={() => router.push(Pages.LOGIN)}
            addStyles={styles.btnWidth}
          >
            Try Again
          </PrimaryButton>
        </Fragment>
      )}
    </div>
  );
};

export default ConfirmedPin;
