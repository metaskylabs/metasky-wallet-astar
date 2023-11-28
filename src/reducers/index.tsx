import ownedNft, { State as OwnedState } from './ownedNft';
import user, { State as UserState } from './user';
import userUpdates, { State as UserUpdateState } from './updates';
import announcement, { State as AnnouncementState } from './announcement';
import makeOffer, { State as MakeOfferState } from './makeOffer';
import countryCode, { State as CountryCodeState } from './countryCode';
import intercom, { State as IntercomState } from './intercom';
import referral, { State as ReferAndEarnState } from './referral';
import transfer, { State as TransferState } from './transfer';
import routerHistory, { State as RouterHistoryState } from './router-history';
import transactionHistoryList, {
  State as transactionHistoryListState,
} from './transactionHistoryList';
import utils, { State as UtilsState } from './utils';
import marketPlaceNft, {
  State as MarketPlaceState,
} from './marketplaceListing';
import collections, { State as CollectionState } from './collections';
import collectionNftList, {
  State as CollectionNftListState,
} from './collectionNftList';
import marketPlaceNftList, {
  State as MarketPlaceNftListState,
} from './marketPlaceNftList';
import { CombinedState, combineReducers } from 'redux';
import { FetchingState } from '@constants/redux';
import createReducer from '@utils/redux/createReducer';

export enum ActionType {
  STATUS_UPDATE = `STATUS_UPDATE`,
}

export interface StatusState {
  [key: string]: FetchingState | null;
}

const statusReducer = createReducer<StatusState>(
  {},
  {
    [ActionType.STATUS_UPDATE](state: StatusState, payload) {
      return {
        ...state,
        ...(payload as StatusState),
      };
    },
  },
);

export interface StoreState {
  ownedNft: OwnedState;
  marketPlaceNft: MarketPlaceState;
  announcement: AnnouncementState;
  makeOffer: MakeOfferState;
  user: UserState;
  transfer: TransferState;
  status: StatusState;
  countryCode: CountryCodeState;
  collections: CollectionState;
  referral: ReferAndEarnState;
  routerHistory: RouterHistoryState;
  utils: UtilsState;
  intercom: IntercomState;
  collectionNftList: CollectionNftListState;
  marketPlaceNftList: MarketPlaceNftListState;
  userUpdates: UserUpdateState;
  transactionHistoryList: transactionHistoryListState;
}

export default combineReducers<CombinedState<StoreState>>({
  ownedNft,
  marketPlaceNft,
  announcement,
  makeOffer,
  user,
  transfer,
  countryCode,
  collections,
  referral,
  collectionNftList,
  status: statusReducer,
  utils,
  routerHistory,
  marketPlaceNftList,
  intercom,
  userUpdates,
  transactionHistoryList,
});
