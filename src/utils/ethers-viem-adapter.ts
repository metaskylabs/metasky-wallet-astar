import { WalletClient, getWalletClient } from '@wagmi/core';
import { providers } from 'ethers';

export function walletClientToSigner(walletClient: WalletClient) {
  const { account, chain, transport } = walletClient;
  const provider = new providers.Web3Provider(transport);
  const signer = provider.getSigner(account.address);
  return signer;
}

/** Action to convert a viem Wallet Client to an ethers.js Signer. */
export async function getEthersSigner({ chainId }: { chainId?: number } = {}) {
  const walletClient = await getWalletClient({ chainId });
  console.log({ walletClient });
  if (!walletClient) return undefined;
  return walletClientToSigner(walletClient);
}
