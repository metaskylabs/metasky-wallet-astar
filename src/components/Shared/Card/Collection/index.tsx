import { FC, Fragment } from 'react';
import * as styles from './styles';
import AssetsImg from '@public/images';
import { Pages } from '@utils/navigation';
import { useRouter } from 'next/router';

interface CollectionCardProps {
  id: string;
  image: string | null;
  name: string;
  description: string;
}

const CollectionCard: FC<CollectionCardProps> = ({
  id,
  image,
  description,
  name,
}) => {
  const router = useRouter();
  return (
    <Fragment>
      <div onClick={() => router.push(`${Pages.COLLECTION_DETAILS}/${id}`)}>
        <div css={styles.collectionCard}>
          <img
            src={image ? image : AssetsImg.i_collectionDefault.src}
            alt=""
            css={styles.collectionImg}
            onError={(event) => {
              (event.target as HTMLImageElement).src =
                AssetsImg.i_collectionDefault.src;
            }}
          />
          <div>
            <h3 css={styles.collectionName}>
              {name}
              <img src={AssetsImg.ic_verified.src} />
            </h3>
            <p css={styles.collectionDescription}>{description}</p>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default CollectionCard;
