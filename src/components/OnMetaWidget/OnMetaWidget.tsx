import { buyCoin } from '@actions/transfer';
import generateToast from '@components/Shared/GenerateToast';
import { ToastType } from '@components/Shared/Toast';
import { useOnMetaWidget } from '@hooks/onMetaWidget/useOnMetaWidget';
import { utils } from '@styles/shared';
import {
  onMetaOnRampEventResponse,
  onMetaOffRampEventResponse,
  isOnRampEventType,
} from '@typings/onMetaWidgetTypes';
import { useRouter } from 'next/router';
import { useState, useCallback, useEffect, useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';
import { State as userProfileState } from '@reducers/user';
import { StoreState } from '@reducers';
import { useAnalytics } from '@utils/useAnalytics';

const containerID = `onMetaContainer`;

export const OnMetaWidget = () => {
  const [metaskyOrderUUID, setMetaskyOrderUUID] = useState<string | null>(null);
  const [redirect, setRedirect] = useState(false);
  const { profile } = useSelector<StoreState, userProfileState>(
    (state) => state.user,
  );
  const walletUUID = profile === null ? null : profile.walletUUID;
  /* currently, we prefill eth address when initializing the widget */
  /* because, we're allowing purchase of eth and matic only */
  const usersEthAddress =
    profile === null || profile.allWalletAddresses.length === 0
      ? null
      : profile.allWalletAddresses[0].ethAddress;
  const router = useRouter();
  const { openWidget } = useOnMetaWidget();
  const { trackEvent } = useAnalytics();

  /*  callbackFn to be passed to onMeta widget */
  const onReceivingOnMetaEvent = useCallback(
    async (data: onMetaOnRampEventResponse | onMetaOffRampEventResponse) => {
      try {
        if (isOnRampEventType(data) && walletUUID !== null) {
          /* order created event */
          if (data.eventType === `orderCreated`) {
            trackEvent(`OnMeta Order Created`, {
              orderAmount: data.order.fiat,
              coinName: data.order.buyTokenSymbol,
              orderCurrency: data.order.currency,
              pg_order_id: data.order.orderId,
            });
            const payload = {
              fiat_amount: data.order.fiat.toString(),
              coin_name: data.order.buyTokenSymbol,
              fiat_currency: data.order.currency,
              wallet_uuid: walletUUID,
              pg_preferred: `ONMETA`,
              pg_order_id: data.order.orderId,
            };
            /* after receiving onMeta orderID call skywallet's buycoin API */
            /* to create a skywallet transaction */
            const buyCoinResponse = await buyCoin(payload);
            const buyCoinData = buyCoinResponse.data;
            if (buyCoinData.currency === `INR`) {
              setMetaskyOrderUUID(buyCoinData.order_uuid);
            }
          }
          /* if both payment and crypto transfer are either completed or failed */
          /* redirect user to transaction details page */
          if (
            (data.paymentStatus === `success` ||
              data.paymentStatus === `failed`) &&
            (data.cryptoSwap === `success` || data.cryptoSwap === `failed`)
          ) {
            trackEvent(`OnMeta Order Completed`, {
              userPaymentStatus: data.paymentStatus,
              cryptoTransferStatus: data.cryptoSwap,
            });
            setRedirect(true);
          }
        } else {
          throw new Error(`Invalid event or walletUUID`);
        }
      } catch (err) {
        trackEvent(`OnMeta Order Failed`);
        generateToast({
          type: ToastType.ERROR,
          content: `We faced some error processing your payment, please contact us`,
        });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [walletUUID],
  );

  /* when transaction completes redirect user to transaction details page */
  useEffect(() => {
    if (redirect && metaskyOrderUUID !== null) {
      router.push(`/transaction-details/${metaskyOrderUUID}`);
    }
  }, [metaskyOrderUUID, redirect, router]);

  /* check user login status and open on meta widget */
  useLayoutEffect(() => {
    if (usersEthAddress !== null && walletUUID !== null) {
      openWidget({
        elementId: containerID,
        allowOpeningNewTab: false,
        getOnlyURL: false,
        eventType: `ORDER_EVENTS`,
        callbackFn: onReceivingOnMetaEvent,
        walletAddress: usersEthAddress,
      });
    }
  }, [onReceivingOnMetaEvent, openWidget, usersEthAddress, walletUUID]);

  return <div css={utils.widthPercent(100)} id={containerID}></div>;
};
