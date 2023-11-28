import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { StoreState } from '@reducers';
import { State as userProfileState } from '@reducers/user';
import { generateQR } from '@utils/qrCode';

import * as styles from '@styles/Modules/qr';
import { FullScreenPopUp, Header, PrimaryButton } from '@components/Shared';
import Authentication from '@components/Authentication';
import ButtonLayout from '@components/HOC/ButtonLayout.tsx';
import router from 'next/router';
import { Pages } from '@utils/navigation';
import { utils } from '@styles/shared';
import { usePriorityUserAccount } from '@utils/hooks/usePriorityAccount';
import { useUserSession } from '@utils/hooks/useUserSession';

const QRPage: FC = () => {
  const [QR, setQR] = useState<string>(``);
  const { isLoggedIn } = useUserSession();
  const { wallet_uuid } = usePriorityUserAccount();
  const getQR = async () => {
    if (wallet_uuid) {
      const qrCode = await generateQR(wallet_uuid || ``);
      setQR(qrCode);
    }
  };
  useEffect(() => {
    getQR();
  }, [wallet_uuid]);

  return (
    <ButtonLayout
      addStyles={utils.widthPercent(100)}
      buttonComponent={
        <div css={styles.buttonWrapper}>
          <PrimaryButton
            addStyles={utils.widthPercent(100)}
            onClick={() => router.push(Pages.HOME)}
          >
            GO TO HOME PAGE
          </PrimaryButton>
        </div>
      }
    >
      <Header title={`QR CODE`} isBackEnabled />
      <div css={styles.wrapper}>
        <FullScreenPopUp isOpen={!isLoggedIn}>
          <Authentication isPopUp={true} />
        </FullScreenPopUp>
        <div css={styles.walletAddressBarcode}>
          <img height="100%" width="100%" src={QR} alt="barcode" />
        </div>
      </div>
    </ButtonLayout>
  );
};

export default QRPage;
