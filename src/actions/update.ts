import {
  GetUpdatesResponse,
  UpdatesStatus,
  UserUpdatesStatusProps,
} from '@typings/api/update';
import createActions from '@utils/redux/createActions';
import { Dispatch } from '@utils/redux/dispatch';
import { ActionType } from '@reducers/updates';
import { ApiV1 } from '@actions/Axios';

export const getUserUpdates = async () => {
  return createActions(`userUpdatesStatus`, async (dispatch: Dispatch) => {
    const response = await ApiV1.get(`/userupdates/fetch-updates`);

    const unReadMessageFlag = await isThereAUnreadMessage(response?.data?.data);

    dispatch({
      type: ActionType.SET_USER_UPDATES,
      payload: { list: response?.data?.data, unReadMessage: unReadMessageFlag },
    });
  });
};

const isThereAUnreadMessage = async (list: GetUpdatesResponse[]) => {
  const filteredData = list.filter((element, key) => {
    return element.status === UpdatesStatus.UNREAD;
  });

  if (filteredData?.length > 0) {
    return true;
  } else {
    return false;
  }
};

export const userUpdatesStatus = async (payload: UserUpdatesStatusProps) => {
  const response = await ApiV1.post(`/userupdates/update-status`, payload);
  return response.data;
};
