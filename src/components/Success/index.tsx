import { FC, Fragment, useEffect } from 'react';
import * as styles from './styles';
import AssetsImg from '@public/images';
import { PrimaryButton } from '../Shared';
import { utils } from '@styles/shared';
import HeaderWithButtonLayout from '@components/Shared/HeaderWithButtonLayout';
import { useAnalytics } from '@utils/useAnalytics';
import { EVENT_PAGE } from '@constants/analytics';

interface Props {
  title: string;
  subTitle?: string;
  smallIcon?: boolean;
  ellipse?: boolean;
  ctaText?: string;
  ctaClick?: () => void;
  isFailed?: boolean;
  avatar?: string | undefined;
  nft_uuid?: string;
  listing_price?: string;
  currency?: string;
  order_uuid?: string;
  nft_name?: string;
}
const Success: FC<Props> = ({
  title,
  smallIcon,
  ellipse,
  subTitle,
  ctaText,
  ctaClick,
  isFailed,
  avatar,
  nft_uuid,
  listing_price,
  currency,
  order_uuid,
  nft_name,
}) => {
  const { trackPage, trackClick } = useAnalytics();
  useEffect(() => {
    trackPage(EVENT_PAGE.PROCEED_TO_PAYMENT, {
      nft_uuid,
      listing_price,
      currency,
      order_uuid,
      nft_name,
    });
  }, []);
  return (
    <Fragment>
      <HeaderWithButtonLayout
        ctaContent={
          ctaText &&
          ctaClick && (
            <div css={styles.ctaContainer}>
              <PrimaryButton
                addStyles={styles.primaryButton}
                onClick={() => {
                  ctaClick();
                  trackClick(`${ctaText}`, {
                    nft_uuid,
                    listing_price,
                    currency,
                    order_uuid,
                    nft_name,
                  });
                }}
              >
                {ctaText}
              </PrimaryButton>
            </div>
          )
        }
      >
        <div css={[styles.container, ellipse && styles.ellipse]}>
          <div
            css={[
              styles.successIcon,
              smallIcon && {
                width: utils.remConverter(93.5),
                height: utils.remConverter(94.7),
              },
            ]}
          >
            <img
              src={
                isFailed
                  ? AssetsImg.ic_failed.src
                  : avatar
                  ? avatar
                  : AssetsImg.ic_success.src
              }
              alt="success"
              width="100%"
              height="100%"
            />
          </div>
        </div>
        <div css={styles.successContentWrapper}>
          <h2 css={styles.successTitle}>{title}</h2>
          <div css={styles.successInfo}>
            <span css={styles.successDescription}>{subTitle}</span>
          </div>
        </div>
      </HeaderWithButtonLayout>
    </Fragment>
  );
};

export default Success;
