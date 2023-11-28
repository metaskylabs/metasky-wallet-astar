import React, { FC } from 'react';
import * as styles from './styles';
import AssetsImg from '@public/images';
import { MediaType } from '@components/Shared/Card/Media';

interface ControllerProps {
  handleNext: () => void;
  handlePrev: () => void;
  handleDetailClick: () => void;
  isMute: boolean;
  setIsMute: (a: boolean) => void;
  title: string;
  mediaType: MediaType;
}

const Controller: FC<ControllerProps> = ({
  handleNext,
  handlePrev,
  handleDetailClick,
  title,
  isMute,
  setIsMute,
  mediaType,
}) => {
  return (
    <div css={styles.controller}>
      <div css={styles.navContainer}>
        <div css={styles.navigationButton} onClick={handlePrev}></div>
        <div css={styles.navigationButton} onClick={handleDetailClick}></div>
        <div css={styles.navigationButton} onClick={handleNext}></div>
      </div>
      <div css={styles.title} onClick={handleDetailClick}>
        {title}
      </div>
      {mediaType === MediaType.VIDEO && (
        <img
          css={styles.mute}
          src={isMute ? AssetsImg.ic_mute.src : AssetsImg.ic_unmute.src}
          onClick={() => {
            setIsMute(!isMute);
          }}
        />
      )}
      <div css={styles.overlay}></div>
    </div>
  );
};

export default Controller;
