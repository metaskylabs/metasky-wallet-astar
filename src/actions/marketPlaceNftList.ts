import { Dispatch, GetState } from '@utils/redux/dispatch';
import createActions from '@utils/redux/createActions';
import { ApiV1 } from './Axios';
import { ActionType } from '@reducers/marketPlaceNftList';

interface Filter {
  collectionID: string[];
}

export const getMarketPlaceNftListing = async (
  pageNumber: number,
  sort: { key: string; value: 'ASC' | 'DESC' }[],
  filter?: string,
) => {
  return createActions(
    `collectionNftListStatus`,
    async (dispatch: Dispatch, getState: GetState) => {
      const response = await ApiV1.get(
        `marketplace/new/listings?pageNumber=${pageNumber}&pageSize=10&sort=${JSON.stringify(
          sort,
        )}&filters=${filter}`,
      );
      dispatch({
        type: ActionType.SET_MARKETPLACE_NFT_LIST,
        payload: {
          list: {
            listing:
              pageNumber === 1
                ? response.data.data.listings
                : [
                    ...getState().marketPlaceNftList.list.listing,
                    ...response.data.data.listings,
                  ],
            count: response.data.data.size,
          },
          pageNumber:
            response.data.data.listings.length === 0
              ? pageNumber - 1
              : pageNumber,
          sort: sort,
          isLoadMoreEnabled: response.data.data.listings.length >= 10,
          collections: response.data.data.collections,
        },
      });
    },
    (_err) => {
      throw _err;
    },
  );
};
