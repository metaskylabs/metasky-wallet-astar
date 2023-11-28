import { FC } from 'react';
import * as styles from '../DeleteOrRejectOffer/styles';
import { motion } from 'framer-motion';
import { colors, mixins, typography, utils } from '@styles/shared';
import { PrimaryButton, SecondaryButton } from '@components/Shared';
import AssetsImg from '@public/images';
import { useTranslate } from '@utils/useTranslate';
import HeaderWithButtonLayout from '@components/Shared/HeaderWithButtonLayout';

interface CancelTransactionProps {
  onSuccess: () => void;
  onCancel: () => void;
}

const CancelTransaction: FC<CancelTransactionProps> = ({
  onSuccess,
  onCancel,
}) => {
  const { translate } = useTranslate();
  return (
    <HeaderWithButtonLayout
      ctaContent={
        <section
          css={[styles.buttonContainer, mixins.flexAlignCenterJustifiedBetween]}
        >
          <SecondaryButton addStyles={styles.cancelbutton} onClick={onCancel}>
            {translate(`NO`)}
          </SecondaryButton>
          <PrimaryButton addStyles={styles.deleteButton} onClick={onSuccess}>
            {translate(`YES`)}
          </PrimaryButton>
        </section>
      }
    >
      <div css={styles.contentWrapper}>
        <motion.div
          css={[styles.iconContainer, mixins.flexAlignJustifiedCenter]}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.1,
            default: { duration: 0.5 },
            ease: `easeIn`,
          }}
        >
          <img
            src={AssetsImg.ic_failed.src}
            alt=""
            css={[utils.width(81), utils.height(82)]}
          />
        </motion.div>
        <motion.div
          css={[styles.successContentWrapper, utils.mb(60)]}
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.2,
            default: { duration: 0.5 },
            ease: `easeIn`,
          }}
        >
          <h2
            css={[
              typography.T_20_Bold,
              {
                color: colors.Secondary_Black_Text,
              },
              utils.mb(12),
            ]}
          >
            {translate(`CANCEL_TRANSACTION?`)}
          </h2>
          <p
            css={[
              typography.T_16_Regular,
              {
                color: colors.Secondary_Black_Text,
              },
              utils.mb(24),
              utils.pl(30),
              utils.pr(30),
            ]}
          >
            {translate(`TRANSACTION_CLOSE_SCREEN`)}
          </p>
        </motion.div>
      </div>
    </HeaderWithButtonLayout>
  );
};

export default CancelTransaction;
