import { FetchingState } from '@constants/redux';
import { ActionType } from '@reducers/index';
import { localStore } from '@utils/redux/createStore';
import { AxiosError } from 'axios';
import { Dispatch, GetState } from './dispatch';

const { dispatch, getState } = localStore;

const createActions = async function <T>(
  key: string,
  actionDispatcher: (d: Dispatch, getState: GetState) => Promise<T>,
  failCb?: (error: AxiosError, d: Dispatch) => void,
): Promise<T | undefined> {
  dispatch({
    type: ActionType.STATUS_UPDATE,
    payload: { [key]: FetchingState.PENDING },
  });

  try {
    const result = await actionDispatcher(dispatch, getState);

    dispatch({
      type: ActionType.STATUS_UPDATE,
      payload: { [key]: FetchingState.SUCCESS },
    });

    return result;
  } catch (e) {
    failCb && failCb(e as AxiosError, dispatch);
    dispatch({
      type: ActionType.STATUS_UPDATE,
      payload: { [key]: FetchingState.FAIL },
    });

    return (e as AxiosError<T>).response?.data;
  }
};

export default createActions;
