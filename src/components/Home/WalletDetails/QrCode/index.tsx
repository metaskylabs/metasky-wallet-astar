import { FC, useEffect, useState } from 'react';
import { generateQR } from '@utils/qrCode';
import { handleErrorMessage } from '@utils/handleResponseToast';
import * as styles from './styles';
import { onCopy } from '@utils/helper';
import { SecondaryButton } from '@components/Shared';
import HeaderWithButtonLayout from '@components/Shared/HeaderWithButtonLayout';
import { useTranslate } from '@utils/useTranslate';
import { CLICK } from '@constants/analytics';
import { useAnalytics } from '@utils/useAnalytics';

interface QrCode {
  address: string;
  onClose: () => void;
  onBack: () => void;
}

const QrCode: FC<QrCode> = ({ address, onClose, onBack }) => {
  const [QR, setQR] = useState<string>();
  const { translate } = useTranslate();
  const amplitude = useAnalytics();

  const getQrCode = async (address: string) => {
    try {
      if (address) {
        const qrCode = await generateQR(address);
        setQR(qrCode);
      }
    } catch (e) {
      handleErrorMessage(false, translate(`QR_CODE_ERROR`));
    }
  };

  useEffect(() => {
    getQrCode(address);
  }, [address]);
  return (
    <HeaderWithButtonLayout
      title={`QR Code`}
      onBack={onBack}
      onClose={onClose}
      ctaContent={
        <div css={styles.ctaContainer}>
          <SecondaryButton
            onClick={() => {
              amplitude.trackClick(CLICK.COPY_ADDRESS, {
                copiedAddress: address,
              });
              onCopy(address, translate(`Wallet Address Copied!`));
            }}
          >
            COPY WALLET ADDRESS
          </SecondaryButton>
        </div>
      }
    >
      <div css={styles.wrapper}>
        <div css={styles.walletAddressQrCode}>
          <img height="100%" width="100%" src={QR} alt="barcode" />
        </div>
        <hr css={styles.divider} />

        <div css={styles.walletAddressCopyLink}>
          <span css={styles.walletAddressCopyLinkTitle}>
            {translate(`WALLET_ADDRESS`)}
          </span>
          <div css={styles.walletAddressLink}>{address}</div>
        </div>
      </div>
    </HeaderWithButtonLayout>
  );
};

export default QrCode;
