import { FC } from 'react';
import * as styles from './styles';
import { typography } from '@styles/shared';
import { ConnectionState } from '@constants/wallet';
import WalletState from '@components/Home/WalletDetails/WalletState';
import { CONNECT_WALLET, VIEW_CARD } from './constants';

interface WalletCardProps {
  image: string;
  name: string | React.ReactNode;
  isConnected: boolean;
  actionText?: string;
  description?: string;
  onClick: () => void;
}

const WalletCard: FC<WalletCardProps> = ({
  image,
  name,
  isConnected,
  onClick,
  description,
  actionText,
}) => {
  return (
    <div css={styles.container}>
      <div css={styles.imgContainer}>
        <img src={image} height={`100%`} width={`100%`} />
      </div>
      <div css={styles.walletDetailsContainer}>
        <div css={styles.walletDetails}>
          <span css={typography.T_16_Bold}>{name}</span>
          <WalletState
            state={
              isConnected
                ? ConnectionState.CONNECTED
                : ConnectionState.DISCONNECTED
            }
          />
        </div>
        <div>
          {description && <div css={styles.description}>{description}</div>}
          <span onClick={onClick} css={styles.address}>
            {actionText ? actionText : isConnected ? VIEW_CARD : CONNECT_WALLET}
          </span>
        </div>
      </div>
    </div>
  );
};

export default WalletCard;
