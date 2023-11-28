import { EmptyState, HeaderWithCloseAndBack } from '@components/Shared';
import * as styles from '@styles/Modules/clubs';
import ClubCard from '@components/Clubs/Card';
import { useEffect, useState } from 'react';
import { ApiStatus } from '@typings/apiStatus';
import { ClubMetaData } from '@typings/api/clubs';
import { getClubsList } from '@actions/clubs';
import { handleErrorMessage } from '@utils/handleResponseToast';
import ShimmerCard from '@components/Shimmer/ShimmerCard';
import { CustomError404 } from '@pages/404';
import BottomNav from '@components/Shared/BottomNav';
import { NavTabs } from '@components/Shared/BottomNav/constants';
import { useTranslate } from '@utils/useTranslate';
import { Fragment } from 'preact';
import { useAnalytics } from '@utils/useAnalytics';

const ClubsList = () => {
  const { translate } = useTranslate();
  const eventLogger = useAnalytics();
  const [data, setData] = useState<{
    status: ApiStatus;
    data?: ClubMetaData[];
  }>({ status: ApiStatus.LOADING });
  const fetchClubsList = async () => {
    try {
      const response = await getClubsList();
      setData({ status: ApiStatus.SUCCESS, data: response.data.clubs });
    } catch (e) {
      setData({ status: ApiStatus.ERROR });
      handleErrorMessage(e);
    }
  };
  useEffect(() => {
    eventLogger.trackPage(`Club Page`);
    fetchClubsList();
  }, []);

  const renderElement = () => {
    switch (data.status) {
      case ApiStatus.SUCCESS:
        return (
          <Fragment>
            {data?.data && data?.data?.length > 0 ? (
              data.data.map((club, index) => {
                return (
                  <ClubCard
                    key={index}
                    noOfCard={index}
                    title={club.title}
                    logo={club.logo}
                    noOfNotification={club.noOfNotification}
                    noOfMembers={club.noOfMembers}
                    onClick={() => {
                      window.open(club.club_url, `_blank`);
                      eventLogger.trackClick(`Club Card`, {
                        link: club.club_url,
                      });
                    }}
                    colors={{
                      primary: club.colors.primary,
                      secondary: club.colors.secondary,
                      tertiary: club.colors.tertiary,
                    }}
                  />
                );
              })
            ) : (
              <EmptyState
                title={translate(`NO_CLUBS`)}
                subTitle={translate(`NOT_A_MEMBER_OF_CLUBS`)}
              />
            )}
          </Fragment>
        );

      case ApiStatus.LOADING:
        return (
          <Fragment>
            <ShimmerCard height={153} borderRadius={4} />
            <ShimmerCard height={153} borderRadius={4} />
            <ShimmerCard height={153} borderRadius={4} />
            <ShimmerCard height={153} borderRadius={4} />
          </Fragment>
        );
      default:
        return <CustomError404 />;
    }
  };
  return (
    <BottomNav currentTab={NavTabs.CLUBS}>
      <div css={styles.container}>
        <HeaderWithCloseAndBack
          title={translate(`Clubs`)}
          addedContainerStyles={styles.headerWrapper}
        />
        <div css={styles.contentWrapper}>{renderElement()}</div>
      </div>
    </BottomNav>
  );
};
export default ClubsList;
