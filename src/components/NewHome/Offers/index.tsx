import OfferCard from '@components/MakeOffer/OfferCard';
import {
  FullScreenKiteLoader,
  Header,
  MLottie,
  TagButton,
} from '@components/Shared';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import * as Constants from '@utils/constants';
import OfferTab from '@components/MakeOffer/OfferTab';
import { colors, mixins, utils } from '@styles/shared';
import EmptyOfferList from '@components/MakeOffer/Empty';
import SearchInput from '@components/Shared/SearchInput';
import { handleErrorMessage } from '@utils/handleResponseToast';
import { getOfferByMe, getOfferReceivedForMe } from '@actions/makeOffer';
import { State as MakeOfferState } from '@reducers/makeOffer';
import { StatusState, StoreState } from '@reducers';
import { useSelector } from 'react-redux';
import { Pages } from '@utils/navigation';
import { useRouter } from 'next/router';
import { StatusType } from '@typings/api/shared';
import { FetchingState } from '@constants/redux';
import { css } from '@emotion/react';
import AssetsImg from '@public/images';
import { useOutsideClick } from '@utils/helper';
import * as styles from '@styles/Modules/nftsList';
import { trackScreen } from '@utils/analytics';
import { screen } from '@constants/analytics';

export default function Offers() {
  const router = useRouter();
  const [transferActiveTab, setTransferActiveTab] =
    useState<Constants.OfferType>(Constants.OfferType.OFFERRECEIVE);
  const [searchNFT, setSearchNFT] = useState(``);
  const [tagFilter, setTagFilter] = useState(Constants.OfferFilter.ACTIVE);
  const [offerStatus, setOfferStatus] = useState<{ status?: StatusType }>();
  const { offerReceivedForMe, offerForMe } = useSelector<
    StoreState,
    MakeOfferState
  >((state) => state.makeOffer);
  const { offerReceivedByMeStatus, offerListByMeStatus } = useSelector<
    StoreState,
    StatusState
  >((state) => state.status);
  const timer = useRef<any>();
  const [showMenu, setShowMenu] = useState(false);
  const ref = useOutsideClick(() => setShowMenu(false));

  const SortConfig: { key: string; direction: 'DESC' | 'ASC'; name: string }[] =
    [
      {
        key: `created_at`,
        direction: `DESC`,
        name: `Date`,
      },
      {
        key: `price`,
        direction: `ASC`,
        name: `Price`,
      },
    ];

  const fetchOfferReceived = async () => {
    try {
      setOfferStatus({ status: StatusType.LOADING });
      const payload = {
        pageNumber: 1,
        sort: [],
        filter: [
          {
            key: `status`,
            operator: `eq`,
            value: Constants.OfferFilter.ACTIVE,
          },
        ],
        search: searchNFT,
      };
      await getOfferReceivedForMe(payload);
      setOfferStatus({ status: StatusType.SUCCESS });
    } catch (error) {
      handleErrorMessage(error);
      setOfferStatus({ status: StatusType.ERROR });
    }
  };

  const fetchOfferMadeByMe = async () => {
    try {
      setOfferStatus({ status: StatusType.LOADING });
      const payload = {
        pageNumber: 1,
        sort: [],
        filter: [
          {
            key: `status`,
            operator: `eq`,
            value: Constants.OfferFilter.ACTIVE,
          },
        ],
        search: searchNFT,
      };
      await getOfferByMe(payload);
      setOfferStatus({ status: StatusType.SUCCESS });
    } catch (error) {
      handleErrorMessage(error);
      setOfferStatus({ status: StatusType.ERROR });
    }
  };

  useEffect(() => {
    fetchOfferReceived();
    fetchOfferMadeByMe();
  }, [transferActiveTab]);

  const offerFilter = async (
    status:
      | Constants.OfferFilter.ACCEPTED
      | Constants.OfferFilter.ACTIVE
      | Constants.OfferFilter.REJECTED,
  ) => {
    if (transferActiveTab === Constants.OfferType.OFFERRECEIVE) {
      const payload = {
        pageNumber: 1,
        sort: [],
        filter: [
          {
            key: `status`,
            operator: `eq`,
            value: status,
          },
        ],
        search: searchNFT,
      };
      getOfferReceivedForMe(payload);
    } else {
      const payload = {
        pageNumber: 1,
        sort: [],
        filter: [
          {
            key: `status`,
            operator: `eq`,
            value: status,
          },
        ],
        search: searchNFT,
      };
      getOfferByMe(payload);
    }
  };

  const fetchOfferSearch = async (search: string) => {
    if (transferActiveTab === Constants.OfferType.OFFERRECEIVE) {
      const payload = {
        pageNumber: 1,
        sort: [],
        filter: offerReceivedForMe.filter,
        search: search,
      };
      getOfferReceivedForMe(payload);
    } else {
      const payload = {
        pageNumber: 1,
        sort: [],
        filter: offerForMe.filter,
        search: search,
      };
      getOfferByMe(payload);
    }
  };

  const fetchOfferSort = async (sort: {
    key: string;
    direction: 'DESC' | 'ASC';
    name: string;
  }) => {
    if (transferActiveTab === Constants.OfferType.OFFERRECEIVE) {
      const payload = {
        pageNumber: 1,
        sort: [{ key: sort.key, direction: sort.direction }],
        filter: offerReceivedForMe.filter,
        search: searchNFT,
      };
      getOfferReceivedForMe(payload);
    } else {
      const payload = {
        pageNumber: 1,
        sort: [{ key: sort.key, direction: sort.direction }],
        filter: offerForMe.filter,
        search: searchNFT,
      };
      getOfferByMe(payload);
    }
  };

  useEffect(() => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => fetchOfferSearch(searchNFT), 500);
  }, [searchNFT]);

  // analytics for myOffer
  useEffect(() => {
    trackScreen(screen.myOffer);
  }, []);

  if (
    offerStatus?.status === StatusType.LOADING &&
    (offerReceivedByMeStatus === FetchingState.PENDING ||
      offerListByMeStatus === FetchingState.PENDING)
  ) {
    return (
      <FullScreenKiteLoader isOpen={offerStatus?.status === StatusType.LOADING}>
        <div
          css={[
            {
              textAlign: `center`,
              color: colors.Secondary_Black_Text,
            },
          ]}
        >
          Page is Loading. Please wait...
        </div>
      </FullScreenKiteLoader>
    );
  } else if (
    offerStatus?.status === StatusType.SUCCESS &&
    (offerReceivedByMeStatus === FetchingState.SUCCESS ||
      offerListByMeStatus === FetchingState.SUCCESS)
  ) {
    return (
      <Fragment>
        <Header title="">
          <section ref={ref} css={mixins.positionRelative}>
            <div css={styles.sortButton} onClick={() => setShowMenu(!showMenu)}>
              <img src={AssetsImg.ic_sort.src} />
              {transferActiveTab === Constants.OfferType.OFFERRECEIVE
                ? offerReceivedForMe.sort.length > 0 && (
                    <div css={styles.sortIconIndicator} />
                  )
                : offerForMe.sort.length > 0 && (
                    <div css={styles.sortIconIndicator} />
                  )}
            </div>
            {showMenu && (
              <section css={[styles.filterContainer]}>
                {SortConfig.map((sort, index) => (
                  <React.Fragment key={index.toString()}>
                    <div
                      css={[
                        styles.sortItem,
                        transferActiveTab === Constants.OfferType.OFFERRECEIVE
                          ? offerReceivedForMe.sort.find(
                              (s) =>
                                s.key === sort.key &&
                                s.direction === sort.direction,
                            )
                            ? styles.sortItemSelected
                            : ``
                          : offerForMe.sort.find(
                              (s) =>
                                s.key === sort.key &&
                                s.direction === sort.direction,
                            )
                          ? styles.sortItemSelected
                          : ``,
                      ]}
                      onClick={() => {
                        fetchOfferSort(sort);
                        setShowMenu(false);
                      }}
                    >
                      {sort.name}
                    </div>
                    {index < SortConfig.length - 1 ? (
                      <div css={styles.divider} />
                    ) : null}
                  </React.Fragment>
                ))}
              </section>
            )}
          </section>
        </Header>
        <section css={[utils.heightPercent(100)]}>
          <OfferTab
            activeTab={transferActiveTab}
            onActiveTabChange={(activeTab) => {
              setTransferActiveTab(activeTab);
              setTagFilter(Constants.OfferFilter.ACTIVE);
            }}
          />
          <SearchInput
            value={searchNFT}
            placeholder={`Search by NFT name`}
            onChange={(e) => setSearchNFT(e.target.value)}
          />
          <div css={[mixins.flexJustifiedBetween, utils.ml(16), utils.mr(16)]}>
            <TagButton
              text={Constants.OfferFilter.ACTIVE}
              activeTab={tagFilter === Constants.OfferFilter.ACTIVE}
              onClick={() => {
                offerFilter(Constants.OfferFilter.ACTIVE);
                setTagFilter(Constants.OfferFilter.ACTIVE);
              }}
            />
            <TagButton
              text={Constants.OfferFilter.ACCEPTED}
              activeTab={tagFilter === Constants.OfferFilter.ACCEPTED}
              onClick={() => {
                offerFilter(Constants.OfferFilter.ACCEPTED);
                setTagFilter(Constants.OfferFilter.ACCEPTED);
              }}
            />
            <TagButton
              text={Constants.OfferFilter.REJECTED}
              activeTab={tagFilter === Constants.OfferFilter.REJECTED}
              onClick={() => {
                offerFilter(Constants.OfferFilter.REJECTED);
                setTagFilter(Constants.OfferFilter.REJECTED);
              }}
            />
          </div>
          {transferActiveTab === Constants.OfferType.OFFERRECEIVE ? (
            <article
              css={[
                utils.pl(12),
                utils.pr(12),
                utils.mt(24),
                utils.pb(24),
                (offerReceivedForMe.data.length === 0 ||
                  offerReceivedByMeStatus === FetchingState.PENDING) &&
                  utils.heightPercent(60),
              ]}
            >
              {offerReceivedForMe.data.length > 0 &&
              offerReceivedByMeStatus === FetchingState.SUCCESS ? (
                offerReceivedForMe.data.map((item, i) => (
                  <div key={i} css={[utils.mb(18)]}>
                    <OfferCard
                      collectionName="Infinity Access Card #6383"
                      from={item.nft_data.name}
                      price={Number(item.amount)}
                      image={item.nft_data.image}
                      mediaType={item.nft_data.media_type}
                      onClick={() =>
                        router.push(`${Pages.VIEW_OFFER}/${item.auction_uuid}`)
                      }
                    />
                  </div>
                ))
              ) : offerReceivedByMeStatus === FetchingState.PENDING ? (
                <div
                  css={[
                    utils.heightPercent(100),
                    mixins.flexAlignJustifiedCenter,
                  ]}
                >
                  <MLottie
                    addStyles={css({
                      width: utils.remConverter(25),
                      marginLeft: utils.remConverter(10),
                    })}
                  />
                </div>
              ) : offerReceivedForMe.data.length === 0 &&
                offerReceivedByMeStatus === FetchingState.SUCCESS ? (
                <div css={[utils.heightPercent(100)]}>
                  <EmptyOfferList message={`You don’t have any offers yet. `} />
                </div>
              ) : null}
            </article>
          ) : (
            <article
              css={[
                utils.pl(12),
                utils.pr(12),
                utils.mt(24),
                utils.pb(24),
                (offerForMe.data.length === 0 ||
                  offerListByMeStatus === FetchingState.PENDING) &&
                  utils.heightPercent(60),
              ]}
            >
              {offerForMe.data.length > 0 &&
              offerListByMeStatus === FetchingState.SUCCESS ? (
                offerForMe.data.map((item, index) => (
                  <div key={index} css={[utils.mb(18)]}>
                    <OfferCard
                      collectionName="Infinity Access Card #6383"
                      to={item.nft_data.name}
                      price={Number(item.amount)}
                      image={item.nft_data.image}
                      mediaType={item.nft_data.media_type}
                      onClick={() =>
                        router.push(`${Pages.VIEW_OFFER}/${item.auction_uuid}`)
                      }
                    />
                  </div>
                ))
              ) : offerListByMeStatus === FetchingState.PENDING ? (
                <div
                  css={[
                    utils.heightPercent(100),
                    mixins.flexAlignJustifiedCenter,
                  ]}
                >
                  <MLottie
                    addStyles={css({
                      width: utils.remConverter(25),
                      marginLeft: utils.remConverter(10),
                    })}
                  />
                </div>
              ) : offerForMe.data.length === 0 &&
                offerListByMeStatus === FetchingState.SUCCESS ? (
                <div css={[utils.heightPercent(100)]}>
                  <EmptyOfferList
                    message={`You haven’t made any offers yet.`}
                    actionMessage={`Browse NFTs`}
                    actionClickHandler={() => router.push(Pages.LISTINGS)}
                  />
                </div>
              ) : null}
            </article>
          )}
        </section>
      </Fragment>
    );
  } else {
    return null;
  }
}
