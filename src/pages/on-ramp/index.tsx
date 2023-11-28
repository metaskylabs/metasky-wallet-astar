import { mixins, utils } from '@styles/shared';
import BottomNav from '@components/Shared/BottomNav';
import { NavTabs } from '@components/Shared/BottomNav/constants';
import { useSelector } from 'react-redux';
import { StoreState } from '@reducers';
import { State as userProfileState } from '@reducers/user';
import { useRouter } from 'next/router';
import Kite from '@components/Shared/Kite';
import { useEffect, useState } from 'react';
import { OnMetaWidget } from '@components/OnMetaWidget/OnMetaWidget';
import HeaderWithButtonLayout from '@components/Shared/HeaderWithButtonLayout';
import { EVENT_PAGE } from '@constants/analytics';
import { useAnalytics } from '@utils/useAnalytics';
import useCustomBack from '@utils/hooks/custom-back';

export default function OnRamp() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const user = useSelector<StoreState, userProfileState>((state) => state.user);
  const isLoggedIn = user.isLogin || false;
  const userExists = user.profile !== null;
  const { trackPage } = useAnalytics();
  const { onBack } = useCustomBack();

  /* check user login status and open on meta widget */
  useEffect(() => {
    if (router.isReady) {
      if (userExists && !isLoggedIn) {
        router.push(`/`);
      }
      if (userExists && isLoggedIn) {
        setIsLoading(false);
      }
    }
  }, [isLoggedIn, router, userExists]);

  /* track analytics */
  useEffect(() => {
    trackPage(EVENT_PAGE.ON_RAMP);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return (
      <div css={[utils.heightPercent(100), mixins.flexAlignJustifiedCenter]}>
        <Kite />
      </div>
    );
  } else {
    return (
      <BottomNav currentTab={NavTabs.WALLET}>
        <HeaderWithButtonLayout
          title={`Crypto On Ramp`}
          onBack={onBack}
          secondaryBack
        >
          <OnMetaWidget />
        </HeaderWithButtonLayout>
      </BottomNav>
    );
  }
}
