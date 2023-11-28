import { Dispatch } from '@utils/redux/dispatch';
import createActions from '@utils/redux/createActions';
import { ApiV1 } from './Axios';
import { ActionType } from '@reducers/ownedNft';

export const getTokensList = async (url: string, queryString?: string) => {
  return createActions(`ownedNftStatus`, async (dispatch: Dispatch) => {
    const [response, pendingTokenResponse] = await Promise.all([
      ApiV1.get(`${url}${queryString || ``}`),
      ApiV1.get(`/wallet/tokens/pending/nfts${queryString || ``}`),
    ]);
    dispatch({
      type: ActionType.SET_NFT_LIST,
      payload: [...pendingTokenResponse.data.data, ...response.data.data],
    });
  });
};
