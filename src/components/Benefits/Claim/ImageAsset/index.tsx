import { FC } from 'react';
import * as styles from './styles';

interface ImageAssetProps {
  name?: string;
  image: string;
}

const ImageAsset: FC<ImageAssetProps> = ({ name, image }) => {
  return (
    <div css={styles.container}>
      <div css={styles.imgContainer}>
        <img css={styles.img} src={image} />
      </div>
      {name && <div css={styles.name}>{name}</div>}
    </div>
  );
};

export default ImageAsset;
