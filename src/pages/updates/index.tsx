import {
  BlueTextButton,
  BottomFadeInAnimation,
  EmptyState,
  HeaderWithCloseAndBack,
} from '@components/Shared';
import * as styles from '@styles/Modules/updates';
import { mixins } from '@styles/shared';
import { useEffect, useState } from 'react';
import { handleErrorMessage } from '@utils/handleResponseToast';
import { StatusType } from '@typings/api/shared';
import UpdateCard from '@components/Updates/Card';
import BottomNav from '@components/Shared/BottomNav';
import { NavTabs } from '@components/Shared/BottomNav/constants';
import { getUserUpdates, userUpdatesStatus } from '@actions/update';
import { GetUpdatesResponse, UpdatesStatus } from '@typings/api/update';
import { dateTimeFormat } from '@utils/helper';
import { useSelector } from 'react-redux';
import { StoreState } from '@reducers';
import { State as userUpdatesList } from '@reducers/updates';
import { Pages } from '@utils/navigation';
import { useRouter } from 'next/router';
import ShimmerCard from '@components/Shimmer/ShimmerCard';
import { useTranslate } from '@utils/useTranslate';
import { useAnalytics } from '@utils/useAnalytics';

function Updates() {
  const router = useRouter();
  const eventLogger = useAnalytics();
  const { translate } = useTranslate();
  const [notificationStatus, setNotificationStatus] = useState<{
    status: StatusType;
    data?: GetUpdatesResponse[];
  }>({ status: StatusType.LOADING });
  const userUpdatesList = useSelector<StoreState, userUpdatesList>(
    (state) => state.userUpdates,
  );

  useEffect(() => {
    if (userUpdatesList?.list) {
      setNotificationStatus({
        status: StatusType.SUCCESS,
        data: userUpdatesList.list,
      });
    }
  }, [userUpdatesList]);

  const fetchNotification = async () => {
    try {
      await getUserUpdates();
    } catch (error) {
      handleErrorMessage(error);
      setNotificationStatus({ status: StatusType.ERROR });
    }
  };

  const onNotifyClick = (update: GetUpdatesResponse) => {
    eventLogger.trackClick(`Updates Card`, {
      link: update?.cta_link,
    });
    if (update.cta_link) {
      const url = new URL(update.cta_link);
      if (url.origin === window.location.origin) {
        router.push(url.pathname);
      } else {
        window.open(update.cta_link, `_blank`);
      }
    }
  };

  const updateStatusOfUpdates = async (list: Array<number>) => {
    try {
      const payload = {
        user_update_uuids: list,
      };
      const response = await userUpdatesStatus(payload);
    } catch (error) {
      handleErrorMessage(error);
    }
  };

  useEffect(() => {
    setNotificationStatus({ status: StatusType.LOADING });
    fetchNotification();
    eventLogger.trackPage(`Updates Page`);
  }, []);

  useEffect(() => {
    if (
      notificationStatus.status === StatusType.SUCCESS &&
      notificationStatus.data
    ) {
      const idListOfUnread = notificationStatus.data?.map(
        (items: GetUpdatesResponse) => {
          return items?.id;
        },
      );
      updateStatusOfUpdates(idListOfUnread);
    }
  }, [notificationStatus.data]);

  //TODO:- below are the condition's will be used for returning specific DOM Component for case senarious

  const renderElement = () => {
    switch (notificationStatus.status) {
      case StatusType.LOADING:
        return (
          <div css={[mixins.flexColumn, styles.notificationList]}>
            <ShimmerCard height={68} borderRadius={4} />
            <ShimmerCard height={68} borderRadius={4} />
            <ShimmerCard height={68} borderRadius={4} />
            <ShimmerCard height={68} borderRadius={4} />
            <ShimmerCard height={68} borderRadius={4} />
          </div>
        );

      case StatusType.SUCCESS:
        return (
          <div css={[mixins.flexColumn, styles.notificationList]}>
            {notificationStatus.data && notificationStatus.data.length > 0 ? (
              notificationStatus.data?.map(
                (element: GetUpdatesResponse, key: number) => {
                  return (
                    <UpdateCard
                      key={key}
                      noOfCard={key}
                      title={element.title}
                      newUpdate={element.status === UpdatesStatus.UNREAD}
                      icon={element.image}
                      date={dateTimeFormat(element.updated_at)}
                      onClick={() => onNotifyClick(element)}
                    />
                  );
                },
              )
            ) : (
              <BottomFadeInAnimation
                delay={0.2}
                addedStyle={styles.EmptyStateContainer}
              >
                <EmptyState
                  title={translate(`NO_UPDATES`)}
                  subTitle={translate(`CHECK_BACK_LATER_UPDATE`)}
                >
                  <BlueTextButton onClick={() => router.push(Pages.NEW_Home)}>
                    {translate(`GO_TO_HOME`)}
                  </BlueTextButton>
                </EmptyState>
              </BottomFadeInAnimation>
            )}
          </div>
        );
    }
  };

  return (
    <BottomNav currentTab={NavTabs.UPDATES}>
      <div
        css={[
          notificationStatus.data &&
            notificationStatus.data.length <= 0 &&
            styles.emptyWrapper,
          styles.container,
        ]}
      >
        <HeaderWithCloseAndBack
          title={translate(`UPDATES`)}
          addedContainerStyles={styles.headerWrapper}
        />
        {renderElement()}
      </div>
    </BottomNav>
  );
}

export default Updates;
