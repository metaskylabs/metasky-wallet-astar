import { Fees } from '@typings/api/wallet';

export interface AirpayData {
  privatekey: string;
  checksum: string;
  mid: string;
  airpayCurrency: string;
  isocurrency: string;
  chmod: string;
  arpyVer: string;
  amount: string;
  currency: string;
  user: {
    id: string;
    email: string;
    phoneNumber: string;
    firstName: string;
    lastName: string;
  };
}

export interface AddOnOrder {
  nft: {
    id: string;
    image: string;
    quantity: number;
    name: string;
    media_type: string;
    poster: string;
  };
  currency: string;
  value: string;
  reference: string;
  totalPaymentINR: string;
  success: boolean;
  totalFeesInr: string;
  fees: Fees[];
}

export interface VerifyPanRequest {
  pan_number: string;
  name_on_pan: string;
  birth_day_on_pan: string;
  birth_month_on_pan: string;
  birth_year_on_pan: string;
}

export interface VerifyPanResponse {
  pan_verified: boolean;
}
