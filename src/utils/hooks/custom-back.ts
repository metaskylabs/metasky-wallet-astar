import { StoreState } from '@reducers';
import { useSelector } from 'react-redux';
import { State as RouterHistoryState } from '@reducers/router-history';
import { useRouter } from 'next/router';

const useCustomBack = () => {
  const router = useRouter();
  const { history } = useSelector<StoreState, RouterHistoryState>(
    (state) => state.routerHistory,
  );
  return {
    onBack: () => {
      if (history.length < 1) router.push(`/`);
      else router.back();
    },
  };
};

export default useCustomBack;
