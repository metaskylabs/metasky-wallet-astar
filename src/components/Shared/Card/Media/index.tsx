import { FC, Fragment, useState } from 'react';
import * as styles from './styles';
import NOOB from '@constants/noob';
import ShimmerLargeImage from '@components/Shimmer/ShimmerLargeImage';
import { Video } from '@components/Shared';
import AssetsImg from '@public/images';
import { SerializedStyles } from '@emotion/react';
import ShimmerCard from '@components/Shimmer/ShimmerCard';
import { ShimmerCardSize } from '@utils/constants';

export enum MediaType {
  VIDEO = `video`,
  IMAGE = `image`,
}
interface MediaCardProps {
  mediaType: MediaType;
  mediaUrl: string;
  addedStyles?: SerializedStyles;
  mediaShimmerSize?: ShimmerCardSize;
}

const MediaCard: FC<MediaCardProps> = ({
  mediaType = MediaType.IMAGE,
  mediaUrl = AssetsImg.i_nftDefault,
  addedStyles,
  mediaShimmerSize,
}) => {
  const [isShimmerVisible, setIsShimmerVisible] = useState<boolean>(true);

  const loadAsset = () => {
    if (mediaType === MediaType.IMAGE && mediaUrl) {
      // TODO : Add default media
      return (
        <img
          onClick={NOOB}
          src={mediaUrl}
          alt={`Details Image`}
          css={[styles.layout, addedStyles]}
          width="100%"
          height="100%"
          onLoad={(event) => {
            const element = event.currentTarget;
            if (element) {
              element.style.display = `block`;
              setIsShimmerVisible(false);
            }
          }}
        />
      );
    } else if (mediaType === MediaType.VIDEO) {
      return (
        <div css={[styles.container, addedStyles]} onClick={NOOB}>
          <Video
            source={mediaUrl}
            width="100%"
            height="100%"
            disablePictureInPicture={true}
            controls={false}
            addStyles={styles.layout}
            controlsList="nodownload"
            autoPlay={true}
            muted={true}
            loop={true}
            playsInline={true}
            onLoadedData={(event: any) => {
              const element = event.currentTarget;
              if (element) {
                element.style.display = `block`;
                setIsShimmerVisible(false);
              }
            }}
          />
        </div>
      );
    }
  };

  return (
    <Fragment>
      {isShimmerVisible &&
        (mediaShimmerSize === ShimmerCardSize.SMALL ? (
          <ShimmerCard width={48} height={48} borderRadius={4} />
        ) : mediaShimmerSize === ShimmerCardSize.MEDIUM ? (
          <ShimmerCard width={95} height={95} borderRadius={4} />
        ) : mediaShimmerSize === ShimmerCardSize.LARGE ? (
          <ShimmerCard width={173} height={173} borderRadius={4} />
        ) : (
          <ShimmerLargeImage />
        ))}
      {loadAsset()}
    </Fragment>
  );
};
export default MediaCard;
