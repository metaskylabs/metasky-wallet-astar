import React, { useEffect, useState } from 'react';
import {
  disabledOption,
  image,
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
import ButtonLayout from '@components/HOC/ButtonLayout.tsx';
import { PrimaryButton } from '@components/Shared';
import { WalletCustodyType } from '@typings/api/auth';
import { useTranslate } from '@utils/useTranslate';
import NOOB from '@constants/noob';
import { useUserSession } from '@utils/hooks/useUserSession';
import generateToast from '@components/Shared/GenerateToast';
import { ToastType } from '@components/Shared/Toast';

export type ConnectedAccount = {
  address?: string;
  name?: string;
  icon?: string;
  disabled?: boolean;
  wallet_uuid?: string;
  type?: WalletCustodyType;
};

export interface WalletBalanceProps {
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
        <p>{textTruncate(data.address, 5, 5)}</p>
      </div>
    </section>
  );
};

const AccountSelector: React.FC<WalletBalanceProps> = ({ onChange }) => {
  const session = useUserSession();
  const { profile } = useSelector<StoreState, userProfileState>(
    (state) => state.user,
  );
  const [connectedAccounts, setConnectedAccounts] = useState<
    ConnectedAccount[]
  >([]);
  const [selectedAccount, setSelectedAccount] = useState<ConnectedAccount>();
  const { translate } = useTranslate();
  const [connectingWallet, setConnectingWallet] = useState(false);

  useEffect(() => {
    const accounts: ConnectedAccount[] = [];
    profile?.allWalletAddresses
      ?.filter((wallet) => wallet.type === WalletCustodyType.CUSTODIAL)
      ?.forEach((wallet) => {
        accounts.push({
          type: WalletCustodyType.CUSTODIAL,
          wallet_uuid: wallet.wallet_uuid,
          address: wallet.address,
          name: walletConfigs[WalletType.SKYWALLET]?.name,
          icon: walletConfigs[WalletType.SKYWALLET]?.icon,
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
          account.address === selectedAccount.address && account.disabled,
      )
    ) {
      setSelectedAccount(undefined);
    }
    if (session.isLoggedIn && accounts.length < 1) {
      onChange(undefined);
    }
  }, [profile]);

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
                    account.address === selectedAccount.address &&
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
                  isSelected={selectedAccount?.address === data.address}
                  data={data}
                />
              </li>
            );
          })}
      </ul>
    </ButtonLayout>
  );
};

export default AccountSelector;
