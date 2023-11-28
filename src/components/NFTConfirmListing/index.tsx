import { FC, useEffect, useState } from 'react';
import { DividerLine, PrimaryButton } from '@components/Shared';
import TransactionDetails from '@components/Transaction/TransactionDetails';
import { mixins } from '@styles/shared';
import { limitDecimal } from '@utils/helper';
import * as styles from './styles';
import { motion } from 'framer-motion';
import AmountInput from './components/AmountInput';
import FeeDetailItem from './components/FeeDetailItem';
import { onlyNumber } from '@utils/regexes';
import { GetMarketplacePreviewResponse } from '@typings/api/marketplace';
import { trackClick } from '@utils/analytics';
import { CLICK, click, EVENT_PAGE } from '@constants/analytics';
import ButtonLayout from '@components/HOC/ButtonLayout.tsx';
import { useTranslate } from '@utils/useTranslate';
import { useAnalytics } from '@utils/useAnalytics';

interface NFTConfirmListingProps {
  onSubmit: (amount: number) => void;
  nftName: string;
  nftMediaType: string;
  nftQuantity: string;
  nftMediaLink: string;
  previewSaleResponse: Partial<GetMarketplacePreviewResponse>;
  price?: string;
  showUpdateDescription?: boolean;
}

function FeeDetailRow(props: { children: React.ReactNode }) {
  return <div css={styles.feeDetailRow}>{props.children}</div>;
}

const NFTConfirmListing: FC<NFTConfirmListingProps> = ({
  onSubmit,
  nftName,
  nftMediaType,
  nftQuantity,
  nftMediaLink,
  previewSaleResponse,
  price,
  showUpdateDescription,
}) => {
  const [amount, setAmount] = useState(price ? price : `0`);
  const [amountError, setAmountError] = useState(``);
  const { translate } = useTranslate();
  const amplitude = useAnalytics();
  useEffect(
    () =>
      amplitude.trackPage(EVENT_PAGE.SELL_FLOW, {
        name: nftName,
        quantity: nftQuantity,
        previewSaleResponse: previewSaleResponse,
      }),
    [],
  );

  const handleInputChange = (inputValue: string) => {
    if (inputValue === `` || inputValue === `-`) setAmount(``);
    if (
      onlyNumber.test(inputValue.toString()) &&
      parseInt(inputValue).toString().length <= 10
    ) {
      setAmount(limitDecimal(parseFloat(inputValue).toString(), 2));
    }
  };

  let platformFee = previewSaleResponse?.commission_from_sale?.value
    ? (Number(amount) / 100) * previewSaleResponse?.commission_from_sale?.value
    : // Number(null) equals 0
      0;

  platformFee = parseFloat(platformFee.toFixed(2));

  let royaltyFee = previewSaleResponse?.royalty_from_sale?.value
    ? ((Number(amount) - platformFee) / 100) *
      previewSaleResponse?.royalty_from_sale?.value
    : // Number(null) equals 0
      0;

  royaltyFee = parseFloat(royaltyFee.toFixed(2));

  const tempAmount = Number(amount) - Number(platformFee);

  const amountReceived =
    Number(amount) - Number(platformFee) - Number(royaltyFee);

  const amountReceivedInChain =
    amountReceived / (previewSaleResponse?.conversion_config?.rate || 1);

  return (
    <>
      <ButtonLayout
        buttonComponent={
          <div css={[styles.ctaContainer, mixins.flexAlignCenter]}>
            <PrimaryButton
              addStyles={styles.cta}
              onClick={() => {
                if (!Number(amount)) {
                  setAmountError(translate(`PLEASE_ENTER_A_VALID_AMOUNT`));
                  return;
                }
                onSubmit(Number(amount));
                amplitude.trackClick(CLICK.CONFIRM_LISTING, {
                  amountEntered: Number(amount),
                });
              }}
            >
              {translate(`CONFIRM_LISTING`)}
            </PrimaryButton>
          </div>
        }
      >
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.2,
            default: { duration: 0.3 },
            ease: `easeIn`,
          }}
          css={styles.transactionDetailsContainer}
        >
          <div css={styles.transactionDetailsWrapper}>
            <TransactionDetails
              image={nftMediaLink}
              title={nftName}
              hideStatus
              mediaType={nftMediaType}
              qty={nftQuantity}
            />
          </div>
        </motion.div>
        <div css={[styles.setPriceHeading]}>{translate(`SET_PRICE`)}</div>
        {showUpdateDescription && (
          <p css={styles.modifyPriceDescription}>
            {translate(`UPDATE_PRICE_DESCRIPTION`)}
          </p>
        )}
        <div css={mixins.flexAlignCenterJustifiedBetween}>
          <div css={[styles.priceHeading]}>{translate(`PRICE`)}</div>
          <div css={[styles.formMinLabel]}>
            {translate(`MIN_LISTING_PRICE`) +
              ` ` +
              Number(previewSaleResponse?.recharge?.minimum_pg_amount)}
          </div>
        </div>
        <AmountInput
          value={amount}
          errors={amountError}
          onChange={(e) => {
            handleInputChange(e.target.value);
            setAmountError(``);
          }}
        />
        <section>
          <FeeDetailRow>
            <FeeDetailItem
              name={translate(`BUYER_PAYS`)}
              value={`₹${Number(amount)}`}
              weight={`bold`}
            />
          </FeeDetailRow>

          {Number(amount) > 0 && (
            <>
              <FeeDetailRow>
                <FeeDetailItem
                  name={`${translate(`PLATFORM_FEES`)} (${
                    previewSaleResponse?.commission_from_sale?.value
                  }%)`}
                  value={`-₹${
                    platformFee ? Number(platformFee).toFixed(2) : ` NA`
                  }`}
                  weight={`bold`}
                />
              </FeeDetailRow>
              <DividerLine />
              <FeeDetailRow>
                <FeeDetailItem
                  name={``}
                  value={`₹${
                    tempAmount ? Number(tempAmount).toFixed(2) : ` NA`
                  }`}
                  weight={`bold`}
                />
              </FeeDetailRow>

              <FeeDetailRow>
                <FeeDetailItem
                  name={`${translate(`ROYALTY_FEES`)} (${
                    previewSaleResponse?.royalty_from_sale?.value
                  }%)`}
                  value={`-₹${
                    royaltyFee ? Number(royaltyFee).toFixed(2) : ` NA`
                  }`}
                  weight={`bold`}
                />
              </FeeDetailRow>
            </>
          )}

          <DividerLine />
          <FeeDetailRow>
            <FeeDetailItem
              name={translate(`AMOUNT_YOU_WILL_RECEIVE`)}
              value={`₹${amountReceived.toFixed(2)}`}
              weight={`bold`}
            />
            <FeeDetailItem
              name=""
              value={`~${amountReceivedInChain.toFixed(5)} ${
                previewSaleResponse?.conversion_config?.destination_currency
              }`}
              weight={`regular`}
            />
          </FeeDetailRow>
        </section>
      </ButtonLayout>
    </>
  );
};

export default NFTConfirmListing;
