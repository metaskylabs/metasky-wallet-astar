import {
  createListing,
  deleteListing,
  getSalePreview,
  updateListing,
} from '@actions/marketPlaceNft';
import { buyCoin } from '@actions/transfer';
import ConfirmTransfer from '@components/ConfirmTransfer';
import NFTConfirmListing from '@components/NFTConfirmListing';
import { BottomPopup, FullScreenKiteLoader } from '@components/Shared';
import { BottomPopupSize } from '@components/Shared/BottomPopup';
import generateToast from '@components/Shared/GenerateToast';
import { ToastType } from '@components/Shared/Toast';
import Success from '@components/Success';
import { CLICK, swipe } from '@constants/analytics';
import NOOB from '@constants/noob';
import { ViewState } from '@constants/transfer';
import AssetsImg from '@public/images';
import {
  GetMarketplacePreviewResponse,
  previewSaleAction,
} from '@typings/api/marketplace';
import { trackSwipe } from '@utils/analytics';
import { PaymentError } from '@utils/constants';
import { handleErrorMessage } from '@utils/handleResponseToast';
import { Pages } from '@utils/navigation';
import { useTranslate } from '@utils/useTranslate';
import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import * as styles from './styles';
import { useAnalytics } from '@utils/useAnalytics';

interface NFTListingFlowProps {
  nftUid: string;
  listingUid?: string | undefined;
  nftName: string;
  nftMediaType: string;
  nftQuantity: string;
  nftMediaLink: string;
  onBack: () => void;
  onClose: () => void;
  flowName: FlowName;
  price?: string;
}

export enum FlowName {
  DELETE = `DELETE`,
  SELL = `SELL`,
  UPDATE = `UPDATE`,
}

