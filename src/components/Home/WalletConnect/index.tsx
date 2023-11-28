import { mixins } from '@styles/shared';
import React, { FC, Fragment, useState } from 'react';
import * as styles from './styles';
import AssetsImg from '@public/images';
import { onCopy, textTruncate } from '@utils/helper';
import { useTranslate } from '@utils/useTranslate';
import ConnectSitesWalletAddress from '@components/WalletConnect/ConnectSitesWalletAddress';
import { legacySignClient } from '@components/WalletConnect/utils/LegacyWalletConnectUtil';

export type Wallet = {
  id: string;
  blockchain: string;
  address: string;
  icon: string;
};

interface WalletConnectProps {
  logo: string;
  wallets: Wallet[];
  onViewQR: (wallet: Wallet) => void;
  onConnect: () => void;
  connected: boolean;
  title: string;
}

const WalletConnect: FC<WalletConnectProps> = ({
  logo,
  onViewQR,
  onConnect,
  connected,
  title,
  wallets,
}) => {
  return (
    <div css={[styles.walletConnectedStatus]}>
      {connected && (
        <WalletConnected
          logo={logo}
          title={title}
          onViewQR={onViewQR}
          wallets={wallets}
        />
      )}
      {!connected && (
        <WalletNotConnected logo={logo} title={title} onConnect={onConnect} />
      )}
    </div>
  );
};

interface walletConnectedProps {
  wallets: Wallet[];
  logo: string;
  title: any;
  onViewQR: (wallet: Wallet) => void;
}

const WalletConnected: FC<walletConnectedProps> = ({
  wallets,
  title,
  logo,
  onViewQR,
}) => {
  const { translate } = useTranslate();

  // Wallet connect session
  const [legacySession, setLegacySession] = useState<any>(
    legacySignClient?.session,
  );
  const disconnectWcSession = async () => {
    await legacySignClient.killSession();
    setLegacySession(null);
  };
  return (
    <Fragment>
      <div css={[styles.walletConnectedContainer]}>
        <div css={[styles.walletStatusContainer]}>
          <div css={[styles.walletStatusSection, mixins.flexAlignCenter]}>
            <div css={styles.statusConnected}></div>
            <span css={styles.walletStatus}>{translate(`CONNECTED`)}</span>
          </div>
        </div>
        <div
          css={[
            mixins.flexAlignCenterJustifiedBetween,
            styles.walletConnectedBody,
          ]}
        >
          <div css={[mixins.flexAlignJustifiedCenter]}>
            <img
              src={logo}
              alt="icon"
              css={[styles.walletIcons]}
              width="100%"
              height="100%"
            />
            <p css={styles.walletTitle}>{title}</p>
          </div>
        </div>
      </div>
      <div css={[styles.walletAddressFragment]}>
        <p css={[styles.walletAddressTitle]}>{translate(`WALLET_ADDRESS`)}</p>
        {wallets.map((wallet) => (
          <div key={wallet.id} css={styles.networkAddressContainer}>
            <div>
              <img src={wallet.icon} css={styles.networkAddressLogo} />
              <span css={styles.networkName}>{wallet.blockchain}</span>
            </div>
            <div css={styles.networkAddressDivider} />
            <div css={mixins.flexJustifiedBetween}>
              <span
                onClick={() =>
                  onCopy(wallet.address, translate(`WALLET_ADDRESS_COPIED`))
                }
              >
                <span css={styles.networkAddress}>
                  {textTruncate(wallet.address, 6, 6)}
                </span>
                <img
                  src={AssetsImg.ic_copy_blue.src}
                  css={styles.networkAddressLogo}
                />
              </span>
              <span
                css={styles.viewCodeButton}
                onClick={() => onViewQR(wallet)}
              >
                {translate(`VIEW_QR_CODE`)}
              </span>
            </div>
          </div>
        ))}

        {legacySession && legacySession.connected ? (
          <ConnectSitesWalletAddress
            name={legacySession.peerMeta?.name + ` (v1/legacy)`}
            url={legacySession.peerMeta?.url}
            logo={legacySession.peerMeta?.icons[0]}
            onDisconnect={disconnectWcSession}
          />
        ) : null}
      </div>
    </Fragment>
  );
};

interface WalletNotConnectedProps {
  title: string;
  logo: string;
  onConnect: () => void;
}

const WalletNotConnected: FC<WalletNotConnectedProps> = ({
  title,
  logo,
  onConnect,
}) => {
  const { translate } = useTranslate();
  return (
    <Fragment>
      <div css={[styles.walletBarcode, mixins.flexAlignCenterJustifiedBetween]}>
        <div css={[mixins.flexAlignJustifiedCenter]}>
          <img
            src={logo}
            alt="icon"
            css={[styles.walletIcons]}
            width="100%"
            height="100%"
          />
          <p css={styles.walletTitle}>{title}</p>
        </div>
        <div css={[mixins.flexAlignCenter]} onClick={onConnect}>
          <span css={[styles.walletConnect, mixins.flexAlignCenter]}>
            <img
              src={AssetsImg.ic_plus.src}
              alt="icon"
              width="100%"
              height="100%"
            />
          </span>
          <div css={styles.walletConnectText}>
            {translate(`CONNECT_WALLET_S`)}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default WalletConnect;
