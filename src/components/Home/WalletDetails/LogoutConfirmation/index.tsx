import { FC } from 'react';
import HeaderWithButtonLayout from '@components/Shared/HeaderWithButtonLayout';
import { PrimaryButton } from '@components/Shared';
import * as styles from './styles';
import AssetsImg from '@public/images';
import { useTranslate } from '@utils/useTranslate';
import { useAnalytics } from '@utils/useAnalytics';
import { CLICK } from '@constants/analytics';

interface LogoutConfirmationProps {
  onClose: () => void;
  onConfirmation: () => void;
}

const LogoutConfirmation: FC<LogoutConfirmationProps> = ({
  onClose,
  onConfirmation,
}) => {
  const { translate } = useTranslate();
  const amplitude = useAnalytics();

  return (
    <HeaderWithButtonLayout
      onClose={() => onClose()}
      ctaContent={
        <div css={styles.ctaContainer}>
          <PrimaryButton
            onClick={() => {
              amplitude.trackClick(CLICK.LOGOUT_CONFIRMED);
              onConfirmation();
            }}
          >
            {translate(`DISCONNECT`)}
          </PrimaryButton>
        </div>
      }
    >
      <div css={styles.wrapper}>
        <div css={styles.imgContainer}>
          <img css={styles.imgSize} src={AssetsImg.i_logoutConfirmation.src} />
        </div>
      </div>

      <div css={styles.title}>{translate(`LOGOUT_CONFIRMATION_TITLE`)}</div>
      <div css={styles.description}>
        {translate(`LOGOUT_CONFIRMATION_DESCRIPTION`)}
      </div>
    </HeaderWithButtonLayout>
  );
};

export default LogoutConfirmation;
