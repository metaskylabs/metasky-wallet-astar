import { Dispatch } from '@utils/redux/dispatch';
import createActions from '@utils/redux/createActions';
import { ActionType } from '@reducers/transfer';

export const setTransferAddressValue = async (address: string) => {
  return createActions(`transferAddressStatus`, async (dispatch: Dispatch) => {
    dispatch({
      type: ActionType.SET_TRANSFER_ADDRESS,
      payload: address,
    });
  });
};

export const setTransferNotesValue = async (notes: string) => {
  return createActions(`transferNotesStatus`, async (dispatch: Dispatch) => {
    dispatch({
      type: ActionType.SET_TRANSFER_NOTES,
      payload: notes,
    });
  });
};

export const setTransferQtyValue = async (qty: string) => {
  return createActions(`transferQtyStatus`, async (dispatch: Dispatch) => {
    dispatch({
      type: ActionType.SET_TRANSFER_QTY,
      payload: qty,
    });
  });
};

export const setTransferUUIDValue = async (uuid: string) => {
  return createActions(`transferUUIDStatus`, async (dispatch: Dispatch) => {
    dispatch({
      type: ActionType.SET_TRANSFER_UUID,
      payload: uuid,
    });
  });
};

export const resetTransferState = async () => {
  return createActions(`transferResetStatus`, async (dispatch: Dispatch) => {
    dispatch({
      type: ActionType.RESET_TRANSFER_DATA,
    });
  });
};
