import React, { FC, Fragment, useEffect, useRef, useState } from 'react';
import { mixins, utils } from '@styles/shared';
import {
  BackButton,
  BottomPopup,
  MediaCard,
  PrimaryButton,
  SecondaryButton,
  SectionTitle,
  ShadowInsideCard,
} from '@components/Shared';
import * as styles from '@styles/Modules/auction';
import * as Constants from '@utils/constants';
import AuthorDescription from '@components/Detail/AuthorDescription';
import RarityTag from '@components/Shared/RarityTag';
import PropertyGrid from '@components/Shared/PropertyGrid';
import CollectionCard from '@components/Shared/Card/Collection';
import BidSection, { BidDetails } from '@components/Auction/BidSection';
import Bid from '@components/Auction/Bid';
import { dateFormat } from '@utils/helper';
import CountdownTimer from '@components/Auction/CountdownTimer';
import { getTimeDifferenceFromNow, isTimeRemaining } from '@utils/Time';
import NOOB from '@constants/noob';
import { useRouter } from 'next/router';
import { getAuctionDetails } from '@actions/auction';
import { AuctionOffers, NftAuctionDetails } from '@typings/api/auctions';
import { handleErrorMessage } from '@utils/handleResponseToast';
import BenefitButton from '@components/Shared/BenefitButton';
import { StatusType } from '@typings/api/shared';
import BottomStickyBanner from '@components/Shared/Bannner/BottomSticky';
import { Pages } from '@utils/navigation';
import { convertToRupees } from '@utils/currencyConversion';
import { share } from '@utils/share';
import ShimmerCard from '@components/Shimmer/ShimmerCard';
import ShimmerLargeImage from '@components/Shimmer/ShimmerLargeImage';
import BenefitCardEnhanced from '@components/Benefits/BenefitCardEnhanced';
import useLinkHandler from '@utils/hooks/useLinkHandler';
import ErrorBottomSheet from '@components/Shared/ErrorBottomSheet';
import BlueCampaignBanner from '@components/Shared/Bannner/BlueCampaignBanner';
import { useTranslate } from '@utils/useTranslate';
import BottomNav from '@components/Shared/BottomNav';
import { NavTabs } from '@components/Shared/BottomNav/constants';
import { BottomPopupSize } from '@components/Shared/BottomPopup';
import { MediaType } from '@components/Shared/Card/Media';
import ViewBid from '@components/Auction/ViewBid';
import Authentication from '@components/Authentication';
import { useAnalytics } from '@utils/useAnalytics';
import { CLICK, EVENT_PAGE } from '@constants/analytics';
import { useUserSession } from '@utils/hooks/useUserSession';

export enum SheetType {
  PLACE_BID = `Place a bid`,
  RAISE_BID = `Raise your bid`,
  AUTH = `Login In`,
  BID_SUCCESS = `View Bid`,
  BENEFIT_ERROR = `Benefit Error`,
}

