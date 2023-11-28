import * as styles from './styles';
import { FC } from 'react';
import Image from 'next/image';
import AssetsImg from '@public/images';
interface WalletCardProps {
  title: string;
  subtitle: string;
  onClick?: () => void;
  rightCTA: React.ReactNode;
}

const WalletCard: FC<WalletCardProps> = ({
  title,
  subtitle,
  onClick,
  rightCTA,
}) => {
  return (
    <div css={styles.container}>
      <div css={styles.iconBg}>
        <img src={AssetsImg.ic_wallet.src} alt="wallet icon" />
      </div>
      <div css={styles.detailsContainer}>
        <div css={styles.walletDetails}>
          <div css={styles.walletName}>{title}</div>
          <div css={styles.disconnect}>
            <p onClick={onClick}>{rightCTA}</p>
          </div>
        </div>
        <div css={styles.walletId}>{subtitle}</div>
      </div>
    </div>
  );
};

export default WalletCard;
