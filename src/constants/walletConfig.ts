import AssetsImg from '@public/images';

export enum walletConfigEntities {
  SKYWALLET = `skywallet`,
  XRP = `xrp`,
}

export const walletConfigs: {
  [id in walletConfigEntities]: { name: string; icon: string; chain?: number };
} = {
  skywallet: {
    name: `Skywallet`,
    icon: AssetsImg.ic_metaskySoloIcon.src,
  },
  xrp: {
    name: `XRP`,
    icon: `https://skywallet-public-resources.s3.ap-southeast-1.amazonaws.com/coins/xrp.png`,
  },
};

export const getConfigDetails = (
  entity: walletConfigEntities,
): { name: string; icon: string } => {
  return walletConfigs[entity];
};
