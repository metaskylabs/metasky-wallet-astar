import * as styles from './styles';
import AssetsImg from '@public/images';
import {
  DividerLine,
  FullScreenError,
  FullScreenKiteLoader,
  FullScreenPopUp,
  Header,
  Input,
  MLottie,
  MSecondaryLottie,
  PrimaryButton,
  SecondaryButton,
} from '@components/Shared';
import { FC, Fragment, useEffect, useState } from 'react';
import { PaymentMethod } from '@constants/payment';
import { useRouter } from 'next/router';
import { OrderStatus } from '@typings/api/wallet';
import { buyListing, verifyUpi } from '@actions/payment';
import generateToast from '@components/Shared/GenerateToast';
import Toast, { ToastType } from '@components/Shared/Toast';
import { handleErrorMessage } from '@utils/handleResponseToast';
import { getTransactionById } from '@actions/wallet';
import FullScreenSuccess from '@components/Shared/FullScreenSuccess';
import { buyListingRequest, UpiStatus } from '@typings/api/payment';
import TertiaryButton from '@components/Shared/Button/TertiaryButton';
import { mixins } from '@styles/shared';
import { openInNewWindow } from '@utils/helper';
import Kite from '@components/Shared/Kite';
import { motion } from 'framer-motion';
import { css } from '@emotion/react';
import LabelledRadioButton from '@components/LabelledRadioButton';
import { Pages } from '@utils/navigation';

interface PaymentProps {
  orderId: string;
  price: string;
  setOpenPaymentMethod: (status: boolean) => void;
}

