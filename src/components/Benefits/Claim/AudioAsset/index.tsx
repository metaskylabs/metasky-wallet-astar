import { FC, useEffect, useState } from 'react';
import * as styles from './styles';
import AssetsImg from '@public/images';
import ReactHowler from 'react-howler';
import { getNameFromUrl } from '@components/Benefits/Claim/helper';
import { getMinutes } from '@utils/Time';
import { useAnalytics } from '@utils/useAnalytics';

interface AudioAssetProps {
  url: string;
  image: string;
}

const AudioAsset: FC<AudioAssetProps> = ({ url, image }) => {
  let playerRef: ReactHowler;
  const { trackClick, trackPage } = useAnalytics();
  const [playing, setPlaying] = useState<boolean>(false);
  const [isSeeking, setIsSeeking] = useState<boolean>(false);
  const [seek, setSeek] = useState<number>(0.0);
  const [duration, setDuration] = useState<number>(0);

  let seekInterval: NodeJS.Timer;
  const renderSeekPos = () => {
    if (!seekInterval) {
      trackClick(`Audio Play`);
      seekInterval = setInterval(() => {
        if (!isSeeking) {
          setSeek(playerRef.seek());
        }
      }, 1000);
    }
  };

  const handleOnLoad = () => {
    setDuration(playerRef.duration());
  };

  const handleOnPlay = () => {
    renderSeekPos();
  };

  const handleSeekingChange = (e: any) => {
    playerRef.seek(e.target.value);
    setSeek(parseFloat(e.target.value));
  };

  const handleMouseDownSeek = () => {
    setIsSeeking(true);
  };

  const handleMouseUpSeek = () => {
    setIsSeeking(false);
  };

  const handleOnEnd = () => {
    setPlaying(false);
  };

  const onForwardClick = () => {
    if (seek + 10 < playerRef.duration()) {
      setSeek(seek + 10);
      playerRef.seek(seek + 10);
    }
  };

  const onPrevClick = () => {
    if (seek - 10 > 0) {
      setSeek(seek - 10);
      playerRef.seek(seek - 10);
    }
  };

  useEffect(() => {
    trackPage(`Benefit Claim Audio Player`, { audio: url });
    return () => {
      clearInterval(seekInterval);
    };
  }, []);

  return (
    <div css={styles.container}>
      <div css={styles.imgContainer}>
        <img css={styles.img} src={image} />
      </div>
      <div css={styles.audioPlayerContainer}>
        <ReactHowler
          src={url}
          playing={playing}
          onLoad={handleOnLoad}
          onPlay={handleOnPlay}
          onEnd={handleOnEnd}
          loop={false}
          mute={false}
          volume={1.0}
          ref={(ref) => {
            if (ref !== null) playerRef = ref;
          }}
        />
        <div css={styles.seekContainer}>
          <input
            css={styles.seek}
            type="range"
            min="0"
            max={duration ? duration.toFixed(2) : 0}
            step=".01"
            value={seek}
            onChange={handleSeekingChange}
            onMouseDown={handleMouseDownSeek}
            onMouseUp={handleMouseUpSeek}
          />
          <div css={styles.seekData}>
            <span>{getMinutes(seek)}</span>
            <span>{getMinutes(duration)}</span>
          </div>
        </div>

        <div css={styles.controls}>
          <div onClick={onPrevClick} css={styles.prev}>
            <img src={AssetsImg.ic_prev.src} />
          </div>
          <div onClick={() => setPlaying(!playing)} css={styles.playButton}>
            <img
              src={playing ? AssetsImg.ic_pause.src : AssetsImg.ic_play.src}
            />
          </div>
          <div onClick={onForwardClick} css={styles.prev}>
            <img src={AssetsImg.ic_next.src} />
          </div>
        </div>

        <div css={styles.name}>{getNameFromUrl(url)}</div>
      </div>
    </div>
  );
};

export default AudioAsset;
