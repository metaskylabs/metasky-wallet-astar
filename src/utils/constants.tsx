import AssetsImg from '@public/images';
import { colors } from '@styles/shared';

export const home = {
  nfts: `NFTs`,
  connectWallet: `Connect Wallet`,
  transfer: `TRANSFER`,
  recharge: `RECHARGE_WALLET`,
  transferFromOnMeta: `TRANSFER_FROM_ONMETA`,
  purchaseFromOnMeta: `PURCHASE_FROM_ONMETA`,
  seeAll: `SEE_ALL`,
  joinCommunity: `Join our community`,
  otherLinks: `Other Links`,
  assetsYouOwn: `Assets you own are`,
  viewInAr: `View in AR`,
  buyNfts: `Buy NFTs`,
  onSale: `ON SALE`,
  scan: `Scan`,
  externalWalletConnect: `External Wallet Connect`,
};

export const makeAnOffer = {
  title: `Make an Offer`,
  offerAmount: `Enter Offer Amount`,
  createOfferInfo: `If the owner chooses to accept your offer, the NFT will be listed for
  sale at your proposed offer amount.`,
  update: `Update Price`,
  updateContent: `To allow the buyer to make the purchase, update the price of this NFT to meet the offer amount.`,
  gasFee: `Max Gas Fees Payable`,
};

export const benefits = {
  title: `Benefits`,
};

export const purchaseNFT = {
  title: `Purchase`,
};

export const benefitsDetails = {
  loremIpsum: `Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer.`,
  metaSkyToken: `Meta Token`,
  metaGameAccess: `Meta Game Access`,
};

export enum ShimmerCardSize {
  SMALL = `small`,
  MEDIUM = `medium`,
  LARGE = `large`,
}

export const filter = {
  sortBy: `Sort by`,
  ranking: `Ranking`,
  ascending: `Ascending`,
  descending: `Descending`,
  title: `Filters`,
  background: `Background`,
  hairGene: `Hair Gene`,
  faceGene: `Face Gene`,
  teethGene: `Teeth Gene`,
  noseGene: `Nose Gene`,
  filterQty: `Quantity: 15`,
};

export const nftDetails = {
  description: `DESCRIPTION`,
  createdBy: `CREATED_BY`,
  listedBy: `Listed By`,
  readMore: `Read more`,
  verified: `verified`,
  rarityRanking: `Rarity Rank`,
  quantity: `Quantity`,
  youOwned: `You Own`,
  totalQuantity: `Total`,
  price: `Price`,
  nftCardDefaultDescription: `Infinity Access Card Collection II #Moon..`,
  shareNft: `Share NFT`,
  infinityAccessCard: `Infinity Access Card`,
  exclusiveBenefits: `Exclusive Benefits`,
  properties: `Properties`,
  nft: `NFT Details`,
  tnc: `Terms & Conditions`,
  ticketDetails: `Event Details`,
  blockchain: `Blockchain`,
  auctionBids: `Auction Bids`,
};

export const nftList = {
  sendNft: `Send NFT`,
  selectNft: `Select NFTs`,
};

export const tokenDetails = {
  infinityToken: `Infinity Token (INFY)`,
};

export const tokenList = {
  tokens: `Tokens`,
  sendToken: `Send Token`,
  selectToken: `Select Tokens`,
};

export const transactionDetails = {
  walletAddress: `WALLET_ADDRESS`,
  date: `Transaction Date`,
  fees: `More Charges`,
  viewDetails: `View Details`,
  hashCode: `Hash Code`,
  Quantity: `Quantity`,
  total: `Total`,
  from: `FROM`,
  to: `TO`,
};

export const transaction = {
  title: `History`,
  received: `Received:`,
  filter: `Filter Transactions`,
};

export const viewOffer = {
  offerRejected: `Offer was rejected on`,
  offerAccepted: `Offer was accepted on`,
  offerDeleted: `Offer was deleted on`,
  actionInProgress: `Your action is in Progress`,
};

export const referAndEarn = {
  invite: `Invite`,
  referAndEarn: `Refer and Earn`,
  inviteDefaultLink: `bit.ly/dhvadjhdjkhdkhkks`,
  inviteSocialMedia: `Or Invite via Social Media`,
  referAndEarnInvite: `Earn 10 MetaSky tokens for each friend that joins using your invite link.`,
};

export enum InputType {
  text = `text`,
  number = `number`,
  checkbox = `checkbox`,
  email = `email`,
  search = `search`,
}

export enum ButtonType {
  button = `button`,
  submit = `submit`,
}

export enum TransactionStatus {
  init = `INIT`,
  sent = `SENT`,
  received = `RECEIVED`,
  failed = `FAILED`,
  pending = `PENDING`,
  completed = `COMPLETED`,
  expired = `EXPIRED`,
}

export const Authentication = {
  createPin: {
    header: `CREATE_PIN`,
    description: `CREATE_PIN_DESCRIPTION`,
    setPin: `SET_PIN`,
    reEnterPin: `RE_ENTER_PIN`,
  },
};

export enum TransferType {
  SEND = `send`,
  RECEIVE = `receive`,
}

export enum OfferType {
  OFFERRECEIVE = `OFFER RECEIVE`,
  OFFERMADE = `OFFER MADE`,
}

export enum OfferFilter {
  ACTIVE = `ACTIVE`,
  ACCEPTED = `ACCEPTED`,
  REJECTED = `REJECTED`,
  PENDING = `PENDING`,
  DELETED = `DELETED`,
}

export enum TransferRadioType {
  NFT = `nft`,
  TOKEN = `token`,
}

