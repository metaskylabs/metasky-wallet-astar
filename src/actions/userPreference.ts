import { ApiV1 } from '@actions/Axios';
import {
  GetUserPreferenceResponse,
  UpdateUserPreferencePayload,
  UpdateUserPreferenceResponse,
} from '@typings/api/userPreference';
import { MetaskyAPIWrap } from '@typings/api/wrapper';
import { Country_Code } from '@constants/countryCode';

export const updateUserPreference = async (
  payload: UpdateUserPreferencePayload,
): Promise<MetaskyAPIWrap<UpdateUserPreferenceResponse>> => {
  const response = await ApiV1.put(`/preferences`, payload);

  return response.data;
};

export const getUserPreferences = async (
  region?: Country_Code,
): Promise<MetaskyAPIWrap<GetUserPreferenceResponse>> => {
  const response = await ApiV1.get(
    `/preferences/fetch-preferences${region ? `?region=${region}` : ``}`,
  );
  return response.data;
};
