import AssetsImg from '@public/images';
import { colors } from '@styles/shared';

export const home = {
  nfts: `NFTs`,
  connectWallet: `Connect Wallet`,
  transfer: `TRANSFER`,
  recharge: `RECHARGE_WALLET`,
  seeAll: `SEE_ALL`,
  joinCommunity: `Join our community`,
  otherLinks: `Other Links`,
  assetsYouOwn: `Assets you own are`,
  viewInAr: `View in AR`,
  buyNfts: `Buy NFTs`,
  onSale: `ON SALE`,
  scan: `Scan`,
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

export enum TransferRadioType {
  NFT = `nft`,
  TOKEN = `token`,
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

export enum maxLength {
  panCard = 10,
  minTokenTransfer = 0.1,
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
