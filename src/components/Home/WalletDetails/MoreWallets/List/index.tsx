import React, { FC } from 'react';
import { mixins } from '@styles/shared';
import * as styles from './styles';
import ConnectWalletButton from '@components/Home/WalletDetails/MoreWallets/ConnectWalletButton';
import HeaderWithButtonLayout from '@components/Shared/HeaderWithButtonLayout';
import { getExternalWalletConfig } from '@utils/wallet';

interface MoreWalletsListProps {
  onBack: () => void;
  onClose: () => void;
  onConnect: () => void;
}

const MoreWalletsList: FC<MoreWalletsListProps> = ({
  onClose,
  onBack,
  onConnect,
}) => {
  return (
    <HeaderWithButtonLayout
      title={`Add More Wallets`}
      onBack={onBack}
      onClose={onClose}
    >
      <div css={styles.listWrapper}>
        <div css={styles.listItem}>
          <div css={[mixins.flexAlignCenter, styles.walletDetails]}>
            <span css={styles.walletLogo}>
              <img
                alt="icon"
                width="100%"
                height="100%"
                src={getExternalWalletConfig()?.icon}
              />
            </span>
            <span css={styles.walletName}>
              {getExternalWalletConfig()?.displayName}
            </span>
          </div>
          <ConnectWalletButton onClick={onConnect} />
        </div>
      </div>
    </HeaderWithButtonLayout>
  );
};

export default MoreWalletsList;
