import createReducer from '@utils/redux/createReducer';

export enum ActionType {
  SET_SPLASH_SCREEN_APPEARED = `SET_SPLASH_SCREEN_APPEARED`,
}

export interface State {
  isSplashScreen: boolean;
}

const initialState: State = {
  isSplashScreen: false,
};

export default createReducer<State>(initialState, {
  [ActionType.SET_SPLASH_SCREEN_APPEARED](
    state: State,
    payload: boolean,
  ): State {
    return {
      ...state,
      isSplashScreen: payload,
    };
  },
});
