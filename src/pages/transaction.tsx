import { getTransactions } from '@actions/wallet';
import {
  FullScreenKiteLoader,
  FullScreenPopUp,
  LottieLoader,
  SecondaryButton,
} from '@components/Shared';
import TransactionsList from '@components/Transaction/TransactionsList';
import * as styles from '@styles/Modules/transactions';
import { mixins, utils } from '@styles/shared';
import Router from 'next/router';
import { Fragment, useEffect, useState } from 'react';
import EmptyTransition from '@components/Transaction/EmptyTransaction';
import { handleErrorMessage } from '@utils/handleResponseToast';
import { motion } from 'framer-motion';
import { Pages } from '@utils/navigation';
import NOOB from '@constants/noob';
import { State as userProfileState } from '@reducers/user';
import { useSelector, useDispatch } from 'react-redux';
import { StoreState } from '@reducers';
import Authentication from '@components/Authentication';
import { useTranslate } from '@utils/useTranslate';
import { NavTabs } from '@components/Shared/BottomNav/constants';
import BottomNav from '@components/Shared/BottomNav';
import HeaderWithButtonLayout from '@components/Shared/HeaderWithButtonLayout';
import { useAnalytics } from '@utils/useAnalytics';
import { CLICK, EVENT_PAGE } from '@constants/analytics';
import {
  State as transactionHistoryListState,
  ActionType,
} from '@reducers/transactionHistoryList';

