import { FC, Fragment, ReactNode } from 'react';
import * as styles from './styles';
import { mixins } from '@/styles/shared';
import Video from '@components/Shared/Video';
import { MediaType } from '../Media';
import AssetsImg from '@public/images';

interface ImageWithInfoProps {
  image: string;
  children: ReactNode;
  title: string;
  mediaType: MediaType;
}

const ImageWithInfo: FC<ImageWithInfoProps> = ({
  image,
  children,
  title,
  mediaType,
}) => {
  return (
    <Fragment>
      <div css={[styles.card, mixins.flex]}>
        {mediaType === MediaType.IMAGE && image ? (
          <img
            src={image}
            css={styles.image}
            onError={(event) => {
              (event.target as HTMLImageElement).src =
                AssetsImg.i_nftDefault.src;
            }}
          />
        ) : (
          <Video
            source={image}
            controls={false}
            autoPlay={true}
            muted={true}
            loop={true}
            playsInline={true}
            disablePictureInPicture={true}
            controlsList="nodownload"
            addStyles={styles.video}
          />
        )}
        <div css={styles.infoContainer}>
          <div css={styles.title}>{title}</div>
          <div css={styles.childContainer}>{children}</div>
        </div>
      </div>
    </Fragment>
  );
};

export default ImageWithInfo;
