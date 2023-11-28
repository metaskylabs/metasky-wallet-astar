import { FC, useEffect, useState } from 'react';
import * as styles from './styles';
import { SwipeMainButton } from '@components/Shared';
import TransactionDetails from '@components/Transaction/TransactionDetails';
import FromToDetails from '@components/Transaction/FromToDetails';
import { mixins, utils } from '@styles/shared';
import { ViewState } from '@constants/transfer';
import { limitDecimal, useIsMount } from '@utils/helper';
import Recharge from '@components/Recharge';
import {
  ConfirmTransferPayload,
  FeesBreakup,
  PreviewTransferResponse,
} from '@typings/api/transfer';
import { trackClick } from '@utils/analytics';
import { click } from '@constants/analytics';
import { useTranslate } from '@utils/useTranslate';
import { getCurrencySymbol } from '@constants/currency';
import HeaderWithButtonLayout from '@components/Shared/HeaderWithButtonLayout';
import { useAnalytics } from '@utils/useAnalytics';
import { FlowName } from '@components/NFTListingFlow';
import * as Constants from '@utils/constants';
import { BlueBanner } from '@components/Home/HomePageBanner/BlueBanner';

interface ConfirmTransferProps {
  headerTitle?: string;
  nftCardTitle?: string;
  transferPayload: ConfirmTransferPayload;
  setViewState?: (screen: ViewState) => void;
  setTransferOpen?: (b: boolean) => void;
  onBack?: () => void;
  confirmationDetails: PreviewTransferResponse;
  // setTransferComplete: (args: TransferCompleteState) => void;
  // transferComplete: TransferCompleteState;
  setIsFailure: (args: boolean) => void;
  isFailure: boolean;
  amount: string;
  setAmount: (arg: string) => void;
  handleTransfer: () => void;
  flow?: string;
  onClose: () => void;
  hideHeader?: boolean;
}

export interface RechargeFees {
  currency: string;
  value: number;
  value_in_inr: number;
  fiat_currency: string;
  value_in_fiat: number;
  fees_breakup: FeesBreakup[];
}

