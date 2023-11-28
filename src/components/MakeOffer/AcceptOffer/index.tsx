import { FC, useEffect, useState } from 'react';
import * as innerStyles from './styles';
import { makeAnOffer } from '@utils/constants';
import { colors, mixins, typography, utils } from '@styles/shared';
import { SwipeMainButton } from '@components/Shared';
import { limitDecimal } from '@utils/helper';
import { onlyNumber } from '@utils/regexes';
import TransactionDetails from '@components/Transaction/TransactionDetails';
import AssetsImg from '@public/images';
import InputOffer from '../InputOffer';
import { StoreState } from '@reducers';
import { useSelector } from 'react-redux';
import { State as MakeOfferState } from '@reducers/makeOffer';
import { useTranslate } from '@utils/useTranslate';
import HeaderWithButtonLayout from '@components/Shared/HeaderWithButtonLayout';
import { contentWrapper } from './styles';
import { useAnalytics } from '@utils/useAnalytics';
import { CLICK, EVENT_PAGE } from '@constants/analytics';

interface AcceptOfferProps {
  price: number;
  onSubmit: () => void;
  isFailed: boolean;
  setIsFailure: (value: boolean) => void;
  onBack: () => void;
  onClose: () => void;
}

const AcceptOffer: FC<AcceptOfferProps> = ({
  price,
  onSubmit,
  isFailed,
  setIsFailure,
  onBack,
  onClose,
}) => {
  const [amount, setAmount] = useState(`${price}`);
  const [currentNearValue, setCurrentPriceNearValue] = useState(0);
  const [amountReceived, setAmountReceived] = useState(0);
  const { previewOffer, offerDetails } = useSelector<
    StoreState,
    MakeOfferState
  >((state) => state.makeOffer);
  const { trackPage, trackClick } = useAnalytics();

  useEffect(() => {
    if (offerDetails?.conversion_factor.conversion_factor) {
      const near =
        parseFloat(offerDetails?.current_price) /
        offerDetails?.conversion_factor.conversion_factor;
      setCurrentPriceNearValue(near);
    }
  }, [offerDetails?.current_price]);

  const handleInputChange = (inputValue: string) => {
    if (inputValue === `` || inputValue === `-`) setAmount(``);
    if (
      onlyNumber.test(inputValue.toString()) &&
      parseInt(inputValue).toString().length <= 10
    ) {
      setAmount(limitDecimal(parseFloat(inputValue).toString(), 2));
    }
  };

  let platformFee = previewOffer?.commission_from_sale?.value
    ? (Number(amount) / 100) * Number(previewOffer?.commission_from_sale.value)
    : 0;

  platformFee = parseFloat(platformFee.toFixed(2));

  let royaltyFee = previewOffer?.royalty_from_sale?.value
    ? ((Number(amount) - platformFee) / 100) *
      Number(previewOffer?.royalty_from_sale?.value)
    : 0;

  royaltyFee = parseFloat(royaltyFee.toFixed(2));

  useEffect(() => {
    setAmountReceived(
      Number(amount) - Number(platformFee) - Number(royaltyFee),
    );
  }, [amount]);
  useEffect(() => {
    trackPage(EVENT_PAGE.UPDATE_PRICE, {
      auction_uuid: offerDetails?.auction_uuid,
      amount: offerDetails?.amount,
      currency: offerDetails?.currency,
    });
  }, []);
  const { translate } = useTranslate();
  console.log(offerDetails);
  return (
    <HeaderWithButtonLayout
      onClose={onClose}
      onBack={onBack}
      title={translate(`UPDATE_PRICE`)}
      ctaContent={
        <div css={utils.ctaContainer}>
          <SwipeMainButton
            resetMode={isFailed}
            onComplete={() => {
              trackClick(CLICK.UPDATE_PRICE, {
                auction_uuid: offerDetails?.auction_uuid,
                amount: offerDetails?.amount,
                currency: offerDetails?.currency,
              });
              onSubmit();
            }}
            setIsFailure={(status) => setIsFailure(status)}
            flow={translate(`Swipe to Update Price`)}
          />
        </div>
      }
    >
      <div css={innerStyles.contentWrapper}>
        <p
          css={[
            typography.T_14_Regular,
            {
              color: colors.Secondary_Black_Text,
            },
            utils.mb(16),
          ]}
        >
          {makeAnOffer.updateContent}
        </p>
        <article
          css={[innerStyles.nftCardDetailsContainer, mixins.flex, utils.mb(32)]}
        >
          <TransactionDetails
            image={offerDetails?.nft_data.image}
            title={offerDetails?.nft_data.name}
            hideStatus
            mediaType={`image`}
            currentPrice={`${offerDetails?.current_price} (${limitDecimal(
              currentNearValue.toString(),
              5,
            )} ${offerDetails?.conversion_factor.symbol})`}
          />
        </article>
        <p
          css={[
            typography.T_14_Bold,
            { color: colors.Secondary_Black_Text },
            utils.mb(7),
          ]}
        >
          {translate(`ACCEPT_OFFER`)}
        </p>
        <InputOffer
          amount={amount}
          handleInputChange={(e) => handleInputChange(e.target.value)}
          conversion_rate={previewOffer?.conversion_config.rate}
          conversionSymbol={
            previewOffer?.conversion_config.destination_currency
          }
          tooltip={`Rate: 1 ${previewOffer?.conversion_config.destination_currency} = ₹${previewOffer?.conversion_config.rate} . The rate will fluctuate based on the value of NEAR in the market.`}
          disabled={true}
        />
        <article
          css={[
            mixins.flexJustifiedBetween,
            innerStyles.notifyInfo,
            utils.mb(24),
          ]}
        >
          <div>
            <p
              css={[
                typography.T_14_Semibold,
                {
                  color: colors.Secondary_Black_Text,
                },
              ]}
            >
              {translate(`NOTIFY_BUYER_ABOUT_PRICE`)}
            </p>
            {/* <p css={[innerStyles.viewDetails]}>View Details</p> */}
          </div>
          <p
            css={[
              typography.T_16_Semibold,
              {
                color: colors.Secondary_Black_Text,
              },
            ]}
          >
            ~₹{limitDecimal(amountReceived.toString(), 5)}
          </p>
        </article>
      </div>
    </HeaderWithButtonLayout>
  );
};

export default AcceptOffer;
