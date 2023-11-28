import { FC } from 'react';
import { BackButton, BlueTextButton } from '@components/Shared';
import AssetsImg from '@public/images';
import * as styles from './styles';
import { SerializedStyles } from '@emotion/react';
import NOOB from '@constants/noob';

interface HeaderWithCloseAndBackProps {
  isBackEnabled?: boolean;
  onBack?: () => void;
  title?: string;
  onClose?: () => void;
  addedContainerStyles?: SerializedStyles;
  secondaryBack?: boolean;
}

const HeaderWithCloseAndBack: FC<HeaderWithCloseAndBackProps> = ({
  onBack,
  onClose,
  title,
  isBackEnabled = false,
  addedContainerStyles,
  secondaryBack = false,
}) => {
  return (
    <div css={[styles.container, addedContainerStyles]}>
      <div css={styles.leftWrapper} onClick={onBack}>
        {isBackEnabled && secondaryBack ? (
          // ADDED NOOB as we have parent which is sending on back event
          <BackButton customBack={NOOB} />
        ) : isBackEnabled ? (
          <img
            src={AssetsImg.ic_backArrowBlue.src}
            alt="back"
            css={styles.backImage}
          />
        ) : null}
      </div>
      <div css={styles.centerWrapper}>{title && title}</div>
      <div css={styles.rightWrapper}>
        {onClose && <BlueTextButton onClick={onClose}>CLOSE</BlueTextButton>}
      </div>
    </div>
  );
};

export default HeaderWithCloseAndBack;
