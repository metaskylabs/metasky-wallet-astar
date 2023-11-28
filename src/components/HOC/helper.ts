//TODO: Move all HOC functions to this file and call them in HOC to maintain cleaner code

import { createOrUpdateToken, sendMessageToParent } from '@utils/helper';
import { IframeMessageType } from '@utils/constants';
import { LocalStorageVariables } from '@constants/authentication';
import { ParsedUrlQuery } from 'querystring';
import { State as userProfileState } from '@reducers/user';
import { getPriorityAccount } from '@utils/hooks/usePriorityAccount';
import { getAccessToken } from '@utils/cookie';

const handleResize = (ref: any) => {
  if (ref?.current) {
    document.documentElement.style.setProperty(
      `--hocWidth`,
      ref.current.offsetWidth + `px`,
    );
    document.documentElement.style.setProperty(
      `--hocHeight`,
      ref.current.offsetHeight + `px`,
    );
    document.documentElement.style.setProperty(
      `--containerHeight`,
      (window.innerHeight - ref.current.offsetHeight) / 2 + `px`,
    );
    document.documentElement.style.setProperty(
      `--appHeight`,
      window.innerHeight + `px`,
    );
  }
};

const sendingMessageToParent = (user: userProfileState) => {
  if (user?.profile && user?.isLogin) {
    sendMessageToParent(
      JSON.stringify({
        event: IframeMessageType.loginSuccess,
        payload: {
          bearerToken: getAccessToken(),
          walletAddress: getPriorityAccount(user),
        },
      }),
    );
  }
};

const setTokens = (query: ParsedUrlQuery) => {
  const { client_id, whitelist, third_party_auth_code } = query;

  if (client_id) {
    createOrUpdateToken(
      LocalStorageVariables.METACLIENTID,
      client_id.toString(),
    );
  }
  if (whitelist) {
    createOrUpdateToken(LocalStorageVariables.METAWHITELIST, `${whitelist}`);
  }
  if (third_party_auth_code) {
    createOrUpdateToken(
      LocalStorageVariables.THIRD_PARTY_AUTH_CODE,
      third_party_auth_code.toString(),
    );
  }
};

export { handleResize, sendingMessageToParent, setTokens };
