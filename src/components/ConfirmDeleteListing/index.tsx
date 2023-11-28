import { FC, Fragment, useEffect } from 'react';
import * as styles from './styles';
import AssetsImg from '@public/images';
import { motion } from 'framer-motion';
import { mixins, typography, utils } from '@styles/shared';
import { PrimaryButton, SecondaryButton } from '@components/Shared';
import { useTranslate } from '@utils/useTranslate';
import ButtonLayout from '@components/HOC/ButtonLayout.tsx';
import { useAnalytics } from '@utils/useAnalytics';
import { CLICK, EVENT_PAGE } from '@constants/analytics';

interface DeleteListingProps {
  onCancel: () => void;
  nftName: string | undefined;
  onSuccess: () => void;
  listing_uuid: string;
  nft_uuid: string;
  currency: string;
  listing_price: string;
}

const ConfirmDeleteListing: FC<DeleteListingProps> = ({
  onCancel,
  nftName,
  onSuccess,
  listing_uuid,
  nft_uuid,
  currency,
  listing_price,
}) => {
  const { translate } = useTranslate();
  const { trackPage, trackClick } = useAnalytics();

  useEffect(() => {
    trackPage(EVENT_PAGE.DELETE_LISTING, {
      listing_uuid,
      nft_uuid,
      currency,
      listing_price,
      nft_name: nftName,
    });
  }, []);

  return (
    <ButtonLayout
      buttonComponent={
        <section
          css={[styles.buttonContainer, mixins.flexAlignCenterJustifiedBetween]}
        >
          <SecondaryButton
            addStyles={styles.cancelbutton}
            onClick={() => {
              trackClick(CLICK.CANCEL_DELETE_LISTING, {
                listing_uuid,
                nft_uuid,
                currency,
                listing_price,
                nft_name: nftName,
              });
              onCancel();
            }}
          >
            {translate(`CANCEL`)}
          </SecondaryButton>
          <PrimaryButton
            addStyles={styles.logoutButton}
            onClick={() => {
              trackClick(CLICK.YES_DELETE_LISTING, {
                listing_uuid,
                nft_uuid,
                currency,
                listing_price,
                nft_name: nftName,
              });
              onSuccess();
            }}
          >
            {translate(`YES_DELETE`)}
          </PrimaryButton>
        </section>
      }
    >
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
          src={AssetsImg.ic_trash.src}
          alt=""
          width="100%"
          height="100%"
          css={styles.commingSoonIcon}
        />
      </motion.div>
      <motion.div
        css={styles.successContentWrapper}
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.2,
          default: { duration: 0.5 },
          ease: `easeIn`,
        }}
      >
        <h2 css={styles.successTitle}>{translate(`DELETE_LISTING`)}</h2>
        <p css={[styles.successDescription, utils.mb(12)]}>
          {translate(`DELETE_LISTING_BOTTOM_SHEET_CONFIRMATION`)}
          {nftName && (
            <span css={typography.T_20_Bold}>
              {` `}
              {nftName}
              {` `}
            </span>
          )}
          {translate(`ASSET`)}?
        </p>
        <p css={[styles.successDescription, utils.mb(24)]}>
          {translate(`DELETE_LISTING_BOTTOM_SHEET_PAYMENT_MESSAGING`)}
        </p>
      </motion.div>
    </ButtonLayout>
  );
};

export default ConfirmDeleteListing;
