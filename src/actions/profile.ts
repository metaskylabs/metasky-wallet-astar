import { ApiV1 } from '@actions/Axios';
import { AdditionalDetailsResponse } from '@typings/api/auth';
import { MetaskyAPIWrap } from '@typings/api/wrapper';
import {
  EditProfileResponse,
  UserProfileResponse,
} from '../typings/api/profile';
import createActions from '@utils/redux/createActions';
import { Dispatch } from '@utils/redux/dispatch';
import { ActionType } from '@reducers/user';

export const getUserProfile = async (): Promise<
  MetaskyAPIWrap<UserProfileResponse>
> => {
  const response = await ApiV1.get(`/profile`);

  return response.data;
};

export const editProfile = async (
  name: string,
  email: string,
): Promise<MetaskyAPIWrap<EditProfileResponse>> => {
  const response = await ApiV1.put(`/profile`, {
    name: name,
    email: email,
  });
  return response.data;
};

export const updateDemography = async (
  payload: AdditionalDetailsResponse,
): Promise<MetaskyAPIWrap<null>> => {
  const response = await ApiV1.put(`profile/updateEmailAndDemography`, payload);
  return response.data;
};
export const getBalanceSummary = async () => {
  return createActions(`summaryStatus`, async (dispatch: Dispatch) => {
    const response = await ApiV1.get(`/wallet/summary/balance`);
    dispatch({
      type: ActionType.SET_USER_SUMMARY,
      payload: response.data.data,
    });
  });
};
