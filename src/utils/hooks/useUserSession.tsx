import { LocalStorageVariables } from '@constants/authentication';
import { WalletType } from '@constants/wallet';
import { Blockchain, ExternalWallet } from '@utils/wallet';
import { useCallback, useState } from 'react';
import jwt_decode from 'jwt-decode';
import { WalletCustodyType } from '@typings/api/auth';
import { getAccessToken } from '@utils/cookie';

type UserSession = {
  isLoggedIn: boolean;
  name?: string;
  email?: string;
  phone_number?: string;
  user_uuid?: string;
  token?: string;
  connectedNearWallets?: {
    wallet?: ExternalWallet | undefined;
    address: string;
    chain: Blockchain;
  }[];
  connectedWallets?: {
    wallet?: ExternalWallet | undefined;
    address: string;
    chain: Blockchain;
  }[];
  wallets?: WalletType[];
};

type TokenData = {
  created_at: string;
  email: string;
  exp: number;
  iat: number;
  id: number;
  name: string;
  phone_number: string;
  role: string;
  user_uuid: string;
  wallet_uuids?: {
    wallet_uuid: string;
    type: WalletCustodyType;
  }[];
};

export const useUserSession = (): UserSession => {
  const [data, setData] = useState<UserSession | null>(null);
  const [prevToken, setPrevToken] = useState<string | null>(null);
  const token = getAccessToken();

  const getSessionState = useCallback((token: string): UserSession => {
    if (typeof window === `undefined`) {
      return { isLoggedIn: false };
    }
    let isLoggedIn = false;
    let tokenData: TokenData | null = null;
    if (token) {
      try {
        tokenData = jwt_decode(token);
        const currentTime = Date.now() / 1000;
        const expTime = tokenData && tokenData?.exp;
        isLoggedIn = tokenData && expTime ? expTime > currentTime : false;
        setPrevToken(token);
      } catch (e) {}
    }
    const loginTypes =
      tokenData?.wallet_uuids?.map((wallet) => wallet?.type) || [];
    const connectedWallets: {
      wallet?: ExternalWallet;
      address: string;
      chain: Blockchain;
    }[] = JSON.parse(
      localStorage.getItem(LocalStorageVariables.WALLETS) || `[]`,
    );
    const _data = {
      isLoggedIn,
      ...(isLoggedIn
        ? {
            name: tokenData?.name,
            email: tokenData?.email,
            phone_number: tokenData?.phone_number,
            user_uuid: tokenData?.user_uuid,
            token: token as string,
            connectedNearWallets: Array.isArray(connectedWallets)
              ? connectedWallets.filter((w) => w.chain === Blockchain.NEAR)
              : [],
            connectedWallets: Array.isArray(connectedWallets)
              ? connectedWallets.filter((w) => w.chain === Blockchain.ETHEREUM)
              : [],
            wallets: [
              loginTypes.includes(WalletCustodyType.CUSTODIAL)
                ? [WalletType.SKYWALLET]
                : [],
              loginTypes.includes(WalletCustodyType.NONCUSTODIAL)
                ? [WalletType.METAMASK]
                : [],
            ].flat(),
          }
        : {}),
    };
    setData(_data);
    return _data;
  }, []);

  if (typeof token === `undefined`) {
    return { isLoggedIn: false };
  } else {
    return token !== prevToken || data === null ? getSessionState(token) : data;
  }
};
