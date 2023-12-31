import AssetsImg from '@public/images';
import { mixins } from '@styles/shared';
import Image from 'next/image';
import { FC } from 'react';
import * as styles from './styles';
import * as Constants from '@utils/constants';
import * as authorDescriptionStyles from '../AuthorDescription/styles';
import { useTranslate } from '@utils/useTranslate';
import utils from '@reducers/utils';
interface CollectionInformationProps {
  title?: string;
  description?: string;
  blockchain?: { id: string; name: string };
}

const CollectionInformation: FC<CollectionInformationProps> = ({
  title,
  description,
  blockchain,
}) => {
  const { translate } = useTranslate();
  return (
    <div css={styles.collection}>
      <div css={styles.collectionAvatar}>
        <img src={AssetsImg.i_default.src} alt={title} />
      </div>
      <div>
        <div css={mixins.flexColumn}>
          <div css={mixins.flexAlignCenter}>
            <span css={styles.collectionTitleText}>{title}</span>
            <div css={styles.collectionVerifiedIcon}>
              <img
                src={AssetsImg.ic_verified.src}
                alt={Constants.nftDetails.verified}
              />
            </div>
          </div>
          <p css={styles.collectionDescription}>{description}</p>
          <span css={styles.collectionReadMore}>
            {Constants.nftDetails.readMore}
          </span>
        </div>
        <section css={styles.authorDescriptionWrapper}>
          <span css={[authorDescriptionStyles.descriptionCreatedBy]}>
            {translate(`BLOCKCHAIN`)}
          </span>
          <div css={authorDescriptionStyles.descriptionAuthor}>
            <div
              css={[
                authorDescriptionStyles.descriptionAuthorImage,
                mixins.flexAlignJustifiedCenter,
              ]}
            >
              <img
                src={
                  Constants.NFTBlockchainMap[blockchain?.id || ``]?.image ||
                  AssetsImg.ic_polygon.src
                }
                alt={`author`}
                width="100%"
                height="100%"
                css={authorDescriptionStyles.authorImage}
              />
            </div>
            <span css={[authorDescriptionStyles.descriptionAuthorName]}>
              {blockchain?.name ||
                Constants.NFTBlockchainMap[blockchain?.id || ``]?.name ||
                `Polygon`}
            </span>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CollectionInformation;
