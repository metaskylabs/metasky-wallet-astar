import { TransactionStatus } from '@utils/constants';

export interface PollingTransactionPayload {
  orderId: string;
}
export interface TransactionStatusDetails {
  message: string;
  requestId: string;
  data: {
    status: TransactionStatus;
  };
  toastContext: any;
}
