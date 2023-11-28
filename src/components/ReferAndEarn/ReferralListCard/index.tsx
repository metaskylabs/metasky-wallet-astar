import { DividerLine } from '@components/Shared';
import AssetsImg from '@public/images';
import { colors, mixins, typography, utils } from '@styles/shared';
import React, { FC } from 'react';
import * as styles from './styles';
import { ReferralsData } from '@typings/api/referrals';
import { dateTimeFormat, textTruncate } from '@utils/helper';

interface ReferralListCardProps {
  data: ReferralsData;
}

const ReferralListCard: FC<ReferralListCardProps> = ({ data }) => {
  return (
    <section css={[styles.container, utils.ml(16), utils.mr(16)]}>
      <p css={styles.date}>{data?.date && dateTimeFormat(data?.date)}</p>
      <h4 css={styles.contact}>
        {data?.contact && textTruncate(data?.contact, 3, 2)}
      </h4>
      <DividerLine addStyles={styles.divider} />
      <article css={[mixins.flexAlignCenterJustifiedBetween]}>
        <div css={[mixins.flexAlignCenter]}>
          <img
            src={
              data?.status
                ? AssetsImg.ic_tertiaryCheck.src
                : AssetsImg.ic_pendingClock.src
            }
            alt=""
            css={[styles.icon, utils.mr(8)]}
          />
          <p css={styles.message}>{data?.message}</p>
        </div>
        <h2 css={data?.status ? styles.amount : styles.amountPending}>
          ₹{data?.inr_reward_amount ? data?.inr_reward_amount : `0`}
        </h2>
      </article>
    </section>
  );
};

export default ReferralListCard;