export default function NFTListingFlow(props: NFTListingFlowProps) {
  const [isFailure, setIsFailure] = useState<boolean>(false);
  const [paymentLink, setPaymentLink] = useState<string | undefined>();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [listingAmount, setListingAmount] = useState(``);
  const [rechargeAmount, setRechargeAmount] = useState(`500`);
  const [salePreviewResponse, setSalePreviewResponse] =
    useState<GetMarketplacePreviewResponse | null>(null);
  const [paymentQR, setPaymentQR] = useState<string | null>(null);
  const [orderUUID, setOrderUUID] = useState<string | null>(null);
  const { translate } = useTranslate();
  const amplitude = useAnalytics();
  const [bottomSheetState, setBottomSheetState] = useState<{
    onBack?: () => void;
    state?: ViewState;
  }>({});

  const getTitle = () => {
    if (bottomSheetState.state === ViewState.CONFIRM_FORM)
      return props.flowName === FlowName.SELL
        ? translate(`CONFIRM_ORDER`)
        : props.flowName === FlowName.UPDATE
        ? translate(`UPDATE_LISTING`)
        : translate(`Delete Listing`);
    if (bottomSheetState.state === ViewState.TRANSFER_FORM)
      return props.flowName === FlowName.SELL
        ? translate(`SELL`)
        : translate(`MODIFY_PRICE`);
    return ` `;
  };

  useEffect(() => {
    setLoading(true);
    getSalePreview(
      props.nftUid,
      props.flowName === FlowName.SELL
        ? previewSaleAction.CREATE
        : props.flowName === FlowName.UPDATE
        ? previewSaleAction.UPDATE
        : previewSaleAction.DELETE,
    )
      .then((d) => {
        setSalePreviewResponse(d.data);
        setBottomSheetState({
          state:
            props.flowName === FlowName.DELETE
              ? ViewState.CONFIRM_FORM
              : ViewState.TRANSFER_FORM,
        });
        setLoading(false);
      })
      .catch((error) => {
        const axiosError = error as AxiosError;
        handleErrorMessage(axiosError);
        props.onClose();
      });
  }, []);

  const listAsset = async () => {
    const minAmount = Math.ceil(
      Math.max(
        Number(salePreviewResponse?.recharge?.minimum_pg_amount),
        Number(salePreviewResponse?.recharge?.deposit_value),
      ),
    );
    if (
      salePreviewResponse?.recharge.deposit_value &&
      salePreviewResponse.recharge.is_required &&
      (parseFloat(rechargeAmount) < minAmount || rechargeAmount == ``)
    ) {
      generateToast({
        type: ToastType.INFO,
        content: translate(`LESS_RECHARGE_AMOUNT_ERROR`),
      });
      setIsFailure(true);
      return { success: false, orderId: `` };
    } else {
      // setTransferLoading(true);
      const createPayload = {
        nft_uuid: props.nftUid,
        quantity: props.nftQuantity,
        price: listingAmount,
      };

      const updatePayload = {
        listing_uuid: props.listingUid,
        price: listingAmount,
      };

      const deletePayload = {
        listing_uuid: props.listingUid,
      };

      let response;
      if (props.flowName === FlowName.SELL) {
        response = await createListing(createPayload);
      } else if (props.flowName === FlowName.UPDATE) {
        response = await updateListing(updatePayload);
      } else {
        response = await deleteListing(deletePayload);
      }
      return { success: true, orderId: response.data.order_uuid };
    }
  };

  const handleTransfer = async () => {
    try {
      if (parseFloat(rechargeAmount) > 0) {
        if (
          salePreviewResponse?.recharge?.minimum_pg_amount &&
          parseFloat(rechargeAmount) <
            salePreviewResponse?.recharge?.minimum_pg_amount
        ) {
          const minAmount = Math.ceil(
            Math.max(
              Number(salePreviewResponse?.recharge?.minimum_pg_amount),
              Number(salePreviewResponse?.recharge?.deposit_value),
            ),
          );
          generateToast({
            type: ToastType.INFO,
            content: (
              <>
                {translate(`PLEASE_ENTER_A_MINIMUM_RECHARGE_AMOUNT`)} &#8377;
                {minAmount}
              </>
            ),
          });
          setIsFailure(true);
        } else if (
          salePreviewResponse?.recharge?.maximum_pg_amount &&
          parseFloat(rechargeAmount) >
            salePreviewResponse?.recharge?.maximum_pg_amount
        ) {
          generateToast({
            type: ToastType.INFO,
            content: (
              <>
                {translate(`PLEASE_ENTER_A_MINIMUM_RECHARGE_AMOUNT`)} &#8377;
                {salePreviewResponse.recharge.maximum_pg_amount}
              </>
            ),
          });
          setIsFailure(true);
        } else {
          const transferStatus = await listAsset();
          if (transferStatus?.success) {
            trackSwipe(swipe.swipeToListNft, {
              'Is Recharge Required': salePreviewResponse?.recharge.is_required,
              Amount: rechargeAmount,
              Status: transferStatus.success ? `success` : `fail`,
            });
            await rechargeWallet(transferStatus.orderId);
            setBottomSheetState({
              onBack: () => {
                amplitude.trackClick(CLICK.BACK);
                setIsFailure(true);
                setBottomSheetState({ ...bottomSheetState });
              },
              state: ViewState.PROCEED_TO_PAYMENT,
            });
          } else {
            trackSwipe(swipe.swipeToListNft, {
              'Is Recharge Required': salePreviewResponse?.recharge.is_required,
              Amount: rechargeAmount,
              Status: transferStatus.success ? `success` : `fail`,
            });
          }
        }
      } else {
        const transferStatus = await listAsset();
        if (transferStatus?.success) {
          trackSwipe(swipe.swipeToListNft, {
            'Is Recharge Required': salePreviewResponse?.recharge.is_required,
            Amount: rechargeAmount,
            Status: transferStatus.success ? `success` : `fail`,
          });
          await router.push(`${Pages.TRANSACTION}?status=true`);
        } else {
          trackSwipe(swipe.swipeToListNft, {
            'Is Recharge Required': salePreviewResponse?.recharge.is_required,
            Amount: rechargeAmount,
            Status: transferStatus.success ? `success` : `fail`,
          });
        }
      }
    } catch (e) {
      handleErrorMessage(e);
      // setTransferLoading(false);
      setIsFailure(true);
    }
  };

  const rechargeWallet = async (_orderId: string) => {
    const buyCoinPayload = {
      fiat_amount: rechargeAmount,
      fiat_currency: salePreviewResponse?.recharge.deposit_currency,
      coin_name: salePreviewResponse?.recharge.destination_currency,
      parent_order_id: _orderId as string,
      upi_id: process.env.NEXT_PUBLIC_DECENTRO_UPI_KEY as string,
    };
    const buyCoinResponse = await buyCoin(buyCoinPayload);
    const data = buyCoinResponse.data;

    if (
      data.paymentGateway === `DECENTRO` &&
      data.paymentUrl &&
      data.qrCode &&
      data.order_uuid
    ) {
      setPaymentLink(data.paymentUrl);
      setPaymentQR(data.qrCode);
      setOrderUUID(data.order_uuid);
    } else if (data.paymentGateway == `AIRPAY` && data.metaData) {
      const paymentUrl =
        window.location.origin +
        `/airpayForm?airpaydata=${JSON.stringify(data.metaData)}&orderId=${
          data.orderId
        }`;

      setPaymentLink(paymentUrl);
    } else if (data.paymentUrl) {
      setPaymentLink(data.paymentUrl);
    } else {
      generateToast({
        content: PaymentError.content,
        type: ToastType.ERROR,
      });
      return;
    }

    setBottomSheetState({
      onBack: () => {
        amplitude.trackClick(CLICK.BACK);
        setIsFailure(true);
        setBottomSheetState({ ...bottomSheetState });
      },
      state: ViewState.PROCEED_TO_PAYMENT,
    });
  };

  const redirectToPayment = () => {
    if (typeof window !== `undefined`) {
      if (paymentQR) {
        window.open(
          `${Pages.DECENTRO_QR}?paymentQR=${encodeURIComponent(
            paymentQR,
          )}&orderUUID=${orderUUID}&paymentLink=${paymentLink}`,
          `_blank`,
        );
      } else {
        window.open(paymentLink, `_blank`);
      }
    }
  };

  return (
    <>
      <FullScreenKiteLoader isOpen={loading}>
        <div css={styles.loaderContentInfo}>
          Page is Loading. Please wait...
        </div>
      </FullScreenKiteLoader>
      <BottomPopup
        isOpen={true}
        isBackEnabled={!!bottomSheetState.onBack}
        onBack={bottomSheetState.onBack}
        onClose={props.onBack}
        size={BottomPopupSize.BIG}
        title={getTitle()}
      >
        {props.flowName !== FlowName.DELETE &&
          bottomSheetState.state === ViewState.TRANSFER_FORM && (
            <NFTConfirmListing
              showUpdateDescription={props.flowName !== FlowName.SELL}
              onSubmit={(amount) => {
                if (
                  salePreviewResponse?.recharge?.minimum_pg_amount &&
                  amount < salePreviewResponse?.recharge?.minimum_pg_amount
                ) {
                  generateToast({
                    type: ToastType.INFO,
                    content: (
                      <>
                        {translate(`PLEASE_ENTER_A_MINIMUM_AMOUNT_OF`)} &#8377;
                        {salePreviewResponse.recharge.minimum_pg_amount}
                      </>
                    ),
                  });
                  return;
                }
                if (
                  salePreviewResponse?.recharge?.maximum_pg_amount &&
                  amount > salePreviewResponse?.recharge?.maximum_pg_amount
                ) {
                  generateToast({
                    type: ToastType.INFO,
                    content: (
                      <>
                        {translate(`PLEASE_ENTER_A_MINIMUM_AMOUNT_OF`)} &#8377;
                        {salePreviewResponse.recharge.maximum_pg_amount}
                      </>
                    ),
                  });
                  return;
                }
                setListingAmount(String(amount));
                setBottomSheetState((state) => ({
                  onBack: () => {
                    amplitude.trackClick(CLICK.BACK);
                    setBottomSheetState({ ...state });
                  },
                  state: ViewState.CONFIRM_FORM,
                }));
              }}
              nftName={props.nftName}
              nftMediaType={props.nftMediaType}
              nftQuantity={props.nftQuantity}
              nftMediaLink={props.nftMediaLink}
              previewSaleResponse={salePreviewResponse!}
              price={props.price}
            />
          )}
        {bottomSheetState.state == ViewState.CONFIRM_FORM && (
          <ConfirmTransfer
            hideHeader
            onClose={NOOB}
            transferPayload={{
              token_uuid: ``,
              nft_uuid: props.nftUid,
              note: ``,
              quantity: props.nftQuantity,
              to_address: ``,
              image: props.nftMediaLink,
              media_type: props.nftMediaType,
              name: props.nftName,
              transactionAmountDetail: `${translate(`SELLING_FOR`)}: ₹${
                props.flowName === FlowName.DELETE ? props.price : listingAmount
              }`,
            }}
            nftCardTitle={translate(`ORDER_DETAILS`)}
            confirmationDetails={salePreviewResponse! as any}
            setViewState={(state) => {
              setBottomSheetState({
                onBack: () => {
                  amplitude.trackClick(CLICK.BACK);
                  setBottomSheetState({ ...bottomSheetState });
                },
                state: state,
              });
            }}
            setTransferOpen={(state) => {
              if (!state) props.onBack();
              if (props.flowName === FlowName.DELETE) {
                props.onBack();
              }
            }}
            setIsFailure={setIsFailure}
            isFailure={isFailure}
            amount={rechargeAmount}
            setAmount={setRechargeAmount}
            handleTransfer={handleTransfer}
            headerTitle={
              props.flowName === FlowName.DELETE ? `Delete Listing` : undefined
            }
            flow={props.flowName === FlowName.SELL ? `listing` : props.flowName}
          />
        )}
        {bottomSheetState.state === ViewState.PROCEED_TO_PAYMENT && (
          <Success
            title={translate(`PLEASE_PROCEED_TO_RECHARGE_YOUR_WALLET`)}
            ctaText={translate(`PROCEED_TO_PAYMENT`)}
            ctaClick={() => {
              redirectToPayment();
            }}
            smallIcon={true}
            ellipse={true}
            avatar={AssetsImg.ic_transferClock.src}
          />
        )}
        {bottomSheetState.state == ViewState.FAIL && (
          <Success
            title={translate(`LISTING_FAILED`)}
            subTitle={translate(`LISTING_FAILED_SUBTITLE`)}
            smallIcon={true}
            isFailed={true}
            ellipse={true}
          />
        )}
      </BottomPopup>
    </>
  );
}
