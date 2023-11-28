import Authentication from '@components/Authentication';
import Benefits from '@components/Benefits';
import { FullScreenPopUp } from '@components/Shared';
import { useEffect, useState } from 'react';
import { BenefitType } from '@constants/wallet';
import { useRouter } from 'next/router';
import { Pages } from '@utils/navigation';
import PrivateRoute from '@components/PrivateRoute';
import NOOB from '@constants/noob';

function BenefitsList() {
  const router = useRouter();
  const { query } = router;
  const [authPopUp, setAuthPopUp] = useState<boolean>(false);
  const [nftId, setNftId] = useState<string>();
  const [type, setType] = useState<BenefitType>();
  // useEffect(() => {
  //   setIsLoggedIn(loginStatus.status);
  //   setAuthPopUp(!loginStatus.status);
  // }, [loginStatus]);

  useEffect(() => {
    if (router.isReady) {
      if (query.type == BenefitType.OWNED && query.nftId == `all`) {
        setType(query.type);
        setNftId(undefined);
      } else if (
        (query.type == BenefitType.OWNED ||
          query.type == BenefitType.MARKETPLACE) &&
        query.nftId
      ) {
        setType(query.type);
        setNftId(query.nftId as string);
      } else {
        router.push(Pages.PAGE_NOT_FOUND);
      }
    }
  }, [router.isReady]);

  return (
    <div>
      {router.isReady && type ? (
        <Benefits nftId={nftId} type={type} />
      ) : (
        <FullScreenPopUp isOpen={authPopUp}>
          <Authentication
            setLoginStatus={(status) => setAuthPopUp(status)}
            isPopUp={true}
          />
        </FullScreenPopUp>
      )}
    </div>
  );
}

export default BenefitsList;
