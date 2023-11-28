import React, { useEffect, useState } from 'react';
import {
  disabledOption,
  image,
  inactiveAccounts,
  inputRadioBase,
  optionContainer,
  optionItem,
  optionItemContainer,
  optionItemContents,
  primaryButton,
} from './styles';
import { mixins, typography, utils } from '@styles/shared';
import { textTruncate } from '@utils/helper';
import { useSelector } from 'react-redux';
import { StoreState } from '@reducers';
import { State as userProfileState } from '@reducers/user';
import { walletConfigs } from '@constants/walletConfig';
import { WalletType } from '@constants/wallet';
import { getExternalWalletConfig } from '@utils/wallet';
import ButtonLayout from '@components/HOC/ButtonLayout.tsx';
import { PrimaryButton } from '@components/Shared';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { WalletCustodyType } from '@typings/api/auth';
import { useTranslate } from '@utils/useTranslate';
import NOOB from '@constants/noob';
import { useUserSession } from '@utils/hooks/useUserSession';
import { useWeb3Modal } from '@web3modal/react';
import useSignInWithEthereum from '@utils/hooks/Siwe';
import generateToast from '@components/Shared/GenerateToast';
import { ToastType } from '@components/Shared/Toast';

export type ConnectedAccount = {
  ethAddress?: string;
  nearAddress?: string;
  name?: string;
  icon?: string;
  disabled?: boolean;
  wallet_uuid?: string;
  type?: WalletCustodyType;
};

export interface WalletBalanceProps {
  hideEthAccounts?: boolean;
  onChange: (value?: ConnectedAccount) => void;
}

interface OptionProps {
  data: ConnectedAccount;
  isSelected?: boolean;
  isDisabled?: boolean;
}
const OptionItem: React.FC<OptionProps> = ({
  data,
  isSelected,
  isDisabled,
}) => {
  return (
    <section css={[optionItemContainer, mixins.flexAlignCenter]}>
      <input
        css={inputRadioBase}
        className="radioInput"
        type="radio"
        checked={!!isSelected}
        onChange={NOOB}
        disabled={isDisabled}
      />
      <img css={image} src={data.icon} alt={data.name} />
      <div css={[optionItemContainer]}>
        <p css={optionItemContents}>{data.name}</p>
        <p>{textTruncate(data.ethAddress, 5, 5)}</p>
      </div>
    </section>
  );
};

const AccountSelector: React.FC<WalletBalanceProps> = ({
  onChange,
  hideEthAccounts,
}) => {
  const session = useUserSession();
  const { profile } = useSelector<StoreState, userProfileState>(
    (state) => state.user,
  );
  const [connectedAccounts, setConnectedAccounts] = useState<
    ConnectedAccount[]
  >([]);
  const [selectedAccount, setSelectedAccount] = useState<ConnectedAccount>();
  const { address, isConnected } = useAccount();
  const { disconnect, disconnectAsync } = useDisconnect();
  const { connectAsync } = useConnect();
  const { translate } = useTranslate();
  const { open, isOpen } = useWeb3Modal();
  const [connectingWallet, setConnectingWallet] = useState(false);
  const SIWE = useSignInWithEthereum();

  useEffect(() => {
    const accounts: ConnectedAccount[] = [];
    profile?.allWalletAddresses
      ?.filter((wallet) => wallet.type === WalletCustodyType.CUSTODIAL)
      ?.forEach((wallet) => {
        accounts.push({
          type: WalletCustodyType.CUSTODIAL,
          wallet_uuid: wallet.wallet_uuid,
          ethAddress: wallet.ethAddress,
          nearAddress: wallet.nearAddress,
          name: walletConfigs[WalletType.SKYWALLET]?.name,
          icon: walletConfigs[WalletType.SKYWALLET]?.icon,
        });
      });
    if (!hideEthAccounts)
      session.connectedWallets?.forEach((wallet) => {
        accounts.push({
          type: WalletCustodyType.NONCUSTODIAL,
          wallet_uuid: profile?.allWalletAddresses?.find(
            (_wallet) => _wallet?.ethAddress === wallet.address,
          )?.wallet_uuid,
          ethAddress: wallet.address,
          icon: getExternalWalletConfig(wallet.wallet).icon,
          name: getExternalWalletConfig(wallet.wallet).displayName,
          disabled: wallet.address !== address,
        });
      });
    setConnectedAccounts(accounts);
    if (accounts.length === 1 && !accounts[0]?.disabled) {
      onChange(accounts[0]);
    }
    if (
      selectedAccount &&
      accounts.some(
        (account) =>
          account.ethAddress === selectedAccount.ethAddress && account.disabled,
      )
    ) {
      setSelectedAccount(undefined);
    }
    if (session.isLoggedIn && accounts.length < 1) {
      onChange(undefined);
    }
  }, [profile, address, session.connectedWallets]);

  useEffect(() => {
    if (connectingWallet && address && isConnected) {
      (async () => {
        setConnectingWallet(false);
        if (
          !session.connectedWallets?.some(
            (wallet) => wallet.address === address,
          )
        ) {
          await SIWE.sign(address);
        }
      })();
    }
  }, [connectingWallet, address, isConnected]);

  return (
    <ButtonLayout
      buttonComponent={
        <section
          css={[
            mixins.flexAlignCenterJustifiedBetween,
            utils.widthPercent(100),
          ]}
        >
          <PrimaryButton
            addStyles={primaryButton}
            onClick={() => {
              if (
                selectedAccount &&
                connectedAccounts.some(
                  (account) =>
                    account.ethAddress === selectedAccount.ethAddress &&
                    !account.disabled,
                )
              )
                onChange(selectedAccount);
              else
                generateToast({
                  type: ToastType.INFO,
                  content: `Please select an account to continue`,
                });
            }}
          >
            {translate(`CONTINUE`)}
          </PrimaryButton>
        </section>
      }
    >
      <ul css={optionContainer}>
        {connectedAccounts
          ?.filter((data) => !data.disabled)
          ?.map((data, index) => {
            return (
              <li
                key={index}
                css={[
                  optionItem,
                  mixins.flexAlignCenter,
                  mixins.flexJustifiedBetween,
                  typography.T_14_Regular,
                  data.disabled && disabledOption,
                ]}
                onClick={() => {
                  setSelectedAccount(data);
                }}
              >
                <OptionItem
                  isSelected={selectedAccount?.ethAddress === data.ethAddress}
                  data={data}
                />
              </li>
            );
          })}
      </ul>
      {connectedAccounts?.filter((data) => data.disabled).length > 0 && (
        <div css={inactiveAccounts}>
          <div>Inactive Accounts</div>
        </div>
      )}
      <ul css={optionContainer}>
        {connectedAccounts
          ?.filter((data) => data.disabled)
          ?.map((data, index) => {
            return (
              <li
                key={index}
                css={[
                  optionItem,
                  mixins.flexAlignCenter,
                  mixins.flexJustifiedBetween,
                  typography.T_14_Regular,
                  data.disabled && disabledOption,
                ]}
                onClick={async () => {
                  if (!isConnected) {
                    connectAsync({});
                    return;
                  }
                  await disconnectAsync();
                  setConnectingWallet(true);
                  open();
                }}
              >
                <OptionItem isSelected={false} data={data} isDisabled />
              </li>
            );
          })}
      </ul>
    </ButtonLayout>
  );
};

export default AccountSelector;
