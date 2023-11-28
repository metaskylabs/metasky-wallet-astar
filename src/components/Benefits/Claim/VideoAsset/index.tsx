import React, { FC, useEffect } from 'react';
import * as styles from './styles';
import VideoJS from '@components/Shared/VideoJS';
import { SectionTitle } from '@components/Shared';
import { useAnalytics } from '@utils/useAnalytics';

interface VideoAssetProps {
  url: string;
  title?: string;
}

const VideoAsset: FC<VideoAssetProps> = ({ url, title }) => {
  const { trackPage } = useAnalytics();

  const videoJsOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [
      {
        src: url,
        type: `video/mp4`,
      },
    ],
  };

  useEffect(() => {
    trackPage(`benefit Claim Video Player`, { video: url });
  }, []);

  return (
    <div css={styles.assetWrapper}>
      <VideoJS options={videoJsOptions} />
      {title && (
        <div css={styles.benefitName}>
          <SectionTitle title={title} />
        </div>
      )}
    </div>
  );
};

export default VideoAsset;
