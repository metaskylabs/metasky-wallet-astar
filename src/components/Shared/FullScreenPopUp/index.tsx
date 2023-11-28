import { FC, Fragment, ReactNode, useEffect, useState } from 'react';
import * as styles from './styles';
import ReactDOM from 'react-dom';
import { motion } from 'framer-motion';

interface FullScreenPopUpProps {
  children: ReactNode;
  isOpen: boolean;
  onCloseOverlay?: () => void;
  splash?: boolean;
}

const FullScreenPopUp: FC<FullScreenPopUpProps> = ({
  isOpen,
  children,
  onCloseOverlay,
  splash,
}) => {
  const [isBrowser, setIsBrowser] = useState(false);
  useEffect(() => {
    setIsBrowser(true);
  }, []);
  if (isBrowser) {
    return ReactDOM.createPortal(
      <Fragment>
        {isOpen && (
          <Fragment>
            <div
              css={[
                styles.backDrop,
                isOpen && styles.openOverlay,
                splash && styles.splashScreenStyles,
                splash && {
                  zIndex: 15, //TODO:- will remove in the future
                },
              ]}
              className="fullscreen-modal-overlay modal-container"
            />
            <motion.div
              className="fullscreen-modal modal-container"
              css={[
                styles.OverlayContainer,
                isOpen && styles.openOverlay,
                splash && styles.splashScreenStyles,
                splash && {
                  zIndex: 15, //TODO:- will remove in the future
                },
              ]}
              initial={{ opacity: 0, y: 200 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.05,
                default: { duration: 0.2 },
                ease: `easeIn`,
              }}
            >
              {children}
            </motion.div>
          </Fragment>
        )}
      </Fragment>,
      document.getElementById(`modal`) as Element,
    );
  } else {
    return null;
  }
};

export default FullScreenPopUp;
