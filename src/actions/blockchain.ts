export const ChainIDToRPCMap: Record<number, string> = {
  1: `https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161`,
  4: `https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161`,
  137: `https://polygon-rpc.com`,
  250: `https://rpc.ftm.tools`,
  43114: `https://api.avax.network/ext/bc/C/rpc`,
  80001: `https://rpc-mumbai.maticvigil.com`,
};

export const ChainIDToName: Record<number, string> = {
  1: `Ethereum Mainnet`,
  4: `Rinkeyby`,
  137: `Polygon Mainnet`,
  250: ``,
  43114: ``,
  80001: `Polygon mumbai`,
};

export const ChainIDToDefaultTokenAddress: Record<number, string | null> = {
  1: null,
  4: null,
  137: `0x0000000000000000000000000000000000001010`,
  250: null,
  43114: null,
  80001: `0x0000000000000000000000000000000000001010`,
};
