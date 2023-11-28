import { Dispatch } from '@utils/redux/dispatch';
import createActions from '@utils/redux/createActions';
import { ActionType } from '@reducers/user';
import { ActionType as IntercomActionType } from '@reducers/intercom';

export const getUnreadMessagesCount = (value: number) => {
  return createActions(`profileStatus`, async (dispatch: Dispatch) => {
    dispatch({
      type: IntercomActionType.SET_INTERCOM_UNREAD_MESSAGES,
      payload: value,
    });
  });
};
