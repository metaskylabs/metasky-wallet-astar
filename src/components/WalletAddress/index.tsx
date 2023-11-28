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
import { walletConfigs } from '@constants/walletConfig';
import { WalletCustodyType } from '@typings/api/auth';
import { useUserSession } from '@utils/hooks/useUserSession';

interface WalletAddressProps {
  walletTitle?: string;
}

type ConnectedAccount = {
  address?: string;
  name?: string;
  icon?: string;
};

const WalletAddress: FC<WalletAddressProps> = ({ walletTitle }) => {
  const [selectedAccount, setSelectedAccount] = useState(-1);
  const [connectedAccounts, setConnectedAccounts] = useState<
    ConnectedAccount[]
  >([]);
  const [currentAddress, setCurrentAddress] = useState(``);
  const [QR, setQR] = useState<string>();
  const { profile } = useSelector<StoreState, userProfileState>(
    (state) => state.user,
  );
  const { translate } = useTranslate();

  useEffect(() => {
    const accounts: ConnectedAccount[] = [];
    profile?.allWalletAddresses
      ?.filter((wallet) => wallet.type === WalletCustodyType.CUSTODIAL)
      ?.forEach((wallet) => {
        accounts.push({
          address: wallet.address,
          name: walletConfigs[WalletType.SKYWALLET]?.name,
          icon: walletConfigs[WalletType.SKYWALLET]?.icon,
        });
      });
    setSelectedAccount(0);
    setConnectedAccounts(accounts);
    setCurrentAddress(accounts?.[0]?.address || ``);
  }, []);

  useEffect(() => {
    if (connectedAccounts?.[selectedAccount]?.address) {
      setCurrentAddress(connectedAccounts?.[selectedAccount]?.address || ``);
      (async () => {
        const qrCode = await generateQR(
          connectedAccounts?.[selectedAccount]?.address || ``,
        ).catch(console.log);
        setQR(qrCode || ``);
      })();
    } else {
      setCurrentAddress(``);
      setQR(``);
    }
  }, [selectedAccount]);

  const onCopy = (copyText: any) => {
    navigator.clipboard.writeText(copyText);
    generateToast({
      content: translate(`WALLET_ADDRESS_COPIED`),
      type: ToastType.SUCCESS,
    });
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
            address: account.address || ``,
            icon: account.icon || ``,
            name: account.name || ``,
          }))}
          onChange={(val) => {
            setSelectedAccount(val.id as number);
          }}
          value={{
            id: selectedAccount,
            name: connectedAccounts?.[selectedAccount]?.name || ``,
            icon: connectedAccounts?.[selectedAccount]?.icon || ``,
            address: connectedAccounts?.[selectedAccount]?.address || ``,
          }}
          iconName={`Wallet`}
          label={translate(`WALLET`)}
          error={``}
        />

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
