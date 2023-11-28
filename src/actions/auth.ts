import { ApiV1 } from '@actions/Axios';
import { MetaskyAPIWrap, MetaskyErrorAPIResponse } from '@typings/api/wrapper';
import {
  ForgotPinVerifyOtpPayload,
  ForgotPinVerifyOtpResponse,
  LoginUserByEmailSendOtpPayload,
  LoginUserByEmailVerifyOtpPayload,
  LoginUserByEmailVerifyOtpResponse,
  LoginUserByPhoneSendOtpPayload,
  LoginUserByPhoneVerifyOtpPayload,
  LoginUserByPhoneVerifyOtpResponse,
  setPinPayload,
  SetPinResponse,
  validatePinPayload,
  ValidatePinResponse,
} from '@typings/api/auth';
import { Dispatch } from '@utils/redux/dispatch';
import { ActionType as OwnedActionType } from '@reducers/ownedNft';
import { ActionType as AnnouncementActionType } from '@reducers/announcement';
import { ActionType as MarketplaceActionType } from '@reducers/marketplaceListing';
import { ActionType as UserActionType } from '@reducers/user';
import { ActionType as UtilsActionType } from '@reducers/utils';
import { deleteToken } from '@utils/helper';
import { LocalStorageVariables } from '@constants/authentication';
import createActions from '@utils/redux/createActions';
import { removeAccessToken, removeRefreshToken } from '@utils/cookie';

export const loginUserByPhoneSendOtp = async (
  payload: LoginUserByPhoneSendOtpPayload,
): Promise<MetaskyAPIWrap<null> | MetaskyErrorAPIResponse> => {
  const response = await ApiV1.post(`/auth2/register-phone`, payload);

  return response.data;
};

export const loginUserByEmailSendOtp = async (
  payload: LoginUserByEmailSendOtpPayload,
): Promise<MetaskyAPIWrap<null> | MetaskyErrorAPIResponse> => {
  const response = await ApiV1.post(`/auth2/register-email`, payload);

  return response.data;
};

export const loginUserByPhoneVerifyOtp = async (
  payload: LoginUserByPhoneVerifyOtpPayload,
): Promise<
  MetaskyAPIWrap<LoginUserByPhoneVerifyOtpResponse> | MetaskyErrorAPIResponse
> => {
  const response = await ApiV1.post(`/auth2/register-phone/verify`, payload);

  return response.data;
};

export const loginUserByEmailVerifyOtp = async (
  payload: LoginUserByEmailVerifyOtpPayload,
): Promise<
  MetaskyAPIWrap<LoginUserByEmailVerifyOtpResponse> | MetaskyErrorAPIResponse
> => {
  const response = await ApiV1.post(`/auth2/register-email/verify`, payload);

  return response.data;
};

export const setPin = async (
  payload: setPinPayload,
): Promise<MetaskyAPIWrap<SetPinResponse> | MetaskyErrorAPIResponse> => {
  const response = await ApiV1.post(`/auth2/set-pin`, payload);

  return response.data;
};

export const validatePin = async (
  payload: validatePinPayload,
): Promise<MetaskyAPIWrap<ValidatePinResponse> | MetaskyErrorAPIResponse> => {
  const response = await ApiV1.post(`/auth2/validate-pin`, payload);
  return response.data;
};

export const resetPin = async (
  payload: setPinPayload,
): Promise<MetaskyAPIWrap<null>> => {
  const response = await ApiV1.post(`/auth2/reset-pin/reset`, payload);
  return response.data;
};

export const forgotPinSendOtp = async (): Promise<MetaskyAPIWrap<null>> => {
  const response = await ApiV1.post(`/auth2/reset-pin/init`);
  return response.data;
};

export const forgotPinVerifyOtp = async (
  payload: ForgotPinVerifyOtpPayload,
): Promise<MetaskyAPIWrap<ForgotPinVerifyOtpResponse>> => {
  const response = await ApiV1.post(`/auth2/reset-pin/verify`, payload);
  return response.data;
};

export const setLogout = async (dispatch: Dispatch) => {
  removeAccessToken();
  removeRefreshToken();
  deleteToken(LocalStorageVariables.WALLETS);

  dispatch({
    type: OwnedActionType.RESET_NFT_LIST,
  });
  dispatch({
    type: AnnouncementActionType.RESET_ANNOUNCEMENT_DATA,
  });
  dispatch({
    type: MarketplaceActionType.RESET_MARKETPLACE_LIST,
  });
  dispatch({
    type: UserActionType.RESET_USER_PROFILE,
  });
};

export const setUserLogin = async (status: boolean) => {
  return createActions(`userLogin`, async (dispatch: Dispatch) => {
    dispatch({
      type: UserActionType.SET_USER_LOGIN,
      payload: status,
    });
  });
};

export const setSplashScreenAppeared = async (status: boolean) => {
  return createActions(`splashScreen`, async (dispatch: Dispatch) => {
    dispatch({
      type: UtilsActionType.SET_SPLASH_SCREEN_APPEARED,
      payload: status,
    });
  });
};
