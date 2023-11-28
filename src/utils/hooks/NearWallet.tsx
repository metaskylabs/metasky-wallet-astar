import * as NearAPI from 'near-api-js';
import { useState } from 'react';
import { getNonce, setLogout, setUserLogin, verifyNonce } from '@actions/auth';
import { addUserSessionWallet } from '@utils/helper';
import { Logger } from '@utils/logger';
import { initContract, login, logout } from '../near/utils';
import { useRouter } from 'next/router';
import { Pages } from '@utils/navigation';
import { useDispatch } from 'react-redux';
import { Blockchain } from '@utils/wallet';
import { setAccessTokenCookie } from '@utils/cookie';

const useNearWallet = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const signIn = async () => {
    return login();
  };

  const signMessage = async (nonce: string) => {
    if (!(window as any)?.msnear) {
      await initContract();
    }
    const message = nonce;
    const account = await getAccount();
    if (account) {
      const mySign = await account.connection?.signer?.signMessage(
        Buffer.from(message),
        account.accountId,
        process.env.NEXT_PUBLIC_NEAR_NETWORK_ID,
      );
      const pubKey = Buffer.from(mySign.publicKey.data).toString(`hex`);
      const signature = Buffer.from(mySign.signature).toString(`base64`);

      return { pubKey: pubKey, signature: signature };
    }
  };

  const signOut = async () => {
    logout();
  };

  const getAccount = async () => {
    if (!(window as any)?.msnear) {
      await initContract();
    }
    const near = (window as any).msnear;
    const walletAccount = new NearAPI.WalletConnection(near, `near-ms-`);
    if (await walletAccount.isSignedInAsync()) {
      return walletAccount.account();
    }
  };

  const signInAndGenerateToken = async () => {
    try {
      if (!(window as any)?.msnear) {
        await initContract();
      }
      setIsLoading(true);
      const account = await getAccount();
      const accountId = account?.accountId;
      if (accountId) {
        try {
          const response = await getNonce({ walletAddress: accountId });
          if (response.data.nonce) {
            const credentials = await signMessage(response.data.nonce);
            const pubKey = credentials?.pubKey;
            const signature = credentials?.signature;

            if (pubKey && signature) {
              const payload = {
                message: JSON.stringify({ publicKey: pubKey }),
                chain: `NEAR`,
                signature: signature,
                walletAddress: accountId,
              };

              const response = await verifyNonce(payload);

              if (response.data.bearerToken) {
                setLogout(dispatch);
                setAccessTokenCookie(response.data.bearerToken);
                addUserSessionWallet(accountId, Blockchain.NEAR);
                setUserLogin(true);
                setIsLoading(false);
                router.push(Pages.HOME);
              } else {
                setIsLoading(false);
              }
            }
          } else {
            setIsLoading(false);
          }
        } catch (e) {
          Logger.debug(`e`, e);
          setIsLoading(false);
        }
      }
    } catch (error) {
      Logger.debug(`error`, error);
      setIsLoading(false);
    }
  };

  return {
    signIn,
    signMessage,
    signOut,
    getAccount,
    signInAndGenerateToken,
    isLoading,
  };
};

export default useNearWallet;
