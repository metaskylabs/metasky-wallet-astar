import { getNonce, verifyNonce } from '@actions/auth';
import { addUserSessionWallet } from '@utils/helper';
import generateToast from '@components/Shared/GenerateToast';
import { ToastType } from '@components/Shared/Toast';
import { handleErrorMessage } from '@utils/handleResponseToast';
import { SiweMessage } from 'siwe';
import { useDisconnect, useNetwork, useSignMessage } from 'wagmi';
import { Blockchain, getConnectedWallet } from '@utils/wallet';
import { setAccessTokenCookie } from '@utils/cookie';

const useSignInWithEthereum = () => {
  const { signMessageAsync } = useSignMessage();
  const { chain: activeChain } = useNetwork();
  const { disconnect } = useDisconnect();

  const sign = async (metamaskAddress: string) => {
    try {
      if (metamaskAddress && activeChain?.id) {
        try {
          const response = await getNonce({
            walletAddress: metamaskAddress as string,
          });
          if (response.data.nonce) {
            const nonce = response.data.nonce;
            const message = createSiweMessage(
              nonce,
              metamaskAddress as string,
              activeChain?.id,
            );
            try {
              const signature = await signMessageAsync({
                message: message.prepareMessage(),
              });
              try {
                const response = await verifyNonce({
                  message: JSON.stringify(message),
                  signature,
                });
                if (response.data.bearerToken) {
                  setAccessTokenCookie(response.data.bearerToken);
                  addUserSessionWallet(
                    metamaskAddress,
                    Blockchain.ETHEREUM,
                    getConnectedWallet(),
                  );
                } else {
                  generateToast({
                    content: `Error logging in. Please try again later`,
                    type: ToastType.ERROR,
                  });
                }
              } catch (error) {
                handleErrorMessage(error);
              }
            } catch (error: any) {
              if (error.message.includes(`User rejected`)) {
                disconnect();
              }
            }
          } else {
          }
        } catch (error) {
          handleErrorMessage(error);
        }
      }
    } catch (error) {
      handleErrorMessage(error);
    }
  };

  return { sign };
};
export const createSiweMessage = (
  nonce: string,
  address: string,
  chainId: number,
) => {
  const message = new SiweMessage({
    domain: window.location.host,
    address: address,
    // address: connectedData.data?.account,
    statement: `Sign in with Ethereum to the metasky app.`,
    uri: window.location.origin,
    version: `1`,
    chainId: chainId,
    // chainId: connectedData.data?.chain?.id,
    nonce: nonce,
  });

  return message;
};

export default useSignInWithEthereum;
