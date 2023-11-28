import { FC } from 'react';
import * as styles from './styles';
import { BidStatus } from '@typings/api/auctions';

interface AuctionBidTagProps {
  text: string;
}
const AuctionBidTag: FC<AuctionBidTagProps> = ({ text }) => {
  if (text === BidStatus.TOP_BID) {
    return <div css={[styles.topTag, styles.container]}>{text}</div>;
  } else if (text === BidStatus.PROCESSING_BID) {
    return <div css={[styles.processingTag, styles.container]}>{text}</div>;
  } else {
    return <div css={[styles.outTag, styles.container]}>{text}</div>;
  }
};

export default AuctionBidTag;