export enum TransactionOrderType {
  AUCTION_BID = `AUCTION_BID`,
}

export enum TokenCurrency {
  MATIC = `MATIC`,
  NEAR = `NEAR`,
  ETHEREUM = `ETHEREUM`,
  ETH = `ETH`,
}

export enum IframeMessageType {
  close = `close iframe`,
  cancelLogout = `CANCEL_LOGOUT`,
  logoutSuccess = `LOGOUT_SUCESS`,
  loggedOut = `LOGGED_OUT`,
  directPurchaseNFTInitiated = `DIRECT_PURCHASE_NFT_INITIATED`,
  directPurchaseNFTInitiationFailed = `DIRECT_PURCHASE_NFT_INITIATION_FAILED`,
  whitelistComplete = `WHITELIST_COMPLETE`,
  loginSuccess = `LOGIN_SUCCESS`,
  accountSelected = `ACCOUNT_SELECTED`,
}

export enum PWAPrompt {
  OPEN = `PWA_OPEN`,
}

export enum AnnouncementCTA {
  TRANSFEROPEN = `TRANSFER_OPEN`,
  RECHARGE_OPEN = `RECHARGE_OPEN`,
}

export enum IframeHost {
  localhost = `http://localhost:3001`,
  seedhemaut = `https://www.seedhemaut.com`,
  nayaab = `https://nayaab.world/nft`,
  earthbuddy = `https://metasky.me`,
}

export const MetaMaskChainID = [
  {
    id: `1`,
    name: `Ethereum`,
    image: AssetsImg.ic_ethereum,
  },
  {
    id: `4`,
    name: `Rinkeby`,
    image: AssetsImg.ic_ethereum,
  },
  {
    id: `5`,
    name: `Goerli`,
    image: AssetsImg.ic_ethereum,
  },
  {
    id: `137`,
    name: `Polygon`,
    image: AssetsImg.ic_polygon,
  },
  {
    id: `250`,
    name: `Fantom`,
    image: AssetsImg.ic_fantom,
  },
  {
    id: `43114`,
    name: `Avalanche`,
    image: AssetsImg.ic_avalanche,
  },
  {
    id: `80001`,
    name: `Mumbai`,
    image: AssetsImg.ic_polygon,
  },
  {
    id: `100`,
    name: `Tanuki Test`,
    image: AssetsImg.ic_avalanche,
  },
  {
    id: `101`,
    name: `Tanuki Test`,
    image: AssetsImg.ic_avalanche,
  },
];

export const NFTBlockchainMap: {
  [id: string]: {
    id: string;
    name: string;
    image: string;
    chainId: number;
    explorer: string;
    symbol: string;
    rpc?: string;
  };
} = {
  ETHEREUM_1: {
    id: `ETHEREUM_1`,
    name: `Ethereum`,
    image: AssetsImg.ic_ethereum.src,
    chainId: 1,
    explorer: `https://etherscan.io`,
    symbol: `ETH`,
  },
  ETHEREUM_11155111: {
    id: `ETHEREUM_11155111`,
    name: `Sepolia`,
    image: AssetsImg.ic_ethereum.src,
    chainId: 11155111,
    explorer: `https://sepolia.etherscan.io`,
    symbol: `SepoliaETH`,
    rpc: `https://rpc.sepolia.org`,
  },
  ETHEREUM_137: {
    id: `ETHEREUM_137`,
    name: `Polygon`,
    image: AssetsImg.ic_polygon.src,
    chainId: 137,
    explorer: `https://polygonscan.com`,
    symbol: `MATIC`,
  },
  ETHEREUM_80001: {
    id: `ETHEREUM_80001`,
    name: `Polygon Mumbai`,
    image: AssetsImg.ic_polygon.src,
    chainId: 80001,
    explorer: `https://mumbai.polygonscan.com`,
    symbol: `MATIC`,
  },
  NEAR_testnet: {
    id: `NEAR_testnet`,
    name: `NEAR`,
    image: AssetsImg.ic_nearLogo.src,
    chainId: 0,
    explorer: ``,
    symbol: `NEAR`,
  },
  NEAR_mainnet: {
    id: `NEAR_mainnet`,
    name: `NEAR`,
    image: AssetsImg.ic_nearLogo.src,
    chainId: 0,
    explorer: ``,
    symbol: `NEAR`,
  },
  METASKY_PVT_111111111: {
    id: `METASKY_PVT_111111111`,
    name: `Metasky`,
    image: AssetsImg.ic_avalanche.src,
    chainId: 111111111,
    explorer: ``,
    symbol: `MTASKY`,
    rpc: `https://polygonedge.metasky.me/`,
  },
};

export const curenciesForOffer = [
  {
    image: AssetsImg.rupee_svg.src,
    currency: `Rupee`,
  },
];

export enum maxLength {
  panCard = 10,
  minTokenTransfer = 0.1,
  ethMinTokenTransfer = 0.01,
}

export enum walletDimension {
  height = `926px`,
  width = `428px`,
}

export const PROPERTY_GRADIENT_BORDER = [
  colors.Properties_Gradient_Border_1,
  colors.Properties_Gradient_Border_1,
  colors.Properties_Gradient_Border_2,
  colors.Properties_Gradient_Border_2,
  colors.Properties_Gradient_Border_3,
  colors.Properties_Gradient_Border_3,
  colors.Grey_Border,
];

export enum PaymentError {
  content = `Oops! It looks like we were not able to take your payment. Please try again.`,
}

export const WALLET_ADDRESS_COPIED_MSG = `Wallet Address Copied!`;
