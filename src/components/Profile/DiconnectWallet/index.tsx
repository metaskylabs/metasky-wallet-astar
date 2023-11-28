import * as styles from './styles';
import { Timer, PrimaryButton, SecondaryButton } from '@components/Shared';
import { FC, Fragment, useState } from 'react';
import Image from 'next/image';
import AssetsImg from '@public/images';
import { colors, typography } from '@styles/shared';

interface DisconnectWalletProps {
  onCancel: () => void;
  onDisConnect: () => void;
}

const DisconnectWallet: FC<DisconnectWalletProps> = ({
  onCancel,
  onDisConnect,
}) => {
  return (
    <Fragment>
      <div css={styles.bottomSheetContainer}>
        <div css={styles.imgContainer}>
          <img src={AssetsImg.ic_disconnect.src} />
        </div>
        <div css={styles.textContainer}>
          <h2 css={styles.title}>Disconnect Wallet?</h2>
          <p css={styles.subtitle}>
            Are you sure you want to disconnect External Wallet?
          </p>
        </div>
        <div css={styles.btnContainer}>
          <SecondaryButton onClick={onCancel} addStyles={styles.cancelBtn}>
            CANCEL
          </SecondaryButton>
          <PrimaryButton
            onClick={onDisConnect}
            addStyles={styles.disconnectBtn}
          >
            DISCONNECT
          </PrimaryButton>
        </div>
      </div>
    </Fragment>
  );
};

export default DisconnectWallet;
