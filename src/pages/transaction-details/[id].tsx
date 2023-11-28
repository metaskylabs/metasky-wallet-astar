import { getTransactionById } from '@actions/wallet';
import { FullScreenKiteLoader, FullScreenPopUp } from '@components/Shared';
import TransactionDetails from '@components/Transaction/TransactionDetails';
import TransactionInformation from '@components/Transaction/NFTTransactionDetailsInformation';
import TransactionStatus from '@components/Transaction/NFTTransactionStatus';
import AssetsImg from '@public/images';
import * as styles from '@styles/Modules/transactionDetails';
import { mixins, utils } from '@styles/shared';
import * as Constants from '@utils/constants';
import { Fragment, useEffect, useState } from 'react';
import { TransactionDetails as TransactionDetailsTypings } from '@typings/api/wallet';
import { useRouter } from 'next/router';
import { handleErrorMessage } from '@utils/handleResponseToast';
import { motion } from 'framer-motion';
import FromToDetails from '@components/Transaction/FromToDetails';
import { Pages } from '@utils/navigation';
import { dateTimeFormat } from '@utils/helper';
import { EVENT_PAGE } from '@constants/analytics';
import Authentication from '@components/Authentication';
import { useTranslate } from '@utils/useTranslate';
import BottomNav from '@components/Shared/BottomNav';
import { NavTabs } from '@components/Shared/BottomNav/constants';
import HeaderWithButtonLayout from '@components/Shared/HeaderWithButtonLayout';
import { useAnalytics } from '@utils/useAnalytics';
import { useUserSession } from '@utils/hooks/useUserSession';

