import { FC } from 'react';

interface VideoProps {
  source: string;
  addStyles?: any;
  disablePictureInPicture?: boolean;
  controls?: boolean;
  muted?: boolean;
  controlsList?: string;
  height?: string;
  width?: string;
  autoPlay?: boolean;
  loop?: boolean;
  playsInline?: boolean;
  onDurationChange?: () => void;
  onLoad?: () => void;
  onError?: () => void;
  hoverFeature?: boolean;
  onLoadedData?: (e: any) => void;
  id?: string;
}

const Video: FC<VideoProps> = ({
  hoverFeature,
  source,
  addStyles,
  disablePictureInPicture,
  controlsList,
  controls,
  height,
  width,
  autoPlay,
  muted,
  loop,
  playsInline,
  onDurationChange,
  onLoad,
  onError,
  onLoadedData,
  id,
}) => {
  return (
    <video
      disablePictureInPicture={disablePictureInPicture}
      controlsList={controlsList}
      onMouseOver={(e) => hoverFeature && (e.target as HTMLVideoElement).play()}
      onMouseLeave={(e) =>
        hoverFeature && (e.target as HTMLVideoElement).pause()
      }
      css={addStyles}
      controls={controls}
      height={height}
      width={width}
      disableRemotePlayback
      autoPlay={autoPlay}
      muted={muted}
      className="nftVideo"
      loop={loop}
      playsInline={playsInline}
      onDurationChange={onDurationChange}
      onCanPlay={onLoad}
      onError={onError}
      onLoadedData={onLoadedData}
      id={id}
    >
      <source src={`${source}#t=0.001`} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

Video.defaultProps = {
  disablePictureInPicture: false,
  controlsList: `nodownload`,
  controls: false,
  muted: true,
  height: `43`,
  width: `43`,
};

export default Video;
