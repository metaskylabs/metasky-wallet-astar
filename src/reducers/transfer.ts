import createReducer from '@utils/redux/createReducer';

export enum ActionType {
  SET_TRANSFER_UUID = `SET_TRANSFER_UUID`,
  SET_TRANSFER_NOTES = `SET_TRANSFER_NOTES`,
  SET_TRANSFER_QTY = `SET_TRANSFER_QTY`,
  SET_TRANSFER_ADDRESS = `SET_TRANSFER_ADDRESS`,
  RESET_TRANSFER_DATA = `RESET_TRANSFER_DATA`,
}

export interface State {
  transfer_uuid: string;
  notes: string;
  qty: string;
  transfer_address: string;
}

const initialState: State = {
  transfer_uuid: ``,
  notes: ``,
  qty: ``,
  transfer_address: ``,
};

export default createReducer<State>(initialState, {
  [ActionType.SET_TRANSFER_UUID](state: State, payload: string): State {
    return {
      ...state,
      transfer_uuid: payload,
    };
  },
  [ActionType.SET_TRANSFER_NOTES](state: State, payload: string): State {
    return {
      ...state,
      notes: payload,
    };
  },
  [ActionType.SET_TRANSFER_QTY](state: State, payload: string): State {
    return {
      ...state,
      qty: payload,
    };
  },
  [ActionType.SET_TRANSFER_ADDRESS](state: State, payload: string): State {
    return {
      ...state,
      transfer_address: payload,
    };
  },
  [ActionType.RESET_TRANSFER_DATA](): State {
    return {
      transfer_uuid: ``,
      notes: ``,
      qty: ``,
      transfer_address: ``,
    };
  },
});
