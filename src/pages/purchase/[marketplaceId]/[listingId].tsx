import {
  BackButton,
  BottomSheet,
  FullScreenKiteLoader,
  FullScreenPopUp,
  PrimaryButton,
  SecondaryButton,
} from '@components/Shared';
import * as styles from '@styles/Modules/purchase';
import { mixins } from '@styles/shared';
import { FC, Fragment, useEffect, useState } from 'react';
import * as Constants from '@utils/constants';
import TransactionInformation from '@components/Transaction/TransactionDetailsInformation';
import AssetsImg from '@public/images';
import { Pages } from '@utils/navigation';
import { useRouter } from 'next/router';
import Success from '@components/Success';
import moment from 'moment';
import { handleErrorMessage } from '@utils/handleResponseToast';
import { AxiosError } from 'axios';
import {
  buyListing,
  getPaymentGateway,
  getPreviewDetails,
  pollPaymentStatus,
} from '@actions/payment';
import { PaymentOption, PGTypes } from '@constants/payment';
import {
  buyListingResponse,
  isPurchaseFromOnMeta,
  listingPreviewResponse,
} from '@typings/api/payment';
import { getToken, isPanVerified } from '@utils/helper';
import KYC from '@components/Kyc';
import AirpayPaymentForm from '@components/AirpayPaymentForm';
import { motion } from 'framer-motion';
import TransactionDetails from '@components/Transaction/TransactionDetails';
import { trackClick, trackEvent } from '@utils/analytics';
import { click } from '@constants/analytics';
import ButtonLayout from '@components/HOC/ButtonLayout.tsx';
import { css } from '@emotion/react';
import useCustomBack from '@utils/hooks/custom-back';
import { OrderStatus } from '@typings/api/wallet';
import { LocalStorageVariables } from '@constants/authentication';
import generateToast from '@components/Shared/GenerateToast';
import { ToastType } from '@components/Shared/Toast';
import { useSelector } from 'react-redux';
import { StoreState } from '@reducers';
import { State as userProfileState } from '@reducers/user';
import { useTranslate } from '@utils/useTranslate';
import { useOnMetaWidget } from '@hooks/onMetaWidget/useOnMetaWidget';

