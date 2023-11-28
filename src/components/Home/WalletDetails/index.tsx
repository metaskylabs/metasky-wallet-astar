import { FC, Fragment, useEffect, useState } from 'react';
import * as styles from './styles';
import AssetsImg from '@public/images';
import { sendMessageToParent, textTruncate } from '@utils/helper';
import { CLICK, EVENT_PAGE } from '@constants/analytics';
import { setLogout } from '@actions/auth';
import { useDispatch, useSelector } from 'react-redux';
import { IframeMessageType } from '@utils/constants';
import { ConnectionState, WalletType } from '@constants/wallet';
import { StoreState } from '@reducers';
import { State as userProfileState } from '@reducers/user';
import { useTranslate } from '@utils/useTranslate';
import HeaderWithButtonLayout from '@components/Shared/HeaderWithButtonLayout';
import WalletCard from '@components/Home/WalletDetails/WalletCard';
import {
  getConfigDetails,
  walletConfigEntities,
} from '@constants/walletConfig';
import AddressWithChain, {
  Chain,
} from '@components/Home/WalletDetails/AddressWithChain';
import QrCode from '@components/Home/WalletDetails/QrCode';
import Authentication from '@components/Authentication';
import LogoutConfirmation from '@components/Home/WalletDetails/LogoutConfirmation';
import { useAnalytics } from '@utils/useAnalytics';
import { WalletCustodyType } from '@typings/api/auth';
import { useUserSession } from '@utils/hooks/useUserSession';

interface WalletDetailsProps {
  onClose: () => void;
  isNonCustodialDisabled?: boolean;
}

enum BottomSheetComponent {
  WALLET_DETAILS = `walletDetails`,
  WALLET_ADDRESS = `walletAddress`,
  QR_CODE = `qrCode`,
  MORE_WALLET_LISTS = `walletList`,
  LOGIN_FLOW = `loginFlow`,
  LOGOUT_CONFIRMATION = `logoutConfirmation`,
}