function Transactions() {
  const {
    txn_list: transactionHistoryList,
    loadCounter: transactionPage,
    loadCounterPrev: transactionPagePrev,
    clickID,
  } = useSelector<StoreState, transactionHistoryListState>(
    (state) => state.transactionHistoryList,
  );
  const { trackPage, trackClick } = useAnalytics();
  const [isNewListLoading, setIsNewListLoading] = useState<boolean>(false);
  const [isPrevListLoading, setIsPrevListLoading] = useState<boolean>(false);
  const [isLoadMoreEnabled, setIsMoreEnabled] = useState<boolean>(false);
  const [isLoadPrevEnabled, setIsLoadPrevEnabled] = useState<boolean>(false);
  const user = useSelector<StoreState, userProfileState>((state) => state.user);
  const [scrollToElementRef, setScrollToElementRef] =
    useState<HTMLDivElement | null>(null);
  const { translate } = useTranslate();
  const dispatch = useDispatch();

  useEffect(() => {
    trackPage(EVENT_PAGE.TRANSACTION);
    return () => {
      /* clear history when exiting page */
      dispatch({
        type: ActionType.CLEAR_HISTORY,
      });
    };
  }, [dispatch]);

  // useEffect to handle auto scroll to
  // specific txn when user navigates back
  useEffect(() => {
    if (scrollToElementRef) {
      scrollToElementRef.scrollIntoView(false);
    }
  }, [scrollToElementRef]);

  const fetchTransactions = async (
    page: number,
    pagePrev: number,
    state: 'NEXT' | 'PREV' | 'NONE',
  ) => {
    if (state === `PREV`) {
      setIsPrevListLoading(true);
    } else {
      setIsNewListLoading(true);
    }
    try {
      const listResp = await getTransactions(
        state === `NEXT` || state === `NONE` ? page : pagePrev,
      );
      setIsLoadPrevEnabled(pagePrev > 1);
      if (state === `NEXT` || state === `NONE`) {
        setIsMoreEnabled(listResp.data.length >= 10);
      }
      dispatch({
        type: ActionType.SET_TXN_HISTORY_DATA,
        payload: {
          txn_data: listResp.data,
          loadCounter: page,
          loadCounterPrev: pagePrev,
          state: state,
        },
      });
      setIsNewListLoading(false);
      setIsPrevListLoading(false);
    } catch (error) {
      handleErrorMessage(error);
    }
  };

  useEffect(() => {
    if (user?.isLogin) {
      fetchTransactions(
        clickID === null ? 1 : transactionPage,
        clickID === null ? 1 : transactionPagePrev,
        `NONE`,
      ).then(() => {
        dispatch({
          type: ActionType.SET_PAGE_META_DATA,
          payload: {
            clickID: null,
            pageId: clickID === null ? 1 : transactionPage,
            pageIdPrev: clickID === null ? 1 : transactionPagePrev,
          },
        });
      });
    }
  }, [user?.isLogin]);

  if (!user?.isLogin) {
    return (
      <FullScreenPopUp isOpen={true}>
        <Authentication setLoginStatus={NOOB} onSuccess={NOOB} isPopUp={true} />
      </FullScreenPopUp>
    );
  }

  const onClickTransaction = (transaction_id: string, clickIndex: number) => {
    trackClick(CLICK.TRANSACTION_CARD);
    dispatch({
      type: ActionType.SET_PAGE_META_DATA,
      payload: {
        clickID: transaction_id, // to know which txn the user clicked on,
        pageId: Math.ceil(clickIndex / 10),
        pageIdPrev: transactionPagePrev,
      },
    });
    Router.push(`${Pages.TRANSACTION_DETAILS}/${transaction_id}`);
  };

  return (
    <BottomNav currentTab={NavTabs.WALLET}>
      <FullScreenKiteLoader
        isOpen={
          transactionHistoryList === null &&
          (isNewListLoading || isPrevListLoading)
        }
      >
        <div css={styles.loaderContentInfo}>{translate(`PAGE_LOADING`)}...</div>
      </FullScreenKiteLoader>
      <HeaderWithButtonLayout
        title={translate(`HISTORY`)}
        onBack={() => {
          trackClick(CLICK.BACK);
          Router.push(Pages.HOME);
        }}
        secondaryBack
      >
        {isPrevListLoading ? (
          <div css={styles.loadingContainer}>
            <LottieLoader />
          </div>
        ) : (
          isLoadPrevEnabled && (
            <div css={styles.loadMoreContainer}>
              <SecondaryButton
                addStyles={styles.loadMoreButton}
                onClick={() =>
                  fetchTransactions(
                    transactionPage,
                    transactionPagePrev - 1,
                    `PREV`,
                  )
                }
              >
                {translate(`LOAD_PREV`)}
              </SecondaryButton>
            </div>
          )
        )}
        <div css={[mixins.flexColumn, utils.pt(5)]}>
          {transactionHistoryList &&
            transactionHistoryList.map((transaction, index) => {
              return (
                <motion.div
                  key={transaction.id}
                  initial={{ opacity: 0, y: 60 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: transactionPage === 1 ? index * 0.1 : 0,
                    default: { duration: 0.3 },
                    ease: `easeOut`,
                  }}
                  ref={(newRef) => {
                    if (transaction.id === clickID) {
                      setScrollToElementRef(newRef);
                    }
                  }}
                >
                  <TransactionsList
                    transactionData={transaction}
                    onClick={() => onClickTransaction(transaction.id, index)}
                    transactionStatus={transaction.status}
                    transactionMediaType={transaction.media_type}
                    transactionStatusText={transaction.status_text}
                  />
                </motion.div>
              );
            })}
        </div>

        {isNewListLoading ? (
          <div css={styles.loadingContainer}>
            <LottieLoader />
          </div>
        ) : (
          isLoadMoreEnabled && (
            <div css={styles.loadMoreContainer}>
              <SecondaryButton
                addStyles={styles.loadMoreButton}
                onClick={() =>
                  fetchTransactions(
                    transactionPage + 1,
                    transactionPagePrev,
                    `NEXT`,
                  )
                }
              >
                {translate(`LOAD_MORE`)}
              </SecondaryButton>
            </div>
          )
        )}

        {/* TODO:- Don't need this component in current release
          <BottomSheet isOpen={sheetOpen} onClose={handleBottomSheetClose}>
            <FilterTransaction />
          </BottomSheet> */}

        {transactionHistoryList && transactionHistoryList.length === 0 && (
          <Fragment>
            <EmptyTransition />
          </Fragment>
        )}
      </HeaderWithButtonLayout>
    </BottomNav>
  );
}

export default Transactions;
