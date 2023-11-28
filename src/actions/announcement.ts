import { Dispatch } from '@utils/redux/dispatch';
import createActions from '@utils/redux/createActions';
import { ApiV1 } from './Axios';
import { ActionType } from '@reducers/announcement';

export const getWalletAnnouncement = async () => {
  return createActions(`announcementStatus`, async (dispatch: Dispatch) => {
    const response = await ApiV1.get(`announcements`);
    dispatch({
      type: ActionType.SET_ANNOUNCEMENT_DATA,
      payload: response.data.data,
    });
  });
};
