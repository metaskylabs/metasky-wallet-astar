export interface CollectionSummary {
  image: string;
  name: string;
  description: string;
  tokenUUID: string;
  onChainAddress: string;
  chain: string;
  chainId: string;
  symbol: string;
  instagramLink: string;
  facebookLink: string;
  discordLink: string;
  twitterLink: string;
  category: string;
  tags: string[];
  isFree: boolean;
  markeplaceId: string;
  listingId: string;
  price: number;
  claimLimit: string;
}
