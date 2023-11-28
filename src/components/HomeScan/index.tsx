import { useEffect, useState } from 'react';
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

export default function Scanner({ onClose, onScan }: Props) {
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
          inputLabel={translate(`ENTER_ADDRESS_MANUALLY`)}
          inputPlaceholder={translate(`ADDRESS_PLACEHOLDER`)}
          onScanComplete={(data) => setQrscan(data)}
          disableInput={!session.wallets?.includes(WalletType.SKYWALLET)}
        />
      )}
    </>
  );
}
