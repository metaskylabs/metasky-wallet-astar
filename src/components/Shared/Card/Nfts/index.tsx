import { FC } from 'react';
import * as styles from './styles';
import * as Constants from '@utils/constants';
import { SerializedStyles } from '@emotion/react';
import { colors, mixins, utils } from '@/styles/shared';
import { typography } from '@/styles/shared';
import { MLottie, PrimaryButton, Video, BackButton } from '@components/Shared';
import AssetsImg from '@public/images';

//TODO: Framer animations
// import image1 from '@public/Card/nftCard.png';
// import { motion } from 'framer-motion';

interface collectionDetails {
  name?: string | null;
  image?: string | null;
}
interface CardNftsProps {
  image: string;
  ribbon?: boolean;
  ribbonText?: string;
  onClick?: () => void;
  addStyles?: SerializedStyles;
  contentHeight?: SerializedStyles;
  hightDesc?: boolean;
  imageStyles?: SerializedStyles;
  content?: string;
  keys?: number;
  mediaType?: string;
  ctaText?: string;
  price?: string;
  currencySymbol?: string;
  loading?: boolean;
  marketplace?: boolean;
  name?: string;
  rarity?: number | null;
  collectionDetails?: collectionDetails | null;
}
export enum rarityRange {
  MID = 10,
  HIGH = 3,
}

const CardNfts: FC<CardNftsProps> = ({
  image,
  onClick,
  ribbon,
  ribbonText,
  addStyles,
  imageStyles,
  content,
  mediaType,
  keys,
  ctaText,
  loading,
  currencySymbol = `₹`,
  price,
  contentHeight,
  marketplace,
  name,
  rarity,
  collectionDetails,
  hightDesc,
}) => {
  return (
    <div key={keys} css={[styles.card, { ...addStyles }]} onClick={onClick}>
      {ribbon && (
        <div css={styles.ribbonWrapper}>
          <img src={AssetsImg.i_ribbon_rect.src} css={styles.bannerRect} />
          <div css={styles.ribbonText}>{ribbonText}</div>
        </div>
      )}
      <div css={styles.cardNftWrapper}>
        <div>
          {mediaType === `video` ? (
            <Video
              autoPlay={true}
              source={image}
              muted={true}
              playsInline={true}
              loop={true}
              controls={false}
              disablePictureInPicture={true}
              controlsList="nodownload"
              addStyles={[styles.cardNftImage, { ...imageStyles }]}
            />
          ) : (
            <img
              src={mediaType && image ? image : ``}
              css={[styles.cardNftImage, { ...imageStyles }, utils.mb(0)]}
              alt="Card Nft"
              onError={(event) => {
                (event.target as HTMLImageElement).src =
                  AssetsImg.i_nftDefault.src;
              }}
            />
          )}
          {rarity && (
            <div
              css={[
                styles.rarityRanking,
                mixins.flexAlignCenter,
                {
                  background: `${
                    rarity <= rarityRange.HIGH
                      ? colors.Rarirty_Background_Low
                      : rarity <= rarityRange.MID
                      ? colors.Rarirty_Background_High
                      : colors.Rarirty_Background_Mid
                  }`,
                },
              ]}
            >
              <img src={AssetsImg.ic_rarity_diamond.src} alt="rarity" />
              <p>#{rarity}</p>
            </div>
          )}
        </div>
        {marketplace ? (
          <section
            css={[
              mediaType === `video` && utils.mt(-9),
              mixins.flexColumn,
              styles.alignBetween,
              utils.mt(20),
            ]}
          >
            <div css={[mixins.flexColumn, styles.alignBetween]}>
              <div css={[mixins.flexAlignCenter, { height: `100%` }]}>
                <h4
                  css={[
                    styles.infinityCollectionDescription,
                    utils.pl(8),
                    utils.pr(8),
                  ]}
                >
                  {name}
                </h4>
              </div>
              {collectionDetails && (
                <p css={[styles.infinityCollectionTitle]}>
                  {collectionDetails.name}
                </p>
              )}
            </div>
            <div
              css={[
                mixins.flexAlignCenterJustifiedBetween,
                styles.marketplacePrice,
              ]}
            >
              <div>{price ? `~${currencySymbol}${price}` : ``}</div>
              {
                <button
                  css={[styles.backButton, mixins.flexAlignJustifiedCenter]}
                >
                  <img
                    css={styles.blueArrow}
                    src={AssetsImg.ic_rightArrow.src}
                    alt="back"
                  />
                </button>
              }
            </div>
          </section>
        ) : (
          <section
            css={[
              mediaType === `video` && utils.mt(-9),
              mixins.flexColumn,
              styles.alignBetween,
              utils.mt(20),
              utils.ml(8),
              utils.mr(8),
              utils.mb(8),
            ]}
          >
            <div css={[mixins.flexColumn, styles.alignBetween]}>
              <div css={[mixins.flexAlignCenter, { height: `100%` }]}>
                <h4
                  css={[
                    styles.infinityCollectionDescription,
                    hightDesc && utils.height(42),
                  ]}
                >
                  {name}
                </h4>
              </div>
              {collectionDetails && (
                <div css={[mixins.flexAlignCenter]}>
                  <img
                    css={[styles.collectionImage, utils.mr(8)]}
                    src={
                      collectionDetails?.image
                        ? collectionDetails.image
                        : AssetsImg.i_collectionDefault.src
                    }
                  />
                  <p css={[styles.infinityCollectionTitle]}>
                    {collectionDetails.name}
                  </p>
                </div>
              )}
            </div>
          </section>
        )}
      </div>
    </div>
    //  TODO: Framer Animations
    //  <figure css={styles.card}>
    //    <span css={styles.badge}>View in AR</span>
    //    <motion.div layoutId={`imageExpand-${cardId}`}>
    //      <Image src={image1} alt="one" />
    //    </motion.div>
    //    <figcaption css={styles.title}>
    //      Infinity Access Card Collection II #Moon...
    //    </figcaption>
    //  </figure>
  );
};

export default CardNfts;
