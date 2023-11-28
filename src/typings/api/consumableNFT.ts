export interface getConsumableNFTPayload {
  benefit_uuid: string;
  address?: string;
  user_uuid?: string;
}
export interface consumeConsumableNFTPayload {
  benefit_uuid: string;
  nft_uuids: string[];
}