const Payment: FC<PaymentProps> = ({
  orderId,
  price,
  setOpenPaymentMethod,
}) => {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(
    PaymentMethod.CARD,
  );
  const [isUpiVerified, setIsUpiVerified] = useState(false);
  const [showVerificationMessage, setShowVerificationMessage] = useState(false);
  const [upi, setUpi] = useState(``);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFailed, setIsFailed] = useState<boolean>(false);
  const [verifyLoading, setVerifyLoading] = useState<boolean>(false);
  const [openPaymentStatus, setOpenPaymentStatus] = useState<boolean>(false);
  const [polling, setPolling] = useState<boolean>(false);

  const router = useRouter();
  const { query } = router;

  useEffect(() => {
    if (polling) {
      const interval = setInterval(() => {
        startPolling(interval);
      }, 10000);
      return () => clearInterval(interval);
    }
  }, [polling]);

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(`clicked`, e.target.id);
    setPaymentMethod(PaymentMethod[e.target.id as keyof typeof PaymentMethod]);
    setShowVerificationMessage(false);
    setUpi(``);
    setIsUpiVerified(false);
    setShowVerificationMessage(false);
  };

  const handleVerifyUpi = async () => {
    setShowVerificationMessage(false);
    if (isUpiId()) {
      const payload = {
        upi_id: upi,
      };
      try {
        setVerifyLoading(true);
        const response = await verifyUpi(payload);
        setVerifyLoading(false);
        if (response.data.status == UpiStatus.VERIFIED) {
          setShowVerificationMessage(true);
          setIsUpiVerified(true);
        } else {
          setShowVerificationMessage(true);
          setIsUpiVerified(false);
        }
      } catch (error) {
        handleErrorMessage(error);
      }
    } else {
      setShowVerificationMessage(true);
      setIsUpiVerified(false);
    }
  };

  const isUpiId = (): boolean => {
    if (upi.length > 0) {
      return true;
    } else {
      return false;
    }
  };

  const startPolling = async (interval: any) => {
    try {
      let count = 0;
      setIsLoading(true);
      const txnStatus = await getTransactionById(orderId);

      if (txnStatus.data.fiat_payment_status == OrderStatus.COMPLETED) {
        clearInterval(interval);
        setPolling(false);
        setIsLoading(false);
        setOpenPaymentStatus(true);

        return;
      } else if (
        txnStatus.data.fiat_payment_status == OrderStatus.PENDING ||
        txnStatus.data.fiat_payment_status == OrderStatus.INIT
      ) {
        count = count + 1;
        if (count == 60) {
          clearInterval(interval);
          setPolling(false);
          //TODO: some info should be provided to user maybe toast
          router.push(Pages.TRANSACTION);
        }
      } else if (txnStatus.data.fiat_payment_status == OrderStatus.FAILED) {
        clearInterval(interval);
        setIsFailed(true);
        setPolling(false);
      }
    } catch (error) {
      handleErrorMessage(error);
    }
  };

  const handleConfirmPayment = async () => {
    if (!paymentMethod) {
      generateToast({
        type: ToastType.ERROR,
        content: `Please select one payment method`,
      });
      return;
    }
    const payload: buyListingRequest = {
      order_uuid: orderId,
    };
    if (paymentMethod == PaymentMethod.UPI) {
      setShowVerificationMessage(false);
      if (isUpiId() && isUpiVerified) {
        payload.upi_id = upi;
      } else {
        setShowVerificationMessage(true);
        setIsUpiVerified(false);
        return;
      }
    }
    try {
      setIsLoading(true);
      const response = await buyListing(payload);

      if (paymentMethod == PaymentMethod.UPI) {
        setPolling(true);
        return;
      }
      if (response.data && response.data.paymentUrl) {
        if (!openInNewWindow(response.data.paymentUrl, 800, 400)) {
          generateToast({
            type: ToastType.INFO,
            content: (
              <>
                pop up was blocked by your browser.
                <a
                  href={response.data.paymentUrl}
                  target="_blank"
                  rel="noreferrer"
                  css={styles.toastLink}
                >
                  {` `}
                  Click this link to continue
                </a>
              </>
            ),
            customDuration: 45000,
          });
          setTimeout(() => {
            router.push(`${Pages.TRANSACTION}?status=true`);
          }, 45000);
        } else {
          router.push(`${Pages.TRANSACTION}?status=true`);
        }

        router.events.on(`routeChangeComplete`, () => setIsLoading(false));
      }
    } catch (error) {
      setIsLoading(false);
      handleErrorMessage(error);
    }
  };
  // Todo Metamask Connect
  // const handleLogInWithMetamask = async () => {
  //   const connectedData = await connect(connector);
  //   console.log(`connected data`, connectedData);
  //   if (!connectedData.error) {
  //     console.log('connected');
  //   } else {
  //     if (connectedData.error.name === `ConnectorNotFoundError`) {
  //       console.log(`error `, connectedData);
  //       generateToast({
  //         text: `Metamask not found. Please install, login Metamask and refresh this page before trying again.`,
  //         type: ToastType.info,
  //       });
  //     }
  //   }
  // };

  return (
    <Fragment>
      <FullScreenError
        isOpen={isFailed}
        title={`Transaction Failed`}
        info={`Transaction failed due to network error. Please try again later.`}
        showHomeButton={true}
      />
      <FullScreenPopUp isOpen={isLoading}>
        <div css={styles.loaderContainer}>
          <Kite />
          <div css={styles.loaderContentInfo}>
            Your payment is under process. You can track you transaction
          </div>
          <TertiaryButton
            text="here"
            onClick={() => router.push(Pages.TRANSACTION)}
            addStyles={styles.blueButton}
          />
          <div css={styles.secondaryCta}>
            <SecondaryButton onClick={() => router.reload()}>
              BACK TO NFT DETAILS
            </SecondaryButton>
          </div>
        </div>
      </FullScreenPopUp>
      <div css={[styles.mainContainer]}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.1,
            default: { duration: 0.3 },
            ease: `easeIn`,
          }}
        >
          <Header
            title="Payment Method"
            isBackEnabled={true}
            customBack={() => setOpenPaymentMethod(false)}
          />
        </motion.div>
        <section css={styles.sectionContainer}>
          <motion.div
            css={styles.methodsContainer}
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.2,
              default: { duration: 0.3 },
              ease: `easeIn`,
            }}
          >
            {/*TODO:NOT FOR THIS RELEASE*/}
            {/*<div css={styles.walletContainer}>*/}
            {/*  <div css={styles.titleContainer}>*/}
            {/*    <img*/}
            {/*      css={styles.walletIcon}*/}
            {/*      src={AssetsImg.ic_payment_wallet.src}*/}
            {/*      alt=""*/}
            {/*    />*/}
            {/*    <h4 css={styles.title}>Wallet</h4>*/}
            {/*  </div>*/}
            {/*  <DividerLine addStyles={styles.divider} />*/}
            {/*<label*/}
            {/*  css={*/}
            {/*    paymentMethod === PaymentMethod.METAMASK*/}
            {/*      ? styles.inputRadioContainerActive*/}
            {/*      : styles.inputRadioContainer*/}
            {/*  }*/}
            {/*  htmlFor={PaymentMethod.METAMASK}*/}
            {/*>*/}
            {/*  <h4 css={styles.paymentMethodTitle}>MetaMask</h4>*/}
            {/*  {!isMetamaskConnected && (*/}
            {/*    <p css={styles.metaMaskDescription}>*/}
            {/*      Link your MetaMask wallet to pay directly using funds*/}
            {/*      available in your wallet*/}
            {/*    </p>*/}
            {/*  )}*/}
            {/*  {isMetamaskConnected && (*/}
            {/*    <p css={styles.metaMaskDescription}>Balance: {}</p>*/}
            {/*  )}*/}
            {/*  <input*/}
            {/*    css={styles.inputRadioBase}*/}
            {/*    className="radioInput"*/}
            {/*    type="radio"*/}
            {/*    id={PaymentMethod.METAMASK}*/}
            {/*    name={PaymentMethod.METAMASK}*/}
            {/*    checked={paymentMethod === PaymentMethod.METAMASK}*/}
            {/*    onChange={handleRadioChange}*/}
            {/*  />*/}
            {/*  <span css={styles.inputRadioLabel} className="checkmark"></span>*/}
            {/*</label>*/}
            {/*{paymentMethod === PaymentMethod.METAMASK && (*/}
            {/*  <div css={styles.connectWalletContainer}>*/}
            {/*    <div css={styles.connectBtn}>*/}
            {/*      <img*/}
            {/*        src={AssetsImg.ic_addProfile.src}*/}
            {/*        alt="add wallet button"*/}
            {/*      />*/}
            {/*    </div>*/}
            {/*    <div css={styles.connectWalletTextEnable}>Connect Wallet</div>*/}
            {/*  </div>*/}
            {/*)}*/}
            {/*</div>*/}
            <div css={styles.walletContainer}>
              <LabelledRadioButton
                checked={paymentMethod === PaymentMethod.CARD}
                id={PaymentMethod.CARD}
                onChange={handleRadioChange}
                name={PaymentMethod.CARD}
              >
                <>
                  <h4 css={styles.paymentMethodTitle}>Debit/Credit Card</h4>
                  <p css={styles.debitDescription}>Supported cards</p>
                  <div css={styles.cardIconContainer}>
                    <img
                      src={AssetsImg.ic_master_card.src}
                      alt=""
                      css={styles.cardIcon}
                    />
                    <img
                      src={AssetsImg.ic_visa.src}
                      alt=""
                      css={styles.cardIcon}
                    />
                  </div>
                </>
              </LabelledRadioButton>
              <LabelledRadioButton
                checked={paymentMethod === PaymentMethod.UPI}
                id={PaymentMethod.UPI}
                onChange={handleRadioChange}
                name={PaymentMethod.UPI}
                disabled
              >
                <>
                  <h4 css={styles.paymentMethodTitle}>Other UPI Apps</h4>
                  {paymentMethod === PaymentMethod.UPI && (
                    <p css={styles.debitDescription}>
                      Please enter your UPI ID
                    </p>
                  )}
                </>
              </LabelledRadioButton>
              {paymentMethod === PaymentMethod.UPI && (
                <Fragment>
                  <div css={styles.addUpiInfo}>
                    <div css={styles.upiInput}>
                      <Input
                        type="text"
                        id="upiID"
                        placeholder="Enter ID here"
                        isEnable={true}
                        getInputText={(text) => {
                          setUpi(text);
                          setIsUpiVerified(false);
                          setShowVerificationMessage(false);
                        }}
                        addStylesToContainer={styles.inputContainer}
                      />
                    </div>
                    <SecondaryButton
                      addStyles={styles.verifyButton}
                      onClick={handleVerifyUpi}
                      disabled={upi.length === 0 || verifyLoading}
                    >
                      {!verifyLoading && `VERIFY`}
                      <span css={[mixins.flexAlignJustifiedCenter]}>
                        {verifyLoading && (
                          <MSecondaryLottie addStyles={styles.verifyLoader} />
                        )}
                      </span>
                    </SecondaryButton>
                  </div>

                  {showVerificationMessage && isUpiVerified && (
                    <div css={styles.verifiedTextContainer}>
                      <img
                        src={AssetsImg.ic_checkIconGreen.src}
                        alt=""
                        css={styles.checkIcon}
                      />
                      <p css={styles.verifiedText}>
                        Verified! Please press confirm payment to complete the
                        purchase.
                      </p>
                    </div>
                  )}
                  {showVerificationMessage && !isUpiVerified && (
                    <div css={styles.verifiedTextContainer}>
                      <img
                        src={AssetsImg.ic_crossIconRed.src}
                        alt=""
                        css={styles.checkIcon}
                      />
                      <p css={styles.failedText}>
                        Payment failed! Please enter valid UPI ID
                      </p>
                    </div>
                  )}
                </Fragment>
              )}
            </div>
          </motion.div>
        </section>
        <motion.div
          css={[styles.buttonContainer]}
          className="popup-button"
          initial={{ opacity: 0, y: 200 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            default: { duration: 0.3 },
            ease: `easeIn`,
          }}
        >
          <PrimaryButton
            addStyles={styles.button}
            onClick={handleConfirmPayment}
            disabled={
              (paymentMethod == PaymentMethod.UPI && upi.length === 0) ||
              verifyLoading
            }
          >
            {!verifyLoading && `CONFIRM PAYMENT`}
            <span>
              {verifyLoading && <MLottie addStyles={styles.loader} />}
            </span>
          </PrimaryButton>
        </motion.div>
      </div>
      <FullScreenSuccess
        isOpen={openPaymentStatus}
        title={`Your Order is in Progress.`}
        showButton={true}
        ctaText={`TRACK YOUR ORDER`}
        showHomeButton={true}
        onClick={() => router.push(Pages.TRANSACTION)}
      />
    </Fragment>
  );
};

export default Payment;
