// import { boot, load, show } from '@utils/intercom';
import { useSelector } from 'react-redux';
import { StoreState } from '@reducers';
import NOOB from '@constants/noob';

const useContactSupport = () => {
  // const currentLoginUser = useSelector<StoreState, any>(
  //   (state) => state.user?.profile,
  // );
  // const loadIntercom = async () => {
  //   if (typeof window !== `undefined`) {
  //     load();
  //     boot({
  //       hide_default_launcher: true,
  //       name: currentLoginUser?.name, // Full name
  //       email: currentLoginUser?.email, // Email address
  //       user_id: currentLoginUser?.id,
  //     });
  //     show();
  //   }
  // };

  return { loadIntercom: NOOB };
};
export default useContactSupport;
