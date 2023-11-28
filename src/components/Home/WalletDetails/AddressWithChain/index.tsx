import WalletState from '@components/Home/WalletDetails/WalletState';
import { DividerLine, SecondaryButton } from '@components/Shared';
import HeaderWithButtonLayout from '@components/Shared/HeaderWithButtonLayout';
import ConnectSitesWalletAddress from '@components/WalletConnect/ConnectSitesWalletAddress';
import { legacySignClient } from '@components/WalletConnect/utils/LegacyWalletConnectUtil';
import { CLICK } from '@constants/analytics';
import { ConnectionState } from '@constants/wallet';
import AssetsImg from '@public/images';
import { mixins, typography, utils } from '@styles/shared';
import { onCopy, textTruncate } from '@utils/helper';
import { useAnalytics } from '@utils/useAnalytics';
import { Fragment } from 'preact';
import { FC, useState } from 'react';
import * as styles from './styles';

export interface Chain {
  name: string;
  icon: string;
  address: string;
  chain?: number;
}
interface AddressWithChainProps {
  walletName: string;
  walletIcon: string;
  walletState: ConnectionState;
  chains: Chain[];
  onBack: () => void;
  onClose: () => void;
  openQrCode: (address: string) => void;
}

const AddressWithChain: FC<AddressWithChainProps> = ({
  walletName,
  walletIcon,
  walletState,
  chains,
  onBack,
  onClose,
  openQrCode,
}) => {
  const [legacySession, setLegacySession] = useState<any>(
    legacySignClient?.session,
  );
  const amplitude = useAnalytics();

  const disconnectWcSession = async () => {
    await legacySignClient.killSession();
    setLegacySession(null);
  };
  return (
    <Fragment>
      <HeaderWithButtonLayout
        title={`Wallet Address`}
        onBack={onBack}
        onClose={onClose}
        ctaContent={
          <div css={styles.ctaContainer}>
            <SecondaryButton onClick={onClose}>GOT IT</SecondaryButton>
          </div>
        }
      >
        <div css={styles.detailsContainer}>
          <div css={styles.walletTitle}>
            <div css={styles.credentials}>
              <span css={styles.imgContainer}>
                <img height={`100%`} width={`100%`} src={walletIcon} />
              </span>
              <span>{walletName}</span>
            </div>
            <WalletState state={walletState} />
          </div>

          {chains.map((chain, index) => {
            return (
              <div css={styles.chainContainer} key={index}>
                <div css={styles.chainTitle}>
                  <span>
                    <img css={styles.image} src={chain.icon} />
                  </span>
                  <span>{chain.name}</span>
                </div>
                {legacySession &&
                legacySession.connected &&
                chain.chain === legacySession.chainId ? (
                  <span css={typography.T_14_Bold}>Wallet Address</span>
                ) : (
                  <DividerLine addStyles={utils.margin(0)} />
                )}

                <div css={mixins.flexJustifiedBetween}>
                  <span css={typography.T_14_Regular}>
                    {textTruncate(chain.address, 5, 4)}
                    <img
                      css={styles.addressLogo}
                      onClick={() => {
                        amplitude.trackClick(CLICK.COPY_ADDRESS, {
                          copiedAddress: chain.address,
                        });
                        onCopy(chain.address, `Wallet Address Copied!`);
                      }}
                      src={AssetsImg.ic_copy_blue.src}
                      alt="copy"
                    />
                  </span>
                  <span
                    onClick={() => openQrCode(chain.address)}
                    css={styles.viewQr}
                  >
                    View QR Code
                  </span>
                </div>

                {legacySession &&
                  legacySession.connected &&
                  chain.chain === legacySession.chainId && (
                    <Fragment>
                      <DividerLine addStyles={utils.margin(0)} />
                      <ConnectSitesWalletAddress
                        name={legacySession.peerMeta?.name + ` (v1/legacy)`}
                        url={legacySession.peerMeta?.url}
                        logo={legacySession.peerMeta?.icons[0]}
                        onDisconnect={disconnectWcSession}
                        addStyles={styles.connectedSites}
                      />
                    </Fragment>
                  )}
              </div>
            );
          })}
        </div>
      </HeaderWithButtonLayout>
    </Fragment>
  );
};

export default AddressWithChain;
