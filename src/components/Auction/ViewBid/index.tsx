import { FC, Fragment } from 'react';
import {
  DividerLine,
  Header,
  ImageWithInfo,
  InfoTable,
  SecondaryButton,
  TableRow,
} from '@components/Shared';
import AssetsImg from '@public/images';
import * as styles from './styles';
import { css } from '@emotion/react';
import Typography from '@styles/shared/typography';
import AuctionBidTag from '@components/Auction/BidTag';
import { MediaType } from '@components/Shared/Card/Media';
import { dateTimeFormat } from '@utils/helper';
import { useTranslate } from '@utils/useTranslate';

interface ViewBidProps {
  nftImage: string;
  nftName: string;
  nftMediaType: MediaType;
  tagText: string;
  bidAmount: number;
  topBidAmount: string;
  backHandler: () => void;
  placeABid: () => void;
  date: string;
}
const ViewBid: FC<ViewBidProps> = ({
  nftImage = AssetsImg.ic_yellowInfo.src,
  bidAmount,
  placeABid,
  tagText,
  date,
  nftMediaType,
  topBidAmount,
  nftName,
  backHandler,
}) => {
  const { translate } = useTranslate();
  return (
    <div css={styles.container}>
      <main css={styles.mainWrapper}>
        <div>
          <div
            css={[styles.cardWrapper, { cursor: `pointer` }]}
            onClick={backHandler}
          >
            <ImageWithInfo
              image={nftImage}
              title={nftName}
              mediaType={nftMediaType}
            >
              <div css={styles.nftInfo}>
                <span css={{ ...Typography.T_12_Regular }}>
                  {translate(`TOP_BID`)}:
                </span>
                <span
                  css={{ ...Typography.T_14_Semibold }}
                >{`₹${topBidAmount}`}</span>
              </div>
            </ImageWithInfo>
          </div>
          <div css={styles.cardWrapper}>
            <InfoTable
              icon={AssetsImg.ic_offer.src}
              title={translate(`BID_DETAILS`)}
            >
              <TableRow title={translate(`DATE`)}>
                {dateTimeFormat(date)}
              </TableRow>
              <TableRow title={translate(`STATUS`)}>
                <AuctionBidTag text={tagText} />
              </TableRow>
              <DividerLine addStyles={styles.divider} />
              <TableRow
                addStyles={css({
                  ...Typography.T_16_Bold,
                })}
                title={translate(`BID_AMOUNT`)}
              >{`₹${bidAmount}`}</TableRow>
            </InfoTable>
          </div>
        </div>
        <SecondaryButton onClick={backHandler}>
          CONTINUE TO AUCTION
        </SecondaryButton>
      </main>
    </div>
  );
};

export default ViewBid;
