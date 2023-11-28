import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { BottomPopup, InputAmount, SwipeMainButton } from '@components/Shared';
import * as styles from './styles';
import { mixins, utils } from '@styles/shared';
import AssetsImg from '@public/images';
import { useTranslate } from '@utils/useTranslate';
import { motion } from 'framer-motion';
import { getCurrencySymbol } from '@constants/currency';
import { getToken, limitDecimal } from '@utils/helper';
import { onlyNumber } from '@utils/regexes';
import { buyCoin, previewBuyCoin } from '@actions/transfer';
import {
  PreviewBuyCoinPayloadResponse,
  isBuyFromOnMeta,
} from '@typings/api/transfer';
import _ from 'lodash';
import { Pages } from '@utils/navigation';
import Success from '@components/Success';
import { trackClick, trackEvent } from '@utils/analytics';
import { click } from '@constants/analytics';
import generateToast from '@components/Shared/GenerateToast';
import * as Constants from '@utils/constants';
import { ToastType } from '@components/Shared/Toast';
import { handleErrorMessage } from '@utils/handleResponseToast';
import ShimmerCard from '@components/Shimmer/ShimmerCard';
import { pollPaymentStatus } from '@actions/payment';
import { OrderStatus } from '@typings/api/wallet';
import { useRouter } from 'next/router';
import { LocalStorageVariables } from '@constants/authentication';
import HeaderWithButtonLayout from '@components/Shared/HeaderWithButtonLayout';
import { BottomPopupSize } from '@components/Shared/BottomPopup';
import AccountSelector, { ConnectedAccount } from '@components/AccountSelector';
import { useOnMetaWidget } from '@hooks/onMetaWidget/useOnMetaWidget';

