import { FC, Fragment } from 'react';
import * as styles from './styles';
import { mixins, typography } from '@styles/shared';
import * as Constants from '@utils/constants';
import { MediaCard, Video } from '@components/Shared';
import { dateFormat } from '@utils/helper';
import { MediaType } from '@components/Shared/Card/Media';

interface TransactionsListProps {
  keyIndex?: number;
  onClick?: () => void;
  transactionData?: any;
  transactionStatus?: string;
  transactionStatusText?: string;
  transactionMediaType?: string;
}

const getStatusChipStyle = (status: Constants.TransactionStatus) => {
  if (
    [
      Constants.TransactionStatus.completed,
      Constants.TransactionStatus.received,
      Constants.TransactionStatus.sent,
    ].includes(status)
  )
    return styles.transactionsReceievedStatusContainer;
  if (
    [
      Constants.TransactionStatus.failed,
      Constants.TransactionStatus.expired,
    ].includes(status)
  )
    return styles.transactionsFailedStatusContainer;
  return styles.transactionsPendingStatusContainer;
};

const TransactionsList: FC<TransactionsListProps> = ({
  keyIndex,
  onClick,
  transactionData,
  transactionStatus,
  transactionStatusText,
  transactionMediaType,
}) => {
  return (
    <div key={keyIndex} css={[styles.transactionsList]} onClick={onClick}>
      {transactionMediaType && (
        // <div css={styles.mediaWrapper}>
        <MediaCard
          mediaType={
            transactionMediaType === `image` ? MediaType.IMAGE : MediaType.VIDEO
          }
          mediaUrl={transactionData.image}
          addedStyles={styles.transactionsImageContainer}
          mediaShimmerSize={Constants.ShimmerCardSize.MEDIUM}
        />
        // </div>
      )}
      <div css={[styles.transactionsListHeader, mixins.flexAlignCenter]}>
        <div>
          <h4 css={styles.transactionsListTitle}>{transactionData.name}</h4>
          <span
            css={[
              styles.transactionsListStatusContainer,
              getStatusChipStyle(
                transactionStatus as Constants.TransactionStatus,
              ),
            ]}
          >
            <span css={styles.statusText}>
              {transactionStatusText?.toLowerCase()}
            </span>
          </span>
        </div>
      </div>
      <div css={styles.transactionsFooter}>
        <Fragment>
          <section
            css={[styles.transactionsFooterQuantity, mixins.flexAlignBaseline]}
          >
            <p css={styles.transactionsFooterQuantityText}>
              {transactionData.quantity.toString()}
            </p>
          </section>
        </Fragment>
        <p css={styles.transactionsFooterDate}>
          {dateFormat(transactionData.created_at)}
        </p>
      </div>
    </div>
  );
};

export default TransactionsList;
