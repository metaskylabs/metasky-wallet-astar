import React, { FC } from 'react';
import { Fragment } from 'preact';
import {
  DividerLine,
  SectionTitle,
  TableHeader,
  TableItem,
} from '@components/Shared';
import * as Constants from '@utils/constants';
import * as styles from './styles';
import AuctionBidTag from '@components/Auction/BidTag';
import { css } from '@emotion/react';
import { utils } from '@styles/shared';
import OutbidBanner from '@components/Auction/OutbidBanner';
import { dateTimeFormat } from '@utils/helper';
import { useTranslate } from '@utils/useTranslate';

interface BidSectionProps {
  title: string;
  bids: BidDetails[];
  isOutBidded?: boolean;
  takeBid: () => void;
}
export interface BidDetails {
  from: string;
  price: string;
  createdAt: Date;
  tagText: string;
}

const BidSection: FC<BidSectionProps> = ({
  title,
  bids,
  takeBid,
  isOutBidded,
}) => {
  const { translate } = useTranslate();

  return (
    <Fragment>
      <SectionTitle
        title={title}
        additionalStyle={
          isOutBidded
            ? css({ marginBottom: utils.remConverter(12) })
            : undefined
        }
      />
      {isOutBidded && <OutbidBanner onClick={takeBid} />}
      <TableHeader
        column1Name={translate(`FROM`)}
        column2Name={translate(`OFFERED_PRICE`)}
      />
      <div css={styles.tableContainer}>
        {bids.map((bid, index) => {
          return (
            <Fragment key={index}>
              <TableItem
                from={bid.from}
                customTag={<AuctionBidTag text={bid.tagText} />}
                price={bid.price}
                createdAt={dateTimeFormat(bid.createdAt)}
              />
              {index != bids.length - 1 && (
                <DividerLine addStyles={styles.divider} />
              )}
            </Fragment>
          );
        })}
      </div>
    </Fragment>
  );
};

export default BidSection;
