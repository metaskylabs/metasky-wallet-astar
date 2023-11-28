import { buyCoin } from '@actions/transfer';
import ButtonLayout from '@components/HOC/ButtonLayout.tsx';
import {
  FullScreenPopUp,
  Header,
  SwipeMainButton,
  Tooltip,
} from '@components/Shared';
import generateToast from '@components/Shared/GenerateToast';
import { ToastType } from '@components/Shared/Toast';
import AssetsImg from '@public/images';
import { StoreState } from '@reducers';
import { mixins, utils } from '@styles/shared';
import { handleErrorMessage } from '@utils/handleResponseToast';
import { limitDecimal } from '@utils/helper';
import { onlyNumber } from '@utils/regexes';
import React, { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import InputOffer from '../InputOffer';
import * as styles from './styles';
import { State as MakeOfferState } from '@reducers/makeOffer';
import { useRouter } from 'next/router';
import { Pages } from '@utils/navigation';
import MakePayment from '../MakePayment';
import VerifyPayment from '../VerifyPayment';
import SuccessTransaction from '../SuccessTransaction';
import FailedTransaction from '../FailedTransaction';
import { TransactionStatus } from '@utils/constants';
import { resetPaymentStatus } from '@actions/makeOffer';
import { trackClick } from '@utils/analytics';
import { click } from '@constants/analytics';
import { useTranslate } from '@utils/useTranslate';
import HeaderWithButtonLayout from '@components/Shared/HeaderWithButtonLayout';
import { Fragment } from 'preact';
import { isBuyFromOnMeta } from '@typings/api/transfer';
import { useOnMetaWidget } from '@hooks/onMetaWidget/useOnMetaWidget';

interface RechargeProps {
  onBack: () => void;
  price: number;
  orderID: string;
  setPaymentStatus: (b: boolean) => void;
  onClose: () => void;
}

const amountList = [`1000`, `1500`, `2000`];

const RechargeOffer: FC<RechargeProps> = ({
  onBack,
  price,
  orderID,
  setPaymentStatus,
  onClose,
}) => {
  const { translate } = useTranslate();
  const { previewOffer, paymentTransactionStatus } = useSelector<
    StoreState,
    MakeOfferState
  >((state) => state.makeOffer);
  const router = useRouter();
  const [amount, setAmount] = useState(`${price}`);
  const [isFailure, setIsFailure] = useState<boolean>(false);
  const [makePayment, setMakePayment] = useState({
    confirm: false,
    verify: false,
    success: false,
    failed: false,
  });
  const [paymentLink, setPaymentLink] = useState<string | undefined>();
  const [orderUUID, setOrderUUID] = useState<string>(``);
  const [nearValue, setNearValue] = useState<number>(0);
  const { openWidget } = useOnMetaWidget();

  let platformFee = previewOffer?.commission_from_sale?.value
    ? (Number(amount) / 100) * Number(previewOffer?.commission_from_sale.value)
    : 0;

  platformFee = parseFloat(platformFee.toFixed(2));

  let royaltyFee = previewOffer?.royalty_from_sale?.value
    ? ((Number(amount) - platformFee) / 100) *
      Number(previewOffer?.royalty_from_sale?.value)
    : 0;

  royaltyFee = parseFloat(royaltyFee.toFixed(2));

  const amountReceived =
    Number(amount) - Number(platformFee) - Number(royaltyFee);

  const amountReceivedInChain =
    amountReceived / (previewOffer?.conversion_config?.rate || 1);

  useEffect(() => {
    const nearRate = previewOffer?.conversion_config.rate;
    if (nearRate) {
      const near = parseFloat(amount) / nearRate;
      setNearValue(near);
    }
  }, [amount]);

  const handleInputChange = (inputValue: string) => {
    if (inputValue === `` || inputValue === `-`) setAmount(``);
    if (
      onlyNumber.test(inputValue.toString()) &&
      parseInt(inputValue).toString().length <= 10
    ) {
      setAmount(limitDecimal(parseFloat(inputValue).toString(), 2));
    }
  };

  const rechargeWallet = async (_orderId: string) => {
    try {
      const buyCoinPayload = {
        fiat_amount: amount,
        fiat_currency: previewOffer?.recharge.deposit_currency as string,
        coin_name: previewOffer?.recharge.destination_currency,
        parent_order_id: _orderId as string,
      };
      const buyCoinResponse = await buyCoin(buyCoinPayload);
      const data = buyCoinResponse.data;
      setOrderUUID(data.order_uuid);
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
        setPaymentLink(paymentUrl);
      } else {
        if (data.paymentUrl) {
          setPaymentLink(data.paymentUrl);
        } else if (data.paymentGateway == `AIRPAY` && data.metaData) {
          const paymentUrl =
            window.location.origin +
            `/airpayForm?airpaydata=${JSON.stringify(data.metaData)}&orderId=${
              data.orderId
            }`;

          setPaymentLink(paymentUrl);
        }
      }
      setMakePayment({
        confirm: true,
        verify: false,
        success: false,
        failed: false,
      });
    } catch (err) {
      handleErrorMessage(err);
    }
  };

  const redirectToPayment = () => {
    if (typeof window !== `undefined`) {
      window.open(paymentLink, `_blank`);
    }
  };

  const handleRecharge = async () => {
    try {
      if (parseFloat(amount) > 0) {
        if (
          previewOffer?.recharge?.minimum_pg_amount &&
          parseFloat(amount) < previewOffer?.recharge?.minimum_pg_amount
        ) {
          const minAmount = Math.ceil(
            Math.max(
              Number(previewOffer?.recharge?.minimum_pg_amount),
              Number(previewOffer?.recharge?.deposit_value),
            ),
          );
          generateToast({
            type: ToastType.INFO,
            content: (
              <>
                {translate(`ENTER_MINIMUM_AMOUNT_OF`)}
                {minAmount}
              </>
            ),
          });
          setIsFailure(true);
        } else if (
          previewOffer?.recharge?.maximum_pg_amount &&
          parseFloat(amount) > previewOffer?.recharge?.maximum_pg_amount
        ) {
          generateToast({
            type: ToastType.INFO,
            content: (
              <>
                {translate(`ENTER_MAXIMUM_AMOUNT_OF`)}
                {previewOffer.recharge.maximum_pg_amount}
              </>
            ),
          });
          setIsFailure(true);
        } else {
          if (orderID) {
            trackClick(click.rechargeWallet, {
              order_id: orderID,
            });
            await rechargeWallet(orderID);
            setIsFailure(true);
          }
        }
      } else {
        if (orderID) {
          await router.push(`${Pages.TRANSACTION}?status=true`);
        }
      }
    } catch (e) {
      handleErrorMessage(e);
      setIsFailure(true);
    }
  };

  useEffect(() => {
    if (paymentTransactionStatus === TransactionStatus.completed) {
      setMakePayment({
        success: true,
        verify: false,
        confirm: false,
        failed: false,
      });
    } else if (
      paymentTransactionStatus === TransactionStatus.expired ||
      paymentTransactionStatus === TransactionStatus.failed
    ) {
      setMakePayment({
        failed: true,
        verify: false,
        confirm: false,
        success: false,
      });
    }
  }, [paymentTransactionStatus]);

  return (
    <Fragment>
      {makePayment?.confirm ||
      makePayment?.verify ||
      makePayment?.success ||
      makePayment?.failed ? (
        <Fragment>
          {makePayment.confirm && (
            <MakePayment
              onBack={() =>
                setMakePayment({
                  confirm: false,
                  verify: false,
                  failed: false,
                  success: false,
                })
              }
              onContinue={() => {
                trackClick(click.proceedToPayment);
                redirectToPayment();
                setMakePayment({
                  verify: true,
                  confirm: false,
                  failed: false,
                  success: false,
                });
              }}
            />
          )}
          {makePayment.verify && (
            <VerifyPayment
              orderID={orderUUID}
              onCancelTransaction={() => {
                setMakePayment({
                  verify: false,
                  confirm: false,
                  failed: false,
                  success: false,
                });
                generateToast({
                  type: ToastType.ERROR,
                  content: `Transaction Cancelled`,
                });
                resetPaymentStatus();
              }}
              timerRunOut={() => {
                setMakePayment({
                  verify: false,
                  failed: true,
                  success: false,
                  confirm: false,
                });
                resetPaymentStatus();
              }}
            />
          )}
          {makePayment.success && (
            <SuccessTransaction
              onContinue={() => {
                setPaymentStatus(true);
                setMakePayment({
                  verify: false,
                  confirm: false,
                  success: false,
                  failed: false,
                });
                onBack();
                resetPaymentStatus();
              }}
            />
          )}
          {makePayment.failed && (
            <FailedTransaction
              onTryAgain={() => {
                setMakePayment({
                  verify: false,
                  confirm: true,
                  success: false,
                  failed: false,
                });
                resetPaymentStatus();
              }}
              orderID={orderUUID}
              onBack={() => {
                setMakePayment({
                  verify: false,
                  confirm: false,
                  success: false,
                  failed: false,
                });
                resetPaymentStatus();
              }}
            />
          )}
        </Fragment>
      ) : (
        <HeaderWithButtonLayout
          ctaContent={
            <div css={utils.ctaContainer}>
              <SwipeMainButton
                resetMode={isFailure}
                onComplete={handleRecharge}
                setIsFailure={(status) => setIsFailure(status)}
                flow={
                  Number(amount) > 0
                    ? `${translate(`RECHARGE_FOR`)} ₹${amount}`
                    : translate(`RECHARGE`)
                }
              />
            </div>
          }
          title={translate(`RECHARGE_WALLET`)}
          onBack={onBack}
          onClose={onClose}
        >
          <section css={[styles.container]}>
            <h4 css={[styles.titleSemiBold, utils.mb(5)]}>
              {translate(`INSUFFICIENT_BALANCE`)}
            </h4>
            <p css={[styles.infoRegular, utils.mb(34)]}>
              {translate(`RECHARGE_REQUIRED`)}
            </p>
            <h3 css={[styles.titleBold, utils.mb(8)]}>
              {translate(`RECHARGING_FOR`)}:
            </h3>
            <article css={[styles.containerBody]}>
              <InputOffer
                amount={amount}
                handleInputChange={(e) => handleInputChange(e.target.value)}
                conversion_rate={previewOffer?.conversion_config.rate}
                conversionSymbol={
                  previewOffer?.conversion_config.destination_currency
                }
                tooltip={translate(`TOOLTIP_NEAR_FLUCTUATE`)}
              />
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
                        setAmount(limitDecimal(updatedAmount.toString(), 2));
                      }}
                    >
                      + &#8377; {amnt}
                    </div>
                  );
                })}
              </div>
              <div
                css={[
                  styles.infoContainer,
                  mixins.flexAlignCenterJustifiedBetween,
                  utils.mb(24),
                ]}
              >
                <div css={[mixins.flexAlignCenterJustifiedBetween]}>
                  <p css={[styles.titleSemiBold, utils.mr(2)]}>RATE</p>
                  <Tooltip
                    content={translate(`TOOLTIP_NEAR_FLUCTUATE`)}
                    id={`1`}
                    icon={AssetsImg.ic_info_blue.src}
                  />
                </div>
                <p css={[styles.titleSemiBold]}>
                  1 {previewOffer?.conversion_config.destination_currency} = ₹
                  {previewOffer?.conversion_config.rate}
                </p>
              </div>
              <article css={[utils.ml(12), utils.mr(12)]}>
                <div
                  css={[
                    mixins.flexAlignStart,
                    mixins.flexJustifiedBetween,
                    styles.referContainer,
                  ]}
                >
                  <div css={[mixins.flexAlignStart]}>
                    <article css={[styles.stepsContainer]}>
                      <article
                        css={[styles.steps, mixins.flexAlignJustifiedCenter]}
                      >
                        <div css={styles.stepsIcon} />
                      </article>
                    </article>
                    <p css={styles.titleSemiBold}>{translate(`YOU_PAY`)}</p>
                  </div>
                  <article css={[mixins.flexAlignEnd, mixins.flexColumn]}>
                    <p css={styles.titleSemiBold}>₹{amount || 0}</p>
                    <span css={styles.info12Refular}>
                      (
                      {Number(amount) > 0
                        ? limitDecimal(nearValue.toString(), 5)
                        : 0}
                      {` `}
                      {previewOffer?.conversion_config?.destination_currency})
                    </span>
                  </article>
                </div>
                <div
                  css={[
                    mixins.flexAlignStart,
                    mixins.flexJustifiedBetween,
                    styles.referContainer,
                  ]}
                >
                  <div css={[mixins.flexAlignStart]}>
                    <article css={[styles.stepsContainer]}>
                      <article
                        css={[styles.steps, mixins.flexAlignJustifiedCenter]}
                      >
                        <div css={styles.stepsIcon}>
                          <img src={AssetsImg.ic_minusWhite.src} alt="" />
                        </div>
                      </article>
                    </article>
                    <p css={styles.titleSemiBold}>
                      {translate(`PAYMENT_GATEWAY_FEES`)}
                    </p>
                  </div>
                  <article css={[mixins.flexAlignEnd, mixins.flexColumn]}>
                    <p css={styles.titleSemiBold}>
                      ₹{previewOffer?.fees.value_in_inr}
                    </p>
                  </article>
                </div>
                <div
                  css={[
                    mixins.flexAlignStart,
                    mixins.flexJustifiedBetween,
                    styles.referContainer,
                  ]}
                >
                  <div css={[mixins.flexAlignStart]}>
                    <article css={[styles.stepsContainer]}>
                      <article
                        css={[styles.steps, mixins.flexAlignJustifiedCenter]}
                      >
                        <div css={styles.stepsIcon}>
                          <img src={AssetsImg.ic_barWhite.src} alt="" />
                        </div>
                      </article>
                    </article>
                    <p css={styles.titleSemiBold}>
                      {translate(`AMOUNT_ADDED_TO_WALLET`)}
                    </p>
                  </div>
                  <article css={[mixins.flexAlignEnd, mixins.flexColumn]}>
                    <p css={styles.title20Bold}>₹{amountReceived}</p>
                    <span css={styles.info12Refular}>
                      (
                      {Number(amount) > 0
                        ? amountReceivedInChain.toFixed(5)
                        : 0}
                      {` `}
                      {previewOffer?.conversion_config?.destination_currency})
                    </span>
                  </article>
                </div>
              </article>
            </article>
          </section>
        </HeaderWithButtonLayout>
      )}
    </Fragment>
  );
};

export default RechargeOffer;
