import {
  PollingTransactionPayload,
  TransactionStatusDetails,
} from '@typings/api/decentro';
import { ApiV1 } from '@actions/Axios';
export const pollingTransactionDecentro = async (
  payload: PollingTransactionPayload,
): Promise<TransactionStatusDetails> => {
  const response = await ApiV1.get(`payment/status/${payload.orderId}`);

  return response.data;
};
