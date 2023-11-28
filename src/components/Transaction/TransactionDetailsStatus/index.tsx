import { FC } from 'react';
import * as styles from './styles';
import { mixins } from '@styles/shared';
import { ProfileButton } from '@components/Shared';
import AssetsImg from '@public/images';

interface TransactionStatusProps {
  name: string;
  number?: string;
  remark?: string;
  userGenric?: string;
}

const TransactionStatus: FC<TransactionStatusProps> = ({
  userGenric,
  number,
  name,
  remark,
}) => {
  return (
    <div css={styles.transactionsDetailsFromWrapper}>
      <span css={styles.transactionsDetailsFrom}>{userGenric}</span>
      <div
        css={[
          styles.transactionsDetailsProfileContainer,
          mixins.flexAlignCenter,
        ]}
      >
        <ProfileButton image={AssetsImg.ic_avatar} />
        <div css={styles.transactionsDetailsProfileInfoContainer}>
          <span css={styles.transactionsDetailsProfileName}>{name}</span>
          <aside css={styles.transactionsDetailsProfileNumber}>{number}</aside>
        </div>
      </div>
      {remark && (
        <div css={styles.transactionsDetailsInfoBirthday}>
          <span css={styles.transactionsDetailsInfoBirthdayContent}>
            {remark}
          </span>
        </div>
      )}
    </div>
  );
};

export default TransactionStatus;
