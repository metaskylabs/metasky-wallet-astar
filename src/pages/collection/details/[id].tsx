import ButtonLayout from '@components/HOC/ButtonLayout.tsx';
import {
  BackButton,
  CardNfts,
  DividerLine,
  HeaderOne,
  PrimaryButton,
  Video,
} from '@components/Shared';
import React, { Fragment, useEffect, useState } from 'react';
import * as styles from '@styles/Modules/collection-details';
import { motion } from 'framer-motion';
//remove collectionDetails dummy data
import { useRouter } from 'next/router';
import AssetsImg from '@public/images';
import ShimmerLargeImage from '@components/Shimmer/ShimmerLargeImage';
import ShimmerCard from '@components/Shimmer/ShimmerCard';
import TokenInformation from '@components/Detail/TokenInfo';
import { mixins, utils } from '@styles/shared';
import { useSelector } from 'react-redux';
import { StoreState } from '@reducers';
import { State as collectionNftList } from '@reducers/collectionNftList';
import { CollectionNftList } from '@typings/api/collectionNftList';
import { getCollectionNftListing } from '@actions/collectionNftList';
import { handleErrorMessage } from '@utils/handleResponseToast';
import { getToken, onCopy } from '@utils/helper';
import { LocalStorageVariables } from '@constants/authentication';
import { Pages } from '@utils/navigation';
import { useTranslate } from '@utils/useTranslate';
import { NavTabs } from '@components/Shared/BottomNav/constants';
import BottomNav from '@components/Shared/BottomNav';
import { useAnalytics } from '@utils/useAnalytics';
import { EVENT_PAGE } from '@constants/analytics';

