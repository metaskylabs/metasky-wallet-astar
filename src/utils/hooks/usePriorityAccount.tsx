import { StoreState } from '@reducers';
import { State as userProfileState } from '@reducers/user';
import { WalletCustodyType } from '@typings/api/auth';
import { useSelector } from 'react-redux';
import { useAccount } from 'wagmi';

export const usePriorityUserAccount = () => {
  const { profile } = useSelector<StoreState, userProfileState>(
    (state) => state.user,
  );
  const { address } = useAccount();
  const custodialAccount = profile?.allWalletAddresses?.find(
    (wallet) => wallet.type === WalletCustodyType.CUSTODIAL,
  );
  const noncustodialAccount = profile?.allWalletAddresses?.find(
    (wallet) => wallet.type === WalletCustodyType.NONCUSTODIAL,
  );
  const connectednoncustodialAccount = profile?.allWalletAddresses?.find(
    (wallet) =>
      wallet.type === WalletCustodyType.NONCUSTODIAL &&
      wallet.ethAddress === address,
  );
  return {
    ...(custodialAccount ||
      connectednoncustodialAccount ||
      noncustodialAccount),
  };
};

export const getPriorityAccount = (user: userProfileState) => {
  const custodialAccount = user?.profile?.allWalletAddresses?.find(
    (wallet) => wallet.type === WalletCustodyType.CUSTODIAL,
  );
  const noncustodialAccount = user?.profile?.allWalletAddresses?.find(
    (wallet) => wallet.type === WalletCustodyType.NONCUSTODIAL,
  );
  return {
    ...(custodialAccount || noncustodialAccount),
  };
};
