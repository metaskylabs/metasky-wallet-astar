import { Chain, createConfig } from 'wagmi';

import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from '@web3modal/ethereum';
import { configureChains } from 'wagmi';
import {
  arbitrum,
  avalanche,
  bsc,
  fantom,
  mainnet,
  optimism,
  polygon,
} from 'wagmi/chains';

export const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || ``;

const pvt_net = {
  id: 111111111,
  network: `Metasky`,
  name: `Metasky`,
  nativeCurrency: {
    name: `MTASKY`,
    symbol: `MTASKY`,
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: [`https://polygonedge.metasky.me/`],
    },
    public: {
      http: [`https://polygonedge.metasky.me/`],
    },
  },
};

const sepolia: Chain = {
  id: 11155111,
  network: `sepolia`,
  name: `Sepolia`,
  nativeCurrency: { name: `Sepolia Ether`, symbol: `SEP`, decimals: 18 },
  rpcUrls: {
    alchemy: {
      http: [`https://eth-sepolia.g.alchemy.com/v2`],
      webSocket: [`wss://eth-sepolia.g.alchemy.com/v2`],
    },
    infura: {
      http: [`https://sepolia.infura.io/v3`],
      webSocket: [`wss://sepolia.infura.io/ws/v3`],
    },
    default: {
      http: [`https://rpc.sepolia.org`],
    },
    public: {
      http: [`https://rpc.sepolia.org`],
    },
  },
  blockExplorers: {
    etherscan: {
      name: `Etherscan`,
      url: `https://sepolia.etherscan.io`,
    },
    default: {
      name: `Etherscan`,
      url: `https://sepolia.etherscan.io`,
    },
  },
  testnet: true,
};

// 2. Configure wagmi client
const chains = [
  mainnet,
  polygon,
  optimism,
  arbitrum,
  avalanche,
  fantom,
  bsc,
  sepolia,
  pvt_net,
];
const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);
export const wagmiClient = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({
    projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || ``,
    chains,
  }),
  publicClient,
});

export const ethereumClient = new EthereumClient(wagmiClient, chains);
