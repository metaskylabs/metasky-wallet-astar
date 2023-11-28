import ButtonLayout from '@components/HOC/ButtonLayout.tsx';
import {
  CardNfts,
  FullScreenPopUp,
  PrimaryButton,
  Video,
} from '@components/Shared';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import * as styles from '@styles/Modules/collection-details';
import { motion } from 'framer-motion';
//remove collectionDetails dummy data
import { useRouter } from 'next/router';
import AssetsImg from '@public/images';
import ShimmerLargeImage from '@components/Shimmer/ShimmerLargeImage';
import ShimmerCard from '@components/Shimmer/ShimmerCard';
import { mixins, utils } from '@styles/shared';
import * as Constants from '@utils/constants';
import { useSelector } from 'react-redux';
import { StoreState } from '@reducers';
import { State as collectionNftList } from '@reducers/collectionNftList';
import { State as marketPlaceNftList } from '@reducers/marketPlaceNftList';
import { getCollectionNftListing } from '@actions/collectionNftList';
import { handleErrorMessage } from '@utils/handleResponseToast';
import { getToken } from '@utils/helper';
import { LocalStorageVariables } from '@constants/authentication';
import { Pages } from '@utils/navigation';
import { getMarketPlaceNftListing } from '@actions/marketPlaceNftList';
import { MarketPlaceNftList } from '@typings/api/marketPlaceNftList';
import DetailCard from '@components/Detail/DetailCard';
import Authentication from '@components/Authentication';
import { State as profileState } from '@reducers/user';
import { useTranslate } from '@utils/useTranslate';
import { useUserSession } from '@utils/hooks/useUserSession';
import RichText from '@components/Shared/RichText';

const CollectionDetails = () => {
  const router = useRouter();
  const { id, onSale } = router.query;
  const collectionNftListState = useSelector<StoreState, collectionNftList>(
    (state) => state.collectionNftList,
  );
  const marketPlaceNftListState = useSelector<StoreState, marketPlaceNftList>(
    (state) => state.marketPlaceNftList,
  );
  const { isLogin } = useSelector<StoreState, profileState>(
    (state) => state.user,
  );
  const [isLoading, setIsLoading] = useState(true);
  const [imageShimmer, setImageShimmer] = useState<boolean>(true);
  const ref = useRef<HTMLDivElement>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [showLoginScreen, setShowLoginScreen] = useState<boolean>(false);
  const session = useUserSession();
  const { translate } = useTranslate();

  async function getNFTListing(id: string, onSale: string) {
    try {
      await getCollectionNftListing(id, 10, 1, [], onSale);
      await getMarketPlaceNftListing(1, [], router.query.filters as string);
      setIsLoading(false);
    } catch (err) {
      handleErrorMessage(err);
      router.push(`/404`);
    }
  }

  const handleLogin = () => {
    setShowLoginScreen(true);
  };

  useEffect(() => {
    if (router.isReady) {
      if (router.query && id !== undefined) {
        getNFTListing(id as string, onSale ? (onSale as string) : ``);
      }
    }
  }, [router.isReady, router.query, isLogin]);

  useEffect(() => {
    if (session.isLoggedIn) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  });

  const handleRoute = (data: MarketPlaceNftList) => {
    if (data.isOwner) {
      router.push(
        {
          pathname: `${Pages.NFT_DETAILS}/${data.nft_uuid}`,
          query: {
            data: JSON.stringify(data),
          },
        },
        `${Pages.NFT_DETAILS}/${data.nft_uuid}`,
      );
    } else {
      router.push(`${Pages.PURCHASE_NFT}/${data.sale_details?.listing_uuid}`);
    }
  };

  return (
    <ButtonLayout
      buttonComponent={
        <motion.div
          css={[styles.buttonContainer]}
          className="popup-button"
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
              if (ref.current) {
                ref.current.scrollIntoView({ behavior: `smooth` });
              }
            }}
          >
            {(marketPlaceNftListState?.list?.listing || []).length > 0
              ? `BUY NOW`
              : id === `azr-pune-ga-4b16-a548-c3496c2bb2c9`
              ? `BEING RESCHEDULED`
              : `SOLD OUT`}
          </PrimaryButton>
        </motion.div>
      }
    >
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
          <div style={{ width: `100%`, height: `100%` }}>
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
            {/* {!isLoggedIn && (
              <div css={styles.loginBanner} onClick={() => handleLogin()}>
                <img
                  src={AssetsImg.ic_priceTag.src}
                  alt=""
                  css={styles.loginBannerImg}
                />
                <div css={styles.loginBannerText}>
                  You may be eligible for a discount if you are whitelisted!
                  Click here to login.
                </div>
              </div>
            )} */}
            {isLoading ? (
              <ShimmerCard height={500} borderRadius={10} isEffect={true} />
            ) : collectionNftListState?.additional_data?.event_details &&
              Object.keys(
                collectionNftListState?.additional_data?.event_details,
              ).length > 0 ? (
              <div css={[utils.ml(16), utils.mr(16)]}>
                <span css={styles.benefitsText}>
                  {Constants.nftDetails.ticketDetails}
                </span>
                <DetailCard
                  items={Object.keys(
                    collectionNftListState?.additional_data?.event_details,
                  ).map((k) => ({
                    icon: ``,
                    key: k,
                    value:
                      collectionNftListState?.additional_data?.event_details?.[
                        k
                      ] || ``,
                  }))}
                  tncLink={
                    collectionNftListState?.additional_data
                      ?.terms_and_conditions
                  }
                />
              </div>
            ) : null}
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
                    <p css={styles.descriptionText}>
                      <RichText content={collectionNftListState?.description} />
                    </p>
                  </Fragment>
                )
              )}
              {collectionNftListState?.creator && (
                <Fragment>
                  <span css={[styles.descriptionCreatedBy]}>
                    {Constants.nftDetails.createdBy}
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
            <div css={[styles.nftContainer, utils.mt(24)]} ref={ref}>
              {marketPlaceNftListState?.list?.listing?.map((nft, i) => (
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
                    marketplace={true}
                    price={nft.sale_details?.price}
                    rarity={nft.rarityRank}
                    name={nft.name}
                    ctaText={`>`}
                    ribbon={nft.on_sale}
                    ribbonText={translate(`ON_SALE`)}
                  />
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
      <FullScreenPopUp isOpen={showLoginScreen}>
        <Authentication
          setLoginStatus={(status) => {
            if (isLoggedIn) {
              setIsLoggedIn(status);
            }
          }}
          onSuccess={() => {
            setShowLoginScreen(false);
          }}
          isPopUp={true}
        />
      </FullScreenPopUp>
    </ButtonLayout>
  );
};

export default CollectionDetails;
