import {
  BackButton,
  BottomPopup,
  FullScreenPopUp,
  MLottie,
  PrimaryButton,
} from '@components/Shared';
import React, { Fragment, useEffect, useState } from 'react';
import * as styles from '@styles/Modules/collection-details';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import AssetsImg from '@public/images';
import ShimmerLargeImage from '@components/Shimmer/ShimmerLargeImage';
import ShimmerCard from '@components/Shimmer/ShimmerCard';
import TokenInformation from '@components/Detail/TokenInfo';
import { mixins, utils } from '@styles/shared';
import { useSelector } from 'react-redux';
import { StoreState } from '@reducers';
import { State as userProfileState } from '@reducers/user';
import { getToken } from '@utils/helper';
import { LocalStorageVariables } from '@constants/authentication';
import { useTranslate } from '@utils/useTranslate';
import { NavTabs } from '@components/Shared/BottomNav/constants';
import BottomNav from '@components/Shared/BottomNav';
import { useAnalytics } from '@utils/useAnalytics';
import { CLICK, EVENT_PAGE, EVENT_PROCESS } from '@constants/analytics';
import useClaimCollectionDetails from '@hooks/collections/useClaimCollectionDetails';
import { useUserSession } from '@utils/hooks/useUserSession';
import { BottomPopupSize } from '@components/Shared/BottomPopup';
import AccountSelector from '@components/AccountSelector';
import Authentication from '@components/Authentication';
import { isEmpty } from 'lodash';
import { css } from '@emotion/react';
import { handleErrorMessage } from '@utils/handleResponseToast';