const CollectionDetails = () => {
  const router = useRouter();
  const { id, onSale } = router.query;
  const collectionNftListState = useSelector<StoreState, collectionNftList>(
    (state) => state.collectionNftList,
  );
  const [tokenList, setTokensList] = useState<CollectionNftList[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [imageShimmer, setImageShimmer] = useState<boolean>(true);
  const [clientID, setClientID] = useState(``);
  const { translate } = useTranslate();
  const { trackPage, trackClick } = useAnalytics();

  async function getNFTListing(id: string, onSale: string) {
    try {
      await getCollectionNftListing(id, 10, 1, [], onSale);
      setIsLoading(false);
    } catch (err) {
      handleErrorMessage(err);
      router.push(`/404`);
    }
  }

  useEffect(() => {
    if (router.isReady) {
      if (router.query && id !== undefined) {
        getNFTListing(id as string, onSale ? (onSale as string) : ``);
        const getClientID = getToken(LocalStorageVariables.METACLIENTID);
        setClientID(getClientID ? getClientID : ``);
        trackPage(EVENT_PAGE.COLLECTION_DETAIL, { collection_id: id });
      }
    }
  }, [router.isReady, router.query]);

  useEffect(() => {
    setTokensList(collectionNftListState.list.listing);
  }, [collectionNftListState.list.listing]);

  const handleRoute = (data: CollectionNftList) => {
    if (data.isOwner || (!data.isOwner && !data.on_sale)) {
      router.push(
        {
          pathname: `/nft-details/${data.id}`,
          query: {
            data: JSON.stringify(data),
          },
        },
        `/nft-details/${data.id}`,
      );
    } else {
      router.push(`/purchase-nft/${data.sale_details?.listing_uuid}`);
    }
  };

  const goToCollectionNftList = (collection_id: string) => {
    router.push(`${Pages.COLLECTIONS}/${collection_id}`);
  };

  return (
    <BottomNav currentTab={NavTabs.WALLET}>
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
        {/* TODO remove false */}
        {collectionNftListState?.media_type !== `image` ? (
          <div
            style={{ width: `100%`, height: `100%` }}
            onClick={() => {
              router.push({
                pathname: `/nft-details/zoom/${router.query.collection_id}`,
                query: {
                  url: collectionNftListState?.image,
                  // media_type: collectionNftListState?.media_type,
                },
              });
            }}
          >
            {/*//TODO: use media card component*/}
            <Video
              source={collectionNftListState?.image as string}
              width="100%"
              height="100%"
              disablePictureInPicture={true}
              controls={false}
              addStyles={styles.imageWidth}
              controlsList="nodownload"
              autoPlay={true}
              muted={true}
              loop={true}
              playsInline={true}
              onDurationChange={() => {
                const imgRef = document.getElementsByClassName(
                  `nftVideo`,
                )[0] as HTMLDivElement;
                imgRef.style.display = `block`;
                setImageShimmer(false);
                setIsLoading(false);
              }}
            />
          </div>
        ) : (
          <img
            src={
              collectionNftListState?.image
                ? collectionNftListState?.image
                : AssetsImg.i_collectionDefault
            }
            alt={`Details Image`}
            css={styles.imageWidth}
            width="100%"
            height="100%"
            className="nftMedia"
            onLoad={() => {
              const imgRef = document.getElementsByClassName(
                `nftMedia`,
              )[0] as HTMLDivElement;
              imgRef.style.display = `block`;
              setImageShimmer(false);
              setIsLoading(false);
            }}
            onError={(event) => {
              (event.target as HTMLImageElement).src =
                AssetsImg.i_collectionDefault.src;
              setImageShimmer(false);
            }}
          />
        )}
        {imageShimmer && <ShimmerLargeImage />}
        <BackButton addStyles={styles.backButton} />
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
            <span css={styles.cardAccessText}>
              {isLoading ? (
                <ShimmerCard height={30} borderRadius={10} isEffect={true} />
              ) : (
                collectionNftListState?.name
              )}
            </span>

            <div
              css={[
                utils.pt(0),
                utils.pb(0),
                utils.pl(16),
                utils.pr(16),
                utils.mb(40),
              ]}
            >
              {isLoading ? (
                <ShimmerCard height={70} borderRadius={10} isEffect={true} />
              ) : (
                <TokenInformation
                  infoItems={
                    collectionNftListState && collectionNftListState?.size
                      ? [
                          {
                            title: String(collectionNftListState?.size),
                            subtitle: translate(`NFTS`),
                          },
                        ]
                      : []
                  }
                />
              )}
            </div>
            <motion.div
              css={[styles.buttonContainer]}
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.3,
                default: { duration: 0.3 },
                ease: `easeIn`,
              }}
            >
              <PrimaryButton
                addStyles={styles.button}
                onClick={() => {
                  if (window && window.navigator && window.navigator.share!) {
                    navigator
                      .share({
                        title: collectionNftListState.name,
                        text: `${window.location.href}${
                          (clientID !== `` || clientID) &&
                          `?client_id=${clientID}`
                        }`,
                        url: `${window.location.href}${
                          (clientID !== `` || clientID) &&
                          `?client_id=${clientID}`
                        }`,
                      })
                      .then(() => {
                        console.log(`Thanks for sharing!`);
                      })
                      .catch((error) => {
                        console.error(error);
                      });
                  } else {
                    onCopy(
                      `${window.location.href}${
                        (clientID !== `` || clientID) &&
                        `?client_id=${clientID}`
                      }`,
                      `Link copied!`,
                    );
                  }
                }}
              >
                {translate(`SHARE_COLLECTION`)}
              </PrimaryButton>
            </motion.div>
            <div
              css={[
                utils.pt(0),
                utils.pb(0),
                utils.pl(16),
                utils.pr(16),
                utils.mb(40),
              ]}
            >
              {isLoading ? (
                <div
                  css={[
                    utils.pt(0),
                    utils.pb(0),
                    utils.pl(16),
                    utils.pr(16),
                    utils.mb(40),
                  ]}
                >
                  <ShimmerCard height={500} borderRadius={10} isEffect={true} />
                </div>
              ) : (
                collectionNftListState?.description && (
                  <Fragment>
                    <span css={styles.descriptionTitle}>
                      {translate(`DESCRIPTION`)}
                    </span>
                    <p css={styles.descriptionText}>
                      {collectionNftListState?.description}
                    </p>
                  </Fragment>
                )
              )}
              {collectionNftListState?.creator && (
                <Fragment>
                  <span css={[styles.descriptionCreatedBy]}>
                    {translate(`CREATED_BY`)}
                  </span>
                  <div css={styles.descriptionAuthor}>
                    <div
                      css={[
                        styles.descriptionAuthorImage,
                        mixins.flexAlignJustifiedCenter,
                      ]}
                    >
                      <img
                        src={AssetsImg.ic_genericAuthor.src}
                        alt={collectionNftListState.creator}
                        width="100%"
                        height="100%"
                        css={styles.authorImage}
                      />
                    </div>
                    <span css={[styles.descriptionAuthorName]}>
                      {collectionNftListState.creator}
                    </span>
                  </div>
                </Fragment>
              )}
            </div>
            {tokenList.length > 0 && (
              <Fragment>
                <DividerLine />
                <div css={[utils.pr(16), utils.pl(16)]}>
                  <HeaderOne title={translate(`NFTS`)}>
                    {tokenList.length > 1 && (
                      <span
                        css={styles.seeAll}
                        onClick={() =>
                          goToCollectionNftList(collectionNftListState.id)
                        }
                      >
                        {translate(`SEE_ALL`)}
                      </span>
                    )}
                  </HeaderOne>
                </div>
                <section css={[styles.nftContainer, utils.mt(24)]}>
                  {tokenList.map((nft, i) => (
                    <div key={nft.id} css={styles.nftCardContainer}>
                      <CardNfts
                        key={nft.id}
                        keys={i}
                        addStyles={styles.nftCard}
                        imageStyles={styles.nftCardImage}
                        image={nft.image}
                        mediaType={nft.media_type}
                        content={nft.name}
                        onClick={() => handleRoute(nft)}
                        ribbon={nft.on_sale}
                        ribbonText={translate(`ON_SALE`)}
                        marketplace={true}
                        price={nft.sale_details?.price}
                        rarity={nft.rarityRank}
                        name={nft.name}
                        ctaText={`>`}
                      />
                    </div>
                  ))}
                </section>
              </Fragment>
            )}
          </motion.div>
        </div>
      </motion.div>
    </BottomNav>
  );
};

export default CollectionDetails;