interface BuyCryptoProps {
  onClose: () => void;
}
const BuyCrypto: FC<BuyCryptoProps> = ({ onClose }) => {
  const clientId = getToken(LocalStorageVariables.METACLIENTID);
  const { translate } = useTranslate();
  const router = useRouter();
  const [resetButton, setResetButton] = useState<boolean>(false);
  const [amount, setAmount] = useState<string>(`500`);
  const [isDropDownOpen, setIsDropDownOpen] = useState<boolean>(false);
  const [paymentPolling, setPaymentPolling] = useState<boolean>(false);
  const [previewResponse, setPreviewResponse] = useState<{
    data?: PreviewBuyCoinPayloadResponse;
    isLoading: boolean;
  }>({ isLoading: true });
  const [rechargeStatus, setRechargeStatus] = useState<{
    isSuccess: boolean;
    paymentQR?: string;
    orderUUID?: string;
    paymentLink?: string;
  }>({ isSuccess: false });
  const [selectedAccount, setSelectedAccount] = useState<ConnectedAccount>();
  const amountList = [`1000`, `1500`, `2000`];
  const { openWidget } = useOnMetaWidget();

  const callRechargeApi = async () => {
    if (
      previewResponse.data &&
      (parseFloat(amount) <
        previewResponse.data.recharge.min_recharge_fiat_amount ||
        amount == ``)
    ) {
      generateToast({
        type: ToastType.INFO,
        content: translate(`LESS_RECHARGE_AMOUNT_ERROR`),
      });
      setResetButton(true);
    } else {
      const payload = {
        fiat_amount: amount,
        coin_name: `ETH`,
        fiat_currency: previewResponse.data?.recharge.deposit_currency,
        wallet_uuid: selectedAccount?.wallet_uuid,
      };
      try {
        const buyCoinResponse = await buyCoin(payload);
        const data = buyCoinResponse.data;
        if (isBuyFromOnMeta(data)) {
          const paymentUrl = openWidget({
            allowOpeningNewTab: false,
            getOnlyURL: true,
            walletAddress: data.walletAddress,
            fiatAmount: +data.amount,
            chainId: +data.chainId,
            tokenAddress: data.tokenAddress,
            successRedirectUrl: data.successRedirectUrl,
            failureRedirectUrl: data.failureRedirectUrl,
            metaData: {
              order_uuid: data.order_uuid,
              referenceId: data.id,
            },
          });
          setRechargeStatus({
            paymentLink: paymentUrl,
            orderUUID: data.order_uuid,
            isSuccess: true,
          });
        } else {
          if (
            data.paymentGateway === `DECENTRO` &&
            data.paymentUrl &&
            data.qrCode &&
            data.order_uuid
          ) {
            setRechargeStatus({
              paymentLink: data.paymentUrl,
              paymentQR: data.qrCode,
              orderUUID: data.order_uuid,
              isSuccess: true,
            });
          } else if (data.paymentGateway == `AIRPAY` && data.metaData) {
            const paymentUrl =
              window.location.origin +
              `/airpayForm?airpaydata=${JSON.stringify(
                data.metaData,
              )}&orderId=${data.orderId}`;
            setRechargeStatus({
              paymentLink: paymentUrl,
              orderUUID: data.order_uuid,
              isSuccess: true,
            });
          } else if (data.paymentUrl) {
            setRechargeStatus({
              paymentLink: data.paymentUrl,
              orderUUID: data.order_uuid,
              isSuccess: true,
            });
          } else {
            generateToast({
              content: Constants.PaymentError.content,
              type: ToastType.ERROR,
            });
            return;
          }
        }
        setResetButton(true);
      } catch (e) {
        handleErrorMessage(e);
        setResetButton(true);
      }
    }
  };
  const redirectToPayment = () => {
    if (typeof window !== `undefined`) {
      if (rechargeStatus.paymentQR) {
        window.open(
          `${Pages.DECENTRO_QR}?paymentQR=${encodeURIComponent(
            rechargeStatus.paymentQR,
          )}&orderUUID=${rechargeStatus.orderUUID}&paymentLink=${
            rechargeStatus.paymentLink
          }`,
          `_blank`,
        );
      } else {
        window.open(rechargeStatus.paymentLink, `_blank`);
      }
      setPaymentPolling(true);
    }
  };

  const debounceFetch = _.debounce(
    (amount: string) => fetchPreview(amount),
    100,
  );

  const fetchPreview = async (amount: string) => {
    try {
      const payload = {
        fiat_amount: amount,
        coin_name: `ETH`,
        wallet_uuid: selectedAccount?.wallet_uuid,
      };
      setPreviewResponse({ ...previewResponse, isLoading: true });
      const response = await previewBuyCoin(payload);
      setPreviewResponse({ data: response.data, isLoading: false });
    } catch (e) {
      setPreviewResponse({ ...previewResponse, isLoading: false });
      handleErrorMessage(e);
    }
  };
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    if (inputValue === ``) setAmount(``);
    if (
      onlyNumber.test(inputValue.toString()) &&
      parseInt(inputValue).toString().length <= 10
    ) {
      setAmount(limitDecimal(parseFloat(inputValue).toString(), 2));
    }
  };

  const getPaymentPollingStatus = async (interval: any) => {
    try {
      if (rechargeStatus.orderUUID) {
        const payload = {
          orderId: rechargeStatus.orderUUID,
        };
        const response = await pollPaymentStatus(payload);

        if (response.data.status === OrderStatus.COMPLETED) {
          router.push(
            `${Pages.TRANSACTION_DETAILS}/${rechargeStatus.orderUUID}`,
          );
          trackEvent(click.purchaseSuccess, { clientId });
          clearInterval(interval);
        }
      }
    } catch (error) {
      handleErrorMessage(error);
    }
  };

  useEffect(() => {
    if (amount && selectedAccount) debounceFetch(amount);
  }, [amount, selectedAccount]);

  useEffect(() => {
    if (paymentPolling) {
      const interval = setInterval(() => {
        getPaymentPollingStatus(interval);
      }, 10000);
      return () => clearInterval(interval);
    }
  }, [paymentPolling]);

  if (!selectedAccount) {
    return (
      <BottomPopup
        size={BottomPopupSize.MEDIUM}
        isOpen={true}
        title="Select Account"
        onClose={onClose}
      >
        <AccountSelector
          onChange={(account) => {
            setSelectedAccount(account);
          }}
        />
      </BottomPopup>
    );
  }

  return (
    // TODO: need to refactor success component use button layout in it
    <BottomPopup size={BottomPopupSize.BIG} isOpen={true}>
      {rechargeStatus.isSuccess ? (
        <HeaderWithButtonLayout title={`Recharge Wallet`} onClose={onClose}>
          <Success
            title={translate(`PLEASE_PROCEED_TO_RECHARGE_YOUR_WALLET`)}
            ctaText={translate(`PROCEED_TO_PAYMENT`)}
            ctaClick={() => {
              trackClick(click.proceedToPayment);
              redirectToPayment();
            }}
            smallIcon={true}
            ellipse={true}
            avatar={AssetsImg.ic_transferClock.src}
          />
        </HeaderWithButtonLayout>
      ) : (
        <HeaderWithButtonLayout
          title={`Recharge Wallet`}
          onClose={onClose}
          ctaContent={
            <div css={styles.swiperContainer}>
              <SwipeMainButton
                resetMode={resetButton}
                onComplete={callRechargeApi}
                setIsFailure={setResetButton}
                flow={`Recharge Now`}
              />
            </div>
          }
        >
          <div css={styles.container}>
            <div>
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 70 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.2,
                    default: { duration: 0.3 },
                    ease: `easeIn`,
                  }}
                >
                  <div css={styles.currencySelectorContainer}>
                    <div
                      css={[
                        mixins.flexAlignCenterJustifiedBetween,
                        utils.widthPercent(100),
                      ]}
                    >
                      <h4 css={styles.formLabel}>{translate(`RECHARGE`)}</h4>
                    </div>
                    <div css={utils.widthPercent(100)}>
                      <div css={styles.selectWrapper}>
                        <div
                          css={styles.selectedBlock}
                          onClick={() => setIsDropDownOpen(!isDropDownOpen)}
                          onBlur={() => setIsDropDownOpen(false)}
                          tabIndex={1}
                        >
                          <div css={styles.selectedNetwork}>ETH</div>
                          <img
                            src={AssetsImg.ic_blueRightArrow.src}
                            css={[
                              styles.dropDownArrow,
                              isDropDownOpen && styles.openDropDownArrow,
                            ]}
                          />
                        </div>
                      </div>

                      {/*  Dropdown list */}
                      {isDropDownOpen && (
                        <div css={styles.ddContainer}>
                          <ul css={styles.ddListContainer}>
                            <li
                              css={styles.ddListItem}
                              onClick={() => setIsDropDownOpen(!isDropDownOpen)}
                            >
                              <div css={styles.selectedNetwork}>ETH</div>
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>

                  <div css={mixins.flexAlignCenterJustifiedBetween}>
                    <h4 css={styles.formLabel}>
                      {translate(`RECHARGE_AMOUNT`)}
                    </h4>
                    {!previewResponse.isLoading &&
                      previewResponse?.data?.recharge && (
                        <span css={styles.formMinLabel}>
                          ({translate(`MIN`)} {translate(`RECHARGE:`)}
                          {getCurrencySymbol(
                            previewResponse?.data?.recharge?.deposit_currency,
                          )}
                          {
                            previewResponse?.data?.recharge
                              ?.min_recharge_fiat_amount
                          }
                          )
                        </span>
                      )}

                    {/*TODO: Will be needed*/}
                    {/*<span css={styles.formMinLabel}>*/}
                    {/*  ({translate(`MIN`)} {translate(`RECHARGE:`)}*/}
                    {/*  {getCurrencySymbol(*/}
                    {/*    previewResponse?.data?.recharge.deposit_currency,*/}
                    {/*  )}*/}
                    {/*  {` `}*/}
                    {/*  {previewResponse?.data?.recharge.min_recharge_fiat_amount}*/}
                    {/*  )*/}
                    {/*</span>*/}
                  </div>
                  <div css={styles.formGroup}>
                    <div css={styles.amount}>
                      <InputAmount
                        placeHolder={translate(`ENTER_BID_AMOUNT`)}
                        value={amount}
                        currency={
                          previewResponse?.data?.recharge.deposit_currency
                        }
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div css={styles.amountButtonContainer}>
                    {amountList.map((amnt) => {
                      return (
                        <div
                          key={amnt}
                          css={[styles.amountButton, mixins.cursorPointer]}
                          onClick={() => {
                            let updatedAmount = 0;
                            if (amount === `NaN`) {
                              updatedAmount = parseFloat(amnt);
                            } else {
                              updatedAmount =
                                parseFloat(amount || `0`) + parseFloat(amnt);
                            }
                            setAmount(
                              limitDecimal(updatedAmount.toString(), 2),
                            );
                          }}
                        >
                          +{` `}
                          {getCurrencySymbol(
                            previewResponse?.data?.recharge.deposit_currency,
                          )}
                          {amnt}
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 70 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.2,
                default: { duration: 0.3 },
                ease: `easeIn`,
              }}
              css={[styles.transactionDetailsContainer]}
            >
              <div css={[styles.transactionDetailsHeader]}>
                <span css={[styles.detailsIcon, utils.mr(15)]}>
                  <img src={AssetsImg.ic_document.src} />
                </span>
                {translate(`TRANSACTION_DETAILS`)}
              </div>
              <div css={[styles.transactionDetailsInfo]}>
                {!previewResponse.isLoading && previewResponse.data ? (
                  <div css={[mixins.flexJustifiedBetween]}>
                    <div>{translate(`RECHARGE_AMOUNT`)}</div>
                    <div css={[styles.transactionDetailsAmountContainer]}>
                      <div css={styles.transactionDetailsInr}>
                        {getCurrencySymbol(
                          previewResponse.data.recharge.deposit_currency,
                        )}

                        {previewResponse.data.recharge?.deposit_value > 0
                          ? previewResponse.data.recharge?.deposit_value
                          : 0}
                      </div>
                      <div css={styles.transactionDetailsNear}>
                        ~{` `}
                        {previewResponse.data.recharge.deposit_coin_value > 0
                          ? limitDecimal(
                              previewResponse.data.recharge.deposit_coin_value.toString(),
                              5,
                            )
                          : 0}
                        {` `}
                        {previewResponse.data.recharge.destination_currency}
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <div css={[mixins.flexJustifiedBetween]}>
                      <ShimmerCard height={12} />
                      <div css={[styles.transactionDetailsAmountContainer]}>
                        <div css={styles.transactionDetailsInr}>
                          <ShimmerCard height={12} />
                        </div>
                        <div css={styles.transactionDetailsNear}>
                          <ShimmerCard height={12} />
                        </div>
                      </div>
                    </div>
                  </>
                )}
                {!previewResponse.isLoading && previewResponse.data ? (
                  previewResponse.data.fees.fees_breakup.map((fees, index) => {
                    return (
                      <div key={index} css={[mixins.flexJustifiedBetween]}>
                        <div>{fees.name}</div>
                        <div css={[styles.transactionDetailsAmountContainer]}>
                          <div css={styles.transactionDetailsInr}>
                            {getCurrencySymbol(fees.fiat_currency)}

                            {fees.value_in_fiat}
                          </div>
                          <div css={styles.transactionDetailsNear}>
                            ~{limitDecimal(fees.value.toString(), 5)}
                            {` ${fees.currency}`}
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <>
                    <div css={[mixins.flexJustifiedBetween]}>
                      <ShimmerCard height={12} />
                      <div css={[styles.transactionDetailsAmountContainer]}>
                        <div css={styles.transactionDetailsInr}>
                          <ShimmerCard height={12} />
                        </div>
                        <div css={styles.transactionDetailsNear}>
                          <ShimmerCard height={12} />
                        </div>
                      </div>
                    </div>
                    <div css={[mixins.flexJustifiedBetween]}>
                      <ShimmerCard height={12} />
                      <div css={[styles.transactionDetailsAmountContainer]}>
                        <div css={styles.transactionDetailsInr}>
                          <ShimmerCard height={12} />
                        </div>
                        <div css={styles.transactionDetailsNear}>
                          <ShimmerCard height={12} />
                        </div>
                      </div>
                    </div>
                  </>
                )}
                {!previewResponse.isLoading && previewResponse.data ? (
                  <div css={[mixins.flexJustifiedBetween]}>
                    <div>{translate(`BALANCE_DEPOSITED_TO_WALLET`)}</div>
                    <div css={[styles.transactionDetailsAmountContainer]}>
                      <div css={styles.transactionDetailsInr}>
                        {previewResponse.data.recharge?.destination_value > 0
                          ? previewResponse.data.recharge?.destination_value
                          : 0}
                        {` `}
                        {previewResponse.data.recharge.destination_currency}
                      </div>
                      <div css={styles.transactionDetailsNear}>
                        ~
                        {getCurrencySymbol(
                          previewResponse.data.recharge.deposit_currency,
                        )}
                        {previewResponse.data.recharge?.destination_fiat_value >
                        0
                          ? previewResponse.data.recharge
                              ?.destination_fiat_value
                          : 0}
                        {` `}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div css={[mixins.flexJustifiedBetween]}>
                    <ShimmerCard height={12} />
                    <div css={[styles.transactionDetailsAmountContainer]}>
                      <div css={styles.transactionDetailsInr}>
                        <ShimmerCard height={12} />
                      </div>
                      <div css={styles.transactionDetailsNear}>
                        <ShimmerCard height={12} />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </HeaderWithButtonLayout>
      )}
    </BottomPopup>
  );
};

export default BuyCrypto;
