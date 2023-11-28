import { Dispatch } from '@utils/redux/dispatch';
import createActions from '@utils/redux/createActions';
import { ApiV1 } from './Axios';
import { ActionType } from '@reducers/user';
import { ActionType as CountryActionType } from '@reducers/countryCode';

export const getUserProfile = async () => {
  return createActions(`profileStatus`, async (dispatch: Dispatch) => {
    const response = await ApiV1.get(`/profile`);
    dispatch({
      type: ActionType.SET_USER_PROFILE,
      payload: response.data.data,
    });
  });
};

export const getCountryList = async () => {
  return createActions(`countryListStatus`, async (dispatch: Dispatch) => {
    const response = await ApiV1.get(`/countrycode`);
    dispatch({
      type: CountryActionType.SET_COUNTRY_CODE_DATA,
      payload: response.data.data,
    });
  });
};
