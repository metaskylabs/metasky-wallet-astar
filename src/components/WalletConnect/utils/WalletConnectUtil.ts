import { Core } from '@walletconnect/core';
import { Web3Wallet, IWeb3Wallet } from '@walletconnect/web3wallet';

export let signClient: IWeb3Wallet;

export async function createSignClient(relayerRegionURL?: string) {
  const core = new Core({
    logger: `debug`,
    relayUrl: process.env.NEXT_PUBLIC_RELAY_URL,
    projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
  });
  signClient = await Web3Wallet.init({
    core: core,
    metadata: {
      name: `Skywallet`,
      description: `Metasky Wallet`,
      url: `https://wallet.metasky.me`,
      icons: [
        `https://wallet.metasky.me/_next/static/media/metasky.81b29a24.png`,
      ],
    },
  });
}
