import { FC, ReactNode } from 'react';
import * as styles from './styles';
import AssetsImg from '@public/images';

interface FullScreenBootomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const FullScreenBottomSheet: FC<FullScreenBootomSheetProps> = ({
  isOpen,
  onClose,
  children,
}) => {
  return (
    <div
      css={[
        styles.bottomSheetPopup,
        isOpen ? styles.visibile : styles.notVisibile,
      ]}
    >
      <div css={styles.backDrop} onClick={onClose}></div>
      <div className="fullscreen-sheet" css={[styles.bottomSheetBody]}>
        {onClose && (
          <div css={styles.closeBtn} onClick={onClose}>
            <img src={AssetsImg.ic_close.src} alt="Close" />
          </div>
        )}
        {children}
      </div>
    </div>
  );
};

export default FullScreenBottomSheet;
