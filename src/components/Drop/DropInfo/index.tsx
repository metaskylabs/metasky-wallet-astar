import { mixins, typography } from '@/styles/shared';
import { FC } from 'react';
import * as styles from './styles';
import * as Constants from '@/utils/constants';

interface TokenInformationProps {
  startDate?: string;
  endDate?: string;
}

const DropInformation: FC<TokenInformationProps> = ({ startDate, endDate }) => {
  return (
    <div
      css={[styles.tokenInformation, mixins.flexAlignCenterJustifiedBetween]}
    >
      <>
        <div css={[styles.tokenInfoContainer, mixins.flexColumn]}>
          <span>{startDate}</span>
          <aside css={[typography.T_14_Regular]}>Start Date</aside>
        </div>
        <div css={styles.tokenVerticalLine} />
        <div css={[styles.tokenInfoContainer, mixins.flexColumn]}>
          <span>{endDate}</span>
          <aside css={[typography.T_14_Regular]}>End Date</aside>
        </div>
      </>
    </div>
  );
};

export default DropInformation;
