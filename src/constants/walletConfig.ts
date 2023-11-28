import AssetsImg from '@public/images';

export enum walletConfigEntities {
  SKYWALLET = `skywallet`,
  METAMASK = `metamask`,
  NEAR = `near`,
  POLYGON = `polygon`,
  ETHEREUM = `ethereum`,
  COINBASE = `coinbase`,
  RAINBOW = `rainbow`,
}

export const walletConfigs: {
  [id: string]: { name: string; icon: string; chain?: number };
} = {
  skywallet: {
    name: `Skywallet`,
    icon: AssetsImg.ic_metaskySoloIcon.src,
  },
  metamask: {
    name: `MetaMask`,
    icon: AssetsImg.ic_metamaskLogo.src,
  },
  near: {
    name: `NEAR`,
    icon: AssetsImg.ic_nearLogo.src,
  },
  polygon: {
    name: `Polygon`,
    icon: AssetsImg.ic_polygon.src,
    chain: 137,
  },
  ethereum: {
    name: `Ethereum`,
    icon: AssetsImg.ic_ethereum.src,
    chain: 1,
  },
  // rainbow: {
  //   name: `Rainbow`,
  //   icon: AssetsImg.i_rainbow_logo.src,
  // },
  // coinbase: {
  //   name: `Coinbase`,
  //   icon: AssetsImg.i_coinbase_logo.src,
  // },
};

export const getConfigDetails = (
  entity: walletConfigEntities,
): { name: string; icon: string } => {
  return walletConfigs[entity];
};