const CollectionDetails = () => {
  const router = useRouter();
  const { id } = router.query;

  const session = useUserSession();

  const { profile } = useSelector<StoreState, userProfileState>(
    (state) => state.user,
  );

  const { hookStateLoading, collection, claimAnNFT } =
    useClaimCollectionDetails(id as string);

  const [imageShimmer, setImageShimmer] = useState<boolean>(true);
  // const [clientID, setClientID] = useState(``);

  const [walletUUID, setWalletUUID] = useState(
    (profile &&
      profile.allWalletAddresses.length === 1 &&
      profile.allWalletAddresses[0].wallet_uuid) ||
      ``,
  );
  const [authRequired, setAuthRequired] = useState(false);
  const [accountSelectorOpen, setAccountSelectorOpen] = useState(false);
  const [isClaiming, setIsClaiming] = useState<boolean>(false);
  const { translate } = useTranslate();
  const { trackPage, trackClick, trackProcess } = useAnalytics();

  const showSocialLinks =
    !isEmpty(collection.twitterLink) ||
    !isEmpty(collection.facebookLink) ||
    !isEmpty(collection.discordLink) ||
    !isEmpty(collection.instagramLink);

  useEffect(() => {
    if (router.isReady) {
      if (router.query && id !== undefined) {
        const getClientID = getToken(LocalStorageVariables.METACLIENTID);
        // setClientID(getClientID ? getClientID : ``);
        trackPage(EVENT_PAGE.COLLECTION_CLAIM_DETAIL, {
          collection_token_id: id,
        });
      }
    }
  }, [router.isReady, router.query]);

  useEffect(() => {
    if (router.isReady && !collection.isFree && id) {
      router.replace(`/purchase-nft/${id}`);
    }
  }, [router.isReady, collection.isFree, id]);

  const handleClaimNFT = async () => {
    if (!session.isLoggedIn) {
      setAuthRequired(true);
      return;
    }
    setIsClaiming(true);
    if (!walletUUID) {
      setAccountSelectorOpen(true);
      return;
    }
    trackClick(CLICK.CLAIM_COLLECTION_NFT);
    const { nftUUID, error } = await claimAnNFT(walletUUID);
    if (nftUUID) {
      trackProcess(EVENT_PROCESS.COLLECTION_NFT_CLAIMED, {
        nft_uuid: nftUUID,
      });
      router.push(`/nft-details/${nftUUID}`);
    } else {
      handleErrorMessage(
        null,
        error || `Failed to claim an NFT, please try again`,
      );
    }
    setIsClaiming(false);
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
        <img
          src={
            collection.image ? collection.image : AssetsImg.i_collectionDefault
          }
          alt={collection.name || `Detail image`}
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
          }}
          onError={(event) => {
            (event.target as HTMLImageElement).src =
              AssetsImg.i_collectionDefault.src;
            setImageShimmer(false);
          }}
        />
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
              {hookStateLoading ? (
                <ShimmerCard height={30} borderRadius={10} isEffect={true} />
              ) : (
                collection.name
              )}
            </span>
            <div
              css={[
                utils.pt(0),
                utils.pb(0),
                utils.pl(16),
                utils.pr(16),
                utils.mb(30),
              ]}
            >
              {hookStateLoading ? (
                <ShimmerCard height={70} borderRadius={10} isEffect={true} />
              ) : (
                <TokenInformation
                  infoItems={[
                    {
                      title: translate(`FREE`),
                      subtitle: translate(`PRICE`),
                    },
                  ]}
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
                onClick={handleClaimNFT}
                disabled={isClaiming || hookStateLoading || false}
              >
                {isClaiming || hookStateLoading ? (
                  <MLottie addStyles={utils.width(40)} />
                ) : (
                  translate(`CLAIM_COLLECTION_NFT`)
                )}
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
              {hookStateLoading ? (
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
                collection.description && (
                  <Fragment>
                    <span css={styles.descriptionTitle}>
                      {translate(`DESCRIPTION`)}
                    </span>
                    <p
                      css={[
                        styles.descriptionText,
                        css({ whiteSpace: `pre-wrap` }),
                      ]}
                    >
                      {collection.description}
                    </p>
                  </Fragment>
                )
              )}
              {hookStateLoading ? (
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
                <Fragment>
                  <span css={[styles.descriptionTitle]}>
                    {translate(`SYMBOL`)}
                  </span>
                  <div css={[utils.mb(20)]}>{collection.symbol}</div>
                </Fragment>
              )}
              {hookStateLoading ? (
                <ShimmerCard height={30} borderRadius={10} isEffect={true} />
              ) : (
                <>
                  <span css={[styles.descriptionTitle]}>
                    {translate(`CATEGORY`)}
                  </span>
                  <div css={[utils.mb(20)]}>{collection.category}</div>
                </>
              )}
              {hookStateLoading ? (
                <ShimmerCard height={30} borderRadius={10} isEffect={true} />
              ) : (
                collection.tags.length > 0 && (
                  <>
                    <span css={[styles.descriptionTitle]}>
                      {translate(`TAGS`)}
                    </span>
                    <div css={styles.collectionTags}>
                      {collection.tags.map((tag, i) => {
                        return (
                          <span css={styles.collectionTag} key={i}>
                            {tag}
                          </span>
                        );
                      })}
                    </div>
                  </>
                )
              )}
              {hookStateLoading ? (
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
                showSocialLinks && (
                  <Fragment>
                    <span css={[styles.descriptionTitle]}>
                      {translate(`SOCIAL_LINKS`)}
                    </span>
                    <div css={styles.descriptionAuthor}>
                      {collection.twitterLink && (
                        <a
                          href={collection.twitterLink}
                          target="_blank"
                          css={[
                            styles.descriptionAuthorImage,
                            mixins.flexAlignJustifiedCenter,
                          ]}
                          rel="noreferrer"
                        >
                          <img
                            src={AssetsImg.ic_twitter.src}
                            css={styles.socialIcon}
                          />
                        </a>
                      )}
                      {collection.facebookLink && (
                        <a
                          href={collection.facebookLink}
                          target="_blank"
                          css={[
                            styles.descriptionAuthorImage,
                            mixins.flexAlignJustifiedCenter,
                          ]}
                          rel="noreferrer"
                        >
                          <img
                            src={AssetsImg.ic_facebook.src}
                            css={styles.socialIcon}
                          />
                        </a>
                      )}
                      {collection.discordLink && (
                        <a
                          href={collection.discordLink}
                          target="_blank"
                          css={[
                            styles.descriptionAuthorImage,
                            mixins.flexAlignJustifiedCenter,
                          ]}
                          rel="noreferrer"
                        >
                          <img
                            src={AssetsImg.ic_discord.src}
                            css={styles.socialIcon}
                          />
                        </a>
                      )}
                      {collection.instagramLink && (
                        <a
                          href={collection.instagramLink}
                          target="_blank"
                          css={[
                            styles.descriptionAuthorImage,
                            mixins.flexAlignJustifiedCenter,
                          ]}
                          rel="noreferrer"
                        >
                          <img
                            src={AssetsImg.ic_instagram.src}
                            css={styles.socialIcon}
                          />
                        </a>
                      )}
                    </div>
                  </Fragment>
                )
              )}
            </div>
          </motion.div>
        </div>
      </motion.div>

      <BottomPopup
        size={BottomPopupSize.MEDIUM}
        isOpen={accountSelectorOpen}
        title="Select Account"
        onClose={() => {
          setAccountSelectorOpen(false);
        }}
      >
        <AccountSelector
          onChange={(account) => {
            if (account && account.wallet_uuid) {
              setWalletUUID(account.wallet_uuid);
              setAccountSelectorOpen(false);
              handleClaimNFT();
            }
          }}
        />
      </BottomPopup>

      <FullScreenPopUp isOpen={authRequired}>
        <Authentication
          onSuccess={() => {
            setAuthRequired(false);
          }}
          isPopUp={true}
        />
      </FullScreenPopUp>
    </BottomNav>
  );
};

export default CollectionDetails;
