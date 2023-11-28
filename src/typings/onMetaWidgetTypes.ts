/* 
  All interfaces/types are created by referring
  to the OnMeta docs: https://docs.onmeta.in/widget/widget-creation
*/

export type onMetaWidgetConstructor = {
  /** It should be an id of a container element in which to open the widget, and not a class */
  elementId: string | null;
  /** Obtained from OnMeta dashboard post registration */
  apiKey: string;
  /** the wallet address to which tokens to be transferred */
  walletAddress?: string;
  /** the amount for which user needs to buy token */
  fiatAmount?: number;
  /** the email ID of the user (if present user does not have to login in OnMeta platform) */
  userEmail?: string;
  /** the block chain ID in which the token is present */
  chainId?: number;
  /** the address for the required token (required if chainId is present) */
  tokenAddress?: string;
  /** metaData is any extra data that user wants to send along with webhook events in the order */
  metaData?: { [key: string]: string };
  /** successRedirectUrl is the url to which the widget will redirect on successful order completion */
  successRedirectUrl?: string;
  /** failureRedirectUrl is the url to which the widget will redirect in case of failure */
  failureRedirectUrl?: string;
  /** to enable offRamp (crypto into fiat) feature */
  offRamp?: 'enabled';
  /** to enable onRamp (fiat into crypto) feature */
  onRamp?: 'enabled';
  /** To set default input type as crypto in offramp widget */
  sellCryptoType?: 'coins';
  fiatType?: 'php' | 'inr';
};

export type onMetaOnRampEventResponse = {
  cryptoSwap: 'pending' | 'transfering' | 'success' | 'failed';
  eventCategory: 'order';
  eventType?: 'orderCreated';
  order: {
    buyTokenAddress: string;
    buyTokenSymbol: string;
    chainId: string;
    createdAt: string;
    currency: string;
    customer: {
      email: string;
    };
    fiat: number;
    orderId: string;
    receiverWalletAddress: string;
    utr: string;
  };
  orderId: string;
  paymentStatus: 'pending' | 'utrCaptured' | 'success' | 'failed';
  paymentType: 'buy';
};

export type onMetaOffRampEventResponse = {
  eventCategory: 'order';
  paymentStatus: 'pending' | 'success';
  cryptoSwap: 'pending' | 'success';
  paymentType: 'sell';
};

export const isOnRampEventType = (
  data: onMetaOnRampEventResponse | onMetaOffRampEventResponse,
): data is onMetaOnRampEventResponse =>
  (data as onMetaOnRampEventResponse).paymentType === `buy`;

type onMetaEventTypes =
  | 'ALL_EVENTS'
  | 'SUCCESS'
  | 'FAILED'
  | 'ORDER_EVENTS'
  | 'ORDER_COMPLETED_EVENTS'
  | 'ACTION_EVENTS';

export declare class onMetaWidgetClass {
  constructor(obj: onMetaWidgetConstructor);
  init(): void;
  close(): void;
  on(
    eventType: onMetaEventTypes,
    callbackFn: (
      data: onMetaOffRampEventResponse | onMetaOnRampEventResponse,
    ) => void,
  ): void;
  constructUrl(): string;
}

export interface OnMetaWidgetNewTab
  extends Omit<onMetaWidgetConstructor, 'elementId' | 'apiKey'> {
  /**
   * if true, opens the widget in a new tab.
   */
  allowOpeningNewTab: true;
}

export interface OnMetaWidgetURLGenerator
  extends Omit<onMetaWidgetConstructor, 'elementId' | 'apiKey'> {
  /**
   * if true, opens the widget in a new tab.
   */
  allowOpeningNewTab?: false;
  /**
   * if `true`, returns the URL to open OnMeta Widget.
   * else, opens the OnMeta Widget in provided `elementID`
   */
  getOnlyURL: true;
}

export interface OnMetaWidgetComponent
  extends Omit<onMetaWidgetConstructor, 'apiKey'> {
  /**
   * if true, opens the widget in a new tab.
   */
  allowOpeningNewTab?: false;
  /**
   * if `true`, returns the URL to open OnMeta Widget.
   * else, opens the OnMeta Widget in provided `elementID`
   */
  getOnlyURL?: false;
  /**
   * Event Type to listen onMeta events
   */
  eventType?: onMetaEventTypes;
  /** callback function to get data from onMeta */
  callbackFn?: (
    data: onMetaOnRampEventResponse | onMetaOffRampEventResponse,
  ) => void;
}

export interface onMetaWidgetModule {
  /** create widget object */
  new (obj: onMetaWidgetConstructor): onMetaWidgetClass;
  /** initialize the widget */
  init(): void;
  /** close the widget Iframe */
  close(): void;
  /** Listen to events from the widget Iframe */
  on(
    eventType: onMetaEventTypes,
    callbackFn: (
      data: onMetaOffRampEventResponse | onMetaOnRampEventResponse,
    ) => void,
  ): void;
  /** open widget in a new browser tab */
  constructUrl(): string;
}

export type onMetaWidgetProducer = {
  /** open widget in a new browser tab
   * @param {OnMetaWidgetNewTab} options
   * @returns None
   */
  openWidget(options: OnMetaWidgetNewTab): void;
  /** returns URL for the widget
   * @param {OnMetaWidgetURLGenerator} options
   * @returns string
   */
  openWidget(options: OnMetaWidgetURLGenerator): string;
  /** returns URL for the widget
   * @param {OnMetaWidgetComponent} options
   * @return {onMetaWidgetClass} - OnMeta Widget object
   */
  openWidget(options: OnMetaWidgetComponent): onMetaWidgetClass;
};
