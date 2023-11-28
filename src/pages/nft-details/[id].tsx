import * as styles from '@styles/Modules/details';
import * as purchaseNFTstyles from '@styles/Modules/purchaseNFT';
import {
  BackButton,
  BottomPopup,
  BottomSheet,
  CardNfts,
  CardProperties,
  FullScreenKiteLoader,
  FullScreenPopUp,
  MediaCard,
  MLottie,
  PrimaryButton,
  ShadowInsideCard,
} from '@components/Shared';
import 'swiper/css';
import BuySellAction from '@components/Detail/BuySellActionPanel';
import { RarityInfo } from '@components/Detail/TokenInfo';
import { mixins, typography, utils } from '@styles/shared';
import React, { useMemo, Fragment, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import * as Constants from '@utils/constants';
import AuthorDescription from '@components/Detail/AuthorDescription';
import {
  TokensListResponse,
  TokensType,
  WalletBenefitsResponse,
} from '@typings/api/wallet';
import AssetsImg from '@public/images';
import {
  getBenefitAccessInfo,
  getTokenDetails,
  getTransactionById,
} from '@actions/wallet';
import { handleErrorMessage } from '@utils/handleResponseToast';
import ExclusiveBenefits from '@components/Benefits/ExclusiveBenefits';
import { Pages } from '@utils/navigation';
import { motion } from 'framer-motion';
import ShimmerCard from '@components/Shimmer/ShimmerCard';
import { getToken, limitDecimal } from '@utils/helper';
import { BenefitType } from '@constants/wallet';
import { CLICK, click, EVENT_PAGE, screen } from '@constants/analytics';
import NFTListingFlow, { FlowName } from '@components/NFTListingFlow';
import NFTTransferFlow from '@components/NFTTransferFlow';
import { css } from '@emotion/react';
import Link from 'next/link';
import generateToast from '@components/Shared/GenerateToast';
import { ToastType } from '@components/Shared/Toast';
import { useSelector } from 'react-redux';
import { StatusState, StoreState } from '@reducers';
import { onlyNumber } from '@utils/regexes';
import { FetchingState } from '@constants/redux';
import BenefitCardEnhanced from '@components/Benefits/BenefitCardEnhanced';
import { LocalStorageVariables } from '@constants/authentication';
import ErrorBottomSheet from '@components/Shared/ErrorBottomSheet';
import useLinkHandler from '@utils/hooks/useLinkHandler';
import BlueCampaignBanner from '@components/Shared/Bannner/BlueCampaignBanner';
import { Client } from '@constants/clients';
import { useTranslate } from '@utils/useTranslate';
import { useSnapshot } from 'valtio';
import BottomNav from '@components/Shared/BottomNav';
import { NavTabs } from '@components/Shared/BottomNav/constants';
import { ShadowInsideCardProps } from '@components/Shared/Card/ShadowInside';
import { BottomPopupSize } from '@components/Shared/BottomPopup';
import ShimmerLargeImage from '@components/Shimmer/ShimmerLargeImage';
import NOOB from '@constants/noob';
import { useAnalytics } from '@utils/useAnalytics';
import AccountCountTable from '@components/AccountCountTable';
import { useUserSession } from '@utils/hooks/useUserSession';
import { WalletCustodyType } from '@typings/api/auth';
import Authentication from '@components/Authentication';

enum FLOW_NAME {
  SELL,
  TRANSFER,
  UPDATE,
  DEFAULT,
}

function NftDetails() {
  const router = useRouter();
  const [nftDetails, setNftDetails] = useState<TokensListResponse>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const session = useUserSession();
  const amplitude = useAnalytics();
  const { translate } = useTranslate();
  const [isFetchingCTA, setFetchingCTA] = useState<boolean>(true);
  const [tokenInformation, setTokenInformation] = useState<
    ShadowInsideCardProps['listData']
  >([]);

  const [benefitError, setBenefitError] = useState<{
    open: boolean;
    title: string;
    description: string;
    img?: React.ReactNode;
  }>({ open: false, title: ``, description: ``, img: `` });

  const [flowName, setFlowName] = useState<FLOW_NAME>(FLOW_NAME.DEFAULT);

  const { query } = router;
  const { trackPage, trackClick } = useAnalytics();

  const getNftDetails = async (url: string) => {
    try {
      setIsLoading(true);
      const response = await getTokenDetails(url);
      setNftDetails(response.data);
      setIsLoading(false);
    } catch (error) {
      handleErrorMessage(error);
      setIsLoading(false);
      /* router.push(Pages.PAGE_NOT_FOUND); */
    }
  };

  useEffect(() => {
    if (router.isReady) {
      const nft_uuid = query.id as string;
      getNftDetails(
        `wallet/tokens/${TokensType.NFTS}/${nft_uuid}?referrer_order_uuid=${
          query.referrer_order_uuid || ``
        }`,
      );
    }
  }, [router.isReady, router.query.id]);

  useEffect(() => {
    if (nftDetails) {
      trackPage(EVENT_PAGE.NFT_DETAIL, {
        nft_uuid: nftDetails.id,
        nft_name: nftDetails.name,
      });
    }
  }, [nftDetails]);

  const renderProperties = (benefitData: any) => {
    const options: any = [];

    Object.keys(benefitData).map((key, index) => {
      options.push(
        <CardProperties
          title={key.toUpperCase()}
          subtitle={benefitData[key]}
          key={index}
          propertyId={index}
          rarityPercentage={
            nftDetails?.rarityPercentage && nftDetails?.rarityPercentage[key]
          }
        />,
      );
    });
    return options;
  };

  /**
   *
   * REVEAL NFT API
   *
   */

  const goToCollection = (collection_id: string) => {
    router.push(`${Pages.COLLECTION_DETAILS}/${collection_id}`);
  };

  useEffect(() => {
    if (nftDetails) {
      const listDetails: ShadowInsideCardProps['listData'] = [];
      if (nftDetails.totalQuantity && nftDetails.totalQuantity > 1) {
        listDetails.push({
          title: translate(`TOTAL`),
          value: nftDetails?.totalQuantity.toString(),
        });
      }
      if (nftDetails.rarityRank) {
        listDetails.push({
          customComponent: RarityInfo({
            title: nftDetails.rarityRank.toString(),
            subtitle: translate(`RARITY_RANK`),
          }),
        });
      }
      if (
        (nftDetails.quantity || nftDetails.quantity === 0) &&
        nftDetails?.totalQuantity > 1
      ) {
        listDetails.push({
          title: translate(`YOU_OWN`),
          value: nftDetails.quantity.toString(),
        });
      }
      setTokenInformation(listDetails);
    }
  }, [nftDetails]);

  /*
    we try to take the link of the first audio asset from the first benefit of this NFT
    and ignore the other ones
  */
  const audioAssetLink = useMemo(() => {
    if (nftDetails) {
      for (const benefit of nftDetails.benefits) {
        if (benefit.audio_asset) {
          for (const audio_asset_link of benefit.audio_asset) {
            return audio_asset_link;
          }
        }
      }
    }
    return null;
  }, [nftDetails]);

  useEffect(() => {
    if (nftDetails?.status !== `PENDING` || !nftDetails?.transactions?.id)
      return;
    const timeIntervalId = setInterval(async () => {
      const response = await getTransactionById(
        nftDetails?.transactions?.id || ``,
      ).catch((err) => console.error);
      if (
        (response as any)?.data?.status ===
        Constants.TransactionStatus.completed
      ) {
        if ((response as any)?.data?.token.id)
          router.push(
            `/nft-details/${(response as any)?.data?.token.id || ``}`,
          );
        else
          router.push({
            pathname: nftDetails?.order_uuid
              ? `${Pages.TRANSACTION_DETAILS}/${nftDetails?.order_uuid}`
              : Pages.TRANSACTION,
          });
      }
    }, 15000);
    return () => clearInterval(timeIntervalId);
  }, [nftDetails]);

  const getCTAComponent = () => {
    return isLoading || isFetchingCTA ? (
      <div css={[mixins.flexAlignJustifiedCenter, utils.padding(16)]}>
        <MLottie addStyles={utils.width(40)} />
      </div>
    ) : nftDetails?.status === `PENDING` ? (
      <div
        css={[styles.nftPendingBanner, mixins.flexAlignCenterJustifiedBetween]}
        onClick={() => {
          router.push({
            pathname: nftDetails?.order_uuid
              ? `${Pages.TRANSACTION_DETAILS}/${nftDetails?.order_uuid}`
              : Pages.TRANSACTION,
          });
        }}
      >
        <div css={mixins.flex}>
          <img src={AssetsImg.ic_list.src} css={styles.listIcon} />
          <div css={[mixins.flexColumn, mixins.flexAlignStart]}>
            <div css={typography.T_16_Bold}>
              {translate(`TRANSACTION_IS_IN_PROGRESS`)}
            </div>
            <div css={typography.T_14_Regular}>
              {translate(`CLICK_TO_VIEW_TRANSACTION_DETAILS`)}
            </div>
          </div>
        </div>
      </div>
    ) : nftDetails?.on_sale && nftDetails?.isOwner ? (
      <div
        css={[
          styles.nftListingBanner,
          mixins.flexAlignJustifiedCenter,
          nftDetails?.sale_details?.status === `SUCCESS`
            ? css({ ...typography.T_20_Bold })
            : css({ ...typography.T_16_Bold }),
        ]}
      >
        {nftDetails?.sale_details?.status === `SUCCESS` ? (
          <Fragment>
            <span>{translate(`NFT_LISTED_FOR_SALE`)}</span>
            {nftDetails?.sale_details?.listing_uuid && (
              <Link
                href={`/purchase-nft/${nftDetails?.sale_details?.listing_uuid}`}
              >
                <span
                  css={styles.viewNftLinkOnSale}
                  onClick={() =>
                    trackClick(CLICK.VIEW_IN_NFT_DETAIL, {
                      nft_uuid: nftDetails.id,
                      nft_name: nftDetails.name,
                    })
                  }
                >
                  {translate(`VIEW`)}
                </span>
              </Link>
            )}
          </Fragment>
        ) : (
          <span>
            {translate(`NFT_IS_GOING_ON_SALE`)}
            {nftDetails?.sale_details?.order_uuid && (
              <>
                {translate(`VIEW_TRANSACTION`)}
                <Link
                  href={`${Pages.TRANSACTION_DETAILS}/${nftDetails?.sale_details?.order_uuid}`}
                >
                  <a css={styles.nftListingTransactionLink}>
                    {translate(`HERE`)}
                  </a>
                </Link>
              </>
            )}
          </span>
        )}
      </div>
    ) : nftDetails && nftDetails?.isOwner ? (
      <div css={utils.mb(40)}>
        <BuySellAction
          onSell={() => {
            if (nftDetails?.disableSell) {
              generateToast({
                type: ToastType.INFO,
                content: `This NFT is not supported for a sale currently`,
              });
              return;
            }
            trackClick(CLICK.SELL, {
              nft_uuid: nftDetails.id,
              nft_name: nftDetails.name,
            });
            setFlowName(FLOW_NAME.SELL);
          }}
          onSend={() => {
            if (nftDetails?.disableTransfer) {
              generateToast({
                type: ToastType.INFO,
                content: `This NFT is not supported for a transfer currently`,
              });
              return;
            }
            const custodialWallet = nftDetails?.wallet_details?.find(
              (wallet) => wallet.type === WalletCustodyType.CUSTODIAL,
            );

            if ((custodialWallet?.quantity || 0) < 1) {
              generateToast({
                type: ToastType.INFO,
                content: `You do not have this NFT in SkyWallet account`,
              });
              return;
            }
            setFlowName(FLOW_NAME.TRANSFER);
            trackClick(click.sendNftDetails, {
              nft_uuid: nftDetails.id,
              nft_name: nftDetails.name,
            });
          }}
        />
      </div>
    ) : (
      <></>
    );
  };

  if (!session.isLoggedIn) {
    return (
      <FullScreenPopUp isOpen={true}>
        <Authentication
          onSuccess={() => {
            getNftDetails(`wallet/tokens/${TokensType.NFTS}/${query.id}`);
          }}
          isPopUp={true}
        />
      </FullScreenPopUp>
    );
  } else {
    return (
      <BottomNav currentTab={NavTabs.WALLET}>
        <Fragment>
          <motion.div
            css={styles.headerContainer}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.2,
              default: { duration: 0.5 },
              ease: `easeIn`,
            }}
          >
            {nftDetails ? (
              <MediaCard
                mediaType={nftDetails?.media_type}
                mediaUrl={nftDetails?.image}
              />
            ) : (
              <ShimmerLargeImage />
            )}
            <BackButton addStyles={styles.backButton} />
          </motion.div>
          {/* playback control for audio asset associated with this NFT */}
          {audioAssetLink && (
            <div css={mixins.flexAlignJustifiedCenter}>
              <audio
                controls
                css={styles.audioControls}
                controlsList="nodownload"
              >
                {/* The type to be updated based on the file type being played */}
                <source src={audioAssetLink} />
                Your browser does not support the audio element.
              </audio>
            </div>
          )}
          <div css={styles.bodyContainer}>
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.3,
                default: { duration: 0.5 },
                ease: `easeIn`,
              }}
            >
              <span
                css={[styles.cardAccessText, mixins.flexAlignJustifiedCenter]}
              >
                {isLoading ? (
                  <ShimmerCard height={30} borderRadius={10} isEffect={true} />
                ) : (
                  nftDetails?.name
                )}
              </span>
              {tokenInformation.length > 0 && (
                <div css={styles.tokenInformationContainer}>
                  {isLoading ? (
                    <ShimmerCard height={70} borderRadius={4} isEffect={true} />
                  ) : (
                    <ShadowInsideCard listData={tokenInformation} />
                  )}
                </div>
              )}

              {getCTAComponent()}

              {nftDetails?.ctasToExplore?.length ? (
                <div css={[utils.mb(40), styles.padding]}>
                  <BlueCampaignBanner
                    title={nftDetails?.ctasToExplore?.[0]?.ctaText}
                    link={nftDetails?.ctasToExplore?.[0]?.ctaLink}
                    type={nftDetails?.ctasToExplore?.[0]?.type}
                    target={nftDetails?.ctasToExplore?.[0]?.ctaTarget}
                  />
                </div>
              ) : null}
              {(nftDetails?.wallet_details?.filter(
                (wallet) => wallet.quantity > 0,
              )?.length || 0) > 0 && (
                <section css={styles.offerContainer}>
                  <AccountCountTable
                    accountCounts={
                      nftDetails?.wallet_details
                        ?.filter((wallet) => wallet.quantity > 0)
                        ?.map((wallet) => ({
                          account: wallet.ethAddress,
                          count: wallet.quantity,
                        })) || []
                    }
                  />
                </section>
              )}
            </motion.div>
            <div css={[mixins.flexColumn]}>
              {isLoading ? (
                <div css={styles.padding}>
                  <ShimmerCard height={500} borderRadius={10} isEffect={true} />
                </div>
              ) : (
                nftDetails &&
                nftDetails?.creator && (
                  <div css={[utils.mt(12)]}>
                    <span
                      css={[styles.benefitsText, utils.pl(16), utils.pr(16)]}
                    >
                      {translate(`NFT_DETAILS`)}
                    </span>
                    <div css={styles.padding}>
                      <AuthorDescription
                        author={
                          nftDetails.creator.name
                            ? nftDetails.creator.name
                            : undefined
                        }
                        description={
                          nftDetails.description ? nftDetails.description : ``
                        }
                        image={
                          nftDetails.creator.image
                            ? nftDetails.creator.image
                            : undefined
                        }
                        blockchain={nftDetails?.blockchain}
                      />
                    </div>
                  </div>
                )
              )}
              {!isLoading && nftDetails?.benefits.length != 0 && (
                <motion.div
                  css={styles.cardBenefits}
                  initial={{ opacity: 0, y: 70 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.4,
                    default: { duration: 0.5 },
                    ease: `easeIn`,
                  }}
                >
                  <div
                    css={[
                      mixins.flexColumn,
                      {
                        gap: utils.remConverter(20),
                        padding: `0 ${utils.remConverter(16)}`,
                      },
                    ]}
                  >
                    <span
                      css={[
                        styles.benefitsText,
                        mixins.flexAlignCenterJustifiedBetween,
                      ]}
                    >
                      {translate(`EXCLUSIVE_BENEFITS`)}
                      {nftDetails?.benefits &&
                        nftDetails?.benefits?.length > 0 && (
                          <span
                            css={purchaseNFTstyles.seeAll}
                            onClick={() => {
                              trackClick(`see all benefit`, {
                                nftId: nftDetails?.id,
                              });
                              router.push({
                                pathname: `${Pages.BENEFITS}/${BenefitType.OWNED}/${nftDetails?.id}`,
                              });
                            }}
                          >
                            {translate(`SEE_ALL`)}
                          </span>
                        )}
                    </span>
                    {nftDetails?.benefits?.map((benefit, index) => (
                      <BenefitCardEnhanced
                        benefits={benefit}
                        key={index}
                        nftId={nftDetails?.id}
                        onClick={() => {
                          router.push({
                            pathname: `/benefit-details/${benefit.id}`,
                            query: {
                              nftId: nftDetails?.id || ``,
                            },
                          });
                        }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
            {!isLoading &&
              nftDetails?.properties &&
              Object.values(nftDetails?.properties).length > 0 && (
                <motion.div
                  css={mixins.flexColumn}
                  initial={{ opacity: 0, y: 80 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.5,
                    default: { duration: 0.5 },
                    ease: `easeIn`,
                  }}
                >
                  <div
                    css={[
                      styles.propertiesHeader,
                      styles.padding,
                      mixins.flexAlignCenterJustifiedBetween,
                    ]}
                  >
                    <div css={[mixins.flexAlignJustifiedCenter]}>
                      <span css={styles.benefitsText}>
                        {translate(`PROPERTIES`)}
                      </span>
                    </div>
                    {nftDetails.rarityRank && (
                      <div css={styles.purchaseRankingChip}>
                        <img src={AssetsImg.ic_rarity_diamond.src} />
                        <span
                          css={[
                            styles.purchaseRankingText,
                            mixins.flexAlignCenter,
                          ]}
                        >
                          {translate(`RARITY_RANKING`)}:
                          {`#${nftDetails.rarityRank}`}
                        </span>
                      </div>
                    )}
                  </div>

                  <div css={styles.propertiesBody}>
                    {nftDetails?.properties &&
                      renderProperties(nftDetails?.properties)}
                    {/* {nftDetails?.metaData?.traits.map((property: any) => {
                          return (
                            <CardProperties
                              title={property.type}
                              subtitle={property.value}
                              content={property.rarity + `% have this trait`}
                              key={Math.floor(Math.random() * 101)}
                            />
                          );
                        })} */}
                  </div>
                </motion.div>
              )}
            {isLoading ? (
              <div css={styles.padding}>
                <ShimmerCard height={500} borderRadius={10} isEffect={true} />
              </div>
            ) : (
              nftDetails &&
              nftDetails?.collection_new && (
                <Fragment>
                  <div
                    css={styles.padding}
                    onClick={() => {
                      trackClick(CLICK.COLLECTION_CARD_NFT_DETAIL, {
                        collection_id: nftDetails.collection_new.id,
                        collection_name: nftDetails.collection_new.name,
                      });
                      goToCollection(nftDetails.collection_new.id);
                    }}
                  >
                    <div css={styles.collectionCard}>
                      <img
                        src={
                          nftDetails.collection_new.image !== null
                            ? nftDetails.collection_new.image
                            : AssetsImg.i_collectionDefault.src
                        }
                        alt=""
                        css={styles.collectionImg}
                        onError={(event) => {
                          (event.target as HTMLImageElement).src =
                            AssetsImg.i_collectionDefault.src;
                        }}
                      />
                      <div>
                        <h3 css={styles.collectionName}>
                          {nftDetails.collection_new.name}
                        </h3>
                        <p css={styles.collectionDescription}>
                          {nftDetails.collection_new.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </Fragment>
              )
            )}
            {nftDetails?.alsoBuyListings?.length ? (
              <div css={[styles.padding, utils.mt(40)]}>
                <div css={[styles.benefitsText, utils.mb(20)]}>
                  {`You can also buy`}
                </div>
                <div css={styles.horizontalList}>
                  {nftDetails?.alsoBuyListings?.map((item, index) => (
                    <CardNfts
                      key={index}
                      addStyles={styles.nftCardContainer}
                      imageStyles={styles.nftCardImage}
                      image={item.image} //{AssetsImg.i_default}
                      mediaType={item.media_type}
                      onClick={() => {
                        if (item.listing_uuid)
                          router.push(
                            `${Pages.PURCHASE_NFT}/${item.listing_uuid}`,
                          );
                      }}
                      name={item.name}
                    />
                  ))}
                </div>
              </div>
            ) : null}
            {/* <div css={[styles.nftCard, styles.padding]}>
                <div css={[styles.token, mixins.flexAlignCenterJustifiedBetween]}>
                  <span css={styles.bodyTokenTitle}>
                    {Constants.home.joinCommunity}
                  </span>
                </div>
                <div css={[styles.links, mixins.flexAlignCenterJustifiedBetween]}>
                  <SocialMediaButton icon={AssetsImg.ic_instagram.src} name="Instagram" />
                  <SocialMediaButton icon={AssetsImg.ic_facebook.src} name="Facebook" />
                  <SocialMediaButton icon={AssetsImg.ic_twitter.src} name="Twitter" />
                  <SocialMediaButton icon={AssetsImg.ic_discord.src} name="Discord" />
                  <SocialMediaButton icon={AssetsImg.ic_youtube.src} name="Youtube" />
                </div>
              </div>
              <div css={[styles.nftCard, styles.padding]}>
                <div css={styles.token}>
                  <span css={styles.bodyTokenTitle}>{Constants.home.otherLinks}</span>
                </div>
                <div css={[styles.links, mixins.flexAlignCenterJustifiedBetween]}>
                  <SocialMediaButton
                    icon={AssetsImg.ic_otherLink.src}
                    name="Other Link"
                  />
                </div>
              </div> */}
          </div>

          {flowName === FLOW_NAME.SELL && (
            <NFTListingFlow
              onBack={() => {
                amplitude.trackClick(CLICK.CLOSE_SELL_FLOW, {
                  nft_uuid: nftDetails?.id,
                  nft_name: nftDetails?.name,
                });
                setFlowName(FLOW_NAME.DEFAULT);
              }}
              onClose={() => setFlowName(FLOW_NAME.DEFAULT)}
              nftUid={nftDetails?.id || ``}
              nftName={nftDetails?.name || ``}
              nftMediaType={nftDetails?.media_type || ``}
              nftQuantity={String(1)} // TODO:- Passing 1 as static argument for this release
              nftMediaLink={nftDetails?.image || ``}
              flowName={FlowName.SELL}
            />
          )}
          {flowName === FLOW_NAME.TRANSFER && (
            <NFTTransferFlow
              nftUid={nftDetails?.id || ``}
              onBack={() => setFlowName(FLOW_NAME.DEFAULT)}
            />
          )}
          <BottomPopup
            isOpen={benefitError.open}
            onClose={() =>
              setBenefitError({ open: false, title: ``, description: `` })
            }
          >
            <ErrorBottomSheet
              img={benefitError.img}
              title={benefitError.title}
              description={benefitError.description}
            />
          </BottomPopup>
        </Fragment>
      </BottomNav>
    );
  }
}

export default NftDetails;
