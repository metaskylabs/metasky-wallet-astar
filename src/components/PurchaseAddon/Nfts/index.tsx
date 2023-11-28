import { FC } from 'react';
import * as styles from './styles';
import * as Constants from '@utils/constants';
import { SerializedStyles } from '@emotion/react';
import { colors, mixins, utils } from '@/styles/shared';
import QuantityUpdate from '@components/QuantityUpdate';
import { typography } from '@/styles/shared';
import {
  MLottie,
  PrimaryButton,
  Video,
  BackButton,
  SecondaryButton,
} from '@components/Shared';
import AssetsImg from '@public/images';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

interface collectionDetails {
  name?: string | null;
  image?: string | null;
}
interface CardNftsProps {
  image: string;
  onClick?: () => void;
  onQuantityUpdate: (quantity: number) => void;
  addStyles?: SerializedStyles;
  contentHeight?: SerializedStyles;
  hightDesc?: boolean;
  imageStyles?: SerializedStyles;
  content?: string;
  keys?: number;
  mediaType?: string;
  price?: string;
  marketplace?: boolean;
  name?: string;
  collectionDetails?: collectionDetails | null;
  quantity: number;
  maxQuantity: number;
}

const CardNfts: FC<CardNftsProps> = ({
  image,
  onClick,
  onQuantityUpdate,
  addStyles,
  imageStyles,
  mediaType,
  keys,
  price,
  marketplace,
  name,
  collectionDetails,
  hightDesc,
  quantity,
  maxQuantity,
}) => {
  return (
    <div key={keys} css={[styles.card, { ...addStyles }]} onClick={onClick}>
      <div css={styles.cardNftWrapper}>
        <div css={styles.cardNftImageWrapper}>
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
              css={[styles.cardNftImage, { ...imageStyles }]}
              alt="Card Nft"
              onError={(event) => {
                (event.target as HTMLImageElement).src =
                  AssetsImg.i_nftDefault.src;
              }}
            />
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
                  <OverlayTrigger
                    delay={{ hide: 450, show: 300 }}
                    overlay={(props) => <Tooltip {...props}>{name}</Tooltip>}
                    placement="bottom"
                  >
                    <span>{name}</span>
                  </OverlayTrigger>
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
              <div>{price ? `~₹${price}` : ``}</div>
              <div css={[mixins.flexAlignJustifiedCenter, { height: `2rem` }]}>
                {!quantity ? (
                  <>
                    <SecondaryButton
                      addStyles={styles.addButton}
                      onClick={() => onQuantityUpdate(1)}
                    >
                      ADD
                    </SecondaryButton>
                  </>
                ) : (
                  <QuantityUpdate
                    quantity={quantity}
                    onQuantityUpdate={onQuantityUpdate}
                    maxQuantity={maxQuantity}
                  />
                )}
              </div>
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
                    hightDesc && utils.height(48),
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
  );
};

export default CardNfts;
