import { FC, useEffect, useState } from 'react';
import * as styles from './styles';
import { makeAnOffer } from '@utils/constants';
import { colors, mixins, typography, utils } from '@styles/shared';
import { SwipeMainButton } from '@components/Shared';
import InputOffer from '../InputOffer';
import { useTranslate } from '@utils/useTranslate';
import HeaderWithButtonLayout from '@components/Shared/HeaderWithButtonLayout';
import { head, label } from './styles';
import { useAnalytics } from '@utils/useAnalytics';
import { CLICK, EVENT_PAGE } from '@constants/analytics';

interface createOfferProps {
  minAmount: number;
  onCreate: any;
  isFailed: boolean;
  setIsFailure: (value: boolean) => void;
  offerAmount: string;
  setOfferAmount: any;
  conversionRate: number | undefined;
  conversionSymbol: string | undefined;
  onClose?: () => void;
  nft_uuid?: string;
  listing_uuid?: string;
  currency?: string;
  nft_name?: string;
}

const CreateOffer: FC<createOfferProps> = ({
  minAmount,
  onCreate,
  isFailed,
  setIsFailure,
  offerAmount,
  setOfferAmount,
  conversionRate,
  conversionSymbol,
  onClose,
  listing_uuid,
  nft_uuid,
  currency,
  nft_name,
}) => {
  const { translate } = useTranslate();
  const { trackPage, trackClick } = useAnalytics();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  useEffect(() => {
    trackPage(EVENT_PAGE.MAKE_AN_OFFER, { listing_uuid, nft_uuid, nft_name });
  }, []);

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };
  return (
    <HeaderWithButtonLayout
      ctaContent={
        <div css={utils.ctaContainer}>
          <SwipeMainButton
            resetMode={isFailed}
            onComplete={() => {
              trackClick(CLICK.SWIPE_TO_SEND_OFFER, {
                nft_uuid,
                listing_uuid,
                offer_amount: offerAmount,
                currency,
                nft_name,
              });
              onCreate();
            }}
            setIsFailure={(status) => setIsFailure(status)}
            flow={translate(`SWIPE_SEND_OFFER`)}
          />
        </div>
      }
      onClose={onClose}
      title={`Make an Offer`}
    >
      <section
        css={[
          utils.margin(16),
          styles.createOfferWrapper,
          mixins.flexColumn,
          mixins.flexAlignBaselineJustifiedBetween,
        ]}
      >
        <div>
          <p css={styles.label}>{translate(`ENTER_OFFER`)}</p>
          <h3 css={styles.head}>{translate(`ENTER_OFFER_AMOUNT`)}</h3>
          <InputOffer
            amount={offerAmount}
            handleDropdownToggle={handleDropdownToggle}
            dropdownOpen={dropdownOpen}
            handleInputChange={setOfferAmount}
            conversion_rate={conversionRate}
            conversionSymbol={conversionSymbol}
            tooltip={`${translate(
              `CURRENT_RATE`,
            )} ${conversionSymbol} = ₹${conversionRate} . ${translate(
              `CURRENT_RATE_DESCRIPTION`,
            )}`}
          />
          <article css={[styles.info, utils.mb(38)]}>
            <p
              css={[
                typography.T_14_Semibold,
                {
                  color: colors.Secondary_Black_Text,
                },
              ]}
            >
              {translate(`THIS_NEAR_CURRENCY`)}
            </p>
          </article>
        </div>
      </section>
    </HeaderWithButtonLayout>
  );
};

export default CreateOffer;
