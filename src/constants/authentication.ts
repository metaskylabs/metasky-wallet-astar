export enum AuthenticationScreen {
  authMain = `AuthMain`,
  otpVerification = `OtpVerification`,
  createPin = `CreatePin`,
  createAccount = `CreateAccount`,
  confirmedScreen = `ConfirmedScreen`,
  secondCustodialOptionPage = `SecondCustodialOptionPage`,
  emailOtpVerification = `EmailOtpVerification`,
  loginWithMetamask = `LoginWithMetamask`,
  login = `Login`,
  incorrectPin = `IncorrectPin`,
  whitelistSuccess = `WhitelistSuccess`,
  nearLoading = `NearLoading`,
}

export enum LocalStorageVariables {
  WALLETS = `MetaWallets`,
  METACLIENTID = `MetaClientID`,
  METAWHITELIST = `MetaWhiteList`,
  IS_NEAR_USER_WHITELISTED = `isNearUserWhitelisted`,
  REFER_INVITE = `ReferInvite`,
  THIRD_PARTY_AUTH_CODE = `ThirdPartyAuthCode`,
  PREFERRED_LANGUAGE = `PreferredLanguage`,
  PREFERRED_CURRENCY = `PreferredCurrency`,
  USER_REGION = `UserRegion`,
  SUKU_WHATSAPP = `SukuWhatsapp`,
}
