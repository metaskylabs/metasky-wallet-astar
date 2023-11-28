// import AssetsImg from '@public/images';
import { FC, Fragment, ReactNode } from 'react';
import * as styles from './styles';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Sidebar: FC<SidebarProps> = ({ isOpen, onClose, children }) => {
  return (
    <Fragment>
      <div css={[styles.sidebar, isOpen ? styles.sidebarActive : ``]}>
        <div>
          {/* {onClose && (
            <div css={styles.closeBtn} onClick={onClose}>
              <img src={AssetsImg.ic_close.src} alt="Close" />
            </div>
          )} */}
          {children}
        </div>
      </div>
      <div
        css={[styles.sidebarOverlay, isOpen ? styles.sidebarOverlayActive : ``]}
        onClick={onClose}
      ></div>
    </Fragment>
  );
};

export default Sidebar;
