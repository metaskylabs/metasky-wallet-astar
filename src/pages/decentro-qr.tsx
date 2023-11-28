import { TransactionStatus } from '@utils/constants';
import { Pages } from '@utils/navigation';
import { useRouter } from 'next/router';
import { FC, Fragment, useEffect, useState } from 'react';
import AssetsImg from '@public/images';
import * as styles from '@styles/Modules/redirect';
import * as decentroStyles from '@styles/Modules/decentro-qr';
import * as successStyles from '@components/Success/styles';
import { mixins, utils } from '@styles/shared';
import { Header, PrimaryButton } from '@components/Shared';
import ButtonLayout from '@components/HOC/ButtonLayout.tsx';
import { isMobile } from 'react-device-detect';
import { pollingTransactionDecentro } from '@actions/decentro';
import { motion } from 'framer-motion';
import { handleErrorMessage } from '@utils/handleResponseToast';
import { useSelector } from 'react-redux';
import { StoreState } from '@reducers';
import { State as utilsState } from '@reducers/utils';

const DecentroQR: FC = () => {
  const router = useRouter();
  const [QR, setQR] = useState<string | any>(null);
  const [status, setStatus] = useState<TransactionStatus>(
    TransactionStatus.pending,
  );
  const { isSplashScreen } = useSelector<StoreState, utilsState>(
    (state) => state.utils,
  );

  useEffect(() => {
    if (router.query.paymentQR) {
      const l = new URLSearchParams(window.location.search);
      const res = l.get(`paymentQR`);
      setQR(res);
    }
  }, [router.query.paymentQR]);

  useEffect(() => {
    const startTime = new Date().getTime();
    const poll = setInterval(async () => {
      const currentTime = new Date().getTime();
      if (currentTime - startTime > 300000) {
        setStatus(TransactionStatus.expired);
        clearInterval(poll);
      }
      if (router.query.orderUUID) {
        try {
          const payload = {
            orderId: router.query.orderUUID as string,
          };
          const response = await pollingTransactionDecentro(payload);
          const responseStatus = response?.data && response.data?.status;

          if (responseStatus === TransactionStatus.completed) {
            router.push(Pages.TRANSACTION);
            clearInterval(poll);
          } else if (
            responseStatus === TransactionStatus.failed ||
            responseStatus === TransactionStatus.expired
          ) {
            setStatus(responseStatus);
            clearInterval(poll);
          }
        } catch (error) {
          handleErrorMessage(error);
        }
      }
    }, 5000);

    return () => clearInterval(poll);
  }, [router.query.orderUUID]);

  if (!isSplashScreen) {
    return <></>;
  }
  if (isMobile) {
    return (
      <Fragment>
        <Header isBackEnabled={false} title="Payment" />
        {status === TransactionStatus.pending && <SuccessMobile />}
        {status === TransactionStatus.failed && <Failed />}
        {status === TransactionStatus.expired && <Expired />}
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        <Header isBackEnabled={false} title="Payment" />
        {status === TransactionStatus.pending && (
          <div
            css={[
              styles.purchaseSuccessIcon,
              decentroStyles.paymentScreen,
              mixins.flexAlignJustifiedCenter,
              mixins.flexColumn,
            ]}
          >
            <div
              css={[
                styles.successIcon,
                mixins.flexAlignJustifiedCenter,
                decentroStyles.flexColumn,
              ]}
            >
              <div
                css={[decentroStyles.ScanHeading]}
              >{`Scan the below QR code to pay`}</div>

              <img
                src={`data:image/jpeg;base64,${QR}`}
                alt="test"
                css={[decentroStyles.scanner]}
              />
            </div>
          </div>
        )}
        {status === TransactionStatus.failed && <Failed />}
        {status === TransactionStatus.expired && <Expired />}
      </Fragment>
    );
  }
};

const Failed: FC = () => {
  return (
    <div
      css={[
        styles.purchaseSuccessIcon,
        decentroStyles.paymentScreen,
        mixins.flexAlignJustifiedCenter,
        mixins.flexColumn,
      ]}
    >
      <div
        css={[
          styles.successIcon,
          mixins.flexAlignJustifiedCenter,
          decentroStyles.flexColumn,
        ]}
      >
        <img
          src={AssetsImg.ic_failed.src}
          alt="error"
          css={styles.successImg}
        />
      </div>

      <h2 css={[styles.purchaseCongratulation]}>Transaction Failed</h2>
      <p css={[styles.purchaseDescription]}>
        Sorry! Your payment was not successful. Please close this window and try
        again
      </p>
    </div>
  );
};
const Expired: FC = () => {
  return (
    <div
      css={[
        styles.purchaseSuccessIcon,
        decentroStyles.paymentScreen,
        mixins.flexAlignJustifiedCenter,
        mixins.flexColumn,
      ]}
    >
      <div
        css={[
          styles.successIcon,
          mixins.flexAlignJustifiedCenter,
          decentroStyles.flexColumn,
        ]}
      >
        <img
          src={AssetsImg.ic_failed.src}
          alt="error"
          css={styles.successImg}
        />
      </div>

      <h2 css={[styles.purchaseCongratulation]}>Transaction Expired</h2>
      <p css={[styles.purchaseDescription]}>
        Sorry! It looks like you waited too long. Please close this window and
        try again.
      </p>
    </div>
  );
};
const SuccessMobile: FC = () => {
  const router = useRouter();
  return (
    <div css={[decentroStyles.successMobileWrapper]}>
      <div
        css={[
          styles.purchaseSuccessIcon,
          decentroStyles.paymentScreen,
          mixins.flexAlignJustifiedCenter,
          mixins.flexColumn,
        ]}
      >
        <div
          css={[
            styles.successIcon,
            mixins.flexAlignJustifiedCenter,
            decentroStyles.flexColumn,
          ]}
        >
          <img
            src={AssetsImg.ic_transferClock.src}
            alt="error"
            css={styles.successImg}
          />
        </div>
      </div>
      <h2 css={[styles.purchaseCongratulation]}>Please Pay through UPI</h2>
      <motion.div
        css={[decentroStyles.buttonContainer]}
        className="popup-button"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.4,
          default: { duration: 0.3 },
          ease: `easeIn`,
        }}
      >
        <PrimaryButton
          addStyles={successStyles.primaryButton}
          onClick={() => {
            window.open(router.query.paymentLink as string, `_blank`);
          }}
        >
          {`Proceed to payment`}
        </PrimaryButton>
      </motion.div>
    </div>
  );
};

export default DecentroQR;
