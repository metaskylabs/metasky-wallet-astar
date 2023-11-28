import { FC, Fragment, useEffect, useState } from 'react';
import * as styles from './styles';
import NOOB from '@constants/noob';
import { Video } from '@components/Shared';
import AssetsImg from '@public/images';
import ShimmerFeed from '@components/Shimmer/ShimmerFeed';

export enum MediaType {
  VIDEO = `video`,
  IMAGE = `image`,
}
interface MediaCardProps {
  mediaType: string;
  mediaUrl: string;
  isMute?: boolean;
  currentMedia?: string;
  id?: string;
}

const FeedMedia: FC<MediaCardProps> = ({
  mediaType = MediaType.IMAGE,
  mediaUrl = AssetsImg.i_nftDefault,
  isMute = true,
  currentMedia,
  id,
}) => {
  const [isShimmerVisible, setIsShimmerVisible] = useState<boolean>(true);

  useEffect(() => {
    if (mediaType === MediaType.VIDEO && id) {
      const videoRef = document.getElementById(id) as HTMLVideoElement;
      if (currentMedia === id) {
        videoRef.currentTime = 0;
        videoRef.play();
      } else {
        videoRef.pause();
      }
    }
  }, [currentMedia]);

  const loadAsset = () => {
    if (mediaType === MediaType.IMAGE && mediaUrl) {
      // TODO : Add default media
      return (
        <img
          onClick={NOOB}
          src={mediaUrl}
          alt={`Details Image`}
          css={styles.layout}
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
        <div css={styles.container} onClick={NOOB}>
          <Video
            source={mediaUrl}
            width="100%"
            height="100%"
            disablePictureInPicture={true}
            controls={false}
            addStyles={styles.layout}
            controlsList="nodownload"
            autoPlay={true}
            muted={isMute}
            loop={true}
            playsInline={true}
            onLoadedData={(event: any) => {
              const element = event.currentTarget;
              if (element) {
                element.style.display = `block`;
                setIsShimmerVisible(false);
              }
            }}
            id={id}
          />
        </div>
      );
    }
  };

  return (
    <Fragment>
      {isShimmerVisible && (
        <div css={styles.loaderContainer}>
          <ShimmerFeed />
        </div>
      )}
      {loadAsset()}
    </Fragment>
  );
};
export default FeedMedia;
