import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import {
  BlueTextButton,
  InputAmount,
  SectionTitle,
  SwipeMainButton,
} from '@components/Shared';
import * as styles from './styles';
import { handleErrorMessage } from '@utils/handleResponseToast';
import { newBid } from '@actions/auction';
import { onlyNumber } from '@utils/regexes';
import { limitDecimal } from '@utils/helper';
import generateToast from '@components/Shared/GenerateToast';
import { ToastType } from '@components/Shared/Toast';
import { convertToNonCustodial } from '@utils/currencyConversion';
import { useTranslate } from '@utils/useTranslate';
import { useAnalytics } from '@utils/useAnalytics';
import { CLICK, EVENT_PAGE } from '@constants/analytics';
import { SheetType } from '@pages/auction/[id]';

interface PlaceBidProps {
  title: string;
  desc: string;
  auctionId: string;
  ctaText?: string;
  minBidAmount: number;
  topBidAmount: string;
  conversionFactor: number;
  handleBidSuccessStatus: (details: {
    bidAmount: number;
    tagText: string;
    date: string;
  }) => void;
  closeSheet: () => void;
  sheetType: SheetType;
  auction_uuid?: string;
  nft_name?: string;
}
const Bid: FC<PlaceBidProps> = ({
  title,
  desc,
  ctaText,
  auctionId,
  topBidAmount,
  conversionFactor,
  minBidAmount,
  handleBidSuccessStatus,
  closeSheet,
  sheetType,
  auction_uuid,
  nft_name,
}) => {
  const [bidAmount, setBidAmount] = useState<string>(minBidAmount.toString());
  const [resetButton, setResetButton] = useState<boolean>(false);
  const { translate } = useTranslate();
  const { trackPage, trackClick } = useAnalytics();

  useEffect(() => {
    sheetType === SheetType.RAISE_BID
      ? trackPage(EVENT_PAGE.RAISE_YOUR_BID, { auction_uuid, nft_name })
      : trackPage(EVENT_PAGE.PLACE_BID, { auction_uuid, nft_name }),
      { auction_uuid };
  }, []);
  const logSwipe = () => {
    sheetType === SheetType.RAISE_BID
      ? trackClick(CLICK.SWIPE_RAISE_YOUR_BID, { auction_uuid, nft_name })
      : trackClick(CLICK.SWIPE_PLACE_BID, { auction_uuid, nft_name });
  };
  const onBidPlaced = async () => {
    if (parseFloat(bidAmount) < minBidAmount) {
      generateToast({
        type: ToastType.ERROR,
        content: `${translate(`MINIMUM_BID_TOAST_MESSAGE`)} ${minBidAmount}`,
      });
      setResetButton(true);
      return;
    }
    try {
      const payload = {
        auctionId: auctionId,
        amount: convertToNonCustodial(Number(bidAmount), conversionFactor),
      };
      const response = await newBid(payload);
      handleBidSuccessStatus({
        bidAmount: parseFloat(bidAmount),
        tagText: response?.data?.bid?.status,
        date: response?.data?.bid?.bid_time,
      });
    } catch (error) {
      handleErrorMessage(error);
      setResetButton(true);
    }
  };

  const amountInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    if (inputValue === ``) setBidAmount(``);
    if (
      onlyNumber.test(inputValue.toString()) &&
      parseInt(inputValue).toString().length <= 10
    ) {
      setBidAmount(limitDecimal(parseFloat(inputValue).toString(), 2));
    }
  };

  return (
    <main css={styles.mainContainer}>
      <div>
        <p css={styles.desc}>{desc}</p>

        <InputAmount
          label={translate(`ENTER_BID_AMOUNT`)}
          placeHolder={translate(`ENTER_BID_AMOUNT`)}
          value={bidAmount}
          inputContainerStyles={styles.inputWrapper}
          description={`${translate(`TOP_BID_AMOUNT`)}: ₹${topBidAmount}`}
          onChange={amountInputHandler}
        />
      </div>
      <SwipeMainButton
        resetMode={resetButton}
        onComplete={() => {
          onBidPlaced();
          logSwipe();
        }}
        setIsFailure={setResetButton}
        flow={ctaText}
      />
    </main>
  );
};
export default Bid;
