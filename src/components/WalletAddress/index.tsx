import { FC, Fragment, useEffect, useState, ChangeEvent } from 'react';
import * as styles from './styles';
import AssetsImg from '@public/images';
import { mixins } from '@styles/shared';
import * as Constants from '@utils/constants';
import generateToast from '@components/Shared/GenerateToast';
import { ToastType } from '@components/Shared/Toast';
import { generateQR } from '@utils/qrCode';
import LabelledRadioButton from '@components/LabelledRadioButton';
import { useSelector } from 'react-redux';
import { StoreState } from '@reducers';
import { State as userProfileState } from '@reducers/user';
import { WalletType } from '@constants/wallet';
import DisclaimerText from '@components/Shared/DisclaimerText';
import * as disclaimerTextStyles from '@components/Shared/DisclaimerText/styles';
import { useTranslate } from '@utils/useTranslate';
import WalletSelect from '@components/WalletSelect';
import { getExternalWalletConfig } from '@utils/wallet';
import { walletConfigs } from '@constants/walletConfig';
import { WalletCustodyType } from '@typings/api/auth';
import { useUserSession } from '@utils/hooks/useUserSession';

interface WalletAddressProps {
  walletTitle?: string;
}
export enum networkList {
  POLYGON = `POLYGON`,
  NEAR = `NEAR`,
  ASTAR = `ASTAR`,
  ETHEREUM = `ETHEREUM`,
}

type ConnectedAccount = {
  ethAddress?: string;
  nearAddress?: string;
  name?: string;
  icon?: string;
};