const ConfirmTransfer: FC<ConfirmTransferProps> = ({
  headerTitle,
  nftCardTitle,
  transferPayload,
  setViewState,
  onBack,
  setTransferOpen,
  confirmationDetails,
  // transferComplete,
  // setTransferComplete,
  setIsFailure,
  isFailure,
  amount,
  setAmount,
  handleTransfer,
  flow,
  onClose,
  hideHeader,
}) => {
  const eventLogger = useAnalytics();
  const isFirstRender = useIsMount();

  const [nearValue, setNearValue] = useState<number>(0);
  const [maxFees, setMaxFees] = useState<RechargeFees>(
    confirmationDetails.fees,
  );
  const [disableOnMetaBanner, setDisableOnMetaBanner] = useState<boolean>(
    !!confirmationDetails.disableOnMetaBanner,
  );
  const { translate } = useTranslate();

  useEffect(() => {
    console.log(`FLOW:`, flow);
    if (!confirmationDetails.recharge.is_required) {
      setAmount(`0`);
    }
    if (flow === `listing`) {
      eventLogger.trackPage(`Confirm Order Page`);
    } else if (flow === `DELETE`) {
      eventLogger.trackPage(`Confirm Delete Listing`);
    } else {
      eventLogger.trackPage(`Confirm Transfer Page`);
    }
  }, []);
  useEffect(() => {
    const nearRate = confirmationDetails.conversion_config.rate;
    const near = parseFloat(amount) / nearRate;
    setNearValue(near);
    if (!isFirstRender) {
      if (confirmationDetails.recharge.is_required) {
        setMaxFees(confirmationDetails.fees);
      } else {
        if (
          Number(amount) > 0 &&
          confirmationDetails?.recharge?.feesWithRecharge?.value_in_fiat
        ) {
          setMaxFees(confirmationDetails.recharge.feesWithRecharge);
        } else if (Number(amount) === 0) {
          setMaxFees(confirmationDetails.fees);
        }
      }
    }
  }, [amount]);
  const rechargeRequired = confirmationDetails?.recharge?.is_required;

  return (
    // <ButtonLayout
    //   buttonComponent={
    //     <SwipeMainButton
    //       resetMode={isFailure}
    //       onComplete={() => handleTransfer()}
    //       setIsFailure={(status) => setIsFailure(status)}
    //       flow={
    //         flow === `listing` ? translate(`SWIPE_TO_LIST_NFT`) : headerTitle
    //       }
    //     />
    //   }
    //   addStyles={styles.swipeButtonContainer}
    // >
    <HeaderWithButtonLayout
      hideHeader={hideHeader}
      title={
        flow === `listing`
          ? translate(`CONFIRM_ORDER`)
          : headerTitle ?? translate(`CONFIRM_ORDER`)
      }
      onBack={() => {
        if (onBack) onBack();
        if (setViewState) setViewState(ViewState.TRANSFER_FORM);
        if (setTransferOpen) setTransferOpen(true);
        trackClick(click.backOnConfirmTransfer);
      }}
      onClose={onClose}
      ctaContent={
        <div css={styles.swipeButtonContainer}>
          <SwipeMainButton
            resetMode={isFailure}
            onComplete={() => {
              handleTransfer();
              eventLogger.trackClick(`Transfer`, { amount: amount });
            }}
            setIsFailure={(status) => setIsFailure(status)}
            flow={
              flow === `listing` ? translate(`SWIPE_TO_LIST_NFT`) : headerTitle
            }
          />
        </div>
      }
    >
      <div css={styles.transferDetailsContainer}>
        <div css={styles.transferDetailsHeader}>
          {nftCardTitle || translate(`TRANSFER_DETAILS`)}
          {/* <span
                  css={styles.linkBlue}
                  onClick={() => setViewState(ViewState.TRANSFER_FORM)}
                >
                  <img src={AssetsImg.ic_edit.src} /> Edit
                </span> */}
        </div>
        <div css={styles.transferDetailsNft}>
          <TransactionDetails
            image={transferPayload.image}
            mediaType={transferPayload.media_type}
            title={transferPayload.name}
            qty={
              transferPayload.quantity !== `0` ? transferPayload.quantity : ``
            }
            transactionAmountDetail={
              flow !== FlowName.DELETE
                ? transferPayload.transactionAmountDetail
                : undefined
            }
          />
        </div>
        {transferPayload?.to_address && (
          <div css={styles.transferDetailsReceiver}>
            <FromToDetails
              title={translate(`TO`)}
              addressOrNumber={transferPayload?.to_address}
            />
          </div>
        )}
        {transferPayload?.note && (
          <>
            <div css={styles.transferDetailsFooter}>
              <span css={utils.mr(12)}>{translate(`NOTE`)}:</span>
              {` `}
              {transferPayload?.note ? transferPayload?.note : `-`}
            </div>
          </>
        )}
        <hr css={styles.divider} />
        <div css={styles.paymentHeader}>{translate(`PAYMENT_DUE`)}</div>
      </div>
      <div css={styles.transferFeesContainer}>
        <div css={[styles.transferFeesText, mixins.flexAlignStart]}>
          {translate(`MAX_TOTAL_FEE`)}
        </div>
        <div>
          <div css={styles.inrText}>
            {getCurrencySymbol(maxFees.fiat_currency)}
            {maxFees.value_in_fiat}
          </div>
          <div css={styles.nearText}>
            ~ {limitDecimal(maxFees.value.toString(), 5)}
            {` `}
            {maxFees.currency || `-`}
          </div>
        </div>
      </div>
      <div css={[styles.title, utils.mb(8)]}>{translate(`WALLET_BALANCE`)}</div>
      <div css={styles.balanceContainer}>
        <div
          css={[
            styles.balanceHeader,
            !rechargeRequired && { width: `100%`, justifyContent: `center` },
          ]}
        >
          <div>{translate(`YOU_HAVE`)}</div>
          {confirmationDetails?.recharge.is_required && (
            <div>{translate(`YOU_NEED`)}</div>
          )}
        </div>
        <div
          css={[
            styles.balanceRow,
            mixins.flex,
            !rechargeRequired && { textAlign: `center` },
          ]}
        >
          <div
            css={
              confirmationDetails?.recharge.is_required
                ? styles.balanceCol
                : styles.fullCol
            }
          >
            <div css={[styles.amount]}>
              {getCurrencySymbol(
                confirmationDetails?.user_balance.fiat_currency,
              )}
              {confirmationDetails?.user_balance.Fiat}
            </div>
            <div>
              <span>
                ~{` `}
                {Number(
                  confirmationDetails?.user_balance?.[
                    confirmationDetails?.fees.currency
                  ] || 0,
                ).toFixed(5) || 0}
              </span>
              {` `}
              {confirmationDetails?.fees.currency || `-`}
            </div>
          </div>
          {confirmationDetails?.recharge.is_required && (
            <div css={styles.balanceCol}>
              <div css={[styles.amount, styles.coinShortAmount]}>
                {getCurrencySymbol(confirmationDetails?.fees.fiat_currency)}

                {confirmationDetails?.fees.value_in_fiat}
              </div>
              <div css={[mixins.flexAlignCenter]}>
                <span>
                  ~{` `}
                  {limitDecimal(confirmationDetails?.fees.value.toString(), 5)}
                  &nbsp;
                </span>
                {confirmationDetails?.fees.currency || `-`}
              </div>
            </div>
          )}
        </div>
      </div>
      {confirmationDetails?.recharge.is_required && (
        <div css={styles.rechargeDesc}>
          You have insufficient balance. Recharge wallet to proceed with the
          transfer.
        </div>
      )}
      <div css={[utils.ml(16), utils.mr(16)]}>
        <hr css={styles.divider} />
      </div>
      {/*<div css={styles.transferDetailsContainer}>*/}
      {/*  <div css={styles.paymentHeader}>Select a Payment Method</div>*/}
      {/*</div>*/}
      {/*<div css={[styles.paymentMethodContainer, utils.mb(12)]}>*/}
      {/*  <div css={[styles.linkBlue, styles.infoIcon, mixins.flexAlignCenter]}>*/}
      {/*    <span css={[styles.linkBlue, styles.infoIcon]}>*/}
      {/*      <img*/}
      {/*        src={AssetsImg.ic_payment_wallet.src}*/}
      {/*        css={styles.walletIcon}*/}
      {/*      />*/}
      {/*    </span>*/}
      {/*    <div css={[styles.transferFeesText]}>Wallet</div>*/}
      {/*  </div>*/}
      {/*  <hr css={styles.divider} />*/}
      {/*  <label*/}
      {/*    css={*/}
      {/*      paymentMethod === PaymentMethod.SKYWALLET*/}
      {/*        ? styles.inputRadioContainerActive*/}
      {/*        : styles.inputRadioContainer*/}
      {/*    }*/}
      {/*    htmlFor={PaymentMethod.SKYWALLET}*/}
      {/*  >*/}
      {/*    <h4 css={styles.paymentMethodTitle}>SkyWallet</h4>*/}
      {/*    <div css={styles.balanceContainer}>Balance: 0.002 ETH</div>*/}
      {/*    <input*/}
      {/*      css={styles.inputRadioBase}*/}
      {/*      className="radioInput"*/}
      {/*      type="radio"*/}
      {/*      id={PaymentMethod.SKYWALLET}*/}
      {/*      name={PaymentMethod.SKYWALLET}*/}
      {/*      checked={paymentMethod === PaymentMethod.SKYWALLET}*/}
      {/*      onChange={noob}*/}
      {/*    />*/}
      {/*    <span css={styles.inputRadioLabel} className="checkmark"></span>*/}
      {/*  </label>*/}
      {/*</div>*/}
      {!disableOnMetaBanner && (
        <BlueBanner
          title={translate(Constants.home.transferFromOnMeta)}
          ctaLink={`/on-ramp`}
        />
      )}
      <div css={[utils.ml(16), utils.mr(16)]}>
        <hr css={styles.divider} />
      </div>
      <Recharge
        amount={amount}
        setAmount={setAmount}
        minAmount={Math.ceil(
          Math.max(
            Number(confirmationDetails.recharge.minimum_pg_amount),
            Number(confirmationDetails.recharge.deposit_value),
          ),
        )}
        isRechargeRequired={confirmationDetails.recharge.is_required}
        confirmationDetails={confirmationDetails}
        nearValue={nearValue}
        depositedCurrency={
          confirmationDetails?.recharge.destination_currency || `-`
        }
        maxFees={maxFees}
        currency={confirmationDetails?.conversion_config.deposit_currency}
      />
      <div css={[utils.ml(16), utils.mr(16)]}>
        <hr css={styles.divider} />
      </div>
    </HeaderWithButtonLayout>
  );
};

export default ConfirmTransfer;
