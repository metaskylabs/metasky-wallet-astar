import { FC, Fragment, useEffect, useState } from 'react';
import * as styles from './styles';
import { SerializedStyles } from '@emotion/react';
import { motion } from 'framer-motion';
import ReactDOM from 'react-dom';
import { HeaderWithCloseAndBack } from '@components/Shared';
import { headingSpacing } from './styles';
import { Logger } from '@utils/logger';

interface BottomPopupProps {
  isOpen?: boolean;
  onClose?: () => void;
  addStyles?: SerializedStyles;
  onBack?: () => void;
  isBackEnabled?: boolean;
  size?: BottomPopupSize;
  title?: string;
}

export enum BottomPopupSize {
  BIG,
  MEDIUM,
}

const BottomPopup: FC<BottomPopupProps> = ({
  isOpen,
  onClose,
  children,
  addStyles,
  onBack,
  isBackEnabled = false,
  title,
  size = BottomPopupSize.MEDIUM,
}) => {
  const [isBrowser, setIsBrowser] = useState(false);

  // Logger.debug(size, `size`);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  if (isBrowser) {
    return ReactDOM.createPortal(
      <Fragment>
        {isOpen && (
          <div
            css={[
              styles.bottomSheetPopup,
              isOpen ? styles.visible : styles.notVisible,
            ]}
            className="bottom-sheet modal-container"
          >
            <div
              css={[styles.backDrop]}
              onClick={onClose}
              className="bottom-sheet"
            />
            <motion.div
              css={[
                styles.bottomSheetBody,
                { ...addStyles },
                size === BottomPopupSize.BIG && styles.sizeBig,
                size === BottomPopupSize.MEDIUM && styles.sizeMedium,
              ]}
              initial={{ opacity: 0, y: 200 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.05,
                default: { duration: 0.2 },
                ease: `easeIn`,
              }}
            >
              {(title || onClose || (onBack && isBackEnabled)) && (
                <HeaderWithCloseAndBack
                  onClose={onClose}
                  title={title}
                  isBackEnabled={isBackEnabled}
                  onBack={onBack}
                  addedContainerStyles={styles.headingSpacing}
                />
              )}
              <div css={[styles.childWrapper]}>{children}</div>
            </motion.div>
          </div>
        )}
      </Fragment>,
      document.getElementById(`modal`) as Element,
    );
  } else {
    return null;
  }
};

export default BottomPopup;
