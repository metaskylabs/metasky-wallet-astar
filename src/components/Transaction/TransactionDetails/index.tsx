import { FC } from 'react';
import * as styles from './styles';
import { colors, mixins, typography } from '@styles/shared';
import * as Constants from '@utils/constants';
import { Video } from '@components/Shared';
import router from 'next/router';
import { css } from '@emotion/react';
import utils from '../../../styles/shared/utils';
import QuantityUpdate from '@components/QuantityUpdate';
import NOOB from '@constants/noob';
import { Pages } from '@utils/navigation';
import { useTranslate } from '@utils/useTranslate';

interface TransactionDetailsProps {
  image?: string;
  title?: string;
  imageMaxWdth?: number;
  hideStatus?: boolean;
  transactionStatus?: string;
  transactionAmountDetail?: string;
  transactionPrice?: string;
  mediaType?: string;
  enableRedirect?: boolean;
  nftRedirect?: string;
  offerNftRedirect?: boolean;
  qty?: string;
  minQauntity?: number;
  maxQuantity?: number;
  enableQuantityUpdate?: boolean;
  onQuantityUpdate?: (quantity: number) => void;
  onClick?: () => void;
  currentPrice?: string;
  offerNFTPrice?: string;
}

const TransactionDetails: FC<TransactionDetailsProps> = ({
  image,
  imageMaxWdth,
  title,
  hideStatus,
  transactionStatus,
  transactionAmountDetail,
  transactionPrice,
  mediaType,
  enableRedirect,
  nftRedirect,
  qty,
  minQauntity,
  maxQuantity,
  enableQuantityUpdate,
  onQuantityUpdate,
  onClick,
  currentPrice,
  offerNFTPrice,
  offerNftRedirect,
}) => {
  const { translate } = useTranslate();

  const shouldRedirect = () => {
    return (
      enableRedirect &&
      nftRedirect &&
      (transactionStatus === Constants.TransactionStatus.completed ||
        transactionStatus === Constants.TransactionStatus.received)
    );
  };

  const handleNftRoute = (id: string) => {
    if (shouldRedirect()) {
      router.push({
        pathname: `${Pages.NFT_DETAILS}/${id}`,
      });
    } else if (offerNftRedirect) {
      router.push({
        pathname: `/nft-details/${id}`,
      });
    }
  };
  return (
    <div
      css={[
        mixins.flexAlignCenter,
        (shouldRedirect() || offerNftRedirect) && styles.pointer,
        { width: `100%` },
      ]}
      onClick={onClick ? onClick : () => handleNftRoute(nftRedirect || ``)}
    >
      {mediaType === `image` && image && (
        <div
          css={[
            styles.transactionsDetailsImage,
            {
              maxWidth: imageMaxWdth
                ? utils.remConverter(imageMaxWdth)
                : utils.remConverter(103),
            },
          ]}
        >
          <img src={image} alt={`nft`} css={styles.transactionsImg} />
        </div>
      )}
      {mediaType === `video` && image && (
        <Video
          source={image}
          controls={false}
          autoPlay={true}
          muted={true}
          loop={true}
          playsInline={true}
          disablePictureInPicture={true}
          controlsList="nodownload"
          addStyles={styles.transactionsVideo}
        />
      )}
      <div
        css={[
          styles.transactionsDetailsInfo,
          mixins.flexJustifiedCenter,
          mixins.flexColumn,
        ]}
      >
        <section css={styles.transactionsDetailsContent}>
          <h2 css={styles.transactionsDetailsInfoTitle}>{title}</h2>
          {qty && !enableQuantityUpdate && (
            <span css={css({ ...typography.T_12_Semibold })}>
              {translate(`QTY`)} : {qty}
            </span>
          )}
          {currentPrice && offerNFTPrice && (
            <div css={[{ color: colors.Secondary_Black_Text }]}>
              <span css={[typography.T_12_Regular]}>
                {translate(`CURRENT_PRICE`)}:
              </span>
              <p css={[typography.T_14_Semibold, utils.ml(4)]}>
                ~₹{currentPrice}
              </p>
            </div>
          )}
          {!hideStatus && transactionStatus && (
            <span
              css={[
                Constants.TransactionStatus.sent === transactionStatus
                  ? styles.transactionsReceievedStatusContainer
                  : (Constants.TransactionStatus.received ||
                      Constants.TransactionStatus.completed) ===
                    transactionStatus
                  ? styles.transactionsReceievedStatusContainer
                  : Constants.TransactionStatus.pending === transactionStatus
                  ? styles.transactionsPendingStatusContainer
                  : styles.transactionsFailedStatusContainer,
                styles.transactionsListStatusContainer,
                typography.T_10_Regular,
              ]}
            >
              {transactionStatus}
            </span>
          )}
          <div
            css={[
              mixins.flexAlignCenterJustifiedBetween,
              { width: `100%`, marginTop: utils.remConverter(12) },
            ]}
          >
            {transactionAmountDetail && (
              <span css={styles.transactionAmountDetail}>
                {transactionAmountDetail}
              </span>
            )}
            {enableQuantityUpdate && (
              <QuantityUpdate
                onQuantityUpdate={onQuantityUpdate ? onQuantityUpdate : NOOB}
                quantity={Number(qty || 0)}
                maxQuantity={maxQuantity}
                minQuantity={minQauntity}
              />
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default TransactionDetails;
