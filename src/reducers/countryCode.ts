import { CountryCodePayload } from '@typings/api/auth';
import createReducer from '@utils/redux/createReducer';

export enum ActionType {
  SET_COUNTRY_CODE_DATA = `SET_COUNTRY_CODE_DATA`,
  RESET_COUNTRY_CODE_DATA = `RESET_COUNTRY_CODE_DATA`,
}

export interface State {
  list: CountryCodePayload[];
}

const initialState: State = {
  list: [],
};

export default createReducer<State>(initialState, {
  [ActionType.SET_COUNTRY_CODE_DATA](
    state: State,
    payload: CountryCodePayload[],
  ): State {
    return {
      ...state,
      list: payload,
    };
  },
  [ActionType.RESET_COUNTRY_CODE_DATA](): State {
    return {
      list: [],
    };
  },
});
