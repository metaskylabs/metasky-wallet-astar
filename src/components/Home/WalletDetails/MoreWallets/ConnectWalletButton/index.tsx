import React, { FC } from 'react';
import * as styles from './styles';
import AssetsImg from '@public/images';
import { mixins } from '@styles/shared';

interface ConnectWalletButtonProps {
  onClick: () => void;
}

const ConnectWalletButton: FC<ConnectWalletButtonProps> = ({ onClick }) => {
  return (
    <div css={[mixins.flexAlignCenter, mixins.cursorPointer]} onClick={onClick}>
      <span css={styles.connectIcon}>
        <img
          src={AssetsImg.ic_plus.src}
          alt="icon"
          width="100%"
          height="100%"
        />
      </span>
      <span css={styles.connectText}>CONNECT WALLET</span>
    </div>
  );
};

export default ConnectWalletButton;
