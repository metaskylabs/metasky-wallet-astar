import { Dispatch, GetState } from '@utils/redux/dispatch';
import createActions from '@utils/redux/createActions';
import { ApiV1 } from './Axios';
import { ActionType } from '@reducers/collectionNftList';

export const getCollectionNftListing = async (
  collection_uuid: string,
  pageSize: number,
  pageNumber: number,
  sort: { key: string; value: 'ASC' | 'DESC' }[],
  onSale: string | undefined,
) => {
  return createActions(
    `collectionNftListStatus`,
    async (dispatch: Dispatch, getState: GetState) => {
      const response = await ApiV1.get(
        onSale == `` || onSale == undefined
          ? `wallet/collection/${collection_uuid}?&pageSize=${pageSize}&pageNumber=${pageNumber}&sort=${JSON.stringify(
              sort,
            )}`
          : `wallet/collection/${collection_uuid}?onSale=${onSale}&pageSize=${pageSize}&pageNumber=${pageNumber}&sort=${JSON.stringify(
              sort,
            )}`,
      );
      dispatch({
        type: ActionType.SET_COLLECTION_NFT_LIST,
        payload: {
          list: {
            listing:
              pageNumber === 1
                ? response.data.data.nfts
                : [
                    ...getState().collectionNftList.list.listing,
                    ...response.data.data.nfts,
                  ],
            count: response.data.data.size,
          },
          pageNumber:
            response.data.data.nfts.length === 0 ? pageNumber - 1 : pageNumber,
          sort: sort,
          isLoadMoreEnabled: response.data.data.nfts.length >= 10,
          name: response.data.data.name,
          id: response.data.data.id,
          image: response.data.data.image,
          media_type: response.data.data.media_type,
          size: response.data.data.size,
          description: response.data.data.description,
          creator: response.data.data.creator,
          additional_data: response.data.data.additional_data,
        },
      });
    },
    (_err) => {
      throw _err;
    },
  );
};