const AuctionDetail: FC = () => {
  const session = useUserSession();
  const router = useRouter();
  const exclusiveBenefitsRef = useRef<HTMLDivElement>(null);
  const [nftAuctionDetails, setNftAuctionDetails] =
    useState<{ status?: StatusType; data?: NftAuctionDetails }>();
  const [currentBottomSheet, setCurrentBottomSheet] = useState<{
    size?: BottomPopupSize;
    isOpen: boolean;
    component?: SheetType;
  }>({ isOpen: false });
  const [topBidAmount, setTopBidAmount] = useState<number>(0);
  const [minBidAmount, setMinBidAMount] = useState<number>(0);
  const { linkHandler } = useLinkHandler();
  const [benefitError, setBenefitError] = useState<{
    open: boolean;
    title: string;
    description: string;
    img?: string;
  }>({ open: false, title: ``, description: `` });
  const [openAuthFlowNoAction, setOpenAuthFlowNoAction] = useState(false);

  const [bidSuccessDetail, setBidSuccessDetail] = useState<{
    bidAmount: number;
    tagText: string;
    date: string;
  }>({
    bidAmount: 0,
    tagText: ``,
    date: ``,
  });

  const { translate } = useTranslate();
  const { trackPage, trackClick } = useAnalytics();

  const onExclusiveBenefitsScroll = () => {
    if (exclusiveBenefitsRef !== null) {
      exclusiveBenefitsRef?.current?.scrollIntoView({ behavior: `smooth` });
    }
  };

  const fetchAuctionDetails = async (isRefreshing?: boolean) => {
    const auctionId = router.query.id as string;
    try {
      !isRefreshing && setNftAuctionDetails({ status: StatusType.LOADING });
      const payload = { auctionId: auctionId };
      const response = await getAuctionDetails(payload);
      if (response.data) {
        const isAuctionDetailsEmpty =
          Object.keys(response.data.auction_details).length === 0;
        const isNftDetailsEmpty =
          Object.keys(response.data.nft_details).length === 0;

        if (isAuctionDetailsEmpty || isNftDetailsEmpty) {
          setNftAuctionDetails({ status: StatusType.ERROR });
        } else {
          setNftAuctionDetails({
            status: StatusType.SUCCESS,
            data: response.data,
          });

          if (
            response.data.auction_details.top_bid &&
            response.data.auction_details.top_bid.amount
          ) {
            setTopBidAmount(
              convertToRupees(
                parseFloat(response.data.auction_details.top_bid.amount),
                response.data.conversion_factor.conversion_factor,
              ),
            );
          } else {
            setTopBidAmount(
              convertToRupees(
                parseFloat(response.data.auction_details.next_valid_bet_amount),
                response.data.conversion_factor.conversion_factor,
              ),
            );
          }

          setMinBidAMount(
            convertToRupees(
              parseFloat(response.data.auction_details.next_valid_bet_amount),
              response.data.conversion_factor.conversion_factor,
            ),
          );
        }
      }
    } catch (e) {
      handleErrorMessage(e);
      setNftAuctionDetails({ status: StatusType.ERROR });
    }
  };

  const handleBidSuccessStatus = async (details: any) => {
    setBidSuccessDetail(details);

    setCurrentBottomSheet({
      isOpen: true,
      size: BottomPopupSize.MEDIUM,
      component: SheetType.BID_SUCCESS,
    });

    fetchAuctionDetails(true);
    setCurrentBottomSheet({ isOpen: false });
  };

  const renderSheet = () => {
    if (
      currentBottomSheet.component === SheetType.PLACE_BID &&
      nftAuctionDetails?.data
    ) {
      return (
        <Bid
          title={translate(`PLACE_BID`)}
          desc={translate(`PLACE_BID_DESCRIPTION`)}
          ctaText={translate(`SWIPE_TO_PLACE_BID`)}
          auctionId={router.query.id as string}
          closeSheet={() => setCurrentBottomSheet({ isOpen: false })}
          topBidAmount={topBidAmount.toString()}
          minBidAmount={minBidAmount}
          conversionFactor={
            nftAuctionDetails.data.conversion_factor.conversion_factor
          }
          handleBidSuccessStatus={handleBidSuccessStatus}
          sheetType={SheetType.PLACE_BID}
          auction_uuid={router.query.id as string}
          nft_name={nftAuctionDetails.data.nft_details.name}
        />
      );
    } else if (
      currentBottomSheet.component === SheetType.RAISE_BID &&
      nftAuctionDetails?.data
    ) {
      return (
        <Bid
          title={translate(`RAISE_YOUR_BID`)}
          desc={translate(`RAISE_YOUR_BID_DESCRIPTION`)}
          ctaText={translate(`SWIPE_TO_RAISE_BID`)}
          auctionId={router.query.id as string}
          closeSheet={() => setCurrentBottomSheet({ isOpen: false })}
          topBidAmount={topBidAmount.toString()}
          minBidAmount={minBidAmount}
          conversionFactor={
            nftAuctionDetails.data.conversion_factor.conversion_factor
          }
          handleBidSuccessStatus={handleBidSuccessStatus}
          sheetType={SheetType.RAISE_BID}
          auction_uuid={router.query.id as string}
          nft_name={nftAuctionDetails.data.nft_details.name}
        />
      );
    } else if (currentBottomSheet.component === SheetType.BID_SUCCESS) {
      return (
        <ViewBid
          nftImage={nftAuctionDetails?.data?.nft_details.image || ``}
          nftMediaType={
            nftAuctionDetails?.data?.nft_details.media_type || MediaType.IMAGE
          }
          tagText={bidSuccessDetail.tagText}
          bidAmount={bidSuccessDetail.bidAmount}
          topBidAmount={topBidAmount.toString()}
          date={bidSuccessDetail.date}
          backHandler={() => {
            setCurrentBottomSheet({ isOpen: false });
            fetchAuctionDetails(true);
          }}
          placeABid={() => handlePlaceBid(true)}
          nftName={nftAuctionDetails?.data?.nft_details.name || ``}
        />
      );
    } else if (currentBottomSheet.component === SheetType.AUTH) {
      return (
        <Authentication
          onSuccess={async () => {
            setCurrentBottomSheet({ isOpen: false });
            if (openAuthFlowNoAction) {
              setOpenAuthFlowNoAction(false);
              return;
            }
            await fetchAuctionDetails();
            handlePlaceBid(nftAuctionDetails?.data?.auction_details.bid_placed);
          }}
          isPopUp={true}
        />
      );
    }
  };

  const handlePlaceBid = (isRaisingBid = false) => {
    if (isRaisingBid) {
      setCurrentBottomSheet({
        isOpen: true,
        size: BottomPopupSize.MEDIUM,
        component: SheetType.RAISE_BID,
      });
    } else {
      setCurrentBottomSheet({
        isOpen: true,
        size: BottomPopupSize.MEDIUM,
        component: SheetType.PLACE_BID,
      });
    }
  };

  const logPrimaryClick = () => {
    if (nftAuctionDetails?.data?.auction_details.bid_placed) {
      trackClick(CLICK.RAISE_YOUR_BID, {
        auction_uuid: router.query.id,
        auction_name: nftAuctionDetails.data?.nft_details.name,
      });
    } else {
      trackClick(CLICK.PLACE_BID, {
        auction_uuid: router.query.id,
        auction_name: nftAuctionDetails?.data?.nft_details.name,
      });
    }
  };
  const handlePrimaryClick = () => {
    if (!session.isLoggedIn) {
      setCurrentBottomSheet({
        isOpen: true,
        size: BottomPopupSize.BIG,
        component: SheetType.AUTH,
      });
      return;
    }
    handlePlaceBid(nftAuctionDetails?.data?.auction_details.bid_placed);
  };

  const userBidsMapper = (offers: AuctionOffers[]) => {
    const bidDetails: BidDetails[] = [];

    offers.map((bid) => {
      const OutBidDate = new Date(bid.bid_time);
      bidDetails.push({
        from: bid.bidder.identifier,
        price: convertToRupees(
          parseFloat(bid.amount),
          nftAuctionDetails?.data?.conversion_factor
            ?.conversion_factor as number,
        ).toString(),
        createdAt: OutBidDate,
        tagText: bid.status,
      });
    });
    return bidDetails;
  };

  const bidMapper = (
    auctionDetails: NftAuctionDetails['auction_details'],
  ): BidDetails[] => {
    const bidDetails: BidDetails[] = [];

    if (nftAuctionDetails?.data) {
      if (auctionDetails.top_bid && auctionDetails.top_bid.bid_uuid) {
        const bidDate = new Date(auctionDetails.top_bid.bid_time);
        bidDetails.push({
          from: auctionDetails.top_bid.bidder.identifier,
          price: convertToRupees(
            parseFloat(auctionDetails.top_bid.amount),
            nftAuctionDetails.data.conversion_factor.conversion_factor,
          ).toString(),
          createdAt: bidDate,
          tagText: auctionDetails.top_bid.status,
        });
      }

      auctionDetails.bids.map((bid) => {
        const OutBidDate = new Date(bid.bid_time);

        bidDetails.push({
          from: bid.bidder.identifier,
          price: convertToRupees(
            parseFloat(bid.amount),
            nftAuctionDetails?.data?.conversion_factor
              ?.conversion_factor as number,
          ).toString(),
          createdAt: OutBidDate,
          tagText: bid.status,
        });
      });
    }

    return bidDetails;
  };

  useEffect(() => {
    if (router.isReady) {
      fetchAuctionDetails();
    }
  }, [router.isReady]);

  useEffect(() => {
    if (nftAuctionDetails?.data) {
      trackPage(EVENT_PAGE.AUCTION, {
        auction_uuid: router.query.id,
        auction_name: nftAuctionDetails.data?.nft_details.name,
      });
    }
  }, [nftAuctionDetails?.data]);

  const logClose = (title: string) => {
    trackClick(`Close in ${title}`, {
      auction_uuid: router.query.id,
      auction_name: nftAuctionDetails?.data?.nft_details.name,
    });
  };

  if (
    nftAuctionDetails?.status === StatusType.SUCCESS &&
    nftAuctionDetails.data
  ) {
    return (
      <Fragment>
        <BottomNav currentTab={NavTabs.HOME}>
          {nftAuctionDetails.data && (
            <>
              <div css={styles.topSectionWrapper}>
                <MediaCard
                  mediaType={nftAuctionDetails.data.nft_details.media_type}
                  mediaUrl={nftAuctionDetails?.data.nft_details?.image}
                />

                <BenefitButton
                  benefits={nftAuctionDetails.data.nft_details.benefits.length}
                  onClick={onExclusiveBenefitsScroll}
                />

                <BackButton addStyles={styles.backButton} />
              </div>
              <div css={styles.detailsContainer}>
                <h1 css={styles.name}>
                  {nftAuctionDetails.data.nft_details.name}
                </h1>
                {isTimeRemaining(
                  nftAuctionDetails.data.auction_details.auction_end_time,
                ) && (
                  <Fragment>
                    <div css={styles.timerWrapper}>
                      <CountdownTimer
                        remainingTimeInSecond={getTimeDifferenceFromNow(
                          parseInt(
                            nftAuctionDetails.data.auction_details
                              .auction_end_time,
                          ),
                        )}
                        onTimerFinish={NOOB}
                      />
                    </div>
                    <div css={styles.auctionEndTitle}>
                      {`${translate(`AUCTION_ENDS`)} ${
                        dateFormat(
                          new Date(
                            parseInt(
                              nftAuctionDetails.data.auction_details
                                .auction_end_time,
                            ),
                          ),
                        ) || translate(`SOON`)
                      }`}
                    </div>
                  </Fragment>
                )}
                <div css={styles.sectionWrapper}>
                  <ShadowInsideCard
                    listData={[
                      {
                        value: `₹${topBidAmount}`,
                        title: nftAuctionDetails.data.auction_details.top_bid
                          ? translate(`TOP_BID`)
                          : translate(`BASE_PRICE`),
                      },
                    ]}
                  />
                </div>

                <div css={styles.sectionWrapper}>
                  {isTimeRemaining(
                    nftAuctionDetails.data.auction_details.auction_end_time,
                  ) ? (
                    <PrimaryButton
                      onClick={() => {
                        handlePrimaryClick();
                        logPrimaryClick();
                      }}
                    >
                      {nftAuctionDetails.data.auction_details.bid_placed
                        ? translate(`RAISE_YOUR_BID`)
                        : translate(`PLACE_BID`)}
                    </PrimaryButton>
                  ) : (
                    <BottomStickyBanner>
                      {translate(`AUCTION_CLOSE_MESSAGE`)}
                    </BottomStickyBanner>
                  )}
                </div>

                {nftAuctionDetails?.data?.ctasToExplore?.length ? (
                  <div css={[utils.mb(40), styles.sectionWrapper]}>
                    <BlueCampaignBanner
                      title={
                        nftAuctionDetails?.data?.ctasToExplore?.[0]?.ctaText
                      }
                      link={
                        nftAuctionDetails?.data?.ctasToExplore?.[0]?.ctaLink
                      }
                      type={nftAuctionDetails?.data?.ctasToExplore?.[0]?.type}
                      target={
                        nftAuctionDetails?.data?.ctasToExplore?.[0]?.ctaTarget
                      }
                    />
                  </div>
                ) : null}

                {/*Auction Section*/}
                {(nftAuctionDetails.data.auction_details.bids.length > 0 ||
                  nftAuctionDetails.data.auction_details.top_bid) && (
                  <div css={styles.sectionWrapper}>
                    <BidSection
                      title={Constants.nftDetails.auctionBids}
                      bids={bidMapper(nftAuctionDetails.data.auction_details)}
                      isOutBidded={
                        isTimeRemaining(
                          nftAuctionDetails.data.auction_details
                            .auction_end_time,
                        ) && nftAuctionDetails.data.auction_details.is_out_bid
                      }
                      takeBid={() => handlePlaceBid(true)}
                    />
                  </div>
                )}

                {nftAuctionDetails?.data?.auction_details?.user_bids?.length ? (
                  <div css={styles.sectionWrapper}>
                    <BidSection
                      title="My Bids"
                      bids={userBidsMapper(
                        nftAuctionDetails.data.auction_details?.user_bids,
                      )}
                      isOutBidded={false}
                      takeBid={NOOB}
                    />
                  </div>
                ) : null}
                {/* Benefit section*/}
                {nftAuctionDetails.data.nft_details.benefits.length > 0 && (
                  <div css={styles.sectionWrapper} ref={exclusiveBenefitsRef}>
                    <SectionTitle title={translate(`EXCLUSIVE_BENEFITS`)} />
                    <div
                      css={[mixins.flexColumn, { gap: utils.remConverter(20) }]}
                    >
                      {nftAuctionDetails.data.nft_details?.benefits?.map(
                        (benefit, index) => (
                          <BenefitCardEnhanced
                            benefits={benefit}
                            key={index}
                            nftId={nftAuctionDetails?.data?.nft_details?.id}
                            notAuthorized={() => {
                              setCurrentBottomSheet({
                                isOpen: true,
                                size: BottomPopupSize.BIG,
                                component: SheetType.AUTH,
                              });
                              setOpenAuthFlowNoAction(true);
                            }}
                            onClick={() => {
                              router.push({
                                pathname: `${Pages.BENEFITS_DETAILS}/${benefit.id}`,
                                query: {
                                  nftId:
                                    nftAuctionDetails?.data?.nft_details?.id ||
                                    ``,
                                },
                              });
                            }}
                          />
                        ),
                      )}
                    </div>
                  </div>
                )}

                {/* NFT Details */}
                <div css={styles.sectionWrapper}>
                  <SectionTitle title={translate(`NFT_DETAILS`)} />
                  <AuthorDescription
                    author={nftAuctionDetails.data.nft_details.creator.name}
                    description={nftAuctionDetails.data.nft_details.description}
                    blockchain={nftAuctionDetails.data.nft_details.blockchain}
                  />
                </div>

                {/*PROPERTIES*/}
                {nftAuctionDetails.data.nft_details.properties && (
                  <div css={styles.sectionWrapper}>
                    <SectionTitle title={Constants.nftDetails.properties}>
                      {nftAuctionDetails.data.nft_details.rarityRank && (
                        <RarityTag
                          rarity={nftAuctionDetails.data.nft_details.rarityRank}
                        />
                      )}
                    </SectionTitle>

                    <PropertyGrid
                      properties={nftAuctionDetails.data.nft_details.properties}
                      rarityPercentage={
                        nftAuctionDetails.data.nft_details.rarityPercentage
                      }
                    />
                  </div>
                )}

                {/*collection*/}
                {nftAuctionDetails.data.nft_details.collection_new && (
                  <CollectionCard
                    id={nftAuctionDetails.data.nft_details.collection_new.id}
                    image={
                      nftAuctionDetails.data.nft_details.collection_new.image
                    }
                    name={
                      nftAuctionDetails.data.nft_details.collection_new.name
                    }
                    description={
                      nftAuctionDetails.data.nft_details.collection_new
                        .description
                    }
                  />
                )}
                <div css={styles.sectionWrapper}>
                  <SecondaryButton
                    onClick={() => {
                      nftAuctionDetails.data &&
                        share(
                          nftAuctionDetails.data.nft_details.name,
                          window.location.href,
                        );
                      trackClick(CLICK.SHARE_AUCTION, {
                        auction_uuid: router.query.id,
                        auction_name: nftAuctionDetails.data?.nft_details.name,
                      });
                    }}
                  >
                    {translate(`SHARE`)}
                  </SecondaryButton>
                </div>
              </div>
            </>
          )}
        </BottomNav>

        <BottomPopup
          isOpen={currentBottomSheet.isOpen}
          size={currentBottomSheet.size}
          title={
            currentBottomSheet.component !== SheetType.AUTH
              ? currentBottomSheet.component
              : undefined
          }
          onClose={() => {
            setCurrentBottomSheet({ isOpen: false });
            logClose(currentBottomSheet?.component as string);
          }}
        >
          {currentBottomSheet.component && renderSheet()}
        </BottomPopup>

        <BottomPopup
          isOpen={currentBottomSheet.component === SheetType.BENEFIT_ERROR}
          size={currentBottomSheet.size}
          onClose={() =>
            setCurrentBottomSheet({ ...currentBottomSheet, isOpen: false })
          }
        >
          <ErrorBottomSheet
            img={benefitError.img}
            title={benefitError.title}
            description={benefitError.description}
          />
        </BottomPopup>
      </Fragment>
    );
  } else if (nftAuctionDetails?.status === StatusType.ERROR) {
    router.push(Pages.PAGE_NOT_FOUND);
    return null;
  } else {
    return (
      <div>
        <ShimmerLargeImage />
        <div css={styles.loadingContainer}>
          <ShimmerCard
            margin={`54px 0 0 0`}
            height={30}
            borderRadius={10}
            isEffect={true}
          />
          <ShimmerCard
            margin={`20px 0 0 0`}
            height={52}
            borderRadius={10}
            isEffect={true}
          />
          <ShimmerCard
            margin={`60px 0 0 0`}
            height={72}
            borderRadius={10}
            isEffect={true}
          />
        </div>
      </div>
    );
  }
};
export default AuctionDetail;
