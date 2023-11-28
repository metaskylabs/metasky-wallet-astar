import AssetsImg from '@public/images';
import { isMobile } from 'react-device-detect';

export enum ExternalWallet {
  METAMASK = `METAMASK`,
  COINBASE = `COINBASE`,
  TRUST = `TRUST`,
}

export enum Blockchain {
  ETHEREUM = `ETHEREUM`,
  NEAR = `NEAR`,
}

type ExternalWalletConfig = {
  displayName: string;
  id: ExternalWallet;
  icon: string;
};

const DeepLinkWalletMap: { [k: string]: ExternalWallet } = {
  MetaMask: ExternalWallet.METAMASK,
  'Trust Wallet': ExternalWallet.TRUST,
};

export function getConnectedWallet(): ExternalWallet | undefined {
  if (isMobile) {
    try {
      const deepLink = JSON.parse(
        localStorage.getItem(`WALLETCONNECT_DEEPLINK_CHOICE`) || ``,
      );
      return DeepLinkWalletMap[deepLink.name];
    } catch (error) {}
    return;
  }
  const _window: any = window;
  const windowEthereumFound =
    typeof _window !== `undefined` && typeof _window.ethereum !== `undefined`;
  const isNotWhiteListedWallet =
    windowEthereumFound &&
    ((_window.ethereum as any)?.isMetaMask ||
      (_window.ethereum as any)?.isTrust);
  const wagmiWallet = JSON.parse(localStorage.getItem(`wagmi.wallet`) || `""`);
  if (wagmiWallet === `coinbaseWallet`) return ExternalWallet.COINBASE;
  if (wagmiWallet === `walletConnect` || !isNotWhiteListedWallet) return;
  return (_window.ethereum as any)?.isMetaMask
    ? ExternalWallet.METAMASK
    : ExternalWallet.TRUST;
}

export function getExternalWalletConfig(
  wallet?: ExternalWallet,
): ExternalWalletConfig {
  switch (wallet) {
    case ExternalWallet.COINBASE:
      return {
        displayName: `Coinbase`,
        icon: AssetsImg.ic_coinbase.src,
        id: ExternalWallet.COINBASE,
      };
    case ExternalWallet.METAMASK:
      return {
        displayName: `Metamask`,
        icon: AssetsImg.ic_metamaskLogo.src,
        id: ExternalWallet.METAMASK,
      };
    case ExternalWallet.TRUST:
      return {
        displayName: `Trust Wallet`,
        icon: AssetsImg.ic_trust.src,
        id: ExternalWallet.TRUST,
      };
    default:
      return {
        displayName: `Wallet Connect`,
        icon: AssetsImg.ic_walletconnect.src,
        id: ExternalWallet.COINBASE,
      };
  }
}

export function getConnectWalletConfig() {
  return getExternalWalletConfig(getConnectedWallet());
}
