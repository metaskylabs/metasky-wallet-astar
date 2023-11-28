export interface SignMessagePayload {
  chainId: string;
  message: string;
}

export interface SignAndSendTxPayload {
  chainId: string;
  transaction: {
    from: string;
    to: string;
    gas: string;
    value: string;
    data: string;
  };
}

export interface SignMessageResponse {
  signature: string;
}

export interface SendTxResponse {
  transactionHash: string;
}

export interface SignAndSendTxPayload {
  chainId: string;
  transaction: {
    from: string;
    to: string;
    gas: string;
    value: string;
    data: string;
  };
}
