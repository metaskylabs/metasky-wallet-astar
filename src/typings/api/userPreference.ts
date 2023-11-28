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
}

export interface GetUserPreferenceResponse {
  user_preferences: UserPreference;
}

export type UserPreference = {
  region: Country_Code;
  preferred_language: Languages;
  preferred_currency: keyof typeof CURRENCY_SYMBOL_UNICODE;
};