const Purchase: FC = () => {
  const router = useRouter();
  const { translate } = useTranslate();
  const [purchaseData, setPurchaseData] = useState<listingPreviewResponse>();
  const [openPaymentStatus, setOpenPaymentStatus] = useState<boolean>(false);
  const [totalFees, setTotalFees] = useState<string>(``);
  const [isLoading, setIsLoading] = useState(true);
  const [paymentGateway, setPaymentGateway] = useState(``);
  const [isPurchaseDisabled, setIsPurchaseDisabled] = useState<boolean>(false);
  const [openKyc, setOpenKyc] = useState<boolean>(false);
  const [buyListingData, setBuyListingData] = useState<buyListingResponse>();
  const [submitForm, setSubmitForm] = useState(false);
  const [paymentLink, setPaymentLink] = useState<string | undefined>();
  const [transferComplete, setTransferComplete] = useState({ status: false });
  const [paymentPolling, setPaymentPolling] = useState<boolean>(false);
  const { query } = router;
  const { onBack } = useCustomBack();
  const [paymentQR, setPaymentQR] = useState<string | null>(null);
  const [orderUUID, setOrderUUID] = useState<string | null>(null);
  const clientId = getToken(LocalStorageVariables.METACLIENTID);
  const { openWidget } = useOnMetaWidget();

  useEffect(() => {
    async function getPreview() {
      if (router.isReady) {
        if (query.preview) {
          setPurchaseData(JSON.parse(query.preview as string));
          setIsLoading(false);
        } else {
          const payload = {
            listingId: query.listingId as string,
            marketplaceId: query.marketplaceId as string,
            qty: 1,
          };
          try {
            const response = await getPreviewDetails(payload);
            setPurchaseData(response.data);
            setIsLoading(false);
          } catch (error) {
            const axiosError = error as AxiosError;
            setIsLoading(false);
            handleErrorMessage(axiosError);
            if (
              axiosError?.response?.data.toastContext.toast_message ==
              translate(`NFT_CAN_BE_PURCHASED_ONCE`)
            ) {
              setIsPurchaseDisabled(true);
            }
          }
        }
      }
    }
    getPreview();
  }, [router.isReady]);

  useEffect(() => {
    if (purchaseData) {
      setContent();
      fetchPG();
    }
  }, [purchaseData]);

  useEffect(() => {
    if (paymentPolling) {
      const interval = setInterval(() => {
        getPaymentPollingStatus(interval);
      }, 10000);
      return () => clearInterval(interval);
    }
  }, [paymentPolling]);

  // Function specific written for azadi flow
  const getPaymentPollingStatus = async (interval: any) => {
    try {
      if (purchaseData?.details?.order_uuid) {
        const payload = {
          orderId: purchaseData.details.order_uuid,
        };
        const response = await pollPaymentStatus(payload);

        if (response.data.status === OrderStatus.COMPLETED) {
          router.push(`${Pages.NFT_DETAILS}/${purchaseData?.details?.nft?.id}`);
          trackEvent(click.purchaseSuccess, { clientId });
          // trackAzadiCheckout(PixelEventType.PURCHASE);
          // router.replace(`https://azadirecords.com/thanks/`);
          // trackEvent(click.purchaseSuccess, { clientId });
          // await trackAzadiCheckout(PixelEventType.PURCHASE);
          // router.replace(`https://azadirecords.com/thanks/`);
          clearInterval(interval);
        }
        // else if (
        //   response.data.status === OrderStatus.FAILED ||
        //   response.data.status === OrderStatus.EXPIRED
        // ) {
        //   router.replace(`https://azadirecords.com/sorry/`);
        // }
      }
    } catch (error) {
      handleErrorMessage(error);
    }
  };

  const setContent = () => {
    if (purchaseData) {
      const allFees = purchaseData?.fees.map((fee) => {
        return parseFloat(fee.value);
      });
      const totalFee = allFees.reduce((partialSum, a) => partialSum + a, 0);
      setTotalFees(totalFee.toString());
    }
  };

  const fetchPG = async () => {
    if (purchaseData) {
      try {
        const pgData = await getPaymentGateway(
          purchaseData?.details.order_uuid,
        );
        if (pgData.data.paymentFlow == false) {
          setPaymentGateway(PGTypes.FREE);
        } else if (
          pgData.data &&
          pgData.data.paymentGateway &&
          pgData.data.status === `ACTIVE`
        ) {
          setPaymentGateway(pgData.data.paymentGateway);
        }
      } catch (error) {
        handleErrorMessage(error);
      }
    }
  };

  const rechargeWallet = async (_orderId: string) => {
    try {
      const payload = {
        order_uuid: _orderId,
        upi_id: process.env.NEXT_PUBLIC_DECENTRO_UPI_KEY as string,
      };
      const buyNearResponse = await buyListing(payload);
      if (purchaseData?.payment_mode === PaymentOption.WALLET) {
        router.push(Pages.TRANSACTION);
        return;
      }
      const data = buyNearResponse.data;
      if (isPurchaseFromOnMeta(data)) {
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
        if (
          data.paymentGateway === `DECENTRO` &&
          data.paymentUrl &&
          data.qrCode &&
          data.order_uuid
        ) {
          setPaymentLink(data.paymentUrl);
          setPaymentQR(data.qrCode);
          setOrderUUID(data.order_uuid);
        } else if (data.paymentGateway === `AIRPAY` && data.metaData) {
          const paymentUrl = `${
            window.location.origin
          }/airpayForm?airpaydata=${JSON.stringify(data.metaData)}&orderId=${
            data.orderId
          }`;

          setPaymentLink(paymentUrl);
        } else if (data.paymentUrl) {
          setPaymentLink(data.paymentUrl);
        } else {
          generateToast({
            content: Constants.PaymentError.content,
            type: ToastType.ERROR,
          });
          return;
        }
      }
      setTransferComplete({ ...transferComplete, status: true });
    } catch (error) {
      handleErrorMessage(error);
      setTransferComplete({ ...transferComplete, status: false });
    }
  };

  //TODO:- It will required in upcoming release
  // const redirectToGateway = async () => {
  //   if (purchaseData) {
  //     const payload = {
  //       order_uuid: purchaseData.details.order_uuid,
  //     };
  //     setIsLoading(true);
  //     try {
  //       const purchaseRespo = await buyListing(payload);
  //       if (purchaseRespo.data && purchaseRespo.data.paymentUrl) {
  //         if (!openInNewWindow(purchaseRespo.data.paymentUrl, 800, 800)) {
  //           generateToast({
  //             type: ToastType.INFO,
  //             content: (
  //               <>
  //                 pop up was blocked by your browser.
  //                 <a
  //                   href={purchaseRespo.data.paymentUrl}
  //                   target="_blank"
  //                   rel="noreferrer"
  //                   css={styles.toastLink}
  //                 >
  //                   {` `}
  //                   Click this link to continue
  //                 </a>
  //               </>
  //             ),
  //             customDuration: 450000,
  //           });
  //           setTimeout(() => {
  //             router.push(`/transaction?status=true`);
  //           }, 450000);
  //         } else {
  //           router.push(`/transaction?status=true`);
  //         }

  //         router.events.on(`routeChangeComplete`, () => setIsLoading(false));
  //       }
  //     } catch (error) {
  //       setIsLoading(false);
  //       handleErrorMessage(error);
  //     }
  //   }
  // };

  // const freeNftTransaction = async () => {
  //   if (purchaseData) {
  //     const payload = {
  //       order_uuid: purchaseData.details.order_uuid,
  //     };
  //     setIsLoading(true);
  //     try {
  //       const purchaseRespo = await buyListing(payload);

  //       setOpenPaymentStatus(true);
  //       setIsLoading(false);
  //     } catch (error) {
  //       setIsLoading(false);
  //       handleErrorMessage(error);
  //     }
  //   }
  // };

  // const handleAirpayPG = async () => {
  //   if (purchaseData) {
  //     const payload = {
  //       order_uuid: purchaseData.details.order_uuid,
  //     };
  //     setIsLoading(true);
  //     try {
  //       const purchaseRespo = await buyListing(payload);

  //       setBuyListingData(purchaseRespo.data);
  //       setSubmitForm(true);
  //     } catch (error) {
  //       setIsLoading(false);
  //       handleErrorMessage(error);
  //     }
  //   }
  // };

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

    // if (clientId === `azadi`) {
    setPaymentPolling(true);
    // }
  };

  //TODO:- It will required in upcoming release
  // const handleConfirmPayment = async () => {
  //   const payload: buyListingRequest = {
  //     order_uuid: purchaseData?.details.order_uuid as string,
  //   };
  //   try {
  //     setIsLoading(true);
  //     const response = await buyListing(payload);

  //     if (response.data && response.data.paymentUrl) {
  //       if (!openInNewWindow(response.data.paymentUrl, 800, 400)) {
  //         generateToast({
  //           type: ToastType.INFO,
  //           content: (
  //             <>
  //               pop up was blocked by your browser.
  //               <a
  //                 href={response.data.paymentUrl}
  //                 target="_blank"
  //                 rel="noreferrer"
  //                 css={styles.toastLink}
  //               >
  //                 {` `}
  //                 Click this link to continue
  //               </a>
  //             </>
  //           ),
  //           customDuration: 40000,
  //         });
  //         setTimeout(() => {
  //           router.push(`/transaction?status=true`);
  //         }, 40000);
  //       } else {
  //         router.push(`/transaction?status=true`);
  //       }

  //       router.events.on(`routeChangeComplete`, () => setIsLoading(false));
  //     }
  //   } catch (error) {
  //     setIsLoading(false);
  //     handleErrorMessage(error);
  //   }
  // };

  // const redirectToPaymentPage = async () => {
  //   switch (paymentGateway) {
  //     case PGTypes.CASHFREE:
  //       await redirectToGateway();
  //       break;
  //     case PGTypes.STRIPE_AND_HYPTO:
  //       await handleConfirmPayment();
  //       break;
  //     case PGTypes.FREE:
  //       await freeNftTransaction();
  //       break;
  //     case PGTypes.AIRPAY:
  //       await handleAirpayPG();
  //       break;
  //     default:
  //       router.push(`/404`);

  //     //TODO: add other possible scenarios and set default
  //   }
  // };

  const handlePurchase = async () => {
    trackClick(click.purchase, {
      clientId,
      orderId: purchaseData?.details?.order_uuid,
    });

    setIsPurchaseDisabled(true);
    if (purchaseData && purchaseData.details.order_uuid) {
      if (purchaseData.need_kyc) {
        setIsLoading(true);
        const isKycDone = await isPanVerified();
        if (isKycDone) {
          //TODO:- It will required in upcoming release
          // redirectToPaymentPage();
          await rechargeWallet(purchaseData.details.order_uuid);
        } else {
          setIsLoading(false);
          setOpenKyc(true);
        }
      }
      //TODO:- It will required in upcoming release
      // redirectToPaymentPage();

      await rechargeWallet(purchaseData.details.order_uuid);
    }
    setIsPurchaseDisabled(false);
  };

  return (
    <ButtonLayout
      buttonComponent={
        <motion.div
          css={[styles.shareNftContainer, mixins.flexAlignJustifiedCenter]}
          className="popup-button"
          initial={{ opacity: 0, y: 200 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            default: { duration: 0.3 },
            ease: `easeIn`,
          }}
        >
          <SecondaryButton
            addStyles={styles.filterReset}
            onClick={() => {
              trackClick(click.purchaseCancel);
              onBack();
            }}
          >
            <p> {translate(`CANCEL`)} </p>
          </SecondaryButton>
          <PrimaryButton
            addStyles={styles.filterApply}
            onClick={handlePurchase}
            disabled={isPurchaseDisabled}
          >
            <p>{translate(`PURCHASE`).toUpperCase()}</p>
          </PrimaryButton>
        </motion.div>
      }
    >
      <Fragment>
        <FullScreenPopUp isOpen={submitForm}>
          {buyListingData?.metaData && (
            <AirpayPaymentForm
              airpayData={buyListingData.metaData}
              orderId={buyListingData.orderId}
            />
          )}
        </FullScreenPopUp>
        <FullScreenPopUp isOpen={openKyc}>
          <KYC setOpenKyc={(status: boolean) => setOpenKyc(status)}></KYC>
        </FullScreenPopUp>
        <FullScreenKiteLoader isOpen={isLoading}>
          <div css={styles.loaderContentInfo}>
            {translate(`PAGE_LOADING`)}...
          </div>
        </FullScreenKiteLoader>
        <div css={[styles.staticHeight]}>
          <motion.div
            css={[styles.nftHeader, mixins.flexAlignCenter]}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.1,
              default: { duration: 0.3 },
              ease: `easeIn`,
            }}
          >
            <BackButton />
            <span css={styles.nftTitle}>{translate(`PURCHASE`)}</span>
          </motion.div>
          <Fragment>
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.2,
                default: { duration: 0.3 },
                ease: `easeIn`,
              }}
            >
              {[
                {
                  image: purchaseData?.details?.nft?.image,
                  mediaType: purchaseData?.details?.nft?.media_type,
                  name: purchaseData?.details?.nft?.name,
                  quantity: purchaseData?.details?.nft?.quantity,
                },
                ...(purchaseData?.addOnOrders || []).map((item) => ({
                  image: item.nft?.image,
                  mediaType: item.nft?.media_type,
                  name: item.nft?.name,
                  quantity: String(item.nft?.quantity),
                })),
              ].map((item, index) => (
                <div css={styles.transferDetailsNft} key={index}>
                  <TransactionDetails
                    image={item?.image}
                    mediaType={item?.mediaType}
                    title={item.name}
                    qty={item.quantity}
                  />
                </div>
              ))}
              <TransactionInformation
                name={purchaseData?.details.nft.name}
                icon={AssetsImg.ic_info.src}
                title={translate(`TRANSACTION_DETAILS`)}
                date={moment(new Date().toString()).format(
                  `Do MMM, YYYY HH:mm:ss`,
                )} //{`7th Feb, 2022`}
                addOnOrders={purchaseData?.addOnOrders}
                price={purchaseData?.details?.value || ``}
                nativeCurrency={
                  purchaseData?.details?.native_currency?.currency
                }
                nativePrice={Number(
                  purchaseData?.details?.native_currency?.value,
                )}
                currency={purchaseData?.details.currency}
                fees={purchaseData?.totalFeesFiatIncludingAddons}
                nativeFees={purchaseData?.totalFeesNativeIncludingAddons?.value}
                feeBreakup={purchaseData?.feesIncludingAddons}
                nativeFeeBreakup={purchaseData?.nativeFees || []}
                quantity={
                  purchaseData?.details?.nft?.quantity
                    ? Number(purchaseData?.details?.nft?.quantity)
                    : 1
                }
                totalAmount={
                  Number(purchaseData?.totalPaymentFiatIncludingAddons).toFixed(
                    2,
                  ) || ``
                }
                totalNativeAmount={
                  purchaseData?.totalPaymentNativeIncludingAddons?.value
                }
                addStyles={styles.transactionInfoStyles}
              />
            </motion.div>
          </Fragment>
        </div>
        <BottomSheet isOpen={openPaymentStatus}>
          <Success
            title={translate(`YOUR_ORDER_IS_IN_PROGRESS`)}
            ctaText={translate(`TRACK_YOUR_ORDER`)}
            ctaClick={() => router.push(Pages.TRANSACTION)}
          ></Success>
        </BottomSheet>
        <BottomSheet
          addStyles={css({ boxShadow: `none` })}
          isOpen={transferComplete.status}
          onClose={() => {
            setTransferComplete({ ...transferComplete, status: false });
            // It will be required in upcoming releases
            // setIsFailure(true);
          }}
        >
          <Success
            title={translate(`PROCEED_TO_PAYMENT`)}
            ctaText={translate(`PROCEED_TO_PAYMENT`)}
            ctaClick={redirectToPayment}
            smallIcon={true}
            ellipse={true}
            avatar={AssetsImg.ic_transferClock.src}
          />
        </BottomSheet>
      </Fragment>
    </ButtonLayout>
  );
};

export default Purchase;
