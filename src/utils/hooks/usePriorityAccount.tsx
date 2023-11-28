import { StoreState } from '@reducers';
import { State as userProfileState } from '@reducers/user';
import { WalletCustodyType } from '@typings/api/auth';
import { useSelector } from 'react-redux';

export const usePriorityUserAccount = () => {
  const { profile } = useSelector<StoreState, userProfileState>(
    (state) => state.user,
  );
  const custodialAccount = profile?.allWalletAddresses?.find(
    (wallet) => wallet.type === WalletCustodyType.CUSTODIAL,
  );
  return {
    ...custodialAccount,
  };
};

export const getPriorityAccount = (user: userProfileState) => {
  const custodialAccount = user?.profile?.allWalletAddresses?.find(
    (wallet) => wallet.type === WalletCustodyType.CUSTODIAL,
  );
  return {
    ...custodialAccount,
  };
};
