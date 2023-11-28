import { FC, Fragment, useEffect, useRef, useState } from 'react';
import * as styles from './styles';
import AssetsImg from '@public/images';
import { SerializedStyles } from '@emotion/react';
import { motion } from 'framer-motion';
import ReactDOM from 'react-dom';
import { mixins } from '@styles/shared';

interface BootomSheetProps {
  isOpen?: boolean;
  onClose?: () => void;
  addStyles?: SerializedStyles;
}

const BottomSheet: FC<BootomSheetProps> = ({
  isOpen,
  onClose,
  children,
  addStyles,
}) => {
  const modalRef = useRef(null);
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  if (isBrowser) {
    try {
      return ReactDOM.createPortal(
        <Fragment>
          {isOpen && (
            <div
              ref={modalRef}
              css={[
                styles.bottomSheetPopup,
                isOpen ? styles.visibile : styles.notVisibile,
              ]}
              className="bottom-sheet modal-container"
            >
              <div
                css={[styles.backDrop]}
                onClick={onClose}
                className="bottom-sheet"
              ></div>
              <motion.div
                css={[styles.bottomSheetBody, { ...addStyles }]}
                initial={{ opacity: 0, y: 200 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.05,
                  default: { duration: 0.2 },
                  ease: `easeIn`,
                }}
              >
                {onClose && (
                  <div css={styles.closeBtn} onClick={onClose}>
                    <img src={AssetsImg.ic_close.src} alt="Close" />
                  </div>
                )}
                {children}
              </motion.div>
            </div>
          )}
        </Fragment>,
        document.getElementById(`modal`) as Element,
      );
    } catch (e) {
      return null;
    }
  } else {
    return null;
  }
};

export default BottomSheet;
