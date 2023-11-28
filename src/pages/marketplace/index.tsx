import React, { Fragment, useEffect, useState } from 'react';
import * as styles from '@styles/Modules/collectionNftList';
import { motion } from 'framer-motion';
import { colors, mixins, typography, utils } from '@styles/shared';
import {
  BackButton,
  FullScreenKiteLoader,
  Header,
  StackedCard,
} from '@components/Shared';
import { useRouter } from 'next/router';
import { Pages } from '@utils/navigation';
import AssetsImg from '@public/images';
import { getCollectionList } from '@actions/collections';
import { useSelector } from 'react-redux';
import { State as collections } from '@reducers/collections';
import { StoreState } from '@reducers';
import { handleErrorMessage } from '@utils/handleResponseToast';
import { StatusType } from '@typings/api/shared';
import EmptyCollection from '@components/CollectionDetails/EmptyCollecton';
import { CLICK, click, EVENT_PAGE } from '@constants/analytics';
import { useTranslate } from '@utils/useTranslate';
import { NavTabs } from '@components/Shared/BottomNav/constants';
import BottomNav from '@components/Shared/BottomNav';
import HeaderWithButtonLayout from '@components/Shared/HeaderWithButtonLayout';
import { useAnalytics } from '@utils/useAnalytics';

const Collections = () => {
  const [collectionStatus, setCollectionStatus] = useState<{
    status: StatusType;
  }>();
  const collections = useSelector<StoreState, collections>(
    (state) => state.collections,
  );

  const router = useRouter();
  const { translate } = useTranslate();
  const { trackPage, trackClick } = useAnalytics();

  const handleCollectionClick = (collection_uuid: string) => {
    trackClick(CLICK.COLLECTION_CARD_Market, {
      collection_id: collection_uuid,
    });
    router.push(
      `/marketplace/listings?filters={"collectionIds":["${collection_uuid}"]}`,
    );
  };

  const handleCollectionList = async (filter?: string) => {
    try {
      await getCollectionList(filter && filter);
      setCollectionStatus({ status: StatusType.SUCCESS });
    } catch (error: any) {
      handleErrorMessage(error);
      setCollectionStatus({ status: StatusType.ERROR });
    }
  };

  useEffect(() => {
    setCollectionStatus({ status: StatusType.LOADING });
    if (router.isReady && router.query.filters !== undefined) {
      const filter = router.query.filters;
      handleCollectionList(filter as string);
      trackPage(EVENT_PAGE.MARKET, {
        campaign_id: JSON.parse(filter as string).campaign_id,
      });
    }
  }, [router.query.filters, router.isReady]);

  useEffect(() => {
    if (router.isReady && router.query.filters !== undefined) {
      const filter = router.query.filters;
    }
  }, []);

  if (collectionStatus?.status === StatusType.LOADING) {
    return (
      <FullScreenKiteLoader
        isOpen={collectionStatus.status === StatusType.LOADING}
      >
        <div
          css={[
            {
              textAlign: `center`,
              color: colors.Secondary_Black_Text,
            },
          ]}
        >
          {translate(`PAGE_LOADING`)}...
        </div>
      </FullScreenKiteLoader>
    );
  } else if (
    collectionStatus?.status === StatusType.SUCCESS &&
    collections.list.length > 0
  ) {
    return (
      <BottomNav currentTab={NavTabs.WALLET}>
        <HeaderWithButtonLayout
          title={translate(`MARKET`)}
          onBack={() => router.push(Pages.HOME)}
          secondaryBack
        >
          {collections.list.map((collection) => (
            <div key={collection.id} css={[utils.pl(16), utils.pr(16)]}>
              <StackedCard
                image={
                  collection.image
                    ? collection.image
                    : AssetsImg.i_collectionDefault.src
                }
                collection_uuid={collection.id}
                title={collection.name}
                subTitle={collection.description}
                tags={collection.tags}
                onClick={(collection_uuid: string) =>
                  handleCollectionClick(collection_uuid)
                }
              />
            </div>
          ))}
        </HeaderWithButtonLayout>
      </BottomNav>
    );
  } else if (
    (collectionStatus?.status === StatusType.ERROR ||
      collectionStatus?.status === StatusType.SUCCESS) &&
    collections.list.length === 0
  ) {
    return (
      <BottomNav currentTab={NavTabs.WALLET}>
        <HeaderWithButtonLayout
          title={translate(`MARKET`)}
          onBack={() => router.push(Pages.HOME)}
          secondaryBack
        >
          <div css={[styles.emptyCollectionContainer]}>
            <EmptyCollection
              title={translate(`NO_COLLECTIONS_FOUND`)}
              description={translate(`THERE_ARE_NO_COLLECTIONS_THAT_MATCHED`)}
            />
          </div>
        </HeaderWithButtonLayout>
      </BottomNav>
    );
  } else {
    return null;
  }
};

export default Collections;
