export interface LoginUserByPhoneSendOtpPayload {
  ph_no: string;
}
export interface LoginUserByEmailSendOtpPayload {
  email: string;
}

export interface LoginUserByPhoneVerifyOtpPayload {
  ph_no: string;
  otp: string;
  referral_code: string;
}

export interface LoginUserByEmailVerifyOtpPayload {
  email: string | undefined;
  otp: string;
}

export interface LoginUserByPhoneVerifyOtpResponse {
  refreshToken: string;
  pin_exists: boolean;
  recovery_mode_enabled: boolean;
  preferred_recovery_mode: string;
}
export interface LoginUserByEmailVerifyOtpResponse {
  refreshToken: string;
  pin_exists: boolean;
  recovery_mode_enabled: boolean;
  preferred_recovery_mode: string;
}
export interface setPinPayload {
  pin: string;
}
export interface SetPinResponse {
  accessToken: string;
  additionalParamRequired?: {
    city?: string;
    email?: string;
    name?: string;
  } | null;
  userUUID: string;
  walletAddresses: {
    ethAddress: string;
    nearAddress: string;
  };
}

export interface validatePinPayload {
  pin: string;
}
export interface ValidatePinResponse {
  accessToken: string;
  additionalParamRequired: AdditionalDetailsResponse | null;
  walletAddresses: {
    ethAddress: string;
    nearAddress: string;
  };
  userUUID: string;
}

export interface WhitelistRequest {
  ref: string;
  refType: WhitelistRefType;
  chain?: string;
}
export enum WhitelistRefType {
  MOBILE = `mobile`,
  EMAIL = `email`,
  PUBLIC_ADDRESS = `public_address`,
}

export interface GenerateNoncePayload {
  walletAddress: string;
}

export interface GenerateNonceResponse {
  walletAddress: string;
  nonce: string;
}

export interface VerifyNoncePayload {
  signature: string;
  message: string;
  chain?: string;
  walletAddress?: string;
}

export interface VerifyNonceResponse {
  bearerToken: string; //"Token successfully created."
  walletAddresses: {
    ethAddress: string;
  };
}
export interface ForgotPinVerifyOtpPayload {
  otp: string;
}
export interface ForgotPinVerifyOtpResponse {
  accessToken: string;
}
export interface RecoveryStatus {
  recoveryModeEnabled: boolean;
  preferredRecoveryMode: string | undefined;
}

export interface CountryCodePayload {
  id?: number;
  name: string;
  code?: string | null;
  flag: string;
  phone_regex: string;
  isd_code: number;
  currency?: string;
  created_at: string;
  updated_at: string;
}

export interface AdditionalDetailsResponse {
  city?: string | undefined;
  email?: string | undefined;
  name?: string | undefined;
}

export interface ImplicitWhitelistResponse {
  isWhitelisted: boolean;
  canClaimMore: boolean;
  listingId?: string;
}

export enum WalletCustodyType {
  CUSTODIAL = `CUSTODIAL`,
  NONCUSTODIAL = `NONCUSTODIAL`,
}
