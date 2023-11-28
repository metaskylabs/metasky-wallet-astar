import { AxiosRequestConfig } from 'axios';
import { getToken } from '@utils/helper';
import { LocalStorageVariables } from '@constants/authentication';
import { getAccessToken, getRefreshToken } from '@utils/cookie';

export const requestInterceptors = (config: AxiosRequestConfig) => {
  const header = { AccessToken: ``, client_id: ``, RefreshToken: `` };
  header.RefreshToken = getRefreshToken() || ``;

  header.AccessToken = getAccessToken() || ``;
  if (getToken(LocalStorageVariables.METACLIENTID)) {
    header.client_id = getToken(LocalStorageVariables.METACLIENTID) as string;
  }

  config.headers = {
    ...header,
  };

  return config;
};
