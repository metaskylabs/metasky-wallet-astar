import { FC } from 'react';
import * as styles from './styles';
import { Video } from '@components/Shared';
import { colors, mixins, typography, utils } from '@styles/shared';
import { transactionDetails } from '@utils/constants';

interface OfferCardProps {
  collectionName: string;
  from?: string;
  to?: string;
  price: number;
  mediaType: string;
  image: string;
  onClick: () => void;
}

const OfferCard: FC<OfferCardProps> = ({
  collectionName,
  from,
  to,
  price,
  image,
  mediaType,
  onClick,
}) => {
  return (
    <section
      css={[styles.container, mixins.flex, mixins.cursorPointer]}
      onClick={onClick}
    >
      <div css={[styles.imageContainer]}>
        {mediaType === `image` && image && (
          <img src={image} alt="" css={styles.mediaSource} />
        )}
        {mediaType === `video` && image && (
          <Video
            source={image}
            controls={false}
            disablePictureInPicture={false}
            controlsList="nodownload"
            addStyles={styles.mediaSource}
            loop
            muted
            autoPlay
          />
        )}
      </div>
      <div css={[mixins.flexJustifiedBetween, utils.widthPercent(100)]}>
        <div
          css={[
            mixins.flexJustifiedStart,
            mixins.flexColumn,
            utils.widthPercent(70),
            utils.pt(8),
            utils.pl(12),
            utils.pr(12),
          ]}
        >
          <h2
            css={[
              typography.T_14_Semibold,
              {
                color: colors.Secondary_Black_Text,
              },
              styles.collectionName,
              utils.mb(4),
            ]}
          >
            {collectionName}
          </h2>
          <p
            css={[
              typography.T_12_Regular,
              {
                color: colors.Secondary_Black_Text,
              },
            ]}
          >
            {from
              ? `${transactionDetails.from}: ${from}`
              : `${transactionDetails.to}: ${to}`}
          </p>
        </div>
        <div
          css={[
            styles.offerPrice,
            mixins.flexJustifiedStart,
            mixins.flexColumn,
            utils.mb(4),
            utils.mr(21),
            utils.pt(8),
          ]}
        >
          <h2
            css={[
              typography.T_16_Bold,
              {
                color: colors.Primary_Blue,
              },
            ]}
          >
            ~ &#8377;{price}
          </h2>
        </div>
      </div>
    </section>
  );
};

export default OfferCard;