function TransactionsDetail() {
  const router = useRouter();
  const { query } = router;
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [totalFees, setTotalFees] = useState<number>(0);
  const [transactionDetails, setTransactionDetails] = useState<
    TransactionDetailsTypings | undefined
  >();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const { translate } = useTranslate();

  const session = useUserSession();
  const { trackPage } = useAnalytics();

  const setContent = () => {
    if (transactionDetails && transactionDetails.fees) {
      const allFees = transactionDetails?.fees.map((fee) => {
        return fee.display;
      });
      const totalFee = allFees.reduce(
        (partialSum, a) => partialSum + Number(a),
        0,
      );
      setTotalFees(totalFee);
    }
  };

  async function getTransactionDetails(transaction_id: string) {
    try {
      setIsLoading(true);
      const response = await getTransactionById(transaction_id);
      setTransactionDetails({
        ...response.data,
      });
      setIsLoading(false);
    } catch (error) {
      handleErrorMessage(error);
      setIsLoading(false);
      router.push(`${Pages.PAGE_NOT_FOUND}`);
    }
  }

  useEffect(() => {
    if (router.isReady) {
      if (query.data) {
        setTransactionDetails(JSON.parse(query?.data as string));
        setIsLoading(false);
      } else {
        const transaction_id = query.id as string;
        if (!session.isLoggedIn) {
          setIsLoggedIn(true);
        } else {
          getTransactionDetails(transaction_id);
        }
      }
    }
  }, [router.isReady, isLoggedIn]);

  useEffect(() => {
    trackPage(EVENT_PAGE.TRANSACTION_DETAIL);
  }, []);

  useEffect(() => {
    const timeIntervalId = setInterval(async () => {
      const transaction_id = query.id as string;
      if (
        transactionDetails &&
        transactionDetails?.status !== Constants.TransactionStatus.pending &&
        transactionDetails?.status !== Constants.TransactionStatus.init
      )
        return;
      if (!isLoggedIn) {
        const response = await getTransactionById(transaction_id);
        setTransactionDetails({
          ...response.data,
        });
      }
    }, 15000);
    return () => clearInterval(timeIntervalId);
  }, [router.isReady, transactionDetails, isLoggedIn]);

  useEffect(() => {
    setContent();
  }, [transactionDetails]);

  return (
    <BottomNav currentTab={NavTabs.WALLET}>
      <FullScreenPopUp isOpen={isLoggedIn}>
        <Authentication
          setLoginStatus={(status) => setIsLoggedIn(status)}
          onSuccess={() => getTransactionDetails(query.id as string)}
          isPopUp={true}
        />
      </FullScreenPopUp>
      <HeaderWithButtonLayout
        title={translate(`HISTORY`)}
        onBack={() => {
          router.push(Pages.TRANSACTION);
        }}
        secondaryBack
      >
        {isLoading ? (
          <FullScreenKiteLoader isOpen={isLoading}>
            <div css={styles.loaderContentInfo}>{translate(`LOADING`)}...</div>
          </FullScreenKiteLoader>
        ) : (
          <Fragment>
            {transactionDetails &&
              transactionDetails.status ===
                Constants.TransactionStatus.completed && (
                <img
                  css={styles.transactionConfetto}
                  src={AssetsImg.ic_confetti.src}
                />
              )}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.2,
                default: { duration: 0.3 },
                ease: `easeIn`,
              }}
              css={styles.transactionDetailsContainer}
            >
              <TransactionDetails
                image={transactionDetails?.token?.image}
                title={transactionDetails?.token?.name}
                transactionStatus={transactionDetails?.status_text}
                transactionPrice={
                  transactionDetails?.price &&
                  transactionDetails?.currency &&
                  `${transactionDetails.price} ${transactionDetails.currency}`
                }
                hideStatus
                enableRedirect={
                  transactionDetails?.token?.type ===
                  Constants.TransferRadioType.NFT
                }
                mediaType={transactionDetails?.token?.media_type}
                nftRedirect={transactionDetails?.token?.id}
                qty={transactionDetails?.quantity}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 70 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.3,
                default: { duration: 0.3 },
                ease: `easeIn`,
              }}
            >
              {transactionDetails?.sub_status &&
                transactionDetails?.sub_status?.length > 0 && (
                  <TransactionStatus
                    icon={AssetsImg.ic_document.src}
                    createdAt={transactionDetails.createdAt}
                    status={transactionDetails?.status}
                    statusText={transactionDetails?.status_text}
                    sub_status={transactionDetails?.sub_status || []}
                  />
                )}
              {transactionDetails?.fees && (
                <TransactionInformation
                  icon={AssetsImg.ic_document.src}
                  date={dateTimeFormat(transactionDetails.createdAt)}
                  hashCode={translate(`VIEW_ON_EXPLORER`)}
                  exploreLink={transactionDetails.explorer_link}
                  currency={transactionDetails.currency}
                  native_currency={transactionDetails?.native_currency}
                  name={transactionDetails?.token?.name}
                  showFeeSection={Boolean(transactionDetails?.fees)}
                  fees={totalFees}
                  feeDetails={transactionDetails?.fees || []}
                />
              )}
              <div css={styles.fromToContainer}>
                {transactionDetails?.from && (
                  <div css={styles.senderDetails}>
                    <FromToDetails
                      title={translate(`FROM`)}
                      addressOrNumber={
                        transactionDetails.from.address
                          ? transactionDetails.from.address
                          : transactionDetails.from.contactNumber
                      }
                      name={transactionDetails.from.name}
                      image={transactionDetails.from.image}
                    />
                  </div>
                )}

                {transactionDetails?.from && transactionDetails?.to && (
                  <div
                    css={[
                      styles.arrowContainer,
                      mixins.flexAlignJustifiedCenter,
                    ]}
                  >
                    <img
                      height="100%"
                      css={utils.remConverter(24)}
                      src={AssetsImg.ic_longArrowDown.src}
                    />
                  </div>
                )}

                {transactionDetails?.to && (
                  <div css={styles.receiverDetails}>
                    <FromToDetails
                      title={translate(`TO`)}
                      addressOrNumber={
                        transactionDetails.to.address
                          ? transactionDetails.to.address
                          : transactionDetails.to.contactNumber
                      }
                      name={transactionDetails.to.name}
                      image={transactionDetails.to.image}
                    />
                  </div>
                )}
              </div>
            </motion.div>
          </Fragment>
        )}
      </HeaderWithButtonLayout>
    </BottomNav>
  );
}

export default TransactionsDetail;
