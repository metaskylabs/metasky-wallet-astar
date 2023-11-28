import { FC, ReactNode, useEffect, useState } from 'react';
import * as styles from './styles';
import NavElement from '@components/Shared/BottomNav/NavElement';
import {
  BOTTOM_NAV_TEXT,
  NavTabs,
} from '@components/Shared/BottomNav/constants';
import { useRouter } from 'next/router';

import { Pages } from '@utils/navigation';
import { useSelector } from 'react-redux';
import { StoreState } from '@reducers';
import { State as userUpdatesList } from '@reducers/updates';
import { getUserUpdates } from '@actions/update';
import { useUserSession } from '@utils/hooks/useUserSession';

interface BottomNavProps {
  children: ReactNode;
  currentTab: NavTabs;
}

const BottomNav: FC<BottomNavProps> = ({ children, currentTab }) => {
  const router = useRouter();
  const showBottomNav: boolean = router.query.showBottomNav
    ? JSON.parse(router.query.showBottomNav as string)
    : true;
  const { isLoggedIn } = useUserSession();
  const userUpdatesUnreadStatus = useSelector<StoreState, userUpdatesList>(
    (state) => state.userUpdates,
  );
  useEffect(() => {
    if (isLoggedIn) getUserUpdates();
  }, [isLoggedIn]);

  return (
    <div css={styles.wrapper}>
      <div css={styles.renderWrapper}>{children}</div>
      {showBottomNav && (
        <div css={styles.navContainer}>
          <NavElement
            icon={NavTabs.HOME}
            name={BOTTOM_NAV_TEXT.HOME}
            isActive={currentTab === NavTabs.HOME}
            onClick={() => router.push(Pages.NEW_Home)}
          />
          <NavElement
            icon={NavTabs.WALLET}
            name={BOTTOM_NAV_TEXT.WALLET}
            isActive={currentTab === NavTabs.WALLET}
            onClick={() => router.push(Pages.HOME)}
          />
          <NavElement
            icon={NavTabs.CLUBS}
            name={BOTTOM_NAV_TEXT.CLUBS}
            isActive={currentTab === NavTabs.CLUBS}
            onClick={() => router.push(Pages.CLUBS)}
          />
          <NavElement
            icon={NavTabs.UPDATES}
            name={BOTTOM_NAV_TEXT.UPDATES}
            isActive={currentTab === NavTabs.UPDATES}
            isNotification={userUpdatesUnreadStatus.unReadMessage}
            onClick={() => router.push(Pages.UPDATES)}
          />
        </div>
      )}
    </div>
  );
};

export default BottomNav;
