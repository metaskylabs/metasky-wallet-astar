export enum AuthenticationScreen {
  authMain = `AuthMain`,
  otpVerification = `OtpVerification`,
  createPin = `CreatePin`,
  createAccount = `CreateAccount`,
  confirmedScreen = `ConfirmedScreen`,
  secondCustodialOptionPage = `SecondCustodialOptionPage`,
  emailOtpVerification = `EmailOtpVerification`,
  login = `Login`,
  incorrectPin = `IncorrectPin`,
}

export enum LocalStorageVariables {
  WALLETS = `MetaWallets`,
  METACLIENTID = `MetaClientID`,
  METAWHITELIST = `MetaWhiteList`,
  REFER_INVITE = `ReferInvite`,
  THIRD_PARTY_AUTH_CODE = `ThirdPartyAuthCode`,
  PREFERRED_LANGUAGE = `PreferredLanguage`,
  PREFERRED_CURRENCY = `PreferredCurrency`,
  USER_REGION = `UserRegion`,
}
