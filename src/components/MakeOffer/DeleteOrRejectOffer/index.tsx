import { FC, useEffect } from 'react';
import * as styles from './styles';
import { motion } from 'framer-motion';
import { colors, mixins, typography, utils } from '@styles/shared';
import { SecondaryButton } from '@components/Shared';
import { useTranslate } from '@utils/useTranslate';
import HeaderWithButtonLayout from '@components/Shared/HeaderWithButtonLayout';
import { useAnalytics } from '@utils/useAnalytics';
import { CLICK, EVENT_PAGE } from '@constants/analytics';

interface DeleteOrRejectOfferProps {
  onSuccess: () => void;
  onCancel: () => void;
  onBack?: () => void;
  price: number;
  collectionName: string;
  title: string;
  buttonTitle: string;
  actionIcon: string;
  actionInfo: string;
  subtitle?: string;
  componentType: string;
  auction_uuid: string;
  amount: string;
  currency: string;
  nft_name?: string;
}

const DeleteOrRejectOffer: FC<DeleteOrRejectOfferProps> = ({
  onSuccess,
  onCancel,
  price,
  collectionName,
  title,
  subtitle,
  buttonTitle,
  actionIcon,
  actionInfo,
  componentType,
  auction_uuid,
  amount,
  currency,
  onBack,
  nft_name,
}) => {
  const { translate } = useTranslate();
  const { trackPage, trackClick } = useAnalytics();

  useEffect(() => {
    if (componentType === `REJECT`) {
      trackPage(EVENT_PAGE.REJECT_OFFER, {
        auction_uuid,
        amount,
        currency,
        nft_name,
      });
    } else {
      trackPage(EVENT_PAGE.DELETE_OFFER, {
        auction_uuid,
        amount,
        currency,
        nft_name,
      });
    }
  }, []);
  const logRejectDeleteClick = () => {
    componentType === `REJECT`
      ? trackClick(CLICK.YES_REJECT, {
          auction_uuid,
          amount,
          currency,
          nft_name,
        })
      : trackClick(CLICK.YES_DELETE, {
          auction_uuid,
          amount,
          currency,
          nft_name,
        });
  };
  return (
    <HeaderWithButtonLayout
      onBack={onBack}
      onClose={onCancel}
      ctaContent={
        <section
          css={[
            mixins.flexAlignCenterJustifiedBetween,
            utils.widthPercent(100),
          ]}
        >
          {/* <SecondaryButton addStyles={styles.cancelbutton} onClick={onCancel}>
          {translate(`CANCEL`)}
        </SecondaryButton> */}
          <SecondaryButton
            addStyles={styles.cancelbutton}
            onClick={() => {
              onSuccess();
              logRejectDeleteClick();
            }}
          >
            {buttonTitle}
          </SecondaryButton>
        </section>
      }
    >
      <section
        css={[
          mixins.flexColumn,
          mixins.flexAlignCenterJustifiedBetween,
          utils.heightPercent(100),
        ]}
      >
        <div>
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
              src={actionIcon}
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
              {title}
            </h2>
            <p
              css={[
                typography.T_16_Semibold,
                {
                  color: colors.Secondary_Black_Text,
                },
                utils.mb(30),
              ]}
            >
              {subtitle}
            </p>
            <p
              css={[
                typography.T_16_Regular,
                {
                  color: colors.Secondary_Black_Text,
                },
                utils.mb(24),
                utils.pl(45),
                utils.pr(45),
              ]}
            >
              {actionInfo}
              {` `}
              <span css={[typography.T_16_Semibold]}>₹{price}</span>
              {` `}
              {translate(`FOR`)}
              {` `}
              <span css={[typography.T_16_Semibold]}>{collectionName}</span>
            </p>
          </motion.div>
        </div>
      </section>
    </HeaderWithButtonLayout>
  );
};

export default DeleteOrRejectOffer;