const WalletDetails: FC<WalletDetailsProps> = ({
  onClose,
  isNonCustodialDisabled,
}) => {
  const dispatch = useDispatch();
  const [bottomSheet, setBottomSheet] = useState<{
    isOpen: boolean;
    component?: BottomSheetComponent;
    onBack?: () => void;
  }>({
    isOpen: false,
    component: BottomSheetComponent.WALLET_DETAILS,
  });
  const [qrAddress, setQrAddress] = useState<string>(``);
  const session = useUserSession();
  const { profile } = useSelector<StoreState, userProfileState>(
    (state) => state.user,
  );
  const { translate } = useTranslate();
  const amplitude = useAnalytics();
  const [connectingWallet, setConnectingWallet] = useState(false);
  const [walletAddresses, setWalletAddresses] = useState<{
    name: string;
    icon: string;
    address: Chain[];
  }>({ address: [], icon: ``, name: `` });

  const logoutUser = async () => {
    try {
      // disconnect();
      await setLogout(dispatch);
      sendMessageToParent(
        JSON.stringify({ event: IframeMessageType.logoutSuccess }),
      );
    } catch (err) {
      console.log(err);
    }
  };

  const getSkyWalletChains = () => {
    const walletAddress = profile?.allWalletAddresses?.find(
      (wallet) => wallet.type === WalletCustodyType.CUSTODIAL,
    );
    const chains: Chain[] = [];
    if (walletAddress?.address) {
      const details = getConfigDetails(walletConfigEntities.XRP);
      if (details) {
        chains.push({
          ...details,
          address: walletAddress?.address,
        });
      }
    }
    return chains;
  };

  useEffect(() => {
    if (bottomSheet.component) {
      switch (bottomSheet.component) {
        case BottomSheetComponent.WALLET_DETAILS:
          amplitude.trackPage(EVENT_PAGE.WALLET_DETAILS);
          break;
        case BottomSheetComponent.WALLET_ADDRESS:
          amplitude.trackPage(EVENT_PAGE.VIEW_ADDRESS);
          break;
        case BottomSheetComponent.QR_CODE:
          amplitude.trackPage(EVENT_PAGE.QR_CODE, { qrCodeAddress: qrAddress });
          break;
        case BottomSheetComponent.MORE_WALLET_LISTS:
          amplitude.trackPage(EVENT_PAGE.MORE_WALLET_LISTS, {});
          break;
        case BottomSheetComponent.LOGOUT_CONFIRMATION:
          amplitude.trackPage(EVENT_PAGE.LOGOUT_CONFIRMATION);
          break;
        case BottomSheetComponent.LOGIN_FLOW:
          amplitude.trackPage(EVENT_PAGE.AUTH_FLOW);
          break;
      }
    }
  }, [bottomSheet]);

  if (bottomSheet.component === BottomSheetComponent.WALLET_DETAILS) {
    return (
      <HeaderWithButtonLayout
        title={translate(`WALLET_DETAILS`)}
        onClose={() => onClose()}
      >
        <div css={styles.wrapper}>
          {session.wallets && session.wallets.includes(WalletType.SKYWALLET) && (
            <WalletCard
              image={AssetsImg.ic_metaskySoloIcon.src}
              name={getConfigDetails(walletConfigEntities.SKYWALLET).name}
              isConnected={
                session.isLoggedIn &&
                (session.wallets?.includes(WalletType.SKYWALLET) || false)
              }
              onClick={() => {
                if (
                  session.isLoggedIn &&
                  session.wallets?.includes(WalletType.SKYWALLET)
                ) {
                  amplitude.trackClick(CLICK.VIEW_ADDRESS);
                  setWalletAddresses({
                    address: getSkyWalletChains(),
                    name: getConfigDetails(
                      WalletType.SKYWALLET as any as walletConfigEntities,
                    ).name,
                    icon: getConfigDetails(
                      WalletType.SKYWALLET as any as walletConfigEntities,
                    ).icon,
                  });
                  setBottomSheet({
                    isOpen: true,
                    component: BottomSheetComponent.WALLET_ADDRESS,
                  });
                } else {
                  amplitude.trackClick(CLICK.CONNECT_WALLET);
                  setBottomSheet({
                    isOpen: true,
                    component: BottomSheetComponent.LOGIN_FLOW,
                  });
                }
              }}
            />
          )}
        </div>
      </HeaderWithButtonLayout>
    );
  } else if (bottomSheet.component === BottomSheetComponent.WALLET_ADDRESS) {
    return (
      <AddressWithChain
        walletName={walletAddresses.name}
        walletIcon={walletAddresses.icon}
        walletState={ConnectionState.CONNECTED}
        chains={walletAddresses.address}
        onBack={() => {
          amplitude.trackClick(CLICK.BACK);
          setBottomSheet({
            ...bottomSheet,
            component: BottomSheetComponent.WALLET_DETAILS,
          });
        }}
        onClose={onClose}
        openQrCode={(address) => {
          amplitude.trackClick(CLICK.VIEW_QR_CODE, { qrCodeAddress: address });
          setQrAddress(address);
          setBottomSheet({
            ...bottomSheet,
            component: BottomSheetComponent.QR_CODE,
          });
        }}
      />
    );
  } else if (bottomSheet.component === BottomSheetComponent.QR_CODE) {
    return (
      <QrCode
        address={qrAddress}
        onClose={onClose}
        onBack={() => {
          amplitude.trackClick(CLICK.BACK);
          if (bottomSheet.onBack) {
            bottomSheet.onBack();
            return;
          }
          setBottomSheet({
            ...bottomSheet,
            component: BottomSheetComponent.WALLET_ADDRESS,
          });
        }}
      />
    );
  } else if (bottomSheet.component === BottomSheetComponent.LOGIN_FLOW) {
    return (
      <Authentication
        isPopUp={true}
        onSuccess={() => {
          setBottomSheet({
            ...bottomSheet,
            component: BottomSheetComponent.WALLET_DETAILS,
          });
        }}
      />
    );
  } else if (
    bottomSheet.component === BottomSheetComponent.LOGOUT_CONFIRMATION
  ) {
    return (
      <LogoutConfirmation
        onClose={onClose}
        onConfirmation={async () => {
          await logoutUser();
          setBottomSheet({
            isOpen: false,
            component: BottomSheetComponent.LOGIN_FLOW,
          });
        }}
      />
    );
  } else {
    return null;
  }
};

export default WalletDetails;
