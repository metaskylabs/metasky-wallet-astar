import Authentication from '@components/Authentication';
import PrivateRoute from '@components/PrivateRoute';
import generateToast from '@components/Shared/GenerateToast';
import { ToastType } from '@components/Shared/Toast';
import { logEvent } from '@utils/amplitude';
import { Pages } from '@utils/navigation';
import { useRouter } from 'next/router';
import { Fragment, useState } from 'react';
import { implicitWhiteListUsers } from '@actions/auth';
import * as styles from '@styles/Modules/tanuki-sarubobo';
import Kite from '@components/Shared/Kite';
import { handleErrorMessage } from '@utils/handleResponseToast';

export default function Login() {
  const [showLoader, setShowLoader] = useState(false);
  const router = useRouter();

  const onLoginSuccess = async () => {
    try {
      setShowLoader(true);
      const whitelistData = (
        await implicitWhiteListUsers({
          chain: `ETHEREUM`,
        })
      ).data;

      if (whitelistData.canClaimMore) {
        router.push(
          `${Pages.PURCHASE_NFT}/${whitelistData.listingId}?onBack=false`,
        );
      } else {
        generateToast({
          content: `Sorry! You can claim the Sarubobo NFT only once.`,
          type: ToastType.ERROR,
          customDuration: 45000,
        });
        router.push(Pages.HOME);
      }
    } catch (error) {
      handleErrorMessage(error);
      router.push(Pages.PAGE_NOT_FOUND);
    }
  };

  return (
    <Fragment>
      <PrivateRoute
        onRequestLogin={() => {
          // Ignore since this user is asked to login by default
        }}
        onLoginSuccess={onLoginSuccess}
      >
        <>
          {showLoader ? (
            <div css={styles.loaderContainer}>
              <Kite />
              <div css={styles.loaderContentInfo}>
                Page is Loading. Please wait...
              </div>
            </div>
          ) : (
            <Authentication isPopUp={true} onSuccess={onLoginSuccess} />
          )}
        </>
      </PrivateRoute>
    </Fragment>
  );
}
