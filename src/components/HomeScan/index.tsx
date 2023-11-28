import { parseUri } from '@walletconnect/utils';
import { useEffect, useState } from 'react';
import { createLegacySignClient } from '@components/WalletConnect/utils/LegacyWalletConnectUtil';
import { signClient } from '@components/WalletConnect/utils/WalletConnectUtil';
import ScanWithInput from '@components/ScanWithInput';
import { ToastType } from '@components/Shared/Toast';
import generateToast from '@components/Shared/GenerateToast';
import { noSpecialCharacter } from '@utils/regexes';
import * as styles from './styles';
import { mixins } from '@styles/shared';
import AssetsImg from '@public/images';
import { onCopy } from '@utils/helper';
import { useTranslate } from '@utils/useTranslate';
import { WalletType } from '@constants/wallet';
import { useAnalytics } from '@utils/useAnalytics';
import { EVENT_PAGE } from '@constants/analytics';
import { useUserSession } from '@utils/hooks/useUserSession';

type Props = {
  onClose: () => void;
  onScan?: () => void;
};

export default function WalletConnectScanner({ onClose, onScan }: Props) {
  const session = useUserSession();
  const [qrscan, setQrscan] = useState<string>(``);
  const [showWalletAddress, setShowWalletAddress] = useState(false);
  const { translate } = useTranslate();
  const SUCCESS_TOAST = translate(`WALLET_ADDRESS_COPIED`);
  const { trackPage } = useAnalytics();
  useEffect(() => {
    trackPage(EVENT_PAGE.HOME_SCAN);
  }, []);
  useEffect(() => {
    if (qrscan && onScan) {
      onScan();
    }
    if (qrscan?.startsWith(`wc:`)) {
      if (session.wallets?.includes(WalletType.SKYWALLET)) {
        (async (url: string) => {
          try {
            const text = url;
            if (text) {
              const { version } = parseUri(text);
              if (version === 1) {
                createLegacySignClient({ uri: url });
              } else {
                await signClient.core.pairing.pair({ uri: url });
              }
              generateToast({
                type: ToastType.INFO,
                content: translate(`WALLET_CONNECTION_INITIATED`),
              });
            }
          } catch (err: unknown) {
            console.error(err);
          }
        })(qrscan);
        onClose();
        return;
      } else {
        generateToast({
          type: ToastType.INFO,
          content: `Wallet connect not supported for external wallet`,
        });
        return;
      }
    }
    if (noSpecialCharacter.test(qrscan) && qrscan?.length >= 42) {
      onCopy(qrscan, SUCCESS_TOAST);
      setShowWalletAddress(true);
    }
  }, [qrscan]);

  return (
    <>
      {showWalletAddress ? (
        <div css={styles.container}>
          <div css={styles.wrapper}>
            <div css={[styles.sendnftHeader, mixins.flexAlignCenter]}>
              <div css={[styles.sendnftImage, mixins.flexAlignJustifiedCenter]}>
                <img src={AssetsImg.ic_walletIcon.src} alt="wallet" />
              </div>
            </div>
            <div
              css={[
                styles.walletAddressCopyLink,
                mixins.flexAlignCenterJustifiedBetween,
              ]}
            >
              <span css={styles.walletAddressCopyLinkTitle}>
                {translate(`WALLET_ADDRESS`)}
              </span>
              <div
                onClick={() => onCopy(qrscan, SUCCESS_TOAST)}
                css={styles.walletAddressCopyLinkIcon}
              >
                <img src={AssetsImg.ic_copy.src} alt="" />
              </div>
            </div>
            <div css={styles.walletAddressLink}>{qrscan}</div>
          </div>
        </div>
      ) : (
        <ScanWithInput
          title={translate(`SCAN`)}
          buttonName={translate(`CONTINUE`)}
          inputLabel={translate(`ENTER_WALLET_CONNECT_URI_MANUALLY`)}
          inputPlaceholder={translate(`WALLET_CONNECT_URI`)}
          onScanComplete={(data) => setQrscan(data)}
          disableInput={!session.wallets?.includes(WalletType.SKYWALLET)}
        />
      )}
    </>
  );
}
