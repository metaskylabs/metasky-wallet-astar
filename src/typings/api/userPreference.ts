import { Country_Code } from '@constants/countryCode';
import { CURRENCY_SYMBOL_UNICODE } from '@constants/currency';
import { Languages } from '@constants/languages';

export interface UpdateUserPreferencePayload {
  countryCode: Country_Code;
}

export interface UpdateUserPreferenceResponse {
  id: number;
  image?: string;
  name?: string;
  email?: string;
  contactNumber?: string;
  user_preferences: UserPreference;
  walletUUID: string;
  referral_link: null;
}

export interface GetConversionRatePayload {
  fromCurrency: keyof typeof CURRENCY_SYMBOL_UNICODE;
  timestamp?: string;
}

export interface GetConversionRateResponse {
  from_currency: keyof typeof CURRENCY_SYMBOL_UNICODE;
  to_currency: keyof typeof CURRENCY_SYMBOL_UNICODE;
  exchange_rate: string;
  timestamp: string;
}

export interface GetUserPreferenceResponse {
  user_preferences: UserPreference;
}

export type UserPreference = {
  region: Country_Code;
  preferred_language: Languages;
  preferred_currency: keyof typeof CURRENCY_SYMBOL_UNICODE;
};

export interface ExchangeRates {
  id: string;
  base_currency: string;
  to_currency: string;
  conversion_factor: string;
  created_at: string;
  pair: string;
}

export type LatestConversionRatesResponse = ExchangeRates[];
