import { ChainIDToName, ChainIDToRPCMap } from '@actions/blockchain';
import {
  BottomFadeInAnimation,
  PrimaryButton,
  SecondaryButton,
} from '@components/Shared';
import HeaderWithButtonLayout from '@components/Shared/HeaderWithButtonLayout';
import AssetsImg from '@public/images';
import { mixins } from '@styles/shared';
import { MetaMaskChainID, NFTBlockchainMap } from '@utils/constants';
import { useTranslate } from '@utils/useTranslate';
import { getConnectWalletConfig } from '@utils/wallet';
import { wagmiClient } from '@utils/web3modal-client';
import { BigNumber } from 'ethers';
import React, { FC, useEffect, useState } from 'react';
import { useAccount, useNetwork, useSwitchNetwork } from 'wagmi';
import NetworkDropdown from '../MetamaskNetworkDropDown';
import * as styles from './styles';

type AppProps = {
  address: string;
  onContinue: () => void;
  onDisconnect: () => void;
};

interface BalanceType {
  symbol: string;
  value: BigNumber;
  name: string;
  decimals: number;
  displayValue: string;
}

const LoginWithMetamask: FC<AppProps> = ({
  address,
  onContinue,
  onDisconnect,
}) => {
  const { connector } = useAccount();

  const { translate } = useTranslate();

  const { chain } = useNetwork();

  const { switchNetworkAsync } = useSwitchNetwork();

  // const { data: signer } = useSigner();

  const [balanceData, setBalanceData] = React.useState<BalanceType | null>(
    null,
  );

  // React.useEffect(() => {
  //   const getBalance = async () => {
  //     const sdk = ThirdwebSDK.fromSigner(
  //       await connector?.getSigner({ chainId: chain?.id }),
  //     );
  //     if (sdk && signer && address) {
  //       if (chain?.id) {
  //         try {
  //           const balance = await sdk.wallet.balance();
  //           const coinName = Object.values(NFTBlockchainMap).find(
  //             (item) => item?.chainId === chain?.id,
  //           );

  //           setBalanceData({
  //             symbol: coinName ? coinName?.symbol : ``,
  //             value: balance.value || BigNumber.from(0),
  //             name: coinName ? coinName?.name : ``,
  //             decimals: 18,
  //             displayValue: BigNumber.from(
  //               balance.value || BigNumber.from(0),
  //             ).toString(),
  //           });
  //         } catch (err) {}
  //       } else {
  //         setBalanceData(null);
  //       }
  //     }
  //   };
  //   getBalance();
  // }, [signer, chain, address]);

  const [metamaskCoin, setMetamaskCoin] = useState<any>();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    if (chain) {
      const coinData = MetaMaskChainID?.find(
        (el) => Number(el.id) === chain?.id && el.name,
      );
      setMetamaskCoin(coinData);
    }
  }, [chain]);

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const onSwitchNetwork = async (chainId: number) => {
    if (switchNetworkAsync) {
      try {
        await switchNetworkAsync(chainId);
      } catch (err) {
        const provider = await connector?.getProvider();
        if (!provider?.isMetaMask || !provider.request) return;
        await provider.request({
          method: `wallet_addEthereumChain`,
          params: [
            {
              chainId: `0x` + chainId.toString(16),
              chainName: ChainIDToName[chainId],
              rpcUrls: [ChainIDToRPCMap[chainId]],
              nativeCurrency: {
                name: `Matic`,
                symbol: `MATIC`,
                decimals: 18,
              },
            },
          ],
        });
      }
    }
    setDropdownOpen(false);
  };

  return (
    <BottomFadeInAnimation delay={0.2} addedStyle={styles.mainWrapper}>
      <HeaderWithButtonLayout
        ctaContent={
          <div css={styles.buttonContainer}>
            <SecondaryButton
              addStyles={styles.disconnectButton}
              onClick={onDisconnect}
            >
              {translate(`DISCONNECT`)}
            </SecondaryButton>
            <PrimaryButton
              addStyles={styles.continueButton}
              onClick={onContinue}
            >
              {translate(`CONTINUE`)}
            </PrimaryButton>
          </div>
        }
      >
        <span css={[styles.selectNetwork, mixins.flexAlignJustifiedCenter]}>
          {translate(`CURRENT_NETWORK`)}
        </span>
        <NetworkDropdown
          handleDropdownToggle={handleDropdownToggle}
          metamaskCoin={metamaskCoin}
          onSwitchNetwork={onSwitchNetwork}
          dropdownOpen={false}
          networkData={chain}
        />
        <div css={styles.logoContainer}>
          <img
            src={getConnectWalletConfig().icon}
            alt="metamask logo"
            width={146}
            height={146}
          />
        </div>
        <div css={styles.textCenter}>
          <h2 css={styles.title}>{`Connect with ${
            getConnectWalletConfig().displayName
          }`}</h2>
          <p css={styles.subTitle}>
            {translate(`CONNECT_WITH_METAMASK_DESCRIPTION`)}
          </p>
        </div>
        <div css={styles.mb}>
          <Account
            details={`${address.substring(0, 5)}...${address.substring(
              address.length - 4,
            )}`}
            balance={
              balanceData?.displayValue ? balanceData.displayValue : undefined
            }
            symbol={balanceData?.symbol ? balanceData.symbol : undefined}
            isActive={true}
          />
        </div>
      </HeaderWithButtonLayout>
    </BottomFadeInAnimation>
  );
};

interface AccountProps {
  details: string;
  balance?: string;
  isActive: boolean;
  symbol?: string;
}

const Account: FC<AccountProps> = ({ details, balance, isActive, symbol }) => {
  return (
    <div css={styles.account}>
      <div css={styles.flexItem}></div>
      <div css={[styles.flexItem]}>
        <img src={AssetsImg.ic_metamaskAvatar.src} />
      </div>
      <div css={styles.flexItem}>
        <div>
          <div css={styles.details}>{details}</div>
          {balance && (
            <div css={styles.balance}>
              {(Number(balance) * Math.pow(10, -18)).toFixed(5)}
              {symbol ? ` ${symbol}` : ``}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginWithMetamask;
