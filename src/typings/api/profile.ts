import { UserPreference } from '@typings/api/userPreference';
import { WalletCustodyType } from './auth';

export interface UserProfileResponse {
  email: string;
  id: number;
  image: string;
  name: string;
  walletUUID: string;
  address?: string; //only of transaction api
  city?: string;
  allWalletAddresses: {
    address: string;
    type: WalletCustodyType;
    wallet_uuid: string;
  }[];
  user_preferences: UserPreference;
  contactNumber: string;
  pan_verified: boolean;
  show_email_screen: boolean;
}

export interface EditProfileResponse {
  id: number;
  image: string;
  name: string;
  email: string;
  walletUUID: string;
  contactNumber: string;
}
export interface BalanceSummary {
  total_nft_count: number;
  total_fiat_value: number;
  fiat_currency: string;
}