const WalletAddress: FC<WalletAddressProps> = ({ walletTitle }) => {
  const [network, setNetwork] = useState<networkList>(networkList.POLYGON);
  const [selectedAccount, setSelectedAccount] = useState(0);
  const [connectedAccounts, setConnectedAccounts] = useState<
    ConnectedAccount[]
  >([]);
  const [currentAddress, setCurrentAddress] = useState(``);
  const [QR, setQR] = useState<string>();
  const { profile } = useSelector<StoreState, userProfileState>(
    (state) => state.user,
  );
  const { translate } = useTranslate();
  const { connectedWallets } = useUserSession();

  useEffect(() => {
    const accounts: ConnectedAccount[] = [];
    profile?.allWalletAddresses
      ?.filter((wallet) => wallet.type === WalletCustodyType.CUSTODIAL)
      ?.forEach((wallet) => {
        accounts.push({
          ethAddress: wallet.ethAddress,
          nearAddress: wallet.nearAddress,
          name: walletConfigs[WalletType.SKYWALLET]?.name,
          icon: walletConfigs[WalletType.SKYWALLET]?.icon,
        });
      });
    connectedWallets?.forEach((wallet) => {
      accounts.push({
        ethAddress: wallet.address,
        icon: getExternalWalletConfig(wallet.wallet).icon,
        name: getExternalWalletConfig(wallet.wallet).displayName,
      });
    });
    setSelectedAccount(0);
    setConnectedAccounts(accounts);
    setCurrentAddress(
      accounts?.[0]?.ethAddress || accounts?.[0]?.nearAddress || ``,
    );
  }, []);

  useEffect(() => {
    if (
      network === networkList.ETHEREUM ||
      (network === networkList.ASTAR &&
        connectedAccounts?.[selectedAccount]?.ethAddress) ||
      (network === networkList.POLYGON &&
        connectedAccounts?.[selectedAccount]?.ethAddress)
    ) {
      setCurrentAddress(connectedAccounts?.[selectedAccount]?.ethAddress || ``);
      (async () => {
        const qrCode = await generateQR(
          connectedAccounts?.[selectedAccount]?.ethAddress || ``,
        ).catch(console.log);
        setQR(qrCode || ``);
      })();
    } else if (
      network === networkList.NEAR &&
      connectedAccounts?.[selectedAccount]?.nearAddress
    ) {
      setCurrentAddress(
        connectedAccounts?.[selectedAccount]?.nearAddress || ``,
      );
      (async () => {
        const qrCode = await generateQR(
          connectedAccounts?.[selectedAccount]?.nearAddress || ``,
        ).catch(console.log);
        setQR(qrCode || ``);
      })();
    } else {
      setCurrentAddress(``);
      setQR(``);
    }
  }, [network, selectedAccount, connectedWallets, connectedAccounts]);

  const onCopy = (copyText: any) => {
    navigator.clipboard.writeText(copyText);
    generateToast({
      content: translate(`WALLET_ADDRESS_COPIED`),
      type: ToastType.SUCCESS,
    });
  };

  const handleChangeNetwork =
    (type: networkList) => (event: ChangeEvent<HTMLInputElement>) => {
      event.target.checked && setNetwork(type);
    };

  return (
    <Fragment>
      {walletTitle && (
        <div css={[styles.sendnftHeader, mixins.flexAlignCenter]}>
          <div css={[styles.sendnftImage, mixins.flexAlignJustifiedCenter]}>
            <img src={AssetsImg.ic_walletIcon.src} alt="wallet" />
          </div>
          <span css={styles.sendnftTitle}>{walletTitle}</span>
        </div>
      )}
      <div>
        <div css={styles.receiveDescription}>
          <DisclaimerText>
            <span css={[disclaimerTextStyles.disclaimerText]}>
              Please make sure you are receiving on an address on the same
              network as the token, otherwise the token may get lost.
            </span>
          </DisclaimerText>
        </div>
        <WalletSelect
          icon={AssetsImg.ic_formAsset.src}
          itemList={connectedAccounts.map((account, index) => ({
            id: index,
            address: account.ethAddress || ``,
            icon: account.icon || ``,
            name: account.name || ``,
          }))}
          onChange={(val) => {
            setSelectedAccount(val.id as number);
            setNetwork(networkList.POLYGON);
          }}
          value={{
            id: selectedAccount,
            name: connectedAccounts?.[selectedAccount]?.name || ``,
            icon: connectedAccounts?.[selectedAccount]?.icon || ``,
            address: connectedAccounts?.[selectedAccount]?.ethAddress || ``,
          }}
          iconName={`Wallet`}
          label={translate(`WALLET`)}
          error={``}
        />
        <div css={styles.receiveNetworkTitle}>
          {translate(`CURRENT_NETWORK`)}
        </div>
        <div css={styles.receiveNetworks}>
          <LabelledRadioButton
            disabled={!connectedAccounts?.[selectedAccount]?.ethAddress}
            checked={network === networkList.POLYGON}
            onChange={handleChangeNetwork(networkList.POLYGON)}
          >
            Polygon
          </LabelledRadioButton>
          <LabelledRadioButton
            disabled={!connectedAccounts?.[selectedAccount]?.ethAddress}
            checked={network === networkList.ASTAR}
            onChange={handleChangeNetwork(networkList.ASTAR)}
          >
            ASTAR
          </LabelledRadioButton>
          <LabelledRadioButton
            disabled={!connectedAccounts?.[selectedAccount]?.ethAddress}
            checked={network === networkList.ETHEREUM}
            onChange={handleChangeNetwork(networkList.ETHEREUM)}
          >
            ETHEREUM
          </LabelledRadioButton>
        </div>
        {QR && (
          <div css={styles.walletAddressBarcode}>
            <img height="100%" width="100%" src={QR} alt="barcode" />
          </div>
        )}

        <hr css={styles.divider} />
        <div
          css={[
            styles.walletAddressCopyLink,
            mixins.flexAlignCenterJustifiedBetween,
          ]}
        >
          <span css={styles.walletAddressCopyLinkTitle}>
            {translate(Constants.transactionDetails.walletAddress)}
          </span>
          <div
            onClick={() => onCopy(`address`)}
            css={styles.walletAddressCopyLinkIcon}
          >
            <img src={AssetsImg.ic_copy.src} alt="copy" />
          </div>
        </div>
        <div css={styles.walletAddressLink}>{currentAddress}</div>
      </div>
    </Fragment>
  );
};

export default WalletAddress;
