import { useRouter } from 'next/router';
import { FC, ReactNode, useEffect } from 'react';
import { Pages } from '@utils/navigation';
import { sendMessageToParent } from '@utils/helper';
import { useDispatch, useSelector } from 'react-redux';
import { StoreState } from '@reducers';
import { State as profileState } from '@reducers/user';
import { IframeMessageType } from '@utils/constants';
import { setLogout } from '@actions/auth';
import { usePriorityUserAccount } from '@utils/hooks/usePriorityAccount';
import { useUserSession } from '@utils/hooks/useUserSession';
import { getAccessToken } from '@utils/cookie';

interface PrivateRouteProps {
  children: ReactNode;
  onRequestLogin?: () => void;
  onLoginSuccess?: () => void;
}

const PrivateRoute: FC<PrivateRouteProps> = ({
  children,
  onRequestLogin,
  onLoginSuccess,
}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const priorityAccount = usePriorityUserAccount();
  const { isLoggedIn } = useUserSession();

  useEffect(() => {
    if (router.isReady) {
      const { whitelist, client_id } = router.query;
      if (whitelist && client_id === `tanuki`) return;
      if (!isLoggedIn) {
        setLogout(dispatch);
        if (onRequestLogin) onRequestLogin();
        else if (!router.asPath.includes(`/login`)) {
          router.push(Pages.LOGIN);
        }
      } else {
        if (onLoginSuccess) onLoginSuccess();
        else if (router.asPath.includes(`/login`)) {
          sendMessageToParent(
            JSON.stringify({
              event: IframeMessageType.loginSuccess,
              payload: {
                bearerToken: getAccessToken(),
                walletAddress: priorityAccount,
              },
            }),
          );
          router.push(Pages.HOME);
        }
      }
    }
  }, [router.isReady]);

  return <>{children}</>;
};

export default PrivateRoute;
