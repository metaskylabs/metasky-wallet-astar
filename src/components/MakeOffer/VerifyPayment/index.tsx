import { paymentStatus } from '@actions/makeOffer';
import { BottomSheet } from '@components/Shared';
import { css } from '@emotion/react';
import AssetsImg from '@public/images';
import { StoreState } from '@reducers';
import { mixins, utils } from '@styles/shared';
import { handleErrorMessage } from '@utils/handleResponseToast';
import React, { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import CancelTransaction from '../CancelTransaction';
import * as styles from '../MakePayment/styles';
import { State as MakeOfferState } from '@reducers/makeOffer';
import { TransactionStatus } from '@utils/constants';
import HeaderWithButtonLayout from '@components/Shared/HeaderWithButtonLayout';
import { Fragment } from 'preact';

interface VerifyPaymentInterface {
  onCancelTransaction: () => void;
  timerRunOut: () => void;
  orderID: string;
}

const VerifyPayment: FC<VerifyPaymentInterface> = ({
  onCancelTransaction,
  timerRunOut,
  orderID,
}) => {
  const [minutes, setMinutes] = useState(5);
  const [seconds, setSeconds] = useState(0);
  const [cancelTransaction, setCancelTransaction] = useState<boolean>(false);
  const { paymentTransactionStatus } = useSelector<StoreState, MakeOfferState>(
    (state) => state.makeOffer,
  );

  useEffect(() => {
    const myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(myInterval);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  const paymentStatusCheck = async () => {
    try {
      await paymentStatus(orderID);
    } catch (error) {
      handleErrorMessage(error);
      timerRunOut();
      return;
    }
  };

  useEffect(() => {
    const timeIntervalId = setInterval(async () => {
      if (
        paymentTransactionStatus &&
        paymentTransactionStatus !== TransactionStatus.pending &&
        paymentTransactionStatus !== TransactionStatus.init
      ) {
        return;
      }
      paymentStatusCheck();
    }, 15000);
    return () => clearInterval(timeIntervalId);
  }, [paymentTransactionStatus]);

  useEffect(() => {
    if (minutes === 0 && seconds === 1) {
      timerRunOut();
    }
  }, [minutes, seconds]);

  return (
    <Fragment>
      {cancelTransaction ? (
        <CancelTransaction
          onSuccess={onCancelTransaction}
          onCancel={() => setCancelTransaction(false)}
        />
      ) : (
        <>
          <article
            onClick={() => setCancelTransaction(true)}
            css={styles.close}
          >
            <img src={AssetsImg.ic_close.src} alt="" />
          </article>
          <article
            css={[
              styles.container,
              mixins.flexColumn,
              mixins.flexAlignJustifiedCenter,
            ]}
          >
            <div css={[styles.walletIcon, mixins.flexAlignJustifiedCenter]}>
              <img
                src={AssetsImg.ic_transferClock.src}
                alt=""
                width="82"
                height="81"
              />
            </div>
            <h2 css={styles.verifyPaymentStatus}>
              Verifying Payment Status...
            </h2>
            <p css={styles.verifyPaymentDescription}>
              Please make the payment on the payment gateway before the timer
              goes off.
            </p>
            <article
              css={[
                styles.verifyTimerContainer,
                mixins.flexAlignJustifiedCenter,
              ]}
            >
              <img src={AssetsImg.ic_clockBlue.src} alt="" />
              <p css={styles.verifyPaymentClockTimer}>
                {minutes}m : {seconds}s
              </p>
            </article>
          </article>
        </>
      )}
      {/*<BottomSheet*/}
      {/*  addStyles={css({ boxShadow: `none`, padding: 0 })}*/}
      {/*  isOpen={cancelTransaction}*/}
      {/*  onClose={() => {*/}
      {/*    setCancelTransaction(false);*/}
      {/*  }}*/}
      {/*></BottomSheet>*/}
    </Fragment>
  );
};

export default VerifyPayment;
